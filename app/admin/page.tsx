"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Eye,
  PlusCircle,
  FolderTree,
  HelpCircle,
  Map,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Trash2,
  Edit,
  Layers,
} from "lucide-react";
import {
  getStoredResources,
  getStoredCategories,
  getStoredQuestions,
  getStoredAuditLogs,
} from "@/lib/store/hub-store";
import { Resource, Category, QuestionItem, AuditLog } from "@/lib/types";

export default function AdminDashboardPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    setResources(getStoredResources());
    setCategories(getStoredCategories());
    setQuestions(getStoredQuestions());
    setAuditLogs(getStoredAuditLogs());
  }, []);

  const totalPDFs = resources.filter((r) => r.type === "pdf").length;
  const totalDocs = resources.filter((r) => r.type === "document" || r.type === "notes").length;
  const totalViews = resources.reduce((acc, curr) => acc + (curr.viewCount || 0), 0);
  const totalDownloads = resources.reduce((acc, curr) => acc + (curr.downloadCount || 0), 0);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-xs text-slate-400">Live content management metrics and website CMS controls.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/resources/new"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-1.5 transition-all"
          >
            <PlusCircle className="w-4 h-4" /> Upload / Add Resource
          </Link>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2 text-slate-400">
            <span className="text-xs font-medium">Total Resources</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{resources.length}</div>
          <div className="text-[10px] text-slate-500 mt-1">{totalPDFs} PDFs • {totalDocs} Documents</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2 text-slate-400">
            <span className="text-xs font-medium">Categories</span>
            <FolderTree className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">{categories.length}</div>
          <div className="text-[10px] text-slate-500 mt-1">CMS Driven Taxonomy</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2 text-slate-400">
            <span className="text-xs font-medium">Question Bank</span>
            <HelpCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{questions.length}</div>
          <div className="text-[10px] text-slate-500 mt-1">Practice Q&As</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2 text-slate-400">
            <span className="text-xs font-medium">Downloads & Views</span>
            <Download className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalDownloads}</div>
          <div className="text-[10px] text-slate-500 mt-1">{totalViews} Total Views</div>
        </div>
      </div>

      {/* RECENT UPLOADS TABLE */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Recent Resources & Uploads</h3>
          <Link href="/admin/resources" className="text-xs font-semibold text-blue-400 hover:underline">
            Manage All ({resources.length}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
              <tr>
                <th className="pb-3">Title & Category</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Views / Downloads</th>
                <th className="pb-3">Created</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {resources.slice(0, 5).map((res) => (
                <tr key={res.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="font-bold text-white line-clamp-1">{res.title}</div>
                    <div className="text-[11px] text-slate-400">{res.categoryName}</div>
                  </td>
                  <td className="py-3.5 capitalize font-mono text-[11px]">{res.type}</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {res.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-400">
                    {res.viewCount} / {res.downloadCount}
                  </td>
                  <td className="py-3.5 text-slate-400">{new Date(res.createdAt).toLocaleDateString()}</td>
                  <td className="py-3.5 text-right space-x-2">
                    <Link href={`/resources/${res.slug}`} target="_blank" className="text-blue-400 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
