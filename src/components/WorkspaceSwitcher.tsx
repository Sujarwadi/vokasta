import React, { useState, useRef, useEffect } from 'react';
import { Coffee, ShoppingBag, Car, ChevronDown, Check, Building2, Sparkles } from 'lucide-react';
import { useWorkspace, ENTERPRISE_WORKSPACES, EnterpriseWorkspaceId } from '../context/WorkspaceContext';
import { useLanguage } from '../i18n/LanguageContext';

interface WorkspaceSwitcherProps {
  className?: string;
}

export const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({ className = '' }) => {
  const { activeWorkspace, workspaceId, setWorkspaceId, workspaces } = useWorkspace();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (iconName: string, className = 'w-4 h-4') => {
    switch (iconName) {
      case 'shopping-bag':
        return <ShoppingBag className={className} />;
      case 'car':
        return <Car className={className} />;
      case 'coffee':
      default:
        return <Coffee className={className} />;
    }
  };

  const getBadgeColor = (id: EnterpriseWorkspaceId) => {
    switch (id) {
      case 'retail_fashion':
        return 'text-purple-300 bg-purple-950/80 border-purple-800';
      case 'automotive_ev':
        return 'text-sky-300 bg-sky-950/80 border-sky-800';
      case 'fnb_kopi':
      default:
        return 'text-amber-300 bg-amber-950/80 border-amber-800';
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        id="workspace-switcher-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 hover:border-slate-600 text-xs text-slate-200 transition cursor-pointer shadow-xs active:scale-[0.98]"
        title={language === 'en' ? 'Switch Enterprise Workspace Tenant' : 'Ganti Ruang Kerja / Tenant Brand'}
      >
        <span className={`p-1 rounded-md border ${getBadgeColor(activeWorkspace.id)}`}>
          {getIcon(activeWorkspace.iconName, 'w-3.5 h-3.5')}
        </span>
        <div className="text-left hidden sm:block">
          <div className="text-[10px] text-slate-400 font-medium leading-none flex items-center space-x-1">
            <span>{language === 'en' ? 'Workspace' : 'Tenant Gerai'}</span>
            <span className="text-emerald-400 font-mono text-[9px] uppercase tracking-wider">Live</span>
          </div>
          <div className="text-xs font-bold text-white leading-tight truncate max-w-[150px]">
            {language === 'en' ? activeWorkspace.nameEn : activeWorkspace.name}
          </div>
        </div>
        <div className="text-left sm:hidden">
          <span className="text-xs font-bold text-white">
            {language === 'en' ? activeWorkspace.nameEn.split(' ')[0] : activeWorkspace.name.split(' ')[0]}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 sm:right-auto mt-2 w-80 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl z-50 p-2.5 backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-2.5 py-1.5 mb-1.5 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'en' ? 'Enterprise Tenant Isolation' : 'Isolasi Tenant Gerai'}</span>
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
                Multi-Tenant
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              {language === 'en'
                ? 'Select a business ecosystem. Staff portals, SOP rubrics, branch analytics, and staff IDs automatically adapt.'
                : 'Pilih ekosistem bisnis. Portal staf, rubrik SOP, analitik gerai cabang, dan profil frontliner otomatis terisolasi.'}
            </p>
          </div>

          <div className="space-y-1">
            {workspaces.map((ws) => {
              const isSelected = ws.id === activeWorkspace.id;
              return (
                <button
                  key={ws.id}
                  id={`select-workspace-${ws.id}`}
                  type="button"
                  onClick={() => {
                    setWorkspaceId(ws.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl transition flex items-start space-x-3 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 border border-slate-700 shadow-sm'
                      : 'hover:bg-slate-850 border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-lg border mt-0.5 shrink-0 ${getBadgeColor(ws.id)}`}>
                    {getIcon(ws.iconName, 'w-4 h-4')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white truncate">
                        {language === 'en' ? ws.nameEn : ws.name}
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <div className="text-[11px] font-medium text-amber-400/90 mt-0.5">
                      {language === 'en' ? ws.industryTagEn : ws.industryTag}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {language === 'en' ? ws.descriptionEn : ws.descriptionId}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1.5 flex items-center space-x-1.5 font-mono">
                      <span className="text-slate-300">{ws.defaultStaffName}</span>
                      <span>•</span>
                      <span className="truncate">{language === 'en' ? ws.branchNameEn : ws.branchName}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800 px-2 py-1 text-[10px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{language === 'en' ? 'Beachhead Strategy: F&B First' : 'Strategi Beachhead: F&B Utama'}</span>
            </span>
            <span className="text-slate-400 font-mono">v1.2</span>
          </div>
        </div>
      )}
    </div>
  );
};
