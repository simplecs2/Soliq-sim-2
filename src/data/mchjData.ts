import { MChJFinancials, MChJMonthEvent, TaxOption } from '../types/game';

export const MCHJ_MONTHS = [
  'Yanvar 2026',
  'Fevral 2026',
  'Mart 2026',
  'Aprel 2026',
  'May 2026',
  'Iyun 2026',
  'Iyul 2026',
  'Avgust 2026',
  'Sentyabr 2026',
  'Oktyabr 2026',
  'Noyabr 2026',
  'Dekabr 2026',
];

export const INITIAL_MCHJ_EVENTS: Record<number, MChJMonthEvent> = {
  3: {
    id: 'evt_export_1',
    type: 'export_boost',
    title: 'Eksport imkoniyati (Xorijiy shartnoma)',
    description: 'Qozog\'iston va Yevropa hamkorlari bilan yirik eksport shartnomasi imzolandi. Eksport tushumi 30% ga oshdi!',
    impactText: 'Eksport tovarlari realizatsiyasiga O\'zR Soliq kodeksi 260-moddasiga muvofiq 0% QQS stavkasi qo\'llaniladi.',
  },
  5: {
    id: 'evt_hiring_1',
    type: 'hiring',
    title: 'Xodimlar ko\'payishi (Kengayish)',
    description: 'Kompaniya yangi filial ochib, 4 nafar yangi mutaxassisni ishga qabul qildi. Ish haqi fondi 20% ga oshdi.',
    impactText: 'Xodimlar maoshi fondidan to\'lanadigan 12% ijtimoiy soliq miqdori shunga mos oshadi.',
  },
  6: {
    id: 'evt_audit_1',
    type: 'audit',
    title: 'Soliq tekshiruvi (Kameral nazorat)',
    description: 'Davlat soliq inspeksiyasi yarim yillik faoliyat bo\'yicha kameral soliq tekshiruvini boshladi.',
    impactText: 'Agar hisobotlarda xatolik aniqlansa, jarima miqdori 2 barobar (x2) qo\'llaniladi!',
  },
  8: {
    id: 'evt_recession_1',
    type: 'recession',
    title: 'Mavsumiy pasayish',
    description: 'Yozgi ta\'tillar munosabati bilan ichki bozorda savdo va xizmatlar aylanmasi 20% ga pasaydi.',
    impactText: 'Tushum kamayishi natijasida soliqqa tortiladigan aylanma va foyda ham kamayadi.',
  },
  10: {
    id: 'evt_export_2',
    type: 'export_boost',
    title: 'Katta eksport partiyasi',
    description: 'Kuz mavsumida xorijga maxsulot yetkazib berish bo\'yicha yangi yirik kontrakt amalga oshirildi.',
    impactText: 'Eksportga 0% QQS qo\'llashni unutmang, bu QQS summasini tejaydi.',
  },
  11: {
    id: 'evt_audit_2',
    type: 'audit',
    title: 'Yil yakuniy soliq auditi',
    description: 'Moliya yili yakunlanishi munosabati bilan soliq organlari hisob-kitoblar aniqligini tekshirmoqda.',
    impactText: 'Har qanday xatolik uchun 2 baravar jarima hisoblanadi.',
  },
};

// Generates full month financials and choice options
export function getMChJFinancialsForMonth(
  monthIndex: number, // 1 to 12
  difficulty: 'oson' | 'orta' | 'qiyin' = 'orta'
): MChJFinancials {
  const monthName = MCHJ_MONTHS[(monthIndex - 1) % 12];
  const event = INITIAL_MCHJ_EVENTS[monthIndex] || null;

  // Base monthly parameters (multiplied or shifted per month)
  let baseSales = 120000000 + ((monthIndex * 9500000) % 50000000);
  let baseServices = 30000000 + ((monthIndex * 4000000) % 20000000);
  let baseExport = 40000000 + ((monthIndex * 6000000) % 35000000);

  let baseSalaries = 38000000 + ((monthIndex * 2500000) % 15000000);
  let baseRent = 12000000;
  let baseMaterials = 26000000 + ((monthIndex * 3500000) % 20000000);
  let baseMarketing = 6000000 + ((monthIndex * 1500000) % 6000000);

  // Apply event impacts
  if (event) {
    if (event.type === 'export_boost') {
      baseExport = Math.round(baseExport * 1.3);
    } else if (event.type === 'hiring') {
      baseSalaries = Math.round(baseSalaries * 1.2);
    } else if (event.type === 'recession') {
      baseSales = Math.round(baseSales * 0.8);
      baseServices = Math.round(baseServices * 0.8);
    }
  }

  // Round values to nice thousands
  const salesRevenue = Math.round(baseSales / 100000) * 100000;
  const servicesRevenue = Math.round(baseServices / 100000) * 100000;
  const exportRevenue = Math.round(baseExport / 100000) * 100000;
  const totalTurnover = salesRevenue + servicesRevenue + exportRevenue;

  // QQS Taxable turnover: ONLY Sales + Services (Export is 0% QQS under Tax Code art. 260!)
  const taxableTurnoverQQS = salesRevenue + servicesRevenue;

  const salariesExpense = Math.round(baseSalaries / 100000) * 100000;
  const rentExpense = Math.round(baseRent / 100000) * 100000;
  const materialsExpense = Math.round(baseMaterials / 100000) * 100000;
  const marketingExpense = Math.round(baseMarketing / 100000) * 100000;
  const totalExpenses = salariesExpense + rentExpense + materialsExpense + marketingExpense;

  // 1) QQS calculation: (Savdo + Xizmatlar) * 12%
  const correctQQS = Math.round(taxableTurnoverQQS * 0.12);

  // 2) Foyda solig'i: (Umumiy aylanma - Xarajatlar - QQS) * 15%
  const netBeforeProfitTax = Math.max(0, totalTurnover - totalExpenses - correctQQS);
  const correctFoyda = Math.round(netBeforeProfitTax * 0.15);

  // 3) Ijtimoiy soliq: Xodimlar maoshi * 12%
  const correctIjtimoiy = Math.round(salariesExpense * 0.12);

  const totalTaxLiability = correctQQS + correctFoyda + correctIjtimoiy;

  // --- Choices for QQS (12% of taxable turnover) ---
  const wrongQQSWithExport = Math.round(totalTurnover * 0.12); // Common mistake: taxed export at 12%
  const wrongQQS15Percent = Math.round(taxableTurnoverQQS * 0.15); // Old 15% VAT rate
  const wrongQQSTurnover4 = Math.round(totalTurnover * 0.04); // Confused with YaTT 4%

  let qqsPool: TaxOption[] = [
    {
      text: `${correctQQS.toLocaleString('uz-UZ')} so'm`,
      amount: correctQQS,
      explanation: `To'g'ri! (${salesRevenue.toLocaleString('uz-UZ')} + ${servicesRevenue.toLocaleString('uz-UZ')}) × 12% = ${correctQQS.toLocaleString('uz-UZ')} so'm. Eksportga 0% QQS qo'llaniladi (SK 258-modda).`,
    },
    {
      text: `${wrongQQSWithExport.toLocaleString('uz-UZ')} so'm`,
      amount: wrongQQSWithExport,
      explanation: 'Xato! Eksport tushumiga 0% QQS stavkasi qo\'llaniladi, uni 12% ga qo\'shmaslik kerak.',
    },
    {
      text: `${wrongQQS15Percent.toLocaleString('uz-UZ')} so'm`,
      amount: wrongQQS15Percent,
      explanation: 'Eski stavka! O\'zbekistonda amaldagi QQS stavkasi 12% hisoblanadi.',
    },
    {
      text: `${wrongQQSTurnover4.toLocaleString('uz-UZ')} so'm`,
      amount: wrongQQSTurnover4,
      explanation: '4% bu YaTT aylanma solig\'i, QQS to\'lovchi MChJ uchun emas.',
    },
  ];

  // Adjust distractors for Qiyin / Oson
  if (difficulty === 'qiyin') {
    qqsPool[2] = {
      text: `${Math.round(taxableTurnoverQQS * 0.115).toLocaleString('uz-UZ')} so'm`,
      amount: Math.round(taxableTurnoverQQS * 0.115),
      explanation: 'QQS stavkasi qat\'iy 12% ni tashkil etadi.',
    };
    qqsPool[3] = {
      text: `${Math.round(taxableTurnoverQQS * 0.125).toLocaleString('uz-UZ')} so'm`,
      amount: Math.round(taxableTurnoverQQS * 0.125),
      explanation: 'Stavka 12.5% emas, 12% dir.',
    };
  }

  const correctQQSOptionIndex = (monthIndex * 2) % 4;
  const tempQQS = qqsPool[0];
  qqsPool[0] = qqsPool[correctQQSOptionIndex];
  qqsPool[correctQQSOptionIndex] = tempQQS;

  // --- Choices for Foyda solig'i (15% of Net profit) ---
  const wrongFoydaWithoutQQS = Math.round(Math.max(0, totalTurnover - totalExpenses) * 0.15); // Forgot to deduct QQS
  const wrongFoyda12Percent = Math.round(netBeforeProfitTax * 0.12); // Confused with 12% rate
  const wrongFoyda4Turnover = Math.round(totalTurnover * 0.04);

  let foydaPool: TaxOption[] = [
    {
      text: `${correctFoyda.toLocaleString('uz-UZ')} so'm`,
      amount: correctFoyda,
      explanation: `To'g'ri! (${totalTurnover.toLocaleString('uz-UZ')} - ${totalExpenses.toLocaleString('uz-UZ')} - ${correctQQS.toLocaleString('uz-UZ')}) × 15% = ${correctFoyda.toLocaleString('uz-UZ')} so'm (SK 337-modda).`,
    },
    {
      text: `${wrongFoydaWithoutQQS.toLocaleString('uz-UZ')} so'm`,
      amount: wrongFoydaWithoutQQS,
      explanation: 'Xato! Soliq solinadigan foydani hisoblashda hisoblangan QQS summasi tushumdan chegirilishi shart.',
    },
    {
      text: `${wrongFoyda12Percent.toLocaleString('uz-UZ')} so'm`,
      amount: wrongFoyda12Percent,
      explanation: '12% bu QQS va JSHODS stavkasi. MChJ foyda solig\'i stavkasi esa 15%.',
    },
    {
      text: `${wrongFoyda4Turnover.toLocaleString('uz-UZ')} so'm`,
      amount: wrongFoyda4Turnover,
      explanation: 'Umumbelgilangan soliq tizimidagi MChJ sof foydadan 15% to\'laydi.',
    },
  ];

  if (difficulty === 'qiyin') {
    foydaPool[2] = {
      text: `${Math.round(netBeforeProfitTax * 0.14).toLocaleString('uz-UZ')} so'm`,
      amount: Math.round(netBeforeProfitTax * 0.14),
      explanation: 'Foyda solig\'ining bazaviy stavkasi 15% hisoblanadi.',
    };
    foydaPool[3] = {
      text: `${Math.round(netBeforeProfitTax * 0.16).toLocaleString('uz-UZ')} so'm`,
      amount: Math.round(netBeforeProfitTax * 0.16),
      explanation: 'Stavka 16% emas, 15%.',
    };
  }

  const correctFoydaOptionIndex = (monthIndex * 3) % 4;
  const tempFoyda = foydaPool[0];
  foydaPool[0] = foydaPool[correctFoydaOptionIndex];
  foydaPool[correctFoydaOptionIndex] = tempFoyda;

  // --- Choices for Ijtimoiy soliq (12% of Salaries) ---
  const wrongIjtimoiy5 = Math.round(salariesExpense * 0.05);
  const wrongIjtimoiy25 = Math.round(salariesExpense * 0.25);
  const wrongIjtimoiyZero = 0;

  let ijtimoiyPool: TaxOption[] = [
    {
      text: `${correctIjtimoiy.toLocaleString('uz-UZ')} so'm`,
      amount: correctIjtimoiy,
      explanation: `To'g'ri! ${salariesExpense.toLocaleString('uz-UZ')} × 12% = ${correctIjtimoiy.toLocaleString('uz-UZ')} so'm (SK 405-modda).`,
    },
    {
      text: `${wrongIjtimoiy5.toLocaleString('uz-UZ')} so'm`,
      amount: wrongIjtimoiy5,
      explanation: 'Xususiy korxonalar uchun ijtimoiy soliq stavkasi 12% ni tashkil qiladi.',
    },
    {
      text: `${wrongIjtimoiy25.toLocaleString('uz-UZ')} so'm`,
      amount: wrongIjtimoiy25,
      explanation: 'Bu byudjet tashkilotlari stavkasi, tijorat korxonalari 12% to\'laydi.',
    },
    {
      text: "0 so'm",
      amount: wrongIjtimoiyZero,
      explanation: 'Ijtimoiy soliq xodimlar pensiya ta\'minoti uchun majburiydir.',
    },
  ];

  if (difficulty === 'qiyin') {
    ijtimoiyPool[1] = {
      text: `${Math.round(salariesExpense * 0.11).toLocaleString('uz-UZ')} so'm`,
      amount: Math.round(salariesExpense * 0.11),
      explanation: 'Ijtimoiy soliq qat\'iy 12% dir.',
    };
    ijtimoiyPool[2] = {
      text: `${Math.round(salariesExpense * 0.13).toLocaleString('uz-UZ')} so'm`,
      amount: Math.round(salariesExpense * 0.13),
      explanation: 'Stavka 13% emas, 12%.',
    };
  }

  const correctIjtimoiyOptionIndex = (monthIndex * 1) % 4;
  const tempIjtimoiy = ijtimoiyPool[0];
  ijtimoiyPool[0] = ijtimoiyPool[correctIjtimoiyOptionIndex];
  ijtimoiyPool[correctIjtimoiyOptionIndex] = tempIjtimoiy;

  return {
    monthIndex,
    monthName,
    event,
    salesRevenue,
    servicesRevenue,
    exportRevenue,
    totalTurnover,
    taxableTurnoverQQS,
    salariesExpense,
    rentExpense,
    materialsExpense,
    marketingExpense,
    totalExpenses,
    correctQQS,
    correctFoyda,
    correctIjtimoiy,
    totalTaxLiability,
    qqsOptions: qqsPool,
    correctQQSOptionIndex,
    foydaOptions: foydaPool,
    correctFoydaOptionIndex,
    ijtimoiyOptions: ijtimoiyPool,
    correctIjtimoiyOptionIndex,
  };
}
