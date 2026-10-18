import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Download,
  Maximize2,
  Volume2,
  VolumeX,
  Sparkles,
  Film,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Award,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSimulation?: () => void;
}

interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  timeStart: number;
  duration: number;
  badge: string;
  transcript: string;
}

interface LiveCue {
  start: number;
  end: number;
  speaker: string;
  text: string;
}

const CHAPTERS_ID: Chapter[] = [
  {
    id: 'chapter_1',
    title: '1. Ikhtisar Vokasta',
    subtitle: 'IKHTISAR PLATFORM',
    timeStart: 0,
    duration: 30.64,
    badge: 'IKHTISAR PLATFORM',
    transcript:
      'Selamat datang di Vokasta. Platform simulator kompetensi kerja interaktif bertenaga Multimodal AI, yang dirancang khusus untuk talenta vokasi dan frontline service di Indonesia. Platform ini mengintegrasikan tiga pilar utama: simulasi percakapan suara dua arah secara langsung, evaluasi rubrik berbasis bukti SOP dengan dukungan beragam profil dialek (kapabilitas desain, belum divalidasi), dan penerbitan Paspor Kompetensi digital berformat contoh yang mengacu pada model data W3C.',
  },
  {
    id: 'chapter_2',
    title: '2. Skenario & Customer Persona',
    subtitle: 'LANGKAH 1: PILIH SKENARIO',
    timeStart: 30.64,
    duration: 32,
    badge: 'LANGKAH 1: PILIH SKENARIO',
    transcript:
      'Siswa dapat memilih beragam skenario riil di dunia kerja. Pada demonstrasi ini, kita akan menguji skenario Frontline Barista Counter bersama Mbak Sarah, seorang pelanggan dengan sensitivitas laktosa. Mbak Sarah ingin memesan es kopi susu gula aren, namun wajib diganti oat milk ramah lambung dan meminta takaran manis lima puluh persen. Barista diuji untuk tanggap merespons, merekomendasikan bundling pastry, dan menyelesaikan kasir QRIS.',
  },
  {
    id: 'chapter_3',
    title: '3. Percakapan Suara Realtime',
    subtitle: 'LANGKAH 2: SIMULASI AUDIO INTERAKTIF',
    timeStart: 62.64,
    duration: 94.56,
    badge: 'LANGKAH 2: SIMULASI AUDIO INTERAKTIF',
    transcript:
      'Mari kita dengarkan langsung simulasi percakapan suara dua arah antara Mbak Sarah dan siswa barista di meja kasir. MBAK SARAH (PELANGGAN): "Halo kak, mau tanya dong. Es Kopi Susu Gula Arennya bisa diganti oat milk nggak ya? Soalnya saya lactose intolerant. Terus gulanya bisa request less sweet 50% nggak?" SISWA BARISTA (KANDIDAT): "Halo kak, selamat datang di Kopi Nusantara! Tentu bisa banget kak, kami sediakan opsi Oat Milk creamy yang 100% plant-based dan ramah lambung. Untuk gulanya rekomendasi kami 50% less sweet. Mau ukuran regular atau large kak?" MBAK SARAH (PELANGGAN): "Wah mantap, pas banget! Ukuran regular aja ya kak, esnya normal. Sama ada rekomendasi pastry yang cocok nggak buat nemenin kopi susu oat milk ini?" SISWA BARISTA (KANDIDAT): "Siap kak! Rekomendasi terfavorit kami adalah Warm Almond Croissant yang renyah dan buttery. Sedang ada promo bundling hemat 10 ribu rupiah juga jika dipesan bersama kopi. Mau sekalian dihangatkan satu kak?" MBAK SARAH (PELANGGAN): "Boleh deh satu croissant-nya sekalian dihangatkan ya! Makasih banyak rekomendasinya kak." SISWA BARISTA (KANDIDAT): "Baik kak, 1 Iced Oat Milk Coffee Less Sweet dan 1 Warm Almond Croissant. Totalnya 48 ribu rupiah, pembayaran bisa scan QRIS di sini. Terima kasih, silakan ditunggu ya!" Interaksi percakapan verbal multi-turn tersebut langsung dianalisis secara objektif oleh Vokasta Multimodal Engine.',
  },
  {
    id: 'chapter_4',
    title: '4. Evaluasi Video Multimodal',
    subtitle: 'LANGKAH 3: EVALUASI RUBRIK AI',
    timeStart: 157.2,
    duration: 22.8,
    badge: 'LANGKAH 3: EVALUASI RUBRIK AI',
    transcript:
      'Langkah ketiga: Evaluasi rubrik berlapis, mencakup standar universal hospitalitas dan kepatuhan SOP kedai kopi. Hasil evaluasi: Skor sembilan puluh lima koma lima dari seratus, kompeten pada parameter salam ramah, kustomisasi resep, cross-selling, dan SOP kasir.',
  },
  {
    id: 'chapter_5',
    title: '5. Pelatih AI & Dukungan Dialek (Desain)',
    subtitle: 'LANGKAH 4: PELATIH AI & DUKUNGAN DIALEK',
    timeStart: 180,
    duration: 17.96,
    badge: 'LANGKAH 4: PELATIH AI & DUKUNGAN DIALEK',
    transcript:
      'Langkah keempat: Pelatih AI interaktif melatih kembali poin keberatan pelanggan secara terarah. Dukungan 10 profil dialek adalah kapabilitas desain yang belum divalidasi.',
  },
  {
    id: 'chapter_6',
    title: '6. Portable Credential (W3C)',
    subtitle: 'LANGKAH 5: PASPOR KOMPETENSI CONTOH',
    timeStart: 197.96,
    duration: 17.88,
    badge: 'LANGKAH 5: PASPOR KOMPETENSI CONTOH',
    transcript:
      'Langkah kelima: Siswa menerima paspor kompetensi contoh portabel berformat contoh yang mengacu pada model data W3C dengan kode QR terstandarisasi. Melatih talenta frontline Indonesia siap kerja, berdaya saing, dan percaya diri.',
  },
];

const CHAPTERS_EN: Chapter[] = [
  {
    id: 'chapter_1',
    title: '1. Vokasta Overview',
    subtitle: 'PLATFORM ARCHITECTURE',
    timeStart: 0,
    duration: 30.64,
    badge: 'PLATFORM ARCHITECTURE',
    transcript:
      'Welcome to Vokasta. The interactive multimodal AI frontline competency simulator designed for vocational talent in Southeast Asia. Integrating real-time bidirectional voice roleplay, evidence-based rubrics with diverse dialect profiles support (design capability, not validated), and sample credentials referencing the W3C data model.',
  },
  {
    id: 'chapter_2',
    title: '2. Scenario & Customer Persona',
    subtitle: 'STEP 1: SELECT SCENARIO',
    timeStart: 30.64,
    duration: 32,
    badge: 'STEP 1: SELECT SCENARIO',
    transcript:
      'Trainees choose from real-world enterprise scenarios. In this demo, we test the Frontline Barista Counter with Ms. Sarah, an eco-conscious customer with lactose sensitivity asking for oat milk substitution and 50% sweetness customization.',
  },
  {
    id: 'chapter_3',
    title: '3. Real-Time Voice Simulation',
    subtitle: 'STEP 2: AUDIO SIMULATION',
    timeStart: 62.64,
    duration: 94.56,
    badge: 'STEP 2: AUDIO SIMULATION',
    transcript:
      'Experience live bidirectional voice between customer Sarah and the trainee barista. The candidate warmly greets, confirms oat milk milk dietary requirements, recommends an almond croissant bundle promo, and facilitates QRIS payment.',
  },
  {
    id: 'chapter_4',
    title: '4. Multimodal Video Evaluation',
    subtitle: 'STEP 3: AI RUBRIC EVALUATION',
    timeStart: 157.2,
    duration: 22.8,
    badge: 'STEP 3: AI RUBRIC EVALUATION',
    transcript:
      'Step 3: Multi-layered rubric evaluation combining universal hospitality benchmarks and retail SOP compliance. Final result: 95.5/100, certified competent in customer greeting, dietary customization, upsell bundling, and cashier speed.',
  },
  {
    id: 'chapter_5',
    title: '5. AI Coach & Dialect Support (Design)',
    subtitle: 'STEP 4: AI COACH & DIALECT SUPPORT',
    timeStart: 180,
    duration: 17.96,
    badge: 'STEP 4: AI COACH & DIALECT SUPPORT',
    transcript:
      'Step four: An interactive AI coach retrains the customer objection points in a targeted way. Support for 10 dialect profiles is a design capability that has not been validated.',
  },
  {
    id: 'chapter_6',
    title: '6. Portable Credential (W3C)',
    subtitle: 'STEP 5: SAMPLE PASSPORT',
    timeStart: 197.96,
    duration: 17.88,
    badge: 'STEP 5: SAMPLE PASSPORT',
    transcript:
      'Step 5: Candidates receive a portable sample passport following W3C / Open Badges v3.0 format for practice demonstration. Preparing career-ready frontline professionals.',
  },
];

const LIVE_CUES: LiveCue[] = [
  {
    start: 0,
    end: 13.58,
    speaker: 'NARRATOR',
    text: 'Selamat datang di Vokasta. Platform simulator kompetensi kerja interaktif bertenaga Multimodal AI, yang dirancang khusus untuk talenta vokasi dan frontline service di Indonesia.',
  },
  {
    start: 13.58,
    end: 30.64,
    speaker: 'NARRATOR',
    text: 'Platform ini mengintegrasikan tiga pilar utama: simulasi percakapan suara dua arah secara langsung, evaluasi rubrik berbasis bukti SOP dengan dukungan beragam profil dialek (kapabilitas desain, belum divalidasi), dan penerbitan Paspor Kompetensi digital berformat contoh yang mengacu pada model data W3C.',
  },
  {
    start: 30.64,
    end: 45.3,
    speaker: 'NARRATOR',
    text: 'Siswa dapat memilih beragam skenario riil di dunia kerja. Pada demonstrasi ini, kita akan menguji skenario Frontline Barista Counter bersama Mbak Sarah, seorang pelanggan dengan sensitivitas laktosa.',
  },
  {
    start: 45.3,
    end: 62.64,
    speaker: 'NARRATOR',
    text: 'Mbak Sarah ingin memesan es kopi susu gula aren, namun wajib diganti oat milk ramah lambung dan meminta takaran manis lima puluh persen. Barista diuji untuk tanggap merespons, merekomendasikan bundling pastry, dan menyelesaikan kasir QRIS.',
  },
  {
    start: 62.64,
    end: 71.34,
    speaker: 'NARRATOR',
    text: 'Mari kita dengarkan langsung simulasi percakapan suara dua arah antara Mbak Sarah dan siswa barista di meja kasir.',
  },
  {
    start: 71.34,
    end: 85.24,
    speaker: 'MBAK SARAH (PELANGGAN)',
    text: 'Halo kak, mau tanya dong. Es Kopi Susu Gula Arennya bisa diganti oat milk nggak ya? Soalnya saya lactose intolerant. Terus gulanya bisa request less sweet 50% nggak?',
  },
  {
    start: 85.24,
    end: 103.34,
    speaker: 'SISWA BARISTA (KANDIDAT)',
    text: 'Halo kak, selamat datang di Kopi Nusantara! Tentu bisa banget kak, kami sediakan opsi Oat Milk creamy yang 100% plant-based dan ramah lambung. Untuk gulanya rekomendasi kami 50% less sweet. Mau ukuran regular atau large kak?',
  },
  {
    start: 103.34,
    end: 114.96,
    speaker: 'MBAK SARAH (PELANGGAN)',
    text: 'Wah mantap, pas banget! Ukuran regular aja ya kak, esnya normal. Sama ada rekomendasi pastry yang cocok nggak buat nemenin kopi susu oat milk ini?',
  },
  {
    start: 114.96,
    end: 128.1,
    speaker: 'SISWA BARISTA (KANDIDAT)',
    text: 'Siap kak! Rekomendasi terfavorit kami adalah Warm Almond Croissant yang renyah dan buttery. Sedang ada promo bundling hemat 10 ribu rupiah juga jika dipesan bersama kopi. Mau sekalian dihangatkan satu kak?',
  },
  {
    start: 128.1,
    end: 134.56,
    speaker: 'MBAK SARAH (PELANGGAN)',
    text: 'Boleh deh satu croissant-nya sekalian dihangatkan ya! Makasih banyak rekomendasinya kak.',
  },
  {
    start: 134.56,
    end: 148.14,
    speaker: 'SISWA BARISTA (KANDIDAT)',
    text: 'Baik kak, 1 Iced Oat Milk Coffee Less Sweet dan 1 Warm Almond Croissant. Totalnya 48 ribu rupiah, pembayaran bisa scan QRIS di sini. Terima kasih, silakan ditunggu ya!',
  },
  {
    start: 148.14,
    end: 157.2,
    speaker: 'NARRATOR',
    text: 'Interaksi percakapan verbal multi-turn tersebut langsung dianalisis secara objektif oleh Vokasta Multimodal Engine.',
  },
  {
    start: 157.2,
    end: 167.78,
    speaker: 'NARRATOR',
    text: 'Langkah ketiga: Evaluasi rubrik berlapis, mencakup standar universal hospitalitas dan kepatuhan SOP kedai kopi.',
  },
  {
    start: 167.78,
    end: 180,
    speaker: 'NARRATOR',
    text: 'Hasil evaluasi: Skor sembilan puluh lima koma lima dari seratus, kompeten pada parameter salam ramah, kustomisasi resep, cross-selling, dan SOP kasir.',
  },
  {
    start: 180,
    end: 189.46,
    speaker: 'NARRATOR',
    text: 'Langkah keempat: Pelatih AI interaktif melatih kembali poin keberatan pelanggan secara terarah. Dukungan 10 profil dialek adalah kapabilitas desain yang belum divalidasi.',
  },
  {
    start: 189.46,
    end: 197.96,
    speaker: 'NARRATOR',
    text: 'Dilengkapi AI Coach interaktif untuk melatih kembali poin keberatan pelanggan secara terarah dan terukur.',
  },
  {
    start: 197.96,
    end: 208.94,
    speaker: 'NARRATOR',
    text: 'Langkah kelima: Siswa yang lulus menerima kredensial portabel contoh berformat Open Badges v3.0 dengan kode QR (belum ditandatangani).',
  },
  {
    start: 208.94,
    end: 215.84,
    speaker: 'NARRATOR',
    text: 'Melatih talenta frontline Indonesia siap kerja, berdaya saing, dan terpercaya.',
  },
];

const LIVE_CUES_EN: LiveCue[] = [
  {
    start: 0,
    end: 13.58,
    speaker: 'NARRATOR',
    text: 'Welcome to Vokasta. The interactive multimodal AI frontline competency simulator designed for vocational talent in Southeast Asia.',
  },
  {
    start: 13.58,
    end: 30.64,
    speaker: 'NARRATOR',
    text: 'The platform integrates three core pillars: live two-way voice roleplay, evidence-based rubrics, and sovereign W3C digital credentials.',
  },
  {
    start: 30.64,
    end: 45.3,
    speaker: 'NARRATOR',
    text: 'Trainees choose from diverse workplace scenarios. In this demo, we test the Frontline Barista Counter with Ms. Sarah, a customer with lactose sensitivity.',
  },
  {
    start: 45.3,
    end: 62.64,
    speaker: 'NARRATOR',
    text: 'Ms. Sarah requests an iced palm sugar latte with oat milk substitution and 50% sweetness. The barista is evaluated on active response, pastry cross-selling, and cashier POS execution.',
  },
  {
    start: 62.64,
    end: 71.34,
    speaker: 'NARRATOR',
    text: 'Let us listen directly to the live two-way voice interaction between Ms. Sarah and the trainee barista at the counter.',
  },
  {
    start: 71.34,
    end: 85.24,
    speaker: 'MS. SARAH (CUSTOMER)',
    text: 'Hi there, quick question: Can the Iced Palm Sugar Coffee be made with oat milk? I am lactose intolerant. And can I request 50% sweetness?',
  },
  {
    start: 85.24,
    end: 103.34,
    speaker: 'TRAINEE BARISTA (CANDIDATE)',
    text: 'Hello, welcome to Kopi Nusantara! Absolutely, we have a creamy 100% plant-based oat milk option. For sugar, 50% less sweet is our favorite recommendation. Would you like regular or large?',
  },
  {
    start: 103.34,
    end: 114.96,
    speaker: 'MS. SARAH (CUSTOMER)',
    text: 'That sounds perfect! Regular size please with normal ice. Also do you have any pastry recommendations to pair with this oat milk latte?',
  },
  {
    start: 114.96,
    end: 128.1,
    speaker: 'TRAINEE BARISTA (CANDIDATE)',
    text: 'Certainly! Our top recommendation is the Warm Almond Croissant, crispy and buttery. We have a combo deal saving 10k IDR when bundled with coffee. Shall I warm one up for you?',
  },
  {
    start: 128.1,
    end: 134.56,
    speaker: 'MS. SARAH (CUSTOMER)',
    text: 'Yes please, warm one croissant up! Thank you so much for the recommendation.',
  },
  {
    start: 134.56,
    end: 148.14,
    speaker: 'TRAINEE BARISTA (CANDIDATE)',
    text: 'Excellent, 1 Iced Oat Milk Coffee Less Sweet and 1 Warm Almond Croissant. Total is 48,000 IDR, you can scan QRIS right here. Thank you, please enjoy!',
  },
  {
    start: 148.14,
    end: 157.2,
    speaker: 'NARRATOR',
    text: 'This multi-turn verbal interaction is instantly analyzed with precision by the Vokasta Multimodal Engine.',
  },
  {
    start: 157.2,
    end: 167.78,
    speaker: 'NARRATOR',
    text: 'Step three: Multi-layered rubric evaluation combining universal hospitality benchmarks and coffee shop SOP compliance.',
  },
  {
    start: 167.78,
    end: 180,
    speaker: 'NARRATOR',
    text: 'Result: 95.5 out of 100, competent on warm greeting, recipe customization, cross-selling, and cashier SOP.',
  },
  {
    start: 180,
    end: 189.46,
    speaker: 'NARRATOR',
    text: 'Step four: An interactive AI coach retrains the customer objection points in a targeted way. Support for 10 dialect profiles is a design capability that has not been validated.',
  },
  {
    start: 189.46,
    end: 197.96,
    speaker: 'NARRATOR',
    text: 'Accompanied by an interactive AI Coach for targeted customer objection drills.',
  },
  {
    start: 197.96,
    end: 208.94,
    speaker: 'NARRATOR',
    text: 'Step five: Candidates who pass receive a sample portable credential in Open Badges v3.0 format with a QR code (not yet signed).',
  },
  {
    start: 208.94,
    end: 215.84,
    speaker: 'NARRATOR',
    text: 'Preparing career-ready, competitive, and trusted frontline professionals.',
  },
];

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({
  isOpen,
  onClose,
  onStartSimulation,
}) => {
  const { language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(187.84);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [chapters, setChapters] = useState<Chapter[]>(CHAPTERS_ID);
  const [liveCues, setLiveCues] = useState<LiveCue[]>(LIVE_CUES);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [videoAvailable, setVideoAvailable] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [showSubtitles, setShowSubtitles] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    fetch('/demo/vokasta_demo_walkthrough.mp4', { method: 'HEAD' })
      .then((res) => {
        setVideoAvailable(res.ok);
        if (!res.ok) {
          setVideoError(true);
        }
      })
      .catch(() => {
        setVideoAvailable(false);
        setVideoError(true);
      });

    fetch('/demo/manifest.json')
      .then((res) => res.json())
      .then((data) => {
        if (data?.chapters && Array.isArray(data.chapters) && data.chapters.length > 0) {
          setChapters(data.chapters);
        }
        if (data?.cues && Array.isArray(data.cues) && data.cues.length > 0) {
          setLiveCues(data.cues);
        }
        if (data?.totalDuration && typeof data.totalDuration === 'number') {
          setDuration(data.totalDuration);
        }
      })
      .catch((err) => {
        console.warn('Manifest load fallback:', err);
      });
  }, [isOpen]);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadStatus(language === 'en' ? 'Downloading...' : 'Mengunduh...');
    try {
      const res = await fetch('/api/demo/download');
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = blobUrl;
      tempLink.download = 'vokasta_demo_walkthrough.mp4';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 10000);
      setDownloadStatus(language === 'en' ? 'Saved (HD 1080p)!' : 'Tersimpan (HD 1080p)!');
    } catch (err) {
      console.warn('Blob download error, falling back to direct navigation:', err);
      window.location.href = '/api/demo/download';
      setDownloadStatus(language === 'en' ? 'Downloading...' : 'Mengunduh...');
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadStatus(null);
      }, 3000);
    }
  };

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen]);

  const activeChapters = language === 'en' ? CHAPTERS_EN : (chapters.length > 0 ? chapters : CHAPTERS_ID);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);

    // Frame-accurate chapter identification without premature advance
    for (let i = activeChapters.length - 1; i >= 0; i--) {
      if (curr >= activeChapters[i].timeStart) {
        setActiveChapterIndex(i);
        break;
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 215.84);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
    if (!isPlaying) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  const currentChapter = activeChapters[activeChapterIndex] || activeChapters[0];
  const activeLiveCues = language === 'en' ? LIVE_CUES_EN : (liveCues.length > 0 ? liveCues : LIVE_CUES);
  const activeCue = activeLiveCues.find((c) => currentTime >= c.start && currentTime < c.end) || activeLiveCues[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl shadow-amber-500/10 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white text-sm sm:text-base">
                  Video Demo Walkthrough • Vokasta
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
                  FULL HD 1080P
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-700/60 text-xs font-bold">
                  ✓ AUDIO-VISUAL SYNC
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'en'
                  ? 'Frontline Barista & Retail Showcase (Duration 3m 35s • 1080p Full HD)'
                  : 'Panduan demonstrasi Frontline Barista & Ritel UMKM (Durasi 3m 35s • 1080p Full HD)'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {videoAvailable && !videoError && (
              <>
                <button
                  id="modal-download-demo-btn"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer active:scale-95 disabled:opacity-60"
                  title={language === 'en' ? 'Download Universal MP4 1080p' : 'Unduh Video Master MP4 1080p Universal (Windows, Mac, iOS, Android)'}
                >
                  <Download className={`w-3.5 h-3.5 text-amber-400 ${isDownloading ? 'animate-bounce' : ''}`} />
                  <span>{downloadStatus || (language === 'en' ? 'Download MP4 (1080p)' : 'Unduh MP4 (HD 1080p)')}</span>
                </button>
                <a
                  href="/api/demo/download"
                  download="vokasta_demo_walkthrough.mp4"
                  className="hidden"
                  id="hidden-direct-download-anchor"
                >
                  Direct Link
                </a>
              </>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Video + Chapter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1">
          {/* Main Video Player Area (8 cols) */}
          <div className="lg:col-span-8 bg-black flex flex-col justify-between relative group">
            <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center">
              <video
                ref={videoRef}
                src="/api/demo/video"
                preload="auto"
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onError={() => {
                  setVideoError(true);
                  setVideoAvailable(false);
                }}
                playsInline
                onClick={togglePlay}
              >
                <source src="/api/demo/video" type="video/mp4" onError={() => { setVideoError(true); setVideoAvailable(false); }} />
                <source src="/demo/vokasta_demo_walkthrough.mp4" type="video/mp4" onError={() => { setVideoError(true); setVideoAvailable(false); }} />
                <track src="/demo/vokasta_subtitles.vtt" kind="subtitles" srcLang="id" label="Bahasa Indonesia" />
                Browser Anda tidak mendukung pemutar video HTML5.
              </video>

              {videoError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/95 z-20">
                  <Film className="w-10 h-10 text-amber-400 mb-3" />
                  <p className="text-sm font-semibold text-white max-w-sm">
                    {language === 'en'
                      ? 'Demo video is not yet available. Please try directly in the simulator.'
                      : 'Video demo belum tersedia. Silakan coba langsung di simulator.'}
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      if (onStartSimulation) {
                        onStartSimulation();
                      }
                    }}
                    className="mt-4 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <span>{language === 'en' ? 'Open in Full Simulator' : 'Buka di Simulator Penuh'}</span>
                  </button>
                </div>
              )}

              {/* Big Center Play Overlay Button */}
              {!isPlaying && !videoError && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/40 hover:scale-110 active:scale-95 transition cursor-pointer"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
              )}
            </div>

            {/* Custom Video Control Bar */}
            <div className="bg-slate-950/90 border-t border-slate-800 px-4 py-3 space-y-2">
              {/* Progress Slider */}
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-amber-400 w-10 text-right">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration || 215.84}
                  step="0.1"
                  value={currentTime}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="flex-1 accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono text-slate-400 w-10">
                  {formatTime(duration || 215.84)}
                </span>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition cursor-pointer"
                    title={isPlaying ? (language === 'en' ? 'Pause' : 'Jeda') : (language === 'en' ? 'Play' : 'Putar')}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={handleRestart}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title={language === 'en' ? 'Restart from beginning' : 'Mulai dari awal'}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title={isMuted ? (language === 'en' ? 'Unmute' : 'Aktifkan Suara') : (language === 'en' ? 'Mute' : 'Bisukan')}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  {/* Subtitle Toggle */}
                  <button
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                      showSubtitles
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-slate-800/60 text-slate-500 border-slate-700'
                    }`}
                    title="Toggle Subtitle CC"
                  >
                    CC
                  </button>

                  {/* Speed Selector */}
                  <div className="inline-flex rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs">
                    {[1.0, 1.25, 1.5].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`px-2 py-0.5 rounded transition ${
                          playbackSpeed === speed
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-400 hidden sm:flex items-center space-x-2">
                  <span>{language === 'en' ? 'Chapter:' : 'Bab:'}</span>
                  <span className="text-amber-300 font-semibold">{currentChapter.title}</span>
                </div>
              </div>
            </div>

            {/* Current Narration Subtitle Banner (Optional via CC Toggle) */}
            {showSubtitles && (
              <div className="bg-slate-900/95 border-t border-slate-800/80 p-3 flex items-center justify-between animate-in fade-in duration-200">
                <div className="flex items-start space-x-2.5 flex-1 min-w-0 pr-3">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider shrink-0 mt-0.5">
                    {activeCue.speaker}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                    “{activeCue.text}”
                  </p>
                </div>
                <div className="hidden sm:flex items-center space-x-1.5 shrink-0 px-2 py-1 rounded-md bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-mono font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>SYNC: LOCKED</span>
                </div>
              </div>
            )}
          </div>

          {/* Chapter Navigation Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-slate-950/60 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between p-4 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {language === 'en' ? 'Demo Chapters' : 'Daftar Bab Demonstrasi'}
                </span>
                <span className="text-xs text-amber-400 font-mono">
                  {activeChapters.length} {language === 'en' ? 'Sections' : 'Bagian'}
                </span>
              </div>

              <div className="space-y-2">
                {activeChapters.map((ch, idx) => {
                  const isActive = activeChapterIndex === idx;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => handleSeek(ch.timeStart)}
                      className={`w-full text-left p-2.5 rounded-xl border transition cursor-pointer flex items-start space-x-3 ${
                        isActive
                          ? 'bg-amber-500/10 border-amber-500/40 shadow-sm'
                          : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 text-slate-400'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 font-extrabold'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-xs font-bold truncate ${
                              isActive ? 'text-amber-300' : 'text-slate-200'
                            }`}
                          >
                            {ch.title}
                          </p>
                          <span className="text-xs font-mono text-slate-500 ml-1">
                            {formatTime(ch.timeStart)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {ch.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Call to Action in Modal */}
            <div className="pt-4 mt-4 border-t border-slate-800 space-y-2.5">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="flex items-center space-x-1.5 font-bold text-amber-400 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Presentation-Ready Quality' : 'Siap Dipresentasikan'}</span>
                </div>
                {language === 'en'
                  ? 'Master MP4 includes 1080p FHD UI visuals, expressive neural voice audio, and full chapter cues.'
                  : 'File MP4 sudah mencakup visual 1080p, suara AI Gemini berintonasi, dan narasi lengkap.'}
              </div>

              {onStartSimulation && (
                <button
                  onClick={() => {
                    onClose();
                    onStartSimulation();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Launch Simulation Now' : 'Coba Simulasi Sekarang'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
