"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { getStoredResources, incrementResourceViews, incrementResourceDownloads } from "@/lib/store/hub-store";
import { Resource } from "@/lib/types";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Layers,
  ArrowLeft,
  Share2,
  Bookmark,
  Check,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  ShieldCheck,
  Copy,
} from "lucide-react";

export default function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [resource, setResource] = useState<Resource | null>(null);
  const [relatedResources, setRelatedResources] = useState<Resource[]>([]);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const allResources = getStoredResources();
    const found = allResources.find((r) => r.slug === resolvedParams.slug);
    if (found) {
      setResource(found);
      incrementResourceViews(found.id);

      // Related
      const related = allResources.filter(
        (r) => r.id !== found.id && (r.categoryId === found.categoryId || r.type === found.type)
      ).slice(0, 3);
      setRelatedResources(related);
    }
  }, [resolvedParams.slug]);

  if (!resource) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Resource Not Found</h2>
          <p className="text-xs text-slate-400 mb-6">The requested resource could not be located in our platform catalog.</p>
          <Link href="/resources" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold">
            Back to Library
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleDownload = () => {
    incrementResourceDownloads(resource.id);
    const url = resource.file?.fileUrl || resource.externalUrl || "#";
    window.open(url, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* BREADCRUMB */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Resources Catalog
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition-colors ${
                bookmarked ? "bg-amber-500/20 border-amber-500/40 text-amber-400" : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" /> {bookmarked ? "Saved" : "Save"}
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? "Link Copied" : "Share"}
            </button>
          </div>
        </div>

        {/* HEADER HERO BANNER */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {resource.categoryName || "Resource"}
            </span>
            {resource.subcategoryName && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/50">
                {resource.subcategoryName}
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">
              {resource.type}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            {resource.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed mb-6">
            {resource.description}
          </p>

          {/* METADATA BAR */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
            {resource.file?.pageCount && (
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-slate-500" /> {resource.file.pageCount} Pages
              </span>
            )}
            {resource.metadata?.fileSizeFormatted && (
              <span>Size: {resource.metadata.fileSizeFormatted}</span>
            )}
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-slate-500" /> {resource.viewCount} Views
            </span>
            <span className="flex items-center gap-1.5">
              <Download className="w-4 h-4 text-slate-500" /> {resource.downloadCount} Downloads
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500" /> Uploaded {new Date(resource.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* PRIMARY DOWNLOAD CTA */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleDownload}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Complete Resource PDF
            </button>
          </div>
        </div>

        {/* CONTENT & PREVIEW CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* MAIN PREVIEW / READ AREA (2 COLS) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" /> Document Reader & Content Preview
                </h3>

                {resource.type === "pdf" && (
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => setZoomLevel(Math.max(60, zoomLevel - 20))}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono">{zoomLevel}%</span>
                    <button
                      onClick={() => setZoomLevel(Math.min(140, zoomLevel + 20))}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {resource.type === "pdf" ? (
                <div className="w-full flex flex-col items-center overflow-x-auto">
                  {resource.file?.fileUrl ? (
                    <iframe
                      src={`${resource.file.fileUrl}#toolbar=0`}
                      className="w-full h-[600px] rounded-xl border border-slate-800 bg-white"
                      style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
                      title="Document Reader"
                    />
                  ) : (
                    <div className="w-full p-8 rounded-xl bg-slate-950 text-center space-y-4">
                      <p className="text-xs text-slate-400">PDF Reader initialized for preview.</p>
                      {resource.content && (
                        <div className="p-4 rounded-xl bg-slate-900 text-left font-mono text-xs whitespace-pre-wrap text-slate-200 border border-slate-800">
                          {resource.content}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="prose prose-invert max-w-none text-xs leading-relaxed font-mono whitespace-pre-wrap text-slate-200 bg-slate-950 p-6 rounded-xl border border-slate-800">
                  {resource.content || resource.description}
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR METADATA & SPECS */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
              <h4 className="text-sm font-bold text-white pb-3 border-b border-slate-800">Resource Specifications</h4>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Resource Type</span>
                  <span className="text-white font-medium capitalize">{resource.type}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Difficulty</span>
                  <span className="text-amber-400 font-medium capitalize">{resource.difficulty}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Author / Source</span>
                  <span className="text-white font-medium">{resource.authorSource || "VibeCoding Hub"}</span>
                </div>
              </div>

              {resource.tags && resource.tags.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-300 block mb-2">Technologies & Tags:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {resource.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md text-[10px] bg-slate-800 text-slate-300 border border-slate-700/50">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RELATED RESOURCES */}
        {relatedResources.length > 0 && (
          <div className="pt-8 border-t border-slate-800/80 mb-12">
            <h3 className="text-xl font-bold text-white mb-6">Related Resources in {resource.categoryName}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedResources.map((res) => (
                <ResourceCard key={res.id} resource={res} onDownload={handleDownload} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
