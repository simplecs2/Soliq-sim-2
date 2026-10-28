import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  HelpCircle,
  CheckCircle2,
  Coins,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Pause,
  Play,
  Calculator,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/audio';

export const CalculationScreen: React.FC = () => {
  const { state, submitTaxPayment, setActiveScreen } = useGame();
  const { t, localizeScenario } = useLanguage();
  const rawScenario = state.currentScenario;
  const scenario = localizeScenario(rawScenario);

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showTip, setShowTip] = useState<boolean>(false);
  const [showCalcHelper, setShowCalcHelper] = useState<boolean>(false);

  // Quick calculator state
  const [calcInput, setCalcInput] = useState<string>('');
  const [calcRate, setCalcRate] = useState<number>(4);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const selectedOptionRef = useRef<number | null>(null);
  const hasSubmittedRef = useRef<boolean>(false);

  // Keep ref in sync with latest selected option
  useEffect(() => {
    selectedOptionRef.current = selectedOptionIndex;
  }, [selectedOptionIndex]);

  // Initialize calculator input with scenario amount
  useEffect(() => {
    if (scenario) {
      setCalcInput(scenario.grossAmount.toString());
      hasSubmittedRef.current = false;
    }
  }, [scenario]);

  // 30-second countdown timer effect
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }

        // Ticking audio during last 7 seconds
        if (prev <= 8) {
          sound.playTick(prev <= 4);
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPaused]);

  // Automatically submit selected option when timer reaches 0
  useEffect(() => {
    if (timeLeft === 0 && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      const selected = selectedOptionRef.current;
      submitTaxPayment(selected !== null ? selected : -1, true);
    }
  }, [timeLeft, submitTaxPayment]);

  if (!scenario) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 mb-4">{t.allDaysCompleted}</p>
        <button
          onClick={() => setActiveScreen('home')}
          className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm cursor-pointer"
        >
          {t.navHome}
        </button>
      </div>
    );
  }

  const handleSelectOption = (idx: number) => {
    sound.playTap();
    setSelectedOptionIndex(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOptionIndex === null || hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    // Stop timer immediately
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    submitTaxPayment(selectedOptionIndex, false);
  };

  const timerPercentage = (timeLeft / 30) * 100;
  const isTimeUrgent = timeLeft <= 8;

  const calculatedTaxHelper = Math.round(
    ((parseFloat(calcInput) || 0) * calcRate) / 100
  );

  return (
    <div className="space-y-4 pb-28">
      {/* Top Bar Navigation & Timer */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setActiveScreen('home')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors py-1.5 px-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.navHome}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Pause / Resume button */}
          <button
            onClick={() => {
              sound.playTap();
              setIsPaused(!isPaused);
            }}
            className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isPaused ? t.proceed : t.cancel}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* 30-Second Countdown Pill */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold tabular-nums transition-colors ${
              isTimeUrgent
                ? 'bg-rose-500/10 border-rose-500/40 text-rose-400 animate-pulse'
                : 'bg-slate-900 border-slate-800 text-amber-400'
            }`}
          >
            <Clock className={`w-3.5 h-3.5 ${isTimeUrgent ? 'text-rose-400' : 'text-amber-400'}`} />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Progress Bar for Timer */}
      <div className="w-full bg-slate-850 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            isTimeUrgent
              ? 'bg-rose-500'
              : timeLeft <= 15
              ? 'bg-amber-400'
              : 'bg-blue-500'
          }`}
          style={{ width: `${timerPercentage}%` }}
        />
      </div>

      {/* Scenario Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">{state.day}-{t.day}</span>
            <span>·</span>
            <span>{scenario.dayName}</span>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
            {scenario.isDeduction ? t.deductionCaseBadge : t.standardCaseBadge}
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
          {scenario.title}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          {scenario.story}
        </p>

        {/* Transaction Metric Bar */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">
                {t.calcGross}
              </div>
              <div className="text-base font-extrabold text-white tabular-nums">
                {scenario.grossAmount.toLocaleString('uz-UZ')} {t.currency}
              </div>
            </div>
          </div>

          {/* Quick Calculator Helper Trigger */}
          <button
            onClick={() => {
              sound.playTap();
              setShowCalcHelper(!showCalcHelper);
            }}
            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors py-1 px-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.calculator}</span>
          </button>
        </div>

        {/* Mini Calculator Popover */}
        {showCalcHelper && (
          <div className="mt-3 p-3 bg-slate-950 border border-blue-500/30 rounded-2xl text-xs space-y-2.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1">
                <Calculator className="w-3.5 h-3.5 text-blue-400" />
                <span>{t.calcResult}:</span>
              </span>
              <span className="text-amber-400 font-mono font-bold tabular-nums">
                = {calculatedTaxHelper.toLocaleString('uz-UZ')} {t.currency}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-[10px] text-slate-400 block mb-0.5">{t.calcGross}:</label>
                <input
                  type="number"
                  value={calcInput}
                  onChange={(e) => setCalcInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-mono text-xs focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="w-24">
                <label className="text-[10px] text-slate-400 block mb-0.5">{t.calcRate}:</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={calcRate}
                    onChange={(e) => setCalcRate(parseFloat(e.target.value) || 0)}
                    placeholder="%"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-mono text-xs focus:outline-none focus:border-blue-400 font-bold text-center"
                  />
                  <span className="absolute right-2 top-1 text-[11px] text-slate-500 font-mono">%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legal Hint / Tip Accordion */}
        <div className="mt-3">
          <button
            onClick={() => {
              sound.playTap();
              setShowTip(!showTip);
            }}
            className="flex items-center justify-between w-full text-xs text-slate-400 hover:text-slate-200 py-1 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.practicalTip}</span>
            </span>
            {showTip ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showTip && (
            <div className="mt-2 p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed animate-in fade-in duration-150">
              <p className="text-amber-300/90 font-medium mb-1">{scenario.tip}</p>
              <p className="text-[11px] text-slate-400">{scenario.lawArticle}</p>
            </div>
          )}
        </div>
      </div>

      {/* Answer Options Header */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
          {t.selectTaxAmount}
        </h3>

        {/* 4 Choices Grid */}
        <div className="space-y-2.5">
          {scenario.options.map((option, idx) => {
            const isSelected = selectedOptionIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`w-full min-h-[58px] p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all active:scale-[0.99] focus-visible:outline-none cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400 text-white shadow-md shadow-amber-400/10 ring-1 ring-amber-400'
                    : 'bg-slate-900 border-slate-800/80 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-amber-400 bg-amber-400 text-slate-950'
                        : 'border-slate-600 bg-transparent'
                    }`}
                  >
                    {isSelected && <span className="text-[11px] font-extrabold">✓</span>}
                  </div>
                  <div className="text-base font-extrabold text-white font-mono tracking-tight tabular-nums">
                    {option.text}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-colors ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800'
                    }`}
                  >
                    {isSelected ? '✓' : '...'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Button: Tasdiqlash / Confirm (Directly under answer options) */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleConfirmAnswer}
            disabled={selectedOptionIndex === null}
            className={`w-full min-h-[52px] py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all focus-visible:outline-none ${
              selectedOptionIndex !== null
                ? 'bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 shadow-lg shadow-amber-400/20 cursor-pointer'
                : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed opacity-60'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>
              {selectedOptionIndex !== null
                ? `${t.confirm} (${scenario.options[selectedOptionIndex].amount.toLocaleString('uz-UZ')} ${t.currency})`
                : `${t.confirm}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
