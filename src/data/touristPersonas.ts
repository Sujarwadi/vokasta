// Persona pelanggan mancanegara untuk latihan Bahasa Inggris (gerai di daerah wisata atau pelanggan ekspatriat).
// Konten ini adalah persona fiksi untuk simulasi. Aksen hanya diarahkan secara ringan ke model suara
// dan tidak dinilai pada peserta.

export interface TouristPersona {
  name: string;
  title: string;
  tag: string;
  line: string;
  isFemale: boolean;
  voice: string;
  initials: string;
  stylePrompt: string;
}

const T: Record<string, TouristPersona> = {
  scen_greeting_01: {
    name: 'Emma Clarke',
    title: 'Backpacker from Australia',
    tag: 'Tourist at a coffee counter • lactose intolerant, wants oat milk and less sugar',
    line: "Hi there! Quick question. Can I get the iced palm sugar coffee with oat milk instead? I'm lactose intolerant. And could you make it half as sweet, please?",
    isFemale: true,
    voice: 'Aoede',
    initials: 'EC',
    stylePrompt: 'Friendly, relaxed Australian-accented English, light and breezy, a little unsure about the local menu',
  },
  scen_complaint_03: {
    name: 'Daniel Foster',
    title: 'Tourist from the USA',
    tag: 'Anxious and upset • severe cow-milk allergy, thinks the drink contains regular milk',
    line: "Excuse me! Is this really oat milk? I told you I'm severely allergic to cow's milk! This tastes like regular milk! This is dangerous for me!",
    isFemale: false,
    voice: 'Charon',
    initials: 'DF',
    stylePrompt: 'Alarmed, emotional American-accented English, fast and tense, voice rising with worry',
  },
  scen_sales_automotive_dealer: {
    name: 'Liam Walsh',
    title: 'Irish expat living in Bali',
    tag: 'Showroom customer • hesitant about the down payment, compares with another dealer',
    line: "Hi, I like this scooter for getting around every day. But a 3.5 million down payment feels heavy. The dealer next door says they can do 1.5 million. I'm worried the monthly installments will wreck my budget.",
    isFemale: false,
    voice: 'Puck',
    initials: 'LW',
    stylePrompt: 'Warm, chatty Irish-accented English, hesitant and thinking out loud, a bit cautious about money',
  },
  scen_sales_property_kpr: {
    name: 'Sophie Martin',
    title: 'French resident married to a local',
    tag: 'First-home buyer • afraid of hidden signing fees and bank rejection',
    line: "My husband and I would love our own home instead of renting every year. But our combined income is only seven million rupiah a month. I'm afraid of hidden fees at signing, and of the bank rejecting our application.",
    isFemale: true,
    voice: 'Kore',
    initials: 'SM',
    stylePrompt: 'Soft, earnest French-accented English, careful and worried but hopeful',
  },
  scen_sales_fashion_retail: {
    name: 'Hannah Becker',
    title: 'Tourist from Germany',
    tag: 'Batik shop visitor • shopping for family event, price-sensitive, asks for a discount',
    line: "Excuse me, does this batik shirt on the mannequin come in size L for my husband? I'm worried the fabric will be too hot in the afternoon. And can you give me a discount if I take the skirt as well?",
    isFemale: true,
    voice: 'Leda',
    initials: 'HB',
    stylePrompt: 'Direct, polite German-accented English, practical and a little bargain-minded',
  },
  scen_automotive_ev_technical: {
    name: 'Raj Mehta',
    title: 'Indian-British engineer working in Indonesia',
    tag: 'Showroom visitor • doubts electric bikes: flooding, battery replacement cost, running out of charge',
    line: "I'm interested in this electric scooter for my commute, but honestly I'm doubtful. What happens in the rainy season if I ride through flood water, could it short-circuit? And I heard replacing the battery costs almost as much as a new bike.",
    isFemale: false,
    voice: 'Fenrir',
    initials: 'RM',
    stylePrompt: 'Curious, analytical Indian-British accented English, asks pointed questions, skeptical but fair',
  },
  scen_automotive_aftersales_deescalation: {
    name: 'Mark Johansson',
    title: 'Swedish expat',
    tag: 'Angry customer • electric scooter delivery is 3 days late and registration papers are unclear',
    line: "I want someone to take responsibility! Your salesperson told me last week my electric scooter would arrive by yesterday at the latest. It's three days late, and the plate number and registration papers are unclear too. What kind of service is this?!",
    isFemale: false,
    voice: 'Orus',
    initials: 'MJ',
    stylePrompt: 'Controlled but clearly angry Swedish-accented English, clipped sentences, demanding answers',
  },
  scen_fashion_fabric_care_fitting: {
    name: 'Isabelle Moreau',
    title: 'Tourist from France',
    tag: 'Boutique visitor • worried silk batik will fade or shrink, wants exchange option if size is tight',
    line: "Excuse me, this silk batik dress is beautiful, but I'm afraid the colors will bleed or the fabric will shrink if I wash it at home. And if this size M is too tight when I walk around, can I exchange it?",
    isFemale: true,
    voice: 'Callirrhoe',
    initials: 'IM',
    stylePrompt: 'Elegant, soft French-accented English, appreciative but careful',
  },
  scen_jobseeker_complaint_deescalation: {
    name: 'James Whitfield',
    title: 'Tourist from the UK',
    tag: 'Frustrated customer • waited over 20 minutes beyond the estimate, has an urgent appointment next',
    line: "Excuse me! I've been waiting more than twenty minutes and nobody has called me. Your colleague said five to ten minutes at most. I have an urgent appointment after this. What can you do?!",
    isFemale: false,
    voice: 'Charon',
    initials: 'JW',
    stylePrompt: 'Impatient but polite British-accented English, dry and firm, sighing between sentences',
  },
  scen_jobseeker_retail_communication: {
    name: 'Yuna Park',
    title: 'Tourist from South Korea',
    tag: 'Shopper • cannot decide between two items, needs an objective comparison and a careful checkout',
    line: "Hi, sorry to bother you. I can't decide between these two items. One is cheaper but the material is different, and the other costs a little more. What is the difference, and which one will last longer for daily use?",
    isFemale: true,
    voice: 'Kore',
    initials: 'YP',
    stylePrompt: 'Polite, gentle Korean-accented English, slightly hesitant, speaks clearly and not too fast',
  },
  scen_jobseeker_hospitality_basic: {
    name: 'Olivia Hart',
    title: 'First-time visitor from Canada',
    tag: 'Lost visitor • looking for the information desk, needs a warm welcome and clear directions',
    line: "Excuse me, hello. Sorry to bother you, this is my first time here and I'm a bit lost. Could you point me to the information desk or the service counter?",
    isFemale: true,
    voice: 'Aoede',
    initials: 'OH',
    stylePrompt: 'Friendly, slightly confused Canadian-accented English, grateful and polite',
  },
};

const GENERIC: TouristPersona = {
  name: 'Alex Turner',
  title: 'Tourist from abroad',
  tag: 'Foreign visitor • needs friendly, clear help in English',
  line: "Hello! Sorry to bother you. Could you help me? I'd like to know how this works here.",
  isFemale: false,
  voice: 'Puck',
  initials: 'AT',
  stylePrompt: 'Friendly, natural English with a light international accent',
};

export function getTouristPersona(scenarioId: string): TouristPersona {
  return T[scenarioId] || GENERIC;
}
