import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Send,
  X,
  Trash2
} from 'lucide-react';
import { SOPAssignment } from '../types';
import { SCENARIOS } from '../data/scenarios';
import { STAFF_PROFILES, getLocalizedStaffProfile, getLocalizedAssignment } from '../data/assignments';
import { getLocalizedScenario } from '../i18n/scenarioTranslations';
import { useLanguage } from '../i18n/LanguageContext';
import { useWorkspace } from '../context/WorkspaceContext';

interface AssignSOPModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignments: SOPAssignment[];
  onAddAssignment: (assignment: SOPAssignment) => void;
  onDeleteAssignment?: (id: string) => void;
}

export const AssignSOPModal: React.FC<AssignSOPModalProps> = ({
  isOpen,
  onClose,
  assignments,
  onAddAssignment,
  onDeleteAssignment,
}) => {
  const { language } = useLanguage();
  const { activeWorkspace } = useWorkspace();

  // Filter staff to ONLY the active tenant workspace!
  const tenantStaffProfiles = STAFF_PROFILES.filter((p) => p.department === activeWorkspace.department);
  const activeStaff = tenantStaffProfiles[0] || STAFF_PROFILES[0];
  const [selectedStaffId, setSelectedStaffId] = useState<string>(activeStaff.id);

  // Filter scenarios to ONLY those belonging to this workspace department!
  const deptScenarios = SCENARIOS.filter(
    (s) => s.target_audience === 'staff' && s.department === activeWorkspace.department
  );
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    deptScenarios[0]?.id || SCENARIOS[0].id
  );

  React.useEffect(() => {
    if (activeStaff) {
      setSelectedStaffId(activeStaff.id);
    }
    if (deptScenarios[0]) {
      setSelectedScenarioId(deptScenarios[0].id);
    }
  }, [activeWorkspace.id]);
  const [deadline, setDeadline] = useState<string>('2025-04-15');
  const [priority, setPriority] = useState<'Tinggi' | 'Sedang' | 'Normal'>('Tinggi');
  const [notes, setNotes] = useState<string>(
    language === 'en'
      ? 'Please complete the roleplay drill before the upcoming store audit.'
      : 'Mohon selesaikan latihan roleplay sebelum audit gerai berkala.'
  );
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

    const newAssignment: SOPAssignment = {
      id: `assign_${Date.now()}`,
      staff_id: activeStaff.id,
      department: activeStaff.department,
      scenario_id: scenario.id,
      scenario_title: scenario.title,
      assigned_to_role: 'staff',
      assigned_to_name: `${activeStaff.name} (${activeStaff.role_title})`,
      assigned_by: 'Hendra (Store Manager / Owner)',
      deadline: deadline,
      status: 'pending',
      brand_sop: scenario.brand_name || `${activeStaff.brand_name} SOP`,
      priority: priority,
      notes: notes,
    };

    onAddAssignment(newAssignment);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-750 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {language === 'en' ? 'SOP Assignment & Staff Deadlines' : 'Penugasan SOP & Batas Waktu Staf'}
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'en'
                  ? 'Assign official SOP modules to frontline staff with strict deadlines.'
                  : 'Tetapkan modul skenario SOP resmi ke staf gerai dengan batas tenggat waktu.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {showSuccessToast && (
            <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {language === 'en'
                  ? 'SOP assignment issued and queued to staff portal!'
                  : 'Penugasan SOP berhasil diterbitkan dan langsung dikirim ke antrean staf!'}
              </span>
            </div>
          )}

          {/* Form Create Assignment */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'en' ? 'Select Scenario / Assigned SOP:' : 'Pilih Skenario / SOP yang Ditugaskan:'}
              </label>
              <select
                value={selectedScenarioId}
                onChange={(e) => setSelectedScenarioId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {deptScenarios.map((rawScen) => {
                  const scen = getLocalizedScenario(rawScen, language);
                  return (
                    <option key={scen.id} value={scen.id}>
                      [{scen.status || (language === 'en' ? 'Active' : 'Aktif')}] {scen.title}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {language === 'en' ? 'Assign To Frontline Staff:' : 'Tugaskan Kepada Staf Frontline Gerai:'}
                </label>
                <select
                  value={selectedStaffId}
                  onChange={(e) => setSelectedStaffId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {tenantStaffProfiles.map((rawP) => {
                    const p = getLocalizedStaffProfile(rawP, language);
                    return (
                      <option key={p.id} value={p.id}>
                        {p.name}: {p.role_title} ({p.outlet})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {language === 'en' ? 'Completion Deadline:' : 'Batas Tenggat Waktu (Deadline):'}
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {language === 'en' ? 'Priority Level:' : 'Tingkat Prioritas:'}
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'Tinggi' | 'Sedang' | 'Normal')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Tinggi">{language === 'en' ? 'High (Mandatory this week)' : 'Tinggi (Wajib minggu ini)'}</option>
                  <option value="Sedang">{language === 'en' ? 'Medium (Routine refresher)' : 'Sedang (Penyegaran rutin)'}</option>
                  <option value="Normal">{language === 'en' ? 'Normal (Enrichment)' : 'Normal (Pengayaan wawasan)'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {language === 'en' ? 'Manager Directive Notes:' : 'Catatan Pengarah Manajer/Owner:'}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={language === 'en' ? 'e.g. Focus on eye contact and palm sugar recipe...' : 'Contoh: Fokus pada kontak mata dan penjelasan gula aren...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'en' ? 'Issue Assignment to Staff' : 'Terbitkan Penugasan ke Staf'}</span>
            </button>
          </form>

          {/* Active Assignments Overview Table */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>{language === 'en' ? `Active Assignments (${assignments.length})` : `Daftar Penugasan Aktif (${assignments.length})`}</span>
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {assignments.map((rawItem) => {
                const item = getLocalizedAssignment(rawItem, language);
                return (
                <div
                  key={item.id}
                  className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5 truncate">
                    <span className="font-semibold text-slate-200 block truncate">
                      {item.scenario_title}
                    </span>
                    <span className="text-xs text-slate-400 block">
                      {language === 'en' ? 'For:' : 'Untuk:'} <strong className="text-amber-400">{item.assigned_to_name}</strong> • {language === 'en' ? 'Deadline:' : 'Tenggat:'} {item.deadline} • {language === 'en' ? 'Priority:' : 'Prioritas:'} {rawItem.priority === 'Tinggi' ? (language === 'en' ? 'High' : 'Tinggi') : rawItem.priority === 'Sedang' ? (language === 'en' ? 'Medium' : 'Sedang') : (language === 'en' ? 'Normal' : 'Normal')}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                      item.status === 'completed'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border-amber-800'
                    }`}>
                      {item.status === 'completed' ? (language === 'en' ? 'Done' : 'Selesai') : (language === 'en' ? 'Pending' : 'Menunggu')}
                    </span>
                    {onDeleteAssignment && (
                      <button
                        type="button"
                        onClick={() => onDeleteAssignment(item.id)}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
                        title={language === 'en' ? 'Delete assignment' : 'Hapus Penugasan'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>{language === 'en' ? 'Assignment updates are saved and synced to staff portals.' : 'Perubahan penugasan otomatis tersimpan di antrean staf gerai.'}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            {language === 'en' ? 'Close' : 'Tutup'}
          </button>
        </div>
      </div>
    </div>
  );
};
