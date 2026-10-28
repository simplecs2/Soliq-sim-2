export type Language = 'uz' | 'ru' | 'en';

export interface Translations {
  // Navigation & General
  appTitle: string;
  subTitle: string;
  modeYaTT: string;
  modeMChJ: string;
  modeTagYaTT: string;
  modeTagMChJ: string;
  day: string;
  month: string;
  streak: string;
  player: string;
  company: string;
  soundToggleOn: string;
  soundToggleOff: string;
  resetGame: string;
  resetModalTitle: string;
  resetModalDesc: string;
  cancel: string;
  confirmReset: string;
  save: string;
  close: string;
  edit: string;
  proceed: string;
  start: string;
  leaders: string;
  settings: string;
  currency: string;

  // Profile Card & Education Modal
  playerProfile: string;
  profession: string;
  professionValue: string;
  studyPlace: string;
  course: string;
  editEducationTitle: string;
  editEducationSubtitle: string;
  studyPlaceLabel: string;
  studyPlacePlaceholder: string;
  courseLabel: string;
  coursePlaceholder: string;
  dailyBudget: string;

  // Financial Dashboard
  availableBalance: string;
  companyBalance: string;
  totalIncome: string;
  taxLiteracy: string;
  taxLiteracyLevel: {
    beginner: string;
    intermediate: string;
    advanced: string;
    expert: string;
  };
  stateRating: string;
  stateRatingGood: string;
  stateRatingAverage: string;
  stateRatingRisk: string;
  bankBlockedTitle: string;
  bankBlockedDesc: string;

  // Income Sources (YaTT)
  incomeSources: string;
  turnoverTax: string;
  taxArticle467: string;
  taxArticle468: string;
  freelanceIT: string;
  freelanceITDesc: string;
  marketplace: string;
  marketplaceDesc: string;
  services: string;
  servicesDesc: string;
  rental: string;
  rentalDesc: string;

  // Daily Mission / Day Plan
  dayPlanTitle: string;
  todayIncome: string;
  startCalculation: string;
  alreadyPaidToday: string;
  allDaysCompleted: string;

  // Calculation Screen
  calculateTitle: string;
  selectTaxAmount: string;
  confirm: string;
  calculator: string;
  calcGross: string;
  calcRate: string;
  calcResult: string;
  calcPaste: string;
  timeRemaining: string;
  deductionCaseBadge: string;
  standardCaseBadge: string;

  // Result Screen
  correctResult: string;
  wrongResult: string;
  penalty: string;
  bonus: string;
  nextDay: string;
  analysisTitle: string;
  legalBasis: string;
  correctAmountLabel: string;
  yourChoiceLabel: string;
  practicalTip: string;

  // Bottom Navigation
  navHome: string;
  navEducation: string;
  navStats: string;
  navAdvisor: string;

  // AI Advisor Screen
  aiAdvisorTitle: string;
  aiAdvisorSub: string;
  aiThinkingBadge: string;
  aiInputPlaceholder: string;
  aiSend: string;
  askMistakeChip: string;
  askUzumChip: string;
  askRentalChip: string;
  askFreelanceChip: string;
  askMchjQQSChip: string;
  askMchjProfitChip: string;
  askMchjSocialChip: string;
  askMchjDivChip: string;

  // MChJ Mode
  mchjReportTitle: string;
  mchjMonthlyDeclaration: string;
  mchjSalesRevenue: string;
  mchjServicesRevenue: string;
  mchjExportRevenue: string;
  mchjTotalTurnover: string;
  mchjSalaries: string;
  mchjRent: string;
  mchjMaterials: string;
  mchjMarketing: string;
  mchjTotalExpenses: string;
  mchjQQSSection: string;
  mchjProfitSection: string;
  mchjSocialSection: string;
  mchjSubmitTaxes: string;
  mchjMonthFinished: string;
  mchjCompletedAllMonths: string;
  nextMonth: string;

  // Statistics
  statsTitle: string;
  totalTaxesPaid: string;
  totalFinesPaid: string;
  bestStreak: string;
  historyTitle: string;
  noHistoryYet: string;
}

export const translations: Record<Language, Translations> = {
  uz: {
    appTitle: "Soliq Sim",
    subTitle: "O'zbekiston yoshlari soliq simulyatori",
    modeYaTT: "YaTT (Yakka tartibdagi tadbirkor)",
    modeMChJ: "MChJ (Mas'uliyati cheklangan jamiyat)",
    modeTagYaTT: "👤 Rejim: YaTT",
    modeTagMChJ: "🏢 Rejim: MChJ",
    day: "kun",
    month: "oy",
    streak: "seriya",
    player: "O'yinchi",
    company: "Kompaniya",
    soundToggleOn: "Ovozni o'chirish",
    soundToggleOff: "Ovozni yoqish",
    resetGame: "O'yinni qayta boshlash",
    resetModalTitle: "O'yinni yangitdan boshlaysizmi?",
    resetModalDesc: "Barcha to'plangan balans, soliq reytingi va to'lovlar tarixi nollashtiriladi.",
    cancel: "Bekor qilish",
    confirmReset: "Ha, nollash",
    save: "Saqlash",
    close: "Yopish",
    edit: "O'zgartirish",
    proceed: "Davom etish",
    start: "Boshlash",
    leaders: "Liderlar",
    settings: "Sozlamalar",
    currency: "so'm",

    playerProfile: "O'YINCHI PROFILI",
    profession: "Kasbi",
    professionValue: "Veb-dasturchi",
    studyPlace: "O'quv yurti",
    course: "Kurs",
    editEducationTitle: "Ta'lim ma'lumotlarini o'zgartirish",
    editEducationSubtitle: "O'quv yurti va kursingizni yangilang",
    studyPlaceLabel: "O'quv yurti (Universitet / Institut / Kollej)",
    studyPlacePlaceholder: "Masalan: Toshkent Axborot Texnologiyalari Universiteti",
    courseLabel: "Kurs",
    coursePlaceholder: "Masalan: 3-kurs",
    dailyBudget: "Kunlik byudjet",

    availableBalance: "Mavjud balans",
    companyBalance: "Kompaniya balansi",
    totalIncome: "Jami daromad",
    taxLiteracy: "Soliq madaniyati",
    taxLiteracyLevel: {
      beginner: "Boshlang'ich",
      intermediate: "O'rtacha",
      advanced: "Yuksalayotgan",
      expert: "Ekspert daraja",
    },
    stateRating: "Davlat Soliq Reytingi",
    stateRatingGood: "A'lo darajada: Davlat xizmatlari va imtiyozlari ochiq",
    stateRatingAverage: "O'rtacha: Soliq to'lovlarini o'z vaqtida amalga oshiring",
    stateRatingRisk: "Xavfli daraja: Soliq tekshiruvi xavfi mavjud",
    bankBlockedTitle: "Bank hisobi vaqtinchalik cheklandi!",
    bankBlockedDesc: "Soliq to'lovlarini kechiktirish natijasida hisob cheklandi. Bugun soliqni to'g'ri to'lab hisobingizni oching!",

    incomeSources: "Daromad manbalari",
    turnoverTax: "Aylanma solig'i",
    taxArticle467: "O'zR SK 467-modda",
    taxArticle468: "O'zR SK 468-modda",
    freelanceIT: "Frilans & IT",
    freelanceITDesc: "Dasturlash va dizayn",
    marketplace: "Marketplace",
    marketplaceDesc: "Uzum Market savdosi",
    services: "Xizmatlar",
    servicesDesc: "O'quv va konsalting",
    rental: "Ko'chmas mulk",
    rentalDesc: "Noturar joy ijarasi",

    dayPlanTitle: "Kunlik reja",
    todayIncome: "Bugungi tushum (daromad):",
    startCalculation: "Hisoblashni boshlash",
    alreadyPaidToday: "Bugungi soliq to'langan! Keyingi kunga o'ting.",
    allDaysCompleted: "Tabriklaymiz! Barcha kunlar muvaffaqiyatli yakunlandi.",

    calculateTitle: "Soliq hisob-kitobi",
    selectTaxAmount: "To'lanishi lozim bo'lgan soliq miqdorini tanlang:",
    confirm: "Tasdiqlash",
    calculator: "Kalkulyator",
    calcGross: "Aylanma / Baza summasi",
    calcRate: "Foiz stavkasi (%)",
    calcResult: "Hisoblangan soliq",
    calcPaste: "Natijani nusxalash",
    timeRemaining: "Qolgan vaqt:",
    deductionCaseBadge: "Soliq imtiyozi / Qaytarish",
    standardCaseBadge: "Standart amaliyot",

    correctResult: "To'g'ri hisoblandi!",
    wrongResult: "Xato hisoblandi!",
    penalty: "Jarima",
    bonus: "Rag'batlantirish",
    nextDay: "Keyingi kunga o'tish",
    analysisTitle: "Hisob-kitob tahlili",
    legalBasis: "Qonuniy asos",
    correctAmountLabel: "To'g'ri soliq summasi:",
    yourChoiceLabel: "Sizning tanlovingiz:",
    practicalTip: "Amaliy maslahat:",

    navHome: "Bosh sahifa",
    navEducation: "Qoidalar",
    navStats: "Statistika",
    navAdvisor: "Maslahatchi",

    aiAdvisorTitle: "Soliq Maslahatchisi",
    aiAdvisorSub: "uchun shaxsiy soliq yordamchisi va xatolar tahlili",
    aiThinkingBadge: "High Thinking",
    aiInputPlaceholder: "Soliq, aylanma, Uzum Market yoki ijara haqida so'rang...",
    aiSend: "Yuborish",
    askMistakeChip: "🔍 Oxirgi xatoyimni tushuntirib ber",
    askUzumChip: "🛍️ Uzum Market brutto aylanmasidan soliq qoidasi",
    askRentalChip: "🏢 Noturar joy ijarasidan YaTT solig'i",
    askFreelanceChip: "💻 Dizayn va IT xizmatlari solig'i",
    askMchjQQSChip: "📊 QQS va Eksportda 0% stavka qanday ishlaydi?",
    askMchjProfitChip: "🏢 Sof foydadan 15% foyda solig'i",
    askMchjSocialChip: "👥 Xodimlar maosh fondidan 12% ijtimoiy soliq",
    askMchjDivChip: "💰 Ta'sischilarga 5% dividend solig'i",

    mchjReportTitle: "Oylik Soliq Deklaratsiyasi",
    mchjMonthlyDeclaration: "MChJ buxgalteriya hisoboti",
    mchjSalesRevenue: "Savdo tushumi",
    mchjServicesRevenue: "Xizmatlar tushumi",
    mchjExportRevenue: "Eksport (0% QQS)",
    mchjTotalTurnover: "Jami aylanma",
    mchjSalaries: "Ish haqi fondi (FOT)",
    mchjRent: "Ijara xarajati",
    mchjMaterials: "Xomashyo va tovarlar",
    mchjMarketing: "Marketing va reklama",
    mchjTotalExpenses: "Jami xarajatlar",
    mchjQQSSection: "Qo'shilgan qiymat solig'i (QQS)",
    mchjProfitSection: "Foyda solig'i",
    mchjSocialSection: "Ijtimoiy soliq",
    mchjSubmitTaxes: "Soliq hisobotini topshirish",
    mchjMonthFinished: "Oylik hisobot qabul qilindi!",
    mchjCompletedAllMonths: "Barcha 12 oy muvaffaqiyatli yakunlandi!",
    nextMonth: "Keyingi oyga o'tish",

    statsTitle: "Moliyaviy ko'rsatkichlar",
    totalTaxesPaid: "Jami to'langan soliqlar",
    totalFinesPaid: "Jami to'langan jarimalar",
    bestStreak: "Eng yaxshi to'g'ri seriya",
    historyTitle: "To'lovlar tarixi",
    noHistoryYet: "Hali to'lovlar amalga oshirilmagan",
  },

  ru: {
    appTitle: "Soliq Sim",
    subTitle: "Налоговый симулятор для молодежи Узбекистана",
    modeYaTT: "ИП (Индивидуальный предприниматель)",
    modeMChJ: "ООО (Общество с ограниченной ответственностью)",
    modeTagYaTT: "👤 Режим: ИП",
    modeTagMChJ: "🏢 Режим: ООО",
    day: "день",
    month: "мес.",
    streak: "серия",
    player: "Игрок",
    company: "Компания",
    soundToggleOn: "Выключить звук",
    soundToggleOff: "Включить звук",
    resetGame: "Начать игру заново",
    resetModalTitle: "Начать игру сначала?",
    resetModalDesc: "Весь накопленный баланс, налоговый рейтинг и история платежей будут сброшены.",
    cancel: "Отмена",
    confirmReset: "Да, сбросить",
    save: "Сохранить",
    close: "Закрыть",
    edit: "Изменить",
    proceed: "Продолжить",
    start: "Начать",
    leaders: "Лидеры",
    settings: "Настройки",
    currency: "сум",

    playerProfile: "ПРОФИЛЬ ИГРОКА",
    profession: "Профессия",
    professionValue: "Веб-разработчик",
    studyPlace: "Место учебы",
    course: "Курс",
    editEducationTitle: "Изменение данных об образовании",
    editEducationSubtitle: "Обновите ваше учебное заведение и курс",
    studyPlaceLabel: "Учебное заведение (Университет / Институт / Колледж)",
    studyPlacePlaceholder: "Например: Ташкентский университет информационных технологий",
    courseLabel: "Курс",
    coursePlaceholder: "Например: 3-й курс",
    dailyBudget: "Дневной бюджет",

    availableBalance: "Текущий баланс",
    companyBalance: "Баланс компании",
    totalIncome: "Общий доход",
    taxLiteracy: "Налоговая грамотность",
    taxLiteracyLevel: {
      beginner: "Начальный",
      intermediate: "Средний",
      advanced: "Продвинутый",
      expert: "Эксперт",
    },
    stateRating: "Государственный налоговый рейтинг",
    stateRatingGood: "Отлично: Доступны государственные субсидии и льготы",
    stateRatingAverage: "Средне: Оплачивайте налоги своевременно",
    stateRatingRisk: "Риск: Высокая вероятность налоговой проверки",
    bankBlockedTitle: "Банковский счет временно заблокирован!",
    bankBlockedDesc: "Из-за ошибок или задержек налогов рейтинг упал. Рассчитайте налог правильно сегодня, чтобы разблокировать счет!",

    incomeSources: "Источники дохода",
    turnoverTax: "Налог с оборота",
    taxArticle467: "НК РУз, ст. 467",
    taxArticle468: "НК РУз, ст. 468",
    freelanceIT: "Фриланс и IT",
    freelanceITDesc: "Разработка и дизайн",
    marketplace: "Маркетплейс",
    marketplaceDesc: "Торговля на Uzum Market",
    services: "Услуги",
    servicesDesc: "Консалтинг и обучение",
    rental: "Недвижимость",
    rentalDesc: "Аренда коммерческих помещений",

    dayPlanTitle: "План на день",
    todayIncome: "Дневной доход (выручка):",
    startCalculation: "Начать расчет",
    alreadyPaidToday: "Налог за сегодня уплачен! Переходите к следующему дню.",
    allDaysCompleted: "Поздравляем! Все игровые дни успешно пройдены.",

    calculateTitle: "Расчет налога",
    selectTaxAmount: "Выберите сумму налога к уплате:",
    confirm: "Подтвердить",
    calculator: "Калькулятор",
    calcGross: "Оборот / Налоговая база",
    calcRate: "Ставка налога (%)",
    calcResult: "Рассчитанный налог",
    calcPaste: "Скопировать результат",
    timeRemaining: "Осталось времени:",
    deductionCaseBadge: "Налоговый вычет / Возврат",
    standardCaseBadge: "Практический кейс",

    correctResult: "Правильно рассчитано!",
    wrongResult: "Ошибка в расчете!",
    penalty: "Штраф",
    bonus: "Поощрение",
    nextDay: "Перейти к следующему дню",
    analysisTitle: "Анализ расчета",
    legalBasis: "Правовое основание",
    correctAmountLabel: "Правильная сумма налога:",
    yourChoiceLabel: "Ваш выбор:",
    practicalTip: "Практический совет:",

    navHome: "Главная",
    navEducation: "Правила",
    navStats: "Статистика",
    navAdvisor: "Советник",

    aiAdvisorTitle: "Налоговый Советник",
    aiAdvisorSub: "персональный налоговый ассистент и разбор ошибок для",
    aiThinkingBadge: "High Thinking",
    aiInputPlaceholder: "Спросите о налогах, обороте, Uzum Market или аренде...",
    aiSend: "Отправить",
    askMistakeChip: "🔍 Объясни мою последнюю ошибку",
    askUzumChip: "🛍️ Как считать налог с валового оборота Uzum Market?",
    askRentalChip: "🏢 Налог при сдаче коммерческой недвижимости ИП",
    askFreelanceChip: "💻 Налог с IT-услуг и UI/UX дизайна",
    askMchjQQSChip: "📊 Как работает ставка НДС и 0% при экспорте?",
    askMchjProfitChip: "🏢 Налог на прибыль 15% с чистой прибыли",
    askMchjSocialChip: "👥 Социальный налог 12% от фонда оплаты труда",
    askMchjDivChip: "💰 Налог 5% на дивиденды учредителей",

    mchjReportTitle: "Ежемесячная налоговая декларация",
    mchjMonthlyDeclaration: "Бухгалтерский отчет ООО",
    mchjSalesRevenue: "Выручка от торговли",
    mchjServicesRevenue: "Выручка от услуг",
    mchjExportRevenue: "Экспорт (0% НДС)",
    mchjTotalTurnover: "Общий оборот",
    mchjSalaries: "Фонд оплаты труда (ФОТ)",
    mchjRent: "Расходы на аренду",
    mchjMaterials: "Сырье и товары",
    mchjMarketing: "Маркетинг и реклама",
    mchjTotalExpenses: "Всего расходов",
    mchjQQSSection: "Налог на добавленную стоимость (НДС)",
    mchjProfitSection: "Налог на прибыль",
    mchjSocialSection: "Социальный налог",
    mchjSubmitTaxes: "Подать налоговый отчет",
    mchjMonthFinished: "Ежемесячный отчет принят!",
    mchjCompletedAllMonths: "Все 12 месяцев успешно завершены!",
    nextMonth: "Перейти к следующему месяцу",

    statsTitle: "Финансовые показатели",
    totalTaxesPaid: "Всего уплачено налогов",
    totalFinesPaid: "Всего уплачено штрафов",
    bestStreak: "Лучшая серия без ошибок",
    historyTitle: "История платежей",
    noHistoryYet: "Платежи пока не совершались",
  },

  en: {
    appTitle: "Soliq Sim",
    subTitle: "Uzbekistan Youth Tax Literacy Simulator",
    modeYaTT: "Sole Proprietor (YaTT)",
    modeMChJ: "Limited Liability Company (LLC / MChJ)",
    modeTagYaTT: "👤 Mode: Sole Proprietor",
    modeTagMChJ: "🏢 Mode: LLC",
    day: "day",
    month: "mo.",
    streak: "streak",
    player: "Player",
    company: "Company",
    soundToggleOn: "Mute sound",
    soundToggleOff: "Unmute sound",
    resetGame: "Restart game",
    resetModalTitle: "Restart the simulation?",
    resetModalDesc: "All accumulated balance, tax literacy rating, and payment history will be reset to defaults.",
    cancel: "Cancel",
    confirmReset: "Yes, reset",
    save: "Save",
    close: "Close",
    edit: "Edit",
    proceed: "Continue",
    start: "Start",
    leaders: "Leaderboard",
    settings: "Settings",
    currency: "UZS",

    playerProfile: "PLAYER PROFILE",
    profession: "Profession",
    professionValue: "Web Developer",
    studyPlace: "Institution",
    course: "Year / Course",
    editEducationTitle: "Update Education Profile",
    editEducationSubtitle: "Update your educational institution and academic year",
    studyPlaceLabel: "Educational Institution (University / College)",
    studyPlacePlaceholder: "e.g., Tashkent University of Information Technologies",
    courseLabel: "Course / Year",
    coursePlaceholder: "e.g., 3rd Year",
    dailyBudget: "Daily budget",

    availableBalance: "Available Balance",
    companyBalance: "Company Balance",
    totalIncome: "Total Revenue",
    taxLiteracy: "Tax Literacy",
    taxLiteracyLevel: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      expert: "Expert",
    },
    stateRating: "State Tax Compliance Rating",
    stateRatingGood: "Excellent: Eligible for government tenders and subsidies",
    stateRatingAverage: "Average: Pay statutory taxes on time to improve status",
    stateRatingRisk: "High Risk: High probability of tax audits and penalties",
    bankBlockedTitle: "Bank Account Temporarily Restricted!",
    bankBlockedDesc: "Due to tax payment delays or calculation errors, your rating declined. Pay correctly today to lift the restriction!",

    incomeSources: "Revenue Streams",
    turnoverTax: "Turnover Tax",
    taxArticle467: "Tax Code Art. 467",
    taxArticle468: "Tax Code Art. 468",
    freelanceIT: "Freelance & IT",
    freelanceITDesc: "Coding and UI/UX design",
    marketplace: "Marketplace",
    marketplaceDesc: "E-commerce on Uzum Market",
    services: "Services",
    servicesDesc: "Tutoring & consulting",
    rental: "Commercial Real Estate",
    rentalDesc: "Office space leasing",

    dayPlanTitle: "Daily Mission",
    todayIncome: "Today's Gross Inflow:",
    startCalculation: "Begin Calculation",
    alreadyPaidToday: "Tax for today has been filed! Proceed to the next day.",
    allDaysCompleted: "Congratulations! You have completed all scheduled days.",

    calculateTitle: "Tax Computation",
    selectTaxAmount: "Select the statutory tax liability to pay:",
    confirm: "Confirm Payment",
    calculator: "Calculator",
    calcGross: "Turnover / Tax Base",
    calcRate: "Tax Rate (%)",
    calcResult: "Calculated Tax",
    calcPaste: "Copy Result",
    timeRemaining: "Time remaining:",
    deductionCaseBadge: "Tax Deduction / Reimbursement",
    standardCaseBadge: "Practical Case",

    correctResult: "Correct Calculation!",
    wrongResult: "Calculation Error!",
    penalty: "Penalty",
    bonus: "Compliance Bonus",
    nextDay: "Proceed to Next Day",
    analysisTitle: "Calculation Breakdown",
    legalBasis: "Legal Statute",
    correctAmountLabel: "Statutory Tax Liability:",
    yourChoiceLabel: "Your Submission:",
    practicalTip: "Practical Guidance:",

    navHome: "Home",
    navEducation: "Rules",
    navStats: "Analytics",
    navAdvisor: "Advisor",

    aiAdvisorTitle: "AI Tax Advisor",
    aiAdvisorSub: "Personal tax advisor & error breakdown for",
    aiThinkingBadge: "High Thinking",
    aiInputPlaceholder: "Ask about tax rates, Uzum Market turnover, or leasing...",
    aiSend: "Send",
    askMistakeChip: "🔍 Explain my last calculation error",
    askUzumChip: "🛍️ How does marketplace gross turnover tax work?",
    askRentalChip: "🏢 Sole proprietor commercial leasing tax rules",
    askFreelanceChip: "💻 Freelance design & software tax rates",
    askMchjQQSChip: "📊 VAT 12% and 0% export rate calculation",
    askMchjProfitChip: "🏢 Corporate profit tax 15% on net profit",
    askMchjSocialChip: "👥 Payroll social tax 12% on wages",
    askMchjDivChip: "💰 Shareholder dividend withholding tax 5%",

    mchjReportTitle: "Monthly Tax Declaration",
    mchjMonthlyDeclaration: "Corporate Accounting Filing",
    mchjSalesRevenue: "Trade Revenue",
    mchjServicesRevenue: "Services Revenue",
    mchjExportRevenue: "Export (0% VAT)",
    mchjTotalTurnover: "Total Turnover",
    mchjSalaries: "Payroll Expense (Gross)",
    mchjRent: "Rent Expense",
    mchjMaterials: "Raw Materials & Goods",
    mchjMarketing: "Marketing & Ads",
    mchjTotalExpenses: "Total Deductible Expenses",
    mchjQQSSection: "Value Added Tax (VAT)",
    mchjProfitSection: "Corporate Profit Tax",
    mchjSocialSection: "Social Payroll Tax",
    mchjSubmitTaxes: "Submit Monthly Tax Filing",
    mchjMonthFinished: "Monthly Declaration Approved!",
    mchjCompletedAllMonths: "All 12 fiscal months completed successfully!",
    nextMonth: "Advance to Next Month",

    statsTitle: "Financial Analytics",
    totalTaxesPaid: "Total Taxes Remitted",
    totalFinesPaid: "Total Penalties Incurred",
    bestStreak: "Best Consecutive Accuracy",
    historyTitle: "Filing History",
    noHistoryYet: "No filings recorded yet",
  },
};
