"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getStoredQuestions } from "@/lib/store/hub-store";
import { QuestionItem } from "@/lib/types";
import {
  HelpCircle,
  Search,
  CheckCircle2,
  Copy,
  ChevronDown,
  ChevronUp,
  Code,
  Sparkles,
  FileText,
  ExternalLink,
} from "lucide-react";

export default function ImportantQuestionsPage() {
  const allQuestions = useMemo(() => getStoredQuestions(), []);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(allQuestions[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const topicsList = useMemo(() => {
    const set = new Set<string>();
    allQuestions.forEach((q) => {
      if (q.topic) set.add(q.topic);
    });
    return Array.from(set);
  }, [allQuestions]);

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      if (selectedTopic !== "all" && q.topic !== selectedTopic) return false;
      if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const term = searchQuery.toLowerCase();
        return (
          q.question.toLowerCase().includes(term) ||
          q.answer.toLowerCase().includes(term) ||
          q.tags.some((t) => t.toLowerCase().includes(term))
        );
      }
      return true;
    });
  }, [allQuestions, selectedTopic, selectedDifficulty, searchQuery]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Important Questions" },
          ]}
        />

        {/* HERO BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-900/40 via-orange-900/30 to-slate-900 border border-amber-500/20 p-8 sm:p-10 mb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>High-Frequency Interview Question Bank</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
              Important Interview Questions & Answers
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Searchable database of curated tech interview questions across DSA, LeetCode, DBMS, OS, Networks, OOP, SQL, Java, Python, and HR behavior.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white">{allQuestions.length}+</span> Verified Questions
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-orange-400" />
                Code Snippets & Complexity Explanations Included
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions by keyword (e.g. Normalization, HashMap, Two Sum)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none"
              >
                <option value="all">All Topics</option>
                {topicsList.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* QUESTIONS EXPANDABLE ACCORDION LIST */}
        <div className="space-y-4">
          {filteredQuestions.map((qItem, idx) => {
            const isExpanded = expandedId === qItem.id;
            return (
              <div
                key={qItem.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : qItem.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-[11px]">
                        Q{idx + 1}. {qItem.topic}
                      </span>
                      <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded-full bg-slate-800">
                        {qItem.difficulty.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">{qItem.question}</h3>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-950 text-slate-400 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-6 border-t border-slate-800/80 pt-4 space-y-4 text-xs text-slate-300">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 leading-relaxed">
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <span className="font-bold text-emerald-400 uppercase text-[10px]">Answer & Solution</span>
                        <button
                          onClick={() => handleCopy(qItem.answer, qItem.id)}
                          className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                        >
                          <Copy className="w-3 h-3" /> {copiedId === qItem.id ? "Copied!" : "Copy Answer"}
                        </button>
                      </div>
                      <p>{qItem.answer}</p>

                      {qItem.codeSnippet && (
                        <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-blue-300 overflow-x-auto">
                          <pre>{qItem.codeSnippet}</pre>
                        </div>
                      )}
                    </div>

                    {qItem.explanation && (
                      <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">
                        <strong className="text-white block mb-1">Key Takeaway / Explanation:</strong>
                        <p>{qItem.explanation}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {qItem.tags.map((t, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <Link
                        href="/resources"
                        className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        Explore Related Study Material <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
