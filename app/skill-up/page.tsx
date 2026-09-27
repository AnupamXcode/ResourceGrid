"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getStoredResources } from "@/lib/store/hub-store";
import { Resource } from "@/lib/types";
import {
  Code,
  Globe,
  Database,
  Cpu,
  Wrench,
  Layers,
  Sparkles,
  BookOpen,
  FileText,
  Search,
  Eye,
  Download,
  CheckCircle2,
} from "lucide-react";

export default function SkillUpPage() {
  const allResources = useMemo(() => getStoredResources(), []);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const skillCategories = [
    { id: "all", name: "All Skills", icon: Sparkles },
    { id: "programming", name: "Programming (C++, Java, Python)", icon: Code },
    { id: "web-dev", name: "Web Development (React, Next.js)", icon: Globe },
    { id: "databases", name: "Databases & SQL", icon: Database },
    { id: "ai-ml", name: "AI & Machine Learning", icon: Cpu },
    { id: "tools", name: "Development Tools & Git", icon: Wrench },
    { id: "career", name: "Career & Interview Skills", icon: Layers },
  ];

  const filteredResources = useMemo(() => {
    return allResources.filter((r) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesDesc = r.description.toLowerCase().includes(q);
        const matchesTag = r.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesTag) return false;
      }

      // Category filter
      if (selectedCategory === "all") return true;
      if (selectedCategory === "programming") return r.tags.some((t) => ["C++", "Java", "Python", "JavaScript", "Programming"].includes(t));
      if (selectedCategory === "web-dev") return r.tags.some((t) => ["Web Dev", "React", "Next.js", "HTML", "CSS", "Frontend"].includes(t));
      if (selectedCategory === "databases") return r.tags.some((t) => ["DBMS", "SQL", "PostgreSQL", "Database"].includes(t));
      if (selectedCategory === "ai-ml") return r.tags.some((t) => ["AI", "Machine Learning", "Python", "Data Science"].includes(t));
      if (selectedCategory === "tools") return r.tags.some((t) => ["Git", "GitHub", "Tools", "VS Code"].includes(t));
      if (selectedCategory === "career") return r.tags.some((t) => ["Interview", "Resume", "Career", "Communication"].includes(t));

      return true;
    });
  }, [allResources, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Skill Up" },
          ]}
        />

        {/* HERO */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-slate-900 border border-emerald-500/20 p-8 sm:p-10 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Developer Skill Acceleration Hub</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
              Skill Up & Tech Mastery
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Structured learning tracks, language handbooks, full-stack web dev roadmaps, SQL query cheat sheets, and technical career skills.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">7+ Technical Domains</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-400" />
                Handwritten Notes & Official Cheat Sheets
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY TABS & SEARCH */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills, topics, cheat sheets..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <p className="text-xs text-slate-400">
              Showing <strong className="text-white">{filteredResources.length}</strong> learning materials
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-t border-slate-800/80 pt-3">
            {skillCategories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                      : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* RESOURCE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => {
            const fileUrl = res.file?.fileUrl || res.metadata?.downloadUrl || "/sample-resources/dsa-top-100.pdf";
            return (
              <div
                key={res.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-emerald-500/5 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs">
                      {res.categoryName || "Skill Up"}
                    </span>
                    <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded-full bg-slate-800">
                      {res.type.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {res.tags.slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <Link
                    href={`/resources/${res.slug}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" /> Read Notes
                  </Link>
                  <a
                    href={fileUrl}
                    download={`${res.slug}.pdf`}
                    className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" /> Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
