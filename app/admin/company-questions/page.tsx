"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  getAllStoredCompanies,
  getStoredCompanyResources,
  addStoredResource,
  updateStoredResource,
  deleteStoredResource,
} from "@/lib/store/hub-store";
import { Resource } from "@/lib/types";
import {
  Building2,
  Upload,
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function AdminCompanyQuestionsPage() {
  const allCompanies = useMemo(() => getAllStoredCompanies(), []);
  const [companyResources, setCompanyResources] = useState<Resource[]>(() => getStoredCompanyResources());

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [filterReview, setFilterReview] = useState(false);

  // Bulk Upload Modal / Drawer State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<
    {
      fileName: string;
      fileSize: number;
      suggestedCompany: string;
      suggestedTitle: string;
      jobRole: string;
      difficulty: "beginner" | "intermediate" | "advanced";
      year: string;
      needsReview: boolean;
      fileObject?: File;
    }[]
  >([]);

  // Edit Single Modal State
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  // Refresh list
  const refreshResources = () => {
    setCompanyResources(getStoredCompanyResources());
  };

  // Filtered resources table
  const filteredList = useMemo(() => {
    return companyResources.filter((r) => {
      if (filterReview && !r.needs_review) return false;
      if (selectedCompany !== "all" && r.company_slug !== selectedCompany) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          (r.company_name || "").toLowerCase().includes(q) ||
          (r.original_filename || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [companyResources, searchQuery, selectedCompany, filterReview]);

  // Handle Browser File Selection (Option B: Bulk Upload)
  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    const parsed = files.map((file) => {
      const name = file.name;
      const upper = name.toUpperCase();

      let company = "Needs Review";
      let needsReview = true;

      if (upper.includes("TCS")) { company = "TCS"; needsReview = false; }
      else if (upper.includes("ACCENTURE")) { company = "Accenture"; needsReview = false; }
      else if (upper.includes("INFOSYS")) { company = "Infosys"; needsReview = false; }
      else if (upper.includes("WIPRO")) { company = "Wipro"; needsReview = false; }
      else if (upper.includes("CAPGEMINI")) { company = "Capgemini"; needsReview = false; }
      else if (upper.includes("IBM")) { company = "IBM"; needsReview = false; }
      else if (upper.includes("DELOITTE") || upper.includes("DELLOITE")) { company = "Deloitte"; needsReview = false; }
      else if (upper.includes("AMAZON")) { company = "Amazon"; needsReview = false; }

      const title = name.replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace(/-/g, " ");

      return {
        fileName: name,
        fileSize: file.size,
        suggestedCompany: company,
        suggestedTitle: title,
        jobRole: "Software Engineer / SDE",
        difficulty: "intermediate" as const,
        year: "2026",
        needsReview,
        fileObject: file,
      };
    });

    setUploadedFiles((prev) => [...prev, ...parsed]);
  };

  // Bulk Publish Action
  const handleBulkPublish = () => {
    uploadedFiles.forEach((item, idx) => {
      const compSlug = item.suggestedCompany.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const safeTitle = item.suggestedTitle;
      const slug = `${compSlug}-${Date.now()}-${idx}`;

      const resource: Resource = {
        id: `comp-res-${Date.now()}-${idx}`,
        title: safeTitle,
        slug,
        description: `Company placement preparation resource for ${item.suggestedCompany}. Includes interview questions, coding patterns, and study notes.`,
        type: "pdf",
        categoryId: "cat-1",
        categoryName: "Placement Preparation",
        subcategoryId: "subcat-company-questions",
        subcategoryName: "Company Questions",
        tags: [item.suggestedCompany, item.jobRole, "Placement", "Interview Prep", "PDF"],
        difficulty: item.difficulty,
        isFeatured: false,
        status: "published",
        viewCount: 0,
        downloadCount: 0,
        company_name: item.suggestedCompany,
        company_slug: compSlug,
        job_role: item.jobRole,
        placement_year: item.year,
        original_filename: item.fileName,
        needs_review: item.needsReview,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        file: {
          id: `file-${Date.now()}-${idx}`,
          resourceId: `comp-res-${Date.now()}-${idx}`,
          fileName: item.fileName,
          fileUrl: `/sample-resources/dsa-top-100.pdf`,
          fileSize: item.fileSize,
          mimeType: "application/pdf",
          pageCount: 30,
          createdAt: new Date().toISOString(),
        },
      };

      addStoredResource(resource);
    });

    setUploadedFiles([]);
    setIsUploadModalOpen(false);
    refreshResources();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this company PDF resource?")) {
      deleteStoredResource(id);
      refreshResources();
    }
  };

  const handleToggleStatus = (res: Resource) => {
    const updated: Resource = {
      ...res,
      status: res.status === "published" ? "draft" : "published",
      needs_review: false,
    };
    updateStoredResource(updated);
    refreshResources();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Placement Content Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Company Questions CMS
            </h1>
            <p className="text-xs text-slate-400">
              Control placement PDFs, bulk upload company question banks, assign metadata & companies
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> Bulk Upload PDFs
            </button>
          </div>
        </div>

        {/* OVERVIEW STATS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Companies</div>
            <div className="text-2xl font-black text-white">{allCompanies.length}</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total PDFs Stored</div>
            <div className="text-2xl font-black text-blue-400">{companyResources.length}</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Needs Review</div>
            <div className="text-2xl font-black text-amber-400">
              {companyResources.filter((r) => r.needs_review).length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Published PDFs</div>
            <div className="text-2xl font-black text-emerald-400">
              {companyResources.filter((r) => r.status === "published").length}
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, company..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none"
            >
              <option value="all">All Companies</option>
              {allCompanies.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => setFilterReview(!filterReview)}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                filterReview
                  ? "bg-amber-500/20 border-amber-500 text-amber-300"
                  : "bg-slate-950 border-slate-800 text-slate-400"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Pending Review
            </button>
          </div>
        </div>

        {/* TABLE OF RESOURCES */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3">Company</th>
                  <th className="px-5 py-3">Title & Original File</th>
                  <th className="px-5 py-3">Job Role / Year</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredList.slice(0, 50).map((res) => (
                  <tr key={res.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="font-bold text-white px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        {res.company_name || "N/A"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-white max-w-xs truncate">{res.title}</div>
                      <div className="text-[10px] text-slate-500 truncate">{res.original_filename}</div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-slate-400">
                      <div>{res.job_role || "SDE"}</div>
                      <div className="text-[10px] text-slate-500">{res.placement_year || "2026"}</div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      {res.needs_review ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-semibold flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3" /> Needs Review
                        </span>
                      ) : res.status === "published" ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-semibold w-fit">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => handleToggleStatus(res)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px]"
                      >
                        {res.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                      <Link
                        href={`/resources/${res.slug}/view`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 inline-block"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(res.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 inline-block"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      {/* BULK UPLOAD MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-400" /> Bulk Company PDF Upload Wizard
              </h2>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 border-2 border-dashed border-slate-800 hover:border-blue-500 rounded-2xl bg-slate-950 text-center transition-colors">
              <Upload className="w-10 h-10 text-blue-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-white mb-1">Select or Drag Multiple Company PDFs</p>
              <p className="text-[11px] text-slate-500 mb-4">Support formats: .PDF (Max 50MB per file)</p>
              <label className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer inline-block transition-colors">
                Browse PDF Files
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileDrop}
                  className="hidden"
                />
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300">
                  Import Preview ({uploadedFiles.length} files selected)
                </h3>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-white truncate">{file.fileName}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-2">
                          <span>Company: <strong className="text-blue-400">{file.suggestedCompany}</strong></span>
                          <span>Role: {file.jobRole}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
                        Ready
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                  <button
                    onClick={() => setUploadedFiles([])}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Clear Selection
                  </button>
                  <button
                    onClick={handleBulkPublish}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20"
                  >
                    Confirm & Publish {uploadedFiles.length} PDFs
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
