import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  ArrowLeft,
  Pause,
  Play,
  CheckCircle2,
  Calculator,
  Building2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/audio';

export const MChJCalculationScreen: React.FC = () => {
  const { state, submitMChJMonthTaxes, setActiveScreen } = useGame();
  const { t } = useLanguage();
  const fin = state.mchjState.currentFinancials;

  const [selectedQQS, setSelectedQQS] = useState<number | null>(null);
  const [selectedFoyda, setSelectedFoyda] = useState<number | null>(null);
  const [selectedIjtimoiy, setSelectedIjtimoiy] = useState<number | null>(null);

  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showHelper, setShowHelper] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasSubmittedRef = useRef<boolean>(false);
  const choicesRef = useRef({ qqs: selectedQQS, foyda: selectedFoyda, ijtimoiy: selectedIjtimoiy });

  useEffect(() => {
    choicesRef.current = { qqs: selectedQQS, foyda: selectedFoyda, ijtimoiy: selectedIjtimoiy };
  }, [selectedQQS, selectedFoyda, selectedIjtimoiy]);

  // Countdown timer effect
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

  // Auto-submit when time expires
  useEffect(() => {
    if (timeLeft === 0 && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      const { qqs, foyda, ijtimoiy } = choicesRef.current;
      submitMChJMonthTaxes(
        qqs !== null ? qqs : -1,
        foyda !== null ? foyda : -1,
        ijtimoiy !== null ? ijtimoiy : -1,
        true
      );
    }
  }, [timeLeft, submitMChJMonthTaxes]);

  if (!fin) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 mb-4">{t.mchjCompletedAllMonths}</p>
        <button
          onClick={() => setActiveScreen('home')}
          className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm cursor-pointer"
        >
          {t.navHome}
        </button>
      </div>
    );
  }

  const allSelected = selectedQQS !== null && selectedFoyda !== null && selectedIjtimoiy !== null;

  const handleConfirm = () => {
    if (!allSelected || hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    submitMChJMonthTaxes(selectedQQS!, selectedFoyda!, selectedIjtimoiy!, false);
  };

  const timerPercentage = (timeLeft / 60) * 100;
  const isTimeUrgent = timeLeft <= 10;

  return (
    <div className="space-y-4 pb-28">
      {/* Top Header & Timer Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setActiveScreen('home')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors py-1.5 px-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.navHome}</span>
        </button>

        <div className="flex items-center gap-2">
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

          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold tabular-nums transition-colors ${
              isTimeUrgent
                ? 'bg-rose-500/10 border-rose-500/40 text-rose-400 animate-pulse'
                : 'bg-slate-900 border-slate-800 text-blue-400'
            }`}
          >
            <Clock className={`w-3.5 h-3.5 ${isTimeUrgent ? 'text-rose-400' : 'text-blue-400'}`} />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Timer Progress Bar */}
      <div className="w-full bg-slate-850 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            isTimeUrgent ? 'bg-rose-500' : timeLeft <= 25 ? 'bg-amber-400' : 'bg-blue-500'
          }`}
          style={{ width: `${timerPercentage}%` }}
        />
      </div>

      {/* Month Financial Overview Compact Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 shadow-lg space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>{fin.monthName}</span>
          </span>
          <button
            onClick={() => setShowHelper(!showHelper)}
            className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.calculator}</span>
            {showHelper ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
          <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] text-slate-400">{t.mchjTotalTurnover}</div>
            <div className="font-bold text-white font-mono tabular-nums text-[11px] sm:text-xs">
              {fin.totalTurnover.toLocaleString('uz-UZ')}
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] text-slate-400">{t.mchjTotalExpenses}</div>
            <div className="font-bold text-rose-300 font-mono tabular-nums text-[11px] sm:text-xs">
              {fin.totalExpenses.toLocaleString('uz-UZ')}
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] text-slate-400">{t.mchjSalaries.split('(')[0].trim()}</div>
            <div className="font-bold text-amber-300 font-mono tabular-nums text-[11px] sm:text-xs">
              {fin.salariesExpense.toLocaleString('uz-UZ')}
            </div>
          </div>
        </div>

        {showHelper && (
          <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-[11px] text-blue-200 space-y-1 animate-in fade-in duration-150">
            <div>• <b>{t.mchjQQSSection}</b>: SK 258 / 260.</div>
            <div>• <b>{t.mchjProfitSection}</b>: SK 337.</div>
            <div>• <b>{t.mchjSocialSection}</b>: SK 405.</div>
          </div>
        )}
      </div>

      {/* STEP 3.1: TAX 1 - QQS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 font-extrabold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="text-sm font-bold text-white">{t.mchjQQSSection}</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">SK 258</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {t.selectTaxAmount} ({t.mchjExportRevenue}: {fin.exportRevenue.toLocaleString('uz-UZ')} {t.currency}).
        </p>

        <div className="space-y-2">
          {fin.qqsOptions.map((opt, idx) => {
            const isSel = selectedQQS === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  sound.playTap();
                  setSelectedQQS(idx);
                }}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  isSel
                    ? 'bg-blue-600/15 border-blue-500 text-white ring-1 ring-blue-500'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSel ? 'border-blue-400 bg-blue-500 text-white' : 'border-slate-600'
                  }`}>
                    {isSel && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                  <span className="text-xs font-bold font-mono">{opt.text}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 3.2: TAX 2 - FOYDA SOLIG'I */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-extrabold text-xs flex items-center justify-center">
              2
            </span>
            <h3 className="text-sm font-bold text-white">{t.mchjProfitSection}</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">SK 337</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {t.selectTaxAmount}
        </p>

        <div className="space-y-2">
          {fin.foydaOptions.map((opt, idx) => {
            const isSel = selectedFoyda === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  sound.playTap();
                  setSelectedFoyda(idx);
                }}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  isSel
                    ? 'bg-emerald-600/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSel ? 'border-emerald-400 bg-emerald-500 text-white' : 'border-slate-600'
                  }`}>
                    {isSel && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                  <span className="text-xs font-bold font-mono">{opt.text}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 3.3: TAX 3 - IJTIMOIY SOLIQ */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-extrabold text-xs flex items-center justify-center">
              3
            </span>
            <h3 className="text-sm font-bold text-white">{t.mchjSocialSection}</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">SK 405</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {t.mchjSalaries} ({fin.salariesExpense.toLocaleString('uz-UZ')} {t.currency}).
        </p>

        <div className="space-y-2">
          {fin.ijtimoiyOptions.map((opt, idx) => {
            const isSel = selectedIjtimoiy === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  sound.playTap();
                  setSelectedIjtimoiy(idx);
                }}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  isSel
                    ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSel ? 'border-amber-400 bg-amber-500 text-white' : 'border-slate-600'
                  }`}>
                    {isSel && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                  <span className="text-xs font-bold font-mono">{opt.text}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirmation CTA Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!allSelected}
          className={`w-full min-h-[52px] py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
            allSelected
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white shadow-blue-900/30 cursor-pointer'
              : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed opacity-60'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>
            {allSelected ? t.mchjSubmitTaxes : t.confirm}
          </span>
        </button>
      </div>
    </div>
  );
};
