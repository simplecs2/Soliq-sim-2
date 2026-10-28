export type CharacterRole = 'it_freelance' | 'design' | 'smm_copywriting' | 'marketplace' | 'tutor';

export interface CharacterProfile {
  id: string;
  name: string;
  role: CharacterRole;
  title: string;
  avatar: string;
  university: string;
  description: string;
  isSelfEmployed: boolean;
  hasYaTT: boolean;
}

export interface TaxOption {
  text: string;
  amount: number;
  explanation: string;
}

export interface TaxScenario {
  id: string;
  dayNumber: number;
  dayName: string;
  title: string;
  category: 'frilans' | 'gph' | 'kontrakt' | 'savdo' | 'repetitorlik' | 'it_park' | 'keshbek' | 'boshqa';
  story: string;
  grossAmount: number;
  isDeduction?: boolean; // When true, it's a tax rebate/deduction scenario
  correctTaxAmount: number;
  correctOptionIndex: number;
  options: TaxOption[];
  lawArticle: string;
  lawSummary: string;
  penaltyIfWrong: number;
  bonusIfRight: number;
  tip: string;
}

export interface PaymentRecord {
  id: string;
  day: number;
  dayName: string;
  scenarioTitle: string;
  grossAmount: number;
  userTaxAmount: number;
  correctTaxAmount: number;
  isCorrect: boolean;
  fineAmount: number;
  bonusAmount: number;
  lawArticle: string;
  timestamp: number;
}

export interface Perk {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredRating: number;
  isUnlocked: boolean;
  benefitText: string;
}

export interface MChJMonthEvent {
  id: string;
  type: 'audit' | 'export_boost' | 'hiring' | 'recession';
  title: string;
  description: string;
  impactText: string;
}

export interface MChJFinancials {
  monthIndex: number; // 1 to 12
  monthName: string; // "Yanvar 2026", "Fevral 2026", ...
  event: MChJMonthEvent | null;
  // Step 1: Incomes
  salesRevenue: number; // Savdo tushumi
  servicesRevenue: number; // Xizmatlar
  exportRevenue: number; // Eksport (0% QQS)
  totalTurnover: number; // Umumiy aylanma = Savdo + Xizmatlar + Eksport
  taxableTurnoverQQS: number; // Savdo + Xizmatlar (Eksportga 0% QQS)

  // Step 2: Expenses
  salariesExpense: number; // Xodimlar maoshi
  rentExpense: number; // Ijara
  materialsExpense: number; // Xom ashyo
  marketingExpense: number; // Reklama
  totalExpenses: number; // Jami xarajatlar

  // Step 3: Exact calculated taxes
  correctQQS: number; // (Savdo + Xizmatlar) * 12%
  correctFoyda: number; // (Umumiy oborot - Xarajatlar - QQS) * 15%
  correctIjtimoiy: number; // Xodimlar maoshi * 12%
  totalTaxLiability: number;

  // Options for each tax
  qqsOptions: TaxOption[];
  correctQQSOptionIndex: number;
  foydaOptions: TaxOption[];
  correctFoydaOptionIndex: number;
  ijtimoiyOptions: TaxOption[];
  correctIjtimoiyOptionIndex: number;
}

export interface MChJMonthResultRecord {
  id: string;
  monthIndex: number;
  monthName: string;
  totalTurnover: number;
  totalExpenses: number;
  userQQS: number;
  correctQQS: number;
  isQQSCorrect: boolean;
  userFoyda: number;
  correctFoyda: number;
  isFoydaCorrect: boolean;
  userIjtimoiy: number;
  correctIjtimoiy: number;
  isIjtimoiyCorrect: boolean;
  allCorrect: boolean;
  isTimedOut: boolean;
  fineAmount: number;
  netProfit: number;
  taxesPaid: number;
  ratingDelta: number;
  event: MChJMonthEvent | null;
  timestamp: number;
}

export interface MChJState {
  month: number; // 1 to 12
  balance: number; // Starting capital e.g. 150,000,000 UZS
  rating: number; // 0 - 100 (starts at 75)
  totalProfit: number;
  totalQQSPaid: number;
  totalFoydaPaid: number;
  totalIjtimoiyPaid: number;
  totalFinesPaid: number;
  monthlyHistory: MChJMonthResultRecord[];
  currentFinancials: MChJFinancials | null;
  lastMonthResult: MChJMonthResultRecord | null;
  isFinished: boolean; // Completed 12 months!
}

export interface GameState {
  playerFirstName: string;
  playerLastName: string;
  studyPlace: string;
  studyCourse: string;
  businessMode: 'yatt' | 'mchj' | null;
  companyName: string;
  difficulty: 'oson' | 'orta' | 'qiyin';
  character: CharacterProfile;
  day: number;
  balance: number;
  taxLiteracy: number; // 0 - 100%
  reputation: number; // 0 - 100
  streak: number;
  bestStreak: number;
  totalIncome: number;
  totalTaxPaid: number;
  totalFinesPaid: number;
  isBankBlocked: boolean;
  blockedDaysRemaining: number;
  unlockedPerkIds: string[];
  history: PaymentRecord[];
  soundEnabled: boolean;
  activeScreen: 'home' | 'quiz' | 'result' | 'stats' | 'education' | 'ai';
  currentScenario: TaxScenario | null;
  lastRecord: PaymentRecord | null;
  mchjState: MChJState;
}
