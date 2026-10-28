import React from 'react';
import {
  TrendingUp,
  Award,
  ShieldCheck,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  History,
  BarChart3,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';

export const StatisticsScreen: React.FC = () => {
  const { state } = useGame();
  const { t } = useLanguage();

  const totalRounds = state.history.length;
  const correctRounds = state.history.filter((h) => h.isCorrect).length;
  const accuracyPercentage = totalRounds > 0 ? Math.round((correctRounds / totalRounds) * 100) : 0;

  return (
    <div className="space-y-5 pb-24">
      {/* Header Title */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">{t.statsTitle}</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          {t.subTitle}
        </p>
      </div>

      {/* Main Tax Literacy Level Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950/60 to-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              {t.taxLiteracy}
            </div>
            <div className="text-3xl font-extrabold text-white tabular-nums tracking-tight">
              {state.taxLiteracy}%
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {state.taxLiteracy >= 80
                ? t.stateRatingGood
                : state.taxLiteracy >= 50
                ? t.stateRatingAverage
                : t.stateRatingRisk}
            </p>
          </div>

          <div className="w-20 h-20 rounded-2xl bg-amber-400/10 border-2 border-amber-400/30 text-amber-400 flex flex-col items-center justify-center shrink-0">
            <Award className="w-8 h-8 mb-1" />
            <span className="text-[10px] font-bold">{state.day}-{t.day}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-800 rounded-full h-2.5 mt-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.min(100, Math.max(5, state.taxLiteracy))}%` }}
          />
        </div>
      </div>

      {/* 4 Core Financial Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>{t.totalIncome}</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-base sm:text-lg font-extrabold text-white tabular-nums">
            {state.totalIncome.toLocaleString('uz-UZ')}
            <span className="text-[10px] text-slate-400 font-normal ml-1">{t.currency}</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>{t.totalTaxesPaid}</span>
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-base sm:text-lg font-extrabold text-blue-400 tabular-nums">
            {state.totalTaxPaid.toLocaleString('uz-UZ')}
            <span className="text-[10px] text-slate-400 font-normal ml-1">{t.currency}</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>{t.totalFinesPaid}</span>
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-base sm:text-lg font-extrabold text-rose-400 tabular-nums">
            {state.totalFinesPaid.toLocaleString('uz-UZ')}
            <span className="text-[10px] text-slate-400 font-normal ml-1">{t.currency}</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>{t.bestStreak}</span>
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-base sm:text-lg font-extrabold text-amber-400 tabular-nums">
            {accuracyPercentage}%
            <span className="text-[10px] text-slate-400 font-normal ml-1">
              ({correctRounds}/{totalRounds})
            </span>
          </div>
        </div>
      </div>

      {/* Payment History List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <History className="w-4 h-4 text-slate-400" />
            <span>{t.historyTitle}</span>
          </h3>
          <span className="text-xs text-slate-400">{state.history.length}</span>
        </div>

        {state.history.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 text-center text-slate-400 text-xs">
            {t.noHistoryYet}
          </div>
        ) : (
          <div className="space-y-2">
            {state.history.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      item.isCorrect
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {item.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-white truncate">{item.scenarioTitle}</div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
                      {item.day}-{t.day} ({item.dayName}) · {item.lawArticle}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono font-bold text-white tabular-nums">
                    {item.grossAmount.toLocaleString('uz-UZ')} {t.currency}
                  </div>
                  <div
                    className={`text-[11px] font-semibold tabular-nums mt-0.5 ${
                      item.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {item.isCorrect
                      ? `+${item.bonusAmount.toLocaleString('uz-UZ')} ${t.bonus}`
                      : `-${item.fineAmount.toLocaleString('uz-UZ')} ${t.penalty}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
