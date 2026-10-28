import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Briefcase,
  Percent,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldAlert,
  Smartphone,
  Coins,
} from 'lucide-react';
import { sound } from '../utils/audio';

export const EducationScreen: React.FC = () => {
  const [openSectionId, setOpenSectionId] = useState<string>('sec_self_employed');

  const toggleSection = (id: string) => {
    sound.playTap();
    setOpenSectionId(openSectionId === id ? '' : id);
  };

  const sections = [
    {
      id: 'sec_self_employed',
      title: '1. O\'zini o\'zi band qilish (Frilanserlar uchun 0% soliq)',
      icon: Briefcase,
      badge: '0% JSHODS',
      summary: 'Dasturchi, dizayner, repetitor, SMM va boshqa yosh mutaxassislar uchun O\'zbekistondagi eng qulay soliq rejimi.',
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            O'zbekiston Respublikasi Prezidentining PQ-4755-son qaroriga binoan, 100 dan ortiq faoliyat turlari bo'yicha mustaqil ishlovchi fuqarolar <strong>o'zini o'zi band qilgan shaxs</strong> sifatida ro'yxatdan o'tishlari mumkin.
          </p>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5 text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Asosiy soliq afzalliklari:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li><strong>Daromad solig'i (JSHODS): 0%</strong> — xizmatlardan olingan daromadga soliq to'lanmaydi!</li>
              <li><strong>Hisobot yo'q:</strong> Buxgalteriya hisoboti yoki deklaratsiya topshirish talab etilmaydi.</li>
              <li><strong>Ijtimoiy soliq:</strong> Pensiya staji yozilishi uchun yiliga atigi 1 BHM (ixtiyoriy) to'lanadi.</li>
              <li><strong>Chet eldan tushum:</strong> Upwork, Fiverr kabi birjalardan tushgan chet el valyutasi erkin qabul qilinadi.</li>
            </ul>
          </div>
          <p className="text-[11px] text-slate-400">
            <strong>Qanday ro'yxatdan o'tiladi?</strong> "Soliq" mobil ilovasida Face-ID orqali 2 daqiqada bepul ro'yxatdan o'tish va darhol elektron guvohnoma olish mumkin.
          </p>
        </div>
      ),
    },
    {
      id: 'sec_tuition_deduction',
      title: '2. Talabalar uchun 12% kontrakt soliq chegirmasi',
      icon: GraduationCap,
      badge: '12% QAYTARILADI',
      summary: 'Universitet kontraktiga to\'langan pulning 12 foizini davlatdan rasmiy qaytarib olish qonuniy yo\'li.',
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            O'zbekiston Respublikasi Soliq kodeksining <strong>378-moddasi 16-bandiga</strong> muvofiq, O'zbekiston oliy ta'lim muassasalarida ta'lim olish uchun to'langan kontrakt mablag'lariga daromad solig'i solinmaydi.
          </p>
          <div className="bg-amber-400/10 p-3 rounded-2xl border border-amber-400/30 text-amber-200 space-y-1">
            <div className="font-bold text-amber-300">Hisob-kitob misoli:</div>
            <p>
              Agar siz yillik <strong>10,000,000 so'm</strong> kontrakt to'lagan bo'lsangiz:
            </p>
            <p className="font-mono font-bold text-white">
              10,000,000 * 12% = 1,200,000 so'm
            </p>
            <p className="text-[11px] text-amber-300/80">
              Davlat soliq xizmati 1,200,000 so'm mablag'ni sizning shaxsiy plastik kartangizga qaytarib beradi!
            </p>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li>Talaba o'z daromadidan yoki ota-onasi oyligidan to'lagan holatlarda amal qiladi.</li>
            <li>Ariza topshirish: my.soliq.uz portali orqali elektron ariza yuboriladi.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'sec_pit_rate',
      title: '3. JSHODS 12% — Standart daromad solig\'i stavkasi',
      icon: Percent,
      badge: '12% STAVKA',
      summary: 'Fuqarolik-huquqiy shartnomalar (GPH), rasmiy oylik va korxonalardan olinadigan daromadlar solig\'i.',
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            O'zbekistonda jismoniy shaxslarning ish haqi, mukofot pullari va fuqarolik-huquqiy shartnomalar bo'yicha daromadlariga <strong>12 foiz</strong> yagona qat'iy stavka qo'llaniladi (Soliq kodeksi, 381-modda).
          </p>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-1">
            <div className="font-bold text-white">IT Park imtiyozi:</div>
            <p className="text-slate-300">
              IT Park rezidenti bo'lgan korxonalarda ishlovchi dasturchi va xodimlar uchun JSHODS stavkasi <strong>7.5%</strong> qilib belgilangan!
            </p>
          </div>
          <p className="text-[11px] text-slate-400">
            Shartnoma tuzganda soliqni to'lovchi tashkilot (soliq agenti) o'zi ushlab qolib davlat byudjetiga yo'naltiradi.
          </p>
        </div>
      ),
    },
    {
      id: 'sec_yatt_business',
      title: '4. YaTT (Yakka tartibdagi tadbirkor) va 4% aylanma solig\'i',
      icon: Coins,
      badge: '4% AYLANMA',
      summary: 'Marketpleyslarda (Uzum Market) savdo qilish va tovar aylanmasi uchun soliq tizimi.',
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            Agar siz tovarlarni qayta sotish, marketpleyslarda do'kon yuritish yoki xodimlarni yollagan holda faoliyat yuritmoqchi bo'lsangiz, <strong>YaTT (Yakka tartibdagi tadbirkor)</strong> sifatida ro'yxatdan o'tasiz.
          </p>
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-1">
            <div className="font-bold text-white">Soliq stavkasi (Soliq kodeksi, 467-modda):</div>
            <p className="text-slate-300">
              Chakana savdo va tovar aylanmasidan <strong>4% aylanmadan olinadigan soliq</strong> to'lanadi.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'sec_fiscal_cashback',
      title: '5. Soliq.uz ilovasida 1% fiskal keshbek',
      icon: Smartphone,
      badge: '1% KESHBEK',
      summary: 'Har bir xarid uchun QR-kodli chek talab qilib qonuniy keshbek yig\'ish.',
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            O'zbekistonda iste'molchilar savdo va xizmat ko'rsatish shoxobchalarida xarid chekini skanerlab, to'langan summaning <strong>1 foizini keshbek</strong> sifatida qaytarib olishlari mumkin.
          </p>
          <p className="text-emerald-400 font-medium">
            Eng muhimi: Ushbu qaytarilgan 1% keshbek mablag'lari daromad solig'iga tortilmaydi!
          </p>
        </div>
      ),
    },
    {
      id: 'sec_penalties',
      title: '6. Soliq buzilishlari va jarimalar',
      icon: ShieldAlert,
      badge: 'OGOH BO\'LING',
      summary: 'Soliq to\'lashdan bo\'yin tovlash, ro\'yxatdan o\'tmaslik va bank hisobining bloklanishi oqibatlari.',
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-2xl space-y-1 text-rose-200">
            <div className="font-bold text-rose-400">Soliq kodeksining 220-227 moddalari:</div>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Noqonuniy ro'yxatdan o'tmasdan tadbirkorlik qilish jarimaga sabab bo'ladi.</li>
              <li>Soliq to'lash muddatini kechiktirganlik uchun har bir kuniga penya hisoblanadi.</li>
              <li>Muntazam soliq to'lamaslik holatlarida soliq organlari bank hisobvaraqlarini to'xtatib qo'yish (bloklash) huquqiga ega.</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5 pb-24">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Soliq Savodxonligi Maktabi</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Talabalar va yosh frilanserlar uchun O'zbekiston soliq tizimi qisqa qo'llanmasi
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-3">
        {sections.map((sec) => {
          const isOpen = openSectionId === sec.id;
          const Icon = sec.icon;

          return (
            <div
              key={sec.id}
              className={`rounded-3xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-slate-900 border-amber-400/40 shadow-lg'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleSection(sec.id)}
                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 focus-visible:outline-none"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-bold text-white tracking-tight">
                        {sec.title}
                      </span>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                        {sec.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{sec.summary}</p>
                  </div>
                </div>

                <div className="text-slate-400 p-1 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 animate-in fade-in duration-150">
                  {sec.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Official Links & Resources */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 text-xs text-slate-400 space-y-2">
        <div className="font-bold text-white text-sm">Foydali rasmiy manbalar:</div>
        <div className="flex flex-col gap-2">
          <a
            href="https://soliq.uz"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800"
          >
            <span>O'zbekiston Respublikasi Soliq Qo'mitasi portali (soliq.uz)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>
          <a
            href="https://my.soliq.uz"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800"
          >
            <span>Elektron soliq xizmatlari (my.soliq.uz)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>
      </div>
    </div>
  );
};
