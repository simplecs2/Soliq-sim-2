import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, CharacterProfile, PaymentRecord, TaxScenario, MChJState, MChJMonthResultRecord } from '../types/game';
import {
  INITIAL_CHARACTERS,
  INITIAL_PERKS,
  getScenarioForDay,
} from '../data/taxScenarios';
import { getMChJFinancialsForMonth } from '../data/mchjData';
import { sound } from '../utils/audio';

interface GameContextType {
  state: GameState;
  isProfileCompleted: boolean;
  isModeSelected: boolean;
  setPlayerProfile: (firstName: string, lastName: string) => void;
  setGameMode: (mode: 'yatt' | 'mchj', companyName?: string) => void;
  setDifficulty: (diff: 'oson' | 'orta' | 'qiyin') => void;
  startDay: () => void;
  submitTaxPayment: (selectedOptionIndex: number, timedOut?: boolean) => void;
  nextDay: () => void;
  setActiveScreen: (screen: GameState['activeScreen']) => void;
  switchCharacter: (characterId: string) => void;
  toggleSound: () => void;
  resetGame: () => void;
  isPerkUnlocked: (perkId: string) => boolean;
  updateEducationProfile: (studyPlace: string, studyCourse: string) => void;

  // MChJ mode methods
  startMChJMonthReport: () => void;
  submitMChJMonthTaxes: (
    selectedQQSIdx: number,
    selectedFoydaIdx: number,
    selectedIjtimoiyIdx: number,
    timedOut?: boolean
  ) => void;
  nextMChJMonth: () => void;
  resetMChJGame: () => void;
}

const STORAGE_KEY = 'soliq_sim_save_v1';

export const defaultInitialMChJState: MChJState = {
  month: 1,
  balance: 150000000, // 150,000,000 UZS starting balance for company
  rating: 75, // 75/100 starting trust rating
  totalProfit: 0,
  totalQQSPaid: 0,
  totalFoydaPaid: 0,
  totalIjtimoiyPaid: 0,
  totalFinesPaid: 0,
  monthlyHistory: [],
  currentFinancials: null,
  lastMonthResult: null,
  isFinished: false,
};

const defaultInitialState: GameState = {
  playerFirstName: '',
  playerLastName: '',
  studyPlace: 'Toshkent Axborot Texnologiyalari Universiteti',
  studyCourse: '3-kurs',
  businessMode: null,
  companyName: '',
  difficulty: 'orta',
  character: INITIAL_CHARACTERS[0],
  day: 1,
  balance: 2500000, // 2,500,000 UZS starting balance
  taxLiteracy: 50, // 50% baseline
  reputation: 60, // 60/100 starting trust score
  streak: 0,
  bestStreak: 0,
  totalIncome: 0,
  totalTaxPaid: 0,
  totalFinesPaid: 0,
  isBankBlocked: false,
  blockedDaysRemaining: 0,
  unlockedPerkIds: [],
  history: [],
  soundEnabled: true,
  activeScreen: 'home',
  currentScenario: null,
  lastRecord: null,
  mchjState: defaultInitialMChJState,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedFirstName = localStorage.getItem('soliq_sim_player_firstname') || '';
      const savedLastName = localStorage.getItem('soliq_sim_player_lastname') || '';
      const savedStudyPlace = localStorage.getItem('soliq_sim_study_place') || 'Toshkent Axborot Texnologiyalari Universiteti';
      const savedStudyCourse = localStorage.getItem('soliq_sim_study_course') || '3-kurs';
      const savedBusinessMode = (localStorage.getItem('soliq_sim_business_mode') as 'yatt' | 'mchj' | null) || null;
      const savedCompanyName = localStorage.getItem('soliq_sim_company_name') || '';
      const savedDifficulty = (localStorage.getItem('soliq_sim_difficulty') as 'oson' | 'orta' | 'qiyin' | null) || 'orta';

      if (saved) {
        const parsed = JSON.parse(saved);
        const parsedMchj = parsed.mchjState || defaultInitialMChJState;
        const currentFin = parsedMchj.currentFinancials || getMChJFinancialsForMonth(parsedMchj.month || 1, parsed.difficulty || savedDifficulty);
        const playerFirst = parsed.playerFirstName || savedFirstName;
        const playerLast = parsed.playerLastName || savedLastName;
        const place = parsed.studyPlace || savedStudyPlace;
        const course = parsed.studyCourse || savedStudyCourse;

        const effectiveMode = parsed.businessMode || savedBusinessMode;
        const effectiveBalance = effectiveMode === 'mchj' ? (parsedMchj.balance || 150000000) : (parsed.balance || 2500000);

        return {
          ...defaultInitialState,
          ...parsed,
          balance: effectiveBalance,
          playerFirstName: playerFirst,
          playerLastName: playerLast,
          studyPlace: place,
          studyCourse: course,
          character: {
            ...defaultInitialState.character,
            ...(parsed.character || {}),
            name: (playerFirst && playerLast) ? `${playerFirst} ${playerLast}` : defaultInitialState.character.name,
            university: `${place} (${course})`,
          },
          businessMode: effectiveMode,
          companyName: parsed.companyName || savedCompanyName,
          difficulty: parsed.difficulty || savedDifficulty,
          activeScreen: 'home',
          currentScenario: null,
          mchjState: {
            ...defaultInitialMChJState,
            ...parsedMchj,
            balance: effectiveBalance,
            currentFinancials: currentFin,
          },
        };
      } else if (savedFirstName && savedLastName) {
        const initialFin = getMChJFinancialsForMonth(1, savedDifficulty);
        const effectiveMode = savedBusinessMode;
        const effectiveBalance = effectiveMode === 'mchj' ? 150000000 : 2500000;
        return {
          ...defaultInitialState,
          balance: effectiveBalance,
          playerFirstName: savedFirstName,
          playerLastName: savedLastName,
          studyPlace: savedStudyPlace,
          studyCourse: savedStudyCourse,
          character: {
            ...defaultInitialState.character,
            name: `${savedFirstName} ${savedLastName}`,
            university: `${savedStudyPlace} (${savedStudyCourse})`,
          },
          businessMode: savedBusinessMode,
          companyName: savedCompanyName,
          difficulty: savedDifficulty,
          mchjState: {
            ...defaultInitialMChJState,
            balance: effectiveBalance,
            currentFinancials: initialFin,
          },
        };
      }
    } catch (e) {
      console.error('Failed to load save:', e);
    }
    return defaultInitialState;
  });

  // Save state on change
  useEffect(() => {
    try {
      const toSave = {
        playerFirstName: state.playerFirstName,
        playerLastName: state.playerLastName,
        studyPlace: state.studyPlace,
        studyCourse: state.studyCourse,
        businessMode: state.businessMode,
        companyName: state.companyName,
        difficulty: state.difficulty,
        character: state.character,
        day: state.day,
        balance: state.balance,
        taxLiteracy: state.taxLiteracy,
        reputation: state.reputation,
        streak: state.streak,
        bestStreak: state.bestStreak,
        totalIncome: state.totalIncome,
        totalTaxPaid: state.totalTaxPaid,
        totalFinesPaid: state.totalFinesPaid,
        isBankBlocked: state.isBankBlocked,
        blockedDaysRemaining: state.blockedDaysRemaining,
        unlockedPerkIds: state.unlockedPerkIds,
        history: state.history,
        soundEnabled: state.soundEnabled,
        mchjState: state.mchjState,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      if (state.playerFirstName) {
        localStorage.setItem('soliq_sim_player_firstname', state.playerFirstName);
      }
      if (state.playerLastName) {
        localStorage.setItem('soliq_sim_player_lastname', state.playerLastName);
      }
      if (state.studyPlace) {
        localStorage.setItem('soliq_sim_study_place', state.studyPlace);
      }
      if (state.studyCourse) {
        localStorage.setItem('soliq_sim_study_course', state.studyCourse);
      }
      if (state.businessMode) {
        localStorage.setItem('soliq_sim_business_mode', state.businessMode);
      }
      if (state.companyName) {
        localStorage.setItem('soliq_sim_company_name', state.companyName);
      }
      if (state.difficulty) {
        localStorage.setItem('soliq_sim_difficulty', state.difficulty);
      }
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }, [state]);

  const setPlayerProfile = (firstName: string, lastName: string) => {
    const cleanFirst = firstName.trim();
    const cleanLast = lastName.trim();
    localStorage.setItem('soliq_sim_player_firstname', cleanFirst);
    localStorage.setItem('soliq_sim_player_lastname', cleanLast);
    setState((prev) => ({
      ...prev,
      playerFirstName: cleanFirst,
      playerLastName: cleanLast,
      character: {
        ...prev.character,
        name: `${cleanFirst} ${cleanLast}`,
      },
    }));
  };

  const updateEducationProfile = (place: string, course: string) => {
    sound.playSuccess();
    const cleanPlace = place.trim();
    const cleanCourse = course.trim();
    localStorage.setItem('soliq_sim_study_place', cleanPlace);
    localStorage.setItem('soliq_sim_study_course', cleanCourse);
    setState((prev) => ({
      ...prev,
      studyPlace: cleanPlace,
      studyCourse: cleanCourse,
      character: {
        ...prev.character,
        university: `${cleanPlace} (${cleanCourse})`,
      },
    }));
  };

  const setGameMode = (mode: 'yatt' | 'mchj', companyName?: string) => {
    const cleanCompany = (companyName || '').trim();
    localStorage.setItem('soliq_sim_business_mode', mode);
    if (cleanCompany) {
      localStorage.setItem('soliq_sim_company_name', cleanCompany);
    } else {
      localStorage.removeItem('soliq_sim_company_name');
    }
    const initialMChJFin = getMChJFinancialsForMonth(1, state.difficulty);
    const effectiveBalance = mode === 'mchj' ? 150000000 : 2500000;
    setState((prev) => ({
      ...prev,
      businessMode: mode,
      companyName: mode === 'mchj' ? cleanCompany : '',
      balance: effectiveBalance,
      activeScreen: 'home',
      currentScenario: null,
      mchjState: {
        ...defaultInitialMChJState,
        balance: effectiveBalance,
        currentFinancials: initialMChJFin,
      },
    }));
  };

  const setDifficulty = (diff: 'oson' | 'orta' | 'qiyin') => {
    sound.playTap();
    localStorage.setItem('soliq_sim_difficulty', diff);
    setState((prev) => ({
      ...prev,
      difficulty: diff,
    }));
  };

  const isProfileCompleted = Boolean(
    state.playerFirstName && state.playerFirstName.trim() &&
    state.playerLastName && state.playerLastName.trim()
  );

  const isModeSelected = Boolean(
    state.businessMode &&
    (state.businessMode === 'yatt' || (state.businessMode === 'mchj' && state.companyName && state.companyName.trim().length >= 3))
  );

  const toggleSound = () => {
    const nextVal = !state.soundEnabled;
    sound.setMuted(!nextVal);
    sound.playTap();
    setState((prev) => ({ ...prev, soundEnabled: nextVal }));
  };

  const isPerkUnlocked = (perkId: string): boolean => {
    return state.unlockedPerkIds.includes(perkId);
  };

  const startDay = () => {
    sound.playTap();

    // If bank is blocked, check remaining days
    if (state.isBankBlocked) {
      if (state.blockedDaysRemaining > 0) {
        // User is blocked for this day!
        // Show notification or still proceed with reduced allowance
      }
    }

    const scenario = getScenarioForDay(state.day, state.businessMode, state.difficulty, state.companyName);
    setState((prev) => ({
      ...prev,
      currentScenario: scenario,
      activeScreen: 'quiz',
    }));
  };

  const submitTaxPayment = (selectedOptionIndex: number, timedOut: boolean = false) => {
    const scenario = state.currentScenario;
    if (!scenario) return;

    // Check if user has selected a valid option
    const hasSelection = selectedOptionIndex >= 0 && selectedOptionIndex < scenario.options.length;
    const selectedOption = hasSelection ? scenario.options[selectedOptionIndex] : null;
    const userTaxAmount = selectedOption ? selectedOption.amount : 0;

    // If an option was selected, verify if it is correct regardless of timeout
    const isCorrect = hasSelection && selectedOptionIndex === scenario.correctOptionIndex;

    let fine = 0;
    let bonus = 0;
    let newBalance = state.balance;
    let newIncome = state.totalIncome;
    let newTaxPaid = state.totalTaxPaid;
    let newFinesPaid = state.totalFinesPaid;
    let newStreak = state.streak;
    let newBestStreak = state.bestStreak;
    let newLiteracy = state.taxLiteracy;
    let newReputation = state.reputation;
    let isBankBlocked = state.isBankBlocked;
    let blockedDaysRemaining = state.blockedDaysRemaining;

    // Has perks?
    const hasLoanPerk = state.unlockedPerkIds.includes('perk_student_loan');
    const hasGreenChannel = state.unlockedPerkIds.includes('perk_green_channel');
    const hasCashbackBoost = state.unlockedPerkIds.includes('perk_cashback_boost');
    const hasSafeBank = state.unlockedPerkIds.includes('perk_safe_bank');

    if (scenario.isDeduction) {
      // Deduction scenario (e.g. tuition contract)
      // Gross amount is expense paid, correct tax is rebate back into pocket!
      if (isCorrect) {
        sound.playSuccess();
        bonus = scenario.bonusIfRight + (hasLoanPerk ? 100000 : 0);
        const rebate = scenario.correctTaxAmount; // Refund from state!
        newBalance = newBalance + rebate + bonus;
        newStreak += 1;
        if (newStreak > newBestStreak) newBestStreak = newStreak;
        newLiteracy = Math.min(100, newLiteracy + 8);
        newReputation = Math.min(100, newReputation + 6);
      } else {
        sound.playError();
        fine = hasGreenChannel ? Math.round(scenario.penaltyIfWrong * 0.7) : scenario.penaltyIfWrong;
        newBalance = Math.max(0, newBalance - fine);
        newFinesPaid += fine;
        newStreak = 0;
        newLiteracy = Math.max(0, newLiteracy - 6);
        newReputation = Math.max(0, newReputation - 8);
      }
    } else {
      // Regular income scenario
      const gross = scenario.grossAmount;
      newIncome += gross;

      if (isCorrect) {
        sound.playSuccess();
        bonus = scenario.bonusIfRight + (hasLoanPerk ? 50000 : 0);
        if (hasCashbackBoost) bonus += 150000;

        // Balance increases by gross income minus tax paid + bonus
        newBalance = newBalance + gross - scenario.correctTaxAmount + bonus;
        newTaxPaid += scenario.correctTaxAmount;
        newStreak += 1;
        if (newStreak > newBestStreak) newBestStreak = newStreak;
        newLiteracy = Math.min(100, newLiteracy + 6);
        newReputation = Math.min(100, newReputation + 5);

        // If previously bank was blocked, good payment unfreezes it!
        if (isBankBlocked) {
          isBankBlocked = false;
          blockedDaysRemaining = 0;
        }
      } else {
        sound.playError();
        fine = hasGreenChannel ? Math.round(scenario.penaltyIfWrong * 0.7) : scenario.penaltyIfWrong;

        // Player made a mistake or timed out: pays penalty + gets income with penalties
        newBalance = Math.max(0, newBalance + Math.round(gross * 0.7) - fine);
        newFinesPaid += fine;
        newStreak = 0;
        newLiteracy = Math.max(0, newLiteracy - 8);
        newReputation = Math.max(0, newReputation - 12);

        // If reputation drops below 35 and no safe bank perk, bank account freeze warning
        if (newReputation < 35 && !hasSafeBank) {
          isBankBlocked = true;
          blockedDaysRemaining = 1;
        }
      }
    }

    // Check newly unlocked perks
    const newlyUnlockedPerks: string[] = [...state.unlockedPerkIds];
    INITIAL_PERKS.forEach((perk) => {
      if (newLiteracy >= perk.requiredRating && !newlyUnlockedPerks.includes(perk.id)) {
        newlyUnlockedPerks.push(perk.id);
        sound.playLevelUp();
      }
    });

    const record: PaymentRecord = {
      id: `rec_${Date.now()}`,
      day: state.day,
      dayName: scenario.dayName,
      scenarioTitle: scenario.title,
      grossAmount: scenario.grossAmount,
      userTaxAmount,
      correctTaxAmount: scenario.correctTaxAmount,
      isCorrect,
      fineAmount: fine,
      bonusAmount: bonus,
      lawArticle: scenario.lawArticle,
      timestamp: Date.now(),
    };

    setState((prev) => ({
      ...prev,
      balance: newBalance,
      totalIncome: newIncome,
      totalTaxPaid: newTaxPaid,
      totalFinesPaid: newFinesPaid,
      streak: newStreak,
      bestStreak: newBestStreak,
      taxLiteracy: newLiteracy,
      reputation: newReputation,
      isBankBlocked,
      blockedDaysRemaining,
      unlockedPerkIds: newlyUnlockedPerks,
      history: [record, ...prev.history],
      lastRecord: record,
      activeScreen: 'result',
      mchjState: {
        ...prev.mchjState,
        balance: newBalance,
      },
    }));
  };

  const nextDay = () => {
    sound.playTap();
    setState((prev) => {
      let blockedRemaining = prev.blockedDaysRemaining;
      let isBlocked = prev.isBankBlocked;

      if (isBlocked && blockedRemaining > 0) {
        blockedRemaining -= 1;
        if (blockedRemaining <= 0) {
          isBlocked = false;
        }
      }

      return {
        ...prev,
        day: prev.day + 1,
        blockedDaysRemaining: blockedRemaining,
        isBankBlocked: isBlocked,
        activeScreen: 'home',
        currentScenario: null,
      };
    });
  };

  const setActiveScreen = (screen: GameState['activeScreen']) => {
    sound.playTap();
    setState((prev) => ({ ...prev, activeScreen: screen }));
  };

  const switchCharacter = (characterId: string) => {
    sound.playTap();
    const char = INITIAL_CHARACTERS.find((c) => c.id === characterId);
    if (char) {
      setState((prev) => ({ ...prev, character: char }));
    }
  };

  const resetGame = () => {
    sound.playTap();
    localStorage.removeItem(STORAGE_KEY);
    const initialFin = getMChJFinancialsForMonth(1, state.difficulty);
    setState({
      ...defaultInitialState,
      day: 1,
      balance: 2500000,
      history: [],
      unlockedPerkIds: [],
      mchjState: {
        ...defaultInitialMChJState,
        currentFinancials: initialFin,
      },
    });
  };

  // --- MChJ Corporate Gameplay Handlers ---
  const startMChJMonthReport = () => {
    sound.playTap();
    let fin = state.mchjState.currentFinancials;
    if (!fin || fin.monthIndex !== state.mchjState.month) {
      fin = getMChJFinancialsForMonth(state.mchjState.month, state.difficulty);
    }
    setState((prev) => ({
      ...prev,
      activeScreen: 'quiz',
      mchjState: {
        ...prev.mchjState,
        currentFinancials: fin,
      },
    }));
  };

  const submitMChJMonthTaxes = (
    selectedQQSIdx: number,
    selectedFoydaIdx: number,
    selectedIjtimoiyIdx: number,
    timedOut: boolean = false
  ) => {
    const fin = state.mchjState.currentFinancials;
    if (!fin) return;

    const isQQSCorrect = !timedOut && selectedQQSIdx === fin.correctQQSOptionIndex;
    const isFoydaCorrect = !timedOut && selectedFoydaIdx === fin.correctFoydaOptionIndex;
    const isIjtimoiyCorrect = !timedOut && selectedIjtimoiyIdx === fin.correctIjtimoiyOptionIndex;
    const allCorrect = isQQSCorrect && isFoydaCorrect && isIjtimoiyCorrect;

    const userQQS = selectedQQSIdx >= 0 && selectedQQSIdx < fin.qqsOptions.length ? fin.qqsOptions[selectedQQSIdx].amount : 0;
    const userFoyda = selectedFoydaIdx >= 0 && selectedFoydaIdx < fin.foydaOptions.length ? fin.foydaOptions[selectedFoydaIdx].amount : 0;
    const userIjtimoiy = selectedIjtimoiyIdx >= 0 && selectedIjtimoiyIdx < fin.ijtimoiyOptions.length ? fin.ijtimoiyOptions[selectedIjtimoiyIdx].amount : 0;

    let fine = 0;
    let ratingDelta = 0;

    if (allCorrect) {
      sound.playSuccess();
      ratingDelta = +5;
    } else {
      sound.playError();
      ratingDelta = timedOut ? -15 : -10;

      // 10% penalty for each incorrect tax calculated
      if (!isQQSCorrect) fine += Math.round(fin.correctQQS * 0.10);
      if (!isFoydaCorrect) fine += Math.round(fin.correctFoyda * 0.10);
      if (!isIjtimoiyCorrect) fine += Math.round(fin.correctIjtimoiy * 0.10);
      if (timedOut) fine += 5000000; // Extra late fee penalty for timed out declaration

      // If random event is audit (Soliq tekshiruvi), double the fine!
      if (fin.event && fin.event.type === 'audit') {
        fine *= 2;
      }
    }

    const taxesPaid = fin.correctQQS + fin.correctFoyda + fin.correctIjtimoiy;
    // Net profit = Turnover - Expenses - Taxes - Fine
    const netProfit = fin.totalTurnover - fin.totalExpenses - taxesPaid - fine;

    const newBalance = Math.max(0, state.mchjState.balance + netProfit);
    const newRating = Math.max(0, Math.min(100, state.mchjState.rating + ratingDelta));
    const newTotalProfit = state.mchjState.totalProfit + netProfit;
    const newQQSPaid = state.mchjState.totalQQSPaid + fin.correctQQS;
    const newFoydaPaid = state.mchjState.totalFoydaPaid + fin.correctFoyda;
    const newIjtimoiyPaid = state.mchjState.totalIjtimoiyPaid + fin.correctIjtimoiy;
    const newFinesPaid = state.mchjState.totalFinesPaid + fine;

    const record: MChJMonthResultRecord = {
      id: `mchj_rec_${Date.now()}`,
      monthIndex: fin.monthIndex,
      monthName: fin.monthName,
      totalTurnover: fin.totalTurnover,
      totalExpenses: fin.totalExpenses,
      userQQS,
      correctQQS: fin.correctQQS,
      isQQSCorrect,
      userFoyda,
      correctFoyda: fin.correctFoyda,
      isFoydaCorrect,
      userIjtimoiy,
      correctIjtimoiy: fin.correctIjtimoiy,
      isIjtimoiyCorrect,
      allCorrect,
      isTimedOut: timedOut,
      fineAmount: fine,
      netProfit,
      taxesPaid,
      ratingDelta,
      event: fin.event,
      timestamp: Date.now(),
    };

    setState((prev) => ({
      ...prev,
      balance: newBalance,
      activeScreen: 'result',
      mchjState: {
        ...prev.mchjState,
        balance: newBalance,
        rating: newRating,
        totalProfit: newTotalProfit,
        totalQQSPaid: newQQSPaid,
        totalFoydaPaid: newFoydaPaid,
        totalIjtimoiyPaid: newIjtimoiyPaid,
        totalFinesPaid: newFinesPaid,
        monthlyHistory: [record, ...prev.mchjState.monthlyHistory],
        lastMonthResult: record,
      },
    }));
  };

  const nextMChJMonth = () => {
    sound.playTap();
    const nextMonthIdx = state.mchjState.month + 1;
    if (nextMonthIdx > 12) {
      sound.playLevelUp();
      setState((prev) => ({
        ...prev,
        activeScreen: 'result',
        mchjState: {
          ...prev.mchjState,
          isFinished: true,
        },
      }));
      return;
    }

    const nextFin = getMChJFinancialsForMonth(nextMonthIdx, state.difficulty);
    setState((prev) => ({
      ...prev,
      activeScreen: 'home',
      mchjState: {
        ...prev.mchjState,
        month: nextMonthIdx,
        currentFinancials: nextFin,
        lastMonthResult: null,
      },
    }));
  };

  const resetMChJGame = () => {
    sound.playTap();
    const fin1 = getMChJFinancialsForMonth(1, state.difficulty);
    setState((prev) => ({
      ...prev,
      activeScreen: 'home',
      mchjState: {
        ...defaultInitialMChJState,
        currentFinancials: fin1,
      },
    }));
  };

  return (
    <GameContext.Provider
      value={{
        state,
        isProfileCompleted,
        isModeSelected,
        setPlayerProfile,
        setGameMode,
        setDifficulty,
        startDay,
        submitTaxPayment,
        nextDay,
        setActiveScreen,
        switchCharacter,
        toggleSound,
        resetGame,
        isPerkUnlocked,
        updateEducationProfile,
        startMChJMonthReport,
        submitMChJMonthTaxes,
        nextMChJMonth,
        resetMChJGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
