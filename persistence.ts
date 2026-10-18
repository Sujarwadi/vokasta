// VOKASTA: persistensi opsional ke Firestore melalui Firebase Admin SDK.
// Memori server tetap jalur utama. Firestore hanya cadangan tulis dan sumber pemulihan saat server restart.
// Aktif hanya jika ENABLE_FIRESTORE=true. Jika gagal, aplikasi tetap berjalan dari memori.

let db: any = null;
let ready = false;
let lastError: string | null = null;
const ENABLED = process.env.ENABLE_FIRESTORE === 'true';
const PREFIX = process.env.FIRESTORE_COLLECTION_PREFIX || 'vokasta';
const MAX_DOC_CHARS = 900_000;

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`timeout ${ms}ms`)), ms);
    p.then(
      (v) => { clearTimeout(t); resolve(v); },
      (e) => { clearTimeout(t); reject(e); }
    );
  });
}

export function persistenceStatus() {
  return { enabled: ENABLED, mode: ready ? 'firestore' : 'memory', last_error: lastError };
}

// Hanya untuk pengujian: menyuntikkan klien tiruan.
export function __setDbForTest(fake: any) {
  db = fake;
  ready = Boolean(fake);
}

export async function initPersistence(): Promise<void> {
  if (!ENABLED) return;
  try {
    const appMod: any = await import('firebase-admin/app');
    const fsMod: any = await import('firebase-admin/firestore');
    const initializeApp = appMod.initializeApp ?? appMod.default?.initializeApp;
    const getApps = appMod.getApps ?? appMod.default?.getApps;
    const getFirestore = fsMod.getFirestore ?? fsMod.default?.getFirestore;
    const app = getApps().length ? getApps()[0] : initializeApp();
    const firestore = getFirestore(app);
    firestore.settings({ ignoreUndefinedProperties: true });
    await withTimeout(
      firestore.collection(`${PREFIX}_meta`).doc('startup').set({ at: new Date().toISOString() }),
      8000
    );
    db = firestore;
    ready = true;
    lastError = null;
    console.log('[VOKASTA] Firestore aktif (persistensi cadangan).');
  } catch (e: any) {
    db = null;
    ready = false;
    lastError = String(e?.message || e).slice(0, 200);
    console.warn('[VOKASTA] Firestore tidak aktif, memakai memori saja:', lastError);
  }
}

export function persistDoc(collection: string, id: string, data: any): void {
  if (!ready || !db || !id) return;
  try {
    const plain = JSON.parse(JSON.stringify(data));
    plain._persisted_at = Date.now();
    if (JSON.stringify(plain).length > MAX_DOC_CHARS) {
      console.warn(`[VOKASTA] Dokumen ${collection}/${id} terlalu besar, dilewati.`);
      return;
    }
    Promise.resolve(db.collection(`${PREFIX}_${collection}`).doc(String(id)).set(plain)).catch((e: any) => {
      lastError = String(e?.message || e).slice(0, 200);
      console.warn(`[VOKASTA] Gagal menulis ${collection}/${id}:`, lastError);
    });
  } catch (e: any) {
    lastError = String(e?.message || e).slice(0, 200);
  }
}

export async function loadCollection(collection: string, limit = 300): Promise<any[]> {
  if (!ready || !db) return [];
  try {
    const snap: any = await withTimeout(
      db.collection(`${PREFIX}_${collection}`).orderBy('_persisted_at', 'desc').limit(limit).get(),
      8000
    );
    return snap.docs.map((d: any) => {
      const v = d.data();
      delete v._persisted_at;
      return v;
    });
  } catch (e: any) {
    lastError = String(e?.message || e).slice(0, 200);
    console.warn(`[VOKASTA] Gagal memuat ${collection}:`, lastError);
    return [];
  }
}
