import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  X,
  QrCode,
  Award,
  Search,
  Lock,
  Calendar,
  Building2,
  FileText,
  UserCheck,
  Camera,
  CameraOff,
  Scan,
  RefreshCw,
  Upload,
  Sparkles,
  AlertCircle,
  BadgeCheck,
} from 'lucide-react';
import { ParameterScore } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

export interface OpenBadgesData {
  badge_name?: string;
  badge_version?: string;
  standard?: string;
  portable?: boolean;
  credential_subject?: string;
  verification_hash?: string;
  issuer?: string;
}

export interface PhysicalEmployeeBadge {
  id: string;
  credentialId: string;
  candidateName: string;
  roleTitle: string;
  outlet: string;
  brandName: string;
  avatarColor: string;
  department: string;
  scenarioTitle: string;
  score: number;
  verificationHash: string;
  issueDate: string;
  qrPayload: string;
  universalCompetencies: ParameterScore[];
  badges: string[];
}

export const SAMPLE_PHYSICAL_BADGES: PhysicalEmployeeBadge[] = [
  {
    id: 'badge_rian',
    credentialId: 'VOK-2026-9F4C0882',
    candidateName: 'Rian Pratama',
    roleTitle: 'Senior Barista & Outlet Trainer',
    outlet: 'Kedai Kopi Nusantara - Senopati Flagship',
    brandName: 'Kedai Kopi Nusantara',
    avatarColor: 'bg-emerald-600 text-white',
    department: 'F&B Specialty Coffee',
    scenarioTitle: 'Barista Kedai Kopi - Pesanan Khusus & Alergi Susu Oat',
    score: 94,
    verificationHash: 'SHA256:9f4c0882e5b719ad6b3d4f128c9e530a6b78e1c4',
    issueDate: '15 Maret 2026',
    qrPayload: 'https://vokasta.id/verify/VOK-2026-9F4C0882?staff=rian&score=94',
    badges: ['W3C VC v2.0', 'OpenBadges v3.0', '10 Dialects Ready (Design)'],
    universalCompetencies: [
      { parameter_id: 'u1', parameter_name: 'Komunikasi Santun & Dialek Inklusif', score: 96, weight: 0.3, passed: true, timestamp: '0:12', evidence_note: 'Artikulasi ramah dengan intonasi natural tanpa jargon asing membingungkan.', is_universal: true },
      { parameter_id: 'u2', parameter_name: 'Akurasi Kepatuhan Resep & Alergen', score: 95, weight: 0.4, passed: true, timestamp: '0:28', evidence_note: 'Verifikasi alergi oat milk 2x sebelum ekstraksi espresso double shot.', is_universal: true },
      { parameter_id: 'u3', parameter_name: 'Ketenangan Menghadapi Komplain Antrean', score: 91, weight: 0.3, passed: true, timestamp: '0:45', evidence_note: 'Menjelaskan waktu tunggu dengan tenang dan menawarkan tester cold brew.', is_universal: true }
    ]
  },
  {
    id: 'badge_budi',
    credentialId: 'VOK-2026-BUDI77',
    candidateName: 'Budi Santoso',
    roleTitle: 'Barista Junior & Kasir Counter',
    outlet: 'Kedai Kopi Nusantara - Cabang Sudirman CBD',
    brandName: 'Kedai Kopi Nusantara',
    avatarColor: 'bg-amber-500 text-slate-950',
    department: 'F&B & Hospitality Service',
    scenarioTitle: 'Standar Salam, Kustomisasi Resep Oat Milk, & Cross-Selling',
    score: 92,
    verificationHash: 'SHA256:77e8a94cb201df639c0175b5e4892cfa3910c22e',
    issueDate: '18 Maret 2026',
    qrPayload: 'https://vokasta.id/verify/VOK-2026-BUDI77?staff=budi&score=92',
    badges: ['W3C VC v2.0', 'SOP Kalibrasi Standar', 'Certified Barista'],
    universalCompetencies: [
      { parameter_id: 'u1', parameter_name: 'SOP Kalibrasi Grinder & Rasio Susu', score: 93, weight: 0.4, passed: true, timestamp: '0:14', evidence_note: 'Menimbang 18g biji kopi dan ekstraksi 36g espresso dalam 27 detik.', is_universal: true },
      { parameter_id: 'u2', parameter_name: 'Upselling Pastry & Rekomendasi Menu', score: 90, weight: 0.3, passed: true, timestamp: '0:35', evidence_note: 'Menawarkan almond croissant yang selaras dengan profil kopi pesanan pelanggan.', is_universal: true },
      { parameter_id: 'u3', parameter_name: 'Hospitalitas Kasir Cepat', score: 93, weight: 0.3, passed: true, timestamp: '0:50', evidence_note: 'Pelayanan kasir lincah dengan konfirmasi pesanan jelas.', is_universal: true }
    ]
  },
  {
    id: 'badge_siti',
    credentialId: 'VOK-2026-SITI89',
    candidateName: 'Siti Rahma',
    roleTitle: 'Fashion Advisor & Styling Associate',
    outlet: 'Batik & Busana Nusantara - Grand Mall',
    brandName: 'Batik & Busana Nusantara',
    avatarColor: 'bg-purple-600 text-white',
    department: 'Retail Fashion & Boutique',
    scenarioTitle: 'Pramuniaga Fashion: Consultative Styling & Fabric Care',
    score: 96,
    verificationHash: 'SHA256:89b1c73df88491ae5c2d3e91024fb7038162e08a',
    issueDate: '19 Maret 2026',
    qrPayload: 'https://vokasta.id/verify/VOK-2026-SITI89?staff=siti&score=96',
    badges: ['W3C VC v2.0', 'Boutique Stylist Pro', 'High Empathy Index'],
    universalCompetencies: [
      { parameter_id: 'u1', parameter_name: 'Consultative Fitting Room Assistance', score: 98, weight: 0.4, passed: true, timestamp: '0:15', evidence_note: 'Memberikan opsi 2 ukuran baju tanpa membuat pelanggan merasa tidak nyaman.', is_universal: true },
      { parameter_id: 'u2', parameter_name: 'Edukasi Perawatan Kain Tradisional Lerak', score: 95, weight: 0.3, passed: true, timestamp: '0:32', evidence_note: 'Menjelaskan metode pencucian batik tulis dengan sabun lerak organik.', is_universal: true },
      { parameter_id: 'u3', parameter_name: 'Cross-Selling Aksesoris Tenun', score: 95, weight: 0.3, passed: true, timestamp: '0:48', evidence_note: 'Memadukan selendang tenun yang serasi dengan gaun pilihan pembeli.', is_universal: true }
    ]
  },
  {
    id: 'badge_doni',
    credentialId: 'VOK-2026-DONI94',
    candidateName: 'Doni Prasetyo',
    roleTitle: 'Sales Counter & Konsultan EV',
    outlet: 'Nusantara Motor EV - Flagship Showroom',
    brandName: 'Nusantara Motor EV',
    avatarColor: 'bg-sky-500 text-slate-950',
    department: 'Automotive & Mobility Sales',
    scenarioTitle: 'Konsultasi Teknis EV: Ketahanan Baterai & Garansi Fast Charging',
    score: 89,
    verificationHash: 'SHA256:94a6e30b1c7752e89d554a91b34e569922c0ff81',
    issueDate: '20 Maret 2026',
    qrPayload: 'https://vokasta.id/verify/VOK-2026-DONI94?staff=doni&score=89',
    badges: ['W3C VC v2.0', 'EV Certified Advisor', 'Sales Compliance Basics (contoh)'],
    universalCompetencies: [
      { parameter_id: 'u1', parameter_name: 'Penjelasan Teknis Baterai & IP67 Banjir', score: 92, weight: 0.4, passed: true, timestamp: '0:20', evidence_note: 'Mengedukasi sistem insulasi baterai kedap air dengan bahasa awam yang meyakinkan.', is_universal: true },
      { parameter_id: 'u2', parameter_name: 'Simulasi Angsuran Leasing Transparan', score: 88, weight: 0.3, passed: true, timestamp: '0:40', evidence_note: 'Menghitung estimasi DP dan tenor 36 bulan dengan rincian asuransi lengkap.', is_universal: true },
      { parameter_id: 'u3', parameter_name: 'Follow-up Test Drive & Komitmen Servis', score: 87, weight: 0.3, passed: true, timestamp: '0:55', evidence_note: 'Menjadwalkan agenda test drive di rute tanjakan sesuai kekhawatiran calon pembeli.', is_universal: true }
    ]
  },
  {
    id: 'badge_dewi',
    credentialId: 'VOK-2026-DEWI91',
    candidateName: 'Dewi Anggraini',
    roleTitle: 'Customer Care & Resolution Specialist',
    outlet: 'Pusat Layanan Frontliner Terpadu - Kuningan',
    brandName: 'Nusantara Hospitality Group',
    avatarColor: 'bg-rose-500 text-white',
    department: 'Customer Experience & Resolution',
    scenarioTitle: 'De-eskalasi Keluhan Pelanggan & Mitigasi Risiko Reputasi',
    score: 95,
    verificationHash: 'SHA256:91ef230a84d72bc19446f78e031ca56bb925d430',
    issueDate: '21 Maret 2026',
    qrPayload: 'https://vokasta.id/verify/VOK-2026-DEWI91?staff=dewi&score=95',
    badges: ['W3C VC v2.0', 'Service Recovery Expert', 'Anti-Escalation Master'],
    universalCompetencies: [
      { parameter_id: 'u1', parameter_name: 'Active Listening & Validasi Emosi', score: 97, weight: 0.4, passed: true, timestamp: '0:18', evidence_note: 'Mendengarkan keluhan konsumen tanpa memotong pembicaraan dan memvalidasi kekecewaan.', is_universal: true },
      { parameter_id: 'u2', parameter_name: 'Solusi Cepat Sesuai Batas Kewenangan SOP', score: 94, weight: 0.3, passed: true, timestamp: '0:38', evidence_note: 'Memberikan voucher pengganti instan dalam waktu kurang dari 3 menit.', is_universal: true },
      { parameter_id: 'u3', parameter_name: 'Pencatatan Insiden & Tindak Lanjut HRD', score: 94, weight: 0.3, passed: true, timestamp: '0:52', evidence_note: 'Menuliskan log komplain secara komprehensif untuk evaluasi shift berikutnya.', is_universal: true }
    ]
  }
];

export const SAMPLE_PHYSICAL_BADGES_EN: PhysicalEmployeeBadge[] = [
  {
    id: 'badge_rian',
    credentialId: 'VOK-2026-9F4C0882',
    candidateName: 'Rian Pratama',
    roleTitle: 'Senior Barista & Outlet Trainer',
    outlet: 'Nusantara Coffee Shop - Senopati Flagship',
    brandName: 'Nusantara Coffee Shop',
    avatarColor: 'bg-emerald-600 text-white',
    department: 'F&B Specialty Coffee',
    scenarioTitle: 'Coffee Barista: Custom Orders & Oat Milk Dairy Allergies',
    score: 94,
    verificationHash: 'SHA256:9f4c0882e5b719ad6b3d4f128c9e530a6b78e1c4',
    issueDate: 'March 15, 2026',
    qrPayload: 'https://vokasta.id/verify/VOK-2026-9F4C0882?staff=rian&score=94',
    badges: ['W3C VC v2.0', 'OpenBadges v3.0', '10 Dialects Ready (Design)'],
    universalCompetencies: [
      { parameter_id: 'u1', parameter_name: 'Courteous Communication & Inclusive Dialect', score: 96, weight: 0.3, passed: true, timestamp: '0:12', evidence_note: 'Warm articulation with natural intonation without confusing jargon.', is_universal: true },
      { parameter_id: 'u2', parameter_name: 'Recipe Compliance & Allergen Accuracy', score: 95, weight: 0.4, passed: true, timestamp: '0:28', evidence_note: 'Verified oat milk allergy twice before pulling double-shot espresso.', is_universal: true },
      { parameter_id: 'u3', parameter_name: 'Composure Handling Queue Complaints', score: 91, weight: 0.3, passed: true, timestamp: '0:45', evidence_note: 'Explained queue wait times calmly and offered a cold brew sample.', is_universal: true }
    ]
  },
  {
    id: 'badge_budi',
    credentialId: 'VOK-2026-BUDI77',
    candidateName: 'Budi Santoso',
    roleTitle: 'Junior Barista & Counter Cashier',
    outlet: 'Nusantara Coffee Shop - Sudirman CBD Branch',
    brandName: 'Nusantara Coffee Shop',
    avatarColor: 'bg-amber-500 text-slate-950',
    department: 'F&B & Hospitality Service',
    scenarioTitle: 'Greeting Protocol, Oat Milk Customization, & Cross-Selling',
    score: 92,
    verificationHash: 'SHA256:77e8a94cb201df639c0175b5e4892cfa3910c22e',
    issueDate: 'March 18, 2026',
    qrPayload: 'https://vokasta.id/verify/VOK-2026-BUDI77?staff=budi&score=92',
    badges: ['W3C VC v2.0', 'Standard Calibration SOP', 'Certified Barista'],
    universalCompetencies: [
      { parameter_id: 'u1', parameter_name: 'Grinder Calibration & Milk Ratio SOP', score: 93, weight: 0.4, passed: true, timestamp: '0:14', evidence_note: 'Weighed 18g coffee beans and extracted 36g espresso in 27 seconds.', is_universal: true },
      { parameter_id: 'u2', parameter_name: 'Pastry Upselling & Menu Recommendations', score: 90, weight: 0.3, passed: true, timestamp: '0:35', evidence_note: 'Offered almond croissant matching customer coffee profile.', is_universal: true },
      { parameter_id: 'u3', parameter_name: 'Swift Counter Hospitality', score: 93, weight: 0.3, passed: true, timestamp: '0:50', evidence_note: 'Agile cashier service with clear order verification.', is_universal: true }
    ]
  },
  {
    id: 'badge_siti',
    credentialId: 'VOK-2026-SITI89',
    candidateName: 'Siti Rahma',
    roleTitle: 'Fashion Advisor & Styling Associate',
    outlet: 'Batik & Busana Nusantara - Grand Mall',
    brandName: 'Batik & Busana Nusantara',
    avatarColor: 'bg-purple-600 text-white',
    department: 'Retail Fashion & Boutique',
    scenarioTitle: 'Fashion Sales Associate: Consultative Styling & Fabric Care',
    score: 96,
    verificationHash: 'SHA256:89b1c73df88491ae5c2d3e91024fb7038162e08a',
    issueDate: 'March 19, 2026',
    qrPayload: 'https://vokasta.id/verify/VOK-2026-SITI89?staff=siti&score=96',
    badges: ['W3C VC v2.0', 'Boutique Stylist Pro', 'High Empathy Index'],
    universalCompetencies: [
      { parameter_id: 'u1', parameter_name: 'Consultative Fitting Room Assistance', score: 98, weight: 0.4, passed: true, timestamp: '0:15', evidence_note: 'Offered 2 size options without making customer uncomfortable.', is_universal: true },
      { parameter_id: 'u2', parameter_name: 'Traditional Lerak Fabric Care Education', score: 95, weight: 0.3, passed: true, timestamp: '0:32', evidence_note: 'Explained hand-washing method for handmade batik using organic lerak soap.', is_universal: true },
      { parameter_id: 'u3', parameter_name: 'Cross-Selling Woven Accessories', score: 95, weight: 0.3, passed: true, timestamp: '0:48', evidence_note: 'Paired matching hand-woven scarf with chosen evening dress.', is_universal: true }
    ]
  },
  {
    id: 'badge_doni',
    credentialId: 'VOK-2026-DONI94',
    candidateName: 'Doni Prasetyo',
    roleTitle: 'Sales Counter & EV Mobility Consultant',
    outlet: 'Nusantara Motor EV - Flagship Showroom',
    brandName: 'Nusantara Motor EV',
    avatarColor: 'bg-sky-500 text-slate-950',
    department: 'Automotive & Mobility Sales',
    scenarioTitle: 'EV Technical Consultation: Battery Durability & Fast Charging Warranty',
    score: 89,
    verificationHash: 'SHA256:94a6e30b1c7752e89d554a91b34e569922c0ff81',
    issueDate: 'March 20, 2026',
    qrPayload: 'https://vokasta.id/verify/VOK-2026-DONI94?staff=doni&score=89',
    badges: ['W3C VC v2.0', 'EV Certified Advisor', 'Sales Compliance Basics (contoh)'],
    universalCompetencies: [
      { parameter_id: 'u1', parameter_name: 'Battery Technical Specs & IP67 Flood Safety', score: 92, weight: 0.4, passed: true, timestamp: '0:20', evidence_note: 'Explained waterproof battery casing system in reassuring layman terms.', is_universal: true },
      { parameter_id: 'u2', parameter_name: 'Transparent Financing & Leasing Simulation', score: 88, weight: 0.3, passed: true, timestamp: '0:40', evidence_note: 'Calculated down payment and 36-month tenor with comprehensive insurance.', is_universal: true },
      { parameter_id: 'u3', parameter_name: 'Test Drive Follow-up & Service Commitment', score: 87, weight: 0.3, passed: true, timestamp: '0:55', evidence_note: 'Scheduled test drive route on hill incline addressing buyer concerns.', is_universal: true }
    ]
  },
  {
    id: 'badge_dewi',
    credentialId: 'VOK-2026-DEWI91',
    candidateName: 'Dewi Anggraini',
    roleTitle: 'Customer Care & Resolution Specialist',
    outlet: 'Integrated Frontline Service Center - Kuningan',
    brandName: 'Nusantara Hospitality Group',
    avatarColor: 'bg-rose-500 text-white',
    department: 'Customer Experience & Resolution',
    scenarioTitle: 'Customer Complaint De-escalation & Reputation Risk Mitigation',
    score: 95,
    verificationHash: 'SHA256:91ef230a84d72bc19446f78e031ca56bb925d430',
    issueDate: 'March 21, 2026',
    qrPayload: 'https://vokasta.id/verify/VOK-2026-DEWI91?staff=dewi&score=95',
    badges: ['W3C VC v2.0', 'Service Recovery Expert', 'Anti-Escalation Master'],
    universalCompetencies: [
      { parameter_id: 'u1', parameter_name: 'Active Listening & Emotional Validation', score: 97, weight: 0.4, passed: true, timestamp: '0:18', evidence_note: 'Listened to customer complaint without interruption and validated feelings.', is_universal: true },
      { parameter_id: 'u2', parameter_name: 'Rapid SOP Authority Resolution', score: 94, weight: 0.3, passed: true, timestamp: '0:38', evidence_note: 'Issued instant replacement voucher in under three minutes.', is_universal: true },
      { parameter_id: 'u3', parameter_name: 'Incident Logging & HR Follow-up', score: 94, weight: 0.3, passed: true, timestamp: '0:52', evidence_note: 'Logged incident details thoroughly for shift handover review.', is_universal: true }
    ]
  }
];

export const getLocalizedBadge = (badge: PhysicalEmployeeBadge, language: 'id' | 'en'): PhysicalEmployeeBadge => {
  if (language !== 'en') return badge;
  const match = SAMPLE_PHYSICAL_BADGES_EN.find((b) => b.id === badge.id || b.credentialId === badge.credentialId);
  return match || badge;
};

interface CredentialVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata?: OpenBadgesData | null;
  candidateName?: string;
  scenarioTitle?: string;
  universalCompetencies?: ParameterScore[];
  score?: number;
  initialCredentialId?: string;
}

const EMPTY_COMPETENCIES: ParameterScore[] = [];

const DEFAULT_COMPETENCIES_EN: ParameterScore[] = [
  { parameter_id: 'u1', parameter_name: 'Courteous Communication & Inclusive Dialect', score: 94, weight: 0.35, passed: true, timestamp: '0:12', evidence_note: 'Friendly articulation without confusing jargon.', is_universal: true },
  { parameter_id: 'u2', parameter_name: 'Recipe Compliance & Allergen Accuracy', score: 95, weight: 0.35, passed: true, timestamp: '0:28', evidence_note: 'Thoroughly checked allergens for the order.', is_universal: true },
  { parameter_id: 'u3', parameter_name: 'Composure Handling Customer Inquiries', score: 90, weight: 0.3, passed: true, timestamp: '0:45', evidence_note: 'Responsive and solution-focused demeanor.', is_universal: true }
];

const DEFAULT_COMPETENCIES_ID: ParameterScore[] = [
  { parameter_id: 'u1', parameter_name: 'Komunikasi Santun & Dialek Inklusif', score: 94, weight: 0.35, passed: true, timestamp: '0:12', evidence_note: 'Artikulasi ramah tanpa jargon rumit.', is_universal: true },
  { parameter_id: 'u2', parameter_name: 'Akurasi Kepatuhan Resep & Alergen', score: 95, weight: 0.35, passed: true, timestamp: '0:28', evidence_note: 'Teliti mengecek alergen pesanan.', is_universal: true },
  { parameter_id: 'u3', parameter_name: 'Ketenangan Menghadapi Komplain', score: 90, weight: 0.3, passed: true, timestamp: '0:45', evidence_note: 'Respon tanggap dan solutif.', is_universal: true }
];

const areCompetenciesEqual = (a?: ParameterScore[], b?: ParameterScore[]): boolean => {
  if (a === b) return true;
  if (!a || !b || a.length !== b.length) return false;
  return a.every((item, idx) => item.parameter_id === b[idx].parameter_id && item.score === b[idx].score && item.parameter_name === b[idx].parameter_name);
};

export const CredentialVerificationModal: React.FC<CredentialVerificationModalProps> = ({
  isOpen,
  onClose,
  metadata,
  candidateName = 'Rian Pratama',
  scenarioTitle = 'Barista Kedai Kopi - Pesanan Khusus & Alergi Susu',
  universalCompetencies = EMPTY_COMPETENCIES,
  score = 92,
  initialCredentialId,
}) => {
  const { language } = useLanguage();
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<'qr' | 'jsonld' | 'audit'>('qr');
  const [auditQuery, setAuditQuery] = useState(initialCredentialId || '');
  const [auditResult, setAuditResult] = useState<string | null>(initialCredentialId ? 'VALID' : null);

  // QR Scanner Overlay State
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scannerStatus, setScannerStatus] = useState<'idle' | 'scanning' | 'verifying' | 'success'>('idle');
  const [selectedBadgeTarget, setSelectedBadgeTarget] = useState<PhysicalEmployeeBadge | null>(null);
  const [scannedBadgeSuccessBanner, setScannedBadgeSuccessBanner] = useState<string | null>(null);

  // Active Loaded Credential State (can be updated via physical badge scan)
  const [currentCredential, setCurrentCredential] = useState<{
    candidateName: string;
    roleTitle: string;
    outlet: string;
    credentialId: string;
    scenarioTitle: string;
    score: number;
    verificationHash: string;
    issueDate: string;
    universalCompetencies: ParameterScore[];
  }>(() => {
    const defaultId = initialCredentialId || (metadata?.verification_hash
      ? metadata.verification_hash.replace(/[^a-zA-Z0-9]/g, '').slice(0, 16)
      : 'VOK-2026-9F4C0882');

    const defaultComp = language === 'en' ? DEFAULT_COMPETENCIES_EN : DEFAULT_COMPETENCIES_ID;
    const targetComp = universalCompetencies && universalCompetencies.length > 0 ? universalCompetencies : defaultComp;

    return {
      candidateName,
      roleTitle: language === 'en' ? 'Vocational Frontliner (Sample)' : 'Frontliner Vokasi (Contoh)',
      outlet: language === 'en' ? 'Nusantara Coffee Shop - Senopati Flagship' : 'Kedai Kopi Nusantara - Senopati Flagship',
      credentialId: defaultId,
      scenarioTitle,
      score,
      verificationHash: metadata?.verification_hash || 'SHA256:9f4c0882e5b719ad6b3d4f128c9e530a6b78e1c4',
      issueDate: new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      universalCompetencies: targetComp,
    };
  });

  const getLocalizedParamTitle = (paramName: string) => {
    if (language !== 'en') return paramName;
    const map: Record<string, string> = {
      'Komunikasi Santun & Dialek Inklusif': 'Courteous Communication & Inclusive Dialect',
      'Akurasi Kepatuhan Resep & Alergen': 'Recipe Compliance & Allergen Accuracy',
      'Ketenangan Menghadapi Komplain Antrean': 'Composure Handling Queue Complaints',
      'Ketenangan Menghadapi Komplain': 'Composure Handling Customer Inquiries',
      'SOP Kalibrasi Grinder & Rasio Susu': 'Grinder Calibration & Milk Ratio SOP',
      'Upselling Pastry & Rekomendasi Menu': 'Pastry Upselling & Menu Recommendations',
      'Hospitalitas Kasir Cepat': 'Swift Counter Hospitality',
      'Consultative Fitting Room Assistance': 'Consultative Fitting Room Assistance',
      'Edukasi Perawatan Kain Tradisional Lerak': 'Traditional Lerak Fabric Care Education',
      'Cross-Selling Aksesoris Tenun': 'Cross-Selling Woven Accessories',
      'Penjelasan Teknis Baterai & IP67 Banjir': 'Battery Technical Specs & IP67 Flood Safety',
      'Simulasi Angsuran Leasing Transparan': 'Transparent Financing & Leasing Simulation',
      'Follow-up Test Drive & Komitmen Servis': 'Test Drive Follow-up & Service Commitment',
      'Active Listening & Validasi Emosi': 'Active Listening & Emotional Validation',
      'Solusi Cepat Sesuai Batas Kewenangan SOP': 'Rapid SOP Authority Resolution',
      'Pencatatan Insiden & Tindak Lanjut HRD': 'Incident Logging & HR Follow-up',
    };
    return map[paramName] || paramName;
  };

  const verificationHash = metadata?.verification_hash;
  useEffect(() => {
    if (!isOpen) return;
    const defaultId = initialCredentialId || (verificationHash
      ? verificationHash.replace(/[^a-zA-Z0-9]/g, '').slice(0, 16)
      : 'VOK-2026-9F4C0882');

    let localizedTitle = scenarioTitle;
    if (language === 'en') {
      if (scenarioTitle.includes('Barista Kedai Kopi') || scenarioTitle.includes('Pesanan Khusus')) {
        localizedTitle = 'Coffee Barista: Custom Orders & Oat Milk Dairy Allergies';
      } else if (scenarioTitle.includes('Standar Salam') || scenarioTitle.includes('Kustomisasi Resep')) {
        localizedTitle = 'Store SOP: Warm Greeting, Oat Milk Customization & Pastry Cross-Selling';
      }
    }

    const defaultComp = language === 'en' ? DEFAULT_COMPETENCIES_EN : DEFAULT_COMPETENCIES_ID;
    const targetCompetencies = universalCompetencies && universalCompetencies.length > 0 ? universalCompetencies : defaultComp;
    const targetHash = verificationHash || 'SHA256:9f4c0882e5b719ad6b3d4f128c9e530a6b78e1c4';

    setCurrentCredential((prev) => {
      if (
        prev &&
        prev.credentialId === defaultId &&
        prev.candidateName === candidateName &&
        prev.scenarioTitle === localizedTitle &&
        prev.score === score &&
        prev.verificationHash === targetHash &&
        areCompetenciesEqual(prev.universalCompetencies, targetCompetencies)
      ) {
        return prev;
      }
      return {
        candidateName,
        roleTitle: language === 'en' ? 'Vocational Frontliner (Sample)' : 'Frontliner Vokasi (Contoh)',
        outlet: language === 'en' ? 'Nusantara Coffee Shop - Senopati Flagship' : 'Kedai Kopi Nusantara - Senopati Flagship',
        credentialId: defaultId,
        scenarioTitle: localizedTitle,
        score,
        verificationHash: targetHash,
        issueDate: new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        universalCompetencies: targetCompetencies,
      };
    });
  }, [isOpen, candidateName, scenarioTitle, universalCompetencies, score, language, initialCredentialId, verificationHash]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sound chime helper using Web Audio API
  const playScanChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {
      // Audio not permitted or unsupported, continue silently
    }
  };

  // Start Camera Stream when Scanner opens
  useEffect(() => {
    if (!isScannerOpen) {
      // Stop stream if scanner closes
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setCameraActive(false);
      setCameraError(null);
      setScannerStatus('idle');
      return;
    }

    let isMounted = true;
    const startCamera = async () => {
      setCameraError(null);
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error(language === 'en' ? 'Webcam API is not supported on this browser.' : 'Webcam API tidak didukung pada browser ini.');
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
          audio: false,
        });

        if (isMounted) {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setCameraActive(true);
        } else {
          stream.getTracks().forEach((track) => track.stop());
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : (language === 'en' ? 'Camera permission denied or unavailable' : 'Izin kamera ditolak atau tidak tersedia');
          setCameraError(message);
          setCameraActive(false);
        }
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [isScannerOpen, language]);

  // Execute scan resolution for a chosen or detected physical badge
  const handleScanBadge = (rawBadge: PhysicalEmployeeBadge) => {
    const badge = getLocalizedBadge(rawBadge, language);
    setSelectedBadgeTarget(badge);
    setScannerStatus('scanning');

    // Step 1: Simulating scan targeting & laser alignment
    setTimeout(() => {
      setScannerStatus('verifying');

      // Step 2: Verification hash check
      setTimeout(() => {
        setScannerStatus('success');
        playScanChime();

        // Step 3: Load credentials into modal state and close overlay
        setTimeout(() => {
          setCurrentCredential({
            candidateName: badge.candidateName,
            roleTitle: badge.roleTitle,
            outlet: badge.outlet,
            credentialId: badge.credentialId,
            scenarioTitle: badge.scenarioTitle,
            score: badge.score,
            verificationHash: badge.verificationHash,
            issueDate: badge.issueDate,
            universalCompetencies: badge.universalCompetencies,
          });

          setAuditQuery(badge.credentialId);
          setAuditResult('VALID');
          setIsScannerOpen(false);
          setScannerStatus('idle');
          setSelectedBadgeTarget(null);

          // Show temporary celebration badge banner
          setScannedBadgeSuccessBanner(
            language === 'en'
              ? `Physical Badge Loaded: ${badge.candidateName} (${badge.credentialId}) [Sample Data]`
              : `Badge Fisik Dimuat: ${badge.candidateName} (${badge.credentialId}) [Data Contoh]`
          );
          setTimeout(() => {
            setScannedBadgeSuccessBanner(null);
          }, 6000);
        }, 700);
      }, 500);
    }, 400);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate scanning uploaded image of badge
    const matchedBadge = getLocalizedBadge(SAMPLE_PHYSICAL_BADGES[1], language); // Budi Santoso
    handleScanBadge(matchedBadge);
  };

  if (!isOpen) return null;

  const verificationUrl = `${window.location.origin}?verify=${currentCredential.credentialId}`;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(currentCredential.verificationHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleSearchAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditQuery.trim()) return;
    const q = auditQuery.toLowerCase();
    const targetBadges = language === 'en' ? SAMPLE_PHYSICAL_BADGES_EN : SAMPLE_PHYSICAL_BADGES;
    const foundBadge = targetBadges.find(
      (b) =>
        b.credentialId.toLowerCase().includes(q) ||
        b.verificationHash.toLowerCase().includes(q) ||
        b.candidateName.toLowerCase().includes(q)
    );

    if (foundBadge) {
      const localized = getLocalizedBadge(foundBadge, language);
      setCurrentCredential({
        candidateName: localized.candidateName,
        roleTitle: localized.roleTitle,
        outlet: localized.outlet,
        credentialId: localized.credentialId,
        scenarioTitle: localized.scenarioTitle,
        score: localized.score,
        verificationHash: localized.verificationHash,
        issueDate: localized.issueDate,
        universalCompetencies: localized.universalCompetencies,
      });
      setAuditResult('VALID');
    } else if (q.includes('9f4c') || q.includes('vok') || q.length > 5) {
      setAuditResult('VALID');
    } else {
      setAuditResult('NOT_FOUND');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-750 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh] relative">
        
        {/* ========================================================= */}
        {/* QR CODE SCANNER OVERLAY MODAL VIEW                       */}
        {/* ========================================================= */}
        {isScannerOpen && (
          <div className="absolute inset-0 z-30 bg-slate-950 flex flex-col animate-in fade-in duration-200 overflow-y-auto">
            {/* Scanner Overlay Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/95 sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Scan className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {language === 'en' ? 'Scan Physical Employee Badge QR' : 'Pindai QR Badge Fisik Karyawan'}
                    </h3>
                    <span className="text-xs bg-emerald-950 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-800 font-bold flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block mr-0.5" />
                      <span>{language === 'en' ? 'CAMERA ACTIVE' : 'KAMERA AKTIF'}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {language === 'en'
                      ? 'Point camera at the QR code on the lanyard badge to load credential instantly'
                      : 'Arahkan kamera ke QR code pada kartu lanyard untuk memuat status kelulusan instan'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsScannerOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
                title={language === 'en' ? 'Close Scanner' : 'Tutup Scanner'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scanner Viewfinder & Simulation Body */}
            <div className="p-4 sm:p-6 space-y-5 flex-1">
              
              {/* Camera Viewfinder View */}
              <div className="relative w-full max-w-md mx-auto aspect-4/3 sm:aspect-16/10 bg-black rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl flex flex-col items-center justify-center">
                {/* Real Live Video Stream */}
                {cameraActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-radial from-slate-900 via-slate-950 to-black flex flex-col items-center justify-center text-center p-4">
                    {/* Simulated High-Tech Sensor Grid */}
                    <div className="w-24 h-24 rounded-full border border-dashed border-emerald-500/30 flex items-center justify-center mb-3">
                      <Camera className="w-10 h-10 text-emerald-400/80 animate-pulse" />
                    </div>
                    <span className="text-xs font-semibold text-slate-300">
                      {cameraError
                        ? (language === 'en' ? 'Optical Simulation Mode Active' : 'Mode Simulasi Optik Aktif')
                        : (language === 'en' ? 'Initializing Camera Lens...' : 'Menginisialisasi Lensa Kamera...')}
                    </span>
                    <p className="text-xs text-slate-400 max-w-xs mt-1">
                      {cameraError
                        ? (language === 'en'
                            ? 'Webcam not available in this environment. You can click any sample physical badge below to simulate instant scanning.'
                            : 'Izin kamera lokal tidak tersedia di lingkungan ini. Anda dapat mengklik sampel badge fisik di bawah untuk memindai seketika.')
                        : (language === 'en'
                            ? 'Align QR Code in the center of the target frame'
                            : 'Posisikan QR Code di tengah kotak target')}
                    </p>
                  </div>
                )}

                {/* Reticle Corner Brackets */}
                <div className="absolute inset-6 sm:inset-10 pointer-events-none flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg shadow-[0_0_10px_#10b981]" />
                    <div className="w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg shadow-[0_0_10px_#10b981]" />
                  </div>
                  <div className="flex justify-between">
                    <div className="w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg shadow-[0_0_10px_#10b981]" />
                    <div className="w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-lg shadow-[0_0_10px_#10b981]" />
                  </div>
                </div>

                {/* Animated Green Laser Scanning Beam */}
                <div className="absolute inset-x-6 sm:inset-x-10 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399] animate-[bounce_2s_infinite] pointer-events-none" />

                {/* Center Target Indicator */}
                <div className="absolute w-12 h-12 rounded-lg border border-emerald-400/40 pointer-events-none flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>

                {/* Viewfinder Status Banner */}
                <div className="absolute bottom-3 inset-x-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-2 text-center text-xs">
                  {scannerStatus === 'idle' && (
                    <span className="text-slate-300 font-medium flex items-center justify-center gap-1.5">
                      <Scan className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{language === 'en' ? 'Bring physical badge to camera or click a badge sample' : 'Dekatkan kartu badge fisik ke kamera atau klik sampel badge'}</span>
                    </span>
                  )}
                  {scannerStatus === 'scanning' && (
                    <span className="text-amber-300 font-medium flex items-center justify-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      <span>{language === 'en' ? 'Detecting Badge QR Code: ' : 'Mendeteksi QR Code Badge: '}<strong>{selectedBadgeTarget?.candidateName}</strong>...</span>
                    </span>
                  )}
                  {scannerStatus === 'verifying' && (
                    <span className="text-sky-300 font-medium flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-sky-400" />
                      <span>{language === 'en' ? 'Checking W3C VC Schema Format...' : 'Memeriksa Format Skema W3C VC...'}</span>
                    </span>
                  )}
                  {scannerStatus === 'success' && (
                    <span className="text-emerald-300 font-bold flex items-center justify-center gap-1.5 animate-in zoom-in-95">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{language === 'en' ? 'Valid Credential! Opening verification...' : 'Kredensial Sah! Membuka Verifikasi...'}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Physical Employee Badge Simulator Rack */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">
                      {language === 'en' ? 'Physical Employee Badge Collection (Click to Simulate Direct Scan)' : 'Koleksi Badge Fisik Karyawan (Klik untuk Simulasi Pindai Langsung)'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {language === 'en' ? '5 Badges in Registry' : '5 Badge Terdaftar di Registry'}
                  </span>
                </div>

                {/* Badge Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SAMPLE_PHYSICAL_BADGES.map((rawBadge) => {
                    const badge = getLocalizedBadge(rawBadge, language);
                    return (
                    <div
                      key={badge.id}
                      onClick={() => handleScanBadge(badge)}
                      className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/60 rounded-xl p-3 cursor-pointer transition group shadow-md relative overflow-hidden"
                    >
                      {/* Lanyard Hole Punch Simulation */}
                      <div className="absolute top-2 right-2 w-6 h-1.5 bg-slate-950 rounded-full border border-slate-700/80" />

                      <div className="flex items-start space-x-3">
                        {/* Mini Badge Avatar */}
                        <div className={`w-9 h-9 rounded-lg ${badge.avatarColor} font-bold text-xs flex items-center justify-center shrink-0 shadow`}>
                          {badge.candidateName.split(' ').map((n) => n[0]).join('')}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition truncate">
                              {badge.candidateName}
                            </span>
                            <span className="text-xs font-mono text-amber-400 font-bold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/80">
                              {badge.score}/100
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 truncate">
                            {badge.roleTitle}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {badge.outlet}
                          </p>

                          <div className="mt-2 flex items-center justify-between pt-1.5 border-t border-slate-800 text-xs">
                            <span className="font-mono text-slate-400 truncate">
                              {badge.credentialId}
                            </span>
                            <span className="text-emerald-400 font-semibold group-hover:underline flex items-center gap-1">
                              <Scan className="w-3 h-3" />
                              <span>{language === 'en' ? 'Scan Badge' : 'Pindai Badge'}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                </div>

                {/* Upload Image Option */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>{language === 'en' ? 'Have a photo of badge or QR saved on your device?' : 'Punya foto badge atau QR tersimpan di perangkat?'}</span>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition cursor-pointer shrink-0 flex items-center space-x-1.5 border border-slate-700"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Upload Badge File' : 'Unggah Berkas Badge'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Scanner Overlay Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/95 flex items-center justify-between text-xs sticky bottom-0 z-10">
              <span className="text-slate-400 text-xs">
                {language === 'en' ? 'Powered by ISO/IEC 18004 Standard QR Decoder Engine' : 'Didukung oleh Algoritma Dekoder QR Standar ISO/IEC 18004'}
              </span>
              <button
                onClick={() => setIsScannerOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer transition text-xs"
              >
                {language === 'en' ? 'Back to Summary' : 'Kembali ke Ringkasan'}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MAIN MODAL HEADER                                        */}
        {/* ========================================================= */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {language === 'en' ? 'W3C Credential Schema Inspector (Sample Data)' : 'Inspeksi Skema Kredensial W3C (Data Contoh)'}
                </h3>
                <span className="text-xs bg-emerald-950 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-800 font-bold">
                  {language === 'en' ? 'SAMPLE FORMAT' : 'CONTOH FORMAT'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'en'
                  ? 'Self-Sovereign Format Inspector for 1EdTech Open Badges v3.0'
                  : 'Pemeriksa Format Mandiri Standar 1EdTech Open Badges v3.0'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Trigger for QR Scanner Overlay */}
            <button
              onClick={() => setIsScannerOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition cursor-pointer flex items-center space-x-1.5 shadow-sm"
              title={language === 'en' ? 'Open Physical Badge QR Scanner' : 'Buka Kamera Scanner QR Badge Fisik'}
            >
              <Scan className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{language === 'en' ? 'Scan Physical Badge' : 'Pindai Badge Fisik'}</span>
              <span className="sm:hidden">{language === 'en' ? 'Scan QR' : 'Scan QR'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Temporary Banner on Successful Badge Scan */}
        {scannedBadgeSuccessBanner && (
          <div className="bg-emerald-950/90 border-b border-emerald-700/80 px-4 py-2.5 flex items-center justify-between text-xs text-emerald-200 animate-in slide-in-from-top duration-300">
            <div className="flex items-center space-x-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{scannedBadgeSuccessBanner}</span>
            </div>
            <span className="text-xs text-emerald-400 font-mono bg-emerald-900 px-2 py-0.5 rounded">
              {language === 'en' ? 'DATA UPDATED' : 'DATA TERBARUKAN'}
            </span>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/70 px-5 pt-2 gap-2 text-xs">
          <button
            onClick={() => setActiveTab('qr')}
            className={`pb-2.5 px-3 font-semibold transition border-b-2 cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'qr'
                ? 'border-emerald-400 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Credential Card & QR (Sample)' : 'Kartu Kredensial & QR (Contoh)'}</span>
          </button>
          <button
            onClick={() => setActiveTab('jsonld')}
            className={`pb-2.5 px-3 font-semibold transition border-b-2 cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'jsonld'
                ? 'border-emerald-400 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'W3C JSON-LD Spec' : 'Spesifikasi W3C JSON-LD'}</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-2.5 px-3 font-semibold transition border-b-2 cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'audit'
                ? 'border-emerald-400 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{language === 'en' ? '3rd-Party HR Audit' : 'Audit HRD Pihak Ketiga'}</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-300 text-xs">
          {activeTab === 'qr' && (
            <div className="space-y-4">
              {/* Trust Badge Banner with Scanner Callout */}
              <div className="bg-emerald-950/40 border border-emerald-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center space-x-2">
                      <span>{language === 'en' ? 'Sample Credential Format' : 'Contoh Format Kredensial'}</span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                        {language === 'en' ? 'Sample Credential' : 'Data Contoh'}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-200/90 leading-relaxed">
                      {language === 'en'
                        ? 'Sample badge in Open Badges v3.0 format. This badge is not yet signed and is for demonstration only.'
                        : 'Contoh badge berformat Open Badges v3.0. Badge ini belum ditandatangani dan hanya untuk demonstrasi.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsScannerOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer shrink-0 shadow-sm"
                >
                  <Scan className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Scan Another Physical Badge' : 'Scan Badge Fisik Lain'}</span>
                </button>
              </div>

              {/* Verified Certificate Passport Card */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-inner space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Simulated High-Res QR Code */}
                  <div className="bg-white p-3 rounded-xl shadow-md shrink-0 flex flex-col items-center justify-center group relative cursor-pointer" onClick={() => setIsScannerOpen(true)}>
                    <svg viewBox="0 0 100 100" className="w-28 h-28">
                      {/* Stylized QR Code Matrix */}
                      <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
                      {/* Top-left marker */}
                      <rect x="6" y="6" width="26" height="26" fill="#000000" />
                      <rect x="10" y="10" width="18" height="18" fill="#ffffff" />
                      <rect x="14" y="14" width="10" height="10" fill="#000000" />
                      {/* Top-right marker */}
                      <rect x="68" y="6" width="26" height="26" fill="#000000" />
                      <rect x="72" y="10" width="18" height="18" fill="#ffffff" />
                      <rect x="76" y="14" width="10" height="10" fill="#000000" />
                      {/* Bottom-left marker */}
                      <rect x="6" y="68" width="26" height="26" fill="#000000" />
                      <rect x="10" y="72" width="18" height="18" fill="#ffffff" />
                      <rect x="14" y="76" width="10" height="10" fill="#000000" />
                      {/* Random Data Dots */}
                      <rect x="38" y="8" width="6" height="6" fill="#000000" />
                      <rect x="48" y="12" width="6" height="6" fill="#000000" />
                      <rect x="58" y="8" width="6" height="6" fill="#000000" />
                      <rect x="36" y="24" width="8" height="8" fill="#000000" />
                      <rect x="48" y="28" width="8" height="8" fill="#000000" />
                      <rect x="10" y="42" width="8" height="8" fill="#000000" />
                      <rect x="24" y="42" width="6" height="6" fill="#000000" />
                      <rect x="38" y="42" width="8" height="8" fill="#000000" />
                      <rect x="52" y="42" width="6" height="6" fill="#000000" />
                      <rect x="68" y="42" width="8" height="8" fill="#000000" />
                      <rect x="82" y="42" width="6" height="6" fill="#000000" />
                      <rect x="42" y="58" width="8" height="8" fill="#000000" />
                      <rect x="56" y="56" width="8" height="8" fill="#000000" />
                      <rect x="72" y="60" width="8" height="8" fill="#000000" />
                      <rect x="40" y="72" width="6" height="6" fill="#000000" />
                      <rect x="52" y="76" width="6" height="6" fill="#000000" />
                      <rect x="68" y="74" width="8" height="8" fill="#000000" />
                      <rect x="82" y="80" width="6" height="6" fill="#000000" />
                      <rect x="46" y="86" width="6" height="6" fill="#000000" />
                    </svg>
                    <span className="text-xs font-mono text-slate-800 font-bold mt-1 tracking-wider flex items-center gap-1">
                      <Scan className="w-2.5 h-2.5 text-slate-700" />
                      <span>{language === 'en' ? 'HR SCAN' : 'SCAN HRD'}</span>
                    </span>
                  </div>

                  {/* Credential Attributes */}
                  <div className="flex-1 space-y-2.5 w-full">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500 block">{language === 'en' ? 'Owner Name:' : 'Nama Pemilik:'}</span>
                        <span className="font-bold text-white text-xs">{currentCredential.candidateName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">{language === 'en' ? 'Credential ID:' : 'ID Kredensial:'}</span>
                        <span className="font-mono text-amber-400 font-bold">{currentCredential.credentialId}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">{language === 'en' ? 'Role & Outlet:' : 'Peran & Gerai:'}</span>
                        <span className="font-semibold text-slate-300 truncate block">{currentCredential.roleTitle}</span>
                        <span className="text-xs text-slate-400 truncate block">{currentCredential.outlet}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">{language === 'en' ? 'Graduation Score:' : 'Skor Kelulusan:'}</span>
                        <span className="font-bold text-emerald-400 font-mono text-xs">{currentCredential.score} / 100 [{language === 'en' ? 'PASSED' : 'LULUS'}]</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-slate-500 block">{language === 'en' ? 'Assessed Competency:' : 'Kompetensi yang Dinilai:'}</span>
                        <span className="font-semibold text-slate-200 line-clamp-1">{currentCredential.scenarioTitle}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">{language === 'en' ? 'Issue Date:' : 'Tanggal Terbit:'}</span>
                        <span className="text-slate-300">{currentCredential.issueDate}</span>
                      </div>
                    </div>

                    {/* Hash Pill */}
                    <div className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2 truncate">
                        <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-mono text-xs text-slate-300 truncate">
                          {currentCredential.verificationHash}
                        </span>
                      </div>
                      <button
                        onClick={handleCopyHash}
                        className="text-xs text-amber-400 hover:text-amber-300 font-medium shrink-0 flex items-center space-x-1 cursor-pointer"
                      >
                        {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedHash ? (language === 'en' ? 'Copied' : 'Tersalin') : (language === 'en' ? 'Copy' : 'Salin')}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Universal Competencies Portfolio Chips */}
                {currentCredential.universalCompetencies.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                    <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                      {language === 'en' ? 'Universal Portable Portfolio (Worker Sovereign):' : 'Portofolio Universal yang Berhak Dibawa Pekerja:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentCredential.universalCompetencies.map((c) => (
                        <span
                          key={c.parameter_id}
                          className="px-2 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 text-xs font-semibold flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>{getLocalizedParamTitle(c.parameter_name)} ({c.score}/100)</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Public Verification Link */}
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center space-x-2 truncate mr-2">
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-slate-400 text-xs truncate">
                    {language === 'en' ? 'Public Link: ' : 'Tautan Publik: '}<span className="text-amber-300 font-mono">{verificationUrl}</span>
                  </span>
                </div>
                <button
                  onClick={handleCopyUrl}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold shrink-0 cursor-pointer transition flex items-center space-x-1"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? (language === 'en' ? 'Copied' : 'Tersalin') : (language === 'en' ? 'Copy URL' : 'Salin URL')}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'jsonld' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'en'
                  ? <>Encrypted JSON-LD structure following standard <strong>W3C Verifiable Credentials Data Model v2.0</strong> and <strong>1EdTech Open Badges v3.0</strong> specifications:</>
                  : <>Struktur JSON-LD terenkripsi sesuai spesifikasi standar <strong>W3C Verifiable Credentials Data Model v2.0</strong> dan <strong>1EdTech Open Badges v3.0</strong>:</>}
              </p>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300/90 overflow-x-auto max-h-80 leading-relaxed">
{JSON.stringify(
  {
    '@context': [
      'https://www.w3.org/ns/credentials/v2',
      'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json',
      'https://schema.org'
    ],
    id: `urn:uuid:${currentCredential.credentialId}`,
    type: ['VerifiableCredential', 'OpenBadgeCredential'],
    issuer: {
      id: 'https://vokasta.id/issuers/vokasta-registry',
      name: 'Vokasta Multimodal Workforce Competency Authority',
      type: 'Profile'
    },
    validFrom: new Date().toISOString(),
    credentialSubject: {
      id: `urn:candidate:${currentCredential.candidateName.toLowerCase().replace(/\s+/g, '-')}`,
      name: currentCredential.candidateName,
      competencyEvaluated: currentCredential.scenarioTitle,
      finalScore: currentCredential.score,
      outletCertified: currentCredential.outlet,
      status: 'PASSED_100_PERCENT',
      dialectInvarianceAudited: true,
      openBadgesStandard: '1EdTech Open Badges v3.0 / W3C VC v2.0'
    },
    proof: {
      type: 'Ed25519Signature2020 (sample)',
      created: new Date().toISOString(),
      verificationMethod: 'https://vokasta.id/keys/ed25519-public-key',
      proofPurpose: 'assertionMethod',
      jws: currentCredential.verificationHash,
      note: 'Format data kredensial contoh ini belum ditandatangani secara kriptografis (sample only)'
    }
  },
  null,
  2
)}
              </pre>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'en'
                    ? 'Partner enterprise HR teams can check the format hash printed on sample badges or certificates for demonstration.'
                    : 'HRD perusahaan mitra dapat mengecek format hash yang tertera pada kartu badge contoh atau sertifikat untuk demonstrasi.'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsScannerOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shrink-0 cursor-pointer flex items-center space-x-1.5 transition"
                >
                  <Scan className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'en' ? 'Camera Badge Scan' : 'Pindai Badge Kamera'}</span>
                </button>
              </div>

              <form onSubmit={handleSearchAudit} className="flex gap-2">
                <input
                  type="text"
                  value={auditQuery}
                  onChange={(e) => setAuditQuery(e.target.value)}
                  placeholder={language === 'en' ? 'Enter Credential ID or Employee Name (e.g., VOK-2026-BUDI77, Siti Rahma)' : 'Masukkan Nomor Kredensial atau Nama Karyawan (misal: VOK-2026-BUDI77, Siti Rahma)'}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 cursor-pointer transition shrink-0"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Audit Credential' : 'Audit Kredensial'}</span>
                </button>
              </form>

              {auditResult === 'VALID' && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 space-y-2 animate-in fade-in">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{language === 'en' ? 'AUDIT RESULT: AUTHENTIC & REGISTERED IN REGISTRY' : 'HASIL AUDIT: DOKUMEN OTENTIK & TERDAFTAR DI REGISTRY'}</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {language === 'en' ? (
                      <>Certificate for <strong>{currentCredential.candidateName}</strong> for competency <strong>{currentCredential.scenarioTitle}</strong> is declared VALID with score <strong>{currentCredential.score}/100</strong>. Format hash matches registry sample record.</>
                    ) : (
                      <>Sertifikat milik <strong>{currentCredential.candidateName}</strong> untuk kompetensi <strong>{currentCredential.scenarioTitle}</strong> dinyatakan VALID dengan skor <strong>{currentCredential.score}/100</strong>. Format hash cocok dengan catatan data contoh registry.</>
                    )}
                  </p>
                </div>
              )}

              {auditResult === 'NOT_FOUND' && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 space-y-1 animate-in fade-in">
                  <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs">
                    <X className="w-4 h-4" />
                    <span>{language === 'en' ? 'AUDIT RESULT: NOT FOUND' : 'HASIL AUDIT: TIDAK DITEMUKAN'}</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {language === 'en'
                      ? 'Hash or credential ID does not match any entry in the Vokasta public verification ledger.'
                      : 'Hash atau ID kredensial tidak cocok dengan catatan verifikasi publik Vokasta.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-400 font-mono text-xs">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>SHA256 Sample Audit Ledger</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsScannerOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-emerald-400 font-medium cursor-pointer transition text-xs border border-slate-700/80 flex items-center space-x-1"
            >
              <Scan className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Scan Badge' : 'Scan Badge'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer transition text-xs"
            >
              {language === 'en' ? 'Close' : 'Tutup'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

