import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Screen1Start } from './components/Screen1Start';
import { Screen2RecordUpload } from './components/Screen2RecordUpload';
import { Screen3Processing } from './components/Screen3Processing';
import { Screen4Results } from './components/Screen4Results';
import { ManagerDashboard } from './components/ManagerDashboard';
import { SOPStudioModal } from './components/SOPStudioModal';
import { WorkerPassportModal } from './components/WorkerPassportModal';
import { DemoVideoModal } from './components/DemoVideoModal';
import { EnterpriseCTOModal } from './components/EnterpriseCTOModal';
import { LoginScreen } from './components/LoginScreen';
import { AssignSOPModal } from './components/AssignSOPModal';
import { CredentialVerificationModal } from './components/CredentialVerificationModal';
import { CompetencyDeltaModal } from './components/CompetencyDeltaModal';
import { InvestorROIModal } from './components/InvestorROIModal';
import { StagePitchModal } from './components/StagePitchModal';
import { ProposalModal } from './components/ProposalModal';
import { GoogleCloudDeckModal } from './components/GoogleCloudDeckModal';
import { DownloadHubModal } from './components/DownloadHubModal';
import { AssessmentSession, AssessmentResult, Scenario, NetworkResilienceProfile, UserRole, SOPAssignment } from './types';
import { SCENARIOS } from './data/scenarios';
import { INITIAL_ASSIGNMENTS } from './data/assignments';
import { useLanguage } from './i18n/LanguageContext';

const ENABLE_DOWNLOAD_HUB = false;

export default function App() {
  const { language } = useLanguage();
  // Authentication & Role State
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('vokasta_theme');
      return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  // Flow & Steps
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [activeTab, setActiveTab] = useState<'assessment' | 'manager'>('assessment');
  const [isSOPStudioOpen, setIsSOPStudioOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isDemoVideoOpen, setIsDemoVideoOpen] = useState(false);
  const [isCTOConsoleOpen, setIsCTOConsoleOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isDeltaModalOpen, setIsDeltaModalOpen] = useState(false);
  const [isInvestorROIModalOpen, setIsInvestorROIModalOpen] = useState(false);
  const [isStagePitchModalOpen, setIsStagePitchModalOpen] = useState(false);
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [isGoogleDeckOpen, setIsGoogleDeckOpen] = useState(false);
  const [isDownloadHubOpen, setIsDownloadHubOpen] = useState(false);
  const [urlCredentialId, setUrlCredentialId] = useState<string | undefined>(undefined);
  const [resilienceProfile, setResilienceProfile] = useState<NetworkResilienceProfile>('5g_hq');

  // Deep-link query parameters support (?verify=ID, ?mode=roi, ?mode=pitch, ?mode=proposal, ?deck=1, ?download=1)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const verifyParam = params.get('verify');
      const modeParam = params.get('mode') || params.get('tab');
      const roiParam = params.get('roi');
      const pitchParam = params.get('pitch');
      const proposalParam = params.get('proposal');
      const deckParam = params.get('deck') || params.get('slides');
      const downloadParam = params.get('download') || params.get('downloads') || params.get('unduh');

      if (verifyParam) {
        setUrlCredentialId(verifyParam);
        setIsVerificationModalOpen(true);
      }
      if (roiParam === '1' || modeParam === 'roi' || modeParam === 'calculator') {
        setIsInvestorROIModalOpen(true);
      }
      if (pitchParam === '1' || modeParam === 'pitch' || modeParam === 'demo') {
        setIsStagePitchModalOpen(true);
      }
      if (proposalParam === '1' || modeParam === 'proposal') {
        setIsProposalOpen(true);
      }
      if (deckParam === '1' || modeParam === 'deck' || modeParam === 'slides') {
        setIsGoogleDeckOpen(true);
      }
      if (ENABLE_DOWNLOAD_HUB && (downloadParam === '1' || modeParam === 'download')) {
        setIsDownloadHubOpen(true);
      }
    } catch {
      // Ignore query param parse failure in sandboxed environments
    }
  }, []);

  // SOP Assignments State
  const [assignments, setAssignments] = useState<SOPAssignment[]>(INITIAL_ASSIGNMENTS);

  const [session, setSession] = useState<AssessmentSession | null>(null);
  const [videoPayload, setVideoPayload] = useState<{
    videoBase64: string;
    mimeType: string;
    previewUrl?: string;
    videoBlob?: Blob;
    simulateMode?: boolean;
    failureSimulation?: boolean;
    inputMode?: 'voice' | 'video';
    conversation?: Array<{ role: 'customer' | 'worker'; text: string }>;
    practiceLanguage?: 'id' | 'en';
  } | null>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Role selection from LoginScreen
  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);
    if (role === 'manager') {
      setActiveTab('manager');
    } else {
      setActiveTab('assessment');
    }
  };

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('vokasta_theme', next);
      } catch {}
      return next;
    });
  };

  const handleSwitchRole = () => {
    setUserRole(null);
  };

  // SOP Assignment Handlers
  const handleAddAssignment = (newAssignment: SOPAssignment) => {
    setAssignments((prev) => [newAssignment, ...prev]);
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleCompleteAssignment = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'completed' } : a))
    );
  };

  // Step 1: Session started with randomly selected or chosen scenario
  const handleSessionStarted = (newSession: AssessmentSession) => {
    setSession(newSession);
    setCurrentStep(2);
  };

  // Step 2: Video recorded or uploaded
  const handleProceedToAnalysis = (payload: {
    videoBase64: string;
    mimeType: string;
    previewUrl?: string;
    videoBlob?: Blob;
    simulateMode?: boolean;
    failureSimulation?: boolean;
    inputMode?: 'voice' | 'video';
    conversation?: Array<{ role: 'customer' | 'worker'; text: string }>;
    practiceLanguage?: 'id' | 'en';
  }) => {
    setVideoPayload(payload);
    setCurrentStep(3);
  };

  // Step 3: AI Processing completed
  const handleProcessingComplete = (assessmentResult: AssessmentResult) => {
    setResult(assessmentResult);
    setCurrentStep(4);
  };

  // Step 4: Reset flow to test another scenario
  const handleResetToStart = () => {
    setSession(null);
    setVideoPayload(null);
    setResult(null);
    setCurrentStep(1);
    setActiveTab('assessment');
  };

  const handleScenarioCreatedFromStudio = async (newScenario: Scenario) => {
    setIsSOPStudioOpen(false);
    setActiveTab('assessment');
    try {
      const res = await fetch('/api/sessions/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario_id: newScenario.id }),
      });
      if (res.ok) {
        const data = await res.json();
        setSession(data.session);
        setCurrentStep(2);
        return;
      }
    } catch (err) {
      console.warn('Could not start server session for custom scenario, using client session:', err);
    }

    const fallbackSession: AssessmentSession = {
      id: 'sess_custom_' + Date.now(),
      selected_scenario_id: newScenario.id,
      scenario: newScenario,
      video_url: '',
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    setSession(fallbackSession);
    setCurrentStep(2);
  };

  const handleStartScenarioById = async (scenarioId: string) => {
    setActiveTab('assessment');
    try {
      const res = await fetch('/api/sessions/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario_id: scenarioId }),
      });
      if (res.ok) {
        const data = await res.json();
        setSession(data.session);
        setCurrentStep(2);
        return;
      }
    } catch (err) {
      console.warn('Could not start server session for scenarioId, using client fallback:', err);
    }

    const found = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];
    const fallbackSession: AssessmentSession = {
      id: 'sess_quick_' + Date.now(),
      selected_scenario_id: found.id,
      scenario: found,
      video_url: '',
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    setSession(fallbackSession);
    setCurrentStep(2);
  };

  // If user has not selected role yet, render LoginScreen
  if (!userRole) {
    return (
      <>
        <LoginScreen
          onSelectRole={handleSelectRole}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenStagePitch={() => setIsStagePitchModalOpen(true)}
          onOpenCompetencyDelta={() => setIsDeltaModalOpen(true)}
          onOpenInvestorROI={() => setIsInvestorROIModalOpen(true)}
          onOpenCTOConsole={() => setIsCTOConsoleOpen(true)}
          onOpenVerification={() => setIsVerificationModalOpen(true)}
          onOpenProposal={() => setIsProposalOpen(true)}
          onOpenDownloadHub={ENABLE_DOWNLOAD_HUB ? () => setIsDownloadHubOpen(true) : undefined}
        />

        {ENABLE_DOWNLOAD_HUB && (
          <DownloadHubModal
            isOpen={isDownloadHubOpen}
            onClose={() => setIsDownloadHubOpen(false)}
          />
        )}

        <GoogleCloudDeckModal
          isOpen={isGoogleDeckOpen}
          onClose={() => setIsGoogleDeckOpen(false)}
        />

        <ProposalModal
          isOpen={isProposalOpen}
          onClose={() => setIsProposalOpen(false)}
          onOpenInvestorROI={() => {
            setIsProposalOpen(false);
            setIsInvestorROIModalOpen(true);
          }}
        />

        <StagePitchModal
          isOpen={isStagePitchModalOpen}
          onClose={() => setIsStagePitchModalOpen(false)}
          onLaunchFullSimulation={(scenId) => {
            setIsStagePitchModalOpen(false);
            setUserRole('staff');
            handleStartScenarioById(scenId);
          }}
        />

        <CompetencyDeltaModal
          isOpen={isDeltaModalOpen}
          onClose={() => setIsDeltaModalOpen(false)}
        />

        <InvestorROIModal
          isOpen={isInvestorROIModalOpen}
          onClose={() => setIsInvestorROIModalOpen(false)}
          onOpenProposal={() => {
            setIsInvestorROIModalOpen(false);
            setIsProposalOpen(true);
          }}
        />

        <EnterpriseCTOModal
          isOpen={isCTOConsoleOpen}
          onClose={() => setIsCTOConsoleOpen(false)}
          resilienceProfile={resilienceProfile}
          onSelectResilienceProfile={setResilienceProfile}
        />

        <CredentialVerificationModal
          isOpen={isVerificationModalOpen}
          onClose={() => setIsVerificationModalOpen(false)}
          initialCredentialId={urlCredentialId}
        />
      </>
    );
  }

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-200 ${
      isDark
        ? 'bg-[#080d1a] text-slate-100 selection:bg-cyan-500 selection:text-slate-950'
        : 'bg-slate-900 text-slate-100 selection:bg-amber-500 selection:text-slate-950'
    }`}>
      {/* Subtle Ambient Tech Glows */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-15%,rgba(59,130,246,0.12),rgba(0,0,0,0))] -z-10" />
      <div className="fixed bottom-0 right-0 pointer-events-none w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -z-10" />
      <div className="fixed top-1/2 left-0 pointer-events-none w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

      {/* Navigation Header */}
      <Header
        currentStep={currentStep}
        onReset={handleResetToStart}
        activeTab={activeTab}
        onSwitchTab={(tab) => setActiveTab(tab)}
        onOpenSOPStudio={() => setIsSOPStudioOpen(true)}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenDemoVideo={() => setIsDemoVideoOpen(true)}
        onOpenCTOConsole={() => setIsCTOConsoleOpen(true)}
        onOpenVerification={() => setIsVerificationModalOpen(true)}
        onOpenInvestorROI={() => setIsInvestorROIModalOpen(true)}
        onOpenStagePitch={() => setIsStagePitchModalOpen(true)}
        onOpenProposal={() => setIsProposalOpen(true)}
        onOpenDownloadHub={ENABLE_DOWNLOAD_HUB ? () => setIsDownloadHubOpen(true) : undefined}
        enableDownloadHub={ENABLE_DOWNLOAD_HUB}
        activeResilienceProfile={resilienceProfile}
        userRole={userRole}
        onSwitchRole={handleSwitchRole}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col justify-start">
        {activeTab === 'manager' ? (
          <ManagerDashboard
            onBackToCandidatePortal={() => setActiveTab('assessment')}
            assignments={assignments}
            onOpenAssignModal={() => setIsAssignModalOpen(true)}
            onOpenInvestorROI={() => setIsInvestorROIModalOpen(true)}
            onOpenStagePitch={() => setIsStagePitchModalOpen(true)}
            onOpenVerification={() => setIsVerificationModalOpen(true)}
            onOpenProposal={() => setIsProposalOpen(true)}
          />
        ) : (
          <>
            {currentStep === 1 && (
              <Screen1Start
                onSessionStarted={handleSessionStarted}
                isLoading={isLoading}
                userRole={userRole}
                assignments={assignments}
                onCompleteAssignment={handleCompleteAssignment}
              />
            )}

            {currentStep === 2 && session && (
              <Screen2RecordUpload
                session={session}
                onProceedToAnalysis={handleProceedToAnalysis}
                onBack={() => setCurrentStep(1)}
                resilienceProfile={resilienceProfile}
              />
            )}

            {currentStep === 3 && session && videoPayload && (
              <Screen3Processing
                session={session}
                videoPayload={videoPayload}
                onProcessingComplete={handleProcessingComplete}
                onBack={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 4 && result && (
              <Screen4Results
                result={result}
                videoUrl={videoPayload?.previewUrl || (videoPayload?.videoBlob ? URL.createObjectURL(videoPayload.videoBlob) : undefined)}
                onStartNewAssessment={handleResetToStart}
                onProceedToNextScenario={handleStartScenarioById}
                onOpenCompetencyDelta={() => setIsDeltaModalOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Custom SOP Ingestion Studio Modal */}
      <SOPStudioModal
        isOpen={isSOPStudioOpen}
        onClose={() => setIsSOPStudioOpen(false)}
        onScenarioCreated={handleScenarioCreatedFromStudio}
      />

      {/* Frontline Worker Competency Passport Modal */}
      <WorkerPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
      />

      {/* Interactive Video Demo Walkthrough Modal */}
      <DemoVideoModal
        isOpen={isDemoVideoOpen}
        onClose={() => setIsDemoVideoOpen(false)}
        onStartSimulation={() => {
          setIsDemoVideoOpen(false);
          setActiveTab('assessment');
          setCurrentStep(1);
        }}
      />

      {/* CTO Enterprise Architecture Cockpit Modal */}
      <EnterpriseCTOModal
        isOpen={isCTOConsoleOpen}
        onClose={() => setIsCTOConsoleOpen(false)}
        activeResilienceProfile={resilienceProfile}
        onSelectResilienceProfile={(profile) => setResilienceProfile(profile)}
        onOpenDemoVideo={() => setIsDemoVideoOpen(true)}
      />

      {/* Assign SOP Modal for Managers */}
      <AssignSOPModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        assignments={assignments}
        onAddAssignment={handleAddAssignment}
        onDeleteAssignment={handleDeleteAssignment}
      />

      {/* Public W3C Credential Verification & QR Scanner Modal */}
      <CredentialVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        metadata={result?.open_badges_metadata}
        candidateName={result?.open_badges_metadata?.credential_subject || 'Rian Pratama'}
        scenarioTitle={
          session?.scenario?.title ||
          (language === 'en'
            ? 'Coffee Barista: Custom Orders & Dairy Allergy Protocols'
            : 'Barista Kedai Kopi - Pesanan Khusus & Alergi Susu')
        }
        universalCompetencies={result?.universal_competencies}
        score={result?.weighted_average_score || 92}
        initialCredentialId={urlCredentialId}
      />

      {/* Competency Delta Before-vs-After Showcase Modal */}
      <CompetencyDeltaModal
        isOpen={isDeltaModalOpen}
        onClose={() => setIsDeltaModalOpen(false)}
        onTryScenario={(scenId) => {
          setIsDeltaModalOpen(false);
          handleStartScenarioById(scenId);
        }}
      />

      {/* Investor ROI & Business Justification Calculator Modal */}
      <InvestorROIModal
        isOpen={isInvestorROIModalOpen}
        onClose={() => setIsInvestorROIModalOpen(false)}
        onOpenCohortAnalytics={() => {
          setIsInvestorROIModalOpen(false);
          setActiveTab('manager');
        }}
        onOpenProposal={() => {
          setIsInvestorROIModalOpen(false);
          setIsProposalOpen(true);
        }}
      />

      {/* Stage Pitch Golden Path 60-Second Demo Modal */}
      <StagePitchModal
        isOpen={isStagePitchModalOpen}
        onClose={() => setIsStagePitchModalOpen(false)}
        onLaunchFullSimulation={(scenId) => {
          setIsStagePitchModalOpen(false);
          handleStartScenarioById(scenId);
        }}
      />

      {/* Strategic Proposal & Executive Blueprint Modal */}
      <ProposalModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        onOpenInvestorROI={() => {
          setIsProposalOpen(false);
          setIsInvestorROIModalOpen(true);
        }}
      />

      {/* Google Cloud Template Presentation Deck Modal */}
      <GoogleCloudDeckModal
        isOpen={isGoogleDeckOpen}
        onClose={() => setIsGoogleDeckOpen(false)}
      />

      {/* Pusat Unduhan Berkas Submisi & Deck Modal */}
      {ENABLE_DOWNLOAD_HUB && (
        <DownloadHubModal
          isOpen={isDownloadHubOpen}
          onClose={() => setIsDownloadHubOpen(false)}
        />
      )}

      {/* Footer Standar Operasional Bersih */}
      <footer className="border-t border-slate-800 bg-slate-950/90 py-5 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-3">
          {/* Top row: Brand & Documentation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-white">Vokasta</span>
              <span>•</span>
              <span className="text-slate-400">
                {language === 'en'
                  ? 'Multimodal Frontline Competency Simulator & Sovereign Credential Passport'
                  : 'Simulator Kompetensi Frontliner Multimodal & Paspor Kredensial'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsProposalOpen(true)}
                className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-2 transition cursor-pointer"
                title={language === 'en' ? 'Open Full Strategic Proposal Onscreen' : 'Buka Dokumen Proposal Lengkap di Layar'}
              >
                {language === 'en' ? 'Proposal Online' : 'Proposal Online'}
              </button>
              {ENABLE_DOWNLOAD_HUB && (
                <>
                  <span className="text-slate-600">•</span>
                  <a
                    href="/api/download/proposal"
                    download="Vokasta_Strategic_Proposal.docx"
                    className="text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2 transition"
                    title={language === 'en' ? 'Download Microsoft Word (.docx) Proposal' : 'Unduh Berkas Proposal Microsoft Word (.docx)'}
                  >
                    {language === 'en' ? 'Proposal (.docx)' : 'Proposal (.docx)'}
                  </a>
                  <span className="text-slate-600">•</span>
                  <a
                    href="/api/download/spesifikasi"
                    download="Spesifikasi_Lengkap_Vokasta.docx"
                    className="text-slate-300 hover:text-white font-medium underline underline-offset-2 transition"
                    title={language === 'en' ? 'Download Full Technical Specification (.docx)' : 'Unduh Dokumen Spesifikasi Sistem Lengkap & Arsitektur (.docx)'}
                  >
                    {language === 'en' ? 'Spesifikasi (.docx)' : 'Spesifikasi (.docx)'}
                  </a>
                  <span className="text-slate-600">•</span>
                  <a
                    href="/api/download/manual"
                    download="Vokasta_User_Manual.docx"
                    className="text-slate-400 hover:text-amber-400 underline underline-offset-2 transition"
                    title={language === 'en' ? 'Download Vokasta User Manual (.docx)' : 'Unduh Panduan Penggunaan Vokasta (.docx)'}
                  >
                    {language === 'en' ? 'Manual (.docx)' : 'Manual (.docx)'}
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Bottom row: Standard Compliance & Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-900 gap-2">
            <span>
              {language === 'en'
                ? 'Multimodal Audio-Visual Inference & 1EdTech Open Badges v3.0 (W3C DID) Standards'
                : 'Inferensi Audio-Visual Multimodal & Standar 1EdTech Open Badges v3.0 (W3C DID)'}
            </span>
            <span>
              {language === 'en'
                ? '© 2026 Vokasta • All Rights Reserved'
                : '© 2026 Vokasta • Hak Cipta Dilindungi'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
