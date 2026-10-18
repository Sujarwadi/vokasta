import { IndonesianDialect } from '../types';
import { DIALECT_CONFIG, sanitizeSpokenDialectText } from './dialectDictionary';

export interface QuickResponseOption {
  id: string;
  label: string;
  text: string;
  category: 'ideal' | 'flawed' | 'turn';
  color: 'teal' | 'amber' | 'sky' | 'purple' | 'rose';
}

/**
 * Matrix of authentic regional quick responses for core scenarios across all 10 Indonesian dialects.
 * Supports gender-matched worker honorifics (Kang/Teh, Mas/Mbak, Cak/Ning, Bang/Kak, Uda/Uni, Bli/Gek, etc.)
 */
export const REGIONAL_QUICK_RESPONSES: Record<
  string,
  Record<
    IndonesianDialect,
    {
      male: QuickResponseOption[];
      female: QuickResponseOption[];
    }
  >
> = {} as any;

// Helper to define responses cleanly with male and female worker variations
function defineScenarioResponses(
  scenarioId: string,
  configs: Partial<
    Record<
      IndonesianDialect,
      {
        male: QuickResponseOption[];
        female?: QuickResponseOption[];
      }
    >
  >
) {
  if (!REGIONAL_QUICK_RESPONSES[scenarioId]) {
    REGIONAL_QUICK_RESPONSES[scenarioId] = {} as any;
  }

  const dialects: IndonesianDialect[] = [
    'jabodetabek',
    'sunda',
    'jawa_tengah',
    'jawa_timur',
    'medan',
    'minang',
    'bali',
    'makassar',
    'manado',
    'timur',
  ];

  for (const d of dialects) {
    const dialectCfg = configs[d] || configs['jabodetabek'];
    if (dialectCfg) {
      REGIONAL_QUICK_RESPONSES[scenarioId][d] = {
        male: dialectCfg.male,
        female: dialectCfg.female || dialectCfg.male,
      };
    }
  }
}

// 1. scen_complaint_03 (Komplain Alergi Susu Sapi - Barista)
defineScenarioResponses('scen_complaint_03', {
  jabodetabek: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh: L.A.S.T Empati, Ganti Oat Milk & Voucher',
        text: 'Ya ampun Ibu Nadia, saya mohon maaf sebesar-besarnya atas kelalaian kami. Keselamatan Ibu prioritas utama kami. Mohon tunggu 2 menit ya Bu, saya buatkan langsung segelas baru dengan oat milk steril bebas biaya, dan ini voucher kompensasi untuk kunjungan berikutnya.',
        category: 'ideal',
        color: 'amber',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Defensif & Melempar Kesalahan ke Kasir',
        text: 'Lho bukan salah saya Bu, kasir depannya yang salah ngetik di mesin POS. Kalau mau ganti ya bayar lagi Bu.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  sunda: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Sunda): L.A.S.T Empati, Ganti Oat Milk & Voucher',
        text: 'Duh Gusti Ibu Nadia, hapunten pisan tina sagala kalepatan abdi sadaya. Kasehatan sareng kasalametan Ibu perkawis utami kanggo abdi. Punten antosan 2 menit nya Bu, abdi damelkeun deui sagelas anyar nganggo oat milk steril haratis, sareng ieu aya voucher kompensasi hapunten kanggo sumping deui engkin.',
        category: 'ideal',
        color: 'amber',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Defensif & Nyalahkeun Kasir',
        text: 'Ih sanes lepat abdi atuh Bu, kasir payun anu lepat ngetik strukna. Pami hoyong gentos kedah mayar deui atuh.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_tengah: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Jawa): L.A.S.T Empati, Ganti Oat Milk & Voucher',
        text: 'Nyuwun pangapunten sanget Ibu Nadia, kulo nyuwun agunging samodra pangaksami awit kalepatan menika. Kasarasan panjenengan dados prioritas utami kulo. Nyuwun tulung nenggo kalih menit kemawon nggih Bu, kulo damelaken enggal setunggal gelas ngginakaken oat milk steril gratis mboten bayar, lan niki voucher kompensasi kagem rawuh salajengipun.',
        category: 'ideal',
        color: 'amber',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Nyalahaken Kasir',
        text: 'Sanes lepat kulo nggih Bu, kasir ngajeng niku sing salah nulis. Menawi badhe gantos kedah bayar malih.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Suroboyo): L.A.S.T Empati, Ganti Oat Milk & Voucher',
        text: 'Sepurane sing akeh yo Bu Nadia, aku njaluk sepuro nemen atas salahe kene. Keslametane Sampean nomer siji gawe kene. Tulung enteni rong menit yo Bu, tak gawekno maneh anyar sak gelas gawe oat milk steril gratis gak usah bayar, trus iki onok voucher kompensasi gawe cangkrukan maneh sesuk.',
        category: 'ideal',
        color: 'amber',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Nyalahno Kasir & Nyolot',
        text: 'Lho dudu salahku se Bu, kasir ngarep sing salah nyatet rek. Lek njaluk ganti yo bayaro maneh.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  medan: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Medan): L.A.S.T Empati, Ganti Oat Milk & Voucher',
        text: 'Alamak Ibu Nadia, minta maaf kali lah aku atas kekhilafan kami ini ya Bu. Nyawa dan keselamatan Ibu nomor satu buat kami. Tunggu dua menit ya Bu, langsung kubuatkan yang baru segelas pakai oat milk steril gratis tanpa bayar, dan ini kutambah voucher kompensasi buat ngopi Ibu berikutnya.',
        category: 'ideal',
        color: 'amber',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Ngotot & Salahkan Staf Kasir',
        text: 'Bukan salahku ini Bu, kasir depan sana yang salah buat bon. Kalau mau ganti ya bayar lagilah Bu.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  minang: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Minang): L.A.S.T Empati, Ganti Oat Milk & Voucher',
        text: 'Onde mande Ibu Nadia, ambo mamintak maaf sabana-bana ateh kasalahan kami ko Bu. Kasaatan Ibu prioritas utamo kami. Tolong tunggu duo minik yo Bu, langsuang ambo buekan sagelas baru jo oat milk steril indak babayia, sarato iko ado voucher kompensasi untuak minum kopi salanjuiknyo.',
        category: 'ideal',
        color: 'amber',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Manyalahan Kasir',
        text: 'Indak salah ambo doh Bu, kasir di muko nan salah tulih. Kok nio ganti bayia lo baliak.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  bali: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Bali): L.A.S.T Empati, Ganti Oat Milk & Voucher',
        text: 'Ampura pisan Ibu Nadia, titiang nunas gung sinampura pisan antuk iwang puniki. Kasukeran sareng karahayuan Ibu dados prioritas utama titiang. Durus ngantos kalih menit kemanten nggih Bu, titiang karyanang anyar agelas ngangge oat milk steril tan keni prabea, lan puniki voucher kompensasi kagem rauh malih.',
        category: 'ideal',
        color: 'amber',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Nenten Tanggap & Defensif',
        text: 'Nenten tiang sane iwang Bu, kasir ring arep sane salah nyurat. Yening jagi ngentosin patut naur malih.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  makassar: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Makassar): L.A.S.T Empati, Ganti Oat Milk & Voucher',
        text: "Tabe' Ibu Nadia, minta maaf ka' sebesar-besarnya atas keteledoranku ini Bu. Keselamatanta' prioritas utamaku ini. Tunggu ki' 2 menit nah Bu, langsung kubikinkan ki' gelas baru pakai oat milk steril gratis tanpa bayar, sama ini ada voucher kompensasi untuk ngopita' berikutnya.",
        category: 'ideal',
        color: 'amber',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Lempar Kesalahan ke Kasir',
        text: 'Bukan salahku ini Bu, kasir di depan yang salah input. Kalau mauki ganti bayarki lagi.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  manado: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Manado): L.A.S.T Empati, Ganti Oat Milk & Voucher',
        text: 'Ado Ibu Nadia, kita minta maaf skali kwa\' atas ini kasalahan. Ibu pe kesehatan nomor satu pa torang. Tunggu dua menit neh Bu, kita beking ulang baru satu galas pake oat milk steril gratis, kong ini ada voucher kompensasi for Ibu pe belanja ulang.',
        category: 'ideal',
        color: 'amber',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Baku Salahkan deng Kasir',
        text: 'Bukang kita pe salah ini Bu, kasir di muka pe sala ketik. Kalo mo ganti bayar ulang neh.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Papua/Timur): L.A.S.T Empati, Ganti Oat Milk & Voucher',
        text: 'Aduh Ibu Nadia, sa minta maaf banyak-banyak e atas tong pu salah ini. Ibu pu keselamatan nomor satu untuk kitorang. Tunggu dua menit e Bu, sa bikin baru satu gelas pakai oat milk steril gratis tra bayar, deng ini voucher kompensasi kitorang kasih untuk Ibu datang minum lagi.',
        category: 'ideal',
        color: 'amber',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Bela Diri & Salahkan Kasir',
        text: 'Bukan sa pu salah ini Ibu, kasir di depan yang salah tulis. Kalo mau ganti harus bayar lagi e.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
});

// 2. scen_greeting_01 (Barista Kopi Nusantara - Salam & Oat Milk Less Sweet)
defineScenarioResponses('scen_greeting_01', {
  jabodetabek: {
    male: [
      {
        id: 'turn1',
        label: '💡 Turn 1: Salam Hangat & Solusi Oat Milk 50% Less Sweet',
        text: 'Halo Kak, selamat datang di Kopi Nusantara! Tentu bisa banget kak, kami sediakan opsi Oat Milk creamy yang 100% plant-based dan ramah lambung. Untuk gulanya rekomendasi kami 50% less sweet agar rasa kopinya tetap balance. Mau ukuran regular atau large Kak?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn2',
        label: '💡 Turn 2: Suggestive Selling Pastry Warm Almond Croissant',
        text: 'Siap Kak! Rekomendasi terfavorit kami Warm Almond Croissant yang renyah dan buttery. Sedang ada promo bundling hemat Rp10.000 juga kalau pesan bareng kopi susu oat milk. Mau sekalian dihangatkan satu Kak?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn3',
        label: '💡 Turn 3: Konfirmasi Pesanan & Pembayaran QRIS',
        text: 'Baik Kak, 1 Iced Oat Milk Coffee Less Sweet dan 1 Warm Almond Croissant ya. Totalnya 48 ribu rupiah, pembayaran bisa scan QRIS di sebelah sini. Terima kasih banyak, silakan ditunggu sebentar ya Kak!',
        category: 'turn',
        color: 'amber',
      },
    ],
  },
  sunda: {
    male: [
      {
        id: 'turn1',
        label: '💡 Turn 1 (Sunda): Wilujeng Sumping & Oat Milk Less Sweet',
        text: 'Wilujeng sumping di Kopi Nusantara! Mangga tiasa pisan Teh, disayogikeun pilihan Oat Milk creamy anu 100% nabati aman kanggo lambung. Gulana disarankeun 50% less sweet supados raos kopina tetep pas. Palay ukuran regular atanapi large Teh?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn2',
        label: '💡 Turn 2 (Sunda): Suggestive Selling Warm Almond Croissant',
        text: 'Muhun siap Teh! Pangseueurna resep Warm Almond Croissant anu garing renyah sareng gurih buttery. Nuju aya promo bundling hemat Rp10.000 pami dipesen sareng kopi susu oat milk. Kersa sakantenan dihaneutkeun hiji Teh?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn3',
        label: '💡 Turn 3 (Sunda): Konfirmasi Pesenan & Scan QRIS',
        text: 'Saé atuh Teh, 1 Es Kopi Susu Oat Milk Less Sweet sareng 1 Warm Almond Croissant haneut nya. Sadayana Rp48.000, mayarna tiasa scan QRIS palih dieu. Hatur nuhun pisan, mangga diantosan sakedap nya Teh!',
        category: 'turn',
        color: 'amber',
      },
    ],
  },
  jawa_tengah: {
    male: [
      {
        id: 'turn1',
        label: '💡 Turn 1 (Jawa): Sugeng Rawuh & Oat Milk Less Sweet',
        text: 'Sugeng rawuh wonten Kopi Nusantara! Saestu saged sanget Mbak, wonten pilihan Oat Milk nabati ingkang aman kagem lambung. Gendhisipun kulo aturi 50% less sweet supados raos kopinipun tetep mantep. Kersa ukuran regular menapa large Mbak?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn2',
        label: '💡 Turn 2 (Jawa): Tawisaken Pastry Warm Almond Croissant',
        text: 'Sendika dawuh Mbak! Paling dipun remeni Warm Almond Croissant ingkang renyah lan gurih. Wonten promo paket hemat Rp10.000 menawi dipun sarengi kopi oat milk. Kersa kulo hangetaken setunggal sekalian Mbak?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn3',
        label: '💡 Turn 3 (Jawa): Konfirmasi Pesanan & Pembayaran QRIS',
        text: 'Inggih Mbak, 1 Es Kopi Susu Oat Milk Less Sweet kaliyan 1 Warm Almond Croissant nggih. Sedantenipun 48 ewu rupiah, saged scan QRIS wonten mriki. Matur nuwun sanget, nyuwun tulung dipun tenggo sekedap nggih Mbak!',
        category: 'turn',
        color: 'amber',
      },
    ],
  },
  jawa_timur: {
    male: [
      {
        id: 'turn1',
        label: '💡 Turn 1 (Suroboyo): Salam Akrab & Oat Milk Less Sweet',
        text: 'Halo rek, selamat teko nang Kopi Nusantara! Iso temenan Mbak, onok pilihan Oat Milk creamy 100% nabati aman gawe lambung. Gulane tak saranaken 50% less sweet yo ben rasa kopine tetep mantep. Njaluk ukuran regular opo large Mbak?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn2',
        label: '💡 Turn 2 (Suroboyo): Tawarno Warm Almond Croissant',
        text: 'Siap Mbak! Paling laris iki Warm Almond Croissant sing renyah gurih buttery. Pas onok promo diskon hemat Rp10.000 lek pesen bareng kopi oat milk. Gelem sekalian tak angetno siji Mbak?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn3',
        label: '💡 Turn 3 (Suroboyo): Konfirmasi & Scan QRIS',
        text: 'Oke siap Mbak, 1 Es Kopi Susu Oat Milk Less Sweet karo 1 Warm Almond Croissant yo. Totale 48 ewu, iso scan QRIS sebelah kene. Suwun akeh yo Mbak, dienteni sediluk!',
        category: 'turn',
        color: 'amber',
      },
    ],
  },
  medan: {
    male: [
      {
        id: 'turn1',
        label: '💡 Turn 1 (Medan): Salam Hangat & Oat Milk Less Sweet',
        text: 'Horas Kak, selamat datang di Kopi Nusantara! Bisa kali Kak, ada opsi Oat Milk creamy yang ramah lambung bebas alergi. Gulanya kurekomendasikan 50% less sweet biar pas rasa kopinya. Mau ukuran regular atau large Kak?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn2',
        label: '💡 Turn 2 (Medan): Tawarkan Pastry Croissant Promo',
        text: 'Pilihan mantap Kak! Paling favorit kami Warm Almond Croissant yang garing renyah. Lagi promo hemat Rp10.000 kalau gabung sama kopi oat milk. Sekalian kuhangatkan satu ya Kak?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn3',
        label: '💡 Turn 3 (Medan): Totalan Bon & Scan QRIS',
        text: 'Beres Kak, 1 Es Kopi Oat Milk Less Sweet sama 1 Warm Almond Croissant ya. Totalnya 48 ribu, bisa bayar pakai QRIS di sini. Makasih banyak ya Kak, tunggu bentar ya!',
        category: 'turn',
        color: 'amber',
      },
    ],
  },
  minang: {
    male: [
      {
        id: 'turn1',
        label: '💡 Turn 1 (Minang): Salamaik Datang & Oat Milk',
        text: 'Salamaik datang di Kopi Nusantara Uni! Tantu bisa bana, ado pilihan Oat Milk nabati nan aman untuak lambuang. Gulonyo rancak 50% less sweet bia rasonyo lamak pas. Ukuran regular atau large Uni?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn2',
        label: '💡 Turn 2 (Minang): Tawarkan Warm Almond Croissant',
        text: 'Siap Uni! Nan paliang pavorit Warm Almond Croissant nan gariang gurih. Sadang ado promo hemat Rp10.000 kalau dipasan basamo kopi oat milk. Sakalian diangekkan ciek Uni?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn3',
        label: '💡 Turn 3 (Minang): Konfirmasi Pasanan & QRIS',
        text: 'Eloklah Uni, 1 Kopi Susu Oat Milk Less Sweet jo 1 Almond Croissant yo. Sadonyo 48 ribu rupiah, bisa scan QRIS disiko. Tarimo kasih banyak Uni, tunggu sabanta yo!',
        category: 'turn',
        color: 'amber',
      },
    ],
  },
  bali: {
    male: [
      {
        id: 'turn1',
        label: '💡 Turn 1 (Bali): Om Swastyastu & Oat Milk',
        text: 'Om Swastyastu Gek, selamat rauh ring Kopi Nusantara! Saged pisan Gek, wenten Oat Milk creamy sane aman kagem lambung. Gulannyane becikan 50% less sweet mangda rasannyane seimbang. Jagi ukuran regular napi large Gek?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn2',
        label: '💡 Turn 2 (Bali): Tawisang Almond Croissant',
        text: 'Becik pisan Gek! Pinih kasenengin Warm Almond Croissant sane renyah gurih. Wenten promo paket hemat Rp10.000 yening pesen sareng kopi oat milk. Sekalian kapepasin asiki Gek?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn3',
        label: '💡 Turn 3 (Bali): Konfirmasi Pesanan & QRIS',
        text: 'Inggih Gek, 1 Es Kopi Susu Oat Milk Less Sweet lan 1 Warm Almond Croissant nggih. Makasami 48 tali rupiah, durus scan QRIS iriki. Suksema pisan nggih Gek, durus ngantos sakedep!',
        category: 'turn',
        color: 'amber',
      },
    ],
  },
  makassar: {
    male: [
      {
        id: 'turn1',
        label: '💡 Turn 1 (Makassar): Tabe\' & Oat Milk Less Sweet',
        text: "Tabe' Kakak, selamat datang di Kopi Nusantara! Bisa sekali ji Kak, ada pilihan Oat Milk creamy aman sekali untuk lambung. Gulanya kubikinkan ki' 50% less sweet nah supaya pas rasa kopinya. Ukuran regular atau large ki' Kak?",
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn2',
        label: '💡 Turn 2 (Makassar): Tawarkan Pastry Croissant Bundling',
        text: "Siap Kakak! Yang paling laris Warm Almond Croissant renyah gurih mentega. Ada promo bundling hemat Rp10.000 kalau pesan bareng kopi oat milk. Kupanasankan ki' satu sekalian nah Kak?",
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn3',
        label: '💡 Turn 3 (Makassar): Konfirmasi & Pembayaran QRIS',
        text: "Iye Kakak, 1 Es Kopi Susu Oat Milk Less Sweet sama 1 Warm Almond Croissant di'. Totalnya 48 ribu ji, bisa bayar scan QRIS di sebelah sini. Terima kasih banyak nah Kak, ditunggu sebentar!",
        category: 'turn',
        color: 'amber',
      },
    ],
  },
  manado: {
    male: [
      {
        id: 'turn1',
        label: '💡 Turn 1 (Manado): Salam & Oat Milk Less Sweet',
        text: 'Tabea Nona, selamat datang di Kopi Nusantara! Boleh skali Nona, ada pilihan Oat Milk creamy aman for lambung. Depe gula lebe bae 50% less sweet supaya depe rasa kopi tetap seimbang. Mo ukuran regular ato large Nona?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn2',
        label: '💡 Turn 2 (Manado): Tawarkan Croissant Gurih',
        text: 'Mantap Nona! Paling sadap Warm Almond Croissant garing buttery. Ada promo diskon hemat Rp10.000 kalo order deng kopi oat milk. Sekalian mo kase anget satu Nona?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn3',
        label: '💡 Turn 3 (Manado): Konfirmasi & Scan QRIS',
        text: 'Bae Nona, 1 Es Kopi Susu Oat Milk Less Sweet deng 1 Warm Almond Croissant neh. Samua 48 ribu, boleh scan QRIS di sabalah sini. Makase banya neh Nona, tunggu sadiki jo!',
        category: 'turn',
        color: 'amber',
      },
    ],
  },
  timur: {
    male: [
      {
        id: 'turn1',
        label: '💡 Turn 1 (Papua/Timur): Salam & Oat Milk Ramah Perut',
        text: 'Selamat datang kawan di Kopi Nusantara! Tentu bisa sekali kaka, ada pilihan Oat Milk creamy yang aman untuk perut kembung. Gulanya sa bikin 50% less sweet e supaya depe rasa kopi seimbang. Mau ukuran regular ka large kaka?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn2',
        label: '💡 Turn 2 (Papua/Timur): Tawarkang Croissant Promo',
        text: 'Siap kaka! Yang paling enak Warm Almond Croissant renyah gurih mentega. Ada promo potongan hemat Rp10.000 kalau pesan sama kopi oat milk. Mau sa hangatkan satu kaka?',
        category: 'turn',
        color: 'amber',
      },
      {
        id: 'turn3',
        label: '💡 Turn 3 (Papua/Timur): Totalan & Scan QRIS',
        text: 'Baik kaka, 1 Es Kopi Susu Oat Milk Less Sweet deng 1 Warm Almond Croissant e. Totalnya 48 ribu rupiah, bisa scan QRIS di sebelah sini. Terima kasih banyak e kaka, tunggu sebentar!',
        category: 'turn',
        color: 'amber',
      },
    ],
  },
});

// 3. scen_jobseeker_hospitality_basic (Hospitalitas & Loket Layanan)
defineScenarioResponses('scen_jobseeker_hospitality_basic', {
  jabodetabek: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh: Salam Hangat, Kontak Mata & Arahan Loket Layanan',
        text: 'Selamat siang Ibu Ratna, selamat datang! Tentu dengan senang hati saya bantu. Untuk loket informasi dan bagian layanan umum ada tepat di sebelah kanan lobi ini Bu. Mari saya antarkan langsung ke depan loketnya agar Ibu lebih nyaman.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Menunjuk Acuh Tak Acuh',
        text: 'Di sana Bu loketnya, cari aja sendiri di sebelah kanan lobi.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  sunda: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Sunda): Wilujeng Sumping & Jajapkeun ka Loket',
        text: 'Wilujeng siang Ibu Ratna, wilujeng sumping! Kalayan bingah abdi bantosan. Kanggo loket informasi sareng palayanan umum aya pas di palih katuhu lobi ieu Bu. Hayu abdi jajapkeun langsung payuneun loketna supados Ibu langkung merenah.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Nuduhkeun Teu Paduli',
        text: 'Palih ditu Bu loketna, milarian nyalira weh di palih katuhu lobi.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_tengah: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Jawa): Sugeng Rawuh & Derekaken Dhateng Loket',
        text: 'Sugeng siang Ibu Ratna, sugeng rawuh! Kanthi bingahing manah kulo dherekaken mbiyantu. Kagem loket informasi lan pelayanan umum wonten ing sisih tengen lobi menika Bu. Mangga kulo dherekaken langsung dumugi ngajeng loketipun supados Ibu langkung kepenak.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Dingin & Boten Santun',
        text: 'Wonten mrika Bu loketipun, padosi piyambak wonten sisih tengen lobi.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Suroboyo): Salam Ramah & Diaterno Nang Loket',
        text: 'Selamat siang Bu Ratna, selamat teko! Kanthi seneng ati kene bantu. Gawe loket informasi lan layanan umum onok pas nang sebelah tengene lobi iki Bu. Ayo tak terne langsung nang ngarep lokete ben Sampean gak bingung.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Mung Nuding Gak Niat',
        text: 'Nang kono lho Bu lokete, golekono dewe nang sebelah tengene lobi.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  medan: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Medan): Salam Ramah & Antarkan ke Loket',
        text: 'Selamat siang Ibu Ratna, selamat datang ya Bu! Dengan senang hati kubantu Ibu. Loket informasi dan layanan umum ada pas di sebelah kanan lobi ini Bu. Mari kuantarkan langsung ke depan loketnya biar tak pening Ibu mencari.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Nunjuk Acuh Tak Acuh',
        text: 'Di situ loketnya Bu, cari sendirilah di sebelah kanan lobi itu.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  minang: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Minang): Salamaik Siang & Antakan ka Loket',
        text: 'Salamaik siang Ibu Ratna, salamaik tibo! Jo sanang hati ambo bantu Bu. Untuak loket informasi jo layanan umum ado tapek di sabalah suok lobi ko Bu. Mari ambo antakan langsuang ka muko loketnyo supayo Ibu lamak batanyo.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Menunjuk Acuh Tak Acuh',
        text: 'Disinan Bu loketnyo, cari surang se di sabalah suok lobi.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  bali: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Bali): Om Swastyastu & Derekang ka Loket',
        text: 'Om Swastyastu Ibu Ratna, selamat rauh! Bagia pisan titiang saged ngwantu. Loket informasi lan pelayanan umum wenten ring tengen lobi puniki Bu. Durus titiang anterang langsung ring ajeng loket mangda Ibu tenang.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Acuh Menunjuk',
        text: 'Ring rika Bu loketne, rereh pedidi ring samping tengen lobi.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  makassar: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Makassar): Salam Santun & Antar ke Loket',
        text: "Tabe' Ibu Ratna, selamat datang! Dengan senang hati kubantuki'. Untuk loket informasi ada pas di sebelah kanan lobi ini Bu. Mari kuantarki' langsung ke depan loket supaya tidak bingungki'.",
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Cuek Menunjuk',
        text: 'Di sana ji Bu loketnya, cariki sendiri di sebelah kanan lobi.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  manado: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Manado): Salam & Antar Langsung pa Loket',
        text: 'Tabea Ibu Ratna, selamat datang! Senang skali kita mo bantu pa Ibu. Loket informasi ada pas di sabalah kanan lobi ini Bu. Mari jo kita kase antar langsung pa loket supaya Ibu lebe nyaman.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Malas Antar',
        text: 'Di sana depe loket Bu, cari sandiri jo di sabalah kanan lobi.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Papua/Timur): Salam & Antar ke Depan Loket',
        text: 'Selamat siang Ibu Ratna, selamat datang e! Dengan senang hati sa bantu kawan. Untuk loket informasi ada pas di sebelah kanan lobi ini Bu. Mari sa antar langsung ke depan loket biar Ibu tidak bingung e.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Lepas Tangan',
        text: 'Di sana loketnya Bu, pergi cari sendiri di sebelah kanan lobi.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
});

// 4. scen_jobseeker_complaint_deescalation (De-eskalasi Antrean Molor)
defineScenarioResponses('scen_jobseeker_complaint_deescalation', {
  jabodetabek: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh: L.E.A.R De-eskalasi, Maaf Tulus & Kepastian Waktu',
        text: 'Pak Hendra, saya memohon maaf sebesar-besarnya atas keterlambatan antrean ini. Kami sangat memahami waktu Bapak sangat berharga dan ada keperluan mendesak. Saya segera koordinasikan langsung ke petugas loket agar berkas Bapak diprioritaskan dalam 2 menit ini ya Pak.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Membela Diri & Menyalahkan Sistem',
        text: 'Ya namanya juga lagi ramai Pak, sabar dong jangan marah-marah ke saya, sistemnya yang lambat bukan saya.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  sunda: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Sunda): Hapunten Pisan & Kapastian 2 Menit',
        text: 'Pak Hendra, abdi nyuhunkeun hapunten pisan kana kateuteupuguhan antrean ieu. Abdi paham pisan waktos Bapa peryogi penting pisan. Abdi enggal koordinasikeun ka patugas loket supados berkas Bapa janten prioritas dina 2 menit ieu nya Pak.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Nyalahkeun Sistem & Henteu Sabar',
        text: 'Ngaranna ge nuju seueur jalmi atuh Pak, kedah sabar ulah ambek-ambekan ka abdi, sistemna anu lami sanes abdi.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_tengah: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Jawa): Pangapunten Tulus & Kepastian 2 Menit',
        text: 'Pak Hendra, kulo nyuwun agunging pangaksami awit antrean menika radi dangu. Kulo mangertos sanget wekdalipun Bapak wigatos sanget. Kulo enggal koordinasekaken kaliyan petugas loket supados berkasipun Bapak dipun riyiyinaken salebeting 2 menit menika nggih Pak.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Mbela Diri & Nyalahaken Sistem',
        text: 'Nggih pancen nembe rame sanget Pak, mbok sabar sampun duko kalih kulo, sisteme ingkang lambat sanes kulo.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Suroboyo): Sepuro Sing Akeh & Kepastian 2 Menit',
        text: 'Pak Hendra, aku njaluk sepuro sak akeh-akehe atas antrean sing molor iki. Aku paham tenan waktune Sampean aji banget onok urusan penting. Tak langsung koordinasino karo petugas loket yo Pak ben berkase Sampean diprioritasno njero 2 menit iki.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Nyalahno Sistem & Emosi',
        text: 'Yo pancen rame se Pak, sabaro rek ojok nesu-nesu nang aku, sisteme sing lelet dudu aku.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  medan: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Medan): Maaf Tulus & Kepastian 2 Menit',
        text: 'Pak Hendra, minta maaf kali saya atas antrean yang lama ini ya Pak. Kami tahu kali waktu Bapak berharga dan ada urusan mendesak. Segera kukoordinasikan ke petugas loket biar berkas Bapak diprioritaskan siap dalam 2 menit ini ya Pak.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Ngotot & Salahkan Sistem',
        text: 'Namanya pun ramai kali Pak, sabarlah jangan marah-marah samaku, sistemnya yang lambat bukan aku.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  minang: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Minang): Mamintak Maaf & Kapastian 2 Minik',
        text: 'Pak Hendra, ambo mamintak maaf sabana-bana ateh antrean nan lambek ko Pak. Ambo paham bana wakatu Bapak sangaik bahargo. Langsuang ambo koordinasikan jo patugas loket supayo berkas Bapak diprioritaskan salasai dalam 2 minik ko yo Pak.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Manyalahan Sistem',
        text: 'Namo se sadang rami Pak, sabarlah usah mangamuk ka ambo, sistemnyo nan lambek indak ambo doh.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  bali: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Bali): Nunas Ampura & Kapastian 2 Menit',
        text: 'Pak Hendra, titiang nunas gung sinampura antuk antrean puniki sane suwe. Titiang uning pisan galah Bapak mabuat pisan. Titiang gelis koordinasiang sareng petugas loket mangda berkas Bapak kapiara utami ring 2 menit puniki nggih Pak.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Defensif',
        text: 'Kenten mula nuju rame Pak, sabar mangda nenten pedih ring tiang, sisteme sane lambat nenten tiang.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  makassar: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Makassar): Minta Maaf & Kepastian 2 Menit',
        text: "Pak Hendra, minta maaf ka' sebesar-besarnya atas lamanya antrean ini Pak. Kupaham sekali waktunya Bapak berharga sekali. Langsung kukoordinasikan ke petugas loket supaya berkasnya Bapak diprioritaskan dalam 2 menit ini nah Pak.",
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Marah Balik',
        text: 'Namanya juga lagi ramai Pak, sabarki jangan marah-marah ke saya, sistemnya yang lambat bukan saya.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  manado: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Manado): Minta Maaf Tulus & Prioritas 2 Menit',
        text: 'Pak Hendra, kita minta maaf skali kwa\' atas antrean pe lama ini. Kitorang mangarti skali Bapak pe waktu penting ada urusan. Kita langsung kase koordinasi deng petugas loket supaya Bapak pe berkas prioritas kelar dalam 2 menit ini neh Pak.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Kase Salah Sistem',
        text: 'Namanya lagi rame skali Pak, sabar jo jang mara-mara pa kita, sistem pe lelet bukang kita.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Papua/Timur): Minta Maaf & Kepastian 2 Menit',
        text: 'Pak Hendra, sa minta maaf banyak-banyak e antrean lambat begini. Tong mengerti Bapak pu waktu sangat berharga ada urusan mendesak. Sa langsung koordinasi ke petugas loket biar Bapak pu berkas diprioritaskan dalam 2 menit ini ya Pak.',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Marah Balik ke Tamu',
        text: 'Lagi ramai sekali Pak, sabar jangan marah-marah ke sa, sistem yang lelet bukan sa pu salah.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
});

// 5. scen_jobseeker_retail_communication (Penjualan Ritel & Kasir)
defineScenarioResponses('scen_jobseeker_retail_communication', {
  jabodetabek: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh: Edukasi Opsi Obyektif & Transaksi Kasir Santun',
        text: 'Halo Mbak Cindy! Mari saya bantu jelaskan. Untuk opsi pertama lebih hemat anggaran, sedangkan opsi kedua bahannya primisima premium dan lebih awet untuk pemakaian harian. Total belanjaannya Rp85.000, pembayaran bisa tunai atau scan QRIS di sebelah sini ya Mbak. Terima kasih banyak!',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Pasif Tanpa Edukasi Produk',
        text: 'Terserah Mbak aja sih mau pilih yang mana, dua-duanya sama aja laku kok.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  sunda: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Sunda): Edukasi Bahan Primisima & Kasir QRIS',
        text: 'Wilujeng siang Mbak Cindy! Hayu abdi bantosan ngajelaskeun. Kanggo pilihan kahiji langkung hemat artos, sedengkeun pilihan kadua bahanna katun primisima premium langkung awet kanggo sadidinten. Sadayana Rp85.000, mayarna tiasa kontan atanapi scan QRIS palih dieu nya Mbak. Hatur nuhun pisan!',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Pasif Teu Aya Edukasi',
        text: 'Kumaha Mbak weh atuh palay milih nu mana, duanana oge sami wae payu.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_tengah: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Jawa): Edukasi Kualitas Primisima & QRIS',
        text: 'Sugeng siang Mbak Cindy! Mangga kulo bantu jelasaken. Pilihan kaping setunggal langkung hemat, ananging pilihan kaping kalih ngginakaken bahan primisima premium ingkang langkung awet kagem padintenan. Sedantenipun Rp85.000, saged awis tunai menapa scan QRIS mriki nggih Mbak. Matur nuwun sanget!',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Pasif Tanpa Edukasi',
        text: 'Kersane Mbak kemawon badhe milih ingkang pundi, sedanten sami mawon pajengipun.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Suroboyo): Edukasi Mutu Primisima & QRIS',
        text: 'Halo Mbak Cindy! Ayo tak bantu jelaske. Pilihan nomer siji pancen luwih murah, tapi pilihan nomer loro bahane primisima premium luwih awet digawe bendino. Totale belonjoan Rp85.000, iso cash opo scan QRIS sebelah kene yo Mbak. Suwun akeh!',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Pasif',
        text: 'Terserah Sampean ae se Mbak gelem sing endi, podo ae payune kabeh kok.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  medan: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Medan): Penjelasan Bahan & Transaksi Kasir',
        text: 'Halo Kak Cindy! Biar kujelaskan dulu ya Kak. Opsi pertama memang lebih murah, tapi opsi kedua bahannya primisima premium lebih tahan banting dipakai harian. Totalnya Rp85.000 ya Kak, bisa cash atau scan QRIS di sini. Makasih banyak ya Kak!',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Pasif Acuh',
        text: 'Terserah Kakaklah mau pilih yang mana, sama-sama laku nya dua-dua itu.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  minang: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Minang): Edukasi Mutu Bahan & Kasir QRIS',
        text: 'Salamaik siang Uni Cindy! Mari ambo jalehan. Opsi partamo labiah hemat pitih, sadangkan opsi kaduo bahannyo primisima premium rancak awet dipagunoan tiok hari. Sadonyo Rp85.000, bisa kontan atau scan QRIS disiko yo Ni. Tarimo kasih banyak!',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Pasif',
        text: 'Taraso Uni se lah nio piliah nan ma, samo-samo laku kaduonyo nyo.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  bali: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Bali): Edukasi Bahan Primisima & QRIS',
        text: 'Om Swastyastu Mbak Cindy! Durus titiang jelasang. Pilihan kapertama langkung hemat, sane kaping kalih bahannyane primisima premium pinih kuat lan awet kagem sarahina. Makasami Rp85.000, dados tunai napi scan QRIS iriki nggih Mbak. Suksema pisan!',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Pasif',
        text: 'Kersan Mbak kemanten jagi pilih sane napi, sareng kalih sami payu.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  makassar: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Makassar): Edukasi Bahan & Transaksi Kasir',
        text: "Halo Mbak Cindy! Mari kujelaskanki'. Pilihan pertama memang lebih hemat, tapi pilihan kedua bahannya primisima premium lebih awet dipakai tiap hari. Totalnya Rp85.000 ji, bisa tunai atau scan QRIS di sebelah sini nah Mbak. Terima kasih banyak!",
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Pasif',
        text: 'Terserahkaji Mbak mau pilih yang mana, sama-sama lakuji dua-duanya.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  manado: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Manado): Edukasi Kualitas Bahan & QRIS',
        text: 'Halo Mbak Cindy! Mari kita kase jelas akang. Opsi pertama lebe hemat, mar opsi kadua depe bahan primisima premium lebe tahan lama pake hari-hari. Samua Rp85.000, boleh cash ato scan QRIS di sabalah sini neh Mbak. Makase banya!',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Pasif',
        text: 'Tarsarah pa Mbak jo mo pilih mana, sama-sama laku kwa\' dua-dua.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Papua/Timur): Edukasi Bahan Awet & QRIS',
        text: 'Halo Mbak Cindy! Mari sa jelaskan e. Opsi pertama memang lebih murah, tapi opsi kedua bahannya primisima premium tahan lama untuk pakai tiap hari. Total belanjaan Rp85.000, bisa uang tunai atau scan QRIS di sebelah sini ya Mbak. Terima kasih banyak!',
        category: 'ideal',
        color: 'teal',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Pasif Lepas Tangan',
        text: 'Terserah Mbak saja mau ambil yang mana, dua-dua barang laku juga.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
});

// 6. scen_ratio_02 (Rasio Formula Barista)
defineScenarioResponses('scen_ratio_02', {
  jabodetabek: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh: Rasio 36g : 150ml : 120g & Higienitas',
        text: 'Halo Mas Dimas! Siap, ini kami racikkan double shot espresso pas 36 gram ekstraksi, susu dingin 150ml, dan es batunya kami takar pas 120 gram di meja seduh yang steril. Dijamin rasa kopinya mantap!',
        category: 'ideal',
        color: 'amber',
      },
    ],
  },
  sunda: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Sunda): Formula 36g : 150ml : 120g & Meja Seduh Bersih',
        text: 'Wilujeng siang Kang Dimas! Siap, ieu diracikkeun double shot espresso pas 36 gram ekstraksi, susu tiis 150ml, sareng es batu 120 gram dina meja seduh anu steril beresih. Dijamin raos kopina mantep pisan!',
        category: 'ideal',
        color: 'amber',
      },
    ],
  },
  jawa_tengah: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Jawa): Takaran Pas 36g : 150ml : 120g & Resik',
        text: 'Sugeng siang Mas Dimas! Sendika dawuh, menika kulo racikaken double shot espresso pas 36 gram ekstraksi, susu asrep 150ml, lan es batu 120 gram wonten meja seduh ingkang resik kalis saking kuman. Dipun jamin mantep sanget!',
        category: 'ideal',
        color: 'amber',
      },
    ],
  },
  jawa_timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Suroboyo): Takaran Pas Mantep 36g : 150ml : 120g',
        text: 'Halo Cak Dimas! Siap rek, iki tak racikno double shot espresso pas 36 gram ekstraksi, susu adem 150ml, karo es batu ditakar pas 120 gram nang meja seduh resik. Dijamin rasane mantep pol!',
        category: 'ideal',
        color: 'amber',
      },
    ],
  },
  medan: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Medan): Formula Pas 36g : 150ml : 120g Bersih',
        text: 'Beres Bang Dimas! Langsung kuracikkan double shot espresso pas 36 gram ekstraksi, susu dingin 150ml, dan es batu pas 120 gram di meja seduh steril. Paten kali rasa kopinya ini!',
        category: 'ideal',
        color: 'amber',
      },
    ],
  },
  minang: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Minang): Takaran 36g : 150ml : 120g Barasiah',
        text: 'Salamaik siang Da Dimas! Siap, iko kami raciakkan double shot espresso pas 36 gram ekstraksi, susu dingin 150ml, jo es batu ditakar pas 120 gram di meja seduh barasiah. Rasonyo lamak bana!',
        category: 'ideal',
        color: 'amber',
      },
    ],
  },
  bali: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Bali): Formula 36g : 150ml : 120g Resik',
        text: 'Om Swastyastu Bli Dimas! Inggih, niki katurang double shot espresso pas 36 gram ekstraksi, susu dingin 150ml, lan es batu 120 gram ring meja seduh sane suci resik. Rasannyane pinih becik!',
        category: 'ideal',
        color: 'amber',
      },
    ],
  },
  makassar: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Makassar): Takaran Pas 36g : 150ml : 120g',
        text: "Tabe' Daeng Dimas! Siap, kuracikkanki' double shot espresso pas 36 gram ekstraksi, susu dingin 150ml, sama es batu pas 120 gram di meja seduh steril. Dijamin mantap sekali rasa kopinya!",
        category: 'ideal',
        color: 'amber',
      },
    ],
  },
  manado: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Manado): Formula Pas 36g : 150ml : 120g',
        text: 'Tabea Kaka Dimas! Siap, ini kitorang beking double shot espresso pas 36 gram ekstraksi, susu dingin 150ml, deng es batu 120 gram di meja seduh barisi steril. Depe rasa kopi sadap skali!',
        category: 'ideal',
        color: 'amber',
      },
    ],
  },
  timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Papua/Timur): Formula Mantap 36g : 150ml : 120g',
        text: 'Halo Pace Dimas! Siap kaka, ini sa racikkan double shot espresso pas 36 gram ekstraksi, susu dingin 150ml, deng es batu 120 gram di meja seduh bersih steril. Dijamin kopi pu rasa mantap sekali kaka!',
        category: 'ideal',
        color: 'amber',
      },
    ],
  },
});

// 7. scen_sales_automotive_dealer (Dealer Motor DP & Cicilan)
defineScenarioResponses('scen_sales_automotive_dealer', {
  jabodetabek: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh: Simulasi Hemat Bunga & Bebas Biaya',
        text: 'Selamat siang Pak Joko, mari silakan duduk. DP 3,5 juta ini karena promo bunga 0% Pak. Kalau dihitung 3 tahun, Bapak justru hemat 4,2 juta dibanding dealer lain, dan cicilannya cuma 900 ribu per bulan. Kami bantu urus berkas KTP sampai tuntas tanpa biaya tambahan.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Menjelekkan Kompetitor',
        text: 'Di dealer sebelah mah bunganya mahal Pak, mending di sini aja jangan percaya toko sebelah.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  sunda: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Sunda): Simulasi Hemat Bunga & Gratis Biaya',
        text: 'Wilujeng siang Pak Joko, mangga calik heula. DP 3,5 juta ieu kenging promo bunga 0% Pak. Pami dietang 3 taun, Bapa langkung hemat 4,2 juta dibandingkeun dealer sanes, cicilanna mung 900 rebu sabulan. Berkas KTP dibantos dugi ka rengse haratis tanpa biaya tambihan.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Ngagogoreng Toko Batur',
        text: 'Di dealer gigireun mah bungana awis pisan Pak, mending didieu wae ulah percanten ka toko batur.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_tengah: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Jawa): Simulasi Bunga 0% & Pengurusan Berkas',
        text: 'Sugeng siang Pak Joko, mangga pinarak lenggah rumiyin. DP 3,5 yuta menika pikantuk promo bunga 0% Pak. Menawi dipun petang 3 warsa, Bapak langkung hemat 4,2 yuta katimbang dealer sanes, angsuranipun namung 900 ewu saben wulan. Berkas KTP kulo biyantu ngantos tuntas tanpa beaya tambahan.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Ngenyek Dealer Liyane',
        text: 'Wonten dealer sisih niku bungane awis sanget Pak, sae wonten mriki mawon ampun pitados toko sebelah.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Suroboyo): Simulasi Bunga 0% & Hemat 4.2 Juta',
        text: 'Selamat siang Pak Joko, ayo lungguh kene dhisik. DP 3,5 juta iki amarga oleh promo bunga 0% Pak. Lek dietung 3 taun, Sampean luwih irit 4,2 juta dibanding dealer liyane, cicilanne mung 900 ewu sak wulan. Berkas KTP tak bantu ngurus sampek beres gak onok biaya tambahan.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Menjelekkan Kompetitor',
        text: 'Nang dealer sebelah bungane larang rek Pak, mending nang kene ae ojo percoyo toko sebelah.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  medan: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Medan): Hitungan Hemat Bunga & Bebas Ribet',
        text: 'Selamat siang Pak Joko, silakan duduk Pak. DP 3,5 juta ini dapat promo bunga 0% ya Pak. Kalau dihitung 3 tahun, Bapak hemat 4,2 juta dibanding showroom lain, cicilannya cuma 900 ribu sebulan. Berkas KTP kami yang urus sampai beres tanpa uang pelicin.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Menjelekkan Toko Sebelah',
        text: 'Di dealer sebelah mencekik kali bunganya Pak, jangan percaya cakap mereka, di sinilah yang paten.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  minang: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Minang): Simulasi Bunga 0% & Irit 4.2 Juta',
        text: 'Salamaik siang Pak Joko, silakan duduak Pak. DP 3,5 juta ko dapek promo bungo 0% Pak. Kalau diituang 3 tahun, Bapak justru hemat 4,2 juta dibanding dealer lain, cicilannyo cuma 900 ribu sabulan. Berkas KTP kami bantu uruih sampai salasai indak ado biaya tambahan.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Manyalahan Kompetitor',
        text: 'Di dealer subarang maha bana bungonyo Pak, rancak disiko se usah picayo urang subarang.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  bali: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Bali): Simulasi Bunga 0% & Garansi Berkas',
        text: 'Om Swastyastu Pak Joko, durus malinggih rumiyin. DP 3,5 yuta puniki polih promo bunga 0% Pak. Yening kabilang 3 warsa, Bapak ngirit 4,2 yuta dibanding dealer tiosan, cicilannyane wantah 900 tali saben sasih. Berkas KTP titiang bantu kantos puput nenten wenten prabea tambahan.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Nenten Becik',
        text: 'Ring dealer sebelah bungane mael pisan Pak, becikan iriki manten sampunang percaya ring toko sebelah.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  makassar: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Makassar): Simulasi Bunga 0% & Hemat Cicilan',
        text: "Tabe' Pak Joko, silakan dudukki' dulu. DP 3,5 juta ini karena dapat promo bunga 0% Pak. Kalau dihitung 3 tahun, hematki' 4,2 juta dibanding dealer lain, cicilannya cuma 900 ribu per bulan ji. Berkas KTP kubantu uruski' sampai tuntas tanpa biaya tambahan.",
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Jelekkan Toko Sebelah',
        text: 'Di dealer sebelah mahal sekali bunganya Pak, di sini maki saja jangan percaya toko sebelah.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  manado: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Manado): Simulasi Bunga 0% & Hemat 4.2 Juta',
        text: 'Tabea Pak Joko, mari jo silakan dudu dulu. DP 3,5 juta ini kitorang kase promo bunga 0% Pak. Kalo reken 3 taon, Bapak lebe hemat 4,2 juta banding dealer sabalah, cicilan cuma 900 ribu per bulan. Berkas KTP kitorang bantu urus sampe klar tanpa biaya tambahan.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Menjelekkan Toko Sabalah',
        text: 'Di dealer sabalah depe bunga mahal skali Pak, lebe bae di sini jo jang percaya toko sabalah.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Papua/Timur): Simulasi Bunga 0% & Hemat 4.2 Juta',
        text: 'Selamat siang Pak Joko, mari silakan duduk kawan. DP 3,5 juta ini karena promo bunga 0% Pak. Kalau hitung 3 tahun, Bapak hemat 4,2 juta dibanding dealer sebelah, cicilan cuma 900 ribu per bulan saja. Berkas KTP kitorang bantu urus sampai selesai tra ada biaya tambahan.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Jelekkan Dealer Sebelah',
        text: 'Di dealer sebelah itu bunganya mahal sekali Pak, mending di sini saja jangan percaya toko sebelah.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
});

// 8. scen_automotive_ev_technical (Showroom EV Proteksi IP67)
defineScenarioResponses('scen_automotive_ev_technical', {
  jabodetabek: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh: Sertifikasi IP67, Cut-off 0.02s & Garansi 8 Th',
        text: 'Selamat pagi Pak Bambang! Baterai dan motor EV kami tersertifikasi proteksi IP67 sehingga aman melintasi genangan hingga 30 cm. Sensor keselamatan otomatis memutus arus baterai dalam 0,02 detik jika terdeteksi anomali. Garansi baterai kami 8 tahun atau 160.000 km, dan paket pembelian sudah termasuk home charging 7 kW beserta pemasangan instalasi PLN gratis di rumah Bapak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Jawaban Dangkal Tanpa Edukasi Teknis',
        text: 'Aman kok Pak mobil listrik zaman sekarang, tinggal gas aja nggak usah takut banjir.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  sunda: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Sunda): Sertifikasi IP67, Cut-off 0.02s & Garansi 8 Taun',
        text: 'Wilujeng enjing Pak Bambang! Batré sareng motor EV parantos kenging sertifikasi proteksi IP67 janten aman pisan ngalangkungan caah dugi ka 30 cm. Sensor kasalametan otomatis megatkeun aliran listrik dina 0,02 detik pami aya anomali. Garansi batré 8 taun, sareng parantos kalebet home charging 7 kW katut pamasangan instalasi PLN haratis di bumi Bapa.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Jawaban Dangkal',
        text: 'Aman atuh Pak mobil listrik ayeuna mah, kantun gas weh ulah sieun caah.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_tengah: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Jawa): Sertifikasi IP67, Cut-off 0.02s & Garansi 8 Warsa',
        text: 'Sugeng enjang Pak Bambang! Baterei kaliyan motor EV kito sampun kasertifikasi proteksi IP67 dadosipun aman sanget nglangkungi toya ngantos 30 cm. Sensor kaslametan otomatis medotaken arus 0,02 detik menawi wonten anomali. Garansi baterei 8 warsa, ugi sampun kalebet pasang home charging 7 kW gratis wonten dalemipun Bapak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Wangsulan Dangkal',
        text: 'Aman kok Pak mobil listrik jaman sakniki, mangga dipun gas kemawon ampun ajrih banjir.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Suroboyo): Sertifikasi IP67, Cut-off 0.02s & Garansi 8 Taun',
        text: 'Selamat isuk Pak Bambang! Batere karo motor EV kene wes tersertifikasi proteksi IP67 dadi aman ngliwati genangan sampek 30 cm. Sensore otomatis medot arus sakjroning 0,02 detik lek onok anomali. Garansi batere 8 taun, wes termasuk home charging 7 kW gratis pasang nang omah Sampean.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Jawaban Dangkal',
        text: 'Aman kok Pak mobil listrik jaman saiki, garek gas ae gak usah wedi banjir.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  medan: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Medan): Sertifikasi IP67, Cut-off 0.02s & Garansi 8 Th',
        text: 'Selamat pagi Pak Bambang! Baterai dan motor EV kami tersertifikasi proteksi IP67 jadi aman kali terobos banjir sampai 30 cm. Sensor keselamatan otomatis putus arus dalam 0,02 detik kalau ada anomali. Garansi baterai 8 tahun, dan paket sudah termasuk home charging 7 kW gratis pasang di rumah Bapak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Jawaban Dangkal',
        text: 'Aman itu Pak mobil listrik zaman sekarang, gas sajalah tak usah takut banjir.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  minang: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Minang): Sertifikasi IP67, Cut-off 0.02s & Garansi 8 Tahun',
        text: 'Salamaik pagi Pak Bambang! Baterai jo motor EV kami lah tasertifikasi proteksi IP67 sahinggo aman malinteh genangan sampai 30 cm. Sensor kasalamatan otomatis mamutuih arus dalam 0,02 datiak jikok ado anomali. Garansi baterai 8 tahun, sarato paket alah tamasuak home charging 7 kW gratis di rumah Bapak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Jawaban Dangkal',
        text: 'Aman tu Pak oto listrik zaman kini, tingga gas se indak usah takuik banjir.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  bali: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Bali): Sertifikasi IP67, Cut-off 0.02s & Garansi 8 Warsa',
        text: 'Om Swastyastu Pak Bambang! Baterei lan motor EV titiang sampun kasertifikasi proteksi IP67 dados aman nglangkungi toya ngantos 30 cm. Sensor kaslametan otomatis megat arus baterei 0,02 detik yening wenten anomali. Garansi baterei 8 warsa, lan sampun polih pasang home charging 7 kW gratis ring jeron Bapak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Jawaban Dangkal',
        text: 'Aman kemanten Pak mobil listrik jaman mangkin, durus gas manten sampunang takut banjir.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  makassar: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Makassar): Sertifikasi IP67, Cut-off 0.02s & Garansi 8 Th',
        text: "Tabe' Pak Bambang! Baterai dan motor EV kami tersertifikasi proteksi IP67 jadi aman sekali lewati genangan air sampai 30 cm. Sensor keselamatan otomatis putus arus 0,02 detik kalau ada anomali. Garansi baterai 8 tahun, dan paket sudah termasuk pasang home charging 7 kW gratis di rumah Bapak.",
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Jawaban Dangkal',
        text: 'Amanji itu Pak mobil listrik zaman sekarang, tinggal gas maki tidak usah takut banjir.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  manado: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Manado): Sertifikasi IP67, Cut-off 0.02s & Garansi 8 Taon',
        text: 'Tabea Pak Bambang! Baterai deng motor EV kitorang so sertifikasi proteksi IP67 jadi aman skali lewat genangan sampe 30 cm. Sensor keselamatan otomatis putus arus 0,02 detik kalo ada anomali. Garansi baterai 8 taon, kong paket so dapa pasang home charging 7 kW gratis di rumah Pak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Jawaban Dangkal',
        text: 'Aman kwa\' Pak oto listrik jaman skarang, tinggal gas jo jang tako banjir.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Papua/Timur): Sertifikasi IP67, Cut-off 0.02s & Garansi 8 Th',
        text: 'Selamat pagi Pak Bambang! Baterai deng motor EV kitorang su sertifikasi proteksi IP67 jadi aman sekali lewati genangan air sampai 30 cm. Sensor keselamatan otomatis putus arus baterai dalam 0,02 detik kalau ada anomali. Garansi baterai 8 tahun, deng paket su dapat pasang home charging 7 kW gratis di rumah Bapak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Jawaban Dangkal',
        text: 'Aman itu Pak mobil listrik zaman sekarang, tinggal gas saja tra usah takut banjir.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
});

// 9. scen_automotive_aftersales_deescalation (Aftersales Unit & STNK Telat)
defineScenarioResponses('scen_automotive_aftersales_deescalation', {
  jabodetabek: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh: De-eskalasi L.A.S.T, Kepastian 7 Mnt & Kompensasi 20%',
        text: 'Pak Gunawan, saya memohon maaf sebesar-besarnya atas keterlambatan unit dan STNK ini. Saya sangat paham jadwal kerja Bapak sangat terganggu. Unit motor Bapak saat ini tahap akhir QC dan dikirim besok siang jam 12 dengan surat jalan resmi. Sebagai bentuk kompensasi tulus, kami berikan servis gratis 1 tahun dan voucher cuci motor gratis ya Pak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Emosional & Menyerang Pelanggan',
        text: 'Bapak sabar dong, antrean hari ini lagi banyak banget bukan cuma motor Bapak aja yang dikerjakan.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  sunda: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Sunda): Hapunten Tulus, Unit Enjing & Kompensasi 1 Taun',
        text: 'Pak Gunawan, abdi nyuhunkeun hapunten pisan kana katerlambatan unit sareng STNK ieu. Abdi paham pisan jadwal padamelan Bapa kaganggu. Unit motor Bapa ayeuna nuju tahap akhir QC sareng dikintun enjing siang tabuh 12 nganggo serat jalan resmi. Salaku kompensasi tulus, disayogikeun servis haratis 1 taun katut voucher cuci motor haratis nya Pak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Emosional & Nyentak',
        text: 'Bapa kedah sabar atuh, antrean dinten ieu seueur pisan sanes mung motor Bapa hungkul anu digarap.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_tengah: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Jawa): Pangapunten Tulus & Kompensasi Servis 1 Warsa',
        text: 'Pak Gunawan, kulo nyuwun agunging samodra pangaksami awit keterlambatan unit lan STNK menika. Kulo mangertos sanget jadwal pedamelan Bapak kaganggu. Unit motoripun Bapak sakmenika tahap pungkasan QC lan badhe dipun kintun mbenjang siang jam 12 ngginakaken serat jalan resmi. Minangka kompensasi, kito aturi servis gratis 1 warsa lan voucher wisuh motor gratis nggih Pak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Emosional',
        text: 'Bapak mbok sabar, antrean dinten menika kathah sanget sanes namung motoripun Bapak kemawon ingkang dipun garap.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Suroboyo): Sepuro Sing Akeh & Kirim Sesuk Awan Jam 12',
        text: 'Pak Gunawan, aku njaluk sepuro sak akeh-akehe atas telate unit karo STNK iki. Aku paham tenan jadwal kerjane Sampean keganggu. Motore Sampean saiki tahap pungkasan QC lan dikirim sesuk awan jam 12 gawe surat jalan resmi. Gawe kompensasi tulus, kene wenehi servis gratis 1 taun karo voucher cuci motor gratis yo Pak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Nyolot & Emosi',
        text: 'Sampean sabaro rek, antrean dino iki akeh temen dudu motore Sampean tok sing digarap.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  medan: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Medan): Maaf Tulus, Kirim Besok & Kompensasi 1 Thn',
        text: 'Pak Gunawan, minta maaf kali kami atas keterlambatan unit dan pelat STNK ini ya Pak. Paham kali kami jadwal kerja Bapak terganggu. Unit kereta Bapak sekarang tahap akhir QC dan kami kirim besok siang jam 12 pakai surat jalan resmi. Sebagai kompensasi tulus, kami kasih servis gratis 1 tahun sama voucher cuci gratis ya Pak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Marah Balik',
        text: 'Bapak sabarlah sikit, antrean hari ini ramai kali bukan cuma kereta Bapak aja yang dikerjakan.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  minang: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Minang): Mamintak Maaf & Kirim Bisuak Jam 12',
        text: 'Pak Gunawan, ambo mamintak maaf sabana-bana ateh katarlambatan unit jo STNK ko Pak. Ambo paham bana jadwal karajo Bapak taganggu. Unit motor Bapak kini tahap akhia QC dan dikirim bisuak siang jam 12 mamakai surek jalan rasmi. Sabagai kompensasi tulus, kami agiah servis gratis 1 tahun sarato voucher cuci motor gratis yo Pak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Emosional',
        text: 'Bapak sabarlah, antrean hari ko rami bana indak motor Bapak surang se nan dikarajokan.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  bali: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Bali): Nunas Ampura & Kompensasi Servis 1 Warsa',
        text: 'Pak Gunawan, titiang nunas gung sinampura antuk keterlambatan unit lan STNK puniki. Titiang uning pisan jadwal karya Bapak kaganggu. Unit motor Bapak mangkin tahap pinih untat QC lan pacang kakirim benjang siang jam 12 ngangge surat jalan resmi. Minangka kompensasi tulus, katurang servis gratis 1 warsa lan voucher cuci motor gratis nggih Pak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Emosional',
        text: 'Bapak durus sabar, antrean rahina mangkin akeh pisan nenten wantah motor Bapak kemanten sane kagarap.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  makassar: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Makassar): Minta Maaf & Kirim Besok Siang Jam 12',
        text: "Pak Gunawan, minta maaf ka' sebesar-besarnya atas keterlambatan unit sama STNK ini Pak. Kupaham sekali jadwal kerjata' terganggu. Unit motor Bapak sekarang tahap akhir QC dan kami kirim besok siang jam 12 pakai surat jalan resmi. Sebagai kompensasi tulus, kami berikan servis gratis 1 tahun sama voucher cuci motor gratis nah Pak.",
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Marah Balik',
        text: 'Bapak sabarki dong, antrean hari ini banyak sekali bukan cuma motorta saja yang dikerja.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  manado: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Manado): Minta Maaf Tulus & Servis Gratis 1 Taon',
        text: 'Pak Gunawan, kita minta maaf skali kwa\' atas keterlambatan ini unit deng STNK. Kitorang paham skali Bapak pe jadwal kerja taganggu. Unit motor Bapak ini ada tahap akhir QC kong kitorang kase kirim beso siang jam 12 pake surat jalan resmi. Sabagai kompensasi tulus, kitorang kase servis gratis 1 taon deng voucher cuci motor gratis neh Pak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Kase Tensi',
        text: 'Bapak sabar jo dang, antrean hari ini banyak skali bukang cuma Bapak pe motor yang kitorang beking.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Papua/Timur): Minta Maaf & Kirim Besok Siang Jam 12',
        text: 'Pak Gunawan, sa minta maaf banyak-banyak e atas unit deng STNK yang terlambat ini. Kitorang paham sekali Bapak pu jadwal kerja terganggu. Unit motor Bapak sekarang tahap akhir QC dan kitorang kirim besok siang jam 12 pakai surat jalan resmi. Sebagai kompensasi tulus, kitorang kasih servis gratis 1 tahun deng voucher cuci motor gratis ya Pak.',
        category: 'ideal',
        color: 'sky',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Marah Balik',
        text: 'Bapak sabar kah, antrean hari ini ramai sekali bukan cuma Bapak pu motor saja yang dikerjakan.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
});

// 10. scen_sales_property_kpr (Properti Cicilan KPR Subsidi)
defineScenarioResponses('scen_sales_property_kpr', {
  jabodetabek: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh: Transparansi Biaya Akad All-In & KPR Aman',
        text: 'Selamat siang Mbak Rini, tenang saja Mbak, cicilan 2,1 juta kami sudah all-in bebas biaya BPHTB, notaris, dan asuransi. Penghasilan 7 juta sangat aman masuk kriteria KPR bersubsidi kami, mari kami bantu simulasikan.',
        category: 'ideal',
        color: 'sky',
      },
    ],
  },
  sunda: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Sunda): Biaya Akad All-In Haratis BPHTB & Notaris',
        text: 'Wilujeng siang Mbak Rini, tenang wae Mbak, cicilan 2,1 juta kenging all-in haratis biaya BPHTB, notaris, sareng asuransi. Panghasilan 7 juta aman pisan lebet kriteria KPR subsidi, hayu dibantosan simulasikeun.',
        category: 'ideal',
        color: 'sky',
      },
    ],
  },
  jawa_tengah: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Jawa): Biaya Akad All-In Bebas BPHTB & Notaris',
        text: 'Sugeng siang Mbak Rini, tenang kemawon Mbak, angsuran 2,1 yuta menika sampun all-in bebas beaya BPHTB, notaris, lan asuransi. Penghasilan 7 yuta aman sanget mlebet kriteria KPR bersubsidi kito, mangga kulo biyantu simulasikaken.',
        category: 'ideal',
        color: 'sky',
      },
    ],
  },
  jawa_timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Suroboyo): Cicilan 2.1 Juta All-In Bebas Notaris',
        text: 'Selamat siang Mbak Rini, tenang ae Mbak, cicilan 2,1 juta iki wes all-in bebas biaya BPHTB, notaris, karo asuransi. Penghasilan 7 juta aman pol mlebu kriteria KPR bersubsidi kene, ayo tak bantu simulasikno.',
        category: 'ideal',
        color: 'sky',
      },
    ],
  },
  medan: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Medan): All-In Bebas BPHTB & Cicilan KPR Aman',
        text: 'Selamat siang Kak Rini, tenang saja Kak, cicilan 2,1 juta ini sudah all-in bebas biaya BPHTB, notaris, dan asuransi. Penghasilan 7 juta aman kali masuk kriteria KPR bersubsidi kami, mari kami bantu hitungkan ya Kak.',
        category: 'ideal',
        color: 'sky',
      },
    ],
  },
  minang: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Minang): Biaya All-In Bebas Notaris & KPR Aman',
        text: 'Salamaik siang Uni Rini, tanang se Uni, cicilan 2,1 juta ko lah all-in bebas biaya BPHTB, notaris, jo asuransi. Pangasilan 7 juta aman bana masuak kriteria KPR basubsidi kami, mari kami bantu simulasikan.',
        category: 'ideal',
        color: 'sky',
      },
    ],
  },
  bali: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Bali): Cicilan All-In Bebas Notaris & BPHTB',
        text: 'Om Swastyastu Mbak Rini, tenang kemanten Mbak, cicilan 2,1 yuta puniki sampun all-in bebas prabea BPHTB, notaris, lan asuransi. Penghasilan 7 yuta aman pisan ngranjing kriteria KPR bersubsidi, durus kulo biyantu simulasikang.',
        category: 'ideal',
        color: 'sky',
      },
    ],
  },
  makassar: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Makassar): All-In Bebas Notaris & KPR Subsidi Aman',
        text: "Tabe' Mbak Rini, tenangki' saja Mbak, cicilan 2,1 juta kami sudah all-in bebas biaya BPHTB, notaris, sama asuransi. Penghasilanta' 7 juta aman sekali masuk kriteria KPR subsidi kami, mari kubantuki' simulasikan.",
        category: 'ideal',
        color: 'sky',
      },
    ],
  },
  manado: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Manado): All-In Bebas BPHTB & Cicilan Aman',
        text: 'Tabea Mbak Rini, tenang jo Mbak, cicilan 2,1 juta ini so all-in bebas biaya BPHTB, notaris, deng asuransi. Gaji 7 juta aman skali maso kriteria KPR bersubsidi, mari kitorang bantu reken akang.',
        category: 'ideal',
        color: 'sky',
      },
    ],
  },
  timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Papua/Timur): All-In Bebas BPHTB & KPR Bersubsidi',
        text: 'Selamat siang Mbak Rini, tenang saja kawan, cicilan 2,1 juta ini su all-in bebas biaya BPHTB, notaris, deng asuransi. Penghasilan 7 juta aman sekali masuk kriteria KPR bersubsidi kitorang, mari sa bantu simulasikan e.',
        category: 'ideal',
        color: 'sky',
      },
    ],
  },
});

// 11. scen_sales_fashion_retail (Butik Busana Katun Primisima)
defineScenarioResponses('scen_sales_fashion_retail', {
  jabodetabek: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh: Edukasi Katun Primisima Adem & Promo Set',
        text: 'Selamat siang Ibu Ningsih, ukuran L kemeja batik ini ada Ibu. Bahannya dari katun primisima halus jadi adem dan menyerap keringat seharian. Jika Ibu ambil sekalian rok lilitnya, kami berikan diskon set promo keluarga sebesar 15% ya Bu.',
        category: 'ideal',
        color: 'purple',
      },
    ],
  },
  sunda: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Sunda): Katun Primisima Tiis & Promo Rok Lilit 15%',
        text: 'Wilujeng siang Ibu Ningsih, ukuran L kemeja batik ieu aya Bu. Bahanna tina katun primisima lemes janten tiis nyerep kesang sadidinten. Pami Ibu nyandak sakantenan sareng samping lilitna, dipaparin diskon set promo kulawargi 15% nya Bu.',
        category: 'ideal',
        color: 'purple',
      },
    ],
  },
  jawa_tengah: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Jawa): Katun Primisima Adem & Diskon Set 15%',
        text: 'Sugeng siang Ibu Ningsih, ukuran L kemeja batik menika wonten Bu. Bahanipun saking katun primisima alus sanget dados adem lan nyerep kringet sedinten natas. Menawi Ibu mundhut sekalian jarik lilitipun, kito aturi diskon set kulawarga 15% nggih Bu.',
        category: 'ideal',
        color: 'purple',
      },
    ],
  },
  jawa_timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Suroboyo): Katun Primisima Adem & Promo Set 15%',
        text: 'Selamat siang Bu Ningsih, ukuran L kemeja batik iki onok Bu. Bahane teko katun primisima alus dadi adem nyerep kringet sedino muput. Lek Sampean njupuk sekalian rok lilite, kene wenehi diskon set promo keluarga 15% yo Bu.',
        category: 'ideal',
        color: 'purple',
      },
    ],
  },
  medan: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Medan): Katun Primisima Dingin & Diskon Set 15%',
        text: 'Selamat siang Ibu Ningsih, ukuran L kemeja batik ini ada ya Bu. Bahannya dari katun primisima halus jadi dingin kali menyerap keringat seharian. Kalau Ibu ambil sekalian rok lilitnya, kami kasih diskon set keluarga 15% ya Bu.',
        category: 'ideal',
        color: 'purple',
      },
    ],
  },
  minang: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Minang): Katun Primisima Dingin & Diskon Set 15%',
        text: 'Salamaik siang Ibu Ningsih, ukuran L kemeja batik ko ado Bu. Bahannyo dari katun primisima haluih jadi dingin manyerap paluah saarian. Jikok Ibu ambiak sakalian rok liliknyo, kami agiah diskon set promo kaluarga 15% yo Bu.',
        category: 'ideal',
        color: 'purple',
      },
    ],
  },
  bali: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Bali): Katun Primisima Tis & Diskon Set 15%',
        text: 'Om Swastyastu Ibu Ningsih, ukuran L kemeja batik puniki wenten Bu. Bahannyane saking katun primisima alus dados tis ngisep peluh sarahina. Yening Ibu ngambil sekalian kamen lilitnyane, katurang diskon set kulawarga 15% nggih Bu.',
        category: 'ideal',
        color: 'purple',
      },
    ],
  },
  makassar: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Makassar): Katun Primisima Dingin & Promo Set 15%',
        text: "Tabe' Ibu Ningsih, ukuran L kemeja batik ini ada Bu. Bahannya dari katun primisima halus jadi dingin menyerap keringat seharian. Kalau Ibu ambilki sekalian rok lilitnya, kami berikanki diskon set keluarga 15% nah Bu.",
        category: 'ideal',
        color: 'purple',
      },
    ],
  },
  manado: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Manado): Katun Primisima Dingin & Diskon Set 15%',
        text: 'Tabea Ibu Ningsih, ukuran L kemeja batik ini ada Bu. Depe bahan katun primisima halus jadi dingin kase serap kringat satu hari. Kalo Ibu ambil deng depe rok lilit, kitorang kase diskon set keluarga 15% neh Bu.',
        category: 'ideal',
        color: 'purple',
      },
    ],
  },
  timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Papua/Timur): Katun Primisima Dingin & Diskon 15%',
        text: 'Selamat siang Ibu Ningsih, ukuran L kemeja batik ini ada Bu. Bahannya dari katun primisima halus jadi dingin menyerap keringat seharian. Kalau Ibu ambil sekalian rok lilitnya, kitorang kasih diskon set keluarga 15% e Bu.',
        category: 'ideal',
        color: 'purple',
      },
    ],
  },
});

// 12. scen_fashion_fabric_care_fitting (Butik Sutra Edukasi Sabun Lerak)
defineScenarioResponses('scen_fashion_fabric_care_fitting', {
  jabodetabek: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh: Fitting Room, Edukasi Lerak & Cross-Selling Syal',
        text: 'Halo Mbak Alika, gaun sutra tulis ini fitting room nomor 2 sudah kami sterilkan dan siap digunakan ya Mbak. Untuk perawatannya, kami sarankan dry clean atau cuci tangan memakai sabun lerak tanpa diperas, lalu dijemur di tempat teduh agar serat sutra dan motifnya awet. Jika berkenan, syal sutra warna sage ini sangat serasi dipadukan dengan gaun tersebut.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Menyarankan Mesin Cuci Biasa (Merusak Sutra)',
        text: 'Terserah mau dicuci gimana Mbak, dicampur mesin cuci biasa juga gapapa.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  sunda: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Sunda): Fitting Room, Sabun Lerak & Paduan Syal',
        text: 'Wilujeng siang Mbak Alika, gaun sutra tulis ieu fitting room nomer 2 parantos disterilkeun sayagi dianggo nya Mbak. Kanggo ngarawatna, disarankeun dry clean atanapi wasuh ku panangan nganggo sabun lerak teu kenging diperes, teras dipoe di tempat iuh supados serat sutra awet. Syal sutra warna sage ieu cocog pisan dipadukeun sareng gaun ieu.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Nyarankeun Mesin Cuci Biasa',
        text: 'Kumaha wae nyeuseuhna ge Mbak, dicampur mesin cuci biasa ge teu sawios.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_tengah: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Jawa): Fitting Room, Sabun Lerak & Syal Sutra',
        text: 'Sugeng siang Mbak Alika, busana sutra serat menika fitting room nomer 2 sampun resik steril sumadya dipun agem nggih Mbak. Kagem rawatanipun, kulo aturi dry clean menawi mboten wasuh asta ngginakaken sabun lerak ampun dipun peres, lajeng dipun pepe ing papan eyub supados serat sutranipun awet. Syal sutra sage menika cocog sanget dipun paduaken.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Mesin Cuci Biasa',
        text: 'Kersane badhe dipun kumbah kados pundi Mbak, dipun campur mesin cuci limrah ugi mboten napa-napa.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Suroboyo): Fitting Room, Sabun Lerak & Syal Sage',
        text: 'Halo Mbak Alika, gaun sutra iki fitting room nomer 2 wes disterilno siap dienggo yo Mbak. Gawe ngrumat, tak saranaken dry clean opo cuci tangan gawe sabun lerak gak usah diperes, trus dipepe nang panggonan eyup ben serat sutrane awet. Syal sutra werno sage iki serasi pol dipadukno karo gaune.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Mesin Cuci Biasa',
        text: 'Terserah ape dikumbah yaopo Mbak, dicampur mesin cuci biasa yo gak popo.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  medan: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Medan): Fitting Room, Sabun Lerak & Syal Sutra',
        text: 'Halo Kak Alika, gaun sutra tulis ini fitting room nomor 2 sudah steril siap dipakai ya Kak. Untuk perawatannya, kami sarankan dry clean atau cuci tangan pakai sabun lerak tanpa diperas, lalu dijemur di tempat teduh biar serat sutranya awet. Syal sutra warna sage ini serasi kali dipadukan sama gaun ini.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Campur Mesin Cuci',
        text: 'Terserahlah mau dicuci cemana Kak, campur mesin cuci biasa pun tak apa-apa.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  minang: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Minang): Fitting Room, Sabun Lerak & Syal Sage',
        text: 'Salamaik siang Uni Alika, gaun sutra tulis ko fitting room nomor 2 lah steril siap dipakai yo Ni. Untuak parawatannyo, kami sarankan dry clean atau basuah jo tangan mamakai sabun lerak indak diparah, lalu dijamua di tampek taduah supayo serat sutranyo awet. Syal sutra warna sage ko serasi bana jo gaun ko.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Campua Masin Cuci',
        text: 'Taraso Uni se nio mambasuah baa, dicampua masin cuci biaso se indak baa.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  bali: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Bali): Fitting Room, Sabun Lerak & Syal Sutra',
        text: 'Om Swastyastu Mbak Alika, gaun sutra puniki fitting room nomer 2 sampun steril siap kaanggen nggih Mbak. Kagem ngupapira, kulo aturi dry clean napi wasuh asta ngangge sabun lerak tan keni kaperes, kalanturang kaangeb ring genah eyub mangda serat sutranipun awet. Syal sutra sage puniki pinih anut.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Mesin Cuci Biasa',
        text: 'Terserah jagi kakumbah kadi napi Mbak, macampih ring mesin cuci biasa nenten napi.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  makassar: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Makassar): Fitting Room, Sabun Lerak & Syal Sage',
        text: "Halo Mbak Alika, gaun sutra tulis ini fitting room nomor 2 steril mi siap dipakai nah Mbak. Untuk perawatannya, kurencanakan ki dry clean atau cuci tangan pakai sabun lerak tanpa diperas, baru dijemur di tempat teduh supaya serat sutranya awet. Syal sutra warna sage ini serasi sekali dipadukan sama gaunnya.",
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Mesin Cuci Biasa',
        text: 'Terserahji mau dicuci bagaimana Mbak, dicampur mesin cuci biasa juga tidak apa-paji.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  manado: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Manado): Fitting Room, Sabun Lerak & Syal Sage',
        text: 'Halo Mbak Alika, gaun sutra tulis ini fitting room nomor 2 so steril siap pake neh Mbak. For depe rawat, kitorang sarankan dry clean ato cuci tangan pake sabun lerak jang kase pras, kong jemur di tampa badingin supaya serat sutra awet. Syal sutra warna sage ini maso skali deng ini gaun.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Kase Maso Mesin Cuci',
        text: 'Tarsarah mo cuci bagaimana Mbak, kase maso mesin cuci biasa le nimpa-apa.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Papua/Timur): Fitting Room, Sabun Lerak & Syal Sutra',
        text: 'Halo Mbak Alika, gaun sutra tulis ini fitting room nomor 2 su bersih steril siap pakai ya Mbak. Untuk rawat, kitorang sarankan dry clean atau cuci tangan pakai sabun lerak jangan peras, lalu jemur di tempat teduh biar serat sutra awet. Syal sutra warna sage ini serasi sekali dipadu dengan gaun e.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Salah: Campur Mesin Cuci',
        text: 'Terserah mau cuci bagaimana Mbak, campur mesin cuci biasa juga tra apa-apa.',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
});

// 13. scen_fashion_cashier_packaging (Kasir Butik Box Kado & Poin Loyalty)
defineScenarioResponses('scen_fashion_cashier_packaging', {
  jabodetabek: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh: Quality Check, Kertas Tisu Pelindung & Poin Loyalty',
        text: 'Selamat siang Ibu Maya! Mari saya periksa kancing dan jahitannya terlebih dahulu, semua rapi sempurna ya Bu. Totalnya Rp680.000, Ibu mendapatkan 68 poin loyalty member. Blus ini kami bungkus rapi dengan kertas tisu pelindung dan tas spunbond eksklusif ramah lingkungan. Pembayaran bisa scan QRIS atau kartu debit di sini ya Bu.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Transaksi Kering Tanpa Quality Check',
        text: 'Total 680 ribu Bu, mau bayar pakai apa?',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  sunda: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Sunda): Quality Check Kancing, Kertas Tisu & Poin Loyalty',
        text: 'Wilujeng siang Ibu Maya! Hayu diparios heula kancing sareng jahitanana, sadayana parantos rapih sampurna nya Bu. Sadayana Rp680.000, Ibu kenging 68 poin loyalty member. Blus ieu dibungkus nganggo kertas tisu pelindung sareng tas spunbond eksklusif ramah lingkungan. Mayarna tiasa scan QRIS atanapi kartu debit palih dieu nya Bu.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Transaksi Kering',
        text: 'Sadayana 680 rebu Bu, palay mayar nganggo naon?',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_tengah: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Jawa): Quality Check Jahitan, Kertas Tisu & Poin Member',
        text: 'Sugeng siang Ibu Maya! Mangga kulo priksa benik lan jahitanipun rumiyin, sedanten rapi sampurna nggih Bu. Sedantenipun Rp680.000, Ibu pikantuk 68 poin loyalty member. Blus menika kito bungkus rapi kertas tisu pelindung kaliyan tas spunbond eksklusif ramah lingkungan. Pembayaran saged scan QRIS menapa kartu debit wonten mriki nggih Bu.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Mboten Dipun Priksa',
        text: 'Sedanten 680 ewu Bu, badhe bayar ngangge napa?',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  jawa_timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Suroboyo): QC Jahitan, Kertas Tisu & Poin Member',
        text: 'Selamat siang Bu Maya! Ayo tak prikso kancing karo jahitane dhisik, kabeh rapi sampurna yo Bu. Totale Rp680.000, Ibu oleh 68 poin loyalty member. Blus iki dibungkus rapi gawe kertas tisu pelindung lan tas spunbond eksklusif ramah lingkungan. Bayare iso scan QRIS opo kartu debit sebelah kene yo Bu.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Transaksi Kering',
        text: 'Totale 680 ewu Bu, ape bayar gawe opo?',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  medan: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Medan): Quality Check, Kertas Tisu & Poin Member',
        text: 'Selamat siang Ibu Maya! Kuperiksa dulu kancing dan jahitannya ya Bu, rapi sempurna semua kutengok. Totalnya Rp680.000, Ibu dapat 68 poin loyalty member. Blus ini kami bungkus rapi pakai kertas tisu pelindung dan tas spunbond eksklusif ramah lingkungan. Bayarnya bisa scan QRIS atau kartu debit di sini ya Bu.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Kering Tanpa QC',
        text: 'Total 680 ribu Bu, mau bayar pakai apa?',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  minang: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Minang): QC Jahitan, Kertas Tisu & Poin Loyalty',
        text: 'Salamaik siang Ibu Maya! Mari ambo pariso kanciang jo jaitannyo dahulu, sadonyo lah rapi rancak bana Bu. Sadonyo Rp680.000, Ibu mandapek 68 poin loyalty member. Blus ko kami bungkuih rapi jo karateh tisu palinduang sarato tas spunbond eksklusif ramah lingkungan. Bayianyo bisa scan QRIS atau kartu debit disiko yo Bu.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Transaksi Kering',
        text: 'Sadonyo 680 ribu Bu, nio bayia jo apo?',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  bali: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Bali): QC Kancing, Kertas Tisu & Poin Member',
        text: 'Om Swastyastu Ibu Maya! Durus titiang priksa kancing lan jahitanipun rumiyin, makasami sampun rapi becik pisan Bu. Makasami Rp680.000, Ibu polih 68 poin loyalty member. Blus puniki kabungkus rapi kertas tisu pelindung lan tas spunbond eksklusif ramah lingkungan. Pembayaran dados scan QRIS napi kartu debit iriki nggih Bu.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Transaksi Kering',
        text: 'Makasami 680 tali rupiah Bu, jagi naur ngangge napi?',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  makassar: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Makassar): QC Jahitan, Kertas Tisu & Poin Member',
        text: "Tabe' Ibu Maya! Kuperiksa dulu kancing sama jahitannya nah Bu, semua rapi sempurna mi. Totalnya Rp680.000, dapatki 68 poin loyalty member. Blus ini kami bungkus rapi pakai kertas tisu pelindung sama tas spunbond eksklusif ramah lingkungan. Pembayaran bisa scan QRIS atau kartu debit di sebelah sini nah Bu.",
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Transaksi Kering',
        text: 'Total 680 ribu Bu, mau bayar pakai apa?',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  manado: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Manado): QC Kancing, Kertas Tisu & Poin Member',
        text: 'Tabea Ibu Maya! Mari jo kita periksa akang kancing deng jahitan dulu, samua rapi mantap neh Bu. Total Rp680.000, Ibu dapa 68 poin loyalty member. Ini blus kitorang bungkus rapi pake kertas tisu deng tas spunbond eksklusif ramah lingkungan. Boleh scan QRIS ato kartu debit di sabalah sini neh Bu.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Kering Tanpa QC',
        text: 'Total 680 ribu Bu, mo bayar pake apa?',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
  timur: {
    male: [
      {
        id: 'ideal',
        label: '💡 SOP Contoh (Papua/Timur): QC Jahitan Rapi, Kertas Tisu & Poin',
        text: 'Selamat siang Ibu Maya! Mari sa periksa kancing deng jahitan dulu ya Bu, semua rapi mantap sekali. Totalnya Rp680.000, Ibu dapat 68 poin loyalty member. Blus ini kitorang bungkus rapi pakai kertas tisu pelindung deng tas spunbond eksklusif ramah lingkungan. Bisa bayar scan QRIS atau kartu debit di sini ya Bu.',
        category: 'ideal',
        color: 'purple',
      },
      {
        id: 'flawed',
        label: '⚠️ Respons Kurang Ideal: Transaksi Kering',
        text: 'Total 680 ribu Bu, mau bayar pakai apa?',
        category: 'flawed',
        color: 'rose',
      },
    ],
  },
});

/**
 * Public accessor function to retrieve quick responses for any scenario in any dialect.
 * Also adapts worker honorifics (male vs female) automatically.
 */
export function getQuickResponses(
  scenarioId: string,
  dialect: IndonesianDialect = 'jabodetabek',
  workerIsFemale: boolean = false
): QuickResponseOption[] {
  const scenarioMatch = REGIONAL_QUICK_RESPONSES[scenarioId];
  if (!scenarioMatch) {
    return [];
  }

  const dialectMatch = scenarioMatch[dialect] || scenarioMatch['jabodetabek'];
  if (!dialectMatch) {
    return [];
  }

  const baseOptions = workerIsFemale ? dialectMatch.female : dialectMatch.male;

  // Apply final sanitation for dialect consistency and honorific matching
  return baseOptions.map((opt) => ({
    ...opt,
    text: sanitizeSpokenDialectText(opt.text, dialect, workerIsFemale),
  }));
}
