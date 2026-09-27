import {
  Category,
  Resource,
  Company,
  QuestionItem,
  Roadmap,
  SiteSettings,
  NavigationItem,
  FAQ,
  AuditLog,
  FilterState,
} from "@/lib/types";

import importedCompanyResources from "@/lib/data/company-resources-imported.json";

// INITIAL SEED CATEGORIES
export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Placement Preparation",
    slug: "placement",
    description: "Complete placement study materials, aptitude, core CS subjects, DBMS, OS, Networks, SQL & HR prep.",
    icon: "GraduationCap",
    color: "from-blue-500 to-indigo-600",
    sortOrder: 1,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subcategories: [
      { id: "sub-1", categoryId: "cat-1", name: "Aptitude & Reasoning", slug: "aptitude", sortOrder: 1, isVisible: true },
      { id: "sub-2", categoryId: "cat-1", name: "DSA & Problem Solving", slug: "dsa", sortOrder: 2, isVisible: true },
      { id: "sub-3", categoryId: "cat-1", name: "Core CS (DBMS, OS, CN)", slug: "core-cs", sortOrder: 3, isVisible: true },
      { id: "sub-4", categoryId: "cat-1", name: "HR & Technical Interview", slug: "hr-interview", sortOrder: 4, isVisible: true },
      { id: "subcat-company-questions", categoryId: "cat-1", name: "Company Questions", slug: "company-questions", sortOrder: 5, isVisible: true },
    ],
  },
  {
    id: "cat-2",
    name: "Vibe Coding / AI Development",
    slug: "vibe-coding",
    description: "AI-assisted coding workflows, Prompt Engineering rules, Cursor/Claude/Copilot rules.md, PRD & Architecture templates.",
    icon: "Sparkles",
    color: "from-purple-500 to-pink-600",
    sortOrder: 2,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subcategories: [
      { id: "sub-5", categoryId: "cat-2", name: "AI Coding Workflows", slug: "workflows", sortOrder: 1, isVisible: true },
      { id: "sub-6", categoryId: "cat-2", name: "Prompt Engineering & Rules", slug: "prompts-rules", sortOrder: 2, isVisible: true },
      { id: "sub-7", categoryId: "cat-2", name: "PRD & Architecture Guides", slug: "prd-guides", sortOrder: 3, isVisible: true },
    ],
  },
  {
    id: "cat-3",
    name: "Learning Materials",
    slug: "learning",
    description: "Structured notes, cheat sheets, tutorials, and docs for C++, Java, Python, Web Dev, DevOps, and ML.",
    icon: "BookOpen",
    color: "from-emerald-500 to-teal-600",
    sortOrder: 3,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subcategories: [
      { id: "sub-8", categoryId: "cat-3", name: "Languages (C++, Java, Python)", slug: "programming-languages", sortOrder: 1, isVisible: true },
      { id: "sub-9", categoryId: "cat-3", name: "Web Development (React, Next.js)", slug: "web-dev", sortOrder: 2, isVisible: true },
      { id: "sub-10", categoryId: "cat-3", name: "AI / Machine Learning", slug: "ai-ml", sortOrder: 3, isVisible: true },
    ],
  },
  {
    id: "cat-4",
    name: "Important Questions",
    slug: "questions",
    description: "Hand-picked high-frequency interview questions, practice sets, answer keys, and code snippets.",
    icon: "HelpCircle",
    color: "from-amber-500 to-orange-600",
    sortOrder: 4,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subcategories: [
      { id: "sub-11", categoryId: "cat-4", name: "DSA Question Bank", slug: "dsa-bank", sortOrder: 1, isVisible: true },
      { id: "sub-12", categoryId: "cat-4", name: "DBMS & SQL Questions", slug: "sql-bank", sortOrder: 2, isVisible: true },
    ],
  },
  {
    id: "cat-5",
    name: "Roadmaps",
    slug: "roadmaps",
    description: "Step-by-step interactive career roadmaps with prerequisites and direct learning resource links.",
    icon: "Map",
    color: "from-cyan-500 to-blue-600",
    sortOrder: 5,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subcategories: [],
  },
];

// INITIAL SEED RESOURCES
export const INITIAL_RESOURCES: Resource[] = [
  {
    id: "res-vibe-audit-1",
    title: "Complete 7-Image VibeCoded Website & App Audit Master Checklist",
    slug: "vibecoded-website-app-audit-master-checklist",
    description: "Comprehensive 100+ point quality control checklist covering visual design anti-patterns, UX fixes, security/legal compliance, performance, accessibility, and AI coding prompt standards.",
    content: `# COMPLETE TEXT — 7-IMAGE VIBECODED WEBSITE / APP AUDIT

Master quality checklist & specification for turning AI-generated / vibecoded websites into production-ready digital products.

---

# IMAGE 1 — 30 REASONS YOUR SITE LOOKS “VIBECODED”

## 1. Harsh Gradients
Avoid excessive, aggressive gradients that immediately make the website look AI-generated or template-based.
- Do not use gradients everywhere.
- Avoid extremely saturated purple/blue/orange gradients.
- Use gradients only when they have a functional visual purpose.
- Prefer subtle tonal transitions.
- Maintain consistency with the brand color system.

## 2. Lucide Icons
Avoid blindly using Lucide icons everywhere simply because they are available in the component library.
- Use icons only where they improve comprehension.
- Avoid putting an icon beside every heading.
- Avoid decorative icon overload.
- Maintain consistent icon size and stroke weight.

## 3. Pure White Background
A completely pure white background throughout the entire website can make the interface feel flat and generic.
- Use an intentional background system.
- Introduce subtle surface differentiation.
- Separate sections through spacing, surfaces, borders, imagery, or typography instead of excessive cards.

## 4. Rainbow Coloring
Avoid using multiple unrelated bright colors simply to make the interface look visually interesting.
- Establish a defined color hierarchy (primary, secondary, accent, success, warning, error).
- Do not give every card a different color.

## 5. Drop Shadows
Avoid applying large, soft shadows to every element.
- Use shadows to communicate elevation.
- Prefer subtle elevation or borders.

## 6. Three Feature Cards in a Row
The standard Icon -> Heading -> Description repeated three times is a common generic AI-generated website pattern.
- Choose layouts based on actual content (comparison, timelines, workflows, interactive panels).

## 7. Emojis
Avoid unnecessary emojis in professional interfaces.

## 8. Liquid Glass
Avoid automatically applying glassmorphism/liquid-glass styling everywhere.

## 9. Em Dashes
Avoid excessive use of em dashes in marketing copy ("X — Y").

## 10. Inter / Geist / Space Grotesk
Typography should be brand-specific with defined line heights, weights, and letter spacing.

## 11. Colored Left Stripe
Avoid putting a colored vertical stripe on every card as a default design treatment.

## 12. Fake Testimonials
Never fabricate customer testimonials or ratings.

## 13. Bento Grids
Use bento layouts only when the information architecture supports them.

## 14. Terminal Window
Do not add fake terminal/code windows merely to make a technology product look technical.

## 15. “It’s Not X, It’s Y”
Avoid repetitive marketing copy formulas.

## 16. Checkmark Bullets
Do not use checkmark bullets everywhere.

## 17. Three Pricing Tiers
Pricing should reflect the actual business model rather than standard 3-tier defaults.

## 18. No Real Product Demos
Show real product screenshots, videos, or interactive workflows.

## 19. Soft Corner Radius
Define a consistent radius system rather than extreme rounding everywhere.

## 20. Purple and Black
Avoid automatically combining purple and black simply because it is a common AI/SaaS aesthetic.

## 21. No Skeleton Loaders
Applications must provide skeleton loaders for dynamic content.

## 22. Radial Orbs
Avoid decorative glowing circles that distract from content.

## 23. Dot Grids
Use grid patterns only when visually or functionally justified.

## 24. Sparkle Icons
Avoid excessive sparkle icons as a generic AI indicator.

## 25. Animated Arrows
Use arrows for meaningful navigation, not continuous idle movement.

## 26. No Terms of Service
Provide appropriate legal terms and acceptable use rules.

## 27. No Privacy Policy
Clearly state data practices, processing, and retention.

## 28. Hover Animations
Keep hover states purposeful and short.

## 29. Neon Colors
Avoid high-saturation neon dominance.

## 30. Basic Pastel Colors
Use a deliberate brand palette rather than random pastels.

---

# IMAGE 2 — 20 REASONS WHY YOUR APP LOOKS “VIBECODED”
1. Purple-to-Blue Gradient
2. Gradient Hero Text
3. Badge Above the Headline
4. Three Icon Boxes in a Row
5. Emojis in Headings
6. Color Left-Border Cards
7. Glassmorphism Cards
8. Untouched shadcn Components
9. Lucide Icons Everywhere
10. Inter Font Everywhere
11. Space Grotesk + Instrument Serif
12. Serif Italics for Accent Words
13. Em Dashes Everywhere
14. Generic Buzzwords
15. Sections Fading In on Scroll
16. Cursor-Following Line
17. Buttons Fade on Hover
18. Low-Contrast Dark Mode
19. Inconsistent Spacing
20. Grain Texture

---

# IMAGE 3 — 19 THINGS TO ADD TO MAKE YOUR WEBSITE 10× BETTER
1. Internal Links
2. Custom 404 Page
3. Breadcrumbs
4. CTA Above the Fold
5. Five FAQs
6. Thank-You Page
7. Alt Text on Images
8. Real Reviews
9. Unique Page Titles
10. Navigation Bar
11. Site Analytics
12. Team Photo
13. RLS on All Endpoints
14. SEO Optimization
15. Waitlist Page
16. Cookie Consent
17. About Page
18. Contact Page
19. Site Favicon

---

# IMAGE 4 — 20 THINGS TO ADD TO YOUR WEBSITE RIGHT NOW
1. Dark Mode Toggle
2. Simple Cookie Banner
3. Site Search
4. Back-to-Top Button
5. Mobile Menu
6. Loading Animations
7. Hover States
8. Scroll Progress Bar
9. Copy Button
10. Print Stylesheet
11. Sticky Headers
12. Skip to Content
13. Password Visibility Toggle
14. UTM Tracking
15. Form Success State
16. Form Error State
17. Confirmation Modals
18. Last Updated Date
19. Expandable FAQ
20. Floating Contact Button

---

# IMAGE 5 — 20 THINGS TO FIX ON YOUR VIBECODED WEBSITE
1. Remove Horizontal Scrolling
2. Find Broken Links
3. Add a Mobile Menu
4. Add a Favicon
5. Fix Page Titles
6. Add Meta Descriptions
7. Fix Footer Links
8. Add Custom 404 Page
9. Fix Copyright Year
10. Compress Images
11. Fix Broken Buttons
12. Add Success Messages
13. Add Error Messages
14. Remove Placeholder Text
15. Remove Unused Navigation
16. Fix Mobile Overflow
17. Make Logo Clickable
18. Make Phone Clickable
19. Make Email Clickable
20. Make Every Page Mobile Optimized

---

# IMAGE 6 — 20 THINGS TO DO SO YOUR APP DOESN'T GET SUED
1. Add a Privacy Policy
2. Add Terms of Service
3. Add a Refund Policy
4. Add a Cookie Policy
5. Add a Cookie Consent Banner
6. Check Form Consents
7. Don't Collect Unnecessary Data (Data Minimization)
8. Audit Third-Party SDKs
9. Remove Dark Patterns
10. Remove Hidden Fees
11. Remove Fake Reviews
12. Remove Unsupported Claims
13. Add Accessibility Alt Text
14. Fix Color Contrast Ratio
15. Add Keyboard Navigation
16. Add Business Details
17. Get Age Consent If Collecting Kids' Data
18. Add an Unsubscribe Link to Emails
19. License Fonts and Images
20. Add a Data Deletion Request Option

---

# MASTER CONSOLIDATED QUALITY LAYERS
A. Visual Quality — Brand color system, typography scale, responsive layout, restrained motion.
B. UX Quality — Navigation, forms, loading skeletons, error recovery, accessibility.
C. Content Quality — Specific copy, real use cases, authentic reviews, product demos.
D. Technical & Security Quality — SEO, performance, database RLS, authorization, API security.
E. Legal & Trust Quality — Privacy notice, terms, cookie consent, licensing, business verification.
`,
    type: "document",
    categoryId: "cat-2",
    categoryName: "Vibe Coding / AI Development",
    subcategoryId: "sub-6",
    subcategoryName: "Prompt Engineering & Rules",
    tags: ["Vibe Coding", "Audit", "Checklist", "UX", "UI", "Security", "AI Prompts"],
    difficulty: "all_levels",
    authorSource: "VibeCoding Architecture Team",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    isFeatured: true,
    status: "published",
    viewCount: 3410,
    downloadCount: 1890,
    metadata: {
      estimatedReadTime: "35 mins",
      technologies: ["Design Systems", "UX/UI Audit", "Security", "Next.js", "Supabase"],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "res-1",
    title: "Top 100 Data Structures & Algorithms Interview Questions PDF",
    slug: "dsa-top-100-interview-questions",
    description: "Comprehensive question bank covering Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, and System Design with detailed solutions and time complexity breakdowns.",
    content: `# Top 100 Data Structures & Algorithms Interview Questions

This curated guide contains the 100 most asked algorithmic interview questions by top tech companies (FAANG, Unicorns, Product startups).

## Table of Contents
1. Arrays & Hashing (Q1 - Q20)
2. Two Pointers & Sliding Window (Q21 - Q35)
3. Stack & Queue (Q36 - Q45)
4. Binary Search & Trees (Q46 - Q65)
5. Graphs & BFS/DFS (Q66 - Q80)
6. Dynamic Programming & Greedy (Q81 - Q100)

---

### Sample Question 1: Two Sum
**Difficulty:** Easy
**Problem Statement:** Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

\`\`\`python
def twoSum(nums: list[int], target: int) -> list[int]:
    prevMap = {} # val : index
    for i, n in enumerate(nums):
        diff = target - n
        if diff in prevMap:
            return [prevMap[diff], i]
        prevMap[n] = i
    return []
\`\`\`

### Sample Question 2: Longest Substring Without Repeating Characters
**Difficulty:** Medium
**Optimal Solution:** Sliding window approach using a Set or HashMap to keep track of character indices in $O(N)$ time complexity.
`,
    type: "pdf",
    categoryId: "cat-1",
    categoryName: "Placement Preparation",
    subcategoryId: "sub-2",
    subcategoryName: "DSA & Problem Solving",
    tags: ["DSA", "LeetCode", "Placement", "Python", "Java", "Interview Prep"],
    difficulty: "intermediate",
    authorSource: "VibeCoding Engineering Team",
    thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    isFeatured: true,
    status: "published",
    viewCount: 1420,
    downloadCount: 890,
    file: {
      id: "file-1",
      resourceId: "res-1",
      fileName: "Top_100_DSA_Interview_Questions.pdf",
      fileUrl: "/sample-resources/dsa-top-100.pdf",
      fileSize: 2450000,
      mimeType: "application/pdf",
      pageCount: 42,
      createdAt: new Date().toISOString(),
    },
    metadata: {
      pageCount: 42,
      fileSizeFormatted: "2.45 MB",
      estimatedReadTime: "45 mins",
      technologies: ["C++", "Java", "Python", "Algorithms"],
      downloadUrl: "/sample-resources/dsa-top-100.pdf",
    },
    createdAt: "2026-09-20T10:00:00Z",
    updatedAt: "2026-09-25T14:30:00Z",
  },
  {
    id: "res-2",
    title: "Vibe Coding & AI-Assisted Development Master Guide",
    slug: "vibe-coding-ai-assisted-development-guide",
    description: "Complete blueprint for leveraging Claude, Cursor, Copilot, PRDs, rules.md, and structured agent prompts to write production-grade code 10x faster.",
    content: `# Vibe Coding & AI-Assisted Software Development Guide

Welcome to the future of software engineering. **Vibe Coding** is not about lazy coding—it is about elevating your role from a manual syntax writer to an **Architect and AI Orchestrator**.

## 1. Core Principles of Vibe Coding

1. **Context is King:** Always maintain clear project context files (\`rules.md\`, \`design.md\`, \`TaskSlot.md\`).
2. **Modular Spec Prompting:** Break large requirements into single, testable, self-contained implementation prompts.
3. **Automated Verification:** Always instruct the AI to run builds, tests, and lints before declaring a task finished.

## 2. Recommended AI Context Schema (\`rules.md\`)

\`\`\`markdown
# AI Coding Context Rules
- Framework: Next.js App Router (TypeScript)
- Styling: Tailwind CSS (Vanilla CSS variables)
- Validation: Zod schemas for all API payloads
- Error Handling: Never swallow errors silently; log tracebacks and notify user visually
\`\`\`

## 3. High-Efficiency Prompt Template

\`\`\`text
[Task Role]: Senior Full-Stack Engineer
[Context]: We are adding a drag-and-drop PDF upload component in Next.js with client-side thumbnail generation.
[Action]: Create a component 'PdfUploader.tsx' with visual drop zone, progress bar, file type validation (.pdf only, max 50MB), and error callout.
[Verification]: Ensure TypeScript types are strict and accessible keyboard focus state is maintained.
\`\`\`
`,
    type: "document",
    categoryId: "cat-2",
    categoryName: "Vibe Coding / AI Development",
    subcategoryId: "sub-5",
    subcategoryName: "AI Coding Workflows",
    tags: ["Vibe Coding", "AI", "Claude", "Cursor", "Prompt Engineering", "PRD"],
    difficulty: "all_levels",
    authorSource: "Antigravity AI Team",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    isFeatured: true,
    status: "published",
    viewCount: 2840,
    downloadCount: 1240,
    metadata: {
      estimatedReadTime: "20 mins",
      technologies: ["AI Prompts", "Claude 3.5 Sonnet", "Cursor", "Next.js"],
    },
    createdAt: "2026-09-22T08:00:00Z",
    updatedAt: "2026-09-26T11:20:00Z",
  },
  {
    id: "res-3",
    title: "DBMS & SQL Important Placement Notes & Cheat Sheet",
    slug: "dbms-sql-placement-notes-cheat-sheet",
    description: "Comprehensive notes on Normalization (1NF to BCNF), ACID Properties, Transactions, Indexing (B-Tree/Hash), Joins, and 50 SQL Query Problems.",
    content: `# DBMS & SQL Placement Notes & Cheat Sheet

## 1. Normalization Breakdown
- **1NF:** Atomic values, no repeating groups.
- **2NF:** 1NF + No partial dependency (non-prime attributes fully dependent on candidate key).
- **3NF:** 2NF + No transitive dependency ($A \\rightarrow B$ and $B \\rightarrow C$).
- **BCNF:** For every non-trivial functional dependency $X \\rightarrow Y$, $X$ must be a Super Key.

## 2. Top 5 SQL Interview Queries

### Second Highest Salary
\`\`\`sql
SELECT MAX(salary) 
FROM employees 
WHERE salary < (SELECT MAX(salary) FROM employees);
\`\`\`

### Find Duplicate Rows
\`\`\`sql
SELECT email, COUNT(email) 
FROM users 
GROUP BY email 
HAVING COUNT(email) > 1;
\`\`\`
`,
    type: "cheat_sheet",
    categoryId: "cat-1",
    categoryName: "Placement Preparation",
    subcategoryId: "sub-3",
    subcategoryName: "Core CS (DBMS, OS, CN)",
    tags: ["DBMS", "SQL", "Database", "Placement", "Core CS"],
    difficulty: "intermediate",
    authorSource: "Placement Cell Guide",
    thumbnailUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80",
    isFeatured: true,
    status: "published",
    viewCount: 1980,
    downloadCount: 1100,
    file: {
      id: "file-3",
      resourceId: "res-3",
      fileName: "DBMS_SQL_Placement_Notes.pdf",
      fileUrl: "/sample-resources/dbms-sql-cheat-sheet.pdf",
      fileSize: 1850000,
      mimeType: "application/pdf",
      pageCount: 28,
      createdAt: new Date().toISOString(),
    },
    metadata: {
      pageCount: 28,
      fileSizeFormatted: "1.85 MB",
      estimatedReadTime: "30 mins",
      technologies: ["SQL", "PostgreSQL", "MySQL", "DBMS"],
      downloadUrl: "/sample-resources/dbms-sql-cheat-sheet.pdf",
    },
    createdAt: "2026-09-18T12:00:00Z",
    updatedAt: "2026-09-24T16:00:00Z",
  },
  {
    id: "res-4",
    title: "Full-Stack Web Development Roadmap 2026 PDF",
    slug: "full-stack-web-development-roadmap-2026",
    description: "Visual roadmap covering HTML, CSS, JavaScript, React 19, Next.js 15, Node.js, PostgreSQL, Supabase, Tailwind, and Cloud Deployment.",
    content: `# Full-Stack Web Development Roadmap 2026

Follow this step-by-step path to transition from beginner to job-ready Full-Stack Engineer.

## Step 1: Internet & Web Fundamentals
- HTTP/HTTPS, DNS, Browsers, Request-Response Lifecycle
- Semantic HTML5, CSS3, Flexbox, Grid, Responsive Design

## Step 2: Modern JavaScript (ES6+) & TypeScript
- Scope, Closures, Promises, Async/Await, Event Loop
- TypeScript Types, Interfaces, Generics, Utility Types

## Step 3: Frontend Mastery (React & Next.js)
- Components, Hooks (\`useState\`, \`useEffect\`, \`useMemo\`, \`useCallback\`)
- Next.js App Router, Server Components vs Client Components, Server Actions, Middleware

## Step 4: Backend & Database Engineering
- REST APIs & GraphQL
- PostgreSQL, Prisma / Drizzle ORM, Supabase Auth & Storage
- Security: CORS, JWT, XSS, CSRF, Rate Limiting
`,
    type: "roadmap",
    categoryId: "cat-5",
    categoryName: "Roadmaps",
    tags: ["Roadmap", "Web Dev", "React", "Next.js", "Full Stack", "JavaScript"],
    difficulty: "beginner",
    authorSource: "VibeCoding Architect Team",
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
    isFeatured: true,
    status: "published",
    viewCount: 3120,
    downloadCount: 1650,
    file: {
      id: "file-4",
      resourceId: "res-4",
      fileName: "Full_Stack_Roadmap_2026.pdf",
      fileUrl: "/sample-resources/fullstack-roadmap.pdf",
      fileSize: 3100000,
      mimeType: "application/pdf",
      pageCount: 16,
      createdAt: new Date().toISOString(),
    },
    metadata: {
      pageCount: 16,
      fileSizeFormatted: "3.10 MB",
      estimatedReadTime: "15 mins",
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
      downloadUrl: "/sample-resources/fullstack-roadmap.pdf",
    },
    createdAt: "2026-09-15T09:00:00Z",
    updatedAt: "2026-09-26T09:00:00Z",
  },
  {
    id: "res-5",
    title: "Top 50 Java & OOPs Placement Interview Questions",
    slug: "top-50-java-oops-placement-interview-questions",
    description: "Detailed Java question bank explaining JVM vs JRE vs JDK, Multithreading, HashMap internal implementation, Garbage Collection, and SOLID principles.",
    content: `# Top 50 Java & OOPs Interview Questions

## Q1: Difference between JVM, JRE, and JDK?
- **JDK (Java Development Kit):** Software development environment containing compiler (\`javac\`), debugger, tools, and JRE.
- **JRE (Java Runtime Environment):** Implementation of JVM that provides runtime libraries to execute Java applications.
- **JVM (Java Virtual Machine):** Abstract virtual engine that interprets/compiles Java bytecode into native machine instructions.

## Q2: How does HashMap work internally in Java?
HashMap in Java operates on the principle of **Hashing**. It uses an internal array of \`Node<K,V>\` buckets.
1. Computes index using \`hash(key) & (n - 1)\`.
2. Handles collision using **Singly Linked List** (if bucket count < 8) and converts to **Red-Black Tree** (when bucket count >= 8) for $O(\\log N)$ lookup performance.
`,
    type: "question_bank",
    categoryId: "cat-4",
    categoryName: "Important Questions",
    subcategoryId: "sub-11",
    subcategoryName: "DSA Question Bank",
    tags: ["Java", "OOPs", "Placement", "Interview", "Core CS"],
    difficulty: "intermediate",
    authorSource: "Java Tech Lead",
    thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    isFeatured: false,
    status: "published",
    viewCount: 1150,
    downloadCount: 540,
    metadata: {
      estimatedReadTime: "25 mins",
      technologies: ["Java", "OOP", "JVM", "Multithreading"],
    },
    createdAt: "2026-09-19T11:00:00Z",
    updatedAt: "2026-09-24T10:00:00Z",
  },
  ...(importedCompanyResources as unknown as Resource[]),
];

export function getAllStoredCompanies(): Company[] {
  const resources = getStoredResources();
  const companyMap = new Map<
    string,
    {
      id: string;
      name: string;
      slug: string;
      resourceCount: number;
      jobRoles: Set<string>;
      topics: Set<string>;
      years: Set<string | number>;
    }
  >();

  resources.forEach((r) => {
    if (r.company_name && r.company_slug) {
      if (!companyMap.has(r.company_slug)) {
        companyMap.set(r.company_slug, {
          id: `comp-${r.company_slug}`,
          name: r.company_name,
          slug: r.company_slug,
          resourceCount: 0,
          jobRoles: new Set(),
          topics: new Set(),
          years: new Set(),
        });
      }

      const c = companyMap.get(r.company_slug)!;
      c.resourceCount += 1;
      if (r.job_role) c.jobRoles.add(r.job_role);
      r.tags.forEach((t) => c.topics.add(t));
      if (r.placement_year) c.years.add(r.placement_year);
    }
  });

  return Array.from(companyMap.values()).map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    resourceCount: c.resourceCount,
    jobRoles: Array.from(c.jobRoles),
    topics: Array.from(c.topics),
    years: Array.from(c.years),
  }));
}

export function getStoredCompanyResources(companySlug?: string): Resource[] {
  const resources = getStoredResources().filter(
    (r) => r.subcategoryId === "subcat-company-questions" || !!r.company_name
  );
  if (!companySlug) return resources;
  return resources.filter((r) => r.company_slug === companySlug);
}

// INITIAL SEED QUESTIONS
export const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: "q-1",
    question: "What is Normalization in DBMS and why is BCNF stricter than 3NF?",
    answer: "Normalization is the process of organizing relational database data to minimize redundancy and eliminate insertion, update, and deletion anomalies.",
    explanation: "3NF allows functional dependency X -> Y if X is a superkey OR Y is a prime attribute. BCNF tightens this by requiring X to ALWAYS be a superkey for every non-trivial functional dependency X -> Y, eliminating prime attribute dependencies.",
    categoryId: "cat-1",
    categoryName: "Placement Preparation",
    topic: "DBMS & Normalization",
    difficulty: "intermediate",
    tags: ["DBMS", "Normalization", "BCNF", "3NF", "Database"],
    codeSnippet: "-- Functional Dependency Check Example\n-- BCNF Rule: Left-hand side X must always be a Super Key",
    codeLanguage: "sql",
    viewCount: 890,
    createdAt: new Date().toISOString(),
  },
  {
    id: "q-2",
    question: "How does the Event Loop work in JavaScript / Node.js?",
    answer: "The Event Loop monitors the Call Stack and Callback Queues (Microtask Queue for Promises, Macrotask Queue for setTimeout/setInterval/I/O). When the stack is empty, it processes microtasks first before moving to macrotasks.",
    explanation: "Microtasks (Promises, process.nextTick) have higher priority than Macrotasks. Every time the call stack empties, ALL pending microtasks are drained before the next macrotask is executed.",
    categoryId: "cat-3",
    categoryName: "Learning Materials",
    topic: "JavaScript Runtime",
    difficulty: "advanced",
    tags: ["JavaScript", "Event Loop", "Node.js", "Async"],
    codeSnippet: "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');\n// Output order: 1, 4, 3, 2",
    codeLanguage: "javascript",
    viewCount: 1420,
    createdAt: new Date().toISOString(),
  },
  {
    id: "q-3",
    question: "What is the difference between Process and Thread in Operating Systems?",
    answer: "A Process is an independent executing program with its own dedicated memory address space. A Thread is a lightweight execution unit inside a process that shares memory and resources with other threads in the same process.",
    explanation: "Process context switching requires CPU register saving and page table updates (expensive). Thread context switching is faster because virtual memory bindings remain shared.",
    categoryId: "cat-1",
    categoryName: "Placement Preparation",
    topic: "Operating Systems",
    difficulty: "intermediate",
    tags: ["OS", "Threads", "Process", "Concurrency", "Core CS"],
    viewCount: 670,
    createdAt: new Date().toISOString(),
  },
];

// INITIAL SEED ROADMAPS
export const INITIAL_ROADMAPS: Roadmap[] = [
  {
    id: "road-1",
    title: "AI & Machine Learning Engineer Roadmap 2026",
    slug: "ai-machine-learning-engineer-roadmap",
    description: "From Python fundamentals, Math/Linear Algebra to Deep Learning, LLM Fine-tuning, RAG, and Vector DB Deployment.",
    categoryId: "cat-3",
    categoryName: "Learning Materials",
    icon: "Brain",
    difficulty: "intermediate",
    estimatedDuration: "6 Months",
    isFeatured: true,
    status: "published",
    steps: [
      {
        id: "step-1",
        stageNumber: 1,
        title: "Python & Data Science Foundations",
        description: "Master Python 3.12, NumPy array manipulation, Pandas dataframes, Matplotlib/Seaborn visualization.",
        topics: ["Python Syntax", "NumPy Vectorization", "Pandas Data Cleaning", "Scikit-Learn Baselines"],
      },
      {
        id: "step-2",
        stageNumber: 2,
        title: "Mathematics for ML & Statistical Modeling",
        description: "Linear Algebra (Matrix operations, Eigenvalues), Calculus (Gradients, Partial derivatives), Probability & Statistics.",
        topics: ["Linear Algebra", "Multivariate Calculus", "Bayesian Statistics", "Optimization / Gradient Descent"],
      },
      {
        id: "step-3",
        stageNumber: 3,
        title: "Deep Learning & Transformers",
        description: "PyTorch, Neural Networks, CNNs for Vision, RNNs & Transformers for NLP.",
        topics: ["PyTorch", "Backpropagation", "Self-Attention Mechanism", "Transformers (BERT/GPT)"],
      },
      {
        id: "step-4",
        stageNumber: 4,
        title: "Generative AI, RAG & Vector Databases",
        description: "LangChain, LlamaIndex, Pinecone/ChromaDB vector search, Fine-tuning LoRA, vLLM deployment.",
        topics: ["Retrieval-Augmented Generation (RAG)", "Vector Embeddings", "Quantization", "Model Serving"],
      },
    ],
    createdAt: new Date().toISOString(),
  },
];

// INITIAL SITE SETTINGS
export const INITIAL_SETTINGS: SiteSettings = {
  siteName: "VibeCoding Resource Hub",
  logoUrl: "/logo.png",
  heroTitle: "Everything You Need to Learn, Build, Prepare and Get Placed.",
  heroSubtitle: "A centralized digital platform for placement preparation, AI-assisted coding, DSA question banks, computer science fundamentals, roadmaps, and practical resources.",
  heroPrimaryCtaText: "Explore Resources",
  heroPrimaryCtaUrl: "/resources",
  heroSecondaryCtaText: "Browse Placement Prep",
  heroSecondaryCtaUrl: "/placement",
  contactEmail: "support@vibecoding.hub",
  contactPhone: "+1 (800) 555-VIBE",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  twitterUrl: "https://twitter.com",
  footerText: "© 2026 VibeCoding Resource Hub. Built for developers, students, and engineers worldwide.",
  maintenanceMode: false,
  seoDefaults: {
    title: "VibeCoding Resource Hub - Placements, AI Coding, Roadmaps & Study Materials",
    description: "Access curated PDFs, placement preparation notes, DSA question banks, Vibe Coding AI prompts, and interactive roadmaps.",
    ogImage: "/og-image.png",
  },
};

// INITIAL FAQS
export const INITIAL_FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "Can I download PDFs and practice materials for free?",
    answer: "Yes! All educational resources, cheat sheets, placement PDFs, and roadmaps on VibeCoding Hub are accessible and free to preview and download.",
    category: "General",
    sortOrder: 1,
    isVisible: true,
  },
  {
    id: "faq-2",
    question: "What is Vibe Coding / AI-Assisted Development?",
    answer: "Vibe Coding refers to leveraging state-of-the-art AI code generators (Claude, Cursor, GitHub Copilot) alongside structured rules, PRD templates, and test prompts to build complex software at unprecedented speed.",
    category: "Vibe Coding",
    sortOrder: 2,
    isVisible: true,
  },
  {
    id: "faq-3",
    question: "How does the Admin CMS update website content?",
    answer: "When an administrator uploads a PDF, adds a question bank, or modifies homepage sections in the Admin Panel, the platform's dynamic database API updates immediately. No code changes or manual server rebuilds are required!",
    category: "CMS",
    sortOrder: 3,
    isVisible: true,
  },
];

// LOCAL STORAGE PERSISTENCE HELPER FOR CLIENT CMS TESTING
const STORE_KEY_RESOURCES = "vibecoding_hub_resources_v1";
const STORE_KEY_CATEGORIES = "vibecoding_hub_categories_v1";
const STORE_KEY_QUESTIONS = "vibecoding_hub_questions_v1";
const STORE_KEY_SETTINGS = "vibecoding_hub_settings_v1";
const STORE_KEY_AUDIT = "vibecoding_hub_audit_v1";

export function getStoredResources(): Resource[] {
  if (typeof window === "undefined") return INITIAL_RESOURCES;
  try {
    const data = localStorage.getItem(STORE_KEY_RESOURCES);
    return data ? JSON.parse(data) : INITIAL_RESOURCES;
  } catch {
    return INITIAL_RESOURCES;
  }
}

export function saveStoredResources(resources: Resource[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORE_KEY_RESOURCES, JSON.stringify(resources));
  } catch (e) {
    console.error("Failed to save resources to localStorage", e);
  }
}

export function addStoredResource(resource: Resource): void {
  const current = getStoredResources();
  const updated = [resource, ...current];
  saveStoredResources(updated);
}

export function updateStoredResource(resource: Resource): void {
  const current = getStoredResources();
  const updated = current.map((r) => (r.id === resource.id ? resource : r));
  saveStoredResources(updated);
}

export function deleteStoredResource(id: string): void {
  const current = getStoredResources();
  const updated = current.filter((r) => r.id !== id);
  saveStoredResources(updated);
}

export function incrementResourceViews(id: string): void {
  const resources = getStoredResources();
  const updated = resources.map((r) => (r.id === id ? { ...r, viewCount: (r.viewCount || 0) + 1 } : r));
  saveStoredResources(updated);
}

export function incrementResourceDownloads(id: string): void {
  const resources = getStoredResources();
  const updated = resources.map((r) => (r.id === id ? { ...r, downloadCount: (r.downloadCount || 0) + 1 } : r));
  saveStoredResources(updated);
}

export function getStoredCategories(): Category[] {
  if (typeof window === "undefined") return INITIAL_CATEGORIES;
  try {
    const data = localStorage.getItem(STORE_KEY_CATEGORIES);
    return data ? JSON.parse(data) : INITIAL_CATEGORIES;
  } catch {
    return INITIAL_CATEGORIES;
  }
}

export function saveStoredCategories(categories: Category[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORE_KEY_CATEGORIES, JSON.stringify(categories));
  } catch (e) {
    console.error("Failed to save categories to localStorage", e);
  }
}

export function getStoredQuestions(): QuestionItem[] {
  if (typeof window === "undefined") return INITIAL_QUESTIONS;
  try {
    const data = localStorage.getItem(STORE_KEY_QUESTIONS);
    return data ? JSON.parse(data) : INITIAL_QUESTIONS;
  } catch {
    return INITIAL_QUESTIONS;
  }
}

export function saveStoredQuestions(questions: QuestionItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORE_KEY_QUESTIONS, JSON.stringify(questions));
  } catch (e) {
    console.error("Failed to save questions", e);
  }
}

export function getStoredRoadmaps(): Roadmap[] {
  return INITIAL_ROADMAPS;
}

export function getStoredFAQS(): FAQ[] {
  return INITIAL_FAQS;
}

export function getStoredSettings(): SiteSettings {
  if (typeof window === "undefined") return INITIAL_SETTINGS;
  try {
    const data = localStorage.getItem(STORE_KEY_SETTINGS);
    return data ? JSON.parse(data) : INITIAL_SETTINGS;
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function saveStoredSettings(settings: SiteSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save settings", e);
  }
}

export function getStoredAuditLogs(): AuditLog[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORE_KEY_AUDIT);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addAuditLog(action: string, entity: string, targetId?: string, details?: Record<string, any>) {
  if (typeof window === "undefined") return;
  const logs = getStoredAuditLogs();
  const newLog: AuditLog = {
    id: "audit-" + Date.now(),
    adminEmail: "admin@vibecoding.hub",
    action,
    targetEntity: entity,
    targetId,
    details,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORE_KEY_AUDIT, JSON.stringify([newLog, ...logs]));
}

// SMART AUTO-ORGANIZE METADATA EXTRACTOR
export function autoOrganizeMetadata(textOrFilename: string, contentPreview?: string) {
  const combinedText = `${textOrFilename} ${contentPreview || ""}`.toLowerCase();

  let categoryId = "cat-1";
  let categoryName = "Placement Preparation";
  let subcategoryId = "sub-2";
  let subcategoryName = "DSA & Problem Solving";
  let type: Resource["type"] = "document";
  let difficulty: Resource["difficulty"] = "intermediate";
  const tagsSet = new Set<string>();

  // Detect Type
  if (textOrFilename.endsWith(".pdf") || combinedText.includes("pdf")) {
    type = "pdf";
  } else if (combinedText.includes("roadmap") || combinedText.includes("pathway")) {
    type = "roadmap";
  } else if (combinedText.includes("cheat sheet") || combinedText.includes("quick reference")) {
    type = "cheat_sheet";
  } else if (combinedText.includes("question") || combinedText.includes("bank") || combinedText.includes("q&a")) {
    type = "question_bank";
  } else if (combinedText.includes("tutorial") || combinedText.includes("guide")) {
    type = "tutorial";
  }

  // Detect Category
  if (combinedText.includes("vibe") || combinedText.includes("ai") || combinedText.includes("claude") || combinedText.includes("prompt") || combinedText.includes("cursor")) {
    categoryId = "cat-2";
    categoryName = "Vibe Coding / AI Development";
    subcategoryId = "sub-5";
    subcategoryName = "AI Coding Workflows";
    tagsSet.add("Vibe Coding").add("AI").add("Prompts");
  } else if (combinedText.includes("dsa") || combinedText.includes("leetcode") || combinedText.includes("algorithm") || combinedText.includes("array") || combinedText.includes("tree")) {
    categoryId = "cat-1";
    categoryName = "Placement Preparation";
    subcategoryId = "sub-2";
    subcategoryName = "DSA & Problem Solving";
    tagsSet.add("DSA").add("Algorithms").add("Placement");
  } else if (combinedText.includes("dbms") || combinedText.includes("sql") || combinedText.includes("os") || combinedText.includes("network")) {
    categoryId = "cat-1";
    categoryName = "Placement Preparation";
    subcategoryId = "sub-3";
    subcategoryName = "Core CS (DBMS, OS, CN)";
    tagsSet.add("DBMS").add("SQL").add("Core CS");
  } else if (combinedText.includes("react") || combinedText.includes("next.js") || combinedText.includes("web") || combinedText.includes("javascript")) {
    categoryId = "cat-3";
    categoryName = "Learning Materials";
    subcategoryId = "sub-9";
    subcategoryName = "Web Development (React, Next.js)";
    tagsSet.add("Web Dev").add("React").add("JavaScript");
  }

  // Detect Difficulty
  if (combinedText.includes("advanced") || combinedText.includes("hard") || combinedText.includes("expert")) {
    difficulty = "advanced";
  } else if (combinedText.includes("beginner") || combinedText.includes("easy") || combinedText.includes("basic") || combinedText.includes("starter")) {
    difficulty = "beginner";
  }

  return {
    suggestedTitle: textOrFilename.replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace(/-/g, " "),
    suggestedCategory: { id: categoryId, name: categoryName },
    suggestedSubcategory: { id: subcategoryId, name: subcategoryName },
    suggestedType: type,
    suggestedDifficulty: difficulty,
    suggestedTags: Array.from(tagsSet),
  };
}
