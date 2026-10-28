import React from 'react';
import {
  Building2,
  TrendingUp,
  Award,
  ShieldCheck,
  AlertOctagon,
  Calendar,
  CheckCircle2,
  XCircle,
  BarChart3,
  Layers,
  FileSpreadsheet,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { MCHJ_MONTHS } from '../data/mchjData';

export const MChJStatisticsScreen: React.FC = () => {
  const { state } = useGame();
  const mchj = state.mchjState;
  const history = mchj.monthlyHistory;

  const totalTaxes = mchj.totalQQSPaid + mchj.totalFoydaPaid + mchj.totalIjtimoiyPaid;

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-200">
      {/* Company Title Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/70 border border-slate-800 rounded-3xl p-5 shadow-xl">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center text-xl shrink-0 shadow-inner">
            🏢
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
              Kompaniya statistikasi
            </span>
            <h2 className="text-xl font-extrabold text-white truncate tracking-tight">
              {state.companyName || 'MChJ Kompaniyasi'}
            </h2>
            <p className="text-[11px] text-slate-400">
              O'yinchi: <span className="text-slate-300 font-semibold">{state.playerFirstName} {state.playerLastName}</span>
            </p>
          </div>
        </div>

        {/* 2 Big Metrics */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 font-medium flex items-center justify-between">
              <span>Umumiy sof foyda</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-base sm:text-lg font-extrabold text-emerald-400 font-mono tabular-nums mt-0.5">
              {mchj.totalProfit.toLocaleString('uz-UZ')}
              <span className="text-[10px] font-normal text-slate-400 ml-1">so'm</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 font-medium flex items-center justify-between">
              <span>Kompaniya reytingi</span>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-base sm:text-lg font-extrabold text-white font-mono tabular-nums mt-0.5">
              {mchj.rating} <span className="text-xs text-slate-500 font-normal">/ 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Taxes Breakdown By Categories */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span>To'langan soliqlar turlari bo'yicha:</span>
          </h3>
          <span className="text-xs font-extrabold text-amber-400 font-mono tabular-nums">
            Jami: {totalTaxes.toLocaleString('uz-UZ')} so'm
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          {/* QQS */}
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-blue-500/20 space-y-1">
            <div className="flex items-center justify-between text-blue-400 text-[11px] font-bold">
              <span>QQS (12%)</span>
              <span className="text-[9px] bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">SK 258</span>
            </div>
            <div className="text-sm font-extrabold text-white font-mono tabular-nums">
              {mchj.totalQQSPaid.toLocaleString('uz-UZ')} so'm
            </div>
            <div className="text-[10px] text-slate-400">Mahsulot va xizmat aylanmasidan</div>
          </div>

          {/* Foyda solig'i */}
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-emerald-500/20 space-y-1">
            <div className="flex items-center justify-between text-emerald-400 text-[11px] font-bold">
              <span>Foyda solig'i (15%)</span>
              <span className="text-[9px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">SK 337</span>
            </div>
            <div className="text-sm font-extrabold text-white font-mono tabular-nums">
              {mchj.totalFoydaPaid.toLocaleString('uz-UZ')} so'm
            </div>
            <div className="text-[10px] text-slate-400">Sof korporativ foydadan</div>
          </div>

          {/* Ijtimoiy soliq */}
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-amber-500/20 space-y-1">
            <div className="flex items-center justify-between text-amber-400 text-[11px] font-bold">
              <span>Ijtimoiy soliq (12%)</span>
              <span className="text-[9px] bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">SK 405</span>
            </div>
            <div className="text-sm font-extrabold text-white font-mono tabular-nums">
              {mchj.totalIjtimoiyPaid.toLocaleString('uz-UZ')} so'm
            </div>
            <div className="text-[10px] text-slate-400">Ish haqi jamg'armasidan</div>
          </div>
        </div>

        {mchj.totalFinesPaid > 0 && (
          <div className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/25 flex items-center justify-between text-xs text-rose-300">
            <span className="flex items-center gap-1.5 font-bold">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <span>To'langan jarimalar va penyalar:</span>
            </span>
            <span className="font-mono font-bold text-rose-400 tabular-nums">
              -{mchj.totalFinesPaid.toLocaleString('uz-UZ')} so'm
            </span>
          </div>
        )}
      </div>

      {/* Monthly History Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Oylar bo'yicha to'liq hisobotlar tarixi</span>
          </h3>
          <span className="text-xs text-slate-400">
            {history.length} ta hisobot
          </span>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs">
            Hozircha topshirilgan hisobotlar mavjud emas. Birinchi oyni topshiring!
          </div>
        ) : (
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-bold">
                  <th className="py-2.5 px-2">Oy</th>
                  <th className="py-2.5 px-2">Aylanma</th>
                  <th className="py-2.5 px-2">Xarajat</th>
                  <th className="py-2.5 px-2">QQS (12%)</th>
                  <th className="py-2.5 px-2">Foyda (15%)</th>
                  <th className="py-2.5 px-2">Ijtimoiy (12%)</th>
                  <th className="py-2.5 px-2">Sof foyda</th>
                  <th className="py-2.5 px-2 text-right">Holat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {history.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3 px-2 font-bold font-sans text-white whitespace-nowrap">
                      {rec.monthName}
                    </td>
                    <td className="py-3 px-2 text-slate-300 tabular-nums whitespace-nowrap">
                      {rec.totalTurnover.toLocaleString('uz-UZ')}
                    </td>
                    <td className="py-3 px-2 text-rose-300 tabular-nums whitespace-nowrap">
                      {rec.totalExpenses.toLocaleString('uz-UZ')}
                    </td>
                    <td className="py-3 px-2 text-blue-300 tabular-nums whitespace-nowrap">
                      {rec.correctQQS.toLocaleString('uz-UZ')}
                    </td>
                    <td className="py-3 px-2 text-emerald-300 tabular-nums whitespace-nowrap">
                      {rec.correctFoyda.toLocaleString('uz-UZ')}
                    </td>
                    <td className="py-3 px-2 text-amber-300 tabular-nums whitespace-nowrap">
                      {rec.correctIjtimoiy.toLocaleString('uz-UZ')}
                    </td>
                    <td className={`py-3 px-2 font-bold tabular-nums whitespace-nowrap ${
                      rec.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {rec.netProfit.toLocaleString('uz-UZ')}
                    </td>
                    <td className="py-3 px-2 text-right whitespace-nowrap">
                      {rec.allCorrect ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-sans font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>To'g'ri</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-sans font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                          <XCircle className="w-3 h-3" />
                          <span>Xato</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
