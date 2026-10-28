import React from 'react';
import { Home, Calculator, BookOpen, BarChart3, Bot } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { GameState } from '../types/game';

export const BottomNav: React.FC = () => {
  const { state, setActiveScreen, startDay } = useGame();
  const { t } = useLanguage();

  const navItems: {
    id: GameState['activeScreen'];
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'quiz', label: t.calculateTitle.split(' ')[0], icon: Calculator },
    { id: 'education', label: t.navEducation, icon: BookOpen },
    { id: 'stats', label: t.navStats, icon: BarChart3 },
    { id: 'ai', label: t.navAdvisor, icon: Bot },
  ];

  const handleTabClick = (id: GameState['activeScreen']) => {
    if (id === 'quiz') {
      if (state.activeScreen !== 'quiz' && !state.currentScenario) {
        startDay();
        return;
      }
    }
    setActiveScreen(id);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1 shadow-2xl">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-15">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = state.activeScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className="flex flex-col items-center justify-center min-h-[48px] py-1 transition-all group focus-visible:outline-none cursor-pointer"
            >
              <div
                className={`w-9 h-7 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 truncate max-w-full ${
                  isActive ? 'font-bold text-amber-400' : 'font-medium text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
