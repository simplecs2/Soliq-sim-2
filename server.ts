import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API endpoint for AI Tax Advisor with High Thinking mode
app.post('/api/ai/tax-advisor', async (req, res) => {
  try {
    const { query, characterContext, playerStats } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Savol matni kiritilishi shart.' });
    }

    if (!apiKey) {
      return res.status(503).json({
        error: 'API kaliti ulanmagan. Soliq Sim lokal soliq ma\'lumotlar bazasidan foydalanmoqda.',
      });
    }

    const systemInstruction = `Siz "Soliq Sim" mobil simulyatorining virtual Aqlli Soliq Maslahatchisisiz.
Auditoriya: O'zbekistondagi talabalar, YaTT (Yakka tartibdagi tadbirkorlar) va MChJ (Yuridik shaxslar).
Til: O'zbek tili (lotin yozuvida).
Ohang: Do'stona, professional, tushunarli, aniq va O'zR Soliq kodeksiga (SK) qat'iy asoslangan.

Asosiy vazifangiz:
1. O'yinchining joriy rejimini (YaTT yoki MChJ), balansini va oxirgi hisob-kitob harakatlarini tahlil qiling.
2. Agar o'yinchi soliq hisoblashda xato qilgan bo'lsa:
   - Xatoning sababi va to'g'ri matematik hisob-kitobini qadamma-qadam ko'rsating.
   - O'zR Soliq kodeksining aniq moddasini keltiring.
   - Jarimalarning oldini olish va moliyaviy barqarorlik bo'yicha maslahat bering.
3. Asosiy soliq qoidalari:
   • MChJ (Yuridik shaxs):
     - QQS (Qo'shilgan qiymat solig'i) = 12% (SK 258-modda). Eksport qilingan tovarlar realizatsiyasiga 0% QQS stavkasi qo'llaniladi (SK 260-modda).
     - Foyda solig'i = 15% (SK 337-modda). Eksportdan olingan sof foydaga ham 15% stavka tatbiq etiladi.
     - Ijtimoiy soliq = 12% ish beruvchi tomonidan xodimlar mehnatiga haq to'lash fondidan to'lanadi (SK 405-modda).
     - Dividend solig'i = 5% to'lov manbaida ushlab qolinadi (SK 381-modda).
     - Xodimlar maoshidan JSHODS = 12% soliq agenti sifatida ushlab qolinadi (SK 381-modda).
   • YaTT (Yakka tartibdagi tadbirkor):
     - Aylanmadan olinadigan soliq = 4% (SK 467-modda).
     - Marketpleys (Uzum Market) savdosida soliq vositachi komissiyasini chegirib tashlamagan holda umumiy yalpi (brutto) aylanmadan hisoblanadi (SK 468-modda).
     - YaTT tomonidan noturar tijorat joyini ijaraga berishdan olingan daromadga 4% stavka qo'llaniladi.
     - Frilans va dizayn xizmatlaridan YaTT umumiy tushumning 4% miqdorida soliq to'laydi.
   • O'zini o'zi band qilgan shaxslar:
     - JSHODS dan to'liq ozod (0% soliq, PQ-4755 qarori va SK 369-modda).
4. Javobni chiroyli formatda, o'qilishi qulay va amaliy punktlar bilan bering.`;

    let contextText = characterContext || 'Talaba tadbirkor';
    if (playerStats) {
      contextText += `\nO'yinchi ismi: ${playerStats.playerName || 'O\'yinchi'}`;
      contextText += `\nRejim: ${playerStats.businessMode || 'YaTT'}`;
      contextText += `\nMavjud balans: ${playerStats.balance?.toLocaleString('uz-UZ') || '2 500 000'} so'm`;
      contextText += `\nSoliq savodxonligi reytingi: ${playerStats.taxLiteracy || 50}%`;
      if (playerStats.lastRecord) {
        const lr = playerStats.lastRecord;
        if (!lr.isCorrect) {
          contextText += `\nOXIRGI XATO QILGAN HARAKATI:
- Keys nomi: "${lr.scenarioTitle}"
- Operatsiya summasi: ${lr.grossAmount?.toLocaleString('uz-UZ')} so'm
- O'yinchi tanlagan noto'g'ri soliq: ${lr.userTaxAmount?.toLocaleString('uz-UZ')} so'm
- Haqiqiy to'g'ri soliq: ${lr.correctTaxAmount?.toLocaleString('uz-UZ')} so'm
- Ko'rilgan jarima zarari: ${lr.fineAmount?.toLocaleString('uz-UZ')} so'm
- Tegishli qonun moddasi: ${lr.lawArticle}`;
        } else {
          contextText += `\nOXIRGI NATIJA: To'g'ri hisoblangan ("${lr.scenarioTitle}", ${lr.correctTaxAmount?.toLocaleString('uz-UZ')} so'm).`;
        }
      }
    }

    const userPrompt = `Foydalanuvchi va o'yin holati:\n${contextText}\n\nFoydalanuvchi savoli: ${query}`;

    let response;
    try {
      // Use gemini-3.8-flash with ThinkingLevel.HIGH for fast and high-reasoning tax guidance
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
        },
      });
    } catch (modelError: any) {
      console.warn('Gemini request failed:', modelError?.message);
      throw modelError;
    }

    const answer = response.text || "Javob hosil qilib bo'lmadi.";
    return res.json({ answer });
  } catch (error: any) {
    console.error('Tax advisor API error:', error);
    return res.status(500).json({
      error: error?.message || 'Serverda xatolik yuz berdi.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Soliq Sim server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
