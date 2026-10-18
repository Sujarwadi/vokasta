import React, { useState, useEffect } from 'react';
import {
  Zap,
  X,
  Play,
  Pause,
  Award,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Volume2,
  UserCheck,
  Clock,
  Coffee,
  MessageSquare,
  FileCheck,
  Loader2,
} from 'lucide-react';
import { neuralAudio } from '../utils/neuralAudioPlayer';
import { useLanguage } from '../i18n/LanguageContext';

interface StagePitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchFullSimulation?: (scenarioId: string) => void;
}

export const StagePitchModal: React.FC<StagePitchModalProps> = ({
  isOpen,
  onClose,
  onLaunchFullSimulation,
}) => {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [loadingAudioId, setLoadingAudioId] = useState<string | null>(null);

  const goldenCandidateText =
    'Sampurasun Teh Sarah! Hapunten pisan, tadi kami periksa pesanan teh ada intoleransi laktosa. Khusus pesanan Teh Sarah, langsung abdi racik menggunakan Oat Milk segar tanpa biaya tambahan ya Teh.';

  const goldenCustomerText =
    'Rampes Kang! Alhamdulillah nuhun pisan tos perhatian pisan ka alergi abdi. Boleh atuh Kang, abdi cobian oat milk-na sakalian Warm Croissant hiji nya.';

  // Preload golden demo audio tracks as soon as modal opens for 0ms lag-free stage pitch
  useEffect(() => {
    if (isOpen) {
      neuralAudio.preload([
        {
          text: goldenCandidateText,
          voiceName: 'Puck',
          isFemale: false,
          dialect: 'sunda',
          stylePrompt: 'Bicara ramah, santun dalam logat Sunda halus bertanggung jawab Kang melayani Teh Sarah',
          prosody: { pitch: '+1Hz', rate: '+1%' },
        },
        {
          text: goldenCustomerText,
          voiceName: 'Zephyr',
          isFemale: true,
          dialect: 'sunda',
          stylePrompt: 'Bicara ramah, ekspresif, senang dan lega dalam logat Sunda santun Teh Sarah menjawab Kang',
          prosody: { pitch: '+3Hz', rate: '+3%' },
        },
      ]);
    }

    return () => {
      neuralAudio.stop();
      setPlayingAudioId(null);
      setLoadingAudioId(null);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePlayNeuralAudio = (target: 'candidate' | 'customer') => {
    if (playingAudioId === target) {
      neuralAudio.stop();
      setPlayingAudioId(null);
      setLoadingAudioId(null);
      return;
    }

    setLoadingAudioId(target);

    if (target === 'candidate') {
      neuralAudio.play(
        'candidate',
        {
          text: goldenCandidateText,
          voiceName: 'Puck',
          isFemale: false,
          dialect: 'sunda',
          stylePrompt: 'Bicara ramah, santun dalam logat Sunda halus bertanggung jawab Kang melayani Teh Sarah',
          prosody: { pitch: '+1Hz', rate: '+1%' },
        },
        () => {
          setLoadingAudioId(null);
          setPlayingAudioId('candidate');
        },
        () => {
          setLoadingAudioId(null);
          setPlayingAudioId(null);
        }
      );
    } else {
      neuralAudio.play(
        'customer',
        {
          text: goldenCustomerText,
          voiceName: 'Zephyr',
          isFemale: true,
          dialect: 'sunda',
          stylePrompt: 'Bicara ramah, ekspresif, senang dan lega dalam logat Sunda santun Teh Sarah menjawab Kang',
          prosody: { pitch: '+3Hz', rate: '+3%' },
        },
        () => {
          setLoadingAudioId(null);
          setPlayingAudioId('customer');
        },
        () => {
          setLoadingAudioId(null);
          setPlayingAudioId(null);
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl w-full max-w-4xl my-8 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                {language === 'en' ? 'Stage Presentation Mode (60-Sec Demo)' : 'Mode Presentasi Panggung (60-Detik Demo)'}
              </span>
              <span className="text-xs text-slate-400">
                • {language === 'en' ? 'Studio Natural Neural Voices' : 'Suara Neural Alami Studio'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {language === 'en'
                ? 'Golden Path: 0-Latency Stage Demonstration Flow'
                : 'Golden Path: Alur Demo Tercepat Tanpa Hambatan'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              {language === 'en'
                ? 'Instant demo track engineered to impress competition judges and executive auditors under 60 seconds with hyper-natural Indonesian dialect voice interaction.'
                : 'Alur demonstrasi instan yang dirancang untuk memukau juri dan audiens dalam waktu kurang dari 60 detik dengan suara vokal neural Indonesia yang hidup.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presenter Pitching Cheatsheet Bar */}
        <div className="bg-amber-950/30 border-b border-amber-800/40 px-6 py-2.5 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">
              {language === 'en' ? '🎙️ Simulated Pitch Script:' : '🎙️ Naskah Pitching (Simulasi):'}
            </span>
            <span className="hidden sm:inline italic">
              {language === 'en'
                ? '"Frontline F&B turnover estimated at 35%-55% (asumsi internal, belum diverifikasi). Vokasta models reducing onboarding from 14 days to 3 days, with an estimated $2,100/store/year savings (illustrative projection)."'
                : '"Estimasi turnover F&B 35%-55% (asumsi internal, belum diverifikasi). Vokasta memodelkan pengurangan onboarding 14 hari jadi 3 hari, dengan proyeksi penghematan Rp 33 Juta/gerai/tahun (proyeksi ilustratif)."'}
            </span>
          </div>
          <div className="font-mono text-xs font-bold text-amber-300">
            {language === 'en' ? 'Target: 45 Sec' : 'Target: 45 Detik'}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 flex-1">
          {/* Step 1: Scenario Overview */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {language === 'en' ? '1. Benchmark Scenario & Dialect:' : '1. Skenario Uji & Dialek Terpilih:'}
              </span>
              <span className="text-xs font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-800/60">
                {language === 'en' ? 'Sundanese Dialect (West Java)' : 'Dialek Sunda (Jawa Barat)'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {language === 'en'
                    ? 'Specialty Barista: Custom Order & Lactose Sensitivity Inquiries'
                    : 'Barista Kopi Nusantara: Pesanan Khusus & Alergi Susu Sapi'}
                </h4>
                <p className="text-xs text-slate-400">
                  {language === 'en'
                    ? 'Candidate (Male: Kang) serves customer (Ms. Sarah: Teh) who has lactose sensitivity.'
                    : 'Kandidat (Pria: Kang) melayani pelanggan wanita (Mbak Sarah: Teh) yang memiliki intoleransi laktosa.'}
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 & 3: Audio Dialogue Simulation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Candidate Box */}
            <div className="bg-slate-950/80 border border-cyan-800/60 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  {language === 'en' ? 'Trainee Spoken Voice (Polite Dialect):' : 'Ucapan Siswa (Bahasa Daerah Santun):'}
                </span>
                <button
                  onClick={() => handlePlayNeuralAudio('candidate')}
                  disabled={loadingAudioId === 'candidate'}
                  className="px-2.5 py-1 rounded-lg bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-60"
                >
                  {loadingAudioId === 'candidate' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-300" />
                      <span>{language === 'en' ? 'Synthesizing...' : 'Sintesis...'}</span>
                    </>
                  ) : playingAudioId === 'candidate' ? (
                    <>
                      <Pause className="w-3.5 h-3.5 animate-pulse text-cyan-300" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
                      <span>{language === 'en' ? 'Trainee Neural Voice' : 'Suara Neural Siswa'}</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs italic text-cyan-100 font-mono bg-cyan-950/40 p-3 rounded-lg border border-cyan-900/40">
                "{goldenCandidateText}"
                {language === 'en' && (
                  <span className="block mt-1.5 text-[11px] text-cyan-300/90 font-sans not-italic">
                    <strong>Translation:</strong> "Greetings Ms. Sarah! Pardon us, we noticed your order mentions lactose intolerance. For your drink, I will personally handcraft it with fresh Oat Milk at no extra charge, Ms."
                  </span>
                )}
              </p>
              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span className="text-emerald-400 font-semibold">
                  {language === 'en' ? '✓ Allergen SOP: Met' : '✓ SOP Alergi: Dipenuhi'}
                </span>
                <span className="text-amber-400 font-semibold">
                  {language === 'en' ? '✓ Sundanese Courtesy: Kang ➡️ Teh' : '✓ Etika Sunda: Kang ➡️ Teh'}
                </span>
                <span className="text-cyan-400 font-semibold text-[10px] bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800">Neural Studio</span>
              </div>
            </div>

            {/* AI Customer Box */}
            <div className="bg-slate-950/80 border border-emerald-800/60 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {language === 'en' ? 'AI Customer Response (Natural & Consistent):' : 'Balasan Pelanggan AI (Ekspresif & Konsisten):'}
                </span>
                <button
                  onClick={() => handlePlayNeuralAudio('customer')}
                  disabled={loadingAudioId === 'customer'}
                  className="px-2.5 py-1 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-60"
                >
                  {loadingAudioId === 'customer' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-300" />
                      <span>{language === 'en' ? 'Synthesizing...' : 'Sintesis...'}</span>
                    </>
                  ) : playingAudioId === 'customer' ? (
                    <>
                      <Pause className="w-3.5 h-3.5 animate-pulse text-emerald-300" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{language === 'en' ? 'AI Customer Voice' : 'Suara Neural AI'}</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs italic text-emerald-100 font-mono bg-emerald-950/40 p-3 rounded-lg border border-emerald-900/40">
                "{goldenCustomerText}"
                {language === 'en' && (
                  <span className="block mt-1.5 text-[11px] text-emerald-300/90 font-sans not-italic">
                    <strong>Translation:</strong> "Greetings! Thank you so much for being attentive to my allergy. Yes please, I would love to try the oat milk along with one Warm Croissant."
                  </span>
                )}
              </p>
              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span className="text-emerald-400 font-semibold">
                  {language === 'en' ? '✓ Sentiment: Highly Satisfied' : '✓ Sentimen: Sangat Puas'}
                </span>
                <span className="text-emerald-400 font-semibold">
                  {language === 'en' ? '✓ Salutation: Consistent Kang' : '✓ Panggilan: Konsisten Kang'}
                </span>
                <span className="text-emerald-400 font-semibold text-[10px] bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">Neural Studio</span>
              </div>
            </div>
          </div>

          {/* Step 4: Instant Evaluation & Verifiable Credential */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                {language === 'en' ? 'Automated Rubric Evaluation (Instant Output):' : 'Keluaran Penilaian Otomatis (Instant Output):'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                {language === 'en' ? 'Score: 94 / 100 (Competent Pass - Sample)' : 'Skor: 94 / 100 (Lulus Kompeten - Data Contoh)'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-slate-400">
                  {language === 'en' ? 'Greeting & Welcoming Warmth:' : 'Kontak Awal & Keramahan:'}
                </div>
                <div className="font-black text-emerald-400 text-sm">96 / 100</div>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-slate-400">
                  {language === 'en' ? 'Oat Milk Alternative Screening:' : 'Pemberitahuan Opsi Oat Milk:'}
                </div>
                <div className="font-black text-emerald-400 text-sm">98 / 100</div>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-slate-400">
                  {language === 'en' ? 'W3C Sovereign Passport:' : 'Paspor Kredensial W3C:'}
                </div>
                <div className="font-mono text-cyan-400 text-[11px] truncate">SHA-256: 7f8a9...b4c2</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            🎯 <span className="text-slate-300 font-medium">{language === 'en' ? 'Stage Pitch Ready:' : 'Stage Pitch Ready:'}</span>{' '}
            {language === 'en'
              ? 'No active webcam required; zero lag demonstration flow with offline fallback audio.'
              : 'Tidak memerlukan webcam aktif dan terlindungi dari koneksi lambat saat demo.'}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition cursor-pointer"
            >
              {language === 'en' ? 'Close' : 'Tutup'}
            </button>
            {onLaunchFullSimulation && (
              <button
                onClick={() => {
                  onClose();
                  onLaunchFullSimulation('scen_jobseeker_hospitality_basic');
                }}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <span>{language === 'en' ? 'Open in Full Simulator' : 'Buka di Simulator Penuh'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
