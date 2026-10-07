"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  ChevronLeft,
  Gift,
  Heart,
  Home,
  Search,
  ShoppingCart,
  Star,
  UserRound,
} from "lucide-react";

type Tab = "home" | "explore" | "rewards" | "notifications" | "account" | "cart";

const categories = [
  ["متاجر رقمية", "🛍️"],
  ["منصات ألعاب", "🎮"],
  ["الاتصال والبيانات", "📱"],
  ["بطاقات تسوق", "💳"],
  ["خدمات واشتراكات", "✨"],
  ["مطاعم", "🍔"],
  ["الشحن المباشر", "⚡"],
  ["بطاقات المتجر", "🎁"],
];

const products = [
  { id: 1, title: "EA SPORTS FC 27 Ultimate Edition", price: 379, category: "منصات ألعاب", art: "FC 27", tag: "جديد" },
  { id: 2, title: "EA SPORTS FC 27 Standard Edition", price: 269, category: "منصات ألعاب", art: "FC 27", tag: "الأكثر طلبًا" },
  { id: 3, title: "بطاقة آيتونز 15 دولار", price: 61.88, category: "متاجر رقمية", art: "", tag: "فوري" },
  { id: 4, title: "بطاقة ببجي 1500 + 300 شدة", price: 93.75, category: "منصات ألعاب", art: "PUBG", tag: "عرض" },
  { id: 5, title: "بطاقة متجر 100 ريال", price: 100, category: "بطاقات المتجر", art: "هدية", tag: "فوري" },
  { id: 6, title: "شحن سوا 20 ريال", price: 20, category: "الاتصال والبيانات", art: "STC", tag: "شحن مباشر" },
];

export default function HomePage() {
  const [tab, setTab] = useState<Tab>("home");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = !category || product.category === category;
      const queryMatch =
        !query ||
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  const go = (next: Tab) => {
    setTab(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (id: number) => setCart((items) => [...items, id]);

  const toggleFavorite = (id: number) => {
    setFavorites((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  };

  const cartProducts = cart
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  const total = cartProducts.reduce((sum, product) => sum + product.price, 0);

  return (
    <main dir="rtl" className="min-h-screen bg-[#f7f7fb] pb-24 text-slate-900">
      <header className="sticky top-0 z-30 bg-[#5426b7] text-white shadow-lg">
        <div className="mx-auto max-w-md px-4 pb-4 pt-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => go("account")}
              className="grid size-10 place-items-center rounded-full bg-white/10"
              aria-label="الحساب"
            >
              <UserRound className="size-5" />
            </button>

            <button onClick={() => go("home")} className="flex items-center gap-2">
              <div className="text-left leading-none">
                <div className="text-[10px] text-violet-200">متجر البطاقات</div>
                <div className="text-lg font-black">
                  دليل<span className="text-[#ffd43b]">+</span>
                </div>
              </div>
              <div className="grid size-10 place-items-center rounded-xl bg-[#ffd43b] font-black text-[#5426b7]">
                D
              </div>
            </button>

            <button
              onClick={() => go("cart")}
              className="relative grid size-10 place-items-center rounded-full bg-white/10"
              aria-label="السلة"
            >
              <ShoppingCart className="size-5" />
              {cart.length > 0 && (
                <span className="absolute -left-1 -top-1 grid size-5 place-items-center rounded-full bg-[#ffd43b] text-[10px] font-black text-[#5426b7]">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {(tab === "home" || tab === "explore") && (
            <label className="mt-4 flex h-12 items-center gap-3 rounded-2xl bg-white px-4">
              <Search className="size-5 text-slate-400" />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  if (event.target.value) setTab("explore");
                }}
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none"
                placeholder="ابحث عن بطاقة أو خدمة"
              />
            </label>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-md space-y-6 px-4 pt-5">
        {tab === "home" && (
          <>
            <section className="rounded-[26px] bg-gradient-to-l from-[#32156f] via-[#5927b9] to-[#7a46e5] p-5 text-white shadow-xl">
              <span className="rounded-full bg-[#ffd43b] px-2.5 py-1 text-[10px] font-black text-[#44208e]">
                مكسب
              </span>
              <h1 className="mt-3 max-w-[78%] text-2xl font-black">
                كل ما شاركت أكثر، زاد مكسبك!
              </h1>
              <p className="mt-2 text-xs text-violet-100">
                اجمع نقاطًا واستبدلها بمكافآت.
              </p>
              <button
                onClick={() => go("rewards")}
                className="mt-4 rounded-xl bg-white px-4 py-2 text-xs font-black text-[#5426b7]"
              >
                اكتشف المكافآت
              </button>
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[19px] font-black">أقسام البطاقات</h2>
                <button
                  onClick={() => {
                    setCategory(null);
                    go("explore");
                  }}
                  className="flex items-center text-xs font-bold text-violet-700"
                >
                  عرض الكل <ChevronLeft className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {categories.map(([name, icon]) => (
                  <button
                    key={name}
                    onClick={() => {
                      setCategory(name);
                      go("explore");
                    }}
                    className="text-center"
                  >
                    <span className="mx-auto grid aspect-square w-full place-items-center rounded-[20px] border border-violet-100 bg-white text-3xl shadow-sm">
                      {icon}
                    </span>
                    <span className="mt-2 block text-[10px] font-bold">{name}</span>
                  </button>
                ))}
              </div>
            </section>

            <ProductGrid
              items={products.slice(0, 4)}
              favorites={favorites}
              onFavorite={toggleFavorite}
              onAdd={addToCart}
            />

            <button
              onClick={() => go("rewards")}
              className="flex w-full items-center gap-4 rounded-[26px] bg-[#fff7d6] p-5 text-right"
            >
              <div className="grid size-14 place-items-center rounded-2xl bg-[#ffd43b] text-[#5426b7]">
                <Star className="size-7 fill-current" />
              </div>
              <div>
                <div className="text-xs font-black text-amber-700">برنامج الولاء</div>
                <h2 className="text-xl font-black">دليل ستارز</h2>
                <p className="text-xs text-slate-600">اضغط لعرض نقاطك ومكافآتك.</p>
              </div>
            </button>
          </>
        )}

        {tab === "explore" && (
          <>
            <h1 className="text-2xl font-black">استكشف</h1>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
              <button
                onClick={() => setCategory(null)}
                className={"whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold " + (!category ? "bg-[#5426b7] text-white" : "bg-white")}
              >
                الكل
              </button>
              {categories.map(([name]) => (
                <button
                  key={name}
                  onClick={() => setCategory(name)}
                  className={"whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold " + (category === name ? "bg-[#5426b7] text-white" : "bg-white")}
                >
                  {name}
                </button>
              ))}
            </div>
            <ProductGrid
              items={filtered}
              favorites={favorites}
              onFavorite={toggleFavorite}
              onAdd={addToCart}
            />
          </>
        )}

        {tab === "rewards" && (
          <>
            <h1 className="text-2xl font-black">المكافآت</h1>
            <section className="rounded-[28px] bg-gradient-to-br from-[#5426b7] to-[#7a46e5] p-6 text-white">
              <div className="text-sm text-violet-100">رصيد نقاطك التجريبي</div>
              <div className="mt-2 text-4xl font-black">
                1,250 <span className="text-base">نقطة</span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-2/3 rounded-full bg-[#ffd43b]" />
              </div>
              <p className="mt-2 text-xs text-violet-100">باقي 750 نقطة للمستوى التالي</p>
            </section>
            {[
              ["خصم 5 ر.س", "500 نقطة"],
              ["خصم 10 ر.س", "900 نقطة"],
              ["شحن مجاني", "1200 نقطة"],
            ].map(([title, points]) => (
              <button key={title} className="flex w-full items-center justify-between rounded-2xl bg-white p-4 text-right shadow-sm">
                <div>
                  <div className="font-black">{title}</div>
                  <div className="text-xs text-slate-500">{points}</div>
                </div>
                <span className="rounded-xl bg-[#5426b7] px-4 py-2 text-xs font-bold text-white">استبدال</span>
              </button>
            ))}
          </>
        )}

        {tab === "notifications" && (
          <>
            <h1 className="text-2xl font-black">التنبيهات</h1>
            {[
              "وصلت بطاقات جديدة إلى قسم الألعاب.",
              "لديك 1,250 نقطة متاحة للاستبدال.",
              "تصفح أحدث عروض اليوم.",
            ].map((message) => (
              <div key={message} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <Bell className="size-5 text-violet-700" />
                <p className="text-sm font-bold">{message}</p>
              </div>
            ))}
          </>
        )}

        {tab === "account" && (
          <>
            <h1 className="text-2xl font-black">حسابي</h1>
            <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-violet-100 text-violet-700">
                <UserRound className="size-9" />
              </div>
              <h2 className="mt-3 text-lg font-black">حساب الزائر</h2>
              <p className="mt-1 text-xs text-slate-500">هذه النسخة لا تتطلب تسجيل دخول.</p>
            </div>
            {["طلباتي", "المفضلة (" + favorites.length + ")", "الدعم والمساعدة", "الشروط والسياسة"].map((item) => (
              <button key={item} className="flex w-full items-center justify-between rounded-2xl bg-white p-4 text-sm font-bold shadow-sm">
                {item}
                <ChevronLeft className="size-4 text-slate-400" />
              </button>
            ))}
          </>
        )}

        {tab === "cart" && (
          <>
            <h1 className="text-2xl font-black">السلة</h1>
            {cartProducts.length === 0 ? (
              <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
                <ShoppingCart className="mx-auto size-10 text-violet-300" />
                <p className="mt-3 text-sm font-bold text-slate-600">السلة فارغة.</p>
                <button onClick={() => go("explore")} className="mt-4 rounded-xl bg-[#5426b7] px-4 py-2 text-xs font-bold text-white">
                  تصفح البطاقات
                </button>
              </div>
            ) : (
              <>
                {cartProducts.map((product, index) => (
                  <div key={product.id + "-" + index} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                    <div>
                      <div className="text-sm font-black">{product.title}</div>
                      <div className="mt-1 text-xs font-black text-violet-700">{product.price} ر.س</div>
                    </div>
                    <button onClick={() => setCart((items) => items.filter((_, itemIndex) => itemIndex !== index))} className="text-xs font-bold text-red-500">
                      حذف
                    </button>
                  </div>
                ))}
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex justify-between font-black">
                    <span>الإجمالي</span>
                    <span>{total.toFixed(2)} ر.س</span>
                  </div>
                  <button className="mt-4 w-full rounded-xl bg-[#5426b7] py-3 text-sm font-black text-white">
                    متابعة الطلب
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto flex h-[72px] max-w-md items-center justify-around border-t bg-white/95 px-2 shadow-[0_-8px_30px_rgba(30,20,60,.08)] backdrop-blur">
        {[
          [Home, "الرئيسية", "home"],
          [Search, "استكشف", "explore"],
          [Gift, "المكافآت", "rewards"],
          [Bell, "التنبيهات", "notifications"],
          [UserRound, "حسابي", "account"],
        ].map(([Icon, label, target]) => {
          const C = Icon as typeof Home;
          const active = tab === target;
          return (
            <button
              key={String(target)}
              onClick={() => go(target as Tab)}
              className={"flex min-w-12 flex-col items-center gap-1 text-[9px] font-bold " + (active ? "text-[#5426b7]" : "text-slate-400")}
            >
              <C className="size-5" />
              <span>{String(label)}</span>
            </button>
          );
        })}
      </nav>
    </main>
  );
}

function ProductGrid({
  items,
  favorites,
  onFavorite,
  onAdd,
}: {
  items: typeof products;
  favorites: number[];
  onFavorite: (id: number) => void;
  onAdd: (id: number) => void;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[19px] font-black">البطاقات</h2>
        <span className="text-xs text-slate-400">{items.length} منتجات</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-[20px] bg-white shadow-sm">
            <div className="relative grid h-32 place-items-center bg-gradient-to-br from-slate-100 to-violet-100 text-violet-900">
              <span className="absolute right-2 top-2 rounded-full bg-[#ffd43b] px-2 py-1 text-[9px] font-black text-[#44208e]">
                {product.tag}
              </span>
              <span className="text-2xl font-black">{product.art}</span>
              <button
                onClick={() => onFavorite(product.id)}
                className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-white text-slate-600"
                aria-label="المفضلة"
              >
                <Heart className={"size-4 " + (favorites.includes(product.id) ? "fill-red-500 text-red-500" : "")} />
              </button>
            </div>
            <div className="p-3">
              <h3 className="min-h-10 text-xs font-bold leading-5">{product.title}</h3>
              <div className="mt-2 flex items-center justify-between">
                <b className="text-sm text-[#5426b7]">{product.price} ر.س</b>
                <button onClick={() => onAdd(product.id)} className="grid size-9 place-items-center rounded-xl bg-[#5426b7] text-white" aria-label="إضافة للسلة">
                  <ShoppingCart className="size-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
