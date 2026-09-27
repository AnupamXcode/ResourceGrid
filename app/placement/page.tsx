"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { getStoredResources } from "@/lib/store/hub-store";
import { Resource } from "@/lib/types";
import { GraduationCap, BookOpen, Code, Database, Cpu, Users, FileText, CheckCircle, Building2 } from "lucide-react";

export default function PlacementPage() {
  const [placementResources, setPlacementResources] = useState<Resource[]>([]);

  useEffect(() => {
    const all = getStoredResources();
    setPlacementResources(all.filter((r) => r.categoryId === "cat-1" || r.tags.includes("Placement")));
  }, []);

  const topics = [
    { title: "Aptitude & Reasoning", count: "120+ Sets", desc: "Quantitative, Logical Reasoning, Verbal Ability & Data Interpretation." },
    { title: "DSA & Problem Solving", count: "100+ PDFs", desc: "Arrays, Trees, Graphs, Dynamic Programming, LeetCode Patterns." },
    { title: "Core CS (DBMS, OS, CN)", count: "50+ Notes", desc: "Normalization, ACID properties, Process Scheduling, TCP/IP, OSI model." },
    { title: "SQL & Database Queries", count: "80+ Queries", desc: "Joins, Subqueries, Indexing, Window functions, Query optimization." },
    { title: "HR & Technical Interview", count: "40+ Q&As", desc: "Behavioral questions, STAR method, Mock interviews, Salary negotiation." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Placement Preparation Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            Master Campus & Off-Campus Placements
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
            All-in-one resource center for Aptitude, DSA LeetCode patterns, Core CS subjects (DBMS, OS, CN), SQL queries, and company interview question sets.
          </p>

          {/* PROMINENT COMPANY QUESTIONS HERO BANNER */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/50 via-indigo-900/40 to-slate-900 border border-blue-500/30 text-left relative overflow-hidden shadow-2xl mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 inline-flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" /> Dedicated Company Question Bank
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Company Questions PDF Library
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Prepare for company-specific placement and interview rounds with curated question banks and preparation material for TCS, Infosys, Accenture, Amazon, Wipro, Capgemini, IBM, and more.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <div className="text-center px-4 py-2 rounded-2xl bg-slate-950/60 border border-slate-800 w-full sm:w-auto">
                  <div className="text-xl font-black text-blue-400">{placementResources.filter(r => !!r.company_name).length || 328}+</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Company Question Sets</div>
                </div>
                <Link
                  href="/placement/company-questions"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all text-center shrink-0"
                >
                  Explore Company Questions →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* TOPIC GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {topics.map((t, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white text-base">{t.title}</h3>
                <span className="px-2.5 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 font-mono font-semibold border border-blue-500/20">{t.count}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{t.desc}</p>
              <Link href={`/resources?search=${encodeURIComponent(t.title)}`} className="text-xs font-semibold text-blue-400 hover:underline">
                Explore Topic Materials →
              </Link>
            </div>
          ))}
        </div>

        {/* PLACEMENT RESOURCES LIST */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Placement Study Materials & PDFs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placementResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
