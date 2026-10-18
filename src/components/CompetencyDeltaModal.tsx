import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  X,
  AlertTriangle,
  CheckCircle2,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Building2,
  Star,
  Users,
  Award,
  Zap,
  Play,
  Pause,
  Loader2,
} from 'lucide-react';
import { neuralAudio } from '../utils/neuralAudioPlayer';
import { useLanguage } from '../i18n/LanguageContext';

interface CompetencyDeltaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTryScenario?: (scenarioId: string) => void;
}

interface CaseStudy {
  id: string;
  scenarioId: string;
  title: string;
  category: string;
  candidateName: string;
  dialect: string;
  before: {
    score: number;
    status: string;
    studentSpeech: string;
    studentAudioTone: string;
    customerReaction: string;
    customerSentiment: string;
    scores: { param: string; score: number }[];
    businessRisk: string;
  };
  after: {
    score: number;
    status: string;
    studentSpeech: string;
    studentAudioTone: string;
    customerReaction: string;
    customerSentiment: string;
    scores: { param: string; score: number }[];
    businessGain: string;
  };
  delta: {
    scoreDelta: number;
    timeReduction: string;
    complianceDelta: string;
    sentimentFlip: string;
  };
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case_barista',
    scenarioId: 'scen_greeting_01',
    title: 'Penanganan Alergi Laktosa & Pilihan Oat Milk',
    category: 'F&B & Barista Service',
    candidateName: 'Rian Pratama (SMK Tata Niaga Bandung)',
    dialect: 'Sunda (Jawa Barat)',
    before: {
      score: 48,
      status: 'BELUM KOMPETEN (GAGAL)',
      studentSpeech:
        '"Aduh maaf Kak, tadi teman saya yang salah tuang susunya di bar belakang, lagian tadi antrean lagi rame banget. Boleh nunggu bentar gak ya Kak?"',
      studentAudioTone: 'Gugup, melempar kesalahan ke rekan kerja, tidak ada kepastian waktu ganti.',
      customerReaction:
        '"Mbak Sarah panik dan marah: \'Lho kok lempar-lemparan? Saya punya alergi laktosa parah! Kalau sampai saya masuk IGD siapa yang tanggung jawab?! Mana manajer kamu?!\'"',
      customerSentiment: 'Marah & Sangat Kecewa (Dissatisfied)',
      scores: [
        { param: 'Kontak Awal & Keramahan', score: 45 },
        { param: 'Identifikasi Alergi & Produk', score: 35 },
        { param: 'De-eskalasi & Tanggung Jawab', score: 30 },
      ],
      businessRisk:
        'Risiko tuntutan hukum medis alergi, ulasan bintang 1 viral di Google Maps, potensi kehilangan pelanggan tetap.',
    },
    after: {
      score: 94,
      status: 'SANGAT KOMPETEN (LULUS EMAS)',
      studentSpeech:
        '"Hapunten pisan Teh, kami langsung minta maaf atas kelalaian ini. Cangkir ini segera kami amankan dan kami buatkan ulang dengan Oat Milk baru dalam 2 menit. Keselamatan Teh Sarah adalah prioritas utama kami."',
      studentAudioTone: 'Tenang, langsung meminta maaf tanpa dalih, berinisiatif sigap, menggunakan etika lokal santun.',
      customerReaction:
        '"Mbak Sarah tersenyum lega: \'Alhamdulillah nuhun pisan ya Kang sudah langsung tanggap dan bertanggung jawab. Saya jadi tenang ngopi di sini.\'"',
      customerSentiment: 'Sangat Puas & Terkesan (Impressed)',
      scores: [
        { param: 'Kontak Awal & Keramahan', score: 96 },
        { param: 'Identifikasi Alergi & Produk', score: 98 },
        { param: 'De-eskalasi & Tanggung Jawab', score: 95 },
      ],
      businessGain:
        'Retensi pelanggan terjaga (proyeksi ilustratif), komplain dimitigasi menjadi ulasan positif, risiko operasional diminimalisasi.',
    },
    delta: {
      scoreDelta: 46,
      timeReduction: 'Dari 18 detik lamban ➡️ Menjadi 3 detik respon tanggap',
      complianceDelta: 'Kepatuhan SOP Alergi: 35% ➡️ 98%',
      sentimentFlip: 'Marah/Komplain ➡️ Pelanggan Loyal Rekomendasi',
    },
  },
  {
    id: 'case_automotive',
    scenarioId: 'scen_automotive_ev_technical',
    title: 'Keraguan Teknis Calon Pembeli Motor Listrik (Baterai & Banjir)',
    category: 'Showroom & Automotive Sales',
    candidateName: 'Doni Saputra (SMK Otomotif Surabaya)',
    dialect: 'Jawa Timur',
    before: {
      score: 54,
      status: 'BELUM KOMPETEN (GAGAL)',
      studentSpeech:
        '"Wah kalau soal banjir ya mending jangan diterobos mas, namanya juga listrik pasti korslet. Terus baterainya ya memang mahal mas kalau rusak, mending beli motor bensin aja kalau ragu."',
      studentAudioTone: 'Tidak menguasai data teknis, meremehkan produk sendiri, mengusir prospek pembeli.',
      customerReaction:
        '"Pak Joko menggelengkan kepala: \'Lho salesnya kok malah gak yakin sama produknya sendiri? Ya sudah mas, saya gak jadi beli di dealer ini.\'"',
      customerSentiment: 'Skeptis & Batal Beli (Lost Opportunity)',
      scores: [
        { param: 'Penguasaan Data Produk', score: 40 },
        { param: 'Penanganan Keberatan (Objection)', score: 42 },
        { param: 'Penutupan Penjualan (Closing)', score: 38 },
      ],
      businessRisk:
        'Kehilangan potensi omzet Rp 24.500.000, reputasi dealer jatuh, target kuota unit gagal tercapai.',
    },
    after: {
      score: 93,
      status: 'SANGAT KOMPETEN (LULUS EMAS)',
      studentSpeech:
        '"Monggo Cak Joko, kulo terangaken. Baterai motor listrik puniki sampun tersertifikasi IP67 kedap toya tahan rendaman banjir 1 meter selama 30 menit. Ditambah garansi resmi baterai 5 tahun full ganti baru. Mangga dicoba test-ride riyen Cak."',
      studentAudioTone: 'Percaya diri, mengacu pada data sertifikasi pabrikan, menawarkan test-ride tanpa memaksa.',
      customerReaction:
        '"Pak Joko antusias: \'Oh ngonten toh Cak penjelasane, masuk akal dan tenang atiku lek onok garansi 5 tahun. Ayo Cak tak coba test-ride saiki!\'"',
      customerSentiment: 'Yakin & Siap Transaksi (Ready to Buy)',
      scores: [
        { param: 'Penguasaan Data Produk', score: 95 },
        { param: 'Penanganan Keberatan (Objection)', score: 94 },
        { param: 'Penutupan Penjualan (Closing)', score: 91 },
      ],
      businessGain:
        'Konversi transaksi senilai Rp 24,5 Juta tercapai, prospek memberikan referensi ke komunitas motor listrik.',
    },
    delta: {
      scoreDelta: 39,
      timeReduction: 'Dari ragu non-data ➡️ Langsung kutip data uji IP67 & Garansi',
      complianceDelta: 'Kepatuhan Penjelasan Garansi: 40% ➡️ 96%',
      sentimentFlip: 'Ragu Batal Beli ➡️ Closing Transaksi Sukses',
    },
  },
  {
    id: 'case_complaint',
    scenarioId: 'scen_jobseeker_complaint_deescalation',
    title: 'De-Eskalasi Antrean & Warga Marah di Meja Layanan',
    category: 'Layanan Publik & Administrasi',
    candidateName: 'Siti Rahma (SMK Administrasi Perkantoran)',
    dialect: 'Bahasa Indonesia Formal / Urban',
    before: {
      score: 51,
      status: 'BELUM KOMPETEN (GAGAL)',
      studentSpeech:
        '"Bapak jangan teriak-teriak dong! Semua orang di sini juga lagi antre, bukan cuma Bapak doang yang buru-buru! Duduk aja dulu tunggu dipanggil!"',
      studentAudioTone: 'Nada tinggi, menyulut emosi warga, tidak menawarkan solusi waktu.',
      customerReaction:
        '"Pak Hendra semakin emosi dan menggebrak meja: \'Kamu ini petugas gak punya sopan santun ya! Saya rekam muka kamu, biar viral sekalian kelakuan kamu di media sosial!\'"',
      customerSentiment: 'Kemarahan Eskalasi Tinggi (High Crisis)',
      scores: [
        { param: 'Peredaman Emosi (De-eskalasi)', score: 35 },
        { param: 'Etika Komunikasi Publik', score: 40 },
        { param: 'Solusi Batas Waktu', score: 30 },
      ],
      businessRisk:
        'Krisis reputasi instansi publik di media sosial, kekacauan antrean di loket, stres kerja petugas.',
    },
    after: {
      score: 95,
      status: 'SANGAT KOMPETEN (LULUS EMAS)',
      studentSpeech:
        '"Selamat pagi Bapak Hendra, saya sangat memahami kekhawatiran Bapak karena sudah menunggu lama. Mari saya bantu cek berkasnya secara prioritas di loket 3 dalam waktu 2 menit ini ya Pak. Mohon berkenan menunggu sebentar."',
      studentAudioTone: 'Suara empati hangat, menyebutkan nama warga, memberikan garansi batas waktu 2 menit.',
      customerReaction:
        '"Pak Hendra langsung mereda: \'Nah begitu dong mba, terima kasih sudah mau dengar keluhan saya dengan tenang. Tolong dibantu ya mba.\'"',
      customerSentiment: 'Teredam & Menghargai Petugas (De-escalated)',
      scores: [
        { param: 'Peredaman Emosi (De-eskalasi)', score: 98 },
        { param: 'Etika Komunikasi Publik', score: 95 },
        { param: 'Solusi Batas Waktu', score: 92 },
      ],
      businessGain:
        'Insiden terselesaikan dalam 90 detik tanpa keributan, kepuasan indeks layanan masyarakat (IKM) 98%.',
    },
    delta: {
      scoreDelta: 44,
      timeReduction: 'Dari adu argumen 15 menit ➡️ Selesai damai dalam 90 detik',
      complianceDelta: 'Kepatuhan SOP Protokol Empati: 35% ➡️ 97%',
      sentimentFlip: 'Ancaman Viral Negatif ➡️ Pujian Pelayanan Ramah',
    },
  },
];

const CASE_STUDIES_EN: CaseStudy[] = [
  {
    id: 'case_barista',
    scenarioId: 'scen_greeting_01',
    title: 'Lactose Allergy Management & Oat Milk Screening',
    category: 'F&B & Barista Service',
    candidateName: 'Rian Pratama (Bandung Vocational High)',
    dialect: 'Sundanese (West Java)',
    before: {
      score: 48,
      status: 'NOT YET COMPETENT (FAILED)',
      studentSpeech:
        '"Uh, sorry Sis, my colleague at the back bar poured the wrong milk earlier. Besides, the queue was really long. Can you wait a moment, please?"',
      studentAudioTone: 'Nervous, deflecting blame to teammate, no definite turnaround time.',
      customerReaction:
        '"Ms. Sarah panics and gets upset: \'Wait, you\'re blaming each other? I have severe lactose intolerance! If I end up in the ER, who is responsible?! Where is your manager?!\'"',
      customerSentiment: 'Upset & Dissatisfied',
      scores: [
        { param: 'Initial Greeting & Warmth', score: 45 },
        { param: 'Allergy Screening & Product Knowledge', score: 35 },
        { param: 'De-escalation & Accountability', score: 30 },
      ],
      businessRisk:
        'Legal liability for medical allergy, viral 1-star Google Maps review, loss of loyal customer.',
    },
    after: {
      score: 94,
      status: 'HIGHLY COMPETENT (GOLD PASS)',
      studentSpeech:
        '"Sampurasun Teh, we sincerely apologize for this oversight. I will immediately secure this cup and freshly prepare a new drink with Oat Milk in under 2 minutes. Teh Sarah\'s safety is our top priority."',
      studentAudioTone: 'Calm, apologetic without excuses, proactive, honoring regional courtesy norms.',
      customerReaction:
        '"Ms. Sarah smiles with relief: \'Thank goodness, thank you so much Kang for being so responsive and taking full responsibility. I feel safe ordering here now.\'"',
      customerSentiment: 'Highly Satisfied & Impressed',
      scores: [
        { param: 'Initial Greeting & Warmth', score: 96 },
        { param: 'Allergy Screening & Product Knowledge', score: 98 },
        { param: 'De-escalation & Accountability', score: 95 },
      ],
      businessGain:
        'Customer retention secured (illustrative projection), complaint successfully mitigated into a positive review, operational risk minimized.',
    },
    delta: {
      scoreDelta: 46,
      timeReduction: 'From 18s hesitant delay ➡️ 3s prompt reassuring response',
      complianceDelta: 'Allergy SOP Compliance: 35% ➡️ 98%',
      sentimentFlip: 'Upset Complaint ➡️ Loyal Brand Advocate',
    },
  },
  {
    id: 'case_automotive',
    scenarioId: 'scen_automotive_ev_technical',
    title: 'EV Scooter Technical Inquiries (Battery & Flooding Resistance)',
    category: 'Showroom & Automotive Sales',
    candidateName: 'Doni Saputra (Surabaya Automotive Vocational)',
    dialect: 'East Javanese',
    before: {
      score: 54,
      status: 'NOT YET COMPETENT (FAILED)',
      studentSpeech:
        '"Well, when it comes to floods, you better not ride through it, bro. It\'s electric so it will short-circuit. And replacing the battery is expensive. If you\'re doubtful, maybe just buy a petrol bike."',
      studentAudioTone: 'Lacks technical product data, undermines own product, turns away prospect.',
      customerReaction:
        '"Mr. Joko shakes his head: \'Wait, even the sales rep isn\'t confident in the product? Never mind then, I won\'t buy from this dealership.\'"',
      customerSentiment: 'Skeptical & Lost Opportunity',
      scores: [
        { param: 'Product Technical Knowledge', score: 40 },
        { param: 'Objection Handling', score: 42 },
        { param: 'Sales Closing', score: 38 },
      ],
      businessRisk:
        'Loss of Rp 24,500,000 in revenue, dealership reputation tarnished, missed unit quota.',
    },
    after: {
      score: 93,
      status: 'HIGHLY COMPETENT (GOLD PASS)',
      studentSpeech:
        '"Please have a seat, Cak Joko, allow me to clarify. This electric motorcycle battery is IP67 water-resistant certified, tested submerged in 1 meter of floodwater for 30 minutes. Plus, it includes an official 5-year full replacement warranty. Please feel free to test-ride it right now, Cak."',
      studentAudioTone: 'Confident, grounded in official certified test data, offers test-ride without pressure.',
      customerReaction:
        '"Mr. Joko is enthusiastic: \'Oh, that explains it well, Cak. It makes sense and I feel reassured with that 5-year warranty. Let\'s go, I\'d love to test-ride it now!\'"',
      customerSentiment: 'Reassured & Ready to Buy',
      scores: [
        { param: 'Product Technical Knowledge', score: 95 },
        { param: 'Objection Handling', score: 94 },
        { param: 'Sales Closing', score: 91 },
      ],
      businessGain:
        'Rp 24.5M transaction converted, customer refers dealership to EV enthusiast community.',
    },
    delta: {
      scoreDelta: 39,
      timeReduction: 'From initial hesitation ➡️ Instantly cites IP67 and Warranty metrics',
      complianceDelta: 'Warranty Explanation Compliance: 40% ➡️ 96%',
      sentimentFlip: 'Hesitant Walkout ➡️ Successful Deal Closed',
    },
  },
  {
    id: 'case_complaint',
    scenarioId: 'scen_jobseeker_complaint_deescalation',
    title: 'Public Service Desk Line De-Escalation & Frustrated Citizen',
    category: 'Public Service & Administration',
    candidateName: 'Siti Rahma (Office Administration Vocational)',
    dialect: 'Formal Urban Indonesian',
    before: {
      score: 51,
      status: 'NOT YET COMPETENT (FAILED)',
      studentSpeech:
        '"Sir, please don\'t shout! Everyone here is waiting in line, you\'re not the only one in a hurry! Just sit down and wait for your number!"',
      studentAudioTone: 'High pitch, provokes citizen emotion, offers no timeframe solution.',
      customerReaction:
        '"Mr. Hendra gets even more furious and slams the counter: \'You have no courtesy at all! I\'m recording this so everyone online sees how terrible you treat people!\'"',
      customerSentiment: 'High Escalation & Crisis',
      scores: [
        { param: 'De-escalation & Composure', score: 35 },
        { param: 'Public Communication Ethics', score: 40 },
        { param: 'Timeframe Resolution', score: 30 },
      ],
      businessRisk:
        'Public agency PR crisis on social media, chaos at service counter, staff workplace stress.',
    },
    after: {
      score: 95,
      status: 'HIGHLY COMPETENT (GOLD PASS)',
      studentSpeech:
        '"Good morning Mr. Hendra, I completely understand your frustration after waiting so long. Let me personally expedite checking your documents at Counter 3 within the next 2 minutes, Sir. Please bear with us for just a moment."',
      studentAudioTone: 'Warm empathetic tone, addresses citizen by name, provides 2-minute resolution guarantee.',
      customerReaction:
        '"Mr. Hendra calms down immediately: \'That\'s much better, thank you for listening patiently. Please assist me, thank you.\'"',
      customerSentiment: 'De-escalated & Respectful',
      scores: [
        { param: 'De-escalation & Composure', score: 98 },
        { param: 'Public Communication Ethics', score: 95 },
        { param: 'Timeframe Resolution', score: 92 },
      ],
      businessGain:
        'Incident resolved in 90 seconds without commotion, 98% public service satisfaction index.',
    },
    delta: {
      scoreDelta: 44,
      timeReduction: 'From 15-minute shouting match ➡️ Peacefully resolved in 90 seconds',
      complianceDelta: 'Empathy Protocol Compliance: 35% ➡️ 97%',
      sentimentFlip: 'Viral Threat ➡️ Praised Courteous Service',
    },
  },
];

export const CompetencyDeltaModal: React.FC<CompetencyDeltaModalProps> = ({
  isOpen,
  onClose,
  onTryScenario,
}) => {
  const { language } = useLanguage();
  const caseList = language === 'en' ? CASE_STUDIES_EN : CASE_STUDIES;
  const [activeCaseId, setActiveCaseId] = useState<string>(CASE_STUDIES[0].id);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [loadingAudioId, setLoadingAudioId] = useState<string | null>(null);

  const currentCase = caseList.find((c) => c.id === activeCaseId) || caseList[0];

  const getAudioTrackConfig = (caseId: string, trackType: 'before_student' | 'before_customer' | 'after_student' | 'after_customer') => {
    if (caseId === 'case_barista') {
      if (trackType === 'before_student') {
        return {
          voiceName: 'Puck',
          isFemale: false,
          stylePrompt: 'Bicara gugup, panik, melempar kesalahan ke teman bar belakang',
          prosody: { pitch: '+3Hz', rate: '+10%' },
        };
      }
      if (trackType === 'before_customer') {
        return {
          voiceName: 'Zephyr',
          isFemale: true,
          stylePrompt: 'Bicara panik, marah, kecewa berat menuntut tanggung jawab alergi laktosa',
          prosody: { pitch: '+4Hz', rate: '+8%' },
        };
      }
      if (trackType === 'after_student') {
        return {
          voiceName: 'Puck',
          isFemale: false,
          dialect: 'sunda',
          stylePrompt: 'Bicara tenang, santun, bertanggung jawab dalam bahasa Sunda halus',
          prosody: { pitch: '+1Hz', rate: '-1%' },
        };
      }
      return {
        voiceName: 'Zephyr',
        isFemale: true,
        dialect: 'sunda',
        stylePrompt: 'Bicara lega, tersenyum, berterima kasih dalam bahasa Sunda santun',
        prosody: { pitch: '+3Hz', rate: '+2%' },
      };
    }

    if (caseId === 'case_automotive') {
      if (trackType === 'before_student') {
        return {
          voiceName: 'Charon',
          isFemale: false,
          stylePrompt: 'Bicara ragu-ragu dan tidak paham teknis baterai motor listrik',
          prosody: { pitch: '-1Hz', rate: '-2%' },
        };
      }
      if (trackType === 'before_customer') {
        return {
          voiceName: 'Fenrir',
          isFemale: false,
          stylePrompt: 'Bicara kecewa dan skeptis karena sales ragu',
          prosody: { pitch: '-2Hz', rate: '+2%' },
        };
      }
      if (trackType === 'after_student') {
        return {
          voiceName: 'Charon',
          isFemale: false,
          dialect: 'jawa',
          stylePrompt: 'Bicara mantap dan percaya diri menjelaskan sertifikasi IP67 dan garansi dalam bahasa Jawa santun',
          prosody: { pitch: '-2Hz', rate: '+2%' },
        };
      }
      return {
        voiceName: 'Fenrir',
        isFemale: false,
        dialect: 'jawa',
        stylePrompt: 'Bicara antusias dan mantap siap test-ride dalam bahasa Jawa santun',
        prosody: { pitch: '+1Hz', rate: '+3%' },
      };
    }

    // case_complaint
    if (trackType === 'before_student') {
      return {
        voiceName: 'Aoede',
        isFemale: true,
        stylePrompt: 'Bicara nada tinggi, kaku, defensif menyulut emosi warga antrean',
        prosody: { pitch: '+4Hz', rate: '+10%' },
      };
    }
    if (trackType === 'before_customer') {
      return {
        voiceName: 'Charon',
        isFemale: false,
        stylePrompt: 'Bicara marah besar dan membentak menuntut keadilan antrean',
        prosody: { pitch: '-1Hz', rate: '+10%' },
      };
    }
    if (trackType === 'after_student') {
      return {
        voiceName: 'Aoede',
        isFemale: true,
        stylePrompt: 'Bicara suara empati hangat, ramah, menenangkan, memberikan kepastian batas waktu 2 menit',
        prosody: { pitch: '+1Hz', rate: '-2%' },
      };
    }
    return {
      voiceName: 'Charon',
      isFemale: false,
      stylePrompt: 'Bicara langsung mereda dan berterima kasih atas respon tenang petugas',
      prosody: { pitch: '-2Hz', rate: '0%' },
    };
  };

  // Preload tracks for current case study
  useEffect(() => {
    if (isOpen) {
      const cfgBefore = getAudioTrackConfig(currentCase.id, 'before_student');
      const cfgAfter = getAudioTrackConfig(currentCase.id, 'after_student');
      neuralAudio.preload([
        {
          text: currentCase.before.studentSpeech,
          ...cfgBefore,
        },
        {
          text: currentCase.after.studentSpeech,
          ...cfgAfter,
        },
      ]);
    }

    return () => {
      neuralAudio.stop();
      setPlayingAudioId(null);
      setLoadingAudioId(null);
    };
  }, [isOpen, activeCaseId]);

  const handlePlayNeuralSpeech = (
    text: string,
    id: string,
    trackType: 'before_student' | 'before_customer' | 'after_student' | 'after_customer'
  ) => {
    if (playingAudioId === id) {
      neuralAudio.stop();
      setPlayingAudioId(null);
      setLoadingAudioId(null);
      return;
    }

    setLoadingAudioId(id);
    const cfg = getAudioTrackConfig(currentCase.id, trackType);

    neuralAudio.play(
      id,
      {
        text: text.replace(/["']/g, ''),
        ...cfg,
      },
      () => {
        setLoadingAudioId(null);
        setPlayingAudioId(id);
      },
      () => {
        setLoadingAudioId(null);
        setPlayingAudioId(null);
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl my-8 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                {language === 'en' ? 'Simulated Learning Progression Case Study (Sample Data)' : 'Studi Kasus Progresi Pembelajaran Simulasi (Data Contoh)'}
              </span>
              <span className="text-xs text-slate-400">• Multi-Turn Competency Delta</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {language === 'en'
                ? 'Competency Comparison Stage: Before vs. After Vokasta'
                : 'Panggung Komparasi Kompetensi: Sebelum vs. Sesudah Vokasta'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
              {language === 'en'
                ? 'Witness how 3 targeted simulation sessions transform nervous, defensive candidates into 5-star professional frontline talent.'
                : 'Lihat bagaimana 3 sesi simulasi roleplay terarah mengubah siswa yang awalnya gugup dan defensif menjadi frontliner profesional beretika bintang 5.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Case Selector Tabs */}
        <div className="px-6 pt-4 border-b border-slate-800 bg-slate-950/40 flex flex-wrap gap-2">
          {caseList.map((c) => {
            const isActive = c.id === activeCaseId;
            return (
              <button
                key={c.id}
                onClick={() => {
                  neuralAudio.stop();
                  setPlayingAudioId(null);
                  setLoadingAudioId(null);
                  setActiveCaseId(c.id);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/10'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800 hover:bg-slate-850'
                }`}
              >
                <span>{c.title}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-md font-extrabold ${
                    isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-emerald-400'
                  }`}
                >
                  +{c.delta.scoreDelta} {language === 'en' ? 'Pts' : 'Poin'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 flex-1">
          {/* Active Case Banner & Candidate Metadata */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-400 font-medium">
                {language === 'en' ? 'Simulated Candidate Persona Case Study (Sample):' : 'Studi Kasus Persona Simulasi (Data Contoh):'}
              </div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                <span>{currentCase.candidateName}</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {currentCase.category}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">{language === 'en' ? 'Selected Dialect:' : 'Dialek Terpilih:'}</span>
              <span className="font-bold text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-800/60">
                {currentCase.dialect}
              </span>
            </div>
          </div>

          {/* Side-by-Side Comparison Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT COLUMN: SEBELUM DILATIH (Sesi 1 / Pre-Test) */}
            <div className="bg-rose-950/20 border border-rose-900/60 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    {language === 'en' ? 'Session 1: Before Training' : 'Sesi 1: Sebelum Dilatih'}
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-rose-400">{currentCase.before.score}</span>
                    <span className="text-xs text-rose-300/70">/100</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="text-xs font-semibold text-rose-400">
                  {language === 'en' ? 'Status:' : 'Status:'} {currentCase.before.status}
                </div>

                {/* Candidate Speech Box */}
                <div className="bg-slate-900/80 border border-rose-900/40 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-slate-300">
                      {language === 'en' ? 'Candidate Speech (Nervous / Defensive):' : 'Ucapan Kandidat (Gugup / Spontan):'}
                    </span>
                    <button
                      onClick={() =>
                        handlePlayNeuralSpeech(
                          currentCase.before.studentSpeech,
                          `${currentCase.id}_before_student`,
                          'before_student'
                        )
                      }
                      disabled={loadingAudioId === `${currentCase.id}_before_student`}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-900/50 hover:bg-rose-800 text-rose-200 text-xs font-semibold transition cursor-pointer disabled:opacity-60"
                    >
                      {loadingAudioId === `${currentCase.id}_before_student` ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin text-rose-300" />
                          <span>{language === 'en' ? 'Synthesizing...' : 'Sintesis...'}</span>
                        </>
                      ) : playingAudioId === `${currentCase.id}_before_student` ? (
                        <>
                          <Pause className="w-3 h-3 animate-pulse text-rose-300" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3 text-rose-300" />
                          <span>{language === 'en' ? 'Student Neural Voice' : 'Suara Neural Siswa'}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm italic text-rose-200/90 font-mono leading-relaxed">
                    {currentCase.before.studentSpeech}
                  </p>
                  <p className="text-xs text-slate-400 pt-1 border-t border-slate-800">
                    <span className="font-semibold text-rose-400">
                      {language === 'en' ? 'Attitude Evaluation:' : 'Evaluasi Sikap:'}
                    </span>{' '}
                    {currentCase.before.studentAudioTone}
                  </p>
                </div>

                {/* Customer Reaction Box */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">
                      {language === 'en' ? 'AI Customer Persona Reaction:' : 'Reaksi Pelanggan / Warga AI:'}
                    </span>
                    <button
                      onClick={() =>
                        handlePlayNeuralSpeech(
                          currentCase.before.customerReaction,
                          `${currentCase.id}_before_customer`,
                          'before_customer'
                        )
                      }
                      disabled={loadingAudioId === `${currentCase.id}_before_customer`}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer disabled:opacity-60"
                    >
                      {loadingAudioId === `${currentCase.id}_before_customer` ? (
                        <Loader2 className="w-2.5 h-2.5 animate-spin text-slate-300" />
                      ) : playingAudioId === `${currentCase.id}_before_customer` ? (
                        <>
                          <Pause className="w-2.5 h-2.5 animate-pulse text-amber-300" />
                          <span className="text-amber-300">Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-2.5 h-2.5 text-slate-400" />
                          <span>{language === 'en' ? 'Listen AI Reaction' : 'Dengar Reaksi AI'}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic">
                    {currentCase.before.customerReaction}
                  </p>
                  <div className="text-xs font-medium text-rose-400 pt-1">
                    {language === 'en' ? 'Sentiment:' : 'Sentimen:'} {currentCase.before.customerSentiment}
                  </div>
                </div>

                {/* Parameter Rubric Scores */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {language === 'en' ? 'AI Rubric Parameter Scores:' : 'Nilai Parameter Rubrik AI:'}
                  </div>
                  {currentCase.before.scores.map((s, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">{s.param}</span>
                        <span className="font-mono text-rose-400 font-bold">{s.score}/100</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-500 rounded-full"
                          style={{ width: `${s.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Business Risk Callout */}
              <div className="mt-4 p-3 rounded-xl bg-rose-950/50 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-200">
                    {language === 'en' ? 'Negative Business Impact:' : 'Dampak Buruk ke Bisnis:'}
                  </span>{' '}
                  {currentCase.before.businessRisk}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SESUDAH DILATIH Vokasta (Sesi 3 / Post-Test) */}
            <div className="bg-emerald-950/20 border border-emerald-800/60 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {language === 'en' ? 'Session 3: Trained with Vokasta' : 'Sesi 3: Dilatih Vokasta'}
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-400">{currentCase.after.score}</span>
                    <span className="text-xs text-emerald-300/70">/100</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="text-xs font-semibold text-emerald-400">
                  {language === 'en' ? 'Status:' : 'Status:'} {currentCase.after.status}
                </div>

                {/* Candidate Speech Box */}
                <div className="bg-slate-900/80 border border-emerald-800/50 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-slate-200">
                      {language === 'en' ? 'Candidate Speech (5-Star SOP):' : 'Ucapan Kandidat (SOP Bintang 5):'}
                    </span>
                    <button
                      onClick={() =>
                        handlePlayNeuralSpeech(
                          currentCase.after.studentSpeech,
                          `${currentCase.id}_after_student`,
                          'after_student'
                        )
                      }
                      disabled={loadingAudioId === `${currentCase.id}_after_student`}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-900/50 hover:bg-emerald-800 text-emerald-200 text-xs font-semibold transition cursor-pointer disabled:opacity-60"
                    >
                      {loadingAudioId === `${currentCase.id}_after_student` ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin text-emerald-300" />
                          <span>{language === 'en' ? 'Synthesizing...' : 'Sintesis...'}</span>
                        </>
                      ) : playingAudioId === `${currentCase.id}_after_student` ? (
                        <>
                          <Pause className="w-3 h-3 animate-pulse text-emerald-300" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3 text-emerald-300" />
                          <span>{language === 'en' ? 'Student Neural Voice' : 'Suara Neural Siswa'}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm italic text-emerald-100 font-mono leading-relaxed">
                    {currentCase.after.studentSpeech}
                  </p>
                  <p className="text-xs text-slate-300 pt-1 border-t border-slate-800">
                    <span className="font-semibold text-emerald-400">
                      {language === 'en' ? 'Attitude Evaluation:' : 'Evaluasi Sikap:'}
                    </span>{' '}
                    {currentCase.after.studentAudioTone}
                  </p>
                </div>

                {/* Customer Reaction Box */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200">
                      {language === 'en' ? 'AI Customer Persona Reaction:' : 'Reaksi Pelanggan / Warga AI:'}
                    </span>
                    <button
                      onClick={() =>
                        handlePlayNeuralSpeech(
                          currentCase.after.customerReaction,
                          `${currentCase.id}_after_customer`,
                          'after_customer'
                        )
                      }
                      disabled={loadingAudioId === `${currentCase.id}_after_customer`}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer disabled:opacity-60"
                    >
                      {loadingAudioId === `${currentCase.id}_after_customer` ? (
                        <Loader2 className="w-2.5 h-2.5 animate-spin text-slate-300" />
                      ) : playingAudioId === `${currentCase.id}_after_customer` ? (
                        <>
                          <Pause className="w-2.5 h-2.5 animate-pulse text-emerald-300" />
                          <span className="text-emerald-300">Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-2.5 h-2.5 text-slate-400" />
                          <span>{language === 'en' ? 'Listen AI Reaction' : 'Dengar Reaksi AI'}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 italic">
                    {currentCase.after.customerReaction}
                  </p>
                  <div className="text-xs font-medium text-emerald-400 pt-1">
                    {language === 'en' ? 'Sentiment:' : 'Sentimen:'} {currentCase.after.customerSentiment}
                  </div>
                </div>

                {/* Parameter Rubric Scores */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {language === 'en' ? 'AI Rubric Parameter Scores:' : 'Nilai Parameter Rubrik AI:'}
                  </div>
                  {currentCase.after.scores.map((s, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-200">{s.param}</span>
                        <span className="font-mono text-emerald-400 font-bold">{s.score}/100</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${s.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Business Gain Callout */}
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-xs text-emerald-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-200">
                    {language === 'en' ? 'Positive Business Impact:' : 'Dampak Positif ke Bisnis:'}
                  </span>{' '}
                  {currentCase.after.businessGain}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Summary: The Competency Delta Breakdown */}
          <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-cyan-950/40 border border-amber-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400">
              <TrendingUp className="w-4 h-4" />
              <span className="font-bold text-sm uppercase tracking-wide">
                {language === 'en'
                  ? 'Quantified Learning Value Add (Learning Delta)'
                  : 'Kuantifikasi Nilai Tambah Pembelajaran (Learning Delta)'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-center sm:text-left">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">
                  {language === 'en' ? 'Readiness Score Surge:' : 'Lonjakan Skor Kesiapan:'}
                </div>
                <div className="text-xl font-black text-emerald-400">
                  +{currentCase.delta.scoreDelta} {language === 'en' ? 'Pts' : 'Poin'} ({Math.round((currentCase.delta.scoreDelta / currentCase.before.score) * 100)}%)
                </div>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">
                  {language === 'en' ? 'Response Efficiency:' : 'Efisiensi Respon:'}
                </div>
                <div className="text-xs font-bold text-white mt-1">
                  {currentCase.delta.timeReduction}
                </div>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">
                  {language === 'en' ? 'Procedure Compliance:' : 'Kepatuhan Prosedur:'}
                </div>
                <div className="text-xs font-bold text-cyan-300 mt-1">
                  {currentCase.delta.complianceDelta}
                </div>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">
                  {language === 'en' ? 'Satisfaction Transformation:' : 'Transformasi Kepuasan:'}
                </div>
                <div className="text-xs font-bold text-amber-400 mt-1">
                  {currentCase.delta.sentimentFlip}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            💡{' '}
            <span className="font-medium text-slate-300">
              {language === 'en'
                ? 'Every AI simulation produces weighted rubrics & verbatim transcripts ready for re-testing.'
                : 'Setiap sesi latihan AI menghasilkan rubrik berbobot & transkrip verbatim yang langsung dapat diuji ulang.'}
            </span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition cursor-pointer"
            >
              {language === 'en' ? 'Close' : 'Tutup'}
            </button>
            {onTryScenario && (
              <button
                onClick={() => {
                  onClose();
                  onTryScenario(currentCase.scenarioId);
                }}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <span>{language === 'en' ? 'Try This Scenario Simulation' : 'Coba Simulasi Skenario Ini'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
