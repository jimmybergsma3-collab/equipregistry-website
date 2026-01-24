import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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
  description: "EquipRegistry demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
