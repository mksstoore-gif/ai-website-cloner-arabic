import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "نسّاخ AI | استنساخ المواقع",
  description: "واجهة عربية سهلة لتجهيز مشاريع استنساخ المواقع بالذكاء الاصطناعي.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
