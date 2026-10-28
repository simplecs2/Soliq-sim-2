import React, { useState } from 'react';
import {
  Play,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  Award,
  BookOpen,
  Bot,
  UserCheck,
  Lock,
  Share2,
  Briefcase,
  X,
  School,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_PERKS, getScenarioForDay } from '../data/taxScenarios';
import { StudentAvatar } from './StudentAvatar';

interface HomeScreenProps {
  onOpenShare: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onOpenShare }) => {
  const { state, startDay, setActiveScreen, updateEducationProfile } = useGame();
  const { t, localizeScenario } = useLanguage();
  const [showEditEducationModal, setShowEditEducationModal] = useState(false);
  const [inputUniversity, setInputUniversity] = useState(state.studyPlace || 'Toshkent Axborot Texnologiyalari Universiteti');
  const [inputCourse, setInputCourse] = useState(state.studyCourse || '3-kurs');

  const rawScenario = getScenarioForDay(state.day, state.businessMode, 'orta', state.companyName);
  const nextScenario = localizeScenario(rawScenario) || rawScenario;

  const getLiteracyTitle = (score: number) => {
    if (score >= 90) return { title: t.taxLiteracyLevel.expert, color: 'text-amber-400' };
    if (score >= 70) return { title: t.taxLiteracyLevel.advanced, color: 'text-emerald-400' };
    if (score >= 45) return { title: t.taxLiteracyLevel.intermediate, color: 'text-sky-400' };
    return { title: t.taxLiteracyLevel.beginner, color: 'text-slate-400' };
  };

  const literacyInfo = getLiteracyTitle(state.taxLiteracy);

  const openEducationModal = () => {
    setInputUniversity(state.studyPlace || 'Toshkent Axborot Texnologiyalari Universiteti');
    setInputCourse(state.studyCourse || '3-kurs');
    setShowEditEducationModal(true);
  };

  const handleSaveEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUniversity.trim()) return;
    updateEducationProfile(inputUniversity, inputCourse);
    setShowEditEducationModal(false);
  };

  const universityPresets = [
    'Toshkent Axborot Texnologiyalari Universiteti (TATU)',
    'O\'zbekiston Milliy Universiteti (O\'zMU)',
    'Toshkent Davlat Iqtisodiyot Universiteti (TDIU)',
    'Singapur Menejmentni Rivojlantirish Instituti (MDIST)',
    'Inha Universiteti (IUT)',
    'Westminster Xalqaro Universiteti (WIUT)',
    'Toshkent Moliya Instituti',
    'Samarqand Davlat Universiteti (SamDU)',
  ];

  const courseOptions = ['1-kurs', '2-kurs', '3-kurs', '4-kurs', 'Magistratura 1-kurs', 'Magistratura 2-kurs'];

  return (
    <div className="space-y-4 pb-24">
      {/* Bank Account Freeze Alert if Evading Taxes */}
      {state.isBankBlocked && (
        <div className="bg-rose-950/80 border border-rose-500/40 rounded-2xl p-4 flex items-start gap-3 text-rose-200 shadow-lg shadow-rose-950/40 animate-pulse">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 text-sm">
            <h4 className="font-bold text-white mb-0.5">{t.bankBlockedTitle}</h4>
            <p className="text-xs text-rose-300/90 leading-relaxed">
              {t.bankBlockedDesc}
            </p>
          </div>
        </div>
      )}

      {/* Character Profile Card (Universal Student Avatar & Real Player Name) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/60 border border-slate-800 rounded-3xl p-5 shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          {/* Universal Modern Faceless Student Avatar */}
          <StudentAvatar size="md" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 truncate">
                  {t.playerProfile}
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white truncate tracking-tight">
                  {state.playerFirstName} {state.playerLastName}
                </h2>
              </div>
              <button
                type="button"
                onClick={openEducationModal}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap px-2.5 py-1 rounded-xl bg-amber-400/10 border border-amber-400/20 cursor-pointer active:scale-95"
              >
                {t.edit}
              </button>
            </div>

            {/* Static Profession - not editable */}
            <p className="text-xs text-slate-300 font-medium truncate mt-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{t.professionValue}</span>
            </p>

            {/* Dynamic University & Course */}
            <p className="text-[11px] text-slate-400 truncate mt-0.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{state.studyPlace || 'Toshkent Axborot Texnologiyalari Universiteti'}, {state.studyCourse || '3-kurs'}</span>
            </p>

            <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400 flex-wrap">
              <span className={`font-semibold ${
                state.businessMode === 'mchj' ? 'text-blue-400' : 'text-amber-400'
              }`}>
                {state.businessMode === 'mchj'
                  ? `🏢 ${state.companyName || 'MChJ'}`
                  : `👤 ${t.modeYaTT.split(' ')[0]}`}
              </span>
              <span>·</span>
              <span>{t.dailyBudget}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: O'quv ma'lumotlarini o'zgartirish (Faqat O'quv yurti va Kurs) */}
      {showEditEducationModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{t.editEducationTitle}</h3>
                  <p className="text-[11px] text-slate-400">{t.editEducationSubtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowEditEducationModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEducation} className="space-y-4 mt-4">
              {/* Field 1: O'quv yurti (University) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t.studyPlaceLabel}</span>
                </label>
                <input
                  type="text"
                  value={inputUniversity}
                  onChange={(e) => setInputUniversity(e.target.value)}
                  placeholder={t.studyPlacePlaceholder}
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-2xl py-2.5 px-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                />

                {/* Quick preset buttons */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {universityPresets.slice(0, 4).map((uni) => (
                    <button
                      key={uni}
                      type="button"
                      onClick={() => setInputUniversity(uni)}
                      className="text-[10px] bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-800 rounded-lg px-2 py-1 transition-colors text-left truncate max-w-full cursor-pointer"
                    >
                      {uni.split('(')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 2: Kurs (Academic Course / Year) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.courseLabel}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {courseOptions.slice(0, 4).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setInputCourse(c)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        inputCourse === c
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400 shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowEditEducationModal(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-400/20 cursor-pointer"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Financial & Tax Literacy Dashboard */}
      <div className="grid grid-cols-2 gap-3">
        {/* Balance Card */}
        <div className="bg-slate-900 border border-slate-800/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>{state.businessMode === 'mchj' ? t.companyBalance : t.availableBalance}</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight tabular-nums">
            {state.balance.toLocaleString('uz-UZ')}
            <span className="text-xs font-medium text-slate-400 ml-1">{t.currency}</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5">
            <span className="text-slate-400">{t.totalIncome}:</span>
            <span className="font-semibold text-slate-300 tabular-nums">
              {state.totalIncome.toLocaleString('uz-UZ')}
            </span>
          </div>
        </div>

        {/* Tax Literacy Meter */}
        <div className="bg-slate-900 border border-slate-800/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>{t.taxLiteracy}</span>
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <div className="text-xl sm:text-2xl font-extrabold text-white tabular-nums">
              {state.taxLiteracy}%
            </div>
            <span className={`text-[11px] font-semibold truncate ${literacyInfo.color}`}>
              {literacyInfo.title}
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(5, state.taxLiteracy))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Trust Score & Government Services Status */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{t.stateRating}</span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                {state.reputation}/100
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {state.reputation >= 70
                ? t.stateRatingGood
                : state.reputation >= 40
                ? t.stateRatingAverage
                : t.stateRatingRisk}
            </p>
          </div>
        </div>
      </div>

      {/* Diverse YaTT Income Sources Showcase (Elevated cleanly without difficulty block) */}
      {state.businessMode === 'yatt' && (
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-4 shadow-lg space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>{t.incomeSources}</span>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                {t.turnoverTax}
              </span>
            </span>
            <span className="text-[11px] text-slate-400">{t.taxArticle467}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2.5">
              <span className="text-lg">💻</span>
              <div>
                <div className="font-bold text-white">{t.freelanceIT}</div>
                <div className="text-[10px] text-slate-400">{t.freelanceITDesc}</div>
              </div>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2.5">
              <span className="text-lg">🛍️</span>
              <div>
                <div className="font-bold text-white">{t.marketplace}</div>
                <div className="text-[10px] text-slate-400">{t.marketplaceDesc}</div>
              </div>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2.5">
              <span className="text-lg">🏢</span>
              <div>
                <div className="font-bold text-white">{t.rental}</div>
                <div className="text-[10px] text-slate-400">{t.rentalDesc}</div>
              </div>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2.5">
              <span className="text-lg">🎓</span>
              <div>
                <div className="font-bold text-white">{t.services}</div>
                <div className="text-[10px] text-slate-400">{t.servicesDesc}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Start Day Action Banner */}
      <div className="bg-gradient-to-r from-blue-900/80 via-blue-950 to-indigo-950 border border-blue-500/30 rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-2">
            <span>{state.day}-{t.day.toUpperCase()} {t.dayPlanTitle.toUpperCase()}</span>
            <span className="text-slate-300">{nextScenario.dayName}</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-1.5 leading-snug">
            {nextScenario.title}
          </h3>

          <p className="text-xs text-slate-300/90 leading-relaxed line-clamp-2 mb-4">
            {nextScenario.story}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-blue-800/40">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">{t.todayIncome}</div>
              <div className="text-base font-extrabold text-amber-400 tabular-nums">
                {nextScenario.grossAmount.toLocaleString('uz-UZ')} {t.currency}
              </div>
            </div>

            <button
              onClick={startDay}
              className="py-3 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{t.startCalculation}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Unlocked Perks Showcase */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{t.navEducation} & Bonuslar</span>
          </h4>
          <span className="text-xs text-slate-400">
            {state.unlockedPerkIds.length} / {INITIAL_PERKS.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {INITIAL_PERKS.map((perk) => {
            const isUnlocked = state.unlockedPerkIds.includes(perk.id);
            return (
              <div
                key={perk.id}
                className={`p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                  isUnlocked
                    ? 'bg-slate-900 border-amber-400/30 text-white shadow-sm'
                    : 'bg-slate-900/40 border-slate-800/50 text-slate-500 opacity-60'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  {isUnlocked ? <Sparkles className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-white truncate">{perk.title}</span>
                    {!isUnlocked && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        {perk.requiredRating}%
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {perk.benefitText}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-3 gap-2.5 pt-1">
        <button
          onClick={() => setActiveScreen('education')}
          className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 flex flex-col items-center justify-center text-center group transition-colors cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200">{t.navEducation}</span>
          <span className="text-[10px] text-slate-400">{t.legalBasis}</span>
        </button>

        <button
          onClick={() => setActiveScreen('ai')}
          className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 flex flex-col items-center justify-center text-center group transition-colors cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200">{t.navAdvisor}</span>
          <span className="text-[10px] text-slate-400">AI</span>
        </button>

        <button
          onClick={onOpenShare}
          className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 flex flex-col items-center justify-center text-center group transition-colors cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
            <Share2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200">{t.navStats}</span>
          <span className="text-[10px] text-slate-400">Share</span>
        </button>
      </div>
    </div>
  );
};
