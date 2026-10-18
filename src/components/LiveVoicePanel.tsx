import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, Mic, Send, Square, Volume2, Wifi, WifiOff } from 'lucide-react';
import { AudioStreamManager } from '../utils/audioStreamer';
import type { ConversationTurn } from '../data/interactionMode';

export interface LivePersonaProps {
  name: string;
  title: string;
  tag: string;
  stylePrompt: string;
  line: string;
  isFemale: boolean;
  voice: string;
  initials: string;
}

interface LiveVoicePanelProps {
  scenarioId: string;
  dialect: string;
  candidateGender: 'male' | 'female';
  pressureLevel: string;
  language: 'id' | 'en';
  persona: LivePersonaProps;
  enableTwist: boolean;
  minWorkerTurns: number;
  /** Dipanggil saat peserta menyelesaikan percakapan; berisi pembuka pelanggan dan seluruh giliran. */
  onFinish: (conversation: ConversationTurn[]) => void;
  /** Dipanggil bila koneksi live tidak dapat dipakai; giliran yang sudah ada ikut dibawa. */
  onUnavailable: (reason: string, turns: ConversationTurn[]) => void;
  onPlayOpening?: () => void;
}

type Status = 'connecting' | 'ready' | 'closed';
interface Bubble {
  id: string;
  role: 'customer' | 'worker';
  text: string;
}

let bubbleSeq = 0;
const nextId = () => `b${++bubbleSeq}`;

export default function LiveVoicePanel(props: LiveVoicePanelProps) {
  const { scenarioId, dialect, candidateGender, pressureLevel, language, persona, enableTwist, minWorkerTurns } = props;
  const en = language === 'en';

  const [status, setStatus] = useState<Status>('connecting');
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [pendingWorker, setPendingWorker] = useState('');
  const [pendingCustomer, setPendingCustomer] = useState('');
  const [micOn, setMicOn] = useState(false);
  const [inputVolume, setInputVolume] = useState(0);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [maxSeconds, setMaxSeconds] = useState(480);
  const [typed, setTyped] = useState('');
  const [wrapHint, setWrapHint] = useState(false);
  const [started, setStarted] = useState(false);
  const [openingStalled, setOpeningStalled] = useState(false);
  const startedRef = useRef(false);
  const gotCustomerRef = useRef(false);

  const wsRef = useRef<WebSocket | null>(null);
  const audioRef = useRef<AudioStreamManager | null>(null);
  const pendingWorkerRef = useRef('');
  const pendingCustomerRef = useRef('');
  const bubblesRef = useRef<Bubble[]>([]);
  const readyRef = useRef(false);
  const endedRef = useRef(false);
  const twistSentRef = useRef(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const propsRef = useRef(props);
  propsRef.current = props;

  const workerCount = bubbles.filter((b) => b.role === 'worker').length;

  const pushBubble = useCallback((role: 'customer' | 'worker', text: string) => {
    let clean = text.replace(/\s+/g, ' ').trim();
    if (role === 'worker') {
      // Transkrip kadang salah mendeteksi bahasa dan menghasilkan aksara asing; bagian itu dibuang dan diberi penanda
      const foreign = /[\u0400-\u04ff\u0600-\u06ff\u0900-\u097f\u0e00-\u0e7f\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]+/g;
      if (foreign.test(clean)) {
        const kept = clean.replace(foreign, ' ').replace(/\s+/g, ' ').trim();
        clean = kept.replace(/[^\p{L}]/gu, '').length >= 3 ? `${kept} [bagian ucapan tidak terbaca]` : '[ucapan tidak terbaca]';
      }
    }
    if (!clean) return;
    const b: Bubble = { id: nextId(), role, text: clean };
    bubblesRef.current = [...bubblesRef.current, b];
    setBubbles(bubblesRef.current);
    if (role === 'worker') {
      const n = bubblesRef.current.filter((x) => x.role === 'worker').length;
      if (n >= 3 && !twistSentRef.current && (enableTwist || pressureLevel === 'high_pressure')) {
        twistSentRef.current = true;
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: 'twist', language }));
        }
      }
    }
  }, [enableTwist, pressureLevel, language]);

  const commitWorker = useCallback(() => {
    const t = pendingWorkerRef.current.trim();
    if (t) pushBubble('worker', t);
    pendingWorkerRef.current = '';
    setPendingWorker('');
  }, [pushBubble]);

  const commitCustomer = useCallback(() => {
    const t = pendingCustomerRef.current.trim();
    if (t) {
      pushBubble('customer', t);
      if (/terima kasih|makasih|thank you|thanks/i.test(t) && bubblesRef.current.filter((x) => x.role === 'worker').length >= 3) {
        setWrapHint(true);
      }
    }
    pendingCustomerRef.current = '';
    setPendingCustomer('');
  }, [pushBubble]);

  const snapshotTurns = (): ConversationTurn[] => {
    const turns: ConversationTurn[] = bubblesRef.current.map((b) => ({ role: b.role, text: b.text }));
    return turns;
  };

  const stopMic = useCallback((sendEnd: boolean) => {
    audioRef.current?.stopRecording();
    setMicOn(false);
    setInputVolume(0);
    if (sendEnd && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'audioEnd' }));
    }
  }, []);

  // Sambungan WebSocket ke server Live
  useEffect(() => {
    endedRef.current = false;
    readyRef.current = false;
    const audio = new AudioStreamManager();
    audioRef.current = audio;
    let ping: ReturnType<typeof setInterval> | null = null;
    let openTimer: ReturnType<typeof setTimeout> | null = null;

    const fail = (reason: string) => {
      if (endedRef.current) return;
      endedRef.current = true;
      if (ping) clearInterval(ping);
      if (openTimer) clearTimeout(openTimer);
      stopMic(false);
      try {
        wsRef.current?.close();
      } catch {
        // abaikan
      }
      commitWorker();
      commitCustomer();
      if (readyRef.current) {
        setStatus('closed');
        setNotice(
          en
            ? 'The live connection ended. Your conversation so far is kept. You can finish and get assessed, or continue in typing mode.'
            : 'Koneksi live berakhir. Percakapan Anda sejauh ini tetap tersimpan. Anda bisa menyelesaikan dan meminta penilaian, atau melanjutkan dengan mode ketik.'
        );
      } else {
        propsRef.current.onUnavailable(reason, snapshotTurns());
      }
    };

    try {
      const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const ws = new WebSocket(`${proto}//${window.location.host}/api/live`);
      wsRef.current = ws;
      openTimer = setTimeout(() => {
        if (!readyRef.current) fail('timeout');
      }, 20000);

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: 'init',
            scenario_id: scenarioId,
            dialect,
            candidate_gender: candidateGender,
            pressure_level: pressureLevel,
            language,
            persona: {
              name: persona.name,
              title: persona.title,
              tag: persona.tag,
              stylePrompt: persona.stylePrompt,
              line: persona.line,
              isFemale: persona.isFemale,
              voice: persona.voice,
            },
          })
        );
        ping = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'ping' }));
        }, 12000);
      };

      ws.onmessage = async (ev) => {
        let msg: any;
        try {
          msg = JSON.parse(ev.data);
        } catch {
          return;
        }
        switch (msg.type) {
          case 'ready':
            readyRef.current = true;
            if (openTimer) clearTimeout(openTimer);
            if (typeof msg.max_seconds === 'number') setMaxSeconds(msg.max_seconds);
            setStatus('ready');
            break;
          case 'audio':
            // gelembung peserta dikunci lebih dulu agar urutan percakapan benar
            commitWorker();
            gotCustomerRef.current = true;
            setOpeningStalled(false);
            setAiSpeaking(true);
            audio.playAudioChunk(msg.audio, undefined, () => setAiSpeaking(false));
            break;
          case 'outputTranscription':
            commitWorker();
            gotCustomerRef.current = true;
            pendingCustomerRef.current += msg.text || '';
            setPendingCustomer(pendingCustomerRef.current);
            break;
          case 'inputTranscription':
            pendingWorkerRef.current += msg.text || '';
            setPendingWorker(pendingWorkerRef.current);
            break;
          case 'turnComplete':
            commitWorker();
            commitCustomer();
            break;
          case 'interrupted':
            audio.interruptPlayback();
            setAiSpeaking(false);
            commitCustomer();
            break;
          case 'sessionClosed':
            if (msg.reason === 'max_duration' || msg.reason === 'idle') endedRef.current = true;
            if (msg.reason === 'max_duration') {
              {
                setNotice(en ? 'The maximum session time has been reached. Please finish the conversation.' : 'Batas waktu sesi tercapai. Silakan selesaikan percakapan.');
                stopMic(false);
                commitWorker();
                commitCustomer();
                setStatus('closed');
              }
            } else if (msg.reason === 'idle') {
              setNotice(en ? 'The session was closed after a long silence.' : 'Sesi ditutup karena terlalu lama tidak ada aktivitas.');
              stopMic(false);
              setStatus('closed');
            } else {
              fail('upstream');
            }
            break;
          case 'error':
            if (!readyRef.current) fail(String(msg.code || 'error'));
            else setNotice(en ? 'The connection had a problem. If the customer stops answering, finish or switch to typing mode.' : 'Koneksi sempat bermasalah. Bila pelanggan berhenti menjawab, selesaikan atau pindah ke mode ketik.');
            break;
          default:
            break;
        }
      };

      ws.onerror = () => {
        if (!readyRef.current) fail('ws_error');
      };
      ws.onclose = () => {
        if (!endedRef.current && !readyRef.current) fail('ws_closed');
        else if (!endedRef.current && readyRef.current) fail('dropped');
      };
    } catch {
      fail('ws_exception');
    }

    return () => {
      endedRef.current = true;
      if (ping) clearInterval(ping);
      if (openTimer) clearTimeout(openTimer);
      try {
        if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.send(JSON.stringify({ type: 'end' }));
        wsRef.current?.close();
      } catch {
        // abaikan
      }
      audio.cleanup();
    };
    // sambungan hanya dibuat ulang bila komponen di-mount ulang (parent memakai key)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pewaktu sesi
  useEffect(() => {
    if (status !== 'ready') return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [status]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ block: 'nearest' });
  }, [bubbles, pendingWorker, pendingCustomer]);

  const startCall = async () => {
    if (status !== 'ready') return;
    setNotice(null);
    setOpeningStalled(false);
    await audioRef.current?.prime();
    startedRef.current = true;
    setStarted(true);
    if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.send(JSON.stringify({ type: 'opening', language }));
  };

  // Bila pelanggan tidak kunjung membuka percakapan, tawarkan kirim ulang
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => {
      if (!gotCustomerRef.current) setOpeningStalled(true);
    }, 10000);
    return () => clearTimeout(t);
  }, [started]);

  const toggleMic = async () => {
    setNotice(null);
    if (micOn) {
      stopMic(true);
      commitWorker();
      return;
    }
    if (status !== 'ready') return;
    // pelanggan yang sedang bicara dihentikan agar tidak terjadi gema
    audioRef.current?.interruptPlayback();
    setAiSpeaking(false);
    try {
      await audioRef.current!.startRecording(
        (chunk) => {
          if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.send(JSON.stringify({ type: 'audio', audio: chunk }));
        },
        (v) => setInputVolume(v)
      );
      setMicOn(true);
    } catch (e: any) {
      setMicOn(false);
      setNotice(
        en
          ? 'The microphone could not be opened. Allow microphone access in your browser, or type your response below.'
          : 'Mikrofon tidak dapat dibuka. Izinkan akses mikrofon di peramban Anda, atau ketik respons di kolom bawah.'
      );
    }
  };

  const sendTyped = () => {
    const t = typed.trim();
    if (!t || status !== 'ready' || wsRef.current?.readyState !== WebSocket.OPEN) return;
    commitWorker();
    pushBubble('worker', t);
    wsRef.current.send(JSON.stringify({ type: 'text', text: t }));
    setTyped('');
  };

  const finish = () => {
    stopMic(false);
    commitWorker();
    commitCustomer();
    endedRef.current = true;
    try {
      if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.send(JSON.stringify({ type: 'end' }));
      wsRef.current?.close();
    } catch {
      // abaikan
    }
    audioRef.current?.interruptPlayback();
    const turns = snapshotTurns();
    // Bila pelanggan Live sudah membuka percakapan, pakai ucapan aslinya; jika tidak, pakai kalimat pembuka skenario
    const conversation: ConversationTurn[] = turns[0]?.role === 'customer' ? turns : [{ role: 'customer', text: persona.line }, ...turns];
    props.onFinish(conversation);
  };

  const switchToTyping = () => {
    stopMic(false);
    commitWorker();
    commitCustomer();
    endedRef.current = true;
    try {
      wsRef.current?.close();
    } catch {
      // abaikan
    }
    props.onUnavailable('manual', snapshotTurns());
  };

  const mm = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const remaining = Math.max(0, maxSeconds - elapsed);
  const canFinish = workerCount >= minWorkerTurns;

  return (
    <div className="space-y-3" id="live-voice-panel">
      <div className="flex items-center justify-between gap-2 text-[11px]">
        <span
          id="live-status"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-semibold ${
            status === 'ready'
              ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300'
              : status === 'connecting'
              ? 'bg-slate-950 border-slate-700 text-slate-300'
              : 'bg-rose-950/50 border-rose-800/60 text-rose-300'
          }`}
        >
          {status === 'ready' ? <Wifi className="w-3 h-3" /> : status === 'connecting' ? <Loader2 className="w-3 h-3 animate-spin" /> : <WifiOff className="w-3 h-3" />}
          {status === 'ready'
            ? en ? 'Live voice connected' : 'Suara live terhubung'
            : status === 'connecting'
            ? en ? 'Connecting to the customer...' : 'Menghubungkan ke pelanggan...'
            : en ? 'Connection ended' : 'Koneksi berakhir'}
        </span>
        <span className="text-slate-400 font-mono" id="live-timer">
          {status === 'ready' ? `${mm(elapsed)} / ${mm(maxSeconds)}` : ''}
        </span>
      </div>

      <div id="conversation-log" className="rounded-xl bg-slate-950 border border-slate-800 p-3 space-y-2.5 max-h-80 overflow-y-auto">
        {!started && (
          <div className="flex items-start gap-2" id="live-opening-preview">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0">
              {persona.initials || 'PL'}
            </div>
            <div className="max-w-[88%] rounded-xl rounded-tl-sm bg-slate-900 border border-slate-800 px-3 py-2 text-xs sm:text-sm text-slate-100 leading-relaxed break-words">
              <div className="text-[10px] text-amber-300 font-semibold mb-0.5">{persona.name}</div>
              <span className="italic">"{persona.line}"</span>
              <div className="text-[10px] text-slate-500 mt-1 not-italic">
                {en ? 'The customer will say this when you start the call (wording may vary slightly).' : 'Pelanggan akan mengucapkan ini saat Anda memulai percakapan (susunan kata bisa sedikit berbeda).'}
              </div>
            </div>
          </div>
        )}

        {bubbles.map((b, i) =>
          b.role === 'worker' ? (
            <div key={b.id} className="flex justify-end" id={`turn-worker-${bubbles.slice(0, i + 1).filter((x) => x.role === 'worker').length}`}>
              <div className="max-w-[88%] rounded-xl rounded-tr-sm bg-amber-500/15 border border-amber-500/40 px-3 py-2 text-xs sm:text-sm text-amber-50 leading-relaxed break-words">
                <div className="text-[10px] text-amber-300 font-semibold mb-0.5">{en ? 'You' : 'Anda'}</div>
                {b.text}
              </div>
            </div>
          ) : (
            <div key={b.id} className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                {persona.initials || 'PL'}
              </div>
              <div className="max-w-[88%] rounded-xl rounded-tl-sm bg-slate-900 border border-slate-800 px-3 py-2 text-xs sm:text-sm text-slate-100 leading-relaxed break-words">
                <div className="text-[10px] text-amber-300 font-semibold mb-0.5">{persona.name}</div>
                <span className="italic">"{b.text}"</span>
              </div>
            </div>
          )
        )}

        {pendingWorker && (
          <div className="flex justify-end opacity-70">
            <div id="dictation-live" className="max-w-[88%] rounded-xl rounded-tr-sm border border-dashed border-amber-500/40 px-3 py-2 text-xs text-amber-100 break-words">
              {en ? 'Heard: ' : 'Terdengar: '}
              {pendingWorker}
            </div>
          </div>
        )}
        {pendingCustomer && (
          <div className="flex items-start gap-2 opacity-80">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0">
              {persona.initials || 'PL'}
            </div>
            <div className="max-w-[88%] rounded-xl rounded-tl-sm bg-slate-900 border border-dashed border-slate-700 px-3 py-2 text-xs sm:text-sm text-slate-200 italic break-words">
              "{pendingCustomer}"
            </div>
          </div>
        )}
        {aiSpeaking && !pendingCustomer && (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Volume2 className="w-3.5 h-3.5 text-amber-400" /> {en ? 'The customer is speaking...' : 'Pelanggan sedang berbicara...'}
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="flex flex-col gap-2">
        {!started && (
          <button
            type="button"
            id="live-start-btn"
            onClick={startCall}
            disabled={status !== 'ready'}
            className="min-h-[56px] px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <Volume2 className="w-5 h-5" />
            <span>{status === 'ready' ? (en ? 'Start conversation (customer speaks first)' : 'Mulai percakapan (pelanggan bicara lebih dulu)') : en ? 'Connecting...' : 'Menghubungkan...'}</span>
          </button>
        )}
        {started && openingStalled && (
          <button
            type="button"
            id="live-restart-opening-btn"
            onClick={startCall}
            className="min-h-[44px] px-4 py-2 rounded-xl font-semibold text-xs bg-slate-950 border border-amber-500/50 text-amber-200 cursor-pointer"
          >
            {en ? 'The customer has not spoken yet. Tap to ask them to start again' : 'Pelanggan belum bicara. Ketuk untuk meminta mereka memulai lagi'}
          </button>
        )}
        <button
          type="button"
          id="live-mic-btn"
          onClick={toggleMic}
          disabled={status !== 'ready' || !started}
          aria-pressed={micOn}
          className={`min-h-[56px] px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition cursor-pointer border disabled:opacity-50 disabled:cursor-not-allowed ${
            micOn ? 'bg-rose-600 hover:bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/20' : 'bg-slate-950 hover:bg-slate-900 text-white border-slate-700'
          }`}
        >
          {micOn ? <Square className="w-4 h-4 fill-current" /> : <Mic className="w-5 h-5 text-amber-400" />}
          <span>
            {micOn
              ? en ? 'Microphone ACTIVE. Press again when you are done speaking' : 'Mikrofon AKTIF. Tekan lagi bila sudah selesai bicara'
              : en ? 'Press to speak (Microphone)' : 'Tekan untuk bicara (Mikrofon)'}
          </span>
        </button>
        {micOn && (
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700" aria-hidden="true">
            <div id="live-input-level" className="h-full bg-emerald-400 transition-all duration-100" style={{ width: `${Math.min(100, Math.round(inputVolume * 100))}%` }} />
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendTyped();
            }}
            disabled={status !== 'ready' || !started}
            placeholder={en ? 'Or type what you would say...' : 'Atau ketik apa yang ingin Anda katakan...'}
            className="flex-1 min-h-[44px] px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={sendTyped}
            disabled={status !== 'ready' || !started || !typed.trim()}
            className="min-h-[44px] px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{en ? 'Send' : 'Kirim'}</span>
          </button>
        </div>
      </div>

      {(notice || wrapHint) && (
        <div role="status" className="p-2.5 rounded-lg bg-slate-950 border border-amber-500/40 text-[11px] text-amber-200 space-y-1">
          {notice && <p>{notice}</p>}
          {wrapHint && <p>{en ? 'The customer sounds ready to wrap up. You can finish and get assessed now.' : 'Pelanggan terdengar siap menutup percakapan. Anda bisa menyelesaikan dan meminta penilaian sekarang.'}</p>}
        </div>
      )}
      {status === 'ready' && remaining <= 60 && (
        <p className="text-[11px] text-rose-300">{en ? `Session ends in ${remaining} seconds.` : `Sesi berakhir dalam ${remaining} detik.`}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <button
          type="button"
          id="finish-conversation-btn"
          onClick={finish}
          disabled={!canFinish}
          className={`min-h-[48px] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md disabled:cursor-not-allowed flex-1 ${
            canFinish ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20' : 'bg-slate-800 text-slate-500'
          } disabled:opacity-70`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>
            {en ? `Finish & Assess Conversation (${workerCount}/${minWorkerTurns} minimum)` : `Selesai dan Nilai Percakapan (${workerCount}/${minWorkerTurns} minimal)`}
          </span>
        </button>
        <button
          type="button"
          onClick={switchToTyping}
          className="min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{en ? 'Use typing/dictation mode' : 'Pakai mode ketik atau dikte'}</span>
        </button>
      </div>

      <p className="text-[10px] text-slate-500 leading-relaxed">
        {en
          ? 'Live voice: the customer answers in real time and can be interrupted. Your microphone audio is streamed to Google Gemini during the session and transcribed there. The app server does not store the audio, but the transcript and results are stored in Cloud Firestore. The microphone only opens and closes when you press the button. Use headphones to avoid echo.'
          : 'Suara live: pelanggan menjawab real-time dan dapat dipotong. Audio mikrofon Anda dialirkan ke Google Gemini selama sesi dan ditranskripsi di sana. Server aplikasi tidak menyimpan audionya, tetapi transkrip dan hasil disimpan di Cloud Firestore. Mikrofon hanya terbuka dan tertutup saat Anda menekan tombol. Gunakan headset agar tidak ada gema.'}
      </p>
    </div>
  );
}
