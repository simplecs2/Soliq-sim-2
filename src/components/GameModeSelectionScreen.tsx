import React, { useState } from 'react';
import { Building2, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { EMBLEM_IMAGE_PATH } from '../data/taxScenarios';
import { sound } from '../utils/audio';

export const GameModeSelectionScreen: React.FC = () => {
  const { state, setGameMode } = useGame();
  const { t } = useLanguage();
  const [view, setView] = useState<'mode_select' | 'mchj_company_input'>('mode_select');
  const [companyName, setCompanyName] = useState('');

  const isCompanyNameValid = companyName.trim().length >= 3;

  const handleSelectYaTT = () => {
    sound.playLevelUp();
    setGameMode('yatt');
  };

  const handleProceedToMChJInput = () => {
    sound.playTap();
    setView('mchj_company_input');
  };

  const handleConfirmMChJ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCompanyNameValid) return;
    sound.playLevelUp();
    setGameMode('mchj', companyName.trim());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* VIEW 1: MODE SELECTION CARDS */}
        {view === 'mode_select' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 border border-amber-400/30 flex items-center justify-center mx-auto overflow-hidden shadow-xl mb-3">
                <img
                  src={EMBLEM_IMAGE_PATH}
                  alt="Soliq Sim"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-semibold mb-1">
                <span>{state.playerFirstName} {state.playerLastName}</span>
              </div>

              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                {t.modeYaTT.split('(')[0].trim()} / {t.modeMChJ.split('(')[0].trim()}
              </h1>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                {t.subTitle}
              </p>
            </div>

            {/* Two Big Cards */}
            <div className="space-y-4">
              {/* CARD 1: YaTT */}
              <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/40 rounded-3xl p-5 shadow-xl transition-all relative overflow-hidden group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/25 text-amber-400 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                    👤
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h2 className="text-base font-bold text-white tracking-tight">
                        {t.modeYaTT}
                      </h2>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {t.freelanceITDesc}, {t.marketplaceDesc}. {t.turnoverTax}.
                    </p>

                    <button
                      type="button"
                      onClick={handleSelectYaTT}
                      className="w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.98] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-400/20 transition-all cursor-pointer"
                    >
                      <span>{t.start}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* CARD 2: MChJ */}
              <div className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 rounded-3xl p-5 shadow-xl transition-all relative overflow-hidden group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/25 text-blue-400 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                    🏢
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h2 className="text-base font-bold text-white tracking-tight">
                        {t.modeMChJ}
                      </h2>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {t.mchjQQSSection}, {t.mchjProfitSection}, {t.mchjSocialSection}.
                    </p>

                    <button
                      type="button"
                      onClick={handleProceedToMChJInput}
                      className="w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                    >
                      <span>{t.start}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: MCHJ COMPANY NAME INPUT SCREEN */}
        {view === 'mchj_company_input' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 space-y-5">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/25 text-blue-400 flex items-center justify-center text-2xl mx-auto shadow-inner">
                🏢
              </div>

              <h2 className="text-xl font-extrabold text-white tracking-tight">
                {t.company}
              </h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                {t.modeTagMChJ}
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleConfirmMChJ} className="space-y-4">
              <div>
                <label
                  htmlFor="company-name-input"
                  className="block text-xs font-bold text-slate-300 mb-1.5"
                >
                  {t.company} (MChJ / LLC)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    id="company-name-input"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. 'Baraka Savdo MChJ'"
                    autoFocus
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-400 rounded-2xl py-3 pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Action Buttons: Tasdiqlash & Orqaga */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playTap();
                    setView('mode_select');
                  }}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors order-2 sm:order-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.cancel}</span>
                </button>

                <button
                  type="submit"
                  disabled={!isCompanyNameValid}
                  className={`flex-1 min-h-[46px] py-3 px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg order-1 sm:order-2 ${
                    isCompanyNameValid
                      ? 'bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white shadow-blue-600/20 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed opacity-60'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.confirm}</span>
                </button>
              </div>
            </form>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{t.stateRatingGood}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
