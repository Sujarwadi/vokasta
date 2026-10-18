import React, { useEffect, useState } from 'react';
import { Sparkles, Cpu, ShieldCheck, CheckCircle2, Video, Volume2, Search, FileCheck } from 'lucide-react';
import { AssessmentSession } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { getLocalizedScenario } from '../i18n/scenarioTranslations';

interface Screen3ProcessingProps {
  session: AssessmentSession;
  onProcessingComplete: (result: any) => void;
  onBack?: () => void;
  videoPayload: {
    videoBase64: string;
    mimeType: string;
    simulateMode?: boolean;
    failureSimulation?: boolean;
    inputMode?: 'voice' | 'video';
    conversation?: Array<{ role: 'customer' | 'worker'; text: string }>;
    practiceLanguage?: 'id' | 'en';
  };
}

export const Screen3Processing: React.FC<Screen3ProcessingProps> = ({
  session,
  onProcessingComplete,
  onBack,
  videoPayload,
}) => {
  const { language } = useLanguage();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isVoiceMode = videoPayload.inputMode === 'voice';
  const processingSteps = [
    isVoiceMode
      ? {
          title: language === 'en' ? 'Conversation Transcript Ingestion' : 'Penerimaan Transkrip Percakapan',
          desc: language === 'en'
            ? 'Sending the two-way voice conversation transcript to Google Gemini for evaluation.'
            : 'Mengirim transkrip percakapan suara dua arah ke Google Gemini untuk dinilai.',
          icon: <Volume2 className="w-5 h-5 text-amber-400" />,
        }
      : {
          title: language === 'en' ? 'Multimodal Video & Audio Ingestion' : 'Penerimaan Video & Audio Multimodal',
          desc: language === 'en'
            ? 'Transmitting native unified audio-visual streams directly into Google Gemini multimodal models.'
            : 'Mentransmisikan aliran audio-visual terpadu secara langsung ke model multimodal Google Gemini.',
          icon: <Video className="w-5 h-5 text-amber-400" />,
        },
    isVoiceMode
      ? {
          title: language === 'en' ? 'Script Alignment & Turn Evidence' : 'Penyelarasan Naskah & Bukti per Giliran',
          desc: language === 'en'
            ? 'Matching spoken keyphrases to each rubric parameter and pinning evidence to conversation turns.'
            : 'Mencocokkan frasa kunci lisan ke tiap parameter rubrik dan menautkan bukti ke giliran percakapan.',
          icon: <Volume2 className="w-5 h-5 text-emerald-400" />,
        }
      : {
          title: language === 'en' ? 'Script Alignment & Timestamp Precision' : 'Penyelarasan Naskah & Stempel Waktu',
          desc: language === 'en'
            ? 'Detecting spoken keyphrases, conversation pacing, and pinning second-by-second timestamps.'
            : 'Mendeteksi frasa kunci lisan, tempo percakapan, dan mencocokkan stempel waktu detik demi detik secara presisi.',
          icon: <Volume2 className="w-5 h-5 text-emerald-400" />,
        },
    {
      title: language === 'en' ? 'Language Anti-Bias Algorithmic Audit' : 'Audit Algoritmik Anti-Bias Bahasa',
      desc: language === 'en'
        ? 'Designed to evaluate SOP intent across 10 Indonesian dialects without regional accent penalties (design capability).'
        : 'Dirancang mengevaluasi pemenuhan SOP di 10 dialek Nusantara tanpa penalti aksen kedaerahan (kapabilitas desain).',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: language === 'en' ? 'Dual-Layer Business Rule Scoring' : 'Aturan Bisnis & Pembagian Dua Lapis',
      desc: language === 'en'
        ? 'Validating parameters and separating Universal Competency (W3C/Open Badges) from Proprietary Brand SOP.'
        : 'Memvalidasi kelulusan tiap parameter rubrik dan memisahkan Kompetensi Universal (Open Badges) vs SOP Khas Merek.',
      icon: <FileCheck className="w-5 h-5 text-amber-400" />,
    },
  ];

  // Elapsed timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Animate steps and trigger backend call
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    // Call server API
    const runAssessment = async () => {
      try {
        const response = await fetch('/api/assess', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: session.id,
            video_base64: videoPayload.videoBase64,
            video_mime_type: videoPayload.mimeType,
            simulate_mode: videoPayload.simulateMode,
            failure_simulation: videoPayload.failureSimulation,
            input_mode: videoPayload.inputMode || 'video',
            conversation: videoPayload.conversation,
            practice_language: videoPayload.practiceLanguage === 'en' ? 'en' : 'id',
          }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || (language === 'en' ? 'Evaluation process failed' : 'Proses evaluasi gagal'));
        }

        const data = await response.json();

        setTimeout(() => {
          onProcessingComplete(data.result);
        }, 3000);
      } catch (err: any) {
        console.error('[Screen3] Assessment error:', err);
        setErrorMsg(err.message || (language === 'en' ? 'AI evaluation pipeline encountered technical issue' : 'Saluran evaluasi AI mengalami kendala teknis'));
      }
    };

    runAssessment();

    return () => {
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6 text-slate-100">
      {/* Central Processing Card */}
      <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

        {/* Animated AI Pulse Icon */}
        <div className="relative w-20 h-20 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping opacity-60" />
          <div className="relative w-20 h-20 rounded-full bg-slate-950 border-2 border-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Cpu className="w-10 h-10 text-amber-400 animate-pulse" />
          </div>
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/80 text-amber-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{language === 'en' ? 'Step 3 • Gemini AI Multimodal Evaluation Pipeline' : 'Langkah 3 • Pipa Evaluasi Multimodal Gemini AI'}</span>
        </div>

        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {language === 'en' ? 'Evaluating Frontline Roleplay Performance' : 'Mengevaluasi Kinerja Roleplay Pelayanan'}
        </h2>
        <p className="text-slate-300 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
          {language === 'en'
            ? <>Gemini Multimodal AI is auditing the audio-visual recording against objective competency rubrics for <strong className="text-white">{getLocalizedScenario(session.scenario, language).title}</strong>.</>
            : <>Gemini Multimodal AI sedang mengaudit rekaman audio-visual terhadap rubrik kompetensi objektif untuk <strong className="text-white">{getLocalizedScenario(session.scenario, language).title}</strong>.</>}
        </p>

        {/* Elapsed Timer Tag */}
        <div className="mt-4 inline-flex items-center space-x-2 text-xs text-amber-300 bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800 font-mono shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{language === 'en' ? `Multimodal Inference Running • 00:${elapsedSeconds.toString().padStart(2, '0')} sec` : `Inferensi Multimodal Berjalan • 00:${elapsedSeconds.toString().padStart(2, '0')} detik`}</span>
        </div>

        {/* Dynamic Pipeline Steps */}
        <div className="mt-8 space-y-3 text-left max-w-xl mx-auto">
          {processingSteps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all flex items-start space-x-3.5 ${
                  isCurrent
                    ? 'bg-amber-950/40 border-amber-500/80 shadow-lg shadow-amber-500/10'
                    : isCompleted
                    ? 'bg-slate-950/80 border-slate-800 text-slate-300'
                    : 'bg-slate-950/40 border-slate-855 opacity-40'
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0 mt-0.5 shadow-md">
                  {step.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-xs font-bold ${
                        isCurrent ? 'text-amber-300' : isCompleted ? 'text-white' : 'text-slate-500'
                      }`}
                    >
                      {step.title}
                    </h4>
                    {isCompleted && (
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Done' : 'Selesai'}</span>
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-[11px] font-semibold text-amber-400 flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        <span>{language === 'en' ? 'Processing' : 'Memproses'}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {errorMsg && (
          <div className="mt-6 p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs space-y-3">
            <p className="font-medium">{errorMsg}</p>
            {onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition cursor-pointer shadow-md"
              >
                {language === 'en' ? '← Return to Recording & Try Again' : '← Kembali ke Perekaman & Coba Lagi'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Responsible AI Audit Note */}
      <div className="bg-slate-900/60 border border-slate-800 text-xs text-slate-400 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{language === 'en' ? 'Responsible AI Design: Frontline evaluation designed with support for 10 Indonesian dialect profiles (design capability, not validated).' : 'Prinsip Desain Responsible AI: Evaluasi dirancang dengan dukungan 10 profil dialek Nusantara berbasis bukti faktual SOP (kapabilitas desain, belum divalidasi).'}</span>
        </div>
        <span className="font-mono text-amber-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 shadow-xs">
          @google/genai • Gemini Multimodal Live & Flash
        </span>
      </div>
    </div>
  );
};
