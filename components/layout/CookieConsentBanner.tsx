"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, Check, X } from "lucide-react";

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("vibecoding_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("vibecoding_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("vibecoding_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-md text-xs space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Cookie className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-bold text-white">Privacy & Essential Cookies</span>
        </div>
        <button onClick={handleDecline} className="text-slate-400 hover:text-white p-1">
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-slate-400 leading-relaxed text-[11px]">
        We use essential cookies to maintain user preferences (theme, filters) and measure download analytics without dark patterns. Read our{" "}
        <Link href="/privacy" className="text-blue-400 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleAccept}
          className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
        >
          Accept Essential
        </button>
        <button
          onClick={handleDecline}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
