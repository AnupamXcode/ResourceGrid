"use client";

import React, { useState } from "react";
import {
  X,
  Download,
  ExternalLink,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import { Resource } from "@/lib/types";

interface ResourcePreviewModalProps {
  resource: Resource | null;
  onClose: () => void;
  onDownload?: (resource: Resource) => void;
}

export function ResourcePreviewModal({ resource, onClose, onDownload }: ResourcePreviewModalProps) {
  const [copied, setCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!resource) return null;

  const handleCopyContent = () => {
    if (resource.content) {
      navigator.clipboard.writeText(resource.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white line-clamp-1">{resource.title}</h3>
              <p className="text-[11px] text-slate-400">{resource.categoryName} • {resource.type.toUpperCase()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onDownload && (
              <button
                onClick={() => onDownload(resource)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PREVIEW TOOLBAR (ZOOM / COPY) */}
        <div className="px-6 py-2 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            {resource.file?.pageCount && (
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-500" /> Page 1 of {resource.file.pageCount}
              </span>
            )}
            {resource.file?.fileSize && (
              <span>Size: {(resource.file.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {resource.type === "pdf" && (
              <>
                <button
                  onClick={() => setZoomLevel(Math.max(50, zoomLevel - 15))}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            {resource.content && (
              <button
                onClick={handleCopyContent}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-[11px]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied Text" : "Copy Text"}
              </button>
            )}
          </div>
        </div>

        {/* PREVIEW BODY */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950/40">
          {resource.type === "pdf" ? (
            <div className="w-full flex flex-col items-center">
              {/* PDF EMBED OR SIMULATED PREVIEW */}
              {resource.file?.fileUrl ? (
                <iframe
                  src={`${resource.file.fileUrl}#toolbar=0`}
                  className="w-full h-[550px] rounded-xl border border-slate-800 bg-white"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
                  title="PDF Document Preview"
                />
              ) : (
                <div className="w-full p-8 rounded-xl border border-slate-800 bg-slate-900 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center font-bold text-xl">
                    PDF
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">{resource.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">{resource.description}</p>
                  </div>
                  {resource.content && (
                    <div className="mt-4 p-4 rounded-lg bg-slate-950 text-left text-xs text-slate-300 font-mono whitespace-pre-wrap max-h-60 overflow-y-auto border border-slate-800">
                      {resource.content}
                    </div>
                  )}
                  <div className="pt-2">
                    <button
                      onClick={() => onDownload && onDownload(resource)}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors inline-flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download Complete PDF ({resource.metadata?.fileSizeFormatted || "2.4 MB"})
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="prose prose-invert max-w-none text-slate-300 text-xs leading-relaxed space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2">{resource.title}</h4>
                <p className="text-slate-400">{resource.description}</p>
              </div>

              {resource.content ? (
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs whitespace-pre-wrap text-slate-200">
                  {resource.content}
                </div>
              ) : (
                <p className="text-slate-500 italic">No text content available for preview.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
