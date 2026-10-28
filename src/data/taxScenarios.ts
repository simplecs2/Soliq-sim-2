import { CharacterProfile, Perk, TaxScenario } from '../types/game';

// Asset paths from generate_image
export const AVATAR_IMAGE_PATH = '/src/assets/images/soliq_character_avatar_1791989659533.jpg';
export const EMBLEM_IMAGE_PATH = '/src/assets/images/soliq_hero_emblem_1791989657788.jpg';

export const INITIAL_CHARACTERS: CharacterProfile[] = [
  {
    id: 'azizbek',
    name: 'Azizbek Qodirov',
    role: 'it_freelance',
    title: 'Veb-dasturchi & TATU talabasi',
    avatar: AVATAR_IMAGE_PATH,
    university: 'Toshkent Axborot Texnologiyalari Universiteti (3-kurs)',
    description: 'Xorijiy va mahalliy startaplar uchun frontend va botlar ishlab chiqadi. O\'zini o\'zi band qilgan frilanser.',
    isSelfEmployed: true,
    hasYaTT: false,
  },
  {
    id: 'madina',
    name: 'Madina Yusupova',
    role: 'design',
    title: 'UI/UX Dizayner & Talaba',
    avatar: AVATAR_IMAGE_PATH,
    university: 'Milliy rassomlik va dizayn instituti (2-kurs)',
    description: 'Mobil ilovalar va brending uchun dizaynlar chizadi. Dribbble va Behance orqali buyurtmalar oladi.',
    isSelfEmployed: true,
    hasYaTT: false,
  },
  {
    id: 'jasur',
    name: 'Jasur Aliyev',
    role: 'smm_copywriting',
    title: 'SMM Mutaxassisi & Repetitor',
    avatar: AVATAR_IMAGE_PATH,
    university: 'O\'zbekiston Milliy Universiteti (4-kurs)',
    description: 'Brendlar uchun kontent yaratadi, shuningdek abituriyentlarga ingliz tilidan dars beradi.',
    isSelfEmployed: true,
    hasYaTT: false,
  },
  {
    id: 'shahzoda',
    name: 'Shahzoda Karimova',
    role: 'marketplace',
    title: 'Marketpleys sotuvchisi & Talaba',
    avatar: AVATAR_IMAGE_PATH,
    university: 'TDIU Xalqaro iqtisodiyot fakulteti (2-kurs)',
    description: 'Uzum Market orqali o\'quv qurollari va suvenirlar sotadi. YaTT sifatida faoliyat yuritadi.',
    isSelfEmployed: false,
    hasYaTT: true,
  },
];

export const INITIAL_PERKS: Perk[] = [
  {
    id: 'perk_student_loan',
    title: 'Imtiyozli Ta\'lim Krediti',
    description: 'Yuqori soliq reytingi hisobiga past foizli (14%) davlat ta\'lim krediti olish huquqi ochildi.',
    icon: 'GraduationCap',
    requiredRating: 40,
    isUnlocked: false,
    benefitText: 'Har bir to\'g\'ri soliq to\'loviga +10% ko\'proq bonus ball beriladi.',
  },
  {
    id: 'perk_green_channel',
    title: 'Yagona Darcha Yashil Yo\'lagi',
    description: 'Mas\'uliyatli soliq to\'lovchi sifatida my.soliq.uz va davlat xizmatlarida navbatsiz tezkor xizmat.',
    icon: 'ShieldCheck',
    requiredRating: 60,
    isUnlocked: false,
    benefitText: 'Soliq xatolarida jarima 30% ga kamaytiriladi.',
  },
  {
    id: 'perk_cashback_boost',
    title: 'Keshbek Multiplikatori 2X',
    description: 'Soliq.uz ilovasi fiskal cheklaridan keladigan keshbeklar hajmi ikki baravar ko\'payadi.',
    icon: 'Sparkles',
    requiredRating: 75,
    isUnlocked: false,
    benefitText: 'Har kungi daromadga +150,000 so\'m keshbek qo\'shiladi.',
  },
  {
    id: 'perk_safe_bank',
    title: 'Himoyalangan Bank Hisobi',
    description: 'Bank hisobingiz soliq idorasi blokirovkalaridan to\'liq sug\'urtalandi.',
    icon: 'Lock',
    requiredRating: 85,
    isUnlocked: false,
    benefitText: 'Hisob raqamingiz hech qachon bloklanmaydi.',
  },
  {
    id: 'perk_startup_grant',
    title: 'Yoshlar Startap Granti Nomzodi',
    description: 'Oliy darajadagi soliq madaniyati uchun Yoshlar ishlari agentligi 15 mln so\'mlik grantiga tavsiya.',
    icon: 'Award',
    requiredRating: 95,
    isUnlocked: false,
    benefitText: 'Boshlang\'ich kapitalga +5,000,000 so\'m mukofot.',
  },
];

export const TAX_SCENARIOS: TaxScenario[] = [
  {
    id: 'sc_01',
    dayNumber: 1,
    dayName: 'Dushanba',
    title: 'Chet el kompaniyasiga veb-sayt tayyorlash',
    category: 'frilans',
    story: 'Siz AQSh startapiga Figma maketini React saytga o\'girib berdingiz va 5,000,000 so\'m gonorar oldingiz. Siz "O\'zini o\'zi band qilgan shaxs" sifatida ro\'yxatdan o\'tgansiz. To\'lanishi lozim bo\'lgan soliq summasini aniqlang.',
    grossAmount: 5000000,
    correctTaxAmount: 0,
    correctOptionIndex: 0,
    options: [
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'O\'zini o\'zi band qilgan shaxslarning xizmat ko\'rsatish daromadiga JSHODS 0% stavkada hisoblanadi.',
      },
      {
        text: '600,000 so\'m',
        amount: 600000,
        explanation: 'Bu oddiy xodimlar yoki GPH shartnomasi uchun hisoblangan miqdor.',
      },
      {
        text: '200,000 so\'m',
        amount: 200000,
        explanation: 'Bu YaTTlar aylanma solig\'i stavkasi, frilanser uchun emas.',
      },
      {
        text: '1,000,000 so\'m',
        amount: 1000000,
        explanation: 'O\'zbekistonda xorijiy frilans daromadiga 20% soliq qo\'llanilmaydi.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 369-modda va PQ-4755-son qaror',
    lawSummary: 'O\'zini o\'zi band qilgan shaxslar jismoniy va yuridik shaxslarga xizmat ko\'rsatishdan olingan daromadlari bo\'yicha jismoniy shaxslardan olinadigan daromad solig\'idan (JSHODS) to\'liq ozod etilgan! Pensiya staji uchun yiliga ixtiyoriy 1 BHM ijtimoiy soliq to\'lanadi.',
    penaltyIfWrong: 250000,
    bonusIfRight: 200000,
    tip: 'O\'zini o\'zi band qilgan frilanserlar uchun daromad solig\'i 0%!',
  },
  {
    id: 'sc_02',
    dayNumber: 2,
    dayName: 'Seshanba',
    title: 'Mahalliy MChJ bilan GPH shartnomasi',
    category: 'gph',
    story: 'Toshkentdagi "Creative Media" MChJ buyurtmasi bilan reklama roligi montaj qildingiz. Kompaniya bilan fuqarolik-huquqiy shartnoma (GPH) tuzdingiz. Hisobingizga 4,000,000 so\'m yozildi. To\'lanishi lozim bo\'lgan soliq summasini aniqlang.',
    grossAmount: 4000000,
    correctTaxAmount: 480000,
    correctOptionIndex: 1,
    options: [
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'GPH shartnomasi bo\'yicha to\'langan gonorardan soliq to\'lanishi shart.',
      },
      {
        text: '480,000 so\'m',
        amount: 480000,
        explanation: 'To\'g\'ri! 4,000,000 * 12% = 480,000 so\'m daromad solig\'i ushlab qolinadi.',
      },
      {
        text: '160,000 so\'m',
        amount: 160000,
        explanation: 'GPH shartnomasida tadbirkorlik aylanma solig\'i qo\'llanilmaydi.',
      },
      {
        text: '960,000 so\'m',
        amount: 960000,
        explanation: 'O\'zbekistonda 24% lik daromad solig\'i stavkasi mavjud emas.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 381-modda',
    lawSummary: 'O\'zbekiston Respublikasida jismoniy shaxslardan olinadigan daromad solig\'ining (JSHODS) yagona bazaviy stavkasi 12 foizni tashkil etadi. Korxona soliq agenti sifatida ushbu mablag\'ni to\'lov vaqtida ushlab qoladi.',
    penaltyIfWrong: 300000,
    bonusIfRight: 250000,
    tip: 'GPH shartnomasida daromad solig\'i 12% ni tashkil qiladi.',
  },
  {
    id: 'sc_03',
    dayNumber: 3,
    dayName: 'Chorshanba',
    title: 'Universitet kontrakt to\'lovi (Soliq chegirmasi!)',
    category: 'kontrakt',
    isDeduction: true,
    story: 'Siz o\'zingiz o\'qiydigan oliy o\'quv yurti uchun frilansdan yiqqan 10,000,000 so\'m kontrakt to\'ladingiz. Soliq kodeksining 378-moddasi bo\'yicha davlatdan qancha soliq imtiyozi (chegirmasi) qaytarib olasiz?',
    grossAmount: 10000000,
    correctTaxAmount: 1200000, // 12% rebate returned back to student!
    correctOptionIndex: 2,
    options: [
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Qonunchilikda talabalar uchun maxsus soliq imtiyozi bor!',
      },
      {
        text: '500,000 so\'m',
        amount: 500000,
        explanation: 'Imtiyoz qat\'iy summa emas, foizga bog\'liq.',
      },
      {
        text: '1,200,000 so\'m',
        amount: 1200000,
        explanation: 'Ajoyib! Kontraktga to\'langan 10 mln so\'m daromad solig\'idan ozod etiladi, ya\'ni 12% qaytariladi.',
      },
      {
        text: '2,000,000 so\'m',
        amount: 2000000,
        explanation: 'JSHODS stavkasi 12%, shuning uchun 12% gacha qaytariladi.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 378-modda 16-bandi',
    lawSummary: 'Fuqarolarning O\'zbekiston OTMlarida o\'zining, shuningdek 26 yoshga to\'lmagan farzandlarining yoki turmush o\'rtog\'ining ta\'lim olishi uchun yo\'naltirilgan daromadlariga soliq solinmaydi! To\'langan kontrakt summasining 12%i davlat byudjetidan qaytariladi.',
    penaltyIfWrong: 200000,
    bonusIfRight: 400000,
    tip: 'Kontrakt to\'laganingizda Soliq.uz orqali 12% summani qaytarib olishingiz mumkin!',
  },
  {
    id: 'sc_04',
    dayNumber: 4,
    dayName: 'Payshanba',
    title: 'Marketpleysda mahsulot sotish (YaTT faoliyati)',
    category: 'savdo',
    story: 'Siz Yakka tartibdagi tadbirkor (YaTT) sifatida Uzum Market platformasida mahsulotlar sotdingiz. Bir oylik tushumingiz 15,000,000 so\'m bo\'ldi. Aylanmadan olinadigan soliqni hisoblang.',
    grossAmount: 15000000,
    correctTaxAmount: 600000,
    correctOptionIndex: 0,
    options: [
      {
        text: '600,000 so\'m',
        amount: 600000,
        explanation: 'To\'g\'ri! YaTT umumiy savdo tushumidan 4% aylanmadan olinadigan soliq to\'laydi (15 mln * 4% = 600 ming).',
      },
      {
        text: '1,800,000 so\'m',
        amount: 1800000,
        explanation: 'YaTTlar jismoniy shaxs maoshi kabi 12% to\'lamaydi, aylanma solig\'i 4% hisoblanadi.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Marketpleysdagi savdo tijorat faoliyati bo\'lib, soliq to\'lanadi.',
      },
      {
        text: '300,000 so\'m',
        amount: 300000,
        explanation: 'Savdo faoliyatida standart aylanma solig\'i 4% ni tashkil etadi.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 467-modda',
    lawSummary: 'Aylanmadan olinadigan soliq to\'lovchilari bo\'lgan yakka tartibdagi tadbirkorlar va yuridik shaxslar uchun tovarlarni sotish (chakana savdo) faoliyatida bazaviy soliq stavkasi 4 foiz etib belgilangan.',
    penaltyIfWrong: 350000,
    bonusIfRight: 300000,
    tip: 'Savdo faoliyati bilan shug\'ullanuvchi YaTTlar uchun aylanma solig\'i 4%!',
  },
  {
    id: 'sc_05',
    dayNumber: 5,
    dayName: 'Juma',
    title: 'Uyda repetitorlik xizmati ko\'rsatish',
    category: 'repetitorlik',
    story: 'Siz abituriyentlarga ingliz tili va matematika fanidan dars o\'tdingiz va ota-onalardan jami 3,500,000 so\'m haq oldingiz. Siz Soliq ilovasida o\'zini o\'zi band qilgan shaxs sifatida ro\'yxatdan o\'tgansiz. To\'lanishi lozim bo\'lgan soliqni aniqlang.',
    grossAmount: 3500000,
    correctTaxAmount: 0,
    correctOptionIndex: 3,
    options: [
      {
        text: '420,000 so\'m',
        amount: 420000,
        explanation: 'Repetitorlik o\'zini o\'zi band qilish turlariga kiradi va daromad solig\'idan ozod.',
      },
      {
        text: '140,000 so\'m',
        amount: 140000,
        explanation: 'O\'zini o\'zi band qilgan repetitorlar aylanma solig\'i to\'lamaydi.',
      },
      {
        text: '350,000 so\'m',
        amount: 350000,
        explanation: 'O\'zbekistonda 10% lik ta\'lim solig\'i mavjud emas.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'To\'ppa-to\'g\'ri! Repetitorlik o\'zini o\'zi band qilish faoliyati turi bo\'lib, daromad solig\'i 0%.',
      },
    ],
    lawArticle: 'PQ-4755-son qaror va Soliq kodeksi, 369-modda',
    lawSummary: 'O\'zbekiston Respublikasi Prezidentining PQ-4755-son qaroriga asosan, "Uyda repetitorlik qilish" o\'zini o\'zi band qilish faoliyat turlari ro\'yxatiga kiritilgan bo\'lib, olingan daromadlar jismoniy shaxslar daromad solig\'idan butunlay ozod etilgan.',
    penaltyIfWrong: 200000,
    bonusIfRight: 250000,
    tip: 'Repetitorlik o\'zini o\'zi band qilish ro\'yxatida bor, daromad solig\'i 0 so\'m!',
  },
  {
    id: 'sc_06',
    dayNumber: 6,
    dayName: 'Shanba',
    title: 'IT Park rezidenti startapida masofaviy dasturlash',
    category: 'it_park',
    story: 'Siz IT Park rezidenti maqomiga ega bo\'lgan IT startapda dasturchi bo\'lib 8,000,000 so\'m maosh oldingiz. Byudjetga to\'lanishi lozim bo\'lgan daromad solig\'ini (JSHODS) aniqlang.',
    grossAmount: 8000000,
    correctTaxAmount: 600000, // 7.5% preferential rate! 8m * 0.075 = 600,000 UZS
    correctOptionIndex: 1,
    options: [
      {
        text: '960,000 so\'m',
        amount: 960000,
        explanation: 'IT Park rezidentlari xodimlari uchun maxsus imtiyozli pasaytirilgan stavka mavjud!',
      },
      {
        text: '600,000 so\'m',
        amount: 600000,
        explanation: 'Ofarin! IT Park rezidenti xodimlarining daromadlariga 7.5% imtiyozli soliq stavkasi qo\'llaniladi.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Kompaniya xodimi uchun 0% emas, 7.5% imtiyozli stavka amalda.',
      },
      {
        text: '320,000 so\'m',
        amount: 320000,
        explanation: '4% bu aylanma solig\'i, jismoniy shaxs daromad solig\'i emas.',
      },
    ],
    lawArticle: 'PF-5099-son Farmon va Soliq kodeksi',
    lawSummary: 'IT Park rezidentlarining ish haqi va mehnatga haq to\'lash tarzidagi daromadlari jismoniy shaxslardan olinadigan daromad solig\'iga 7.5 foiz (umumiy 12% o\'rniga) imtiyozli stavka bo\'yicha tortiladi.',
    penaltyIfWrong: 250000,
    bonusIfRight: 350000,
    tip: 'IT Park rezidenti xodimlari uchun JSHODS 12% emas, balki 7.5%!',
  },
  {
    id: 'sc_07',
    dayNumber: 7,
    dayName: 'Yakshanba',
    title: 'Eski noutbukni sotish',
    category: 'boshqa',
    story: 'Yangi kompyuter olish uchun o\'zingiz 2 yil ishlatgan shaxsiy noutbukingizni e\'lonlar doskasi orqali 4,500,000 so\'mga boshqa talabaga sotdingiz. To\'lanishi lozim bo\'lgan soliqni aniqlang.',
    grossAmount: 4500000,
    correctTaxAmount: 0,
    correctOptionIndex: 0,
    options: [
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'To\'g\'ri! Fuqarolarning o\'ziga tegishli bo\'lgan shaxsiy mol-mulkini sotish daromad solig\'iga tortilmaydi.',
      },
      {
        text: '540,000 so\'m',
        amount: 540000,
        explanation: 'Shaxsiy buyumlar savdosi tadbirkorlik hisoblanmaydi.',
      },
      {
        text: '180,000 so\'m',
        amount: 180000,
        explanation: 'Eski buyum sotish uchun aylanma solig\'i to\'lanmaydi.',
      },
      {
        text: '225,000 so\'m',
        amount: 225000,
        explanation: 'Bunday soliq stavkasi yo\'q.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 378-modda 7-bandi',
    lawSummary: 'Jismoniy shaxslarga xususiy mulk huquqi asosida tegishli bo\'lgan mol-mulkni sotishdan olingan daromadlar soliq solishdan ozod qilinadi (qimmatli qog\'ozlar, noturar joylar va 36 oydan kam egalik qilingan turar joylar bundan mustasno).',
    penaltyIfWrong: 200000,
    bonusIfRight: 200000,
    tip: 'Shaxsiy foydalanishdagi eski buyumlarni sotganda soliq to\'lanmaydi!',
  },
  {
    id: 'sc_08',
    dayNumber: 8,
    dayName: 'Dushanba',
    title: 'Telegramda reklama berishdan ro\'yxatdan o\'tmagan daromad',
    category: 'boshqa',
    story: 'Siz Telegram kanalingizga reklama joylab kartangizga 3,000,000 so\'m qabul qildingiz, biroq soliq organlarida hech qanday ro\'yxatdan o\'tmadingiz. Yillik deklaratsiya bo\'yicha to\'lanishi lozim bo\'lgan soliq summasini aniqlang.',
    grossAmount: 3000000,
    correctTaxAmount: 360000,
    correctOptionIndex: 2,
    options: [
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Xato! Kartaga kelgan daromadlar soliq nazoratida ko\'rinishi va jarimaga olib kelishi mumkin.',
      },
      {
        text: '120,000 so\'m',
        amount: 120000,
        explanation: 'Ro\'yxatdan o\'tmagan jismoniy shaxs tadbirkorlik stavkasidan foydalana olmaydi.',
      },
      {
        text: '360,000 so\'m',
        amount: 360000,
        explanation: 'To\'g\'ri! Ro\'yxatdan o\'tmagan boshqa daromadlar uchun 12% JSHODS bo\'yicha yillik deklaratsiya topshiriladi.',
      },
      {
        text: '1,500,000 so\'m',
        amount: 150000,
        explanation: 'Qonuniy deklaratsiyada stavka 12% ni tashkil qiladi.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 397-modda va 227-modda',
    lawSummary: 'Soliq agenti bo\'lmagan manbalardan daromad olgan jismoniy shaxslar keyingi yilning 1-apreliga qadar jami yillik daromadlari to\'g\'risida deklaratsiya taqdim etishlari va 12% stavkada soliq to\'lashlari shart. Noqonuniy faoliyat uchun jarimalar qo\'llaniladi.',
    penaltyIfWrong: 400000,
    bonusIfRight: 250000,
    tip: 'Boshqa manbalardan daromad olganda yillik 12% deklaratsiya topshiriladi.',
  },
  {
    id: 'sc_09',
    dayNumber: 9,
    dayName: 'Seshanba',
    title: 'Soliq.uz ilovasida 1% fiskal chek keshbeki',
    category: 'keshbek',
    story: 'Siz supermarket va dorixonalardagi QR-kodli fiskal cheklarni Soliq ilovasida skanerlab 350,000 so\'m keshbek yig\'dingiz va kartangizga o\'tkazdingiz. To\'lanishi lozim bo\'lgan soliq summasini aniqlang.',
    grossAmount: 350000,
    correctTaxAmount: 0,
    correctOptionIndex: 0,
    options: [
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Barakalla! Davlat tomonidan rag\'batlantiruvchi 1% keshbek daromad solig\'iga tortilmaydi.',
      },
      {
        text: '42,000 so\'m',
        amount: 42000,
        explanation: 'Xato, keshbek rag\'batlantirish instrumenti bo\'lib, undan soliq olinmaydi.',
      },
      {
        text: '14,000 so\'m',
        amount: 14000,
        explanation: 'Keshbekdan hech qanday soliq yoki davlat ushlanmasi yo\'q.',
      },
      {
        text: '35,000 so\'m',
        amount: 35000,
        explanation: 'Bunday soliq turi mavjud emas.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 378-modda va PQ-5252-son qaror',
    lawSummary: 'Chakana savdo, umumiy ovqatlanish va maishiy xizmat ko\'rsatish obyektlarida xarid cheklari bo\'yicha jismoniy shaxslarga qaytariladigan 1 foiz miqdoridagi to\'lovlar (keshbek) jismoniy shaxslar daromad solig\'i solish obyekti hisoblanmaydi.',
    penaltyIfWrong: 150000,
    bonusIfRight: 200000,
    tip: 'Soliq.uz ilovasidagi 1% keshbek daromad solig\'idan ozod qilingan!',
  },
  {
    id: 'sc_10',
    dayNumber: 10,
    dayName: 'Chorshanba',
    title: 'Upwork orqali AQSh mijoziga mobil ilova ishlab chiqish',
    category: 'frilans',
    story: 'Xalqaro Upwork platformasi orqali buyurtma bajarib, hisobingizga 12,000,000 so\'m ekvivalentida valyuta qabul qildingiz. Siz o\'zini o\'zi band qilgan IT frilanser sifatida xizmatni eksport qildingiz. To\'lanishi lozim bo\'lgan soliqni aniqlang.',
    grossAmount: 12000000,
    correctTaxAmount: 0,
    correctOptionIndex: 3,
    options: [
      {
        text: '1,440,000 so\'m',
        amount: 1440000,
        explanation: 'O\'zini o\'zi band qilgan frilanserlar eksport xizmatlarida ham JSHODSdan ozod.',
      },
      {
        text: '480,000 so\'m',
        amount: 480000,
        explanation: 'YaTT bo\'lmagan o\'zini o\'zi band qilgan shaxslar aylanma solig\'i to\'lamaydi.',
      },
      {
        text: '600,000 so\'m',
        amount: 600000,
        explanation: 'Bunday soliq belgilanmagan.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'A\'lo! O\'zini o\'zi band qilgan shaxslar chet elga IT xizmatlari eksport qilganda daromad solig\'i to\'lamaydilar.',
      },
    ],
    lawArticle: 'PQ-4755-son qaror va Soliq kodeksi, 369-modda',
    lawSummary: 'O\'zini o\'zi band qilgan shaxslar internet orqali xorijiy jismoniy va yuridik shaxslarga xizmat ko\'rsatish (eksport qilish) huquqiga ega bo\'lib, bu daromadlardan daromad solig\'i undirilmaydi. Pensiya staji hisoblanishi uchun faqat ixtiyoriy ravishda yiliga 1 BHM ijtimoiy soliq to\'lashi kifoya.',
    penaltyIfWrong: 300000,
    bonusIfRight: 400000,
    tip: 'O\'zini o\'zi band qilgan shaxslar eksport xizmatidan 0% soliq to\'laydi!',
  },
  {
    id: 'sc_11',
    dayNumber: 11,
    dayName: 'Payshanba',
    title: 'Magistratura o\'qishi uchun kontrakt to\'lovi',
    category: 'kontrakt',
    isDeduction: true,
    story: 'Siz o\'zingizning magistratura ta\'limingiz uchun 14,000,000 so\'m to\'lov-kontrakt summasini o\'tkazdingiz. Soliq imtiyozidan foydalanib davlatdan qancha mablag\'ni qaytarib olasiz?',
    grossAmount: 14000000,
    correctTaxAmount: 1680000, // 14m * 12% = 1,680,000 UZS
    correctOptionIndex: 1,
    options: [
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Magistratura ham OTM ta\'lim bosqichi hisoblanadi va unga ham to\'liq imtiyoz tatbiq etiladi!',
      },
      {
        text: '1,680,000 so\'m',
        amount: 1680000,
        explanation: 'Ofarin! 14 mln kontrakt to\'lovidan 12% (1,680,000 so\'m) daromad solig\'i hisobidan qaytariladi.',
      },
      {
        text: '700,000 so\'m',
        amount: 700000,
        explanation: 'Soliq chegirmasi stavkasi JSHODS stavkasiga (12%) teng.',
      },
      {
        text: '2,800,000 so\'m',
        amount: 2800000,
        explanation: '20% emas, bazaviy JSHODS stavkasi 12%.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 378-modda',
    lawSummary: 'Soliq to\'lovchining O\'zbekiston Respublikasi OTMlarida (bakalavriat va magistratura) o\'qish uchun o\'tkazilgan mablag\'lariga jismoniy shaxslardan olinadigan daromad solig\'i solinmaydi. Ariza my.soliq.uz orqali onlayn topshiriladi.',
    penaltyIfWrong: 250000,
    bonusIfRight: 450000,
    tip: 'Bakalavr kabi magistratura kontraktiga ham 12% soliq chegirmasi beriladi!',
  },
  {
    id: 'sc_12',
    dayNumber: 12,
    dayName: 'Juma',
    title: 'SMM va brend yuritish xizmati uchun shartnoma',
    category: 'frilans',
    story: 'Toshkentdagi qahvaxonalar tarmog\'i Instagram va TikTok sahifalarini yuritish uchun siz bilan 6,000,000 so\'mlik shartnoma qildi. Siz Soliq ilovasida o\'zini o\'zi band qilgan SMM mutaxassisi sifatida ro\'yxatdasiz. To\'lanishi lozim bo\'lgan soliq miqdorini aniqlang.',
    grossAmount: 6000000,
    correctTaxAmount: 0,
    correctOptionIndex: 0,
    options: [
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'To\'g\'ri! SMM va ijtimoiy tarmoqlar orqali xizmat ko\'rsatish o\'zini o\'zi band qilish faoliyatiga kiradi.',
      },
      {
        text: '720,000 so\'m',
        amount: 720000,
        explanation: 'O\'zini o\'zi band qilgan maqomi mavjud bo\'lganda 12% to\'lanmaydi.',
      },
      {
        text: '240,000 so\'m',
        amount: 240000,
        explanation: 'O\'zini o\'zi band qilgan shaxslar aylanma solig\'i to\'lovchisi emas.',
      },
      {
        text: '600,000 so\'m',
        amount: 600000,
        explanation: 'Bunday soliq turi mavjud emas.',
      },
    ],
    lawArticle: 'PQ-4755-son qaror (O\'zini o\'zi band qilish turlari)',
    lawSummary: 'SMM, kontent yaratish, kopirayting va dizayn xizmatlari o\'zini o\'zi band qilgan shaxslar shug\'ullanishi mumkin bo\'lgan faoliyat turlariga kiritilgan. Shuning uchun bunday xizmatlardan olingan daromadga daromad solig\'i solinmaydi.',
    penaltyIfWrong: 200000,
    bonusIfRight: 250000,
    tip: 'SMM va kopirayting o\'zini o\'zi band qilganlar ro\'yxatida, daromad solig\'i 0%!',
  },
];

export const YATT_SCENARIOS: TaxScenario[] = [
  {
    id: 'yatt_01',
    dayNumber: 1,
    dayName: 'Dushanba',
    title: 'Marketplace savdosi: Uzum Market orqali tushum',
    category: 'savdo',
    story: 'Siz YaTT sifatida Uzum Market platformasida telefon aksessuarlari va g\'iloflar sotdingiz. Bir oylik umumiy savdo tushumingiz 15,000,000 so\'mni tashkil etdi. Aylanmadan olinadigan soliqni hisoblang.',
    grossAmount: 15000000,
    correctTaxAmount: 600000, // 15m * 4% = 600,000 UZS
    correctOptionIndex: 0,
    options: [
      {
        text: '600,000 so\'m',
        amount: 600000,
        explanation: 'To\'g\'ri! YaTT tovarlar savdosi tushumidan 4% aylanma solig\'i to\'laydi.',
      },
      {
        text: '1,800,000 so\'m',
        amount: 1800000,
        explanation: 'Bu jismoniy shaxs maoshi uchun stavka, YaTT aylanmasi uchun emas.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Marketpleysdagi tijorat savdosi 4% stavkada soliqqa tortiladi.',
      },
      {
        text: '300,000 so\'m',
        amount: 300000,
        explanation: 'Standart chakana savdo stavkasi 4% hisoblanadi.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 467-modda',
    lawSummary: 'Soliq kodeksining 467-moddasiga binoan, aylanmadan olinadigan soliq to\'lovchilari bo\'lgan yakka tartibdagi tadbirkorlar uchun tovarlarni sotish (chakana savdo) faoliyatida bazaviy soliq stavkasi 4 foiz etib belgilangan.',
    penaltyIfWrong: 300000,
    bonusIfRight: 250000,
    tip: 'YaTT savdo faoliyatida umumiy tushumdan 4% aylanma solig\'i to\'lanadi!',
  },
  {
    id: 'yatt_02',
    dayNumber: 2,
    dayName: 'Seshanba',
    title: 'Frilans va IT xizmatlari: Veb-sayt ishlab chiqish',
    category: 'frilans',
    story: 'YaTT sifatida xorijiy startap uchun veb-platforma va API integratsiyasini yakunladingiz. Hisob raqamingizga 20,000,000 so\'m tushum bo\'ldi. To\'lanishi lozim bo\'lgan aylanma solig\'ini hisoblang.',
    grossAmount: 20000000,
    correctTaxAmount: 800000, // 20m * 4% = 800,000 UZS
    correctOptionIndex: 1,
    options: [
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'YaTT maqomida IT xizmatlari ko\'rsatilganda 4% aylanma solig\'i to\'lanadi.',
      },
      {
        text: '800,000 so\'m',
        amount: 800000,
        explanation: 'Barakalla! 20,000,000 * 4% = 800,000 so\'m soliq hisoblandi.',
      },
      {
        text: '2,400,000 so\'m',
        amount: 2400000,
        explanation: 'YaTT jismoniy shaxs maoshi kabi 12% to\'lamaydi.',
      },
      {
        text: '1,500,000 so\'m',
        amount: 1500000,
        explanation: 'Bu IT Park rezidenti bo\'lgan xodimlar uchun stavka.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 467-modda',
    lawSummary: 'Xizmatlar ko\'rsatuvchi yakka tartibdagi tadbirkorlar aylanmadan olinadigan soliq to\'lovchilari sifatida umumiy xizmat tushumidan 4% soliq to\'laydilar.',
    penaltyIfWrong: 350000,
    bonusIfRight: 300000,
    tip: 'YaTT sifatida IT va dizayn frilans buyurtmalaridan 4% aylanma solig\'i to\'lanadi.',
  },
  {
    id: 'yatt_03',
    dayNumber: 3,
    dayName: 'Chorshanba',
    title: 'Xizmatlar ko\'rsatish: Professional fotosessiya va videorolik',
    category: 'frilans',
    story: 'Siz YaTT media studiyangiz orqali yirik tadbir uchun reklama roligi va fotosessiya xizmatini taqdim etdingiz. Buyurtmachi shartnoma bo\'yicha 10,000,000 so\'m o\'tkazib berdi. To\'lanishi lozim bo\'lgan soliq miqdorini aniqlang.',
    grossAmount: 10000000,
    correctTaxAmount: 400000, // 10m * 4% = 400,000 UZS
    correctOptionIndex: 2,
    options: [
      {
        text: '1,200,000 so\'m',
        amount: 1200000,
        explanation: 'Bu stavka korxona bilan oddiy GPH shartnoma tuzgan jismoniy shaxslar uchun.',
      },
      {
        text: '200,000 so\'m',
        amount: 200000,
        explanation: 'Media va fotoxizmatlar uchun aylanma solig\'i 4%.',
      },
      {
        text: '400,000 so\'m',
        amount: 400000,
        explanation: 'Ofarin! 10,000,000 * 4% = 400,000 so\'m aylanma solig\'i to\'lanadi.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Tijorat foto va videoxizmatlariga 4% soliq to\'lanadi.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 467-modda',
    lawSummary: 'Xizmat ko\'rsatish sohasidagi YaTTlar uchun aylanmadan olinadigan soliqning umumiy stavkasi 4 foizni tashkil qiladi.',
    penaltyIfWrong: 250000,
    bonusIfRight: 250000,
    tip: 'Xizmat ko\'rsatishdagi YaTT aylanmasidan 4% soliq to\'lanadi.',
  },
  {
    id: 'yatt_04',
    dayNumber: 4,
    dayName: 'Payshanba',
    title: 'Savdo faoliyati: Kanselyariya va o\'quv qurollari do\'koni',
    category: 'savdo',
    story: 'Universitet yaqinida ochilgan kanselyariya va kitob do\'koningizdan kunlik va haftalik savdo tushumi 12,500,000 so\'mga yetdi. YaTT hisobvarag\'idan byudjetga to\'lanadigan aylanma solig\'ini hisoblang.',
    grossAmount: 12500000,
    correctTaxAmount: 500000, // 12.5m * 4% = 500,000 UZS
    correctOptionIndex: 0,
    options: [
      {
        text: '500,000 so\'m',
        amount: 500000,
        explanation: 'To\'g\'ri! 12,500,000 * 4% = 500,000 so\'m aylanma solig\'i.',
      },
      {
        text: '1,500,000 so\'m',
        amount: 1500000,
        explanation: 'Savdo YaTTlari uchun stavka 4%, 12% emas.',
      },
      {
        text: '250,000 so\'m',
        amount: 250000,
        explanation: 'Chakana savdoda aylanma solig\'i 4%.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Chakana do\'kon savdosidan 4% aylanma solig\'i to\'lanishi shart.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 467-modda',
    lawSummary: 'Chakana savdo tushumlaridan hisoblanadigan aylanma solig\'i qat\'iy 4 foiz stavkada to\'lanadi. Hisobot har oy yakuni bilan soliq organlariga yuboriladi.',
    penaltyIfWrong: 250000,
    bonusIfRight: 250000,
    tip: 'Chakana savdoda YaTT aylanmasidan 4% soliq to\'laydi.',
  },
  {
    id: 'yatt_05',
    dayNumber: 5,
    dayName: 'Juma',
    title: 'Xizmatlar: Talabalar o\'quv markazi xizmatlari',
    category: 'repetitorlik',
    story: 'YaTT sifatida iqtisod va dasturlash o\'quv kurslarini tashkil qildingiz va oylik o\'quvchilardan 18,500,000 so\'m to\'lov qabul qildingiz. To\'lanishi lozim bo\'lgan aylanma solig\'ini hisoblang.',
    grossAmount: 18500000,
    correctTaxAmount: 740000, // 18.5m * 4% = 740,000 UZS
    correctOptionIndex: 3,
    options: [
      {
        text: '2,220,000 so\'m',
        amount: 2220000,
        explanation: 'YaTT sifatida faoliyat ko\'rsatganda 12% emas, 4% to\'lanadi.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'YaTT o\'quv markazi tijorat aylanmasi soliqqa tortiladi.',
      },
      {
        text: '370,000 so\'m',
        amount: 370000,
        explanation: 'Standart xizmatlar aylanma solig\'i 4%.',
      },
      {
        text: '740,000 so\'m',
        amount: 740000,
        explanation: 'Ajoyib! 18,500,000 * 4% = 740,000 so\'m aylanma solig\'i.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 467-modda',
    lawSummary: 'O\'quv markazlari va ta\'lim xizmatlarini ko\'rsatuvchi yakka tartibdagi tadbirkorlar aylanmadan olinadigan soliqni 4% stavkada to\'laydilar.',
    penaltyIfWrong: 300000,
    bonusIfRight: 300000,
    tip: 'Ta\'lim xizmatlari aylanmasidan YaTT 4% soliq to\'laydi.',
  },
  {
    id: 'yatt_06',
    dayNumber: 6,
    dayName: 'Shanba',
    title: 'Marketplace savdosi: Zoodmall orqali elektronika aksessuarlari',
    category: 'savdo',
    story: 'Zoodmall marketpleysida smart soat tasmachalari va naushniklar sotuvidan 16,000,000 so\'m tushum qayd etildi. YaTT aylanma solig\'ini hisoblang.',
    grossAmount: 16000000,
    correctTaxAmount: 640000, // 16m * 4% = 640,000 UZS
    correctOptionIndex: 1,
    options: [
      {
        text: '320,000 so\'m',
        amount: 320000,
        explanation: 'Marketplace savdosida soliq stavkasi 4%.',
      },
      {
        text: '640,000 so\'m',
        amount: 640000,
        explanation: 'To\'g\'ri! 16,000,000 * 4% = 640,000 so\'m.',
      },
      {
        text: '1,920,000 so\'m',
        amount: 1920000,
        explanation: 'YaTT aylanma solig\'i to\'laydi, JSHODS emas.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Elektron savdo aylanmasiga 4% soliq hisoblanadi.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 467-modda',
    lawSummary: 'Elektron tijorat va marketpleyslar orqali amalga oshiriladigan chakana savdo tushumlaridan 4 foiz stavkada soliq to\'lanadi.',
    penaltyIfWrong: 300000,
    bonusIfRight: 250000,
    tip: 'Marketplace savdosida YaTT 4% aylanma solig\'i to\'laydi.',
  },
  {
    id: 'yatt_07',
    dayNumber: 7,
    dayName: 'Yakshanba',
    title: 'Frilans: SMM reklama va target kampaniyalari',
    category: 'frilans',
    story: 'Katta kiyim brendi uchun 1 oylik Instagram va Telegram reklama kampaniyasini yuritib, shartnoma bo\'yicha 8,000,000 so\'m gonorar oldingiz. Byudjetga to\'lanishi lozim bo\'lgan soliqni hisoblang.',
    grossAmount: 8000000,
    correctTaxAmount: 320000, // 8m * 4% = 320,000 UZS
    correctOptionIndex: 0,
    options: [
      {
        text: '320,000 so\'m',
        amount: 320000,
        explanation: 'To\'g\'ri! 8,000,000 * 4% = 320,000 so\'m.',
      },
      {
        text: '960,000 so\'m',
        amount: 960000,
        explanation: 'YaTT maqomida aylanmadan 4% to\'lanadi.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'YaTT sifatida xizmat ko\'rsatganda 4% soliq to\'lanishi shart.',
      },
      {
        text: '160,000 so\'m',
        amount: 160000,
        explanation: 'Noto\'g\'ri stavka, to\'g\'ri stavka 4%.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 467-modda',
    lawSummary: 'Marketing, SMM va reklama xizmatlari ko\'rsatuvchi YaTTlar aylanmadan olinadigan soliqni 4% miqdorida to\'laydilar.',
    penaltyIfWrong: 200000,
    bonusIfRight: 200000,
    tip: 'SMM va reklama xizmatlaridan YaTT 4% soliq to\'laydi.',
  },
  {
    id: 'yatt_08',
    dayNumber: 8,
    dayName: 'Dushanba',
    title: 'Frilans va Dizayn: Yangi startap uchun UI/UX dizayn tizimi',
    category: 'frilans',
    story: 'Siz YaTT sifatida mahalliy fintex startapiga mobil ilova va sayt uchun to\'liq UI/UX dizayn tizimini (Design System) yaratib berdingiz. Shartnoma bo\'yicha hisobingizga 14,500,000 so\'m tushum bo\'ldi. To\'lanishi lozim bo\'lgan aylanma solig\'ini hisoblang.',
    grossAmount: 14500000,
    correctTaxAmount: 580000, // 14,500,000 * 4% = 580,000 UZS
    correctOptionIndex: 0,
    options: [
      {
        text: '580,000 so\'m',
        amount: 580000,
        explanation: 'Ofarin! 14,500,000 * 4% = 580,000 so\'m aylanma solig\'i to\'g\'ri hisoblandi.',
      },
      {
        text: '1,740,000 so\'m',
        amount: 1740000,
        explanation: 'YaTT tadbirkorlik subyekti bo\'lib, 12% jismoniy shaxs daromad solig\'i to\'lamaydi.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'YaTT maqomida ko\'rsatilgan barcha pullik xizmatlar 4% aylanma solig\'iga tortiladi.',
      },
      {
        text: '290,000 so\'m',
        amount: 290000,
        explanation: 'Dizayn xizmatlarida stavka 4%, 2% emas.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 467-modda',
    lawSummary: 'Soliq kodeksining 467-moddasiga binoan, xizmatlar ko\'rsatish bilan shug\'ullanuvchi yakka tartibdagi tadbirkorlar aylanmadan olinadigan soliqni 4 foiz bazaviy stavkada to\'laydilar.',
    penaltyIfWrong: 290000,
    bonusIfRight: 280000,
    tip: 'YaTT sifatida dizayn va frilans xizmatlaridan umumiy aylanmaning 4%i to\'lanadi.',
  },
  {
    id: 'yatt_09',
    dayNumber: 9,
    dayName: 'Seshanba',
    title: 'Marketplace savdosi: Uzum Market brutto aylanmasi va komissiya',
    category: 'savdo',
    story: 'Siz YaTT sifatida Uzum Market orqali kiyim-kechak va buyumlar sotdingiz. Bir oylik yalpi aylanmangiz (brutto savdo tushumi) 24,000,000 so\'mni tashkil qildi. Marketpleys o\'z xizmat komissiyasini ushlab qolgan. Eslatma: Soliq kodeksiga binoan aylanma solig\'i vositachi komissiyasini chegirib tashlamasdan, to\'liq yalpi aylanmadan hisoblanadi. To\'lanishi lozim bo\'lgan soliqni aniqlang.',
    grossAmount: 24000000,
    correctTaxAmount: 960000, // 24,000,000 * 4% = 960,000 UZS
    correctOptionIndex: 1,
    options: [
      {
        text: '720,000 so\'m',
        amount: 720000,
        explanation: 'Xato! Soliq kodeksiga muvofiq, aylanma solig\'i vositachilar komissiyasi chegirilmagan umumiy yalpi aylanmadan hisoblanadi.',
      },
      {
        text: '960,000 so\'m',
        amount: 960000,
        explanation: 'Barakalla! 24,000,000 * 4% = 960,000 so\'m. Soliq bazasi tovarlarning to\'liq realizatsiya qiymatidan olinadi.',
      },
      {
        text: '2,880,000 so\'m',
        amount: 2880000,
        explanation: 'YaTT savdo faoliyatida 12% to\'lamaydi.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Marketpleys komissiyasi bu ularning xizmat haqi, tadbirkorning o\'z solig\'i alohida to\'lanadi.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 467 va 468-moddalar',
    lawSummary: 'Soliq kodeksining 468-moddasiga asosan, aylanmadan olinadigan soliq bo\'yicha soliq solish bazasi realizatsiya qilingan tovarlar (xizmatlar) qiymatidan, vositachilik komissiyalari va boshqa xarajatlarni chegirib tashlamagan holda aniqlanadi.',
    penaltyIfWrong: 450000,
    bonusIfRight: 400000,
    tip: 'Marketpleys savdosida soliq komissiyadan oldingi umumiy yalpi (brutto) aylanmadan hisoblanadi!',
  },
  {
    id: 'yatt_10',
    dayNumber: 10,
    dayName: 'Chorshanba',
    title: 'Ijara daromadi: O\'ziga tegishli tijorat joyini ijaraga berish',
    category: 'savdo',
    story: 'Siz YaTT sifatida o\'zingizga mulk huquqida qarashli bo\'lgan kichik tijorat binosi (ofis/ombor maydoni)ni boshqa tadbirkorga ijaraga berdingiz va oylik 8,500,000 so\'m ijara to\'lovini qabul qildingiz. To\'lanishi lozim bo\'lgan aylanma solig\'ini hisoblang.',
    grossAmount: 8500000,
    correctTaxAmount: 340000, // 8,500,000 * 4% = 340,000 UZS
    correctOptionIndex: 2,
    options: [
      {
        text: '1,020,000 so\'m',
        amount: 1020000,
        explanation: 'YaTT aylanmadan olinadigan soliq to\'lovchisi bo\'lsa, ijaraga 4% stavka qo\'llaniladi.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Ko\'chmas mulkni ijaraga berish doimiy tijorat daromadi bo\'lib, soliqqa tortiladi.',
      },
      {
        text: '340,000 so\'m',
        amount: 340000,
        explanation: 'To\'g\'ri! 8,500,000 * 4% = 340,000 so\'m. YaTT mol-mulkni ijaraga berishdan olingan daromadga 4% stavkada aylanma solig\'i to\'laydi.',
      },
      {
        text: '170,000 so\'m',
        amount: 170000,
        explanation: 'Ijara faoliyatida standart stavka 4% dir.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 467-modda va 468-modda',
    lawSummary: 'Yakka tartibdagi tadbirkorning ko\'chmas mulkni ijaraga berishdan olgan daromadlari aylanmadan olinadigan soliq obyekti hisoblanadi va unga 4 foizli soliq stavkasi tatbiq etiladi.',
    penaltyIfWrong: 250000,
    bonusIfRight: 250000,
    tip: 'YaTT tijorat binosi va ofis ijarasidan 4% stavkada aylanma solig\'i to\'laydi.',
  },
  {
    id: 'yatt_11',
    dayNumber: 11,
    dayName: 'Payshanba',
    title: 'Konsalting va IT-autstaffing: Kiberxavfsizlik va arxitektura auditi',
    category: 'frilans',
    story: 'Siz YaTT sifatida xorijiy kompaniyaga bulutli serverlar xavfsizligi va texnik auditi bo\'yicha konsalting xizmatini topshirdingiz. Hisob raqamingizga 31,000,000 so\'m gonorar o\'tkazildi. To\'lanishi lozim bo\'lgan aylanma solig\'ini hisoblang.',
    grossAmount: 31000000,
    correctTaxAmount: 1240000, // 31,000,000 * 4% = 1,240,000 UZS
    correctOptionIndex: 0,
    options: [
      {
        text: '1,240,000 so\'m',
        amount: 1240000,
        explanation: 'To\'g\'ri! 31,000,000 * 4% = 1,240,000 so\'m aylanma solig\'i to\'lanadi.',
      },
      {
        text: '3,720,000 so\'m',
        amount: 3720000,
        explanation: 'YaTT o\'z daromadlaridan jismoniy shaxslar daromad solig\'i (12%) to\'lamaydi.',
      },
      {
        text: '620,000 so\'m',
        amount: 620000,
        explanation: 'Konsalting xizmatlarida YaTT aylanma solig\'i bazaviy stavkasi 4%.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'YaTT xizmat ko\'rsatish aylanmasidan 4% soliq to\'lashi shart.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 467-modda',
    lawSummary: 'Axborot texnologiyalari, konsalting va ekspertiza xizmatlarini ko\'rsatuvchi yakka tartibdagi tadbirkorlar aylanmadan olinadigan soliqni 4 foiz stavkada to\'laydilar.',
    penaltyIfWrong: 500000,
    bonusIfRight: 450000,
    tip: 'Konsalting va autstaffing xizmati aylanmasidan YaTT 4% soliq to\'laydi.',
  },
];

// Handcrafted MChJ (Limited Liability Company) Scenarios
export const MCHJ_SCENARIOS: TaxScenario[] = [
  {
    id: 'mchj_01',
    dayNumber: 1,
    dayName: 'Dushanba',
    title: 'QQS (Qo\'shilgan qiymat solig\'i) hisoblash',
    category: 'savdo',
    story: 'MChJ sifatida oy davomida tovarlar yetkazib berish bo\'yicha 50,000,000 so\'mlik soliqqa tortiladigan aylanma amalga oshirildi. Byudjetga to\'lanishi lozim bo\'lgan QQS summasini hisoblang.',
    grossAmount: 50000000,
    correctTaxAmount: 6000000, // 50m * 12% = 6,000,000 UZS
    correctOptionIndex: 0,
    options: [
      {
        text: '6,000,000 so\'m',
        amount: 6000000,
        explanation: 'Ofarin! O\'zbekistonda QQSning bazaviy stavkasi 12% ni tashkil etadi (50,000,000 * 12% = 6,000,000 so\'m).',
      },
      {
        text: '2,000,000 so\'m',
        amount: 2000000,
        explanation: '4% bu YaTT yoki aylanma solig\'i to\'lovchilari uchun, QQS to\'lovchi MChJ uchun emas.',
      },
      {
        text: '7,500,000 so\'m',
        amount: 7500000,
        explanation: 'QQS stavkasi 15% dan 12% ga pasaytirilgan.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Umumbelgilangan soliq tizimidagi MChJ QQS to\'lovchisi hisoblanadi.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 258-modda',
    lawSummary: 'Soliq kodeksining 258-moddasiga binoan, qo\'shilgan qiymat solig\'ining (QQS) stavkasi 12 foiz miqdorida belgilanadi.',
    penaltyIfWrong: 600000,
    bonusIfRight: 500000,
    tip: 'O\'zbekistonda amaldagi QQS stavkasi qat\'iy 12% ni tashkil qiladi.',
  },
  {
    id: 'mchj_02',
    dayNumber: 2,
    dayName: 'Seshanba',
    title: 'Foyda solig\'i hisob-kitobi',
    category: 'frilans',
    story: 'MChJ oylik barcha xarajatlar va tannarx chegirilgandan so\'ng 40,000,000 so\'m sof soliq solinadigan foyda oldi. Byudjetga to\'lanishi lozim bo\'lgan foyda solig\'ini hisoblang.',
    grossAmount: 40000000,
    correctTaxAmount: 6000000, // 40m * 15% = 6,000,000 UZS
    correctOptionIndex: 1,
    options: [
      {
        text: '4,800,000 so\'m',
        amount: 4800000,
        explanation: '12% bu QQS va JSHODS stavkasi, foyda solig\'i stavkasi 15%.',
      },
      {
        text: '6,000,000 so\'m',
        amount: 6000000,
        explanation: 'To\'g\'ri! Yuridik shaxslar foyda solig\'ining bazaviy stavkasi 15% (40,000,000 * 15% = 6,000,000 so\'m).',
      },
      {
        text: '1,600,000 so\'m',
        amount: 1600000,
        explanation: '4% bu aylanma solig\'i, sof foydadan 15% to\'lanadi.',
      },
      {
        text: '8,000,000 so\'m',
        amount: 8000000,
        explanation: '20% stavka faqat banklar va uyali aloqa operatorlari uchun amal qiladi.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 337-modda',
    lawSummary: 'Soliq kodeksining 337-moddasiga asosan, O\'zbekiston Respublikasida yuridik shaxslar foyda solig\'ining bazaviy stavkasi 15 foizni tashkil qiladi.',
    penaltyIfWrong: 600000,
    bonusIfRight: 500000,
    tip: 'MChJ sof foydasidan to\'lanadigan asosiy foyda solig\'i stavkasi 15% dir.',
  },
  {
    id: 'mchj_03',
    dayNumber: 3,
    dayName: 'Chorshanba',
    title: 'Xodimlar ish haqi fondidan Ijtimoiy soliq',
    category: 'gph',
    story: 'Kompaniyada 5 nafar xodim mehnat qiladi. Oy uchun hisoblangan jami ish haqi fondi 30,000,000 so\'mni tashkil qildi. Ish beruvchi (MChJ) to\'lashi shart bo\'lgan ijtimoiy soliq miqdorini hisoblang.',
    grossAmount: 30000000,
    correctTaxAmount: 3600000, // 30m * 12% = 3,600,000 UZS
    correctOptionIndex: 2,
    options: [
      {
        text: '1,500,000 so\'m',
        amount: 1500000,
        explanation: 'Xususiy sektor korxonalari uchun stavka 12% dir.',
      },
      {
        text: '7,500,000 so\'m',
        amount: 7500000,
        explanation: 'Eski davr stavkasi, hozirgi kunda ijtimoiy soliq 12%.',
      },
      {
        text: '3,600,000 so\'m',
        amount: 3600000,
        explanation: 'Ajoyib! Yuridik shaxslar xodimlar maoshi fondidan 12% ijtimoiy soliq to\'laydilar (30,000,000 * 12% = 3,600,000 so\'m).',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Ijtimoiy soliq pensiya va ijtimoiy ta\'minot uchun majburiy to\'lovdir.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 405-modda',
    lawSummary: 'Soliq kodeksining 405-moddasiga asosan, yuridik shaxslar uchun ijtimoiy soliq stavkasi 12 foiz qilib belgilangan.',
    penaltyIfWrong: 400000,
    bonusIfRight: 400000,
    tip: 'Ish beruvchi korxona xodimlar maosh jamg\'armasidan 12% ijtimoiy soliq to\'laydi.',
  },
  {
    id: 'mchj_04',
    dayNumber: 4,
    dayName: 'Payshanba',
    title: 'Ta\'sischilarga dividend to\'lovi va Dividend solig\'i',
    category: 'boshqa',
    story: 'Kompaniya yillik faoliyat natijalari bo\'yicha mahalliy fuqaro bo\'lgan ta\'sischiga 25,000,000 so\'m dividend ajratishga qaror qildi. To\'lov manbaida ushlab qolinadigan dividend solig\'ini hisoblang.',
    grossAmount: 25000000,
    correctTaxAmount: 1250000, // 25m * 5% = 1,250,000 UZS
    correctOptionIndex: 3,
    options: [
      {
        text: '3,000,000 so\'m',
        amount: 3000000,
        explanation: 'Dividendlar uchun maxsus 5% imtiyozli stavka qo\'llaniladi, 12% emas.',
      },
      {
        text: '2,500,000 so\'m',
        amount: 2500000,
        explanation: 'O\'zbekiston rezidentlari uchun dividend stavkasi 5% ni tashkil qiladi.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Dividendlar to\'lov manbaida soliq agenti tomonidan ushlab qolinadi.',
      },
      {
        text: '1,250,000 so\'m',
        amount: 1250000,
        explanation: 'To\'g\'ri! Rezident jismoniy va yuridik shaxslar dividendlariga 5% stavkada soliq solinadi (25,000,000 * 5% = 1,250,000 so\'m).',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 381-modda',
    lawSummary: 'Soliq kodeksining 381-moddasiga ko\'ra, dividendlar tarzida olinadigan daromadlar bo\'yicha soliq stavkasi 5 foiz miqdorida belgilanadi.',
    penaltyIfWrong: 350000,
    bonusIfRight: 350000,
    tip: 'O\'zbekiston rezidentlarining dividend daromadlaridan 5% soliq ushlab qolinadi.',
  },
  {
    id: 'mchj_05',
    dayNumber: 5,
    dayName: 'Juma',
    title: 'Eksport operatsiyalari va QQS hisob-kitobi',
    category: 'savdo',
    story: 'MChJ xorijiy hamkorlarga 80,000,000 so\'mlik tovar eksport qildi va to\'lov chet el valyutasida bank hisobiga kelib tushdi. Mazkur eksport aylanmasi bo\'yicha to\'lanishi lozim bo\'lgan QQS summasini aniqlang.',
    grossAmount: 80000000,
    correctTaxAmount: 0, // Export is 0% VAT under Art. 260
    correctOptionIndex: 0,
    options: [
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Ajoyib! O\'zR Soliq kodeksining 260-moddasiga ko\'ra, tovarlar eksporti bo\'yicha realizatsiya aylanmasiga 0% miqdoridagi QQS stavkasi qo\'llaniladi.',
      },
      {
        text: '9,600,000 so\'m',
        amount: 9600000,
        explanation: 'Xato! Eksport qilingan tovarlarga ichki bozordagi 12% QQS stavkasi qo\'llanilmaydi.',
      },
      {
        text: '3,200,000 so\'m',
        amount: 3200000,
        explanation: '4% bu aylanma solig\'i stavkasi, QQS to\'lovchi eksportyor uchun emas.',
      },
      {
        text: '12,000,000 so\'m',
        amount: 12000000,
        explanation: 'Eksport operatsiyalariga 15% soliq qo\'llanilmaydi.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 260-modda',
    lawSummary: 'Soliq kodeksining 260-moddasiga muvofiq, bojxona hududidan eksport rejimida olib chiqilgan tovarlar realizatsiyasiga 0 foiz stavkada QQS solinadi.',
    penaltyIfWrong: 700000,
    bonusIfRight: 600000,
    tip: 'Eksport tovarlari bo\'yicha QQS stavkasi 0% etib belgilangan!',
  },
  {
    id: 'mchj_06',
    dayNumber: 6,
    dayName: 'Shanba',
    title: 'Eksportdan olingan sof foyda solig\'i',
    category: 'savdo',
    story: 'MChJ xorijga mahsulot eksport qilish natijasida barcha xarajatlar va tannarx chegirilgach 50,000,000 so\'m sof foydaga ega bo\'ldi. Kompaniya byudjetga to\'lashi lozim bo\'lgan foyda solig\'ini aniqlang.',
    grossAmount: 50000000,
    correctTaxAmount: 7500000, // 50m * 15% = 7,500,000 UZS
    correctOptionIndex: 1,
    options: [
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Eksportda QQS 0% bo\'lsa-da, korxona sof foydasidan umumiy 15% foyda solig\'i to\'laydi.',
      },
      {
        text: '7,500,000 so\'m',
        amount: 7500000,
        explanation: 'To\'g\'ri! Eksportdan olingan sof foyda bo\'yicha umumiy 15% foyda solig\'i to\'lanadi (50,000,000 * 15% = 7,500,000 so\'m).',
      },
      {
        text: '6,000,000 so\'m',
        amount: 6000000,
        explanation: '12% bu QQS stavkasi, yuridik shaxslar foyda solig\'i stavkasi esa 15%.',
      },
      {
        text: '2,000,000 so\'m',
        amount: 2000000,
        explanation: '4% stavka aylanma solig\'i uchun tegishli.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 337-modda',
    lawSummary: 'Yuridik shaxslar uchun foyda solig\'ining bazaviy stavkasi 15 foizni tashkil qiladi.',
    penaltyIfWrong: 650000,
    bonusIfRight: 550000,
    tip: 'Eksportda QQS 0% bo\'lsa-da, korxona olingan sof foydadan 15% foyda solig\'i to\'laydi.',
  },
  {
    id: 'mchj_07',
    dayNumber: 7,
    dayName: 'Yakshanba',
    title: 'Xodimlar daromadidan JSHODS ushlab qolish',
    category: 'gph',
    story: 'MChJ oy oxirida 8 nafar xodimga jami 40,000,000 so\'m hisoblangan ish haqi to\'lamoqda. Soliq agenti sifatida to\'lov manbaida ushlab qolinadigan daromad solig\'ini aniqlang.',
    grossAmount: 40000000,
    correctTaxAmount: 4800000, // 40m * 12% = 4,800,000 UZS
    correctOptionIndex: 0,
    options: [
      {
        text: '4,800,000 so\'m',
        amount: 4800000,
        explanation: 'To\'g\'ri! Korxona soliq agenti sifatida xodimlar maoshidan 12% JSHODS ushlab qolib byudjetga o\'tkazadi (40,000,000 * 12% = 4,800,000 so\'m).',
      },
      {
        text: '1,600,000 so\'m',
        amount: 1600000,
        explanation: 'Xodimlar maoshi aylanma solig\'iga tortilmaydi, bu JSHODS.',
      },
      {
        text: '6,000,000 so\'m',
        amount: 6000000,
        explanation: '15% bu korxona foyda solig\'i, xodim daromad solig\'i esa 12%.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Yuridik shaxs xodim maoshidan JSHODSni to\'lov manbaida ushlab qolishi shart.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 381 va 387-moddalar',
    lawSummary: 'Soliq agenti bo\'lgan yuridik shaxs jismoniy shaxsga daromad to\'lash chog\'ida 12% miqdoridagi JSHODSni to\'lov manbaida ushlab qolishi va soliq organiga o\'tkazishi shart.',
    penaltyIfWrong: 450000,
    bonusIfRight: 450000,
    tip: 'Yuridik shaxs (MChJ) xodimlar maoshidan 12% daromad solig\'ini ushlab qoluvchi soliq agentidir.',
  },
  {
    id: 'mchj_08',
    dayNumber: 8,
    dayName: 'Dushanba',
    title: 'Katta korporativ dividend to\'lovi',
    category: 'boshqa',
    story: 'Yil yakunida MChJ ishtirokchilariga 60,000,000 so\'m dividend to\'lash to\'g\'risida qaror qabul qilindi. Korxona to\'lov manbaida ushlab qolishi lozim bo\'lgan soliq summasini hisoblang.',
    grossAmount: 60000000,
    correctTaxAmount: 3000000, // 60m * 5% = 3,000,000 UZS
    correctOptionIndex: 0,
    options: [
      {
        text: '3,000,000 so\'m',
        amount: 3000000,
        explanation: 'Ofarin! O\'zbekiston rezidentlariga to\'lanadigan dividendlar uchun soliq stavkasi 5% ni tashkil qiladi (60,000,000 * 5% = 3,000,000 so\'m).',
      },
      {
        text: '7,200,000 so\'m',
        amount: 7200000,
        explanation: '12% oddiy daromad solig\'i stavkasi, dividendlar uchun maxsus 5% stavka belgilangan.',
      },
      {
        text: '9,000,000 so\'m',
        amount: 9000000,
        explanation: '15% bu korxona foyda solig\'i stavkasi, dividend solig\'i esa 5%.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Dividendlar soliqdan ozod qilinmagan, korxona soliq agenti sifatida 5% ushlab qolishi shart.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 381-modda',
    lawSummary: 'Soliq kodeksining 381-moddasiga ko\'ra, dividendlar tarzida olinadigan daromadlar bo\'yicha soliq stavkasi 5 foiz miqdorida belgilanadi.',
    penaltyIfWrong: 500000,
    bonusIfRight: 450000,
    tip: 'O\'zbekiston rezidentlarining dividend daromadlaridan to\'lov manbaida 5% soliq ushlab qolinadi.',
  },
  {
    id: 'mchj_09',
    dayNumber: 9,
    dayName: 'Seshanba',
    title: 'Kengaytirilgan xodimlar shtatidan Ijtimoiy soliq',
    category: 'gph',
    story: 'Kompaniya yangi loyihalar uchun dasturchilar va muhandislarni ishga qabul qildi. Oylik hisoblangan jami ish haqi fondi 65,000,000 so\'mga yetdi. Ish beruvchi to\'lashi shart bo\'lgan ijtimoiy soliq summasini aniqlang.',
    grossAmount: 65000000,
    correctTaxAmount: 7800000, // 65m * 12% = 7,800,000 UZS
    correctOptionIndex: 0,
    options: [
      {
        text: '7,800,000 so\'m',
        amount: 7800000,
        explanation: 'To\'g\'ri! Yuridik shaxslar xodimlar maoshi fondidan 12% ijtimoiy soliq to\'laydilar (65,000,000 * 12% = 7,800,000 so\'m).',
      },
      {
        text: '3,250,000 so\'m',
        amount: 3250000,
        explanation: '5% stavka xususiy sektor tijorat korxonalari uchun qo\'llanilmaydi.',
      },
      {
        text: '9,750,000 so\'m',
        amount: 9750000,
        explanation: '15% bu korxona foyda solig\'i stavkasi, ijtimoiy soliq esa 12%.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Ijtimoiy soliq xodimlar pensiya ta\'minoti uchun majburiy to\'lov hisoblanadi.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 405-modda',
    lawSummary: 'Soliq kodeksining 405-moddasiga asosan, yuridik shaxslar uchun ijtimoiy soliq stavkasi 12 foiz qilib belgilangan.',
    penaltyIfWrong: 600000,
    bonusIfRight: 500000,
    tip: 'Korxona xodimlar maoshi fondidan 12% ijtimoiy soliq to\'laydi.',
  },
  {
    id: 'mchj_10',
    dayNumber: 10,
    dayName: 'Chorshanba',
    title: 'Xizmatlar ko\'rsatish aylanmasidan QQS',
    category: 'savdo',
    story: 'MChJ korporativ buyurtmachilarga bulutli xizmatlar va serverlarni boshqarish bo\'yicha 45,000,000 so\'mlik xizmat ko\'rsatdi. Soliqqa tortiladigan ushbu realizatsiya oboroti bo\'yicha to\'lanishi lozim bo\'lgan QQS miqdorini hisoblang.',
    grossAmount: 45000000,
    correctTaxAmount: 5400000, // 45m * 12% = 5,400,000 UZS
    correctOptionIndex: 0,
    options: [
      {
        text: '5,400,000 so\'m',
        amount: 5400000,
        explanation: 'Ofarin! Xizmatlar realizatsiyasi bo\'yicha 12% stavkada QQS hisoblanadi (45,000,000 * 12% = 5,400,000 so\'m).',
      },
      {
        text: '1,800,000 so\'m',
        amount: 1800000,
        explanation: '4% bu aylanma solig\'i stavkasi, QQS to\'lovchi korxona uchun emas.',
      },
      {
        text: '6,750,000 so\'m',
        amount: 6750000,
        explanation: '15% bu korxona foyda solig\'i stavkasi, QQS stavkasi 12%.',
      },
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'Ichki bozorda yuridik shaxslarga ko\'rsatilgan xizmatlar aylanmasiga QQS hisoblanadi.',
      },
    ],
    lawArticle: 'O\'zR Soliq kodeksi, 258-modda',
    lawSummary: 'Soliq kodeksining 258-moddasiga binoan, qo\'shilgan qiymat solig\'ining (QQS) stavkasi 12 foiz miqdorida belgilanadi.',
    penaltyIfWrong: 500000,
    bonusIfRight: 450000,
    tip: 'Xizmatlar realizatsiyasi oborotidan 12% QQS hisoblanadi.',
  },
];

// Dynamic procedural generator for YaTT mode with 4 distinct income categories & 3 difficulty levels
export function generateProceduralYaTTScenario(day: number, difficulty: 'oson' | 'orta' | 'qiyin' = 'orta'): TaxScenario {
  const dayNames = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'];
  const dayName = dayNames[(day - 1) % 7];

  const categories = [
    {
      source: 'Frilans (Dizayn va IT)' as const,
      category: 'frilans' as const,
      title: 'Frilans va Dizayn: Mobil ilova UI/UX va brending xizmati',
      story: 'Siz YaTT sifatida buyurtmachi korxona uchun mobil ilova dizayni va grafik interfeyslarini tayyorlab berdingiz.',
      baseAmount: 11500000 + ((day * 1450000) % 18000000),
    },
    {
      source: 'Marketplace (Uzum Market)' as const,
      category: 'savdo' as const,
      title: 'Marketplace: Uzum Market brutto savdo aylanmasi',
      story: 'YaTT sifatida Uzum Market platformasida mahsulotlar sotdingiz. Eslatma: Aylanma solig\'i komissiya chegirilmagan umumiy yalpi (brutto) tushumdan hisoblanadi.',
      baseAmount: 17500000 + ((day * 2150000) % 25000000),
    },
    {
      source: 'Ijara (Tijorat binosi)' as const,
      category: 'savdo' as const,
      title: 'Ijara: Mulk huquqidagi ofis va ombor joyini ijaraga berish',
      story: 'Siz YaTT faoliyati doirasida o\'zingizga tegishli tijorat xonasini boshqa korxonaga ijaraga berib ijara haqi oldingiz.',
      baseAmount: 7500000 + ((day * 920000) % 12000000),
    },
    {
      source: 'Konsalting (IT-autstaffing)' as const,
      category: 'frilans' as const,
      title: 'Konsalting: Kiberxavfsizlik va dasturiy audit xizmati',
      story: 'YaTT sifatida kompaniyaga serverlar infratuzilmasi va xavfsizlik auditini o\'tkazib shartnoma bo\'yicha to\'lov qabul qildingiz.',
      baseAmount: 22000000 + ((day * 2800000) % 28000000),
    },
    {
      source: 'Xizmatlar (O\'quv markazi)' as const,
      category: 'repetitorlik' as const,
      title: 'Xizmatlar: O\'quv markazi va repetitorlik kurslari tushumi',
      story: 'Siz YaTT o\'quv markazingizda zamonaviy IT kasblari va tillar bo\'yicha oylik to\'lovlarni qabul qildingiz.',
      baseAmount: 13000000 + ((day * 1350000) % 15000000),
    },
    {
      source: 'Savdo (Chakana do\'kon)' as const,
      category: 'savdo' as const,
      title: 'Savdo: Kanselyariya va elektron aksessuarlar do\'koni',
      story: 'YaTT sifatida chakana savdo nuqtasida tovarlar savdosidan haftalik umumiy kassa tushumini qabul qildingiz.',
      baseAmount: 15000000 + ((day * 1650000) % 19000000),
    },
  ];

  const cat = categories[(day - 1) % categories.length];
  const grossAmount = Math.round(cat.baseAmount / 100000) * 100000;
  const correctTaxAmount = Math.round(grossAmount * 0.04); // Always 4% turnover tax for YaTT!

  const opt0 = {
    text: `${correctTaxAmount.toLocaleString('uz-UZ')} so'm`,
    amount: correctTaxAmount,
    explanation: 'To\'g\'ri! YaTT barcha savdo va xizmat tushumidan 4% aylanma solig\'i to\'laydi.',
  };

  let pool: { text: string; amount: number; explanation: string }[] = [];

  if (difficulty === 'oson') {
    pool = [
      opt0,
      {
        text: `${Math.round(grossAmount * 0.12).toLocaleString('uz-UZ')} so'm`,
        amount: Math.round(grossAmount * 0.12),
        explanation: '12% jismoniy shaxs maoshi uchun, YaTT aylanmasi uchun emas.',
      },
      {
        text: "0 so'm",
        amount: 0,
        explanation: 'YaTT tijorat faoliyatidan 4% aylanma solig\'i to\'lashi shart.',
      },
      {
        text: `${Math.round(grossAmount * 0.20).toLocaleString('uz-UZ')} so'm`,
        amount: Math.round(grossAmount * 0.20),
        explanation: 'Bunday yuqori stavka qo\'llanilmaydi.',
      },
    ];
  } else if (difficulty === 'qiyin') {
    pool = [
      opt0,
      {
        text: `${Math.round(grossAmount * 0.035).toLocaleString('uz-UZ')} so'm`,
        amount: Math.round(grossAmount * 0.035),
        explanation: 'YaTT uchun standart stavka 4%.',
      },
      {
        text: `${Math.round(grossAmount * 0.045).toLocaleString('uz-UZ')} so'm`,
        amount: Math.round(grossAmount * 0.045),
        explanation: 'Aylanma solig\'i qat\'iy 4% ni tashkil qiladi.',
      },
      {
        text: `${Math.round(grossAmount * 0.075).toLocaleString('uz-UZ')} so'm`,
        amount: Math.round(grossAmount * 0.075),
        explanation: '7.5% bu IT Park rezidenti xodimlari uchun daromad solig\'i stavkasi.',
      },
    ];
  } else {
    pool = [
      opt0,
      {
        text: `${Math.round(grossAmount * 0.12).toLocaleString('uz-UZ')} so'm`,
        amount: Math.round(grossAmount * 0.12),
        explanation: 'YaTT 12% emas, aylanmadan 4% to\'laydi.',
      },
      {
        text: "0 so'm",
        amount: 0,
        explanation: 'YaTT tijorat tushumidan aylanma solig\'i to\'laydi.',
      },
      {
        text: `${Math.round(grossAmount * 0.02).toLocaleString('uz-UZ')} so'm`,
        amount: Math.round(grossAmount * 0.02),
        explanation: 'Standart YaTT stavkasi 4% hisoblanadi.',
      },
    ];
  }

  // Deterministic shuffle
  const correctIdx = (day * 3) % 4;
  const temp = pool[0];
  pool[0] = pool[correctIdx];
  pool[correctIdx] = temp;

  return {
    id: `yatt_dyn_${day}`,
    dayNumber: day,
    dayName,
    title: `${cat.title} (${day}-kun)`,
    category: cat.category,
    story: `${cat.story} Umumiy aylanma mablag' ${grossAmount.toLocaleString('uz-UZ')} so'm bo'ldi. To'lanishi lozim bo'lgan aylanma solig'ini hisoblang.`,
    grossAmount,
    correctTaxAmount,
    correctOptionIndex: correctIdx,
    options: pool,
    lawArticle: 'O\'zR Soliq kodeksi, 467-modda',
    lawSummary: 'Soliq kodeksining 467-moddasiga asosan, yakka tartibdagi tadbirkorlar aylanmadan olinadigan soliqni 4% stavkada to\'laydilar.',
    penaltyIfWrong: 250000 + (day * 15000),
    bonusIfRight: 200000 + (day * 20000),
    tip: 'YaTTning barcha faoliyat turlarida (savdo, xizmat, frilans) bazaviy aylanma solig\'i 4% hisoblanadi.',
  };
}

// Procedural generator for MChJ mode
export function generateProceduralMChJScenario(
  day: number,
  difficulty: 'oson' | 'orta' | 'qiyin' = 'orta',
  companyName: string = 'Kompaniya MChJ'
): TaxScenario {
  const dayNames = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'];
  const dayName = dayNames[(day - 1) % 7];

  const types = [
    {
      type: 'qqs' as const,
      title: 'QQS hisob-kitobi',
      story: `${companyName} tomonidan oy davomida tovarlar realizatsiyasi amalga oshirildi. To'lanishi lozim bo'lgan QQS miqdorini hisoblang.`,
      rate: 0.12,
      base: 45000000 + ((day * 2500000) % 40000000),
      law: 'O\'zR Soliq kodeksi, 258-modda (QQS)',
      tip: 'MChJ tovar va xizmat aylanmasidan 12% QQS hisoblaydi.',
      distractorsOson: [0.04, 0, 0.2],
      distractorsOrta: [0.15, 0.04, 0],
      distractorsQiyin: [0.11, 0.125, 0.15],
    },
    {
      type: 'foyda' as const,
      title: 'Foyda solig\'i',
      story: `${companyName} barcha xarajatlarni chegirgandan so'ng soliqqa tortiladigan sof foydaga ega bo'ldi. To'lanishi lozim bo'lgan foyda solig'ini hisoblang.`,
      rate: 0.15,
      base: 35000000 + ((day * 3000000) % 35000000),
      law: 'O\'zR Soliq kodeksi, 337-modda (Foyda solig\'i)',
      tip: 'Yuridik shaxslar sof foydasidan 15% foyda solig\'i to\'laydi.',
      distractorsOson: [0.04, 0, 0.25],
      distractorsOrta: [0.12, 0.075, 0],
      distractorsQiyin: [0.14, 0.16, 0.12],
    },
    {
      type: 'ijtimoiy' as const,
      title: 'Xodimlar uchun Ijtimoiy soliq',
      story: `${companyName} xodimlarining oylik maosh jamg'armasi shakllantirildi. To'lanishi lozim bo'lgan ijtimoiy soliqni hisoblang.`,
      rate: 0.12,
      base: 28000000 + ((day * 1800000) % 25000000),
      law: 'O\'zR Soliq kodeksi, 405-modda (Ijtimoiy soliq)',
      tip: 'Korxona hisoblangan maosh jamg\'armasidan 12% ijtimoiy soliq to\'laydi.',
      distractorsOson: [0.05, 0, 0.25],
      distractorsOrta: [0.15, 0.04, 0],
      distractorsQiyin: [0.115, 0.13, 0.075],
    },
    {
      type: 'dividend' as const,
      title: 'Dividend solig\'i',
      story: `${companyName} ta'sischilarga sof foyda hisobidan dividend ajratmoqda. To'lov manbaida ushlab qolinadigan dividend solig'ini hisoblang.`,
      rate: 0.05,
      base: 22000000 + ((day * 2200000) % 30000000),
      law: 'O\'zR Soliq kodeksi, 381-modda (Dividend solig\'i)',
      tip: 'Rezident ta\'sischilar dividendlaridan 5% soliq ushlab qolinadi.',
      distractorsOson: [0.12, 0, 0.2],
      distractorsOrta: [0.1, 0.12, 0],
      distractorsQiyin: [0.045, 0.055, 0.075],
    },
  ];

  const t = types[(day - 1) % types.length];
  const grossAmount = Math.round(t.base / 100000) * 100000;
  const correctTaxAmount = Math.round(grossAmount * t.rate);

  const opt0 = {
    text: `${correctTaxAmount.toLocaleString('uz-UZ')} so'm`,
    amount: correctTaxAmount,
    explanation: `To'g'ri! ${t.title} qoidasi bo'yicha to'g'ri hisoblandi.`,
  };

  const distRates = difficulty === 'oson' ? t.distractorsOson : difficulty === 'qiyin' ? t.distractorsQiyin : t.distractorsOrta;
  const pool = [
    opt0,
    ...distRates.map((r) => {
      const amt = Math.round(grossAmount * r);
      return {
        text: amt === 0 ? "0 so'm" : `${amt.toLocaleString('uz-UZ')} so'm`,
        amount: amt,
        explanation: 'Noto\'g\'ri stavka tanlandi.',
      };
    }),
  ];

  const correctIdx = (day * 2) % 4;
  const temp = pool[0];
  pool[0] = pool[correctIdx];
  pool[correctIdx] = temp;

  return {
    id: `mchj_dyn_${day}`,
    dayNumber: day,
    dayName,
    title: `${t.title} (${day}-kun)`,
    category: 'savdo',
    story: t.story,
    grossAmount,
    correctTaxAmount,
    correctOptionIndex: correctIdx,
    options: pool,
    lawArticle: t.law,
    lawSummary: t.law,
    penaltyIfWrong: 400000 + (day * 20000),
    bonusIfRight: 400000 + (day * 25000),
    tip: t.tip,
  };
}

// Procedural fallback generator for default student freelance mode
export function generateProceduralScenario(day: number): TaxScenario {
  const dayNames = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'];
  const dayName = dayNames[(day - 1) % 7];
  const isDeduction = day % 4 === 0;

  if (isDeduction) {
    const grossAmount = 8000000 + ((day * 700000) % 12000000);
    const correctTaxAmount = Math.round(grossAmount * 0.12);
    return {
      id: `sc_dyn_${day}`,
      dayNumber: day,
      dayName,
      title: 'Talaba ta\'lim shartnomasi (Kontrakt) uchun soliq chegirmasi',
      category: 'kontrakt',
      story: `Siz universitet kontraktiga ${grossAmount.toLocaleString('uz-UZ')} so'm to'lov qildingiz. Daromad solig'i hisobidan qaytarib olinadigan summani hisoblang.`,
      grossAmount,
      isDeduction: true,
      correctTaxAmount,
      correctOptionIndex: 0,
      options: [
        {
          text: `${correctTaxAmount.toLocaleString('uz-UZ')} so'm`,
          amount: correctTaxAmount,
          explanation: 'Ofarin! Kontrakt summasining 12%i davlat byudjetidan qaytariladi.',
        },
        {
          text: '0 so\'m',
          amount: 0,
          explanation: 'OTM kontrakt to\'lovlariga 12% soliq chegirmasi kafolatlangan.',
        },
        {
          text: `${Math.round(grossAmount * 0.05).toLocaleString('uz-UZ')} so'm`,
          amount: Math.round(grossAmount * 0.05),
          explanation: 'Chegirma stavkasi JSHODS stavkasiga (12%) teng.',
        },
        {
          text: `${Math.round(grossAmount * 0.20).toLocaleString('uz-UZ')} so'm`,
          amount: Math.round(grossAmount * 0.20),
          explanation: 'Bunday yuqori chegirma mavjud emas.',
        },
      ],
      lawArticle: 'O\'zR Soliq kodeksi, 378-modda',
      lawSummary: 'Soliq to\'lovchining OTMlarda o\'qish uchun o\'tkazgan mablag\'lariga 12% soliq chegirmasi beriladi.',
      penaltyIfWrong: 200000,
      bonusIfRight: 350000,
      tip: 'Kontrakt to\'lovidan 12% miqdorida soliq qaytarib olinadi!',
    };
  }

  const grossAmount = 4500000 + ((day * 850000) % 10000000);
  return {
    id: `sc_dyn_${day}`,
    dayNumber: day,
    dayName,
    title: 'Frilans buyurtmasi: O\'zini o\'zi band qilgan mutaxassis',
    category: 'frilans',
    story: `Mijoz uchun dasturlash va dizayn xizmatini yakunlab ${grossAmount.toLocaleString('uz-UZ')} so'm daromad oldingiz. O'zini o\'zi band qilgan shaxs sifatida soliqni hisoblang.`,
    grossAmount,
    correctTaxAmount: 0,
    correctOptionIndex: 0,
    options: [
      {
        text: '0 so\'m',
        amount: 0,
        explanation: 'To\'g\'ri! PQ-4755 qaroriga binoan o\'zini o\'zi band qilganlar daromad solig\'idan ozod.',
      },
      {
        text: `${Math.round(grossAmount * 0.12).toLocaleString('uz-UZ')} so'm`,
        amount: Math.round(grossAmount * 0.12),
        explanation: 'O\'zini o\'zi band qilgan maqomida daromad solig\'i 0% bo\'ladi.',
      },
      {
        text: `${Math.round(grossAmount * 0.04).toLocaleString('uz-UZ')} so'm`,
        amount: Math.round(grossAmount * 0.04),
        explanation: '4% bu YaTT uchun stavka.',
      },
      {
        text: `${Math.round(grossAmount * 0.075).toLocaleString('uz-UZ')} so'm`,
        amount: Math.round(grossAmount * 0.075),
        explanation: 'O\'zini o\'zi band qilganlar uchun 0%.',
      },
    ],
    lawArticle: 'PQ-4755-son qaror',
    lawSummary: 'O\'zini o\'zi band qilgan shaxslar jismoniy shaxslardan olinadigan daromad solig\'i to\'lashdan ozod qilingan.',
    penaltyIfWrong: 200000,
    bonusIfRight: 250000,
    tip: 'O\'zini o\'zi band qilgan talaba va frilanserlar daromad solig\'idan ozod!',
  };
}

export function getScenarioForDay(
  day: number,
  mode: 'yatt' | 'mchj' | null = 'yatt',
  _difficulty: 'oson' | 'orta' | 'qiyin' = 'orta',
  companyName: string = ''
): TaxScenario {
  if (mode === 'mchj') {
    const existing = MCHJ_SCENARIOS.find((s) => s.dayNumber === day);
    if (existing) return existing;
    // For days beyond curated list, progressively cycle or generate
    const cycleIndex = (day - 1) % MCHJ_SCENARIOS.length;
    const base = MCHJ_SCENARIOS[cycleIndex];
    if (base && day <= MCHJ_SCENARIOS.length * 2) {
      return {
        ...base,
        id: `${base.id}_d${day}`,
        dayNumber: day,
      };
    }
    return generateProceduralMChJScenario(day, 'orta', companyName || 'Kompaniya MChJ');
  }

  if (mode === 'yatt') {
    const existing = YATT_SCENARIOS.find((s) => s.dayNumber === day);
    if (existing) return existing;
    // For days beyond curated list, cycle through or generate progressively
    const cycleIndex = (day - 1) % YATT_SCENARIOS.length;
    const base = YATT_SCENARIOS[cycleIndex];
    if (base && day <= YATT_SCENARIOS.length * 2) {
      return {
        ...base,
        id: `${base.id}_d${day}`,
        dayNumber: day,
      };
    }
    return generateProceduralYaTTScenario(day, 'orta');
  }

  const existing = TAX_SCENARIOS.find((s) => s.dayNumber === day);
  if (existing) return existing;
  return generateProceduralScenario(day);
}

