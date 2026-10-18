import React, { useState, useEffect } from 'react';
import {
  Users,
  Award,
  TrendingUp,
  Clock,
  ShieldCheck,
  Building2,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Search,
  ExternalLink,
  MapPin,
  Flame,
  Filter,
  Download,
  FileSpreadsheet,
  Printer,
  Plus,
  UserCheck,
  Calendar,
  BookOpen,
  Sparkles,
  Target,
  DollarSign,
  Sliders,
  ChevronRight,
  QrCode,
  MoreHorizontal,
  FileText,
} from 'lucide-react';
import { CohortAnalytics, SOPAssignment } from '../types';
import { getLocalizedAssignment } from '../data/assignments';
import { useLanguage } from '../i18n/LanguageContext';
import { useWorkspace } from '../context/WorkspaceContext';

interface ManagerDashboardProps {
  onBackToCandidatePortal: () => void;
  assignments?: SOPAssignment[];
  onOpenAssignModal?: () => void;
  onOpenInvestorROI?: () => void;
  onOpenStagePitch?: () => void;
  onOpenVerification?: () => void;
  onOpenProposal?: () => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({
  onBackToCandidatePortal,
  assignments = [],
  onOpenAssignModal,
  onOpenInvestorROI,
  onOpenStagePitch,
  onOpenVerification,
  onOpenProposal,
}) => {
  const { language } = useLanguage();
  const { activeWorkspace } = useWorkspace();
  const [analytics, setAnalytics] = useState<CohortAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);

  // Store Mystery Shopper AI Predictor & Enterprise ROI Simulator State
  const [targetSOPCompliance, setTargetSOPCompliance] = useState<number>(88);
  const [storeCount, setStoreCount] = useState<number>(15);
  const [activeRoiTab, setActiveRoiTab] = useState<'mystery_shopper' | 'financial_roi' | 'skill_gap'>('mystery_shopper');
  const [showWhitepaperModal, setShowWhitepaperModal] = useState<boolean>(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/cohort?workspace=${encodeURIComponent(activeWorkspace.id)}`);
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data.analytics);
      }
    } catch (err) {
      console.error('Failed to fetch cohort analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    setIsExportingCsv(true);
    try {
      const res = await fetch(`/api/analytics/export/csv?workspace=${encodeURIComponent(activeWorkspace.id)}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vokasta-${activeWorkspace.id}-compliance-telemetry-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('CSV export failed:', err);
    } finally {
      setIsExportingCsv(false);
    }
  };

  const handlePrintComplianceDossier = () => {
    window.print();
  };

  useEffect(() => {
    fetchAnalytics();
    setSelectedBranch('all');
  }, [activeWorkspace.id]);

  if (loading || !analytics) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-slate-400 text-sm">
          {language === 'en' ? 'Loading Store Operational Telemetry...' : 'Memuat Telemetri Operasional Gerai...'}
        </p>
      </div>
    );
  }

  const filteredBranches = selectedBranch === 'all'
    ? analytics.branches
    : analytics.branches.filter((b) => b.branch_id === selectedBranch);

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-2 text-slate-100">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
        {/* Top Meta Bar: Portal Tag, Tenant Badge, and Clean Actions Group */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center text-xs font-bold px-3 py-1 rounded-full bg-amber-950/70 text-amber-400 border border-amber-800 uppercase tracking-wider whitespace-nowrap">
              {language === 'en' ? 'Store Operations Portal' : 'Portal Operasional Gerai'}
            </span>
            <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800/90 text-slate-200 border border-slate-700">
              <Building2 className="w-3.5 h-3.5 text-amber-400 mr-1.5 shrink-0" />
              <span>{language === 'en' ? activeWorkspace.nameEn : activeWorkspace.name}</span>
            </span>
            <span className="text-xs text-slate-400 hidden md:inline">
              • {language === 'en' ? activeWorkspace.industryTagEn : activeWorkspace.industryTag}
            </span>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={fetchAnalytics}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 shadow-xs transition cursor-pointer"
              title={language === 'en' ? 'Refresh analytics data' : 'Segarkan data analitik'}
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Primary Action: Assign SOP */}
            {onOpenAssignModal && (
              <button
                id="open-assign-sop-btn"
                onClick={onOpenAssignModal}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition flex items-center space-x-1.5 cursor-pointer whitespace-nowrap"
                title={language === 'en' ? 'Assign SOP scenario to frontline staff' : 'Berikan penugasan skenario SOP ke staf frontliner gerai'}
              >
                <Plus className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                <span>{language === 'en' ? 'Assign SOP' : 'Tugaskan SOP'}</span>
              </button>
            )}

            {/* More Actions Dropdown */}
            <div className="relative">
              <button
                id="manager-more-actions-btn"
                onClick={() => setShowActionsDropdown(!showActionsDropdown)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
                title={language === 'en' ? 'More Actions' : 'Aksi Tambahan'}
              >
                <MoreHorizontal className="w-4 h-4 text-slate-300" />
                <span>{language === 'en' ? 'Tools' : 'Menu Alat'}</span>
              </button>

              {showActionsDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setShowActionsDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-30 py-1.5 backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-150">
                    {onOpenInvestorROI && (
                      <button
                        onClick={() => {
                          setShowActionsDropdown(false);
                          onOpenInvestorROI();
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs text-amber-300 hover:text-amber-100 hover:bg-amber-950/40 flex items-center space-x-2.5 transition cursor-pointer"
                      >
                        <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <div className="font-semibold">{language === 'en' ? 'ROI Calculator' : 'Kalkulator ROI'}</div>
                          <div className="text-[11px] text-slate-400">{language === 'en' ? 'Financial justification model' : 'Model justifikasi finansial'}</div>
                        </div>
                      </button>
                    )}

                    {onOpenProposal && (
                      <button
                        id="dropdown-open-proposal-btn"
                        onClick={() => {
                          setShowActionsDropdown(false);
                          onOpenProposal();
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs text-blue-300 hover:text-blue-100 hover:bg-blue-950/50 flex items-center space-x-2.5 transition cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                        <div>
                          <div className="font-semibold">{language === 'en' ? 'Proposal & Blueprint' : 'Proposal & Cetak Biru'}</div>
                          <div className="text-[11px] text-slate-400">{language === 'en' ? 'View complete strategic proposal' : 'Dokumen proposal lengkap'}</div>
                        </div>
                      </button>
                    )}

                    {onOpenStagePitch && (
                      <button
                        id="manager-open-pitch-btn"
                        onClick={() => {
                          setShowActionsDropdown(false);
                          onOpenStagePitch();
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs text-indigo-300 hover:text-indigo-100 hover:bg-indigo-950/50 flex items-center space-x-2.5 transition cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                        <div>
                          <div className="font-semibold">{language === 'en' ? 'Jury Pitch (60s)' : 'Pitching Juri (60s)'}</div>
                          <div className="text-[11px] text-slate-400">{language === 'en' ? 'Instant stage evaluation demo' : 'Demo panggung evaluasi'}</div>
                        </div>
                      </button>
                    )}

                    {onOpenVerification && (
                      <button
                        id="manager-open-verify-btn"
                        onClick={() => {
                          setShowActionsDropdown(false);
                          onOpenVerification();
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs text-emerald-300 hover:text-emerald-100 hover:bg-emerald-950/50 flex items-center space-x-2.5 transition cursor-pointer"
                      >
                        <QrCode className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-semibold">{language === 'en' ? 'W3C QR Credential Schema' : 'Cek Skema Kredensial (W3C QR)'}</div>
                          <div className="text-[11px] text-slate-400">{language === 'en' ? 'Inspect schema format (sample)' : 'Inspeksi format skema (data contoh)'}</div>
                        </div>
                      </button>
                    )}

                    <div className="my-1 border-t border-slate-800" />

                    <button
                      onClick={() => {
                        setShowActionsDropdown(false);
                        handleExportCSV();
                      }}
                      disabled={isExportingCsv}
                      className="w-full px-3.5 py-2 text-left text-xs text-slate-200 hover:text-white hover:bg-slate-800 flex items-center space-x-2.5 transition cursor-pointer"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="font-semibold">{isExportingCsv ? (language === 'en' ? 'Exporting...' : 'Mengekspor...') : (language === 'en' ? 'Export Telemetry (CSV)' : 'Ekspor Telemetri (CSV)')}</div>
                        <div className="text-[11px] text-slate-400">{language === 'en' ? 'Download raw dataset for BI' : 'Unduh dataset raw gerai'}</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setShowActionsDropdown(false);
                        handlePrintComplianceDossier();
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs text-slate-200 hover:text-white hover:bg-slate-800 flex items-center space-x-2.5 transition cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-sky-400 shrink-0" />
                      <div>
                        <div className="font-semibold">{language === 'en' ? 'Print / Save PDF' : 'Cetak / Simpan PDF'}</div>
                        <div className="text-[11px] text-slate-400">{language === 'en' ? 'Store compliance dossier' : 'Cetak berkas kepatuhan'}</div>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Back to Simulator */}
            <button
              onClick={onBackToCandidatePortal}
              className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white font-medium text-xs transition cursor-pointer whitespace-nowrap"
            >
              ← {language === 'en' ? 'Simulator' : 'Simulator'}
            </button>
          </div>
        </div>

        {/* Title & Description with Full Width Elegance */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {language === 'en' ? 'SOP Competency Tracking & Frontline Training' : 'Pelacakan Kompetensi SOP & Pelatihan Frontline'}
          </h1>
          <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
            {language === 'en'
              ? `Operational compliance telemetry for ${activeWorkspace.nameEn} across branch outlets (sample simulation dataset).`
              : `Telemetri kepatuhan operasional untuk ${activeWorkspace.name} di seluruh cabang gerai (dataset simulasi contoh).`}
          </p>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards with Explicit Simulation Labels */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Assessed */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider">
                {language === 'en' ? 'Staff Assessed' : 'Staf Dinilai'}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase font-mono">
                {language === 'en' ? 'Sample Data' : 'Data Contoh'}
              </span>
            </div>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {analytics.overview.total_candidates_assessed}
          </div>
          <div className="text-xs text-emerald-400 flex items-center space-x-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>
              {language === 'en' ? '+18 simulations this week' : '+18 simulasi minggu ini'}
            </span>
            <span className="text-slate-400">
              {language === 'en' ? '(sample data)' : '(data contoh)'}
            </span>
          </div>
        </div>

        {/* Card 2: Overall Pass Rate */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {language === 'en' ? 'SOP Pass Rate' : 'Kelulusan SOP'}
            </span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400">
            {analytics.overview.overall_pass_rate}%
          </div>
          <div className="text-xs text-slate-400">
            {language === 'en' ? 'All-parameter passing standard' : 'Standar kelulusan seluruh parameter'} <span className="text-slate-400">{language === 'en' ? '(illustrative projection)' : '(proyeksi ilustratif)'}</span>
          </div>
        </div>

        {/* Card 3: Trainer Hours Saved */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {language === 'en' ? 'Trainer Hours Saved' : 'Waktu Trainer Dihemat'}
            </span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {analytics.overview.total_hr_hours_saved} <span className="text-sm font-normal text-slate-400">{language === 'en' ? 'hours' : 'jam'}</span>
          </div>
          <div className="text-xs text-amber-400/90 font-medium">
            {language === 'en' ? '~1.8h saved per simulation' : '~1.8 jam dihemat per simulasi'} <span className="text-slate-400">{language === 'en' ? '(illustrative projection)' : '(proyeksi ilustratif)'}</span>
          </div>
        </div>

        {/* Card 4: Dialect Support Design */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider">
                {language === 'en' ? 'Dialect Support' : 'Dukungan Dialek'}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase font-mono">
                {language === 'en' ? 'Design' : 'Desain'}
              </span>
            </div>
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-indigo-400">
            {language === 'en' ? '10 Dialects' : '10 Dialek'}
          </div>
          <div className="text-xs text-indigo-300 font-medium">
            {language === 'en' ? 'Designed for 10 Indonesian dialects' : 'Dirancang untuk 10 dialek daerah'} <span className="text-slate-400">{language === 'en' ? '(design capability)' : '(kapabilitas desain)'}</span>
          </div>
        </div>
      </div>

      {/* ENTERPRISE UNICORN MODULE: Store Mystery Shopper AI Predictor & Business ROI Engine */}
      {(() => {
        const predictedMysteryShopperScore = Math.min(99, Math.round(62 + (targetSOPCompliance - 60) * 0.95));
        const predictedNPS = Math.min(94, Math.round(35 + (targetSOPCompliance - 60) * 1.45));
        const complaintReductionPercent = Math.min(85, Math.round(15 + (targetSOPCompliance - 60) * 1.7));
        const upsellIncreasePercent = (Math.min(30, 4.2 + (targetSOPCompliance - 60) * 0.58)).toFixed(1);
        const estimatedSavingsPerMonth = Math.round(storeCount * (8200000 * (targetSOPCompliance / 100)));
        const formattedSavings = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          maximumFractionDigits: 0,
        }).format(estimatedSavingsPerMonth);

        return (
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-amber-950/20 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/90 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Enterprise Impact Engine
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Predictive Mystery Shopper Model
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                    {language === 'en'
                      ? 'Store Mystery Shopper AI Predictor & Branch ROI Calculator'
                      : 'Store Mystery Shopper AI Predictor & Kalkulator ROI Gerai'}
                  </h2>
                </div>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveRoiTab('mystery_shopper')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    activeRoiTab === 'mystery_shopper'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'en' ? 'Mystery Shopper Prediction' : 'Prediksi Mystery Shopper'}
                </button>
                <button
                  onClick={() => setActiveRoiTab('financial_roi')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    activeRoiTab === 'financial_roi'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'en' ? 'Financial ROI & Revenue' : 'ROI Finansial & Omzet'}
                </button>
                <button
                  onClick={() => setActiveRoiTab('skill_gap')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    activeRoiTab === 'skill_gap'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'en' ? 'Branch Skill Gap Map' : 'Peta Kesenjangan Gerai'}
                </button>
              </div>
            </div>

            {/* Interactive Parameter Tuning Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
              {/* Slider 1: Target SOP Compliance */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-200 flex items-center space-x-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'en' ? 'Target Frontline SOP Compliance:' : 'Target Kepatuhan SOP Frontline:'}</span>
                  </label>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {targetSOPCompliance}%
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="99"
                  step="1"
                  value={targetSOPCompliance}
                  onChange={(e) => setTargetSOPCompliance(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-850 rounded-lg"
                />
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>60% ({language === 'en' ? 'Critical' : 'Kritis'})</span>
                  <span>80% ({language === 'en' ? 'Standard' : 'Standar'})</span>
                  <span>90% (World-Class)</span>
                  <span>99% ({language === 'en' ? 'Perfect' : 'Sempurna'})</span>
                </div>
              </div>

              {/* Slider 2: Number of Stores */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-200 flex items-center space-x-1.5">
                    <Building2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>{language === 'en' ? 'Branch Outlets Network Count:' : 'Jumlah Cabang / Gerai Jaringan:'}</span>
                  </label>
                  <span className="font-mono font-bold text-sky-400 text-sm">
                    {storeCount} {language === 'en' ? 'Outlets' : 'Cabang Gerai'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={storeCount}
                  onChange={(e) => setStoreCount(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-850 rounded-lg"
                />
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>1 {language === 'en' ? 'Store' : 'Gerai'}</span>
                  <span>25 {language === 'en' ? 'Stores' : 'Gerai'}</span>
                  <span>50 {language === 'en' ? 'Stores' : 'Gerai'}</span>
                  <span>100 {language === 'en' ? 'Stores' : 'Gerai'}</span>
                </div>
              </div>
            </div>

            {/* Tab 1: Mystery Shopper Predictions */}
            {activeRoiTab === 'mystery_shopper' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in">
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                    {language === 'en' ? 'Predicted Mystery Shopper Score' : 'Prediksi Skor Mystery Shopper'}
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-black text-amber-400 font-mono">
                      {predictedMysteryShopperScore}
                    </span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {language === 'en'
                      ? 'Probability of passing unannounced third-party service audit (illustrative projection).'
                      : 'Probabilitas lulus inspeksi audit acak mendadak (proyeksi ilustratif).'}
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                    {language === 'en' ? 'Predicted Net Promoter Score (NPS)' : 'Prediksi Net Promoter Score (NPS)'}
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-black text-emerald-400 font-mono">
                      +{predictedNPS}
                    </span>
                    <span className="text-xs text-emerald-500 font-semibold">{language === 'en' ? 'Highly Satisfied' : 'Sangat Puas'}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {language === 'en'
                      ? 'Customers eager to recommend store organically to friends and social media (illustrative projection).'
                      : 'Pelanggan bersedia merekomendasikan gerai ke kerabat dan media sosial secara organik (proyeksi ilustratif).'}
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                    {language === 'en' ? 'Complaint & Escalation Reduction' : 'Penurunan Komplain & Eskalasi'}
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-black text-rose-400 font-mono">
                      -{complaintReductionPercent}%
                    </span>
                    <span className="text-xs text-rose-300 font-semibold">Incident Drop</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {language === 'en'
                      ? 'Prevention of wasted operational hours from customer disputes and service friction (illustrative projection).'
                      : 'Pencegahan kerugian waktu operasional dari perselisihan pesanan atau emosi pelanggan di gerai (proyeksi ilustratif).'}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Financial ROI & Revenue Leakage Prevention */}
            {activeRoiTab === 'financial_roi' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in">
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                    {language === 'en' ? 'Estimated Operational Savings' : 'Estimasi Penghematan Operasional'}
                  </span>
                  <div className="text-2xl font-black text-emerald-400 font-mono truncate">
                    {formattedSavings}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {language === 'en'
                      ? `Monthly savings for ${storeCount} stores via reduced trainer overhead and ingredient waste (illustrative projection).`
                      : `Penghematan per bulan untuk ${storeCount} gerai dari efisiensi trainer fisik dan retur bahan baku (proyeksi ilustratif).`}
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                    {language === 'en' ? 'Upsell Revenue Growth Potential' : 'Potensi Peningkatan Omzet (Upsell)'}
                  </span>
                  <div className="text-3xl font-black text-amber-400 font-mono">
                    +{upsellIncreasePercent}%
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {language === 'en'
                      ? 'Increased average basket size from frontline staff proactively offering pairings and bundles (illustrative projection).'
                      : 'Kenaikan rata-rata nilai transaksi (basket size) berkat staf terlatih menawarkan menu pendamping & bundling (proyeksi ilustratif).'}
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                    {language === 'en' ? 'AI Investment Payback Period (illustrative projection)' : 'Payback Period Investasi AI (proyeksi ilustratif)'}
                  </span>
                  <div className="text-3xl font-black text-sky-400 font-mono">
                    &lt; 14 {language === 'en' ? 'Days' : 'Hari'}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {language === 'en'
                      ? 'AI subscription cost amortized within first 2 weeks by eliminating front-desk order mistakes (illustrative projection).'
                      : 'Modal langganan AI tertutup dalam 2 minggu pertama dari eliminasi kelalaian kasir (proyeksi ilustratif).'}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Regional Skill Gap Radar */}
            {activeRoiTab === 'skill_gap' && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold text-slate-300">
                    {language === 'en' ? 'Regional Skill Readiness Benchmarks' : 'Tolok Ukur Kesiapan Keterampilan Regional'}
                  </span>
                  <span className="text-[11px] font-mono text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {language === 'en' ? 'Sample Benchmark Data (Illustrative Projection)' : 'Data Contoh Tolok Ukur (Proyeksi Ilustratif)'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Jabodetabek & Jabar</span>
                      <span className="text-emerald-400 font-bold font-mono">94% {language === 'en' ? 'Ready' : 'Siap'}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '94%' }} />
                    </div>
                    <span className="text-xs text-slate-400">{language === 'en' ? 'Strength: Speed & Greeting' : 'Keunggulan: Kecepatan & Greeting'}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Jawa Tengah & DIY</span>
                      <span className="text-emerald-400 font-bold font-mono">91% {language === 'en' ? 'Ready' : 'Siap'}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '91%' }} />
                    </div>
                    <span className="text-xs text-slate-400">{language === 'en' ? 'Strength: Empathy & Politeness' : 'Keunggulan: Empati & Kesopanan'}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Jawa Timur & Bali</span>
                      <span className="text-amber-400 font-bold font-mono">86% {language === 'en' ? 'Ready' : 'Siap'}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '86%' }} />
                    </div>
                    <span className="text-xs text-slate-400">{language === 'en' ? 'Opportunity: Upselling Expansion' : 'Peluang: Peningkatan Upselling'}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">
                        {language === 'en' ? 'Outer Java (N. Sumatra, S. Sulawesi, Eastern)' : 'Luar Jawa (Sumut, Sulsel, Timur)'}
                      </span>
                      <span className="text-amber-400 font-bold font-mono">82% {language === 'en' ? 'Ready' : 'Siap'}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '82%' }} />
                    </div>
                    <span className="text-xs text-slate-400">{language === 'en' ? 'Opportunity: De-escalation Standardization' : 'Peluang: Standarisasi De-eskalasi'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Action Strategy Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-950/90 border border-amber-500/20 rounded-xl text-xs">
              <div className="flex items-center space-x-2 text-amber-300">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  <strong>{language === 'en' ? 'AI Recommendation:' : 'Rekomendasi AI:'}</strong>{' '}
                  {language === 'en'
                    ? 'Run Curveball drills 2x/week for staff with SOP scores below 85% to optimize mystery shopper audit compliance (illustrative projection).'
                    : 'Jalankan simulasi interupsi acak (*Curveball*) 2x seminggu untuk staf dengan skor SOP di bawah 85% guna mengoptimalkan kepatuhan audit mystery shopper (proyeksi ilustratif).'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTargetSOPCompliance(95);
                  setActiveRoiTab('financial_roi');
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 cursor-pointer transition flex items-center space-x-1"
              >
                <span>{language === 'en' ? 'Apply World-Class Standard Target (95%)' : 'Terapkan Target Standar Unggul (95%)'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })()}

      {/* Active SOP Assignments Summary & Quick Delegation */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>{language === 'en' ? 'Store Frontline SOP Assignments' : 'Daftar Penugasan SOP Staf Gerai'}</span>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  {assignments.length} {language === 'en' ? 'Assignments' : 'Penugasan'}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'en'
                  ? 'Track simulation completion delegated by manager/owner to frontline staff.'
                  : 'Pantau kepatuhan penyelesaian simulasi SOP yang didelegasikan manajer/owner ke masing-masing staf frontliner.'}
              </p>
            </div>
          </div>

          {onOpenAssignModal && (
            <button
              onClick={onOpenAssignModal}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer self-start sm:self-auto shadow-md shadow-amber-500/20"
            >
              <Plus className="w-3.5 h-3.5 text-slate-950" />
              <span>{language === 'en' ? 'Add New Assignment' : 'Tambah Penugasan Baru'}</span>
            </button>
          )}
        </div>

        {/* Assignments filtered by active workspace */}
        {(() => {
          const tenantAssignments = assignments.filter((a) => {
            if (activeWorkspace.department) {
              return a.department === activeWorkspace.department;
            }
            return true;
          });

          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {tenantAssignments.length === 0 ? (
                <div className="col-span-3 text-center py-6 text-xs text-slate-400 bg-slate-950/40 border border-slate-800 rounded-xl">
                  {language === 'en'
                    ? `No active assignments for ${activeWorkspace.nameEn}. Click "Assign SOP" to delegate tasks.`
                    : `Belum ada penugasan aktif untuk gerai ${activeWorkspace.name}. Klik "Tugaskan SOP" untuk mendelegasikan tugas.`}
                </div>
              ) : (
                tenantAssignments.map((rawItem) => {
                  const item = getLocalizedAssignment(rawItem, language);
                  return (
                    <div
                      key={item.id}
                      className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                              item.status === 'completed'
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                                : 'bg-amber-950/80 text-amber-300 border-amber-800'
                            }`}
                          >
                            {item.status === 'completed'
                              ? (language === 'en' ? 'Completed' : 'Selesai')
                              : (language === 'en' ? 'Pending Roleplay' : 'Menunggu Latihan')}
                          </span>
                          <span className="text-xs text-slate-400 font-mono flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>{item.deadline}</span>
                          </span>
                        </div>
                        <div className="text-xs font-bold text-white line-clamp-1">
                          {item.scenario_title}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center space-x-1">
                          <UserCheck className="w-3 h-3 text-slate-400" />
                          <span className="truncate">{item.assigned_to_name}</span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 bg-slate-900/80 p-2 rounded border border-slate-800 line-clamp-2">
                        {item.notes}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          );
        })()}
      </div>

      {/* Main Grid: Branch Benchmarking & Parameter Defect Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Store Branch Performance Table */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>{language === 'en' ? 'Store Branch Competency Benchmark' : 'Tolok Ukur Kompetensi Gerai Cabang'}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {language === 'en' ? 'Sample Data' : 'Data Contoh'}
                </span>
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400">{language === 'en' ? 'Filter Location:' : 'Filter Lokasi:'}</span>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:border-amber-500 shadow-xs"
              >
                <option value="all">
                  {language === 'en' ? `All Branch Outlets (${analytics.branches.length})` : `Semua Cabang Gerai (${analytics.branches.length})`}
                </option>
                {analytics.branches.map((b) => (
                  <option key={b.branch_id} value={b.branch_id}>
                    {b.branch_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/60 text-slate-400 uppercase tracking-wider text-xs border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">{language === 'en' ? 'Branch & City' : 'Cabang & Lokasi'}</th>
                  <th className="py-3 px-3 text-center">{language === 'en' ? 'Assessments' : 'Penilaian'}</th>
                  <th className="py-3 px-3 text-center">{language === 'en' ? 'Pass Rate' : 'Tingkat Lulus'}</th>
                  <th className="py-3 px-3 text-center">{language === 'en' ? 'Avg Score' : 'Nilai Rata-rata'}</th>
                  <th className="py-3 px-3">{language === 'en' ? 'Primary SOP Risk' : 'Risiko SOP Utama'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredBranches.map((branch) => (
                  <tr key={branch.branch_id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white text-sm">{branch.branch_name}</div>
                      <div className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{branch.city}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-medium text-slate-200">
                      {branch.total_assessments}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-xs ${
                          branch.pass_rate >= 80
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-950/60 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {branch.pass_rate}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-100 font-mono">
                      {branch.avg_score} / 100
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-xs text-rose-300 bg-rose-950/50 border border-rose-800/60 px-2 py-0.5 rounded font-medium">
                        {branch.top_risk_parameter}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Parameter Defect Heatmap */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-rose-400" />
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>{language === 'en' ? 'SOP Deficit Heatmap' : 'Peta Panas Defisit SOP'}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {language === 'en' ? 'Sample Data' : 'Data Contoh'}
                </span>
              </h2>
            </div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">
              {language === 'en' ? '% Deficit' : '% Defisit'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'en'
              ? 'Highlights rubric parameters with highest error rates to target corrective training effectively.'
              : 'Menyoroti parameter rubrik dengan tingkat kekeliruan staf tertinggi untuk mengarahkan intervensi pelatihan yang tepat sasaran.'}
          </p>

          <div className="space-y-3 pt-1">
            {analytics.parameter_defect_heatmap.map((item) => (
              <div
                key={item.parameter_id}
                className="bg-slate-800/50 border border-slate-800 rounded-xl p-3 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-semibold text-white block text-xs">
                      {item.parameter_name}
                    </span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <span
                    className={`font-bold font-mono px-2 py-0.5 rounded text-xs shrink-0 ${
                      item.failure_percentage > 25
                        ? 'bg-rose-950/60 text-rose-300 border border-rose-800'
                        : item.failure_percentage > 15
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {item.failure_percentage}% {language === 'en' ? 'failure rate' : 'tingkat kegagalan'}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.failure_percentage > 25
                        ? 'bg-rose-500'
                        : item.failure_percentage > 15
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${item.failure_percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Label Proyeksi Berbasis Asumsi */}
      <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
        {language === 'en' ? 'Assumption-based projection, not yet a field pilot result.' : 'Proyeksi berbasis asumsi, belum merupakan hasil uji coba lapangan.'}
      </div>

      {/* 99/100 BENCHMARK: Skenario Proyeksi Pilot 14 Hari */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/30 border border-amber-500/40 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider font-mono">
                {language === 'en' ? 'Projected Pilot Case • Score 99/100 (Sample Data)' : 'Model Proyeksi Kasus Pilot • Skor 99/100 (Data Contoh)'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                {language === 'en' ? 'Projected 14-Day Pilot Scenario' : 'Skenario Proyeksi Pilot 14 Hari'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>{language === 'en' ? 'Pilot Projection Model: 3 Sample Outlets (42 Frontliners)' : 'Model Proyeksi Kasus Uji Coba: 3 Gerai Contoh (42 Frontliner)'}</span>
              <span className="text-xs text-slate-400 font-normal">{language === 'en' ? '(illustrative projection)' : '(proyeksi ilustratif)'}</span>
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl">
              {language === 'en'
                ? 'Projected 14-day validation case study across 3 sample stores (Sample Store A, Sample Store B, Sample Store C) projects direct commercial impact before vs after Vokasta implementation (illustrative projection).'
                : 'Studi kasus proyeksi 14 hari pada 3 gerai contoh (Gerai Contoh A, Gerai Contoh B, Gerai Contoh C) memproyeksikan dampak bisnis langsung sebelum vs sesudah implementasi simulasi Vokasta (proyeksi ilustratif).'}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              id="view-whitepaper-btn"
              onClick={() => setShowWhitepaperModal(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{language === 'en' ? 'Executive Board Summary' : 'Ringkasan Eksekutif Direksi'}</span>
            </button>
          </div>
        </div>

        {/* 4 Core Empirical KPI Impact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{language === 'en' ? 'SOP Procedural Compliance' : 'Kepatuhan Prosedur SOP'}</span>
              <span className="text-emerald-400 font-bold text-xs">+26%</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-white font-mono">94%</span>
              <span className="text-xs text-slate-400">{language === 'en' ? 'from 68%' : 'dari 68%'}</span>
            </div>
            <p className="text-xs text-slate-300 pt-1 border-t border-slate-800/80">
              {language === 'en' ? 'Frontliners consistently execute greeting, verification, and closing (illustrative projection).' : 'Frontliner konsisten salam, verifikasi, dan penutup tanpa terlewat (proyeksi ilustratif).'}
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{language === 'en' ? 'Mystery Shopper Score' : 'Skor Mystery Shopper'}</span>
              <span className="text-emerald-400 font-bold text-xs">+41%</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-amber-400 font-mono">92/100</span>
              <span className="text-xs text-slate-400">{language === 'en' ? 'from 65/100' : 'dari 65/100'}</span>
            </div>
            <p className="text-xs text-slate-300 pt-1 border-t border-slate-800/80">
              {language === 'en' ? 'Independent third-party audit projected significantly higher hospitality (illustrative projection).' : 'Audit pihak ketiga independen diproyeksikan mencatat keramahan naik signifikan (proyeksi ilustratif).'}
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{language === 'en' ? 'Service Complaint Incidents' : 'Insiden Komplain Layanan'}</span>
              <span className="text-emerald-400 font-bold text-xs">{language === 'en' ? '-79% Reduction' : '-79% Reduksi'}</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-rose-400 font-mono">1.1%</span>
              <span className="text-xs text-slate-400">{language === 'en' ? 'from 5.2%' : 'dari 5.2%'}</span>
            </div>
            <p className="text-xs text-slate-300 pt-1 border-t border-slate-800/80">
              {language === 'en' ? 'Drop in portion errors and service friction complaints (illustrative projection).' : 'Penurunan drastis komplain salah takaran & nada bicara ketus (proyeksi ilustratif).'}
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{language === 'en' ? 'Bundling Upsell Conversion' : 'Konversi Upsell Bundling'}</span>
              <span className="text-emerald-400 font-bold text-xs">{language === 'en' ? '+157% Revenue' : '+157% Omzet'}</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-emerald-400 font-mono">21.6%</span>
              <span className="text-xs text-slate-400">{language === 'en' ? 'from 8.4%' : 'dari 8.4%'}</span>
            </div>
            <p className="text-xs text-slate-300 pt-1 border-t border-slate-800/80">
              {language === 'en' ? 'Average order value (AOV) increased by IDR 14,500 per receipt (illustrative projection).' : 'Peningkatan rata-rata transaksi tiket (AOV) Rp 14.500 per struk (proyeksi ilustratif).'}
            </p>
          </div>
        </div>

        {/* Footnote of Methodology */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{language === 'en' ? 'Methodology: Simulated Frontline Benchmark Model & Rubric Evaluation Projections' : 'Metodologi: Model Tolok Ukur Simulasi Frontline & Proyeksi Evaluasi Rubrik'}</span>
          </div>
          <span className="font-mono text-slate-500">Benchmark Model VK-2026 • Calibrated Simulation Engine</span>
        </div>
      </div>

      {/* Executive Whitepaper Modal for Directors & Investors */}
      {showWhitepaperModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider font-mono">
                  {language === 'en' ? 'Executive & Investor Brief (Simulation Model)' : 'Dokumen Eksekutif & Investor (Model Simulasi)'}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {language === 'en' ? 'Whitepaper: Projected Model of Vokasta Training Impact' : 'Whitepaper: Model Proyeksi Dampak Pelatihan Vokasta'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'en' ? 'Projected Simulation Model (Illustrative Benchmark Q3 2026)' : 'Model Simulasi & Estimasi Proyeksi 14 Hari (Data Contoh Ilustratif Q3 2026)'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowWhitepaperModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400 text-sm">
                  {language === 'en' ? '1. Methodology & Benchmark Model' : '1. Metodologi & Model Tolok Ukur Simulasi'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'Interactive training evaluation benchmarked against standard frontline operating conditions. Traditional face-to-face onboarding typically costs IDR 1,500,000 - 2,000,000 per staff in supervisor shadowing hours over a 14-day training period. Vokasta provides automated asynchronous rubric evaluation with real-time feedback (illustrative simulation baseline).'
                    : 'Tolok ukur evaluasi pelatihan interaktif berbasis skenario operasional terstandarisasi. Pelatihan konvensional tatap muka umumnya membebani jam kerja supervisor senilai Rp1.500.000 - Rp2.000.000 per kandidat selama masa training 14 hari. Vokasta menghadirkan evaluasi rubrik otomatis asinkron dengan umpan balik terstruktur secara langsung (basis model simulasi ilustratif).'}
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-emerald-400 text-sm">
                  {language === 'en' ? '2. Core Quantitative Projections' : '2. Proyeksi Kuantitatif Model'}
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-slate-300">
                  <li><strong>{language === 'en' ? 'Procedural SOP Compliance:' : 'Kepatuhan SOP Prosedural:'}</strong> {language === 'en' ? 'Projected increase from 68% to 94% (+26% absolute gain) (illustrative projection).' : 'Proyeksi kenaikan dari 68% menjadi 94% (+26% absolut) (proyeksi ilustratif).'}</li>
                  <li><strong>{language === 'en' ? 'Independent Mystery Shopper Score:' : 'Skor Mystery Shopper Independen:'}</strong> {language === 'en' ? 'Projected rise from 65/100 to 92/100 (+41%) (illustrative projection).' : 'Proyeksi kenaikan dari 65/100 menjadi 92/100 (+41%) (proyeksi ilustratif).'}</li>
                  <li><strong>{language === 'en' ? 'Service Complaint Incidents:' : 'Insiden Komplain Layanan:'}</strong> {language === 'en' ? 'Projected drop from 5.2% to 1.1% of transactions (-79% reduction) (illustrative projection).' : 'Proyeksi penurunan dari 5.2% transaksi menjadi 1.1% (-79% reduksi) (proyeksi ilustratif).'}</li>
                  <li><strong>{language === 'en' ? 'Bundling Upsell Conversion:' : 'Konversi Upsell Bundling:'}</strong> {language === 'en' ? 'Projected increase from 8.4% to 21.6%, generating an estimated IDR 38,000,000 gross margin per outlet monthly (illustrative projection).' : 'Proyeksi kenaikan dari 8.4% ke 21.6%, estimasi tambahan laba kotor rata-rata Rp38.000.000 per gerai per bulan (proyeksi ilustratif).'}</li>
                </ul>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-sky-400 text-sm">
                  {language === 'en' ? '3. Strategic Business Conclusion' : '3. Kesimpulan & Rekomendasi Skala Usaha'}
                </h4>
                <p>
                  {language === 'en'
                    ? 'Vokasta shortens new staff onboarding from 14 days down to 3 self-paced days without overburdening store managers. Estimated investment payback period is reached within 18 operational days (illustrative projection).'
                    : 'Vokasta memangkas waktu sertifikasi staf baru dari 14 hari menjadi 3 hari mandiri tanpa membebani jam kerja store manager. Estimasi pengembalian modal (Payback Period) tercapai dalam waktu 18 hari operasi gerai (proyeksi ilustratif).'}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {language === 'en' ? 'Authored by: Sujarwadi, Founder & Lead Architect, Vokasta' : 'Disusun oleh: Sujarwadi, Founder & Lead Architect, Vokasta'}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Print Dossier' : 'Cetak Dossier'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowWhitepaperModal(false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  {language === 'en' ? 'Close' : 'Tutup'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Anti-Bias & W3C Verifiable Credentials Audit Statement */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">
              {language === 'en'
                ? 'Dialect Support (Design) & 10 Regional Profiles (Responsible AI)'
                : 'Dukungan Dialek (Desain) & 10 Profil Daerah (Responsible AI)'}
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              {language === 'en'
                ? 'Vokasta applies Responsible AI design principles across 10 Indonesian dialects. Evaluation is guided by procedural SOP accuracy and observable behavioral execution, focusing on core communication intent rather than regional accents (design capability, not validated).'
                : 'Vokasta menerapkan prinsip desain Responsible AI untuk 10 dialek Nusantara. Evaluasi dipandu oleh presisi SOP prosedural dan tindakan fisik teramati, berfokus pada pesan inti komunikasi ketimbang aksen kedaerahan (kapabilitas desain, belum divalidasi).'}
            </p>
          </div>
        </div>
        <div className="shrink-0 bg-slate-850 border border-slate-700 px-4 py-2 rounded-xl text-center shadow-xs">
          <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">
            {language === 'en' ? 'Design Standard' : 'Standar Desain'}
          </span>
          <span className="text-xs font-bold text-emerald-400 font-mono">
            {language === 'en' ? '10 DIALECTS ACTIVE' : '10 DIALEK AKTIF'}
          </span>
        </div>
      </div>
    </div>
  );
};
