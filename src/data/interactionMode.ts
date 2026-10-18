import type { Scenario } from '../types';

// Mode interaksi penilaian per skenario.
// voice : percakapan suara dua arah dengan pelanggan AI (skrip wajib, salam, penanganan keluhan, penjualan).
// video : rekaman video, untuk kompetensi yang butuh gerakan atau peragaan fisik.
export type InteractionMode = 'voice' | 'video';

// Skenario yang rubriknya memerlukan peragaan gerakan atau bahasa tubuh.
export const VIDEO_SCENARIO_IDS: string[] = [
  'scen_ratio_02', // resep signature barista: takaran, higienitas meja seduh, penyerahan
  'scen_fashion_cashier_packaging', // pengemasan kado: melipat, menata, kartu ucapan
  'scen_jobseeker_hospitality_basic', // rubrik menilai kontak mata dan bahasa tubuh terbuka
];

export function getInteractionMode(s: Pick<Scenario, 'id' | 'is_custom'>): InteractionMode {
  if (VIDEO_SCENARIO_IDS.includes(s.id)) return 'video';
  // SOP kustom dari SOP Studio tetap memakai alur video seperti sebelumnya.
  if (s.is_custom) return 'video';
  return 'voice';
}

export interface ConversationTurn {
  role: 'customer' | 'worker';
  text: string;
}

export const MAX_CONVERSATION_TURNS = 24;
export const MAX_TURN_CHARS = 600;

// Pembersihan masukan percakapan (dipakai klien dan server).
export function sanitizeConversation(input: unknown): ConversationTurn[] {
  if (!Array.isArray(input)) return [];
  const out: ConversationTurn[] = [];
  for (const raw of input.slice(-MAX_CONVERSATION_TURNS)) {
    if (!raw || typeof raw !== 'object') continue;
    const role = (raw as any).role === 'customer' ? 'customer' : (raw as any).role === 'worker' ? 'worker' : null;
    const text = typeof (raw as any).text === 'string' ? (raw as any).text.replace(/\s+/g, ' ').trim().slice(0, MAX_TURN_CHARS) : '';
    if (role && text) out.push({ role, text });
  }
  return out;
}
