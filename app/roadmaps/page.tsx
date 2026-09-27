"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getStoredRoadmaps } from "@/lib/store/hub-store";
import { Roadmap } from "@/lib/types";
import { Map, Brain, Layers, CheckCircle2, ArrowRight, Sparkles, Clock } from "lucide-react";

export default function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [activeRoadmapId, setActiveRoadmapId] = useState<string>("");

  useEffect(() => {
    const list = getStoredRoadmaps();
    setRoadmaps(list);
    if (list.length > 0) {
      setActiveRoadmapId(list[0].id);
    }
  }, []);

  const activeRoadmap = roadmaps.find((r) => r.id === activeRoadmapId) || roadmaps[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Map className="w-3.5 h-3.5" />
            <span>Interactive Tech Roadmaps</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            Step-by-Step Learning & Placement Roadmaps
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Structured career pathways with recommended resource materials, prerequisites, and milestone topics.
          </p>
        </div>

        {/* ROADMAP SELECTION TABS */}
        {roadmaps.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {roadmaps.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRoadmapId(r.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  activeRoadmapId === r.id
                    ? "bg-cyan-600 text-white border-cyan-500 shadow-lg shadow-cyan-600/20"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                }`}
              >
                {r.title}
              </button>
            ))}
          </div>
        )}

        {/* ACTIVE ROADMAP VIEW */}
        {activeRoadmap && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-white mb-1">{activeRoadmap.title}</h2>
                <p className="text-xs text-slate-400">{activeRoadmap.description}</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
                  Duration: {activeRoadmap.estimatedDuration}
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold uppercase border border-cyan-500/20">
                  {activeRoadmap.difficulty}
                </span>
              </div>
            </div>

            {/* VISUAL STEPS PATHWAY */}
            <div className="relative pl-6 sm:pl-10 space-y-10 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-blue-500 before:to-purple-500">
              {activeRoadmap.steps.map((step, idx) => (
                <div key={step.id} className="relative group">
                  {/* STEP NODE CIRCLE */}
                  <div className="absolute -left-6 sm:-left-10 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-950 border-2 border-cyan-400 text-cyan-400 flex items-center justify-center text-xs font-bold shadow-md shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                    {step.stageNumber}
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-white">Stage {step.stageNumber}: {step.title}</h3>
                      <span className="text-[10px] text-cyan-400 font-mono font-semibold">Milestone {idx + 1}</span>
                    </div>

                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">{step.description}</p>

                    {step.topics && step.topics.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[11px] font-semibold text-slate-300 block">Core Topics to Master:</span>
                        <div className="flex flex-wrap gap-2">
                          {step.topics.map((tp, i) => (
                            <span key={i} className="px-3 py-1 rounded-lg text-xs bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                              {tp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
