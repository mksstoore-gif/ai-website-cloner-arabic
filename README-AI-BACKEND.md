# نسّاخ AI — Backend branch

هذا الفرع يضيف ربطاً فعلياً مع OpenAI عبر Backend آمن.

## Environment variables

- `OPENAI_API_KEY` — مفتاح OpenAI السري. لا تضعه داخل الكود.
- `APP_ACCESS_KEY` — رمز خاص بك لحماية استهلاك الـ API.
- `OPENAI_MODEL` — اختياري. الافتراضي `gpt-6.1-sol`.

## التشغيل

```bash
npm ci
npm run dev
```

## ملاحظات

واجهة المستخدم ترسل رابط الموقع إلى `/api/clone`.
المفتاح يبقى في السيرفر، والطلب يستخدم Responses API مع أداة Web Search.
هذا الإصدار يحلل الموقع ويجهز خطة استنساخ عملية. مرحلة إنشاء ملفات المشروع تلقائياً يمكن بناؤها فوق Agents API وسandbox معزول.
