import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, translations } from '../i18n/translations';
import { TaxScenario } from '../types/game';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  localizeScenario: (scenario: TaxScenario | null) => TaxScenario | null;
}

const LANGUAGE_STORAGE_KEY = 'soliq_sim_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Scenario translations mapping based on scenario ID
const scenarioTranslations: Record<string, Record<Exclude<Language, 'uz'>, {
  title?: string;
  story?: string;
  lawSummary?: string;
  tip?: string;
  optionsExplanations?: string[];
}>> = {
  // YaTT Scenarios
  'yatt_01': {
    ru: {
      title: 'Услуги UI/UX дизайна (ИТ-стартап)',
      story: 'Вы оказали услуги по разработке дизайна мобильного приложения для финтех-стартапа по договору на сумму 15 000 000 сум. Рассчитайте сумму налога с оборота к уплате.',
      lawSummary: 'По ст. 467 НК РУз базовая ставка налога с оборота для ИП составляет 4%. 15 000 000 * 0.04 = 600 000 сум.',
      tip: 'Всегда сохраняйте электронные договоры и инвойсы на my.soliq.uz.',
      optionsExplanations: [
        'Правильно! Ставка налога с оборота 4%: 15 000 000 * 0.04 = 600 000 сум.',
        'Неверно. Это завышенная сумма.',
        'Неверно. Услуги дизайна облагаются налогом с оборота.',
        'Неверно. Это заниженная сумма.',
      ],
    },
    en: {
      title: 'UI/UX Design Services (Fintech Startup)',
      story: 'You designed a mobile application interface for a fintech startup under a formal contract for 15,000,000 UZS. Calculate the turnover tax due.',
      lawSummary: 'According to Art. 467 of the Tax Code, sole proprietors pay a 4% turnover tax. 15,000,000 * 0.04 = 600,000 UZS.',
      tip: 'Always register freelance electronic invoices through the my.soliq.uz portal.',
      optionsExplanations: [
        'Correct! 4% turnover tax: 15,000,000 * 0.04 = 600,000 UZS.',
        'Incorrect. Calculated above statutory rate.',
        'Incorrect. Design services are taxable turnover.',
        'Incorrect. Undercalculated amount.',
      ],
    },
  },
  'yatt_02': {
    ru: {
      title: 'Торговля на маркетплейсе Uzum Market',
      story: 'За месяц покупатели приобрели ваши товары на Uzum Market на 20 000 000 сум. Маркетплейс удержал 3 000 000 сум комиссии и перечислил 17 000 000 сум. Рассчитайте налог с оборота.',
      lawSummary: 'По ст. 468 НК РУз налоговой базой является полный валовой оборот (20 000 000 сум) без вычета комиссии маркетплейса! 20 000 000 * 0.04 = 800 000 сум.',
      tip: 'В электронной торговле налог всегда рассчитывается с общей суммы чеков покупателей.',
      optionsExplanations: [
        'Неверно! Налог рассчитывается с полного оборота без вычета комиссии маркетплейса.',
        'Правильно! Ст. 468 НК РУз: налог 4% с валового оборота 20 000 000 сум = 800 000 сум.',
        'Неверно. Электронная торговля через маркетплейс облагается налогом.',
        'Неверно.',
      ],
    },
    en: {
      title: 'E-commerce on Uzum Marketplace',
      story: 'Customers bought 20,000,000 UZS worth of goods from your store on Uzum Market. The marketplace deducted 3,000,000 UZS commission and wired 17,000,000 UZS. Calculate the turnover tax.',
      lawSummary: 'Under Art. 468 of the Tax Code, tax is assessed on the full gross turnover (20,000,000 UZS) without deducting marketplace commissions! 20,000,000 * 0.04 = 800,000 UZS.',
      tip: 'In marketplace sales, gross customer receipts form the tax base.',
      optionsExplanations: [
        'Incorrect! Commission cannot be deducted from gross turnover.',
        'Correct! Art. 468 Tax Code: 4% on 20,000,000 UZS gross revenue = 800,000 UZS.',
        'Incorrect. Marketplace sales are fully subject to turnover tax.',
        'Incorrect.',
      ],
    },
  },
  'yatt_03': {
    ru: {
      title: 'Сдача коммерческого помещения в аренду',
      story: 'Вы сдали в аренду нежилое помещение (офис) компании на сумму 10 000 000 сум в месяц. Рассчитайте налог с дохода от аренды для ИП.',
      lawSummary: 'По ст. 467 НК РУз индивидуальный предприниматель уплачивает налог с оборота по ставке 4%: 10 000 000 * 0.04 = 400 000 сум.',
      tip: 'Обязательно регистрируйте договоры аренды в системе ijara.soliq.uz.',
      optionsExplanations: [
        'Правильно! ИП уплачивает 4% налога с оборота от аренды = 400 000 сум.',
        'Неверно. 12% — ставка НДФЛ для физлиц, у ИП ставка налога с оборота 4%.',
        'Неверно. Доход от аренды подлежит налогообложению.',
        'Неверно.',
      ],
    },
    en: {
      title: 'Commercial Real Estate Leasing',
      story: 'You leased a non-residential office space to a company for 10,000,000 UZS per month. Calculate the turnover tax due for the sole proprietor.',
      lawSummary: 'Under Art. 467 of the Tax Code, sole proprietors pay a 4% turnover tax on rental revenue: 10,000,000 * 0.04 = 400,000 UZS.',
      tip: 'All lease agreements must be registered on ijara.soliq.uz.',
      optionsExplanations: [
        'Correct! Sole proprietor pays 4% turnover tax = 400,000 UZS.',
        'Incorrect. 12% is personal income tax for individuals, not sole proprietor turnover tax.',
        'Incorrect. Commercial lease revenue is taxable.',
        'Incorrect.',
      ],
    },
  },
  'yatt_04': {
    ru: {
      title: 'Разработка веб-сайта на заказ',
      story: 'Компания перечислила вам 12 000 000 сум за разработку корпоративного сайта. Рассчитайте сумму налога с оборота.',
      lawSummary: 'Ст. 467 НК РУз: ставка налога с оборота 4%. 12 000 000 * 0.04 = 480 000 сум.',
      tip: 'Своевременно закрывайте акты выполненных работ в системе электронного документооборота.',
      optionsExplanations: [
        'Правильно! 12 000 000 * 0.04 = 480 000 сум.',
        'Неверно.',
        'Неверно.',
        'Неверно.',
      ],
    },
    en: {
      title: 'Custom Website Development',
      story: 'A corporate client wired 12,000,000 UZS for building their official website. Calculate the turnover tax due.',
      lawSummary: 'Art. 467 Tax Code: 4% turnover tax. 12,000,000 * 0.04 = 480,000 UZS.',
      tip: 'Submit completion certificates electronically via your tax dashboard.',
      optionsExplanations: [
        'Correct! 12,000,000 * 0.04 = 480,000 UZS.',
        'Incorrect.',
        'Incorrect.',
        'Incorrect.',
      ],
    },
  },
  // MChJ Scenarios
  'mchj_01': {
    ru: {
      title: 'Экспорт программного обеспечения (НДС)',
      story: 'ООО экспортировало программное обеспечение зарубежному партнеру на сумму 80 000 000 сум. Определите сумму НДС к уплате.',
      lawSummary: 'По ст. 260 НК РУз экспорт товаров и определенных услуг облагается НДС по ставке 0%. К уплате: 0 сум.',
      tip: 'При ставке 0% экспортер имеет право на возмещение входящего НДС.',
      optionsExplanations: [
        'Правильно! По ст. 260 НК РУз при экспорте применяется ставка НДС 0% = 0 сум.',
        'Неверно. 12% применяется для реализации внутри страны, при экспорте — 0%.',
        'Неверно.',
        'Неверно.',
      ],
    },
    en: {
      title: 'Software Export (VAT Assessment)',
      story: 'The LLC exported software engineering services to an overseas partner for 80,000,000 UZS. Calculate the VAT liability due.',
      lawSummary: 'Under Art. 260 of the Tax Code, exported goods and qualifying services are subject to a 0% zero-rate VAT. Tax due: 0 UZS.',
      tip: 'At a 0% VAT rate, the exporter retains the statutory right to refund input VAT.',
      optionsExplanations: [
        'Correct! Under Art. 260 of the Tax Code, export applies a 0% VAT rate = 0 UZS.',
        'Incorrect. 12% applies domestically, export is zero-rated.',
        'Incorrect.',
        'Incorrect.',
      ],
    },
  },
  'mchj_02': {
    ru: {
      title: 'Выплата дивидендов учредителям',
      story: 'ООО выплачивает учредителям-резидентам дивиденды из чистой прибыли на сумму 40 000 000 сум. Рассчитайте налог у источника выплаты.',
      lawSummary: 'По ст. 381 НК РУз дивиденды резидентов облагаются налогом по ставке 5%. 40 000 000 * 0.05 = 2 000 000 сум.',
      tip: 'Налог на дивиденды удерживается источником выплаты при перечислении средств.',
      optionsExplanations: [
        'Правильно! Ставка налога на дивиденды 5%: 40 000 000 * 0.05 = 2 000 000 сум.',
        'Неверно. 12% — ставка НДФЛ, на дивиденды действует специальная ставка 5%.',
        'Неверно.',
        'Неверно.',
      ],
    },
    en: {
      title: 'Dividend Distribution to Shareholders',
      story: 'The LLC distributed 40,000,000 UZS in net profit dividends to resident founders. Calculate the withholding tax due.',
      lawSummary: 'Under Art. 381 of the Tax Code, dividend distributions to residents are taxed at 5%. 40,000,000 * 0.05 = 2,000,000 UZS.',
      tip: 'Dividend withholding tax is withheld and remitted at source upon payment.',
      optionsExplanations: [
        'Correct! 5% statutory dividend tax: 40,000,000 * 0.05 = 2,000,000 UZS.',
        'Incorrect. 12% is ordinary personal income tax, dividend rate is 5%.',
        'Incorrect.',
        'Incorrect.',
      ],
    },
  },
  'mchj_03': {
    ru: {
      title: 'Социальный налог с фонда оплаты труда',
      story: 'Фонд начисленной заработной платы сотрудников ООО составил 30 000 000 сум. Рассчитайте сумму социального налога предприятия.',
      lawSummary: 'По ст. 405 НК РУз ставка социального налога составляет 12%. 30 000 000 * 0.12 = 3 600 000 сум.',
      tip: 'Социальный налог уплачивается за счет средств предприятия, а не удерживается из зарплаты работника.',
      optionsExplanations: [
        'Правильно! 12% социального налога от ФОТ = 3 600 000 сум.',
        'Неверно.',
        'Неверно.',
        'Неверно.',
      ],
    },
    en: {
      title: 'Payroll Social Tax',
      story: 'The LLC accrued 30,000,000 UZS in total gross staff wages. Calculate the employer social tax liability.',
      lawSummary: 'Under Art. 405 of the Tax Code, the base employer social tax rate is 12%. 30,000,000 * 0.12 = 3,600,000 UZS.',
      tip: 'Social tax is paid from corporate funds and is not withheld from employee wages.',
      optionsExplanations: [
        'Correct! 12% payroll social tax = 3,600,000 UZS.',
        'Incorrect.',
        'Incorrect.',
        'Incorrect.',
      ],
    },
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      if (saved && (saved === 'uz' || saved === 'ru' || saved === 'en')) {
        return saved;
      }
    } catch (e) {
      console.warn('Failed to load language preference:', e);
    }
    return 'uz';
  });

  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (e) {
      console.warn('Failed to persist language:', e);
    }
    setLanguageState(lang);
  };

  const t = translations[language] || translations.uz;

  const localizeScenario = (scenario: TaxScenario | null): TaxScenario | null => {
    if (!scenario) return null;
    if (language === 'uz') return scenario;

    const loc = scenarioTranslations[scenario.id]?.[language];
    if (!loc) {
      // Provide clean translated default based on scenario properties if specific translation absent
      if (language === 'ru') {
        return {
          ...scenario,
          title: scenario.title.replace('xizmatlari', 'услуги').replace('savdosi', 'торговля'),
          story: scenario.story
            .replace("bo'yicha to'lanishi lozim bo'lgan soliq miqdorini aniqlang", "— рассчитайте сумму налога к уплате")
            .replace("soliq summasini hisoblang", "рассчитайте сумму налога"),
          tip: "Своевременно регистрируйте операции в налоговой системе.",
        };
      } else {
        return {
          ...scenario,
          title: scenario.title,
          story: scenario.story
            .replace("bo'yicha to'lanishi lozim bo'lgan soliq miqdorini aniqlang", "— calculate the statutory tax liability")
            .replace("soliq summasini hisoblang", "calculate the tax liability"),
          tip: "Ensure all transactions are reconciled on the tax portal.",
        };
      }
    }

    const updatedOptions = scenario.options.map((opt, idx) => {
      const translatedExplanation = loc.optionsExplanations?.[idx];
      return {
        ...opt,
        explanation: translatedExplanation || opt.explanation,
      };
    });

    return {
      ...scenario,
      title: loc.title || scenario.title,
      story: loc.story || scenario.story,
      lawSummary: loc.lawSummary || scenario.lawSummary,
      tip: loc.tip || scenario.tip,
      options: updatedOptions,
    };
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, localizeScenario }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
