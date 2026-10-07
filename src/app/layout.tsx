import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "دليل+ | بطاقات رقمية",
  description: "واجهة متجر بطاقات رقمية عربية محسنة للجوال.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
