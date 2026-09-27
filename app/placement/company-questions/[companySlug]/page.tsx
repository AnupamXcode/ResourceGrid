"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
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
  FileText,
  Eye,
  Download,
  ArrowLeft,
  Briefcase,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function CompanyDetailPage() {
  const params = useParams();
  const companySlug = typeof params.companySlug === "string" ? params.companySlug : "";

  const allCompanies = useMemo(() => getAllStoredCompanies(), []);
  const company = useMemo(() => {
    return allCompanies.find((c) => c.slug === companySlug);
  }, [allCompanies, companySlug]);

  const companyResources = useMemo(() => {
    return getStoredCompanyResources(companySlug);
  }, [companySlug]);

  if (!company && companyResources.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <Navbar />
        <main className="flex-grow max-w-4xl mx-auto px-4 py-20 text-center">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Company Not Found</h1>
          <p className="text-xs text-slate-400 mb-6">No placement questions found for "{companySlug}".</p>
          <Link
            href="/placement/company-questions"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
          >
            Back to Company Questions
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const companyName = company ? company.name : companySlug.toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Placement", href: "/placement" },
            { label: "Company Questions", href: "/placement/company-questions" },
            { label: companyName },
          ]}
        />

        <div className="mb-6">
          <Link
            href="/placement/company-questions"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Companies
          </Link>
        </div>

        {/* COMPANY BANNER */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 mb-10 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-base flex items-center justify-center">
                  {companyName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {companyName} Placement Questions
                  </h1>
                  <p className="text-xs text-slate-400">
                    Official & Previous Year Placement Papers, Coding Round Questions, and Interview Sets
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div className="text-center px-3">
                <div className="text-xl font-black text-blue-400">{companyResources.length}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">PDF Sets</div>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="text-center px-3">
                <div className="text-xl font-black text-purple-400">
                  {company ? company.jobRoles.length : 1}
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Job Roles</div>
              </div>
            </div>
          </div>
        </div>

        {/* RESOURCES LIST */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" /> {companyName} Question PDFs ({companyResources.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {companyResources.map((res) => {
              const fileUrl = res.file?.fileUrl || `/sample-resources/dsa-top-100.pdf`;
              const pageCount = res.file?.pageCount || 30;
              const fileSizeFormatted = res.file?.fileSize
                ? `${(res.file.fileSize / 1024 / 1024).toFixed(2)} MB`
                : "1.50 MB";

              return (
                <div
                  key={res.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-blue-500/5 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs">
                        {res.company_name}
                      </span>
                      <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded-full bg-slate-800">
                        {res.difficulty.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                      {res.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {res.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-purple-400" /> PDF • {pageCount} Pages
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-emerald-400" /> {fileSizeFormatted}
                      </span>
                    </div>

                    {res.job_role && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                        <Briefcase className="w-3 h-3 text-amber-400" />
                        <span className="truncate">{res.job_role}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2">
                    <Link
                      href={`/resources/${res.slug}/view`}
                      onClick={() => incrementResourceViews(res.id)}
                      className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" /> View PDF
                    </Link>
                    <a
                      href={fileUrl}
                      download={res.file?.fileName || `${res.slug}.pdf`}
                      onClick={() => incrementResourceDownloads(res.id)}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" /> Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
