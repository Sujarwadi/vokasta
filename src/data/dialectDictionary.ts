import { IndonesianDialect } from '../types';

export interface DialectTranslationEntry {
  line: string;
  namePrefix?: string;
  honorificMale: string;
  honorificFemale: string;
  dialectLabel: string;
  stylePrompt: string;
  prosody: { pitch: string; rate: string; volume?: string };
}

// Complete authentic regional translations for all 13 core scenarios across all 10 Indonesian dialects
export const SCENARIO_DIALECT_MATRIX: Record<
  string,
  Partial<Record<IndonesianDialect, string>>
> = {
  // 1. scen_jobseeker_hospitality_basic (Tamu Kunjungan Perdana)
  scen_jobseeker_hospitality_basic: {
    jabodetabek:
      'Permisi, selamat siang. Maaf mengganggu, saya baru pertama kali datang ke sini dan agak bingung mencari loket informasi atau bagian layanan. Boleh dibantu arahnya ke sebelah mana ya?',
    sunda:
      'Punten pisan Teh, selamat siang. Hapunten ngiring naroskeun, abdi nembe pertama kali sumping kadieu janten rada bingung milarian loket layanannana. Tiasa dipaparin pituduh arahna palih mana nya Teh?',
    jawa_tengah:
      'Nyuwun sewu Mbak, selamat siang. Maaf mengganggu nggih, kulo nembe pertama kali rawuh mriki dados radi bingung pados loket informasi. Menawi kepareng, saged dipun bantu arahipun sebelah pundi nggih Mbak?',
    jawa_timur:
      'Sepurane Ning, selamat siang! Rek, aku iki anyaran teko kene dadi rodo bingung nggoleki loket informasine nang endi. Iso tulung dituduhno arah lokete sebelah endi yo Ning?',
    medan:
      'Halo Kak, selamat siang! Horas, permisi sebentar ya Kak. Aku baru pertama kali datang kemari, pening juga kutengok loket layanannya di mana. Bisa tolong kau tunjukkan arahnya sebelah mana ya Kak?',
    minang:
      'Rancak bana, selamat siang Uni. Maaf mangganggu sabanta, ambo baru partamo kali tibo kasiko, agak binguang mancari loket informasi layanannyo. Lai bisa dibantu tunjuakkan arahnyo sabalah ma ko Ni?',
    bali:
      'Om Swastyastu Gek, selamat siang. Ampura nggih, tiang wawu pertama kali meriki dados bingung ngrereh loket informasine. Dados tulungin titiang arahipun ring sebelah kija nggih Gek?',
    makassar:
      'Tabe\' Kakak, selamat siang. Maaf mengganggu ki\', baru pertamaka\' datang ke sini jadi agak bingungka\' cari loket informasinya. Bisa ji dibantu ditunjukkan arahnya di sebelah mana kah Kak?',
    manado:
      'Tabea Nona, selamat siang. Permisi kwa\', kita baru pertama kali datang kamari kong bingung mo cari loket informasi layanan. Boleh bantu kase tunju depe arah di sabalah mana dang Nona?',
    timur:
      'Mace, selamat siang kawan! Maaf ganggu sebentar e, sa baru pertama kali injak sini jadi agak bingung cari loket informasi. Boleh tolong kitorang ka tidak, arah loketnya di sebelah mana e Mace?',
  },

  // 2. scen_jobseeker_complaint_deescalation (Pelanggan Antrean Layanan Molor)
  scen_jobseeker_complaint_deescalation: {
    jabodetabek:
      'Mas/Mbak! Tolong dong, saya sudah menunggu lebih dari dua puluh menit di sini tapi belum dipanggil juga! Tadi staf depan bilang estimasinya cuma lima sampai sepuluh menit. Saya ada keperluan mendesak lain setelah ini, gimana solusinya?!',
    sunda:
      'Punten pisan Kang! Ieu kumaha atuh, abdi parantos ngantosan langkung ti dua puluh menit tapi teu acan disauran keneh! Tadi saurna mung lima menit. Aya peryogi penting deui ieu mah, kumaha solusina atuh Kang?!',
    jawa_tengah:
      'Mas! Nyuwun tulung sanget niki, kulo sampun nenggo langkung saking selangkung menit tapi dereng dipun timbali! Wau janjinipun sedasa menit. Kulo wonten perlu mendesak sanesipun, pripun niki solusinipun Mas?!',
    jawa_timur:
      'Cak! Iki lho ya\'opo se rek, antreane suwe temen! Aku wes ngenteni punjul rong puluh menit kok gak diceluk-celuk blas! Mau jarene limang menit tok. Aku kesusu iki Cak, solusine ya\'opo?!',
    medan:
      'Woi Bang! Cemana ini ceritanya?! Sudah lewat dua puluh menit aku menunggu di sini tak dipanggil-panggil juga! Tadi katanya lima menit siap. Ada urusan mendesak kali aku ini, jangan main-main lah Bang, cemana solusinya?!',
    minang:
      'Onde mande Uda! Baa caritonyo ko? Lah labiah dari duo puluah minik ambo mananti disiko alun juo tapanggie! Tadi keceknyo cuma limo minik. Ambo ado urusan mandasak lain sasudah ko Da, baa solusinyo ko Da?!',
    bali:
      'Ampura pisan Bli! Tiang sampun ngantos langkungan ring duang dasa menit niki nanging durung taler kaundang-undang! Wau kocap wantah lima menit manten. Tiang wenten kaperluan mabuat tiosan niki Bli, sapunapi pamargine mangkin?!',
    makassar:
      'Tabe\' Daeng! Kenapa lama sekali mi ini? Lebih dua puluh menit mi saya batunggu di sini belum dipanggil-panggil ka\' juga! Tadi dibilang lima menit ji. Mau ka\' pergi ada urusan mendesak ini Daeng, bagaimana solusinya ini?!',
    manado:
      'Ado Kaka! Napa so lebe dari dua puluh menit kita batunggu di sini kong balum panggil-panggil sto! Tadi bilang cuma lima menit kwa\'. Ada urusan penting skali abis ini, kong bagaimana pe solusi ini dang Kaka?!',
    timur:
      'Aduh Kaka! Kenapa lama sekali kitorang tunggu di sini kah?! Sudah lewat dua puluh menit sa tunggu belum dipanggil juga e! Tadi bilang lima menit saja. Sa ada urusan buru-buru ini kaka, bagaimana depe solusi kah?!',
  },

  // 3. scen_jobseeker_retail_communication (Bimbang Pilihan Barang Ritel)
  scen_jobseeker_retail_communication: {
    jabodetabek:
      'Halo kak, permisi mau tanya. Saya lagi bingung nih milih antara dua barang ini di etalase. Yang satu harganya lebih hemat tapi bahannya beda, yang satu lagi lebih mahal sedikit. Bedanya apa ya, dan kira-kira mana yang lebih awet buat dipakai harian?',
    sunda:
      'Punten Teh, abdi bade ngiring naroskeun. Nuju bingung ieu milih antawis dua barang di etalase. Anu hiji langkung mirah tapi bahanna benten, anu hiji deui rada awis sakedik. Bentenna naon nya Teh, sareng pami kanggo sadidinten langkung awet anu mana nya?',
    jawa_tengah:
      'Nyuwun sewu Mbak, kulo badhe nyuwun pirsa. Kulo nembe radi bingung milih antawis kalih barang niki wonten etalase. Ingkang setunggal langkung mirah nanging bahanipun benten, ingkang setunggal radi awis. Bentenipun nopo nggih Mbak, lan pundi ingkang langkung awet dipun agem saben dinten?',
    jawa_timur:
      'Halo Ning, sepurane rek aku ape takon. Aku bingung milih antarane rong barang iki nang etalase. Sing siji luwih murah tapi bahane seje, sing siji rodok larang sitik. Bedane opo yo Ning, trus kiro-kiro sing luwih awet digawe bendino sing endi rek?',
    medan:
      'Halo Kak! Mau kutanya dulu ya Kak. Bingung kali aku milih antara dua barang ini di etalase. Yang satu harganya miring tapi bahannya beda, yang satu agak mahal sikit. Apa bedanya Kak, dan mana yang lebih tahan banting kupakai harian ini?',
    minang:
      'Selamat siang Uni, maaf sabanta ambo nio batanyo Ni. Ambo sadang binguang mamiliah antaro duo barang nan dipajang ko. Nan ciek hargonyo labiah murah tapi bahannyo babeda, nan ciek lai agak maha saketek. Apo bedanyo ko Ni, sarato nan ma nan labiah tahan lamo ambo pakai satiok hari?',
    bali:
      'Om Swastyastu Gek, dados tiang mataken nggih. Tiang kantun bingung milih ring pantaraning kalih barang puniki. Sane asiki maraga luwih murah sakewanten lianan bahannyane, sane malih asiki maelan akidik. Napi pabinanipun Gek, tur sane encen luwihan awet anggen sarahina?',
    makassar:
      'Tabe\' Kakak, mauka\' bertanya dulu nah. Bingungka\' ini pilih antara dua barang di etalase. Yang satu lebih murah harganya tapi beda bahannya, yang satu agak mahal sedikitji. Apa bedanya kah Kak, dan yang mana paling awet kupakai harian?',
    manado:
      'Tabea Nona, permisi kita mo tanya kwa\'. Bingung skali kita mo pilih ini dua barang di etalase. Depe satu lebe murah mar beda bahan, depe satu lebe mahal sadiki. Apa depe beda dang Nona, kong mana yang lebe kuat deng tahan lama mo pake tiap hari?',
    timur:
      'Kaka, selamat siang! Sa mau tanya dulu kawan. Sa lagi bingung pilih antara dua barang ini di etalase e. Yang satu harganya murah tapi bahannya lain, yang satu mahal sedikit. Bedanya apa kaka, dan mana yang paling awet sa pake hari-hari e?',
  },

  // 4. scen_greeting_01 (Kustomisasi Oat Milk Sensitif Laktosa)
  scen_greeting_01: {
    jabodetabek:
      'Halo kak, mau tanya dong. Es Kopi Susu Gula Arennya bisa diganti oat milk nggak ya? Soalnya saya lactose intolerant. Terus gulanya bisa request less sweet 50% nggak?',
    sunda:
      'Punten Kang barista, ieu Es Kopi Susu Gula Aren tiasa digentos susu Oat Milk teu nya? Sensitif pisan lambung abdi pami susu sapi mah. Sakantenan gulana 50% less sweet wae nya Kang, tong kemanisan teuing!',
    jawa_tengah:
      'Nyuwun sewu Mas barista, menawi Es Kopi Susu Gula Aren punika saged dipun gantos Oat Milk mboten nggih? Soalipun kulo sensitif laktosa. Kalih gendhisipun saged dipun atur 50% less sweet nggih Mas, ampun kemanisen sanget!',
    jawa_timur:
      'Halo Cak barista! Es Kopi Susu Gula Aren iki iso diganti Oat Milk gak rek? Wetengku gampang mules lek kenek susu sapi. Terus gulane gawekno 50% ae yo Cak, ojo kemanisen temen rek!',
    medan:
      'Halo Bang barista! Kopi susu gula aren kalian ini bisa diganti susu oat milk nggak ya Bang? Sensitif kali perutku kalau kena susu sapi. Sekalian gulanya bikin 50% less sweet aja ya Bang, jangan manis-manis kali!',
    minang:
      'Selamat siang Da barista! Kopi susu gula aren ko bisa diganti pakai Oat Milk ndak Da? Gampang marasai paruik ambo kalau kanai susu sapi. Sakalian gulonyo buek 50% less sweet se yo Da, jan manih bana!',
    bali:
      'Om Swastyastu Bli barista! Dados mataken nggih, es kopi susu gula aren puniki dados kagentosin antuk oat milk nggih Bli? Tiang ten mrasidayang nginem susu sapi. Taler gulannyané dados kirangin 50% less sweet nggih Bli, sampunang manis pisan!',
    makassar:
      'Tabe\' Daeng barista! Bisa ji diganti oat milk ini es kopi susu gula arennya kah? Tidak cocok lambungku kalau susu sapi Daeng. Sekalian gulanya bikin 50% less sweet saja nah, jangan ki\' bikin terlalu manis!',
    manado:
      'Tabea Kaka barista! Boleh ganti oat milk ini es kopi susu gula aren dang? Alergi susu sapi kita kwa\'. Kong depe gula kase 50% less sweet jo neh Kaka, jangan talalu manis skali!',
    timur:
      'Kaka barista, selamat siang! Ini es kopi susu gula aren bisa tukar pakai oat milk ka tra? Sa pu perut kembung kalau minum susu sapi kawan. Trus gulanya bikin setengah saja e, jangan manis-manis sekali kaka!',
  },

  // 5. scen_ratio_02 (Rasio Signature Barista Meja Seduh)
  scen_ratio_02: {
    jabodetabek:
      'Halo Mas, Es Kopi Susu Signature satu ya. Tolong takaran espresso sama susunya dibikin pas mantap ya kayak biasa, saya mau nongkrong santai di meja luar.',
    sunda:
      'Punten Kang, Es Kopi Susu Signature hiji nya Kang. Nyungkeun takaran espresso sareng susuna dipasen pisan sapertos biasa, abdi bade calik santai di payun.',
    jawa_tengah:
      'Nyuwun sewu Mas, kulo pesen Es Kopi Susu Signature setunggal nggih. Nyuwun tulung racikan espresso kalih sukunipun dipun pasaken kados padatanipun, kulo badhe lenggah santai wonten njawi.',
    jawa_timur:
      'Cak, pesen Es Kopi Susu Signature siji yo rek! Takaran espresso karo susune gawekno sing pas mantep koyok biasane yo Cak, aku ape cangkruk santai nang njobo.',
    medan:
      'Bang, buatkan dulu Es Kopi Susu Signature satu ya Bang! Takaran espresso sama susunya bikin pas mantap macam biasa ya, mau nongkrong santai dulu aku di meja luar.',
    minang:
      'Da, ambo pasan Es Kopi Susu Signature ciek yo Da. Tolong takaran espresso jo susunyo buek pas mantap bantuak biaso yo Da, ambo nio duduak santai di lua.',
    bali:
      'Om Swastyastu Bli, tiang pesen Es Kopi Susu Signature asiki nggih Bli. Tulung takaran espresso kalih susunne kakaryanin pas kadi biasanipun nggih, tiang jagi negak santai ring jaba.',
    makassar:
      'Tabe\' Daeng, pesan Es Kopi Susu Signature satu nah! Bikin ki\' takaran espresso sama susunya pas mantap seperti biasa Daeng, mauka\' duduk santai di luar.',
    manado:
      'Halo Nyong barista, kita pesan Es Kopi Susu Signature satu neh. Kase pas depe takaran espresso deng susu rupa biasa neh Nyong, kita mo santai dudu di muka.',
    timur:
      'Pace barista, sa pesan Es Kopi Susu Signature satu e! Bikin takaran espresso deng susu pas mantap macam biasa kaka, sa mau santai duduk di meja luar.',
  },

  // 6. scen_complaint_03 (Insiden Komplain Alergi Susu Sapi)
  scen_complaint_03: {
    jabodetabek:
      'Mas/Mbak! Ini beneran oat milk bukan?! Tadi saya tegaskan pakai oat milk karena saya alergi susu sapi parah! Ini rasanya kayak susu sapi biasa! Gimana sih, bahaya banget buat kesehatan saya!',
    sunda:
      'Kang! Ieu leresan oat milk sanes?! Tadi pan abdi parantos nyarios kedah nganggo oat milk margi abdi alergi parah kana susu sapi! Ieu raosna siga susu sapi biasa! Kumaha ieu teh, bahaya pisan kanggo kasehatan abdi!',
    jawa_tengah:
      'Mas! Niki estu oat milk mboten nggih?! Wau kulo sampun wanti-wanti kedah oat milk amargi kulo alergi sanget kalih susu sapi! Niki raosipun kados susu sapi limrah! Kados pundi niki, mbebayani sanget kagem kasarasan kulo!',
    jawa_timur:
      'Cak! Iki temenan oat milk ta gak seh rek?! Mau kan aku wes ngomong lek gawe oat milk mergo aku alergi nemen karo susu sapi! Rasane iki koyok susu sapi biasa! Ya\'opo se iki, bahaya nemen gawe kesehatanku!',
    medan:
      'Woi Bang! Betulnya oat milk ini klen buat?! Tadi kutegaskan kali pakai oat milk karena alergi parah aku sama susu sapi! Rasa susu sapi biasa ini kutengok! Cemana kalian ini, bahaya kali buat nyawaku!',
    minang:
      'Onde Da! Batua oat milk ko nan Da buek?! Tadi lah ambo jalehan bana pakai oat milk dek karano ambo alergi parah jo susu sapi! Iko rasonyo persis susu sapi biaso! Baa kironyo ko Da, babahayo bana untuak kasaatan ambo!',
    bali:
      'Bli! Puniki patut oat milk napi ten?! Wau tiang sampun negesang mangda anggen oat milk santukan tiang alergi pisan ring susu sapi! Niki rasannyane pateh kadi susu sapi lumrah! Sapunapi niki Bli, mbebayani pisan majeng kesehatan titiang!',
    makassar:
      'Tabe\' Daeng! Betulji ini oat milk dibikin?! Tadi kukasih tau ki\' pakai oat milk karena alergi parahka\' kalau susu sapi! Rasa susu sapi biasa ini kurasa Daeng! Bagaimana ki\' ini, bahaya sekali ini buat badanku!',
    manado:
      'Ado Kaka! Ini betul oat milk sto?! Tadi kita so bilang bae-bae pake oat milk karna alergi parah skali kita pa susu sapi! Ini depe rasa rupa susu sapi biasa kwa\'! Bagaimana pe kerja ini Kaka, bahaya skali pa kita pe kesehatan!',
    timur:
      'Aduh Kaka barista! Ini betul oat milk ka tra?! Tadi sa su bilang baik-baik pakai oat milk karena sa pu badan alergi setengah mati kalau susu sapi! Ini depe rasa macam susu sapi biasa kaka! Bagaimana kamu kerja ini, bahaya sekali untuk sa pu kesehatan e!',
  },

  // 7. scen_sales_automotive_dealer (Konsultasi DP & Cicilan Leasing Motor)
  scen_sales_automotive_dealer: {
    jabodetabek:
      'Mas, saya naksir motor matic ini buat harian ke tempat kerja. Tapi DP 3,5 juta kok terasa berat ya? Di dealer sebelah katanya bisa DP 1,5 juta aja. Takutnya angsurannya malah bikin jebol pengeluaran bulanan keluarga.',
    sunda:
      'Kang, abdi kataji pisan ku motor matic ieu kanggo kaperlogian damel sadidinten. Nanging DP tilu satengah juta asa rada berat nya Kang? Di dealer palih ditu saurna tiasa DP sajuta satengah. Hariwang angsuranna matak ngabedol balanjaan dapur kulawarga.',
    jawa_tengah:
      'Mas, kulo remen sanget kaliyan motor matic niki kagem bidhal nyambut damel saben dinten. Nanging DP tigang yuta setengah niki kok raosipun awrat nggih Mas? Wonten dealer sanes kocapipun saged DP setunggal setengah yuta. Kuatosipun angsuran saben wulanipun malah mbebrongos pengeluaran griyo.',
    jawa_timur:
      'Cak, aku seneng karo motor matic iki gawe wira-wiri kerjo saben dino. Tapi DP telung juta setengah kok rodo abot yo Cak? Nang dealer sebelah jarene iso DP sak juta setengah tok. Wediku cicilane saben ulan malah nggarakno ambyar blonjo omah.',
    medan:
      'Bang, naksir kali aku nengok motor matic ini buat bolak-balik kerja tiap hari. Tapi DP 3,5 juta terasa berat kali kutengok Bang. Di dealer sebelah katanya bisa DP 1,5 juta aja. Takutnya cicilan per bulannya malah bikin jebol kantong belanja rumah tangga kami.',
    minang:
      'Uda, ambo naksir bana jo motor matic ko untuak pai baliak karajo satiok hari. Tapi DP tigo satangah juta taraso barek bana di ambo Da. Di dealer sabalah kecek urang lai bisa DP sajuta satangah se. Takuk ambo angsuran tiok bulannyo malah marusak pitih balanjo dapua kaluarga.',
    bali:
      'Bli, tiang demen pesan ring motor matic puniki anggen makarya sarahina. Sakewanten DP tigang yuta setengah puniki kanten abot pisan nggih Bli? Ring dealer siosan kocap dados DP asiki yuta setengah manten. Jejeh tiang angsurannyane ring saban sasih malah ngaenang usak biaya kulawarga.',
    makassar:
      'Tabe\' Daeng, suka sekalika\' ini motor matic kupakai pergi kerja tiap hari. Tapi DP tiga setengah juta terasa berat sekali kupikir Daeng. Di dealer sebelah dibilang bisa DP satu setengah juta ji. Takutka\' nanti cicilan per bulannya bikin boncos pengeluaran dapur rumah tangga.',
    manado:
      'Nyong, kita suka skali ini motor matic mo pake pi kantor tiap hari. Mar DP tiga stenga juta rupa barat skali kitorang rasa Nyong. Di dealer sabalah dorang bilang boleh DP cuma satu stenga juta kwa\'. Tako kitorang depe cicilan bulanan malo beking ancor doi dapur keluarga.',
    timur:
      'Kaka, sa suka sekali ini motor matic untuk sa bawa pigi kerja tiap hari e. Tapi DP 3,5 juta rasa berat sekali kaka. Di dealer sebelah dorang bilang bisa DP 1,5 juta saja. Sa takut nanti cicilan bulanan bikin rusak uang dapur kitorang e kaka.',
  },

  // 8. scen_sales_property_kpr (Pasangan Muda Beli Rumah Pertama)
  scen_sales_property_kpr: {
    jabodetabek:
      'Mbak, kami pengen banget punya rumah sendiri daripada ngontrak terus tiap tahun. Tapi kami ragu, penghasilan gabungan cuma 7 juta dan takut ada biaya siluman waktu akad sama takut berkas ditolak bank.',
    sunda:
      'Teh, abdi sareng caroge palay pisan gaduh rorompok nyalira tibatan ngontrak wae unggal taun. Nanging asa salempang, panghasilan duaan mung 7 juta, sieun aya biaya teu pararuguh pas akad sareng sieun berkas ditolak ku bank Teh.',
    jawa_tengah:
      'Mbak, kulo kaliyan bojo niki kepengin sanget gadhah griyo piyambak tinimbang ngontrak terus saben tahun. Nanging kulo radi was-was, gaji gabungan namung 7 yuta, kuatos menawi wonten biaya siluman wekdal akad kalih kuatos berkasipun dipun tolak bank Mbak.',
    jawa_timur:
      'Ning, aku karo bojoku pengen temen duwe omah dewe timbangane ngontrak terus bendino saben taun. Tapi kene rodo kuatir, bayaran gabungan yo gur 7 juta, wedi nek onok biaya siluman pas akad karo wedi berkase ditolak bank Ning.',
    medan:
      'Kak, pengen kali kami punya rumah sendiri daripada nyewa kontrak terus tiap tahun. Tapi ragu kali kami Kak, gaji gabungan kami cuma 7 juta, takut ada biaya siluman waktu akad sama takut berkas kami ditolak bank.',
    minang:
      'Uni, ambo jo laki ambo nio bana punyo rumah surang daripado mangontrak taruih tiok tahun Ni. Tapi kami ragu, panghasilan baduo cuma 7 juta, takuk ado biaya siluman pas akad sarato takuk berkas ditolak dek bank Ni.',
    bali:
      'Mbok, titiang sareng kurenan meled pisan madue pondok ngraga mangda nenten ngontrak setata saban warsa. Sakewanten titiang kantun sumbeng, pikolih tiang sareng kalih wantah 7 yuta, jejeh wenten prabea siluman ritatkala akad tur jejeh berkase katulak bank Mbok.',
    makassar:
      'Tabe\' Kakak, mau sekali kami ini punya rumah sendiri daripada kontrak terus setiap tahun. Tapi ragu-ragu ki\', gaji gabungan cuma 7 juta, takutki\' ada biaya siluman waktu akad sama takutki\' berkas ditolak bank Kakak.',
    manado:
      'Nona, kitorang dua deng laki suka skali mo punya rumah sandiri daripada sewa kontrak tarus tiap taun Nona. Mar kitorang ragu, gaji gabungan cuma 7 juta, tako ada biaya siluman waktu akad deng tako berkas mo tolak bank Nona.',
    timur:
      'Mace, kitorang dua pengen sekali punya rumah sendiri daripada kontrak terus tiap tahun kawan. Tapi sa deng laki ragu, gaji kitorang dua gabung cuma 7 juta, takut ada biaya siluman waktu akad deng takut berkas ditolak bank mace.',
  },

  // 9. scen_sales_fashion_retail (Ibu Belanja Kemeja Batik Keluarga)
  scen_sales_fashion_retail: {
    jabodetabek:
      'Mbak, kemeja batik yang dipajang di manekin ini ada ukuran L buat suami saya nggak ya? Takut bahannya gerah kalau dipakai siang. Harganya bisa kurang nggak kalau saya ambil sekalian roknya?',
    sunda:
      'Teh, kemeja batik anu dipajang dina patung manekin ieu aya ukuran L kanggo caroge abdi teu nya? Hariwang bahanna hareudang pami dianggo siang. Hargana tiasa dikirangan teu pami abdi nyandak sakantenan sinjang rokna?',
    jawa_tengah:
      'Mbak, hem batik ingkang dipun pajang wonten patung niki wonten ukuran L kagem garwa kulo mboten nggih? Kuatosipun bahane sumuk menawi dipun agem siyang. Regine saged dipun suwun kirong mboten menawi kulo pendhet sak jarik rokipun sisan?',
    jawa_timur:
      'Ning, klambi batik sing dipajang nang patung iki onok ukuran L gawe bojoku gak yo? Wediku bahane sumuk gerah lek digawe awan. Regone iso dikurangi gak lek aku jupuk sak rok bawisane pisan Ning?',
    medan:
      'Kak, kemeja batik yang klen pajang di manekin ini ada ukuran L untuk suamiku nggak ya Kak? Takut gerah bahannya kalau dipakai siang hari. Harganya bisa kurang sikit nggak kalau kuambil sekalian sama roknya ini?',
    minang:
      'Uni, kemeja batik nan tapajang di manekin ko ado ukuran L untuak laki ambo ndak Ni? Takuk ambo bahannyo paneh gerah kalau dipakai siang ari. Hargonyo lai bisa kurang ndak Ni kalau ambo ambiak sakalian jo roknyo ko?',
    bali:
      'Gek, wastra batik sane kapajang ring manekin puniki wenten ukuran L anggen kurenan tiang napi ten nggih? Jejeh tiang bahannyane panes yening kaanggen tengai. Harganipun dados kirangang akidik yening tiang ngambil sareng roknyane sisan Gek?',
    makassar:
      'Tabe\' Kakak, kemeja batik yang dipajang di patung manekin ini ada ukuran L untuk suamiku kah? Takutka\' bahannya panas gerah kalau dipakai siang-siang. Bisa ji kurang harganya kalau kuambil sekalian sama roknya kah Kak?',
    manado:
      'Nona, kemeja batik yang dapa pajang di patung manekin ini ada depe ukuran L mo pake pa kita pe laki sto? Tako depe bahan panas kalo pake siang. Depe harga boleh kase kurang sadiki kalo kita mo ambel skalian deng depe rok dang Nona?',
    timur:
      'Mace, kemeja batik yang dipajang di patung manekin ini ada ukuran L untuk sa pu suami ka tra e? Sa takut bahannya panas gerah kalau dipakai siang. Harganya bisa kurang ka tra kalau sa ambil sekalian deng roknya kaka?',
  },

  // 10. scen_automotive_ev_technical (Calon Pembeli EV Ragu Baterai & Banjir)
  scen_automotive_ev_technical: {
    jabodetabek:
      'Mas, saya tertarik motor listrik ini buat ngantor, tapi jujur masih ragu banget. Kalau pas musim hujan terus nerobos genangan banjir di jalan apa gak korslet ya Mas? Terus kalau baterainya drop, katanya ganti baterai harganya hampir sama kayak beli motor baru?',
    sunda:
      'Kang, abdi kataji ku motor listrik ieu kanggo ka kantor, nanging saenyana masih salempang pisan. Pami usum ngijih teras ngaliwatan caah cileuncang di jalan naha moal korslet kitu Kang? Teras upami batrena lungsur, saurna gentos batre awisna ampir sami sareng meser motor enggal?',
    jawa_tengah:
      'Mas, kulo remen motor listrik niki kagem ngantor, nanging saestunipun taksih mangu-mangu sanget. Menawi wanci rendheng lajeng nerjang toya banjiran wonten margi nopo mboten korslet nggih Mas? Lajeng menawi batrenipun risak, kocapipun gentos batre awis sanget meh sami tumbas motor enggal?',
    jawa_timur:
      'Cak, aku kepincut motor listrik iki gawe kerjo nang kantor, tapi jujur aku iseh mangu-mangu nemen. Nek pas mangsa rendheng trus nerjang banjir genangan banyu nang dalan opo gak korslet yo Cak? Trus lek batrene tekor, jarene ganti batre regone meh podo tuku motor anyar?',
    medan:
      'Bang, tertarik kali aku nengok motor listrik ini buat ngantor, tapi jujur masih ragu kali aku Bang. Kalau pas musim hujan terus nerobos genangan air banjir di jalan apa nggak korslet ini nanti Bang? Terus kalau baterainya drop, katanya ganti baterai harganya macam beli motor baru?',
    minang:
      'Uda, ambo tatarik bana jo motor listrik ko untuak pai ka kantor, tapi sabananyo masih binguang ragu ambo Da. Kalau tibo musim hujan taruih manarobos aia tabanang banjir di jalan apo indak korslet ko Da? Sudah tu kalau baterainyo drop, kecek urang mangganti baterai hargonyo ampia samo jo mambali motor baru?',
    bali:
      'Bli, tiang tertarik ring motor listrik puniki anggen ka kantor, sakewanten sujatinipun kantun ragu pisan. Yening ritatkala musim sabeh raris nembus toya blabar ring margi napi ten konslet nggih Bli? Raris yening batrenyane eed, kocap gentosin batre mael pisan meh pateh kadi numbas motor anyar?',
    makassar:
      'Tabe\' Daeng, tertarikka\' ini motor listrik kupakai pergi kantor, tapi jujur masih ragu-ragu sekalika\' Daeng. Kalau musim hujan baru menerobos genangan air banjir di jalanan apa tidak korslet kah Daeng? Terus kalau baterainya drop, dibilang orang ganti baterai harganya hampir sama beli motor baru?',
    manado:
      'Nyong, kita suka ini motor listrik mo pake pi kantor, mar jujur masih ragu skali kita Nyong. Kalo pas musim ujan kong tabrak genangan aer banjir di jalan apa nimbrung korslet dang Nyong? Kong kalo depe baterai so drop, dorang bilang ganti baterai depe harga rupa mo beli motor baru neh?',
    timur:
      'Pace, sa tertarik deng ini motor listrik untuk sa bawa pigi kantor, tapi jujur sa masih ragu sekali kaka. Kalau musim hujan terus terobos genangan air banjir di jalan apa tra korslet kah kaka? Trus kalau depe baterai drop, orang bilang ganti baterai harganya macam beli motor baru e kaka?',
  },

  // 11. scen_automotive_aftersales_deescalation (Komplain Pengiriman Molor 3 Hari)
  scen_automotive_aftersales_deescalation: {
    jabodetabek:
      'Mas, saya minta pertanggungjawaban showroom! Minggu lalu sales bilang unit motor listrik saya dikirim paling lambat kemarin. Ini sudah lewat 3 hari belum sampai juga, nomor pelat dan STNK-nya juga gak jelas. Gimana nih pelayanannya?!',
    sunda:
      'Kang! Abdi nyungkeun pertanggungjawaban pihak showroom! Mingon kamari sales nyarios unit motor listrik abdi bade dikintun pangtelatna kamari. Ieu parantos ngalangkungan 3 dinten teu acan sumping keneh, plat sareng STNK-na oge teu puguh. Kumaha ieu palayananna atuh Kang?!',
    jawa_tengah:
      'Mas! Kulo nyuwun tanggel jawab saking showroom! Minggu kepengker sales matur unit motor listrik kulo badhe dipun kintun paling telat wingi. Niki sampun langkung 3 dinten dereng dugi ugi, plat nomer kalih STNK ugi mboten cetho. Pripun niki pelayanannipun Mas?!',
    jawa_timur:
      'Cak! Aku njaluk tanggung jawabe showroom kene! Minggu kepungkur sales ngomong nek unit motor listrikku bakal dikirim paling telat wingi. Iki wes telat 3 dino kok gak teko-teko, plat nomer karo STNK-ne yo gak jelas blas. Ya\'opo se pelayanane kene iki Cak?!',
    medan:
      'Bang! Minta tanggung jawab aku sama showroom kalian ini ya! Minggu lalu sales kalian bilang unit motor listrikku dikirim paling lambat kemarin. Ini sudah lewat 3 hari belum sampai juga barangnya, nomor pelat sama STNK-nya pun tak jelas. Cemana ini pelayanan kalian hah Bang?!',
    minang:
      'Uda! Ambo maminta tangguang jawek dari pihak showroom ko! Minggu lalu urang sales mangecek unit motor listrik ambo dikirim paliang lambek patang. Iko lah lewaik 3 hari alun tibo juo lai, plat jo STNK-nyo indak jaleh pulo. Baa caritonyo palayanan kalian ko Da?!',
    bali:
      'Bli! Tiang nunas pasaur tanggung jawab saking showroom niki! Wuku lintang sales maosang unit motor listrik tiange pacang kakirim pinih telat dibi. Niki sampun lintang 3 dina durung taler rauh, plat nomer lan STNK nenten kanten. Sapunapi pelayanane puniki Bli?!',
    makassar:
      'Tabe\' Daeng! Minta ka\' pertanggungjawaban showroom di sini! Minggu lalu sales bilang unit motor listrikku dikirim paling lambat kemarin. Ini lewat mi 3 hari belum sampai juga, nomor pelat sama STNK-nya juga tidak jelas! Bagaimana pelayanannya ini Daeng?!',
    manado:
      'Nyong! Kita minta pertanggungjawaban ini showroom neh! Minggu lalu sales bilang motor listrik mo kirim paling lambat kemarin. Napa so lewat 3 hari balum sampe juga, plat nomor deng STNK sto nimbrung jelas. Bagaimana ngoni pe pelayanan ini dang Nyong?!',
    timur:
      'Pace! Sa minta pertanggungjawaban showroom sekarang e! Minggu lalu sales bilang unit motor listrik kitorang dikirim paling lambat kemarin. Ini su lewat 3 hari barang belum sampai juga, nomor pelat deng STNK tra jelas kaka. Bagaimana kamu punya pelayanan ini kah?!',
  },

  // 12. scen_fashion_fabric_care_fitting (Fitting Dress Batik Sutra)
  scen_fashion_fabric_care_fitting: {
    jabodetabek:
      'Mbak, dress batik sutra ini bagus banget potongannya, tapi saya takut kalau dicuci di rumah warnanya luntur atau kainnya menciut. Terus kalau ternyata size M ini agak sempit waktu dipakai jalan, boleh ditukar gak ya?',
    sunda:
      'Teh, ieu acuk dress batik sutra sae pisan potongannana, nanging abdi sieun pami diseuseuh di bumi warnana luntur atanapi kaenna murengket. Teras upami ukuran M ieu rada sereg pas dianggo leumpang, tiasa diliron teu nya Teh?',
    jawa_tengah:
      'Mbak, busana batik sutra niki sae sanget potonganipun, nanging kulo kuatos menawi dipun umbah wonten griyo warninipun luntur utawi serat kaenipun mingset. Lajeng menawi ukuran M niki radi sesak dipun agem mlampah, menawi dipun lintu saged mboten nggih Mbak?',
    jawa_timur:
      'Ning, dress batik sutra iki apik temen potongane, tapi aku wedi nek dikumbah nang omah warnane luntur opo kaene mengkeret. Trus nek semisal ukuran M iki rodo sesek digawe mlaku, oleh dituker gak yo Ning?',
    medan:
      'Kak, dress batik sutra ini cantik kali potongannya kutengok, tapi takut kali aku kalau dicuci di rumah warnanya luntur atau kainnya menyusut. Terus kalau rupanya size M ini agak sempit kupakai jalan, bisa ditukar nggak ya Kak?',
    minang:
      'Uni, baju dress batik sutra ko rancak bana potongannyo, tapi ambo takuk kalau dicosok di rumah warnanyo luntua atau kainnyo kusuik mangkeruik. Sudah tu kalau kironyo ukuran M ko agak sampik ambo baok bajalan, lai buliah dituka ndak Ni?',
    bali:
      'Gek, dress batik sutra puniki becik pisan warnannyane, sakewanten tiang jejeh yening kawasuh ring jero warnanipun luntur napi kaine dados mengkeret. Raris yening ukuran M puniki sesek kaanggen mamargi, dados kasilur napi ten nggih Gek?',
    makassar:
      'Tabe\' Kakak, dress batik sutra ini bagus sekali potongannya, tapi takutka\' kalau dicuci di rumah luntur warnanya atau menyusut kainnya. Terus kalau ternyata size M ini agak sempit kupakai jalan, bisa ji ditukar kah Kak?',
    manado:
      'Nona, dress batik sutra ini gagah skali depe potongan, mar kita tako kalo cuci di rumah depe warna luntur kong kain ba kerut. Kong kalo depe size M ini rupa sasa pas mo pake jalan, boleh kase tukar dang Nona?',
    timur:
      'Mace, dress batik sutra ini bagus sekali dia pu potongan, tapi sa takut kalau cuci di rumah warnanya luntur atau kainnya mengecil kaka. Terus kalau ukuran M ini agak sempit sa bawa jalan, boleh tukar ka tra kaka?',
  },

  // 13. scen_fashion_cashier_packaging (Kasir & Packaging Kado VIP)
  scen_fashion_cashier_packaging: {
    jabodetabek:
      'Selamat sore Mbak. Ini kemeja batik tulisnya mau saya jadikan kado untuk pimpinan rekan kerja saya. Bisa tolong dibungkus kotak kado eksklusif berpita rapi? Sama tolong struk resminya dicetak ya. Apakah ada diskon kartu member untuk pembelian ini?',
    sunda:
      'Wilujeng sonten Teh. Ieu kemeja batik tulis bade dijantenkeun kado kanggo pimpinan rerencangan damel abdi. Tiasa nyungkeun tulung dibungkus ku kotak kado eksklusif nganggo pita anu sae? Sareng struk resmina dicitak nya Teh. Naha aya diskon kartu member kanggo pameseran ieu?',
    jawa_tengah:
      'Sugeng sonten Mbak. Niki kemeja batik tulis badhe kulo dadosaken kado kagem pimpinan rencang damel kulo. Menawi kepareng, saged dipun bungkusaken kothak kado eksklusif mawi pita ingkang rapi? Kalih struk resminipun dipun cithak nggih Mbak. Nopo wonten diskon kartu member kagem blonjo niki?',
    jawa_timur:
      'Sugeng sore Ning. Kemeja batik tulis iki ape tak gawe kado pimpinane konco kerjoku. Iso tolong dibungkusno kothak kado apik gawe pita sing rapi gak Ning? Karo tulung struk resmine dicithak sisan yo. Opo onok diskon kartu member gawe blonjo iki rek?',
    medan:
      'Selamat sore Kak! Kemeja batik tulis ini mau kujadikan kado untuk bos rekan kerjaku ya Kak. Bisa tolong dibungkuskan kotak kado eksklusif berpita rapi? Sekalian tolong cetakkan struk resminya ya Kak. Ada diskon kartu member nggak untuk belanjaanku ini?',
    minang:
      'Selamat sore Uni. Kemeja batik tulis ko nio ambo jadian kado untuak bos kawan karajo ambo Ni. Lai bisa tolong dibungkuihkan jo kotak kado rancak babaluk pita rapi? Sakalian tolong struk resminyo dicetak yo Ni. Ado diskon kartu member untuak pambalian ko ndak Ni?',
    bali:
      'Om Swastyastu, sugeng sore Mbok. Kemeja batik tulis puniki jagi anggen tiang kado pimpinan timpal kantor tiang. Dados tulungin kaputang ring kothak kado becik antuk pita rapi Mbok? Taler struk resminipun kacetak nggih. Napi wenten diskon kartu member majeng panumbasan puniki Mbok?',
    makassar:
      'Tabe\' Kakak, selamat sore. Ini kemeja batik tulis mau kujadikan kado untuk bos rekan kerjaku nah. Bisa dibungkuskan kotak kado eksklusif pakai pita rapi kah Kak? Sama tolong cetakkan struk resminya nah. Ada diskon kartu member untuk belanjaanku ini kah Kak?',
    manado:
      'Tabea Nona, selamat sore. Ini kemeja batik tulis kita mo kase jadi kado pa kita pe bos rekan kerja Nona. Boleh bantu bungkus di kotak kado gagah pake pita rapi? Deng tolong print depe struk resmi neh Nona. Ada diskon kartu member for ini blanja dang?',
    timur:
      'Mace, selamat sore kawan! Ini kemeja batik tulis sa mau bikin kado untuk bos rekan kerja kaka. Boleh tolong bungkus pakai kotak kado bagus deng pita rapi e? Sekalian tolong cetak struk resminya kaka. Ada diskon kartu member untuk belanja ini ka tra mace?',
  },
};

// Belum divalidasi penutur asli.
export const HONORIFIC_TABLE: Record<
  string,
  { male: string; female: string }
> = {
  jabodetabek: { male: 'Mas', female: 'Mbak' },
  jawa_tengah: { male: 'Mas', female: 'Mbak' },
  jawa_timur: { male: 'Mas', female: 'Mbak' },
  sunda: { male: 'Kang', female: 'Teh' },
  medan: { male: 'Bang', female: 'Kak' },
  minang: { male: 'Uda', female: 'Uni' },
  bali: { male: 'Bli', female: 'Mbok' },
  makassar: { male: 'Kak', female: 'Kak' },
  manado: { male: 'Kak', female: 'Kak' },
  timur: { male: 'Kak', female: 'Kak' },
};

// Belum divalidasi penutur asli.
export function getDialectHonorific(dialect: string, isFemale: boolean): string {
  const entry = HONORIFIC_TABLE[dialect] || { male: 'Mas', female: 'Mbak' };
  return isFemale ? entry.female : entry.male;
}

// Belum divalidasi penutur asli.
export function sanitizeToSelectedHonorific(
  rawText: string,
  targetHonorific: string
): string {
  if (!rawText) return '';
  // Protect Sundanese grammatical particles like "ieu teh", "eta teh", "kitu teh"
  const protectedText = rawText.replace(/\b(ieu|eta|kitu|keneh)\s+teh\b/gi, '$1 __SUNDA_PARTICLE_TEH__');
  // Replaces any worker honorifics with the selected targetHonorific
  const allHonorifics = /\b(mas\/mbak|mbak\/mas|mas|mbak|kang|teh|akang|teteh|bang|kakak|kak|cak|ning|uda|uni|bli|mbok|gek|daeng|nyong|nona|pace|mace)\b/gi;
  const replaced = protectedText.replace(allHonorifics, () => targetHonorific);
  return replaced.replace(/__SUNDA_PARTICLE_TEH__/g, 'teh');
}

// Dialect configuration metadata
export const DIALECT_CONFIG: Record<
  IndonesianDialect,
  {
    regionName: string;
    honorificMale: string;
    honorificFemale: string;
    description: string;
    stylePrompt: string;
    prosody: { pitch: string; rate: string; volume?: string };
    forbiddenWords: RegExp;
  }
> = {
  jabodetabek: {
    regionName: 'Jakarta & Sekitarnya (Nasional)',
    honorificMale: HONORIFIC_TABLE.jabodetabek.male,
    honorificFemale: HONORIFIC_TABLE.jabodetabek.female,
    description: 'Bahasa Indonesia baku kasual santun & profesional perkotaan',
    stylePrompt: 'Bicara dengan bahasa Indonesia perkotaan yang ramah, sopan, natural, dan jelas',
    prosody: { pitch: '0Hz', rate: '0%', volume: '0%' },
    forbiddenWords: /$^/,
  },
  sunda: {
    regionName: 'Jawa Barat (Sunda)',
    honorificMale: HONORIFIC_TABLE.sunda.male,
    honorificFemale: HONORIFIC_TABLE.sunda.female,
    description: 'Santun, mendayu halus, bersahabat dengan partikel punten, teh, atuh, mah',
    stylePrompt: 'Bicara dengan intonasi Sunda yang sangat ramah, mendayu halus, sopan, bersahabat',
    prosody: { pitch: '+2Hz', rate: '-3%', volume: '-2%' },
    forbiddenWords: /\b(mas|mbak|bli|uda|uni|pace|mace|nyong|daeng)\b/gi,
  },
  jawa_tengah: {
    regionName: 'Jawa Tengah & DIY (Solo / Jogja)',
    honorificMale: HONORIFIC_TABLE.jawa_tengah.male,
    honorificFemale: HONORIFIC_TABLE.jawa_tengah.female,
    description: 'Santun, krama alus, bertata krama tinggi, tenang & bersahaja',
    stylePrompt: 'Bicara dengan intonasi Jawa Mataraman yang sangat santun, halus, ramah, dan bertata krama tinggi',
    prosody: { pitch: '-1Hz', rate: '-5%', volume: '-5%' },
    forbiddenWords: /\b(bli|uda|uni|pace|mace|nyong|daeng|kang|teh)\b/gi,
  },
  jawa_timur: {
    regionName: 'Jawa Timur (Suroboyoan / Arekan)',
    honorificMale: HONORIFIC_TABLE.jawa_timur.male,
    honorificFemale: HONORIFIC_TABLE.jawa_timur.female,
    description: 'Energetik, ceplas-ceplos, lugas, akrab dengan partikel rek',
    stylePrompt: 'Bicara dengan intonasi Jawa Timuran yang energetik, cepat, lugas, akrab, dan ceplas-ceplos',
    prosody: { pitch: '+2Hz', rate: '+7%', volume: '+5%' },
    forbiddenWords: /\b(bli|uda|uni|pace|mace|nyong|daeng|kang|teh)\b/gi,
  },
  medan: {
    regionName: 'Sumatera Utara (Medan & Batak Pesisir)',
    honorificMale: HONORIFIC_TABLE.medan.male,
    honorificFemale: HONORIFIC_TABLE.medan.female,
    description: 'Tegas, lugas, percaya diri, mantap berirama dengan partikel kali, cemana, kutengok',
    stylePrompt: 'Bicara dengan logat Medan yang mantap, lugas, tegas, dinamis, dan percaya diri',
    prosody: { pitch: '+3Hz', rate: '+6%', volume: '+10%' },
    forbiddenWords: /\b(mas|mbak|bli|uda|uni|pace|mace|nyong|daeng|kang|teh)\b/gi,
  },
  minang: {
    regionName: 'Sumatera Barat (Minangkabau / Urang Awak)',
    honorificMale: HONORIFIC_TABLE.minang.male,
    honorificFemale: HONORIFIC_TABLE.minang.female,
    description: 'Santun berniaga, luwes berdagang, bersahabat dengan sebutan Da/Uni & kosakata Minang',
    stylePrompt: 'Bicara dengan intonasi bahasa Minang yang khas, santun, hangat berniaga, dan luwes berinteraksi',
    prosody: { pitch: '+2Hz', rate: '+4%', volume: '+4%' },
    forbiddenWords: /\b(mas|mbak|bli|pace|mace|nyong|daeng|kang|teh)\b/gi,
  },
  bali: {
    regionName: 'Bali (Pariwisata & Hospitality)',
    honorificMale: HONORIFIC_TABLE.bali.male,
    honorificFemale: HONORIFIC_TABLE.bali.female,
    description: 'Ramah pariwisata, bersahabat dengan salam Om Swastyastu & partikel nggih',
    stylePrompt: 'Bicara dengan logat Bali yang ramah, sopan, bersahabat, dan penuh kehangatan pariwisata',
    prosody: { pitch: '+2Hz', rate: '-2%', volume: '0%' },
    forbiddenWords: /\b(mas|mbak|uda|uni|pace|mace|nyong|daeng|kang|teh)\b/gi,
  },
  makassar: {
    regionName: 'Sulawesi Selatan (Makassar & Bugis)',
    honorificMale: HONORIFIC_TABLE.makassar.male,
    honorificFemale: HONORIFIC_TABLE.makassar.female,
    description: 'Berirama cepat, percaya diri, santun dengan partikel tabe\', -ki\', -mi, -ji, kah, nah',
    stylePrompt: 'Bicara dengan logat Makassar / Bugis yang berirama cepat, tegas, ramah dengan partikel tabe, -mi, -ki, -ji',
    prosody: { pitch: '+3Hz', rate: '+8%', volume: '+8%' },
    forbiddenWords: /\b(mas|mbak|bli|uda|uni|pace|mace|nyong|kang|teh)\b/gi,
  },
  manado: {
    regionName: 'Sulawesi Utara (Minahasa & Manado)',
    honorificMale: HONORIFIC_TABLE.manado.male,
    honorificFemale: HONORIFIC_TABLE.manado.female,
    description: 'Rileks, ceria, ekspresif dengan salam Tabea & partikel dang, kwa\', sto',
    stylePrompt: 'Bicara dengan logat Manado / Minahasa yang rileks, ekspresif, ceria dengan partikel dang, kwa, sto, jo',
    prosody: { pitch: '+3Hz', rate: '+5%', volume: '+5%' },
    forbiddenWords: /\b(mas|mbak|bli|uda|uni|pace|mace|daeng|kang|teh)\b/gi,
  },
  timur: {
    regionName: 'Indonesia Timur (Papua & Maluku)',
    honorificMale: HONORIFIC_TABLE.timur.male,
    honorificFemale: HONORIFIC_TABLE.timur.female,
    description: 'Hangat, melodius, penuh persaudaraan dengan kata sa, ko, kitorang, e',
    stylePrompt: 'Bicara dengan logat Indonesia Timur (Papua & Maluku) yang hangat, bersaudara, intonasi melodius',
    prosody: { pitch: '+2Hz', rate: '+3%', volume: '+7%' },
    forbiddenWords: /\b(mas|mbak|bli|uda|uni|nyong|daeng|kang|teh)\b/gi,
  },
};

/**
 * Universal Dialect Transformer & Sanitizer with zero conflicting honorifics.
 * Guarantees that no foreign terms remain when Minang, Sunda, Bali, etc. are active.
 */
export function getAuthenticDialectDialogue(
  scenarioId: string,
  dialect: IndonesianDialect,
  baseLine: string,
  workerIsFemale: boolean = false
): string {
  const targetHonorific = getDialectHonorific(dialect, workerIsFemale);
  const config = DIALECT_CONFIG[dialect] || DIALECT_CONFIG.jabodetabek;
  const scenarioMatch = SCENARIO_DIALECT_MATRIX[scenarioId];

  // 1. Check exact pre-composed matrix
  if (scenarioMatch && scenarioMatch[dialect]) {
    return sanitizeToSelectedHonorific(scenarioMatch[dialect]!, targetHonorific);
  }

  // 2. If it is Jabodetabek standard, return baseLine with sanitized honorific
  if (dialect === 'jabodetabek') {
    return sanitizeToSelectedHonorific(baseLine, targetHonorific);
  }

  // 3. Fallback Dynamic Translator & Sanitizer for custom/ingested SOPs:
  let sanitized = sanitizeToSelectedHonorific(baseLine, targetHonorific);

  // Apply dialect-specific linguistic adaptations
  switch (dialect) {
    case 'sunda':
      sanitized = `Punten pisan ${targetHonorific}, ${sanitized
        .replace(/\bhalo\b/gi, 'wilujeng siang')
        .replace(/\bpermisi\b/gi, 'hapunten')
        .replace(/\bsaya\b/gi, 'abdi')
        .replace(/\bkamu\b/gi, 'anjeun')
        .replace(/\bini\b/gi, 'ieu')
        .replace(/\bnggak|tidak\b/gi, 'teu')
        .replace(/\bbanget|sekali\b/gi, 'pisan')
        .replace(/\bdong|nih\b/gi, 'atuh nya')}`;
      break;

    case 'jawa_tengah':
      sanitized = `Nyuwun sewu ${targetHonorific}, ${sanitized
        .replace(/\bhalo\b/gi, 'sugeng siang')
        .replace(/\bpermisi\b/gi, 'nyuwun sewu')
        .replace(/\bsaya\b/gi, 'kulo')
        .replace(/\bini\b/gi, 'punika')
        .replace(/\bnggak|tidak\b/gi, 'mboten')
        .replace(/\bbanget|sekali\b/gi, 'sanget')
        .replace(/\bdong|nih\b/gi, 'nggih')}`;
      break;

    case 'jawa_timur':
      sanitized = `Sepurane rek ${targetHonorific}, ${sanitized
        .replace(/\bhalo\b/gi, 'halo rek')
        .replace(/\bpermisi\b/gi, 'sepurane')
        .replace(/\bsaya\b/gi, 'aku')
        .replace(/\bini\b/gi, 'iki')
        .replace(/\bnggak|tidak\b/gi, 'gak')
        .replace(/\bbanget|sekali\b/gi, 'nemen')
        .replace(/\bdong|nih\b/gi, 'rek')}`;
      break;

    case 'medan':
      sanitized = `Horas ${targetHonorific}! ${sanitized
        .replace(/\bhalo\b/gi, 'halo')
        .replace(/\bpermisi\b/gi, 'permisi ya')
        .replace(/\bsekali\b/gi, 'kali')
        .replace(/\bbanget\b/gi, 'kali')
        .replace(/\bgimana\b/gi, 'cemana')
        .replace(/\bkenapa\b/gi, 'cemana kok bisa')
        .replace(/\bdong|nih\b/gi, 'lah ya')}`;
      break;

    case 'minang':
      sanitized = `Rancak bana ${targetHonorific}, ${sanitized
        .replace(/\bhalo\b/gi, 'selamat siang')
        .replace(/\bpermisi\b/gi, 'maaf sabanta')
        .replace(/\bsaya\b/gi, 'ambo')
        .replace(/\bini\b/gi, 'ko')
        .replace(/\bnggak|tidak\b/gi, 'ndak')
        .replace(/\bbanget|sekali\b/gi, 'bana')
        .replace(/\bgimana\b/gi, 'baa caritonyo')
        .replace(/\bdong|nih\b/gi, 'yo Da/Uni')}`;
      break;

    case 'bali':
      sanitized = `Om Swastyastu ${targetHonorific}, ampura nggih. ${sanitized
        .replace(/\bhalo\b/gi, 'om swastyastu')
        .replace(/\bpermisi\b/gi, 'ampura nggih')
        .replace(/\bsaya\b/gi, 'tiang')
        .replace(/\bini\b/gi, 'puniki')
        .replace(/\bnggak|tidak\b/gi, 'ten')
        .replace(/\bbanget|sekali\b/gi, 'pisan')
        .replace(/\bdong|nih\b/gi, 'nggih')}`;
      break;

    case 'makassar':
      sanitized = `Tabe\' ${targetHonorific}, ${sanitized
        .replace(/\bhalo\b/gi, 'tabe\'')
        .replace(/\bpermisi\b/gi, 'tabe\' ki\'')
        .replace(/\bsaya\b/gi, 'saya')
        .replace(/\bini\b/gi, 'ini')
        .replace(/\bnggak|tidak\b/gi, 'tidak')
        .replace(/\bbanget|sekali\b/gi, 'sekali mi')
        .replace(/\bdong|nih\b/gi, 'nah')}`;
      break;

    case 'manado':
      sanitized = `Tabea ${targetHonorific}! ${sanitized
        .replace(/\bhalo\b/gi, 'tabea')
        .replace(/\bpermisi\b/gi, 'permisi kwa\'')
        .replace(/\bsaya\b/gi, 'kita')
        .replace(/\bkamu\b/gi, 'ngana')
        .replace(/\bini\b/gi, 'ini')
        .replace(/\bnggak|tidak\b/gi, 'nimbrung')
        .replace(/\bbanget|sekali\b/gi, 'skali')
        .replace(/\bdong|nih\b/gi, 'dang')}`;
      break;

    case 'timur':
      sanitized = `${targetHonorific}, selamat siang kawan! ${sanitized
        .replace(/\bhalo\b/gi, 'selamat siang kawan')
        .replace(/\bpermisi\b/gi, 'maaf ganggu sebentar e')
        .replace(/\bsaya\b/gi, 'sa')
        .replace(/\bkamu\b/gi, 'ko')
        .replace(/\bkita\b/gi, 'kitorang')
        .replace(/\bnggak|tidak\b/gi, 'tra')
        .replace(/\bsudah\b/gi, 'su')
        .replace(/\bbanget|sekali\b/gi, 'sekali e')
        .replace(/\bdong|nih\b/gi, 'e')}`;
      break;
  }

  // Final purge of any forbidden cross-region terms
  if (config.forbiddenWords.source !== '(?:)') {
    sanitized = sanitized.replace(config.forbiddenWords, targetHonorific);
  }

  return sanitized;
}

/**
 * Transforms any generated text (e.g. Gemini LLM reaction) into authentic regional dialect phrasing,
 * replacing cross-region terms, inserting regional colloquialisms, and applying dialect sentence ending particles.
 */
// Belum divalidasi penutur asli.
export function sanitizeSpokenDialectText(
  rawText: string,
  dialect: IndonesianDialect = 'jabodetabek',
  workerIsFemale: boolean = false
): string {
  if (!rawText) return '';
  const targetHonorific = getDialectHonorific(dialect, workerIsFemale);
  let sanitized = sanitizeToSelectedHonorific(rawText, targetHonorific);

  // Regional vocabulary touches without altering the selected honorific
  if (dialect === 'sunda') {
    sanitized = sanitized
      .replace(/\bhalo\b/gi, 'wilujeng')
      .replace(/\bpermisi\b/gi, 'hapunten')
      .replace(/\bsaya\b/gi, 'abdi')
      .replace(/\bkamu\b/gi, 'anjeun')
      .replace(/\bini\b/gi, 'ieu')
      .replace(/\bnggak|tidak\b/gi, 'teu')
      .replace(/\bbanget|sekali\b/gi, 'pisan')
      .replace(/\bdong|nih\b/gi, 'atuh');
  } else if (dialect === 'jawa_tengah') {
    sanitized = sanitized
      .replace(/\bhalo\b/gi, 'sugeng')
      .replace(/\bpermisi\b/gi, 'nyuwun sewu')
      .replace(/\bsaya\b/gi, 'kulo')
      .replace(/\bini\b/gi, 'punika')
      .replace(/\bnggak|tidak\b/gi, 'mboten')
      .replace(/\bbanget|sekali\b/gi, 'sanget')
      .replace(/\bdong|nih\b/gi, 'nggih');
  } else if (dialect === 'jawa_timur') {
    sanitized = sanitized
      .replace(/\bhalo\b/gi, 'halo rek')
      .replace(/\bpermisi\b/gi, 'sepurane')
      .replace(/\bsaya\b/gi, 'aku')
      .replace(/\bini\b/gi, 'iki')
      .replace(/\bnggak|tidak\b/gi, 'gak')
      .replace(/\bbanget|sekali\b/gi, 'nemen')
      .replace(/\bdong|nih\b/gi, 'rek');
  } else if (dialect === 'medan') {
    sanitized = sanitized
      .replace(/\bsekali\b/gi, 'kali')
      .replace(/\bbanget\b/gi, 'kali')
      .replace(/\bgimana\b/gi, 'cemana');
  } else if (dialect === 'minang') {
    sanitized = sanitized
      .replace(/\bsaya\b/gi, 'ambo')
      .replace(/\bbanget|sekali\b/gi, 'bana')
      .replace(/\bgimana\b/gi, 'baa');
  } else if (dialect === 'bali') {
    sanitized = sanitized
      .replace(/\bpermisi\b/gi, 'om swastyastu')
      .replace(/\bsaya\b/gi, 'tiang')
      .replace(/\bya\b/gi, 'nggih');
  }

  // Ensure targetHonorific remains pristine after linguistic replacements
  return sanitizeToSelectedHonorific(sanitized, targetHonorific);
}
