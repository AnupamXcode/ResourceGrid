"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { SiteSettings } from "@/lib/types";

interface HeroSectionProps {
  settings: SiteSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const [query, setQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/resources?search=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* HEADLINE */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-5">
          {settings.heroTitle || "Everything You Need to Learn, Build, Prepare and Get Placed."}
        </h1>

        {/* SUBTITLE */}
        <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          {settings.heroSubtitle ||
            "A centralized digital platform for placement preparation, AI-assisted coding, DSA question banks, computer science fundamentals, roadmaps, and practical resources."}
        </p>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8 relative">
          <div className="relative flex items-center rounded-xl border border-slate-700 bg-slate-900 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <Search className="w-4 h-4 absolute left-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search 1,000+ PDFs, DSA Questions, Vibe Coding Prompts, Roadmaps..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-32 py-3.5 text-xs bg-transparent text-white placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              Search
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* QUICK ACTION CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link
            href={settings.heroPrimaryCtaUrl || "/resources"}
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-colors flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            {settings.heroPrimaryCtaText || "Explore Resources"}
          </Link>

          <Link
            href={settings.heroSecondaryCtaUrl || "/placement"}
            className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4 text-blue-400" />
            {settings.heroSecondaryCtaText || "Browse Placement Prep"}
          </Link>
        </div>

        {/* STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80 text-slate-400">
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="text-xl font-bold text-white mb-0.5">1,000+</div>
            <div className="text-xs text-slate-400 font-medium">Curated Resources</div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="text-xl font-bold text-white mb-0.5">50,000+</div>
            <div className="text-xs text-slate-400 font-medium">Downloads & Views</div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="text-xl font-bold text-white mb-0.5">100%</div>
            <div className="text-xs text-slate-400 font-medium">CMS Dynamic Managed</div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="text-xl font-bold text-white mb-0.5">Instant</div>
            <div className="text-xs text-slate-400 font-medium">PDF Preview & Download</div>
          </div>
        </div>
      </div>
    </section>
  );
}
