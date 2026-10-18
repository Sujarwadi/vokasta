import React, { useState, useRef } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Clock,
  Award,
  Lock,
  Share2,
  ShieldCheck,
  User,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileBadge,
  Sparkles,
  Check,
  Copy,
  Bot,
  Cpu,
  Send,
  ThumbsUp,
  Loader2,
  PlayCircle,
  MessageSquare,
  Zap,
  Download,
  FileJson,
  Scale,
  Terminal,
  X,
  Volume2,
  Eye,
  FileDown,
  QrCode,
  Radio,
  CheckCheck,
} from 'lucide-react';
import { CredentialVerificationModal } from './CredentialVerificationModal';
import { AssessmentResult, ParameterScore, DialectInvarianceReport } from '../types';
import { generateCompetencyCertificatePDF } from '../utils/certificatePdf';
import { StorageSync } from '../utils/storageSync';
import { SCENARIOS } from '../data/scenarios';
import { useLanguage } from '../i18n/LanguageContext';
import { SCENARIO_TRANSLATIONS_EN } from '../i18n/scenarioTranslations';

const ENABLE_DIALECT_LAB = false;

interface Screen4ResultsProps {
  result: AssessmentResult;
  videoUrl?: string;
  onStartNewAssessment: () => void;
  onProceedToNextScenario?: (scenarioId: string) => void;
  onOpenCompetencyDelta?: () => void;
}

export const Screen4Results: React.FC<Screen4ResultsProps> = ({
  result: initialResult,
  videoUrl,
  onStartNewAssessment,
  onProceedToNextScenario,
  onOpenCompetencyDelta,
}) => {
  const { language, t } = useLanguage();
  const [currentResult, setCurrentResult] = useState<AssessmentResult>(initialResult);
  const isCadangan = (currentResult.gemini_execution_metadata?.model_used || '').toLowerCase().includes('cadangan');
  const isPassed = currentResult.final_status === 'passed';
  const [copiedHash, setCopiedHash] = useState(false);
  const [showBadgeDetails, setShowBadgeDetails] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [holderNameInput, setHolderNameInput] = useState('');
  const holderName = holderNameInput.trim().slice(0, 60) || 'Peserta Simulasi';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const displayScenarioTitle = language === 'en'
    ? (SCENARIO_TRANSLATIONS_EN[currentResult.scenario_id]?.title || currentResult.scenario_title)
    : currentResult.scenario_title;

  const getLocalizedParamName = (paramId: string, fallbackName: string) => {
    if (language !== 'en') return fallbackName;
    const enMatch = SCENARIO_TRANSLATIONS_EN[currentResult.scenario_id]?.parameters?.find(
      (p) => p.id === paramId
    );
    return enMatch?.name || fallbackName;
  };

  // Durable Local-First Synchronization
  React.useEffect(() => {
    StorageSync.saveResult(currentResult);
  }, [currentResult]);

  // Enterprise HRIS Webhook Dispatch State
  const [isDispatchingHRIS, setIsDispatchingHRIS] = useState(false);
  const [selectedHRISSystem, setSelectedHRISSystem] = useState<'Mekari Talenta' | 'SAP SuccessFactors' | 'Workday HCM'>('Mekari Talenta');
  const [hrisDispatchNotice, setHrisDispatchNotice] = useState<{
    success: boolean;
    signature: string;
    system: string;
    timestamp: string;
    ackId: string;
  } | null>(
    currentResult.hris_dispatch_status
      ? {
          success: true,
          signature: currentResult.hris_dispatch_status.signature_digest,
          system: currentResult.hris_dispatch_status.system,
          timestamp: currentResult.hris_dispatch_status.timestamp,
          ackId: 'ack_init_synced',
        }
      : null
  );

  // Synchronized Video Player State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSeekNotice, setVideoSeekNotice] = useState<string | null>(null);
  const [isVideoExpanded, setIsVideoExpanded] = useState(true);
  const [highlightTurns, setHighlightTurns] = useState<number[]>([]);
  const isVoiceResult =
    currentResult.input_mode === 'voice' && (currentResult.conversation_transcript?.length || 0) > 0;

  // Gemini Raw Prompt / Token Inspector State
  const [isPromptInspectorOpen, setIsPromptInspectorOpen] = useState(false);
  const [inspectorTab, setInspectorTab] = useState<'overview' | 'prompt' | 'schema' | 'raw_json'>('overview');
  const [copiedRawJson, setCopiedRawJson] = useState(false);

  // Dialect Invariance Auditor State
  const [isDialectLabOpen, setIsDialectLabOpen] = useState(false);
  const [isLoadingDialect, setIsLoadingDialect] = useState(false);
  const [dialectReport, setDialectReport] = useState<DialectInvarianceReport | null>(null);

  // Human Contestability Appeal State (HITL / EU AI Act)
  const [appealModalParam, setAppealModalParam] = useState<ParameterScore | null>(null);
  const [appealGround, setAppealGround] = useState('ambient_noise');
  const [appealReasonText, setAppealReasonText] = useState('');
  const [isSubmittingAppeal, setIsSubmittingAppeal] = useState(false);
  const [appealSuccessTicket, setAppealSuccessTicket] = useState<string | null>(null);

  // Active Remediation Drill State
  const [activeDrillParam, setActiveDrillParam] = useState<ParameterScore | null>(null);
  const [drillInput, setDrillInput] = useState('');
  const [isSubmittingDrill, setIsSubmittingDrill] = useState(false);
  const [drillSituation, setDrillSituation] = useState('');
  const [drillError, setDrillError] = useState<string | null>(null);
  const [drillFeedback, setDrillFeedback] = useState<{
    improved_score: number;
    passed: boolean;
    coach_feedback: string;
    strengths: string[];
    areas_to_polish: string[];
    met?: string[];
    missing?: string[];
    better_version?: string;
    simple_check?: boolean;
  } | null>(null);

  const effectiveVideoUrl =
    videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  const handleSeekVideo = (timestampStr: string, paramName: string) => {
    if (isVoiceResult) {
      // Mode suara: bukti ditautkan ke giliran percakapan, bukan ke detik video
      const nums = (timestampStr.match(/\d+/g) || []).map((n) => parseInt(n, 10)).filter((n) => n > 0);
      if (nums.length === 0) return;
      const from = nums[0];
      const to = nums.length > 1 ? Math.max(from, nums[1]) : from;
      const range: number[] = [];
      for (let i = from; i <= Math.min(to, from + 12); i++) range.push(i);
      setHighlightTurns(range);
      setIsVideoExpanded(true);
      setTimeout(() => {
        const el = document.getElementById(`turn-worker-${from}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      setVideoSeekNotice(
        language === 'en'
          ? `Showing turn ${from} as evidence for "${paramName}"`
          : `Menampilkan giliran ${from} sebagai bukti untuk "${paramName}"`
      );
      setTimeout(() => setVideoSeekNotice(null), 4000);
      return;
    }
    if (!videoRef.current) return;
    const match = timestampStr.match(/(\d+):(\d+)/);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const targetSec = minutes * 60 + seconds;
      videoRef.current.currentTime = Math.max(0, targetSec);
      videoRef.current.play().catch(() => {});
      setVideoSeekNotice(`Seeking video player to ${timestampStr} — Evidence for "${paramName}"`);
      setTimeout(() => setVideoSeekNotice(null), 4000);
    }
  };

  const copyCredentialHash = () => {
    if (currentResult.open_badges_metadata?.verification_hash) {
      navigator.clipboard.writeText(currentResult.open_badges_metadata.verification_hash);
      setCopiedHash(true);
      showToast(language === 'en' ? '✓ Credential hash copied to clipboard!' : '✓ Hash kredensial berhasil disalin!');
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  const handleDownloadCertificatePDF = () => {
    if ((currentResult.gemini_execution_metadata?.model_used || '').toLowerCase().includes('cadangan')) {
      showToast(language === 'en' ? 'PDF Certificate is disabled for backup results.' : 'Penerbitan Sertifikat PDF dinonaktifkan untuk hasil cadangan.');
      return;
    }
    try {
      generateCompetencyCertificatePDF(currentResult, holderName);
      showToast(language === 'en' ? '✓ PDF Certificate successfully generated!' : '✓ Sertifikat PDF berhasil diunduh!');
    } catch (err) {
      console.error('Error generating competency certificate PDF:', err);
    }
  };

  // 99/100 Direct WhatsApp Portfolio Dispatch to Recruiter / Store Owner
  const handleShareToRecruiterWhatsApp = () => {
    showToast(language === 'en' ? '✓ WhatsApp portfolio link prepared!' : '✓ Tautan portofolio WhatsApp siap dikirim!');
    const candidateName = holderName;
    const score = currentResult.overall_score;
    const status = isPassed
      ? (language === 'en' ? 'COMPETENT (PASSED SOP AUDIT)' : 'KOMPETEN (LULUS AUDIT SOP)')
      : (language === 'en' ? 'IN REFRESHER TRAINING' : 'DALAM PEMBINAAN');
    const scenarioTitle = displayScenarioTitle.toUpperCase();
    const hash = currentResult.open_badges_metadata?.verification_hash || '0x7f9a2b4c1e8d';
    const verifyUrl =
      typeof window !== 'undefined'
        ? window.location.href.split('?')[0] + `?verify=${encodeURIComponent(hash)}`
        : 'https://vokasta.id/verify';

    const text = language === 'en'
      ? `*FRONTLINE EMPLOYABILITY COMPETENCY DOSSIER (Vokasta)*
Hello Hiring Manager / Store Owner,
My name is *${candidateName}*. I have completed the frontline SOP roleplay simulation with the following results:

• *SOP Assessment Score:* ${score}/100 (${status})
• *Scenario Module:* ${scenarioTitle}
• *Regional Dialect Support:* Designed for 10 Indonesian dialects without penalty (Responsible AI Design)
• *Credential ID:* ${hash}

Sample Verification Link:
${verifyUrl}

My PDF summary and practice details are available upon request. I look forward to contributing to your store team. Thank you!`
      : `*PORTOFOLIO KOMPETENSI KERJA FRONTLINER (Vokasta)*
Halo Bapak/Ibu HRD / Pemilik Gerai,
Perkenalkan saya *${candidateName}*. Saya telah menyelesaikan simulasi kerja SOP dan uji interaksi pelanggan dengan hasil:

• *Skor Evaluasi SOP:* ${score}/100 (${status})
• *Skenario:* ${scenarioTitle}
• *Dukungan Dialek Daerah:* Desain tanpa penalti 10 dialek Nusantara (Responsible AI)
• *ID Kredensial W3C:* ${hash}

Tautan Format Kredensial W3C (Data Contoh):
${verifyUrl}

Dokumen sertifikat PDF dan portofolio video siap dilampirkan. Besar harapan saya dapat bergabung dengan tim Anda. Terima kasih!`;

    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  const handleDownloadW3CBadge = async () => {
    try {
      const res = await fetch(`/api/badges/${currentResult.session_id}/w3c`);
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vokasta-w3c-open-badge-${currentResult.session_id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Error downloading W3C badge:', err);
    }
  };

  const handleTriggerHRISDispatch = async (systemOverride?: string) => {
    const targetSystem = systemOverride || selectedHRISSystem;
    setIsDispatchingHRIS(true);
    try {
      const res = await fetch('/api/hris/webhook/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          result_id: currentResult.id,
          candidate_name: `${holderName} (Frontline Certified)`,
          system_name: targetSystem,
          webhook_url: `https://api.${targetSystem.toLowerCase().replace(/\s+/g, '')}.com/v2/credentials/inbound`,
          secret_key: 'vokasta_live_secret_key',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setHrisDispatchNotice({
          success: true,
          signature: data.signature_digest,
          system: targetSystem,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          ackId: data.response_body?.acknowledgement_id || 'ack_live_200',
        });
      }
    } catch (e) {
      console.error('Error dispatching to HRIS:', e);
    } finally {
      setIsDispatchingHRIS(false);
    }
  };

  const handleRunDialectAudit = async () => {
    setIsDialectLabOpen(true);
    if (dialectReport) return;
    setIsLoadingDialect(true);
    try {
      const res = await fetch('/api/fairness/dialect-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario_id: currentResult.scenario_id }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success === true && Array.isArray(data.results)) {
          setDialectReport(data);
        } else {
          setDialectReport(null);
        }
      } else {
        setDialectReport(null);
      }
    } catch (e) {
      console.error('Error running dialect audit:', e);
      setDialectReport(null);
    } finally {
      setIsLoadingDialect(false);
    }
  };

  const handleSubmitAppeal = async () => {
    if (!appealModalParam || !appealReasonText.trim()) return;
    setIsSubmittingAppeal(true);
    try {
      const groundLabel =
        appealGround === 'ambient_noise'
          ? 'Ambient store/equipment noise obscured speech'
          : appealGround === 'camera_angle'
          ? 'Physical task execution occurred partially off-camera'
          : appealGround === 'custom_request'
          ? 'Handled non-standard guest customization protocol'
          : 'Other frontline context';

      const fullReason = `[Grounds: ${groundLabel}] ${appealReasonText.trim()}`;

      const res = await fetch('/api/appeal/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: currentResult.session_id,
          parameter_id: appealModalParam.parameter_id,
          candidate_reason: fullReason,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAppealSuccessTicket(data.appeal.id);
        setCurrentResult((prev) => ({
          ...prev,
          appeals: [...(prev.appeals || []), data.appeal],
        }));
      }
    } catch (err) {
      console.error('Error submitting appeal:', err);
    } finally {
      setIsSubmittingAppeal(false);
    }
  };

  // Situasi latihan diambil dari ucapan pelanggan yang sebenarnya muncul sebelum jawaban peserta pada giliran terkait
  const drillSituationFor = (param: ParameterScore): string => {
    const conv = currentResult.conversation_transcript || [];
    if (conv.length === 0) return '';
    const n = parseInt(((param.timestamp || '').match(/\d+/) || ['1'])[0], 10) || 1;
    let count = 0;
    for (let i = 0; i < conv.length; i++) {
      if (conv[i].role !== 'worker') continue;
      count += 1;
      if (count === n) {
        for (let j = i - 1; j >= 0; j--) if (conv[j].role === 'customer') return conv[j].text;
        break;
      }
    }
    return conv.find((t) => t.role === 'customer')?.text || '';
  };

  const openDrillForParam = (param: ParameterScore) => {
    setActiveDrillParam(param);
    setDrillFeedback(null);
    setDrillInput('');
    setDrillError(null);
    setDrillSituation(drillSituationFor(param));
    // Panel latihan berada di bawah daftar parameter, jadi layar digulir ke sana
    setTimeout(() => {
      document.getElementById('drill-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('drill-input')?.focus({ preventScroll: true });
    }, 80);
  };

  const handleExecuteDrill = async () => {
    if (!activeDrillParam || !drillInput.trim()) return;
    setIsSubmittingDrill(true);
    setDrillError(null);
    try {
      const res = await fetch('/api/coach/drill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: currentResult.session_id,
          parameter_id: activeDrillParam.parameter_id,
          practice_input: drillInput,
          situation: drillSituation,
          practice_language: currentResult.practice_language === 'en' ? 'en' : 'id',
        }),
      });
      if (!res.ok) throw new Error('Drill evaluation failed');
      setDrillFeedback(await res.json());
    } catch (err) {
      console.error('Failed to submit coach drill:', err);
      setDrillError(language === 'en' ? 'The coach could not evaluate this right now. Please try again.' : 'Pelatih AI belum dapat menilai saat ini. Silakan coba lagi.');
    } finally {
      setIsSubmittingDrill(false);
    }
  };

  // Ringkasan cepat, kemajuan antar percobaan, dan tautan LinkedIn
  const rankedParams = [...(currentResult.parameter_scores || [])].sort((x, y) => y.score - x.score);
  const topParam = rankedParams[0];
  const weakParam = rankedParams.length > 1 ? rankedParams[rankedParams.length - 1] : undefined;
  const attemptScores: number[] = (() => {
    try {
      const earlier = StorageSync.getResults()
        .filter(
          (r: any) =>
            r &&
            r.scenario_id === currentResult.scenario_id &&
            r.id !== currentResult.id &&
            r.session_id !== currentResult.session_id &&
            !String(r.gemini_execution_metadata?.model_used || '').toLowerCase().includes('cadangan')
        )
        .reverse()
        .map((r: any) => Number(r.weighted_average_score));
      return [...earlier, Number(currentResult.weighted_average_score)].filter((n) => Number.isFinite(n)).slice(-6);
    } catch {
      return [Number(currentResult.weighted_average_score)];
    }
  })();
  const handleAddToLinkedIn = () => {
    const now = new Date();
    const certName = `${language === 'en' ? 'Practice Simulation' : 'Latihan Simulasi'}: ${displayScenarioTitle}`.slice(0, 100);
    const qs = new URLSearchParams({
      startTask: 'CERTIFICATION_NAME',
      name: certName,
      organizationName: 'Vokasta (latihan simulasi)',
      issueYear: String(now.getFullYear()),
      issueMonth: String(now.getMonth() + 1),
      certId: String(currentResult.session_id || currentResult.id || ''),
    });
    window.open(`https://www.linkedin.com/profile/add?${qs.toString()}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2 text-slate-100">
      {/* Fallback Backup Result Notice Ribbon */}
      {(currentResult.gemini_execution_metadata?.model_used || '').toLowerCase().includes('cadangan') && (
        <div className="bg-amber-950/80 border border-amber-600/80 text-amber-200 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2.5 shadow-lg">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <span>Penilaian AI sedang tidak tersedia. Hasil ini adalah contoh, bukan penilaian atas rekaman Anda.</span>
        </div>
      )}

      {/* Final Status Hero Banner */}
      <div
        id="final-status-banner"
        className={`rounded-2xl p-6 sm:p-7 border shadow-2xl backdrop-blur-md transition-all relative overflow-hidden ${
          isPassed
            ? 'bg-slate-900/90 border-emerald-500/50 shadow-emerald-500/10'
            : 'bg-slate-900/90 border-amber-500/50 shadow-amber-500/10'
        }`}
      >
        <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl pointer-events-none ${isPassed ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                  isCadangan
                    ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                    : isPassed
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                    : 'bg-amber-950/80 text-amber-300 border-amber-800'
                }`}
              >
                {isCadangan
                  ? (language === 'en' ? 'SAMPLE RESULTS (not an assessment of your recording)' : 'CONTOH HASIL (bukan penilaian atas rekaman Anda)')
                  : isPassed
                  ? (language === 'en' ? 'Status: SOP Standard Met' : 'Status: Kriteria SOP Terpenuhi')
                  : (language === 'en' ? 'Status: Needs Manager/Owner Review' : 'Status: Butuh Tinjauan Manajer/Owner')}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {language === 'en' ? 'Standard: All-Parameter SOP Rule' : 'Standar: Aturan Kelulusan Seluruh Parameter'}
              </span>
            </div>

            {!isCadangan && (
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isPassed
                  ? (language === 'en' ? 'Candidate Meets All Operational Rubrics' : 'Kandidat Memenuhi Seluruh Rubrik Operasional')
                  : (language === 'en' ? 'Deficit Detected: Escalated to Manager/Owner Review' : 'Defisit Terdeteksi: Dialihkan ke Tinjauan Manajer/Owner')}
              </h1>
            )}

            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {language === 'en'
                ? <>Evaluated against scenario <strong className="text-white">{displayScenarioTitle}</strong>. Under SOP rubric standards, each parameter is scored on individual merit without deceptive averaging.</>
                : <>Dievaluasi terhadap skenario <strong className="text-white">{displayScenarioTitle}</strong>. Berdasarkan standar rubrik SOP, setiap parameter dinilai murni berdasarkan kinerjanya sendiri tanpa diratakan secara semu.</>}
            </p>
          </div>

          {/* Overall Score Badge */}
          <div className="sm:text-right shrink-0 bg-slate-950/80 p-4 rounded-xl border border-slate-800 shadow-inner">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              {isCadangan
                ? (language === 'en' ? 'SAMPLE SCORE' : 'SKOR CONTOH')
                : (language === 'en' ? 'Weighted Score' : 'Nilai Tertimbang')}
            </span>
            <div className="flex items-baseline space-x-1 sm:justify-end mt-0.5">
              <span
                className={`text-3xl font-extrabold ${
                  isPassed ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {currentResult.weighted_average_score}
              </span>
              <span className="text-slate-500 text-sm">/ 100</span>
            </div>
            {!isCadangan && (
              <span className="text-[11px] text-slate-400 block mt-1">
                {currentResult.failed_parameters_count === 0
                  ? (language === 'en' ? 'All parameters passed' : 'Semua parameter lulus')
                  : (language === 'en' ? `${currentResult.failed_parameters_count} parameter(s) below passing mark` : `${currentResult.failed_parameters_count} parameter di bawah standar`)}
              </span>
            )}
          </div>
        </div>

        {/* Mandatory Manager/Owner Notice when Status is needs_review */}
        {!isPassed && currentResult.supervisor_note && (
          <div
            id="supervisor-review-notice"
            className="mt-5 p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 text-amber-200 text-xs sm:text-sm flex items-start space-x-3 relative z-10"
          >
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300 block">
                {language === 'en' ? 'Manager / Owner Escalation Notice:' : 'Pemberitahuan Eskalasi Manajer / Owner:'}
              </span>
              <p className="mt-0.5 text-amber-100 font-medium">
                "{currentResult.supervisor_note}"
              </p>
              <p className="text-[11px] text-amber-400 mt-1">
                {language === 'en'
                  ? 'Note: Store manager/owner reviews timestamped audio-visual evidence before final certification is locked.'
                  : 'Catatan: Manajer/owner gerai meninjau bukti audio-visual berstempel waktu sebelum sertifikasi akhir dikunci.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {!isCadangan && topParam && (
        <div id="quick-summary" className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                {language === 'en' ? 'Strongest' : 'Paling kuat'}
              </span>
              <p className="text-sm text-white font-semibold mt-1 leading-snug">
                {getLocalizedParamName(topParam.parameter_id, topParam.parameter_name)}
              </p>
              <span className="text-xs text-slate-400">{topParam.score}/100</span>
            </div>
            {weakParam && (
              <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                  {language === 'en' ? 'Focus next' : 'Fokus berikutnya'}
                </span>
                <p className="text-sm text-white font-semibold mt-1 leading-snug">
                  {getLocalizedParamName(weakParam.parameter_id, weakParam.parameter_name)}
                </p>
                <span className="text-xs text-slate-400">{weakParam.score}/100</span>
              </div>
            )}
            {weakParam && (
              <div className="rounded-xl bg-slate-950/70 border border-amber-500/30 p-3 flex flex-col justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block">
                  {language === 'en' ? 'Next step' : 'Langkah berikutnya'}
                </span>
                <button
                  type="button"
                  onClick={() => openDrillForParam(weakParam)}
                  className="min-h-[44px] rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-2 transition cursor-pointer"
                >
                  {language === 'en' ? 'Micro-practice on the weakest area' : 'Latihan mikro di area terlemah'}
                </button>
              </div>
            )}
          </div>
          <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block">
              {language === 'en' ? 'Progress on this device (this scenario)' : 'Kemajuan di perangkat ini (skenario ini)'}
            </span>
            {attemptScores.length >= 2 ? (
              <div className="mt-2 space-y-2">
                <div className="flex items-end gap-1.5 h-12" aria-hidden="true">
                  {attemptScores.map((sc, i) => (
                    <div
                      key={i}
                      className={`flex-1 max-w-10 rounded-t ${i === attemptScores.length - 1 ? 'bg-emerald-500' : 'bg-slate-600'}`}
                      style={{ height: `${Math.max(8, Math.min(100, sc))}%` }}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-300">
                  {attemptScores.join(' → ')}{' '}
                  <span className="text-slate-400">
                    {(() => {
                      const d = attemptScores[attemptScores.length - 1] - attemptScores[0];
                      return language === 'en'
                        ? `(${d >= 0 ? '+' : ''}${d} since attempt 1 shown)`
                        : `(${d >= 0 ? '+' : ''}${d} sejak percobaan pertama yang tampil)`;
                    })()}
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-300 mt-1">
                {language === 'en'
                  ? `First attempt on this device: ${attemptScores[0]}. Repeat this scenario to see your progress.`
                  : `Percobaan pertama di perangkat ini: ${attemptScores[0]}. Ulangi skenario ini untuk melihat kemajuan Anda.`}
              </p>
            )}
            <p className="text-[11px] text-slate-500 mt-2">
              {language === 'en'
                ? 'Stored only in this browser, not on the server.'
                : 'Tersimpan hanya di browser ini, bukan di server.'}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-slate-900/70 border border-slate-800 rounded-xl px-4 py-3">
        <label htmlFor="holder-name" className="text-xs font-semibold text-slate-300 shrink-0">
          {language === 'en' ? 'Name on certificate (optional):' : 'Nama pada sertifikat (opsional):'}
        </label>
        <input
          id="holder-name"
          type="text"
          maxLength={60}
          value={holderNameInput}
          onChange={(e) => setHolderNameInput(e.target.value)}
          placeholder={language === 'en' ? 'Type your name, default: Simulation Participant' : 'Ketik nama Anda, bawaan: Peserta Simulasi'}
          className="flex-1 bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-white outline-none"
        />
        {!isCadangan && (
          <button
            type="button"
            onClick={handleAddToLinkedIn}
            className="min-h-[44px] shrink-0 rounded-lg border border-slate-700 hover:border-sky-400 text-slate-200 hover:text-white text-xs font-semibold px-3 py-2 transition cursor-pointer"
            title={language === 'en' ? 'Opens LinkedIn with a pre-filled practice entry. It is a practice record, not an official certification.' : 'Membuka LinkedIn dengan isian awal. Ini catatan latihan, bukan sertifikasi resmi.'}
          >
            {language === 'en' ? 'Add to LinkedIn' : 'Tambahkan ke LinkedIn'}
          </button>
        )}
      </div>

      {/* Enterprise Operational Toolbar (Transparency, Export, Verification & Tools) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* 1. Raw Gemini Prompt & Reasoning Inspector */}
        <button
          type="button"
          onClick={() => setIsPromptInspectorOpen(true)}
          className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 p-3.5 rounded-xl text-left transition flex items-center space-x-3 cursor-pointer group shadow-md"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-white flex items-center space-x-1.5">
              <span>{language === 'en' ? 'Gemini AI Inspection' : 'Inspeksi Gemini AI'}</span>
              <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.2 rounded border border-amber-800">
                Audit
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              {currentResult.gemini_execution_metadata?.model_used || 'Model Gemini'} • {currentResult.gemini_execution_metadata?.duration_ms ? `${currentResult.gemini_execution_metadata.duration_ms}ms` : '-'}
            </p>
          </div>
        </button>

        {/* 2. Unduh Ringkasan PDF */}
        {!isCadangan && (
          <button
            type="button"
            id="download-certificate-pdf-top-btn"
            onClick={handleDownloadCertificatePDF}
            className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 p-3.5 rounded-xl text-left transition flex items-center space-x-3 cursor-pointer group shadow-md"
            title={language === 'en' ? 'Download competency summary in PDF format' : 'Unduh Ringkasan Hasil Latihan format PDF'}
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition shrink-0">
              <FileDown className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                <span>{language === 'en' ? 'Download PDF Summary' : 'Unduh Ringkasan PDF'}</span>
                <Download className="w-3 h-3 text-amber-400" />
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                {language === 'en' ? 'Printable Certificate (.pdf)' : 'Dokumen Sertifikat Siap Cetak (.pdf)'}
              </p>
            </div>
          </button>
        )}

        {/* 99/100 Direct WhatsApp Share to Recruiter */}
        {!isCadangan && (
          <button
            type="button"
            id="share-whatsapp-top-btn"
            onClick={handleShareToRecruiterWhatsApp}
            className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 p-3.5 rounded-xl text-left transition flex items-center space-x-3 cursor-pointer group shadow-md"
            title={language === 'en' ? 'Share portfolio and credentials directly to Recruiter WhatsApp' : 'Kirim Portofolio & Hasil Sertifikasi Langsung ke WhatsApp HRD / Recruiter'}
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                <span>{language === 'en' ? 'WhatsApp Recruiter' : 'Kirim ke HRD WhatsApp'}</span>
                <Send className="w-3 h-3 text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                {language === 'en' ? 'Ready-to-Send Job Application' : 'Format Lamaran Kerja Siap Kirim'}
              </p>
            </div>
          </button>
        )}

        {/* 2. W3C Open Badges v3.0 JSON-LD Export */}
        {!isCadangan && (
          <button
            type="button"
            onClick={handleDownloadW3CBadge}
            className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 p-3.5 rounded-xl text-left transition flex items-center space-x-3 cursor-pointer group shadow-md"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition shrink-0">
              <FileBadge className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                <span>W3C Open Badges v3.0</span>
                <Download className="w-3 h-3 text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                {language === 'en' ? 'Portable JSON-LD Credential' : 'Unduh Kredensial Portabel (.json)'}
              </p>
            </div>
          </button>
        )}

        {/* 3. Dialect Invariance Auditor */}
        {ENABLE_DIALECT_LAB && (
          <button
            type="button"
            onClick={handleRunDialectAudit}
            className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/50 p-3.5 rounded-xl text-left transition flex items-center space-x-3 cursor-pointer group shadow-md"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                <span>{language === 'en' ? 'Dialect Neutrality Audit' : 'Uji Netralitas Dialek'}</span>
                <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.2 rounded border border-purple-800">
                  Fairness
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                {language === 'en' ? 'Inspect dialect neutrality design' : 'Cek desain netralitas logat daerah'}
              </p>
            </div>
          </button>
        )}

        {/* 5. Cek Format & Pindai QR Code */}
        <button
          type="button"
          id="verify-qr-code-toolbar-btn"
          onClick={() => setIsVerificationModalOpen(true)}
          className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 p-3.5 rounded-xl text-left transition flex items-center space-x-3 cursor-pointer group shadow-md"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition shrink-0">
            <QrCode className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-white flex items-center space-x-1.5">
              <span>{language === 'en' ? 'QR & Credential Format' : 'Format QR & Kredensial'}</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800 font-mono">
                W3C
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              {language === 'en' ? 'Self Check & QR Scanner' : 'Pemeriksaan Mandiri & QR Scanner'}
            </p>
          </div>
        </button>
      </div>

      {/* Mode suara: transkrip percakapan dua arah sebagai bukti */}
      {isVoiceResult && (
        <div id="conversation-evidence" className="bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <PlayCircle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">
                  {language === 'en' ? 'Conversation Transcript (Evidence)' : 'Transkrip Percakapan (Bukti)'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {language === 'en'
                    ? 'Your voice was converted to text automatically, so recognition errors are possible. Click a turn chip below to highlight the evidence.'
                    : 'Ucapan Anda diubah menjadi teks secara otomatis, sehingga dapat ada salah tangkap. Klik chip giliran di bawah untuk menyorot bukti.'}
                </p>
              </div>
            </div>
          </div>

          {videoSeekNotice && (
            <div className="px-3 py-1.5 rounded-lg bg-amber-500/90 text-slate-950 text-xs font-bold inline-flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-slate-950" />
              <span>{videoSeekNotice}</span>
            </div>
          )}

          <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 space-y-2.5 max-h-96 overflow-y-auto">
            {(() => {
              let workerNo = 0;
              return (currentResult.conversation_transcript || []).map((t, i) => {
                if (t.role === 'worker') {
                  workerNo += 1;
                  const n = workerNo;
                  const hl = highlightTurns.includes(n);
                  return (
                    <div key={i} id={`turn-worker-${n}`} className="flex justify-end">
                      <div
                        className={`max-w-[90%] rounded-xl rounded-tr-sm px-3 py-2 text-xs sm:text-sm leading-relaxed break-words border transition ${
                          hl
                            ? 'bg-amber-500/30 border-amber-400 text-amber-50 ring-2 ring-amber-400/60'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-50'
                        }`}
                      >
                        <div className="text-[10px] text-amber-300 font-semibold mb-0.5">
                          {language === 'en' ? `You (turn ${n})` : `Anda (giliran ${n})`}
                        </div>
                        {t.text}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={i} className="flex justify-start">
                    <div className="max-w-[90%] rounded-xl rounded-tl-sm px-3 py-2 text-xs sm:text-sm leading-relaxed break-words bg-slate-900 border border-slate-800 text-slate-200">
                      <div className="text-[10px] text-slate-400 font-semibold mb-0.5">
                        {language === 'en' ? 'AI customer' : 'Pelanggan AI'}
                      </div>
                      <span className="italic">{t.text}</span>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">
              {language === 'en' ? 'Jump to Evidence:' : 'Lompat ke Bukti:'}
            </span>
            {currentResult.parameter_scores.map((p) => (
              <button
                key={p.parameter_id}
                type="button"
                onClick={() => handleSeekVideo(p.timestamp, p.parameter_name)}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-300 border border-slate-800 hover:border-amber-400 transition cursor-pointer flex items-start space-x-1.5 max-w-full text-left"
              >
                <PlayCircle className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" />
                <span className="font-bold text-amber-300 shrink-0">[{p.timestamp}]</span>
                <span className="whitespace-normal break-words leading-snug">{getLocalizedParamName(p.parameter_id, p.parameter_name)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {!isVoiceResult && (
      <>
      {/* Synchronized Multimodal Video Evidence Player */}
      <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <PlayCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                <span>{language === 'en' ? 'Synchronized Multimodal Video Evidence Player' : 'Pemutar Bukti Rekaman Audio-Visual Terkoordinasi'}</span>
                <span className="text-[10px] font-semibold bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                  {language === 'en' ? 'Timestamp Navigation' : 'Navigasi Stempel Waktu'}
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? 'Click timestamp chips below to seek directly to the second of evidence execution.' : 'Klik tombol stempel waktu di bawah untuk melompat langsung ke detik bukti pelaksanaan SOP.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsVideoExpanded(!isVideoExpanded)}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-950 border border-slate-800 cursor-pointer"
          >
            {isVideoExpanded ? (language === 'en' ? 'Hide Video' : 'Sembunyikan Video') : (language === 'en' ? 'Show Video' : 'Tampilkan Video')}
          </button>
        </div>

        {/* Video Player Display */}
        {isVideoExpanded && (
          <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
            <video
              ref={videoRef}
              src={effectiveVideoUrl}
              controls
              playsInline
              className="w-full max-h-80 object-contain mx-auto bg-black"
            />

            {/* Seeking Notice Overlay Toast */}
            {videoSeekNotice && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-amber-500/95 text-slate-950 px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center space-x-2 backdrop-blur-sm animate-bounce">
                <Clock className="w-3.5 h-3.5 text-slate-950" />
                <span>{videoSeekNotice}</span>
              </div>
            )}

            {/* Quick Seek Evidence Chips */}
            <div className="bg-slate-950/95 border-t border-slate-850 p-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">
                {language === 'en' ? 'Jump to Evidence:' : 'Lompat ke Bukti:'}
              </span>
              {currentResult.parameter_scores.map((p) => (
                <button
                  key={p.parameter_id}
                  type="button"
                  onClick={() => handleSeekVideo(p.timestamp, p.parameter_name)}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-300 border border-slate-800 hover:border-amber-400 transition cursor-pointer flex items-start space-x-1.5 max-w-full text-left"
                >
                  <PlayCircle className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" />
                  <span className="font-bold text-amber-300 shrink-0">[{p.timestamp}]</span>
                  <span className="whitespace-normal break-words leading-snug">{getLocalizedParamName(p.parameter_id, p.parameter_name)}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      </>
      )}

      {/* Candidate Spoken Audio Transcript Card */}
      {currentResult.speech_transcript && !isVoiceResult && (
        <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                {language === 'en' ? 'Dialogue Transcription & Spoken Evidence' : 'Transkripsi Dialog & Bukti Tutur Kandidat'}
              </h2>
            </div>
            <span className="text-[11px] text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800 font-medium">
              {language === 'en' ? 'Audio-Visual Inference' : 'Inferensi Audio-Visual'}
            </span>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
            <p className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">
              {isCadangan
                ? (language === 'en' ? 'SAMPLE UTTERANCES (not from your recording):' : 'CONTOH UCAPAN (bukan dari rekaman Anda):')
                : (language === 'en' ? 'Candidate Utterance (Transcribed directly from video stream):' : 'Ucapan Kandidat (Ditranskripsi langsung dari audio rekaman):')}
            </p>
            <p className="text-sm text-amber-200 font-mono italic leading-relaxed">
              "{currentResult.speech_transcript}"
            </p>
            {!isCadangan && currentResult.candidate_summary && (
              <p className="text-xs text-slate-400 mt-2.5 pt-2.5 border-t border-slate-855">
                <span className="font-bold text-slate-200">{language === 'en' ? 'AI Evaluator Observation: ' : 'Observasi Evaluator AI: '}</span>
                {currentResult.candidate_summary}
              </p>
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            {language === 'en'
              ? 'Note: Below rubrics are evaluated based on spoken dialogue alignment and physical actions in video.'
              : 'Catatan: Rubrik di bawah dinilai berdasarkan sinkronisasi ucapan lisan dan aksi fisik pada video.'}
          </p>
        </div>
      )}

      {!isCadangan && currentResult.input_mode === 'voice' && ((currentResult.strengths?.length || 0) > 0 || (currentResult.recommendations?.length || 0) > 0) && (
        <div id="coaching-feedback" className="bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl p-5 shadow-xl space-y-4">
          {(currentResult.strengths?.length || 0) > 0 && (
            <div>
              <h3 className="text-sm font-bold text-emerald-300 mb-1.5">{language === 'en' ? 'What you did well' : 'Yang sudah baik'}</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentResult.strengths!.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}
          {(currentResult.recommendations?.length || 0) > 0 && (
            <div>
              <h3 className="text-sm font-bold text-amber-300 mb-1.5">{language === 'en' ? 'Recommendations and model sentences' : 'Rekomendasi dan kalimat acuan'}</h3>
              <div className="space-y-2.5">
                {currentResult.recommendations!.map((r, i) => (
                  <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <span className="font-bold text-slate-100">{language === 'en' ? 'Gap: ' : 'Kekurangan: '}</span>
                      {r.gap}
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed mt-1 italic">
                      <span className="not-italic font-bold text-emerald-300">{language === 'en' ? 'Say: ' : 'Ucapkan: '}</span>"{r.ideal_sentence}"
                    </p>
                    {r.reference && <p className="text-[10px] text-slate-500 mt-1">{language === 'en' ? 'Related rubric: ' : 'Terkait rubrik: '}{r.reference}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="text-[10px] text-slate-500 leading-relaxed">
            {language === 'en'
              ? 'Model sentences are AI-generated coaching suggestions based on the rubric and your conversation. Adapt them to your outlet\'s actual SOP, prices and policies.'
              : 'Kalimat acuan dibuat AI sebagai saran latihan berdasarkan rubrik dan percakapan Anda. Sesuaikan dengan SOP, harga, dan kebijakan gerai Anda yang sebenarnya.'}
          </p>
        </div>
      )}

      {/* Parameter Scores & Timestamp Annotations Table */}
      <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>{language === 'en' ? 'Rubric Parameter Breakdown & Timestamped Evidence' : 'Rincian Parameter Rubrik & Bukti Stempel Waktu'}</span>
            </h2>
            <p className="text-xs text-slate-400">
              {isCadangan
                ? (language === 'en'
                    ? 'Sample evidence (not an analysis of your recording by Gemini). Click timestamps to jump to video.'
                    : 'Contoh bukti (bukan hasil analisis Gemini atas rekaman Anda). Klik stempel waktu untuk melompat ke video.')
                : isVoiceResult
                ? (language === 'en'
                    ? 'Evidence quoted from your own words in the conversation, assessed by Google Gemini. Click a turn to see it highlighted in the transcript.'
                    : 'Bukti dikutip dari ucapan Anda sendiri dalam percakapan, dinilai oleh Google Gemini. Klik giliran untuk menyorotnya di transkrip.')
                : language === 'en'
                ? 'Observed multimodal evidence extracted by Google Gemini AI. Click timestamps to seek directly into the video.'
                : 'Bukti multimodal teramati yang diekstraksi oleh Google Gemini AI. Klik stempel waktu untuk melompat ke video.'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {currentResult.parameter_scores.map((param) => {
            const activeAppeal = currentResult.appeals?.find((a) => a.parameter_id === param.parameter_id);

            return (
              <div
                key={param.parameter_id}
                id={`param-score-${param.parameter_id}`}
                className={`p-4 rounded-xl border transition-all ${
                  param.passed
                    ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    : 'bg-rose-950/30 border-rose-800/80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          param.passed ? 'bg-emerald-400' : 'bg-rose-400'
                        }`}
                      />
                      <h3 className="text-sm font-bold text-white">{getLocalizedParamName(param.parameter_id, param.parameter_name)}</h3>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          param.is_universal
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {param.is_universal
                          ? (language === 'en' ? 'Universal Competency' : 'Kompetensi Universal')
                          : (language === 'en' ? 'Proprietary Brand SOP' : 'SOP Khusus Merek')}
                      </span>

                      {/* Active Appeal Badge if Submitted */}
                      {activeAppeal && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 flex items-center space-x-1">
                          <ShieldCheck className="w-3 h-3 text-sky-400" />
                          <span>{language === 'en' ? `Appeal Ticket #${activeAppeal.id} (Under Review)` : `Tiket Banding #${activeAppeal.id} (Sedang Ditinjau)`}</span>
                        </span>
                      )}
                    </div>

                    {/* Evidence Note */}
                    <p className="text-xs text-slate-300 pl-4.5 leading-relaxed">
                      "{param.evidence_note}"
                    </p>
                    {param.ideal_response && !isCadangan && (
                      <div className="ml-4.5 mt-2 rounded-lg border border-emerald-700/40 bg-emerald-950/30 px-3 py-2" id={`ideal-${param.parameter_id}`}>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 mb-0.5">
                          {language === 'en' ? 'What you could say (model sentence)' : 'Yang seharusnya diucapkan (kalimat acuan)'}
                        </div>
                        <p className="text-xs text-emerald-50 leading-relaxed italic">"{param.ideal_response}"</p>
                      </div>
                    )}
                  </div>

                  {/* Score & Interactive Timestamp Scrub Button */}
                  <div className="flex items-center space-x-4 shrink-0 sm:self-center pl-4.5 sm:pl-0">
                    <button
                      type="button"
                      onClick={() => handleSeekVideo(param.timestamp, param.parameter_name)}
                      title={language === 'en' ? 'Click to jump to this timestamp evidence' : 'Klik untuk melompat ke bukti stempel waktu ini'}
                      className="flex items-center space-x-1.5 bg-slate-900 hover:bg-amber-950/70 hover:border-amber-600/80 px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-300 hover:text-amber-300 text-xs font-mono shadow-xs transition cursor-pointer group"
                    >
                      <PlayCircle className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition" />
                      <span>{param.timestamp}</span>
                    </button>

                    <div className="text-right">
                      <div className="flex items-baseline space-x-1">
                        <span
                          className={`text-lg font-extrabold font-mono ${
                            param.passed ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {param.score}
                        </span>
                        <span className="text-[11px] text-slate-500">/100</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold block ${
                          isCadangan ? 'text-amber-400' : param.passed ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isCadangan
                          ? (language === 'en' ? 'SAMPLE' : 'CONTOH')
                          : param.passed
                          ? (language === 'en' ? 'PASSED' : 'LULUS')
                          : (language === 'en' ? 'BELOW STANDARDS' : 'DI BAWAH STANDAR')}{' '}
                        ({language === 'en' ? `Weight ${param.weight}%` : `Bobot ${param.weight}%`})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Remediation Drill & Human Appeal Actions */}
                <div className="mt-3 pt-2.5 border-t border-slate-850 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-400 text-[11px]">
                    {param.passed
                      ? (language === 'en' ? 'Competency assessed. Practice micro-drill or submit manager appeal anytime.' : 'Parameter dinilai kompeten. Lakukan latihan mikro atau banding manajer/owner kapan saja.')
                      : (language === 'en' ? 'Deficit detected. Complete interactive micro-drill or request manager appeal.' : 'Defisit teridentifikasi. Selesaikan latihan mikro atau ajukan evaluasi ulang manajer/owner manusia.')}
                  </span>

                  <div className="flex items-center space-x-2">
                    {/* Contest / Human Appeal Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setAppealModalParam(param);
                        setAppealSuccessTicket(null);
                        setAppealReasonText('');
                      }}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-sky-300 border border-slate-800 hover:border-sky-700/80 flex items-center space-x-1 transition cursor-pointer"
                    >
                      <Scale className="w-3 h-3 text-sky-400" />
                      <span>{activeAppeal ? (language === 'en' ? 'View Appeal' : 'Lihat Banding') : (language === 'en' ? 'Manager Appeal (HITL)' : 'Banding Manajer/Owner (HITL)')}</span>
                    </button>

                    {/* AI Coach Drill Button */}
                    <button
                      type="button"
                      onClick={() => openDrillForParam(param)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer ${
                        param.passed
                          ? 'bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-750'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      }`}
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>{param.passed ? (language === 'en' ? 'Micro Drill' : 'Latihan Mikro') : (language === 'en' ? '⚡ AI Coach Drill' : '⚡ Drill AI Coach')}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Remediation Drill Panel (When Active) */}
        {activeDrillParam && (
          <div id="drill-panel" className="mt-6 p-5 rounded-2xl bg-slate-950 border border-amber-800/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    {language === 'en' ? 'Interactive AI Coach Remediation Drill: ' : 'Latihan Remediasi Interaktif AI Coach: '}{activeDrillParam.parameter_name}
                  </h3>
                  <span className="text-[11px] text-amber-400">
                    {language === 'en' ? 'Passing Threshold: ' : 'Batas Kelulusan: '}70/100 • {language === 'en' ? 'Weight: ' : 'Bobot: '}{activeDrillParam.weight}%
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveDrillParam(null)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800 cursor-pointer"
              >
                {language === 'en' ? 'Close Drill' : 'Tutup Drill'}
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{language === 'en' ? 'Situation' : 'Situasi'}</div>
              {drillSituation ? (
                <p className="text-xs sm:text-sm text-slate-100 italic leading-relaxed">"{drillSituation}"</p>
              ) : (
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{currentResult.scenario_title}</p>
              )}
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? 'Task: say your own reply to the customer that meets this criterion: ' : 'Tugas: ucapkan jawaban Anda sendiri kepada pelanggan yang memenuhi kriteria: '}
                <span className="text-amber-300 font-semibold">{activeDrillParam.parameter_name}</span>
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="drill-input" className="block text-xs font-medium text-slate-300">
                {language === 'en' ? 'Your reply (type it as you would say it):' : 'Jawaban Anda (tulis seperti yang akan Anda ucapkan):'}
              </label>
              <textarea
                id="drill-input"
                rows={3}
                value={drillInput}
                onChange={(e) => setDrillInput(e.target.value)}
                placeholder={language === 'en' ? 'Write your reply to the customer...' : 'Tulis jawaban Anda kepada pelanggan...'}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 leading-relaxed shadow-inner"
              />
              {drillError && <p className="text-[11px] text-rose-300">{drillError}</p>}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <span className="text-[11px] text-slate-400">
                {language === 'en' ? 'AI Coach evaluates SOP precision, conversational warmth, and factual clarity in real time.' : 'AI Coach mengevaluasi presisi SOP, kehangatan percakapan, dan kejelasan fakta secara real-time.'}
              </span>
              <button
                type="button"
                id="submit-drill-btn"
                onClick={handleExecuteDrill}
                disabled={isSubmittingDrill || !drillInput.trim()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition disabled:opacity-50 cursor-pointer"
              >
                {isSubmittingDrill ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{language === 'en' ? 'Evaluating Response...' : 'Mengevaluasi Respons...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Submit Drill Response' : 'Kirim Respons Latihan'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Drill Feedback Output */}
            {drillFeedback && (
              <div
                className={`mt-4 p-4 rounded-xl border text-xs space-y-2.5 ${
                  drillFeedback.passed
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                    : 'bg-amber-950/40 border-amber-800 text-amber-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-bold text-sm">
                    {drillFeedback.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    )}
                    <span className={drillFeedback.passed ? 'text-emerald-300' : 'text-amber-300'}>
                      {drillFeedback.passed
                        ? (language === 'en' ? 'This reply meets the criterion' : 'Jawaban ini sudah memenuhi kriteria')
                        : (language === 'en' ? 'Not there yet: try once more' : 'Belum memenuhi kriteria: coba sekali lagi')}
                    </span>
                  </div>
                  <div className="font-mono text-sm font-extrabold text-white">
                    {language === 'en' ? 'Practice score: ' : 'Skor latihan: '}{drillFeedback.improved_score}/100
                  </div>
                </div>

                <p className="text-slate-200 text-xs font-medium">
                  <strong>{language === 'en' ? 'AI Coach Feedback: ' : 'Umpan Balik AI Coach: '}</strong>"{drillFeedback.coach_feedback}"
                </p>

                {drillFeedback.simple_check && (
                  <p className="text-[11px] text-amber-300">{language === 'en' ? 'The AI coach was unavailable, so this is only a simple keyword check.' : 'Pelatih AI sedang tidak tersedia, jadi ini hanya pemeriksaan kata kunci sederhana.'}</p>
                )}
                {(drillFeedback.met?.length || 0) > 0 && (
                  <div className="text-[11px] text-emerald-300"><strong>{language === 'en' ? 'Met: ' : 'Sudah ada: '}</strong>{drillFeedback.met!.join('; ')}</div>
                )}
                {(drillFeedback.missing?.length || 0) > 0 && (
                  <div className="text-[11px] text-amber-300"><strong>{language === 'en' ? 'Missing: ' : 'Belum ada: '}</strong>{drillFeedback.missing!.join('; ')}</div>
                )}
                {drillFeedback.better_version && (
                  <div className="rounded-lg border border-emerald-700/40 bg-emerald-950/30 px-3 py-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 mb-0.5">{language === 'en' ? 'Your reply, improved' : 'Jawaban Anda, versi lebih baik'}</div>
                    <p className="text-xs text-emerald-50 italic leading-relaxed">"{drillFeedback.better_version}"</p>
                  </div>
                )}
                {activeDrillParam.ideal_response && (
                  <div className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-0.5">{language === 'en' ? 'Model sentence' : 'Kalimat acuan'}</div>
                    <p className="text-xs text-slate-100 italic leading-relaxed">"{activeDrillParam.ideal_response}"</p>
                  </div>
                )}
                <p className="text-[10px] text-slate-500">{language === 'en' ? 'Practice scores do not change your official assessment result.' : 'Skor latihan tidak mengubah hasil penilaian resmi Anda.'}</p>
                {drillFeedback.strengths.length > 0 && (
                  <div className="text-[11px] text-emerald-300">
                    <strong>{language === 'en' ? 'Strengths: ' : 'Kekuatan: '}</strong>{drillFeedback.strengths.join(' • ')}
                  </div>
                )}
                {drillFeedback.areas_to_polish.length > 0 && (
                  <div className="text-[11px] text-amber-300">
                    <strong>{language === 'en' ? 'Areas to Polish: ' : 'Area Penyempurnaan: '}</strong>{drillFeedback.areas_to_polish.join(' • ')}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MULTI-AGENT EVALUATION & AUDIT PIPELINE */}
      <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              {language === 'en' ? 'Multi-Agent Consensus & Algorithmic Audit' : 'Konsensus Multi-Agent & Audit Algoritmik'}
            </h2>
          </div>
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
            {language === 'en' ? '4 Specialized AI Agents Collaboration' : 'Kolaborasi 4 Agen AI Terspesialisasi'}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {language === 'en'
            ? 'Rather than relying on a single prompt, Vokasta distributes evaluation across four specialized agents to support assessment objectivity, 10 Indonesian dialects design support, and audit traceability.'
            : 'Alih-alih mengandalkan satu prompt tunggal, Vokasta mendistribusikan evaluasi ke empat agen terspesialisasi guna menjaga objektivitas penilaian, dukungan 10 dialek Nusantara (kapabilitas desain), dan keterlacakan audit.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Agent 1: Perception Agent */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold">
              <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-800 flex items-center justify-center text-[10px] text-amber-300">1</span>
              <span>{language === 'en' ? 'Perception Agent' : 'Agen Persepsi'}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {language === 'en'
                ? 'Extracts multimodal audio-visual signals, transcribes spoken dialogue, and logs timestamped physical actions.'
                : 'Mengekstrak sinyal audio-visual multimodal, mentranskripsi dialog lisan, dan mencatat aksi fisik teramati berstempel waktu.'}
            </p>
            <div className="text-[10px] text-slate-300 font-mono bg-slate-900 p-2 rounded border border-slate-800">
              {language === 'en' ? 'Language: ' : 'Bahasa: '}{currentResult.agent_pipeline?.perception_agent.speech_language || 'Bilingual ID/EN'}
            </div>
          </div>

          {/* Agent 2: Rubric Agent */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold">
              <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-800 flex items-center justify-center text-[10px] text-indigo-300">2</span>
              <span>{language === 'en' ? 'SOP Rubric Agent' : 'Agen Rubrik SOP'}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {language === 'en'
                ? `Evaluates behavioral evidence strictly against SOP passing standards across ${currentResult.parameter_scores.length} rubric parameters.`
                : `Mengevaluasi bukti perilaku secara ketat terhadap batas kelulusan SOP pada ${currentResult.parameter_scores.length} parameter rubrik.`}
            </p>
            <div className="text-[10px] text-slate-300 font-mono bg-slate-900 p-2 rounded border border-slate-800">
              {language === 'en' ? 'SOP Compliance: ' : 'Kepatuhan SOP: '}{currentResult.agent_pipeline?.rubric_agent.sop_compliance_rate ?? Math.round(((currentResult.parameter_scores.length - currentResult.failed_parameters_count) / currentResult.parameter_scores.length) * 100)}%
            </div>
          </div>

          {/* Agent 3: Bias Auditor Agent */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[10px] text-emerald-300">3</span>
              <span>{language === 'en' ? 'Dialect Support Auditor' : 'Auditor Dukungan Dialek'}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {language === 'en'
                ? 'Designed to evaluate SOP intent across 10 Indonesian dialect profiles (design capability, not validated).'
                : 'Dirancang mengevaluasi maksud SOP dengan dukungan 10 profil dialek Nusantara (kapabilitas desain, belum divalidasi).'}
            </p>
            <div className="text-[10px] text-emerald-400 font-mono bg-slate-900 p-2 rounded border border-slate-800 font-semibold">
              {language === 'en' ? '10 Regional Dialects (Design Capability)' : 'Dukungan 10 Dialek (Kapabilitas Desain)'}
            </div>
          </div>

          {/* Agent 4: Remediation Coach Agent */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold">
              <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-800 flex items-center justify-center text-[10px] text-amber-300">4</span>
              <span>{language === 'en' ? 'Remediation Coach' : 'Pelatih Remediasi'}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {language === 'en'
                ? 'Synthesizes targeted micro-drills and golden benchmark conversational scripts for parameters below passing thresholds.'
                : 'Menyintesis latihan mikro terfokus dan skrip percakapan referensi untuk parameter di bawah ambang batas.'}
            </p>
            <div className="text-[10px] text-amber-400 font-mono bg-slate-900 p-2 rounded border border-slate-800">
              {currentResult.failed_parameters_count > 0 ? (language === 'en' ? 'Active Remediation' : 'Remediasi Aktif') : (language === 'en' ? 'Mastery Achieved' : 'Kompetensi Terkuasai')}
            </div>
          </div>
        </div>
      </div>

      {/* 2 PILAR PERTAHANAN ENTERPRISE: AUDIT ANTI-CHEAT & HRIS WEBHOOK SYNC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* PILAR 1: AUDIT ANTI-CHEAT & SPONTANITAS GAZE */}
        <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
                  <span>{language === 'en' ? 'Integrity Audit & Spontaneity Anti-Cheat' : 'Audit Integritas & Anti-Cheat Spontanitas'}</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800 font-mono">
                    Gaze AI
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  {language === 'en' ? 'Visual gaze heuristic & teleprompter cue detection (simulated model)' : 'Deteksi heuristik kontak mata & estimasi bebas contekan (model simulasi)'}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-bold border border-slate-700">
              {language === 'en' ? 'Sample Preview' : 'Contoh Pratinjau'}
            </span>
          </div>

          <div className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300">
            {language === 'en' ? 'Feature preview, not yet analyzed from the recording' : 'Pratinjau fitur, belum dianalisis dari rekaman'}
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl">
              <span className="text-[10px] text-slate-400 block">{language === 'en' ? 'Gaze Stability' : 'Stabilitas Gaze'}</span>
              <span className="text-base font-bold font-mono text-emerald-400">
                {currentResult.anti_cheat_analysis?.gaze_stability_score || 96}%
              </span>
              <span className="text-[9px] text-slate-500 block">{language === 'en' ? 'Natural Contact' : 'Kontak Mata Alami'}</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl">
              <span className="text-[10px] text-slate-400 block">{language === 'en' ? 'Cheating Risk' : 'Risiko Contekan'}</span>
              <span className="text-base font-bold font-mono text-emerald-400">
                {currentResult.anti_cheat_analysis?.reading_teleprompter_risk || (language === 'en' ? 'Low' : 'Rendah')}
              </span>
              <span className="text-[9px] text-slate-500 block">&lt; 0.5% {language === 'en' ? 'Deviation' : 'Deviasi'}</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl">
              <span className="text-[10px] text-slate-400 block">{language === 'en' ? 'Spontaneity Index' : 'Skor Spontanitas'}</span>
              <span className="text-base font-bold font-mono text-sky-400">
                {currentResult.anti_cheat_analysis?.spontaneity_index || 95}%
              </span>
              <span className="text-[9px] text-slate-500 block">{language === 'en' ? 'Natural Reflex' : 'Refleks Wajar'}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
              {language === 'en' ? 'Camera & Audio AI Forensic Verdict:' : 'Hasil Forensik Kamera & Audio AI:'}
            </span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {currentResult.anti_cheat_analysis?.gaze_verdict ||
                (language === 'en'
                  ? 'Consistent natural eye contact directed at camera & virtual customer. Zero indications of reading external teleprompter notes. Candidate responds spontaneously and contextually.'
                  : 'Kontak mata konsisten alami ke arah kamera & lawan bicara virtual. Bebas indikasi membaca teks contekan eksternal (teleprompter cue). Kandidat merespons secara spontan dan kontekstual.')}
            </p>
          </div>
        </div>

        {/* PILAR 2: ENTERPRISE HRIS WEBHOOK DISPATCHER (SIMULATOR) */}
        {!isCadangan && (
          <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
                    <span>{language === 'en' ? 'Enterprise HRIS Webhook Dispatcher' : 'Simulator Integrasi HRIS & Webhook API'}</span>
                    <span className="text-[10px] bg-sky-950 text-sky-300 px-1.5 py-0.2 rounded border border-sky-800 font-mono">
                      Sandbox API
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {language === 'en' ? 'Sandbox simulation testing sample payload dispatch (simulated digest, not a real signature)' : 'Simulasi pengujian pengiriman payload contoh (digest simulasi, bukan tanda tangan asli)'}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-300 text-[11px] font-bold border border-sky-800 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>Sandbox Ready</span>
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{language === 'en' ? 'Target Enterprise HRIS System:' : 'Target Sistem HRIS Perusahaan:'}</span>
                <div className="flex items-center space-x-1">
                  {(['Mekari Talenta', 'SAP SuccessFactors', 'Workday HCM'] as const).map((sys) => (
                    <button
                      key={sys}
                      type="button"
                      onClick={() => setSelectedHRISSystem(sys)}
                      className={`px-2 py-1 rounded text-[10px] font-bold transition cursor-pointer ${
                        selectedHRISSystem === sys
                          ? 'bg-sky-500 text-slate-950 shadow-xs'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {sys}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-400">Endpoint:</span>
                  <span className="text-sky-300 truncate max-w-56">
                    https://api.{selectedHRISSystem.toLowerCase().replace(/\s+/g, '')}.com/v2/badges
                  </span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                  <span>{language === 'en' ? 'Security Protocol:' : 'Protokol Keamanan:'}</span>
                  <span className="text-emerald-400 font-bold">{language === 'en' ? 'Sample Payload (Simulation)' : 'Payload contoh (simulasi)'}</span>
                </div>
              </div>

              {/* Status Notifikasi Dispatch */}
              {hrisDispatchNotice && (
                <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-[11px] text-emerald-300 flex items-start space-x-2">
                  <CheckCheck className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold">{language === 'en' ? `Successfully Dispatched to ${hrisDispatchNotice.system} (HTTP 200 OK)` : `Terkirim Sukses ke ${hrisDispatchNotice.system} (HTTP 200 OK)`}</span>
                    <p className="text-[10px] text-slate-400 font-mono">
                      ID Penerimaan: {hrisDispatchNotice.ackId} • Waktu: {hrisDispatchNotice.timestamp}
                    </p>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => handleTriggerHRISDispatch()}
                disabled={isDispatchingHRIS}
                className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {isDispatchingHRIS ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{language === 'en' ? `Dispatching Payload to ${selectedHRISSystem}...` : `Mengirim Payload ke ${selectedHRISSystem}...`}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? `Test / Re-dispatch Payload to ${selectedHRISSystem}` : `Uji / Kirim Ulang Payload ke ${selectedHRISSystem}`}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DUAL-LAYER COMPETENCY PARTITIONING */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <FileBadge className="w-5 h-5 text-amber-400" />
            <span>{language === 'en' ? 'Dual-Layer Competency Partitioning' : 'Pemisahan Kompetensi Dua Lapis (Dual-Layer Partitioning)'}</span>
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'en'
              ? 'Core Vokasta Innovation: Decoupling portable worker credentials from proprietary corporate trade secrets.'
              : 'Inovasi Inti Vokasta: Memisahkan kredensial portabel milik pekerja dari rahasia dagang kepemilikan korporasi.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Block 1: Universal Competency ("Belongs to the Employee") */}
          <div
            id="universal-competencies-block"
            className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-xl space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {language === 'en' ? 'Layer 1 • Portable Asset' : 'Lapisan 1 • Aset Portabel'}
                </span>
                <h3 className="text-base font-bold text-white mt-2 flex items-center space-x-2">
                  <span>{language === 'en' ? 'Universal Competencies' : 'Kompetensi Universal'}</span>
                </h3>
                <span className="text-xs font-semibold text-emerald-400 block mt-0.5">
                  {language === 'en' ? '"Sovereign Frontline Worker Asset"' : '"Kedaulatan Milik Pekerja Frontline"'}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shadow-md">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'en'
                ? <>This sample credential data format references the <strong>1EdTech Open Badges v3.0</strong> and <strong>W3C Verifiable Credentials</strong> data models. This sample is not cryptographically signed and has not been issued by an official authority.</>
                : <>Format data kredensial contoh ini mengacu pada model data <strong>1EdTech Open Badges v3.0</strong> dan <strong>W3C Verifiable Credentials</strong>. Contoh ini belum ditandatangani secara kriptografis dan belum diterbitkan lembaga resmi.</>}
            </p>

            {/* List of Universal Parameters in this Assessment */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                {language === 'en' ? 'Universal Competencies Evaluated:' : 'Kompetensi Universal yang Dinilai:'}
              </span>
              {currentResult.universal_competencies.map((comp) => (
                <div
                  key={comp.parameter_id}
                  className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-200 font-medium">{comp.parameter_name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-mono font-bold">{comp.score} {language === 'en' ? 'pts' : 'poin'}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                      {language === 'en' ? 'Portable' : 'Portabel'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* DIGITAL TALENT PASSPORT CARD & OPEN BADGES (DISABLED FOR BACKUP RESULTS) */}
            {(currentResult.gemini_execution_metadata?.model_used || '').toLowerCase().includes('cadangan') ? (
              <div className="mt-4 bg-amber-950/30 border border-amber-600/60 rounded-xl p-4 text-xs space-y-1.5">
                <div className="flex items-center space-x-2 text-amber-300 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{language === 'en' ? 'Credential & Passport Issuance Disabled for Backup Results' : 'Penerbitan Paspor & Kredensial Dinonaktifkan untuk Hasil Cadangan'}</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {language === 'en'
                    ? 'Digital talent passports, Open Badges v3.0, and PDF certificates are only issued for genuine assessments evaluated by Gemini or scripted test cases. Backup outputs do not produce credentials.'
                    : 'Paspor talenta, lencana Open Badges v3.0, dan sertifikat PDF hanya diterbitkan untuk asesmen yang dievaluasi langsung oleh Gemini atau kasus uji berskrip. Hasil cadangan tidak menerbitkan kredensial.'}
                </p>
              </div>
            ) : (
              <>
                {/* DIGITAL TALENT PASSPORT CARD (VIP BOARDING PASS) */}
                <div className="mt-4 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border-2 border-amber-500/50 rounded-xl p-4 shadow-xl space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-500" />

                  <div className="flex items-start justify-between gap-3 pt-0.5">
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 p-0.5 shadow-lg shrink-0">
                        <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center text-amber-400 font-black text-sm">
                          RP
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono tracking-widest uppercase text-amber-400 font-bold block">
                          VOKASTA • TALENT PASSPORT (SIMULASI)
                        </span>
                        <h4 className="text-sm font-black text-white tracking-wide">
                          RIAN PRATAMA
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          Frontline Professional • DID: {currentResult.open_badges_metadata?.verification_hash?.slice(0, 14) || '0x7f9a2b4c1e8d'}...
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700 block">
                        {isPassed ? (language === 'en' ? 'PASSED SIMULATION' : 'LULUS SIMULASI') : (language === 'en' ? 'UNDER REVIEW' : 'DALAM TINJAUAN')}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 mt-0.5 block">
                        {language === 'en' ? 'W3C VC SCHEMA (SAMPLE)' : 'SKEMA W3C (DATA CONTOH)'}
                      </span>
                    </div>
                  </div>

                  {/* Passport Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-xs">
                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block">{language === 'en' ? 'Evaluation Score' : 'Skor Evaluasi'}</span>
                      <span className="font-mono font-bold text-amber-400 text-xs">{currentResult.overall_score}/100</span>
                    </div>
                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block">{language === 'en' ? 'SOP Compliance' : 'Kepatuhan SOP'}</span>
                      <span className="font-mono font-bold text-emerald-400 text-xs">
                        {currentResult.final_status === 'passed' ? (language === 'en' ? 'Standard Met' : 'Lolos SOP') : (language === 'en' ? 'Review Needed' : 'Perlu Review')}
                      </span>
                    </div>
                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block">{language === 'en' ? 'Dialect Support' : 'Dukungan Dialek'}</span>
                      <span className="font-mono font-bold text-purple-400 text-xs">{language === 'en' ? '10 Dialects (Design)' : '10 Dialek (Desain)'}</span>
                    </div>
                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block">{language === 'en' ? 'Scoring Standard' : 'Standar Penilaian'}</span>
                      <span className="font-mono font-bold text-sky-400 text-xs">{language === 'en' ? 'Evidence-Based' : 'Berbasis Bukti'}</span>
                    </div>
                  </div>

                  {/* Direct Recruiter WhatsApp Button */}
                  <button
                    type="button"
                    id="share-whatsapp-passport-btn"
                    onClick={handleShareToRecruiterWhatsApp}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer shadow-md shadow-emerald-600/30"
                    title={language === 'en' ? 'Send portfolio and credentials directly to Recruiter WhatsApp' : 'Kirim Portofolio & Kredensial Langsung ke WhatsApp HRD / Recruiter'}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-white" />
                    <span>{language === 'en' ? 'Send Passport Portfolio to Recruiter via WhatsApp' : 'Kirim Portofolio Paspor ke HRD via WhatsApp'}</span>
                  </button>
                </div>

                {/* Open Badges Standard Spec Card */}
                {isPassed && currentResult.open_badges_metadata && (
                  <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-emerald-800/80 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-emerald-300">{language === 'en' ? 'Open Badges Format Spec (Sample)' : 'Format Standar Open Badges (Contoh)'}</span>
                      <button
                        onClick={() => setShowBadgeDetails(!showBadgeDetails)}
                        className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center space-x-1 cursor-pointer"
                      >
                        <span>{showBadgeDetails ? (language === 'en' ? 'Hide' : 'Sembunyikan') : (language === 'en' ? 'View' : 'Lihat')} Metadata</span>
                        {showBadgeDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-slate-900 px-2 py-1.5 rounded border border-slate-855 shadow-inner">
                      <span className="text-xs font-mono text-amber-300 truncate max-w-48">
                        {currentResult.open_badges_metadata.verification_hash}
                      </span>
                      <button
                        onClick={copyCredentialHash}
                        className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1 cursor-pointer font-medium"
                      >
                        {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedHash ? (language === 'en' ? 'Copied' : 'Tersalin') : (language === 'en' ? 'Copy Hash' : 'Salin Hash')}</span>
                      </button>
                    </div>

                    {/* Actions: PDF Summary, QR Inspector & Standard W3C Open Badges v3.0 JSON-LD */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        id="download-certificate-pdf-passport-btn"
                        onClick={handleDownloadCertificatePDF}
                        className="flex-1 py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer shadow-md shadow-amber-500/20"
                        title={language === 'en' ? 'Download competency summary in PDF format' : 'Unduh Ringkasan Hasil Latihan PDF'}
                      >
                        <FileDown className="w-3.5 h-3.5 text-slate-950" />
                        <span>{language === 'en' ? 'Download PDF Summary' : 'Unduh Ringkasan PDF'}</span>
                      </button>

                      <button
                        type="button"
                        id="verify-qr-code-passport-btn"
                        onClick={() => setIsVerificationModalOpen(true)}
                        className="flex-1 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700 text-amber-300 text-xs font-semibold flex items-center justify-center space-x-2 transition cursor-pointer"
                        title={language === 'en' ? 'Scan QR Code and View W3C Credential Schema' : 'Pindai QR Code & Lihat Skema Kredensial W3C'}
                      >
                        <QrCode className="w-3.5 h-3.5 text-amber-400" />
                        <span>{language === 'en' ? 'Inspect QR Schema' : 'Cek Skema QR'}</span>
                      </button>

                      <button
                        type="button"
                        id="download-w3c-credential-passport-btn"
                        onClick={handleDownloadW3CBadge}
                        className="flex-1 py-2 px-3 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-300 hover:text-white text-xs font-semibold flex items-center justify-center space-x-2 transition cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>W3C JSON-LD (.json)</span>
                      </button>
                    </div>

                    {showBadgeDetails && (
                      <div className="text-[10px] font-mono text-slate-400 space-y-1 pt-1">
                        <div>{language === 'en' ? 'Standard: ' : 'Standar: '}{currentResult.open_badges_metadata.standard}</div>
                        <div>{language === 'en' ? 'Issuer: ' : 'Penerbit: '}{currentResult.open_badges_metadata.issuer}</div>
                        <div>{language === 'en' ? 'Subject: ' : 'Subjek: '}{currentResult.open_badges_metadata.credential_subject}</div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Block 2: Brand-Specific Competency ("Stays Internal") */}
          <div
            id="brand-specific-competencies-block"
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {language === 'en' ? 'Layer 2 • Proprietary SOP' : 'Lapisan 2 • SOP Proprietary'}
                </span>
                <h3 className="text-base font-bold text-white mt-2 flex items-center space-x-2">
                  <span>{language === 'en' ? 'Brand-Specific Competencies' : 'Kompetensi Khusus Merek'}</span>
                </h3>
                <span className="text-xs font-semibold text-slate-400 block mt-0.5">
                  {language === 'en' ? '"Locked to Enterprise Organization"' : '"Terkunci pada Organisasi Perusahaan"'}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shadow-md">
                <Lock className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'en'
                ? <>Secret outlet recipes, precise formulation ratios, or brand-specific customer scripts. This data is <strong>strictly internal</strong> and cannot be exported outside the enterprise.</>
                : <>Operasional rahasia gerai, rasio formula racikan khusus, atau skrip pelanggan khas jenama. Data ini bersifat <strong>internal</strong> dan tidak dapat diekspor ke luar perusahaan.</>}
            </p>

            {/* List of Brand-Specific Parameters */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                {language === 'en' ? 'Proprietary Brand SOP Parameters:' : 'Parameter SOP Khusus Merek:'}
              </span>
              {currentResult.brand_specific_competencies.map((comp) => (
                <div
                  key={comp.parameter_id}
                  className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-200 font-medium">{comp.parameter_name}</span>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`font-mono font-bold ${
                        comp.passed ? 'text-amber-400' : 'text-rose-400'
                      }`}
                    >
                      {comp.score} {language === 'en' ? 'pts' : 'poin'}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      {language === 'en' ? 'Locked Internal' : 'Terkunci Internal'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center space-x-2.5">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{language === 'en' ? 'Protects enterprise trade secrets while empowering meritocratic frontline career mobility.' : 'Melindungi rahasia dagang korporasi sembari memajukan mobilitas meritokrasi staf.'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithmic Anti-Bias Audit Statement */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-start space-x-3 text-xs text-slate-300">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white">{language === 'en' ? 'Algorithmic Anti-Bias Design Statement: ' : 'Pernyataan Desain Anti-Bias Algoritmik: '}</span>
          <span>{currentResult.anti_bias_audit.audit_statement}</span>
        </div>
      </div>

      {/* Next-Step Command Center */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border-2 border-amber-500/40 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">
              {language === 'en' ? 'What to Do Next • Recommended Actions' : 'Langkah Selanjutnya • Rekomendasi Tindakan'}
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {language === 'en' ? 'Evaluation Session Complete' : 'Sesi Evaluasi Selesai'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Primary Action: Download PDF Summary */}
          {!isCadangan && (
            <button
              id="action-center-download-pdf-btn"
              onClick={handleDownloadCertificatePDF}
              className="flex-1 px-5 py-3 min-h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] cursor-pointer transition"
            >
              <FileDown className="w-4 h-4 text-slate-950 shrink-0" />
              <span>{language === 'en' ? 'Download PDF Summary' : 'Unduh Ringkasan PDF'}</span>
            </button>
          )}

          {/* Action 2: Proceed to Next Scenario */}
          <button
            id="start-new-assessment-btn"
            onClick={() => {
              if (onProceedToNextScenario) {
                const currentIndex = SCENARIOS.findIndex((s) => s.id === currentResult.scenario_id);
                const nextScenario = currentIndex >= 0 && currentIndex + 1 < SCENARIOS.length
                  ? SCENARIOS[currentIndex + 1]
                  : SCENARIOS[0];
                onProceedToNextScenario(nextScenario.id);
              } else {
                onStartNewAssessment();
              }
            }}
            className="flex-1 px-5 py-3 min-h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 active:scale-[0.98] cursor-pointer transition"
          >
            <span>{language === 'en' ? 'Proceed to Next Scenario' : 'Lanjut ke Skenario Berikutnya'}</span>
            <ArrowRight className="w-4 h-4 text-slate-950 shrink-0" />
          </button>

          {/* Action 3: Catalog */}
          <button
            id="action-center-catalog-btn"
            onClick={onStartNewAssessment}
            className="px-4 py-3 min-h-12 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-850 hover:bg-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center space-x-1.5 cursor-pointer transition"
          >
            <span>{language === 'en' ? 'Scenario Catalog' : 'Katalog Skenario'}</span>
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 1. GEMINI RAW PROMPT & REASONING CHAIN INSPECTOR MODAL */}
      {/* ---------------------------------------------------- */}
      {isPromptInspectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-750 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <span>Inspektor Evaluasi Google Gemini</span>
                    <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                      Lapisan Transparansi
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Jejak inferensi langsung, muatan token, dan keluaran skema JSON mentah.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsPromptInspectorOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-Header Metatags */}
            <div className="bg-slate-950/60 border-b border-slate-800 px-5 py-3 flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center space-x-1.5 text-slate-300">
                <span className="text-slate-500">Model Aktif:</span>
                <span className="font-mono font-bold text-amber-400">
                  {currentResult.gemini_execution_metadata?.model_used || 'gemini-2.5-flash'}
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-300">
                <span className="text-slate-500">Latensi:</span>
                <span className="font-mono text-emerald-400">
                  {currentResult.gemini_execution_metadata?.duration_ms || 1120} ms
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-300">
                <span className="text-slate-500">Token Teranalisis:</span>
                <span className="font-mono text-cyan-400">
                  ~{currentResult.gemini_execution_metadata?.tokens_evaluated || 1450} token
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950 px-5 pt-2 gap-2 text-xs">
              <button
                onClick={() => setInspectorTab('overview')}
                className={`pb-2.5 px-3 font-semibold transition border-b-2 cursor-pointer ${
                  inspectorTab === 'overview'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {language === 'en' ? 'Multi-Agent Pipeline' : 'Pipeline Multi-Agent'}
              </button>
              <button
                onClick={() => setInspectorTab('prompt')}
                className={`pb-2.5 px-3 font-semibold transition border-b-2 cursor-pointer ${
                  inspectorTab === 'prompt'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {language === 'en' ? 'Prompt Snippet' : 'Cuplikan Prompt'}
              </button>
              <button
                onClick={() => setInspectorTab('schema')}
                className={`pb-2.5 px-3 font-semibold transition border-b-2 cursor-pointer ${
                  inspectorTab === 'schema'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {language === 'en' ? 'Structured Schema' : 'Skema Terstruktur'}
              </button>
              <button
                onClick={() => setInspectorTab('raw_json')}
                className={`pb-2.5 px-3 font-semibold transition border-b-2 cursor-pointer ${
                  inspectorTab === 'raw_json'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {language === 'en' ? 'Gemini Raw JSON' : 'JSON Mentah Gemini'}
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {inspectorTab === 'overview' && (
                <div className="space-y-3">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="font-bold text-white text-sm block">
                      {language === 'en' ? 'Enterprise Consensus Architecture' : 'Arsitektur Konsensus Tingkat Perusahaan'}
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {language === 'en'
                        ? 'Vokasta leverages native audiovisual comprehension in Google Gemini to process synchronized video frames and speech audio. This eliminates transcription cascading errors and correlates frontline speech with physical actions.'
                        : 'Vokasta memanfaatkan pemahaman audio-visual bawaan Google Gemini untuk memproses bingkai video dan audio ucapan secara tersinkronisasi. Hal ini menghilangkan perambatan galat transkripsi dan memungkinkan AI mengorelasikan ucapan frontline dengan tindakan fisik meracik minuman.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                        {language === 'en' ? 'Input Modality' : 'Modalitas Masukan'}
                      </span>
                      <span className="font-mono text-amber-300 mt-1 block">
                        {language === 'en' ? 'video/mp4 + audio/aac (Synchronized)' : 'video/mp4 + audio/aac (Tersinkronisasi)'}
                      </span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                        {language === 'en' ? 'Output Guarantee' : 'Jaminan Keluaran'}
                      </span>
                      <span className="font-mono text-emerald-300 mt-1 block">
                        {language === 'en' ? 'Strict JSON (Structured Type Schema)' : 'JSON Ketat (Skema Tipe Terstruktur)'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {inspectorTab === 'prompt' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">
                      {language === 'en' ? 'System Instruction & Rubric Context:' : 'Instruksi Sistem & Konteks Rubrik:'}
                    </span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap max-h-96 leading-relaxed">
                    {currentResult.gemini_execution_metadata?.prompt_snippet ||
                      (language === 'en'
                        ? 'You are the Vokasta Multimodal Evaluator. Analyze this frontline roleplay recording...'
                        : 'Anda adalah Evaluator Multimodal Vokasta. Analisis rekaman roleplay garis depan ini...')}
                  </pre>
                </div>
              )}

              {inspectorTab === 'schema' && (
                <div className="space-y-2">
                  <span className="text-slate-400 font-medium">
                    {language === 'en' ? 'Enforced responseSchema Constraints:' : 'Batasan responseSchema yang Diterapkan:'}
                  </span>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {`responseSchema: {
  type: Type.OBJECT,
  properties: {
    speech_transcript: { type: Type.STRING },
    candidate_summary: { type: Type.STRING },
    parameter_scores: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          parameter_id: { type: Type.STRING },
          score: { type: Type.NUMBER },
          timestamp: { type: Type.STRING },
          evidence_note: { type: Type.STRING }
        },
        required: ["parameter_id", "score", "timestamp", "evidence_note"]
      }
    }
  },
  required: ["speech_transcript", "parameter_scores"]
}`}
                  </pre>
                </div>
              )}

              {inspectorTab === 'raw_json' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">
                      {language === 'en' ? 'Raw JSON from Gemini:' : 'JSON Murni dari Gemini:'}
                    </span>
                    <button
                      onClick={() => {
                        if (currentResult.gemini_execution_metadata?.raw_response_json) {
                          navigator.clipboard.writeText(currentResult.gemini_execution_metadata.raw_response_json);
                          setCopiedRawJson(true);
                          setTimeout(() => setCopiedRawJson(false), 2000);
                        }
                      }}
                      className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedRawJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedRawJson ? (language === 'en' ? 'Copied' : 'Tersalin') : (language === 'en' ? 'Copy Payload' : 'Salin Payload')}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-amber-200 font-mono text-xs overflow-x-auto whitespace-pre-wrap max-h-96 leading-relaxed">
                    {currentResult.gemini_execution_metadata?.raw_response_json ||
                      JSON.stringify({ parameter_scores: currentResult.parameter_scores }, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsPromptInspectorOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer transition"
              >
                {language === 'en' ? 'Close Inspector' : 'Tutup Inspektor'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. HUMAN CONTESTABILITY / APPEAL MODAL (HITL)        */}
      {/* ---------------------------------------------------- */}
      {appealModalParam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-750 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {language === 'en' ? 'Evaluation Appeal (Human Supervisor)' : 'Banding Evaluasi (Pengawas Manusia)'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {language === 'en' ? 'High-Risk AI Recourse Mechanism per Governance Standards' : 'Mekanisme Rekursi AI Risiko Tinggi Sesuai Standar Tata Kelola'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setAppealModalParam(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-xs">
              {appealSuccessTicket ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-200 space-y-2">
                  <div className="flex items-center space-x-2 font-bold text-sm text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{language === 'en' ? 'Appeal Successfully Registered' : 'Banding Berhasil Didaftarkan'}</span>
                  </div>
                  <p>
                    {language === 'en'
                      ? 'Your case has been escalated to a Human Store Manager / Owner for secondary video review.'
                      : 'Kasus Anda telah dieskalasi ke Manajer / Owner Gerai Manusia untuk peninjauan video sekunder.'}
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-amber-300">
                    {language === 'en' ? 'Ticket Number:' : 'Nomor Tiket:'} {appealSuccessTicket}
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1">
                    {language === 'en'
                      ? 'Manager/Owner SLA: Decision reviewed within a maximum of 4 business hours.'
                      : 'SLA Manajer/Owner: Keputusan ditinjau dalam waktu maksimal 4 jam kerja.'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                      {language === 'en' ? 'Parameter Under Appeal:' : 'Parameter yang Dibanding:'}
                    </span>
                    <span className="font-bold text-white text-sm">
                      {getLocalizedParamName(appealModalParam.parameter_id, appealModalParam.parameter_name)}
                    </span>
                    <div className="text-[11px] text-slate-400">
                      {language === 'en' ? 'Current Score:' : 'Nilai Saat Ini:'}{' '}
                      <span className="font-mono text-rose-400 font-bold">{appealModalParam.score}/100</span>{' '}
                      ({language === 'en' ? 'Passing Threshold:' : 'Batas Kelulusan:'} {appealModalParam.passing_score})
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-slate-300 font-medium">
                      {language === 'en' ? 'Reason for Review:' : 'Alasan Peninjauan:'}
                    </label>
                    <select
                      value={appealGround}
                      onChange={(e) => setAppealGround(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-sky-500"
                    >
                      <option value="ambient_noise">
                        {language === 'en' ? 'Store ambient / machine noise obscured speech' : 'Kebisingan gerai/mesin mengaburkan ucapan'}
                      </option>
                      <option value="camera_angle">
                        {language === 'en' ? 'Physical action occurred partially out of camera angle' : 'Tindakan fisik berlangsung sebagian di luar sorotan kamera'}
                      </option>
                      <option value="custom_request">
                        {language === 'en' ? 'Handling custom guest-specific dietary / recipe request' : 'Menangani permintaan kustomisasi khusus dari tamu'}
                      </option>
                      <option value="dialect_expression">
                        {language === 'en' ? 'Used customary regional dialect hospitality phrasing' : 'Menggunakan frasa keramahtamahan khas dialek daerah yang lazim'}
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-slate-300 font-medium">
                      {language === 'en' ? 'Candidate Justification & Timestamp Notes:' : 'Justifikasi Kandidat & Catatan Waktu:'}
                    </label>
                    <textarea
                      rows={3}
                      value={appealReasonText}
                      onChange={(e) => setAppealReasonText(e.target.value)}
                      placeholder={
                        language === 'en'
                          ? 'Explain what happened during the recording that warrants re-evaluation by human store leadership...'
                          : 'Jelaskan apa yang terjadi selama rekaman yang mendasari permohonan evaluasi ulang oleh manajer/owner...'
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 font-sans focus:outline-none focus:border-sky-500 leading-relaxed"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end space-x-2">
              <button
                onClick={() => setAppealModalParam(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                {appealSuccessTicket ? (language === 'en' ? 'Close' : 'Tutup') : (language === 'en' ? 'Cancel' : 'Batal')}
              </button>

              {!appealSuccessTicket && (
                <button
                  onClick={handleSubmitAppeal}
                  disabled={isSubmittingAppeal || !appealReasonText.trim()}
                  className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center space-x-1.5 cursor-pointer shadow-md shadow-sky-500/20"
                >
                  {isSubmittingAppeal ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{language === 'en' ? 'Submit to Human Manager/Owner' : 'Kirim ke Manajer/Owner Manusia'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. DIALECT & REGIONAL ACCENT INVARIANCE AUDITOR MODAL */}
      {/* ---------------------------------------------------- */}
      {ENABLE_DIALECT_LAB && isDialectLabOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-750 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {language === 'en' ? 'Dialect & Regional Accent Neutrality Lab' : 'Lab Audit Netralitas Dialek & Aksen Daerah'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {language === 'en'
                      ? '10 Indonesian Dialects Support Simulation (Design Capability)'
                      : 'Simulasi Dukungan 10 Dialek Nusantara (Kapabilitas Desain)'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsDialectLabOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {isLoadingDialect ? (
                <div className="py-12 text-center space-y-3">
                  <Loader2 className="w-7 h-7 text-purple-400 animate-spin mx-auto" />
                  <p className="text-slate-300 font-medium">
                    {language === 'en'
                      ? 'Synthesizing regional phonetic test vectors across Indonesian dialects...'
                      : 'Menyintesis vektor uji fonetik kedaerahan di seluruh dialek Indonesia...'}
                  </p>
                </div>
              ) : dialectReport && Array.isArray(dialectReport.results) && dialectReport.results.length > 0 ? (
                <div className="space-y-4">
                  {/* Ilustrasi Label */}
                  <div className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 inline-block">
                    {language === 'en' ? 'Design Simulation (Illustrative)' : 'Simulasi Desain (Ilustrasi)'}
                  </div>

                  {/* Summary Metric Card */}
                  <div className="bg-purple-950/40 border border-purple-800/80 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-purple-300 uppercase tracking-wider font-bold block">
                          {language === 'en' ? 'Dialect Support' : 'Dukungan Dialek'}
                        </span>
                        <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                          {language === 'en' ? 'Design Capability' : 'Kapabilitas Desain'}
                        </span>
                      </div>
                      <span className="text-2xl font-extrabold text-white">
                        {language === 'en' ? '10 Dialects Supported' : '10 Dialek Nusantara'}
                      </span>
                      <span className="text-[11px] text-purple-200 block mt-0.5">
                        {language === 'en'
                          ? 'Semantic evaluation isolates meaning from regional accent phonology (design capability).'
                          : 'Evaluasi semantik memisahkan maksud SOP dari aksen fonetik daerah (kapabilitas desain).'}
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-purple-900/60 border border-purple-700 flex items-center justify-center text-purple-300">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Benchmark Breakdown Table */}
                  <div className="space-y-2.5">
                    <span className="text-slate-300 font-bold block">
                      {language === 'en'
                        ? `Phonetic Stress Test for Parameter "${dialectReport.parameter_tested}":`
                        : `Uji Stres Fonetik terhadap Parameter "${dialectReport.parameter_tested}":`}
                    </span>

                    {(dialectReport?.results ?? []).map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">{item.dialect_name}</span>
                          <span className="font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 text-[11px]">
                            {language === 'en' ? 'Semantic Match' : 'Kesesuaian Semantik'} {item.semantic_fulfillment_score}/100
                          </span>
                        </div>
                        <p className="text-slate-400 font-mono italic bg-slate-900 p-2 rounded border border-slate-850">
                          "{item.spoken_sample}"
                        </p>
                        <div className="text-[11px] text-slate-300">
                          <strong className="text-slate-200">
                            {language === 'en' ? 'Extracted SOP Intent:' : 'Maksud SOP Terekstraksi:'}
                          </strong>{' '}
                          {item.extracted_intent}
                        </div>
                        <div className="text-[10px] text-emerald-400 font-semibold">
                          {item.neutrality_verdict}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    {dialectReport.audit_summary}
                  </p>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <p>{language === 'en' ? 'Dialect test not available' : 'Uji dialek belum tersedia'}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsDialectLabOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
              >
                {language === 'en' ? 'Done' : 'Selesai'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Public W3C Credential Verification & QR Scanner Modal */}
      <CredentialVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        metadata={currentResult.open_badges_metadata}
        candidateName={holderNameInput.trim() ? holderName : (currentResult.open_badges_metadata?.credential_subject || 'Peserta Simulasi')}
        scenarioTitle={displayScenarioTitle}
        universalCompetencies={currentResult.universal_competencies}
        score={currentResult.weighted_average_score}
      />

      {/* Floating Action Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl shadow-emerald-500/40 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-slate-950 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
