"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Eye,
  BookOpen,
  Map,
  HelpCircle,
  Layers,
} from "lucide-react";
import { Resource } from "@/lib/types";

interface ResourceCardProps {
  resource: Resource;
  onPreview?: (resource: Resource) => void;
  onDownload?: (resource: Resource) => void;
}

export function ResourceCard({ resource, onPreview, onDownload }: ResourceCardProps) {
  const getTypeBadge = (type: Resource["type"]) => {
    switch (type) {
      case "pdf":
        return { label: "PDF Document", bg: "bg-red-500/10 text-red-400 border-red-500/20", icon: FileText };
      case "roadmap":
        return { label: "Roadmap", bg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", icon: Map };
      case "question_bank":
        return { label: "Question Bank", bg: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: HelpCircle };
      case "document":
      default:
        return { label: "Document / Notes", bg: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: BookOpen };
    }
  };

  const typeInfo = getTypeBadge(resource.type);
  const TypeIcon = typeInfo.icon;

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDownload) {
      onDownload(resource);
    } else {
      window.open(resource.file?.fileUrl || resource.externalUrl || `#`, "_blank");
    }
  };

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 flex flex-col justify-between transition-colors">
      <div>
        {/* TOP BADGES */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold border ${typeInfo.bg}`}>
            <TypeIcon className="w-3 h-3" />
            {typeInfo.label}
          </span>
          {resource.isFeatured && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              ★ Featured
            </span>
          )}
        </div>

        {/* THUMBNAIL / PREVIEW BANNER */}
        <Link href={`/resources/${resource.slug}`} className="block relative mb-3 rounded-lg overflow-hidden bg-slate-950 aspect-[16/9] group/img">
          {resource.thumbnailUrl ? (
            <img
              src={resource.thumbnailUrl}
              alt={resource.title}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-950 text-slate-500">
              <TypeIcon className="w-8 h-8 text-slate-600 mb-1" />
              <span className="text-[10px] font-medium text-slate-400">{resource.categoryName || "Resource"}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs font-semibold flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> Preview
            </span>
          </div>
        </Link>

        {/* TITLE & DESCRIPTION */}
        <Link href={`/resources/${resource.slug}`} className="block group hover:text-blue-400 transition-colors">
          <h3 className="text-sm font-bold text-slate-100 line-clamp-2 leading-snug mb-1.5">
            {resource.title}
          </h3>
        </Link>

        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {resource.description}
        </p>

        {/* TAGS */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {resource.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-slate-400 border border-slate-800">
                #{tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="text-[10px] text-slate-500 font-medium self-center">+{resource.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>

      {/* METADATA & FOOTER ACTIONS */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          {resource.file?.pageCount && (
            <span className="flex items-center gap-1" title="Page Count">
              <Layers className="w-3 h-3 text-slate-500" /> {resource.file.pageCount} pages
            </span>
          )}
          {resource.metadata?.fileSizeFormatted && (
            <span className="text-slate-500">{resource.metadata.fileSizeFormatted}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onPreview && (
            <button
              onClick={() => onPreview(resource)}
              className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Quick Preview"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleDownloadClick}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
