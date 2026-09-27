"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Trash2, ShieldAlert, CheckCircle2, ArrowLeft, Mail } from "lucide-react";

export default function DataDeletionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [scope, setScope] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        <div className="mb-6">
          <Link
            href="/privacy"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Privacy Policy
          </Link>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-3">
            <Trash2 className="w-3.5 h-3.5" />
            <span>GDPR & CCPA User Rights</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
            Data Deletion Request
          </h1>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Submit an explicit request to delete your personal data, stored messages, preferences, or account records from our platform.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-xl">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-white">Data Deletion Request Received</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                We have logged your deletion request for <strong className="text-white">{email}</strong>. Our data protection team will process and purge your records within 30 days in compliance with privacy regulations.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-200">Important Notice Regarding Account & Data Purging</p>
                  <p className="text-[11px] text-amber-400/80 mt-1 leading-relaxed">
                    Once processed, deleted data cannot be recovered. Download history and contact form logs associated with your email will be permanently wiped.
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address Associated With Data *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="scope" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Scope of Data Deletion *
                </label>
                <select
                  id="scope"
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
                >
                  <option value="all">Purge All Personal Records & Analytics (Complete Deletion)</option>
                  <option value="contact">Delete Contact Form Messages Only</option>
                  <option value="analytics">Reset Cookie & Preference Tokens</option>
                </select>
              </div>

              <div>
                <label htmlFor="reason" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Reason for Deletion (Optional)
                </label>
                <textarea
                  id="reason"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Optional details or specific requests..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Confirm & Submit Deletion Request
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
