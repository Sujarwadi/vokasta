import React, { useState } from 'react';
import { X, Award, ShieldCheck, CheckCircle2, TrendingUp, Copy, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface WorkerPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkerPassportModal: React.FC<WorkerPassportModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  if (!isOpen) return null;

  const sampleBadges = [
    {
      id: 'badge-1',
      title: language === 'en' ? 'Customer Greeting & Welcoming Standards' : 'Standar Sapaan & Keramahan Pelanggan',
      issuer: 'Vokasta Assessment Standard',
      standard: '1EdTech Open Badges v3.0 / W3C Verifiable Credential',
      date: '2026-08-15',
      grade: language === 'en' ? '94/100 • Exemplary (sample data)' : '94/100 • Teladan (data contoh)',
      hash: 'urn:uuid:8f3c21a0-9b84-4e31-8931-a67b2d56ef12',
      isUniversal: true,
    },
    {
      id: 'badge-2',
      title: language === 'en' ? 'Food Allergen Inquiries & Hygiene Protocols' : 'Protokol Alergen Makanan & Higienitas SOP',
      issuer: 'Vokasta Assessment Standard',
      standard: '1EdTech Open Badges v3.0 / W3C Verifiable Credential',
      date: '2026-08-28',
      grade: language === 'en' ? '88/100 • Competent (sample data)' : '88/100 • Kompeten (data contoh)',
      hash: 'urn:uuid:71a45b89-21c3-4d67-ba92-d39ef4520981',
      isUniversal: true,
    },
    {
      id: 'badge-3',
      title: language === 'en' ? 'De-escalation & Customer Care Protocols' : 'Protokol De-eskalasi & Pelayanan Konsumen Kritis',
      issuer: language === 'en' ? 'Vokasta (sample)' : 'Vokasta (contoh)',
      standard: '1EdTech Open Badges v3.0 / W3C Verifiable Credential',
      date: '2026-09-02',
      grade: language === 'en' ? '91/100 • Competent (sample data)' : '91/100 • Kompeten (data contoh)',
      hash: 'urn:uuid:b1297e64-f5a1-4320-801c-e7845ba39120',
      isUniversal: true,
    },
  ];

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-750 rounded-2xl w-full max-w-3xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/90 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white">
                  {language === 'en' ? 'Frontline Competency Passport' : 'Paspor Kompetensi Pekerja Garis Depan'}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                  Open Badges v3.0
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'en'
                  ? 'Portable, employer-independent digital credential schema owned directly by the worker.'
                  : 'Kredensial portabel, independen dari perusahaan, dimiliki langsung oleh pekerja.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Prominent Hero: Worker Identity & Certified Status */}
        <div className="p-6 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 shrink-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-2xl flex items-center justify-center shadow-md shadow-amber-500/10 border border-amber-400">
                RP
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold text-white">Rian Pratama</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase font-mono">
                    {language === 'en' ? 'Sample Passport' : 'Data Contoh'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] border border-slate-700 font-semibold">
                    {language === 'en' ? 'Frontline Practitioner' : 'Praktisi Garis Depan'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {language === 'en'
                    ? 'Frontline Operations Specialist • 3 Universal Credentials (Sample Data)'
                    : 'Spesialis Operasional Garis Depan • 3 Kredensial Universal (Data Contoh)'}
                </p>
                <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1.5">
                  <span>{language === 'en' ? 'Vocational High School Graduate' : 'Lulusan SMK Vokasi'}</span>
                  <span>•</span>
                  <span>{language === 'en' ? '10 Dialects Support (design capability, unvalidated)' : 'Dukungan 10 Dialek (kapabilitas desain, belum divalidasi)'}</span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right sm:border-l sm:border-slate-800 sm:pl-6">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                {language === 'en' ? 'Competency Level' : 'Level Kompetensi'}
              </span>
              <span className="text-2xl font-black text-white tracking-tight block">
                {language === 'en' ? 'Level 2: Proficient' : 'Tingkat 2: Mahir'}
              </span>
              <span className="text-[11px] text-amber-400 font-medium block">
                {language === 'en' ? 'Store Shift Supervisor Ready' : 'Siap Menjabat Supervisor Shift Gerai'}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Supporting Details Section */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300">
          {/* Social Impact Perspective Note */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center space-x-2 text-white font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{language === 'en' ? 'Portable Credentials & Merit Mobility' : 'Kredensial Portabel & Mobilitas Meritokrasi'}</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              {language === 'en'
                ? 'Vokasta bridges vocational job-seekers and retail employers by turning demonstrated operational competence into standardized open credentials, removing degree barriers for skilled frontline workers.'
                : 'Vokasta menjembatani pencari kerja vokasi dan pemberi kerja ritel dengan mengubah kompetensi operasional nyata menjadi format kredensial terbuka terstandarisasi, menghapus hambatan gelar formal bagi pekerja berkemampuan tinggi.'}
            </p>
          </div>

          {/* Supporting Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-semibold">{language === 'en' ? 'Earning Potential' : 'Potensi Pendapatan'}</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl font-bold text-white">{language === 'en' ? '+25% Wage Potential' : '+25% Potensi Gaji'}</div>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                {language === 'en' ? '(illustrative projection)' : '(proyeksi ilustratif)'}
              </span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-semibold">{language === 'en' ? 'Dialect Support' : 'Dukungan Dialek'}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl font-bold text-white">{language === 'en' ? '10 Dialects' : '10 Dialek'}</div>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                {language === 'en' ? '(design capability)' : '(kapabilitas desain)'}
              </span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-semibold">{language === 'en' ? 'Credential Portability' : 'Portabilitas Kredensial'}</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl font-bold text-white">3 {language === 'en' ? 'Issued Badges' : 'Lencana Diterbitkan'}</div>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                {language === 'en' ? '(sample data)' : '(data contoh)'}
              </span>
            </div>
          </div>

          {/* Verified Badges List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{language === 'en' ? 'Portable Credentials Portfolio' : 'Portofolio Kredensial Portabel'}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {language === 'en' ? 'Sample Data' : 'Data Contoh'}
                </span>
              </h4>
              <span className="text-xs text-slate-400 font-mono">
                {language === 'en' ? 'Sample Hash (unsigned)' : 'Contoh Hash (belum ditandatangani)'}
              </span>
            </div>

            <div className="space-y-2.5">
              {sampleBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 shadow-2xs hover:border-amber-500/50 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white text-sm">{badge.title}</span>
                        <span className="px-2 py-0.2 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {badge.grade}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span>{language === 'en' ? 'Issued by:' : 'Penerbit:'} <strong className="text-slate-200">{badge.issuer}</strong></span>
                        <span>•</span>
                        <span>{language === 'en' ? 'Date:' : 'Tanggal:'} {badge.date}</span>
                        <span>•</span>
                        <span className="text-slate-400">{badge.standard}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyHash(badge.hash)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono flex items-center space-x-1.5 transition cursor-pointer self-start sm:self-center shrink-0"
                      title={language === 'en' ? 'Copy sample hash' : 'Salin hash contoh'}
                    >
                      {copiedHash === badge.hash ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300 font-semibold">{language === 'en' ? 'Copied!' : 'Tersalin!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>{language === 'en' ? 'Proof Hash' : 'Hash Bukti'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
