"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  getAllStoredCompanies,
  getStoredCompanyResources,
  incrementResourceDownloads,
  incrementResourceViews,
} from "@/lib/store/hub-store";
import { Resource } from "@/lib/types";
import {
  Building2,
  Search,
  Filter,
  FileText,
  Eye,
  Download,
  Calendar,
  Sparkles,
  ArrowRight,
  Layers,
  Briefcase,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function CompanyQuestionsPage() {
  const allCompanies = useMemo(() => getAllStoredCompanies(), []);
  const allCompanyResources = useMemo(() => getStoredCompanyResources(), []);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "downloaded" | "title">("popular");

  // Filtered list of resources
  const filteredResources = useMemo(() => {
    return allCompanyResources.filter((r) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesComp = (r.company_name || "").toLowerCase().includes(q);
        const matchesRole = (r.job_role || "").toLowerCase().includes(q);
        const matchesTag = r.tags.some((t) => t.toLowerCase().includes(q));
        const matchesFilename = (r.original_filename || "").toLowerCase().includes(q);
        if (!matchesTitle && !matchesComp && !matchesRole && !matchesTag && !matchesFilename) {
          return false;
        }
      }

      // Company Filter
      if (selectedCompany !== "all" && r.company_slug !== selectedCompany) {
        return false;
      }

      // Difficulty Filter
      if (selectedDifficulty !== "all" && r.difficulty !== selectedDifficulty) {
        return false;
      }

      // Job Role Filter
      if (selectedRole !== "all" && r.job_role !== selectedRole) {
        return false;
      }

      // Year Filter
      if (selectedYear !== "all" && String(r.placement_year) !== selectedYear) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "popular") return b.viewCount - a.viewCount;
      if (sortBy === "downloaded") return b.downloadCount - a.downloadCount;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [allCompanyResources, searchQuery, selectedCompany, selectedDifficulty, selectedRole, selectedYear, sortBy]);

  // Unique job roles and years for filter dropdowns
  const availableRoles = useMemo(() => {
    const set = new Set<string>();
    allCompanyResources.forEach((r) => {
      if (r.job_role) set.add(r.job_role);
    });
    return Array.from(set);
  }, [allCompanyResources]);

  const handleViewClick = (resource: Resource) => {
    incrementResourceViews(resource.id);
  };

  const handleDownloadClick = (resource: Resource) => {
    incrementResourceDownloads(resource.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Placement", href: "/placement" },
            { label: "Company Questions" },
          ]}
        />

        {/* HERO BANNER */}
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/20 p-8 sm:p-10 mb-10 overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>Company-Specific Placement Question Library</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Company Interview <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Questions & Placement PDFs
              </span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Prepare for company-specific recruitment rounds (TCS, Infosys, Accenture, Amazon, Wipro, Capgemini, IBM, Deloitte) with authentic previous year questions, coding tests, and aptitude question banks.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-white">{allCompanyResources.length}+</span> PDFs Available
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-white">{allCompanies.length}</span> Top Tech Companies
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                100% Free Direct PDF View & Download
              </div>
            </div>
          </div>
        </div>

        {/* COMPANY GRID DISCOVERY */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" /> Discover By Company
              </h2>
              <p className="text-xs text-slate-400">Select a company to view dedicated question sets</p>
            </div>
            <button
              onClick={() => setSelectedCompany("all")}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                selectedCompany === "all"
                  ? "bg-blue-600 text-white border-blue-500"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              All Companies ({allCompanyResources.length})
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {allCompanies.map((company) => {
              const isSelected = selectedCompany === company.slug;
              return (
                <button
                  key={company.id}
                  onClick={() => setSelectedCompany(isSelected ? "all" : company.slug)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10"
                      : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                      {company.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
                      {company.resourceCount} PDFs
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-white truncate">{company.name}</h3>
                  <p className="text-[10px] text-slate-400 mt-1 truncate">
                    {company.jobRoles[0] || "Interview Questions"}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* SEARCH & FILTER BAR */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search input */}
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search company name, title, topic, role (e.g. TCS, Amazon SDE, Aptitude)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              />
            </div>

            {/* Sort selection */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 shrink-0">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="popular">Most Viewed</option>
                <option value="downloaded">Most Downloaded</option>
                <option value="latest">Recently Added</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Secondary Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
            {/* Company Filter */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="all">All Companies</option>
                {allCompanies.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name} ({c.resourceCount})
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Job Role Filter */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Job Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="all">All Job Roles</option>
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCompany("all");
                  setSelectedDifficulty("all");
                  setSelectedRole("all");
                  setSelectedYear("all");
                }}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* RESULTS SUMMARY */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-slate-400">
            Showing <strong className="text-white">{filteredResources.length}</strong> company PDF resources
            {selectedCompany !== "all" && ` for company "${selectedCompany.toUpperCase()}"`}
          </p>
        </div>

        {/* RESOURCE CARDS GRID */}
        {filteredResources.length === 0 ? (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-12 text-center space-y-3">
            <XCircle className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Company PDFs Found</h3>
            <p className="text-xs text-slate-400">Try loosening your search query or filter selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((res) => {
              const fileUrl = res.file?.fileUrl || `/sample-resources/dsa-top-100.pdf`;
              const pageCount = res.file?.pageCount || 25;
              const fileSizeFormatted = res.file?.fileSize
                ? `${(res.file.fileSize / 1024 / 1024).toFixed(2)} MB`
                : "1.20 MB";

              return (
                <div
                  key={res.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-blue-500/5 group"
                >
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs">
                        <Building2 className="w-3 h-3" />
                        {res.company_name || "Company Question"}
                      </span>
                      <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                        {res.difficulty.toUpperCase()}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                      {res.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {res.description}
                    </p>

                    {/* File Meta Info */}
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-purple-400" /> PDF • {pageCount} Pages
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-emerald-400" /> {fileSizeFormatted}
                      </span>
                    </div>

                    {/* Role & Tags */}
                    {res.job_role && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                        <Briefcase className="w-3 h-3 text-amber-400" />
                        <span className="truncate">{res.job_role}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2">
                    <Link
                      href={`/resources/${res.slug}/view`}
                      onClick={() => handleViewClick(res)}
                      className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" /> View PDF
                    </Link>
                    <a
                      href={fileUrl}
                      download={res.file?.fileName || `${res.slug}.pdf`}
                      onClick={() => handleDownloadClick(res)}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" /> Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
