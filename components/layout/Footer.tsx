"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Mail, Phone, Globe, ShieldCheck } from "lucide-react";
import { getStoredSettings } from "@/lib/store/hub-store";

export function Footer() {
  const [settings, setSettings] = useState(getStoredSettings());

  useEffect(() => {
    setSettings(getStoredSettings());
  }, []);

  const phoneFormatted = settings.contactPhone || "+1 (800) 555-8423";
  const phoneTelUrl = `tel:${phoneFormatted.replace(/[^0-9+]/g, "")}`;
  const mailtoUrl = `mailto:${settings.contactEmail || "support@vibecoding.hub"}`;

  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* COL 1: BRAND & CLICKABLE LOGO */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Return to Homepage">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white">{settings.siteName || "VibeCoding Hub"}</span>
            </Link>

            <p className="text-slate-400 leading-relaxed">
              A centralized digital platform for placement preparation, AI-assisted coding, DSA question banks, roadmaps, and educational materials.
            </p>

            {/* INTERACTIVE EMAIL & PHONE LINKS */}
            <div className="space-y-1.5 pt-1 text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={mailtoUrl} className="hover:text-white transition-colors font-mono">
                  {settings.contactEmail || "support@vibecoding.hub"}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={phoneTelUrl} className="hover:text-white transition-colors font-mono">
                  {phoneFormatted}
                </a>
              </div>
            </div>
          </div>

          {/* COL 2: QUICK NAVIGATION */}
          <div>
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase mb-3">Resource Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/placement" className="hover:text-blue-400 transition-colors">Placement Preparation</Link></li>
              <li><Link href="/vibe-coding" className="hover:text-purple-400 transition-colors">Vibe Coding / AI Prompts</Link></li>
              <li><Link href="/learning" className="hover:text-emerald-400 transition-colors">Learning Materials & Notes</Link></li>
              <li><Link href="/questions" className="hover:text-amber-400 transition-colors">Important Questions Bank</Link></li>
              <li><Link href="/interview" className="hover:text-cyan-400 transition-colors">Interview Preparation</Link></li>
              <li><Link href="/roadmaps" className="hover:text-pink-400 transition-colors">Career & Tech Roadmaps</Link></li>
            </ul>
          </div>

          {/* COL 3: PLATFORM LINKS */}
          <div>
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase mb-3">Platform & Admin</h4>
            <ul className="space-y-2">
              <li><Link href="/resources" className="hover:text-white transition-colors">All Resources Catalog</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Admin Content CMS</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About VibeCoding Hub</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact & Support</Link></li>
            </ul>
          </div>

          {/* COL 4: CMS NOTICE & COMPLIANCE LINKS */}
          <div>
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase mb-3">CMS Driven Platform</h4>
            <p className="text-slate-400 mb-3 leading-relaxed">
              Virtually all resources, PDFs, question banks, and category structures on this hub are managed live via the Admin Panel.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
              <span className="font-medium text-[11px]">Deployable to Vercel</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>{settings.footerText || "© 2026 VibeCoding Resource Hub. All rights reserved."}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/admin/login" className="hover:underline text-blue-400">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
