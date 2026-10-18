import React, { useState } from 'react';
import {
  UserCheck,
  Users,
  ShieldCheck,
  Sun,
  Moon,
  Sparkles,
  ArrowRight,
  Award,
  CheckCircle,
  Zap,
  TrendingUp,
  Calculator,
  Cpu,
  QrCode,
  FileText,
  Globe,
  Download,
  ChevronDown
} from 'lucide-react';
import { UserRole } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface LoginScreenProps {
  onSelectRole: (role: UserRole) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenStagePitch?: () => void;
  onOpenCompetencyDelta?: () => void;
  onOpenInvestorROI?: () => void;
  onOpenCTOConsole?: () => void;
  onOpenVerification?: () => void;
  onOpenProposal?: () => void;
  onOpenDownloadHub?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSelectRole,
  theme,
  onToggleTheme,
  onOpenStagePitch,
  onOpenCompetencyDelta,
  onOpenInvestorROI,
  onOpenCTOConsole,
  onOpenVerification,
  onOpenProposal,
  onOpenDownloadHub,
}) => {
  const isDark = theme === 'dark';
  const { language, toggleLanguage, t } = useLanguage();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-200 overflow-x-hidden ${
      isDark ? 'bg-[#080d1a] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Bar with Language and Theme Toggle */}
      <header className={`px-2.5 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between border-b ${
        isDark ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-200 bg-white/80'
      } backdrop-blur-md sticky top-0 z-10`}>
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/20 shrink-0">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
          </div>
          <div className="flex items-center space-x-1.5 truncate">
            <span className={`font-extrabold text-base sm:text-lg tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Vokasta
            </span>
            <span className={`hidden xs:inline-block text-[11px] px-2 py-0.5 rounded-full font-medium ${
              isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
            }`}>
              {t.common.portalMasuk}
            </span>
          </div>
        </div>

        {/* Header Controls: Language Switcher & Theme Toggle */}
        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
          {/* Language Toggle Button */}
          <button
            id="login-toggle-language-btn"
            onClick={toggleLanguage}
            className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer active:scale-95 ${
              isDark
                ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200'
                : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-800 shadow-xs'
            }`}
            title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className={language === 'id' ? 'text-amber-400 font-extrabold' : 'text-slate-400'}>ID</span>
            <span className="text-slate-500">|</span>
            <span className={language === 'en' ? 'text-amber-400 font-extrabold' : 'text-slate-400'}>EN</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            id="toggle-theme-btn"
            onClick={onToggleTheme}
            className={`flex items-center justify-center p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer active:scale-95 ${
              isDark
                ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-amber-300'
                : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-800 shadow-xs'
            }`}
            title={isDark ? t.header.themeLight : t.header.themeDark}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="hidden sm:inline ml-1.5">{language === 'en' ? 'Light' : 'Tema Terang'}</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-600 shrink-0" />
                <span className="hidden sm:inline ml-1.5">{language === 'en' ? 'Dark' : 'Tema Gelap'}</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content: Role Selection */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 my-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.login.portalBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.login.title}
          </h1>
          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {t.login.description}
          </p>
        </div>

        {/* PRIMARY ROLE: Pencari Kerja Mandiri (Aksi Utama Menonjol) */}
        <div
          id="role-card-independent-jobseeker"
          onClick={() => onSelectRole('pencari_kerja')}
          className={`rounded-2xl p-6 sm:p-8 border-2 transition-all duration-200 cursor-pointer shadow-xl ${
            isDark
              ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border-emerald-500/70 hover:border-emerald-400 hover:shadow-emerald-950/50'
              : 'bg-gradient-to-br from-white via-white to-emerald-50/50 border-emerald-500 hover:border-emerald-600 hover:shadow-emerald-500/20'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {t.login.jobseekerBadge}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold mt-1 text-white dark:text-white">
                    {t.login.jobseekerTitle}
                  </h2>
                </div>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.login.jobseekerDesc}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-300 pt-1">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{t.login.jobseekerB1}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{t.login.jobseekerB2}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{t.login.jobseekerB3}</span>
                </span>
              </div>
            </div>

            <button
              type="button"
              className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-extrabold flex items-center justify-center space-x-2 transition shadow-lg shadow-emerald-600/30 cursor-pointer shrink-0 self-stretch md:self-center"
            >
              <span>{t.login.jobseekerBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SECONDARY ROLES (Lebih kecil dan di bawah) */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-center text-slate-400 uppercase tracking-wider">
            {language === 'en' ? 'Or enter with partner store credentials:' : 'Atau masuk dengan peran mitra gerai:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {/* Role 2: Staff */}
            <div
              id="role-card-staff"
              onClick={() => onSelectRole('staff')}
              className={`rounded-xl p-4 border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 hover:scale-[1.01] ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/60'
                  : 'bg-white border-slate-200 hover:border-amber-500 shadow-xs'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                    {t.login.staffBadge}
                  </span>
                  <h3 className="text-sm font-bold text-white truncate mt-0.5">
                    {t.login.staffTitle}
                  </h3>
                  <p className="text-xs text-slate-400 leading-snug">
                    {t.login.staffDesc}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
            </div>

            {/* Role 3: Manajer */}
            <div
              id="role-card-manager-owner"
              onClick={() => onSelectRole('manager')}
              className={`rounded-xl p-4 border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 hover:scale-[1.01] ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 hover:border-indigo-500/60'
                  : 'bg-white border-slate-200 hover:border-indigo-500 shadow-xs'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                    {t.login.managerBadge}
                  </span>
                  <h3 className="text-sm font-bold text-white truncate mt-0.5">
                    {t.login.managerTitle}
                  </h3>
                  <p className="text-xs text-slate-400 leading-snug">
                    {t.login.managerDesc}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Quick Tools & Resources Menu (Tertutup secara bawaan) */}
        {(onOpenStagePitch || onOpenCompetencyDelta || onOpenInvestorROI || onOpenCTOConsole || onOpenVerification || onOpenProposal || onOpenDownloadHub) && (
          <div className="pt-2 text-center">
            <button
              type="button"
              id="toggle-more-menu-btn"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 shadow-xs'
              }`}
            >
              <span>{language === 'en' ? 'More Tools & Resources' : 'Lainnya'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMoreMenuOpen && (
              <div className={`mt-3 p-3 rounded-xl border flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
                {onOpenStagePitch && (
                  <button
                    type="button"
                    onClick={onOpenStagePitch}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-500 dark:text-amber-400 text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />
                    <span>{t.login.quickPitch}</span>
                  </button>
                )}
                {onOpenCompetencyDelta && (
                  <button
                    type="button"
                    onClick={onOpenCompetencyDelta}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center space-x-1 cursor-pointer ${
                      isDark
                        ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-xs'
                    }`}
                  >
                    <TrendingUp className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
                    <span>{t.login.quickDelta}</span>
                  </button>
                )}
                {onOpenInvestorROI && (
                  <button
                    type="button"
                    onClick={onOpenInvestorROI}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center space-x-1 cursor-pointer ${
                      isDark
                        ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-xs'
                    }`}
                  >
                    <Calculator className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                    <span>{t.login.quickRoi}</span>
                  </button>
                )}
                {onOpenCTOConsole && (
                  <button
                    type="button"
                    onClick={onOpenCTOConsole}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center space-x-1 cursor-pointer ${
                      isDark
                        ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-xs'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                    <span>{t.login.quickCto}</span>
                  </button>
                )}
                {onOpenVerification && (
                  <button
                    type="button"
                    onClick={onOpenVerification}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center space-x-1 cursor-pointer ${
                      isDark
                        ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-xs'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span>{t.login.quickQr}</span>
                  </button>
                )}
                {onOpenProposal && (
                  <button
                    type="button"
                    onClick={onOpenProposal}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition flex items-center space-x-1 cursor-pointer ${
                      isDark
                        ? 'bg-blue-950/70 hover:bg-blue-900 border-blue-800/80 text-blue-300'
                        : 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                    <span>{t.login.quickProposal}</span>
                  </button>
                )}
                {onOpenDownloadHub && (
                  <button
                    type="button"
                    onClick={onOpenDownloadHub}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition flex items-center space-x-1 cursor-pointer animate-pulse ${
                      isDark
                        ? 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-700/80 text-emerald-300'
                        : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-700 shadow-xs'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span>{language === 'en' ? 'Download All Files & Decks' : 'Unduh Semua Berkas & Deck'}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer info */}
      <footer className={`py-4 text-center text-xs border-t ${
        isDark ? 'border-slate-800/60 text-slate-500' : 'border-slate-200 text-slate-500'
      }`}>
        <p>{t.login.footerTagline}</p>
      </footer>
    </div>
  );
};
