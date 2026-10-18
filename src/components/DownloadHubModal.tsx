import React, { useState } from 'react';
import {
  FileText,
  Presentation,
  Download,
  ExternalLink,
  Copy,
  Check,
  X,
  FileCode,
  Layers,
  Award,
  Globe,
  CheckCircle2,
  Sparkles,
  Archive,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface DownloadHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDeckViewer?: () => void;
}

export const DownloadHubModal: React.FC<DownloadHubModalProps> = ({
  isOpen,
  onClose,
  onOpenDeckViewer,
}) => {
  const { language } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerDirectDownload = (endpoint: string, fallbackFilename: string) => {
    // Uses native Blob download to guarantee 100% download execution in all sandboxes/iframes
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error('File download failed');
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fallbackFilename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 1000);
      })
      .catch((err) => {
        console.error('Blob download fallback to window.location:', err);
        window.location.href = endpoint;
      });
  };

  const handleCopyText = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const downloads = [
    {
      id: 'pptx-google',
      title: 'Google Cloud Template Deck (.pptx)',
      desc: language === 'en'
        ? '11-slide presentation using Google Cloud template with unit economics projections (illustrative projection).'
        : '11 slide presentasi format Google Cloud dengan proyeksi unit ekonomi (proyeksi ilustratif).',
      badge: 'RECOMMENDED FOR JURY',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: Presentation,
      endpoint: '/api/download/google-template',
      filename: 'VOKASTA_Google_Cloud_Official_Template_Deck.pptx',
      primaryAction: 'download',
      previewUrl: '/slides.html',
    },
    {
      id: 'pptx-master',
      title: 'VOKASTA Master Pitch Deck (.pptx)',
      desc: language === 'en'
        ? 'Full PowerPoint slide deck with comprehensive architecture diagrams and scenario walkthrough.'
        : 'Slide deck PowerPoint lengkap dengan diagram arsitektur dan skenario komprehensif.',
      badge: 'PPTX DECK',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      icon: Presentation,
      endpoint: '/api/download/pptx',
      filename: 'VOKASTA_AI_Builder_Cup_2026_Pitch_Deck.pptx',
      primaryAction: 'download',
    },
    {
      id: 'submission-txt',
      title: 'Field-by-Field Submission Copy (SUBMISSION.txt)',
      desc: language === 'en'
        ? 'Pre-formatted copy-paste answers for every field on the Hack2Skill submission form.'
        : 'Teks jawaban lengkap siap copy-paste langsung ke setiap kolom form submisi Hack2Skill.',
      badge: 'PORTAL READY',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      icon: FileCode,
      endpoint: '/SUBMISSION.txt',
      filename: 'SUBMISSION.txt',
      primaryAction: 'view-and-download',
      previewUrl: '/SUBMISSION.txt',
    },
    {
      id: 'dossier-md',
      title: 'Winning Submission Dossier & Storyboard (.md)',
      desc: language === 'en'
        ? 'Full markdown dossier including the 3-minute video storyboard and rubric scoring breakdown.'
        : 'Dossier lengkap format Markdown mencakup storyboard video 3 menit dan breakdown rubrik penilaian.',
      badge: 'MARKDOWN',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      icon: FileText,
      endpoint: '/api/download/dossier',
      filename: 'HACK2SKILL_WINNING_SUBMISSION_DOSSIER.md',
      primaryAction: 'view-and-download',
      previewUrl: '/HACK2SKILL_WINNING_SUBMISSION_DOSSIER.md',
    },
    {
      id: 'proposal-docx',
      title: 'Proposal Pengembangan & Kemitraan (.docx)',
      desc: language === 'en'
        ? 'Strategic business proposal authored by Sujarwadi (>17 years retail operations experience).'
        : 'Proposal bisnis strategis yang disusun oleh Sujarwadi (>17 tahun pengalaman operasional ritel).',
      badge: 'WORD DOCX',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      icon: FileText,
      endpoint: '/api/download/proposal',
      filename: 'VOKASTA_Proposal.docx',
      primaryAction: 'download',
    },
    {
      id: 'spec-docx',
      title: 'Spesifikasi Lengkap Sistem & Arsitektur (.docx)',
      desc: language === 'en'
        ? 'Complete technical system architecture, data models, and dual-layer credentialing blueprint.'
        : 'Dokumen spesifikasi arsitektur teknis, model data, dan cetak biru dual-layer credentials.',
      badge: 'WORD DOCX',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      icon: FileText,
      endpoint: '/api/download/spesifikasi',
      filename: 'SPESIFIKASI_LENGKAP_VOKASTA.docx',
      primaryAction: 'download',
    },
    {
      id: 'manual-docx',
      title: 'Panduan Penggunaan / User Manual (.docx)',
      desc: language === 'en'
        ? 'Step-by-step frontline and manager user manual with screenshots and operational flow.'
        : 'Panduan operasional langkah demi langkah bagi manajer gerai dan kandidat pekerja.',
      badge: 'WORD DOCX',
      badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
      icon: FileText,
      endpoint: '/api/download/manual',
      filename: 'VOKASTA_User_Manual.docx',
      primaryAction: 'download',
    },
    {
      id: 'claude-digest',
      title: 'Master Architecture & Codebase Digest (.md)',
      desc: language === 'en'
        ? 'Single consolidated Markdown file with screen-by-screen walkthrough and core source code for Claude / LLMs.'
        : 'Dokumen Markdown tunggal berisi peta visual seluruh halaman dan source code inti untuk Claude / AI review.',
      badge: 'CLAUDE / LLM READY',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: FileCode,
      endpoint: '/VOKASTA_CLAUDE_MASTER_DIGEST.md',
      filename: 'VOKASTA_CLAUDE_MASTER_DIGEST.md',
      primaryAction: 'view-and-download',
      previewUrl: '/VOKASTA_CLAUDE_MASTER_DIGEST.md',
    },
    {
      id: 'source-zip',
      title: 'Complete Source Code Bundle (.zip)',
      desc: language === 'en'
        ? 'Clean zip archive of the entire codebase (frontend, backend, and configs) ready to upload to Claude Projects.'
        : 'Arsip ZIP bersih seluruh source code (frontend, backend, skenario) siap diunggah langsung ke Claude Projects.',
      badge: 'SOURCE CODE ZIP',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      icon: Archive,
      endpoint: '/vokasta_source_code.zip',
      filename: 'vokasta_source_code.zip',
      primaryAction: 'download',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 text-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-slate-800">
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg font-black">
              <Download className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
                <span>Pusat Berkas Submisi Vokasta</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline-block">
                  {language === 'en' ? 'Submissions Hub' : 'Berkas Submisi'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'en'
                  ? 'Direct, unblocked downloads for all competition files, presentation decks, and dossiers.'
                  : 'Unduh langsung seluruh berkas presentasi, formulir submisi, dan dokumen spesifikasi tanpa hambatan iframe.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Portal Link Banner */}
        <div className="px-5 py-3 bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-300">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Target Portal: <strong className="text-white">Google Cloud AI Builder Cup 2026 (Hack2Skill)</strong></span>
          </div>
          <a
            href="https://hack2skill.com/event/aibuildercup2026/dashboard/submissions/6a5da99a444e4f43e5657a85"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shrink-0"
          >
            <span>Buka Form Submisi Hack2Skill</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* File Cards List */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          {downloads.map((item) => {
            const Icon = item.icon;
            const isCopied = copiedKey === item.id;

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-3.5 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-sm text-white">{item.title}</h4>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    <p className="text-[11px] font-mono text-slate-500">File: {item.filename}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 sm:self-center">
                  {item.previewUrl && (
                    <a
                      href={item.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition inline-flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Open' : 'Buka'}</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => triggerDirectDownload(item.endpoint, item.filename)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition inline-flex items-center space-x-1.5 shadow-md shadow-emerald-950 cursor-pointer active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Download File' : 'Unduh Berkas'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <span>Semua dokumen telah diselaraskan dengan track Social Challenge &amp; Workplace Readiness.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
