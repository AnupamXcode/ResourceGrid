"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { getStoredResources } from "@/lib/store/hub-store";
import { Resource } from "@/lib/types";
import { Users, CheckCircle, ShieldCheck } from "lucide-react";

export default function InterviewPage() {
  const [interviewResources, setInterviewResources] = useState<Resource[]>([]);

  useEffect(() => {
    const all = getStoredResources();
    setInterviewResources(all.filter((r) => r.tags.includes("Interview") || r.type === "question_bank"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Interview Preparation Vault</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            Ace Technical, System Design & HR Interviews
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Categorized Q&As, behavioral frameworks (STAR technique), company-specific question sets, and system design case studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {interviewResources.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
