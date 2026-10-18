import { SOPAssignment } from '../types';

export interface StaffProfile {
  id: string;
  name: string;
  role_title: string;
  outlet: string;
  department: 'fnb_barista' | 'fashion_retail' | 'automotive_sales';
  department_label: string;
  brand_name: string;
  avatar_color: string;
}

export const STAFF_PROFILES: StaffProfile[] = [
  {
    id: 'staff_budi',
    name: 'Budi Santoso',
    role_title: 'Barista Junior & Kasir Counter',
    outlet: 'Kedai Kopi Nusantara - Cabang Sudirman',
    department: 'fnb_barista',
    department_label: 'F&B & Hospitality Service',
    brand_name: 'Kedai Kopi Nusantara',
    avatar_color: 'bg-amber-500 text-slate-950',
  },
  {
    id: 'staff_siti',
    name: 'Siti Rahma',
    role_title: 'Fashion Advisor & Styling Associate',
    outlet: 'Batik & Busana Nusantara - Grand Mall',
    department: 'fashion_retail',
    department_label: 'Retail Fashion & Boutique',
    brand_name: 'Batik & Busana Nusantara',
    avatar_color: 'bg-purple-500 text-white',
  },
  {
    id: 'staff_doni',
    name: 'Doni Prasetyo',
    role_title: 'Sales Counter & Konsultan EV',
    outlet: 'Nusantara Motor EV - Flagship Showroom',
    department: 'automotive_sales',
    department_label: 'Automotive & Mobility Sales',
    brand_name: 'Nusantara Motor EV',
    avatar_color: 'bg-sky-500 text-slate-950',
  },
];

export const INITIAL_ASSIGNMENTS: SOPAssignment[] = [
  {
    id: 'assign_01',
    staff_id: 'staff_budi',
    department: 'fnb_barista',
    scenario_id: 'scen_greeting_01',
    scenario_title: 'Standar Salam, Kustomisasi Resep Oat Milk, & Cross-Selling Barista Counter',
    assigned_to_role: 'staff',
    assigned_to_name: 'Budi Santoso (Barista Junior)',
    assigned_by: 'Hendra (Store Manager / Owner)',
    deadline: '2025-04-05',
    status: 'pending',
    brand_sop: 'Kopi Nusantara SOP #04-LATTE',
    priority: 'Tinggi',
    notes: 'Prioritas penyegaran SOP oat milk less sweet untuk mengatasi komplain variasi rasa pekan lalu.',
  },
  {
    id: 'assign_01_b',
    staff_id: 'staff_budi',
    department: 'fnb_barista',
    scenario_id: 'scen_ratio_02',
    scenario_title: 'Formulasi Barista: Resep Presisi Es Kopi Susu Signature & Higienitas Meja Seduh',
    assigned_to_role: 'staff',
    assigned_to_name: 'Budi Santoso (Barista Junior)',
    assigned_by: 'Hendra (Store Manager / Owner)',
    deadline: '2025-04-08',
    status: 'completed',
    brand_sop: 'Kopi Nusantara SOP #01-SIGNATURE',
    priority: 'Sedang',
    notes: 'Uji kalibrasi ekstraksi double shot 36g dan rasio takaran susu segar 150ml (Lulus 92/100).',
  },
  {
    id: 'assign_02',
    staff_id: 'staff_siti',
    department: 'fashion_retail',
    scenario_id: 'scen_sales_fashion_retail',
    scenario_title: 'Pramuniaga Fashion: Consultative Styling, Size Fit & Cross-Selling',
    assigned_to_role: 'staff',
    assigned_to_name: 'Siti Rahma (Fashion Advisor)',
    assigned_by: 'Hendra (Store Manager / Owner)',
    deadline: '2025-04-10',
    status: 'pending',
    brand_sop: 'Boutique Service Protocol v2.1',
    priority: 'Sedang',
    notes: 'Latihan rekomendasi busana kerja formal & pendampingan fitting room tanpa kesan memaksa.',
  },
  {
    id: 'assign_02_b',
    staff_id: 'staff_siti',
    department: 'fashion_retail',
    scenario_id: 'scen_fashion_fabric_care_fitting',
    scenario_title: 'Hospitalitas Fitting Room: Edukasi Perawatan Sutra/Batik Tulis & Penukaran Size Santun',
    assigned_to_role: 'staff',
    assigned_to_name: 'Siti Rahma (Fashion Advisor)',
    assigned_by: 'Hendra (Store Manager / Owner)',
    deadline: '2025-04-12',
    status: 'pending',
    brand_sop: 'Batik Care & Exchange Protocol',
    priority: 'Tinggi',
    notes: 'Simulasi edukasi pencucian lerak alami dan SOP penukaran ukuran baju kerja.',
  },
  {
    id: 'assign_03',
    staff_id: 'staff_doni',
    department: 'automotive_sales',
    scenario_id: 'scen_automotive_ev_technical',
    scenario_title: 'Konsultasi Teknis EV: Edukasi Ketahanan Baterai, Jarak Tempuh, & Garansi Fast Charging',
    assigned_to_role: 'staff',
    assigned_to_name: 'Doni Prasetyo (Sales Counter)',
    assigned_by: 'Hendra (Store Manager / Owner)',
    deadline: '2025-04-02',
    status: 'pending',
    brand_sop: 'Nusantara EV Consultation SOP #02',
    priority: 'Tinggi',
    notes: 'Prioritas simulasi konsultasi ketahanan baterai saat banjir dan garansi pabrikan 5 tahun.',
  },
  {
    id: 'assign_03_b',
    staff_id: 'staff_doni',
    department: 'automotive_sales',
    scenario_id: 'scen_sales_automotive_dealer',
    scenario_title: 'Sales Showroom Otomotif: Menghadapi Keraguan DP & Simulasi Angsuran Leasing',
    assigned_to_role: 'staff',
    assigned_to_name: 'Doni Prasetyo (Sales Counter)',
    assigned_by: 'Hendra (Store Manager / Owner)',
    deadline: '2025-03-30',
    status: 'completed',
    brand_sop: 'Showroom EV Consultation SOP #01',
    priority: 'Normal',
    notes: 'Simulasi selesai dengan nilai 88/100 (Lulus Kriteria SOP).',
  },
];

export const STAFF_PROFILES_EN: Record<string, Partial<StaffProfile>> = {
  staff_budi: {
    role_title: 'Junior Barista & Counter Cashier',
    outlet: 'Nusantara Coffee House - Sudirman Branch',
    department_label: 'F&B & Hospitality Service',
    brand_name: 'Nusantara Coffee House',
  },
  staff_siti: {
    role_title: 'Fashion Advisor & Styling Associate',
    outlet: 'Batik & Nusantara Couture - Grand Mall',
    department_label: 'Retail Fashion & Boutique',
    brand_name: 'Batik & Nusantara Couture',
  },
  staff_doni: {
    role_title: 'Sales Counter & EV Mobility Consultant',
    outlet: 'Nusantara EV Mobility - Flagship Showroom',
    department_label: 'Automotive & Mobility Sales',
    brand_name: 'Nusantara Motor EV',
  },
};

export const ASSIGNMENT_TRANSLATIONS_EN: Record<string, Partial<SOPAssignment>> = {
  assign_01: {
    scenario_title: 'Greeting Standards, Oat Milk Recipe Customization, & Barista Counter Cross-Selling',
    assigned_to_name: 'Budi Santoso (Junior Barista)',
    assigned_by: 'Hendra (Store Manager / Owner)',
    brand_sop: 'Nusantara Coffee SOP #04-LATTE',
    notes: 'Priority SOP refresh for less-sweet oat milk to resolve customer taste consistency complaints from last week.',
  },
  assign_01_b: {
    scenario_title: 'Barista Precision: Signature Iced Milk Coffee Ratio & Brew Station Hygiene',
    assigned_to_name: 'Budi Santoso (Junior Barista)',
    assigned_by: 'Hendra (Store Manager / Owner)',
    brand_sop: 'Nusantara Coffee SOP #01-SIGNATURE',
    notes: 'Calibration drill on 36g double shot extraction and 150ml fresh milk ratio (Passed 92/100).',
  },
  assign_02: {
    scenario_title: 'Fashion Associate: Consultative Styling, Size Fit & Cross-Selling',
    assigned_to_name: 'Siti Rahma (Fashion Advisor)',
    assigned_by: 'Hendra (Store Manager / Owner)',
    brand_sop: 'Boutique Service Protocol v2.1',
    notes: 'Practice formal workwear recommendations and fitting room assistance without being pushy.',
  },
  assign_02_b: {
    scenario_title: 'Fitting Room Hospitality: Silk/Hand-Drawn Batik Care Guidance & Courteous Size Exchange',
    assigned_to_name: 'Siti Rahma (Fashion Advisor)',
    assigned_by: 'Hendra (Store Manager / Owner)',
    brand_sop: 'Batik Care & Exchange Protocol',
    notes: 'Simulation for eco-friendly detergent washing care and seamless workwear size exchange SOP.',
  },
  assign_03: {
    scenario_title: 'EV Technical Consultation: Battery Durability, Range Confidence, & Fast-Charging Warranty',
    assigned_to_name: 'Doni Prasetyo (Sales Counter)',
    assigned_by: 'Hendra (Store Manager / Owner)',
    brand_sop: 'Nusantara EV Consultation SOP #02',
    notes: 'Priority simulation for flood wading battery IP67 durability and 5-year manufacturer warranty.',
  },
  assign_03_b: {
    scenario_title: 'Automotive Showroom Sales: Handling Down Payment Concerns & Leasing Calculations',
    assigned_to_name: 'Doni Prasetyo (Sales Counter)',
    assigned_by: 'Hendra (Store Manager / Owner)',
    brand_sop: 'Showroom EV Consultation SOP #01',
    notes: 'Simulation completed with score 88/100 (SOP Passed).',
  },
};

export const getLocalizedStaffProfile = (profile: StaffProfile, lang: 'id' | 'en'): StaffProfile => {
  if (lang !== 'en') return profile;
  const enData = STAFF_PROFILES_EN[profile.id];
  if (!enData) return profile;
  return {
    ...profile,
    ...enData,
  };
};

export const getLocalizedAssignment = (
  assignment: SOPAssignment,
  lang: 'id' | 'en',
  scenarioTitleFallback?: string
): SOPAssignment => {
  if (lang !== 'en') return assignment;
  const enData = ASSIGNMENT_TRANSLATIONS_EN[assignment.id];
  return {
    ...assignment,
    scenario_title: enData?.scenario_title || scenarioTitleFallback || assignment.scenario_title,
    assigned_to_name: enData?.assigned_to_name || assignment.assigned_to_name,
    assigned_by: enData?.assigned_by || assignment.assigned_by,
    brand_sop: enData?.brand_sop || assignment.brand_sop,
    notes: enData?.notes || assignment.notes,
  };
};
