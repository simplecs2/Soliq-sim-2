import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  ShieldAlert,
  Building2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Globe,
  ChevronDown,
  Check,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';
import { EMBLEM_IMAGE_PATH } from '../data/taxScenarios';
import { MCHJ_MONTHS } from '../data/mchjData';

export const Header: React.FC = () => {
  const { state, toggleSound, resetGame } = useGame();
  const { language, setLanguage, t } = useLanguage();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const isMChJ = state.businessMode === 'mchj';
  const mchjMonthName = MCHJ_MONTHS[(state.mchjState.month - 1) % 12] || `${t.month} ${state.mchjState.month}`;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageOptions: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Zone 1: Wordmark & Emblem & Language Dropdown */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden shadow-sm shrink-0 border ${
                isMChJ
                  ? 'bg-blue-900/40 border-blue-400/40 text-blue-400'
                  : 'bg-gradient-to-br from-blue-900 to-indigo-950 border-amber-400/30'
              }`}
            >
              {isMChJ ? (
                <Building2 className="w-5 h-5 text-blue-400" />
              ) : (
                <img
                  src={EMBLEM_IMAGE_PATH}
                  alt="Soliq Sim"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white truncate max-w-[130px] sm:max-w-none">
                  {isMChJ && state.companyName ? state.companyName : t.appTitle}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap ${
                    isMChJ
                      ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                      : 'bg-amber-400/15 text-amber-300 border-amber-400/30'
                  }`}
                >
                  {isMChJ ? t.modeTagMChJ : t.modeTagYaTT}
                </span>
              </div>

              {isMChJ ? (
                <div className="flex items-center gap-2 text-[11px] text-slate-300 font-medium">
                  <span className="text-blue-300 font-semibold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-blue-400" />
                    <span>{mchjMonthName}</span>
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400 truncate hidden xs:inline">
                    {state.playerFirstName} {state.playerLastName}
                  </span>
                </div>
              ) : state.playerFirstName && state.playerLastName ? (
                <p className="text-[11px] text-slate-300 font-medium truncate">
                  <span className="text-amber-300/95 font-semibold">
                    {state.playerFirstName} {state.playerLastName}
                  </span>
                </p>
              ) : (
                <p className="text-[11px] text-slate-400 hidden sm:block">{t.subTitle}</p>
              )}
            </div>
          </div>

          {/* Zone 2: Stats & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {state.playerFirstName && (
              <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/60 rounded-xl px-2 sm:px-2.5 py-1 text-xs text-slate-300 max-w-[110px] sm:max-w-[170px]">
                <span className="text-amber-400/90 font-medium hidden sm:inline">{t.player}:</span>
                <span className="font-semibold text-white truncate">
                  {state.playerFirstName} {state.playerLastName}
                </span>
              </div>
            )}

            {isMChJ ? (
              <>
                {/* MChJ Balance Pill */}
                <div className="bg-slate-800/90 border border-slate-700/70 rounded-xl px-2.5 py-1 text-right">
                  <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                    {t.companyBalance}
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono tabular-nums leading-none mt-0.5">
                    {state.balance.toLocaleString('uz-UZ')}{' '}
                    <span className="text-[10px] font-normal text-slate-400">{t.currency}</span>
                  </div>
                </div>

                {/* MChJ Rating Pill */}
                <div className="bg-slate-800/90 border border-slate-700/70 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                      {t.stateRating.split(' ')[0]}
                    </div>
                    <div className="text-xs font-bold text-white tabular-nums leading-none mt-0.5">
                      {state.mchjState.rating}/100
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 rounded-xl px-3 py-1.5 text-xs text-slate-200">
                <span className="text-slate-400">
                  {state.day}-{t.day}
                </span>
                <span className="text-slate-600">·</span>
                <div className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {state.streak} {t.streak}
                  </span>
                </div>
              </div>
            )}

            {/* Zone 3: Interactive Controls (Language Dropdown, Sound, Reset) */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* Language Switcher Dropdown */}
              <div className="relative" ref={langMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="h-8 sm:h-9 px-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 flex items-center gap-1.5 text-xs font-bold text-white transition-colors cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Language selector"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="uppercase">{language}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-1.5 w-36 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {languageOptions.map((opt) => (
                      <button
                        key={opt.code}
                        type="button"
                        onClick={() => {
                          setLanguage(opt.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer text-left ${
                          language === opt.code
                            ? 'text-amber-400 bg-amber-400/10 font-bold'
                            : 'text-slate-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm">{opt.flag}</span>
                          <span>{opt.label}</span>
                        </span>
                        {language === opt.code && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 flex items-center justify-center text-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
                title={state.soundEnabled ? t.soundToggleOn : t.soundToggleOff}
                aria-label="Audio setting"
              >
                {state.soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {/* Reset Game */}
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-rose-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer"
                title={t.resetGame}
                aria-label="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t.resetModalTitle}</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              {t.resetModalDesc}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                onClick={() => {
                  resetGame();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shadow-lg shadow-rose-600/20 cursor-pointer"
              >
                {t.confirmReset}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
