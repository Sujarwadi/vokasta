import React, { useState } from 'react';
import {
  FileText,
  Download,
  X,
  Printer,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInvestorROI?: () => void;
}

const ENABLE_DOWNLOAD_HUB = false;

export const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  onClose,
  onOpenInvestorROI,
}) => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<'ringkasan' | 'masalah' | 'solusi' | 'finansial' | 'arsitektur'>('ringkasan');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700/90 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                {language === 'en' ? 'Strategic Proposal & Blueprint 2026' : 'Proposal Strategis & Cetak Biru 2026'}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                • {language === 'en' ? 'Version 2.4' : 'Versi 2.4'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {language === 'en' ? 'Vokasta Strategic Development & Partnership Proposal' : 'Proposal Pengembangan & Kemitraan Vokasta'}
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'en'
                ? 'Authored by Sujarwadi (>17 Years Retail Operations & Competency Standards Formulation)'
                : 'Disusun oleh Sujarwadi (>17 Tahun Pengalaman Penyusunan Kompetensi & Retail)'}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Download Word Document Button */}
            {ENABLE_DOWNLOAD_HUB && (
              <a
                id="modal-download-docx-btn"
                href="/api/download/proposal"
                download="Vokasta_Strategic_Proposal.docx"
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center space-x-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                title={language === 'en' ? 'Download Full Microsoft Word File (.docx)' : 'Unduh Berkas Lengkap Microsoft Word (.docx)'}
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'en' ? 'Download' : 'Unduh'}</span>
                <span>Word (.docx)</span>
              </a>
            )}

            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700"
              title={language === 'en' ? 'Print or Save as PDF' : 'Cetak atau Simpan sebagai PDF'}
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Tabs Bar */}
        <div className="px-5 bg-slate-950/70 border-b border-slate-800 flex items-center space-x-1 overflow-x-auto text-xs font-semibold shrink-0 py-1.5">
          <button
            onClick={() => setActiveSection('ringkasan')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
              activeSection === 'ringkasan'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {language === 'en' ? '1. Executive Summary' : '1. Ringkasan Eksekutif'}
          </button>
          <button
            onClick={() => setActiveSection('masalah')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
              activeSection === 'masalah'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {language === 'en' ? '2. Industry Crisis & Data' : '2. Problem & Data Industri'}
          </button>
          <button
            onClick={() => setActiveSection('solusi')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
              activeSection === 'solusi'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {language === 'en' ? '3. Multimodal Dual-Layer Solution' : '3. Solusi Multimodal & Dual-Layer'}
          </button>
          <button
            onClick={() => setActiveSection('finansial')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
              activeSection === 'finansial'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {language === 'en' ? '4. Financial Viability & ROI' : '4. Kelayakan Finansial & ROI'}
          </button>
          <button
            onClick={() => setActiveSection('arsitektur')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
              activeSection === 'arsitektur'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {language === 'en' ? '5. Architecture & W3C Compliance' : '5. Arsitektur & Kepatuhan W3C'}
          </button>
        </div>

        {/* Modal Body: Scrollable Document Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-sm leading-relaxed flex-1">
          {/* Section 1: Ringkasan Eksekutif */}
          {activeSection === 'ringkasan' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {language === 'en' ? 'Executive Summary' : 'Ringkasan Eksekutif (Executive Summary)'}
                </span>
                <p className="text-slate-300">
                  {language === 'en' ? (
                    <>
                      <strong className="text-white">Vokasta</strong> is Southeast Asia's first multimodal AI frontline workforce competence simulator, marrying instant voice-vision rubric evaluation with sovereign credentials based on W3C Verifiable Credentials and 1EdTech Open Badges v3.0 standards.
                    </>
                  ) : (
                    <>
                      <strong className="text-white">Vokasta</strong> adalah simulator kompetensi frontliner berbasis kecerdasan buatan multimodal pertama di Indonesia yang mengintegrasikan penilaian video-audio secara instan dengan paspor kredensial standar W3C Verifiable Credentials / 1EdTech Open Badges v3.0.
                    </>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-xs font-semibold text-slate-400">
                    {language === 'en' ? 'Training Cost Efficiency' : 'Efisiensi Biaya Training'}
                  </div>
                  <div className="text-2xl font-black text-emerald-400">68%-74%</div>
                  <div className="text-xs text-slate-400">
                    {language === 'en' ? 'Budget reduction per new hire (illustrative projection)' : 'Penghematan per staf baru (proyeksi ilustratif)'}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-xs font-semibold text-slate-400">
                    {language === 'en' ? 'Onboarding Velocity' : 'Akselerasi Onboarding'}
                  </div>
                  <div className="text-2xl font-black text-amber-400">14 {language === 'en' ? 'Days' : 'Hari'} → 3 {language === 'en' ? 'Days' : 'Hari'}</div>
                  <div className="text-xs text-slate-400">
                    {language === 'en' ? 'Store-floor counter readiness (illustrative projection)' : 'Kesiapan kerja meja kasir (proyeksi ilustratif)'}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-xs font-semibold text-slate-400">
                    {language === 'en' ? 'Credential Standard' : 'Standar Sertifikat'}
                  </div>
                  <div className="text-2xl font-black text-cyan-400">W3C DID</div>
                  <div className="text-xs text-slate-400">
                    {language === 'en' ? 'W3C DID standards, portable CV format' : 'Standar W3C DID, format CV portabel'}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-base">
                  {language === 'en' ? 'Author Background & Practical Pedigree' : 'Latar Belakang Penulis'}
                </h4>
                <p className="text-slate-300">
                  {language === 'en' ? (
                    <>
                      Authored by <strong>Sujarwadi</strong>, industry veteran with over 17 years of experience in competency standards formulation, talent development, and modern retail network operations across Indonesia. All rubric matrices are calibrated against real-world customer service cultures.
                    </>
                  ) : (
                    <>
                      Disusun oleh <strong>Sujarwadi</strong>, praktisi dengan pengalaman lebih dari 17 tahun dalam penyusunan standar kompetensi, manajemen talenta, dan operasional jaringan ritel modern di Indonesia. Seluruh rumusan metrik diuji dan disesuaikan dengan kultur pelayanan frontliner Nusantara.
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Section 2: Problem & Data Industri */}
          {activeSection === 'masalah' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  {language === 'en'
                    ? 'Frontline Productivity Crisis (Empirical Data 2024-2026)'
                    : 'Krisis Produktivitas Frontliner Indonesia (Data Faktual 2024-2026)'}
                </span>
                <p className="text-slate-300">
                  {language === 'en' ? (
                    <>
                      Frontline employee turnover in retail and food & beverage (F&B) sectors is estimated at <strong>35% to 55% annually (asumsi internal, belum diverifikasi)</strong>. Every rehiring cycle consumes 1.5× to 2× monthly wages in training friction.
                    </>
                  ) : (
                    <>
                      Tingkat perputaran karyawan (turnover) di sektor ritel dan makanan-minuman (F&B) nasional diperkirakan <strong>35% hingga 55% per tahun (asumsi internal, belum diverifikasi)</strong>. Setiap siklus rekrutmen ulang menyedot biaya 1,5× hingga 2× gaji bulanan.
                    </>
                  )}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-white text-base">
                  {language === 'en' ? '3 Critical Pain Points Solved:' : '3 Titik Kritis yang Diselesaikan:'}
                </h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>
                      <strong>{language === 'en' ? 'Paper CVs Mask Behavioral Blindspots:' : 'CV Kertas Tidak Menggambarkan Perilaku Riil:'}</strong>{' '}
                      {language === 'en'
                        ? 'Candidates pass theoretical interviews with flying colors, but freeze or violate safety SOPs when confronted by distressed live customers.'
                        : 'Banyak kandidat lolos wawancara teoritis tetapi gugup atau melanggar SOP keselamatan saat berhadapan langsung dengan pelanggan gerai yang emosional.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>
                      <strong>{language === 'en' ? 'Store Supervisors Hijacked by Repetitive Coaching:' : 'Supervisi Gerai Tersandera Waktu Pelatihan:'}</strong>{' '}
                      {language === 'en'
                        ? 'Store managers spend 40% of their floor shifts manually drilling basic greetings and product upsell scripts rather than driving sales.'
                        : 'Store Manager menghabiskan 40% jam kerja hanya untuk melatih staf baru secara berulang, mengurangi fokus pada peningkatan omset penjualan.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>
                      <strong>{language === 'en' ? 'No Portable Sovereign Credential for Vocational Graduates:' : 'Tidak Ada Sertifikasi Portabel untuk Tenaga Vokasi:'}</strong>{' '}
                      {language === 'en'
                        ? 'Vocational graduates cannot take their proven work experience from store to store, forced to restart onboarding from scratch.'
                        : 'Pekerja lulusan SMK/vokasi sulit membuktikan kemahiran praktisnya ke perusahaan baru tanpa memulai dari nol lagi.'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Section 3: Solusi Multimodal & Dual-Layer */}
          {activeSection === 'solusi' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {language === 'en' ? 'Architectural Innovation: Dual-Layer Credentialing' : 'Inovasi Arsitektur: Dual-Layer Credentialing'}
                </span>
                <p className="text-slate-300">
                  {language === 'en'
                    ? 'Vokasta cleanly decouples evaluation rubrics into 2 independent layers to safeguard corporate trade secrets while empowering workers:'
                    : 'Vokasta memisahkan rubrik evaluasi menjadi 2 lapisan terpisah untuk melindungi rahasia dagang perusahaan sekaligus memberdayakan tenaga kerja:'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {language === 'en' ? 'Layer 1: Universal Portable Competency' : 'Layer 1: Kompetensi Universal (Portabel)'}
                  </div>
                  <p className="text-xs text-slate-300">
                    {language === 'en'
                      ? 'Foundational hospitality skills that belong to the worker for life: Active Listening, Articulation, De-escalation Composure, and Hygiene. Anchored to candidate W3C DID Passports.'
                      : 'Keterampilan dasar pelayanan yang menjadi milik pekerja seumur hidup: Active Listening, Kejelasan Diksi, Ketenangan Resolusi Konflik, dan Higienitas. Tersimpan dalam Paspor W3C DID kandidat.'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    {language === 'en' ? 'Layer 2: Brand-Specific Proprietary SOPs' : 'Layer 2: SOP Spesifik Merek (Privat)'}
                  </div>
                  <p className="text-xs text-slate-300">
                    {language === 'en'
                      ? 'Private internal brand operating procedures (e.g. signature greeting greetings, confidential recipes, POS loyalty tier upsells). Restricted to employer dashboards.'
                      : 'SOP internal rahasia merek (misal: slogan salam khusus, rasio resep proprietary, skema program loyalitas). Data ini hanya tersimpan di portal manajer gerai dan tidak pernah bocor keluar.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Kelayakan Finansial & ROI */}
          {activeSection === 'finansial' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {language === 'en' ? 'Financial Model & Unit Economics' : 'Model Finansial & Unit Economics'}
                </span>
                <p className="text-slate-300">
                  {language === 'en'
                    ? 'Based on an empirical benchmark of a 25-staff multi-outlet chain (3-5 stores):'
                    : 'Berdasarkan simulasi pada jaringan 25 staf (3-5 cabang gerai):'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div>
                    <div className="text-xs text-slate-400">
                      {language === 'en' ? 'Legacy Manual Cost' : 'Biaya Tradisional'}
                    </div>
                    <div className="text-base font-bold text-rose-400 line-through">IDR 48,000,000</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">
                      {language === 'en' ? 'Vokasta SaaS Fee' : 'Investasi Vokasta'}
                    </div>
                    <div className="text-base font-bold text-cyan-400">IDR 4,500,000</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">
                      {language === 'en' ? 'Net Savings' : 'Penghematan Bersih'}
                    </div>
                    <div className="text-base font-bold text-emerald-400">IDR 43,500,000</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Payback Period</div>
                    <div className="text-base font-bold text-amber-400">&lt; 1.2 {language === 'en' ? 'Months' : 'Bulan'}</div>
                  </div>
                </div>

                {onOpenInvestorROI && (
                  <div className="pt-2 flex justify-center">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenInvestorROI();
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-2 transition cursor-pointer"
                    >
                      <TrendingUp className="w-4 h-4 text-slate-950" />
                      <span>{language === 'en' ? 'Launch Interactive ROI Simulator' : 'Buka Simulasi Interaktif Kalkulator ROI'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section 5: Arsitektur & Kepatuhan W3C */}
          {activeSection === 'arsitektur' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {language === 'en' ? 'Technical Architecture & Global Compliance' : 'Spesifikasi Teknis & Kepatuhan Global'}
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li>
                    • <strong>{language === 'en' ? 'Multimodal Engine:' : 'Engine Multimodal:'}</strong>{' '}
                    {language === 'en'
                      ? 'Google Gemini (model selected automatically from valid list; version used appears on results page).'
                      : 'Google Gemini (model dipilih otomatis dari daftar; versi yang dipakai tampil di halaman hasil).'}
                  </li>
                  <li>
                    • <strong>{language === 'en' ? 'Credential Standards:' : 'Standar Kredensial:'}</strong>{' '}
                    1EdTech Open Badges v3.0 &amp; W3C Decentralized Identifiers (DID).
                  </li>
                  <li>
                    • <strong>{language === 'en' ? 'Bandwidth Resilience:' : 'Resiliensi Jaringan 3T:'}</strong>{' '}
                    {language === 'en'
                      ? 'Adaptive lightweight compression optimized for regional networks outside major metros.'
                      : 'Mode kompresi adaptif untuk jaringan 2G/EDGE di luar pulau Jawa.'}
                  </li>
                  <li>
                    • <strong>{language === 'en' ? 'HRIS Integrations:' : 'Integrasi HRIS:'}</strong>{' '}
                    {language === 'en'
                      ? 'Sample webhook design (simulation). Integrations with SAP, Workday, and Mekari Talenta are untested and not yet available (roadmap).'
                      : 'Rancangan webhook contoh (simulasi). Integrasi dengan SAP, Workday, dan Mekari Talenta belum diuji dan belum tersedia (peta jalan).'}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400">
            📄 {language === 'en'
              ? 'Prepared for investor due diligence, enterprise COOs, and vocational leadership.'
              : 'Dokumen ini disiapkan untuk uji kelayakan investor, direktur operasional (COO), dan pimpinan institusi vokasi.'}
          </div>
          <div className="flex items-center space-x-2">
            {ENABLE_DOWNLOAD_HUB && (
              <a
                href="/api/download/proposal"
                download="Vokasta_Strategic_Proposal.docx"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center space-x-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Download Word (.docx)' : 'Unduh Dokumen Word (.docx)'}</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs transition cursor-pointer border border-slate-700"
            >
              {language === 'en' ? 'Close' : 'Tutup'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
