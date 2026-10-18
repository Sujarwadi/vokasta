import React from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

interface GetStartedGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onStartScenario: (scenarioId?: string) => void;
  isLoading: boolean;
  isCandidate?: boolean;
  language?: 'id' | 'en';
}

export const GetStartedGuide: React.FC<GetStartedGuideProps> = ({
  isOpen,
  onClose,
  onStartScenario,
  isLoading,
  isCandidate = false,
  language = 'id',
}) => {
  if (!isOpen) return null;

  const recommendedScenarioId = isCandidate ? 'scen_jobseeker_hospitality_basic' : 'scen_greeting_01';

  return (
    <div
      id="get-started-guide-card"
      className="relative rounded-xl bg-slate-900/95 border border-amber-500/40 px-4 py-3 shadow-lg backdrop-blur-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
    >
      <div className="flex items-center space-x-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>
        <div className="space-y-0.5 min-w-0">
          <span className="font-bold text-white block">
            {language === 'en' ? 'Quick Start Guide' : 'Panduan Mulai'}
          </span>
          <p className="text-slate-300 leading-normal">
            {language === 'en'
              ? 'Practice with simulated customers, evaluated per parameter, results recorded into a sample passport.'
              : 'Latihan dengan pelanggan simulasi, dinilai per parameter, hasilnya masuk ke paspor contoh.'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
        <button
          type="button"
          onClick={() => onStartScenario(recommendedScenarioId)}
          disabled={isLoading}
          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center space-x-1.5 transition cursor-pointer active:scale-95 disabled:opacity-50"
        >
          <span>{language === 'en' ? 'Start Practice' : 'Mulai Latihan'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          id="dismiss-get-started-btn"
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          title={language === 'en' ? 'Dismiss banner' : 'Tutup panduan'}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
