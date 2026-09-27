"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { getStoredResources } from "@/lib/store/hub-store";
import { Resource } from "@/lib/types";
import {
  Sparkles,
  Terminal,
  Copy,
  Check,
  FileCode,
  ArrowRight,
  Download,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  BookOpen,
  Layout,
  Lock,
  Zap,
} from "lucide-react";

export default function VibeCodingPage() {
  const [vibeResources, setVibeResources] = useState<Resource[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [auditCategory, setAuditCategory] = useState<string>("all");
  const [auditSearchQuery, setAuditSearchQuery] = useState("");
  const [copiedAuditId, setCopiedAuditId] = useState<string | null>(null);

  useEffect(() => {
    const all = getStoredResources();
    setVibeResources(all.filter((r) => r.categoryId === "cat-2" || r.tags.includes("Vibe Coding")));
  }, []);

  const agentTemplates = [
    {
      title: "Production AGENTS.md Context Rule System",
      fileName: "AGENTS.md",
      content: `# Project Context & Architectural Rules
- Technology Stack: Next.js 15 App Router, TypeScript, Tailwind CSS, Supabase PostgreSQL & Storage
- Never swallow exceptions silently; trace root cause and notify user
- Run static typing (tsc) and build verification before declaring completion
- Maintain strict accessibility standards (aria-labels, keyboard focus, color contrast)`,
    },
    {
      title: "PRD & Product Architecture Spec Prompt",
      fileName: "prd-prompt.txt",
      content: `[Role]: Senior Software Architect & Full-Stack Engineer
[Task]: Draft a complete PRD for a Resource Hub with client-side PDF viewer, Zod payload validation, and Supabase RLS policies.
[Verification]: Include ER Diagram, API Endpoints, and Security Audit Steps.`,
    },
  ];

  // MASTER AUDIT CHECKLIST CATEGORIES
  const auditCategories = [
    { id: "all", label: "All 100+ Audit Rules" },
    { id: "visual", label: "Visual Design Anti-Patterns (50 Rules)" },
    { id: "features", label: "Essential Features to Add (39 Rules)" },
    { id: "fixes", label: "Critical UX & Layout Fixes (20 Rules)" },
    { id: "legal", label: "Legal, Privacy & Compliance (20 Safeguards)" },
  ];

  const masterAuditItems = [
    // VISUAL DESIGN ANTI-PATTERNS
    { id: "a-1", category: "visual", title: "1. Harsh Gradients", desc: "Avoid excessive, aggressive purple/blue/orange gradients. Use subtle tonal transitions aligned with brand identity." },
    { id: "a-2", category: "visual", title: "2. Lucide Icons Overload", desc: "Use icons only where they improve comprehension. Avoid putting an icon beside every heading or using decorative icon clutter." },
    { id: "a-3", category: "visual", title: "3. Pure White Background", desc: "Use an intentional surface hierarchy with subtle background differentiation rather than flat pure white throughout." },
    { id: "a-4", category: "visual", title: "4. Rainbow Coloring", desc: "Establish a defined color hierarchy (primary, secondary, accent, success, error) rather than giving every card a different random color." },
    { id: "a-5", category: "visual", title: "5. Drop Shadows Overuse", desc: "Use elevation to communicate depth. Avoid floating-card aesthetics with heavy soft shadows on every element." },
    { id: "a-6", category: "visual", title: "6. Three Feature Cards Layout", desc: "Do not automatically use 3 cards in a row. Select layouts based on actual content (timelines, comparison tables, workflows, diagrams)." },
    { id: "a-7", category: "visual", title: "7. Emojis in Professional UI", desc: "Avoid unnecessary emojis in professional headings unless part of the brand visual language." },
    { id: "a-8", category: "visual", title: "8. Liquid Glass / Glassmorphism", desc: "Avoid translucent transparent layers over busy backgrounds. Ensure text contrast and readability." },
    { id: "a-9", category: "visual", title: "9. Em Dashes Copy Pattern", desc: "Write naturally and avoid formulaic AI sentence structures ('X — Y')." },
    { id: "a-10", category: "visual", title: "10. Inter / Geist Font Defaults", desc: "Typography should be brand-specific with defined weights, line heights, and letter spacing across mobile and desktop." },
    { id: "a-11", category: "visual", title: "11. Colored Left Stripe on Cards", desc: "Avoid decorative left borders unless communicating specific status states." },
    { id: "a-12", category: "visual", title: "12. Fake Testimonials", desc: "Never fabricate customer reviews, job titles, ratings, or company logos." },
    { id: "a-13", category: "visual", title: "13. Bento Grids", desc: "Use bento grid layouts only when information architecture supports it, not merely as a trend." },
    { id: "a-14", category: "visual", title: "14. Fake Terminal Windows", desc: "Only display code/terminal interfaces when showing real code examples with syntax explanations." },
    { id: "a-15", category: "visual", title: "15. 'It's Not X, It's Y' Copy", desc: "Avoid repetitive marketing positioning formulas. Explain concrete benefits and use cases." },
    { id: "a-16", category: "visual", title: "16. Checkmark Bullets Overuse", desc: "Use standard bullets, numbered lists, or diagrams instead of checkmarks on every item." },
    { id: "a-17", category: "visual", title: "17. Three Pricing Tiers", desc: "Pricing should reflect the actual business model rather than standard 3-card templates." },
    { id: "a-18", category: "visual", title: "18. No Real Product Demos", desc: "Demonstrate real product capabilities via screenshots, videos, interactive workflows, or live sandbox features." },
    { id: "a-19", category: "visual", title: "19. Soft Corner Radius Overuse", desc: "Establish a clear border radius scale. Buttons, inputs, and cards do not all need identical extreme pill rounding." },
    { id: "a-20", category: "visual", title: "20. Purple and Black Palette", desc: "Avoid copying common AI landing page aesthetics without business/design justification." },
    { id: "a-21", category: "visual", title: "21. No Skeleton Loaders", desc: "Implement skeleton loaders for dynamic content to prevent layout shifts and blank screens." },
    { id: "a-22", category: "visual", title: "22. Radial Orbs & Blobs", desc: "Avoid excessive glowing ambient background circles that distract from content." },
    { id: "a-23", category: "visual", title: "23. Dot Grids", desc: "Grid backgrounds should be subtle and visually justified." },
    { id: "a-24", category: "visual", title: "24. Sparkle Icons", desc: "Avoid adding sparkles to every AI feature; develop product-specific iconography." },
    { id: "a-25", category: "visual", title: "25. Animated Arrows", desc: "Use directional arrows for meaningful navigation, respecting reduced-motion accessibility settings." },

    // APP VIBECODING ANTI-PATTERNS
    { id: "a-26", category: "visual", title: "26. Untouched shadcn Components", desc: "Customize default component styles (colors, radius, spacing, shadows) so components feel like one brand." },
    { id: "a-27", category: "visual", title: "27. Sections Fading In on Scroll", desc: "Animate selectively. Avoid repetitive fade-up effects on every section." },
    { id: "a-28", category: "visual", title: "28. Low-Contrast Dark Mode", desc: "Dark mode must maintain WCAG contrast ratios. Avoid dark gray text on slightly lighter gray cards." },
    { id: "a-29", category: "visual", title: "29. Inconsistent Spacing System", desc: "Establish fixed spacing scale tokens for padding, gaps, margins, and grid gutters." },

    // FEATURES TO ADD
    { id: "a-30", category: "features", title: "30. Internal Links Structure", desc: "Link related pages, products, FAQs, and resources with descriptive anchor text." },
    { id: "a-31", category: "features", title: "31. Branded Custom 404 Page", desc: "Provide helpful recovery actions, search input, and homepage navigation on missing page errors." },
    { id: "a-32", category: "features", title: "32. Breadcrumbs Navigation", desc: "Include hierarchical breadcrumbs (Home > Placement > DSA) for deep pages." },
    { id: "a-33", category: "features", title: "33. Primary CTA Above the Fold", desc: "Ensure clear primary action is visible without excessive scrolling." },
    { id: "a-34", category: "features", title: "34. RLS & Endpoint Authorization", desc: "Enforce Row Level Security (RLS) and server-side authorization at the database layer." },
    { id: "a-35", category: "features", title: "35. Technical & On-Page SEO", desc: "Implement unique page titles, meta descriptions, canonical URLs, sitemaps, and structured data." },

    // THINGS TO ADD RIGHT NOW
    { id: "a-36", category: "features", title: "36. Dark Mode & Theme Toggle", desc: "Provide persistent theme switching with system preference auto-detection." },
    { id: "a-37", category: "features", title: "37. Global Site Search", desc: "Provide instant search with autocomplete, empty states, and keyboard navigation." },
    { id: "a-38", category: "features", title: "38. Mobile Menu & Focus Traps", desc: "Dedicated mobile navigation with touch targets and keyboard trap prevention." },
    { id: "a-39", category: "features", title: "39. Skip to Main Content Link", desc: "Provide accessibility skip link for keyboard users to bypass header navigation." },

    // CRITICAL FIXES
    { id: "a-40", category: "fixes", title: "40. Remove Horizontal Scrolling", desc: "Audit 320px to 4K screen widths. Fix overflowing images, tables, code blocks, or fixed containers." },
    { id: "a-41", category: "fixes", title: "41. Audit & Fix Broken Links", desc: "Remove dead 404 links across navigation, footer, buttons, email mailto, and phone tel links." },
    { id: "a-42", category: "fixes", title: "42. Compress & Optimize Images", desc: "Use WebP/AVIF formats, responsive srcset images, and lazy loading." },
    { id: "a-43", category: "fixes", title: "43. Remove Placeholder Text", desc: "Purge all 'Lorem Ipsum', 'Coming Soon', or developer draft copy." },
    { id: "a-44", category: "fixes", title: "44. Interactive Logo, Email & Phone Links", desc: "Make site logo link to '/', phone numbers use 'tel:', and emails use 'mailto:'." },

    // LEGAL & SECURITY SAFEGUARDS
    { id: "a-45", category: "legal", title: "45. Privacy Policy & Data Disclosures", desc: "Clearly state data collection, processing, third-party sharing, retention, and user privacy rights." },
    { id: "a-46", category: "legal", title: "46. Terms of Service & Acceptable Use", desc: "Define service rules, intellectual property, account responsibilities, and termination provisions." },
    { id: "a-47", category: "legal", title: "47. Cookie Policy & Consent Banner", desc: "Implement cookie consent controls without deceptive dark patterns or pre-checked preferences." },
    { id: "a-48", category: "legal", title: "48. Data Minimization & Third-Party Audit", desc: "Ask only for necessary personal data and audit third-party tracking SDKs." },
    { id: "a-49", category: "legal", title: "49. WCAG Accessibility & Keyboard Focus", desc: "Ensure full keyboard tab navigation, focus indicators, alt text, and non-mouse usability." },
    { id: "a-50", category: "legal", title: "50. Data Deletion Request Workflow", desc: "Provide explicit mechanism for users to request deletion of their account and personal data." },
  ];

  const handleCopyTemplate = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAuditItem = (title: string, desc: string, id: string) => {
    navigator.clipboard.writeText(`[AUDIT CHECKLIST ITEM]: ${title}\n[REQUIREMENT]: ${desc}`);
    setCopiedAuditId(id);
    setTimeout(() => setCopiedAuditId(null), 2000);
  };

  const filteredAuditItems = masterAuditItems.filter((item) => {
    if (auditCategory !== "all" && item.category !== auditCategory) return false;
    if (auditSearchQuery.trim()) {
      const q = auditSearchQuery.toLowerCase();
      if (!item.title.toLowerCase().includes(q) && !item.desc.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-purple-600 selection:text-white">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* TOP HERO */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3 shadow-sm shadow-purple-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vibe Coding & AI Software Engineering Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            AI-Assisted Coding & Vibe-Coded App Audit
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Master Claude 3.5 Sonnet, Cursor IDE, rules.md context schemas, and our master **100+ Point VibeCoded Website Audit Checklist** to build production-grade software.
          </p>
        </div>

        {/* PROMPT & RULE TEMPLATES GRID */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-purple-400" /> Essential Vibe-Coding Context Rules & Prompts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agentTemplates.map((tpl, idx) => (
              <div key={idx} className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl relative">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-purple-400" />
                    <span className="font-bold text-white">{tpl.title}</span>
                  </div>
                  <button
                    onClick={() => handleCopyTemplate(tpl.content, idx)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-xs font-medium"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedIndex === idx ? "Copied" : "Copy Prompt"}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-purple-200/90 whitespace-pre-wrap">
                  {tpl.content}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* MASTER AUDIT CHECKLIST SECTION */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Master VibeCoded Website / App Audit</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">100+ Point Quality Control & Anti-Pattern Audit</h2>
              <p className="text-xs text-slate-400 mt-1">
                Full expanded checklist covering Visual Design, Typography, UX Fixes, Security/RLS, Accessibility, SEO, and Legal Compliance.
              </p>
            </div>

            <Link
              href="/resources/vibecoded-website-app-audit-master-checklist"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 flex items-center gap-2 transition-all self-start md:self-auto"
            >
              <Eye className="w-4 h-4" /> Open Full Master Document
            </Link>
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search audit rules by keyword (e.g. gradients, shadows, RLS, contrast, 404)..."
                value={auditSearchQuery}
                onChange={(e) => setAuditSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <select
              value={auditCategory}
              onChange={(e) => setAuditCategory(e.target.value)}
              className="px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
            >
              {auditCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* CHECKLIST ITEMS LIST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAuditItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-colors flex items-start justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>

                <button
                  onClick={() => handleCopyAuditItem(item.title, item.desc, item.id)}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white shrink-0 text-xs"
                  title="Copy Rule to Clipboard"
                >
                  {copiedAuditId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* VIBE CODING MATERIALS CATALOG */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Vibe Coding Guides, PRD Specs & PDFs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vibeResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
