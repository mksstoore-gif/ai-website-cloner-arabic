"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Copy, ExternalLink, Globe2, Laptop, Link2, Loader2, Smartphone, Sparkles } from "lucide-react";

type Mode = "desktop" | "mobile" | "both";

export default function Home() {
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState<Mode>("both");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const cloneCommand = useMemo(() => {
    if (!submittedUrl) return "";
    return `/clone-website ${submittedUrl}`;
  }, [submittedUrl]);

  function normalizeUrl(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return "";
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setCopied(false);

    const normalized = normalizeUrl(url);

    try {
      const parsed = new URL(normalized);
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("bad protocol");
      setSubmittedUrl(parsed.toString());
    } catch {
      setSubmittedUrl("");
      setMessage("أدخل رابط موقع صحيح، مثال: https://example.com");
    }
  }

  async function copyCommand() {
    if (!cloneCommand) return;
    await navigator.clipboard.writeText(cloneCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#070b16] text-white" dir="rtl">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(99,102,241,.23),transparent_32%),radial-gradient(circle_at_15%_38%,rgba(14,165,233,.14),transparent_27%)]" />

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/20">
            <Sparkles className="size-5" />
          </div>
          <div>
            <div className="font-black tracking-tight">نسّاخ AI</div>
            <div className="text-xs text-slate-400">Website Cloner</div>
          </div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs text-emerald-300">
          مفتوح المصدر
        </div>
      </header>

      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-20 pt-12 text-center sm:px-8 sm:pt-20">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-200">
          <Globe2 className="size-4" />
          مصمم للجوال أولاً
        </div>

        <h1 className="max-w-4xl text-balance text-4xl font-black leading-[1.14] tracking-tight sm:text-6xl">
          حوّل رابط أي موقع إلى
          <span className="block bg-gradient-to-l from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
            مشروع قابل للتعديل
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-slate-400 sm:text-lg">
          ضع رابط الموقع، اختر طريقة المعاينة، وجهّز مهمة الاستنساخ للمحرك الأصلي المبني على
          Next.js ووكيل الذكاء الاصطناعي.
        </p>

        <form onSubmit={handleSubmit} className="mt-9 w-full max-w-3xl rounded-[28px] border border-white/10 bg-white/[.055] p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Link2 className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                inputMode="url"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="https://example.com"
                className="h-14 w-full rounded-2xl border border-white/10 bg-[#0b1020] pr-12 pl-4 text-left text-base outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-500/10"
                dir="ltr"
                aria-label="رابط الموقع"
              />
            </div>
            <button
              type="submit"
              className="h-14 rounded-2xl bg-gradient-to-l from-indigo-500 to-violet-500 px-7 font-bold shadow-lg shadow-indigo-700/20 transition active:scale-[.98] sm:min-w-44"
            >
              تجهيز الاستنساخ
            </button>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { id: "desktop" as const, label: "كمبيوتر", icon: Laptop },
              { id: "mobile" as const, label: "جوال", icon: Smartphone },
              { id: "both" as const, label: "الاثنان", icon: Sparkles },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${
                  mode === id
                    ? "border-indigo-400/40 bg-indigo-400/15 text-indigo-200"
                    : "border-white/5 bg-black/10 text-slate-500 hover:text-slate-300"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </form>

        {message && (
          <div className="mt-4 w-full max-w-3xl rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
            {message}
          </div>
        )}

        {submittedUrl && (
          <div className="mt-6 w-full max-w-3xl rounded-[28px] border border-emerald-400/15 bg-emerald-400/[.06] p-5 text-right">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-emerald-400" />
              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-emerald-200">الرابط جاهز للمحرك</h2>
                <p className="mt-1 break-all text-sm leading-6 text-slate-400" dir="ltr">{submittedUrl}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/8 bg-black/20 p-4">
              <div className="mb-2 text-xs text-slate-500">أمر المحرك الأصلي</div>
              <code className="block overflow-x-auto whitespace-nowrap text-left text-sm text-cyan-200" dir="ltr">
                {cloneCommand}
              </code>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={copyCommand}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[.06] font-semibold text-slate-200 transition hover:bg-white/[.09]"
              >
                {copied ? <CheckCircle2 className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                {copied ? "تم النسخ" : "نسخ أمر الاستنساخ"}
              </button>
              <a
                href="https://github.com/mksstoore-gif/ai-website-cloner-arabic"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-white text-sm font-bold text-slate-950 transition hover:bg-slate-100"
              >
                فتح المشروع
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
        )}

        <div className="mt-14 grid w-full max-w-5xl gap-3 text-right sm:grid-cols-3">
          {[
            ["01", "ضع الرابط", "الصق رابط الموقع الذي تريد إعادة بنائه."],
            ["02", "افحص كل المقاسات", "جهّز نسخة للجوال والكمبيوتر مع نفس الصفحات."],
            ["03", "عدّل المشروع", "النتيجة تكون كود Next.js قابل للتعديل والتطوير."],
          ].map(([num, title, desc]) => (
            <article key={num} className="rounded-3xl border border-white/8 bg-white/[.035] p-5">
              <div className="text-xs font-bold text-indigo-300">{num}</div>
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">{desc}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-xs leading-6 text-slate-600">
          استخدم الأداة فقط مع المواقع التي تملكها أو لديك إذن بإعادة بنائها. بعض المواقع تمنع النسخ أو إعادة استخدام العلامة والمحتوى.
        </p>
      </section>
    </main>
  );
}
