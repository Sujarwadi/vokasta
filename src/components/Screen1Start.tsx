import React, { useState } from 'react';
import {
  Sparkles,
  Star,
  Dices,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Coffee,
  HeartHandshake,
  BookOpen,
  ShoppingBag,
  Car,
  Home,
  Store,
  Briefcase,
  Target,
  Award,
  Layers,
  Filter,
  CheckCircle2,
  Calendar,
  Clock,
  RefreshCw,
  Download,
  ChevronDown,
  Mic,
  Video,
} from 'lucide-react';
import { getInteractionMode } from '../data/interactionMode';
import { Scenario, AssessmentSession, UserRole, SOPAssignment, isJobseekerRole } from '../types';
import { SCENARIOS } from '../data/scenarios';
import { StaffAssignmentList } from './StaffAssignmentList';
import { STAFF_PROFILES, getLocalizedStaffProfile } from '../data/assignments';
import { useLanguage } from '../i18n/LanguageContext';
import { getLocalizedScenario } from '../i18n/scenarioTranslations';
import { GetStartedGuide } from './GetStartedGuide';
import { useWorkspace } from '../context/WorkspaceContext';

interface Screen1StartProps {
  onSessionStarted: (session: AssessmentSession) => void;
  isLoading: boolean;
  userRole?: UserRole;
  assignments?: SOPAssignment[];
  onCompleteAssignment?: (assignmentId: string) => void;
}

export const Screen1Start: React.FC<Screen1StartProps> = ({
  onSessionStarted,
  isLoading,
  userRole = 'pencari_kerja',
  assignments = [],
  onCompleteAssignment,
}) => {
  const { language, t } = useLanguage();
  const { activeWorkspace } = useWorkspace();
  const isCandidate = isJobseekerRole(userRole);
  const isStaff = userRole === 'staff';
  const isManager = userRole === 'manager';

  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [lastRandomScenario, setLastRandomScenario] = useState<Scenario | null>(null);
  const [shuffleCount, setShuffleCount] = useState(0);
  const [isStaffCatalogOpen, setIsStaffCatalogOpen] = useState(false);

  // Staff specific active profile automatically bound to active enterprise workspace
  const [activeStaffProfileId, setActiveStaffProfileId] = useState<string>(activeWorkspace.defaultStaffId);

  // Keep synced if workspace switches from header
  React.useEffect(() => {
    setActiveStaffProfileId(activeWorkspace.defaultStaffId);
  }, [activeWorkspace.defaultStaffId]);

  // Track & Division Filter
  const [trackFilter, setTrackFilter] = useState<'all' | 'retail_sales' | 'frontline_service' | 'hospitality' | 'automotive' | 'staff_only' | 'jobseeker_only' | 'dept_only'>('all');

  // Get Started Guide for judges & new users
  const [showGetStartedGuide, setShowGetStartedGuide] = useState<boolean>(() => {
    try {
      return localStorage.getItem('vokasta_get_started_dismissed') !== 'true';
    } catch {
      return true;
    }
  });

  const handleDismissGetStarted = () => {
    setShowGetStartedGuide(false);
    try {
      localStorage.setItem('vokasta_get_started_dismissed', 'true');
    } catch {}
  };

  const handleReopenGetStarted = () => {
    setShowGetStartedGuide(true);
    try {
      localStorage.removeItem('vokasta_get_started_dismissed');
    } catch {}
  };

  const rawActiveStaff = STAFF_PROFILES.find((p) => p.id === activeStaffProfileId) || STAFF_PROFILES[0];
  const activeStaff = getLocalizedStaffProfile(rawActiveStaff, language);

  const handleStartRandomSession = async (overrideId?: string) => {
    try {
      const payload: any = {
        user_role: isCandidate ? 'pencari_kerja' : userRole,
      };
      if (overrideId) {
        payload.scenario_id = overrideId;
      } else if (isStaff) {
        payload.department = activeStaff.department;
      }

      const res = await fetch('/api/sessions/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to initialize assessment session');
      }

      const data = await res.json();
      const localizedScenario = getLocalizedScenario(data.session.scenario, language);
      setLastRandomScenario(localizedScenario);
      setShuffleCount((prev) => prev + 1);
      onSessionStarted({
        ...data.session,
        scenario: localizedScenario,
      });
    } catch (err: any) {
      console.error('Error starting session:', err);
      // Fallback in case of offline/network issues
      let pool = SCENARIOS;
      if (isCandidate) {
        pool = SCENARIOS.filter((s) => s.target_audience === 'jobseeker');
      } else if (isStaff) {
        const deptPool = SCENARIOS.filter((s) => s.department === activeStaff.department);
        pool = deptPool.length > 0 ? deptPool : SCENARIOS.filter((s) => s.target_audience === 'staff');
      }

      const randomIndex = Math.floor(Math.random() * pool.length);
      const fallbackScenario = overrideId
        ? SCENARIOS.find((s) => s.id === overrideId) || pool[0]
        : pool[randomIndex] || pool[0];

      const localizedFallback = getLocalizedScenario(fallbackScenario, language);

      const fallbackSession: AssessmentSession = {
        id: 'sess_local_' + Date.now(),
        selected_scenario_id: localizedFallback.id,
        scenario: localizedFallback,
        video_url: '',
        status: 'pending',
        created_at: new Date().toISOString(),
      };
      setLastRandomScenario(localizedFallback);
      setShuffleCount((prev) => prev + 1);
      onSessionStarted(fallbackSession);
    }
  };

  const getScenarioIcon = (scenario: Scenario) => {
    if (
      scenario.id === 'scen_sales_automotive_dealer' ||
      scenario.id === 'scen_automotive_ev_technical' ||
      scenario.id === 'scen_automotive_aftersales_deescalation'
    ) {
      return <Car className="w-5 h-5 text-sky-400" />;
    }
    if (scenario.id === 'scen_sales_property_kpr') {
      return <Home className="w-5 h-5 text-emerald-400" />;
    }
    if (
      scenario.id === 'scen_sales_fashion_retail' ||
      scenario.id === 'scen_fashion_fabric_care_fitting' ||
      scenario.id === 'scen_fashion_cashier_packaging'
    ) {
      return <ShoppingBag className="w-5 h-5 text-purple-400" />;
    }

    switch (scenario.jenis) {
      case 'sales_objection':
        return <Store className="w-5 h-5 text-sky-400" />;
      case 'sales_discovery':
        return <ShoppingBag className="w-5 h-5 text-purple-400" />;
      case 'greeting':
        return <UserCheck className="w-5 h-5 text-amber-400" />;
      case 'ratio':
        return <Coffee className="w-5 h-5 text-amber-500" />;
      case 'complaint':
        return <HeartHandshake className="w-5 h-5 text-rose-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-amber-400" />;
    }
  };

  // Helper to map due dates and assigned status to scenarios
  const getScenarioDueDateBadge = (scenario: Scenario) => {
    const matchedAssignment = assignments?.find((a) => a?.scenario_id === scenario?.id);
    if (matchedAssignment) {
      const deadlineStr = matchedAssignment.deadline || (matchedAssignment as any).due_date || (language === 'en' ? 'Urgent' : 'Segera');
      const isUrgent =
        matchedAssignment.priority === 'Tinggi' ||
        (matchedAssignment as any).priority === 'urgent' ||
        deadlineStr.toLowerCase().includes('hari ini') ||
        deadlineStr.toLowerCase().includes('2025-04-05');
      return {
        label: `${language === 'en' ? 'Deadline' : 'Batas Waktu'}: ${deadlineStr}`,
        isAssigned: true,
        priority: matchedAssignment.priority || 'Normal',
        isUrgent,
      };
    }

    // Default SLA schedule for active frontline LMS
    if (scenario.department === 'fnb_barista') {
      return {
        label: language === 'en' ? 'Deadline: 24h (Shift 1)' : 'Batas Waktu: 24 Jam (Shift 1)',
        isAssigned: false,
        priority: 'medium',
        isUrgent: false,
      };
    }
    if (scenario.department === 'automotive_sales') {
      return {
        label: language === 'en' ? 'Deadline: This Weekend' : 'Batas Waktu: Akhir Pekan Ini',
        isAssigned: false,
        priority: 'high',
        isUrgent: false,
      };
    }
    if (scenario.department === 'fashion_retail') {
      return {
        label: language === 'en' ? 'Deadline: 3 Business Days' : 'Batas Waktu: 3 Hari Kerja',
        isAssigned: false,
        priority: 'medium',
        isUrgent: false,
      };
    }
    return {
      label: language === 'en' ? 'Deadline: Self-Paced Flexible' : 'Batas Waktu: Fleksibel Mandiri',
      isAssigned: false,
      priority: 'low',
      isUrgent: false,
    };
  };

  // STRICT FILTERING: Strict isolation by role
  let rawRoleScenarios: Scenario[] = [];

  if (isCandidate) {
    // 100% STRICT FOR INDEPENDENT JOBSEEKER:
    // Only universal jobseeker scenarios (target_audience === 'jobseeker').
    // ZERO staff or brand SOP scenarios are allowed here.
    if (trackFilter === 'frontline_service' || trackFilter === 'hospitality') {
      rawRoleScenarios = SCENARIOS.filter(
        (s) => s.target_audience === 'jobseeker' && (s.track || 'frontline_service') === 'frontline_service'
      );
    } else if (trackFilter === 'retail_sales') {
      rawRoleScenarios = SCENARIOS.filter(
        (s) => s.target_audience === 'jobseeker' && s.track === 'retail_sales'
      );
    } else {
      rawRoleScenarios = SCENARIOS.filter((s) => s.target_audience === 'jobseeker');
    }
  } else if (isStaff) {
    // 100% STRICT ISOLATION FOR ACTIVE STORE STAFF:
    // Staf gerai HANYA melihat skenario SOP dari divisi penempatannya sendiri (activeStaff.department).
    rawRoleScenarios = SCENARIOS.filter(
      (s) => s.target_audience === 'staff' && s.department === activeStaff.department
    );
  } else {
    // Supervisor / Manager: Strictly isolated to current Enterprise Workspace department
    // ensuring consistent tenant boundary across the entire application!
    rawRoleScenarios = SCENARIOS.filter(
      (s) => s.department === activeWorkspace.department || (s.target_audience === 'staff' && s.department === activeWorkspace.department)
    );
  }

  const roleScenarios = rawRoleScenarios.map((s) => getLocalizedScenario(s, language));

  const jobseekerCount = SCENARIOS.filter((s) => s.target_audience === 'jobseeker').length;
  const staffCount = SCENARIOS.filter((s) => s.target_audience === 'staff').length;
  const hospitalityCount = SCENARIOS.filter(
    (s) => s.department === 'fnb_barista' || s.track === 'frontline_service'
  ).length;
  const automotiveCount = SCENARIOS.filter(
    (s) => s.department === 'automotive_sales' || s.id.includes('automotive')
  ).length;
  const retailCount = SCENARIOS.filter(
    (s) => s.department === 'fashion_retail' || s.track === 'retail_sales'
  ).length;
  const activeDeptCount = SCENARIOS.filter((s) => s.department === activeStaff.department).length;

  return (
    <div className="max-w-5xl mx-auto space-y-7 py-2 text-slate-100">
      {/* Get Started Guide for Judges & New Users */}
      <GetStartedGuide
        isOpen={showGetStartedGuide}
        onClose={handleDismissGetStarted}
        onStartScenario={(scenId) => handleStartRandomSession(scenId)}
        isLoading={isLoading}
        isCandidate={isCandidate}
        language={language}
      />

      {/* Minimized Quick Guide Trigger Pill */}
      {!showGetStartedGuide && (
        <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 shadow-md">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium">
              {language === 'en'
                ? 'New to Vokasta? Check out the recommended first roleplay test & 3-step walkthrough.'
                : 'Pertama kali di Vokasta? Buka panduan rekomendasi pengujian roleplay dan alur 3 langkah.'}
            </span>
          </div>
          <button
            id="reopen-get-started-btn"
            type="button"
            onClick={handleReopenGetStarted}
            className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold hover:text-amber-200 transition cursor-pointer flex items-center space-x-1.5 shrink-0 ml-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'en' ? 'Get Started Guide' : 'Panduan Mulai Cepat'}</span>
          </button>
        </div>
      )}

      {/* Dynamic Role-Adaptive Hero Banner */}
      <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            {isCandidate ? (
              <>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-700/80 text-emerald-300 text-xs font-semibold mb-3">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>{t.screen1.candidateBadge}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t.screen1.candidateHeroTitle}
                </h1>
                <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
                  {t.screen1.candidateHeroDesc}
                </p>
              </>
            ) : isStaff ? (
              <>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-700/80 text-amber-300 text-xs font-semibold mb-3">
                  <Store className="w-4 h-4 text-amber-400" />
                  <span>{t.screen1.staffBadge}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t.screen1.staffHeroTitle}
                </h1>
                <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
                  {language === 'en'
                    ? `Internal store training portal. Complete roleplay assignments from Manager/Owner for your department (${activeStaff.department_label}) to ensure brand SOP compliance and hospitality standards.`
                    : `Portal pelatihan internal untuk frontliner gerai. Selesaikan penugasan roleplay dari Manajer/Owner sesuai divisi penempatan Anda (${activeStaff.department_label}) untuk memastikan kepatuhan SOP brand dan standar pelayanan gerai.`}
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-700/80 text-indigo-300 text-xs font-semibold mb-3">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>{t.screen1.managerBadge}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t.screen1.managerHeroTitle}
                </h1>
                <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
                  {t.screen1.managerHeroDesc}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Primary Action Button & Mode Status */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              id="start-assessment-random-btn"
              onClick={() => handleStartRandomSession()}
              disabled={isLoading}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl active:scale-[0.98] font-extrabold text-sm shadow-lg flex items-center justify-center space-x-2.5 transition cursor-pointer disabled:opacity-50 ${
                isCandidate
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
              }`}
            >
              <Dices className="w-4 h-4 text-slate-950" />
              <span>
                {isLoading
                  ? t.screen1.preparing
                  : isCandidate
                  ? t.screen1.startRandom
                  : (language === 'en' ? 'Start Random SOP Practice' : 'Mulai Latihan SOP Acak')}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <ShieldCheck className={`w-4 h-4 ${isCandidate ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span>
              {isCandidate
                ? (language === 'en' ? 'Frontline Employability Standards (Standardized Rubrics)' : 'Standar Kesiapan Kerja Frontliner (Rubrik Terstandardisasi)')
                : (language === 'en' ? `Aligned with Store SOP: ${activeStaff.outlet}` : `Terikat SOP Gerai: ${activeStaff.outlet}`)}
            </span>
            {shuffleCount > 0 && (
              <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-xs border border-slate-700">
                {language === 'en' ? `Tested ${shuffleCount}x` : `Uji ${shuffleCount}x`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Staff View Only: Active Brand SOP Assignments with isolated staff profile */}
      {isStaff && (
        <StaffAssignmentList
          assignments={assignments}
          onStartAssignment={(scenarioId) => handleStartRandomSession(scenarioId)}
          activeStaffId={activeStaffProfileId}
          onSelectStaff={(staffId) => setActiveStaffProfileId(staffId)}
        />
      )}

      {/* Scenario Selection Grid (Clean) */}

      {/* Scenario Bank with Role-Aware Filtering */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>
                {isCandidate
                  ? t.screen1.catalogTitle
                  : isStaff
                  ? `${language === 'en' ? 'Department SOP Catalog' : 'Katalog SOP Divisi'}: ${activeStaff.department_label}`
                  : (language === 'en' ? 'Complete Scenario Library' : 'Katalog Lengkap Seluruh Skenario')}
              </span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                isCandidate
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {roleScenarios.length} {language === 'en' ? 'Practice Scenarios' : 'Skenario Praktik'}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isCandidate
                ? t.screen1.catalogSubtitle
                : isStaff
                ? (language === 'en'
                    ? `Showing operational SOP training modules relevant for ${activeStaff.role_title} at ${activeStaff.outlet}.`
                    : `Menampilkan materi pelatihan SOP operasional yang relevan untuk posisi ${activeStaff.role_title} di ${activeStaff.outlet}.`)
                : (language === 'en'
                    ? 'Select a scenario to practice realistic frontline customer interactions.'
                    : 'Pilih skenario untuk melatih percakapan nyata menghadapi pelanggan dan pembeli.')}
            </p>
          </div>

          {isStaff && (
            <button
              type="button"
              id="toggle-staff-catalog-btn"
              onClick={() => setIsStaffCatalogOpen(!isStaffCatalogOpen)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-semibold flex items-center space-x-1.5 transition cursor-pointer self-start sm:self-center"
            >
              <span>{isStaffCatalogOpen ? (language === 'en' ? 'Fold Catalog' : 'Lipat Katalog') : (language === 'en' ? 'Browse Full Catalog' : 'Buka Katalog Lainnya')}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isStaffCatalogOpen ? 'rotate-180' : ''}`} />
            </button>
          )}

          {(!isStaff || isStaffCatalogOpen) && (
            /* Quick Filter Tabs strictly contextualized */
            <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium self-start sm:self-auto flex-wrap gap-1">
            {isCandidate ? (
              <>
                <button
                  onClick={() => setTrackFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    trackFilter === 'all'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'en' ? `All Modules (${jobseekerCount})` : `Semua Modul Mandiri (${jobseekerCount})`}
                </button>

                <button
                  onClick={() => setTrackFilter('frontline_service')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 cursor-pointer ${
                    trackFilter === 'frontline_service' || trackFilter === 'hospitality'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Coffee className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Hospitality & Guests' : 'Hospitality & Tamu'}</span>
                </button>

                <button
                  onClick={() => setTrackFilter('retail_sales')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 cursor-pointer ${
                    trackFilter === 'retail_sales'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Retail & Cashier' : 'Pramuniaga & Kasir'}</span>
                </button>
              </>
            ) : isStaff ? (
              <div className="flex items-center space-x-2 py-0.5">
                <span className="text-xs text-slate-300 font-semibold px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>{language === 'en' ? 'Assigned Division' : 'Divisi Penugasan'}: <strong className="text-amber-300">{activeStaff.department_label}</strong></span>
                </span>
                <span className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                  {roleScenarios.length} {language === 'en' ? 'Standard SOP Modules' : 'Modul SOP Standar'}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 py-0.5">
                <span className="text-xs text-slate-300 font-semibold px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-lg flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  <span>{language === 'en' ? 'Tenant Workspace' : 'Tenant Gerai'}: <strong className="text-indigo-300">{activeWorkspace.name}</strong></span>
                </span>
                <span className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                  {roleScenarios.length} {language === 'en' ? 'Standard SOP Modules' : 'Modul SOP Standar'}
                </span>
              </div>
            )}
          </div>
          )}
        </div>

        {/* Scenarios Grid or Empty State (Folded for staff role by default) */}
        {(!isStaff || isStaffCatalogOpen) && (
          roleScenarios.length === 0 ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-10 text-center space-y-4 max-w-xl mx-auto shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Filter className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white">
                {language === 'en' ? 'No Scenarios Found in this Category' : 'Tidak Ada Skenario dalam Kategori Ini'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                {language === 'en'
                  ? 'There are currently no active scenarios matching your selected filter. Reset your filter to explore all available roleplay modules.'
                  : 'Belum ada modul skenario yang cocok dengan filter yang dipilih saat ini. Silakan atur ulang filter untuk melihat seluruh materi latihan.'}
              </p>
            </div>
            <button
              id="reset-scenario-filters-btn"
              type="button"
              onClick={() => setTrackFilter('all')}
              className="px-5 py-3 min-h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center space-x-2 transition cursor-pointer shadow-md shadow-amber-500/20 active:scale-95"
            >
              <RefreshCw className="w-4 h-4 text-slate-950" />
              <span>{language === 'en' ? 'Reset All Filters' : 'Reset Semua Filter'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roleScenarios.map((scenario, index) => {
              const isSelected = selectedScenarioId === scenario.id;
              const isSales = scenario.track === 'retail_sales';
              const isJobseekerScenario = scenario.target_audience === 'jobseeker';
              const dueInfo = getScenarioDueDateBadge(scenario);
              const isRecommended =
                scenario.id === 'scen_greeting_01' ||
                (isCandidate && scenario.id === 'scen_jobseeker_hospitality_basic');

              return (
                <div
                  key={scenario.id}
                  id={`scenario-card-${scenario.id}`}
                  className={`bg-slate-900/80 border rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:border-slate-700 hover:bg-slate-850/80 shadow-xl group relative ${
                    isRecommended
                      ? 'border-amber-500/70 ring-1 ring-amber-500/30'
                      : isSelected
                      ? isJobseekerScenario
                        ? 'border-emerald-500 ring-1 ring-emerald-500'
                        : isSales
                        ? 'border-sky-500 ring-1 ring-sky-500'
                        : 'border-amber-500 ring-1 ring-amber-500'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`p-2.5 rounded-xl border text-slate-300 ${
                          isJobseekerScenario
                            ? 'bg-emerald-950/40 border-emerald-800/60'
                            : isSales
                            ? 'bg-sky-950/40 border-sky-800/60'
                            : 'bg-slate-800/80 border-slate-700'
                        }`}
                      >
                        {getScenarioIcon(scenario)}
                      </div>
                      <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                        {isRecommended && (
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border bg-amber-500/15 text-amber-300 border-amber-500/40 flex items-center space-x-1">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400/40" />
                            <span>{language === 'en' ? 'Core Onboarding' : 'Modul Fondasi'}</span>
                          </span>
                        )}
                        {isJobseekerScenario ? (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full border bg-emerald-950/90 text-emerald-300 border-emerald-700/80">
                            {language === 'en' ? '✓ Universal Standard' : '✓ Mandiri Universal'}
                          </span>
                        ) : (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full border bg-amber-950/90 text-amber-300 border-amber-700/80">
                            {scenario.brand_name || (language === 'en' ? 'Brand SOP' : 'SOP Gerai')}
                          </span>
                        )}
                        <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          0{index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Due Date & Assignment SLA Badge */}
                    <div className="flex items-center space-x-1.5">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-md flex items-center space-x-1 border ${
                          dueInfo.isUrgent
                            ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                            : dueInfo.isAssigned
                            ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                            : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        <Calendar className="w-3 h-3 shrink-0" />
                        <span>{dueInfo.label}</span>
                      </span>
                      {getInteractionMode(scenario) === 'voice' ? (
                        <span
                          id={`mode-badge-${scenario.id}`}
                          title={language === 'en' ? 'Two-way voice conversation with an AI customer' : 'Percakapan suara dua arah dengan pelanggan AI'}
                          className="text-xs font-medium px-2 py-0.5 rounded-md flex items-center space-x-1 border bg-indigo-950/80 text-indigo-300 border-indigo-800"
                        >
                          <Mic className="w-3 h-3 shrink-0" />
                          <span>{language === 'en' ? 'Voice' : 'Suara'}</span>
                        </span>
                      ) : (
                        <span
                          id={`mode-badge-${scenario.id}`}
                          title={language === 'en' ? 'Camera recording: this standard assesses movement and body language' : 'Rekaman kamera: standar ini menilai gerakan dan bahasa tubuh'}
                          className="text-xs font-medium px-2 py-0.5 rounded-md flex items-center space-x-1 border bg-fuchsia-950/80 text-fuchsia-300 border-fuchsia-800"
                        >
                          <Video className="w-3 h-3 shrink-0" />
                          <span>{language === 'en' ? 'Video' : 'Video'}</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <span
                        className={`text-xs font-semibold block uppercase tracking-wider ${
                          isJobseekerScenario
                            ? 'text-emerald-400'
                            : isSales
                            ? 'text-sky-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {scenario.category}
                      </span>
                      <h3
                        className={`text-base font-bold text-white mt-1 leading-snug transition ${
                          isJobseekerScenario
                            ? 'group-hover:text-emerald-300'
                            : isSales
                            ? 'group-hover:text-sky-300'
                            : 'group-hover:text-amber-300'
                        }`}
                      >
                        {scenario.title}
                      </h3>
                    </div>

                    {/* Role context snippet */}
                    <div className="text-xs text-slate-400 font-medium flex items-center space-x-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{scenario.role_context}</span>
                    </div>

                    {/* Buyer Persona Snippet for Sales */}
                    {scenario.buyer_persona ? (
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-sky-900/80 text-sky-300 font-bold text-xs flex items-center justify-center border border-sky-700 shrink-0">
                            {scenario.buyer_persona.avatar_initials}
                          </span>
                          <div className="truncate text-xs font-semibold text-slate-200">
                            {scenario.buyer_persona.name}
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 truncate">
                          {scenario.buyer_persona.title} • {scenario.buyer_persona.company}
                        </p>
                        <p className="text-xs text-amber-300/90 italic line-clamp-1">
                          "{scenario.buyer_persona.opening_objection_line}"
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {scenario.task_instruction_en}
                      </p>
                    )}

                    {/* Parameter Count Tag */}
                    <div className="pt-1 flex items-center space-x-2 text-xs text-slate-400">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isJobseekerScenario
                            ? 'bg-emerald-400'
                            : isSales
                            ? 'bg-sky-400'
                            : 'bg-amber-400'
                        }`}
                      />
                      <span>{scenario.parameters.length} {language === 'en' ? 'Assessment Parameters' : 'Parameter Penilaian'}</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>{language === 'en' ? 'Rubric Ready' : 'Rubrik Siap'}</span>
                    </div>
                    <button
                      id={`test-scenario-btn-${scenario.id}`}
                      onClick={() => handleStartRandomSession(scenario.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition border ${
                        isRecommended
                          ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/50 shadow-xs'
                          : isJobseekerScenario
                          ? 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border-emerald-800/80'
                          : isSales
                          ? 'bg-sky-950/60 hover:bg-sky-900/80 text-sky-300 border-sky-800/80'
                          : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700'
                      }`}
                    >
                      <span>{t.screen1.practiceBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
      </div>
    </div>
  );
};
