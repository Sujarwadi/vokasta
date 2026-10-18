import { QuickResponseOption } from './quickResponses';

export const ENGLISH_QUICK_RESPONSES: Record<string, QuickResponseOption[]> = {
  // 1. scen_jobseeker_hospitality_basic
  scen_jobseeker_hospitality_basic: [
    {
      id: 'en_ideal_1',
      label: '💡 Sample SOP: Warm 3s Greeting, Eye Contact & Open Palm Directions',
      text: 'Good afternoon, welcome to our service lounge! My name is Alex. You are in the right place—the customer service counter is located straight ahead on your right, right next to the information display. May I walk with you or assist you with anything specific today?',
      category: 'ideal',
      color: 'teal',
    },
    {
      id: 'en_ideal_2',
      label: '💡 Concierge Option: Attentive Active Listening & Escort',
      text: 'Good afternoon, welcome! Don’t worry at all, let me assist you right away. The service desk is just around this corner. Please feel free to follow me, and I will introduce you to our specialist on duty.',
      category: 'ideal',
      color: 'sky',
    },
    {
      id: 'en_flawed',
      label: '⚠️ Flawed: Disengaged & Pointing Without Eye Contact',
      text: 'Yeah, service desk is over there somewhere down the hallway. You can go check the sign by yourself.',
      category: 'flawed',
      color: 'rose',
    },
  ],

  // 2. scen_jobseeker_complaint_deescalation
  scen_jobseeker_complaint_deescalation: [
    {
      id: 'en_ideal_1',
      label: '💡 Sample SOP: Sincere L.E.A.R Apology & Fast 3-Minute Resolution',
      text: 'Mr. Hendra, I sincerely apologize for the delay and for keeping you waiting past our initial estimate. Your time is extremely valuable, and I completely understand your urgency. Please allow me to personally fast-track your inquiry right now—I will have your complete documentation ready in under three minutes.',
      category: 'ideal',
      color: 'amber',
    },
    {
      id: 'en_ideal_2',
      label: '💡 De-escalation: Non-Defensive Ownership & Reassurance',
      text: 'I deeply apologize for this inconvenience, Mr. Hendra. You are completely right to expect timely service. I am taking direct personal responsibility for your queue ticket right this second, and I will ensure it is resolved before you head to your next meeting.',
      category: 'ideal',
      color: 'teal',
    },
    {
      id: 'en_flawed',
      label: '⚠️ Flawed: Defensive Blaming & Argumentative Tone',
      text: 'Sir, please calm down, there are lots of people ahead of you! The front desk staff gave you the wrong estimate, it is not my fault that our system is backed up today.',
      category: 'flawed',
      color: 'rose',
    },
  ],

  // 3. scen_jobseeker_retail_communication
  scen_jobseeker_retail_communication: [
    {
      id: 'en_ideal_1',
      label: '💡 Sample SOP: Consultative Value Comparison & 2-Handed Checkout',
      text: 'Hello! I would be delighted to help you choose. Option A is crafted from high-density canvas, which offers superior abrasion resistance for heavy daily commutes. Option B is slightly more flexible and lightweight for casual errands. Given your daily usage, Option A provides better long-term durability. Shall I prepare one at the counter for you?',
      category: 'ideal',
      color: 'teal',
    },
    {
      id: 'en_ideal_2',
      label: '💡 Discovery Option: Open Needs Clarification & Warranty Guidance',
      text: 'Both are wonderful items with full manufacturer warranty. May I ask what you will be carrying most frequently? If you carry a laptop and water bottle, Option A has reinforced stitching that will easily last you for years.',
      category: 'ideal',
      color: 'sky',
    },
    {
      id: 'en_flawed',
      label: '⚠️ Flawed: Indifferent Push Without Feature Explanation',
      text: 'Honestly they are pretty much the exact same thing, just grab whichever matches your budget.',
      category: 'flawed',
      color: 'rose',
    },
  ],

  // 4. scen_greeting_01 (Kopi Nusantara Barista - Oat milk customization & upselling)
  scen_greeting_01: [
    {
      id: 'en_ideal_1',
      label: '💡 Sample SOP: Brand Welcome, Dairy-Free Empathy & Croissant Bundle',
      text: 'Welcome to Kopi Nusantara, Ms. Sarah! Absolutely, we have 100% plant-based creamy oat milk that is completely safe for lactose sensitivities, and we can calibrate it to 50% less sweet for a smooth, roasted palm sugar balance. Would you like to pair it with our freshly warmed Almond Croissant for just $1.50 extra with our morning bundle?',
      category: 'ideal',
      color: 'amber',
    },
    {
      id: 'en_ideal_2',
      label: '💡 Customization Option: Allergen Care & QRIS Payment Guide',
      text: 'Good morning Ms. Sarah! We use dedicated sterilized oat milk pitchers to ensure zero dairy cross-contamination. That will be one Iced Oat Milk Palm Sugar Latte, 50% sweetness. Your total is $3.20, and you can scan your cashless QR code right here on the terminal.',
      category: 'ideal',
      color: 'teal',
    },
    {
      id: 'en_flawed',
      label: '⚠️ Flawed: Reluctant Recipe Customization',
      text: 'Oat milk costs extra and changing the sugar level ruins the original recipe. Are you sure you want to change it?',
      category: 'flawed',
      color: 'rose',
    },
  ],

  // 5. scen_ratio_02 (Kopi Nusantara Barista - Signature ratio & station hygiene)
  scen_ratio_02: [
    {
      id: 'en_ideal_1',
      label: '💡 Sample SOP: Station Sanitization, 36g:150ml:120g Ratio & Brand Handover',
      text: 'Right away, Dimas! First, let me sanitize our counter and verify the clean cup rim. For our Signature blend, I am extracting an exact 36-gram double espresso shot, combining it with 150ml of chilled fresh milk for our balanced 1:4.1 ratio, and finishing with 120 grams of ice. Here is your cup, logo facing forward. Enjoy relaxing on the patio!',
      category: 'ideal',
      color: 'teal',
    },
    {
      id: 'en_flawed',
      label: '⚠️ Flawed: Guessing Measurements & Dirty Countertop',
      text: 'Here is your coffee, Dimas. I eyeballed the milk and ice without weighing it, but it should taste roughly similar.',
      category: 'flawed',
      color: 'rose',
    },
  ],

  // 6. scen_complaint_03 (Kopi Nusantara Barista - Dairy allergy complaint)
  scen_complaint_03: [
    {
      id: 'en_ideal_1',
      label: '💡 Sample SOP: Sincere L.A.S.T Empathy, Free Remake & Recovery Voucher',
      text: 'Mrs. Nadia, I sincerely apologize for this critical oversight. Your health and safety are our utmost priority. Please allow me two minutes to personally craft a brand-new cup using certified oat milk and a sterilized pitcher at zero cost, and please accept this complimentary recovery voucher for your next visit.',
      category: 'ideal',
      color: 'amber',
    },
    {
      id: 'en_flawed',
      label: '⚠️ Flawed: Shifting Blame to Cashier & Charging Again',
      text: 'It is not my fault, the front cashier typed regular milk on the POS ticket. If you want a new one with oat milk, you will have to pay the difference.',
      category: 'flawed',
      color: 'rose',
    },
  ],

  // 7. scen_sales_automotive_dealer (Motorcycle showroom - Down payment & interest)
  scen_sales_automotive_dealer: [
    {
      id: 'en_ideal_1',
      label: '💡 Sample SOP: Family Budget Empathy, TCO Transparency & Servicing Bonus',
      text: 'Good afternoon, Mr. Joko! I completely respect your family budget considerations. Let’s sit down and review the transparent calculation: while the competitor’s $100 down payment looks attractive upfront, their higher interest rate adds nearly $300 in total financing costs over 3 years. With our balanced plan, your monthly installment stays affordable, plus you receive 1 full year of free authorized maintenance vouchers. Shall we run a quick pre-qualification check?',
      category: 'ideal',
      color: 'sky',
    },
    {
      id: 'en_flawed',
      label: '⚠️ Flawed: Disparaging Competitor & Pushing High DP',
      text: 'The other dealer is running a scam, sir. If you cannot afford our $250 down payment, maybe you should look for a cheaper second-hand bike.',
      category: 'flawed',
      color: 'rose',
    },
  ],

  // 8. scen_sales_property_kpr (First-time home buyer consultation)
  scen_sales_property_kpr: [
    {
      id: 'en_ideal_1',
      label: '💡 Sample SOP: First-Time Buyer Empathy, All-In Cost Breakdown & Site Visit',
      text: 'Hello Ms. Rini and Mr. Bayu! Congratulations on taking the step toward owning your first family home. With your combined $700 monthly income, you comfortably qualify for our government-subsidized cluster with fixed monthly payments of just $120. Our all-in developer package completely waives notary and BPHTB tax fees, so there are zero surprise closing costs. Would you like to join our guided tour this Saturday to inspect the finished show unit?',
      category: 'ideal',
      color: 'teal',
    },
    {
      id: 'en_flawed',
      label: '⚠️ Flawed: Condescending Credit Check & Hidden Fees',
      text: 'With only $700 income, the bank will probably reject you anyway unless you have lots of cash saved for hidden notary and closing taxes.',
      category: 'flawed',
      color: 'rose',
    },
  ],

  // 9. scen_sales_fashion_retail (Boutique fashion - Styling & bundle)
  scen_sales_fashion_retail: [
    {
      id: 'en_ideal_1',
      label: '💡 Sample SOP: Primisima Cotton Fabric Value, Breathability & Bundle Savings',
      text: 'Good afternoon Mrs. Ningsih! Let me check size L in our inventory immediately. This batik shirt is tailored from 100% combed primisima cotton—it is exceptionally breathable and wrinkle-resistant, keeping your husband cool during daytime family events. While our boutique maintains fixed pricing for premium craftsmanship, purchasing the matching wrap skirt qualifies you for our 15% official family bundle discount. Let me escort you to our fitting room to inspect the fit!',
      category: 'ideal',
      color: 'purple',
    },
    {
      id: 'en_flawed',
      label: '⚠️ Flawed: Refusing to Explain Quality & Dismissive of Inquiries',
      text: 'Our prices are strictly fixed, ma’am. If it is too expensive, you can look at the synthetic shirts on the discount rack over there.',
      category: 'flawed',
      color: 'rose',
    },
  ],

  // 10. scen_automotive_ev_technical (EV showroom - Battery waterproofing IP67)
  scen_automotive_ev_technical: [
    {
      id: 'en_ideal_1',
      label: '💡 Sample SOP: IP67 Waterproofing Proof, 5-Year Warranty & Test Ride Invite',
      text: 'Welcome, Mr. Bambang! That is an essential and very understandable concern. Our battery pack features international IP67 waterproof certification—tested submerged under 1 meter of water for 30 minutes with an automatic cut-off BMS, ensuring zero shock hazard even through rainy season floods. Additionally, our official 5-year/50,000 km factory warranty provides complete free replacement if health drops below 80%. Would you like to take a test ride right now in our showroom courtyard to feel the smooth, whisper-quiet acceleration?',
      category: 'ideal',
      color: 'sky',
    },
    {
      id: 'en_flawed',
      label: '⚠️ Flawed: Dismissing Safety Questions & Technical Jargon Overload',
      text: 'Look, it is an electric vehicle, so obviously you shouldn’t drive through deep floodwater. If the battery dies outside warranty, yes, it costs as much as buying a new motorcycle.',
      category: 'flawed',
      color: 'rose',
    },
  ],

  // 11. scen_automotive_aftersales_deescalation (EV showroom - Delivery delay de-escalation)
  scen_automotive_aftersales_deescalation: [
    {
      id: 'en_ideal_1',
      label: '💡 Sample SOP: Showroom Ownership, 24h Delivery Commitment & Service Voucher',
      text: 'Mr. Gunawan, I sincerely apologize on behalf of our showroom management for this 3-day delivery delay. Your frustration is completely justified, and your time is invaluable. I am pulling up our central logistics dispatch right now—your vehicle has passed pre-delivery inspection and is scheduled for priority home delivery tomorrow morning at 9:00 AM. Here is your official temporary transit pass, and please accept our complimentary 1-year home-service maintenance voucher as our direct accountability.',
      category: 'ideal',
      color: 'amber',
    },
    {
      id: 'en_flawed',
      label: '⚠️ Flawed: Blaming Shipping Vendor & Showing Irritation',
      text: 'Sir, yelling at me won’t make the truck arrive any faster. The third-party expedition delayed the dispatch, so you will just have to wait until they deliver it.',
      category: 'flawed',
      color: 'rose',
    },
  ],

  // 12. scen_fashion_fabric_care_fitting (Boutique fashion - Silk care & fitting room exchange)
  scen_fashion_fabric_care_fitting: [
    {
      id: 'en_ideal_1',
      label: '💡 Sample SOP: Gentle Natural Wash Care, 7-Day Exchange & Fitting Standby',
      text: 'Good afternoon Ms. Alika! This handcrafted silk batik is made with durable natural plant dyes. For home care, simply hand-wash in cold water with gentle liquid soap or mild baby shampoo, avoid wringing, and air-dry in the shade to preserve the silk’s luminous sheen. To give you complete peace of mind, our boutique provides a 7-day size exchange guarantee with receipt. Let me accompany you to our fitting room, and I will have a size L prepared on standby right outside!',
      category: 'ideal',
      color: 'purple',
    },
    {
      id: 'en_flawed',
      label: '⚠️ Flawed: Discouraging Customer & Restrictive Return Policy Warning',
      text: 'Silk is very delicate, if you wash it wrong at home it will definitely shrink and we won’t accept any returns once you walk out the door.',
      category: 'flawed',
      color: 'rose',
    },
  ],

  // 13. scen_fashion_cashier_packaging (Boutique fashion - VIP gift wrapping & loyalty)
  scen_fashion_cashier_packaging: [
    {
      id: 'en_ideal_1',
      label: '💡 Sample SOP: Garment QC, Velvet Hardbox Wrapping, Discreet Invoice & Loyalty',
      text: 'Good evening Mrs. Maya! It is an honor to prepare this corporate executive gift for you. First, let me inspect the buttons and stitching to ensure pristine perfection. I will fold the shirt in protective acid-free tissue paper, place it into our signature velvet-lined hardbox with an elegant gold ribbon, and enclose the official invoice inside a discreet envelope. You’ve also earned 85 loyalty points today, which you can redeem for an instant discount on your next visit!',
      category: 'ideal',
      color: 'purple',
    },
    {
      id: 'en_flawed',
      label: '⚠️ Flawed: Sloppy Plastic Bag & Rushed Transaction',
      text: 'That is $85 total. I don’t have a ribbon box, so I will just put it in a regular paper bag. Cash or card?',
      category: 'flawed',
      color: 'rose',
    },
  ],
};

export function getEnglishQuickResponses(scenarioId: string): QuickResponseOption[] {
  return ENGLISH_QUICK_RESPONSES[scenarioId] || [
    {
      id: 'en_default_ideal',
      label: '💡 Sample SOP Response',
      text: 'Good afternoon! Welcome, my name is Alex and I am delighted to assist you today. How may I be of service?',
      category: 'ideal',
      color: 'teal',
    },
    {
      id: 'en_default_flawed',
      label: '⚠️ Non-Compliant Response',
      text: 'Yeah, what do you need? Can you make it quick?',
      category: 'flawed',
      color: 'rose',
    },
  ];
}
