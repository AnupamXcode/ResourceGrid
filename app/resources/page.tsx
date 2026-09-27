"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ResourcePreviewModal } from "@/components/resources/ResourcePreviewModal";
import { getStoredCategories, getStoredResources } from "@/lib/store/hub-store";
import { Resource, Category, ResourceType, DifficultyLevel } from "@/lib/types";
import {
  Search,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  X,
  FileText,
  Sparkles,
  BookOpen,
  Map,
  HelpCircle,
  Download,
  Eye,
  RefreshCw,
} from "lucide-react";

export default function ResourcesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isPending, startTransition] = useTransition();

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "title" | "size">("latest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Modal State
  const [previewResource, setPreviewResource] = useState<Resource | null>(null);

  useEffect(() => {
    // Read URL params if any
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search");
    const catParam = params.get("category");
    const typeParam = params.get("type");

    if (searchParam) setSearchQuery(searchParam);
    if (catParam) setSelectedCategory(catParam);
    if (typeParam) setSelectedType(typeParam);

    setCategories(getStoredCategories());
    setResources(getStoredResources());
  }, []);

  // Compute all available tags
  const allTags = Array.from(new Set(resources.flatMap((r) => r.tags || [])));

  // Filter & Sort Logic
  const filteredResources = resources.filter((r) => {
    if (r.status !== "published") return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchDesc = r.description.toLowerCase().includes(q);
      const matchCat = r.categoryName?.toLowerCase().includes(q);
      const matchTags = r.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCat && !matchTags) return false;
    }

    // Category
    if (selectedCategory !== "all" && r.categoryId !== selectedCategory) return false;

    // Subcategory
    if (selectedSubcategory !== "all" && r.subcategoryId !== selectedSubcategory) return false;

    // Type
    if (selectedType !== "all" && r.type !== selectedType) return false;

    // Difficulty
    if (selectedDifficulty !== "all" && r.difficulty !== selectedDifficulty) return false;

    // Tag
    if (selectedTag !== "all" && !r.tags.includes(selectedTag)) return false;

    return true;
  });

  // Sort
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === "popular") {
      return (b.downloadCount + b.viewCount) - (a.downloadCount + a.viewCount);
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "size") {
      return (b.file?.fileSize || 0) - (a.file?.fileSize || 0);
    }
    return 0;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setSelectedType("all");
    setSelectedDifficulty("all");
    setSelectedTag("all");
    setSortBy("latest");
  };

  const handleDownload = (res: Resource) => {
    const url = res.file?.fileUrl || res.externalUrl || "#";
    window.open(url, "_blank");
  };

  const currentCategoryObj = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Resource Catalog & Library</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Browse, search, preview, and download 1,000+ curated PDFs, placement notes, DSA question banks, and AI roadmaps.
          </p>
        </div>

        {/* SEARCH & TOP CONTROLS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources by title, keyword, tech stack, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* SORT DROPDOWN */}
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
              >
                <option value="latest">Sort: Latest Added</option>
                <option value="popular">Sort: Most Popular</option>
                <option value="title">Sort: Title A-Z</option>
                <option value="size">Sort: File Size</option>
              </select>

              {/* VIEW SWITCHER */}
              <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 p-1 gap-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg text-xs ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg text-xs ${viewMode === "list" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* FILTER ROW */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters:
            </span>

            {/* CATEGORY SELECT */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory("all");
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* SUBCATEGORY SELECT */}
            {currentCategoryObj && currentCategoryObj.subcategories && currentCategoryObj.subcategories.length > 0 && (
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
              >
                <option value="all">All Subcategories</option>
                {currentCategoryObj.subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            )}

            {/* TYPE SELECT */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
            >
              <option value="all">All Types</option>
              <option value="pdf">PDF Documents</option>
              <option value="document">Text & Notes</option>
              <option value="question_bank">Question Banks</option>
              <option value="roadmap">Roadmaps</option>
              <option value="cheat_sheet">Cheat Sheets</option>
            </select>

            {/* DIFFICULTY SELECT */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* RESET BUTTON */}
            {(selectedCategory !== "all" || selectedType !== "all" || selectedDifficulty !== "all" || searchQuery) && (
              <button
                onClick={resetFilters}
                className="px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* RESULTS METRICS & COUNT */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
          <span>Showing <strong className="text-white">{sortedResources.length}</strong> resources</span>
        </div>

        {/* RESOURCE LISTING GRID / LIST */}
        {sortedResources.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedResources.map((res) => (
                <ResourceCard
                  key={res.id}
                  resource={res}
                  onPreview={setPreviewResource}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedResources.map((res) => (
                <div
                  key={res.id}
                  className="rounded-xl bg-slate-900 border border-slate-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white hover:text-blue-400 transition-colors mb-1">
                        <a href={`/resources/${res.slug}`}>{res.title}</a>
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1 mb-2">{res.description}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span>{res.categoryName}</span>
                        <span>•</span>
                        <span>{res.type.toUpperCase()}</span>
                        {res.file?.pageCount && (
                          <>
                            <span>•</span>
                            <span>{res.file.pageCount} pages</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setPreviewResource(res)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                    <button
                      onClick={() => handleDownload(res)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* EMPTY STATE */
          <div className="py-20 text-center rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 text-slate-500 flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">No resources found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No matching materials found for your current filter query. Try clearing search or selecting a different category.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* PREVIEW MODAL */}
      <ResourcePreviewModal
        resource={previewResource}
        onClose={() => setPreviewResource(null)}
        onDownload={handleDownload}
      />

      <Footer />
    </div>
  );
}
