"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getStoredQuestions } from "@/lib/store/hub-store";
import { QuestionItem } from "@/lib/types";
import { Search, HelpCircle, Copy, Check, ChevronDown, Code, Sparkles, Filter } from "lucide-react";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setQuestions(getStoredQuestions());
  }, []);

  const topics = Array.from(new Set(questions.map((q) => q.topic)));

  const filteredQuestions = questions.filter((q) => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchQ = q.question.toLowerCase().includes(query);
      const matchAns = q.answer.toLowerCase().includes(query);
      const matchTopic = q.topic.toLowerCase().includes(query);
      const matchTags = q.tags.some((t) => t.toLowerCase().includes(query));
      if (!matchQ && !matchAns && !matchTopic && !matchTags) return false;
    }

    if (selectedTopic !== "all" && q.topic !== selectedTopic) return false;

    return true;
  });

  const handleCopyQuestion = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Searchable Important Question Bank</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            High-Frequency Placement & Interview Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Interactive, searchable repository of DBMS, OS, DSA, System Design, and Web Dev interview questions with detailed explanations.
          </p>
        </div>

        {/* CONTROLS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions by topic, keyword, code snippet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none w-full md:w-auto"
            >
              <option value="all">All Topics</option>
              {topics.map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* QUESTIONS LIST */}
        <div className="space-y-4 mb-16">
          {filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id || true; // Show full by default
            return (
              <div
                key={q.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-slate-700 transition-colors shadow-lg"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {q.topic}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700/50 capitalize">
                        {q.difficulty}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">{q.question}</h3>
                  </div>

                  <button
                    onClick={() => handleCopyQuestion(`${q.question}\n\nAnswer:\n${q.answer}`, q.id)}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shrink-0 text-xs flex items-center gap-1"
                    title="Copy Question & Answer"
                  >
                    {copiedId === q.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span className="hidden sm:inline">{copiedId === q.id ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                {/* ANSWER AREA */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="text-xs text-slate-300 leading-relaxed font-sans">
                    <strong className="text-blue-400 block mb-1">Answer:</strong>
                    {q.answer}
                  </div>

                  {q.explanation && (
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
                      <strong className="text-purple-400 block mb-1">Explanation & Key Takeaway:</strong>
                      {q.explanation}
                    </div>
                  )}

                  {q.codeSnippet && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                        <span>Code Snippet ({q.codeLanguage || "code"})</span>
                      </div>
                      <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                        {q.codeSnippet}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
