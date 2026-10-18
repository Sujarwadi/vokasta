import type http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { Modality, StartSensitivity, EndSensitivity, type GoogleGenAI, type LiveServerMessage } from '@google/genai';
import { DIALECT_CONFIG } from '../data/dialectDictionary';
import type { IndonesianDialect, Scenario } from '../types';
import {
  buildLiveCustomerInstruction,
  cleanPersonaText,
  LIVE_OPENING_CUE_EN,
  LIVE_OPENING_CUE_ID,
  LIVE_TWIST_INSTRUCTION_EN,
  LIVE_TWIST_INSTRUCTION_ID,
} from './livePersona';

export const LIVE_MODEL = process.env.LIVE_MODEL || 'gemini-3.8-live';

// Batas pengaman: kunci API publik tidak boleh dipakai tanpa batas
const MAX_CONCURRENT = Number(process.env.LIVE_MAX_CONCURRENT) || 4;
const MAX_SESSION_MS = (Number(process.env.LIVE_MAX_MINUTES) || 8) * 60_000;
const IDLE_MS = 120_000;
const MAX_MSG_BYTES = 96 * 1024;
const MAX_SESSIONS_PER_IP_HOUR = 20;
const MAX_SESSIONS_GLOBAL_HOUR = 200;
const CONNECT_TIMEOUT_MS = 15_000;

const ALLOWED_VOICES = new Set(['Kore', 'Charon', 'Puck', 'Zephyr', 'Aoede', 'Fenrir', 'Leda', 'Orus', 'Callirrhoe', 'Autonoe']);

let activeSessions = 0;
const ipHits = new Map<string, number[]>();
let globalHits: number[] = [];

function allowNewSession(ip: string): { ok: boolean; reason?: string } {
  const now = Date.now();
  const hourAgo = now - 3_600_000;
  globalHits = globalHits.filter((t) => t > hourAgo);
  const mine = (ipHits.get(ip) || []).filter((t) => t > hourAgo);
  if (activeSessions >= MAX_CONCURRENT) return { ok: false, reason: 'busy' };
  if (globalHits.length >= MAX_SESSIONS_GLOBAL_HOUR) return { ok: false, reason: 'quota' };
  if (mine.length >= MAX_SESSIONS_PER_IP_HOUR) return { ok: false, reason: 'quota' };
  mine.push(now);
  globalHits.push(now);
  ipHits.set(ip, mine);
  return { ok: true };
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`${label} timeout`)), ms);
    p.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      }
    );
  });
}

function originAllowed(req: http.IncomingMessage): boolean {
  const origin = req.headers.origin;
  if (!origin) return process.env.NODE_ENV !== 'production';
  try {
    const oHost = new URL(origin).host;
    const host = String(req.headers['x-forwarded-host'] || req.headers.host || '');
    return oHost === host.split(',')[0].trim();
  } catch {
    return false;
  }
}

export interface LiveDeps {
  getClient: () => GoogleGenAI;
  hasApiKey: () => boolean;
  scenarios: Scenario[];
}

let probeCache: { at: number; result: { ok: boolean; model: string; error?: string } } | null = null;

export async function probeLive(deps: LiveDeps): Promise<{ ok: boolean; model: string; error?: string }> {
  if (!deps.hasApiKey()) return { ok: false, model: LIVE_MODEL, error: 'GEMINI_API_KEY belum diatur' };
  if (probeCache && Date.now() - probeCache.at < 60_000) return probeCache.result;
  let result: { ok: boolean; model: string; error?: string };
  try {
    const ai = deps.getClient();
    const session = await withTimeout(
      ai.live.connect({
        model: LIVE_MODEL,
        config: { responseModalities: [Modality.AUDIO] },
        callbacks: { onmessage: () => {}, onerror: () => {}, onclose: () => {} },
      }),
      CONNECT_TIMEOUT_MS,
      'live.connect'
    );
    try {
      session.close();
    } catch {
      // abaikan
    }
    result = { ok: true, model: LIVE_MODEL };
  } catch (e: any) {
    result = { ok: false, model: LIVE_MODEL, error: String(e?.message || e).slice(0, 200) };
  }
  probeCache = { at: Date.now(), result };
  return result;
}

export function attachLiveServer(server: http.Server, deps: LiveDeps) {
  const wss = new WebSocketServer({ noServer: true, maxPayload: MAX_MSG_BYTES });

  server.on('upgrade', (request, socket, head) => {
    try {
      const rawPath = (request.url || '').split('?')[0].replace(/\/+$/, '') || '/';
      if (rawPath !== '/api/live') return; // biarkan penangan lain (mis. HMR) bekerja
      if (!originAllowed(request)) {
        socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
        socket.destroy();
        return;
      }
      wss.handleUpgrade(request, socket, head, (ws) => {
        (ws as any).__ip = String(request.headers['x-forwarded-for'] || request.socket.remoteAddress || '').split(',')[0].trim();
        wss.emit('connection', ws, request);
      });
    } catch (err) {
      console.warn('[VOKASTA] WS upgrade error:', err);
      socket.destroy();
    }
  });

  wss.on('connection', (clientWs: WebSocket) => {
    const ip: string = (clientWs as any).__ip || 'unknown';
    let live: any = null;
    let counted = false;
    let initialized = false;
    let initStarted = false;
    let openingCount = 0;
    let startedAt = 0;
    let maxTimer: NodeJS.Timeout | null = null;
    let idleTimer: NodeJS.Timeout | null = null;

    const send = (obj: Record<string, unknown>) => {
      if (clientWs.readyState === WebSocket.OPEN) clientWs.send(JSON.stringify(obj));
    };

    const cleanup = (reason: string) => {
      if (maxTimer) clearTimeout(maxTimer);
      if (idleTimer) clearTimeout(idleTimer);
      maxTimer = idleTimer = null;
      if (live) {
        try {
          live.close();
        } catch {
          // abaikan
        }
        live = null;
      }
      if (counted) {
        counted = false;
        activeSessions = Math.max(0, activeSessions - 1);
        console.log(`[VOKASTA] Sesi Live selesai (${reason}) durasi ${Math.round((Date.now() - startedAt) / 1000)} dtk, aktif: ${activeSessions}`);
      }
    };

    const bumpIdle = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        send({ type: 'sessionClosed', reason: 'idle' });
        cleanup('idle');
        clientWs.close();
      }, IDLE_MS);
    };

    clientWs.on('message', async (raw) => {
      let data: any;
      try {
        data = JSON.parse(raw.toString());
      } catch {
        return;
      }
      try {
        if (data.type === 'ping') {
          send({ type: 'pong' });
          return;
        }
        bumpIdle();

        if (data.type === 'init') {
          if (initStarted) return;
          initStarted = true;
          if (!deps.hasApiKey()) {
            send({ type: 'error', code: 'no_key', message: 'Kunci API belum diatur.' });
            return;
          }
          const gate = allowNewSession(ip);
          if (!gate.ok) {
            send({ type: 'error', code: gate.reason, message: gate.reason === 'busy' ? 'Server sedang penuh.' : 'Kuota sesi Live tercapai.' });
            return;
          }
          counted = true;
          activeSessions += 1;
          startedAt = Date.now();

          const scenario = deps.scenarios.find((s) => s.id === data.scenario_id);
          if (!scenario) {
            send({ type: 'error', code: 'bad_scenario', message: 'Skenario tidak dikenal.' });
            cleanup('bad_scenario');
            return;
          }
          const dialectKey = (typeof data.dialect === 'string' && data.dialect in DIALECT_CONFIG ? data.dialect : 'jabodetabek') as IndonesianDialect;
          const dc = DIALECT_CONFIG[dialectKey];
          const workerIsFemale = data.candidate_gender === 'female';
          const language: 'id' | 'en' = data.language === 'en' ? 'en' : 'id';
          const persona = data.persona && typeof data.persona === 'object' ? data.persona : {};
          const customerIsFemale = Boolean(persona.isFemale);
          const voiceRaw = cleanPersonaText(persona.voice, 20);
          const voiceName = ALLOWED_VOICES.has(voiceRaw) ? voiceRaw : customerIsFemale ? 'Kore' : 'Charon';

          const instruction = buildLiveCustomerInstruction({
            scenarioTitle: scenario.title,
            roleContext: cleanPersonaText(scenario.role_context, 300),
            personaName: cleanPersonaText(persona.name, 80) || scenario.buyer_persona?.name || 'Pelanggan',
            personaTitle: cleanPersonaText(persona.title, 120) || scenario.buyer_persona?.title || 'Pelanggan',
            personaTag: cleanPersonaText(persona.tag, 200) || scenario.buyer_persona?.temperament || '',
            stylePrompt: cleanPersonaText(persona.stylePrompt, 240) || dc.stylePrompt,
            openingLine: cleanPersonaText(persona.line, 500) || scenario.buyer_persona?.opening_objection_line || '',
            regionName: dc.regionName,
            dialectDescription: dc.description,
            dialectStyle: dc.stylePrompt,
            honorific: workerIsFemale ? dc.honorificFemale : dc.honorificMale,
            workerIsFemale,
            customerIsFemale,
            highPressure: data.pressure_level === 'high_pressure',
            language,
          });

          try {
            const ai = deps.getClient();
            let configLevel: 'tuned' | 'vad' | 'basic' = 'tuned';
            const openSession = (level: 'tuned' | 'vad' | 'basic') =>
              (async () => {
                let setupDone = false;
                let rejectReady: (e: any) => void = () => {};
                let resolveReady: () => void = () => {};
                const readyPromise = new Promise<void>((res, rej) => {
                  resolveReady = res;
                  rejectReady = rej;
                });
                readyPromise.catch(() => {});
                let settled = false;
                const fail = (err: any) => {
                  if (settled) return;
                  settled = true;
                  clearTimeout(timer);
                  rejectReady(err);
                };
                const timer = setTimeout(() => fail(new Error('setup timeout')), CONNECT_TIMEOUT_MS);
                const config: any = {
                  responseModalities: [Modality.AUDIO],
                  speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } },
                  systemInstruction: instruction,
                  outputAudioTranscription: {},
                  inputAudioTranscription: {},
                };
                if (level === 'tuned') {
                  // Petunjuk bahasa agar transkrip ucapan peserta tidak salah mendeteksi bahasa (mis. menjadi aksara Korea)
                  config.inputAudioTranscription = { languageCodes: language === 'en' ? ['en-US', 'id-ID'] : ['id-ID', 'en-US'] };
                }
                if (level === 'tuned' || level === 'vad') {
                  // Beri jeda lebih longgar agar ucapan peserta tidak terpotong dan pelanggan tidak menyela
                  config.realtimeInputConfig = {
                    automaticActivityDetection: {
                      startOfSpeechSensitivity: StartSensitivity.START_SENSITIVITY_LOW,
                      endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_LOW,
                      prefixPaddingMs: 120,
                      silenceDurationMs: 900,
                    },
                  };
                }
                let sess: any = null;
                try {
                  const connectP: Promise<any> = ai.live.connect({
                    model: LIVE_MODEL,
                    config,
                    callbacks: {
                      onmessage: (message: LiveServerMessage) => {
                        if ((message as any).setupComplete && !setupDone) {
                          setupDone = true;
                          if (!settled) {
                            settled = true;
                            clearTimeout(timer);
                            resolveReady();
                          }
                          return;
                        }
                        const sc: any = message.serverContent;
                        if (!sc) return;
                        const parts: any[] = sc.modelTurn?.parts || [];
                        for (const part of parts) {
                          if (part?.inlineData?.data) send({ type: 'audio', audio: part.inlineData.data });
                        }
                        const outText = sc.outputTranscription?.text || sc.outputAudioTranscription?.text;
                        if (outText) send({ type: 'outputTranscription', text: outText });
                        const inText = sc.inputTranscription?.text || sc.inputAudioTranscription?.text;
                        if (inText) send({ type: 'inputTranscription', text: inText });
                        if (sc.interrupted) send({ type: 'interrupted' });
                        if (sc.turnComplete) send({ type: 'turnComplete' });
                      },
                      onclose: (e: any) => {
                        if (!setupDone) return fail(new Error(`closed before setup (${e?.code ?? ''} ${String(e?.reason || '').slice(0, 120)})`));
                        send({ type: 'sessionClosed', reason: 'upstream', code: e?.code });
                      },
                      onerror: (err: any) => {
                        console.error('[VOKASTA] Gemini Live error:', String(err?.message || err).slice(0, 200));
                        if (!setupDone) return fail(new Error(String(err?.message || 'live error')));
                        send({ type: 'error', code: 'upstream', message: 'Koneksi Gemini Live mengalami kendala.' });
                      },
                    },
                  });
                  connectP.then(
                    (sx: any) => {
                      // sambungan yang selesai setelah percobaan dinyatakan gagal harus ditutup
                      if (settled && !setupDone) {
                        try {
                          sx.close();
                        } catch {
                          // abaikan
                        }
                      }
                    },
                    () => {}
                  );
                  // SDK baru menyelesaikan connect setelah setupComplete, jadi penutupan dini harus memutus penantian
                  sess = await Promise.race([connectP, readyPromise.then(() => connectP)]);
                } catch (e) {
                  fail(e);
                }
                try {
                  await readyPromise;
                } catch (e) {
                  if (sess) {
                    try {
                      sess.close();
                    } catch {
                      // abaikan
                    }
                  }
                  throw e;
                }
                live = sess;
              })();
            try {
              await openSession('tuned');
            } catch (firstErr: any) {
              console.warn('[VOKASTA] Konfigurasi Live "tuned" gagal, mencoba konfigurasi dasar:', String(firstErr?.message || firstErr).slice(0, 160));
              if (live) {
                try {
                  live.close();
                } catch {
                  // abaikan
                }
                live = null;
              }
              try {
                configLevel = 'vad';
                await openSession('vad');
              } catch (secondErr: any) {
                console.warn('[VOKASTA] Konfigurasi Live "vad" gagal, memakai konfigurasi dasar:', String(secondErr?.message || secondErr).slice(0, 160));
                if (live) {
                  try {
                    live.close();
                  } catch {
                    // abaikan
                  }
                  live = null;
                }
                configLevel = 'basic';
                await openSession('basic');
              }
            }
            if (!live) throw new Error('session handle missing');
            initialized = true;
            maxTimer = setTimeout(() => {
              send({ type: 'sessionClosed', reason: 'max_duration' });
              cleanup('max_duration');
              clientWs.close();
            }, MAX_SESSION_MS);
            bumpIdle();
            console.log(`[VOKASTA] Sesi Live dimulai: ${scenario.id}, dialek ${dialectKey}, bahasa ${language}, suara ${voiceName}, konfigurasi ${configLevel}, aktif: ${activeSessions}`);
            send({ type: 'ready', max_seconds: Math.round(MAX_SESSION_MS / 1000) });
          } catch (e: any) {
            console.error('[VOKASTA] Gagal membuka sesi Live:', String(e?.message || e).slice(0, 200));
            send({ type: 'error', code: 'connect_failed', message: String(e?.message || 'Koneksi Live gagal dimulai.').slice(0, 160) });
            cleanup('connect_failed');
          }
          return;
        }

        if (!live || !initialized) return;

        if (data.type === 'audio' && typeof data.audio === 'string') {
          live.sendRealtimeInput({ audio: { data: data.audio, mimeType: 'audio/pcm;rate=16000' } });
        } else if (data.type === 'audioEnd') {
          live.sendRealtimeInput({ audioStreamEnd: true });
        } else if (data.type === 'text' && typeof data.text === 'string') {
          live.sendRealtimeInput({ text: cleanPersonaText(data.text, 400) });
        } else if (data.type === 'opening') {
          if (openingCount < 2) {
            openingCount += 1;
            live.sendRealtimeInput({ text: data.language === 'en' ? LIVE_OPENING_CUE_EN : LIVE_OPENING_CUE_ID });
          }
        } else if (data.type === 'twist') {
          live.sendRealtimeInput({ text: data.language === 'en' ? LIVE_TWIST_INSTRUCTION_EN : LIVE_TWIST_INSTRUCTION_ID });
        } else if (data.type === 'end') {
          cleanup('client_end');
          clientWs.close();
        }
      } catch (err: any) {
        console.error('[VOKASTA] Kesalahan pesan WS Live:', String(err?.message || err).slice(0, 160));
      }
    });

    clientWs.on('close', () => cleanup('client_close'));
    clientWs.on('error', () => cleanup('client_error'));
  });
}
