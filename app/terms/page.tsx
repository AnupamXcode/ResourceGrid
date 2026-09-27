"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileText, ShieldCheck, CheckCircle2, AlertTriangle, Scale } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Service Rules</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
            Terms of Service & Acceptable Use
          </h1>
          <p className="text-xs text-slate-400">Effective Date: September 27, 2026</p>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-6 text-xs text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" /> 1. Acceptable Use & Educational License
            </h2>
            <p>
              VibeCoding Resource Hub grants users a non-exclusive, non-transferable license to access, view, preview, and download educational materials (PDFs, placement notes, DSA questions, roadmaps, and prompt templates) strictly for personal learning, academic study, and interview preparation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> 2. Intellectual Property Rights
            </h2>
            <p>
              All website source code, UI designs, system documentation, database schemas, and proprietary resource compilations are protected under copyright laws. You may not scrape, systematically automate retrieval, or redistribute content for commercial gain without written consent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 3. Administrator CMS Responsibilities
            </h2>
            <p>
              Administrator credentials (`/admin`) are restricted to authorized platform personnel. The operator maintains full authority to publish, edit, feature, unpublish, or archive resources and categories to preserve quality and security standards.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> 4. Termination & Limitation of Liability
            </h2>
            <p>
              We reserve the right to restrict or terminate platform access for users who violate acceptable use policies, attempt security exploits, or perform unauthorized database attacks. Materials are provided "as-is" without warranty of uninterrupted service.
            </p>
          </section>

          <section className="space-y-2 pt-2 border-t border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" /> 5. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms shall be governed by applicable federal and state laws. Any formal inquiries should be directed to <a href="mailto:support@vibecoding.hub" className="text-blue-400 hover:underline">support@vibecoding.hub</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
