"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Search,
  ShieldCheck,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { getStoredSettings } from "@/lib/store/hub-store";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [siteName, setSiteName] = useState("VibeCoding Hub");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
    const settings = getStoredSettings();
    if (settings.siteName) setSiteName(settings.siteName);
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.getElementById("navbar-search-input");
        searchInput?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: "Placement", href: "/placement" },
    { label: "Company Qs", href: "/placement/company-questions" },
    { label: "Vibe Coding", href: "/vibe-coding" },
    { label: "Learning", href: "/learning" },
    { label: "Questions", href: "/questions" },
    { label: "Roadmaps", href: "/roadmaps" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/resources?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="VibeCoding Hub Homepage">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                VibeCoding <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">Hub</span>
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* SEARCH BAR & ACTIONS */}
          <div className="hidden sm:flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative w-48 lg:w-60">
              <input
                id="navbar-search-input"
                type="text"
                placeholder="Search resources... (⌘K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                aria-label="Search Resources"
              />
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </form>

            {/* THEME TOGGLE */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Toggle Dark and Light Theme"
                title="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
              </button>
            )}

            {/* ADMIN BUTTON */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors min-h-[36px]"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </Link>
          </div>

          {/* MOBILE MENU TRIGGER */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle Mobile Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-800 py-4 px-2 space-y-3 bg-slate-950">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search resources, PDFs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-400"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </form>
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-semibold text-center min-h-[44px] flex items-center justify-center ${
                    pathname === link.href ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" : "bg-slate-900 text-slate-300"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-lg bg-blue-600 text-white w-full justify-center min-h-[44px]"
              >
                <ShieldCheck className="w-4 h-4" />
                Admin CMS Panel
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
