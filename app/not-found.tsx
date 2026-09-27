"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, Home, BookOpen, GraduationCap, ArrowRight, FileQuestion } from "lucide-react";

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/resources?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 py-20 w-full text-center flex flex-col items-center justify-center">
        {/* 404 BADGE */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-6">
          <FileQuestion className="w-4 h-4" />
          <span>Error 404 — Page Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
          Oops! That Page Lost Its Pathway
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
          The requested resource URL might have been moved, renamed, or deleted. Search our library below or navigate back to main hubs.
        </p>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-md mb-8 relative">
          <div className="relative flex items-center rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 focus-within:border-blue-500">
            <Search className="w-4 h-4 absolute left-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search resources, PDFs, question banks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-24 py-3 text-xs bg-transparent text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
            >
              Search
            </button>
          </div>
        </form>

        {/* RECOVERY CTAS */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>

          <Link
            href="/resources"
            className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-blue-400" /> Browse Resource Catalog
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
