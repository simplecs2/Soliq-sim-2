import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { MCHJ_MONTHS } from '../data/mchjData';

export const MChJHomeScreen: React.FC = () => {
  const { state, startMChJMonthReport } = useGame();
  const { t } = useLanguage();
  const [showFormulaInfo, setShowFormulaInfo] = useState(false);

  const mchj = state.mchjState;
  const fin = mchj.currentFinancials;
  const monthName = MCHJ_MONTHS[(mchj.month - 1) % 12];

  if (!fin) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-slate-400">{t.mchjMonthlyDeclaration}...</p>
        <button
          onClick={startMChJMonthReport}
          className="px-4 py-2 bg-blue-600 rounded-xl text-white font-bold text-xs cursor-pointer"
        >
          {t.startCalculation}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-28">
      {/* Company Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/70 border border-slate-800 rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-400/30 text-blue-400 flex items-center justify-center text-xl shrink-0 shadow-inner">
              🏢
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <span>{t.modeMChJ.split('(')[0].trim()}</span>
                <span>·</span>
                <span className="text-slate-400">{mchj.month} / 12 {t.month}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white truncate tracking-tight">
                {state.companyName || 'MChJ Kompaniyasi'}
              </h2>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-[10px] text-slate-400 font-medium">{t.month}</div>
            <div className="text-xs sm:text-sm font-bold text-white bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700/60 mt-0.5">
              {monthName}
            </div>
          </div>
        </div>

        {/* Company Key Metrics Bar */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80">
          <div className="bg-slate-950/60 border border-slate-800/70 rounded-2xl p-3">
            <div className="text-[10px] text-slate-400 font-medium flex items-center justify-between">
              <span>{t.companyBalance}</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-base sm:text-lg font-extrabold text-emerald-400 font-mono tabular-nums mt-0.5">
              {mchj.balance.toLocaleString('uz-UZ')}
              <span className="text-[11px] font-normal text-slate-400 ml-1">{t.currency}</span>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/70 rounded-2xl p-3">
            <div className="text-[10px] text-slate-400 font-medium flex items-center justify-between">
              <span>{t.stateRating}</span>
              <span className={`text-[10px] font-bold ${
                mchj.rating >= 70 ? 'text-blue-400' : mchj.rating >= 50 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {mchj.rating >= 70 ? '100%' : 'Risk'}
              </span>
            </div>
            <div className="text-base sm:text-lg font-extrabold text-white font-mono tabular-nums mt-0.5">
              {mchj.rating} <span className="text-xs text-slate-500 font-normal">/ 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Statement: Incomes and Expenses */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {t.mchjMonthlyDeclaration}
        </h3>

        {/* Revenues */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1.5 border-b border-slate-800">
            <span className="text-slate-400">{t.mchjSalesRevenue}:</span>
            <span className="font-bold text-white font-mono tabular-nums">
              {fin.salesRevenue.toLocaleString('uz-UZ')} {t.currency}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-800">
            <span className="text-slate-400">{t.mchjServicesRevenue}:</span>
            <span className="font-bold text-white font-mono tabular-nums">
              {fin.servicesRevenue.toLocaleString('uz-UZ')} {t.currency}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-800">
            <span className="text-slate-400">{t.mchjExportRevenue}:</span>
            <span className="font-bold text-emerald-400 font-mono tabular-nums">
              {fin.exportRevenue.toLocaleString('uz-UZ')} {t.currency}
            </span>
          </div>
          <div className="flex justify-between py-2 bg-slate-950/50 px-2 rounded-xl">
            <span className="font-bold text-amber-300">{t.mchjTotalTurnover}:</span>
            <span className="font-extrabold text-amber-300 font-mono tabular-nums">
              {fin.totalTurnover.toLocaleString('uz-UZ')} {t.currency}
            </span>
          </div>
        </div>

        {/* Expenses */}
        <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between py-1.5 border-b border-slate-800">
            <span className="text-slate-400">{t.mchjSalaries}:</span>
            <span className="font-bold text-rose-300 font-mono tabular-nums">
              {fin.salariesExpense.toLocaleString('uz-UZ')} {t.currency}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-800">
            <span className="text-slate-400">{t.mchjRent}:</span>
            <span className="font-bold text-rose-300 font-mono tabular-nums">
              {fin.rentExpense.toLocaleString('uz-UZ')} {t.currency}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-800">
            <span className="text-slate-400">{t.mchjMaterials}:</span>
            <span className="font-bold text-rose-300 font-mono tabular-nums">
              {fin.materialsExpense.toLocaleString('uz-UZ')} {t.currency}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-800">
            <span className="text-slate-400">{t.mchjMarketing}:</span>
            <span className="font-bold text-rose-300 font-mono tabular-nums">
              {fin.marketingExpense.toLocaleString('uz-UZ')} {t.currency}
            </span>
          </div>
          <div className="flex justify-between py-2 bg-slate-950/50 px-2 rounded-xl">
            <span className="font-bold text-rose-400">{t.mchjTotalExpenses}:</span>
            <span className="font-extrabold text-rose-400 font-mono tabular-nums">
              {fin.totalExpenses.toLocaleString('uz-UZ')} {t.currency}
            </span>
          </div>
        </div>
      </div>

      {/* Tax Legal Formulas Accordion */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3.5">
        <button
          type="button"
          onClick={() => setShowFormulaInfo(!showFormulaInfo)}
          className="w-full flex items-center justify-between text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2 font-bold">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>{t.calculator} & {t.legalBasis}</span>
          </span>
          {showFormulaInfo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showFormulaInfo && (
          <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-300 animate-in fade-in duration-150">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="font-bold text-blue-300">1) {t.mchjQQSSection} (SK 258/260)</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {t.selectTaxAmount}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="font-bold text-emerald-300">2) {t.mchjProfitSection} (SK 337)</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {t.selectTaxAmount}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="font-bold text-amber-300">3) {t.mchjSocialSection} (SK 405)</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {t.selectTaxAmount}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Primary Action Button: Go to Tax Declaration */}
      <div className="pt-2">
        <button
          type="button"
          onClick={startMChJMonthReport}
          className="w-full min-h-[56px] py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-900/30 transition-all cursor-pointer"
        >
          <span>{monthName} — {t.startCalculation}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
