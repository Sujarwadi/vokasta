# VOKASTA

Simulator kompetensi untuk pekerja garis depan, dengan pelanggan AI yang berbicara secara langsung.

Peserta (pencari kerja vokasi atau karyawan gerai) berlatih menghadapi pelanggan AI melalui suara dua arah, lalu menerima penilaian per parameter rubrik, bukti kutipan dari ucapannya sendiri, dan kalimat acuan yang seharusnya diucapkan.

> **Google Cloud AI Builder Cup 2026.** Tantangan: Sustainability & Social Impact.
> **Prototipe (Cloud Run, asia-southeast2):** https://vokasta-688299225182.asia-southeast2.run.app
> **Pembuat:** Sujarwadi (Founder dan Lead Architect)

**English summary.** VOKASTA is a frontline competency simulator. Learners speak live with a natural-sounding AI customer (Bahasa Indonesia with regional dialects, or English for foreign tourists), and receive a rubric-based assessment with quoted evidence, model sentences to say, and an AI coach drill. It runs on Google Cloud Run with Gemini multimodal, the Gemini Live API and Cloud Firestore.

## Masalah yang dijawab

Lulusan vokasi dan pekerja baru di gerai ritel, makanan dan minuman, serta otomotif sulit membuktikan kemampuan pelayanan mereka secara objektif, dan pelatihan yang ada cenderung pasif. VOKASTA memberi ruang berlatih tanpa risiko, kapan saja, dengan umpan balik yang konkret dan konsisten.

## Fitur yang sudah berjalan

- **Percakapan suara dua arah** dengan pelanggan AI melalui Gemini Live API. Suara dan emosi pelanggan menyesuaikan perilaku peserta, dan pelanggan dapat disela.
- **Dialek daerah** (10 profil) untuk latihan Bahasa Indonesia, dan **latihan Bahasa Inggris** dengan pelanggan turis atau ekspatriat.
- **Penilaian per parameter rubrik** oleh Gemini, dengan kutipan ucapan peserta sebagai bukti, serta **kalimat acuan** yang seharusnya diucapkan, kekuatan, dan rekomendasi.
- **Drill AI Coach**: latihan ulang per parameter berdasarkan ucapan pelanggan yang sebenarnya, dengan umpan balik spesifik. Skor latihan tidak mengubah hasil resmi.
- **Mode video** untuk kompetensi yang membutuhkan peragaan fisik (penilaian multimodal Gemini).
- **Paspor kompetensi**: data kredensial mengikuti model data Open Badges 3.0.
- **Mode ketik atau dikte** sebagai cadangan otomatis bila suara langsung tidak tersedia.

## Layanan Google yang dipakai

| Layanan | Peran |
|---|---|
| Cloud Run | Menjalankan aplikasi (Node.js, Express, React) di asia-southeast2 |
| Gemini (multimodal) | Menilai video dan transkrip percakapan, serta melatih lewat AI Coach |
| Gemini Live API | Percakapan suara dua arah dengan pelanggan AI |
| Cloud Firestore (melalui Firebase Admin SDK) | Menyimpan transkrip dan hasil penilaian (opsional, `ENABLE_FIRESTORE=true`) |

## Arsitektur singkat

Satu kontainer. Peramban mengalirkan audio mikrofon (PCM 16 kHz) ke server melalui WebSocket `/api/live`. Server meneruskannya ke Gemini Live dan mengembalikan audio pelanggan (PCM 24 kHz) beserta transkrip. Saat sesi selesai, transkrip dikirim ke `/api/assess` untuk dinilai Gemini terhadap rubrik skenario.

## Menjalankan secara lokal

Prasyarat: Node.js 22 dan kunci API Gemini.

```bash
npm ci
cp .env.example .env   # isi GEMINI_API_KEY
npm run build
GEMINI_API_KEY=... node dist/server.cjs
```

Variabel lingkungan utama: `GEMINI_API_KEY` (wajib), `PORT`, `LIVE_MODEL` (bawaan `gemini-3.8-live`), `LIVE_MAX_CONCURRENT`, `LIVE_MAX_MINUTES`, `ENABLE_FIRESTORE`.

## Deploy ke Cloud Run

```bash
gcloud run deploy vokasta --source . --region asia-southeast2 \
  --allow-unauthenticated --min-instances 1 --max-instances 1 \
  --memory 2Gi --timeout 900
```

`--timeout 900` diperlukan agar sambungan WebSocket percakapan suara tidak terputus terlalu cepat. Atur `GEMINI_API_KEY` melalui variabel lingkungan atau Secret Manager.

## Batasan yang kami nyatakan secara jujur

- Kredensial mengikuti **model data** Open Badges 3.0, tetapi contoh yang dihasilkan **belum bertanda tangan digital**.
- Dasbor manajer dan perhitungan ROI bersifat **ilustratif**, bukan data operasional nyata.
- Profil dialek adalah kemampuan desain. **Keadilan penilaian lintas dialek belum divalidasi** secara empiris.
- Server aplikasi **tidak menyimpan rekaman**. Transkrip dan hasil disimpan di Cloud Firestore (bila diaktifkan). Audio mikrofon **dialirkan ke Google Gemini selama sesi suara**; kebijakan retensi di sisi Google tidak kami klaim.
- Kunci bahasa pelanggan AI dilakukan melalui instruksi sistem, dan transkripsi ucapan otomatis dapat keliru. Bagian yang tidak terbaca ditandai dan tidak dihukum dalam penilaian.
- Mode offline atau bandwidth rendah, serta integrasi HRIS, masih berupa peta jalan atau simulasi.
- Uji coba internal pembuat bukan validasi pengguna.

## Lisensi

MIT. Lihat berkas [LICENSE](LICENSE).
