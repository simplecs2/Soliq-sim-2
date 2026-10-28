import React, { useState } from 'react';
import { User, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { EMBLEM_IMAGE_PATH } from '../data/taxScenarios';
import { sound } from '../utils/audio';

export const WelcomeScreen: React.FC = () => {
  const { setPlayerProfile } = useGame();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const isFormValid = firstName.trim().length > 0 && lastName.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    sound.playLevelUp();
    setPlayerProfile(firstName, lastName);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Emblem & Title */}
        <div className="text-center space-y-3">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-950 border-2 border-amber-400/40 flex items-center justify-center mx-auto overflow-hidden shadow-2xl shadow-blue-950/60 p-0.5 animate-in zoom-in-95 duration-300">
            <img
              src={EMBLEM_IMAGE_PATH}
              alt="Soliq Sim"
              className="w-full h-full object-cover rounded-[22px]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>O'zbekiston Yoshlari Simulyatori</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Soliq Sim'ga xush kelibsiz!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
              O'yinda ishtirok etish va shaxsiy soliq reytingingizni boshlash uchun o'z ma'lumotlaringizni kiriting.
            </p>
          </div>
        </div>

        {/* Input Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name Input */}
            <div>
              <label
                htmlFor="player-firstname"
                className="block text-xs font-bold text-slate-300 mb-1.5"
              >
                Ismingizni kiriting
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="player-firstname"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Masalan: Abdulloh"
                  autoComplete="given-name"
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Last Name Input */}
            <div>
              <label
                htmlFor="player-lastname"
                className="block text-xs font-bold text-slate-300 mb-1.5"
              >
                Familiyangizni kiriting
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="player-lastname"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Masalan: Turg'unov"
                  autoComplete="family-name"
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full min-h-[50px] py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg focus-visible:outline-none ${
                  isFormValid
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.98] text-slate-950 shadow-amber-400/20 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed opacity-60'
                }`}
              >
                <span>Boshlash</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick trust notes */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Ma'lumotlar faqat qurilmangizda saqlanadi (100% oflayn)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
