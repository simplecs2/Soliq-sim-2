/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { CalculationScreen } from './components/CalculationScreen';
import { ResultScreen } from './components/ResultScreen';
import { StatisticsScreen } from './components/StatisticsScreen';
import { EducationScreen } from './components/EducationScreen';
import { AiAdvisorScreen } from './components/AiAdvisorScreen';
import { ShareModal } from './components/ShareModal';
import { BottomNav } from './components/BottomNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GameModeSelectionScreen } from './components/GameModeSelectionScreen';
import { WifiOff, Wifi } from 'lucide-react';

const MainContent: React.FC = () => {
  const { state, isProfileCompleted, isModeSelected } = useGame();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowOfflineBanner(true);
      setTimeout(() => setShowOfflineBanner(false), 3000);
    };
    const handleOffline = () => {
      setIsOffline(true);
      setShowOfflineBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register service worker if available
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('SW registration skipped:', err);
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const renderActiveScreen = () => {
    switch (state.activeScreen) {
      case 'quiz':
        return <CalculationScreen />;
      case 'result':
        return <ResultScreen onOpenShare={() => setIsShareOpen(true)} />;
      case 'stats':
        return <StatisticsScreen />;
      case 'education':
        return <EducationScreen />;
      case 'ai':
        return <AiAdvisorScreen />;
      case 'home':
      default:
        return <HomeScreen onOpenShare={() => setIsShareOpen(true)} />;
    }
  };

  if (!isProfileCompleted) {
    return <WelcomeScreen />;
  }

  if (!isModeSelected) {
    return <GameModeSelectionScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Offline Status Toast */}
      {showOfflineBanner && (
        <div
          className={`fixed top-14 left-1/2 -translate-x-1/2 z-50 py-1.5 px-3.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-xl transition-all duration-300 ${
            isOffline
              ? 'bg-amber-500 text-slate-950'
              : 'bg-emerald-500 text-white'
          }`}
        >
          {isOffline ? (
            <>
              <WifiOff className="w-3.5 h-3.5" />
              <span>Oflayn rejim — o'yin ma'lumotlari qurilmada saqlanadi</span>
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5" />
              <span>Internet aloqasi tiklandi</span>
            </>
          )}
        </div>
      )}

      {/* Top Header */}
      <Header />

      {/* Main View Container (responsive mobile frame, max-w-lg) */}
      <main className="flex-1 max-w-lg w-full mx-auto px-4 pt-4">
        {renderActiveScreen()}
      </main>

      {/* Bottom Thumb Navigation */}
      <BottomNav />

      {/* Share Modal */}
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </div>
  );
};

import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <GameProvider>
        <MainContent />
      </GameProvider>
    </LanguageProvider>
  );
}

