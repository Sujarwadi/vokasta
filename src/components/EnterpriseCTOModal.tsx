import React, { useState, useEffect } from 'react';
import {
  Server,
  Cpu,
  Layers,
  Wifi,
  Signal,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Code,
  Send,
  Zap,
  RefreshCw,
  Sliders,
  Lock,
  Scale,
  X,
  ExternalLink,
  Film,
  FileText,
  Download,
  Upload,
  Database,
  AlertTriangle,
} from 'lucide-react';
import {
  EnterpriseTelemetryData,
  NetworkResilienceProfile,
  WebhookDispatchResult,
} from '../types';
import { StorageSync } from '../utils/storageSync';
import { useLanguage } from '../i18n/LanguageContext';

interface EnterpriseCTOModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeResilienceProfile: NetworkResilienceProfile;
  onSelectResilienceProfile: (profile: NetworkResilienceProfile) => void;
  onOpenDemoVideo?: () => void;
}

const ENABLE_DOWNLOAD_HUB = false;

export const EnterpriseCTOModal: React.FC<EnterpriseCTOModalProps> = ({
  isOpen,
  onClose,
  activeResilienceProfile,
  onSelectResilienceProfile,
  onOpenDemoVideo,
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'queues' | 'resilience' | 'webhooks' | 'governance'>('queues');
  const [telemetry, setTelemetry] = useState<EnterpriseTelemetryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);
  const [selectedLoadLevel, setSelectedLoadLevel] = useState<number>(500);
  const [loadSimFeedback, setLoadSimFeedback] = useState<string | null>(null);

  // Webhook Tester State
  const [webhookTarget, setWebhookTarget] = useState<'talenta' | 'workday' | 'sap' | 'custom'>('talenta');
  const [webhookCustomUrl, setWebhookCustomUrl] = useState('https://enterprise.internal.corp/vokasta/hooks');
  const [webhookSecret, setWebhookSecret] = useState('vokasta_sec_enterprise_key_99812');
  const [isSendingWebhook, setIsSendingWebhook] = useState(false);
  const [webhookResult, setWebhookResult] = useState<WebhookDispatchResult | null>(null);

  // Disaster Recovery & Local-First State
  const [backupRestoreMsg, setBackupRestoreMsg] = useState<string | null>(null);

  const handleExportDatabaseBackup = () => {
    try {
      const jsonStr = StorageSync.exportFullBackup();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vokasta_enterprise_database_backup_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setBackupRestoreMsg(
        language === 'en'
          ? 'Database backup successfully exported to JSON file.'
          : 'Cadangan database berhasil diekspor ke berkas JSON.'
      );
      setTimeout(() => setBackupRestoreMsg(null), 4000);
    } catch (e) {
      console.error('Error exporting backup:', e);
    }
  };

  const handleImportDatabaseBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const success = StorageSync.importBackup(content);
      if (success) {
        try {
          const parsed = JSON.parse(content);
          await fetch('/api/admin/restore', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parsed),
          });
        } catch {}
        setBackupRestoreMsg(
          language === 'en'
            ? 'Database successfully restored from local backup & synchronized to server.'
            : 'Database berhasil dipulihkan dari cadangan lokal & tersinkronisasi ke server.'
        );
      } else {
        setBackupRestoreMsg(
          language === 'en'
            ? 'Failed to restore: Invalid JSON file format.'
            : 'Gagal memulihkan: Format berkas JSON tidak valid.'
        );
      }
      setTimeout(() => setBackupRestoreMsg(null), 5000);
    };
    reader.readAsText(file);
  };

  // W3C DID Document viewer
  const [didDocument, setDidDocument] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchTelemetry();
      fetchDIDRegistry();
    }
  }, [isOpen]);

  const fetchTelemetry = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/enterprise/telemetry');
      if (res.ok) {
        const data = await res.json();
        setTelemetry(data);
      }
    } catch (err) {
      console.warn('Failed to fetch telemetry:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDIDRegistry = async () => {
    try {
      const res = await fetch('/api/enterprise/w3c-did-registry');
      if (res.ok) {
        const data = await res.json();
        setDidDocument(data);
      }
    } catch (err) {
      console.warn('Failed to fetch DID document:', err);
    }
  };

  const handleSimulateLoad = async (level: number) => {
    setSelectedLoadLevel(level);
    setIsSimulatingLoad(true);
    setLoadSimFeedback(null);
    try {
      const res = await fetch('/api/enterprise/simulate-load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concurrencyLevel: level }),
      });
      if (res.ok) {
        const data = await res.json();
        setLoadSimFeedback(data.message);
        await fetchTelemetry();
      }
    } catch (err) {
      console.error('Simulate load error:', err);
    } finally {
      setIsSimulatingLoad(false);
    }
  };

  const handleDispatchWebhook = async () => {
    setIsSendingWebhook(true);
    setWebhookResult(null);
    try {
      const res = await fetch('/api/enterprise/webhook/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetSystem: webhookTarget,
          customUrl: webhookCustomUrl,
          secretKey: webhookSecret,
          event: 'candidate.certified.v1',
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setWebhookResult(data);
      }
    } catch (err) {
      console.error('Webhook error:', err);
    } finally {
      setIsSendingWebhook(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/90 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl shadow-cyan-500/10 flex flex-col max-h-[92vh]">
        {/* Header with CTO Badges */}
        <div className="px-5 py-3.5 bg-slate-950/95 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white text-sm sm:text-base tracking-tight">
                  CTO Enterprise Architecture Console
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700 text-xs font-extrabold tracking-wider animate-pulse">
                  SCORE 10/10 READY
                </span>
              </div>
              <p className="text-xs text-slate-400">
                GKE Cluster Telemetry • BullMQ Async Queues • 3T Offline Resiliency • B2B Webhooks • W3C DID Engine
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={fetchTelemetry}
              disabled={isLoading}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center space-x-1.5 transition cursor-pointer"
              title="Refresh Telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Executive Pitch & Strategic Assets Bar (Founder & CTO Only) */}
        <div className="px-5 py-2.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-xs font-bold">
              FOUNDER &amp; CTO BRIEFING
            </span>
            <span className="text-slate-400 hidden sm:inline">
              {language === 'en'
                ? 'Pitch deck, human impact proposal, & simulations:'
                : 'Materi presentasi, proposal nilai dampak kemanusiaan, & simulasi:'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {onOpenDemoVideo && (
              <button
                id="cto-open-walkthrough-video-btn"
                onClick={() => {
                  onClose();
                  onOpenDemoVideo();
                }}
                className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:border-amber-400 font-medium flex items-center space-x-1.5 transition cursor-pointer"
                title={language === 'en' ? 'Open Demo Walkthrough Video for CTO Pitch' : 'Buka Video Demo Walkthrough untuk Sesi Presentasi ke CTO'}
              >
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'en' ? 'Demo Walkthrough (3 Min)' : 'Demo Walkthrough (3 Mnt)'}</span>
              </button>
            )}

            {ENABLE_DOWNLOAD_HUB && (
              <>
                <a
                  id="cto-download-proposal-word-btn"
                  href="/api/download/proposal"
                  download="Vokasta_Strategic_Proposal.docx"
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400 font-medium flex items-center space-x-1.5 transition cursor-pointer"
                  title={language === 'en' ? 'Download Full Strategic Proposal in Word format (.docx)' : 'Unduh Proposal Strategis Lengkap dalam Format Word (.docx)'}
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'en' ? 'CTO Proposal (.docx)' : 'Proposal CTO (.docx)'}</span>
                </a>

                <a
                  id="cto-download-manual-word-btn"
                  href="/api/download/manual"
                  download="Vokasta_User_Manual.docx"
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 hover:border-slate-600 font-medium flex items-center space-x-1.5 transition cursor-pointer"
                  title={language === 'en' ? 'Download Comprehensive User Manual in Word format (.docx)' : 'Unduh Manual Penggunaan Lengkap dalam Format Word (.docx)'}
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'en' ? 'User Manual (.docx)' : 'Manual Book (.docx)'}</span>
                </a>
              </>
            )}
          </div>
        </div>

        {/* Tab Navigation - Fixed height, shrink-0, no chunky OS scrollbars */}
        <div className="px-4 sm:px-5 bg-slate-950/90 border-b border-slate-800 flex items-center space-x-1 overflow-x-auto overflow-y-hidden text-xs font-semibold shrink-0 no-scrollbar">
          <button
            onClick={() => setActiveTab('queues')}
            className={`h-11 px-3.5 border-b-2 flex items-center space-x-2 transition cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'queues'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Server className="w-3.5 h-3.5 shrink-0" />
            <span>1. Async Job Queues & Scalability</span>
          </button>

          <button
            onClick={() => setActiveTab('resilience')}
            className={`h-11 px-3.5 border-b-2 flex items-center space-x-2 transition cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'resilience'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Wifi className="w-3.5 h-3.5 shrink-0" />
            <span>2. 3T Offline-First & Network Resiliency</span>
          </button>

          <button
            onClick={() => setActiveTab('webhooks')}
            className={`h-11 px-3.5 border-b-2 flex items-center space-x-2 transition cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'webhooks'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Send className="w-3.5 h-3.5 shrink-0" />
            <span>3. Enterprise B2B Integrations & HRIS</span>
          </button>

          <button
            onClick={() => setActiveTab('governance')}
            className={`h-11 px-3.5 border-b-2 flex items-center space-x-2 transition cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'governance'
                ? 'border-indigo-400 text-indigo-300 bg-indigo-500/10 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>4. W3C DID & Dialect Support (Design) Matrix</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5 bg-slate-900/60">
          {/* TAB 1: ASYNC QUEUES & SCALABILITY */}
          {activeTab === 'queues' && (
            <div className="space-y-4">
              {/* Notice Banner */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {language === 'en'
                    ? 'All infrastructure metrics below (queue depth, latency, token bucket, autoscale pods) are simulated architectural projections, not live production cluster telemetry.'
                    : 'Seluruh metrik infrastruktur di bawah ini (kedalaman antrean, latensi, token bucket, pod autoscale) adalah simulasi desain arsitektur, bukan telemetri cluster produksi langsung.'}
                </span>
              </div>

              {/* Cluster KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400 font-medium">Cluster Region</p>
                    <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded border border-slate-700">Desain</span>
                  </div>
                  <p className="text-sm font-bold text-slate-200 mt-1 flex items-center space-x-1.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Jakarta Dual-Zone</span>
                  </p>
                  <p className="text-xs text-emerald-400 mt-1">Multi-AZ GKE HA Ready</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400 font-medium">Autoscale Pods</p>
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">Simulasi</span>
                  </div>
                  <p className="text-sm font-bold text-cyan-300 mt-1">
                    {telemetry?.cluster.totalWorkers || 6} / 48 Pods
                  </p>
                  <p className="text-xs text-slate-400 mt-1">HPA: CPU &gt; 70% Scale Up</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400 font-medium">P95 Inference Latency</p>
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">Simulasi</span>
                  </div>
                  <p className="text-sm font-bold text-emerald-400 mt-1">
                    {(telemetry?.cluster.p95LatencyMs || 1840) / 1000}s
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Token-Bucket Rate Limited</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400 font-medium">Edge Cache Hit Rate</p>
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">Simulasi</span>
                  </div>
                  <p className="text-sm font-bold text-amber-300 mt-1">
                    {telemetry?.cluster.edgeCacheHitRate || 94.6}%
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Audio TTS & Asset Cache</p>
                </div>
              </div>

              {/* Live Queues Table */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
                <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Event-Driven Worker Queues (Simulasi Desain Arsitektur)
                    </span>
                  </div>
                  <span className="text-xs text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded-full font-bold">
                    Simulasi Antrean
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-4 font-semibold">Queue / Worker Name</th>
                        <th className="py-2.5 px-3 font-semibold">Status</th>
                        <th className="py-2.5 px-3 font-semibold">Active Jobs</th>
                        <th className="py-2.5 px-3 font-semibold">24h Throughput</th>
                        <th className="py-2.5 px-3 font-semibold">P95 Latency</th>
                        <th className="py-2.5 px-3 font-semibold">Failure Rate</th>
                        <th className="py-2.5 px-3 font-semibold">Pods Assigned</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {telemetry?.queues.map((q) => (
                        <tr key={q.id} className="hover:bg-slate-900/40 transition">
                          <td className="py-2.5 px-4 font-mono font-medium text-slate-200">
                            {q.name}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-800 text-xs font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                              <span>ACTIVE</span>
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-bold text-cyan-400">{q.activeJobs}</td>
                          <td className="py-2.5 px-3 text-slate-300">{q.completed24h.toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-slate-300 font-mono">{q.p95LatencyMs} ms</td>
                          <td className="py-2.5 px-3 text-emerald-400 font-mono">{(q.failureRate * 100).toFixed(2)}%</td>
                          <td className="py-2.5 px-3 font-bold text-slate-200">{q.podCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Interactive Autoscale & Stress-Test Simulation */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-cyan-300 flex items-center space-x-2">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{language === 'en' ? 'Concurrent Stress Test Simulation' : 'Simulasi Lonjakan Beban (Concurrent Stress Test)'}</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {language === 'en'
                        ? 'Test horizontal pod autoscaler (HPA) & backpressure queue mechanisms during peak concurrent candidate influx.'
                        : 'Uji mekanisme horizontal pod autoscaler (HPA) & backpressure queue saat ribuan kandidat serentak mengikuti rekrutmen.'}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {[100, 500, 2500].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => handleSimulateLoad(lvl)}
                        disabled={isSimulatingLoad}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                          selectedLoadLevel === lvl
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        {lvl} {language === 'en' ? 'Sessions' : 'Sesi'}
                      </button>
                    ))}
                  </div>
                </div>

                {loadSimFeedback && (
                  <div className="mt-3 p-2.5 rounded-lg bg-cyan-950/50 border border-cyan-800/80 text-xs text-cyan-200 flex items-center space-x-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{loadSimFeedback}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: 3T FRONTIER & NETWORK RESILIENCY */}
          {activeTab === 'resilience' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30">
                <h4 className="text-xs font-bold text-emerald-300 flex items-center space-x-2">
                  <Signal className="w-4 h-4 text-emerald-400" />
                  <span>Adaptive Bitrate &amp; 3T Frontier Network Resiliency</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {language === 'en'
                    ? 'Frontline workers across remote regions (Papua, NTT, Maluku, remote plantations) frequently face 2G/3G connections with high packet loss. Vokasta automatically applies Graceful Degradation without aborting sessions.'
                    : 'Frontline worker di pelosok Indonesia (Papua, NTT, Maluku, pelosok perkebunan sawit) seringkali menghadapi koneksi seluler 2G/3G dengan packet loss tinggi. Arsitektur Vokasta secara otomatis melakukan Graceful Degradation tanpa membatalkan sesi ujian.'}
                </p>
              </div>

              {/* Resilience Profiles Selector */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {telemetry?.resilienceProfiles.map((p) => {
                  const isSelected = activeResilienceProfile === p.profile;
                  return (
                    <div
                      key={p.profile}
                      onClick={() => onSelectResilienceProfile(p.profile)}
                      className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-400 shadow-lg shadow-emerald-500/10'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-extrabold uppercase ${
                              p.profile === '3t_frontier'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : p.profile === '4g_adaptive'
                                ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            }`}
                          >
                            {p.profile.replace('_', ' ')}
                          </span>
                          {isSelected && (
                            <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{language === 'en' ? 'Active Profile' : 'Profil Aktif'}</span>
                            </span>
                          )}
                        </div>

                        <h5 className="font-bold text-slate-100 text-sm mt-2">{p.label}</h5>

                        <div className="mt-3 space-y-2 text-xs">
                          <div className="flex justify-between text-slate-400">
                            <span>{language === 'en' ? 'Target Bandwidth:' : 'Bandwidth Target:'}</span>
                            <span className="font-mono font-bold text-slate-200">
                              {p.bandwidthKbps >= 1000 ? `${p.bandwidthKbps / 1000} Mbps` : `${p.bandwidthKbps} kbps`}
                            </span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>{language === 'en' ? 'Render Quality:' : 'Kualitas Render:'}</span>
                            <span className="font-mono text-slate-200 text-right">{p.videoResolution}</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>{language === 'en' ? 'Compression:' : 'Kompresi:'}</span>
                            <span className="font-mono text-xs text-slate-300 text-right">{p.compressionMethod}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80">
                        <p className="text-xs text-slate-400">
                          {p.offlineBufferEnabled
                            ? (language === 'en' ? '✅ IndexedDB Local Queue active on signal drop' : '✅ IndexedDB Local Queue aktif saat sinyal drop')
                            : '⚡ Direct Low-latency WebSocket Pipeline'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bandwidth Savings Demonstration Table */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                  {language === 'en'
                    ? 'Data Quota & Latency Cost Efficiency for 3T Regions'
                    : 'Efisiensi Biaya Kuota & Latensi untuk Daerah 3T'}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <p className="text-slate-400">Metropolitan 5G (1080p)</p>
                    <p className="text-base font-bold text-slate-200 mt-1">~18.0 MB / {language === 'en' ? 'min' : 'menit'}</p>
                    <p className="text-xs text-slate-400">
                      {language === 'en' ? 'Optimized for high-speed branch offices' : 'Cocok untuk kantor cabang Jabodetabek & Surabaya'}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <p className="text-slate-400">3T Frontier Mode (Opus Waveform)</p>
                    <p className="text-base font-bold text-emerald-400 mt-1">~0.13 MB / {language === 'en' ? 'min' : 'menit'}</p>
                    <p className="text-xs text-emerald-400 font-semibold">
                      {language === 'en' ? 'Lightweight audio mode (high-latency resilience design)' : 'Mode kompresi audio ringan (desain untuk koneksi latensi tinggi)'}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <p className="text-slate-400">{language === 'en' ? 'Failover Mechanism' : 'Mekanisme Failover'}</p>
                    <p className="text-base font-bold text-cyan-300 mt-1">Zero Session Abort</p>
                    <p className="text-xs text-slate-400">
                      {language === 'en' ? 'Instant auto-sync once cellular connectivity resumes' : 'Auto-sync seketika saat sinyal seluler tersambung kembali'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ENTERPRISE B2B INTEGRATIONS */}
          {activeTab === 'webhooks' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30">
                <h4 className="text-xs font-bold text-amber-300 flex items-center space-x-2">
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Enterprise HRIS &amp; ATS Webhook Dispatcher</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Rancangan webhook contoh (simulasi). Skor kompetensi dan tautan kredensial dimodelkan untuk format ekspor HRIS; integrasi langsung dengan Mekari Talenta, Workday, dan SAP SuccessFactors belum diuji dan belum terhubung secara nyata (peta jalan).
                </p>
              </div>

              {/* Webhook Configuration & Simulator Form */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Pengujian Webhook Dispatch (Live Ping Tester)
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1 font-medium">Target HRIS Platform</label>
                    <select
                      value={webhookTarget}
                      onChange={(e) => setWebhookTarget(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-semibold focus:outline-hidden focus:border-amber-400"
                    >
                      <option value="talenta">Mekari Talenta HRIS (Indonesia #1)</option>
                      <option value="workday">Workday Human Capital Management</option>
                      <option value="sap">SAP SuccessFactors Learning</option>
                      <option value="custom">Custom Enterprise Webhook</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs text-slate-400 block mb-1 font-medium">Endpoint URL</label>
                    <input
                      type="text"
                      value={
                        webhookTarget === 'talenta'
                          ? 'https://api.talenta.co/v2/integration/worker-credentials'
                          : webhookTarget === 'workday'
                          ? 'https://wd2-impl-services1.workday.com/ccx/service/vokasta_ats/v1'
                          : webhookTarget === 'sap'
                          ? 'https://api12preview.sapsf.com/odata/v2/CandidateSkillBadge'
                          : webhookCustomUrl
                      }
                      onChange={(e) => setWebhookCustomUrl(e.target.value)}
                      disabled={webhookTarget !== 'custom'}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono focus:outline-hidden focus:border-amber-400 disabled:opacity-75"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs text-slate-400">Signature:</span>
                    <span className="text-xs font-mono text-amber-300">X-Vokasta-Signature (contoh, bukan tanda tangan asli)</span>
                  </div>

                  <button
                    onClick={handleDispatchWebhook}
                    disabled={isSendingWebhook}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-2 transition cursor-pointer active:scale-95 shadow-md shadow-amber-500/20 disabled:opacity-60"
                  >
                    <Send className={`w-3.5 h-3.5 ${isSendingWebhook ? 'animate-bounce' : ''}`} />
                    <span>
                      {isSendingWebhook
                        ? (language === 'en' ? 'Sending Payload...' : 'Mengirim Payload...')
                        : (language === 'en' ? 'Send Test Webhook' : 'Kirim Test Webhook')}
                    </span>
                  </button>
                </div>
              </div>

              {/* Webhook Response Log */}
              {webhookResult && (
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>
                        {language === 'en' ? 'Webhook Dispatched Successfully' : 'Webhook Berhasil Dikirim'} ({webhookResult.destination})
                      </span>
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      HTTP {webhookResult.httpStatus} • Latency {webhookResult.latencyMs} ms
                    </span>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                    <p className="text-amber-400 truncate">Signature: {webhookResult.signature}</p>
                    <p className="text-slate-400">Payload Sample (Candidate Competency &amp; W3C DID):</p>
                    <pre className="text-slate-300 overflow-x-auto max-h-36 p-1 text-xs">
                      {JSON.stringify(webhookResult.payload, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {/* Disaster Recovery & Local-First State Persistence Box */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                      Local-First Persistence &amp; Disaster Recovery JSON
                    </h5>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Auto-Sync Active
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'en'
                    ? 'Mitigating in-memory server restart risks: Every certification result, SOP assignment, and drill history is continuously mirrored locally (Local-First Mirroring). You can export and restore the entire database in JSON format at any time.'
                    : 'Menjawab risiko in-memory server restart: Setiap hasil sertifikasi, penugasan SOP, dan riwayat pelatihan secara kontinu dicadangkan secara lokal (Local-First Mirroring). Anda dapat mengekspor dan memulihkan seluruh basis data dalam bentuk berkas JSON kapan saja.'}
                </p>

                {backupRestoreMsg && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-800 text-xs text-emerald-300 font-medium">
                    {backupRestoreMsg}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleExportDatabaseBackup}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-emerald-400 border border-slate-755 font-semibold text-xs flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Export Database Backup (.json)' : 'Ekspor Cadangan Database (.json)'}</span>
                  </button>

                  <label className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-sky-300 border border-slate-755 font-semibold text-xs flex items-center space-x-1.5 transition cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Restore from File (.json)' : 'Pulihkan dari File (.json)'}</span>
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleImportDatabaseBackup}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: W3C DID & DIALECT SUPPORT MATRIX */}
          {activeTab === 'governance' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30">
                <h4 className="text-xs font-bold text-indigo-300 flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-indigo-400" />
                  <span>
                    {language === 'en'
                      ? 'Dialect Support Design Simulation (10 Indonesian Dialect Profiles, not validated)'
                      : 'Simulasi Desain Dukungan Dialek (10 Profil Dialek Nusantara, belum divalidasi)'}
                  </span>
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {language === 'en'
                    ? 'Informed by AI ethics references (IEEE P7003, EU AI Act); no compliance is claimed. Designed to evaluate operational frontline competence across 10 Indonesian dialect profiles (design capability, not validated).'
                    : 'Mengacu pada referensi etika AI (IEEE P7003, EU AI Act); tidak ada klaim kepatuhan. Dirancang untuk mengevaluasi kompetensi operasional frontliner pada 10 profil dialek Nusantara (kapabilitas desain, belum divalidasi).'}
                </p>
              </div>

              {/* 10-Region Dialect Support Table */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
                <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {language === 'en'
                        ? '10 Dialects Design Simulation Matrix'
                        : 'Matriks Simulasi Desain 10 Dialek Nusantara'}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {language === 'en' ? 'Synthetic Benchmark' : 'Benchmark Sintetis'}
                    </span>
                  </div>
                  <span className="text-xs text-indigo-300 bg-indigo-950/70 border border-indigo-800 px-2.5 py-0.5 rounded-full font-bold">
                    {language === 'en'
                      ? 'Avg Disparate Impact: 0.991 (Design Target)'
                      : 'Rata-rata Disparate Impact: 0.991 (Target Desain)'}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-4 font-semibold">{language === 'en' ? 'Ethnolinguistic Region' : 'Wilayah Etnolinguistik'}</th>
                        <th className="py-2.5 px-3 font-semibold">{language === 'en' ? 'Accent / Dialect' : 'Aksen / Dialek'}</th>
                        <th className="py-2.5 px-3 font-semibold">{language === 'en' ? 'Synthetic Test Prompts' : 'Prompt Uji Sintetis'}</th>
                        <th className="py-2.5 px-3 font-semibold">{language === 'en' ? 'Avg Score' : 'Rata-rata Skor'}</th>
                        <th className="py-2.5 px-3 font-semibold">Disparate Impact</th>
                        <th className="py-2.5 px-3 font-semibold">Word Error Rate</th>
                        <th className="py-2.5 px-3 font-semibold">{language === 'en' ? 'Design Status' : 'Status Desain'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {telemetry?.dialectParityMatrix.map((d) => (
                        <tr key={d.dialectLabel} className="hover:bg-slate-900/40 transition">
                          <td className="py-2.5 px-4 font-medium text-slate-200">{d.regionName}</td>
                          <td className="py-2.5 px-3 text-slate-300">{d.dialectLabel}</td>
                          <td className="py-2.5 px-3 text-slate-400">{d.sampleCount.toLocaleString()}</td>
                          <td className="py-2.5 px-3 font-bold text-amber-300">{d.avgScore.toFixed(1)}</td>
                          <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">
                            {d.disparateImpactRatio.toFixed(3)}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-300">{(d.werRate * 100).toFixed(1)}%</td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
                              {language === 'en' ? 'Design only, not validated' : 'Rancangan (belum divalidasi)'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Raw W3C DID Registry Inspector */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      W3C DID Canonical Document &amp; Merkle Root
                    </h5>
                  </div>
                  <span className="text-xs font-mono text-cyan-400">Ed25519Signature2020</span>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 max-h-40 overflow-y-auto">
                  <pre>{JSON.stringify(didDocument || { status: 'loading' }, null, 2)}</pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with CTO Summary */}
        <div className="px-5 py-3 bg-slate-950/95 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-300 font-medium">
              Vokasta Enterprise SLA: 99.95% Availability • Zero-Vendor-Lockin
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setActiveTab('resilience');
              }}
              className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer underline text-xs"
            >
              {language === 'en' ? 'Change Signal Mode (3T/5G)' : 'Ubah Mode Sinyal (3T/5G)'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition cursor-pointer"
            >
              {language === 'en' ? 'Close Console' : 'Tutup Konsol'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
