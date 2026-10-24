import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AnalyticsLoader from "@/components/analytics-loader";
import CookieBanner from "@/components/cookie-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EquipRegistry",
  description: "Global asset verification and registry platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className="h-full bg-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-[100svh] bg-white text-slate-900 antialiased`}
      >
        {children}
        <AnalyticsLoader />
        <CookieBanner />
      </body>
    </html>
  );
}