import React, { useState } from 'react';
import {
  Presentation,
  Download,
  ExternalLink,
  Printer,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  X,
  Layers,
  Sparkles,
  FileText,
  Maximize2,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Award,
  TrendingUp,
  Users
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface GoogleCloudDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ENABLE_DOWNLOAD_HUB = false;

export const GoogleCloudDeckModal: React.FC<GoogleCloudDeckModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const totalSlides = 12;

  const slidesData = [
    {
      num: 1,
      badge: 'Google Cloud AI Builder Cup 2026 • Powered by Hack2Skill',
      title: 'VOKASTA',
      subtitle: 'Multimodal AI Frontline Competency Simulator & Sovereign Credential Passport',
      tagline: 'Transforming vocational training & blue-collar onboarding for 2.7 billion [sumber belum diverifikasi] global frontline workers. Powered by Google Gemini real-time voice-video roleplay and portable skill credential format.',
      highlights: [
        { label: 'Gemini Multimodal', desc: 'Evaluasi ucapan & kepatuhan rubrik berbasis multimodal', color: 'border-[#4285F4] text-[#1A73E8]' },
        { label: 'Dialect Inclusive', desc: 'Desain simulasi dukungan dialek kedaerahan Nusantara', color: 'border-[#EA4335] text-[#EA4335]' },
        { label: 'Zero VR Hardware', desc: 'Runs directly on standard Android & laptop web browsers', color: 'border-[#FBBC05] text-[#B45309]' },
        { label: 'Sovereign Credential', desc: 'Format Kredensial Portabel W3C & Open Badges v3.0', color: 'border-[#34A853] text-[#34A853]' }
      ],
      footerNote: 'Google Cloud AI Builder Cup 2026 Submission • VOKASTA'
    },
    {
      num: 2,
      badge: 'Executive Summary',
      title: 'VOKASTA: At A Glance',
      subtitle: 'Enterprise frontline workforce readiness powered by Google Cloud & Gemini',
      points: [
        { title: 'The Problem', text: 'Estimated 70% frontline onboarding failure rate (illustrative projection), high retraining loss across ASEAN, static paper SOPs ignored in hospitality, retail, and F&B.' },
        { title: 'The Solution', text: 'Interactive browser-based roleplay simulator where Gemini evaluates candidate speech, actions, and SOP compliance based on transparent rubrics.' },
        { title: 'The Innovation', text: 'Zero expensive VR headsets needed; works on standard web browsers; outputs W3C Open Badges v3.0 aligned data models.' },
        { title: 'Traction & Market', text: 'Targeting 15M+ Indonesian vocational students (SMK) and 25M frontline retail/F&B workers.' }
      ]
    },
    {
      num: 3,
      badge: 'Problem Statement',
      title: 'The Frontline Competency Crisis',
      subtitle: 'Why traditional training methods fail modern blue-collar industries',
      points: [
        { title: 'High Turnover & Attrition', text: 'F&B and retail face estimated 35%–55% annual staff turnover (industry estimate). Store managers spend 14 days onboarding each new hire repeatedly.' },
        { title: 'Passive Video & Text LMS', text: 'Passive quizzes do not build muscle memory or de-escalation skills. Estimated 82% of customer complaints stem from frontline interpersonal mistakes (illustrative estimate).' },
        { title: 'Fake Credentials & Paper Certificates', text: 'Employers have zero way to verify if an applicant can actually operate an espresso machine or resolve an angry customer.' },
        { title: 'Language & Cultural Barrier', text: 'Standard AI tools only understand formal English, ignoring regional dialects like Sunda, Jawa, and colloquial Indonesian.' }
      ]
    },
    {
      num: 4,
      badge: 'Proposed Solution',
      title: 'VOKASTA Multimodal Simulator',
      subtitle: 'The first zero-hardware, hyper-realistic vocational roleplay engine',
      points: [
        { title: 'Active Behavioral Practice', text: 'Candidates practice responding to customer situations (e.g., barista recipe customization, greeting standard, complaint handling).' },
        { title: 'Multimodal Audio-Visual Evaluation', text: 'Gemini evaluates spoken tone, key actions, and adherence to company SOP checklists objectively.' },
        { title: 'Sovereign Skill Passport', text: 'Graduates receive portable credentials in Open Badges v3.0 format (sample, unsigned) with QR codes acceptable across partner employers.' },
        { title: 'Manager Analytics Cockpit', text: 'Store owners track store-wide competency deltas, training ROI, and assign customized brand SOPs in 1-click.' }
      ]
    },
    {
      num: 5,
      badge: 'Google Cloud Architecture',
      title: 'End-to-End Google Cloud Stack',
      subtitle: 'Single-container Cloud Run deployment with Google Gemini API',
      points: [
        { title: 'Gemini Multimodal (@google/genai SDK)', text: 'Model Gemini (dipilih otomatis dari daftar, versi yang dipakai tampil di halaman hasil) mengevaluasi video inline base64 atau observasi teks berskrip.' },
        { title: 'Google Cloud Run', text: 'Satu kontainer serverless menyajikan React (Vite) + backend Node Express pada port 3000.' },
        { title: 'State Memori Server (Prototipe)', text: 'Sesi latihan, data asesmen, dan rubrik disimpan dalam memori server prototipe untuk eksekusi instan.' },
        { title: 'Peta Jalan: Cloud Storage & Firestore', text: 'Penyimpanan persisten cloud multi-region untuk rekaman jangka panjang dan basis data Firestore disiapkan pada roadmap fase lanjutan.' }
      ]
    },
    {
      num: 6,
      badge: 'System Design & Multimodal Pipeline',
      title: 'Real-Time Audio-Visual Inference Pipeline',
      subtitle: 'From student microphone/camera to verifiable credential format in 3 steps',
      points: [
        { title: 'Capture & Edge Optimization', text: 'Browser WebRTC audio/video compressed with client-side WebM Opus/H.264 codecs to run smoothly even on 3G connections.' },
        { title: 'Multimodal Synthesis with Gemini', text: 'Server proxies streams to Gemini (model dipilih otomatis dari daftar, versi yang dipakai tampil di halaman hasil) with dialect context prompts, receiving structured competence scorecards.' },
        { title: 'W3C Open Badges Issuance', text: 'Scores above threshold trigger digital credential stamping with SHA-256 signature and scannable QR verification URL.' }
      ]
    },
    {
      num: 7,
      badge: 'Responsible AI & Guardrails',
      title: 'Safety, Bias Mitigation & Ethical AI',
      subtitle: 'Dialect support for diverse socioeconomic backgrounds (design capability)',
      points: [
        { title: 'Dialect Support (Design)', text: 'System evaluates communicative efficacy and respectfulness, focusing on core communication intent rather than regional accents.' },
        { title: 'JSON Output Schema', text: 'A JSON schema constrains the format of Gemini output; accuracy is not guaranteed.' },
        { title: 'Privacy & Data Handling', text: 'Assessment requests are sent from the app server to the Gemini API. Retention and PII handling are not yet audited.' }
      ]
    },
    {
      num: 8,
      badge: 'Validation & Live Prototype',
      title: 'Live Prototype & Benchmarks',
      subtitle: 'Battle-tested across realistic hospitality & retail scenarios',
      points: [
        { title: 'Latency (not yet benchmarked)', text: 'Evaluation time depends on clip length and model. Measured values will be reported after deployment.' },
        { title: '85% Cost Reduction', text: 'Cuts training expense from Rp 1.5M/person down to Rp 50k with automated AI roleplay (illustrative projection).' },
        { title: 'Scenario Rubric Examples', text: 'Sample rubrics are written from generic F&B service practice (illustrative, not an official standard).' },
        { title: 'Live Prototype', text: 'Live prototype on Google Cloud Run (demo environment) with multi-role support (Jobseeker, Staff, Store Manager).' }
      ]
    },
    {
      num: 9,
      badge: 'Competitive Advantage',
      title: 'Why VOKASTA Wins',
      subtitle: 'Defensible technological moat and zero-barrier accessibility',
      points: [
        { title: 'Zero Hardware Moat', text: 'Competitors require $500–$1,000 VR goggles (Meta Quest/Pico). VOKASTA runs on any $100 Xiaomi/Samsung phone.' },
        { title: 'Dialect Understanding', text: 'Global solutions (Coursera, LinkedIn Learning) fail on Indonesian regional nuances (Sunda, Jawa).' },
        { title: 'Digital Portability', text: 'Unlike closed LMS formats, VOKASTA sample credential format is portable and structured for demonstration.' }
      ]
    },
    {
      num: 10,
      badge: 'Business Model & Financials',
      title: 'Monetization & Scalability',
      subtitle: 'B2B SaaS with High LTV/CAC and Public-Private TVET Partnerships',
      points: [
        { title: 'Enterprise B2B (Retail & F&B)', text: 'Tiered subscription: $15–$35/store/month for unlimited staff onboarding and compliance auditing.' },
        { title: 'Vocational School (SMK) B2G', text: 'Institutional campus license subsidized by government TVET revitalisation funds.' },
        { title: 'Unit Economics', text: 'Estimated 82% gross margin on Google Cloud Run serverless inference costs with scale (illustrative projection).' }
      ]
    },
    {
      num: 11,
      badge: 'Roadmap & Future Vision',
      title: '2026 Strategic Roadmap',
      subtitle: 'From Indonesian Hackathon Winner to Pan-ASEAN Workforce Standard',
      points: [
        { title: 'Phase 1 (Current)', text: 'Single-container Cloud Run prototype with Gemini multimodal evaluation and in-memory session state.' },
        { title: 'Phase 2 (Roadmap)', text: 'Persistent Google Cloud Storage for video archives, Firestore database, and empirical dialect bias benchmarks.' },
        { title: 'Phase 3 (Roadmap)', text: 'Expansion to Vietnam, Philippines, and Thailand with regional language adaptation.' }
      ]
    },
    {
      num: 12,
      badge: 'Team & Submission',
      title: 'Team VOKASTA & Google Alignment',
      subtitle: 'Built for Google Cloud AI Builder Cup 2026',
      points: [
        { title: 'Team Expertise', text: 'Led by Sujarwadi, Founder & Lead Architect (>17 years retail operations and competency standards formulation experience).' },
        { title: 'Google Ecosystem Alignment', text: 'Built on Google Cloud: Cloud Run container, Gemini Multimodal API (@google/genai SDK), and Web Audio API.' },
        { title: 'Ready to Submit & Scale', text: 'Working prototype, pitch presentation, technical architecture dossiers, and video walkthrough completed.' }
      ]
    }
  ];

  const current = slidesData[currentSlide - 1];

  const handleDownloadPPTX = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch('/api/download/google-template');
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'VOKASTA_Google_Cloud_Official_Template_Deck.pptx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      window.open('/api/download/google-template', '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyText = () => {
    const text = slidesData.map(s => {
      let content = `SLIDE ${s.num}: ${s.title} (${s.subtitle})\n${s.tagline || ''}\n`;
      if (s.points) {
        content += s.points.map(p => `• ${p.title}: ${p.text}`).join('\n');
      }
      if (s.highlights) {
        content += s.highlights.map(h => `• ${h.label}: ${h.desc}`).join('\n');
      }
      return content;
    }).join('\n\n====================\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenViewer = () => {
    window.open('/slides.html', '_blank');
  };

  const handlePrint = () => {
    window.open('/slides.html?print=1', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-white text-slate-900 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-slate-200">
        {/* Top Google Themed Header */}
        <div className="bg-[#FFFFFF] border-b border-[#DADCE0] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 font-semibold text-lg">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
              <span className="ml-1 text-[#5F6368] font-normal text-sm">Cloud</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-300 hidden sm:block"></div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#202124]">Official Hackathon Presentation Deck</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC]">
                  AI Builder Cup 2026
                </span>
              </div>
              <p className="text-[11px] text-[#5F6368]">
                {language === 'en'
                  ? 'Google Cloud 12-Slide Pitch Template • Interactive Slide Preview'
                  : '12 Slide Template Google Cloud • Pratinjau Slide Interaktif'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {ENABLE_DOWNLOAD_HUB && (
              <>
                <button
                  onClick={handleDownloadPPTX}
                  disabled={isDownloading}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
                  title="Download presentation in .pptx format"
                >
                  <Download className="w-3.5 h-3.5 text-[#FBBC05]" />
                  <span>{isDownloading ? 'Downloading...' : 'Download .PPTX'}</span>
                </button>

                <button
                  onClick={handleOpenViewer}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs flex items-center gap-1.5 transition border border-slate-300 cursor-pointer"
                  title="Open standalone web slide viewer in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">Web Viewer</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs flex items-center gap-1.5 transition border border-slate-300 cursor-pointer"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">PDF</span>
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4-Color Signature Accent Bar */}
        <div className="h-1.5 grid grid-cols-4 w-full">
          <div className="bg-[#4285F4]"></div>
          <div className="bg-[#EA4335]"></div>
          <div className="bg-[#FBBC05]"></div>
          <div className="bg-[#34A853]"></div>
        </div>

        {/* Slide Carousel Selector & Thumbnail Pills */}
        <div className="bg-[#F8F9FA] border-b border-[#DADCE0] px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(1, prev - 1))}
              disabled={currentSlide === 1}
              className="p-1 rounded-md bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            <span className="text-xs font-bold text-slate-700 px-2">
              Slide {currentSlide} / {totalSlides}
            </span>
            <button
              onClick={() => setCurrentSlide(prev => Math.min(totalSlides, prev + 1))}
              disabled={currentSlide === totalSlides}
              className="p-1 rounded-md bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              title="Next Slide"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {slidesData.map(s => (
              <button
                key={s.num}
                onClick={() => setCurrentSlide(s.num)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition shrink-0 cursor-pointer ${
                  currentSlide === s.num
                    ? 'bg-[#1A73E8] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {s.num}. {s.badge.split('•')[0].trim()}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopyText}
            className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-medium flex items-center gap-1 shrink-0 cursor-pointer ml-auto"
            title="Copy all slide texts to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
            <span className="text-[11px]">{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>
        </div>

        {/* Slide Canvas Display (16:9 Aspect Look) */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-[#F1F3F4] flex items-center justify-center">
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 md:p-10 w-full max-w-4xl shadow-md min-h-[420px] flex flex-col justify-between relative overflow-hidden">
            {/* Top Tag & Slide Counter */}
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F3F4]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A73E8] bg-[#E8F0FE] px-2.5 py-1 rounded">
                {current.badge}
              </span>
              <span className="text-xs font-medium text-[#5F6368]">
                Slide {current.num} of {totalSlides}
              </span>
            </div>

            {/* Slide Body */}
            <div className="my-auto py-4 space-y-4">
              <div>
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#202124]">
                  {current.title}
                </h2>
                <p className="text-sm md:text-base font-medium text-[#1A73E8] mt-1">
                  {current.subtitle}
                </p>
                {current.tagline && (
                  <p className="text-xs md:text-sm text-[#3C4043] mt-2 max-w-3xl leading-relaxed">
                    {current.tagline}
                  </p>
                )}
              </div>

              {/* Points Grid */}
              {current.points && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                  {current.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] hover:border-[#1A73E8]/40 transition"
                    >
                      <h4 className="text-xs font-bold text-[#202124] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34A853] shrink-0" />
                        <span>{pt.title}</span>
                      </h4>
                      <p className="text-xs text-[#5F6368] mt-1 leading-relaxed">
                        {pt.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlights for Slide 1 */}
              {current.highlights && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                  {current.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg bg-[#F8F9FA] border-l-4 ${h.color}`}
                    >
                      <div className="text-[11px] font-bold uppercase">{h.label}</div>
                      <div className="text-[11px] text-[#5F6368] mt-0.5">{h.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Footer Details */}
            <div className="pt-4 border-t border-[#F1F3F4] flex flex-wrap items-center justify-between text-[11px] text-[#5F6368]">
              <span>VOKASTA • Google Cloud AI Builder Cup 2026</span>
              <span>16:9 Official Widescreen Presentation</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="bg-[#FFFFFF] border-t border-[#DADCE0] px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600 flex items-center gap-2">
            <span className="font-semibold text-emerald-600">✓ Siap Submit:</span>
            <span>Berkas .PPTX & .PDF sudah sesuai format resmi Google Cloud (Hack2Skill)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(1, prev - 1))}
              disabled={currentSlide === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentSlide(prev => Math.min(totalSlides, prev + 1))}
              disabled={currentSlide === totalSlides}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
            {ENABLE_DOWNLOAD_HUB && (
              <button
                onClick={handleDownloadPPTX}
                className="px-4 py-1.5 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer active:scale-95 shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#FBBC05]" />
                <span>Unduh File .PPTX</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
