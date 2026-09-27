import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsentBanner } from "@/components/layout/CookieConsentBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VibeCoding Resource Hub - Placement Prep, AI Coding & Materials",
  description: "Centralized digital resource platform for placement preparation, AI-assisted coding, DSA question banks, computer science fundamentals, roadmaps, and practical resources.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {/* ACCESSIBILITY SKIP TO MAIN CONTENT LINK */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-xl focus:font-bold focus:text-xs"
        >
          Skip to main content
        </a>

        <ThemeProvider>
          <div id="main-content" className="flex-1 flex flex-col">
            {children}
          </div>
          <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
