import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Share2,
  Scale,
  Sparkles,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';

interface ResultScreenProps {
  onOpenShare: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ onOpenShare }) => {
  const { state, nextDay } = useGame();
  const { t, localizeScenario } = useLanguage();
  const record = state.lastRecord;
  const rawScenario = state.currentScenario;
  const scenario = localizeScenario(rawScenario);

  if (!record || !scenario) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 mb-4">{t.allDaysCompleted}</p>
        <button
          onClick={nextDay}
          className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm cursor-pointer"
        >
          {t.proceed}
        </button>
      </div>
    );
  }

  const isSuccess = record.isCorrect;

  return (
    <div className="space-y-4 pb-28">
      {/* Result Status Banner */}
      <div
        className={`rounded-3xl p-6 border shadow-xl relative overflow-hidden text-center ${
          isSuccess
            ? 'bg-gradient-to-b from-emerald-950/80 to-slate-900 border-emerald-500/40 shadow-emerald-950/30'
            : 'bg-gradient-to-b from-rose-950/80 to-slate-900 border-rose-500/40 shadow-rose-950/30'
        }`}
      >
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg ${
            isSuccess
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
          }`}
        >
          {isSuccess ? <CheckCircle2 className="w-9 h-9" /> : <XCircle className="w-9 h-9" />}
        </div>

        <h2 className="text-xl font-extrabold text-white mb-1 tracking-tight">
          {isSuccess ? t.correctResult : t.wrongResult}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
          {isSuccess
            ? t.stateRatingGood
            : t.stateRatingRisk}
        </p>

        {/* Reward / Penalty Badges */}
        <div className="flex items-center justify-center gap-3 mt-4 text-xs font-bold">
          {isSuccess ? (
            <>
              <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                <Sparkles className="w-3.5 h-3.5" />
                <span>+{record.bonusAmount.toLocaleString('uz-UZ')} {t.currency} {t.bonus}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-xl">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+6% {t.taxLiteracy}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1 text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-xl">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>-{record.fineAmount.toLocaleString('uz-UZ')} {t.currency} {t.penalty}</span>
              </div>
              <div className="flex items-center gap-1 text-rose-300 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-xl">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>-8% {t.stateRating}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Financial Summary Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {t.analysisTitle} ({state.day}-{t.day})
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1.5 border-b border-slate-800/80">
            <span className="text-slate-400">
              {t.calcGross}:
            </span>
            <span className="font-bold text-white tabular-nums">
              {record.grossAmount.toLocaleString('uz-UZ')} {t.currency}
            </span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-slate-800/80">
            <span className="text-slate-400">
              {t.correctAmountLabel}
            </span>
            <span className="font-bold text-amber-400 tabular-nums">
              {record.correctTaxAmount.toLocaleString('uz-UZ')} {t.currency}
            </span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-slate-800/80">
            <span className="text-slate-400">{t.yourChoiceLabel}</span>
            <span
              className={`font-bold tabular-nums ${
                isSuccess ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {record.userTaxAmount.toLocaleString('uz-UZ')} {t.currency}
            </span>
          </div>

          <div className="flex justify-between py-2 pt-3">
            <span className="text-sm font-bold text-white">{t.availableBalance}:</span>
            <span className="text-sm font-extrabold text-emerald-400 tabular-nums">
              {state.balance.toLocaleString('uz-UZ')} {t.currency}
            </span>
          </div>
        </div>
      </div>

      {/* Legal Code & Education Explanation */}
      <div className="bg-slate-900 border border-blue-500/30 rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-2">
          <Scale className="w-4 h-4" />
          <span>{t.legalBasis.toUpperCase()}:</span>
        </div>

        <h4 className="text-sm font-bold text-white mb-2">
          {scenario.lawArticle}
        </h4>

        <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 text-xs text-slate-300 leading-relaxed space-y-2">
          <p>{scenario.lawSummary}</p>
        </div>

        <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.practicalTip} {scenario.tip}</span>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onOpenShare}
          className="py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>{t.navStats}</span>
        </button>

        <button
          onClick={nextDay}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
        >
          <span>{t.nextDay}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
