"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { CategoriesSection } from "@/components/landing/CategoriesSection";
import { VibeCodingSpotlight } from "@/components/landing/VibeCodingSpotlight";
import { FaqSection } from "@/components/landing/FaqSection";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ResourcePreviewModal } from "@/components/resources/ResourcePreviewModal";
import {
  getStoredSettings,
  getStoredCategories,
  getStoredResources,
  getStoredQuestions,
  getStoredFAQS,
  incrementResourceViews,
  incrementResourceDownloads,
} from "@/lib/store/hub-store";
import { Resource } from "@/lib/types";
import { ArrowRight, Sparkles, GraduationCap, Download, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const [settings, setSettings] = useState(getStoredSettings());
  const [categories, setCategories] = useState(getStoredCategories());
  const [resources, setResources] = useState(getStoredResources());
  const [faqs, setFaqs] = useState(getStoredFAQS());
  const [selectedPreviewResource, setSelectedPreviewResource] = useState<Resource | null>(null);

  useEffect(() => {
    setSettings(getStoredSettings());
    setCategories(getStoredCategories());
    setResources(getStoredResources());
    setFaqs(getStoredFAQS());
  }, []);

  const featuredResources = resources.filter((r) => r.isFeatured && r.status === "published");
  const recentResources = [...resources]
    .filter((r) => r.status === "published")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  const handlePreview = (res: Resource) => {
    setSelectedPreviewResource(res);
  };

  const handleDownload = (res: Resource) => {
    // Perform download
    const url = res.file?.fileUrl || res.externalUrl || "#";
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <HeroSection settings={settings} />

        {/* RESOURCE CATEGORIES GRID */}
        <CategoriesSection categories={categories} />

        {/* FEATURED RESOURCES SPOTLIGHT */}
        {featuredResources.length > 0 && (
          <section className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
                    ★ Handpicked Top Materials
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                    Featured Resources
                  </h2>
                </div>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Explore All Library
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredResources.slice(0, 3).map((res) => (
                  <ResourceCard
                    key={res.id}
                    resource={res}
                    onPreview={handlePreview}
                    onDownload={handleDownload}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* VIBE CODING & AI SPOTLIGHT */}
        <VibeCodingSpotlight />

        {/* RECENTLY ADDED MATERIALS */}
        <section className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                  Recently Added Resources
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Latest PDFs, placement notes, and DSA questions added to the platform.
                </p>
              </div>
              <Link
                href="/resources?sort=latest"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                View Latest Feed
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentResources.map((res) => (
                <ResourceCard
                  key={res.id}
                  resource={res}
                  onPreview={handlePreview}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <FaqSection faqs={faqs} />

        {/* FINAL CTA BANNER */}
        <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-950 via-slate-950 to-indigo-950 border-b border-slate-800">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Ready to Master Placements & AI Engineering?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Access curated PDFs, placement preparation question banks, Vibe Coding AI prompts, and interactive roadmaps 100% free.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/resources"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
              >
                Explore Resource Catalog
              </Link>
              <Link
                href="/admin"
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-all"
              >
                Access Admin Panel
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* PDF / CONTENT PREVIEW MODAL */}
      <ResourcePreviewModal
        resource={selectedPreviewResource}
        onClose={() => setSelectedPreviewResource(null)}
        onDownload={handleDownload}
      />

      <Footer />
    </div>
  );
}
