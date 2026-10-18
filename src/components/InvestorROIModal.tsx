import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  X,
  Calculator,
  ShieldCheck,
  Building2,
  Users,
  Clock,
  Sparkles,
  PieChart,
  ArrowRight,
  FileSpreadsheet,
  Download,
  Target,
  Zap,
  BarChart3,
  FileText,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface InvestorROIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCohortAnalytics?: () => void;
  onOpenProposal?: () => void;
}

export const InvestorROIModal: React.FC<InvestorROIModalProps> = ({
  isOpen,
  onClose,
  onOpenCohortAnalytics,
  onOpenProposal,
}) => {
  const { language } = useLanguage();
  // Interactive Simulation Controls with Granular Range
  const [staffCount, setStaffCount] = useState<number>(5); // Default to small shop 5 staff
  const [monthlySalary, setMonthlySalary] = useState<number>(4000000); // Rp 4 Juta per bulan
  const [manualCostPerPerson, setManualCostPerPerson] = useState<number>(750000); // Rp 750rb (materi, bahan coba, konsumsi)
  const [manualTrainingDays, setManualTrainingDays] = useState<number>(14);

  if (!isOpen) return null;

  // Financial Calculations:
  // 1. Floating salary waste during onboarding (25 working days/month)
  const dailySalary = monthlySalary / 25;
  const manualSalaryWaste = staffCount * (dailySalary * manualTrainingDays);
  const manualTrainerMaterialCost = staffCount * manualCostPerPerson;
  const totalManualCost = manualSalaryWaste + manualTrainerMaterialCost;

  // Vokasta SaaS Cost: Rp 120.000 / seat / tahun (atau ~Rp 10.000/bulan)
  const vokastaCostPerPerson = 120000;
  const totalVokastaCost = Math.max(staffCount * vokastaCostPerPerson, 350000); // Min tier Rp 350rb/tahun
  
  // With Vokasta: Onboarding drops to 3 days!
  const vokastaTrainingDays = 3;
  const vokastaSalaryDuringTraining = staffCount * (dailySalary * vokastaTrainingDays);
  const totalCostWithVokasta = totalVokastaCost + vokastaSalaryDuringTraining;
  
  const totalSavings = Math.max(totalManualCost - totalCostWithVokasta, 0);
  const savingsPercent = totalManualCost > 0 ? Math.round((totalSavings / totalManualCost) * 100) : 0;

  // Time & Productivity Acceleration
  const daysSaved = Math.max(manualTrainingDays - vokastaTrainingDays, 0);
  const productivityLiftPercent = manualTrainingDays > 0 ? Math.round((daysSaved / manualTrainingDays) * 100) : 0;

  // Business ROI Multiplier
  const roiMultiplier = totalVokastaCost > 0 ? ((totalSavings / totalVokastaCost) * 100).toFixed(0) : '0';
  const paybackMonths = totalSavings > 0 ? ((totalVokastaCost / (totalSavings / 12))).toFixed(1) : '0.5';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl my-8 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Executive Business Case & Financial Impact
              </span>
              <span className="text-xs text-slate-400">• B2B SaaS Enterprise Model</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {language === 'en'
                ? 'Executive ROI Calculator & Corporate Financial Justification'
                : 'Kalkulator ROI & Justifikasi Finansial Korporat'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
              {language === 'en'
                ? 'Calculate real savings from slashed frontline training budgets, accelerated onboarding speed to floor readiness, and investment viability for retail chains and vocational institutions.'
                : 'Hitung efisiensi riil pemangkasan anggaran pelatihan frontliner, peningkatan kecepatan kerja (onboarding), dan kelayakan investasi bagi jaringan gerai atau institusi pendidikan.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 flex-1">
          {/* Interactive Parameters Sliders Box */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-amber-400" />
                {language === 'en' ? 'Your Business / Store Operational Variables:' : 'Parameter Variabel Gerai / Perusahaan Anda:'}
              </span>
              <span className="text-xs text-slate-400">
                {language === 'en' ? 'Owners & Managers can calibrate parameters below' : 'Owner & Manajer bisa sesuaikan angka di bawah ini'}
              </span>
            </div>

            {/* Scale Preset Quick Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-medium mr-1">
                {language === 'en' ? 'Quick Preset Scale:' : 'Pilih Skala Cepat:'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setStaffCount(5);
                  setMonthlySalary(4000000);
                  setManualCostPerPerson(500000);
                  setManualTrainingDays(14);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  staffCount === 5
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border-slate-800'
                }`}
              >
                {language === 'en' ? '☕ Single Store / Cafe (5 Staff)' : '☕ 1 Gerai Kafe / Butik (5 Staf)'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStaffCount(25);
                  setMonthlySalary(4500000);
                  setManualCostPerPerson(800000);
                  setManualTrainingDays(14);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  staffCount === 25
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border-slate-800'
                }`}
              >
                {language === 'en' ? '🏪 Multi-Outlet 3-5 Branches (25 Staff)' : '🏪 Multi-Outlet 3-5 Cabang (25 Staf)'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStaffCount(100);
                  setMonthlySalary(5000000);
                  setManualCostPerPerson(1200000);
                  setManualTrainingDays(18);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  staffCount === 100
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border-slate-800'
                }`}
              >
                {language === 'en' ? '🏢 Regional Retail Chain (100 Staff)' : '🏢 Jaringan Ritel Regional (100 Staf)'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStaffCount(300);
                  setMonthlySalary(3500000);
                  setManualCostPerPerson(600000);
                  setManualTrainingDays(14);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  staffCount === 300
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border-slate-800'
                }`}
              >
                {language === 'en' ? '🎓 Vocational Academy (300 Students)' : '🎓 Sekolah SMK / BLK (300 Siswa)'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
              {/* Slider 1: Staff / Student Count */}
              <div className="space-y-2 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">
                    {language === 'en' ? 'Frontline Headcount:' : 'Jumlah Frontliner:'}
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={staffCount}
                      onChange={(e) => setStaffCount(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))}
                      className="w-16 bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-right font-bold text-amber-400 text-xs focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-slate-400 text-xs">{language === 'en' ? 'People' : 'Orang'}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="300"
                  step="1"
                  value={staffCount}
                  onChange={(e) => setStaffCount(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>1 {language === 'en' ? 'Staff' : 'Orang'}</span>
                  <span>50 {language === 'en' ? 'Staff' : 'Orang'}</span>
                  <span>300 {language === 'en' ? 'Staff' : 'Orang'}</span>
                </div>
              </div>

              {/* Slider 2: Monthly Salary (UMR/Gaji Pokok) */}
              <div className="space-y-2 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">
                    {language === 'en' ? 'Monthly Base Wage:' : 'Gaji Bulanan Staf:'}
                  </span>
                  <span className="font-bold text-emerald-400">
                    IDR {(monthlySalary / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M/mo
                  </span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="10000000"
                  step="250000"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>IDR 2M</span>
                  <span>IDR 4M (Avg)</span>
                  <span>IDR 10M</span>
                </div>
              </div>

              {/* Slider 3: Manual Training Cost Per Person */}
              <div className="space-y-2 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">
                    {language === 'en' ? 'Manual Trainer/Materials:' : 'Biaya Modul/Trainer:'}
                  </span>
                  <span className="font-bold text-sky-400">
                    IDR {(manualCostPerPerson / 1000).toLocaleString('en-US')},000
                  </span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="3000000"
                  step="50000"
                  value={manualCostPerPerson}
                  onChange={(e) => setManualCostPerPerson(Number(e.target.value))}
                  className="w-full accent-sky-500 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>IDR 200k</span>
                  <span>IDR 750k</span>
                  <span>IDR 3M</span>
                </div>
              </div>

              {/* Slider 4: Manual Training Days */}
              <div className="space-y-2 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">
                    {language === 'en' ? 'Manual Onboarding Days:' : 'Durasi Onboarding Lama:'}
                  </span>
                  <span className="font-bold text-cyan-400">
                    {manualTrainingDays} {language === 'en' ? 'Work Days' : 'Hari Kerja'}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={manualTrainingDays}
                  onChange={(e) => setManualTrainingDays(Number(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>5 {language === 'en' ? 'Days' : 'Hari'}</span>
                  <span>14 {language === 'en' ? 'Days (Avg)' : 'Hari (Standar)'}</span>
                  <span>30 {language === 'en' ? 'Days' : 'Hari'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results: Executive Financial Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Card 1: Total Savings */}
            <div className="bg-emerald-950/30 border border-emerald-800/80 rounded-2xl p-4 flex flex-col justify-between">
              <div className="text-xs text-emerald-300 font-medium flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                {language === 'en' ? 'Net OPEX Cost Savings' : 'Penghematan Biaya (OPEX Saved)'}
              </div>
              <div className="my-2">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {language === 'en'
                    ? `IDR ${(totalSavings / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M`
                    : `Rp ${(totalSavings / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} Juta`}
                </div>
                <div className="text-xs text-emerald-300 font-semibold mt-1">
                  {language === 'en'
                    ? `Saves ${savingsPercent}% of legacy budget!`
                    : `Hemat ${savingsPercent}% dari anggaran lama!`}
                </div>
                <span className="text-[10px] text-slate-400 font-medium block mt-1">
                  {language === 'en' ? '(illustrative projection)' : '(proyeksi ilustratif)'}
                </span>
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-emerald-900/60">
                {language === 'en'
                  ? `Manual: IDR ${(totalManualCost / 1000000).toFixed(1)}M ➡️ Vokasta: IDR ${(totalVokastaCost / 1000000).toFixed(1)}M`
                  : `Biaya manual: Rp ${(totalManualCost / 1000000).toFixed(1)} Jt ➡️ Vokasta: Rp ${(totalVokastaCost / 1000000).toFixed(1)} Jt`}
              </div>
            </div>

            {/* Card 2: Time to Productivity */}
            <div className="bg-cyan-950/30 border border-cyan-800/80 rounded-2xl p-4 flex flex-col justify-between">
              <div className="text-xs text-cyan-300 font-medium flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                {language === 'en' ? 'Time-to-Productivity Speed' : 'Akselerasi Waktu Siap Kerja'}
              </div>
              <div className="my-2">
                <div className="text-2xl sm:text-3xl font-black text-cyan-300">
                  {vokastaTrainingDays} {language === 'en' ? 'Days' : 'Hari'}
                </div>
                <div className="text-xs text-cyan-200 font-semibold mt-1">
                  {language === 'en'
                    ? `${productivityLiftPercent}% Faster (${daysSaved} days reclaimed)`
                    : `${productivityLiftPercent}% Lebih Cepat (${daysSaved} hari dihemat)`}
                </div>
                <span className="text-[10px] text-slate-400 font-medium block mt-1">
                  {language === 'en' ? '(illustrative projection)' : '(proyeksi ilustratif)'}
                </span>
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-cyan-900/60">
                {language === 'en'
                  ? 'Frontliners serve customers accurately in days rather than weeks.'
                  : 'Staf langsung produktif melayani di meja kasir/gerai dalam hitungan hari.'}
              </div>
            </div>

            {/* Card 3: ROI Multiplier */}
            <div className="bg-amber-950/30 border border-amber-800/80 rounded-2xl p-4 flex flex-col justify-between">
              <div className="text-xs text-amber-300 font-medium flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                {language === 'en' ? 'Return on Investment (ROI)' : 'Return on Investment (ROI)'}
              </div>
              <div className="my-2">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">
                  {roiMultiplier}%
                </div>
                <div className="text-xs text-amber-200 font-semibold mt-1">
                  {language === 'en' ? 'Payback Period: < 2 Months' : 'Payback Period: < 2 Bulan'}
                </div>
                <span className="text-[10px] text-slate-400 font-medium block mt-1">
                  {language === 'en' ? '(illustrative projection)' : '(proyeksi ilustratif)'}
                </span>
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-amber-900/60">
                {language === 'en'
                  ? 'Every $1 invested yields over $15 in operational efficiency Year 1.'
                  : 'Setiap Rp 1 modal menghasilkan efisiensi lebih dari Rp 15 dalam tahun pertama.'}
              </div>
            </div>

            {/* Card 4: Quality & Compliance Lift */}
            <div className="bg-purple-950/30 border border-purple-800/80 rounded-2xl p-4 flex flex-col justify-between">
              <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                {language === 'en' ? 'Reputation & Brand Retention' : 'Proteksi Reputasi & Retensi'}
              </div>
              <div className="my-2">
                <div className="text-2xl sm:text-3xl font-black text-purple-300">
                  -84%
                </div>
                <div className="text-xs text-purple-200 font-semibold mt-1">
                  {language === 'en' ? 'Reduction in Service Errors' : 'Penurunan Komplain Pelanggan'}
                </div>
                <span className="text-[10px] text-slate-400 font-medium block mt-1">
                  {language === 'en' ? '(illustrative projection)' : '(proyeksi ilustratif)'}
                </span>
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-purple-900/60">
                {language === 'en'
                  ? 'SOP violations identified & fixed before staff interact with actual guests.'
                  : 'Risiko kesalahan SOP diminimalisir sebelum staf diterjunkan ke pelanggan.'}
              </div>
            </div>
          </div>

          {/* Detailed Financial Comparison Table (Konvensional vs Vokasta) */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                {language === 'en'
                  ? 'Cost Transparency: Conventional Manual Onboarding vs Vokasta'
                  : 'Rincian Transparansi Biaya: Metode Konvensional vs Vokasta'}
              </span>
              <span className="text-xs text-emerald-400 font-mono font-medium">
                {language === 'en'
                  ? `Simulation Scale: ${staffCount} Staff • Wage IDR ${(monthlySalary / 1000000).toFixed(1)}M/Mo`
                  : `Skala Simulasi: ${staffCount} Staf • Gaji Rp ${(monthlySalary / 1000000).toFixed(1)} Jt/Bln`}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2 px-3 font-semibold">
                      {language === 'en' ? 'Expense Category' : 'Komponen Pengeluaran'}
                    </th>
                    <th className="py-2 px-3 font-semibold text-rose-300">
                      {language === 'en'
                        ? `Conventional (${manualTrainingDays} Days)`
                        : `Metode Konvensional (${manualTrainingDays} Hari)`}
                    </th>
                    <th className="py-2 px-3 font-semibold text-emerald-300">
                      {language === 'en'
                        ? `With Vokasta (${vokastaTrainingDays} Days)`
                        : `Dengan Vokasta (${vokastaTrainingDays} Hari)`}
                    </th>
                    <th className="py-2 px-3 font-semibold text-right text-amber-300">
                      {language === 'en' ? 'Net Efficiency / Savings' : 'Efisiensi / Uang Dihemat'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-slate-300">
                  <tr>
                    <td className="py-2.5 px-3">
                      <div className="font-medium text-white">
                        {language === 'en' ? 'Floating Onboarding Salary Waste' : 'Gaji Staf Mengambang (Floating Salary)'}
                      </div>
                      <div className="text-xs text-slate-400">
                        {language === 'en'
                          ? 'Wages disbursed during non-productive training ramp-up'
                          : 'Staf digaji selama masa belajar belum mandiri'}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-rose-300 font-mono">
                      IDR {(manualSalaryWaste / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M
                    </td>
                    <td className="py-2.5 px-3 text-emerald-300 font-mono">
                      IDR {(vokastaSalaryDuringTraining / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-400">
                      +IDR {((manualSalaryWaste - vokastaSalaryDuringTraining) / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3">
                      <div className="font-medium text-white">
                        {language === 'en' ? 'Trainer, Printed Manuals & Practice Waste' : 'Biaya Trainer, Modul & Bahan Baku Coba'}
                      </div>
                      <div className="text-xs text-slate-400">
                        {language === 'en'
                          ? 'Physical binders, spillages, practice milk/coffee, uniform iterations'
                          : 'Buku panduan, bahan terbuang/tumpah, seragam training'}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-rose-300 font-mono">
                      IDR {(manualTrainerMaterialCost / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono">
                      IDR 0 ({language === 'en' ? 'Digital Multimodal' : 'Digital Multimodal'})
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-400">
                      +IDR {(manualTrainerMaterialCost / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3">
                      <div className="font-medium text-white">
                        {language === 'en' ? 'Vokasta AI Platform SaaS License' : 'Investasi Software AI Vokasta'}
                      </div>
                      <div className="text-xs text-slate-400">
                        {language === 'en' ? 'Annual cloud SaaS subscription per seat' : 'Langganan cloud SaaS tahunan per staf'}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono">
                      IDR 0
                    </td>
                    <td className="py-2.5 px-3 text-cyan-300 font-mono">
                      IDR {(totalVokastaCost / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2 })}M / yr
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-cyan-300">
                      {language === 'en' ? '-(Fractional Cost)' : '-(Investasi Terjangkau)'}
                    </td>
                  </tr>
                  <tr className="bg-slate-900/90 font-bold border-t-2 border-slate-700">
                    <td className="py-3 px-3 text-white">
                      {language === 'en' ? 'TOTAL ONBOARDING EXPENDITURE:' : 'TOTAL BIAYA ONBOARDING:'}
                    </td>
                    <td className="py-3 px-3 text-rose-400 font-mono text-sm">
                      IDR {(totalManualCost / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M
                    </td>
                    <td className="py-3 px-3 text-cyan-400 font-mono text-sm">
                      IDR {(totalCostWithVokasta / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-sm text-emerald-400">
                      {language === 'en'
                        ? `Saves IDR ${(totalSavings / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M (${savingsPercent}%)`
                        : `Hemat Rp ${(totalSavings / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} Jt (${savingsPercent}%)`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>
                {language === 'en'
                  ? '*Standard baseline: 25 business days/month. Daily wage = monthly wage ÷ 25.'
                  : '*Asumsi jam kerja standar: 25 hari kerja/bulan. Gaji harian = Gaji bulanan ÷ 25.'}
              </span>
              <span className="text-emerald-400 font-medium">
                {language === 'en'
                  ? `Payback Period: ~${paybackMonths} Months`
                  : `Payback Period (Balik Modal): ~${paybackMonths} Bulan`}
              </span>
            </div>
          </div>

          {/* Investor Moat & Market Potential (TAM) */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2 text-white font-bold text-sm">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>
                  {language === 'en'
                    ? 'Market Opportunity & Commercial Scalability (Empirical Deck 2024-2025)'
                    : 'Daya Tarik Pasar & Potensi Skala Bisnis (Model Proyeksi)'}
                </span>
              </div>
              <span className="text-xs text-amber-400 font-medium">
                {language === 'en'
                  ? 'Market Model: Projections based on internal assumptions (unverified)'
                  : 'Model Pasar: Proyeksi berbasis asumsi internal (belum diverifikasi)'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400 font-medium">Total Addressable Market (TAM):</div>
                <div className="text-base font-black text-white">
                  {language === 'en' ? '$270 Million / Year (IDR 4.2T)' : 'Rp 4,2 Triliun / Tahun'}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'en'
                    ? 'Estimated 14,400+ vocational schools in Indonesia (3.6M students) + estimated 12.4M frontline workers across retail, F&B, and hospitality (asumsi internal, belum diverifikasi).'
                    : 'Estimasi 14.400+ SMK di Indonesia (3,6 Juta siswa) + estimasi 12,4 Juta tenaga kerja garis depan sektor ritel, F&B, dan perhotelan (asumsi internal, belum diverifikasi).'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400 font-medium">
                  {language === 'en' ? 'Unit Economics & Gross Margin:' : 'Unit Economics & Gross Margin:'}
                </div>
                <div className="text-base font-black text-emerald-400">82% SaaS Gross Margin</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'en'
                    ? 'Proprietary prompt compression and neural edge synthesis drive AI inference cost below $0.022 per complete multimodal evaluation session.'
                    : 'Arsitektur smart prompt caching dan edge neural audio menekan biaya komputasi AI hingga di bawah Rp 350 per sesi evaluasi lengkap.'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400 font-medium">
                  {language === 'en' ? 'Defensibility & Moat:' : 'Defensibility & Moat (Parit Pertahanan):'}
                </div>
                <div className="text-base font-black text-amber-400">
                  {language === 'en' ? '10 Dialects & Standardized SOPs' : '10 Dialek & SOP Terstandardisasi'}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'en'
                    ? 'Frontline turnover estimated at 35%-55% (asumsi internal, belum diverifikasi) creates recurring onboarding friction; Vokasta models localized hospitality and operational nuances.'
                    : 'Estimasi turnover tenaga kerja 35%-55% (asumsi internal, belum diverifikasi) memicu beban pelatihan berulang; Vokasta memodelkan nuansa operasional dan keramahan lokal.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            📊 <span className="text-slate-300 font-medium">{language === 'en' ? 'B2B Licensing Model:' : 'Model B2B Lisensi:'}</span>{' '}
            {language === 'en'
              ? 'Institutional Annual Seat packages available with turnkey HRIS REST API integrations (Mekari, SAP, Workday).'
              : 'Tersedia paket berlangganan institusi (Institutional Annual Seat) dan integrasi API HRIS (Mekari, SAP, Workday).'}
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {onOpenProposal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenProposal();
                }}
                className="px-3.5 py-2 rounded-xl bg-blue-950/70 hover:bg-blue-900 border border-blue-800 text-blue-300 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                title={language === 'en' ? 'Open Full Proposal Document' : 'Buka Dokumen Proposal Lengkap & Bisnis'}
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>{language === 'en' ? 'Read Strategic Proposal' : 'Baca Proposal Lengkap'}</span>
              </button>
            )}
            <a
              href="/api/download/proposal"
              download="Vokasta_Strategic_Proposal.docx"
              className="px-3.5 py-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
              title={language === 'en' ? 'Download Word Proposal (.docx)' : 'Unduh Berkas Proposal Format Microsoft Word (.docx)'}
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'en' ? 'Download Word (.docx)' : 'Unduh Word (.docx)'}</span>
            </a>
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition cursor-pointer"
            >
              {language === 'en' ? 'Close' : 'Tutup'}
            </button>
            {onOpenCohortAnalytics && (
              <button
                onClick={() => {
                  onClose();
                  onOpenCohortAnalytics();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <span>{language === 'en' ? 'View Store Telemetry (Sample Data)' : 'Lihat Telemetri Gerai (Data Contoh)'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
