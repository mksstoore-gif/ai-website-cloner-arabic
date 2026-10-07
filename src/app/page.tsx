"use client";

import { FormEvent, useState } from "react";
import { Bot, CheckCircle2, Globe2, KeyRound, Loader2, Sparkles } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setResult("");

    const value = url.trim();
    if (!value) {
      setError("أدخل رابط الموقع.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/clone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-key": accessKey,
        },
        body: JSON.stringify({ url: value }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "تعذر تشغيل الذكاء الاصطناعي.");
      }

      setResult(data.result || "تم التحليل.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#070b16] text-white">
      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-14">
        <header className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400">
              <Sparkles className="size-5" />
            </div>
            <div>
              <div className="font-black">نسّاخ AI</div>
              <div className="text-xs text-slate-400">مرتبط بالذكاء الاصطناعي</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
            <Bot className="size-3.5" />
            OpenAI
          </div>
        </header>

        <section className="rounded-[32px] border border-white/10 bg-white/[.045] p-5 shadow-2xl shadow-black/30 sm:p-8">
          <div className="mb-7">
            <div className="mb-3 flex items-center gap-2 text-indigo-300">
              <Globe2 className="size-5" />
              <span className="text-sm font-bold">استنساخ موقع</span>
            </div>
            <h1 className="text-3xl font-black leading-tight sm:text-5xl">
              ضع الرابط ودع الذكاء الاصطناعي
              <span className="block bg-gradient-to-l from-cyan-300 to-violet-300 bg-clip-text text-transparent">
                يحلله ويجهز الاستنساخ
              </span>
            </h1>
            <p className="mt-4 leading-8 text-slate-400">
              النسخة الحالية تتصل بـ OpenAI من السيرفر بشكل آمن، تفحص الموقع علنياً، وتجهز وصفاً دقيقاً وخطة بناء قابلة للتنفيذ.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="mb-2 block text-sm text-slate-400">رابط الموقع</label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                inputMode="url"
                autoCapitalize="none"
                placeholder="https://example.com"
                dir="ltr"
                className="h-14 w-full rounded-2xl border border-white/10 bg-[#0b1020] px-4 text-left outline-none focus:border-indigo-400/60"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-400">
                <KeyRound className="size-4" />
                رمز الدخول الخاص بك
              </label>
              <input
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                type="password"
                autoComplete="off"
                placeholder="رمز الحماية"
                className="h-14 w-full rounded-2xl border border-white/10 bg-[#0b1020] px-4 outline-none focus:border-indigo-400/60"
              />
              <p className="mt-2 text-xs leading-5 text-slate-600">
                هذا ليس مفتاح OpenAI. مفتاح OpenAI يبقى مخفياً داخل السيرفر ولا يظهر في الموقع.
              </p>
            </div>

            <button
              disabled={loading}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-indigo-500 to-violet-500 font-bold disabled:opacity-60"
            >
              {loading ? <Loader2 className="size-5 animate-spin" /> : <Sparkles className="size-5" />}
              {loading ? "جاري التحليل..." : "ابدأ بالذكاء الاصطناعي"}
            </button>
          </form>

          {error && (
            <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm leading-7 text-rose-200">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-6 rounded-3xl border border-emerald-400/15 bg-emerald-400/[.055] p-5">
              <div className="mb-4 flex items-center gap-2 font-bold text-emerald-300">
                <CheckCircle2 className="size-5" />
                نتيجة الذكاء الاصطناعي
              </div>
              <div className="whitespace-pre-wrap text-sm leading-8 text-slate-200">{result}</div>
            </div>
          )}
        </section>

        <p className="mt-6 text-center text-xs leading-6 text-slate-600">
          استخدم الأداة فقط للمواقع التي تملكها أو لديك إذن بإعادة بنائها.
        </p>
      </div>
    </main>
  );
}
