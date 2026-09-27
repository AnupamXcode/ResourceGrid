"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookOpen, ShieldCheck, Sparkles, GraduationCap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-16 w-full space-y-8">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold mb-4 shadow-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">About VibeCoding Resource Hub</h1>
          <p className="text-xs sm:text-sm text-slate-400">Production-ready digital learning, placement preparation, and AI-assisted development platform.</p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
          <p>
            VibeCoding Resource Hub is engineered to empower software engineers, computer science students, and career changers with high-quality educational materials.
          </p>
          <p>
            The entire platform operates on a CMS-driven architecture allowing administrators to add PDFs, text documents, interview question banks, and roadmaps seamlessly without writing source code.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
