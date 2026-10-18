import React, { useState, useRef, useEffect } from 'react';
import {
  Award,
  ShieldCheck,
  Sparkles,
  BarChart3,
  BookOpen,
  Activity,
  X,
  User,
  FileText,
  Sun,
  Moon,
  LogOut,
  QrCode,
  TrendingUp,
  Globe,
  Download,
  ChevronDown,
  Check,
  Loader2,
  Coffee,
  ShoppingBag,
  Car,
} from 'lucide-react';
import { NetworkResilienceProfile, UserRole, isJobseekerRole } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useWorkspace } from '../context/WorkspaceContext';

interface HeaderProps {
  currentStep: 1 | 2 | 3 | 4;
  onReset: () => void;
  activeTab: 'assessment' | 'manager';
  onSwitchTab: (tab: 'assessment' | 'manager') => void;
  onOpenSOPStudio: () => void;
  onOpenPassport?: () => void;
  onOpenDemoVideo?: () => void;
  onOpenCTOConsole?: () => void;
  onOpenVerification?: () => void;
  onOpenInvestorROI?: () => void;
  onOpenStagePitch?: () => void;
  onOpenProposal?: () => void;
  onOpenDownloadHub?: () => void;
  enableDownloadHub?: boolean;
  activeResilienceProfile?: NetworkResilienceProfile;
  userRole?: UserRole;
  onSwitchRole?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onReset,
  activeTab,
  onSwitchTab,
  onOpenSOPStudio,
  onOpenPassport,
  onOpenDemoVideo,
  onOpenCTOConsole,
  onOpenVerification,
  onOpenInvestorROI,
  onOpenStagePitch,
  onOpenProposal,
  onOpenDownloadHub,
  enableDownloadHub = false,
  activeResilienceProfile = '5g_hq',
  userRole = 'pencari_kerja',
  onSwitchRole,
  theme = 'dark',
  onToggleTheme,
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { activeWorkspace, setWorkspaceId, workspaces } = useWorkspace();
  const [isJuryMenuOpen, setIsJuryMenuOpen] = useState(false);
  const [isApiTestOpen, setIsApiTestOpen] = useState(false);
  const [apiTestLoading, setApiTestLoading] = useState(false);
  const [apiTestData, setApiTestData] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsJuryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleLabel = () => {
    if (isJobseekerRole(userRole)) {
      return language === 'en' ? 'Pencari Kerja' : 'Pencari Kerja';
    }
    if (userRole === 'staff') {
      return language === 'en' ? 'Staf Gerai' : 'Staf Gerai';
    }
    return language === 'en' ? 'Manajer Gerai' : 'Manajer Gerai';
  };

  const getWorkspaceIcon = (iconName: string) => {
    switch (iconName) {
      case 'shopping-bag':
        return <ShoppingBag className="w-3.5 h-3.5" />;
      case 'car':
        return <Car className="w-3.5 h-3.5" />;
      case 'coffee':
      default:
        return <Coffee className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <header className="bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-2.5 sm:px-6 py-2.5 flex flex-wrap md:flex-nowrap items-center justify-between gap-2 sm:gap-3">
        {/* Brand & Identity */}
        <div
          className="flex items-center space-x-3 cursor-pointer select-none shrink-0"
          onClick={onReset}
          id="brand-logo-button"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 font-black">
            <Award className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                Vokasta
              </span>
              {(userRole === 'staff' || userRole === 'manager') && (
                <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {getWorkspaceIcon(activeWorkspace.iconName)}
                  <span className="truncate max-w-[130px]">{activeWorkspace.name}</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-normal hidden sm:block">
              {t.header.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Primary Controls & Navigation Bar */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Tab 1: Roleplay Assessment (Candidate & Staff) */}
          {(isJobseekerRole(userRole) || userRole === 'staff') && (
            <button
              id="nav-roleplay-tab-btn"
              onClick={() => onSwitchTab('assessment')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer active:scale-[0.98] border shadow-xs ${
                activeTab === 'assessment'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <Sparkles
                className={`w-3.5 h-3.5 ${
                  activeTab === 'assessment' ? 'text-slate-950' : 'text-amber-400'
                }`}
              />
              <span className="hidden sm:inline">{t.header.tabAssessment}</span>
              <span className="sm:hidden">{language === 'en' ? 'Simulator' : 'Simulator'}</span>
            </button>
          )}

          {/* Tab 2: Store Operations (Manager) */}
          {userRole === 'manager' && (
            <button
              id="toggle-manager-portal-btn"
              onClick={() => onSwitchTab('manager')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer active:scale-[0.98] border shadow-xs ${
                activeTab === 'manager'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <BarChart3
                className={`w-3.5 h-3.5 ${
                  activeTab === 'manager' ? 'text-slate-950' : 'text-amber-400'
                }`}
              />
              <span>{t.header.tabManager}</span>
            </button>
          )}

          {/* Tab 3: SOP Studio (Manager) */}
          {userRole === 'manager' && (
            <button
              id="open-sop-studio-btn"
              onClick={onOpenSOPStudio}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-slate-300 hover:text-white border border-slate-800 hover:border-amber-500/50 text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
              title={
                language === 'en'
                  ? 'Import custom SOP and author evaluation rubrics'
                  : 'Impor SOP merek kustom dan susun rubrik evaluasi'
              }
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.header.btnSop}</span>
            </button>
          )}

          {/* Worker Passport Quick Access (Candidate & Staff) */}
          {onOpenPassport && (isJobseekerRole(userRole) || userRole === 'staff') && (
            <button
              id="open-worker-passport-btn"
              onClick={onOpenPassport}
              aria-label={t.header.btnPassport}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-slate-300 hover:text-white border border-slate-800 hover:border-amber-500/40 text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
              title={
                language === 'en'
                  ? 'View your credential passport'
                  : 'Lihat paspor kredensial Anda'
              }
            >
              <User className="w-3.5 h-3.5 text-amber-400 hidden sm:block" />
              <span className="hidden sm:inline">{t.header.btnPassport}</span>
              <span className="sm:hidden">{language === 'en' ? 'Passport' : 'Paspor'}</span>
            </button>
          )}

          {/* Consolidated Executive Jury Hub & Documents Menu */}
          {enableDownloadHub && (
            <div className="relative" ref={dropdownRef}>
              <button
                id="header-jury-hub-btn"
              onClick={() => setIsJuryMenuOpen(!isJuryMenuOpen)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer border shadow-xs ${
                isJuryMenuOpen
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
              title={
                language === 'en'
                  ? 'Jury Hub, Pitch & Documents'
                  : 'Menu Berkas Juri, Pitching & Sumber Daya'
              }
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'en' ? 'Jury & Docs' : 'Berkas & Juri'}</span>
              <ChevronDown
                className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${
                  isJuryMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isJuryMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl z-50 p-2 backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-150 space-y-1">
                <div className="px-2.5 py-1.5 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>
                      {language === 'en'
                        ? 'Competition & Jury Hub'
                        : 'Hub Evaluasi & Berkas Juri'}
                    </span>
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    v2.4
                  </span>
                </div>

                {/* Pitch 60s */}
                {onOpenStagePitch && (
                  <button
                    onClick={() => {
                      setIsJuryMenuOpen(false);
                      onOpenStagePitch();
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-800 flex items-center space-x-2.5 text-xs text-indigo-300 hover:text-indigo-200 transition cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white">
                        {language === 'en'
                          ? '60s Jury Stage Pitch'
                          : 'Demo Panggung 60 Detik'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {language === 'en'
                          ? 'Express competition walkthrough'
                          : 'Alur kilat presentasi juri'}
                      </div>
                    </div>
                  </button>
                )}

                {/* Strategic Proposal */}
                {onOpenProposal && (
                  <button
                    onClick={() => {
                      setIsJuryMenuOpen(false);
                      onOpenProposal();
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-800 flex items-center space-x-2.5 text-xs text-blue-300 hover:text-blue-200 transition cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white">
                        {language === 'en'
                          ? 'Strategic Proposal & Blueprint'
                          : 'Proposal Strategis & Cetak Biru'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {language === 'en'
                          ? 'Full business dossier & architecture'
                          : 'Dokumen visi & model bisnis'}
                      </div>
                    </div>
                  </button>
                )}

                {/* ROI Calculator */}
                {onOpenInvestorROI && (
                  <button
                    onClick={() => {
                      setIsJuryMenuOpen(false);
                      onOpenInvestorROI();
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-800 flex items-center space-x-2.5 text-xs text-amber-300 hover:text-amber-200 transition cursor-pointer"
                  >
                    <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white">
                        {language === 'en'
                          ? 'Enterprise ROI Calculator'
                          : 'Kalkulator ROI Finansial'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {language === 'en'
                          ? 'Cost savings & unit economics'
                          : 'Simulasi efisiensi biaya gerai'}
                      </div>
                    </div>
                  </button>
                )}

                {/* QR Code Credential Schema Inspection */}
                {onOpenVerification && (
                  <button
                    onClick={() => {
                      setIsJuryMenuOpen(false);
                      onOpenVerification();
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-800 flex items-center space-x-2.5 text-xs text-emerald-300 hover:text-emerald-200 transition cursor-pointer"
                  >
                    <QrCode className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white">
                        {language === 'en'
                          ? 'W3C QR Credential Schema'
                          : 'Cek Skema Kredensial (W3C QR)'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {language === 'en'
                          ? 'Inspect credential schema & format (sample)'
                          : 'Inspeksi format skema kredensial (data contoh)'}
                      </div>
                    </div>
                  </button>
                )}

                {/* Download Hub */}
                {onOpenDownloadHub && (
                  <button
                    onClick={() => {
                      setIsJuryMenuOpen(false);
                      onOpenDownloadHub();
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-800 flex items-center space-x-2.5 text-xs text-emerald-300 hover:text-emerald-200 transition cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white">
                        {language === 'en'
                          ? 'Submission Download Hub'
                          : 'Pusat Unduhan Berkas Submisi'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {language === 'en'
                          ? 'PPTX decks, dossiers & documents'
                          : 'Unduh slide presentasi & berkas'}
                      </div>
                    </div>
                  </button>
                )}

                {/* Industry Ecosystem Switcher for Judges */}
                <div className="pt-1.5 border-t border-slate-800">
                  <div className="px-2.5 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {language === 'en'
                      ? 'Simulate Other Industries'
                      : 'Simulasi Industri Lain'}
                  </div>
                  {workspaces.map((ws) => (
                    <button
                      key={ws.id}
                      onClick={() => {
                        setWorkspaceId(ws.id);
                        setIsJuryMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs transition cursor-pointer ${
                        ws.id === activeWorkspace.id
                          ? 'bg-amber-500/20 text-amber-300 font-bold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate">{ws.name}</span>
                      {ws.id === activeWorkspace.id && (
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          )}

          {/* Language Toggle */}
          <button
            id="header-lang-toggle-btn"
            onClick={toggleLanguage}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold transition cursor-pointer shadow-xs active:scale-95"
            title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400 hidden sm:block" />
            <span
              className={
                language === 'id' ? 'text-amber-400 font-extrabold' : 'text-slate-400'
              }
            >
              ID
            </span>
            <span className="text-slate-600">|</span>
            <span
              className={
                language === 'en' ? 'text-amber-400 font-extrabold' : 'text-slate-400'
              }
            >
              EN
            </span>
          </button>

          {/* Theme Toggle */}
          {onToggleTheme && (
            <button
              id="header-theme-toggle-btn"
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 text-xs transition cursor-pointer active:scale-95"
              title={theme === 'dark' ? t.header.themeLight : t.header.themeDark}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-300" />
              )}
            </button>
          )}

          {/* Active Role Pill & Switch Role Button */}
          {onSwitchRole && (
            <button
              id="switch-role-btn"
              onClick={onSwitchRole}
              aria-label={getRoleLabel()}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer shadow-xs active:scale-95 ${
                isJobseekerRole(userRole)
                  ? 'bg-emerald-950/70 border-emerald-700/80 text-emerald-300 hover:bg-emerald-900'
                  : userRole === 'staff'
                  ? 'bg-amber-950/70 border-amber-700/80 text-amber-300 hover:bg-amber-900'
                  : 'bg-indigo-950/70 border-indigo-700/80 text-indigo-300 hover:bg-indigo-900'
              }`}
              title={`${
                language === 'en' ? 'Current role' : 'Peran saat ini'
              }: ${getRoleLabel()}. ${
                language === 'en' ? 'Click to switch role' : 'Klik untuk beralih peran'
              }.`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isJobseekerRole(userRole)
                    ? 'bg-emerald-400'
                    : userRole === 'staff'
                    ? 'bg-amber-400'
                    : 'bg-indigo-400'
                }`}
              />
              <span className="text-xs font-bold whitespace-nowrap hidden sm:inline">
                {getRoleLabel()}
              </span>
              <LogOut className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
