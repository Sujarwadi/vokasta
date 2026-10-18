import { Scenario } from '../types';

export interface ScenarioLocalization {
  title: string;
  category: string;
  role_context: string;
  task_instruction: string;
  evaluation_prompt_snippet?: string;
  buyer_persona?: {
    name: string;
    title: string;
    company: string;
    temperament: string;
    opening_objection_line: string;
    avatar_initials?: string;
  };
  parameters: {
    id: string;
    name: string;
    definition: string;
    keywords_or_actions: string[];
  }[];
}

export const SCENARIO_TRANSLATIONS_EN: Record<string, ScenarioLocalization> = {
  // 1. Universal Jobseeker 01: Hospitality & Welcome
  scen_jobseeker_hospitality_basic: {
    title: 'Workforce Readiness: Warm Greeting, Eye Contact & First-Response Speed',
    category: 'Universal Frontline Readiness Standards',
    role_context: 'General Frontliner / Waitstaff / Customer Care Apprentice',
    task_instruction:
      'A first-time visitor enters your establishment looking disoriented. Demonstrate fundamental hospitality reflex: 1) Acknowledge immediately with a genuine smile, warm eye contact, and professional greeting within 3 seconds ("Good morning/afternoon, welcome! How may I assist you today?"); 2) Practice active listening without interruption to pinpoint what they need; 3) Provide polite initial directions with welcoming, open body language; 4) Conclude with a warm offer for any further assistance.',
    evaluation_prompt_snippet:
      'Evaluate greeting initiative within 3 seconds, warmth of eye contact and smile, active listening comprehension, and professional frontline courtesies.',
    buyer_persona: {
      name: 'Mrs. Ratna Handayani',
      title: 'First-Time Visitor',
      company: 'General Retail & Service Facility Visitor',
      temperament: 'Confused looking for the service counter, expects a welcoming smile, eye contact, and clear directions',
      opening_objection_line:
        'Excuse me, good afternoon. Sorry to bother you, this is my first time here and I am a bit lost trying to find the customer service counter. Could you point me in the right direction?',
      avatar_initials: 'RH',
    },
    parameters: [
      {
        id: 'param_js_warm_greeting',
        name: 'Warm Greeting Initiative & First Eye Contact',
        definition:
          'Candidate proactively welcomes the guest within the first 3 seconds with a warm smile, open eye contact, and professional greeting.',
        keywords_or_actions: [
          'Good morning/afternoon, welcome!',
          'How may I help you today, Sir/Ma’am?',
          'Warm smile and direct open eye contact',
        ],
      },
      {
        id: 'param_js_active_listening',
        name: 'Active Listening & Need Confirmation',
        definition:
          'Candidate listens attentively without interrupting and politely mirrors back the guest’s inquiry.',
        keywords_or_actions: [
          'Nodding attentively and listening fully',
          'Understood, you are looking for...',
          'Clearly confirming needs with polite tone',
        ],
      },
      {
        id: 'param_js_body_language',
        name: 'Open Body Language & Readiness to Serve',
        definition:
          'Candidate maintains an upright posture, open hands (not folded), and clear hospitality engagement.',
        keywords_or_actions: [
          'Open welcoming body posture',
          'Gesturing directions with an open palm',
          'Maintaining comfortable interpersonal distance',
        ],
      },
      {
        id: 'param_js_courtesy_closing',
        name: 'Courtesy Etiquette & Follow-up Offer',
        definition:
          'Candidate wraps up with an offer of follow-up assistance and a polite pleasantry.',
        keywords_or_actions: [
          'Please let me know if you need anything else',
          'Have a wonderful day ahead!',
          'Thank you very much',
        ],
      },
    ],
  },

  // 2. Universal Jobseeker 02: Complaint De-escalation
  scen_jobseeker_complaint_deescalation: {
    title: 'Workforce Readiness: Customer Complaint De-escalation & Empathetic Communication',
    category: 'Universal Crisis Communication & Empathy Standards',
    role_context: 'Frontline Associate / Counter Staff / Customer Care Representative',
    task_instruction:
      'An upset customer approaches your station stating their wait time exceeded the promised estimate by over 20 minutes. Apply universal de-escalation protocols (Listen, Empathize, Apologize, Resolve): 1) Maintain composure and listen attentively without interrupting; 2) Offer a sincere apology on behalf of the team without shifting blame; 3) Validate their feelings with genuine empathy ("I completely understand how valuable your time is"); 4) Deliver a concrete, fast resolution timeline and thank them for their patience.',
    evaluation_prompt_snippet:
      'Evaluate emotional regulation during customer agitation, sincere non-defensive apology, empathetic validation of the customer’s time, and concrete resolution ownership.',
    buyer_persona: {
      name: 'Mr. Hendra Gunawan',
      title: 'Queuing Service Customer',
      company: 'General Public / Retail Customer',
      temperament: 'Frustrated due to a 20-minute queue delay, hurried, demanding a sincere apology and clear resolution timeline',
      opening_objection_line:
        'Excuse me! Please, I have been waiting here for over twenty minutes and my ticket hasn’t been called yet! The front staff told me it would take five to ten minutes. I have an urgent appointment right after this, what is your solution?!',
      avatar_initials: 'HG',
    },
    parameters: [
      {
        id: 'param_js_emotional_regulation',
        name: 'Vocal Tone Composure & Professional Calmness',
        definition:
          'Candidate maintains a calm voice, steady intonation, and does not react defensively to customer agitation.',
        keywords_or_actions: [
          'Steady, calm, and soothing vocal tone',
          'Listening without interrupting customer venting',
          'Composed, attentive, and empathetic facial expression',
        ],
      },
      {
        id: 'param_js_sincere_apology',
        name: 'Sincere Apology Without Defensiveness',
        definition:
          'Candidate delivers a heartfelt apology acknowledging the delay without blaming coworkers or systems.',
        keywords_or_actions: [
          'We sincerely apologize for this unexpected delay',
          'I completely understand your frustration and urgency',
          'No defensive excuses or finger-pointing',
        ],
      },
      {
        id: 'param_js_active_resolution',
        name: 'Rapid Action Initiative & Tangible Next Steps',
        definition:
          'Candidate provides an immediate, measurable action commitment within a specific minute timeframe.',
        keywords_or_actions: [
          'I will personally expedite this within 3 minutes',
          'I am taking direct ownership of your request right now',
          'Providing a clear, confirmed timeline for resolution',
        ],
      },
      {
        id: 'param_js_customer_appreciation',
        name: 'Feedback Appreciation & Relationship Recovery',
        definition:
          'Candidate thanks the customer for their patience and constructive feedback, concluding on a respectful note.',
        keywords_or_actions: [
          'Thank you very much for bringing this to our attention with patience',
          'Your feedback is invaluable for improving our service flow',
          'Once again, our apologies and thank you for your understanding',
        ],
      },
    ],
  },

  // 3. Universal Jobseeker 03: Retail Discovery & Cashier Transaction
  scen_jobseeker_retail_communication: {
    title: 'Workforce Readiness: Customer Needs Discovery, Persuasive Consultation & POS Accuracy',
    category: 'Universal Retail Associate & POS Cashier Standards',
    role_context: 'Retail Sales Associate / Frontline Cashier',
    task_instruction:
      'A shopper is examining two display products with indecision regarding durability and pricing. Approach courteously: 1) Open with an inviting, open-ended question ("May I help you find what best suits your needs?"); 2) Identify customer priorities (durability, convenience, or budget); 3) Explain product value transparently without exaggerating; 4) Confirm payment total accurately, guide cashless/cash checkout, and hand over the shopping bag with two hands accompanied by a warm thank-you.',
    evaluation_prompt_snippet:
      'Evaluate consultative customer approach, open-ended discovery questions, clear and honest product comparison, and courteous POS transaction etiquette.',
    buyer_persona: {
      name: 'Ms. Cindy Claudia',
      title: 'Prospective Retail Shopper',
      company: 'Independent Retail Store Patron',
      temperament: 'Torn between two display items, seeking objective comparison and meticulous checkout guidance',
      opening_objection_line:
        'Hello, excuse me! I am a bit torn between these two items on the shelf. One is more affordable with different material, while the other is slightly pricier. What is the actual difference, and which one will last longer for daily use?',
      avatar_initials: 'CC',
    },
    parameters: [
      {
        id: 'param_js_discovery_questions',
        name: 'Consultative Approach & Open-Ended Inquiries',
        definition:
          'Candidate approaches the shopper politely and uses open discovery questions to understand their practical usage.',
        keywords_or_actions: [
          'Are you looking for daily personal use or a gift?',
          'Which feature is most essential for your routine?',
          'Engaging open-ended questions that uncover preferences',
        ],
      },
      {
        id: 'param_js_product_explanation',
        name: 'Value Proposition & Objective Comparison',
        definition:
          'Candidate highlights the advantages of each option honestly in alignment with the shopper’s budget.',
        keywords_or_actions: [
          'Option A excels in heavy-duty material durability',
          'Option B is noticeably lighter and more flexible',
          'Both include full official manufacturer warranty',
        ],
      },
      {
        id: 'param_js_cashier_accuracy',
        name: 'POS Billing Accuracy & Courteous Bag Handover',
        definition:
          'Candidate confirms the final balance, guides payment options, and presents purchased items with two hands and a sincere pleasantry.',
        keywords_or_actions: [
          'Your total purchase comes to...',
          'You may pay via cash or scan QRIS/card right here',
          'Handing shopping bag with two hands and a warm smile',
          'Thank you very much for shopping with us, have a wonderful day!',
        ],
      },
    ],
  },

  // 4. Staff Store SOP 01: Kopi Nusantara Barista - Greeting, Oat Milk & Upselling
  scen_greeting_01: {
    title: 'Store SOP: Warm Greeting, Oat Milk Customization & Pastry Cross-Selling',
    category: 'Hospitality & Frontline Barista Counter',
    role_context: 'Barista Counter Specialist & Cashier at Kopi Nusantara',
    task_instruction:
      'Ms. Sarah (a customer with lactose intolerance) approaches the counter inquiring if Palm Sugar Iced Latte can use Oat Milk and be adjusted to 50% sweetness. Greet with brand standard ("Welcome to Kopi Nusantara!"), explain creamy plant-based oat milk benefits for lactose sensitivity, calibrate sweetness to 50%, proactively suggest the Warm Almond Croissant bundle discount, and confirm order details with QRIS payment guidance.',
    evaluation_prompt_snippet:
      'Evaluate official brand greeting "Welcome to Kopi Nusantara", dairy-free oat milk consultation and 50% less sweet customization, Warm Almond Croissant cross-selling, and POS payment confirmation.',
    buyer_persona: {
      name: 'Ms. Sarah',
      title: 'Lactose-Sensitive Cafe Customer',
      company: 'Kopi Nusantara Guest',
      temperament: 'Friendly and health-conscious, requires assurance of 100% plant-based oat milk and 50% less sweet balance',
      opening_objection_line:
        'Hi there! Quick question. Can I substitute oat milk for the Palm Sugar Iced Latte? I am lactose intolerant. And is it possible to request 50% less sweet?',
      avatar_initials: 'SR',
    },
    parameters: [
      {
        id: 'param_greeting_welcome',
        name: 'Brand Greeting & Lactose Sensitivity Empathy',
        definition:
          'Associate greets with the official slogan "Welcome to Kopi Nusantara", warm eye contact, and attentive active listening regarding dietary preferences.',
        keywords_or_actions: [
          'Welcome to Kopi Nusantara!',
          'Absolutely, we would be delighted to customize that for you',
          'Attentive listening to lactose sensitivity needs',
        ],
      },
      {
        id: 'param_oatmilk_customization',
        name: 'Oat Milk Plant-Based Consultation & 50% Sweetness',
        definition:
          'Associate explains 100% plant-based creamy oat milk benefits and confirms the balanced 50% less sweet proportion.',
        keywords_or_actions: [
          '100% plant-based oat milk safe for digestion',
          'Balanced 50% less sweet recipe recommendation',
          'Choice of regular or large cup sizing',
        ],
      },
      {
        id: 'param_cross_selling_pastry',
        name: 'Cross-Selling Warm Almond Croissant Pastry Bundle',
        definition:
          'Associate proactively recommends the pairing pastry (Warm Almond Croissant) highlighting the discount bundle.',
        keywords_or_actions: [
          'Pairing recommendation: Warm Almond Croissant',
          'Special combo discount savings',
          'Offer to warm it up to golden buttery crispness',
        ],
      },
      {
        id: 'param_closing_qris',
        name: 'POS Order Confirmation & Cashless QRIS Guidance',
        definition:
          'Associate repeats the complete order accurately, states the total amount, and provides clear cashless QR payment instructions.',
        keywords_or_actions: [
          '1 Iced Oat Milk Palm Sugar Latte Less Sweet & 1 Warm Almond Croissant',
          'Total comes to $3.20',
          'Cashless payment can be scanned on the QR terminal right here',
        ],
      },
    ],
  },

  // 5. Staff Store SOP 02: Kopi Nusantara Barista - Signature Recipe Ratio & Hygiene
  scen_ratio_02: {
    title: 'Barista Formulation: Signature Iced Coffee Recipe Ratio & Brew Station Hygiene',
    category: 'F&B Operations & Precision Coffee Barista',
    role_context: 'Barista Station Lead & Drink Assembly',
    task_instruction:
      'Explain and demonstrate SOP for Signature Iced Coffee: 1) Hygiene & Sanitation: inspect cup cleanliness and sanitize workstation with sanitized cloth; 2) Calibrate double shot espresso extraction (precisely 36 grams); 3) Measure chilled fresh milk to exactly 150ml (standard 1:4.1 ratio); 4) Add 120 grams of ice, ensure cup rim is clean and dry, secure the lid, and serve with logo facing the customer.',
    evaluation_prompt_snippet:
      'Evaluate brew station sanitation compliance, strict adherence to 36g espresso : 150ml milk : 120g ice formula, and professional customer-facing presentation.',
    buyer_persona: {
      name: 'Dimas',
      title: 'Loyal Cafe Patron',
      company: 'Regular Kopi Nusantara Guest',
      temperament: 'Authentic coffee enthusiast, attentive to espresso-milk balance, casual and warm',
      opening_objection_line:
        'Hey there, one Signature Iced Coffee please! Make sure the espresso and milk balance is spot on like usual, I will be hanging out at the outdoor patio.',
      avatar_initials: 'DM',
    },
    parameters: [
      {
        id: 'param_hygiene_station',
        name: 'Brew Station Hygiene & Cup Sanitation Inspection',
        definition:
          'Associate maintains countertop cleanliness, visually inspects cup integrity, uses sanitized cloth, and prevents cross-contamination.',
        keywords_or_actions: [
          'Wiping brew station with sanitized cloth',
          'Visual inspection of cup cleanliness before pouring',
          'Hygienic ice and lid handling procedures',
        ],
      },
      {
        id: 'param_signature_ratio',
        name: 'Signature Recipe Ratio (36g Espresso : 150ml Milk : 120g Ice)',
        definition:
          'Associate accurately measures proprietary formula: 36g double espresso extraction, 150ml chilled milk (1:4.1 ratio), and 120g standard ice portion.',
        keywords_or_actions: [
          '36 grams double shot espresso extraction',
          '150 ml chilled fresh milk (1:4.1 ratio)',
          '120 grams standard ice portion',
        ],
      },
      {
        id: 'param_presentation_handover',
        name: 'Visual Drink Presentation & Branded Cup Handover',
        definition:
          'Associate inspects beverage layering, ensures lid is securely sealed without leaks, and hands cup over with logo facing the guest.',
        keywords_or_actions: [
          'Wiping cup rim dry and locking lid securely',
          'Visual check of coffee and milk gradient layers',
          'Courteous handover with logo facing customer',
        ],
      },
    ],
  },

  // 6. Staff Store SOP 03: Kopi Nusantara Barista - Dairy Allergy Complaint De-escalation
  scen_complaint_03: {
    title: 'Complaint Recovery (L.A.S.T): Dairy vs Oat Milk Incident (Severe Lactose Allergy)',
    category: 'Complaint Resolution & Guest Safety',
    role_context: 'Shift Supervisor / Senior Barista',
    task_instruction:
      'A patron raises a severe complaint after ordering oat milk due to dairy allergy, discovering their beverage was made with regular cow’s milk. Apply L.A.S.T service recovery: 1) Listen (Attentive focus without interrupting or making excuses); 2) Apologize (Sincere institutional apology for staff oversight); 3) Solve (Immediately brew a replacement using certified oat milk and dedicated pitcher at zero cost); 4) Thank & Recovery (Express gratitude for the alert and provide complimentary drink recovery voucher per SOP).',
    evaluation_prompt_snippet:
      'Evaluate empathetic active listening without defensive behavior, prioritization of health safety (free priority oat milk remake), and provision of service recovery voucher.',
    buyer_persona: {
      name: 'Mrs. Nadia',
      title: 'Customer with Severe Lactose Allergy Incident',
      company: 'Kopi Nusantara Guest',
      temperament: 'Anxious and emotional due to severe milk allergy risk, demanding L.A.S.T de-escalation and immediate hygienic remake',
      opening_objection_line:
        'Excuse me! Is this really oat milk?! I specifically emphasized oat milk because of severe dairy allergies! This tastes like regular whole cow’s milk! This is extremely dangerous for my health!',
      avatar_initials: 'ND',
    },
    parameters: [
      {
        id: 'param_active_empathy',
        name: 'Empathetic Active Listening & Emotional De-escalation',
        definition:
          'Associate listens without interrupting, refrains from shifting blame to colleagues, validates allergy health risks calmly, and conveys sincere professional empathy.',
        keywords_or_actions: [
          'Listening attentively without interrupting customer explanation',
          'I completely understand and sincerely apologize for this critical oversight',
          'Validating dairy allergy safety risks with urgency and respect',
        ],
      },
      {
        id: 'param_immediate_remedy',
        name: 'Swift Corrective Action & Free Priority Remake',
        definition:
          'Associate prioritizes guest safety by offering an immediate fresh remake using certified oat milk and dedicated sterilized tools at zero charge.',
        keywords_or_actions: [
          'Allow me to immediately remake a fresh drink with certified oat milk',
          'Utilizing dedicated allergen-free pitcher',
          '100% complimentary immediate replacement',
        ],
      },
      {
        id: 'param_brand_recovery_policy',
        name: 'Service Recovery SOP & Complimentary Voucher Compensation',
        definition:
          'Associate applies brand recovery policy by providing a complimentary drink voucher, thanking the guest for their vigilance, and logging the incident.',
        keywords_or_actions: [
          'Complimentary drink voucher as our sincere apology',
          'Thank you very much for bringing this to our attention',
          'Logging incident with bar team to ensure zero recurrence',
        ],
      },
    ],
  },

  // 7. Staff Store SOP 04: Automotive Showroom - DP & Installment Objection
  scen_sales_automotive_dealer: {
    title: 'Automotive Showroom Sales: Addressing Down Payment Concerns & Leasing Simulation',
    category: 'Automotive Dealership & Local Vehicle Showroom',
    role_context: 'Showroom Sales Counter / Automotive Retail Consultant',
    task_instruction:
      'A walk-in customer is interested in a daily commuter motorcycle but hesitates on the down payment (DP) comparing it with a competitor offering very low DP. Execute consultative sales: 1) Validate family budget concerns warmly without disparaging competitors; 2) Explain total cost transparently (low DP increases total interest vs optimal DP saving thousands over 3 years); 3) Present dealership added value (free 1-year service vouchers, quick 1-day leasing approval, safety gear bonus); 4) Guide customer to complete pre-qualification with zero pressure.',
    evaluation_prompt_snippet:
      'Evaluate empathy addressing family budget anxiety, transparent comparison of low-DP vs optimal-DP interest costs without disparaging rivals, and securing pre-qualification form submission.',
    buyer_persona: {
      name: 'Mr. Joko Susilo',
      title: 'Family Head & Private Sector Professional',
      company: 'Daily Commuter Scooter Buyer',
      temperament: 'Hesitant, concerned about monthly budget strain, comparing DP against competing dealers',
      opening_objection_line:
        'Hi, I really like this automatic scooter for my daily commute to work. But the $250 down payment feels steep. The dealer across the street says I can get it for just $100 down. I am worried the monthly installments will blow up our household budget.',
      avatar_initials: 'JS',
    },
    parameters: [
      {
        id: 'param_auto_empathy_transparency',
        name: 'Family Financial Empathy & Simulation Transparency',
        definition:
          'Sales consultant welcomes family budget concerns politely, avoids disparaging competing dealers, and invites customer to review real numbers together.',
        keywords_or_actions: [
          'I completely understand your family budget priorities Mr. Joko',
          'Let us calculate the exact monthly installment comparison transparently',
          'Respectful demeanor without speaking negatively of competitors',
        ],
      },
      {
        id: 'param_auto_tco_interest_comparison',
        name: 'Total Cost Education: Low DP Interest vs Optimal DP Savings',
        definition:
          'Consultant demonstrates that excessively low DP significantly inflates total interest paid over 3 years, highlighting genuine savings of proportional DP.',
        keywords_or_actions: [
          'Explaining 3-year total interest difference saving substantial money',
          'Lower monthly installment burden to protect monthly salary',
          'Presenting leasing installment comparison from trusted partners',
        ],
      },
      {
        id: 'param_auto_aftersales_closing',
        name: 'Official Service Package Value & Pre-Approval Closing',
        definition:
          'Consultant reinforces offer with showroom perks (1-year free maintenance, engine warranty, 1-day approval) and invites pre-qualification check without pressure.',
        keywords_or_actions: [
          'Free periodic maintenance and oil during the first year at official center',
          'Fast 1-day leasing verification assistance with zero added fees',
          'Reviewing preliminary ID and document readiness collaboratively',
        ],
      },
    ],
  },

  // 8. Staff Store SOP 05: Property Marketing - First-Time Home Buyer KPR Consultation
  scen_sales_property_kpr: {
    title: 'Property Marketing: First-Time Home Buyer Mortgage Consultation & Fee Transparency',
    category: 'Affordable Housing, Subsidized Homes & Residential Clusters',
    role_context: 'Marketing Executive for Residential Housing Clusters',
    task_instruction:
      'A young working couple visits your marketing booth. They dream of owning their first home but fear hidden legal/closing fees and loan rejection. Execute empathetic property consultation: 1) Validate their dream and de-escalate anxiety with a welcoming, respectful demeanor; 2) Transparently break down total costs (All-in Booking, DP 0% / subsidised DP, estimated notary & tax fees); 3) Guide them through pre-screening documents without judgment; 4) Secure a site-visit or booking hold with refundable guarantee.',
    evaluation_prompt_snippet:
      'Evaluate empathetic counseling of first-time home buyers, complete transparent disclosure of mortgage upfront and hidden fees (notary, taxes), and securing site visit agreement.',
    buyer_persona: {
      name: 'Ms. Rini & Mr. Bayu',
      title: 'Young Couple (First-Time Home Buyers)',
      company: 'Independent Contractors & Private Employees',
      temperament: 'Fearful of bank credit rejection, anxious about unexpected closing fees or notary costs',
      opening_objection_line:
        'Hi, we really want to buy our first family home instead of renting every year. But we are nervous—our combined monthly income is around $700, and we are scared of hidden closing fees or the bank outright rejecting our application.',
      avatar_initials: 'RB',
    },
    parameters: [
      {
        id: 'param_prop_first_home_empathy',
        name: 'Building Trust & Empathy for First-Time Home Buyers',
        definition:
          'Marketing executive praises the couple’s courageous step toward homeownership, calms fears of bank rejection, and explains step-by-step mortgage planning.',
        keywords_or_actions: [
          'Commending Ms. Rini and Mr. Bayu for taking this bold family step',
          'Reassuring that $700 monthly income comfortably qualifies for subsidized cluster',
          'Approachable, friendly consultation without condescension',
        ],
      },
      {
        id: 'param_prop_transparent_cost_breakdown',
        name: 'Closing Cost Transparency: Notary, Taxes & Flat Subsidized Installments',
        definition:
          'Executive outlines all costs transparently (waived notary and tax fees in developer promo, flat monthly installments), eliminating fear of hidden charges.',
        keywords_or_actions: [
          'Written all-in promo documentation waiving notary and tax fees',
          'Flat subsidized monthly installment simulation of $120/month',
          'Clear deposit terms with 100% refundable guarantee if loan unapproved',
        ],
      },
      {
        id: 'param_prop_site_visit_lock',
        name: 'Credit Pre-Screening Support & Show Unit Site Visit Booking',
        definition:
          'Executive invites couple to tour the completed show unit on the upcoming weekend and offers complimentary confidential credit pre-screening.',
        keywords_or_actions: [
          'Inviting to weekend show unit survey tour this Saturday or Sunday',
          'Assisting confidential and safe preliminary credit screening',
          'Securing preferred unit location before subsidy quota expires',
        ],
      },
    ],
  },

  // 9. Staff Store SOP 06: Boutique Fashion - Consultative Styling, Fabric Care & Bundle
  scen_sales_fashion_retail: {
    title: 'Fashion Retail Associate: Consultative Styling, Fabric Knowledge & Cross-Selling',
    category: 'Retail Fashion, Apparel Boutiques & Factory Outlets',
    role_context: 'Fashion Associate / Boutique Stylist',
    task_instruction:
      'A customer is shopping for a family event, worried about fabric comfort and asking for a discount on a mannequin outfit. Execute consultative retail selling: 1) Greet warmly with a genuine smile and check stock/size immediately; 2) Explain the cotton/linen blend advantages (breathable, wrinkle-resistant) justifying the fair store price; 3) Proactively suggest a matching accessory or complimentary outfit piece (mix-and-match styling) that qualifies for store bundle savings; 4) Escort the customer to the fitting room or checkout counter with attentive, non-pushy hospitality.',
    evaluation_prompt_snippet:
      'Evaluate retail floor hospitality, fabric and size knowledge communication without giving away arbitrary discounts, and helpful mix-and-match bundle cross-selling.',
    buyer_persona: {
      name: 'Mrs. Ningsih',
      title: 'Homemaker & Family Shopper',
      company: 'Boutique Apparel Shopper',
      temperament: 'Indecisive about sizing and styling for family gathering, price-sensitive, inquiring about discounts',
      opening_objection_line:
        'Hello! Is this mannequin batik shirt available in size L for my husband? I am worried the fabric will feel hot during midday heat. Can you give me a discount if I take the matching skirt as well?',
      avatar_initials: 'IN',
    },
    parameters: [
      {
        id: 'param_fashion_warm_greeting_inquiry',
        name: 'Associate Warmth & Rapid Size/Inventory Response',
        definition:
          'Associate greets with a welcoming smile, promptly checks size L inventory, and listens attentively to the customer’s family event needs.',
        keywords_or_actions: [
          'Warm smile and greeting: Good afternoon Mrs. Ningsih!',
          'Immediately verifying size L stock in display and stockroom',
          'Listening enthusiastically to family event requirements',
        ],
      },
      {
        id: 'param_fashion_fabric_value_explanation',
        name: 'Fabric Quality Education & Fair Value Justification',
        definition:
          'Associate explains the premium combed primisima cotton benefits (breathable, moisture-wicking, wrinkle-resistant), giving confidence in fixed boutique pricing.',
        keywords_or_actions: [
          'Explaining fine combed cotton benefits for daytime cooling comfort',
          'Durable natural coloring that resists fading across repeated washes',
          'Highlighting tailored stitching quality justifying boutique price',
        ],
      },
      {
        id: 'param_fashion_styling_cross_sell',
        name: 'Mix-and-Match Styling Recommendation & Family Bundle Promo',
        definition:
          'Associate recommends a matching wrap skirt to leverage the official family bundle promo, creating win-win value for the shopper.',
        keywords_or_actions: [
          'Recommending coordinated wrap skirt in complementary pattern',
          'Offering official bundle promotion with savings on the paired set',
          'Politely escorting to the fitting room for comfortable try-on',
        ],
      },
    ],
  },

  // 10. Staff Store SOP 07: Automotive EV Technical Consultation & Battery Safety
  scen_automotive_ev_technical: {
    title: 'EV Technical Consultation: Battery Durability, Range & Fast-Charging Warranty',
    category: 'Automotive Dealership & Electric Vehicle Showroom',
    role_context: 'EV Sales Counter & Technical Specialist at Nusantara Motor EV',
    task_instruction:
      'A prospective EV buyer expresses strong apprehension about battery water-resistance during rain/floods and replacement battery costs. Execute consultative EV sales: 1) Warmly welcome Pak Bambang, validating his concern without technical arrogance; 2) Explain IP67 waterproof battery certification (tested immersion at 1 meter depth for 30 minutes) and battery smart management system (BMS); 3) Detail the 5-year official factory warranty and calculate daily electricity savings compared to petrol; 4) Offer a hands-on showroom test ride to experience throttle response and quiet performance.',
    evaluation_prompt_snippet:
      'Evaluate consultative explanation of EV battery waterproofing standards (IP67), transparent warranty terms (5 years/50,000 km), operating cost comparison against gasoline, and inviting for a test ride.',
    buyer_persona: {
      name: 'Mr. Bambang Irawan',
      title: 'Prospective EV Commuter',
      company: 'Urban Commuter',
      temperament: 'Hesitant about switching to EV, concerned about battery short-circuiting in floods and costly battery replacement',
      opening_objection_line:
        'Hi, I am interested in this electric motorcycle for my daily office commute, but honestly I am quite apprehensive. What happens during rainy season if I ride through road floodwater—won’t it short-circuit? And if the battery degrades, isn’t replacement almost the cost of buying a new bike?',
      avatar_initials: 'BI',
    },
    parameters: [
      {
        id: 'param_auto_ev_battery_safety',
        name: 'Battery Protection Certification Education (IP67 Waterproof & Flood Safe)',
        definition:
          'EV specialist clearly explains IP67 waterproof rating and automatic cut-off BMS protection, ensuring complete safety during torrential rain or standing water.',
        keywords_or_actions: [
          'International standard IP67 waterproof and dustproof certification',
          'Smart Battery Management System (BMS) with automatic short-circuit cutoff',
          'Safely navigates axle-deep water with zero electrical shock hazard',
        ],
      },
      {
        id: 'param_auto_ev_tco_warranty',
        name: '5-Year Manufacturer Warranty Transparency & Energy Savings Simulation',
        definition:
          'Specialist outlines 5-year/50,000 km official battery warranty (free replacement if health drops below 80%) and compares electricity vs fuel costs.',
        keywords_or_actions: [
          '5-year official battery warranty with zero replacement cost if degraded',
          'Up to 70% energy cost savings compared to daily gasoline consumption',
          'Zero periodic engine oil and spark plug maintenance expenses',
        ],
      },
      {
        id: 'param_auto_ev_charging_consultation',
        name: 'Practical Home Charging Guidance & Test Ride Invitation',
        definition:
          'Specialist explains standard 900VA-1300VA household socket charging and invites the customer to experience the smooth, silent test ride.',
        keywords_or_actions: [
          'Charges directly in standard household wall outlets without power upgrades',
          'Normal 3-4 hour charge time or quick battery swap at official stations',
          'Inviting to showroom courtyard test ride to experience smooth acceleration',
        ],
      },
    ],
  },

  // 11. Staff Store SOP 08: Automotive Delivery Delay Complaint De-escalation
  scen_automotive_aftersales_deescalation: {
    title: 'Showroom Complaint De-escalation: EV Delivery Delay & License Plate Certainty',
    category: 'Automotive Aftersales & Customer Satisfaction',
    role_context: 'Customer Service & Showroom Front Office at Nusantara Motor EV',
    task_instruction:
      'An upset customer storms into the showroom complaining that his EV motorcycle delivery is 3 days overdue and registration papers are pending. Execute L.E.A.R de-escalation: 1) Listen attentively with open posture and apologize sincerely on behalf of the dealership without finger-pointing; 2) Immediately track the logistics status in the warehouse portal while keeping the customer informed; 3) Provide an exact delivery commitment within 24 hours accompanied by an official tracking receipt; 4) Offer showroom service compensation (first year free home-service vouchers and free delivery inspection).',
    evaluation_prompt_snippet:
      'Evaluate emotional composure under customer anger, sincere apology on behalf of the dealership without blaming shipping vendors, clear status tracking, and offering concrete service recovery compensation.',
    buyer_persona: {
      name: 'Mr. Gunawan Wibowo',
      title: 'Showroom Vehicle Buyer',
      company: 'Business Owner',
      temperament: 'Angry and disappointed that the promised 7-day electric motorcycle delivery is 3 days overdue and registration number is unconfirmed',
      opening_objection_line:
        'I demand accountability from showroom management! Last week sales assured me my electric bike would be delivered yesterday at the absolute latest. It has been three days past the deadline, and registration plates are still nowhere to be seen. What kind of service is this?!',
      avatar_initials: 'GW',
    },
    parameters: [
      {
        id: 'param_auto_complaint_empathy_listening',
        name: 'Composure & Sincere Apology Without Blame-Shifting',
        definition:
          'Showroom staff listens to Mr. Gunawan calmly, validates his frustration, and delivers a sincere apology on behalf of the showroom without blaming third-party couriers.',
        keywords_or_actions: [
          'Mr. Gunawan, I sincerely apologize on behalf of our showroom for this delivery delay',
          'We completely understand your frustration and that your schedule is invaluable',
          'Calm demeanor, empathetic eye contact, and zero blame placed on shipping vendors',
        ],
      },
      {
        id: 'param_auto_tracking_action_commitment',
        name: 'Real-Time Logistics Tracking & Firm Delivery Commitment',
        definition:
          'Staff checks central dispatch system, confirms the unit has completed Pre-Delivery Inspection (PDI), and provides firm delivery commitment within 24 hours.',
        keywords_or_actions: [
          'Directly inspecting shipping manifest on showroom computer portal',
          'Verifying unit has successfully passed Pre-Delivery Inspection at transit hub',
          'Committing to priority doorstep delivery tomorrow morning by 9:00 AM',
        ],
      },
      {
        id: 'param_auto_recovery_compensation',
        name: 'Showroom Service Compensation & Official Transit Documentation',
        definition:
          'Staff issues official temporary transit documentation, provides complimentary periodic maintenance vouchers, and official showroom merchandise.',
        keywords_or_actions: [
          'Providing official temporary road permit and DMV registration proof',
          'Granting complimentary home-service maintenance voucher package',
          'Concluding with direct mobile contact of the dedicated delivery coordinator',
        ],
      },
    ],
  },

  // 12. Staff Store SOP 09: Boutique Fashion - Silk Care & Fitting Room Exchange
  scen_fashion_fabric_care_fitting: {
    title: 'Fitting Room Hospitality: Silk/Batik Care Guidance & Courteous Size Exchange',
    category: 'Retail Fashion, Batik Boutiques & Fitting Room Services',
    role_context: 'Fashion Advisor at Batik & Busana Nusantara',
    task_instruction:
      'A boutique customer loves a silk batik dress but fears fabric shrinkage/fading during home wash, and queries the return/exchange policy. Execute fashion advisor service: 1) Greet warmly and reassure her with expert fabric care knowledge (dry clean or cold soak with natural lerak soap, do not wring, shade dry); 2) Accompany her courteously to the fitting room and proactively prepare size L on standby; 3) Clearly explain the boutique’s 7-day hassle-free size exchange policy with receipt and intact price tag; 4) Deliver confident, polished retail hospitality.',
    evaluation_prompt_snippet:
      'Evaluate garment care expertise (natural lerak wash advice), proactive fitting room assistance with alternate sizing, transparent explanation of the 7-day exchange guarantee, and attentive boutique etiquette.',
    buyer_persona: {
      name: 'Ms. Alika Putri',
      title: 'Formal Boutique Shopper',
      company: 'Young Corporate Professional',
      temperament: 'Anxious that silk batik will fade during home washing and unsure if tried garments can be exchanged if too snug',
      opening_objection_line:
        'Hi! The cut on this silk batik dress is gorgeous, but I am worried that washing it at home will cause the colors to run or shrink the fabric. Also, if this size M turns out slightly too tight when walking, can it be exchanged?',
      avatar_initials: 'AP',
    },
    parameters: [
      {
        id: 'param_fashion_care_explanation',
        name: 'Silk Care Education & Natural Botanical Soap Guidance',
        definition:
          'Fashion advisor explains how to wash handcrafted silk batik using gentle natural soap or mild baby shampoo, avoiding wringing and drying in the shade.',
        keywords_or_actions: [
          'Cold water hand soak with natural liquid soap or mild shampoo',
          'Never wring vigorously and avoid direct harsh sunlight',
          'Natural eco-friendly dyes engineered for long-lasting color brilliance',
        ],
      },
      {
        id: 'param_fashion_fitting_room_service',
        name: 'Fitting Room Escort & Proactive Alternate Sizing Standby',
        definition:
          'Advisor guides customer to clean fitting room, opens door courteously, and proactively keeps size L ready outside if size M feels snug.',
        keywords_or_actions: [
          'Please allow me to escort you to our fitting room right this way, Ms. Alika',
          'I will also prepare size L outside the room so you can easily compare fit',
          'Checking comfort of shoulder and waist tailoring during try-on',
        ],
      },
      {
        id: 'param_fashion_exchange_policy',
        name: '7-Day Size Exchange Guarantee Policy Explanation',
        definition:
          'Advisor explains 7-day complimentary size exchange policy provided receipt and price tag remain intact, giving peace of mind.',
        keywords_or_actions: [
          'Complimentary size exchange guarantee within 7 days of purchase',
          'Simply retain sales receipt with original tags intact',
          'Exchangeable across any of our official boutique branches nationwide',
        ],
      },
    ],
  },

  // 13. Staff Store SOP 10: Boutique Fashion - Cashier, Luxury Gift Box & Loyalty Club
  scen_fashion_cashier_packaging: {
    title: 'Boutique Fashion Cashier: Accurate Checkout, Luxury Gift Packaging & Loyalty Club',
    category: 'Boutique Cashier, Point of Sales & VIP Customer Care',
    role_context: 'Cashier & Customer Care Specialist at Batik & Busana Nusantara',
    task_instruction:
      'A VIP boutique customer is purchasing a premium batik shirt as an executive corporate gift. Execute impeccable boutique cashier service: 1) Greet warmly by name, confirm the selected item, and examine the shirt for flawless stitching before packing; 2) Neatly fold the shirt with acid-free tissue paper, place it into the signature velvet-lined hardbox, and tie an elegant gold ribbon; 3) Print an official tax invoice/receipt and place it inside a discreet envelope; 4) Check or invite her to register for the complimentary Nusantara Privilege Loyalty Club for instant cashback.',
    evaluation_prompt_snippet:
      'Evaluate cashier courtesy and accuracy, premium gift-packaging aesthetics (tissue paper, gift box, gold ribbon), discreet receipt handling, and professional loyalty membership invitation.',
    buyer_persona: {
      name: 'Mrs. Maya Arisanti',
      title: 'Executive Corporate Gift Buyer',
      company: 'Corporate / Government Institution',
      temperament: 'Requires batik shirt packaged in a luxury gift box with ribbon for executive presentation, requests official tax invoice, interested in loyalty discount',
      opening_objection_line:
        'Good evening! I am purchasing this handcrafted batik shirt as an executive gift for my department head. Could you please wrap it in an exclusive gift box with ribbon? Also please print the official invoice receipt. Do you offer member card discounts for this purchase?',
      avatar_initials: 'MA',
    },
    parameters: [
      {
        id: 'param_fashion_cashier_accuracy_courtesy',
        name: 'Courteous Cashier Welcome, Invoice Accuracy & Payment Guidance',
        definition:
          'Cashier welcomes patron warmly, inspects garment quality before packing, clearly confirms total amount, and guides card/QRIS checkout.',
        keywords_or_actions: [
          'Good evening Mrs. Maya, I would be delighted to prepare this transaction for you',
          'Inspecting buttons and hem stitching to guarantee flawless quality',
          'Confirming itemized total and presenting official invoice inside a clean envelope',
        ],
      },
      {
        id: 'param_fashion_packaging_presentation',
        name: 'Luxury Gift Box Packaging Aesthetics & Boutique Greeting Card',
        definition:
          'Cashier folds shirt with protective tissue paper, arranges inside velvet-lined hardbox, ties gold satin ribbon, and includes an elegant greeting card.',
        keywords_or_actions: [
          'Folding shirt with protective acid-free boutique tissue paper',
          'Arranging inside signature hardbox tied with neat gold satin ribbon',
          'Providing boutique greeting card and heavy-stock signature shopping tote',
        ],
      },
      {
        id: 'param_fashion_loyalty_registration',
        name: 'Loyalty Club Member Registration & Cashback Points',
        definition:
          'Cashier highlights Nusantara Privilege Club benefits (5% instant cashback points and private sale invites), enrolling customer in under 1 minute.',
        keywords_or_actions: [
          'Explaining complimentary Nusantara Privilege Club membership perks',
          'Shopping points accumulate immediately for future voucher redemption',
          'Instant 1-minute registration via mobile number without lengthy forms',
        ],
      },
    ],
  },
};

export function getLocalizedScenario(scenario: Scenario, language: 'id' | 'en'): Scenario {
  if (language === 'id') {
    return scenario;
  }

  const enTranslation = SCENARIO_TRANSLATIONS_EN[scenario.id];
  if (!enTranslation) {
    return scenario;
  }

  return {
    ...scenario,
    title: enTranslation.title,
    category: enTranslation.category,
    role_context: enTranslation.role_context,
    task_instruction_en: enTranslation.task_instruction,
    buyer_persona: scenario.buyer_persona
      ? {
          ...scenario.buyer_persona,
          name: enTranslation.buyer_persona?.name || scenario.buyer_persona.name,
          title: enTranslation.buyer_persona?.title || scenario.buyer_persona.title,
          company: enTranslation.buyer_persona?.company || scenario.buyer_persona.company,
          temperament: enTranslation.buyer_persona?.temperament || scenario.buyer_persona.temperament,
          opening_objection_line:
            enTranslation.buyer_persona?.opening_objection_line ||
            scenario.buyer_persona.opening_objection_line,
          avatar_initials:
            enTranslation.buyer_persona?.avatar_initials ||
            scenario.buyer_persona.avatar_initials,
        }
      : undefined,
    parameters: scenario.parameters.map((p) => {
      const matchParam = enTranslation.parameters.find((tp) => tp.id === p.id);
      if (!matchParam) return p;
      return {
        ...p,
        name: matchParam.name,
        definition: matchParam.definition,
        keywords_or_actions: matchParam.keywords_or_actions,
      };
    }),
  };
}
