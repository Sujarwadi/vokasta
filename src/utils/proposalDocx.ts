import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType,
  convertInchesToTwip,
  Header,
  Footer,
  PageNumber,
} from 'docx';

export function buildProposalDocument(): Document {
  const tableBorder = {
    top: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
    left: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
    right: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
  };

  const cellMargins = {
    top: 140,
    bottom: 140,
    left: 180,
    right: 180,
  };

  return new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 22, // 11pt
            color: '2D3748',
          },
          paragraph: {
            spacing: {
              line: 340,
              after: 140,
            },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1),
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Vokasta • Proposal Strategis & Cetak Biru Implementasi 2026',
                    size: 16,
                    color: '718096',
                    italics: true,
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Vokasta • Inovasi Google Cloud AI Builder Cup 2026 • Halaman ',
                    size: 16,
                    color: '718096',
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT, ' dari ', PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: '718096',
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // =========================================================================
          // COVER PAGE
          // =========================================================================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'PROPOSAL PENGEMBANGAN TEKNOLOGI STRATEGIS & CETAK BIRU IMPLEMENTASI',
                size: 20,
                bold: true,
                color: '4A5568',
                allCaps: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 260 },
            children: [
              new TextRun({
                text: 'GOOGLE CLOUD AI BUILDER CUP 2026',
                size: 26,
                bold: true,
                color: '1E40AF',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 100 },
            children: [
              new TextRun({
                text: 'Vokasta',
                size: 60,
                bold: true,
                color: '0D9488',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: 'Multimodal Operational Roleplay Simulator & Frontline Credential Network',
                size: 24,
                bold: true,
                color: '1A202C',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 320 },
            children: [
              new TextRun({
                text: 'Platform Simulasi Interaktif Berbasis AI dan Paspor Kredensial Mandiri untuk Meningkatkan Kesiapan Kerja Tenaga Garis Depan Secara Efisien dan Terstandarisasi',
                size: 20,
                italics: true,
                color: '4A5568',
              }),
            ],
          }),

          // Metadata Table
          new Table({
            columnWidths: [3200, 6000],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
                    width: { size: 3200, type: WidthType.DXA },
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Kategori Inovasi', bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 6000, type: WidthType.DXA },
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [new Paragraph({ text: 'Enterprise Productivity, AI for Practical Impact & Human Capital Enablement' })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
                    width: { size: 3200, type: WidthType.DXA },
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Target Sektor Utama', bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 6000, type: WidthType.DXA },
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [new Paragraph({ text: 'Ritel Modern, Restoran Cepat Saji (QSR), F&B, Perhotelan, Logistik & Layanan Operasional' })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
                    width: { size: 3200, type: WidthType.DXA },
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Teknologi Utama', bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 6000, type: WidthType.DXA },
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [new Paragraph({ text: 'Google Gemini Multimodal AI (Live Audio-Visual Processing, Structured JSON Feedback)' })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
                    width: { size: 3200, type: WidthType.DXA },
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Standar Kredensial', bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 6000, type: WidthType.DXA },
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [new Paragraph({ text: '1EdTech Open Badges v3.0, W3C Verifiable Credentials & mengacu pada SKKNI sebagai rujukan (rencana penyelarasan, belum diverifikasi lembaga sertifikasi)' })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
                    width: { size: 3200, type: WidthType.DXA },
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Penyusun & Inovator', bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 6000, type: WidthType.DXA },
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [new Paragraph({ text: 'Sujarwadi (sujarwadi84@gmail.com) • Praktisi Pembelajaran & Pengembangan (L&D) & Psikologi Organisasi' })],
                  }),
                ],
              }),
            ],
          }),

          // =========================================================================
          // DAFTAR ISI (TABLE OF CONTENTS)
          // =========================================================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 140 },
            children: [new TextRun({ text: 'DAFTAR ISI (TABLE OF CONTENTS)', bold: true, color: '0D9488' })],
          }),
          new Table({
            columnWidths: [1800, 7400],
            rows: [
              new TableRow({
                children: [
                  new TableCell({ shading: { fill: 'F8FAFC', type: ShadingType.CLEAR }, borders: tableBorder, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: 'Bagian', bold: true })] })] }),
                  new TableCell({ shading: { fill: 'F8FAFC', type: ShadingType.CLEAR }, borders: tableBorder, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: 'Uraian Isi Dokumen', bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'RINGKASAN' })] }),
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Ringkasan Eksekutif: Tantangan Operasional & Nilai Inti Solusi' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'PROFIL' })] }),
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Tentang Pengusul: Perspektif Praktisi Pembelajaran (L&D) & Psikologi Organisasi' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'BAB I' })] }),
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Visi, Misi, dan Prinsip Dasar Pengembangan Vokasta' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'BAB II' })] }),
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Fondasi Teoretis & Riset Ketenagakerjaan (Bloom 2-Sigma, Neurobiologi Stres, Sweller, McKinsey)' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'BAB III' })] }),
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Realitas di Lapangan & Masalah Mendasar Operasional (Jam Sibuk Kasir, Beban Kepala Toko)' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'BAB IV' })] }),
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Solusi Operasional & Katalog Fitur Lengkap Vokasta' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'BAB V' })] }),
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Analisis Nilai Guna bagi Setiap Pengguna (Pekerja, Pemilik Usaha, & Pendidikan Vokasi)' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'BAB VI' })] }),
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Cetak Biru Implementasi & Tahapan Milestone Realistis (Fase 1 Gerai, Fase 2 Vokasi, Fase 3 Regional)' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'BAB VII' })] }),
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Kelayakan Teknologi & Mitigasi Kendala di Lapangan (Latensi, PWA RAM 2GB, Keberagaman Aksen)' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'BAB VIII' })] }),
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Analisis Kelayakan Finansial & Proyeksi Efisiensi Gerai (Simulasi 50 Gerai, ROI 125,7%)' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'BAB IX' })] }),
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Kesimpulan & Komitmen Kolaborasi Strategis' })] }),
                ],
              }),
            ],
          }),

          // =========================================================================
          // RINGKASAN EKSEKUTIF
          // =========================================================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 140 },
            children: [new TextRun({ text: 'RINGKASAN EKSEKUTIF', bold: true, color: '0D9488' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Sektor ritel modern, restoran cepat saji, perhotelan, dan logistik merupakan tulang punggung ekonomi yang menyerap jutaan tenaga kerja muda di Indonesia. Di tengah ekspansi jaringan cabang gerai, para pemilik usaha dan pengelola operasional menghadapi dua tantangan klasik yang terus berulang setiap bulan: tingginya angka pengunduran diri staf baru dalam 30 sampai 90 hari pertama kerja, serta besarnya beban waktu yang harus dihabiskan kepala toko untuk mendampingi staf baru secara manual.',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Karyawan baru di garis depan kerap mengalami kecemasan hebat ketika pertama kali berhadapan langsung dengan pelanggan di jam sibuk toko. Antrean kasir yang padat, mesin EDC yang mengalami keterlambatan jaringan, selisih harga rak dengan komputer kasir, atau pembeli yang menaikkan nada suara sering memicu kepanikan. Selama ini perusahaan membekali staf dengan buku saku SOP dan materi video presentasi. Namun, keterampilan melayani pelanggan dalam situasi tertekan membutuhkan memori prosedural dan ketenangan vokal, bukan sekadar hafalan teori yang diuji melalui kuis pilihan ganda.',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Vokasta hadir sebagai solusi operasional yang membumi dan dapat segera diterapkan. Memanfaatkan kecerdasan buatan multimodal Google Gemini, Vokasta mengubah kamera ponsel pintar yang dimiliki setiap pekerja menjadi rekan latihan simulasi interaktif. Pekerja dapat berlatih menangani berbagai skenario komplain pelanggan dan transaksi kasir secara mandiri selama 60 hingga 90 detik per sesi sebelum gerai dibuka. Sistem memberikan umpan balik instan mengenai ketepatan kalimat, intonasi suara, dan bahasa tubuh, lengkap dengan contoh kalimat perbaikan yang dapat langsung diulang. Pendekatan ini memangkas waktu pendampingan kepala toko dari 14 hari menjadi 3 hari kerja, menekan turnover staf baru, dan menerbitkan paspor kompetensi digital berstandar terbuka bagi pekerja.',
              }),
            ],
          }),

          // =========================================================================
          // TENTANG PENGUSUL
          // =========================================================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 140 },
            children: [new TextRun({ text: 'TENTANG PENGUSUL: PERSPEKTIF PRAKTISI PEMBELAJARAN & PSIKOLOGI ORGANISASI', bold: true, color: '0D9488' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Gagasan membangun Vokasta tidak lahir dari ruang hampa atau sekadar ketertarikan sesaat terhadap tren kecerdasan artifisial. Ide ini berakar kuat dari pengalaman bertahun-tahun saya, Sujarwadi, sebagai praktisi di bidang Pembelajaran dan Pengembangan Karyawan (Learning and Development) serta pemerhati Psikologi Organisasi.',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Sepanjang perjalanan karier profesional, saya mendampingi berbagai organisasi dalam merancang kurikulum pelatihan kerja, mengamati proses orientasi karyawan di lantai gerai, dan berdialog secara langsung dengan ratusan kasir, pramusaji, kepala toko, serta pimpinan HRD. Dalam pengamatan tersebut, saya menyaksikan sebuah paradoks yang menyedihkan dan terus berulang:',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Seorang anak muda lulusan SMK berusia 19 tahun diterima bekerja di sebuah jaringan ritel. Dua hari pertama ia duduk rapi di ruang kelas pelatihan, membaca buku saku SOP pelayanan setebal puluhan halaman, dan lulus ujian tertulis dengan skor memuaskan di atas 90 persen. Secara data administrasi, ia dinyatakan siap bekerja. Namun pada hari ketiga, saat ia ditempatkan di meja kasir jam enam sore ketika antrean pelanggan memanjang dan mesin pembayaran mengalami gangguan koneksi, pelanggan di hadapannya mulai memprotes dengan nada tinggi. Anak tersebut langsung membeku. Jantungnya berdegup kencang, tangannya gemetar hebat, suaranya tercekat, dan ia lupa seluruh urutan tombol pembatalan transaksi di layar kasir. Dua pekan kemudian, ia memilih berhenti bekerja karena merasa trauma dan tidak sanggup menanggung rasa bersalah.',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Peristiwa semacam ini bukanlah cerminan dari karakter generasi muda yang lemah atau tidak berdaya juang. Dari sudut pandang ilmu psikologi dan desain pembelajaran, kegagalan tersebut murni disebabkan oleh kesenjangan metode. Kita terbiasa melatih kemampuan motorik dan afektif yang membutuhkan ketenangan mental tingkat tinggi hanya dengan menggunakan metode kognitif pasif seperti membaca teks atau menonton video presentasi. Pemahaman mendalam mengenai psikologi manusia di bawah tekanan, dinamika operasional di lantai gerai, serta keterbatasan nyata yang dihadapi para manajer bisnis inilah yang memandu saya merancang Vokasta.',
              }),
            ],
          }),

          // =========================================================================
          // BAB I: VISI, MISI, DAN PRINSIP DASAR PENGEMBANGAN
          // =========================================================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 140 },
            children: [new TextRun({ text: 'BAB I: VISI, MISI, DAN PRINSIP DASAR PENGEMBANGAN', bold: true, color: '0D9488' })],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '1.1 Visi Jangka Panjang', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            shading: { fill: 'F0FDFA', type: ShadingType.CLEAR },
            spacing: { before: 60, after: 120 },
            children: [
              new TextRun({
                text: '"Menjadi platform simulasi operasional interaktif dan paspor kompetensi terpercaya yang menjembatani kesiapan kerja tenaga garis depan dengan kebutuhan nyata industri secara inklusif, terukur, dan bermartabat."',
                italics: true,
                bold: true,
                color: '0F766E',
              }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '1.2 Misi Strategis', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. Menyediakan Sarana Latihan Simulasi yang Mudah Dijangkau: ', bold: true }),
              new TextRun({ text: 'Menghadirkan sarana roleplay interaktif melalui peramban ponsel pintar standar tanpa membebani pekerja maupun perusahaan dengan biaya perangkat keras mahal.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '2. Meningkatkan Efisiensi Operasional Gerai: ', bold: true }),
              new TextRun({ text: 'Membantu pemilik usaha dan kepala toko menstandardisasi layanan pelanggan, memangkas durasi pendampingan manual, dan menekan angka pergantian staf baru.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '3. Penilaian Berbasis Bukti: ', bold: true }),
              new TextRun({ text: 'Mengembangkan mesin evaluasi multimodal berbasis Google Gemini yang mengevaluasi kecakapan berdasarkan tindakan dan ucapan riil, terfokus pada pesan inti SOP, kesantunan, dan kepatuhan prosedur operasional.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '4. Menerbitkan Kredensial Kompetensi Portabel: ', bold: true }),
              new TextRun({ text: 'Menerbitkan paspor kompetensi digital berstandar terbuka (Open Badges v3.0) yang dimiliki langsung oleh pekerja di ponsel mereka untuk mendukung mobilitas karier yang sehat.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '5. Menjembatani Pendidikan Vokasi dengan Kebutuhan Industri: ', bold: true }),
              new TextRun({ text: 'Berkolaborasi dengan SMK dan BLK agar kurikulum praktik di sekolah mengacu pada SKKNI sebagai rujukan (rencana penyelarasan, belum diverifikasi lembaga sertifikasi).' }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '1.3 Prinsip Kemitraan dan Etika Kolaborasi', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Vokasta berpegang teguh pada prinsip penghargaan terhadap sistem yang telah berjalan. Kami menghormati kerja keras tim manajemen toko dan praktisi HR yang setiap hari menjaga jalannya operasional bisnis di tengah keterbatasan waktu harian. Vokasta hadir sebagai asisten digital yang meringankan tugas repetitif mereka, bukan sebagai pihak yang menghakimi. Begitu juga bagi para guru SMK dan instruktur pelatihan, Vokasta menyediakan sarana laboratorium gerai virtual yang terjangkau agar siswa binaan mereka semakin percaya diri saat lulus.',
              }),
            ],
          }),

          // =========================================================================
          // BAB II: FONDASI TEORETIS DAN RISET KETENAGAKERJAAN
          // =========================================================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 140 },
            children: [new TextRun({ text: 'BAB II: FONDASI TEORETIS DAN RISET KETENAGAKERJAAN', bold: true, color: '0D9488' })],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '2.1 Paradoks Bloom Two Sigma Problem dalam Pelatihan Garis Depan', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Pada tahun 1984, psikolog pendidikan Benjamin Bloom mempublikasikan temuan riset monumental mengenai The Two Sigma Problem. Bloom membuktikan bahwa siswa yang diajar melalui bimbingan pribadi satu per satu (one-on-one tutoring) bersamaan dengan penguasaan bertahap (mastery learning) menunjukkan peningkatan performa belajar sebesar dua standar deviasi (2-Sigma) melampaui siswa yang belajar di kelas konvensional dengan rasio satu guru untuk tiga puluh siswa.',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Dalam konteks operasional bisnis, bimbingan satu per satu ini diwujudkan melalui proses pendampingan kerja langsung (job shadowing) oleh kepala toko. Namun, menugaskan seorang mentor berdedikasi penuh untuk setiap kasir baru adalah hal yang mustahil secara finansial dan waktu. Akibatnya, perusahaan terpaksa mengorbankan kualitas bimbingan dengan kembali ke metode kelas massal atau membaca modul teks mandiri. Vokasta memecahkan paradoks ini dengan memanfaatkan agen AI cerdas berbasis Google Gemini yang bertindak sebagai tutor privat tanpa lelah yang mendampingi setiap karyawan berlatih secara interaktif kapan pun dibutuhkan.',
              }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '2.2 Neurobiologi Stres dan Stress Inoculation Training di Meja Kasir', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Penelitian neurosains oleh Joseph LeDoux dan Robert Sapolsky menjelaskan bahwa ketika manusia menghadapi ancaman sosial atau agresi verbal (seperti pembeli yang berteriak marah di depan antrean kasir), bagian otak amigdala langsung memicu respons bertahan hidup (amygdala hijack). Aliran energi kognitif dialihkan menjauhi prefrontal cortex yang bertanggung jawab atas penalaran sadar dan ingatan logis.',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Dalam kondisi kepanikan tersebut, pekerja tidak memiliki akses kognitif ke memori deklaratif (seperti mengingat kembali isi pasal SOP yang dibaca dua hari lalu). Yang dapat bekerja hanyalah memori prosedural dan refleks vokal yang telah dilatih berulang kali. Untuk membangun ketahanan tersebut, Vokasta mengadopsi protokol Stress Inoculation Training (SIT) yang dikembangkan oleh psikolog Donald Meichenbaum (1985). Model ini memaparkan pekerja pada simulasi pelanggan virtual yang menuntut atau kesal di layar ponsel dalam lingkungan yang aman, sehingga jalur saraf de-eskalasi emosi terbentuk menjadi kebiasaan refleks yang tenang.',
              }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '2.3 Cognitive Load Theory: Mengapa Buku Saku Gagal di Saat Kritis', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Menurut Cognitive Load Theory yang dirumuskan oleh John Sweller, kapasitas memori kerja (working memory) manusia sangat terbatas. Ketika kasir baru yang belum berpengalaman harus menekan tombol kasir, mengingat kode promosi barang, dan memikirkan kata-kata penenang pelanggan sekaligus, terjadi kelebihan beban kognitif (cognitive overload). Pelatihan berbasis modul tebal setebal puluhan halaman justru memperparah beban kognitif tersebut. Vokasta menerapkan prinsip micro-learning yang membagi skenario pelayanan menjadi unit-unit latihan ringkas berdurasi 60 sampai 90 detik yang berfokus pada satu titik kritis spesifik.',
              }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '2.4 Data Industri: Turnover Awal dan Beban Finansial Perusahaan', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Riset McKinsey and Company (2022) mengungkapkan bahwa tingkat perputaran karyawan di industri ritel dan restoran cepat saji berkisar antara 60 hingga 100 persen per tahun, dengan porsi terbesar terjadi pada 90 hari pertama masa kerja. Survei Gartner dan Corporate Executive Board mencatat bahwa 70 persen pengunduran diri dini dipicu oleh ambiguitas peran dan kecemasan akut akibat ketidaksiapan menghadapi situasi lapangan riil. Di Indonesia, data BPS mencatat lulusan SMK menyumbang pengangguran terbuka yang cukup tinggi bukan karena minimnya lowongan, melainkan adanya kesenjangan ketangkasan kerja langsung pakai (readiness gap).',
              }),
            ],
          }),

          // =========================================================================
          // BAB III: REALITAS DI LAPANGAN DAN MASALAH MENDASAR OPERASIONAL
          // =========================================================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 140 },
            children: [new TextRun({ text: 'BAB III: REALITAS DI LAPANGAN DAN MASALAH MENDASAR OPERASIONAL', bold: true, color: '0D9488' })],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '3.1 Jam Sibuk di Meja Kasir: Titik Temu Tekanan Pelanggan dan Prosedur', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Di gerai ritel modern, meja kasir adalah etalase reputasi sekaligus pusat aliran kas perusahaan. Pada jam-jam sibuk antara pukul 12.00 sampai 13.30 dan pukul 17.30 sampai 20.00, pelanggan datang dalam kondisi lelah dan terburu-buru. Waktu tunggu yang melebihi tiga menit sudah cukup memicu ketidaksabaran. Di saat yang sama, kendala teknis umum sering muncul: mesin EDC bank mengalami keterlambatan jaringan (timeout), label harga rak berbeda dengan sistem komputer kasir, atau pelanggan meminta pembatalan transaksi (void). Kasir pemula yang belum terbiasa secara alami akan mengalami reaksi panik, gemetar, dan kaku, yang kerap memicu eskalasi komplain pelanggan.',
              }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '3.2 Keterbatasan Waktu Kepala Toko untuk Melakukan Pendampingan Manual', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Pedoman operasional perusahaan menyarankan agar staf baru didampingi secara intensif selama dua pekan pertama. Namun waktu kerja kepala toko sudah terserap habis untuk menerima kiriman barang dari truk logistik, memeriksa display barang dan tanggal kedaluwarsa, mengaudit persediaan stok barang, serta merekonsiliasi kas harian. Berdiri berjam-jam mendampingi kasir baru menyebabkan tugas administratif toko terbengkalai, sementara membiarkan kasir baru bekerja sendirian memicu risiko komplain dan selisih kas fisik di laci kasir.',
              }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '3.3 Tantangan Lulusan Vokasi dalam Memasuki Dunia Kerja Nyata', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Di lingkungan SMK, guru dan sekolah menghadapi keterbatasan anggaran untuk mengadakan laboratorium gerai ritel lengkap dengan mesin kasir elektronik dan perangkat pembayaran perbankan nyata. Akibatnya jam pelajaran didominasi teori di kelas. Saat melamar kerja, lulusan baru tidak memiliki bukti portofolio yang dapat menunjukkan keluwesan melayani pembeli, ketelitian menghitung uang, atau ketenangan menangani masalah transaksi.',
              }),
            ],
          }),

          // =========================================================================
          // BAB IV: SOLUSI OPERASIONAL DAN KATALOG FITUR Vokasta
          // =========================================================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 140 },
            children: [new TextRun({ text: 'BAB IV: SOLUSI OPERASIONAL DAN KATALOG FITUR Vokasta', bold: true, color: '0D9488' })],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '4.1 Konsep Solusi: Ruang Latihan Mandiri Berbasis Ponsel', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Vokasta menyediakan ruang latihan simulasi interaktif yang dapat diakses langsung oleh staf melalui peramban web di ponsel masing-masing tanpa memerlukan aplikasi berat atau perangkat VR mahal. Karyawan menyandarkan ponsel di meja kasir sebelum gerai dibuka atau di jam istirahat. AI memunculkan pelanggan virtual yang berbicara dan bereaksi secara audio-visual. Karyawan merespons dengan berbicara langsung layaknya melayani pembeli nyata. Dalam hitungan detik setelah sesi selesai, AI memberikan panduan perbaikan yang jelas, ramah, dan dapat langsung dilatih ulang.',
              }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '4.2 Katalog Fitur Utama Vokasta', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. Interactive Multimodal Roleplay Engine: ', bold: true }),
              new TextRun({ text: 'Menghadirkan simulasi percakapan interaktif dua arah antara pekerja dengan pelanggan virtual berbasis Google Gemini Multimodal. Mencakup skenario transaksi standar, komplain selisih harga rak, kendala mesin EDC timeout, dan penukaran produk cacat dengan durasi 60 sampai 90 detik per sesi.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '2. Real-Time Multimodal Diagnostic and Scoring: ', bold: true }),
              new TextRun({ text: 'Melakukan evaluasi simultan pada tiga pilar kecakapan: kepatuhan kalimat SOP (isi pesan dan kesantunan), stabilitas intonasi suara (ketiadaan nada defensif atau ketus), serta kontak mata dan kerapian sikap tubuh di meja kasir.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '3. 60-Second Guided Micro-Remediation: ', bold: true }),
              new TextRun({ text: 'Menampilkan poin SOP spesifik yang terlewat, memberikan contoh susunan kalimat santun yang efektif, dan menyediakan tombol latihan kilat 60 detik bagi karyawan untuk langsung mengucapkan ulang kalimat perbaikan tersebut.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '4. Enterprise SOP Studio: ', bold: true }),
              new TextRun({ text: 'Memungkinkan pemilik usaha atau tim L&D perusahaan mengunggah dokumen pedoman SOP internal (format teks atau PDF ringkas). AI secara otomatis membedah poin kritis dan menghasilkan skenario roleplay baru sesuai standar merek perusahaan tanpa membutuhkan keahlian coding.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '5. Store Manager Dashboard and Readiness Matrix: ', bold: true }),
              new TextRun({ text: 'Dasbor terpusat bagi kepala toko dan manajemen area untuk memantau perkembangan skor kesiapan staf antar-cabang, grafik tren kepatuhan SOP harian, dan topik kendala terbanyak di lapangan tanpa perlu inspeksi manual setiap jam.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '6. Frontline Worker Sovereign Competency Passport: ', bold: true }),
              new TextRun({ text: 'Paspor kompetensi digital berstandar terbuka 1EdTech Open Badges v3.0 dan W3C Verifiable Credentials yang dimiliki langsung oleh pekerja di ponsel mereka. Format data mengikuti Open Badges v3.0 (kredensial contoh, belum ditandatangani).' }),
            ],
          }),

          // =========================================================================
          // BAB V: ANALISIS NILAI GUNA BAGI SETIAP PENGGUNA
          // =========================================================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 140 },
            children: [new TextRun({ text: 'BAB V: ANALISIS NILAI GUNA BAGI SETIAP PENGGUNA', bold: true, color: '0D9488' })],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '5.1 Nilai Guna bagi Pekerja dan Pencari Kerja Garis Depan', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Rasa Percaya Diri Sejak Hari Pertama: ', bold: true }),
              new TextRun({ text: 'Pekerja dapat berlatih mandiri berkali-kali sebelum melayani pembeli nyata, mengeliminasi rasa cemas dan panik di hari-hari awal kerja.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Lingkungan Belajar yang Aman Secara Psikologis: ', bold: true }),
              new TextRun({ text: 'Bebas dari rasa malu, takut dimarahi atasan, atau diejek rekan kerja saat melakukan kekeliruan selama sesi simulasi AI.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Portofolio Karier Mandiri: ', bold: true }),
              new TextRun({ text: 'Keterampilan nyata diakui dalam paspor digital portabel yang dapat dibawa ke mana saja sepanjang perjalanan karier pekerja.' }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '5.2 Nilai Guna bagi Pemilik Usaha, Kepala Toko, dan Tim Manajemen', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Memangkas Waktu Pendampingan Manual hingga 70 Persen: ', bold: true }),
              new TextRun({ text: 'Mengurangi waktu bimbingan langsung kepala toko dari rata-rata 14 hari menjadi 3 hari kerja, mengembalikan puluhan jam produktif untuk mengurus penjualan dan persediaan barang.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Menekan Pergantian Karyawan Baru (Early Turnover): ', bold: true }),
              new TextRun({ text: 'Karyawan yang telah siap secara mental dan prosedur memiliki kenyamanan kerja lebih tinggi, menekan angka pengunduran diri 90 hari pertama sebesar 35 hingga 45 persen.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Menjaga Konsistensi Standar Layanan Antar-Cabang: ', bold: true }),
              new TextRun({ text: 'Menjamin keramahan dan kepatuhan SOP di gerai daerah memiliki mutu yang sama tingginya dengan gerai di pusat kota secara otomatis.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Mencegah Kerugian Transaksi dan Selisih Kas: ', bold: true }),
              new TextRun({ text: 'Meminimalkan kesalahan pengetikan nominal di mesin kasir dan kerugian akibat salah hitung kembalian belanja.' }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '5.3 Nilai Guna bagi Sekolah Menengah Kejuruan dan Balai Latihan Kerja', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Bagi SMK dan BLK, Vokasta menyediakan sarana laboratorium gerai virtual berbiaya sangat terjangkau tanpa perlu membangun toko fisik di setiap sekolah. Modul yang mengacu pada SKKNI sebagai rujukan (rencana penyelarasan, belum diverifikasi lembaga sertifikasi) memastikan materi praktik sinkron dengan kebutuhan nyata industri, meningkatkan keterserapan lulusan secara langsung.',
              }),
            ],
          }),

          // =========================================================================
          // BAB VI: CETAK BIRU IMPLEMENTASI DAN TAHAPAN MILESTONE REALISTIS
          // =========================================================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 140 },
            children: [new TextRun({ text: 'BAB VI: CETAK BIRU IMPLEMENTASI DAN TAHAPAN MILESTONE REALISTIS', bold: true, color: '0D9488' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Pengembangan Vokasta dirancang dalam sebuah alur cerita yang berkesinambungan dan bertumpu pada pencapaian terukur: dimulai dari membuktikan efisiensi operasional pada gerai percontohan, memperluas jangkauan ke sistem pendidikan vokasi dan rekrutmen kerja, hingga standardisasi terbuka regional.',
              }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '6.1 Fase 1 (Tahun Pertama: Bulan 01 sampai 12): Validasi Efisiensi Operasional Gerai Korporat', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Fokus Utama: ', bold: true }),
              new TextRun({ text: 'Membuktikan nilai bisnis nyata pada operasional gerai harian: menurunkan waktu pendampingan kepala toko dari 14 hari menjadi 3 hari, menaikkan kepatuhan SOP kasir, dan menekan angka turnover dini.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Target Pengguna Realistis: ', bold: true }),
              new TextRun({ text: 'Satu jaringan ritel modern atau grup waralaba restoran cepat saji berukuran menengah. Dimulai dari 3 sampai 5 gerai percontohan pada semester pertama, dan berkembang secara bertahap menuju 25 sampai 50 gerai di akhir tahun pertama.' }),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Milestone Bertahap Fase 1:', bold: true })],
          }),
          new Paragraph({
            indent: { left: 360 },
            children: [
              new TextRun({ text: '• Kuartal 1 (Bulan 1 sampai 3): ', bold: true }),
              new TextRun({ text: 'Pelaksanaan proyek percontohan pada 3 sampai 5 gerai mitra dengan melibatkan 20 sampai 30 kasir baru. Fokus pada pengujian kestabilan pengenalan suara di lingkungan meja kasir yang memiliki suara musik toko, serta memastikan simulasi 90 detik nyaman dilakukan lewat ponsel.' }),
            ],
          }),
          new Paragraph({
            indent: { left: 360 },
            children: [
              new TextRun({ text: '• Kuartal 2 (Bulan 4 sampai 6): ', bold: true }),
              new TextRun({ text: 'Perluasan uji coba ke 10 sampai 15 gerai dalam jaringan mitra yang sama. Melakukan pengukuran dampak langsung terhadap durasi pendampingan kasir oleh kepala toko (memvalidasi penurunan dari 14 hari menjadi 3 sampai 4 hari kerja) dan peluncuran dasbor pemantau bagi manajer area.' }),
            ],
          }),
          new Paragraph({
            indent: { left: 360 },
            children: [
              new TextRun({ text: '• Kuartal 3 (Bulan 7 sampai 9): ', bold: true }),
              new TextRun({ text: 'Penyempurnaan fitur Enterprise SOP Studio berdasarkan masukan langsung dari kepala toko dan pelatih internal perusahaan. Pendokumentasian data empiris penurunan tingkat kesalahan transaksi kasir dan penurunan angka pengunduran diri 30 hari pertama.' }),
            ],
          }),
          new Paragraph({
            indent: { left: 360 },
            children: [
              new TextRun({ text: '• Kuartal 4 (Bulan 10 sampai 12): ', bold: true }),
              new TextRun({ text: 'Perluasan penerapan mandiri ke 25 sampai 50 gerai dalam jaringan mitra atau mitra korporat kedua. Memastikan model biaya berlangganan software terbukti memberikan penghematan operasional bersih bagi manajemen gerai.' }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '6.2 Fase 2 (Tahun Kedua hingga Ketiga: Bulan 13 sampai 36): Menjembatani Pendidikan Vokasi & Rekrutmen', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Fokus Utama: ', bold: true }),
              new TextRun({ text: 'Menghubungkan standar industri yang telah dirumuskan di Fase 1 dengan dunia pendidikan vokasi (SMK dan BLK), menciptakan jembatan rekrutmen berbasis bukti kompetensi yang terstandar.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Target Mitra Realistis: ', bold: true }),
              new TextRun({ text: '10 hingga 20 SMK kejuruan Bisnis Daring dan Pemasaran serta Balai Latihan Kerja di wilayah Jakarta dan Jawa Barat pada tahun kedua, berekspansi ke 50 hingga 100 SMK dan balai pelatihan di berbagai kota pada tahun ketiga bersama asosiasi ritel.' }),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Milestone Bertahap Fase 2:', bold: true })],
          }),
          new Paragraph({
            indent: { left: 360 },
            children: [
              new TextRun({ text: '• Tahun ke-2 (Bulan 13 sampai 24): ', bold: true }),
              new TextRun({ text: 'Integrasi platform Vokasta sebagai modul praktikum mingguan di 10 sampai 20 SMK percontohan. Mengadakan uji coba jalur rekrutmen cepat bersama mitra ritel Fase 1, di mana 500 sampai 1.000 siswa berprestasi simulasi langsung mendapatkan penempatan kerja tanpa seleksi berbelit.' }),
            ],
          }),
          new Paragraph({
            indent: { left: 360 },
            children: [
              new TextRun({ text: '• Tahun ke-3 (Bulan 25 sampai 36): ', bold: true }),
              new TextRun({ text: 'Penyelarasan modul simulasi dengan Standar Kompetensi Kerja Nasional Indonesia (SKKNI) bidang ritel dan perhotelan bersama lembaga sertifikasi terkait. Memperluas kerja sama ke 50 hingga 100 sekolah kejuruan dan BLK di Pulau Jawa dan Sumatera untuk membuka akses kerja yang setara bagi pemuda daerah.' }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '6.3 Fase 3 (Tahun Keempat hingga Kelima: Bulan 37 sampai 60): Standar Terbuka & Skalabilitas Regional', bold: true, color: '1F2937' })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Fokus Utama: ', bold: true }),
              new TextRun({ text: 'Menjadikan Vokasta sebagai jejaring verifikasi kompetensi terbuka yang memfasilitasi mobilitas tenaga kerja garis depan secara bermartabat di kawasan regional Asia Tenggara.' }),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Milestone Bertahap Fase 3:', bold: true })],
          }),
          new Paragraph({
            indent: { left: 360 },
            children: [
              new TextRun({ text: '• Tahun ke-4 (Bulan 37 sampai 48): ', bold: true }),
              new TextRun({ text: 'Uji coba penerapan pada 1 negara tetangga yang memiliki karakteristik industri ritel dan restoran cepat saji serupa (Filipina atau Malaysia). Mengembangkan model AI multimodal multibahasa (Bahasa Inggris lokal dan Tagalog) yang memahami norma kesopanan budaya setempat.' }),
            ],
          }),
          new Paragraph({
            indent: { left: 360 },
            children: [
              new TextRun({ text: '• Tahun ke-5 (Bulan 49 sampai 60): ', bold: true }),
              new TextRun({ text: 'Penerapan penuh standar interoperabilitas kredensial terbuka W3C Verifiable Credentials dan 1EdTech Open Badges v3.0, memungkinkan tenaga kerja migran formal di sektor perhotelan dan ritel menampilkan portofolio keahlian terstandarisasi mereka secara mandiri dan portabel saat mencari peluang kerja internasional.' }),
            ],
          }),

          // =========================================================================
          // BAB VII: KELAYAKAN TEKNOLOGI DAN MITIGASI KENDALA DI LAPANGAN
          // =========================================================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 140 },
            children: [new TextRun({ text: 'BAB VII: KELAYAKAN TEKNOLOGI DAN MITIGASI KENDALA DI LAPANGAN', bold: true, color: '0D9488' })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. Optimalisasi Google Gemini Multimodal dan Latensi Respon: ', bold: true }),
              new TextRun({ text: 'Menggunakan Google Gemini Multimodal dengan metode cuplikan gambar berkala (1 fps) dan kompresi audio suara, menjaga waktu tunggu respons umpan balik di bawah 1 detik. Pedoman SOP dan rubrik penilaian disimpan menggunakan Gemini Context Caching, memangkas kuota token hingga 70 persen.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '2. Kompatibilitas Ponsel Kelas Pemula dan Penanganan Jaringan: ', bold: true }),
              new TextRun({ text: 'Dibangun dengan arsitektur Progressive Web App (PWA) berbasis peramban yang sangat ringan, berjalan lancar pada ponsel Android kelas pemula dengan RAM 2GB. Jika jaringan internet gerai melambat, sistem secara adaptif memprioritaskan aliran audio tanpa memutus sesi latihan. Fitur Web Audio API noise gate menyaring suara musik toko.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '3. Dukungan Dialek (kapabilitas desain, belum divalidasi): ', bold: true }),
              new TextRun({ text: 'Model AI dirancang untuk mengenali pesan inti, kesantunan pilihan kata, dan kejelasan artikulasi pada keragaman profil dialek nusantara (Jawa, Sunda, Batak, Melayu, hingga Indonesia Timur) sebagai kapabilitas desain yang terus dikembangkan.' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '4. Keamanan Data Perusahaan dan Privasi Portofolio Pekerja: ', bold: true }),
              new TextRun({ text: 'Dokumen SOP rahasia gerai dan data operasional internal disimpan dalam ruang cloud privat terenkripsi AES-256. Data paspor kompetensi pekerja hanya memuat catatan capaian umum yang telah dinilai tanpa mencantumkan rahasia dagang korporasi asal.' }),
            ],
          }),

          // =========================================================================
          // BAB VIII: ANALISIS KELAYAKAN FINANSIAL DAN PROYEKSI EFISIENSI GERAI
          // =========================================================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 140 },
            children: [new TextRun({ text: 'BAB VIII: ANALISIS KELAYAKAN FINANSIAL DAN PROYEKSI EFISIENSI GERAI', bold: true, color: '0D9488' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Simulasi perhitungan efisiensi pada jaringan ritel dengan 50 gerai aktif, rata-rata 6 kasir per gerai, dan perputaran karyawan historis 40 persen per tahun (~120 kasir baru per tahun):',
              }),
            ],
          }),

          // ROI Table
          new Table({
            columnWidths: [2800, 3200, 3200],
            rows: [
              new TableRow({
                children: [
                  new TableCell({ shading: { fill: 'F1F5F9', type: ShadingType.CLEAR }, borders: tableBorder, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: 'Komponen Biaya', bold: true })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9', type: ShadingType.CLEAR }, borders: tableBorder, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: 'Metode Tradisional (Manual)', bold: true })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9', type: ShadingType.CLEAR }, borders: tableBorder, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: 'Dengan Vokasta', bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Waktu Pendampingan Kepala Toko' })] }),
                  new TableCell({
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: '14 hari / kasir (56 jam kerja kepala toko)' }),
                          new TextRun({ text: 'Total: Rp 235.200.000 / tahun', break: 1 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: '3 hari / kasir (12 jam kerja kepala toko)' }),
                          new TextRun({ text: 'Total: Rp 50.400.000 / thn (Hemat Rp 184,8 Juta)', break: 1 }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Biaya Kerugian Transaksi & Kas' })] }),
                  new TableCell({
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Rata-rata Rp 250.000 / kasir baru' }),
                          new TextRun({ text: 'Total: Rp 30.000.000 / tahun', break: 1 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Turun 70% melalui simulasi' }),
                          new TextRun({ text: 'Total: Rp 9.000.000 / thn (Hemat Rp 21 Juta)', break: 1 }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Biaya Rekrutmen Akibat Karyawan Keluar Dini' })] }),
                  new TableCell({
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: '48 kasir keluar dini × Rp 2 Juta' }),
                          new TextRun({ text: 'Total: Rp 96.000.000 / tahun', break: 1 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    borders: tableBorder,
                    margins: cellMargins,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Turnover turun 40% (29 staf keluar)' }),
                          new TextRun({ text: 'Total: Rp 58.000.000 / thn (Hemat Rp 38 Juta)', break: 1 }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ shading: { fill: 'F8FAFC', type: ShadingType.CLEAR }, borders: tableBorder, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: 'Total Beban Pelatihan', bold: true })] })] }),
                  new TableCell({ shading: { fill: 'F8FAFC', type: ShadingType.CLEAR }, borders: tableBorder, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: 'Rp 361.200.000 / tahun', bold: true })] })] }),
                  new TableCell({ shading: { fill: 'F8FAFC', type: ShadingType.CLEAR }, borders: tableBorder, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: 'Rp 117.400.000 / thn (Hemat Rp 243,8 Juta Bruto)', bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Investasi Langganan Vokasta (50 Gerai)' })] }),
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: 'Rp 0' })] }),
                  new TableCell({ borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: '50 gerai × Rp 180.000/bln = Rp 108.000.000 / tahun' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ shading: { fill: 'F0FDFA', type: ShadingType.CLEAR }, borders: tableBorder, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: 'PENGHEMATAN OPERASIONAL BERSIH', bold: true, color: '0D9488' })] })] }),
                  new TableCell({ shading: { fill: 'F0FDFA', type: ShadingType.CLEAR }, borders: tableBorder, margins: cellMargins, children: [new Paragraph({ text: '-' })] }),
                  new TableCell({ shading: { fill: 'F0FDFA', type: ShadingType.CLEAR }, borders: tableBorder, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: 'Rp 135.800.000 / TAHUN (ROI: 125,7%)', bold: true, color: '0D9488' })] })] }),
                ],
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 160 },
            children: [
              new TextRun({
                text: 'Investasi platform telah balik modal (payback period) pada bulan ke-6 sejak implementasi, murni dari penghematan jam kerja produktif kepala toko dan penurunan angka keluar-masuk karyawan baru.',
                italics: true,
              }),
            ],
          }),

          // =========================================================================
          // BAB IX: KESIMPULAN DAN AJAKAN KOLABORASI
          // =========================================================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 140 },
            children: [new TextRun({ text: 'BAB IX: KESIMPULAN DAN AJAKAN KOLABORASI', bold: true, color: '0D9488' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Vokasta hadir untuk membuktikan bahwa kemajuan teknologi kecerdasan artifisial dapat diterapkan secara membumi, manusiawi, dan berdampak nyata bagi mereka yang bekerja di barisan terdepan ekonomi pelayanan. Bagi para pekerja muda di meja kasir, platform ini adalah rekan latihan yang setia menumbuhkan rasa percaya diri tanpa celaan. Bagi pemilik usaha dan kepala toko, platform ini adalah solusi praktis yang mengembalikan waktu kerja produktif mereka serta menekan biaya pergantian karyawan secara terukur. Bagi dunia pendidikan kejuruan, platform ini adalah jembatan yang menghubungkan teori di ruang kelas dengan denyut nadi kerja di lapangan gerai sesungguhnya.',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Kami mengundang tim penilai Google Cloud AI Builder Cup 2026, para pimpinan asosiasi ritel dan perhotelan, serta rekan-rekan pendidik vokasi untuk bersama-sama menguji, menyempurnakan, dan mewujudkan cetak biru ini demi kemajuan ekosistem ketenagakerjaan yang lebih tangguh, efisien, dan bermartabat.',
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 200, after: 80 },
            children: [new TextRun({ text: 'Hormat kami,', bold: true })],
          }),
          new Paragraph({
            spacing: { after: 160 },
            children: [new TextRun({ text: 'TIM PENGEMBANG Vokasta', bold: true, color: '0D9488' })],
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Sujarwadi', bold: true, size: 24, color: '1A202C' })],
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Inovator & Pengembang Vokasta', italics: true })],
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Praktisi Pembelajaran & Pengembangan (L&D) & Psikologi Organisasi' })],
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Surel: sujarwadi84@gmail.com' })],
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Google Cloud AI Builder Cup 2026 Submission' })],
          }),
        ],
      },
    ],
  });
}

export async function downloadProposalDocx() {
  const doc = buildProposalDocument();
  const blob = await Packer.toBlob(doc);

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'Vokasta_Strategic_Proposal.docx';
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 1000);
}
