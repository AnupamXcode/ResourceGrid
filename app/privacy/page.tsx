"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Lock, Eye, Database, Mail, Trash2 } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy & Data Protection Notice</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
            Privacy Policy & Data Disclosures
          </h1>
          <p className="text-xs text-slate-400">Effective Date: September 27, 2026</p>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-6 text-xs text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-400" /> 1. Data Collection & Minimization
            </h2>
            <p>
              We practice <strong>Strict Data Minimization</strong>. We collect only the minimum information necessary to deliver educational resources, search indexing, and customer support:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Voluntary contact form inputs (Name, Email address, Message text).</li>
              <li>Resource download and view count analytics (aggregated, non-identifiable metrics).</li>
              <li>Browser preference tokens (Theme preference, local filter preferences).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" /> 2. Data Processing & Third-Party Storage
            </h2>
            <p>
              Your data is processed securely via encrypted PostgreSQL databases (Supabase Infrastructure) protected by Row Level Security (RLS) policies. We do NOT sell, rent, trade, or share user data with third-party data brokers or marketing SDKs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" /> 3. Cookie Policy & Consent Controls
            </h2>
            <p>
              We use essential cookies strictly required for website functionality (e.g. storing your theme preference and search state). Our cookie consent banner operates with total transparency — no dark patterns, deceptive button hierarchies, or pre-checked consent boxes are used.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-400" /> 4. Data Retention & Deletion Requests
            </h2>
            <p>
              We retain contact messages for up to 12 months for customer service purposes. You hold the right to inspect, update, or request permanent deletion of your data at any time.
            </p>
            <div className="pt-2">
              <Link
                href="/data-deletion"
                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                Submit Formal Data Deletion Request →
              </Link>
            </div>
          </section>

          <section className="space-y-2 pt-2 border-t border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" /> 5. Contact Privacy Officer
            </h2>
            <p>
              For privacy inquiries, contact our Data Privacy Officer at <a href="mailto:support@vibecoding.hub" className="text-blue-400 hover:underline">support@vibecoding.hub</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
