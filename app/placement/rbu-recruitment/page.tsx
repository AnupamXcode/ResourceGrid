"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  Building2,
  Calendar,
  Briefcase,
  GraduationCap,
  FileText,
  ExternalLink,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface RecruitmentDrive {
  id: string;
  companyName: string;
  jobRole: string;
  eligibility: string;
  branch: string[];
  cgpaRequirement: string;
  backlogAllowed: string;
  packageDetails: string;
  location: string;
  applicationDeadline: string;
  selectionRounds: string[];
  jobDescription: string;
  status: "active" | "upcoming" | "previous";
  year: string;
  pdfUrl?: string;
  externalApplyUrl?: string;
}

const INITIAL_RECRUITMENT_DRIVES: RecruitmentDrive[] = [
  {
    id: "rbu-1",
    companyName: "Accolite / Bounteous",
    jobRole: "Software Engineer / Product Developer",
    eligibility: "B.Tech CSE / IT / ECE (2025 & 2026 Batch)",
    branch: ["CSE", "IT", "ECE"],
    cgpaRequirement: "7.0 CGPA & above",
    backlogAllowed: "No active backlogs",
    packageDetails: "8.0 LPA - 10.5 LPA",
    location: "Hyderabad / Bangalore / Remote",
    applicationDeadline: "October 15, 2026",
    selectionRounds: ["Online Coding Test", "Technical Interview Round 1", "Technical Interview Round 2", "HR Round"],
    jobDescription: "Off-campus & campus recruitment drive for entry-level Software Engineers. Focus on DSA, Problem Solving, OOPS, and Web Fundamentals.",
    status: "active",
    year: "2026",
    pdfUrl: "/sample-resources/dsa-top-100.pdf",
    externalApplyUrl: "https://recruitment.bounteous.com",
  },
  {
    id: "rbu-2",
    companyName: "Darwinbox",
    jobRole: "Member of Technical Staff (MTS)",
    eligibility: "B.Tech / M.Tech All Tech Branches",
    branch: ["CSE", "IT"],
    cgpaRequirement: "7.5 CGPA & above",
    backlogAllowed: "Max 1 backlog allowed",
    packageDetails: "12.0 LPA - 16.0 LPA",
    location: "Hyderabad / Gurgaon",
    applicationDeadline: "October 20, 2026",
    selectionRounds: ["Aptitude & CS MCQ", "Machine Coding Round", "System Design & DSA", "Culture Fit Round"],
    jobDescription: "Hiring for core backend and full-stack cloud products. Strong knowledge of Data Structures, SQL, and APIs required.",
    status: "active",
    year: "2026",
    pdfUrl: "/sample-resources/dsa-top-100.pdf",
  },
  {
    id: "rbu-3",
    companyName: "Schneider Electric",
    jobRole: "Graduate Engineer Trainee (GET)",
    eligibility: "B.Tech CSE / EEE / ECE",
    branch: ["CSE", "EEE", "ECE"],
    cgpaRequirement: "6.5 CGPA & above",
    backlogAllowed: "No active backlogs",
    packageDetails: "6.5 LPA",
    location: "Bangalore / Pune",
    applicationDeadline: "November 5, 2026",
    selectionRounds: ["Aptitude & Technical Test", "Group Discussion", "Technical & HR Interview"],
    jobDescription: "Hiring for Smart Grid Energy Management software tools and IoT embedded systems division.",
    status: "upcoming",
    year: "2026",
    pdfUrl: "/sample-resources/dsa-top-100.pdf",
  },
  {
    id: "rbu-4",
    companyName: "PubMatic",
    jobRole: "Software Engineer Trainee",
    eligibility: "B.Tech CSE / IT (2025 Batch)",
    branch: ["CSE", "IT"],
    cgpaRequirement: "7.0 CGPA & above",
    backlogAllowed: "No active backlogs",
    packageDetails: "9.5 LPA",
    location: "Pune",
    applicationDeadline: "September 1, 2026",
    selectionRounds: ["Online Coding Test", "Technical Round 1", "Technical Round 2", "HR Interview"],
    jobDescription: "Previous drive completed for digital advertising automation platform. Core focus on Java, C++, and Distributed Systems.",
    status: "previous",
    year: "2025",
    pdfUrl: "/sample-resources/dsa-top-100.pdf",
  },
];

export default function RbuRecruitmentPage() {
  const [drives, setDrives] = useState<RecruitmentDrive[]>(INITIAL_RECRUITMENT_DRIVES);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "active" | "upcoming" | "previous">("all");

  const filteredDrives = useMemo(() => {
    return drives.filter((drive) => {
      if (activeTab !== "all" && drive.status !== activeTab) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          drive.companyName.toLowerCase().includes(q) ||
          drive.jobRole.toLowerCase().includes(q) ||
          drive.eligibility.toLowerCase().includes(q) ||
          drive.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [drives, activeTab, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Placement", href: "/placement" },
            { label: "RBU Recruitment" },
          ]}
        />

        {/* HERO BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/20 p-8 sm:p-10 mb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Campus & Off-Campus Recruitment Drives</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
              RBU & Company Recruitment Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Track active, upcoming, and past recruitment drives, eligibility criteria, CTC package details, selection processes, and official hiring workflow documents.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-white">{drives.filter((d) => d.status === "active").length}</span> Active Drives Open
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white">{drives.filter((d) => d.status === "upcoming").length}</span> Upcoming Drives
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                Updated Daily from Placement Cell
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH & STATUS TABS */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {(["all", "active", "upcoming", "previous"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                }`}
              >
                {tab === "all" ? `All Drives (${drives.length})` : `${tab} Drives`}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company, role, eligibility..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        {/* RECRUITMENT DRIVES LIST */}
        <div className="space-y-6">
          {filteredDrives.map((drive) => (
            <div
              key={drive.id}
              className="rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 sm:p-8 transition-all shadow-xl space-y-6"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-base flex items-center justify-center shrink-0">
                    {drive.companyName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-white">{drive.companyName}</h2>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          drive.status === "active"
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                            : drive.status === "upcoming"
                            ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {drive.status}
                      </span>
                    </div>
                    <p className="text-xs text-blue-400 font-semibold">{drive.jobRole}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-lg font-black text-emerald-400">{drive.packageDetails}</div>
                  <div className="text-[11px] text-slate-400 flex items-center sm:justify-end gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> Deadline: {drive.applicationDeadline}
                  </div>
                </div>
              </div>

              {/* Grid Metadata Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Eligibility Criteria</span>
                  <span className="font-semibold text-slate-200">{drive.eligibility}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">CGPA & Backlogs</span>
                  <span className="font-semibold text-slate-200">{drive.cgpaRequirement} • {drive.backlogAllowed}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Job Location</span>
                  <span className="font-semibold text-slate-200">{drive.location}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Target Batch / Year</span>
                  <span className="font-semibold text-slate-200">{drive.year} Batch</span>
                </div>
              </div>

              {/* Description & Selection Rounds */}
              <div className="space-y-3 text-xs text-slate-300">
                <p className="leading-relaxed">{drive.jobDescription}</p>
                <div>
                  <span className="font-bold text-white block mb-1">Selection Rounds:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {drive.selectionRounds.map((round, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium text-[11px]">
                        {idx + 1}. {round}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {drive.pdfUrl && (
                  <a
                    href={drive.pdfUrl}
                    download={`${drive.companyName}_Recruitment_Process.pdf`}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" /> Recruitment PDF Document
                  </a>
                )}
                {drive.externalApplyUrl && (
                  <a
                    href={drive.externalApplyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    Apply Now Official Portal <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
