# VibeCoding Resource Hub & Learning Platform 🚀

A production-grade digital resource platform where users can discover, search, preview, and download educational and career resources (Placement Preparation, Vibe Coding AI Prompts, DSA Question Banks, Roadmaps, Notes, and PDFs), while an authenticated administrator can control virtually all website content dynamically from a powerful Admin CMS.

---

## 🌟 Key Features & CMS-First Architecture

- **100% CMS-Driven:** Content, categories, subcategories, homepage hero copy, FAQs, site settings, and navigation links are controlled dynamically from the Admin Panel. No source code modifications are required when adding new PDFs or categories!
- **Interactive PDF & Document Viewer:** Client-side embedded PDF previewer with page counter, zoom controls, text copy mode, fullscreen preview, and direct download tracking.
- **Smart Auto-Organize Metadata Generator:** AI-assisted classification suggestions (title, category, subcategory, difficulty level, tech tags) during PDF or text upload with MANDATORY admin review before publishing.
- **Placement Preparation Hub:** Structured modules for Aptitude, DSA patterns, Core CS (DBMS, OS, Networks), SQL query banks, and HR interview guides.
- **Vibe Coding / AI Development Hub:** Prompts for Claude 3.5 Sonnet & Cursor IDE, context schemas (`rules.md`, `design.md`), PRD templates, and architecture documentation.
- **Searchable Question Bank:** Interactive question library with expandable solutions, explanation callouts, code syntax highlighting, and one-click copy buttons.
- **Step-by-Step Interactive Roadmaps:** Visual milestone roadmaps for Full-Stack, AI/ML, DevOps, and Data Structures.
- **Authenticated Admin Console (`/admin`):** Secure login (`/admin/login`), live analytics dashboard, drag-and-drop PDF upload wizard, category builder, website CMS editor, and audit log tracker.
- **Hybrid Data Store:** Works out-of-the-box in local development / Vercel previews using a reactive fallback store, and connects seamlessly to Supabase PostgreSQL & Storage when environment variables are supplied.

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components & Client Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Glassmorphic UI utilities
- **Icons:** Lucide React
- **Database & Storage:** PostgreSQL / Supabase PostgreSQL & Supabase Object Storage (`supabase/schema.sql`)
- **Validation:** Zod schemas
- **Theme:** `next-themes` (Dark Mode & Light Mode support)

---

## 📂 Project Structure

```text
├── app/
│   ├── (public)
│   │   ├── page.tsx               # Dynamic Landing Page (Hero, Categories, Spotlights, FAQs)
│   │   ├── resources/
│   │   │   ├── page.tsx           # Full Resource Catalog & Multi-Filter Library
│   │   │   └── [slug]/page.tsx    # Resource Detail Page with PDF Reader & Download Tracker
│   │   ├── placement/page.tsx     # Placement Preparation Hub
│   │   ├── vibe-coding/page.tsx   # Vibe Coding & AI Software Engineering Hub
│   │   ├── learning/page.tsx      # Learning Materials & Tech Notes
│   │   ├── questions/page.tsx     # Searchable Question Bank
│   │   ├── interview/page.tsx     # Interview Prep Vault
│   │   ├── roadmaps/page.tsx      # Interactive Visual Roadmaps
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── admin/
│   │   ├── page.tsx               # Admin Analytics Dashboard
│   │   ├── login/page.tsx         # Admin Auth Screen (Demo pass: admin)
│   │   ├── resources/
│   │   │   ├── page.tsx           # Resource CRUD Table & Bulk Operations
│   │   │   └── new/page.tsx       # Drag & Drop PDF / Document Upload Wizard
│   │   ├── categories/page.tsx    # Dynamic Category & Subcategory Builder
│   │   ├── website/page.tsx       # Website CMS Builder (Hero, Copy, CTAs)
│   │   └── audit-logs/page.tsx    # Admin Audit Trail
├── components/
│   ├── layout/ (Navbar, Footer)
│   ├── landing/ (HeroSection, CategoriesSection, VibeCodingSpotlight, FaqSection)
│   ├── resources/ (ResourceCard, ResourcePreviewModal)
│   └── theme-provider.tsx
├── lib/
│   ├── store/hub-store.ts         # Dual-mode Data Access Layer & Seed Data
│   ├── supabase/ (client.ts, server.ts)
│   └── types/index.ts             # Strict TypeScript Interfaces
└── supabase/
    └── schema.sql                 # Complete PostgreSQL DDL & RLS Policies
```

---

## 🚀 Quick Start (Local Setup)

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Access Application:**
   - **Public Website:** [http://localhost:3000](http://localhost:3000)
   - **Admin Console:** [http://localhost:3000/admin](http://localhost:3000/admin) (Default passcode: `admin`)

---

## 🗄 Database & Supabase Setup (Production Deployment)

1. **Create Supabase Project:**
   Go to [Supabase](https://supabase.com) and create a new project.

2. **Run Migration Schema:**
   Copy the contents of [`supabase/schema.sql`](file:///d:/VibeCoading%20Mastered/supabase/schema.sql) and paste into your Supabase SQL Editor, then execute. This creates all tables (`resources`, `categories`, `subcategories`, `questions`, `roadmaps`, `audit_logs`, `site_settings`), indexes, Row Level Security (RLS) policies, and storage buckets (`resource-files`, `thumbnails`).

3. **Configure Environment Variables:**
   Create a `.env.local` file (or set variables in Vercel):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

---

## ☁️ Vercel Deployment Instructions

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import project into Vercel Dashboard.
3. Set Framework Preset: **Next.js**.
4. Add environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
5. Click **Deploy**.

---

## 📖 Admin Step-by-Step Operating Manual

### 1. How to Upload the First PDF
1. Go to `/admin/login` and log in with passcode `admin`.
2. Click **Add / Upload Resource** (`/admin/resources/new`).
3. Drag and drop your `.pdf` file into the upload dropzone. The system automatically reads the filename, calculates file size, and estimates page count.
4. Optionally click **Auto Organize Metadata** to auto-fill title suggestions, category, and tags.
5. Select Category (e.g. *Placement Preparation*), Subcategory (e.g. *DSA & Problem Solving*), and Type (*PDF Document*).
6. Select **Status: Published** and click **Save & Publish to Live Site**.
7. Navigating to `/resources` or `/placement` will instantly show your newly published PDF card with instant preview and download buttons!

### 2. How to Add the First Text Document
1. Go to `/admin/resources/new`.
2. Select Resource Type: **Text & Notes**.
3. Type or paste your Markdown/plain text content in the *Full Document Text / Markdown Content* area.
4. Select Category & Tags.
5. Click **Save & Publish**. The document immediately creates a dynamic detail page (`/resources/[slug]`) with styled code blocks and copy buttons.

### 3. How to Create a New Category
1. Go to **Categories & Tags** (`/admin/categories`).
2. Enter Category Name (e.g. *System Design & Cloud*) and Description.
3. Click **Add Category to CMS**.
4. The category instantly becomes selectable in the Admin Upload Wizard and appears dynamically on the public landing page and search filters!

---

## 🛡 Security & Best Practices

- Secret keys are kept server-side in environment variables.
- File uploads are validated for mime type and size boundaries.
- Database access is governed by granular PostgreSQL RLS policies.
