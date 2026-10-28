import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Scale,
  BrainCircuit,
  Copy,
  Check,
  RefreshCw,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  User,
  HelpCircle,
  Calculator,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/audio';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isErrorAnalysis?: boolean;
}

export const AiAdvisorScreen: React.FC = () => {
  const { state } = useGame();
  const { language, t } = useLanguage();
  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const playerName = `${state.playerFirstName} ${state.playerLastName}`.trim() || "O'yinchi";
  const lastRecord = state.lastRecord || (state.history.length > 0 ? state.history[0] : null);

  // Build personalized welcome message based on player's current balance and last actions
  const getInitialMessage = (): ChatMessage => {
    const timeNow = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    const isMChJ = state.businessMode === 'mchj';

    if (lastRecord && !lastRecord.isCorrect) {
      return {
        id: 'msg_init',
        sender: 'ai',
        isErrorAnalysis: true,
        timestamp: timeNow,
        text: `Salom, ${playerName}! Men sizning shaxsiy Soliq Maslahatchingizman.

⚠️ Oxirgi hisob-kitobingizni tahlil qildim:
Siz «${lastRecord.scenarioTitle}» keysida ${lastRecord.grossAmount?.toLocaleString('uz-UZ')} so'm aylanmadan ${lastRecord.userTaxAmount?.toLocaleString('uz-UZ')} so'm soliq ko'rsatib xatoga yo'l qo'ydingiz.

📘 Qonuniy asos: ${lastRecord.lawArticle || 'O\'zR Soliq kodeksi'}.
To'g'ri hisoblangan soliq miqdori: ${lastRecord.correctTaxAmount?.toLocaleString('uz-UZ')} so'm bo'lishi kerak edi.

Ushbu xatolik tufayli siz ${lastRecord.fineAmount?.toLocaleString('uz-UZ')} so'm jarimaga tushdingiz va reytingingiz pasaydi. Hozirgi balansingiz: ${state.balance.toLocaleString('uz-UZ')} so'm. Har qanday savolingiz bo'lsa, bemalol yozing!`,
      };
    }

    if (lastRecord && lastRecord.isCorrect) {
      return {
        id: 'msg_init',
        sender: 'ai',
        isErrorAnalysis: false,
        timestamp: timeNow,
        text: `Salom, ${playerName}! Ajoyib natija!
Siz «${lastRecord.scenarioTitle}» keysi bo'yicha ${lastRecord.correctTaxAmount?.toLocaleString('uz-UZ')} so'm soliqni aniq hisobladingiz va moliyaviy reytingingizni oshirdingiz.

Joriy holatingiz:
• Balans: ${state.balance.toLocaleString('uz-UZ')} so'm
• Soliq savodxonligi: ${state.taxLiteracy}%
• Ketma-ket to'g'ri javoblar: ${state.streak} kun

${isMChJ ? 'QQS hisobi, eksport imtiyozlari (0%), foyda solig\'i (15%) yoki xodimlar maoshi soliqlaridan' : 'Uzum Market savdosi, xizmat ko\'rsatish (dizayn), ofis ijarasi yoki frilans daromadidan'} qanday savolingiz bor?`,
      };
    }

    if (isMChJ) {
      return {
        id: 'msg_init',
        sender: 'ai',
        isErrorAnalysis: false,
        timestamp: timeNow,
        text: `Assalomu alaykum, ${playerName}!
Men «Soliq Sim» kompaniyangiz (${state.companyName || 'MChJ'}) virtual Soliq Maslahatchisiman.

MChJ uchun O'zbekiston Respublikasi Soliq kodeksining asosiy soliqlari:
• QQS — 12% (SK 258-modda; eksport tovarlariga 0% SK 260-modda)
• Foyda solig'i — 15% (SK 337-modda)
• Xodimlar mehnat fondidan Ijtimoiy soliq — 12% (SK 405-modda)
• Ta'sischilar dividend solig'i — 5% (SK 381-modda)

Kompaniya balansi: ${state.balance.toLocaleString('uz-UZ')} so'm.
Soliq hisobotlari va to'g'ri hisob-kitoblar bo'yicha savollaringizni bering!`,
      };
    }

    return {
      id: 'msg_init',
      sender: 'ai',
      isErrorAnalysis: false,
      timestamp: timeNow,
      text: `Assalomu alaykum, ${playerName}!
Men «Soliq Sim» virtual Soliq Maslahatchisiman.

Siz YaTT (Yakka tartibdagi tadbirkor) sifatida faoliyat yuritasiz. Barcha savdo, frilans va xizmat tushumlaringizdan O'zR Soliq kodeksi 467-moddasiga asosan 4% aylanma solig'i to'lanadi.

Mavjud balansingiz: ${state.balance.toLocaleString('uz-UZ')} so'm.
Soliq hisoblash, jarimalardan saqlanish yoki yangi keyslar bo'yicha istalgan savolingizni bering!`,
    };
  };

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialMessage()]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const q = (queryText || inputQuestion).trim();
    if (!q || loading) return;

    sound.playTap();
    setInputQuestion('');

    const timeNow = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: timeNow,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const characterContext = `${playerName}, Veb-dasturchi & YaTT. O'quv yurti: ${state.studyPlace || 'TATU'} (${state.studyCourse || '3-kurs'}). Balans: ${state.balance.toLocaleString('uz-UZ')} so'm, Soliq savodxonligi: ${state.taxLiteracy}%.`;

    const playerStats = {
      playerName,
      businessMode: state.businessMode || 'yatt',
      balance: state.balance,
      taxLiteracy: state.taxLiteracy,
      streak: state.streak,
      lastRecord: lastRecord
        ? {
            scenarioTitle: lastRecord.scenarioTitle,
            grossAmount: lastRecord.grossAmount,
            userTaxAmount: lastRecord.userTaxAmount,
            correctTaxAmount: lastRecord.correctTaxAmount,
            isCorrect: lastRecord.isCorrect,
            fineAmount: lastRecord.fineAmount,
            lawArticle: lastRecord.lawArticle,
          }
        : undefined,
    };

    try {
      const res = await fetch('/api/ai/tax-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, characterContext, playerStats }),
      });

      if (!res.ok) {
        throw new Error('Server javob bermadi');
      }

      const data = await res.json();
      const aiResponse = data.answer || "Javob hosil qilib bo'lmadi.";

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      sound.playSuccess();
    } catch (err: any) {
      console.warn('AI advisor fallback:', err);
      // Smart offline fallback analyzing player's exact recent case
      const localAnswer = generateLocalAdvice(q, playerName, lastRecord, state.balance, state.businessMode || 'yatt');
      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: localAnswer,
        timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      sound.playSuccess();
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    sound.playTap();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const samplePrompts = state.businessMode === 'mchj'
    ? [
        lastRecord && !lastRecord.isCorrect
          ? t.askMistakeChip
          : t.askMchjQQSChip,
        t.askMchjProfitChip,
        t.askMchjSocialChip,
        t.askMchjDivChip,
      ]
    : [
        lastRecord && !lastRecord.isCorrect
          ? t.askMistakeChip
          : t.askUzumChip,
        t.askRentalChip,
        t.askFreelanceChip,
        language === 'ru' ? '🛡️ Как избежать налоговых проверок и штрафов?' : language === 'en' ? '🛡️ How to avoid tax audits and penalties?' : '🛡️ Qanday qilib soliq tekshiruvi va jarimalardan saqlanish mumkin?',
      ];

  return (
    <div className="space-y-4 pb-24">
      {/* Advisor Header & Live Context Pill */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/20 to-blue-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-base font-extrabold text-white tracking-tight">{t.aiAdvisorTitle}</h2>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 flex items-center gap-1">
                  <BrainCircuit className="w-3 h-3" />
                  <span>{t.aiThinkingBadge}</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {t.aiAdvisorSub} {playerName}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-[10px] text-slate-400 uppercase font-medium">
              {state.businessMode === 'mchj' ? t.companyBalance : t.availableBalance}
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono tabular-nums">
              {state.balance.toLocaleString('uz-UZ')} {t.currency}
            </div>
          </div>
        </div>

        {/* Recent Error Warning Banner if last answer was wrong */}
        {lastRecord && !lastRecord.isCorrect && (
          <div className="mt-3 p-3 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white flex items-center justify-between">
                <span>Oxirgi keysda xatolik aniqlandi!</span>
                <span className="text-rose-400 font-mono">-{lastRecord.fineAmount.toLocaleString('uz-UZ')} so'm jarima</span>
              </div>
              <p className="text-[11px] text-rose-300/90 mt-0.5 leading-relaxed">
                «{lastRecord.scenarioTitle}»: Siz {lastRecord.userTaxAmount.toLocaleString('uz-UZ')} so'm tanladingiz, to'g'ri soliq {lastRecord.correctTaxAmount.toLocaleString('uz-UZ')} so'm bo'lishi kerak edi.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Chat Messages Thread */}
      <div className="space-y-3 min-h-[300px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
          >
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
              {msg.sender === 'ai' ? (
                <>
                  <Bot className="w-3 h-3 text-amber-400" />
                  <span className="font-semibold text-slate-300">Soliq Maslahatchisi</span>
                </>
              ) : (
                <>
                  <User className="w-3 h-3 text-blue-400" />
                  <span className="font-semibold text-slate-300">{playerName}</span>
                </>
              )}
              <span>·</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-[92%] sm:max-w-[85%] rounded-3xl p-4 shadow-lg text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-sm'
                  : msg.isErrorAnalysis
                  ? 'bg-slate-900 border border-amber-400/40 text-slate-100 rounded-tl-sm shadow-amber-950/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {msg.sender === 'ai' && (
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <Scale className="w-3 h-3 text-amber-400" />
                    <span>O'zR Soliq kodeksi (467-modda)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer py-0.5 px-1.5 rounded bg-slate-800/60"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Nusxalandi</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Nusxa olish</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex flex-col items-start animate-in fade-in duration-150">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
              <Bot className="w-3 h-3 text-amber-400" />
              <span>Soliq Maslahatchisi tahlil qilmoqda...</span>
            </div>
            <div className="bg-slate-900 border border-amber-400/30 rounded-3xl rounded-tl-sm p-4 text-xs text-slate-300 flex items-center gap-3">
              <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Soliq kodeksi moddalari va amaliy hisob-kitoblar solishtirilmoqda...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Quick Question Prompts */}
      <div className="space-y-1.5 pt-1">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
          Tavsiya etilgan savollar:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(p)}
              className="text-left text-[11px] py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>{p}</span>
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Box Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-2.5 shadow-xl sticky bottom-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder={t.aiInputPlaceholder}
            disabled={loading}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl py-3 px-4 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !inputQuestion.trim()}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
              !loading && inputQuestion.trim()
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/20 active:scale-95 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};

// High-quality local offline fallback for seamless offline play
function generateLocalAdvice(
  q: string,
  playerName: string,
  lastRecord: any,
  balance: number,
  mode: 'yatt' | 'mchj' = 'yatt'
): string {
  const lower = q.toLowerCase();

  // If user asks about their recent mistake or recent error
  if (lower.includes('xato') || lower.includes('oxirgi') || lower.includes('jarima')) {
    if (lastRecord && !lastRecord.isCorrect) {
      if (mode === 'mchj') {
        const article = lastRecord.lawArticle || "O'zR Soliq kodeksi";
        return `Ҳurmatli ${playerName}, oxirgi MChJ xatoyingiz bo'yicha tahlil:

1. Noto'g'ri hisob:
Siz «${lastRecord.scenarioTitle}» keysida ${lastRecord.grossAmount?.toLocaleString('uz-UZ')} so'm bazadan ${lastRecord.userTaxAmount?.toLocaleString('uz-UZ')} so'm to'lovni ko'rsatdingiz.

2. Qonuniy asos va to'g'ri formula:
${article} qoidalariga asosan:
To'g'ri soliq miqdori: ${lastRecord.correctTaxAmount?.toLocaleString('uz-UZ')} so'm bo'lishi kerak edi.
${lastRecord.explanation ? `\nIzoh: ${lastRecord.explanation}` : ''}

3. Moliyaviy oqibat:
Xato hisob-kitob tufayli korxona hisobidan ${lastRecord.fineAmount?.toLocaleString('uz-UZ')} so'm jarima ushlab qolindi va reyting pasaytirildi.`;
      }

      return `Ҳurmatli ${playerName}, oxirgi xatoyingiz bo'yicha tahlil:

1. Noto'g'ri hisob:
Siz «${lastRecord.scenarioTitle}» keysida ${lastRecord.grossAmount?.toLocaleString('uz-UZ')} so'm aylanmadan ${lastRecord.userTaxAmount?.toLocaleString('uz-UZ')} so'm to'lovni tanladingiz.

2. Qonuniy asos va to'g'ri formula:
O'zR Soliq kodeksining 467-moddasiga ko'ra, YaTT aylanma solig'i stavkasi 4% ni tashkil etadi.
To'g'ri formula:
${lastRecord.grossAmount?.toLocaleString('uz-UZ')} × 0.04 = ${lastRecord.correctTaxAmount?.toLocaleString('uz-UZ')} so'm.

3. Natija:
Xato javobingiz uchun davlat byudjetiga ${lastRecord.fineAmount?.toLocaleString('uz-UZ')} so'm jarima to'ladingiz va soliq reytingingiz pasaydi.
Keyingi kunlarda aylanmani 0.04 ga ko'paytiring!`;
    } else {
      return `Hurmatli ${playerName}, siz oxirgi topshiriqni to'g'ri bajargansiz!
Hozirgi moliyaviy balansingiz: ${balance.toLocaleString('uz-UZ')} so'm.
${mode === 'mchj' ? "MChJ yuridik shaxsi sifatida soliq intizomiga qat'iy rioya qiling." : "YaTT har qanday xizmat va savdo aylanmasidan 4% to'laydi."}`;
    }
  }

  // MChJ: Export & QQS
  if (lower.includes('eksport') || (mode === 'mchj' && lower.includes('qqs'))) {
    return `🏢 MChJ UCHUN QQS (12%) VA EKSPORT (0% STAVKA)

Qonuniy asos: O'zR Soliq kodeksining 258 va 260-moddalari.

1. Ichki bozordagi tovar va xizmatlar aylanmasiga nisbatan QQS stavkasi 12% ni tashkil etadi.
Formula: QQS = Soliq solinadigan aylanma × 0.12.

2. Tovarlar va muayyan xizmatlar eksport qilinganda (Soliq kodeksi, 260-modda):
Nol darajali (0%) stavka qo'llaniladi. To'lanadigan QQS summasi: 0 so'm.
Muhim: 0% stavka qo'llanilganda ham eksportchi avval xaridlarida to'lagan QQS summasini hisobga olish (qaytarib olish) huquqiga ega bo'ladi.`;
  }

  // MChJ: Profit Tax (Foyda solig'i)
  if (lower.includes('foyda') || (mode === 'mchj' && lower.includes('daromad'))) {
    return `📈 MChJ FOYDA SOLIG'I (15% BAZAVIY STAVKA)

Qonuniy asos: O'zR Soliq kodeksining 337-moddasi.

1. Soliq bazasi: Jami daromadlardan hujjat bilan tasdiqlangan va chegiriladigan xarajatlar ayirib tashlanganidan keyingi sof foyda.
Formula: Foyda solig'i = (Jami daromad - Chegiriladigan xarajatlar) × 0.15.

2. Muhim: Aylanmadan emas, faqat sof soliq solinadigan foydadan 15% hisoblanadi. Agar korxona zarar bilan chiqqan bo'lsa, foyda solig'i hisoblanmaydi (0 so'm).`;
  }

  // MChJ: Social Tax (Ijtimoiy soliq)
  if (lower.includes('ijtimoiy') || lower.includes('xodim') || lower.includes('maosh') || lower.includes('fot')) {
    return `👥 MChJ IJTIMOIY SOLIG'I (12%)

Qonuniy asos: O'zR Soliq kodeksining 405-moddasi.

1. Soliq stavkasi: 12% (bazaviy stavka).
2. Manbasi: Ish beruvchi tomonidan hisoblangan mehnatga haq to'lash fondi (FOT).
3. Eslatma: Ushbu soliq xodimning ish haqidan ushlanmaydi, balki korxonaning o'z mablag'lari hisobidan to'lanadi.`;
  }

  // MChJ: Dividends (Dividend solig'i)
  if (lower.includes('dividend') || lower.includes('ta\'sischi') || lower.includes('ulush')) {
    return `💰 MChJ DIVIDENDLARIGA SOLIQ (5%)

Qonuniy asos: O'zR Soliq kodeksining 381-moddasi.

1. Soliq stavkasi: 5% (O'zbekiston rezidenti bo'lgan jismoniy va yuridik shaxslar uchun).
2. Tartibi: Barcha korxona soliqlari to'langach, ta'sischilar o'rtasida taqsimlangan sof foydadan to'lov manbaida 5% ushlab qolinadi va byudjetga o'tkaziladi.
Formula: Dividend solig'i = Taqsimlangan dividend summasi × 0.05.`;
  }

  // Marketplace (Uzum Market) gross turnover question (YaTT)
  if (lower.includes('uzum') || lower.includes('market') || lower.includes('komissiya') || lower.includes('savdo')) {
    return `🛍️ UZUM MARKET VA ELEKTRON SAVDODA YaTT AYLANMA SOLIG'I

Qonuniy asos: O'zR Soliq kodeksi, 467 va 468-moddalar.

1. Soliq stavkasi: 4% (aylanmadan olinadigan soliq).
2. Asosiy qoida: Soliq bazasi vositachi (marketpleys) komissiyasini ayirmasdan, to'liq yalpi (brutto) aylanmadan hisoblanadi!
Misol: Agar xaridorlar Uzum Market orqali 20 000 000 so'mlik mahsulot sotib olgan bo'lsa, marketpleys 3 mln komissiya ushlab qolgan taqdirda ham, soliq 20 000 000 × 4% = 800 000 so'm bo'ladi.
3. Kassa va fiskal cheklar: Marketpleys cheklari avtomatik fiskallashtiriladi va Soliq.uz bazasida ko'rinadi.`;
  }

  // Property rental question (YaTT)
  if (lower.includes('ijara') || lower.includes('bino') || lower.includes('ofis') || lower.includes('ombor')) {
    return `🏢 YaTT TOMONIDAN NOTURAR JOYNI IJARAGA BERISH SOLIG'I

Qonuniy asos: O'zR Soliq kodeksi, 467-modda.

1. Soliq stavkasi: 4% aylanma solig'i.
2. Kimlar uchun: YaTT o'ziga qarashli noturar ko'chmas mulkni (ofis, savdo rastasi, omborxona) boshqa korxona yoki tadbirkorga ijaraga berganda 4% soliq to'laydi.
Misol: 10 000 000 so'm ijara haqi kelib tushsa:
10 000 000 × 0.04 = 400 000 so'm aylanma solig'i to'lanadi.
3. Jismoniy shaxs bilan farqi: Oddiy jismoniy shaxs mulk ijarasidan 12% JSHODS to'laydi, YaTT aylanma tizimida esa stavka 4% dir.`;
  }

  // Freelance and Design services (YaTT)
  if (lower.includes('dizayn') || lower.includes('frilans') || lower.includes('it') || lower.includes('sayt')) {
    return `💻 YaTT FRILANS VA DIZAYN XIZMATLARI SOLIG'I

Qonuniy asos: O'zR Soliq kodeksi, 467-modda.

1. Soliq stavkasi: 4% aylanmadan olinadigan soliq.
2. Hisoblash tartibi: Shartnoma bo'yicha hisobingizga kelib tushgan to'liq gonorar summasidan 4% hisoblanadi.
Misol: Startap sizga UI/UX dizayn uchun 15 000 000 so'm to'ladi:
15 000 000 × 0.04 = 600 000 so'm soliq to'lanadi.
3. Tavsiya: Barcha hisob-kitoblar bank hisobvarag'i va elektron hisob-faktura (shartnoma) orqali rasmiylashtirilishi shart.`;
  }

  // Mode-based default general guidance
  if (mode === 'mchj') {
    return `🏢 MChJ (YURIDIK SHAXS) UMUMIY SOLIQ TIZIMI ASOSLARI:

1. QQS (Qo'shilgan qiymat solig'i) — 12% (Soliq kodeksi, 258-modda). Eksport operatsiyalarida 0% stavka qo'llaniladi (260-modda).
2. Foyda solig'i — sof soliq solinadigan foydadan 15% (337-modda).
3. Ijtimoiy soliq — xodimlar ish haqi fondidan 12% korxona mablag'lari hisobidan (405-modda).
4. Dividend solig'i — ta'sischilarga to'lanadigan sof foyda ulushidan 5% (381-modda).

Hurmatli ${playerName}, MChJ buxgalteriyasi yoki aniq keyslar bo'yicha savolingizni berishingiz mumkin!`;
  }

  return `🏛️ YaTT (YAKKA TARTIBDAGI TADBIRKOR) ASOSIY QOIDALARI:

1. Aylanmadan olinadigan soliqning yagona bazaviy stavkasi — 4% (Soliq kodeksi, 467-modda).
Formula: Soliq = Aylanma summasi × 0.04.
2. Marketpleyslarda savdo qilganda soliq komissiyadan oldingi to'liq yalpi (brutto) aylanmadan hisoblanadi.
3. Tijorat binosi va ofislarni ijaraga berishda ham YaTT 4% stavkada aylanma solig'i to'laydi.
4. Soliq hisobotlari har oy yakunidan so'ng keyingi oyning 15-sanasiga qadar my.soliq.uz orqali topshiriladi.

Hurmatli ${playerName}, istalgan summa yoki holatni yozsangiz, darhol hisoblab beraman!`;
}
