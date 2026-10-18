import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  PlayCircle,
  ArrowRight,
  Store,
  ChevronDown,
} from 'lucide-react';
import { SOPAssignment } from '../types';
import { STAFF_PROFILES, getLocalizedStaffProfile, getLocalizedAssignment } from '../data/assignments';
import { useLanguage } from '../i18n/LanguageContext';
import { useWorkspace } from '../context/WorkspaceContext';

interface StaffAssignmentListProps {
  assignments: SOPAssignment[];
  onStartAssignment: (scenarioId: string) => void;
  activeStaffId?: string;
  onSelectStaff?: (staffId: string) => void;
}

export const StaffAssignmentList: React.FC<StaffAssignmentListProps> = ({
  assignments,
  onStartAssignment,
  activeStaffId = 'staff_budi',
}) => {
  const { language } = useLanguage();
  const { activeWorkspace } = useWorkspace();
  const [isOtherTasksOpen, setIsOtherTasksOpen] = useState(false);
  
  // Staff profile is strictly locked to the active tenant workspace
  const targetStaffId = activeWorkspace.defaultStaffId || activeStaffId;
  const rawActiveStaff = STAFF_PROFILES.find((p) => p.id === targetStaffId) || STAFF_PROFILES[0];
  const activeStaff = getLocalizedStaffProfile(rawActiveStaff, language);

  // Filter ONLY assignments directed to this specific staff profile in this workspace
  const staffAssignments = assignments.filter(
    (a) => a.staff_id === rawActiveStaff.id || a.assigned_to_name.includes(rawActiveStaff.name)
  );

  const pendingAssignments = staffAssignments.filter((a) => a.status === 'pending');
  const completedAssignments = staffAssignments.filter((a) => a.status === 'completed');

  // Single priority assignment (displayed prominently as the main action on first screen)
  const priorityAssignment = pendingAssignments.find((a) => a.priority === 'Tinggi') || pendingAssignments[0];
  const otherPendingTasks = pendingAssignments.filter((a) => a.id !== priorityAssignment?.id);

  return (
    <div className="space-y-4">
      {/* Staff Identity Context Header (Compact) */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-md backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-xl ${activeStaff.avatar_color} font-black text-sm flex items-center justify-center shadow-md shrink-0`}>
            {activeStaff.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-white tracking-tight">
                {activeStaff.name}
              </h2>
              <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                {activeStaff.role_title}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 flex items-center space-x-1">
              <Store className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{activeStaff.outlet}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-slate-300 font-medium">
            <strong className="text-white font-bold">{pendingAssignments.length}</strong> {language === 'en' ? 'Pending' : 'Menunggu'}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-medium">
            <strong className="text-emerald-400 font-bold">{completedAssignments.length}</strong> {language === 'en' ? 'Done' : 'Selesai'}
          </span>
        </div>
      </div>

      {/* SINGLE PRIORITY TASK: Aksi Utama Layar Pertama */}
      {priorityAssignment ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{language === 'en' ? 'Priority Assignment (Main Action)' : 'Tugas Prioritas (Aksi Utama)'}</span>
            </span>
            <div className="flex items-center space-x-1 text-amber-300 font-mono text-[11px]">
              <Clock className="w-3 h-3" />
              <span>{language === 'en' ? 'Deadline:' : 'Tenggat:'} {getLocalizedAssignment(priorityAssignment, language).deadline}</span>
            </div>
          </div>

          {(() => {
            const task = getLocalizedAssignment(priorityAssignment, language);
            const isUrgent = priorityAssignment.priority === 'Tinggi' || task.priority === 'Tinggi';
            return (
              <div
                id="priority-staff-assignment-card"
                className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border-2 border-amber-500/60 rounded-2xl p-5 shadow-xl space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                      {task.brand_sop}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      isUrgent ? 'bg-rose-950/80 text-rose-300 border-rose-800' : 'bg-amber-950/80 text-amber-300 border-amber-800'
                    }`}>
                      {language === 'en' ? 'High Priority' : 'Prioritas Tinggi'}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {task.scenario_title}
                  </h3>

                  {task.notes && (
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <span className="font-semibold text-amber-400 block mb-0.5">
                        {language === 'en' ? 'Supervisor Directives:' : 'Catatan Supervisor:'}
                      </span>
                      "{task.notes}"
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  id="start-priority-assignment-btn"
                  onClick={() => onStartAssignment(task.scenario_id)}
                  className="w-full py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 transition shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <PlayCircle className="w-5 h-5 text-slate-950" />
                  <span>{language === 'en' ? 'Start This Assignment' : 'Mulai Simulasi Tugas Ini'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            );
          })()}
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <h4 className="text-sm font-bold text-white">
            {language === 'en' ? 'All Assigned Tasks Completed!' : 'Semua Tugas Penugasan Selesai!'}
          </h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {language === 'en'
              ? 'No pending tasks left for this shift.'
              : 'Tidak ada tugas yang menunggu untuk shift ini.'}
          </p>
        </div>
      )}

      {/* ACCORDION: Tugas Lainnya & Riwayat (Dilipat Secara Bawaan) */}
      {(otherPendingTasks.length > 0 || completedAssignments.length > 0) && (
        <div className="pt-2">
          <button
            type="button"
            id="toggle-other-tasks-accordion"
            onClick={() => setIsOtherTasksOpen(!isOtherTasksOpen)}
            className="w-full py-2 px-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-xs text-slate-300 font-semibold flex items-center justify-between transition cursor-pointer"
          >
            <span>
              {language === 'en'
                ? `Other Tasks & History (${otherPendingTasks.length + completedAssignments.length})`
                : `Tugas Lainnya & Riwayat (${otherPendingTasks.length + completedAssignments.length})`}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOtherTasksOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOtherTasksOpen && (
            <div className="mt-3 space-y-3 pt-1">
              {/* Other Pending Tasks */}
              {otherPendingTasks.map((rawTask) => {
                const task = getLocalizedAssignment(rawTask, language);
                return (
                  <div
                    key={task.id}
                    className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="text-[10px] text-amber-400 font-mono block">{task.brand_sop}</span>
                      <h4 className="font-bold text-white mt-0.5">{task.scenario_title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{task.notes}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onStartAssignment(task.scenario_id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold transition text-xs flex items-center space-x-1 shrink-0 self-start sm:self-center cursor-pointer"
                    >
                      <span>{language === 'en' ? 'Start' : 'Mulai'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}

              {/* Completed Tasks */}
              {completedAssignments.map((rawTask) => {
                const task = getLocalizedAssignment(rawTask, language);
                return (
                  <div
                    key={task.id}
                    className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="text-slate-300 font-semibold">{task.scenario_title}</span>
                      <span className="text-[10px] text-slate-500 block">{task.brand_sop}</span>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{language === 'en' ? 'Completed' : 'Selesai'}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => onStartAssignment(task.scenario_id)}
                        className="text-slate-400 hover:text-amber-300 text-xs underline cursor-pointer"
                      >
                        {language === 'en' ? 'Retake' : 'Latihan Ulang'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
