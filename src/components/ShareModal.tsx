import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  Sparkles,
  Award,
  TrendingUp,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { EMBLEM_IMAGE_PATH } from '../data/taxScenarios';
import { sound } from '../utils/audio';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const { state } = useGame();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const playerNameDisplay = state.playerFirstName && state.playerLastName
    ? `${state.playerFirstName} ${state.playerLastName}`
    : state.character.name;

  const shareText = `🇺🇿 Soliq Sim — O'zbekiston Yoshlari Soliq Simulyatori!

🎮 Mening natijam:
👤 O'yinchi: ${playerNameDisplay}
💼 Qahramon: ${state.character.name} (${state.character.title})
📊 Soliq madaniyati: ${state.taxLiteracy}%
💰 To'plangan balans: ${state.balance.toLocaleString('uz-UZ')} so'm
🔥 To'g'ri to'lovlar seriyasi: ${state.streak} kun
🏛️ Davlat soliq reytingi: ${state.reputation}/100 ball

O'zbekistonda frilans, o'zini o'zi band qilish va talabalar uchun 12% kontrakt soliq chegirmasini o'rganing! #SoliqSim #YoshlarSoliqSavodi`;

  const handleCopy = () => {
    sound.playTap();
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToTelegram = () => {
    sound.playTap();
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      window.location.href
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => {
            sound.playTap();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 border border-amber-400/30 flex items-center justify-center mx-auto mb-2 overflow-hidden shadow-md">
            <img
              src={EMBLEM_IMAGE_PATH}
              alt="Soliq Sim"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Natijani Ulashish</h3>
          <p className="text-xs text-slate-400">Do'stlaringiz bilan soliq savodxonligini sinash</p>
        </div>

        {/* Share Snapshot Card */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-amber-400/30 rounded-2xl p-4 mb-5 shadow-inner space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={state.character.avatar}
              alt={state.character.name}
              className="w-12 h-12 rounded-xl object-cover border border-amber-400/40"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {state.playerFirstName && state.playerLastName
                  ? `${state.playerFirstName} ${state.playerLastName}`
                  : state.character.name}
              </div>
              <div className="text-[10px] text-amber-400 font-medium truncate">{state.character.title}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
            <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/80">
              <div className="text-[10px] text-slate-400">Soliq madaniyati</div>
              <div className="font-extrabold text-white text-base tabular-nums">
                {state.taxLiteracy}%
              </div>
            </div>

            <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/80">
              <div className="text-[10px] text-slate-400">Ishonch indeksi</div>
              <div className="font-extrabold text-amber-400 text-base tabular-nums">
                {state.reputation}/100
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={shareToTelegram}
            className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-sky-600/20"
          >
            <Send className="w-4 h-4" />
            <span>Telegram orqali ulashish</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Matn nusxalandi!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Natija matnini nusxalash</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
