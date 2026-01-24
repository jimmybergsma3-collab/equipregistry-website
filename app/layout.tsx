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
    <html lang="nl" className="h-full bg-white">
      <head>
        {/* Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"cb5840a0fd194e25ae1c422f07066afb"}'
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-[100svh] bg-white text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
