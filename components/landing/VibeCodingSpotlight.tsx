"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Copy, Check, ArrowRight } from "lucide-react";

export function VibeCodingSpotlight() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const prompts = [
    {
      title: "Context-Aware Agent Architecture Rule (rules.md)",
      type: "rules.md",
      content: `# AI Agent Rules
- Always run static typing and linter checks before completing a task.
- Use Zod schemas for all payload validations.
- Keep UI components accessible with aria-labels and keyboard focus loops.`,
    },
    {
      title: "Full-Stack Feature Specification Prompt",
      type: "Prompt Template",
      content: `[Role]: Senior Full-Stack Engineer
[Task]: Implement client-side PDF preview modal with zoom controls and instant text extraction.
[Validation]: Test PDF file mime types and handle fallback loading state visually.`,
    },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-14 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT TEXT */}
          <div>
            <div className="inline-block px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
              AI Software Engineering
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
              AI-Assisted Engineering Workflows & Specs
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Effective AI development relies on structured PRD documentation, explicit context rules, task schemas, and automated verification loops.
            </p>

            <div className="space-y-2.5 mb-8 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Download ready-to-use <code className="text-blue-300 font-mono">rules.md</code> and <code className="text-blue-300 font-mono">design.md</code> templates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Claude 3.5 Sonnet & Cursor IDE execution prompt libraries</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>PRD & System Architecture guides for student & enterprise projects</span>
              </div>
            </div>

            <div>
              <Link
                href="/vibe-coding"
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors inline-flex items-center gap-1.5"
              >
                Browse Vibe Coding Hub
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* RIGHT PROMPT CODES */}
          <div className="space-y-4">
            {prompts.map((p, idx) => (
              <div key={idx} className="rounded-xl bg-slate-900 border border-slate-800 p-5">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-slate-200">{p.title}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(p.content, idx)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-[11px]"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedIndex === idx ? "Copied" : "Copy"}
                  </button>
                </div>

                <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-200 whitespace-pre-wrap overflow-x-auto">
                  {p.content}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
