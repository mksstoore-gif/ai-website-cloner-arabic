"use client";

import { Bell, ChevronLeft, Gift, Heart, Home, Menu, Search, ShieldCheck, ShoppingCart, Sparkles, Star, UserRound, Zap } from "lucide-react";

const categories = [
  ["متاجر رقمية","🛍️"],["منصات ألعاب","🎮"],["الإتصال والبيانات","📱"],["بطاقات تسوق","💳"],
  ["خدمات وإشتراكات","✨"],["مطاعم","🍔"],["الشحن المباشر","⚡"],["بطاقات المتجر","🎁"],
];
const best = [
  ["بطاقات المتجر","هدية","من 25 ر.س"],["آيتونز","","من 15 ر.س"],["شحن سوا","STC","من 20 ر.س"],["يلا لودو","🎲","من 5 ر.س"],
];
const products = [
  {title:"EA SPORTS FC 27 Ultimate Edition", price:"379 ر.س", tag:"جديد", art:"FC 27"},
  {title:"EA SPORTS FC 27 Standard Edition", price:"269 ر.س", tag:"الأكثر طلباً", art:"FC 27"},
  {title:"بطاقة آيتونز 15 دولار", price:"61.88 ر.س", tag:"فوري", art:""},
  {title:"بطاقة ببجي 1500 + 300 شدة", price:"93.75 ر.س", tag:"عرض", art:"PUBG"},
];

function SectionTitle({children}:{children:React.ReactNode}) {
  return <div className="mb-3 flex items-center justify-between"><h2 className="text-[19px] font-black text-slate-900">{children}</h2><button className="flex items-center gap-1 text-xs font-bold text-violet-700">عرض الكل <ChevronLeft className="size-4"/></button></div>
}

export default function HomePage(){
  return <main dir="rtl" className="min-h-screen bg-[#f7f7fb] pb-24 text-slate-900">
    <div className="bg-[#5426b7] text-white">
      <div className="mx-auto max-w-md px-4 pb-5 pt-3">
        <div className="mb-4 flex items-center justify-between">
          <button className="grid size-10 place-items-center rounded-full bg-white/10"><Menu className="size-5"/></button>
          <div className="flex items-center gap-2">
            <div className="text-left leading-none"><div className="text-[10px] font-bold text-violet-200">متجر البطاقات</div><div className="text-lg font-black tracking-tight">دليل<span className="text-[#ffd43b]">+</span></div></div>
            <div className="grid size-10 place-items-center rounded-xl bg-[#ffd43b] font-black text-[#5426b7]">D</div>
          </div>
          <button className="relative grid size-10 place-items-center rounded-full bg-white/10"><ShoppingCart className="size-5"/><span className="absolute -left-1 -top-1 grid size-5 place-items-center rounded-full bg-[#ffd43b] text-[10px] font-black text-[#5426b7]">1</span></button>
        </div>
        <label className="flex h-12 items-center gap-3 rounded-2xl bg-white px-4 shadow-lg shadow-violet-950/10">
          <Search className="size-5 text-slate-400"/><input className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400" placeholder="اكتب اللي تبغاه، وخلّنا نلقاه لك"/>
        </label>
      </div>
    </div>

    <div className="mx-auto max-w-md space-y-7 px-4 pt-4">
      <section className="relative overflow-hidden rounded-[26px] bg-gradient-to-l from-[#32156f] via-[#5927b9] to-[#7a46e5] p-5 text-white shadow-xl shadow-violet-200">
        <div className="absolute -left-5 -top-6 size-28 rounded-full bg-[#ffd43b]/20 blur-sm"/><Sparkles className="absolute left-6 top-5 size-8 text-[#ffd43b]"/>
        <div className="relative max-w-[70%]"><span className="rounded-full bg-[#ffd43b] px-2.5 py-1 text-[10px] font-black text-[#44208e]">مكسب</span><h1 className="mt-3 text-2xl font-black leading-tight">كل ما شاركت أكثر، زاد مكسبك!</h1><p className="mt-2 text-xs leading-5 text-violet-100">شارك رابطك مع أصدقائك واربح من مشترياتهم.</p><button className="mt-4 rounded-xl bg-white px-4 py-2 text-xs font-black text-[#5426b7]">اكتشفه الآن</button></div>
      </section>

      <section><SectionTitle>أقسام البطاقات</SectionTitle><div className="grid grid-cols-4 gap-x-2 gap-y-4">{categories.map(([name,icon])=><button key={name} className="min-w-0 text-center"><span className="mx-auto grid aspect-square w-full max-w-[76px] place-items-center rounded-[22px] border border-violet-100 bg-white text-3xl shadow-sm">{icon}</span><span className="mt-2 block truncate text-[11px] font-bold">{name}</span></button>)}</div></section>

      <section><SectionTitle>البطاقات الأكثر مبيعًا</SectionTitle><div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">{best.map(([name,mark,price])=><article key={name} className="min-w-[132px] snap-start rounded-2xl bg-white p-3 shadow-sm"><div className="grid h-24 place-items-center rounded-xl bg-gradient-to-br from-violet-100 to-indigo-50 text-2xl font-black text-violet-800">{mark}</div><h3 className="mt-2 text-sm font-black">{name}</h3><p className="mt-1 text-[11px] text-slate-500">{price}</p></article>)}</div></section>

      <section><SectionTitle>وصل حديثًا</SectionTitle><div className="grid grid-cols-2 gap-3">{products.map((p,i)=><article key={p.title} className="overflow-hidden rounded-[20px] bg-white shadow-sm"><div className={"relative grid h-32 place-items-center "+(i<2?"bg-gradient-to-br from-[#171829] to-[#5525b3] text-white":"bg-gradient-to-br from-slate-100 to-violet-100 text-violet-900")}><span className="absolute right-2 top-2 rounded-full bg-[#ffd43b] px-2 py-1 text-[9px] font-black text-[#44208e]">{p.tag}</span><span className="text-2xl font-black tracking-tight">{p.art}</span><button className="absolute left-2 top-2 grid size-7 place-items-center rounded-full bg-white/90 text-slate-600"><Heart className="size-3.5"/></button></div><div className="p-3"><h3 className="line-clamp-2 min-h-10 text-xs font-bold leading-5">{p.title}</h3><div className="mt-2 flex items-end justify-between"><div><div className="text-sm font-black text-[#5426b7]">{p.price}</div><div className="text-[9px] text-slate-400">المتجر السعودي</div></div><button className="grid size-8 place-items-center rounded-xl bg-[#5426b7] text-white"><ShoppingCart className="size-4"/></button></div></div></article>)}</div></section>

      <section className="overflow-hidden rounded-[26px] bg-[#fff7d6] p-5"><div className="flex items-center gap-4"><div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#ffd43b] text-[#5426b7]"><Star className="size-7 fill-current"/></div><div><div className="text-xs font-black text-amber-700">برنامج الولاء</div><h2 className="mt-1 text-xl font-black">دليل ستارز</h2><p className="mt-1 text-xs leading-5 text-slate-600">اجمع نقاطك مع كل عملية شراء واستبدلها بمكافآت.</p></div></div></section>

      <section><h2 className="mb-4 text-center text-xl font-black">تسوّق أسرع وأسهل</h2><div className="grid gap-3">{[[Zap,"استلام فوري","تصلك بطاقتك مباشرة بعد إتمام الطلب."],[ShieldCheck,"دفع آمن","خيارات دفع متنوعة وتجربة موثوقة."],[Gift,"مكافآت أكثر","اكسب نقاطًا ومزايا مع مشترياتك."]].map(([Icon,title,desc])=>{const C=Icon as typeof Zap;return <div key={String(title)} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"><div className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-50 text-[#5426b7]"><C className="size-5"/></div><div><h3 className="text-sm font-black">{String(title)}</h3><p className="mt-1 text-[11px] leading-5 text-slate-500">{String(desc)}</p></div></div>})}</div></section>

      <footer className="pb-4 pt-2 text-center text-[10px] leading-5 text-slate-400">واجهة تجريبية معاد بناؤها بكود React قابل للتعديل.<br/>الأسماء والعلامات المذكورة لأغراض العرض المرجعي.</footer>
    </div>

    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto flex h-[72px] max-w-md items-center justify-around border-t border-slate-100 bg-white/95 px-3 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(30,20,60,.08)] backdrop-blur">
      {[[Home,"الرئيسية",true],[Search,"استكشف",false],[Gift,"المكافآت",false],[Bell,"التنبيهات",false],[UserRound,"حسابي",false]].map(([Icon,label,active])=>{const C=Icon as typeof Home;return <button key={String(label)} className={"flex min-w-12 flex-col items-center gap-1 text-[9px] font-bold "+(active?"text-[#5426b7]":"text-slate-400")}><C className={"size-5 "+(active?"fill-violet-100":"")}/><span>{String(label)}</span></button>})}
    </nav>
  </main>
}
