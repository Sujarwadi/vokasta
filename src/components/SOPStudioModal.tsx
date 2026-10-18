import React, { useState, useEffect } from 'react';
import { Sparkles, Building2, BookOpen, Layers, CheckCircle2, ArrowRight, X, AlertCircle, Loader2, Play } from 'lucide-react';
import { Scenario } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useWorkspace, EnterpriseWorkspaceId } from '../context/WorkspaceContext';

interface SOPStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScenarioCreated: (scenario: Scenario) => void;
}

interface PresetSOP {
  workspaceId: EnterpriseWorkspaceId;
  brand: string;
  industry: string;
  role: string;
  sop: string;
}

const PRESET_SOPS_BY_WORKSPACE_ID: Record<EnterpriseWorkspaceId, PresetSOP[]> = {
  fnb_kopi: [
    {
      workspaceId: 'fnb_kopi',
      brand: 'Kedai Kopi Nusantara',
      industry: 'Kafe & F&B Spesialis',
      role: 'Barista Garis Depan',
      sop: `STANDAR OPERASIONAL PROSEDUR (SOP) - BARISTA KEDAI KOPI NUSANTARA:
1. SAPAAN & BRANDING:
Sapa setiap pelanggan yang mendekat ke meja kasir dalam waktu 3 detik dengan senyuman ramah dan kalimat standar: "Selamat datang di Kedai Kopi Nusantara! Selamat pagi, mau kami racikkan kopi apa hari ini?"
2. KONFIRMASI PESANAN & TINGKAT MANIS:
Tanyakan ukuran cangkir (Reguler/Besar), pilihan susu (Susu Segar/Susu Oat), dan konfirmasi tingkat kemanisan (Manis normal, Less sweet 70%, Tanpa gula). Konfirmasi apakah ada alergi susu sapi.
3. EKSEKUSI RACIKAN KHAS:
Ekstraksi dobel espresso (hasil 36 gram), takar 20 ml sirup nektar aren murni, dan 120 ml susu segar yang telah dihangatkan/steamed. Putar cangkir perlahan 5 kali sebelum menutupnya.
4. PENUTUP & NOMOR ANTRIAN:
Serahkan struk pembayaran dengan kedua belah tangan, umumkan nomor antrian dengan jelas: "Terima kasih! Pesanan nomor 42 segera kami siapkan dengan segar untuk Anda."`,
    },
    {
      workspaceId: 'fnb_kopi',
      brand: 'Kedai Kopi Nusantara',
      industry: 'Kafe & F&B Spesialis',
      role: 'Barista Seduh Manual (Manual Brew)',
      sop: `SOP MANUAL BREW V60 & EDUKASI BIJI KOPI LOKAL:
1. GREETING & TANYA PROFIL RASA:
Sambut pelanggan di coffee bar: "Selamat datang di Kopi Nusantara! Sedang mencari cita rasa kopi yang floral asam segar atau yang tebal cokelat karamel?"
2. KALIBRASI TAKARAN & SUHU AIR:
Timbang 15 gram biji single origin nusantara terkalibrasi rasio 1:15. Basahi filter paper, panaskan air suhu 92°C, dan lakukan blooming 30 detik (45ml air).
3. DESKRIPSI TASTING NOTES:
Jelaskan proses pascapanen kopi kepada pelanggan sembari menyeduh dengan santun.
4. PENYAJIAN BERSIH & HANGAT:
Sajikan pada server kaca bersuhu hangat beserta kartu informasi asal-usul petani kopi.`,
    },
  ],
  retail_fashion: [
    {
      workspaceId: 'retail_fashion',
      brand: 'Batik & Busana Nusantara',
      industry: 'Ritel Fesyen & Pakaian',
      role: 'Fashion Advisor & Kamar Pas (Fitting Room)',
      sop: `SOP LAYANAN PELANGGAN & KAMAR PAS BATIK BUSANA:
1. SAPAAN HANGAT & DASAR LAYANAN:
Sambut setiap pengunjung yang menuju area kamar pas dengan suara ramah dan anggukan santun: "Halo, selamat datang di Batik & Busana Nusantara! Berapa potong pakaian yang ingin dicoba hari ini?"
2. VERIFIKASI JUMLAH PAKAIAN:
Hitung setiap potong pakaian secara cermat di hadapan pelanggan (maksimal 6 potong), lalu serahkan keping nomor kamar pas yang sesuai.
3. BANTUAN UKURAN AKTIF:
Tawarkan bantuan secara proaktif apabila pelanggan memerlukan ukuran pengganti atau rekomendasi perawatan bahan kain sutra/katun batik.
4. PROTOKOL PENGEMBALIAN & PERAPIAN:
Saat menerima kembali pakaian yang tidak jadi dibeli: periksa kelengkapan label harga, lipat kembali dengan rapi atau gantungkan langsung pada gantungan pakaian sesuai standar butik.`,
    },
  ],
  automotive_ev: [
    {
      workspaceId: 'automotive_ev',
      brand: 'Nusantara Mobility EV',
      industry: 'Dealer Otomotif & Mobilitas Listrik',
      role: 'Konsultan Penjualan & Teknis EV',
      sop: `SOP KONSULTASI SHOWROOM MOBIL LISTRIK (EV):
1. SAPAAN PROFESIONAL & DISCOVERY KEBUTUHAN:
Sambut calon pembeli di showroom: "Selamat datang di Nusantara Mobility EV! Apakah Bapak/Ibu sedang mencari kendaraan harian dalam kota atau untuk perjalanan antarkota?"
2. EDUKASI KETAHANAN BATERAI & FLOOD TEST:
Jelaskan standar sertifikasi IP67 baterai saat genangan air/banjir dan garansi pabrikan 8 tahun secara transparan.
3. SIMULASI FINANSIAL & CHARGING:
Berikan simulasi biaya pengisian daya di rumah vs SPKLU serta perhitungan angsuran leasing yang jujur tanpa biaya tersembunyi.
4. TERTIB TEST DRIVE & CLOSING SANTUN:
Ajak test drive dengan panduan keselamatan berkendara EV yang lengkap.`,
    },
  ],
};

const PRESET_SOPS_BY_WORKSPACE_EN: Record<EnterpriseWorkspaceId, PresetSOP[]> = {
  fnb_kopi: [
    {
      workspaceId: 'fnb_kopi',
      brand: 'Nusantara Coffee Chain',
      industry: 'Specialty Cafe & F&B',
      role: 'Frontline Barista',
      sop: `STANDARD OPERATING PROCEDURE (SOP) - FRONT COUNTER BARISTA:
1. GREETING & BRAND TAGLINE:
Greet every guest stepping toward the counter within 3 seconds with a warm smile: "Welcome to Nusantara Coffee! Good morning, what can we brew fresh for you today?"
2. ORDER CLARIFICATION & ALLERGEN SCREENING:
Clarify sizing (Regular/Large), dairy preferences (Whole Milk/Oat Milk), and sweetness level. Explicitly screen for lactose sensitivity or dairy allergies.
3. SIGNATURE PREPARATION:
Extract double espresso (36g yield), measure 20ml natural nectar, and steam 120ml milk to microfoam. Swirl cup 5 times before lidding.
4. TICKET HANDOVER & QUEUE ANNOUNCEMENT:
Hand receipt using two hands, announce ticket number clearly: "Thank you! Order number 42 will be freshly prepared for you in just a moment."`,
    },
  ],
  retail_fashion: [
    {
      workspaceId: 'retail_fashion',
      brand: 'Nusantara Boutique Couture',
      industry: 'Fashion Apparel & Boutique',
      role: 'Fitting Room Specialist',
      sop: `SOP FITTING ROOM & GUEST STYLING:
1. WELCOMING INITIATIVE:
Greet guests entering the fitting zone politely: "Welcome to Nusantara Boutique! How many garments would you like to try on today?"
2. PIECE COUNT VERIFICATION:
Count each garment clearly in front of the patron (max 6 pieces), and hand them the corresponding room marker.
3. PROACTIVE SIZE ASSISTANCE:
Check in gently after 2 minutes to offer alternative sizing or styling advice.
4. RETURN & RE-RACKING PROTOCOL:
Inspect price tags, fold neatly, or re-hang according to boutique presentation standards.`,
    },
  ],
  automotive_ev: [
    {
      workspaceId: 'automotive_ev',
      brand: 'Nusantara EV Mobility',
      industry: 'Automotive Dealership & EV Mobility',
      role: 'EV Sales & Technical Specialist',
      sop: `SOP SHOWROOM CONSULTATION - EV MOBILITY:
1. PROFESSIONAL WELCOME & NEEDS DISCOVERY:
Welcome showroom visitors: "Welcome to Nusantara EV Mobility! Are you looking for a daily city commuter or long-range road trips?"
2. BATTERY SAFETY & FLOOD RESISTANCE:
Explain IP67 water immersion rating and the 8-year manufacturer warranty transparently.
3. CHARGING CALCULATION & FINANCING:
Calculate home wallbox vs DC fast charging costs and provide clear financing options.
4. TEST DRIVE COURTESY:
Invite to test drive with regenerative braking safety briefing.`,
    },
  ],
};


export const SOPStudioModal: React.FC<SOPStudioModalProps> = ({
  isOpen,
  onClose,
  onScenarioCreated,
}) => {
  const { language } = useLanguage();
  const { activeWorkspace } = useWorkspace();

  // Load presets strictly isolated to the active enterprise workspace!
  const workspacePresets = language === 'en'
    ? PRESET_SOPS_BY_WORKSPACE_EN[activeWorkspace.id] || PRESET_SOPS_BY_WORKSPACE_EN['fnb_kopi']
    : PRESET_SOPS_BY_WORKSPACE_ID[activeWorkspace.id] || PRESET_SOPS_BY_WORKSPACE_ID['fnb_kopi'];

  const defaultPreset = workspacePresets[0];

  const [brandName, setBrandName] = useState(defaultPreset.brand);
  const [industry, setIndustry] = useState(defaultPreset.industry);
  const [roleTitle, setRoleTitle] = useState(defaultPreset.role);
  const [rawSopText, setRawSopText] = useState(defaultPreset.sop);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScenario, setGeneratedScenario] = useState<Scenario | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync state when activeWorkspace changes
  useEffect(() => {
    const curPresets = language === 'en'
      ? PRESET_SOPS_BY_WORKSPACE_EN[activeWorkspace.id] || PRESET_SOPS_BY_WORKSPACE_EN['fnb_kopi']
      : PRESET_SOPS_BY_WORKSPACE_ID[activeWorkspace.id] || PRESET_SOPS_BY_WORKSPACE_ID['fnb_kopi'];
    const p = curPresets[0];
    if (p) {
      setBrandName(p.brand);
      setIndustry(p.industry);
      setRoleTitle(p.role);
      setRawSopText(p.sop);
      setGeneratedScenario(null);
      setErrorMsg(null);
    }
  }, [activeWorkspace.id, language]);

  if (!isOpen) return null;

  const loadPreset = (preset: PresetSOP) => {
    setBrandName(preset.brand);
    setIndustry(preset.industry);
    setRoleTitle(preset.role);
    setRawSopText(preset.sop);
    setGeneratedScenario(null);
    setErrorMsg(null);
  };

  const handleGenerate = async () => {
    if (!brandName.trim() || !rawSopText.trim()) {
      setErrorMsg(language === 'en' ? 'Brand / Store Name and SOP Text are required.' : 'Nama Merek / Usaha dan Teks SOP wajib diisi.');
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/scenarios/custom-sop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand_name: brandName,
          industry,
          role_title: roleTitle,
          raw_sop_text: rawSopText,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || (language === 'en' ? 'Failed to compile assessment rubric from SOP' : 'Gagal menyusun rubrik penilaian dari SOP'));
      }

      const data = await res.json();
      setGeneratedScenario(data.scenario);
    } catch (err: any) {
      console.error('Error generating SOP:', err);
      setErrorMsg(err.message || (language === 'en' ? 'An issue occurred while authoring the SOP rubric.' : 'Terjadi kendala saat menyusun rubrik SOP.'));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200/90 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {language === 'en' ? 'Brand SOP Rubric Authoring Studio' : 'Studio Pembuat Rubric SOP Merek'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'en'
                  ? 'Paste your store SOP manual or cashier/barista scripts. Multimodal AI compiles them into calibrated interactive simulation rubrics automatically.'
                  : 'Tempel buku panduan SOP atau naskah pelayanan kasir/barista Anda, AI akan mengubahnya menjadi rubrik simulasi siap latih secara otomatis.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm">
          {/* Presets Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {language === 'en'
                    ? `SOP Presets for ${activeWorkspace.nameEn}:`
                    : `Contoh SOP Template untuk ${activeWorkspace.name}:`}
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {activeWorkspace.industryTag}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {workspacePresets.map((preset) => (
                <button
                  key={preset.role}
                  type="button"
                  onClick={() => loadPreset(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                    roleTitle === preset.role
                      ? 'bg-amber-50 text-amber-800 border-amber-300 font-semibold shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {preset.brand} - {preset.role}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'en' ? 'Brand / Company Name' : 'Nama Merek / Perusahaan'}
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder={language === 'en' ? 'e.g. Artisan Coffee' : 'Contoh: Kopi Nusantara'}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500 shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'en' ? 'Industry Sector' : 'Sektor Industri'}
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder={language === 'en' ? 'e.g. Specialty Cafe & F&B' : 'Contoh: Kafe & Makanan Minuman'}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500 shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'en' ? 'Job Role Title' : 'Peran Kerja'}
              </label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder={language === 'en' ? 'e.g. Frontline Barista' : 'Contoh: Barista Garis Depan'}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500 shadow-2xs"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                {language === 'en'
                  ? 'Store Operational SOP Text (Greeting script, recipe ratios, queue stages, de-escalation steps)'
                  : 'Teks SOP Operasional (Naskah sapaan kasir, takaran racikan, tahapan antrian, atau penanganan komplain)'}
              </label>
              <span className="text-xs text-amber-700 font-mono font-medium">
                {language === 'en' ? 'Multimodal AI Rubric Compiler' : 'Penyusun Rubrik AI Multimodal'}
              </span>
            </div>
            <textarea
              rows={6}
              value={rawSopText}
              onChange={(e) => setRawSopText(e.target.value)}
              placeholder={
                language === 'en'
                  ? 'Paste register greeting scripts, menu recipe ratios, service workflows, or problem resolution SOPs...'
                  : 'Tempel naskah sapaan kasir, rasio takaran menu, tahapan layanan, atau SOP penanganan masalah...'
              }
              className="w-full bg-white border border-slate-300 rounded-lg p-3 text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:border-amber-500 leading-relaxed shadow-2xs"
            />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-500">
              {language === 'en' ? (
                <>
                  System separates <strong>Universal Competencies</strong> (tied to worker passport) and <strong>Brand-Specific SOP</strong> (internal store secrets).
                </>
              ) : (
                <>
                  Sistem akan otomatis memilah <strong>Kompetensi Universal</strong> (melekat pada paspor kerja) dan <strong>SOP Khas Merek</strong> (internal gerai).
                </>
              )}
            </span>
            <button
              type="button"
              id="compile-sop-btn"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xs transition disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>{language === 'en' ? 'Synthesizing Calibrated Rubrics with AI...' : 'Menyusun Rubrik Penilaian dengan AI...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'en' ? 'Compile Dual-Layer Rubrics' : 'Sintesis Rubrik Dua Lapis'}</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Rubric Preview */}
          {generatedScenario && (
            <div className="border-t border-slate-200 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-base">
                    {language === 'en' ? 'Dual-Layer Rubrics Compiled Successfully!' : 'Rubrik Dua Lapis Berhasil Disusun!'}
                  </h3>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 font-semibold">
                  {language === 'en' ? 'Total Weight: 100%' : 'Total Bobot: 100%'}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {language === 'en' ? 'Practical Task Instructions:' : 'Instruksi Tugas Praktik Kerja:'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 mt-0.5 leading-relaxed font-medium">
                    {generatedScenario.task_instruction_en}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    {language === 'en'
                      ? `Assessment Parameters (${generatedScenario.parameters.length}):`
                      : `Parameter Penilaian (${generatedScenario.parameters.length}):`}
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {generatedScenario.parameters.map((param) => (
                      <div
                        key={param.id}
                        className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                          param.is_universal
                            ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                            : 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-slate-900">{param.name}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs uppercase tracking-wider font-semibold ${
                              param.is_universal
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {param.is_universal
                              ? language === 'en' ? 'Universal (Passport)' : 'Universal (Paspor Pekerja)'
                              : language === 'en' ? 'Brand-Specific (Internal)' : 'Khusus Merek (Internal)'}{' '}
                            • {param.weight}%
                          </span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          {param.definition}
                        </p>
                        <div className="pt-1 text-xs text-slate-500">
                          <strong className="text-slate-700">
                            {language === 'en' ? 'Observable Actions / Cues:' : 'Kata Kunci / Tindakan Terlihat:'}
                          </strong>{' '}
                          {param.keywords_or_actions.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deploy to Simulation Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  id="deploy-custom-scenario-btn"
                  onClick={() => {
                    onScenarioCreated(generatedScenario);
                    onClose();
                  }}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-xs flex items-center space-x-2 transition cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{language === 'en' ? 'Launch Simulation with this SOP' : 'Jalankan Simulasi dengan SOP Ini'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
