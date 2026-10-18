// VOKASTA - Local-First Durable Persistence & Disaster Recovery Engine
// Mencegah data hilang saat dev server/container Cloud Run restart

export interface PlatformStateBackup {
  version: string;
  exported_at: string;
  app_id: string;
  sessions: any[];
  results: any[];
  assignments: any[];
  hris_configs?: any[];
}

const STORAGE_KEYS = {
  SESSIONS: 'vokasta_sessions_backup',
  RESULTS: 'vokasta_results_backup',
  ASSIGNMENTS: 'vokasta_assignments_backup',
  HRIS_CONFIGS: 'vokasta_hris_configs',
  ACTIVE_RESULT: 'vokasta_last_active_result',
};

export const StorageSync = {
  // Simpan hasil asesmen terbaru
  saveResult(result: any) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_RESULT, JSON.stringify(result));
      const existing = this.getResults();
      const filtered = existing.filter((r) => r.id !== result.id && r.session_id !== result.session_id);
      filtered.unshift(result);
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(filtered.slice(0, 50)));
    } catch (e) {
      console.warn('[StorageSync] Gagal menyimpan hasil ke local storage:', e);
    }
  },

  getLastActiveResult(): any | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_RESULT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  getResults(): any[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // Simpan penugasan SOP
  saveAssignments(assignments: any[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
    } catch (e) {
      console.warn('[StorageSync] Gagal menyimpan assignments:', e);
    }
  },

  getAssignments(): any[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // Simpan konfigurasi HRIS Webhook
  saveHRISConfig(config: any) {
    try {
      localStorage.setItem(STORAGE_KEYS.HRIS_CONFIGS, JSON.stringify(config));
    } catch (e) {
      console.warn('[StorageSync] Gagal menyimpan HRIS config:', e);
    }
  },

  getHRISConfig(): any {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HRIS_CONFIGS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback default
    }
    return {
      id: 'hris_default_cfg',
      system_name: 'Mekari Talenta',
      webhook_url: 'https://api.talenta.co/v2/webhooks/competency_verified',
      secret_key: 'vokasta_enterprise_sec_' + Math.random().toString(36).substring(2, 10),
      auto_dispatch_on_pass: true,
      last_dispatch_at: new Date().toISOString(),
      last_status_code: 200,
    };
  },

  // Ekspor seluruh database dalam bentuk JSON backup
  exportFullBackup(): string {
    const backup: PlatformStateBackup = {
      version: '1.4.0-enterprise',
      exported_at: new Date().toISOString(),
      app_id: 'VOKASTA-ENTERPRISE-PROD',
      sessions: [],
      results: this.getResults(),
      assignments: this.getAssignments(),
      hris_configs: [this.getHRISConfig()],
    };
    return JSON.stringify(backup, null, 2);
  },

  // Import dan pulihkan database dari JSON
  importBackup(jsonString: string): boolean {
    try {
      const parsed: PlatformStateBackup = JSON.parse(jsonString);
      if (Array.isArray(parsed.results)) {
        localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(parsed.results));
        if (parsed.results[0]) {
          localStorage.setItem(STORAGE_KEYS.ACTIVE_RESULT, JSON.stringify(parsed.results[0]));
        }
      }
      if (Array.isArray(parsed.assignments)) {
        localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(parsed.assignments));
      }
      if (parsed.hris_configs && parsed.hris_configs[0]) {
        localStorage.setItem(STORAGE_KEYS.HRIS_CONFIGS, JSON.stringify(parsed.hris_configs[0]));
      }
      return true;
    } catch (e) {
      console.error('[StorageSync] Format backup tidak valid:', e);
      return false;
    }
  },
};
