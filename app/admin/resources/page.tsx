"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  PlusCircle,
  Search,
  Trash2,
  Edit,
  Eye,
  Star,
  CheckCircle2,
  XCircle,
  Filter,
  RefreshCw,
} from "lucide-react";
import {
  getStoredResources,
  saveStoredResources,
  addAuditLog,
} from "@/lib/store/hub-store";
import { Resource } from "@/lib/types";

export default function AdminResourcesListPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    setResources(getStoredResources());
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(resources.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleFeatured = (id: string) => {
    const updated = resources.map((r) =>
      r.id === id ? { ...r, isFeatured: !r.isFeatured } : r
    );
    setResources(updated);
    saveStoredResources(updated);
    addAuditLog("Toggled Featured", "Resource", id);
  };

  const toggleStatus = (id: string) => {
    const updated = resources.map((r) =>
      r.id === id ? { ...r, status: (r.status === "published" ? "draft" : "published") as any } : r
    );
    setResources(updated);
    saveStoredResources(updated);
    addAuditLog("Toggled Status", "Resource", id);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      const updated = resources.filter((r) => r.id !== id);
      setResources(updated);
      saveStoredResources(updated);
      setSelectedIds(selectedIds.filter((item) => item !== id));
      addAuditLog("Deleted Resource", "Resource", id);
    }
  };

  // Bulk Actions
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Delete ${selectedIds.length} selected resources?`)) {
      const updated = resources.filter((r) => !selectedIds.includes(r.id));
      setResources(updated);
      saveStoredResources(updated);
      setSelectedIds([]);
      addAuditLog("Bulk Deleted Resources", "Resource", undefined, { count: selectedIds.length });
    }
  };

  const handleBulkPublish = () => {
    if (selectedIds.length === 0) return;
    const updated = resources.map((r) =>
      selectedIds.includes(r.id) ? { ...r, status: "published" as const } : r
    );
    setResources(updated);
    saveStoredResources(updated);
    setSelectedIds([]);
    addAuditLog("Bulk Published Resources", "Resource", undefined, { count: selectedIds.length });
  };

  const filteredResources = resources.filter((r) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!r.title.toLowerCase().includes(q) && !r.categoryName?.toLowerCase().includes(q)) return false;
    }
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Resource Management</h1>
          <p className="text-xs text-slate-400">View, edit, feature, publish, or delete platform materials.</p>
        </div>

        <Link
          href="/admin/resources/new"
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-1.5 self-start"
        >
          <PlusCircle className="w-4 h-4" /> Add / Upload New Resource
        </Link>
      </div>

      {/* CONTROLS & BULK ACTIONS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter resources by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* BULK ACTION BAR */}
        {selectedIds.length > 0 && (
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between text-xs text-blue-400">
            <span>{selectedIds.length} items selected</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkPublish}
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500 font-semibold"
              >
                Bulk Publish
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500 font-semibold"
              >
                Bulk Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TABLE */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
            <tr>
              <th className="pb-3 w-8">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedIds.length === resources.length && resources.length > 0}
                />
              </th>
              <th className="pb-3">Title & Category</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Featured</th>
              <th className="pb-3">Downloads</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredResources.map((res) => (
              <tr key={res.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(res.id)}
                    onChange={() => handleSelectOne(res.id)}
                  />
                </td>
                <td className="py-3 pr-4">
                  <div className="font-bold text-white line-clamp-1">{res.title}</div>
                  <div className="text-[11px] text-slate-400">{res.categoryName}</div>
                </td>
                <td className="py-3 uppercase font-mono text-[11px] text-slate-400">{res.type}</td>
                <td className="py-3">
                  <button
                    onClick={() => toggleStatus(res.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                      res.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {res.status}
                  </button>
                </td>
                <td className="py-3">
                  <button
                    onClick={() => toggleFeatured(res.id)}
                    className={`p-1 rounded ${res.isFeatured ? "text-amber-400" : "text-slate-600 hover:text-slate-400"}`}
                  >
                    ★
                  </button>
                </td>
                <td className="py-3 font-mono text-slate-400">{res.downloadCount}</td>
                <td className="py-3 text-right space-x-2">
                  <Link
                    href={`/resources/${res.slug}`}
                    target="_blank"
                    className="p-1 text-slate-400 hover:text-white inline-block"
                    title="View Resource"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(res.id)}
                    className="p-1 text-red-400 hover:text-red-300 inline-block"
                    title="Delete Resource"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
