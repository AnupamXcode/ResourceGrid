"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getStoredResources, incrementResourceDownloads } from "@/lib/store/hub-store";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCw,
  FileText,
  Eye,
  Building2,
} from "lucide-react";

export default function DedicatedPdfViewerPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const allResources = useMemo(() => getStoredResources(), []);
  const resource = useMemo(() => {
    return allResources.find((r) => r.slug === slug);
  }, [allResources, slug]);

  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!resource) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <Navbar />
        <main className="flex-grow max-w-4xl mx-auto px-4 py-20 text-center">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">PDF Document Not Found</h1>
          <p className="text-xs text-slate-400 mb-6">The requested PDF resource could not be found or has been moved.</p>
          <Link href="/resources" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold">
            Browse All Resources
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const pdfUrl = resource.file?.fileUrl || resource.metadata?.downloadUrl || "/sample-resources/dsa-top-100.pdf";
  const fileName = resource.file?.fileName || `${resource.slug}.pdf`;
  const pageCount = resource.file?.pageCount || resource.metadata?.pageCount || 25;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 50));
  const handleZoomReset = () => setZoomLevel(100);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    incrementResourceDownloads(resource.id);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-950 text-slate-100 ${isFullscreen ? "fixed inset-0 z-50 overflow-hidden" : ""}`}>
      {!isFullscreen && <Navbar />}

      <main className={`flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isFullscreen ? "py-2 max-w-none h-screen flex flex-col" : "py-6"}`}>
        {!isFullscreen && (
          <>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Resources", href: "/resources" },
                { label: resource.company_name ? "Company Questions" : resource.categoryName || "Resource", href: resource.company_name ? "/placement/company-questions" : "/resources" },
                { label: resource.title },
              ]}
            />

            <div className="mb-4 flex items-center justify-between">
              <Link
                href={`/resources/${resource.slug}`}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Resource Details
              </Link>
            </div>
          </>
        )}

        {/* VIEWER HEADER TOOLBAR */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 sm:p-4 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3 min-w-0">
            {resource.company_name && (
              <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs shrink-0 flex items-center gap-1">
                <Building2 className="w-3 h-3" /> {resource.company_name}
              </span>
            )}
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-white truncate">{resource.title}</h1>
              <p className="text-[11px] text-slate-400 truncate">PDF • {pageCount} Pages</p>
            </div>
          </div>

          {/* VIEWER CONTROLS */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
              <button
                onClick={handleZoomOut}
                title="Zoom Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleZoomReset}
                title="Reset Zoom"
                className="px-2 text-[11px] font-semibold text-slate-300 hover:text-white"
              >
                {zoomLevel}%
              </button>
              <button
                onClick={handleZoomIn}
                title="Zoom In"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Open in New Tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in New Tab"
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Download CTA */}
            <a
              href={pdfUrl}
              download={fileName}
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </a>
          </div>
        </div>

        {/* EMBEDDED PDF CANVAS CONTAINER */}
        <div className={`flex-grow rounded-2xl bg-slate-900 border border-slate-800 p-2 overflow-auto flex items-center justify-center min-h-[600px] ${isFullscreen ? "h-full" : ""}`}>
          <div
            className="w-full h-full min-h-[600px] transition-transform duration-200 origin-top"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            <object
              data={pdfUrl}
              type="application/pdf"
              className="w-full h-full min-h-[600px] rounded-xl border-0"
            >
              <iframe
                src={`${pdfUrl}#toolbar=1`}
                className="w-full h-full min-h-[600px] rounded-xl border-0"
                title={resource.title}
              />
            </object>
          </div>
        </div>
      </main>

      {!isFullscreen && <Footer />}
    </div>
  );
}
