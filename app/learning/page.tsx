"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { getStoredResources } from "@/lib/store/hub-store";
import { Resource } from "@/lib/types";
import { BookOpen, Code, Cpu, Database, Brain, Terminal } from "lucide-react";

export default function LearningPage() {
  const [learningResources, setLearningResources] = useState<Resource[]>([]);

  useEffect(() => {
    const all = getStoredResources();
    setLearningResources(all.filter((r) => r.categoryId === "cat-3" || r.tags.includes("Learning")));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Learning Materials & Notes</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            Structured Notes & Learning Materials
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Hand-curated documentation, cheat sheets, and course notes for C++, Java, Python, React, Next.js, and AI/ML.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {learningResources.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
