"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-16 w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-white mb-2">Get in Touch</h1>
          <p className="text-xs sm:text-sm text-slate-400">Have questions about resources or need platform support? Send us a message.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 text-xs text-slate-300">
            <h3 className="text-base font-bold text-white mb-4">Contact Information</h3>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>support@vibecoding.hub</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-purple-400" />
              <span>+1 (800) 555-VIBE</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>San Francisco, CA & Global Remote</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Message Sent Successfully</h3>
                <p className="text-xs text-slate-400">Thank you for reaching out! Our support team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Your Name</label>
                  <input required type="text" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
                  <input required type="email" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Message</label>
                  <textarea required rows={4} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" placeholder="How can we help you?" />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
