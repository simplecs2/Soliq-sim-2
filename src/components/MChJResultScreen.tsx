import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Award,
  Sparkles,
  Scale,
  RotateCcw,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';

interface MChJResultScreenProps {
  onOpenShare?: () => void;
}

export const MChJResultScreen: React.FC<MChJResultScreenProps> = () => {
  const { state, nextMChJMonth, resetMChJGame, setActiveScreen } = useGame();
  const { t } = useLanguage();
  const mchj = state.mchjState;
  const result = mchj.lastMonthResult;

  // If 12 months finished
  if (mchj.isFinished) {
    return (
      <div className="space-y-5 pb-28 text-center animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center mx-auto text-3xl shadow-2xl shadow-amber-500/30">
          🏆
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.mchjCompletedAllMonths}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            {state.companyName} — 12 {t.month}
          </h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {t.subTitle}
          </p>
        </div>

        {/* 12-Month Financial Summary Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 text-left">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-medium">{t.totalIncome}</div>
              <div className="text-base font-extrabold text-emerald-400 font-mono tabular-nums mt-0.5">
                {mchj.totalProfit.toLocaleString('uz-UZ')} {t.currency}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-medium">{t.stateRating}</div>
              <div className="text-base font-extrabold text-blue-400 font-mono tabular-nums mt-0.5">
                {mchj.rating} / 100
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-white flex items-center justify-between pb-1 border-b border-slate-800">
              <span>{t.totalTaxesPaid}:</span>
              <span className="text-amber-400 font-mono font-bold">
                {(mchj.totalQQSPaid + mchj.totalFoydaPaid + mchj.totalIjtimoiyPaid).toLocaleString('uz-UZ')} {t.currency}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>• {t.mchjQQSSection}:</span>
              <span className="text-white font-mono">{mchj.totalQQSPaid.toLocaleString('uz-UZ')} {t.currency}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>• {t.mchjProfitSection}:</span>
              <span className="text-white font-mono">{mchj.totalFoydaPaid.toLocaleString('uz-UZ')} {t.currency}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>• {t.mchjSocialSection}:</span>
              <span className="text-white font-mono">{mchj.totalIjtimoiyPaid.toLocaleString('uz-UZ')} {t.currency}</span>
            </div>
            {mchj.totalFinesPaid > 0 && (
              <div className="flex justify-between text-rose-400 pt-1 border-t border-slate-850">
                <span>• {t.totalFinesPaid}:</span>
                <span className="font-mono">-{mchj.totalFinesPaid.toLocaleString('uz-UZ')} {t.currency}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={() => setActiveScreen('stats')}
            className="flex-1 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>{t.navStats}</span>
          </button>

          <button
            type="button"
            onClick={resetMChJGame}
            className="flex-1 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/30"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.resetGame}</span>
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
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

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-200">
      {/* Top Banner: Success or Errors */}
      <div className={`p-5 rounded-3xl border shadow-xl flex items-start gap-4 ${
        result.allCorrect
          ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
          : 'bg-rose-950/70 border-rose-500/40 text-rose-200'
      }`}>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-inner ${
          result.allCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
        }`}>
          {result.allCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {result.allCorrect
                ? t.correctResult
                : result.isTimedOut
                ? t.timeRemaining
                : t.wrongResult}
            </h2>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              result.allCorrect
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
            }`}>
              {result.ratingDelta > 0 ? `+${result.ratingDelta}` : `${result.ratingDelta}`} {t.stateRating.split(' ')[0]}
            </span>
          </div>

          <p className="text-xs mt-1 leading-relaxed opacity-90">
            {result.allCorrect
              ? `${result.monthName} — ${t.mchjMonthFinished}`
              : result.isTimedOut
              ? t.timeRemaining
              : t.wrongResult}
          </p>

          {result.event && result.event.type === 'audit' && !result.allCorrect && (
            <div className="mt-2 p-2 rounded-xl bg-rose-900/40 border border-rose-500/40 text-[11px] font-semibold text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Audit: {t.penalty} x2</span>
            </div>
          )}
        </div>
      </div>

      {/* 3 Tax Calculations Breakdown Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3.5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Scale className="w-4 h-4 text-blue-400" />
          <span>{t.analysisTitle}:</span>
        </h3>

        {/* 1. QQS */}
        <div className={`p-3.5 rounded-2xl border ${
          result.isQQSCorrect ? 'bg-slate-950/80 border-emerald-500/40' : 'bg-slate-950/80 border-rose-500/40'
        }`}>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-bold text-xs text-white flex items-center gap-1.5">
              {result.isQQSCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400" />
              )}
              <span>1) {t.mchjQQSSection}</span>
            </span>
            <span className="text-[10px] text-blue-400 font-mono">SK 258</span>
          </div>
          <div className="text-xs flex justify-between text-slate-300 pt-1">
            <span>{t.correctAmountLabel}</span>
            <span className="font-bold font-mono text-emerald-400">{result.correctQQS.toLocaleString('uz-UZ')} {t.currency}</span>
          </div>
        </div>

        {/* 2. Foyda solig'i */}
        <div className={`p-3.5 rounded-2xl border ${
          result.isFoydaCorrect ? 'bg-slate-950/80 border-emerald-500/40' : 'bg-slate-950/80 border-rose-500/40'
        }`}>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-bold text-xs text-white flex items-center gap-1.5">
              {result.isFoydaCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400" />
              )}
              <span>2) {t.mchjProfitSection}</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">SK 337</span>
          </div>
          <div className="text-xs flex justify-between text-slate-300 pt-1">
            <span>{t.correctAmountLabel}</span>
            <span className="font-bold font-mono text-emerald-400">{result.correctFoyda.toLocaleString('uz-UZ')} {t.currency}</span>
          </div>
        </div>

        {/* 3. Ijtimoiy soliq */}
        <div className={`p-3.5 rounded-2xl border ${
          result.isIjtimoiyCorrect ? 'bg-slate-950/80 border-emerald-500/40' : 'bg-slate-950/80 border-rose-500/40'
        }`}>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-bold text-xs text-white flex items-center gap-1.5">
              {result.isIjtimoiyCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400" />
              )}
              <span>3) {t.mchjSocialSection}</span>
            </span>
            <span className="text-[10px] text-amber-400 font-mono">SK 405</span>
          </div>
          <div className="text-xs flex justify-between text-slate-300 pt-1">
            <span>{t.correctAmountLabel}</span>
            <span className="font-bold font-mono text-emerald-400">{result.correctIjtimoiy.toLocaleString('uz-UZ')} {t.currency}</span>
          </div>
        </div>
      </div>

      {/* Financial Settlement Card for the Month */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2.5 text-xs">
        <h4 className="font-bold text-white uppercase tracking-wider mb-2">
          {result.monthName} {t.availableBalance}:
        </h4>

        <div className="flex justify-between text-slate-300">
          <span>{t.mchjTotalTurnover}:</span>
          <span className="font-mono font-bold text-white">+{result.totalTurnover.toLocaleString('uz-UZ')} {t.currency}</span>
        </div>

        <div className="flex justify-between text-slate-300">
          <span>{t.mchjTotalExpenses}:</span>
          <span className="font-mono text-rose-300">-{result.totalExpenses.toLocaleString('uz-UZ')} {t.currency}</span>
        </div>

        <div className="flex justify-between text-slate-300">
          <span>{t.totalTaxesPaid}:</span>
          <span className="font-mono text-amber-300">-{result.taxesPaid.toLocaleString('uz-UZ')} {t.currency}</span>
        </div>

        {result.fineAmount > 0 && (
          <div className="flex justify-between text-rose-400 font-bold pt-1 border-t border-slate-800">
            <span>{t.penalty}:</span>
            <span className="font-mono">-{result.fineAmount.toLocaleString('uz-UZ')} {t.currency}</span>
          </div>
        )}

        <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
          <span>{t.companyBalance}:</span>
          <span className={`font-mono ${result.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {result.netProfit >= 0 ? '+' : ''}{result.netProfit.toLocaleString('uz-UZ')} {t.currency}
          </span>
        </div>
      </div>

      {/* Primary Next Action */}
      <div className="pt-2">
        <button
          type="button"
          onClick={nextMChJMonth}
          className="w-full min-h-[52px] py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-900/30 transition-all cursor-pointer"
        >
          <span>{result.monthIndex >= 12 ? t.mchjCompletedAllMonths : t.nextMonth}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
