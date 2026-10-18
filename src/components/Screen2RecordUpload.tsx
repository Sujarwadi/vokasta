import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Video,
  Upload,
  Camera,
  Square,
  Play,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileVideo,
  Sparkles,
  ShieldAlert,
  Volume2,
  VolumeX,
  Volume1,
  User,
  ShieldCheck,
  ExternalLink,
  AlertTriangle,
  MonitorPlay,
  Radio,
  MessageSquare,
  Send,
  Mic,
  MicOff,
  Loader2,
  Headphones,
  RotateCcw,
  Check,
  Signal,
  Wifi,
  Gauge,
  Heart,
  Smile,
  Activity,
  Zap,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  X,
} from 'lucide-react';
import { AssessmentSession, Scenario, NetworkResilienceProfile, IndonesianDialect } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import {
  getAuthenticDialectDialogue,
  DIALECT_CONFIG,
  HONORIFIC_TABLE,
  getDialectHonorific,
  sanitizeToSelectedHonorific,
} from '../data/dialectDictionary';
import { getQuickResponses } from '../data/quickResponses';
import { getEnglishQuickResponses } from '../data/englishQuickResponses';
import { getLocalizedScenario } from '../i18n/scenarioTranslations';
import { getInteractionMode, sanitizeConversation } from '../data/interactionMode';
import LiveVoicePanel from './LiveVoicePanel';
import { getTouristPersona } from '../data/touristPersonas';

export type { IndonesianDialect };

export interface RegionalDialectOption {
  id: IndonesianDialect;
  label: string;
  region: string;
  badge: string;
  description: string;
  avatarIcon: string;
}

export const REGIONAL_DIALECTS: RegionalDialectOption[] = [
  {
    id: 'jabodetabek',
    label: 'Jakarta / Standar Urban',
    region: 'Jabodetabek & Nasional',
    badge: 'Nasional',
    description: 'Baku kasual sopan, lugas ("Halo kak / permisi mas")',
    avatarIcon: '🏢',
  },
  {
    id: 'sunda',
    label: 'Sunda / Parahyangan',
    region: 'Jawa Barat',
    badge: 'Lembut Santun',
    description: 'Mendayu halus, sopan ("Punten pisan Kang/Teh...")',
    avatarIcon: '🍃',
  },
  {
    id: 'jawa_tengah',
    label: 'Jawa Tengah / Solo-Jogja',
    region: 'Jawa Tengah & Mataraman',
    badge: 'Santun Alus',
    description: 'Santun, alus, penuh tata krama ("Nyuwun sewu mas/mbak...")',
    avatarIcon: '🍵',
  },
  {
    id: 'jawa_timur',
    label: 'Jawa Timur / Suroboyoan',
    region: 'Jawa Timur & Arekan',
    badge: 'Ceplas-ceplos',
    description: 'Cepat, lugas, akrab ("Mas! Iki lho ya\'opo rek...")',
    avatarIcon: '⚡',
  },
  {
    id: 'medan',
    label: 'Medan / Batak Pesisir',
    region: 'Sumatera Utara',
    badge: 'Lugas & Tegas',
    description: 'Tegas, intonasi dinamis, percaya diri ("Halo bang! Cemana ini...")',
    avatarIcon: '🔥',
  },
  {
    id: 'minang',
    label: 'Minang / Urang Awak',
    region: 'Sumatera Barat',
    badge: 'Santun Lugas',
    description: 'Santun, hangat berdagang ("Onde mande Uda/Uni...")',
    avatarIcon: '⛰️',
  },
  {
    id: 'bali',
    label: 'Bali / Hospitality',
    region: 'Bali & Turis',
    badge: 'Ramah Hangat',
    description: 'Ramah, bersahabat, rileks ("Om Swastyastu / Halo bli...")',
    avatarIcon: '🌺',
  },
  {
    id: 'makassar',
    label: 'Makassar / Bugis',
    region: 'Sulawesi Selatan',
    badge: 'Tegas Cepat',
    description: 'Cepat berirama, partikel tabe\', -mi, -ki, -ji',
    avatarIcon: '⛵',
  },
  {
    id: 'manado',
    label: 'Manado / Minahasa',
    region: 'Sulawesi Utara',
    badge: 'Rileks Ceria',
    description: 'Rileks bersahabat, partikel dang, kwa, sto',
    avatarIcon: '🌊',
  },
  {
    id: 'timur',
    label: 'Papua & Maluku / Timur',
    region: 'Papua, Ambon & NTT',
    badge: 'Melodius Bersaudara',
    description: 'Hangat bersaudara ("Pace/Mace, selamat siang kawan...")',
    avatarIcon: '🌴',
  },
];

export const REGIONAL_DIALECTS_EN: RegionalDialectOption[] = [
  {
    id: 'jabodetabek',
    label: 'Jakarta / National Standard',
    region: 'Greater Jakarta & Capital',
    badge: 'National',
    description: 'Polite casual, clear & articulate ("Hello / Excuse me")',
    avatarIcon: '🏢',
  },
  {
    id: 'sunda',
    label: 'West Java / Sunda',
    region: 'West Java & Parahyangan',
    badge: 'Gentle & Courteous',
    description: 'Melodic, soft and polite cadence ("Wilujeng / Hatur nuhun")',
    avatarIcon: '🍃',
  },
  {
    id: 'jawa_tengah',
    label: 'Central Java / Solo-Jogja',
    region: 'Central Java & Yogyakarta',
    badge: 'Refined Etiquette',
    description: 'Refined, respectful, high etiquette ("Sugeng rawuh / Monggo")',
    avatarIcon: '🍵',
  },
  {
    id: 'jawa_timur',
    label: 'East Java / Suroboyoan',
    region: 'East Java & Surabaya',
    badge: 'Direct & Candid',
    description: 'Fast-paced, direct, straightforward & friendly',
    avatarIcon: '⚡',
  },
  {
    id: 'medan',
    label: 'Medan / North Sumatra',
    region: 'North Sumatra',
    badge: 'Bold & Assertive',
    description: 'Assertive, dynamic intonation & confident delivery',
    avatarIcon: '🔥',
  },
  {
    id: 'minang',
    label: 'Minang / West Sumatra',
    region: 'West Sumatra',
    badge: 'Warm & Courteous',
    description: 'Warm trade courtesy & articulate conversation',
    avatarIcon: '⛰️',
  },
  {
    id: 'bali',
    label: 'Bali / Hospitality',
    region: 'Bali & Tourism Gateway',
    badge: 'Warm & Welcoming',
    description: 'Friendly, relaxed, high-hospitality warmth',
    avatarIcon: '🌺',
  },
  {
    id: 'makassar',
    label: 'Makassar / South Sulawesi',
    region: 'South Sulawesi',
    badge: 'Brisk & Dynamic',
    description: 'Energetic cadence, brisk rhythm & direct tone',
    avatarIcon: '⛵',
  },
  {
    id: 'manado',
    label: 'Manado / North Sulawesi',
    region: 'North Sulawesi',
    badge: 'Cheerful & Easygoing',
    description: 'Upbeat, friendly, warm & sociable tone',
    avatarIcon: '🌊',
  },
  {
    id: 'timur',
    label: 'Papua & Maluku / Eastern',
    region: 'Papua, Maluku & East Nusa Tenggara',
    badge: 'Melodic Brotherly',
    description: 'Warm brotherly intonation & openhearted camaraderie',
    avatarIcon: '🌴',
  },
];

export const getRegionalDialectOptions = (lang: 'id' | 'en'): RegionalDialectOption[] => {
  return lang === 'en' ? REGIONAL_DIALECTS_EN : REGIONAL_DIALECTS;
};

export function stripPersonaHonorific(name: string): string {
  return (name || '')
    .replace(/\b(Mas|Mbak|Bang|Kak|Kang|Teh|Bli|Gek|Mbok|Uda|Uni|Daeng|Pace|Mace|Nyong|Nona|Ibu|Bu|Bapak|Pak)\b\s*/gi, '')
    .trim();
}

export function adaptCustomerPersonaName(name: string, properHonorific: string): string {
  const raw = stripPersonaHonorific(name);
  // Panggilan hormat umum untuk pelanggan dewasa (Pak, Bapak, Ibu, Bu) dipertahankan; sebutan sebaya (Mas, Mbak, dsb.) menyesuaikan dialek
  const original = (name || '').trim().split(/\s+/)[0] || '';
  if (/^(pak|bapak|ibu|bu)$/i.test(original) && raw) return `${original.charAt(0).toUpperCase()}${original.slice(1).toLowerCase()} ${raw}`;
  return raw ? `${properHonorific} ${raw}` : properHonorific;
}

interface Screen2RecordUploadProps {
  session: AssessmentSession;
  onProceedToAnalysis: (videoData: {
    videoBase64: string;
    mimeType: string;
    videoBlob?: Blob;
    previewUrl?: string;
    simulateMode?: boolean;
    failureSimulation?: boolean;
    inputMode?: 'voice' | 'video';
    conversation?: Array<{ role: 'customer' | 'worker'; text: string }>;
    practiceLanguage?: 'id' | 'en';
  }) => void;
  onBack: () => void;
  resilienceProfile?: NetworkResilienceProfile;
}

export const Screen2RecordUpload: React.FC<Screen2RecordUploadProps> = ({
  session,
  onProceedToAnalysis,
  onBack,
  resilienceProfile = '5g_hq',
}) => {
  const { language } = useLanguage();
  const scenario = getLocalizedScenario(session.scenario, language);
  const regionalDialects = getRegionalDialectOptions(language);
  const [activeTab, setActiveTab] = useState<'record' | 'upload' | 'sample'>('record');

  // Regional Dialect & Cultural Persona State (Indonesia Banget)
  const [selectedDialect, setSelectedDialect] = useState<IndonesianDialect>('jabodetabek');
  const [candidateGender, setCandidateGender] = useState<'male' | 'female'>('male');

  // Spontaneous Interruption / Real-Time Curveball Mode State
  const [enableCurveballMode, setEnableCurveballMode] = useState<boolean>(false);
  const [activeCurveball, setActiveCurveball] = useState<{
    text: string;
    category: string;
    triggeredAt: number;
  } | null>(null);
  const curveballTriggeredRef = useRef<boolean>(false);

  // Webcam & MediaRecorder state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isStartingCamera, setIsStartingCamera] = useState(false);
  const [isVirtualCameraMode, setIsVirtualCameraMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraDiagnosis, setCameraDiagnosis] = useState<{
    type: 'permission_blocked' | 'iframe_restriction' | 'device_not_found' | 'device_busy' | 'generic';
    title: string;
    description: string;
    recommendedAction: string;
  } | null>(null);

  // Video assets
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [videoBase64, setVideoBase64] = useState<string | null>(null);
  const [videoMimeType, setVideoMimeType] = useState<string>('video/webm');
  const [isFailureTestMode, setIsFailureTestMode] = useState<boolean>(false);

  // LMS Assessment Phase Lifecycle: Phase 1 (Briefing/Sandbox) -> Phase 2 (Official Recording) -> Phase 3 (Evaluation Triggered)
  const [assessmentPhase, setAssessmentPhase] = useState<'briefing' | 'recording'>('briefing');

  // Virtual Customer Audio State
  const [isPlayingCustomerAudio, setIsPlayingCustomerAudio] = useState(false);
  const [isLoadingCustomerAudio, setIsLoadingCustomerAudio] = useState(false);
  const [audioSourceType, setAudioSourceType] = useState<'neural' | 'speech_synth'>('neural');
  const customerAudioElementRef = useRef<HTMLAudioElement | null>(null);

  // Stress-Test / Customer Difficulty State
  const [pressureLevel, setPressureLevel] = useState<'standard' | 'high_pressure'>('standard');

  // Roleplay Interactive Practice State
  const [practiceSpeech, setPracticeSpeech] = useState('');
  const [isPracticingReaction, setIsPracticingReaction] = useState(false);
  const [customerReaction, setCustomerReaction] = useState<{
    customer_line: string;
    sentiment: 'impressed' | 'satisfied' | 'clarifying' | 'dissatisfied';
    customer_observation: string;
    follow_up_prompt?: string;
    audioDataUrl?: string;
  } | null>(null);
  const [isListeningDictation, setIsListeningDictation] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Live Emotion & Customer Patience Gauge + Voice Tempo HUD State

  // Customer Voice Audio & Honest Failure states (Langkah 2)
  const [customerAudioStatus, setCustomerAudioStatus] = useState<'idle' | 'loading' | 'playing' | 'ended' | 'error'>('idle');
  const [ttsErrorMessage, setTtsErrorMessage] = useState<string | null>(null);

  // Customer Reply Voice & Honest Failure states (Langkah 4)
  const [replyAudioStatus, setReplyAudioStatus] = useState<'idle' | 'playing' | 'ended' | 'blocked' | 'error'>('idle');
  const replyAudioElementRef = useRef<HTMLAudioElement | null>(null);

  // Practice state gate
  const [hasPracticedResponse, setHasPracticedResponse] = useState<boolean>(false);

  // Collapsible controls
  const [isDialectDropdownOpen, setIsDialectDropdownOpen] = useState<boolean>(false);
  const [showQuickResponseExamples, setShowQuickResponseExamples] = useState<boolean>(false);
  const [showChallengeOptions, setShowChallengeOptions] = useState<boolean>(false);
  const [dictationNotice, setDictationNotice] = useState<string | null>(null);

  // Mode interaksi: voice (percakapan suara dua arah) atau video (peragaan gerakan)
  const interactionMode = getInteractionMode(session.scenario);
  const isVoiceMode = interactionMode === 'voice';
  const MIN_WORKER_TURNS = 2;
  const MAX_WORKER_TURNS = 8;
  const [turns, setTurns] = useState<Array<{ role: 'customer' | 'worker'; text: string; sentiment?: string; audioDataUrl?: string }>>([]);
  const [conversationNotice, setConversationNotice] = useState<string | null>(null);
  const [customerWantsEnd, setCustomerWantsEnd] = useState(false);
  const [dictationInterim, setDictationInterim] = useState('');
  const wantListeningRef = useRef(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const workerTurnCount = turns.filter((t) => t.role === 'worker').length;
  // Suara live (Gemini Live) adalah jalur utama mode suara; mode ketik atau dikte menjadi cadangan otomatis
  const [liveState, setLiveState] = useState<'live' | 'text'>('live');
  const liveActive = isVoiceMode && liveState === 'live';
  // Bahasa latihan (terpisah dari bahasa tampilan): Indonesia atau Inggris dengan pelanggan mancanegara
  const [practiceLang, setPracticeLang] = useState<'id' | 'en'>(language === 'en' ? 'en' : 'id');
  const isEnPractice = isVoiceMode && practiceLang === 'en';

  // Belum divalidasi penutur asli.
  const getHonorificDisplay = (dialect: IndonesianDialect, gender: 'male' | 'female') => {
    if (dialect === 'sunda') {
      return gender === 'female' ? 'Teteh' : 'Akang';
    }
    const entry = HONORIFIC_TABLE[dialect] || { male: 'Mas', female: 'Mbak' };
    return gender === 'female' ? entry.female : entry.male;
  };

  const selectedDialectOption =
    regionalDialects.find((d) => d.id === selectedDialect) || regionalDialects[0];

  // 3-step guide: shown once on first visit, stored in localStorage with try/catch
  const [showGuideModal, setShowGuideModal] = useState<boolean>(() => {
    try {
      const seen = localStorage.getItem('vokasta_briefing_guide_seen');
      return !seen;
    } catch (e) {
      return false;
    }
  });

  const handleCloseGuideModal = () => {
    setShowGuideModal(false);
    try {
      localStorage.setItem('vokasta_briefing_guide_seen', 'true');
    } catch (e) {
      // safe fallback if storage blocked
    }
  };

  // Mengubah dialek, panggilan, atau tingkat tekanan memulai ulang percakapan agar riwayat tetap konsisten
  useEffect(() => {
    if (!isVoiceMode) return;
    setTurns((prev) => (prev.length > 0 ? [] : prev));
    setCustomerWantsEnd(false);
    setConversationNotice(null);
  }, [selectedDialect, candidateGender, pressureLevel]);

  // Gulir otomatis ke pesan terbaru
  useEffect(() => {
    if (turns.length > 0 && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [turns.length]);

  // Level suara nyata dari mikrofon (Web Audio API), dipakai untuk memastikan rekaman tidak bisu
  const [audioLevel, setAudioLevel] = useState(0);
  const [silentWarning, setSilentWarning] = useState(false);
  useEffect(() => {
    if (!isCameraActive) {
      setAudioLevel(0);
      setSilentWarning(false);
      return;
    }
    const stream = mediaStreamRef.current;
    const hasAudio = !!stream && stream.getAudioTracks().length > 0;
    if (!hasAudio) {
      setSilentWarning(true);
      return;
    }
    let ctx: AudioContext | null = null;
    let interval: ReturnType<typeof setInterval> | null = null;
    try {
      const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
      ctx = new AC();
      if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
      const source = ctx!.createMediaStreamSource(new MediaStream(stream!.getAudioTracks()));
      const analyser = ctx!.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const data = new Uint8Array(analyser.fftSize);
      let quietTicks = 0;
      interval = setInterval(() => {
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const v = (data[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / data.length);
        setAudioLevel(rms);
        quietTicks = rms < 0.01 ? quietTicks + 1 : 0;
        setSilentWarning(quietTicks > 30); // sekitar 3 detik tanpa suara
      }, 100);
    } catch (e) {
      console.warn('Audio level meter unavailable:', e);
    }
    return () => {
      if (interval) clearInterval(interval);
      if (ctx) {
        try {
          ctx.close();
        } catch {
          // abaikan
        }
      }
    };
  }, [isCameraActive]);


  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerIntervalRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const virtualAnimRef = useRef<number | null>(null);

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  // Get virtual customer / buyer prompt with authentic Indonesian dialect & voice persona or English localized
  const getCustomerPrompt = () => {
    if (isEnPractice) {
      const tp = getTouristPersona(scenario.id);
      return {
        name: tp.name,
        title: tp.title,
        tag: tp.tag,
        line: tp.line,
        lang: 'en-US',
        initials: tp.initials,
        isBuyer: false,
        isFemale: tp.isFemale,
        voiceName: `${tp.name} (${tp.voice} Neural Voice)`,
        audioStaticUrl: undefined,
        dialectLabel: 'International English (tourist or expat customer)',
        stylePrompt: tp.stylePrompt,
        prosody: tp.isFemale ? { pitch: '+2Hz', rate: '0%' } : { pitch: '-2Hz', rate: '0%' },
      };
    }
    // English Mode: Provide localized native customer persona & objection line
    if (language === 'en') {
      const persona = scenario.buyer_persona;
      const isFemalePersona = persona
        ? /mrs|ms|miss|wanita|sarah|cindy|ningsih|nadia|ratna|alika|maya|rini/i.test(persona.name)
        : true;
      return {
        name: persona ? persona.name : 'Customer',
        title: persona ? persona.title : 'Frontline Guest',
        tag: persona
          ? `${persona.company} • ${persona.temperament}`
          : 'Customer Seeking Frontline Assistance',
        line:
          persona?.opening_objection_line ||
          'Good afternoon, could you please assist me with your standard service procedures?',
        lang: 'en-US',
        initials: persona?.avatar_initials || 'CS',
        isBuyer:
          scenario.track === 'retail_sales' ||
          scenario.jenis === 'sales_objection' ||
          scenario.jenis === 'sales_discovery',
        isFemale: isFemalePersona,
        voiceName: `${persona?.name || 'Customer'} (${isFemalePersona ? 'Aoede' : 'Charon'} Neural Voice)`,
        audioStaticUrl: undefined,
        dialectLabel: 'Standard Professional English (Polite & Articulate)',
        stylePrompt: 'Speak in natural, polite, expressive English with clear conversational cadence',
        prosody: isFemalePersona ? { pitch: '+2Hz', rate: '0%' } : { pitch: '-2Hz', rate: '0%' },
      };
    }

    // 1. Skenario Pencari Kerja Mandiri 01: Hospitalitas & Salam Tamu
    if (scenario.id === 'scen_jobseeker_hospitality_basic') {
      return {
        name: 'Ibu Ratna Handayani',
        title: 'Tamu Kunjungan Perdana',
        tag: 'Kunjungan Pertama • Mencari Loket Layanan & Panduan Arah Ramah',
        line: 'Permisi, selamat siang. Maaf mengganggu, saya baru pertama kali datang ke sini dan agak bingung mencari loket informasi atau bagian layanan. Boleh dibantu arahnya ke sebelah mana ya?',
        lang: 'id-ID',
        initials: 'RH',
        isBuyer: false,
        isFemale: true,
        voiceName: 'Ibu Ratna (Kore Neural Voice)',
        audioStaticUrl: '/audio/customer/scen_jobseeker_hospitality_basic.wav',
        dialectLabel: 'Aksen Wanita Dewasa Sopan (Bahasa Indonesia Baku & Ramah)',
        stylePrompt: 'Bicara dengan nada wanita dewasa Indonesia yang ramah, santun, agak sungkan dan menanyakan arah loket layanan',
        prosody: { pitch: '+1Hz', rate: '-4%', volume: '-5%' },
      };
    }

    // 2. Skenario Pencari Kerja Mandiri 02: De-eskalasi Antrean Molor
    if (scenario.id === 'scen_jobseeker_complaint_deescalation') {
      return {
        name: 'Pak Hendra Gunawan',
        title: 'Pelanggan Antrean Layanan',
        tag: 'Kecewa Menunggu Lama • Menuntut Permohonan Maaf & Kepastian Waktu',
        line: 'Mas/Mbak! Tolong dong, saya sudah menunggu lebih dari dua puluh menit di sini tapi belum dipanggil juga! Tadi staf depan bilang estimasinya cuma lima sampai sepuluh menit. Saya ada keperluan mendesak lain setelah ini, gimana solusinya?!',
        lang: 'id-ID',
        initials: 'HG',
        isBuyer: false,
        isFemale: false,
        voiceName: 'Pak Hendra (Charon Neural Voice)',
        audioStaticUrl: '/audio/customer/scen_jobseeker_complaint_deescalation.wav',
        dialectLabel: 'Aksen Pria Dewasa Kecewa (Nada Cepat & Menuntut Kepastian)',
        stylePrompt: 'Bicara dengan nada pria dewasa yang kesal dan terburu-buru karena antrean molor, menuntut kepastian dan empati',
        prosody: { pitch: '-2Hz', rate: '+10%', volume: '+15%' },
      };
    }

    // 3. Skenario Pencari Kerja Mandiri 03: Penjualan Ritel & Kasir
    if (scenario.id === 'scen_jobseeker_retail_communication') {
      return {
        name: 'Mbak Cindy Claudia',
        title: 'Calon Pembeli Ritel',
        tag: 'Bimbang 2 Pilihan Barang • Penjelasan Obyektif & Transaksi Kasir',
        line: 'Halo Mas/Mbak, permisi mau tanya. Saya lagi bingung nih milih antara dua barang ini di etalase. Yang satu harganya lebih hemat tapi bahannya beda, yang satu lagi lebih mahal sedikit. Bedanya apa ya, dan kira-kira mana yang lebih awet buat dipakai harian?',
        lang: 'id-ID',
        initials: 'CC',
        isBuyer: true,
        isFemale: true,
        voiceName: 'Mbak Cindy (Aoede Neural Voice)',
        audioStaticUrl: '/audio/customer/scen_jobseeker_retail_communication.wav',
        dialectLabel: 'Aksen Konsumen Ritel Santun (Penasaran & Komunikatif)',
        stylePrompt: 'Bicara dengan nada wanita muda yang santun dan penasaran menanyakan perbandingan kualitas barang belanjaan',
        prosody: { pitch: '+4Hz', rate: '+3%', volume: '0%' },
      };
    }

    // 4. Skenario Staf Gerai 04: Barista Kopi Nusantara - Salam & Oat Milk
    if (scenario.id === 'scen_greeting_01') {
      return {
        name: 'Mbak Sarah',
        title: 'Pelanggan Kafe Sensitif Laktosa',
        tag: 'Kustomisasi Pesanan Ramah Laktosa • Oat Milk & 50% Less Sweet',
        line: 'Halo kak, mau tanya dong. Es Kopi Susu Gula Arennya bisa diganti oat milk nggak ya? Soalnya saya lactose intolerant. Terus gulanya bisa request less sweet 50% nggak?',
        lang: 'id-ID',
        initials: 'SR',
        isBuyer: false,
        isFemale: true,
        voiceName: 'Mbak Sarah (Zephyr Neural Voice)',
        audioStaticUrl: '/audio/customer/scen_greeting_01.wav',
        dialectLabel: 'Aksen Mahasiswi/Profesional Muda Jakarta (Santun & Jelas)',
        stylePrompt: 'Bicara dengan nada wanita muda yang ramah dan menanyakan opsi oat milk ramah laktosa',
        prosody: { pitch: '+5Hz', rate: '+5%', volume: '0%' },
      };
    }

    // 5. Skenario Staf Gerai 05: Barista Kopi Nusantara - Rasio Signature
    if (scenario.id === 'scen_ratio_02') {
      return {
        name: 'Mas Dimas',
        title: 'Pelanggan Loyal Kedai Kopi',
        tag: 'Pencinta Racikan Kopi Signature • Cita Rasa Otentik',
        line: 'Halo Mas, Es Kopi Susu Signature satu ya. Tolong takaran espresso sama susunya dibikin pas mantap ya kayak biasa, saya mau nongkrong santai di meja luar.',
        lang: 'id-ID',
        initials: 'DM',
        isBuyer: false,
        isFemale: false,
        voiceName: 'Mas Dimas (Puck Neural Voice)',
        audioStaticUrl: '/audio/customer/scen_ratio_02.wav',
        dialectLabel: 'Aksen Pemuda Urban Santai (Ramah & Artikulatif)',
        stylePrompt: 'Bicara dengan nada pria muda Indonesia yang ramah, akrab, dan bersahabat di kedai kopi',
        prosody: { pitch: '+1Hz', rate: '+4%', volume: '0%' },
      };
    }

    // 6. Skenario Staf Gerai 06: Barista Kopi Nusantara - Komplain Alergi
    if (scenario.id === 'scen_complaint_03') {
      return {
        name: 'Ibu Nadia',
        title: 'Pelanggan Kafe Insiden Alergi Laktosa',
        tag: 'Kecewa & Panik Risiko Kesehatan • Menuntut SOP Higienitas & Penggantian',
        line: 'Mas! Ini beneran oat milk bukan?! Tadi saya tegaskan pakai oat milk karena saya alergi susu sapi parah! Ini rasanya kayak susu sapi biasa! Gimana sih, bahaya banget buat kesehatan saya!',
        lang: 'id-ID',
        initials: 'ND',
        isBuyer: false,
        isFemale: true,
        voiceName: 'Ibu Nadia (Zephyr Neural Voice)',
        audioStaticUrl: '/audio/customer/scen_complaint_03.wav',
        dialectLabel: 'Aksen Emosional Panik & Cemas (Menuntut Kejelasan Keselamatan)',
        stylePrompt: 'Bicara dengan nada cemas, kesal, dan panik karena risiko alergi susu sapi',
        prosody: { pitch: '+7Hz', rate: '+12%', volume: '+20%' },
      };
    }

    // 7. Skenario Staf Gerai 07: Otomotif Dealer
    if (scenario.id === 'scen_sales_automotive_dealer') {
      return {
        name: 'Pak Joko Susilo',
        title: 'Calon Pembeli Motor Komuter Harian',
        tag: 'Kepala Keluarga & Pekerja Swasta • Sensitif Biaya DP & Angsuran Bulanan',
        line: 'Mas, saya naksir motor matic ini buat harian ke tempat kerja. Tapi DP 3,5 juta kok terasa berat ya? Di dealer sebelah katanya bisa DP 1,5 juta aja. Takutnya angsurannya malah bikin jebol pengeluaran bulanan keluarga.',
        lang: 'id-ID',
        initials: 'JK',
        isBuyer: true,
        isFemale: false,
        voiceName: 'Pak Joko (Charon Neural Voice)',
        audioStaticUrl: '/audio/customer/scen_sales_automotive_dealer.wav',
        dialectLabel: 'Logat Bapak-bapak Santun (Alami, Hangat & Ragu-ragu)',
        stylePrompt: 'Bicara dengan nada bapak-bapak pekerja yang santun, hangat, dan penuh pertimbangan anggaran',
        prosody: { pitch: '-3Hz', rate: '-3%', volume: '0%' },
      };
    }

    // 8. Skenario Staf Gerai 08: Properti KPR
    if (scenario.id === 'scen_sales_property_kpr') {
      return {
        name: 'Mbak Rini',
        title: 'Istri dalam Pasangan Muda Pembeli Rumah Pertama (datang bersama suaminya, Bayu)',
        tag: 'Pasangan Muda Baru Menikah • Waspada Biaya Akad & Penolakan Bank',
        line: 'Mbak, kami pengen banget punya rumah sendiri daripada ngontrak terus tiap tahun. Tapi kami ragu, penghasilan gabungan cuma 7 juta dan takut ada biaya siluman waktu akad sama takut berkas ditolak bank.',
        lang: 'id-ID',
        initials: 'RB',
        isBuyer: true,
        isFemale: true,
        voiceName: 'Mbak Rini (Zephyr Neural Voice)',
        audioStaticUrl: '/audio/customer/scen_sales_property_kpr.wav',
        dialectLabel: 'Suara Istri Muda Santun (Mewakili Pasangan Muda)',
        stylePrompt: 'Bicara dengan nada suara istri muda yang santun, polos, dan cemas soal biaya akad dan cicilan',
        prosody: { pitch: '+3Hz', rate: '-2%', volume: '-5%' },
      };
    }

    // 9. Skenario Staf Gerai 09: Fashion Batik Retail
    if (scenario.id === 'scen_sales_fashion_retail') {
      return {
        name: 'Ibu Ningsih',
        title: 'Pelanggan Toko Busana Keluarga',
        tag: 'Belanja Batik Acara Arisan • Perhatian ke Kenyamanan Bahan',
        line: 'Mbak, kemeja batik yang dipajang di manekin ini ada ukuran L buat suami saya nggak ya? Takut bahannya gerah kalau dipakai siang. Harganya bisa kurang nggak kalau saya ambil sekalian roknya?',
        lang: 'id-ID',
        initials: 'NS',
        isBuyer: true,
        isFemale: true,
        voiceName: 'Ibu Ningsih (Kore Neural Voice)',
        audioStaticUrl: '/audio/customer/scen_sales_fashion_retail.wav',
        dialectLabel: 'Logat Ibu-ibu Belanja Renyah (Menawar Santun & Ceria)',
        stylePrompt: 'Bicara dengan nada ibu-ibu yang ceria, ramah, dan renyah saat belanja di toko busana',
        prosody: { pitch: '+4Hz', rate: '+5%', volume: '+5%' },
      };
    }

    // 10. Skenario Staf Gerai 10: Otomotif EV Teknis & Baterai
    if (scenario.id === 'scen_automotive_ev_technical') {
      return {
        name: 'Pak Bambang Irawan',
        title: 'Calon Pembeli Kendaraan Listrik (EV)',
        tag: 'Ragu Beralih ke EV • Khawatir Korsleting Banjir & Biaya Ganti Baterai',
        line: 'Mas, saya tertarik motor listrik ini buat ngantor, tapi jujur masih ragu banget. Kalau pas musim hujan terus nerobos genangan banjir di jalan apa gak korslet ya Mas? Terus kalau baterainya drop, katanya ganti baterai harganya hampir sama kayak beli motor baru?',
        lang: 'id-ID',
        initials: 'BI',
        isBuyer: true,
        isFemale: false,
        voiceName: 'Pak Bambang (Fenrir Neural Voice)',
        audioStaticUrl: '/audio/customer/scen_automotive_ev_technical.wav',
        dialectLabel: 'Logat Pekerja Komuter Skeptis (Kritis, Ingin Bukti Jelas & Aman)',
        stylePrompt: 'Bicara dengan nada pria pekerja dewasa yang skeptis dan ragu terhadap ketahanan baterai motor listrik saat banjir',
        prosody: { pitch: '-1Hz', rate: '+3%', volume: '+5%' },
      };
    }

    // 11. Skenario Staf Gerai 11: Otomotif Aftersales & De-eskalasi
    if (scenario.id === 'scen_automotive_aftersales_deescalation') {
      return {
        name: 'Pak Gunawan Wibowo',
        title: 'Konsumen Showroom Unit Inden',
        tag: 'Kecewa Pengiriman Molor 3 Hari • Menuntut STNK & Kompensasi Nyata',
        line: 'Mas, saya minta pertanggungjawaban showroom! Minggu lalu sales bilang unit motor listrik saya dikirim paling lambat kemarin. Ini sudah lewat 3 hari belum sampai juga, nomor pelat dan STNK-nya juga gak jelas. Gimana nih pelayanannya?!',
        lang: 'id-ID',
        initials: 'GW',
        isBuyer: false,
        isFemale: false,
        voiceName: 'Pak Gunawan (Charon Neural Voice)',
        audioStaticUrl: '/audio/customer/scen_automotive_aftersales_deescalation.wav',
        dialectLabel: 'Aksen Pria Berwibawa Kesal (Tegas, Menuntut Pertanggungjawaban)',
        stylePrompt: 'Bicara dengan nada pria pengusaha yang tegas, berwibawa, kesal dan tidak sabar karena keterlambatan pengiriman',
        prosody: { pitch: '-4Hz', rate: '+8%', volume: '+20%' },
      };
    }

    // 12. Skenario Staf Gerai 12: Butik Batik & Fitting
    if (scenario.id === 'scen_fashion_fabric_care_fitting') {
      return {
        name: 'Mbak Alika Putri',
        title: 'Pelanggan Butik Batik Formal',
        tag: 'Khawatir Perawatan Sutra Luntur • Ragu Ketentuan Tukar Size Fitting',
        line: 'Mbak, dress batik sutra ini bagus banget potongannya, tapi saya takut kalau dicuci di rumah warnanya luntur atau kainnya menciut. Terus kalau ternyata size M ini agak sempit waktu dipakai jalan, boleh ditukar gak ya?',
        lang: 'id-ID',
        initials: 'AP',
        isBuyer: true,
        isFemale: true,
        voiceName: 'Mbak Alika (Aoede Neural Voice)',
        audioStaticUrl: '/audio/customer/scen_fashion_fabric_care_fitting.wav',
        dialectLabel: 'Aksen Profesional Muda Anggun (Santun, Elegan & Artikulatif)',
        stylePrompt: 'Bicara dengan nada wanita muda profesional yang anggun dan teliti menanyakan perawatan bahan sutra dan fitting',
        prosody: { pitch: '+3Hz', rate: '0%', volume: '0%' },
      };
    }

    // 13. Skenario Staf Gerai 13: Kasir & Packaging VIP
    if (scenario.id === 'scen_fashion_cashier_packaging') {
      return {
        name: 'Ibu Maya Arisanti',
        title: 'Pelanggan Hadiah Kolega VIP',
        tag: 'Kado Pimpinan Rekan Kerja • Permintaan Gift Box Mewah & Struk Resmi',
        line: 'Selamat sore Mbak. Ini kemeja batik tulisnya mau saya jadikan kado untuk pimpinan rekan kerja saya. Bisa tolong dibungkus kotak kado eksklusif berpita rapi? Sama tolong struk resminya dicetak ya. Apakah ada diskon kartu member untuk pembelian ini?',
        lang: 'id-ID',
        initials: 'MA',
        isBuyer: true,
        isFemale: true,
        voiceName: 'Ibu Maya (Kore Neural Voice)',
        audioStaticUrl: '/audio/customer/scen_fashion_cashier_packaging.wav',
        dialectLabel: 'Aksen Wanita Eksekutif Berkelas (Rapi, Berwibawa & Sopan)',
        stylePrompt: 'Bicara dengan nada wanita eksekutif yang sopan, rapi, dan berkelas meminta pengemasan hadiah korporat',
        prosody: { pitch: '+2Hz', rate: '-2%', volume: '+5%' },
      };
    }

    if (scenario.buyer_persona) {
      const isFemalePersona = /ibu|mbak|nyonya|wanita|rini|sarah|cindy|ningsih|nadia|ratna|alika|maya/i.test(scenario.buyer_persona.name);
      return {
        name: `${scenario.buyer_persona.name}`,
        title: scenario.buyer_persona.title,
        tag: `${scenario.buyer_persona.company} • ${scenario.buyer_persona.temperament}`,
        line: scenario.buyer_persona.opening_objection_line,
        lang: 'id-ID',
        initials: scenario.buyer_persona.avatar_initials || 'PL',
        isBuyer: true,
        isFemale: isFemalePersona,
        voiceName: `${scenario.buyer_persona.name} (${isFemalePersona ? 'Kore' : 'Puck'} Neural Voice)`,
        audioStaticUrl: `/audio/customer/${scenario.id}.wav`,
        dialectLabel: 'Aksen Konsumen Lokal Ritel (Santun & Natural)',
        stylePrompt: 'Bicara dengan bahasa Indonesia yang sangat natural, santun, dan hidup',
        prosody: isFemalePersona ? { pitch: '+3Hz', rate: '+1%' } : { pitch: '-2Hz', rate: '0%' },
      };
    }

    return {
      name: 'Pelanggan Toko',
      title: 'Tamu Frontline',
      tag: 'Pengunjung Ritel Layanan • Mengharapkan Standar SOP',
      line: 'Selamat siang, saya ingin dibantu dengan pelayanan standar toko yang ramah dan cepat.',
      lang: 'id-ID',
      initials: 'PL',
      isBuyer: false,
      isFemale: true,
      voiceName: 'Pelanggan (Gemini Neural Voice)',
      audioStaticUrl: undefined,
      dialectLabel: 'Aksen Bahasa Indonesia Baku & Santun',
      stylePrompt: 'Bicara dengan bahasa Indonesia yang ramah dan sopan',
      prosody: { pitch: '+2Hz', rate: '0%' },
    };
  };

  const applyRegionalDialect = (
    baseData: any,
    dialect: IndonesianDialect,
    scenarioId: string,
    workerIsFemale: boolean = false
  ) => {
    if (language === 'en' || isEnPractice) {
      return baseData;
    }

    const config = DIALECT_CONFIG[dialect] || DIALECT_CONFIG.jabodetabek;
    const adapted = { ...baseData };
    const targetHonorific = getDialectHonorific(dialect, workerIsFemale);

    // If candidate is female or dialect is not jabodetabek, invalidate static audio to force dynamic neural synthesis
    if (workerIsFemale || dialect !== 'jabodetabek') {
      adapted.audioStaticUrl = undefined;
    }

    // Adapt customer honorific & persona name according to authentic regional culture
    const isFemale = Boolean(baseData.isFemale);
    const properHonorific = isFemale ? config.honorificFemale : config.honorificMale;

    // Strip any foreign cross-region honorifics from persona name
    adapted.name = adaptCustomerPersonaName(baseData.name || '', properHonorific);

    adapted.dialectLabel = `${config.regionName} (${config.description})`;
    adapted.stylePrompt = config.stylePrompt;
    adapted.prosody = config.prosody;

    // Retrieve authentic dialogue from matrix and sanitizer
    if (dialect === 'jabodetabek') {
      adapted.line = sanitizeToSelectedHonorific(baseData.line, targetHonorific);
    } else {
      adapted.line = getAuthenticDialectDialogue(
        scenarioId,
        dialect,
        baseData.line,
        workerIsFemale
      );
    }

    return adapted;
  };

  const workerIsFemale = candidateGender === 'female';
  const customerData = applyRegionalDialect(getCustomerPrompt(), selectedDialect, scenario.id, workerIsFemale);

  const getCleanVoiceName = (voice?: string, isFemale?: boolean) => {
    if (!voice) return isFemale ? 'Kore' : 'Puck';
    const v = voice.toLowerCase();
    if (v.includes('puck')) return 'Puck';
    if (v.includes('charon')) return 'Charon';
    if (v.includes('zephyr')) return 'Zephyr';
    if (v.includes('kore')) return 'Kore';
    if (v.includes('aoede')) return 'Aoede';
    if (v.includes('fenrir')) return 'Fenrir';
    return isFemale ? 'Kore' : 'Puck';
  };

  const stopAllAudio = () => {
    if (customerAudioElementRef.current) {
      customerAudioElementRef.current.pause();
      customerAudioElementRef.current = null;
    }
    if (replyAudioElementRef.current) {
      replyAudioElementRef.current.pause();
      replyAudioElementRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingCustomerAudio(false);
    setIsLoadingCustomerAudio(false);
    setCustomerAudioStatus('idle');
    setReplyAudioStatus('idle');
  };

  // Play customer audio using Indonesian Neural Voice with instant static cache & live fallback
  const handlePlayCustomerAudio = async (overrideText?: string, customVoice?: string, customStyle?: string) => {
    stopDictation();
    if (customerAudioStatus === 'playing') {
      stopAllAudio();
      setCustomerAudioStatus('ended');
      return;
    }

    stopAllAudio();
    setCustomerAudioStatus('loading');
    setTtsErrorMessage(null);

    const text = (overrideText || customerData.line).trim();
    const rawVoice = customVoice || customerData.voiceName;
    const voice = getCleanVoiceName(rawVoice, customerData.isFemale);
    const style = customStyle || customerData.stylePrompt;

    const canUseStatic =
      !workerIsFemale &&
      selectedDialect === 'jabodetabek' &&
      (!overrideText || overrideText === customerData.line) &&
      customerData.audioStaticUrl;

    if (canUseStatic) {
      try {
        const audio = new Audio(customerData.audioStaticUrl);
        customerAudioElementRef.current = audio;
        audio.onplay = () => {
          setCustomerAudioStatus('playing');
          setIsPlayingCustomerAudio(true);
        };
        audio.onended = () => {
          setCustomerAudioStatus('ended');
          setIsPlayingCustomerAudio(false);
          customerAudioElementRef.current = null;
        };
        audio.onerror = () => {
          playBackendTTS(text, voice, style);
        };
        await audio.play();
        return;
      } catch (err) {
        // Fallback to backend TTS
      }
    }

    await playBackendTTS(text, voice, style);
  };

  const playBackendTTS = async (text: string, voice: string, style?: string) => {
    try {
      const response = await fetch('/api/tts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voiceName: voice,
          stylePrompt: style,
          isFemale: customerData.isFemale,
          prosody: customerData.prosody,
          dialect: selectedDialect,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.audioDataUrl) {
          const audio = new Audio(data.audioDataUrl);
          customerAudioElementRef.current = audio;
          audio.onplay = () => {
            setCustomerAudioStatus('playing');
            setIsPlayingCustomerAudio(true);
          };
          audio.onended = () => {
            setCustomerAudioStatus('ended');
            setIsPlayingCustomerAudio(false);
            customerAudioElementRef.current = null;
          };
          audio.onerror = () => {
            handleTTSFailure();
          };
          await audio.play();
          return;
        }
      }
      handleTTSFailure();
    } catch (err) {
      handleTTSFailure();
    }
  };

  const handleTTSFailure = () => {
    setCustomerAudioStatus('error');
    setIsPlayingCustomerAudio(false);
    setIsLoadingCustomerAudio(false);
    setTtsErrorMessage(
      language === 'en'
        ? 'Voice audio unavailable, text is displayed'
        : 'Suara tidak tersedia, teks ditampilkan'
    );
  };

  // Interactive Live Practice: Send speech to AI customer and receive spoken voice response
  const handleTestCustomerReaction = async (overrideText?: string) => {
    const textToSend = (overrideText || practiceSpeech).trim();
    if (!textToSend) return;
    if (isVoiceMode && workerTurnCount >= MAX_WORKER_TURNS) return;

    stopDictation();
    stopAllAudio();
    setConversationNotice(null);
    setIsPracticingReaction(true);

    // Riwayat percakapan dikirim agar pelanggan AI melanjutkan percakapan yang sama
    const historyForServer = isVoiceMode
      ? [
          ...(turns[0]?.role === 'customer' ? [] : [{ role: 'customer', text: customerData.line }]),
          ...turns.map((t) => ({ role: t.role, text: t.text })),
        ]
      : undefined;

    try {
      const resp = await fetch('/api/customer/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario_id: scenario.id,
          candidate_speech: textToSend,
          pressure_level: pressureLevel,
          dialect: selectedDialect,
          language: isVoiceMode ? practiceLang : language,
          persona: isEnPractice ? { name: customerData.name, title: customerData.title, tag: customerData.tag, line: customerData.line } : undefined,
          voiceName: customerData.voiceName,
          prosody: customerData.prosody,
          isFemale: customerData.isFemale,
          candidateGender,
          workerHonorific: getDialectHonorific(selectedDialect, workerIsFemale),
          multi_turn: isVoiceMode,
          history: historyForServer,
        }),
      });

      if (resp.ok) {
        const data = await resp.json();
        setCustomerReaction(data);
        setHasPracticedResponse(true);

        if (isVoiceMode) {
          setTurns((prev) => [
            ...prev,
            { role: 'worker', text: textToSend },
            {
              role: 'customer',
              text: String(data.customer_line || ''),
              sentiment: data.sentiment,
              audioDataUrl: data.audioDataUrl || undefined,
            },
          ]);
          setPracticeSpeech('');
          setCustomerWantsEnd(Boolean(data.should_end));
        }

        const playUrl = data.audioDataUrl || data.audioStaticUrl;
        if (playUrl) {
          const audio = new Audio(playUrl);
          replyAudioElementRef.current = audio;
          audio.onplay = () => setReplyAudioStatus('playing');
          audio.onended = () => {
            setReplyAudioStatus('ended');
            replyAudioElementRef.current = null;
          };
          audio.onerror = () => setReplyAudioStatus('error');
          audio.play().catch((err) => {
            console.warn('Browser blocked reply autoplay:', err);
            setReplyAudioStatus('blocked');
          });
        } else {
          setReplyAudioStatus('blocked');
        }
      } else {
        let msg = '';
        try {
          const errData = await resp.json();
          msg = errData?.message || '';
        } catch {
          // abaikan
        }
        setConversationNotice(
          msg ||
            (language === 'en'
              ? 'The customer could not reply. Please send your answer again.'
              : 'Pelanggan belum bisa membalas. Silakan kirim jawaban Anda sekali lagi.')
        );
      }
    } catch (err) {
      console.error('Failed to get customer reaction:', err);
      setConversationNotice(
        language === 'en'
          ? 'Connection problem. Your answer was not sent; please try again.'
          : 'Koneksi bermasalah. Jawaban belum terkirim, silakan coba lagi.'
      );
    } finally {
      setIsPracticingReaction(false);
    }
  };

  // Putar suara balasan pelanggan dari satu giliran tertentu
  const handlePlayTurnAudio = (url?: string) => {
    if (!url) return;
    stopDictation();
    stopAllAudio();
    const audio = new Audio(url);
    replyAudioElementRef.current = audio;
    audio.onplay = () => setReplyAudioStatus('playing');
    audio.onended = () => {
      setReplyAudioStatus('ended');
      replyAudioElementRef.current = null;
    };
    audio.onerror = () => setReplyAudioStatus('error');
    audio.play().catch(() => setReplyAudioStatus('blocked'));
  };

  // Akhiri percakapan dan kirim transkrip untuk dinilai
  const handleFinishConversation = () => {
    stopDictation();
    stopAllAudio();
    if (workerTurnCount < MIN_WORKER_TURNS) {
      setConversationNotice(
        language === 'en'
          ? `Answer the customer at least ${MIN_WORKER_TURNS} times before assessment.`
          : `Jawab pelanggan minimal ${MIN_WORKER_TURNS} kali sebelum dinilai.`
      );
      return;
    }
    const conversation = sanitizeConversation([
      ...(turns[0]?.role === 'customer' ? [] : [{ role: 'customer' as const, text: customerData.line }]),
      ...turns.map((t) => ({ role: t.role, text: t.text })),
    ]);
    onProceedToAnalysis({
      videoBase64: '',
      mimeType: '',
      inputMode: 'voice',
      practiceLanguage: practiceLang,
      conversation,
    });
  };

  const handlePlayReplyVoice = () => {
    if (replyAudioStatus === 'playing') {
      if (replyAudioElementRef.current) {
        replyAudioElementRef.current.pause();
        replyAudioElementRef.current = null;
      }
      setReplyAudioStatus('ended');
      return;
    }

    const url = customerReaction?.audioDataUrl;
    if (url) {
      stopAllAudio();
      const audio = new Audio(url);
      replyAudioElementRef.current = audio;
      audio.onplay = () => setReplyAudioStatus('playing');
      audio.onended = () => {
        setReplyAudioStatus('ended');
        replyAudioElementRef.current = null;
      };
      audio.onerror = () => setReplyAudioStatus('error');
      audio.play().catch(() => setReplyAudioStatus('error'));
    } else if (customerReaction?.customer_line) {
      handlePlayCustomerAudio(customerReaction.customer_line, customerData.voiceName, customerData.stylePrompt);
    }
  };

  const handleResetPractice = () => {
    stopDictation();
    stopAllAudio();
    setPracticeSpeech('');
    setCustomerReaction(null);
    setReplyAudioStatus('idle');
    setTurns([]);
    setCustomerWantsEnd(false);
    setConversationNotice(null);
  };

  const getEvaluationResults = (sentiment: string, scenarioParams: any[]) => {
    return scenarioParams.map((param, idx) => {
      let score = 82;
      let feedback = '';

      if (sentiment === 'impressed') {
        score = idx === 0 ? 94 : idx === 1 ? 92 : 90;
        feedback = idx === 0
          ? (language === 'en' ? 'Excellent empathy, tone, and professional greeting.' : 'Sapaan sangat sopan, ramah, dan menenangkan kekhawatiran pelanggan.')
          : idx === 1
          ? (language === 'en' ? 'Procedural explanation is accurate, clear, and reassuring.' : 'Penjelasan solusi sesuai standar SOP dan mudah dipahami pelanggan.')
          : (language === 'en' ? 'Immediate de-escalation with high confidence and agility.' : 'De-eskalasi berhasil cepat dan membuat pelanggan merasa aman.');
      } else if (sentiment === 'satisfied') {
        score = idx === 0 ? 84 : idx === 1 ? 82 : 80;
        feedback = idx === 0
          ? (language === 'en' ? 'Polite and respectful tone throughout the interaction.' : 'Sikap dan sapaan sopan serta ramah.')
          : idx === 1
          ? (language === 'en' ? 'Clear answer that directly addresses customer concern.' : 'Solusi yang diberikan sudah menjawab kebutuhan inti pelanggan.')
          : (language === 'en' ? 'Good customer handling and patient disposition.' : 'Pelayanan tenang dan menunjukkan komitmen penyelesaian.');
      } else if (sentiment === 'clarifying') {
        score = idx === 0 ? 74 : idx === 1 ? 72 : 70;
        feedback = idx === 0
          ? (language === 'en' ? 'Friendly opening, but could be more decisive.' : 'Cukup ramah, namun perlu intonasi yang lebih meyakinkan.')
          : idx === 1
          ? (language === 'en' ? 'Relevant information, though customer asked for more detail.' : 'Informasi tepat namun pelanggan masih butuh kepastian tambahan.')
          : (language === 'en' ? 'Maintained composure while handling clarification.' : 'Mampu menjaga kesabaran saat pelanggan bertanya ulang.');
      } else {
        score = idx === 0 ? 65 : idx === 1 ? 62 : 58;
        feedback = idx === 0
          ? (language === 'en' ? 'Tone felt hesitant or failed to soothe customer frustration.' : 'Kurang menunjukkan empati mendalam di awal sapaan.')
          : idx === 1
          ? (language === 'en' ? 'Solution was incomplete or did not address root objection.' : 'Penjelasan belum menjawab kekhawatiran spesifik pelanggan.')
          : (language === 'en' ? 'Needs quicker de-escalation to prevent customer escalation.' : 'Perlu respon yang lebih solutif agar pelanggan tidak cemas.');
      }

      const passed = score >= (param.passing_score || 70);
      return {
        id: param.id,
        name: param.name,
        weight: param.weight,
        passing_score: param.passing_score || 70,
        score,
        passed,
        feedback,
      };
    });
  };

  // Mikrofon dikontrol penuh oleh pengguna: menyala sampai pengguna menekan tombol selesai.
  // Peramban (Chrome) menghentikan sesi pengenalan suara sendiri saat hening atau setelah batas waktu,
  // jadi sesi dimulai ulang otomatis selama pengguna masih ingin mendengarkan.
  const stopDictation = () => {
    wantListeningRef.current = false;
    const rec = recognitionRef.current;
    recognitionRef.current = null;
    if (rec) {
      try {
        rec.onend = null;
        rec.onerror = null;
        rec.onresult = null;
        rec.stop();
      } catch {
        // sesi sudah berhenti
      }
    }
    setIsListeningDictation(false);
    setDictationInterim('');
  };

  const startDictation = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setDictationNotice(
        language === 'en'
          ? 'Voice dictation is not supported in this browser. Please type your response.'
          : 'Dikte suara tidak didukung oleh peramban ini. Anda dapat mengetik respons pada kotak teks.'
      );
      return;
    }

    stopAllAudio();
    wantListeningRef.current = true;
    let rapidEnds = 0;
    let startedAt = 0;

    const launch = () => {
      if (!wantListeningRef.current) return;
      try {
        const rec = new SpeechRec();
        recognitionRef.current = rec;
        rec.lang = (isVoiceMode ? practiceLang : language) === 'en' ? 'en-US' : 'id-ID';
        rec.continuous = true;
        rec.interimResults = true;
        rec.maxAlternatives = 1;

        rec.onstart = () => {
          startedAt = Date.now();
          setIsListeningDictation(true);
        };

        rec.onresult = (event: any) => {
          let interim = '';
          let finals = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const r = event.results[i];
            const t = (r && r[0] && r[0].transcript) || '';
            if (r.isFinal) finals += t;
            else interim += t;
          }
          if (finals.trim()) {
            setPracticeSpeech((prev) => (prev ? prev.trimEnd() + ' ' : '') + finals.trim());
          }
          setDictationInterim(interim.trim());
        };

        rec.onerror = (e: any) => {
          const code = e && e.error;
          if (code === 'not-allowed' || code === 'service-not-allowed') {
            wantListeningRef.current = false;
            setDictationNotice(
              language === 'en'
                ? 'Microphone permission was blocked. Allow the microphone in your browser, or type your response.'
                : 'Izin mikrofon diblokir. Izinkan mikrofon di peramban Anda, atau ketik respons pada kotak teks.'
            );
          } else if (code === 'audio-capture') {
            wantListeningRef.current = false;
            setDictationNotice(
              language === 'en'
                ? 'No microphone was detected. Please check your device, or type your response.'
                : 'Mikrofon tidak terdeteksi. Periksa perangkat Anda, atau ketik respons pada kotak teks.'
            );
          } else if (code === 'network') {
            wantListeningRef.current = false;
            setDictationNotice(
              language === 'en'
                ? 'Speech recognition lost its connection. Please type your response or try again.'
                : 'Pengenalan suara kehilangan koneksi. Ketik respons Anda atau coba lagi.'
            );
          }
          // 'no-speech' dan 'aborted' ditangani oleh onend (mulai ulang otomatis)
        };

        rec.onend = () => {
          setDictationInterim('');
          if (!wantListeningRef.current) {
            setIsListeningDictation(false);
            return;
          }
          rapidEnds = Date.now() - startedAt < 500 ? rapidEnds + 1 : 0;
          if (rapidEnds >= 5) {
            wantListeningRef.current = false;
            setIsListeningDictation(false);
            setDictationNotice(
              language === 'en'
                ? 'The microphone keeps stopping. Please type your response instead.'
                : 'Mikrofon terus berhenti sendiri. Silakan ketik respons Anda.'
            );
            return;
          }
          setTimeout(launch, 250);
        };

        rec.start();
      } catch (e) {
        console.warn('Speech recognition error:', e);
        wantListeningRef.current = false;
        setIsListeningDictation(false);
      }
    };

    launch();
  };

  // Tombol mikrofon: pengguna sendiri yang membuka dan menutup mikrofon
  const handleToggleDictation = () => {
    setDictationNotice(null);
    if (isListeningDictation || wantListeningRef.current) {
      stopDictation();
    } else {
      startDictation();
    }
  };

  // Clean up camera stream, audio element, and speech synth on unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (customerAudioElementRef.current) {
        customerAudioElementRef.current.pause();
        customerAudioElementRef.current = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      wantListeningRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onend = null;
          recognitionRef.current.stop();
        } catch {
          // sudah berhenti
        }
      }
    };
  }, []);

  // Synchronize video element with stream when camera becomes active
  useEffect(() => {
    if (isCameraActive && videoRef.current && mediaStreamRef.current) {
      if (videoRef.current.srcObject !== mediaStreamRef.current) {
        videoRef.current.srcObject = mediaStreamRef.current;
      }
      videoRef.current.play().catch((err) => {
        console.warn('Camera video element play caught:', err);
      });
    }
  }, [isCameraActive]);

  const handleCameraFailure = (err: any) => {
    console.error('Camera initialization failure:', err);
    const errName = err?.name || '';
    const errMsg = err?.message || '';

    if (
      errName === 'NotAllowedError' ||
      errName === 'PermissionDeniedError' ||
      errName === 'SecurityError'
    ) {
      setCameraDiagnosis({
        type: isInIframe ? 'iframe_restriction' : 'permission_blocked',
        title: language === 'en' ? 'Camera & Mic Access Blocked by Browser' : 'Akses Kamera & Mikrofon Ditolak oleh Peramban',
        description: isInIframe
          ? (language === 'en'
              ? 'Browser restricts hardware access inside preview iframes. Please open the app in a new tab to grant direct camera permission.'
              : 'Peramban membatasi akses perangkat keras di dalam iframe pratinjau. Silakan buka aplikasi di tab peramban baru untuk memberikan izin kamera langsung.')
          : (language === 'en'
              ? 'Camera permission was blocked. Click the lock/camera icon in your address bar to enable camera access.'
              : 'Izin kamera diblokir. Klik ikon gembok/kamera di bilah alamat peramban Anda untuk mengizinkan akses kamera.'),
        recommendedAction: language === 'en'
          ? 'Click "Open in New Tab" or enable camera permissions in browser site settings.'
          : 'Klik "Buka di Tab Baru" atau aktifkan izin kamera di pengaturan situs peramban.',
      });
      setCameraError(language === 'en' ? 'Camera access was denied by browser or restricted by iframe sandbox.' : 'Akses kamera ditolak oleh peramban atau dibatasi oleh iframe sandbox.');
    } else if (errName === 'MicUnavailable') {
      setCameraDiagnosis({
        type: 'device_not_found',
        title: language === 'en' ? 'Microphone Not Available' : 'Mikrofon Tidak Tersedia',
        description: language === 'en'
          ? 'The camera works but the microphone is missing or blocked. A recording without sound cannot be assessed.'
          : 'Kamera berfungsi tetapi mikrofon tidak ada atau diblokir. Rekaman tanpa suara tidak dapat dinilai.',
        recommendedAction: language === 'en'
          ? 'Allow the microphone in your browser site settings, or upload an existing video that has sound.'
          : 'Izinkan mikrofon di pengaturan situs peramban, atau unggah video yang sudah ada dan bersuara.',
      });
      setCameraError(language === 'en' ? 'Microphone unavailable: recording without sound cannot be assessed.' : 'Mikrofon tidak tersedia: rekaman tanpa suara tidak dapat dinilai.');
    } else if (errName === 'NotFoundError' || errName === 'DevicesNotFoundError') {
      setCameraDiagnosis({
        type: 'device_not_found',
        title: language === 'en' ? 'Camera or Microphone Not Detected' : 'Kamera atau Mikrofon Tidak Terdeteksi',
        description: language === 'en'
          ? 'No webcam or microphone hardware detected on your device.'
          : 'Tidak ada perangkat keras webcam atau mikrofon yang terdeteksi di perangkat Anda saat ini.',
        recommendedAction: language === 'en'
          ? 'Use "Virtual Simulation Studio" or upload an existing recorded video file.'
          : 'Gunakan "Studio Simulasi Virtual" atau unggah berkas rekaman video yang telah ada.',
      });
      setCameraError(language === 'en' ? 'Webcam/camera hardware not detected on your system.' : 'Perangkat keras webcam/kamera tidak terdeteksi pada sistem Anda.');
    } else if (errName === 'NotReadableError' || errName === 'TrackStartError') {
      setCameraDiagnosis({
        type: 'device_busy',
        title: language === 'en' ? 'Camera Currently in Use by Another Application' : 'Kamera Sedang Digunakan oleh Aplikasi Lain',
        description: language === 'en'
          ? 'Your webcam is locked by another program (e.g., Zoom, Google Meet, Microsoft Teams, or OBS).'
          : 'Webcam Anda saat ini sedang dikunci oleh aplikasi lain (misalnya Zoom, Google Meet, Microsoft Teams, atau OBS).',
        recommendedAction: language === 'en'
          ? 'Close other applications using the webcam and retry.'
          : 'Tutup aplikasi lain yang sedang menggunakan webcam, lalu coba lagi.',
      });
      setCameraError(language === 'en' ? 'Camera cannot start because another program is using it.' : 'Kamera tidak dapat dimulai karena sedang digunakan oleh aplikasi lain.');
    } else {
      setCameraDiagnosis({
        type: 'generic',
        title: language === 'en' ? 'Unable to Start Camera' : 'Tidak Dapat Memulai Kamera',
        description: errMsg || (language === 'en' ? 'Browser could not initialize video capture for this simulation.' : 'Peramban tidak dapat menginisialisasi tangkapan video untuk sesi simulasi ini.'),
        recommendedAction: language === 'en' ? 'Open in a new tab or switch to Virtual Simulation Studio mode.' : 'Buka di tab baru atau beralih ke mode Studio Simulasi Virtual.',
      });
      setCameraError(language === 'en' ? `Camera initialization issue: ${errName || 'Error'} ${errMsg}` : `Kendala inisialisasi kamera: ${errName || 'Error'} ${errMsg}`);
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    setCameraDiagnosis(null);
    setIsStartingCamera(true);

    if (
      typeof navigator === 'undefined' ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      setIsStartingCamera(false);
      setCameraDiagnosis({
        type: isInIframe ? 'iframe_restriction' : 'permission_blocked',
        title: language === 'en' ? 'Camera API Unavailable in this Preview' : 'API Kamera Tidak Tersedia di Lingkungan Pratinjau Ini',
        description: isInIframe
          ? (language === 'en'
              ? 'Browser security restricts getUserMedia inside preview iframes. Open directly in a new tab for native camera access.'
              : 'Keamanan peramban membatasi akses getUserMedia di dalam iframe pratinjau. Buka langsung di tab baru untuk akses perangkat keras asli.')
          : (language === 'en'
              ? 'Browser restricts media access in this context (requires HTTPS or Localhost protocol).'
              : 'Peramban Anda membatasi akses perangkat media pada konteks ini (memerlukan protokol HTTPS atau Localhost).'),
        recommendedAction: language === 'en'
          ? 'Open the app in a new tab to grant native camera permission directly.'
          : 'Buka aplikasi di tab baru untuk memberikan izin kamera perangkat keras secara langsung.',
      });
      setCameraError(language === 'en' ? 'Camera access is restricted inside preview iframe frame.' : 'Akses kamera dibatasi di dalam bingkai pratinjau iframe.');
      return;
    }

    let stream: MediaStream | null = null;
    let lastError: any = null;

    // Tier 1: Ideal user-facing camera + audio with echo cancellation
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640, max: 1280 }, height: { ideal: 480, max: 720 }, facingMode: 'user' },
        audio: { echoCancellation: true, noiseSuppression: true },
      });
    } catch (err1: any) {
      console.warn('Tier 1 camera access failed:', err1?.name, err1?.message);
      lastError = err1;

      // Tier 2: Basic video + audio
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      } catch (err2: any) {
        console.warn('Tier 2 camera access failed:', err2?.name, err2?.message);
        lastError = err2;

        // Tier 3: kamera tanpa mikrofon. Rekaman tanpa suara tidak dapat dinilai,
        // jadi kamera ini hanya dipakai untuk memastikan penyebabnya mikrofon.
        try {
          const silentStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          silentStream.getTracks().forEach((t) => t.stop());
          const micErr: any = new Error('Microphone unavailable');
          micErr.name = 'MicUnavailable';
          lastError = micErr;
        } catch (err3: any) {
          console.warn('Tier 3 camera access failed:', err3?.name, err3?.message);
          lastError = err3;
        }
      }
    }

    setIsStartingCamera(false);

    if (stream) {
      mediaStreamRef.current = stream;
      setIsVirtualCameraMode(false);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch((playErr) => console.warn('Video play caught:', playErr));
      }
    } else {
      handleCameraFailure(lastError);
    }
  };

  // Virtual Roleplay Studio Canvas Simulator
  const startVirtualCamera = async () => {
    setCameraError(null);
    setCameraDiagnosis(null);
    stopCameraStream();

    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const draw = () => {
      frame++;
      // Background gradient
      ctx.fillStyle = '#080d1a';
      ctx.fillRect(0, 0, 640, 480);

      // Grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < 640; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 480);
        ctx.stroke();
      }
      for (let y = 0; y < 480; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(640, y);
        ctx.stroke();
      }

      // Frontline avatar
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(320, 195, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(320, 360, 130, 95, 0, 0, Math.PI * 2);
      ctx.fill();

      // Frontline Apron & Badge
      ctx.fillStyle = '#b45309';
      ctx.fillRect(280, 275, 80, 85);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('FRONTLINE', 288, 305);

      // Pulse circle
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      const pulseRadius = 60 + Math.sin(frame * 0.1) * 6;
      ctx.beginPath();
      ctx.arc(320, 195, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Animated Audio Waveform Bars
      const bars = 16;
      ctx.fillStyle = '#f59e0b';
      for (let i = 0; i < bars; i++) {
        const h = Math.abs(Math.sin(frame * 0.12 + i * 0.4)) * 28 + 8;
        ctx.fillRect(215 + i * 14, 435 - h / 2, 8, h);
      }

      // HUD overlay
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(28, 28, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('SIMULATOR ROLEPLAY VIRTUAL Vokasta', 45, 32);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText(`ROLEPLAY: ${scenario.jenis.toUpperCase()} • STATUS: SIAP MEREKAM SIMULASI`, 45, 52);

      animId = requestAnimationFrame(draw);
    };

    draw();
    virtualAnimRef.current = animId;

    const stream = (canvas as any).captureStream ? (canvas as any).captureStream(25) : null;
    if (!stream) {
      setCameraError('Peramban tidak mendukung fitur penangkapan stream kanvas video.');
      return;
    }

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStream.getAudioTracks().forEach((track) => stream.addTrack(track));
      }
    } catch {
      // Microphone optional
    }

    mediaStreamRef.current = stream;
    setIsVirtualCameraMode(true);
    setIsCameraActive(true);
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((e) => console.warn('Virtual play caught:', e));
    }
  };

  const stopCameraStream = () => {
    if (virtualAnimRef.current) {
      cancelAnimationFrame(virtualAnimRef.current);
      virtualAnimRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsVirtualCameraMode(false);
  };

  const triggerSpontaneousCurveball = () => {
    const curveballPool = language === 'en'
      ? [
          {
            text: 'Hold on! If I pay with card or digital wallet, are there any extra merchant fees? And what if my cellular data drops during payment?',
            category: 'Payment Method & Connectivity Interruption',
          },
          {
            text: 'Oh sorry to interrupt, I just got an urgent call from my office—can we please expedite this service in the next two minutes?',
            category: 'Urgent Time Crunch Interruption',
          },
          {
            text: 'Excuse me for cutting in, if I buy this as a gift, is there a size exchange or warranty guarantee within 3 days?',
            category: 'Return & Exchange Policy Interruption',
          },
          {
            text: 'Wait a second, my colleague said there was a 20% discount promotion today. Can that be applied at checkout directly?',
            category: 'Promotion & Checkout Discount Inquiry',
          },
        ]
      : [
          {
            text: 'Bentar Mas/Mbak! Kalau bayar pakai QRIS ada biaya admin tambahan nggak ya? Terus kalau sinyal saya mendadak jelek gimana solusinya?',
            category: 'Interupsi Metode Bayar & Sinyal',
          },
          {
            text: 'Waduh Mas/Mbak, saya mendadak ada telepon darurat dari kantor, proses layanannya bisa dipercepat dalam 2 menit gak ya?',
            category: 'Interupsi Waktu Mendesak',
          },
          {
            text: 'Maaf potong sebentar, kalau produk ini saya jadikan kado, ada garansi tukar size atau pengembalian dalam 3 hari nggak?',
            category: 'Interupsi Kebijakan Garansi & Retur',
          },
          {
            text: 'Eh tunggu dulu, teman saya kemarin bilang ada diskon promo bank 20%, di kasir ini bisa langsung dipotong nggak ya?',
            category: 'Interupsi Pertanyaan Promo & Kasir',
          },
        ];

    const pick = curveballPool[Math.floor(Math.random() * curveballPool.length)];
    setActiveCurveball({
      text: pick.text,
      category: pick.category,
      triggeredAt: Date.now(),
    });

    try {
      handlePlayCustomerAudio(pick.text);
    } catch (e) {
      console.warn('Curveball audio play error:', e);
    }
  };

  const startRecording = () => {
    if (!mediaStreamRef.current) return;
    setRecordedBlob(null);
    setVideoPreviewUrl(null);
    setVideoBase64(null);
    setRecordingTime(0);
    setActiveCurveball(null);
    curveballTriggeredRef.current = false;

    try {
      const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')
        ? 'video/webm;codecs=vp8,opus'
        : MediaRecorder.isTypeSupported('video/webm')
        ? 'video/webm'
        : MediaRecorder.isTypeSupported('video/mp4')
        ? 'video/mp4'
        : '';

      setVideoMimeType(mime ? mime.split(';')[0].trim() : 'video/webm');

      let recorder: MediaRecorder;
      const options: MediaRecorderOptions = {};
      if (mime) {
        options.mimeType = mime;
      }

      try {
        recorder = new MediaRecorder(mediaStreamRef.current, {
          ...options,
          videoBitsPerSecond: 1200000,
        });
      } catch {
        recorder = new MediaRecorder(mediaStreamRef.current);
      }

      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const finalBlob = new Blob(chunks, { type: recorder.mimeType || 'video/webm' });
        setRecordedBlob(finalBlob);
        setVideoMimeType(recorder.mimeType ? recorder.mimeType.split(';')[0].trim() : 'video/webm');
        const url = URL.createObjectURL(finalBlob);
        setVideoPreviewUrl(url);

        const reader = new FileReader();
        reader.readAsDataURL(finalBlob);
        reader.onloadend = () => {
          setVideoBase64(reader.result as string);
        };
      };

      recorder.start(1000);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const next = prev + 1;
          if (enableCurveballMode && !curveballTriggeredRef.current && next >= 8) {
            curveballTriggeredRef.current = true;
            triggerSpontaneousCurveball();
          }
          return next;
        });
      }, 1000);
    } catch (err: any) {
      console.error('Recording initialization error:', err);
      setCameraError('Gagal memulai perekaman video simulasi: ' + err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    stopCameraStream();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCameraError(null);
    setCameraDiagnosis(null);
    setRecordedBlob(file);
    setVideoMimeType(file.type);
    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoBase64(reader.result as string);
    };
  };

  const handleSelectSampleClip = (outcome: 'pass' | 'needs_review') => {
    setIsFailureTestMode(outcome === 'needs_review');
    setVideoPreviewUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
    setVideoBase64('SIMULATED_BENCHMARK_VIDEO_PAYLOAD');
    setVideoMimeType('video/mp4');
  };

  const handleProceed = () => {
    if (!videoBase64 && !videoPreviewUrl) return;

    onProceedToAnalysis({
      videoBase64: videoBase64 || '',
      mimeType: videoMimeType,
      videoBlob: recordedBlob || undefined,
      previewUrl: videoPreviewUrl || undefined,
      simulateMode: videoBase64 === 'SIMULATED_BENCHMARK_VIDEO_PAYLOAD',
      failureSimulation: isFailureTestMode,
    });
  };

  // Instant 1-Click Evaluation path using verified scripted benchmark case (no webcam required)
  const handleQuickBenchmarkAnalysis = (outcome: 'pass' | 'needs_review' = 'pass') => {
    onProceedToAnalysis({
      videoBase64: 'SIMULATED_BENCHMARK_VIDEO_PAYLOAD',
      mimeType: 'video/mp4',
      previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      simulateMode: true,
      failureSimulation: outcome === 'needs_review',
    });
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 py-2 text-slate-100 min-w-0">
      {/* Top Bar with Clean Back Button */}
      <div className="flex items-center justify-between min-w-0 gap-2">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center space-x-1.5 cursor-pointer py-1 transition shrink-0"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>{language === 'en' ? 'Back to Scenario Catalog' : 'Kembali ke Katalog Skenario'}</span>
        </button>

        <span className="text-xs text-slate-400 font-mono bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-800 shadow-xs min-w-0 max-w-full truncate">
          Session ID:{' '}
          <span className="text-amber-400 font-semibold min-w-0 max-w-full truncate hidden sm:inline">{session.id}</span>
          <span className="text-amber-400 font-semibold min-w-0 max-w-full truncate sm:hidden">{session.id.slice(-8)}</span>
        </span>
      </div>

      {/* Task Instruction Card */}
      <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl space-y-6 min-w-0">
        {/* Phase Stepper Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-1.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs min-w-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2 flex-1 w-full min-w-0">
            <button
              onClick={() => setAssessmentPhase('briefing')}
              className={`w-full sm:flex-1 px-3.5 py-2 rounded-lg font-bold flex items-center justify-center space-x-2 transition cursor-pointer text-center ${
                assessmentPhase === 'briefing'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-950/20 flex items-center justify-center text-xs font-extrabold shrink-0">1</span>
              <span className="truncate">
                {isVoiceMode
                  ? (language === 'en' ? 'Two-Way Voice Conversation' : 'Percakapan Suara Dua Arah')
                  : (language === 'en' ? 'Phase 1: Briefing & Voice Practice' : 'Tahap 1: Briefing & Latihan Suara')}
              </span>
            </button>

            {!isVoiceMode && (
            <button
              onClick={() => setAssessmentPhase('recording')}
              className={`w-full sm:flex-1 px-3.5 py-2 rounded-lg font-bold flex items-center justify-center space-x-2 transition cursor-pointer text-center ${
                assessmentPhase === 'recording'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-950/20 flex items-center justify-center text-xs font-extrabold shrink-0">2</span>
              <span className="truncate">{language === 'en' ? 'Phase 2: AI Roleplay Assessment Recording' : 'Tahap 2: Rekam Sesi Uji AI'}</span>
            </button>
            )}
          </div>

          <div className="w-full sm:w-auto text-center text-xs text-slate-400 px-3 py-1 bg-slate-900/80 rounded-lg border border-slate-855 flex items-center justify-center space-x-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>
              {isVoiceMode
                ? (language === 'en' ? 'Assessed once, after the conversation' : 'Dinilai sekali, setelah percakapan')
                : assessmentPhase === 'briefing'
                ? (language === 'en' ? 'Open Sandbox Phase' : 'Fase Sandbox Terbuka')
                : (language === 'en' ? 'Multimodal Assessment Phase' : 'Fase Penilaian Multimodal')}
            </span>
          </div>
        </div>

        {/* Header Ringkas */}
        <div className="pb-4 border-b border-slate-800 space-y-3 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 min-w-0">
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  {scenario.category} • {scenario.role_context}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-semibold border border-slate-700">
                  {scenario.jenis.toUpperCase()}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight break-words">
                {scenario.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
                {scenario.buyer_persona?.temperament || scenario.evaluation_prompt_snippet || scenario.task_instruction_en}
              </p>
            </div>

            {/* Tombol kecil "Cara pakai" */}
            <button
              type="button"
              onClick={() => setShowGuideModal(true)}
              className="min-h-[44px] shrink-0 self-start sm:self-auto inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition cursor-pointer shadow-xs"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>{language === 'en' ? 'How to Use' : 'Cara Pakai'}</span>
            </button>
          </div>

          {/* 3 Chip Kriteria Penilaian */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 font-medium mr-1">
              {language === 'en' ? 'Criteria:' : 'Kriteria:'}
            </span>
            {scenario.parameters.slice(0, 3).map((param) => (
              <div
                key={param.id}
                title={language === 'en' ? 'Pass if at least 70 for each criterion' : 'Lulus jika minimal 70 untuk setiap kriteria'}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-750 text-xs text-slate-300 font-medium cursor-help hover:border-amber-500/60 transition shadow-xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span className="font-semibold text-white">{param.name}</span>
                <span className="text-amber-400 font-mono text-[11px] font-bold">({param.weight}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Panduan 3 Langkah */}
        {showGuideModal && createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-750 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl space-y-4 text-slate-100">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                    💡
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {language === 'en' ? 'How to Practice in 3 Simple Steps' : 'Panduan 3 Langkah Latihan'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCloseGuideModal}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div>
                    <h4 className="font-bold text-white">
                      {language === 'en' ? '1. Listen to the customer' : '1. Dengarkan pelanggan'}
                    </h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {language === 'en' ? 'Hear their objection and tone in authentic regional dialect.' : 'Pahami keluhan dan situasi pelanggan dengan dialek daerah pilihannya.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div>
                    <h4 className="font-bold text-white">
                      {language === 'en' ? '2. Answer with voice or text' : '2. Jawab dengan suara atau ketik'}
                    </h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {language === 'en' ? 'Speak with the microphone or type your SOP response.' : 'Gunakan tombol mikrofon untuk bicara langsung atau ketik respons SOP Anda.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <div>
                    <h4 className="font-bold text-white">
                      {isVoiceMode
                        ? (language === 'en' ? '3. Keep the conversation going, then get assessed' : '3. Lanjutkan percakapan, lalu dinilai')
                        : (language === 'en' ? '3. Hear reply & see your scores' : '3. Dengar balasan dan lihat nilai')}
                    </h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {isVoiceMode
                        ? (language === 'en' ? 'The AI customer answers back with voice each turn. After at least 2 turns, finish and receive your assessment.' : 'Pelanggan AI membalas dengan suara di setiap giliran. Setelah minimal 2 giliran, selesaikan dan terima penilaian Anda.')
                        : (language === 'en' ? 'Listen to AI customer reaction and review a quick estimate for 3 criteria (not the official score).' : 'Dengarkan balasan suara AI dan lihat perkiraan cepat untuk 3 kriteria (bukan nilai resmi).')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                {!isVoiceMode && (
                <button
                  type="button"
                  onClick={() => {
                    handleCloseGuideModal();
                    setAssessmentPhase('recording');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl border border-slate-700 hover:border-amber-500/60 text-slate-200 hover:text-white font-semibold text-xs transition cursor-pointer"
                >
                  {language === 'en' ? 'Skip practice, record video now' : 'Lewati latihan, langsung rekam video'}
                </button>
                )}
                <button
                  type="button"
                  onClick={handleCloseGuideModal}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer shadow-md"
                >
                  {language === 'en' ? 'Got It, Start Practice' : 'Mengerti, Mulai Latihan'}
                </button>
              </div>
            </div>
          </div>
        , document.body)}

        {/* Interactive Virtual Customer / Buyer Roleplay Section (Tahap 1: Briefing & Latihan Suara) */}
        {assessmentPhase === 'briefing' && (
          <div className="space-y-4 pt-1">
            {/* LANGKAH 1: Atur Pelanggan (Opsional) */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">1</span>
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    {language === 'en' ? 'Step 1: Configure Customer (Optional)' : 'Langkah 1: Atur Pelanggan (Opsional)'}
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">
                  {language === 'en' ? 'Default: National (Jabodetabek)' : 'Bawaan: Nasional (Jabodetabek)'}
                </span>
              </div>

              {isVoiceMode && (
                <div id="practice-language-picker" className="rounded-xl bg-slate-950 border border-slate-750 p-2 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400 px-1">
                    {language === 'en' ? 'Practice language' : 'Bahasa latihan'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {([
                      { id: 'id', label: 'Bahasa Indonesia', sub: language === 'en' ? 'Local customers, regional dialects' : 'Pelanggan lokal, dialek daerah' },
                      { id: 'en', label: 'English', sub: language === 'en' ? 'Foreign tourists and expats (tourist-area outlets)' : 'Turis dan ekspatriat (gerai di daerah wisata)' },
                    ] as const).map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        id={`practice-lang-${o.id}`}
                        aria-pressed={practiceLang === o.id}
                        onClick={() => {
                          if (practiceLang === o.id) return;
                          stopAllAudio();
                          setCustomerReaction(null);
                          setTurns([]);
                          setConversationNotice(null);
                          setLiveState('live');
                          setPracticeLang(o.id);
                        }}
                        className={`min-h-[48px] px-3 py-2 rounded-lg text-left text-xs transition cursor-pointer border ${
                          practiceLang === o.id ? 'bg-amber-500/20 border-amber-500/60 text-white' : 'border-slate-800 text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <div className="font-bold">{o.label}</div>
                        <div className="text-[10px] text-slate-400">{o.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isEnPractice ? (
                <p className="text-[11px] text-slate-400 bg-slate-950 border border-slate-800 rounded-xl p-3 leading-relaxed">
                  {language === 'en'
                    ? 'English practice: the customer is a foreign visitor who speaks only English. Dialect options are not used. Your accent is not scored; clear and polite service is.'
                    : 'Latihan Bahasa Inggris: pelanggan adalah tamu mancanegara yang hanya berbicara Bahasa Inggris. Pilihan dialek tidak dipakai. Aksen Anda tidak dinilai; yang dinilai adalah pelayanan yang jelas dan sopan.'}
                </p>
              ) : (
              <>
              {/* Satu baris: Pemilih Dialek & Panggilan untuk Anda */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Pemilih Dialek Ringkas (10 Dialek Dilipat) */}
                <div className="relative flex-1">
                  <button
                    type="button"
                    onClick={() => setIsDialectDropdownOpen((prev) => !prev)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-750 hover:border-amber-500/50 text-xs text-white font-medium flex items-center justify-between space-x-2 transition cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-base shrink-0">{selectedDialectOption?.avatarIcon || '🇮🇩'}</span>
                      <span className="text-slate-400 text-xs">
                        {language === 'en' ? 'Dialect:' : 'Dialek:'}
                      </span>
                      <span className="font-bold text-amber-300 truncate">
                        {selectedDialectOption?.label.split(' / ')[0] || 'Nasional'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isDialectDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Menu Dropdown 10 Dialek */}
                  {isDialectDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 max-h-72 overflow-y-auto space-y-1 animate-in fade-in duration-150">
                      <div className="text-[11px] font-semibold text-slate-400 px-2 py-1">
                        {language === 'en' ? 'Select Customer Accent & Dialect:' : 'Pilih Dialek & Aksen Pelanggan:'}
                      </div>
                      {regionalDialects.map((d) => {
                        const isSelected = selectedDialect === d.id;
                        return (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => {
                              stopAllAudio();
                              setSelectedDialect(d.id);
                              setCustomerReaction(null);
                              setIsDialectDropdownOpen(false);
                            }}
                            className={`w-full min-h-[44px] p-2.5 rounded-lg text-left text-xs flex items-center justify-between transition cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500/20 text-white font-bold border border-amber-500/50'
                                : 'text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5 min-w-0">
                              <span className="text-base shrink-0">{d.avatarIcon}</span>
                              <div className="truncate">
                                <div className="font-semibold text-white truncate">{d.label.split(' / ')[0]}</div>
                                <div className="text-[11px] text-slate-400 truncate">{d.badge} • {d.description}</div>
                              </div>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Kontrol Panggilan untuk Anda (Label Dinamis Berdasarkan Dialek) */}
                <div className="flex items-center justify-between sm:justify-start gap-1.5 bg-slate-950 border border-slate-750 rounded-xl p-1 text-xs">
                  <span className="text-slate-400 text-[11px] font-medium px-2 hidden sm:inline">
                    {language === 'en' ? 'Call for You:' : 'Panggilan untuk Anda:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      stopAllAudio();
                      setCandidateGender('male');
                      setCustomerReaction(null);
                    }}
                    className={`min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                      candidateGender === 'male'
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>👨</span>
                    <span>{getHonorificDisplay(selectedDialect, 'male')}</span>
                    <span className="text-[10px] opacity-80">({language === 'en' ? 'Male' : 'Pria'})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      stopAllAudio();
                      setCandidateGender('female');
                      setCustomerReaction(null);
                    }}
                    className={`min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                      candidateGender === 'female'
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>👩</span>
                    <span>{getHonorificDisplay(selectedDialect, 'female')}</span>
                    <span className="text-[10px] opacity-80">({language === 'en' ? 'Female' : 'Wanita'})</span>
                  </button>
                </div>
              </div>
              </>
              )}
            </div>

            {/* LANGKAH 2: Dengarkan Pelanggan */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3.5 min-w-0">
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between pb-2 border-b border-slate-800 min-w-0 gap-2">
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">2</span>
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    {language === 'en' ? 'Step 2: Listen to the Customer' : 'Langkah 2: Dengarkan Pelanggan'}
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono truncate min-w-0">
                  {customerData.name} ({customerData.dialectLabel.split(' (')[0]})
                </span>
              </div>

              {/* Kartu Profil & Kalimat Pelanggan */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 min-w-0">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                    {customerData.initials || 'PL'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-white truncate">{customerData.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-semibold border border-slate-700 shrink-0">
                        {customerData.dialectLabel.split(' (')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{customerData.tag}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-100 text-xs sm:text-sm italic leading-relaxed break-words">
                  "{customerData.line}"
                </div>
              </div>

              {/* Tampilan Jujur Saat TTS Gagal */}
              {customerAudioStatus === 'error' && (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-300 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    {language === 'en'
                      ? 'Voice audio unavailable, text is displayed'
                      : 'Suara tidak tersedia, teks ditampilkan'}
                  </span>
                </div>
              )}

              {/* SATU TOMBOL PUTAR BESAR (Hapus Tombol Putar Ganda) */}
              {liveActive ? (
                <p className="text-[11px] text-slate-400 bg-slate-950 border border-slate-800 rounded-xl p-3 leading-relaxed">
                  {isEnPractice
                    ? (language === 'en' ? 'The customer speaks first, live, when you press Start conversation in Step 3.' : 'Pelanggan akan berbicara lebih dulu secara langsung saat Anda menekan Mulai percakapan di Langkah 3.')
                    : (language === 'en' ? 'The customer speaks first, live, when you press Start conversation in Step 3.' : 'Pelanggan akan berbicara lebih dulu secara langsung saat Anda menekan Mulai percakapan di Langkah 3, dengan suara yang sama sepanjang percakapan.')}
                </p>
              ) : (
              <button
                id="play-customer-audio-btn"
                type="button"
                onClick={() => handlePlayCustomerAudio()}
                disabled={customerAudioStatus === 'loading'}
                className={`w-full min-h-[48px] px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition cursor-pointer shadow-md border ${
                  customerAudioStatus === 'playing'
                    ? 'bg-rose-950/90 text-rose-300 border-rose-600 animate-pulse'
                    : customerAudioStatus === 'loading'
                    ? 'bg-slate-900 text-slate-400 border-slate-800 cursor-wait'
                    : customerAudioStatus === 'ended'
                    ? 'bg-slate-900 hover:bg-slate-850 text-amber-300 border-amber-500/50'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-400 shadow-amber-500/20'
                }`}
              >
                {customerAudioStatus === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{language === 'en' ? 'Preparing Voice Audio...' : 'Menyiapkan Suara Pelanggan...'}</span>
                  </>
                ) : customerAudioStatus === 'playing' ? (
                  <>
                    <VolumeX className="w-5 h-5 text-rose-400" />
                    <span>{language === 'en' ? 'Stop Audio' : 'Hentikan Suara'}</span>
                  </>
                ) : customerAudioStatus === 'ended' ? (
                  <>
                    <RotateCcw className="w-5 h-5 text-amber-400" />
                    <span>{language === 'en' ? 'Replay Customer Voice' : 'Putar Ulang Suara Pelanggan'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5 text-slate-950" />
                    <span>{language === 'en' ? 'Listen to Customer' : 'Dengarkan Pelanggan'}</span>
                  </>
                )}
              </button>
              )}

              {/* Indikator Memutar Audio */}
              {customerAudioStatus === 'playing' && (
                <div className="flex items-center justify-center space-x-2 text-emerald-400 text-xs pt-1">
                  <div className="flex items-end space-x-1 h-3.5">
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_100ms] h-3" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_200ms] h-2" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_300ms] h-3.5" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_150ms] h-2.5" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_250ms] h-3" />
                  </div>
                  <span className="font-mono text-xs">
                    {language === 'en' ? 'Playing Customer Voice...' : 'Memutar Suara Pelanggan...'}
                  </span>
                </div>
              )}
            </div>

            {/* LANGKAH 3: Jawab Pelanggan */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">3</span>
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    {isVoiceMode
                      ? (language === 'en' ? 'Step 3: Two-Way Conversation' : 'Langkah 3: Percakapan Dua Arah')
                      : (language === 'en' ? 'Step 3: Answer the Customer' : 'Langkah 3: Jawab Pelanggan')}
                  </h3>
                </div>
                <span className="text-xs text-slate-400" id="turn-counter">
                  {liveActive
                    ? (language === 'en' ? 'Live voice' : 'Suara live')
                    : isVoiceMode
                    ? (language === 'en' ? `Turn ${workerTurnCount} of max ${MAX_WORKER_TURNS}` : `Giliran ${workerTurnCount} dari maks ${MAX_WORKER_TURNS}`)
                    : (language === 'en' ? 'Voice or Text' : 'Suara atau Ketik')}
                </span>
              </div>

              {isVoiceMode && (
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  {language === 'en'
                    ? (liveActive
                        ? 'Talk to the AI customer as you would at work. Press the microphone to start, speak naturally, and the customer answers in real time. You may interrupt. Press the microphone again when you want to stop. Assessment happens once, after the whole conversation.'
                        : 'Talk with the customer the way you would at work. Press the microphone to start speaking and press it again when you are done, then send. Assessment happens once, after the whole conversation.')
                    : (liveActive
                        ? 'Bicaralah langsung dengan pelanggan AI seperti saat bekerja. Tekan mikrofon untuk mulai, bicara secara natural, dan pelanggan menjawab real-time. Anda boleh memotong ucapannya. Tekan mikrofon lagi bila ingin berhenti. Penilaian dilakukan sekali, setelah seluruh percakapan selesai.'
                        : 'Bicaralah dengan pelanggan seperti saat bekerja. Tekan mikrofon untuk mulai bicara dan tekan lagi bila sudah selesai, lalu kirim. Penilaian dilakukan sekali, setelah seluruh percakapan selesai.')}
                </p>
              )}

              {liveActive && (
                <React.Fragment key={`${selectedDialect}-${candidateGender}-${pressureLevel}-${practiceLang}`}>
                <LiveVoicePanel
                  scenarioId={scenario.id}
                  dialect={selectedDialect}
                  candidateGender={candidateGender === 'female' ? 'female' : 'male'}
                  pressureLevel={pressureLevel}
                  language={practiceLang}
                  persona={{
                    name: customerData.name,
                    title: customerData.title,
                    tag: customerData.tag,
                    stylePrompt: customerData.stylePrompt,
                    line: customerData.line,
                    isFemale: Boolean(customerData.isFemale),
                    voice: ((customerData.voiceName || '').match(/\((\w+) Neural Voice\)/) || [])[1] || '',
                    initials: customerData.initials || 'PL',
                  }}
                  enableTwist={enableCurveballMode}
                  minWorkerTurns={MIN_WORKER_TURNS}
                  onFinish={(conversation) => {
                    stopDictation();
                    stopAllAudio();
                    onProceedToAnalysis({
                      videoBase64: '',
                      mimeType: '',
                      inputMode: 'voice',
                      practiceLanguage: practiceLang,
                      conversation: sanitizeConversation(conversation),
                    });
                  }}
                  onUnavailable={(reason, carried) => {
                    setTurns(carried.filter((t) => t.role === 'worker' || t.role === 'customer').map((t) => ({ role: t.role, text: t.text })));
                    setLiveState('text');
                    if (reason !== 'manual') {
                      setConversationNotice(
                        language === 'en'
                          ? 'Live voice is not available right now, so the conversation continues in typing and dictation mode. Your answers so far are kept.'
                          : 'Suara live sedang tidak tersedia, jadi percakapan dilanjutkan dengan mode ketik atau dikte. Jawaban Anda sejauh ini tetap tersimpan.'
                      );
                    } else {
                      setConversationNotice(null);
                    }
                  }}
                />
                </React.Fragment>
              )}

              {!liveActive && (<>
              {isVoiceMode && (
                <div id="conversation-log" className="rounded-xl bg-slate-950 border border-slate-800 p-3 space-y-2.5 max-h-80 overflow-y-auto">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {customerData.initials || 'PL'}
                    </div>
                    <div className="max-w-[88%] rounded-xl rounded-tl-sm bg-slate-900 border border-slate-800 px-3 py-2 text-xs sm:text-sm text-slate-100 leading-relaxed break-words">
                      <div className="text-[10px] text-amber-300 font-semibold mb-0.5">{customerData.name}</div>
                      <span className="italic">"{customerData.line}"</span>
                    </div>
                  </div>

                  {turns.map((t, i) =>
                    t.role === 'worker' ? (
                      <div key={i} className="flex justify-end">
                        <div className="max-w-[88%] rounded-xl rounded-tr-sm bg-amber-500/15 border border-amber-500/40 px-3 py-2 text-xs sm:text-sm text-amber-50 leading-relaxed break-words">
                          <div className="text-[10px] text-amber-300 font-semibold mb-0.5">{language === 'en' ? 'You' : 'Anda'}</div>
                          {t.text}
                        </div>
                      </div>
                    ) : (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {customerData.initials || 'PL'}
                        </div>
                        <div className="max-w-[88%] rounded-xl rounded-tl-sm bg-slate-900 border border-slate-800 px-3 py-2 text-xs sm:text-sm text-slate-100 leading-relaxed break-words">
                          <div className="flex flex-wrap items-center gap-2 mb-0.5">
                            <span className="text-[10px] text-amber-300 font-semibold">{customerData.name}</span>
                            {t.sentiment && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                                {t.sentiment === 'impressed'
                                  ? (language === 'en' ? 'Impressed' : 'Sangat kagum')
                                  : t.sentiment === 'satisfied'
                                  ? (language === 'en' ? 'Satisfied' : 'Puas')
                                  : t.sentiment === 'clarifying'
                                  ? (language === 'en' ? 'Needs clarity' : 'Butuh kejelasan')
                                  : (language === 'en' ? 'Not satisfied' : 'Belum puas')}
                              </span>
                            )}
                            {t.audioDataUrl && (
                              <button
                                type="button"
                                onClick={() => handlePlayTurnAudio(t.audioDataUrl)}
                                className="text-[10px] text-sky-300 hover:text-sky-200 underline cursor-pointer inline-flex items-center gap-1"
                              >
                                <Volume2 className="w-3 h-3" />
                                {language === 'en' ? 'Play' : 'Putar'}
                              </button>
                            )}
                          </div>
                          <span className="italic">"{t.text}"</span>
                        </div>
                      </div>
                    )
                  )}

                  {isPracticingReaction && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 pl-9">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      <span>{language === 'en' ? 'The customer is replying...' : 'Pelanggan sedang menjawab...'}</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              )}

              {/* Tombol Mikrofon Besar */}
              <button
                type="button"
                onClick={handleToggleDictation}
                className={`w-full min-h-[48px] px-4 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2.5 transition cursor-pointer border shadow-sm ${
                  isListeningDictation
                    ? 'bg-rose-950/90 text-rose-300 border-rose-600 animate-pulse'
                    : 'bg-slate-950 hover:bg-slate-900 text-slate-200 border-slate-750 hover:border-amber-500/50'
                }`}
              >
                {isListeningDictation ? (
                  <>
                    <MicOff className="w-5 h-5 text-rose-400" />
                    <span>{language === 'en' ? 'Microphone is ON. Press again when you are done' : 'Mikrofon AKTIF. Tekan lagi bila sudah selesai bicara'}</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 text-amber-400" />
                    <span>{language === 'en' ? 'Press to speak (Microphone)' : 'Tekan untuk bicara (Mikrofon)'}</span>
                  </>
                )}
              </button>

              {isListeningDictation && (
                <div id="dictation-live" className="p-2.5 rounded-lg bg-slate-950 border border-rose-900/60 text-[11px] text-slate-300 min-h-[36px]">
                  <span className="text-rose-300 font-semibold">{language === 'en' ? 'Hearing: ' : 'Terdengar: '}</span>
                  <span className="italic">{dictationInterim || (language === 'en' ? 'speak now...' : 'silakan bicara...')}</span>
                </div>
              )}

              {dictationNotice && (
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-amber-300">
                  {dictationNotice}
                </div>
              )}

              {/* Kolom Ketik Sebagai Alternatif & Tombol Kirim Jawaban */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  {language === 'en' ? 'Or Type Your Response' : 'Atau Ketik Respons Anda'}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={practiceSpeech}
                    onChange={(e) => setPracticeSpeech(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && practiceSpeech.trim() && !isPracticingReaction) {
                        handleTestCustomerReaction();
                      }
                    }}
                    placeholder={language === 'en' ? 'Type what you want to say to the customer...' : 'Ketik apa yang ingin Anda katakan ke pelanggan...'}
                    className="flex-1 min-h-[44px] bg-slate-950 border border-slate-750 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => handleTestCustomerReaction()}
                    disabled={isPracticingReaction || !practiceSpeech.trim() || (isVoiceMode && workerTurnCount >= MAX_WORKER_TURNS)}
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition cursor-pointer shadow-md disabled:cursor-not-allowed shrink-0"
                  >
                    {isPracticingReaction ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>{language === 'en' ? 'Sending...' : 'Mengirim...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>{language === 'en' ? 'Send Answer' : 'Kirim Jawaban'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {isVoiceMode && (conversationNotice || customerWantsEnd || workerTurnCount >= MAX_WORKER_TURNS) && (
                <div role="status" className="p-2.5 rounded-lg bg-slate-950 border border-amber-500/40 text-[11px] text-amber-200 space-y-1">
                  {conversationNotice && <p>{conversationNotice}</p>}
                  {customerWantsEnd && (
                    <p>{language === 'en' ? 'The customer has wrapped up the conversation. You can finish and get assessed now.' : 'Pelanggan sudah menutup percakapan. Anda bisa menyelesaikan dan meminta penilaian sekarang.'}</p>
                  )}
                  {workerTurnCount >= MAX_WORKER_TURNS && (
                    <p>{language === 'en' ? 'Maximum number of turns reached. Please finish the conversation.' : 'Batas giliran tercapai. Silakan selesaikan percakapan.'}</p>
                  )}
                </div>
              )}

              {isVoiceMode && (
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    type="button"
                    id="finish-conversation-btn"
                    onClick={handleFinishConversation}
                    disabled={isPracticingReaction || workerTurnCount < MIN_WORKER_TURNS}
                    className={`min-h-[48px] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md disabled:cursor-not-allowed ${
                      customerWantsEnd || workerTurnCount >= MIN_WORKER_TURNS
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-500'
                    } disabled:opacity-70 flex-1`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {language === 'en'
                        ? `Finish & Assess Conversation (${workerTurnCount}/${MIN_WORKER_TURNS} minimum)`
                        : `Selesai dan Nilai Percakapan (${workerTurnCount}/${MIN_WORKER_TURNS} minimal)`}
                    </span>
                  </button>
                  {turns.length > 0 && (
                    <button
                      type="button"
                      onClick={handleResetPractice}
                      disabled={isPracticingReaction}
                      className="min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{language === 'en' ? 'Restart conversation' : 'Mulai ulang percakapan'}</span>
                    </button>
                  )}
                </div>
              )}

              {isVoiceMode && (
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  {language === 'en'
                    ? 'Changing dialect, address term, or pressure level restarts the conversation. Speech is turned into text by your browser; you can edit the text before sending.'
                    : 'Mengganti dialek, panggilan, atau tingkat tekanan memulai ulang percakapan. Ucapan diubah menjadi teks oleh peramban Anda; teks boleh diedit sebelum dikirim.'}
                </p>
              )}

              {/* Contoh Jawaban Cepat Dilipat ("Lihat Contoh Jawaban") */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowQuickResponseExamples((prev) => !prev)}
                  className="min-h-[44px] text-xs text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center space-x-1.5 cursor-pointer py-1"
                >
                  <span>💡</span>
                  <span>{language === 'en' ? 'View Example Responses' : 'Lihat Contoh Jawaban'}</span>
                  {showQuickResponseExamples ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showQuickResponseExamples && (
                  <div className="mt-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 animate-in fade-in duration-150">
                    <p className="text-[11px] text-slate-400">
                      {language === 'en'
                        ? 'Click an example to use as your response:'
                        : 'Klik salah satu contoh respons di bawah untuk langsung mengisi teks:'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(() => {
                        const allQuick = (language === 'en'
                          ? getEnglishQuickResponses(scenario.id)
                          : getQuickResponses(scenario.id, selectedDialect, workerIsFemale)
                        );
                        const turnQuick = allQuick.filter((o) => o.category === 'turn');
                        const quickOptions = isVoiceMode && turnQuick.length > 0
                          ? [turnQuick[Math.min(workerTurnCount, turnQuick.length - 1)]]
                          : allQuick.slice(0, 2);

                        if (quickOptions.length === 0) {
                          return (
                            <button
                              type="button"
                              onClick={() => {
                                const txt = language === 'en'
                                  ? `Good day ${customerData.name}, I am pleased to assist you with our standard procedure.`
                                  : `Selamat siang ${customerData.name}, mohon maaf atas ketidaknyamanannya. Saya siap membantu memeriksa pesanan Anda segera.`;
                                setPracticeSpeech(txt);
                              }}
                              className="p-3 rounded-lg text-left border border-slate-750 bg-slate-900 hover:border-amber-500/60 transition cursor-pointer text-xs"
                            >
                              <div className="font-bold text-amber-300">{language === 'en' ? 'Standard SOP Response' : 'Respons SOP Standar'}</div>
                              <p className="text-slate-300 mt-1 italic text-xs">
                                {language === 'en'
                                  ? `"Good day ${customerData.name}, I am pleased to assist you with our standard procedure."`
                                  : `"Selamat siang ${customerData.name}, mohon maaf atas ketidaknyamanannya. Saya siap membantu memeriksa pesanan Anda segera."`}
                              </p>
                            </button>
                          );
                        }

                        return quickOptions.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setPracticeSpeech(opt.text);
                            }}
                            className="p-3 rounded-lg text-left border border-slate-750 bg-slate-900 hover:border-amber-500/60 transition cursor-pointer flex flex-col justify-between min-h-[44px]"
                          >
                            <div className="text-xs font-bold text-amber-300">{opt.label}</div>
                            <p className="text-xs text-slate-300 mt-1 line-clamp-3 italic">"{opt.text}"</p>
                          </button>
                        ));
                      })()}
                    </div>
                  </div>
                )}
              </div>
              </>)}
            </div>

            {/* LANGKAH 4: Balasan Pelanggan dan Nilai (Muncul Setelah Jawaban Dikirim) */}
            {customerReaction && !isVoiceMode && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border-2 border-amber-500/50 space-y-4 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">4</span>
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      {language === 'en' ? 'Step 4: Customer Reply & Scores' : 'Langkah 4: Balasan Pelanggan dan Nilai'}
                    </h3>
                  </div>

                  {/* Sentiment Badge */}
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border self-start sm:self-auto ${
                      customerReaction.sentiment === 'impressed'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                        : customerReaction.sentiment === 'satisfied'
                        ? 'bg-sky-950 text-sky-300 border-sky-700'
                        : customerReaction.sentiment === 'clarifying'
                        ? 'bg-amber-950 text-amber-300 border-amber-700'
                        : 'bg-rose-950 text-rose-300 border-rose-700'
                    }`}
                  >
                    {customerReaction.sentiment === 'impressed'
                      ? (language === 'en' ? 'Very Impressed' : 'Sangat Terkesan')
                      : customerReaction.sentiment === 'satisfied'
                      ? (language === 'en' ? 'Satisfied & Calm' : 'Puas & Tenang')
                      : customerReaction.sentiment === 'clarifying'
                      ? (language === 'en' ? 'Clarifying' : 'Mengklarifikasi')
                      : (language === 'en' ? 'Not Satisfied / Skeptical' : 'Belum Puas / Skeptis')}
                  </span>
                </div>

                {/* Kartu Balasan Pelanggan dengan Audio Otomatis / Tombol Putar */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center space-x-1.5">
                      <Volume2 className="w-4 h-4 text-amber-400" />
                      <span>{language === 'en' ? `Customer Reply from ${customerData.name}:` : `Balasan Pelanggan (${customerData.name}):`}</span>
                    </span>

                    {/* Audio Status or Manual Play Button */}
                    <button
                      type="button"
                      onClick={handlePlayReplyVoice}
                      className="min-h-[44px] px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition shadow-xs"
                    >
                      {replyAudioStatus === 'playing' ? (
                        <>
                          <VolumeX className="w-4 h-4" />
                          <span>{language === 'en' ? 'Stop Voice' : 'Hentikan Suara'}</span>
                        </>
                      ) : replyAudioStatus === 'ended' ? (
                        <>
                          <RotateCcw className="w-4 h-4" />
                          <span>{language === 'en' ? 'Replay Voice' : 'Putar Ulang Balasan'}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" />
                          <span>{language === 'en' ? 'Play Reply Voice' : 'Putar Balasan'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-900/90 border border-amber-500/30 text-xs sm:text-sm text-amber-200 font-medium italic leading-relaxed">
                    "{customerReaction.customer_line}"
                  </div>

                  {replyAudioStatus === 'playing' && (
                    <div className="flex items-center space-x-2 text-emerald-400 text-xs">
                      <div className="flex items-end space-x-1 h-3">
                        <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_100ms] h-2.5" />
                        <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_200ms] h-3" />
                        <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_300ms] h-2" />
                      </div>
                      <span>{language === 'en' ? 'Playing AI customer reply...' : 'Sedang memutar suara balasan pelanggan...'}</span>
                    </div>
                  )}

                  <div className="text-xs text-slate-400">
                    <span className="text-slate-500">{language === 'en' ? 'Observation: ' : 'Observasi AI: '}</span>
                    <span className="text-slate-300 font-medium">{customerReaction.customer_observation}</span>
                  </div>
                </div>

                {/* 3 KARTU HASIL PER KRITERIA (MENGGANTIKAN BLOK STATIS 3 PARAMETER) */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'en' ? 'Quick direction check from the customer reaction (not the official score):' : 'Perkiraan arah dari reaksi pelanggan (bukan nilai resmi):'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {getEvaluationResults(customerReaction.sentiment, scenario.parameters).slice(0, 3).map((res) => (
                      <div
                        key={res.id}
                        className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-2"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-white text-xs truncate" title={res.name}>{res.name}</span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                res.passed
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              }`}
                            >
                              {res.passed ? (language === 'en' ? 'GOOD DIRECTION' : 'ARAH BAIK') : (language === 'en' ? 'NEEDS WORK' : 'PERLU DIPERBAIKI')}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 leading-snug">
                            {res.feedback}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tombol Aksi: Coba Lagi dan Lanjut ke Rekam Video */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={handleResetPractice}
                    className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold transition cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-400" />
                    <span>{language === 'en' ? 'Try Again' : 'Coba Lagi'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAssessmentPhase('recording');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition cursor-pointer shadow-md shadow-amber-500/20 flex items-center justify-center space-x-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{language === 'en' ? 'Proceed to Video Recording' : 'Lanjut ke Rekam Video'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* OPSI TANTANGAN (Dilipat, Default Tertutup) */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowChallengeOptions((prev) => !prev)}
                className="w-full min-h-[44px] p-3.5 flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
              >
                <span className="flex items-center space-x-2">
                  <span>⚙️</span>
                  <span>{language === 'en' ? 'Challenge Options (Optional)' : 'Opsi Tantangan (Opsional)'}</span>
                </span>
                {showChallengeOptions ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {showChallengeOptions && (
                <div className="p-4 pt-1 space-y-3 border-t border-slate-800 bg-slate-950/50 animate-in fade-in duration-150">
                  {/* Toggle 1: Pelanggan lebih sulit */}
                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="space-y-0.5 flex-1 pr-2">
                      <div className="text-xs font-bold text-white">
                        {language === 'en' ? 'More Difficult Customer' : 'Pelanggan lebih sulit'}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {language === 'en'
                          ? 'Customer is skeptical, hurried, and less tolerant of hesitation.'
                          : 'Pelanggan skeptis dan menuntut dengan nada bicara terburu-buru serta toleransi yang lebih ketat.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={pressureLevel === 'high_pressure'}
                      onClick={() => setPressureLevel((prev) => (prev === 'standard' ? 'high_pressure' : 'standard'))}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        pressureLevel === 'high_pressure' ? 'bg-amber-500' : 'bg-slate-700'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          pressureLevel === 'high_pressure' ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Toggle 2: Pelanggan memotong ucapan Anda */}
                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="space-y-0.5 flex-1 pr-2">
                      <div className="text-xs font-bold text-white">
                        {language === 'en' ? 'Customer Interrupts You' : 'Pelanggan memotong ucapan Anda'}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {language === 'en'
                          ? 'Customer will interrupt you with a spontaneous objection at second 8 of Phase 2 recording.'
                          : 'Pelanggan akan memotong atau menyela ucapan Anda secara mendadak pada detik ke-8 saat perekaman video di Tahap 2.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={enableCurveballMode}
                      onClick={() => setEnableCurveballMode((prev) => !prev)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        enableCurveballMode ? 'bg-amber-500' : 'bg-slate-700'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          enableCurveballMode ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* GERBANG CTA FOOTER */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              {isVoiceMode ? (
                <div className="w-full text-xs text-slate-400 py-1">
                  {language === 'en'
                    ? 'This scenario is assessed through the voice conversation above. Press "Finish & Assess Conversation" when you are done.'
                    : 'Skenario ini dinilai lewat percakapan suara di atas. Tekan "Selesai dan Nilai Percakapan" bila Anda sudah selesai.'}
                </div>
              ) : !hasPracticedResponse ? (
                <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-1 text-xs">
                  <span className="text-slate-400">
                    {language === 'en'
                      ? 'Practice by sending at least one response above to unlock official assessment.'
                      : 'Kirim minimal satu jawaban di atas untuk melihat nilai dan membuka tahap penilaian.'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setAssessmentPhase('recording');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="min-h-[44px] text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 cursor-pointer flex items-center"
                  >
                    {language === 'en' ? 'Skip practice, record video directly →' : 'Lewati latihan, langsung rekam video →'}
                  </button>
                </div>
              ) : (
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/60 p-4 rounded-xl border border-emerald-900/50">
                  <div className="text-xs text-emerald-400 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>
                      {language === 'en'
                        ? 'Practice completed! You can now proceed to evaluation:'
                        : 'Latihan selesai! Anda siap melanjutkan ke penilaian:'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      id="quick-benchmark-test-btn"
                      onClick={() => handleQuickBenchmarkAnalysis('pass')}
                      className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-2 transition cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{language === 'en' ? '⚡ Quick Test (1-Click without Webcam)' : '⚡ Uji Kasus Siap Pakai (1-Klik Tanpa Webcam)'}</span>
                    </button>

                    <button
                      type="button"
                      id="proceed-to-phase2-recording-btn"
                      onClick={() => {
                        setAssessmentPhase('recording');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center space-x-2 transition cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      <span>{language === 'en' ? 'Proceed to Phase 2: Record Roleplay' : 'Lanjut ke Tahap 2: Rekam Sesi Uji AI'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mode Selection Tabs: Live Webcam vs Upload vs Preset Samples (Tahap 2: Rekam Sesi Uji) */}
      {assessmentPhase === 'recording' && !isVoiceMode && (
      <div id="phase-2-recording-section" className="bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-xs uppercase tracking-wider border border-amber-500/30">
                {language === 'en' ? 'Phase 2' : 'Tahap 2'}
              </span>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <span>{language === 'en' ? 'Record or Upload Roleplay Response' : 'Rekam atau Unggah Respon Roleplay Simulasi'}</span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'en'
                ? 'Use live camera, upload a video file, or test with scripted text cases.'
                : 'Gunakan kamera langsung, unggah rekaman video, atau gunakan kasus uji berskrip (teks).'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setAssessmentPhase('briefing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Back to Briefing' : 'Kembali ke Briefing'}</span>
            </button>

            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => {
                setActiveTab('record');
                setIsFailureTestMode(false);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'record'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Live Camera' : 'Kamera Langsung'}</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('upload');
                stopCameraStream();
                setIsFailureTestMode(false);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'upload'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Upload Video' : 'Unggah Video'}</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('sample');
                stopCameraStream();
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'sample'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Scripted Test Cases (text)' : 'Kasus Uji Berskrip (teks)'}</span>
            </button>
          </div>
        </div>
      </div>

        {/* Tab 1: Live Webcam Recording */}
        {(activeTab === 'record' || activeTab === 'upload') && (
          <div
            id="privacy-note"
            className="flex items-start gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-3.5 py-2.5 text-[12px] leading-relaxed text-slate-300"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              {language === 'en'
                ? 'Privacy: your recording is sent to Google Gemini only to be assessed. This app server does not store the recording file, but the transcript and assessment result are saved in Cloud Firestore. Please do not record other people\'s personal data. This is a competition prototype.'
                : 'Privasi: rekaman Anda dikirim ke Google Gemini hanya untuk dinilai. Server aplikasi ini tidak menyimpan file rekaman, tetapi transkrip dan hasil penilaian disimpan di Cloud Firestore. Jangan merekam data pribadi orang lain. Ini prototipe untuk lomba.'}
            </span>
          </div>
        )}

        {activeTab === 'record' && (
          <div className="space-y-4">
            {/* Adaptive 3T Frontier & Network Telemetry Pill */}
            {resilienceProfile === '3t_frontier' ? (
              <div className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-amber-950/70 border border-amber-800/80 flex items-center justify-between text-xs text-amber-200 shadow-sm animate-in fade-in">
                <div className="flex items-center space-x-2">
                  <Signal className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                  <span>
                    <strong>{language === 'en' ? '3T Frontier Mode Active:' : 'Mode 3T Frontier Aktif:'}</strong>{' '}
                    {language === 'en'
                      ? '12kbps Opus audio transmission optimization (94% quota saved • Local IndexedDB buffer active during cellular drops).'
                      : 'Optimasi transmisi audio Opus 12kbps (Hemat kuota 94% • Buffer IndexedDB lokal aktif saat sinyal seluler drop).'}
                  </span>
                </div>
                <span className="font-mono text-xs bg-amber-900/60 border border-amber-700/60 px-2 py-0.5 rounded text-amber-300 font-bold shrink-0 ml-2">
                  18 kbps • 0% Dropout
                </span>
              </div>
            ) : resilienceProfile === '4g_adaptive' ? (
              <div className="px-3.5 py-1.5 rounded-xl bg-blue-950/40 border border-blue-800/70 flex items-center justify-between text-xs text-blue-200">
                <div className="flex items-center space-x-2">
                  <Wifi className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>
                    <strong>4G Adaptive Bitrate:</strong>{' '}
                    {language === 'en'
                      ? 'Dynamic 720p 15-30 FPS resolution with on-device WebCodecs compression.'
                      : 'Resolusi dinamis 720p 15-30 FPS dengan kompresi WebCodecs lokal.'}
                  </span>
                </div>
                <span className="font-mono text-xs text-blue-300 font-bold shrink-0 ml-2">450 kbps</span>
              </div>
            ) : null}

            <div className="relative aspect-video max-h-96 w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center shadow-inner">
              {/* Recorded Video Playback */}
              {videoPreviewUrl && !isCameraActive ? (
                <video
                  src={videoPreviewUrl}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                /* Live Camera Feed */
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${!isCameraActive ? 'hidden' : ''}`}
                />
              )}

              {/* Status Badge when Camera is Active */}
              {isCameraActive && (
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  {isVirtualCameraMode ? (
                    <span className="bg-amber-950/90 text-amber-300 border border-amber-700/80 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 shadow-md">
                      <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span>{language === 'en' ? 'Virtual Studio Active' : 'Studio Roleplay Virtual Aktif'}</span>
                    </span>
                  ) : (
                    <span className="bg-slate-900/90 text-emerald-300 border border-emerald-800/80 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{language === 'en' ? 'Camera Active' : 'Kamera Aktif'}</span>
                    </span>
                  )}
                </div>
              )}

              {/* Inactive State Prompt */}
              {!isCameraActive && !videoPreviewUrl && (
                <div className="text-center p-6 space-y-3.5 max-w-md">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {language === 'en' ? 'Camera Viewport Ready' : 'Jendela Kamera Siap'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {language === 'en'
                        ? 'Activate your device webcam or use the Virtual Roleplay Studio if embedded in an iframe.'
                        : 'Pilih aktifkan kamera perangkat Anda atau gunakan Studio Roleplay Virtual bila berada di lingkungan iFrame.'}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <button
                      id="activate-camera-btn"
                      onClick={startCamera}
                      disabled={isStartingCamera}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 cursor-pointer transition active:scale-[0.98] flex items-center space-x-2"
                    >
                      {isStartingCamera ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>{language === 'en' ? 'Connecting Camera...' : 'Menghubungkan Kamera...'}</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-3.5 h-3.5" />
                          <span>{language === 'en' ? 'Activate Device Camera' : 'Aktifkan Kamera Perangkat'}</span>
                        </>
                      )}
                    </button>

                    <button
                      id="activate-virtual-camera-btn"
                      onClick={startVirtualCamera}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-amber-300 border border-slate-800 font-medium text-xs flex items-center space-x-1.5 cursor-pointer transition shadow-xs"
                      title={language === 'en' ? 'Use simulation camera if webcam unavailable or permission restricted' : 'Gunakan kamera simulasi jika perangkat tidak memiliki webcam atau izin kamera dibatasi'}
                    >
                      <MonitorPlay className="w-3.5 h-3.5 text-amber-400" />
                      <span>{language === 'en' ? 'Virtual Studio (Simulation)' : 'Studio Virtual (Simulasi)'}</span>
                    </button>
                  </div>

                  {isInIframe && (
                    <div className="pt-2">
                      <a
                        href={typeof window !== 'undefined' ? window.location.href : '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:text-amber-300 underline font-medium"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>
                          {language === 'en'
                            ? 'Camera restricted in iframe? Click to open in new tab'
                            : 'Kamera terkendala di iframe? Klik untuk buka di tab baru'}
                        </span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Recording Overlay Indicator */}
              {isRecording && (
                <div className="absolute top-4 left-4 bg-rose-600/95 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-2 animate-pulse shadow-lg z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                  <span>{language === 'en' ? 'RECORDING IN PROGRESS' : 'SEDANG MEREKAM'} • {formatTimer(recordingTime)}</span>
                </div>
              )}

              {/* Curveball Spontaneous Interruption Alert */}
              {isRecording && activeCurveball && (
                <div className="absolute top-14 inset-x-3 sm:inset-x-6 z-30 bg-gradient-to-r from-amber-950/95 via-rose-950/95 to-slate-950/95 border-2 border-amber-400 rounded-xl p-3.5 shadow-2xl animate-pulse text-white">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-sm">
                      ⚡
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                          🚨 {language === 'en' ? 'SPONTANEOUS INTERRUPTION:' : 'INTERUPSI MENDADAK:'} {activeCurveball.category.toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-300 font-medium">
                          {language === 'en' ? 'Respond calmly and stay confident!' : 'Tanggapi spontan tanpa panik!'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-white mt-1 italic leading-snug">
                        “{activeCurveball.text}”
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Indikator level suara: terukur nyata dari mikrofon (Web Audio), bukan simulasi */}
              {isCameraActive && (
                <div className="absolute inset-x-3 bottom-3 z-20 pointer-events-none">
                  <div className="bg-slate-950/85 backdrop-blur-md border border-slate-700/90 rounded-xl px-3 py-2 shadow-2xl text-white">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Mic className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-slate-400 shrink-0">{language === 'en' ? 'Mic level:' : 'Level suara:'}</span>
                        <div className="flex-1 h-2 min-w-[60px] bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                          <div
                            id="mic-level-bar"
                            className={`h-full rounded-full transition-all duration-100 ${silentWarning ? 'bg-rose-500' : 'bg-emerald-400'}`}
                            style={{ width: `${Math.min(100, Math.round(audioLevel * 400))}%` }}
                          />
                        </div>
                      </div>
                      <span id="mic-level-status" className={`font-mono text-[11px] shrink-0 ${silentWarning ? 'text-rose-300' : 'text-emerald-300'}`}>
                        {silentWarning
                          ? (language === 'en' ? 'No sound detected' : 'Suara belum terdeteksi')
                          : (language === 'en' ? 'Sound detected' : 'Suara terdeteksi')}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div id="rubric-reference" className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] space-y-1.5">
              <div className="font-semibold text-slate-300">
                {language === 'en' ? 'Rubric parameters that will be assessed (reference):' : 'Parameter rubrik yang akan dinilai (acuan):'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {scenario.parameters.map((p) => (
                  <span key={p.id} className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                    {p.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Diagnostic Box for Camera Permission or Device Issues */}
            {cameraDiagnosis && (
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 text-xs text-slate-300 space-y-3 shadow-lg">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-400 shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-amber-300 text-sm">{cameraDiagnosis.title}</h5>
                    <p className="text-slate-300 leading-relaxed">{cameraDiagnosis.description}</p>
                    <p className="text-amber-200/90 font-medium mt-1">
                      💡 <strong>{language === 'en' ? 'Recommended Action:' : 'Saran Tindakan:'}</strong> {cameraDiagnosis.recommendedAction}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
                  <button
                    id="recovery-start-virtual-camera-btn"
                    onClick={startVirtualCamera}
                    className="px-4 py-3 min-h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center space-x-2 shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer transition"
                  >
                    <MonitorPlay className="w-4 h-4 text-slate-950" />
                    <span>{language === 'en' ? '▶ Continue with Virtual Studio (Instant 1-Click)' : '▶ Lanjutkan dengan Studio Virtual (Instan 1-Klik)'}</span>
                  </button>

                  <a
                    href={typeof window !== 'undefined' ? window.location.href : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-3 min-h-12 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center space-x-1.5 shadow-xs transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    <span>{language === 'en' ? 'Open in New Tab' : 'Buka di Tab Baru'}</span>
                  </a>

                  <button
                    onClick={() => setActiveTab('upload')}
                    className="px-3.5 py-3 min-h-12 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-700 font-semibold text-xs flex items-center space-x-1.5 cursor-pointer transition"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-400" />
                    <span>{language === 'en' ? 'Upload Video File' : 'Unggah Berkas Video'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('sample')}
                    className="px-3.5 py-3 min-h-12 rounded-xl bg-slate-900 hover:bg-slate-850 text-emerald-400 border border-slate-700 font-semibold text-xs flex items-center space-x-1.5 cursor-pointer transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Benchmark Clips' : 'Klip Benchmark'}</span>
                  </button>
                </div>
              </div>
            )}

            {cameraError && !cameraDiagnosis && (
              <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{cameraError}</span>
              </div>
            )}

            {/* Recording Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {isCameraActive && !isRecording && (
                <button
                  id="start-recording-btn"
                  onClick={startRecording}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 flex items-center space-x-2 cursor-pointer transition active:scale-[0.98]"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white" />
                  <span>{language === 'en' ? 'Start Recording Response' : 'Mulai Rekam Respon'}</span>
                </button>
              )}

              {isRecording && (
                <button
                  id="stop-recording-btn"
                  onClick={stopRecording}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 shadow-md flex items-center space-x-2 cursor-pointer transition active:scale-[0.98]"
                >
                  <Square className="w-3.5 h-3.5 fill-current text-rose-400" />
                  <span>{language === 'en' ? 'Stop & Save' : 'Selesai & Simpan'} ({formatTimer(recordingTime)})</span>
                </button>
              )}

              {videoPreviewUrl && !isRecording && (
                <button
                  onClick={() => {
                    setVideoPreviewUrl(null);
                    setVideoBase64(null);
                    setRecordedBlob(null);
                    startCamera();
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium text-xs flex items-center space-x-1.5 cursor-pointer shadow-xs transition"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'en' ? 'Retake Video' : 'Rekam Ulang'}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Upload Video File */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-amber-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-slate-950/50"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-md">
                <FileVideo className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">
                {language === 'en' ? 'Select video file or drag and drop here' : 'Pilih berkas video atau seret ke sini'}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'en'
                  ? 'Supported formats: MP4, WebM, MOV (~15-60s customer service roleplay response)'
                  : 'Format didukung: MP4, WebM, MOV (~15-60 detik respon roleplay pelayanan)'}
              </p>
            </div>

            {cameraError && (
              <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{cameraError}</span>
              </div>
            )}

            {videoPreviewUrl && (
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {language === 'en' ? 'Video file ready for multimodal evaluation' : 'Berkas video siap dievaluasi secara multimodal'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Format: {videoMimeType} {recordedBlob ? `• ${(recordedBlob.size / (1024 * 1024)).toFixed(2)} MB` : ''}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition cursor-pointer"
                >
                  {language === 'en' ? 'Change File' : 'Ganti Berkas'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Scripted Text Test Cases */}
        {activeTab === 'sample' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-white">
                {language === 'en' ? 'Scripted Text Test Cases: ' : 'Kasus Uji Berskrip (teks): '}
              </span>
              {language === 'en'
                ? 'Select one of the cases below to test the application of the all-parameters-must-pass rule on scripted observations.'
                : 'Pilih salah satu kasus di bawah untuk menguji penerapan aturan seluruh parameter wajib lulus pada observasi berskrip.'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Compliant Demonstration */}
              <div
                onClick={() => handleSelectSampleClip('pass')}
                className={`p-4.5 rounded-2xl border cursor-pointer transition-all ${
                  videoPreviewUrl && !isFailureTestMode
                    ? 'bg-emerald-950/50 border-emerald-500 ring-1 ring-emerald-500'
                    : 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/70 shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {language === 'en' ? 'Case A: All Parameters Pass (Scripted Text)' : 'Kasus A: Lolos Seluruh Parameter (Teks Berskrip)'}
                  </span>
                  {videoPreviewUrl && !isFailureTestMode && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-white">
                  {language === 'en' ? 'Full SOP Compliance' : 'Kepatuhan Penuh SOP'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-snug">
                  {language === 'en'
                    ? 'Demonstrates all 3 parameters meeting or exceeding the 70-point threshold with timestamp evidence.'
                    : 'Mendemonstrasikan ketiga parameter mencapai atau melampaui batas nilai 70 poin dengan bukti stempel waktu.'}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-850 text-xs text-emerald-400 font-semibold">
                  {language === 'en'
                    ? 'Expectation: PASS (All 3 Parameters Pass → Open Badges v3.0 Issued)'
                    : 'Ekspektasi: LOLOS (Ketiga Parameter Lolos → Open Badges v3.0 Diterbitkan)'}
                </div>
              </div>

              {/* Option 2: Failed Parameter Demonstration */}
              <div
                onClick={() => handleSelectSampleClip('needs_review')}
                className={`p-4.5 rounded-2xl border cursor-pointer transition-all ${
                  videoPreviewUrl && isFailureTestMode
                    ? 'bg-amber-950/50 border-amber-500 ring-1 ring-amber-500'
                    : 'bg-slate-950/80 border-slate-800 hover:border-amber-500/70 shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    {language === 'en' ? 'Case B: 1 Flawed Parameter (Scripted Text)' : 'Kasus B: Ada 1 Parameter Cacat (Teks Berskrip)'}
                  </span>
                  {videoPreviewUrl && isFailureTestMode && (
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-white">
                  {language === 'en' ? '1 Missed Parameter (Strict Business Rule)' : '1 Parameter Kurang (Aturan Bisnis Tegas)'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-snug">
                  {language === 'en'
                    ? 'Missed 1 critical parameter (e.g. forgotten greeting or incorrect ratio) even though 2 other parameters scored high.'
                    : 'Melewatkan 1 parameter kritis (misal sapaan terlupakan atau takaran keliru) kendati 2 parameter lainnya mendapat nilai tinggi.'}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-850 text-xs text-amber-400 font-semibold">
                  {language === 'en'
                    ? 'Expectation: NEEDS REVIEW (Not an average! Triggers 60-second micro-remediation drill)'
                    : 'Ekspektasi: PERLU REVIEW (Bukan rata-rata! Memicu latihan mikro-remediasi 60 detik)'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Proceed Button */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            {videoPreviewUrl ? (
              <span className="text-emerald-400 font-medium flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  {language === 'en'
                    ? 'Video ready for Gemini Multimodal AI evaluation'
                    : 'Video siap dievaluasi oleh Gemini Multimodal AI'}
                </span>
              </span>
            ) : (
              <span>
                {language === 'en'
                  ? 'Please record a video, upload a file, or select a scripted text test case.'
                  : 'Silakan rekam video, unggah berkas, atau pilih kasus uji berskrip (teks).'}
              </span>
            )}
          </div>

          <button
            id="proceed-to-ai-analysis-btn"
            onClick={handleProceed}
            disabled={!videoPreviewUrl}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>{language === 'en' ? 'Run Gemini Multimodal Evaluation' : 'Jalankan Evaluasi Multimodal Gemini'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      )}
    </div>
  );
};
