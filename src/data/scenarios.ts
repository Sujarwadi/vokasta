import { Scenario } from '../types';

export const SCENARIOS: Scenario[] = [
  // =========================================================================
  // JALUR 1: PENCARI KERJA MANDIRI (UNIVERSAL EMPLOYABILITY STANDARDS)
  // Skenario kompetensi umum lintas industri untuk portabilitas paspor kerja W3C
  // =========================================================================
  {
    id: 'scen_jobseeker_hospitality_basic',
    jenis: 'greeting',
    status: 'Skenario Siap Diuji',
    target_audience: 'jobseeker',
    department: 'general_frontline',
    title: 'Standar Kesiapan Kerja: Keramahan Salam Tamu, Kontak Mata, & Kecepatan Bantuan Pertama',
    category: 'Standar Umum Kesiapan Kerja Frontline',
    track: 'frontline_service',
    role_context: 'Frontliner Umum / Pramusaji / Staf Layanan Pelanggan Baru',
    buyer_persona: {
      name: 'Ibu Ratna Handayani',
      title: 'Tamu Kunjungan Perdana',
      company: 'Pengunjung Baru Fasilitas Layanan / Ritel Publik',
      temperament: 'Bingung mencari loket informasi, membutuhkan sambutan ramah, kontak mata hangat, dan petunjuk arah yang jelas',
      avatar_initials: 'RH',
      opening_objection_line:
        'Permisi, selamat siang. Maaf mengganggu, saya baru pertama kali datang ke sini dan agak bingung mencari loket informasi atau bagian layanan. Boleh dibantu arahnya ke sebelah mana ya?',
    },
    task_instruction_en:
      'Seorang tamu baru pertama kali melangkah masuk ke tempat usaha Anda dan tampak bingung mencari informasi. Tunjukkan refleks pelayanan prima dasar: 1) Sambut segera dengan senyum tulus, kontak mata hangat, dan salam profesional dalam Bahasa Indonesia ("Selamat pagi/siang, selamat datang! Ada yang bisa saya bantu?"); 2) Praktikkan active listening tanpa memotong untuk memahami apa yang dicari tamu; 3) Berikan petunjuk arah atau rekomendasi awal dengan bahasa tubuh terbuka dan bersahabat; 4) Tutup dengan penawaran bantuan lanjutan yang tulus.',
    evaluation_prompt_snippet:
      'Evaluasi inisiatif menyapa dalam 3 detik pertama, kehangatan kontak mata dan senyum, pemahaman kebutuhan melalui active listening, serta kesopanan etika tutur kata frontline.',
    parameters: [
      {
        id: 'param_js_warm_greeting',
        name: 'Inisiatif Salam Hangat & Kontak Mata Pertama',
        weight: 30,
        is_universal: true,
        passing_score: 75,
        definition:
          'Kandidat berinisiatif menyapa tamu dalam 3 detik pertama kedatangan dengan senyum ramah, kontak mata terbuka, dan ucapan salam profesional.',
        keywords_or_actions: [
          'Selamat pagi/siang/sore, selamat datang',
          'Ada yang bisa saya bantu Bapak/Ibu/Kakak',
          'Senyum ramah dan kontak mata langsung',
        ],
      },
      {
        id: 'param_js_active_listening',
        name: 'Mendengarkan Aktif & Klarifikasi Kebutuhan',
        weight: 25,
        is_universal: true,
        passing_score: 70,
        definition:
          'Kandidat menyimak penjelasan tamu secara saksama tanpa memotong dan mengonfirmasi kembali maksud kebutuhan tamu dengan santun.',
        keywords_or_actions: [
          'Mengangguk dan menyimak penuh',
          'Baik, jadi Bapak/Ibu sedang mencari...',
          'Mengonfirmasi kebutuhan dengan jelas',
        ],
      },
      {
        id: 'param_js_body_language',
        name: 'Bahasa Tubuh Terbuka & Sikap Sigap Melayani',
        weight: 25,
        is_universal: true,
        passing_score: 75,
        definition:
          'Kandidat menunjukkan postur tegak, tangan terbuka (tidak bersedekap atau bertolak pinggang), dan antusiasme membantu.',
        keywords_or_actions: [
          'Bahasa tubuh terbuka dan siap melayani',
          'Mengisyaratkan arah dengan telapak tangan terbuka',
          'Menjaga jarak interaksi yang nyaman',
        ],
      },
      {
        id: 'param_js_courtesy_closing',
        name: 'Etika Kesopanan & Penawaran Bantuan Lanjutan',
        weight: 20,
        is_universal: true,
        passing_score: 70,
        definition:
          'Kandidat menutup interaksi awal dengan sopan dan memastikan tamu merasa diterima dengan baik.',
        keywords_or_actions: [
          'Silakan jika butuh bantuan lebih lanjut saya ada di sini',
          'Semoga harinya menyenangkan',
          'Terima kasih banyak',
        ],
      },
    ],
  },
  {
    id: 'scen_jobseeker_complaint_deescalation',
    jenis: 'complaint',
    status: 'Skenario Siap Diuji',
    target_audience: 'jobseeker',
    department: 'general_frontline',
    title: 'Standar Kesiapan Kerja: De-eskalasi Keluhan Pelanggan Kecewa & Komunikasi Solutif',
    category: 'Standar Umum Komunikasi Krisis & Empati',
    track: 'frontline_service',
    role_context: 'Frontliner Penyelesaian Keluhan / Customer Care Representative',
    buyer_persona: {
      name: 'Pak Hendra Gunawan',
      title: 'Pelanggan Antrean Layanan',
      company: 'Masyarakat Umum / Pelanggan Layanan Publik Ritel',
      temperament: 'Kecewa karena antrean melebihi estimasi 20 menit, terburu-buru, menuntut permohonan maaf tulus dan kepastian waktu penanganan',
      avatar_initials: 'HG',
      opening_objection_line:
        'Mas/Mbak! Tolong dong, saya sudah menunggu lebih dari dua puluh menit di sini tapi belum dipanggil juga! Tadi staf depan bilang estimasinya cuma lima sampai sepuluh menit. Saya ada keperluan mendesak lain setelah ini, gimana solusinya?!',
    },
    task_instruction_en:
      'Seorang pelanggan datang dengan nada kesal karena merasa waktu tunggunya melebihi estimasi yang dijanjikan. Terapkan prinsip universal de-eskalasi (Listen, Empathize, Apologize, Resolve): 1) Jaga ketenangan dan dengarkan keluhan sampai selesai tanpa membantah; 2) Sampaikan permohonan maaf tulus atas ketidaknyamanan waktu tunggu; 3) Validasi perasaan pelanggan dengan empati ("Saya memahami waktu Bapak/Ibu sangat berharga"); 4) Berikan kepastian tindakan penyelesaian segera dan sampaikan terima kasih atas kesabaran pelanggan.',
    evaluation_prompt_snippet:
      'Evaluasi regulasi emosi saat menghadapi pelanggan emosional, permohonan maaf tanpa defensif, pengakuan empati terhadap waktu pelanggan, dan kepastian penyelesaian masalah.',
    parameters: [
      {
        id: 'param_js_emotional_regulation',
        name: 'Pengendalian Nada Suara & Ketenangan Profesional',
        weight: 25,
        is_universal: true,
        passing_score: 75,
        definition:
          'Kandidat mempertahankan nada suara tenang, intonasi stabil, dan tidak terpancing emosi negatif dari pelanggan.',
        keywords_or_actions: [
          'Nada bicara tetap tenang dan stabil',
          'Tidak memotong keluhan pelanggan',
          'Menunjukkan ekspresi wajah empati yang tulus',
        ],
      },
      {
        id: 'param_js_sincere_apology',
        name: 'Permohonan Maaf Tulus Tanpa Defensif',
        weight: 30,
        is_universal: true,
        passing_score: 75,
        definition:
          'Kandidat menyampaikan permohonan maaf atas ketidaknyamanan tanpa melempar kesalahan ke rekan kerja atau sistem.',
        keywords_or_actions: [
          'Mohon maaf sebesar-besarnya atas keterlambatan ini',
          'Kami sangat memahami kekecewaan Bapak/Ibu',
          'Tidak membela diri atau menyalahkan pihak lain',
        ],
      },
      {
        id: 'param_js_active_resolution',
        name: 'Inisiatif Solusi Cepat & Tindak Lanjut Nyata',
        weight: 25,
        is_universal: true,
        passing_score: 70,
        definition:
          'Kandidat memberikan komitmen tindakan perbaikan yang jelas dan dapat diukur dalam hitungan menit.',
        keywords_or_actions: [
          'Saya segera koordinasikan agar selesai dalam 3 menit ini',
          'Saya pribadi yang akan memastikan pesanannya tiba',
          'Memberikan kepastian waktu penyelesaian',
        ],
      },
      {
        id: 'param_js_customer_appreciation',
        name: 'Apresiasi Masukan & Pemulihan Hubungan Baik',
        weight: 20,
        is_universal: true,
        passing_score: 70,
        definition:
          'Kandidat berterima kasih atas kesabaran dan masukan pelanggan sehingga interaksi berakhir dengan rasa dihargai.',
        keywords_or_actions: [
          'Terima kasih banyak sudah mengingatkan kami dengan sabar',
          'Masukan ini sangat berharga untuk perbaikan layanan kami',
          'Sekali lagi mohon maaf dan terima kasih atas kebaikan Bapak/Ibu',
        ],
      },
    ],
  },
  {
    id: 'scen_jobseeker_retail_communication',
    jenis: 'sales_discovery',
    status: 'Skenario Siap Diuji',
    target_audience: 'jobseeker',
    department: 'general_frontline',
    title: 'Standar Kesiapan Kerja: Penggalian Kebutuhan Pembeli, Komunikasi Persuasif, & Transaksi Kasir',
    category: 'Standar Umum Pramuniaga & Kasir Transaksi',
    track: 'retail_sales',
    role_context: 'Pramuniaga Toko Ritel / Kasir Penjualan Umum',
    buyer_persona: {
      name: 'Mbak Cindy Claudia',
      title: 'Calon Pembeli Ritel',
      company: 'Pengunjung Toko Ritel Mandiri',
      temperament: 'Bimbang membandingkan dua opsi barang di etalase, butuh penjelasan obyektif dan transaksi kasir yang teliti',
      avatar_initials: 'CC',
      opening_objection_line:
        'Halo Mas/Mbak, permisi mau tanya. Saya lagi bingung nih milih antara dua barang ini di etalase. Yang satu harganya lebih hemat tapi bahannya beda, yang satu lagi lebih mahal sedikit. Bedanya apa ya, dan kira-kira mana yang lebih awet buat dipakai harian?',
    },
    task_instruction_en:
      'Seorang pembeli sedang mengamati dua pilihan produk dengan ekspresi bimbang mengenai fungsi dan harga. Dekati dengan santun: 1) Buka percakapan dengan pertanyaan terbuka ("Boleh saya bantu pilihkan yang paling sesuai kebutuhan Kakak?"); 2) Identifikasi prioritas pembeli (apakah mengutamakan daya tahan, kepraktisan, atau efisiensi biaya); 3) Jelaskan nilai guna produk tanpa melebih-lebihkan; 4) Praktikkan konfirmasi total pembayaran, panduan kasir yang jelas, dan penyerahan barang dengan dua tangan serta ucapan terima kasih.',
    evaluation_prompt_snippet:
      'Evaluasi pendekatan konsultatif tanpa memaksa, kemampuan menggali kebutuhan pembeli lewat pertanyaan terbuka, kejelasan informasi produk, dan etika transaksi kasir.',
    parameters: [
      {
        id: 'param_js_discovery_questions',
        name: 'Pendekatan Konsultatif & Pertanyaan Terbuka',
        weight: 30,
        is_universal: true,
        passing_score: 70,
        definition:
          'Kandidat mendekati calon pembeli secara sopan dan menggunakan pertanyaan terbuka untuk memahami preferensi pembeli.',
        keywords_or_actions: [
          'Sedang mencari untuk keperluan pribadi atau hadiah Kak',
          'Kira-kira fitur apa yang paling penting untuk Kakak',
          'Pertanyaan terbuka yang membantu pembeli berpikir',
        ],
      },
      {
        id: 'param_js_product_explanation',
        name: 'Penjelasan Nilai Guna & Perbandingan Obyektif',
        weight: 30,
        is_universal: true,
        passing_score: 75,
        definition:
          'Kandidat memaparkan keunggulan masing-masing pilihan secara jujur dan berimbang sesuai anggaran pembeli.',
        keywords_or_actions: [
          'Untuk opsi A keunggulannya pada daya tahan bahan',
          'Sedangkan opsi B lebih ringan dan fleksibel',
          'Keduanya sama-sama bergaransi resmi',
        ],
      },
      {
        id: 'param_js_cashier_accuracy',
        name: 'Ketelitian Transaksi Kasir & Penyerahan Barang Sopan',
        weight: 40,
        is_universal: true,
        passing_score: 75,
        definition:
          'Kandidat mengonfirmasi total belanjaan, menyebutkan opsi pembayaran tunai/nontunai, dan menyerahkan barang belanjaan dengan etika santun.',
        keywords_or_actions: [
          'Total belanjaannya sebesar Rp... ya Kak',
          'Untuk pembayaran bisa tunai atau scan QRIS di sebelah sini',
          'Menyerahkan barang belanjaan dengan dua tangan dan senyum',
          'Terima kasih banyak sudah berbelanja, selamat beraktivitas kembali',
        ],
      },
    ],
  },

  // =========================================================================
  // JALUR 2: STAFF GERAI (SOP INTERNAL BRAND TERSERTIFIKASI)
  // Skenario berbasis SOP brand khusus untuk penugasan supervisor & operasional
  // =========================================================================
  {
    id: 'scen_greeting_01',
    jenis: 'greeting',
    status: 'Skenario Siap Diuji',
    target_audience: 'staff',
    department: 'fnb_barista',
    title: 'Standar Salam, Kustomisasi Resep Oat Milk, & Cross-Selling Barista Counter',
    category: 'Hospitality & Frontline Barista Kafe',
    track: 'frontline_service',
    role_context: 'Barista Counter & Kasir Kedai Kopi Nusantara',
    brand_name: 'Kopi Nusantara',
    buyer_persona: {
      name: 'Mbak Sarah',
      title: 'Pelanggan Kafe Sensitif Laktosa',
      company: 'Pengunjung Kedai Kopi Nusantara',
      temperament: 'Ramah dan teliti soal kesehatan, membutuhkan kepastian oat milk bebas laktosa dan takaran manis 50% less sweet',
      avatar_initials: 'SR',
      opening_objection_line:
        'Halo kak, mau tanya dong. Es Kopi Susu Gula Arennya bisa diganti oat milk nggak ya? Soalnya saya lactose intolerant. Terus gulanya bisa request less sweet 50% nggak?',
    },
    task_instruction_en:
      'Mbak Sarah (pelanggan sensitif laktosa) mendekati kasir dan bertanya apakah Es Kopi Susu Gula Aren bisa diganti Oat Milk dan dibuat Less Sweet 50%. Sambut dengan salam standar kedai ("Selamat datang di Kopi Nusantara!"), jelaskan opsi oat milk creamy nabati yang aman untuk laktosa, berikan rekomendasi rasa seimbang 50% less sweet, lakukan suggestive selling bundling hemat Warm Almond Croissant, dan konfirmasi pesanan dengan sopan serta panduan pembayaran QRIS.',
    evaluation_prompt_snippet:
      'Evaluasi salam standar "Selamat datang di Kopi Nusantara", empati penjelasan oat milk ramah laktosa & less sweet 50%, tawaran bundling pastry Warm Almond Croissant, serta konfirmasi total pesanan dan opsi pembayaran QRIS.',
    parameters: [
      {
        id: 'param_greeting_welcome',
        name: 'Salam Hangat Standar Kedai & Empati Laktosa',
        weight: 25,
        is_universal: true,
        passing_score: 75,
        definition:
          'Karyawan menyambut pelanggan dengan salam standar "Selamat datang di Kopi Nusantara", kontak mata ramah, dan mendengarkan kebutuhan khusus laktosa dengan penuh perhatian.',
        keywords_or_actions: [
          'Selamat datang di Kopi Nusantara',
          'Tentu bisa banget kak',
          'Mendengarkan aktif kebutuhan laktosa',
        ],
      },
      {
        id: 'param_oatmilk_customization',
        name: 'Penjelasan Oat Milk Ramah Lambung & 50% Less Sweet',
        weight: 25,
        is_universal: false,
        passing_score: 75,
        definition:
          'Karyawan menjelaskan opsi Oat Milk 100% plant-based creamy yang aman untuk lambung dan menyepakati tingkat manis 50% less sweet yang seimbang.',
        keywords_or_actions: [
          'Opsi Oat Milk 100% plant-based ramah lambung',
          'Rekomendasi 50% less sweet pas mantap',
          'Pilihan ukuran regular atau large',
        ],
      },
      {
        id: 'param_cross_selling_pastry',
        name: 'Cross-Selling Bundling Warm Almond Croissant',
        weight: 25,
        is_universal: false,
        passing_score: 70,
        definition:
          'Karyawan proaktif merekomendasikan pastry pendamping terfavorit (Warm Almond Croissant renyah buttery) dan menginfokan promo bundling hemat.',
        keywords_or_actions: [
          'Rekomendasi terfavorit Warm Almond Croissant',
          'Promo bundling hemat Rp10.000',
          'Tawaran dihangatkan hangat renyah',
        ],
      },
      {
        id: 'param_closing_qris',
        name: 'Konfirmasi Pesanan Kasir & Pembayaran QRIS',
        weight: 25,
        is_universal: true,
        passing_score: 75,
        definition:
          'Karyawan mengulangi pesanan lengkap dengan sopan, menyebutkan total tagihan Rp48.000, dan memandu pembayaran nontunai QRIS dengan jelas.',
        keywords_or_actions: [
          '1 Iced Oat Milk Coffee Less Sweet & 1 Warm Almond Croissant',
          'Total 48 ribu rupiah',
          'Pembayaran bisa scan QRIS di sebelah sini',
        ],
      },
    ],
  },
  {
    id: 'scen_ratio_02',
    jenis: 'ratio',
    status: 'Skenario Siap Diuji',
    target_audience: 'staff',
    department: 'fnb_barista',
    brand_name: 'Kopi Nusantara',
    title: 'Formulasi Barista: Resep Presisi Es Kopi Susu Signature & Higienitas Meja Seduh',
    category: 'Operasional F&B & Barista Presisi',
    track: 'frontline_service',
    role_context: 'Barista Station & Perakitan Minuman Kopi',
    buyer_persona: {
      name: 'Mas Dimas',
      title: 'Pelanggan Loyal Kedai Kopi',
      company: 'Pelanggan Tetap Kopi Nusantara',
      temperament: 'Penikmat kopi otentik, teliti terhadap rasa espresso, santai dan ramah',
      avatar_initials: 'DM',
      opening_objection_line:
        'Halo Mas, Es Kopi Susu Signature satu ya. Tolong takaran espresso sama susunya dibikin pas mantap ya kayak biasa, saya mau nongkrong santai di meja luar.',
    },
    task_instruction_en:
      'Jelaskan dan peragakan secara lisan formulasi SOP Es Kopi Susu Signature: 1) Kebersihan & Sanitasi: periksa kebersihan cangkir dan lap meja seduh dengan kain sanitasi; 2) Kalibrasi double shot espresso (ekstraksi tepat 36 gram); 3) Takar susu segar dingin tepat 150ml (rasio standar 1:4.1); 4) Masukkan es batu standar 120 gram sebelum cangkir ditutup rapi, pastikan bibir cangkir bersih dan kering, lalu serahkan ke pelanggan dengan logo menghadap depan.',
    evaluation_prompt_snippet:
      'Evaluasi kepatuhan higienitas stasiun seduh, kepatuhan rasio formula eksklusif 36g espresso : 150ml susu : 120g es, dan penyajian minuman profesional berorientasi tamu.',
    parameters: [
      {
        id: 'param_hygiene_station',
        name: 'Higienitas Meja Seduh & Sanitasi Cangkir',
        weight: 25,
        is_universal: true, // Universal: Standar Higienitas & Keamanan Pangan
        passing_score: 70,
        definition:
          'Karyawan menunjukkan kebersihan meja barista, memeriksa kebersihan fisik cangkir, menyeka meja dengan kain sanitasi bersih, dan menghindari kontaminasi silang.',
        keywords_or_actions: [
          'Menyeka meja seduh dengan lap sanitasi',
          'Pemeriksaan visual kebersihan cangkir sebelum diisi',
          'Penanganan higienis es batu dan penutup cangkir',
        ],
      },
      {
        id: 'param_signature_ratio',
        name: 'Kepatuhan Rasio Resep Signature (36g Kopi : 150ml Susu : 120g Es)',
        weight: 45,
        is_universal: false, // Brand-Specific: Formula Resep Rahasia Kedai
        passing_score: 70,
        definition:
          'Karyawan menyebutkan atau mengukur secara tepat formula proprietary kedai: 36 gram ekstraksi espresso double shot, 150 ml susu segar (rasio 1:4.1), dan takaran es batu standar 120 gram.',
        keywords_or_actions: [
          '36 gram ekstraksi double shot espresso',
          '150 ml susu segar dingin (rasio 1:4.1)',
          '120 gram porsi es batu standar',
        ],
      },
      {
        id: 'param_presentation_handover',
        name: 'Kerapian Visual Minuman & Penyerahan Cangkir Berlogo',
        weight: 30,
        is_universal: true, // Universal: Standar Keunggulan Penyerahan Produk
        passing_score: 70,
        definition:
          'Karyawan memeriksa kerapian lapisan minuman, memastikan bibir cangkir dan tutup bersih tanpa rembesan, lalu menyerahkan cangkir dengan logo menghadap pelanggan disertai ucapan terima kasih.',
        keywords_or_actions: [
          'Bibir cangkir diseka bersih dan tutup terkunci rapat',
          'Pemeriksaan visual layer kopi dan susu',
          'Serah terima ramah dengan logo cangkir menghadap pelanggan',
        ],
      },
    ],
  },
  {
    id: 'scen_complaint_03',
    jenis: 'complaint',
    status: 'Skenario Siap Diuji',
    target_audience: 'staff',
    department: 'fnb_barista',
    brand_name: 'Kopi Nusantara',
    title: 'Penanganan Komplain (L.A.S.T): Insiden Kesalahan Susu Sapi vs Oat Milk (Alergi Laktosa)',
    category: 'Penyelesaian Komplain & Keselamatan Tamu',
    track: 'frontline_service',
    role_context: 'Shift Supervisor / Senior Barista Cafe',
    buyer_persona: {
      name: 'Ibu Nadia',
      title: 'Pelanggan Kafe Insiden Alergi Laktosa',
      company: 'Tamu Kedai Kopi Nusantara',
      temperament: 'Cemas dan emosional karena risiko alergi susu sapi, menuntut penanganan de-eskalasi L.A.S.T dan penggantian oat milk higienis segera',
      avatar_initials: 'ND',
      opening_objection_line:
        'Mas! Ini beneran oat milk bukan?! Tadi saya tegaskan pakai oat milk karena saya alergi susu sapi parah! Ini rasanya kayak susu sapi biasa! Gimana sih, bahaya banget buat kesehatan saya!',
    },
    task_instruction_en:
      'Seorang tamu komplain keras karena memesan oat milk akibat alergi laktosa parah, namun mendapati minumannya menggunakan susu sapi biasa. Terapkan metode pemulihan L.A.S.T: 1) Listen (Simak penuh perhatian tanpa memotong atau membela diri); 2) Apologize (Minta maaf secara tulus atas kelalaian staf); 3) Solve (Segera buatkan ulang minuman baru dengan oat milk bersertifikat tanpa biaya); 4) Thank & Recovery (Ucapkan terima kasih atas teguran pelanggan dan berikan voucher minuman gratis permohonan maaf per SOP kedai).',
    evaluation_prompt_snippet:
      'Evaluasi sikap menyimak empati tanpa bersikap defensif, prioritas penanganan keselamatan kesehatan alergi (pembuatan ulang oat milk gratis), dan pemberian voucher kompensasi pemulihan layanan.',
    parameters: [
      {
        id: 'param_active_empathy',
        name: 'Mendengarkan Empatis (Active Listening) & De-eskalasi Emosi',
        weight: 35,
        is_universal: true, // Universal: Manajemen Konflik & Kecerdasan Emosional
        passing_score: 70,
        definition:
          'Karyawan mendengarkan keluhan tamu tanpa memotong pembicaraan, tidak berdalih menyalahkan rekan kerja, memvalidasi risiko kesehatan alergi secara tenang, dan menunjukkan empati profesional tulus.',
        keywords_or_actions: [
          'Mendengarkan penuh perhatian tanpa menyela penjelasan tamu',
          'Saya sangat memahami dan memohon maaf sebesar-besarnya atas kekeliruan ini',
          'Validasi bahaya alergi laktosa dengan serius dan tanggap',
        ],
      },
      {
        id: 'param_immediate_remedy',
        name: 'Tindakan Korektif Cepat & Pembuatan Ulang Oat Milk Bebas Biaya',
        weight: 35,
        is_universal: true, // Universal: Problem Solving & Keselamatan Konsumen
        passing_score: 70,
        definition:
          'Karyawan memprioritaskan keselamatan pelanggan dengan segera menawarkan pembuatan ulang minuman baru menggunakan oat milk bersertifikat secara prioritas kilat tanpa biaya tambahan.',
        keywords_or_actions: [
          'Izinkan saya segera membuatkan minuman baru yang fresh dengan oat milk',
          'Menggunakan pitcher khusus oat milk bebas kontaminasi',
          'Penggantian langsung gratis 100%',
        ],
      },
      {
        id: 'param_brand_recovery_policy',
        name: 'SOP Pemulihan Layanan & Voucher Kompensasi Minuman Gratis',
        weight: 30,
        is_universal: false, // Brand-Specific: Kebijakan Kompensasi Internal Kedai
        passing_score: 70,
        definition:
          'Karyawan menjalankan SOP pemulihan merek dengan memberikan voucher minuman gratis untuk kunjungan berikutnya, berterima kasih atas teguran pelanggan, dan mencatat insiden di buku log harian.',
        keywords_or_actions: [
          'Voucher minuman gratis sebagai bentuk permohonan maaf kami',
          'Terima kasih banyak atas teguran berharga dari Bapak/Ibu',
          'Pencatatan evaluasi ke tim bar agar tidak terulang kembali',
        ],
      },
    ],
  },
  {
    id: 'scen_sales_automotive_dealer',
    jenis: 'sales_objection',
    status: 'Rubrik Siap, Pengujian Video Menyusul',
    target_audience: 'staff',
    department: 'automotive_sales',
    brand_name: 'Nusantara Motor EV',
    title: 'Sales Showroom Otomotif: Menghadapi Keraguan DP & Simulasi Angsuran Leasing',
    category: 'Dealer Otomotif & Showroom Motor/Mobil Lokal',
    track: 'retail_sales',
    role_context: 'Sales Counter / Pramuniaga Showroom Motor Dealer Resmi Lokal',
    buyer_persona: {
      name: 'Pak Joko Susilo',
      title: 'Kepala Keluarga & Pekerja Swasta',
      company: 'Calon Pembeli Motor Komuter Harian',
      temperament: 'Ragu-ragu, khawatir angsuran membengkak, membandingkan DP dengan dealer sebelah',
      avatar_initials: 'JS',
      opening_objection_line:
        'Mas, saya naksir motor matic ini buat harian ke tempat kerja. Tapi DP 3,5 juta kok terasa berat ya? Di dealer sebelah katanya bisa DP 1,5 juta aja. Takutnya angsurannya malah bikin jebol pengeluaran bulanan keluarga.',
    },
    task_instruction_en:
      'A walk-in customer is interested in a daily commuter motorcycle but hesitates on the down payment (DP) and compares it with a competitor offering very low DP. Execute consultative showroom sales: 1) Validate their family budget concern warmly without disparaging the competitor; 2) Explain the math transparently (low DP usually means high monthly interest vs optimal DP saving up to Rp 3,000,000 in total interest over 3 years); 3) Present the dealer’s added value (free 1-year service vouchers, quick 1-day leasing approval, complimentary helmet & safety jacket); 4) Guide the customer to fill the credit pre-qualification form with zero commitment pressure.',
    evaluation_prompt_snippet:
      'Evaluate empathy in addressing family budget anxiety, transparent calculation comparing low-DP vs optimal-DP total interest costs without badmouthing competitors, and securing pre-qualification form submission.',
    parameters: [
      {
        id: 'param_auto_empathy_transparency',
        name: 'Empati Finansial Keluarga & Transparansi Simulasi Angsuran',
        weight: 35,
        is_universal: true, // Universal: Consultative Retail Negotiation
        passing_score: 70,
        definition:
          'Sales counter menyambut kekhawatiran anggaran bulanan calon pembeli dengan santun, tidak defensif atau menjatuhkan dealer kompetitor, dan mengajak duduk santai untuk melihat simulasi riil.',
        keywords_or_actions: [
          'Sangat paham kekhawatiran pengeluaran bulanan keluarga Bapak Joko',
          'Mari kita hitung transparan perbandingan angsuran per bulannya',
          'Sikap ramah dan santun tanpa merendahkan penawaran dealer lain',
        ],
      },
      {
        id: 'param_auto_tco_interest_comparison',
        name: 'Edukasi Total Bunga Cicilan vs DP Murah (Total Biaya Riil)',
        weight: 40,
        is_universal: false, // Brand-Specific: Dealer Financing Policy & Calculation Model
        passing_score: 70,
        definition:
          'Sales counter mengedukasi bahwa DP terlalu rendah seringkali menaikkan total bunga cicilan hingga jutaan rupiah, serta menjelaskan penghematan nyata jika memilih DP proporsional.',
        keywords_or_actions: [
          'Penjelasan selisih total bunga 3 tahun yang bisa hemat s/d 2-3 juta',
          'Keringanan beban angsuran per bulan agar gaji tidak terbebani',
          'Simulasi tabel angsuran leasing rekanan resmi terpercaya',
        ],
      },
      {
        id: 'param_auto_aftersales_closing',
        name: 'Penawaran Paket Servis Resmi & Closing Pra-Pengajuan Kredit',
        weight: 25,
        is_universal: true, // Universal: Retail Closing & Lead Qualification
        passing_score: 70,
        definition:
          'Sales counter melengkapi penawaran dengan benefit showroom (voucher servis gratis 1 tahun, garansi mesin, proses approval leasing 1 hari) dan mengajak mengisi form pengecekan berkas tanpa paksaan.',
        keywords_or_actions: [
          'Gratis servis berkala dan oli selama tahun pertama di bengkel resmi',
          'Proses verifikasi leasing dibantu cepat tanpa biaya tambahan',
          'Bantu cek kelengkapan berkas KTP dan KK terlebih dahulu',
        ],
      },
    ],
  },
  {
    id: 'scen_sales_property_kpr',
    jenis: 'sales_objection',
    status: 'Rubrik Siap, Pengujian Video Menyusul',
    target_audience: 'staff',
    department: 'property_sales',
    brand_name: 'Griya Asri Nusantara',
    title: 'Marketing Properti: Konsultasi KPR Rumah Pertama & Edukasi Transparan',
    category: 'Perumahan Rakyat, Rumah Subsidi & Cluster Lokal UMKM',
    track: 'retail_sales',
    role_context: 'Marketing Executive Rumah Subsidi / Cluster Pemukiman Rakyat',
    buyer_persona: {
      name: 'Mbak Rini & Mas Bayu',
      title: 'Pasangan Muda (First-time Home Buyer)',
      company: 'Pekerja Mandiri & Karyawan Swasta',
      temperament: 'Takut BI Checking/SLIK ditolak, cemas biaya akad dan notaris tersembunyi',
      avatar_initials: 'RB',
      opening_objection_line:
        'Mbak, kami pengen banget punya rumah sendiri daripada ngontrak terus tiap tahun. Tapi kami ragu, penghasilan gabungan cuma 7 juta dan takut ada biaya siluman waktu akad sama takut berkas ditolak bank.',
    },
    task_instruction_en:
      'A young working couple visits your marketing booth. They dream of owning their first home but fear hidden legal/closing fees and loan rejection. Execute empathetic property consultation: 1) Validate their dream and de-escalate anxiety with a welcoming, respectful demeanor; 2) Transparently break down total costs (All-in Booking, DP 0% / subsidised DP, estimated notary & BPHTB fees); 3) Guide them through pre-screening documents without judgment; 4) Secure a site-visit or booking hold with refundable guarantee.',
    evaluation_prompt_snippet:
      'Evaluate empathetic counseling of first-time home buyers, complete transparent disclosure of KPR upfront and hidden costs (BPHTB, AJB, notary), and securing site visit agreement.',
    parameters: [
      {
        id: 'param_prop_first_home_empathy',
        name: 'Membangun Rasa Aman & Empati Pasangan Pembeli Rumah Pertama',
        weight: 35,
        is_universal: true, // Universal: Consultative Rapport & Trust Building
        passing_score: 70,
        definition:
          'Marketing mengapresiasi niat mulia pasangan muda untuk memiliki hunian pribadi, menenangkan ketakutan penolakan bank, dan menjelaskan bahwa proses KPR bisa dipersiapkan bertahap.',
        keywords_or_actions: [
          'Apresiasi langkah berani Mbak Rini dan Mas Bayu berencana punya rumah',
          'Tenang saja, penghasilan 7 juta sangat mencukupi untuk angsuran subsidi/cluster',
          'Konsultasi santai dan bersahabat tanpa memandang sebelah mata',
        ],
      },
      {
        id: 'param_prop_transparent_cost_breakdown',
        name: 'Transparansi Biaya Akad, Notaris & Rincian Cicilan KPR Bersubsidi',
        weight: 40,
        is_universal: false, // Brand-Specific: Developer Cost Transparency & Subsidy Package
        passing_score: 70,
        definition:
          'Marketing memaparkan rincian biaya secara transparan (bebas biaya BPHTB/AJB promo developer, rincian biaya provisi bank, dan cicilan tetap flat), mencegah kecurigaan biaya tersembunyi.',
        keywords_or_actions: [
          'Rincian tertulis promo all-in bebas biaya notaris dan BPHTB',
          'Simulasi cicilan flat subsidi Rp 1,1 - 1,4 juta per bulan',
          'Kepastian uang muka dan garansi pengembalian jika berkas tidak disetujui',
        ],
      },
      {
        id: 'param_prop_site_visit_lock',
        name: 'Pendampingan Berkas SLIK & Penguncian Jadwal Survey Lokasi',
        weight: 25,
        is_universal: true, // Universal: Deal Progress & Action Commitment
        passing_score: 70,
        definition:
          'Marketing mengajak pasangan untuk melihat langsung unit contoh pada akhir pekan dan menawarkan pendampingan pra-pengecekan BI Checking/SLIK secara gratis dan aman.',
        keywords_or_actions: [
          'Ajak survey lokasi dan lihat unit contoh hari Sabtu atau Minggu ini',
          'Bantu pra-screening berkas SLIK secara aman dan rahasia',
          'Kunci unit posisi favorit sebelum kehabisan kuota subsidi',
        ],
      },
    ],
  },
  {
    id: 'scen_sales_fashion_retail',
    jenis: 'sales_discovery',
    status: 'Rubrik Siap, Pengujian Video Menyusul',
    target_audience: 'staff',
    department: 'fashion_retail',
    brand_name: 'Batik & Busana Nusantara',
    title: 'Pramuniaga Fashion: Consultative Styling, Size Fit & Cross-Selling',
    category: 'Retail Fashion, Toko Baju & Factory Outlet UMKM',
    track: 'retail_sales',
    role_context: 'Pramuniaga / Fashion Associate Toko Pakaian & Distro Lokal',
    buyer_persona: {
      name: 'Ibu Ningsih',
      title: 'Ibu Rumah Tangga',
      company: 'Pelanggan Toko Busana Keluarga',
      temperament: 'Bingung memilih ukuran dan padanan untuk acara keluarga, sensitif harga, minta potongan diskon',
      avatar_initials: 'IN',
      opening_objection_line:
        'Mbak, kemeja batik yang dipajang di manekin ini ada ukuran L buat suami saya nggak ya? Takut bahannya gerah kalau dipakai siang. Harganya bisa kurang nggak kalau saya ambil sekalian roknya?',
    },
    task_instruction_en:
      'A customer is shopping for a family event, worried about fabric comfort and asking for a discount on a mannequin outfit. Execute consultative retail selling: 1) Greet warmly with a genuine smile and check stock/size immediately; 2) Explain the cotton/linen blend advantages (breathable, wrinkle-resistant) justifying the fair store price; 3) Proactively suggest a matching accessory or complimentary outfit piece (mix-and-match styling) that qualifies for store bundle savings; 4) Escort the customer to the fitting room or checkout counter with attentive, non-pushy hospitality.',
    evaluation_prompt_snippet:
      'Evaluate retail floor hospitality, fabric/size knowledge communication without giving away arbitrary discounts, and helpful mix-and-match bundle cross-selling.',
    parameters: [
      {
        id: 'param_fashion_warm_greeting_inquiry',
        name: 'Keramahan Pramuniaga & Respons Cepat Kebutuhan Ukuran/Bahan',
        weight: 35,
        is_universal: true, // Universal: Store Hospitality & Customer Responsiveness
        passing_score: 70,
        definition:
          'Pramuniaga menyapa dengan senyum ramah, segera memeriksa ketersediaan stok ukuran L, dan mendengarkan kebutuhan acara keluarga pelanggan dengan penuh perhatian.',
        keywords_or_actions: [
          'Senyum ramah dan salam hangat: Selamat siang Ibu Ningsih',
          'Segera memeriksa stok ukuran L di etalase dan gudang',
          'Mendengarkan kebutuhan acara keluarga secara antusias',
        ],
      },
      {
        id: 'param_fashion_fabric_value_explanation',
        name: 'Edukasi Kualitas Bahan & Justifikasi Nilai Produk Toko',
        weight: 35,
        is_universal: false, // Brand-Specific: Fabric Quality Standards & Pricing Policy
        passing_score: 70,
        definition:
          'Pramuniaga menjelaskan keunggulan bahan katun primisima halus (adem, menyerap keringat, tidak mudah kusut) sehingga pelanggan yakin dengan kualitas harga tetap yang ditawarkan toko.',
        keywords_or_actions: [
          'Penjelasan bahan katun primisima halus dan adem untuk acara siang',
          'Pewarnaan awet tidak luntur meski dicuci berkali-kali',
          'Menjelaskan kualitas jahitan rapi sebanding dengan harga pas toko',
        ],
      },
      {
        id: 'param_fashion_styling_cross_sell',
        name: 'Rekomendasi Padu-Padan (Mix & Match) & Promo Paket Hemat',
        weight: 30,
        is_universal: true, // Universal: Retail Cross-Selling & Basket Size Growth
        passing_score: 70,
        definition:
          'Pramuniaga merekomendasikan padanan rok atau celana yang senada untuk memanfaatkan promo paket hemat keluarga toko (bundling discount resmi), meningkatkan nilai belanja dengan solusi yang menguntungkan pembeli.',
        keywords_or_actions: [
          'Rekomendasi paduan bawahan rok lilit motif senada untuk Ibu',
          'Tawaran promo paket bundling resmi beli sepasang dapat voucher',
          'Mengantar dengan sopan ke kamar pas (fitting room)',
        ],
      },
    ],
  },
  // =========================================================================
  // SKENARIO OTOMOTIF TAMBAHAN (NUSANTARA MOTOR EV - DONI PRASETYO)
  // =========================================================================
  {
    id: 'scen_automotive_ev_technical',
    jenis: 'sales_objection',
    status: 'Rubrik Siap, Pengujian Video Menyusul',
    target_audience: 'staff',
    department: 'automotive_sales',
    brand_name: 'Nusantara Motor EV',
    title: 'Konsultasi Teknis EV: Edukasi Ketahanan Baterai, Jarak Tempuh, & Garansi Fast Charging',
    category: 'Dealer Otomotif & Showroom Motor/Mobil Listrik',
    track: 'retail_sales',
    role_context: 'Sales Counter & Konsultan EV Showroom Nusantara Motor EV',
    buyer_persona: {
      name: 'Pak Bambang Irawan',
      title: 'Calon Pembeli Kendaraan Listrik (EV)',
      company: 'Pekerja Komuter Jabodetabek',
      temperament: 'Ragu beralih ke EV, takut baterai korsleting saat banjir, cemas biaya ganti baterai mahal, dan takut kehabisan daya di jalan',
      avatar_initials: 'BI',
      opening_objection_line:
        'Mas, saya tertarik motor listrik ini buat ngantor, tapi jujur masih ragu banget. Kalau pas musim hujan terus nerobos genangan banjir di jalan apa gak korslet ya Mas? Terus kalau baterainya drop, katanya ganti baterai harganya hampir sama kayak beli motor baru?',
    },
    task_instruction_en:
      'A prospective EV buyer expresses strong apprehension about battery water-resistance during rain/floods and replacement battery costs. Execute consultative EV sales: 1) Warmly welcome Pak Bambang, validating his concern without technical arrogance; 2) Explain IP67 waterproof battery certification (tested immersion at 1 meter depth for 30 minutes) and battery smart management system (BMS); 3) Detail the 5-year official factory warranty and calculate daily electricity savings compared to petrol; 4) Offer a hands-on showroom test ride to experience throttle response and quiet performance.',
    evaluation_prompt_snippet:
      'Evaluate consultative explanation of EV battery waterproofing standards (IP67), transparent warranty terms (5 years/50,000 km), operating cost comparison against gasoline, and inviting for a test ride.',
    parameters: [
      {
        id: 'param_auto_ev_battery_safety',
        name: 'Edukasi Sertifikasi Proteksi Baterai (IP67 Anti Air & Banjir)',
        weight: 35,
        is_universal: false, // Brand-Specific: EV Battery Safety Spec
        passing_score: 75,
        definition:
          'Konsultan EV menjelaskan secara lugas standar sertifikasi IP67 baterai kedap air dan sensor proteksi cut-off otomatis yang aman saat hujan lebat maupun genangan air.',
        keywords_or_actions: [
          'Sertifikasi kedap air dan debu IP67 standar internasional',
          'Sistem proteksi pemutus arus otomatis (BMS) anti korsleting',
          'Aman melintasi genangan air setinggi as roda tanpa risiko sengatan listrik',
        ],
      },
      {
        id: 'param_auto_ev_tco_warranty',
        name: 'Transparansi Garansi Pabrikan 5 Tahun & Simulasi Hemat Energi',
        weight: 35,
        is_universal: false, // Brand-Specific: Nusantara EV Warranty Policy
        passing_score: 70,
        definition:
          'Konsultan EV memaparkan jaminan garansi resmi baterai selama 5 tahun atau 50.000 km (ganti unit baru jika kesehatan di bawah 80%) serta perbandingan biaya listrik Rp2.500/30km vs bensin Rp15.000.',
        keywords_or_actions: [
          'Garansi resmi baterai 5 tahun bebas biaya penggantian jika drop',
          'Hemat biaya energi hingga 70% dibanding bensin harian',
          'Bebas biaya ganti oli mesin dan busi berkala',
        ],
      },
      {
        id: 'param_auto_ev_charging_consultation',
        name: 'Panduan Praktis Charging Rumahan & Penawaran Test Ride',
        weight: 30,
        is_universal: true, // Universal: Consultative Demo & Closing
        passing_score: 70,
        definition:
          'Konsultan EV menjelaskan kemudahan pengisian daya di stop kontak rumah 900VA-1300VA dan mengajak calon pembeli merasakan sensasi berkendara langsung di area test ride.',
        keywords_or_actions: [
          'Bisa dicas langsung di colokan rumah biasa tanpa perlu tambah daya',
          'Durasi cas normal 3-4 jam atau swap baterai di titik stasiun resmi',
          'Mengajak test ride unit di halaman showroom untuk membuktikan tarikan halus',
        ],
      },
    ],
  },
  {
    id: 'scen_automotive_aftersales_deescalation',
    jenis: 'complaint',
    status: 'Rubrik Siap, Pengujian Video Menyusul',
    target_audience: 'staff',
    department: 'automotive_sales',
    brand_name: 'Nusantara Motor EV',
    title: 'De-eskalasi Komplain Showroom: Keterlambatan Pengiriman Unit EV & Kepastian STNK',
    category: 'Aftersales Showroom & Kepuasan Pelanggan Otomotif',
    track: 'frontline_service',
    role_context: 'Customer Service & Front Office Showroom Nusantara Motor EV',
    buyer_persona: {
      name: 'Pak Gunawan Wibowo',
      title: 'Konsumen Showroom Unit Inden',
      company: 'Pengusaha Swasta',
      temperament: 'Marah dan kecewa karena unit motor listrik yang dijanjikan 7 hari belum dikirim ke rumah dan nomor STNK belum keluar',
      avatar_initials: 'GW',
      opening_objection_line:
        'Mas, saya minta pertanggungjawaban showroom! Minggu lalu sales bilang unit motor listrik saya dikirim paling lambat kemarin. Ini sudah lewat 3 hari belum sampai juga, nomor pelat dan STNK-nya juga gak jelas. Gimana nih pelayanannya?!',
    },
    task_instruction_en:
      'An upset customer storms into the showroom complaining that his EV motorcycle delivery is 3 days overdue and registration papers are pending. Execute L.E.A.R de-escalation: 1) Listen attentively with open posture and apologize sincerely on behalf of the dealership without finger-pointing; 2) Immediately track the logistics status in the warehouse portal while keeping the customer informed; 3) Provide an exact delivery commitment within 24 hours accompanied by an official tracking receipt; 4) Offer showroom service compensation (first year free home-service vouchers and free delivery delivery inspection).',
    evaluation_prompt_snippet:
      'Evaluate emotional composure under customer anger, sincere apology on behalf of the dealership without blaming shipping vendors, clear status tracking, and offering concrete service recovery compensation.',
    parameters: [
      {
        id: 'param_auto_complaint_empathy_listening',
        name: 'Pengendalian Emosi & Maaf Tulus Tanpa Melempar Kesalahan',
        weight: 35,
        is_universal: true, // Universal: Emotional De-escalation
        passing_score: 75,
        definition:
          'Staf showroom mendengarkan keluhan Pak Gunawan secara tenang, memvalidasi kekecewaan pelanggan, dan meminta maaf dengan tulus atas nama showroom tanpa menyalahkan pihak ekspedisi.',
        keywords_or_actions: [
          'Pak Gunawan, saya memohon maaf sebesar-besarnya atas keterlambatan pengiriman unit Bapak',
          'Kami sangat memahami rasa kecewa Bapak dan waktu Bapak sangat berharga',
          'Sikap tenang, kontak mata empati, dan tidak melempar alasan ke vendor kurir',
        ],
      },
      {
        id: 'param_auto_tracking_action_commitment',
        name: 'Pelacakan Real-Time & Kepastian Waktu Pengantaran Unit',
        weight: 35,
        is_universal: false, // Brand-Specific: Nusantara Motor Delivery Protocol
        passing_score: 75,
        definition:
          'Staf showroom segera memeriksa sistem logistik pusat, mengonfirmasi unit sudah lolos PDI (Pre-Delivery Inspection), dan memberikan kepastian pengantaran langsung ke rumah dalam waktu maksimal 24 jam.',
        keywords_or_actions: [
          'Memeriksa langsung sistem manifest pengiriman di komputer showroom',
          'Memastikan unit sudah selesai inspeksi kualitas (PDI) di gudang transit',
          'Memberikan komitmen pengantaran ke alamat rumah besok pagi pukul 09.00',
        ],
      },
      {
        id: 'param_auto_recovery_compensation',
        name: 'Kompensasi Layanan Showroom & Dokumen Surat Jalan Sementara',
        weight: 30,
        is_universal: true, // Universal: Customer Service Recovery
        passing_score: 70,
        definition:
          'Staf menyerahkan surat jalan resmi sementara dan memberikan voucher servis berkala gratis serta merchandise resmi showroom sebagai bentuk pertanggungjawaban pemulihan layanan.',
        keywords_or_actions: [
          'Menyerahkan surat jalan resmi dan bukti proses berkas Samsat',
          'Memberikan kompensasi voucher servis gratis di rumah (home service)',
          'Menutup percakapan dengan kepastian kontak langsung penanggung jawab pengiriman',
        ],
      },
    ],
  },
  // =========================================================================
  // SKENARIO FASHION TAMBAHAN (BATIK & BUSANA NUSANTARA - SITI RAHMA)
  // =========================================================================
  {
    id: 'scen_fashion_fabric_care_fitting',
    jenis: 'sales_discovery',
    status: 'Rubrik Siap, Pengujian Video Menyusul',
    target_audience: 'staff',
    department: 'fashion_retail',
    brand_name: 'Batik & Busana Nusantara',
    title: 'Hospitalitas Fitting Room: Edukasi Perawatan Sutra/Batik Tulis & Penukaran Size Santun',
    category: 'Retail Fashion, Butik Batik & Layanan Fitting Room',
    track: 'frontline_service',
    role_context: 'Fashion Advisor Butik Batik & Busana Nusantara',
    buyer_persona: {
      name: 'Mbak Alika Putri',
      title: 'Pelanggan Butik Batik Formal',
      company: 'Profesional Muda',
      temperament: 'Khawatir batik sutra tulis luntur saat dicuci dan ragu apakah baju yang dicoba di fitting room bisa ditukar size jika kekecilan',
      avatar_initials: 'AP',
      opening_objection_line:
        'Mbak, dress batik sutra ini bagus banget potongannya, tapi saya takut kalau dicuci di rumah warnanya luntur atau kainnya menciut. Terus kalau ternyata size M ini agak sempit waktu dipakai jalan, boleh ditukar gak ya?',
    },
    task_instruction_en:
      'A boutique customer loves a silk batik dress but fears fabric shrinkage/fading during home wash, and queries the return/exchange policy. Execute fashion advisor service: 1) Greet warmly and reassure her with expert fabric care knowledge (dry clean or cold soak with natural lerak soap, do not wring, shade dry); 2) Accompany her courteously to the fitting room and proactively prepare size L on standby; 3) Clearly explain the boutique’s 7-day hassle-free size exchange policy with receipt and intact price tag; 4) Deliver confident, polished retail hospitality.',
    evaluation_prompt_snippet:
      'Evaluate garment care expertise (natural lerak wash advice), proactive fitting room assistance with alternate sizing, transparent explanation of the 7-day exchange guarantee, and attentive boutique etiquette.',
    parameters: [
      {
        id: 'param_fashion_care_explanation',
        name: 'Edukasi Cara Perawatan Bahan Sutra & Sabun Lerak Alami',
        weight: 35,
        is_universal: false, // Brand-Specific: Boutique Garment Care Guidance
        passing_score: 75,
        definition:
          'Fashion advisor mengedukasi cara pencucian batik sutra tulis dengan sabun lerak cair alami tanpa pemutih, tidak diperas keras, dan diangin-anginkan di tempat teduh agar serat sutra tetap berkilau.',
        keywords_or_actions: [
          'Cukup rendam air dingin dengan sabun lerak atau sampo bayi lembut',
          'Jangan diperas kencang dan hindari sinar matahari langsung',
          'Warna menggunakan pewarna alami tahan lama dan tidak mudah pudar',
        ],
      },
      {
        id: 'param_fashion_fitting_room_service',
        name: 'Pendampingan Kamar Pas & Penyiapan Opsi Ukuran Alternatif',
        weight: 35,
        is_universal: true, // Universal: Fitting Room Etiquette
        passing_score: 70,
        definition:
          'Fashion advisor mempersilakan pelanggan ke kamar pas yang bersih, membukakan tirai/pintu dengan santun, dan proaktif menyiapkan ukuran L di luar bilik jika ukuran M terasa terlalu ketat.',
        keywords_or_actions: [
          'Mari Mbak Alika saya antarkan ke kamar pas kami di sebelah sini',
          'Saya siapkan juga ukuran L di dekat bilik ya Mbak, agar leluasa membandingkan',
          'Menanyakan kenyamanan potongan bahu dan pinggang saat dicoba',
        ],
      },
      {
        id: 'param_fashion_exchange_policy',
        name: 'Penjelasan Kebijakan Garansi Penukaran Ukuran 7 Hari',
        weight: 30,
        is_universal: false, // Brand-Specific: Boutique Exchange Policy
        passing_score: 70,
        definition:
          'Fashion advisor menjelaskan jaminan penukaran ukuran (size exchange) hingga 7 hari kerja dengan syarat membawa struk belanja dan tag harga masih utuh, memberikan rasa tenang kepada pembeli.',
        keywords_or_actions: [
          'Garansi tukar ukuran bebas biaya dalam 7 hari setelah pembelian',
          'Cukup bawa kembali struk pembelian dan pastikan label tag masih terpasang',
          'Bisa ditukar di seluruh cabang gerai Batik Nusantara terdekat',
        ],
      },
    ],
  },
  {
    id: 'scen_fashion_cashier_packaging',
    jenis: 'sales_discovery',
    status: 'Rubrik Siap, Pengujian Video Menyusul',
    target_audience: 'staff',
    department: 'fashion_retail',
    brand_name: 'Batik & Busana Nusantara',
    title: 'Kasir Butik Fashion: Transaksi Teliti, Gift Wrapping Eksklusif, & Program Loyalitas Member',
    category: 'Kasir Butik, Point of Sales & Layanan Pelanggan VIP',
    track: 'retail_sales',
    role_context: 'Kasir & Customer Service Butik Batik & Busana Nusantara',
    buyer_persona: {
      name: 'Ibu Maya Arisanti',
      title: 'Pelanggan Hadiah Kolega VIP',
      company: 'Instansi Pemerintah / Korporat',
      temperament: 'Membutuhkan kemeja batik dibungkus gift box mewah dengan pita rapi untuk cinderamata, meminta faktur/struk resmi, dan tertarik program diskon',
      avatar_initials: 'MA',
      opening_objection_line:
        'Selamat sore Mbak. Ini kemeja batik tulisnya mau saya jadikan kado untuk pimpinan rekan kerja saya. Bisa tolong dibungkus kotak kado eksklusif berpita rapi? Sama tolong struk resminya dicetak ya. Apakah ada diskon kartu member untuk pembelian ini?',
    },
    task_instruction_en:
      'A VIP boutique customer is purchasing a premium batik shirt as an executive corporate gift. Execute impeccable boutique cashier service: 1) Greet warmly by name, confirm the selected item, and examine the shirt for flawless stitching before packing; 2) Neatly fold the shirt with acid-free tissue paper, place it into the signature velvet-lined hardbox, and tie an elegant gold ribbon; 3) Print an official tax invoice/receipt and place it inside a discreet envelope; 4) Check or invite her to register for the complimentary Nusantara Privilege Loyalty Club for instant cashback.',
    evaluation_prompt_snippet:
      'Evaluate cashier courtesy and accuracy, premium gift-packaging aesthetics (tissue paper, gift box, gold ribbon), discreet receipt handling, and professional loyalty membership invitation.',
    parameters: [
      {
        id: 'param_fashion_cashier_accuracy_courtesy',
        name: 'Salam Santun Kasir, Ketelitian Struk Resmi & Pilihan Pembayaran',
        weight: 35,
        is_universal: true, // Universal: Cashier & POS Accuracy
        passing_score: 75,
        definition:
          'Kasir menyapa dengan ramah, memeriksa kerapian kemeja batik sebelum dikemas, mengonfirmasi nominal total Rp850.000 dengan jelas, dan memandu pembayaran EDC kartu kredit/QRIS.',
        keywords_or_actions: [
          'Selamat sore Ibu Maya, dengan senang hati saya siapkan transaksinya',
          'Memeriksa kancing dan jahitan kemeja untuk memastikan kualitas prima',
          'Mengonfirmasi rincian total dan mencetak struk resmi di dalam amplop rapi',
        ],
      },
      {
        id: 'param_fashion_packaging_presentation',
        name: 'Estetika Pengemasan Kotak Kado Eksklusif & Kartu Ucapan Butik',
        weight: 35,
        is_universal: false, // Brand-Specific: Nusantara Boutique Packaging Standard
        passing_score: 75,
        definition:
          'Kasir melipat kemeja dengan kertas tisu butik berlogo emas, menata di dalam kotak kado hardbox beludru, mengikat pita emas rapi, dan menyertakan kartu ucapan kosong berdesain elegan.',
        keywords_or_actions: [
          'Melipat kemeja dengan kertas tisu proteksi khusus pakaian butik',
          'Menata di kotak kado hardbox eksklusif berikat pita satin emas rapi',
          'Menyediakan kartu ucapan khusus dan tas jinjing (paper bag) tebal',
        ],
      },
      {
        id: 'param_fashion_loyalty_registration',
        name: 'Pendaftaran Member Loyalty & Poin Cashback Belanja',
        weight: 30,
        is_universal: false, // Brand-Specific: Nusantara Privilege Loyalty
        passing_score: 70,
        definition:
          'Kasir menjelaskan benefit keanggotaan Nusantara Privilege Club (cashback 5% setiap transaksi dan undangan private sale tahunan), lalu mendaftarkan nomor HP Ibu Maya dalam waktu 1 menit.',
        keywords_or_actions: [
          'Menjelaskan keuntungan gratis member Nusantara Privilege Club',
          'Poin belanja langsung terkumpul dan dapat ditukar voucher diskon',
          'Pendaftaran cepat melalui nomor handphone tanpa formulir rumit',
        ],
      },
    ],
  },
];
