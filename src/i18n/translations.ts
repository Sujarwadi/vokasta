export type Language = 'id' | 'en';

export interface Translations {
  common: {
    appName: string;
    tagline: string;
    portalMasuk: string;
    switchRole: string;
    toggleTheme: string;
    toggleLanguage: string;
    close: string;
    downloadDocx: string;
    downloadPdf: string;
    cancel: string;
    save: string;
    back: string;
    loading: string;
    verified: string;
    officialBadge: string;
    viewDetails: string;
    copyLink: string;
    linkCopied: string;
    activeProfile: string;
    languageName: string;
  };
  login: {
    portalBadge: string;
    title: string;
    description: string;
    
    // Role 1
    jobseekerBadge: string;
    jobseekerTitle: string;
    jobseekerDesc: string;
    jobseekerB1: string;
    jobseekerB2: string;
    jobseekerB3: string;
    jobseekerBtn: string;
    
    // Role 2
    staffBadge: string;
    staffTitle: string;
    staffDesc: string;
    staffB1: string;
    staffB2: string;
    staffB3: string;
    staffBtn: string;
    
    // Role 3
    managerBadge: string;
    managerTitle: string;
    managerDesc: string;
    managerB1: string;
    managerB2: string;
    managerB3: string;
    managerBtn: string;
    
    // Quick tools
    quickPitch: string;
    quickDelta: string;
    quickRoi: string;
    quickCto: string;
    quickQr: string;
    quickProposal: string;
    
    // Footer
    footerTagline: string;
    footerDoc1: string;
    footerDoc2: string;
    footerDoc3: string;
  };
  header: {
    brandSubtitle: string;
    tabAssessment: string;
    tabManager: string;
    btnSop: string;
    btnPassport: string;
    btnDemo: string;
    btnCto: string;
    btnVerify: string;
    btnPitch: string;
    btnRoi: string;
    btnProposal: string;
    btnSwitchRole: string;
    themeDark: string;
    themeLight: string;
  };
  screen1: {
    badge: string;
    title: string;
    description: string;
    candidateBadge: string;
    candidateHeroTitle: string;
    candidateHeroDesc: string;
    staffBadge: string;
    staffHeroTitle: string;
    managerBadge: string;
    managerHeroTitle: string;
    managerHeroDesc: string;
    preparing: string;
    startRandom: string;
    catalogTitle: string;
    catalogSubtitle: string;
    practiceBtn: string;
    filterAll: string;
    filterGreeting: string;
    filterComplaint: string;
    filterRatio: string;
    filterSales: string;
    categoryGeneral: string;
    categoryBarista: string;
    categoryRetail: string;
    categorySales: string;
    searchPlaceholder: string;
    scenarioCount: string;
    startSimulation: string;
    assignedBadge: string;
    rubricPreview: string;
    universalBadge: string;
    enterpriseBadge: string;
    duration: string;
  };
  screen2: {
    title: string;
    customerPersona: string;
    temperament: string;
    objective: string;
    teleprompter: string;
    cameraActive: string;
    recordBtn: string;
    stopBtn: string;
    finishBtn: string;
    dialectLabel: string;
    networkLabel: string;
    micInstruction: string;
    cameraInstruction: string;
    readyPrompt: string;
  };
  screen3: {
    title: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    processingSub: string;
    geminiBadge: string;
  };
  screen4: {
    title: string;
    overallScore: string;
    statusPassed: string;
    statusRetry: string;
    tabOverview: string;
    tabBreakdown: string;
    tabDialect: string;
    tabCredential: string;
    btnDownloadPdf: string;
    btnRetry: string;
    btnBackCatalog: string;
    customerReactionTitle: string;
    coachingTitle: string;
    rubricWeight: string;
    passingScore: string;
    fairnessAuditNote: string;
  };
  manager: {
    title: string;
    subtitle: string;
    metricTeamScore: string;
    metricCompletion: string;
    metricTurnoverSavings: string;
    metricActiveStaff: string;
    tabOverview: string;
    tabAssignments: string;
    tabStaff: string;
    tabAnalytics: string;
    btnNewAssignment: string;
    btnNewSop: string;
    btnExportAudit: string;
  };
  modals: {
    roiTitle: string;
    roiSubtitle: string;
    pitchTitle: string;
    pitchSubtitle: string;
    ctoTitle: string;
    ctoSubtitle: string;
    verifyTitle: string;
    verifySubtitle: string;
    proposalTitle: string;
    proposalSubtitle: string;
    passportTitle: string;
    passportSubtitle: string;
    sopTitle: string;
    sopSubtitle: string;
    deltaTitle: string;
    deltaSubtitle: string;
    demoTitle: string;
    demoSubtitle: string;
  };
}

export const translations: Record<Language, Translations> = {
  id: {
    common: {
      appName: 'Vokasta',
      tagline: 'Simulator Kompetensi Frontliner & Paspor Kredensial Mandiri',
      portalMasuk: 'Portal Masuk',
      switchRole: 'Ganti Peran',
      toggleTheme: 'Ganti Tema',
      toggleLanguage: 'Ganti Bahasa',
      close: 'Tutup',
      downloadDocx: 'Unduh .docx',
      downloadPdf: 'Unduh PDF',
      cancel: 'Batal',
      save: 'Simpan',
      back: 'Kembali',
      loading: 'Memuat...',
      verified: 'Standar W3C VC (Simulasi)',
      officialBadge: 'Standar Terdefinisi',
      viewDetails: 'Lihat Rincian',
      copyLink: 'Salin Tautan',
      linkCopied: 'Tautan Tersalin!',
      activeProfile: 'Profil Aktif',
      languageName: 'Bahasa Indonesia',
    },
    login: {
      portalBadge: 'Platform Latihan & Standar SOP Frontliner',
      title: 'Pilih Peran Anda untuk Memulai',
      description: 'Latihan melayani pelanggan dengan suara, lalu dapatkan penilaian dan bukti kemampuan yang bisa Anda bawa melamar kerja.',
      
      jobseekerBadge: 'Jalur Mandiri',
      jobseekerTitle: 'Pencari Kerja Mandiri',
      jobseekerDesc: 'Akses perpustakaan skenario kompetensi umum untuk latihan mandiri. Hasil latihan tersimpan rapi untuk portofolio Anda.',
      jobseekerB1: 'Katalog Skenario Umum Terstandar',
      jobseekerB2: 'Paspor Portabel (W3C/Open Badges Contoh)',
      jobseekerB3: 'Unduh Bukti PDF untuk Melamar Kerja',
      jobseekerBtn: 'Masuk Jalur Mandiri →',
      
      staffBadge: 'Pelatihan Terarah',
      staffTitle: 'Karyawan Gerai Mitra',
      staffDesc: 'Latihan penugasan SOP spesifik yang dikirim oleh Manajer Gerai Anda. Selesaikan latihan harian untuk kesiapan kerja di gerai.',
      staffB1: 'Akses Modul SOP Brand Gerai',
      staffB2: 'Papan Tugas (SOP Assignments) dari Supervisor',
      staffB3: 'Sinkronisasi Otomatis ke Dasbor Gerai',
      staffBtn: 'Mulai Tugas SOP Gerai →',
      
      managerBadge: 'Otoritas Operasional',
      managerTitle: 'Manajer Gerai / L&D Lead',
      managerDesc: 'Pantau kepatuhan standar pelayanan seluruh staf toko, buat & tugaskan modul SOP baru, dan ekspor analitik kesiapan kerja gerai dalam satu dasbor.',
      managerB1: 'Dasbor Kesiapan Tim & Analitik Kepatuhan',
      managerB2: 'Studio Pembuatan SOP Baru',
      managerB3: 'Penugasan Shift & Evaluasi Praktik',
      managerBtn: 'Buka Dasbor Manajer →',
      
      quickPitch: 'Demo 60s',
      quickDelta: 'Studi Kasus',
      quickRoi: 'Kalkulator ROI',
      quickCto: 'CTO Console',
      quickQr: 'Cek Skema QR',
      quickProposal: 'Proposal Strategis',
      
      footerTagline: 'Vokasta • Standardisasi Kesiapan Kerja Frontliner Vokasi Indonesia',
      footerDoc1: 'Proposal Strategis (.docx)',
      footerDoc2: 'Spesifikasi Lengkap (.docx)',
      footerDoc3: 'Panduan Pengguna (.docx)',
    },
    header: {
      brandSubtitle: 'Simulator Kompetensi Frontliner & Paspor Kredensial Mandiri',
      tabAssessment: 'Simulator Roleplay',
      tabManager: 'Dasbor Manajer',
      btnSop: 'Studio SOP',
      btnPassport: 'Paspor Saya',
      btnDemo: 'Video Walkthrough',
      btnCto: 'Arsitektur CTO',
      btnVerify: 'Cek Skema QR',
      btnPitch: 'Pitch Juri',
      btnRoi: 'Kalkulator ROI',
      btnProposal: 'Proposal Strategis',
      btnSwitchRole: 'Ganti Peran',
      themeDark: 'Ganti ke Tema Gelap',
      themeLight: 'Ganti ke Tema Terang',
    },
    screen1: {
      badge: 'Katalog Skenario Simulasi Terstandar',
      title: 'Pilih Titik Kritis Layanan untuk Dilatih',
      description: 'Simulasi 60-90 detik menghadapi pelanggan virtual berkarakter dinamis dengan feedback multimodal instan berbasis model Google Gemini.',
      candidateBadge: 'Jalur Pekerja Mandiri',
      candidateHeroTitle: 'Latihan Mandiri & Bangun Paspor Kompetensi',
      candidateHeroDesc: 'Uji kemampuan komunikasi frontline Anda dalam skenario nyata. Hasil evaluasi otomatis tersimpan ke dalam paspor kompetensi contoh yang dapat Anda gunakan untuk melamar ke gerai mana pun.',
      staffBadge: 'Pelatihan Operasional Gerai',
      staffHeroTitle: 'Penugasan SOP & Pelatihan Harian Gerai',
      managerBadge: 'Otoritas Manajer Toko',
      managerHeroTitle: 'Katalog Skenario & Penugasan Tim',
      managerHeroDesc: 'Lihat seluruh skenario pelatihan standar industri dan SOP khusus brand Anda. Tugaskan modul kepada staf gerai untuk memantau kesiapan pelayanan.',
      preparing: 'Menyiapkan Skenario...',
      startRandom: 'Mulai Latihan Acak (Jalur Mandiri)',
      catalogTitle: 'Katalog Skenario Mandiri Bebas SOP Brand',
      catalogSubtitle: 'Latihan mandiri dengan standar pelayanan universal tanpa terikat aturan rahasia gerai tertentu.',
      practiceBtn: 'Mulai Latihan Ini',
      filterAll: 'Semua Skenario',
      filterGreeting: 'Salam & Sambutan',
      filterComplaint: 'Penanganan Komplain',
      filterRatio: 'Rasio Kasir & Kecepatan',
      filterSales: 'Penjualan & Penawaran',
      categoryGeneral: 'Standar Umum Frontline',
      categoryBarista: 'F&B & Barista',
      categoryRetail: 'Ritel & Kasir',
      categorySales: 'B2B & Sales Lapangan',
      searchPlaceholder: 'Cari skenario berdasarkan nama, pelanggan, atau situasi...',
      scenarioCount: 'skenario tersedia',
      startSimulation: 'Mulai Simulasi Interaktif →',
      assignedBadge: 'Tugas SOP Khusus dari Manajer',
      rubricPreview: 'Rubrik Penilaian Terstandar',
      universalBadge: 'Kompetensi Portabel (W3C)',
      enterpriseBadge: 'SOP Internal Brand',
      duration: '60-90 detik / sesi',
    },
    screen2: {
      title: 'Ruang Simulasi Interaktif',
      customerPersona: 'Pelanggan Virtual Anda',
      temperament: 'Karakter & Situasi',
      objective: 'Tujuan Latihan Anda',
      teleprompter: 'Panduan Respon Cepat (SOP)',
      cameraActive: 'Kamera & Mikrofon Aktif',
      recordBtn: 'Mulai Rekam & Bicara',
      stopBtn: 'Hentikan Rekaman',
      finishBtn: 'Kirim untuk Asesmen Gemini AI →',
      dialectLabel: 'Normalisasi Dialek',
      networkLabel: 'Ketahanan Jaringan (3T Frontier)',
      micInstruction: 'Bicaralah dengan suara jelas dan intonasi tenang menghadap kamera.',
      cameraInstruction: 'Pastikan wajah dan gestur tubuh terlihat dengan pencahayaan memadai.',
      readyPrompt: 'Pelanggan siap berbicara. Klik Mulai Rekam saat Anda siap.',
    },
    screen3: {
      title: 'Pipa Evaluasi Multimodal Gemini',
      step1: '1. Pemisahan Frame Visual (1 FPS) & Spektrogram Audio',
      step2: '2. Dukungan Dialek (Desain Model)',
      step3: '3. Penilaian Rubrik Multiparameter Objektif',
      step4: '4. Penerbitan Format Kredensial W3C (Data Contoh)',
      processingSub: 'Memproses respons audio-visual Anda biasanya 20-40 detik...',
      geminiBadge: 'Ditenagai Google Gemini Multimodal SDK',
    },
    screen4: {
      title: 'Laporan Evaluasi Kinerja Frontliner',
      overallScore: 'Skor Total Kesiapan',
      statusPassed: 'LULUS STANDAR LAYANAN SOP',
      statusRetry: 'PERLU LATIHAN ULANG',
      tabOverview: 'Ikhtisar & Masukan AI',
      tabBreakdown: 'Rincian Rubrik Penilaian',
      tabDialect: 'Dukungan Dialek (Desain)',
      tabCredential: 'Paspor Kredensial W3C',
      btnDownloadPdf: 'Unduh Sertifikat PDF',
      btnRetry: 'Latihan Ulang Skenario',
      btnBackCatalog: 'Kembali ke Katalog Skenario',
      customerReactionTitle: 'Reaksi Pelanggan Virtual Pascarespons',
      coachingTitle: 'Contoh Kalimat Perbaikan (Actionable Coaching)',
      rubricWeight: 'Bobot Rubrik',
      passingScore: 'Batas Lulus',
      fairnessAuditNote: 'Penilai diinstruksikan untuk tidak menilai logat, aksen, atau kecepatan bicara. Angka pada tampilan ini adalah ilustrasi (desain, belum divalidasi).',
    },
    manager: {
      title: 'Dasbor Operasional Gerai & L&D',
      subtitle: 'Pantau kesiapan kerja staf, tugaskan modul SOP spesifik gerai, dan pantau efisiensi biaya onboarding.',
      metricTeamScore: 'Rata-rata Skor Tim',
      metricCompletion: 'Tingkat Kepatuhan SOP',
      metricTurnoverSavings: 'Penghematan Biaya Training',
      metricActiveStaff: 'Staf Aktif Tersertifikasi',
      tabOverview: 'Ringkasan Gerai',
      tabAssignments: 'Penugasan SOP Shift',
      tabStaff: 'Daftar Karyawan',
      tabAnalytics: 'Analitik & Audit Kepatuhan',
      btnNewAssignment: '+ Tugaskan SOP ke Staf',
      btnNewSop: '+ Buat Modul SOP Baru',
      btnExportAudit: 'Ekspor Audit Telemetri',
    },
    modals: {
      roiTitle: 'Kalkulator ROI & Efisiensi Biaya Onboarding',
      roiSubtitle: 'Model Finansial B2B: Memangkas Onboarding 14 Hari Menjadi 3 Hari dengan Efisiensi Biaya Signifikan',
      pitchTitle: 'Pitching Juri • Solusi Masalah Nyata dalam 60 Detik',
      pitchSubtitle: 'Solusi Kesiapan Kerja 1,72 Juta Lulusan Vokasi & Efisiensi Turnover Ritel 40%',
      ctoTitle: 'Konsol Arsitektur Enterprise CTO',
      ctoSubtitle: 'Spesifikasi Sistem, Ketahanan Jaringan 3T Frontier, & Standar W3C Verifiable Credentials',
      verifyTitle: 'Inspeksi Skema Kredensial & Pemindai Badge Fisik',
      verifySubtitle: 'Skema W3C Open Badges v3.0 & Pemindai QR Badge Karyawan (Data Contoh)',
      proposalTitle: 'Proposal Strategis & Cetak Biru Implementasi 2026',
      proposalSubtitle: 'Inovasi Google Cloud AI Builder Cup 2026 • 8 Bab Komprehensif Berstandar Korporat',
      passportTitle: 'Paspor Kredensial Mandiri Pekerja',
      passportSubtitle: 'Portofolio Keterampilan Portabel Terdesentralisasi yang Dimiliki Penuh oleh Karyawan',
      sopTitle: 'Studio Pembuatan SOP & Penugasan Shift',
      sopSubtitle: 'Rancang Modul Pelatihan Internal Gerai Berbasis Google Gemini dengan Partisi Rahasia Perusahaan',
      deltaTitle: 'Studi Kasus Progresi Kompetensi (Data Contoh)',
      deltaSubtitle: 'Perbandingan Progresi Simulasi Sesi 1 (Prapelatihan) vs Sesi 3 (Pascalatihan Vokasta)',
      demoTitle: 'Video Demo Walkthrough • Vokasta',
      demoSubtitle: 'Demonstrasi Menyeluruh Alur Kerja Simulasi & Format Kredensial W3C',
    },
  },
  en: {
    common: {
      appName: 'Vokasta',
      tagline: 'Frontline Competency Simulator & Sovereign Credential Engine',
      portalMasuk: 'Entry Portal',
      switchRole: 'Switch Role',
      toggleTheme: 'Toggle Theme',
      toggleLanguage: 'Switch Language',
      close: 'Close',
      downloadDocx: 'Download .docx',
      downloadPdf: 'Download PDF',
      cancel: 'Cancel',
      save: 'Save',
      back: 'Back',
      loading: 'Loading...',
      verified: 'W3C VC Standard (Sample)',
      officialBadge: 'Standardized Rubric',
      viewDetails: 'View Details',
      copyLink: 'Copy Link',
      linkCopied: 'Link Copied!',
      activeProfile: 'Active Profile',
      languageName: 'English',
    },
    login: {
      portalBadge: 'Practice Platform & Frontline SOP Standards',
      title: 'Select Your Role to Begin',
      description: 'Practice serving customers with voice interaction, then receive assessment and proof of competence to bring to job applications.',
      
      jobseekerBadge: 'Independent Track',
      jobseekerTitle: 'Independent Jobseeker',
      jobseekerDesc: 'Access a general library of frontline competency scenarios for independent practice. Practice results are saved to your portfolio.',
      jobseekerB1: 'Standardized Scenario Catalog',
      jobseekerB2: 'Portable Sample Passport (W3C/Open Badges)',
      jobseekerB3: 'Download PDF Summary for Job Applications',
      jobseekerBtn: 'Enter Independent Track →',
      
      staffBadge: 'Directed Training',
      staffTitle: 'Partner Store Employee',
      staffDesc: 'Practice SOP scenarios assigned by your Store Manager. Complete daily drills for shift readiness.',
      staffB1: 'Access Store Brand SOP Modules',
      staffB2: 'Active Task Board & Supervisor SOP Assignments',
      staffB3: 'Automatic Sync to Store Dashboard',
      staffBtn: 'Start Store SOP Tasks →',
      
      managerBadge: 'Operational Authority',
      managerTitle: 'Store Manager / L&D Lead',
      managerDesc: 'Monitor service standards compliance across shifts, author and dispatch new SOP modules, and export store readiness analytics in a single console.',
      managerB1: 'Team Readiness Dashboard & Compliance Analytics',
      managerB2: 'New SOP Authoring Studio',
      managerB3: 'Shift Dispatch & Practice Evaluation',
      managerBtn: 'Open Manager Dashboard →',
      
      quickPitch: '60s Demo',
      quickDelta: 'Case Studies',
      quickRoi: 'ROI Calculator',
      quickCto: 'CTO Console',
      quickQr: 'Check QR Schema',
      quickProposal: 'Strategic Proposal',
      
      footerTagline: 'Vokasta • Frontline Service Practice and Job Readiness Assessment',
      footerDoc1: 'Strategic Proposal (.docx)',
      footerDoc2: 'Full Technical Specs (.docx)',
      footerDoc3: 'User Manual (.docx)',
    },
    header: {
      brandSubtitle: 'Frontline Competency Simulator & Sovereign Credential Engine',
      tabAssessment: 'Roleplay Simulator',
      tabManager: 'Manager Dashboard',
      btnSop: 'SOP Studio',
      btnPassport: 'My Passport',
      btnDemo: 'Video Walkthrough',
      btnCto: 'CTO Blueprint',
      btnVerify: 'Check QR Schema',
      btnPitch: 'Judge Pitch',
      btnRoi: 'ROI Calculator',
      btnProposal: 'Strategic Proposal',
      btnSwitchRole: 'Switch Role',
      themeDark: 'Switch to Dark Theme',
      themeLight: 'Switch to Light Theme',
    },
    screen1: {
      badge: 'Standardized Simulation Scenario Catalog',
      title: 'Select Frontline Critical Interaction to Practice',
      description: '60-90 second micro-simulation against dynamic virtual customer personas with instant multimodal feedback powered by Google Gemini.',
      candidateBadge: 'Independent Worker Track',
      candidateHeroTitle: 'Practice Independently & Build Your Competency Passport',
      candidateHeroDesc: 'Test your frontline communication skills across realistic customer scenarios. Automated evaluations are saved to your sample competency passport to present to any employer.',
      staffBadge: 'Store Operational Training',
      staffHeroTitle: 'Assigned SOPs & Daily Store Drills',
      managerBadge: 'Store Manager Authority',
      managerHeroTitle: 'Scenario Catalog & Team Assignment',
      managerHeroDesc: 'Review universal frontline training scenarios and proprietary brand SOPs. Dispatch modules to store staff to monitor service readiness.',
      preparing: 'Preparing Scenario...',
      startRandom: 'Start Random Practice (Independent)',
      catalogTitle: 'Universal Scenario Catalog (Brand SOP-Free)',
      catalogSubtitle: 'Practice with universal hospitality and service standards without proprietary store restrictions.',
      practiceBtn: 'Practice Scenario',
      filterAll: 'All Scenarios',
      filterGreeting: 'Greeting & First Impression',
      filterComplaint: 'Complaint Handling & De-escalation',
      filterRatio: 'Speed of Service & Precision',
      filterSales: 'Upselling & Discovery',
      categoryGeneral: 'Universal Frontline Standards',
      categoryBarista: 'F&B & Specialty Coffee',
      categoryRetail: 'Retail Operations & POS',
      categorySales: 'B2B & Field Sales',
      searchPlaceholder: 'Search scenarios by title, customer persona, or situation...',
      scenarioCount: 'available scenarios',
      startSimulation: 'Start Interactive Simulation →',
      assignedBadge: 'Assigned Store SOP from Manager',
      rubricPreview: 'Standardized Rubrics',
      universalBadge: 'Portable Competency (W3C)',
      enterpriseBadge: 'Proprietary Brand SOP',
      duration: '60-90 sec / session',
    },
    screen2: {
      title: 'Interactive Simulation Studio',
      customerPersona: 'Your Virtual Customer Persona',
      temperament: 'Persona Temperament & Mood',
      objective: 'Your Practice Objective',
      teleprompter: 'Quick Response SOP Guidance',
      cameraActive: 'Camera & Microphone Active',
      recordBtn: 'Start Recording & Speak',
      stopBtn: 'Stop Recording',
      finishBtn: 'Submit for Gemini AI Assessment →',
      dialectLabel: 'Dialect Normalization',
      networkLabel: '3T Frontier Network Resilience',
      micInstruction: 'Speak clearly with calm, empathetic intonation while facing the camera.',
      cameraInstruction: 'Ensure face and upper-body posture are clearly visible under good lighting.',
      readyPrompt: 'Customer is ready to interact. Click Start Recording when prepared.',
    },
    screen3: {
      title: 'Gemini Multimodal Evaluation Pipeline',
      step1: '1. Keyframe Extraction (1 FPS) & Audio Spectrogram Processing',
      step2: '2. Dialect Support (Design Pipeline)',
      step3: '3. Multi-Parameter Objective Rubric Assessment',
      step4: '4. W3C Credential Schema Generation (Sample Data)',
      processingSub: 'Analyzing your multimodal audiovisual response usually 20-40 seconds...',
      geminiBadge: 'Powered by Google Gemini Multimodal SDK',
    },
    screen4: {
      title: 'Frontline Performance Evaluation Report',
      overallScore: 'Overall Readiness Score',
      statusPassed: 'PASSED SOP SERVICE STANDARD',
      statusRetry: 'NEEDS RE-PRACTICE',
      tabOverview: 'Overview & AI Feedback',
      tabBreakdown: 'Rubric Breakdown',
      tabDialect: 'Dialect Support (Design)',
      tabCredential: 'W3C Credential Passport',
      btnDownloadPdf: 'Download PDF Certificate',
      btnRetry: 'Re-practice Scenario',
      btnBackCatalog: 'Back to Scenario Catalog',
      customerReactionTitle: 'Virtual Customer Post-Interaction Reaction',
      coachingTitle: 'Actionable Improvement Phrases (Coaching)',
      rubricWeight: 'Weight',
      passingScore: 'Passing Score',
      fairnessAuditNote: 'The evaluator is instructed not to score accent, dialect, or speaking speed. Figures shown are illustrative (design capability, not validated).',
    },
    manager: {
      title: 'Store Operations & L&D Dashboard',
      subtitle: 'Monitor shift service readiness, dispatch store-specific SOP drills, and audit onboarding cost savings.',
      metricTeamScore: 'Average Team Score',
      metricCompletion: 'SOP Compliance Rate',
      metricTurnoverSavings: 'Training Cost Savings',
      metricActiveStaff: 'Certified Active Staff',
      tabOverview: 'Store Overview',
      tabAssignments: 'Shift SOP Assignments',
      tabStaff: 'Employee Directory',
      tabAnalytics: 'Analytics & Compliance Audit',
      btnNewAssignment: '+ Dispatch SOP to Staff',
      btnNewSop: '+ Create New SOP Module',
      btnExportAudit: 'Export Telemetry Audit',
    },
    modals: {
      roiTitle: 'Store Onboarding ROI & Cost-Efficiency Calculator',
      roiSubtitle: 'B2B Financial Model: Compressing 14-Day Onboarding to 3 Days with ~90% Cost Efficiency',
      pitchTitle: 'Judge Pitch • 60-Second Real-World Problem & Solution',
      pitchSubtitle: 'Empowering 1.72M Vocational Graduates & Curbing 40% Retail Turnover',
      ctoTitle: 'Enterprise CTO Architecture Console',
      ctoSubtitle: 'System Specifications, 3T Frontier Offline Resilience, & W3C Verifiable Credentials',
      verifyTitle: 'Credential Schema Inspector & Physical Badge Scanner',
      verifySubtitle: 'W3C Open Badges v3.0 Schema & Physical Badge QR Scanner (Sample Data)',
      proposalTitle: 'Strategic Proposal & Implementation Blueprint 2026',
      proposalSubtitle: 'Google Cloud AI Builder Cup 2026 • 8 Comprehensive Corporate Chapters',
      passportTitle: 'Sovereign Worker Credential Passport',
      passportSubtitle: 'Portable, Decentralized Frontline Competency Portfolio Owned by the Worker',
      sopTitle: 'SOP Authoring Studio & Shift Dispatch',
      sopSubtitle: 'Author Grounded In-Store Training Modules with Corporate Secret Partitioning',
      deltaTitle: 'Competency Progression Case Studies (Sample Data)',
      deltaSubtitle: 'Simulation Progression Comparison: Session 1 (Pre-Training) vs Session 3 (Post-Vokasta)',
      demoTitle: 'Walkthrough Video Demo • Vokasta',
      demoSubtitle: 'End-to-End Multimodal Simulation & W3C Credential Format Demonstration',
    },
  },
};
