import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type EnterpriseWorkspaceId = 'fnb_kopi' | 'retail_fashion' | 'automotive_ev';

export interface EnterpriseWorkspace {
  id: EnterpriseWorkspaceId;
  name: string;
  nameEn: string;
  industryTag: string;
  industryTagEn: string;
  iconName: 'coffee' | 'shopping-bag' | 'car';
  primaryColor: string; // Tailwind color token
  accentHex: string;
  defaultStaffId: string;
  defaultStaffName: string;
  defaultStaffRole: string;
  defaultStaffRoleEn: string;
  branchName: string;
  branchNameEn: string;
  department: 'fnb_barista' | 'fashion_retail' | 'automotive_sales';
  descriptionId: string;
  descriptionEn: string;
}

export const ENTERPRISE_WORKSPACES: EnterpriseWorkspace[] = [
  {
    id: 'fnb_kopi',
    name: 'Kedai Kopi Nusantara',
    nameEn: 'Nusantara Coffee Chain',
    industryTag: 'F&B & Hospitality Service',
    industryTagEn: 'F&B & Hospitality Service',
    iconName: 'coffee',
    primaryColor: 'amber',
    accentHex: '#f59e0b',
    defaultStaffId: 'staff_budi',
    defaultStaffName: 'Budi Santoso',
    defaultStaffRole: 'Junior Barista & Kasir Counter',
    defaultStaffRoleEn: 'Junior Barista & Counter Cashier',
    branchName: 'Cabang Sudirman Flagship (Jakarta)',
    branchNameEn: 'Sudirman Flagship Outlet (Jakarta)',
    department: 'fnb_barista',
    descriptionId: 'Beachhead F&B: Pelatihan barista seduh, standar kustomisasi oat milk nabati, dan ramah tamah counter.',
    descriptionEn: 'Beachhead F&B: Barista formulation, oat milk customization standards, and counter hospitality.',
  },
  {
    id: 'retail_fashion',
    name: 'Batik & Busana Nusantara',
    nameEn: 'Nusantara Boutique Couture',
    industryTag: 'Retail Fashion & Apparel',
    industryTagEn: 'Retail Fashion & Apparel',
    iconName: 'shopping-bag',
    primaryColor: 'purple',
    accentHex: '#a855f7',
    defaultStaffId: 'staff_siti',
    defaultStaffName: 'Siti Rahma',
    defaultStaffRole: 'Fashion Advisor & Styling Associate',
    defaultStaffRoleEn: 'Fashion Advisor & Styling Associate',
    branchName: 'Grand Mall Boutique (Bandung)',
    branchNameEn: 'Grand Mall Boutique (Bandung)',
    department: 'fashion_retail',
    descriptionId: 'Ritel Busana: Konsultasi busana sopan, etika fitting room, rekomendasi padu-padan, dan edukasi kain.',
    descriptionEn: 'Fashion Retail: Styling advice, fitting room courtesy, cross-selling, and fabric care education.',
  },
  {
    id: 'automotive_ev',
    name: 'Nusantara Mobility EV',
    nameEn: 'Nusantara EV Mobility',
    industryTag: 'Automotive & Mobility Sales',
    industryTagEn: 'Automotive & Mobility Sales',
    iconName: 'car',
    primaryColor: 'sky',
    accentHex: '#0284c7',
    defaultStaffId: 'staff_doni',
    defaultStaffName: 'Doni Prasetyo',
    defaultStaffRole: 'Sales Counter & Konsultan EV',
    defaultStaffRoleEn: 'Sales Counter & EV Mobility Consultant',
    branchName: 'Flagship Showroom BSD (Tangerang)',
    branchNameEn: 'Flagship Showroom BSD (Tangerang)',
    department: 'automotive_sales',
    descriptionId: 'Dealer Otomotif: Konsultasi ketahanan baterai EV, transparansi paket leasing, dan simulasi cicilan jujur.',
    descriptionEn: 'Automotive Dealership: EV battery warranty, honest leasing simulations, and consultative selling.',
  },
];

interface WorkspaceContextType {
  activeWorkspace: EnterpriseWorkspace;
  workspaceId: EnterpriseWorkspaceId;
  setWorkspaceId: (id: EnterpriseWorkspaceId) => void;
  workspaces: EnterpriseWorkspace[];
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

const STORAGE_KEY = 'vokasta_active_workspace';

export const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workspaceId, setWorkspaceIdState] = useState<EnterpriseWorkspaceId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as EnterpriseWorkspaceId;
      if (saved && ENTERPRISE_WORKSPACES.some((w) => w.id === saved)) {
        return saved;
      }
    } catch {}
    return 'fnb_kopi'; // Default anchor to F&B Beachhead!
  });

  const setWorkspaceId = (id: EnterpriseWorkspaceId) => {
    setWorkspaceIdState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
  };

  const activeWorkspace = ENTERPRISE_WORKSPACES.find((w) => w.id === workspaceId) || ENTERPRISE_WORKSPACES[0];

  return (
    <WorkspaceContext.Provider
      value={{
        activeWorkspace,
        workspaceId,
        setWorkspaceId,
        workspaces: ENTERPRISE_WORKSPACES,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
