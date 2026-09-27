"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  Sparkles,
  FileText,
  Save,
  CheckCircle2,
  ArrowLeft,
  X,
  HelpCircle,
  Map,
  BookOpen,
} from "lucide-react";
import {
  getStoredCategories,
  getStoredResources,
  saveStoredResources,
  autoOrganizeMetadata,
  addAuditLog,
} from "@/lib/store/hub-store";
import { Category, Resource, ResourceType, DifficultyLevel } from "@/lib/types";

export default function CreateResourceWizardPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<ResourceType>("pdf");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("intermediate");
  const [authorSource, setAuthorSource] = useState("VibeCoding Admin");
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState<"published" | "draft">("published");

  // File Upload State
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: number;
    mime: string;
    url: string;
  } | null>(null);

  // Auto Organize Review Notice
  const [aiSuggestions, setAiSuggestions] = useState<any | null>(null);
  const [isAiApplied, setIsAiApplied] = useState(false);

  useEffect(() => {
    const cats = getStoredCategories();
    setCategories(cats);
    if (cats.length > 0) {
      setCategoryId(cats[0].id);
    }
  }, []);

  // Title Slug auto-generator
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
  };

  // Drag and Drop Handler
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const fakeUrl = URL.createObjectURL(file);
    setUploadedFile({
      name: file.name,
      size: file.size,
      mime: file.type || "application/pdf",
      url: fakeUrl,
    });
    if (!title) {
      handleTitleChange(file.name.replace(/\.[^/.]+$/, ""));
    }
    // Auto-organize trigger suggestion
    const suggestions = autoOrganizeMetadata(file.name);
    setAiSuggestions(suggestions);
  };

  // Run AI Auto Organize
  const runAutoOrganize = () => {
    const suggestions = autoOrganizeMetadata(title || uploadedFile?.name || "Resource", content || description);
    setAiSuggestions(suggestions);

    if (suggestions) {
      if (suggestions.suggestedTitle && !title) handleTitleChange(suggestions.suggestedTitle);
      setType(suggestions.suggestedType);
      setDifficulty(suggestions.suggestedDifficulty);

      // Match category
      const matchCat = categories.find((c) => c.id === suggestions.suggestedCategory.id);
      if (matchCat) {
        setCategoryId(matchCat.id);
      }
      if (suggestions.suggestedTags.length > 0) {
        setTagsInput(suggestions.suggestedTags.join(", "));
      }
      setIsAiApplied(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a title");

    const selectedCategoryObj = categories.find((c) => c.id === categoryId);
    const selectedSubcategoryObj = selectedCategoryObj?.subcategories?.find((s) => s.id === subcategoryId);

    const tagsList = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);

    const newResource: Resource = {
      id: "res-" + Date.now(),
      title: title.trim(),
      slug: slug || "resource-" + Date.now(),
      description: description || title,
      content,
      type,
      categoryId,
      categoryName: selectedCategoryObj?.name || "General",
      subcategoryId: subcategoryId || undefined,
      subcategoryName: selectedSubcategoryObj?.name,
      tags: tagsList.length > 0 ? tagsList : ["Resource"],
      difficulty,
      authorSource,
      isFeatured,
      status,
      viewCount: 0,
      downloadCount: 0,
      file: uploadedFile
        ? {
            id: "file-" + Date.now(),
            resourceId: "res-" + Date.now(),
            fileName: uploadedFile.name,
            fileUrl: uploadedFile.url,
            fileSize: uploadedFile.size,
            mimeType: uploadedFile.mime,
            pageCount: Math.max(5, Math.ceil(uploadedFile.size / 60000)),
            createdAt: new Date().toISOString(),
          }
        : undefined,
      metadata: {
        fileSizeFormatted: uploadedFile ? `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB` : undefined,
        estimatedReadTime: "15 mins",
        downloadUrl: uploadedFile?.url,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const existing = getStoredResources();
    const updated = [newResource, ...existing];
    saveStoredResources(updated);
    addAuditLog("Created Resource", "Resource", newResource.id, { title: newResource.title });

    alert(`Resource "${newResource.title}" published successfully! It is now live on the website.`);
    router.push("/admin/resources");
  };

  const activeCategoryObj = categories.find((c) => c.id === categoryId);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* TOP HEADER */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Resources Table
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={runAutoOrganize}
            className="px-4 py-2 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-4 h-4" /> Auto Organize Metadata
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Add / Upload New Resource</h1>
        <p className="text-xs text-slate-400 mt-1">Upload a PDF or paste text content to publish directly to the live website.</p>
      </div>

      {/* AI SUGGESTIONS REVIEW BANNER */}
      {aiSuggestions && (
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs space-y-2 text-purple-200">
          <div className="flex items-center justify-between font-bold text-sm text-purple-300">
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> AI Classification Suggestions (Review Required)</span>
            <span className="text-[10px] bg-purple-500/20 px-2 py-0.5 rounded text-purple-300">Pending Review</span>
          </div>
          <p className="text-[11px] text-purple-300/80">
            Suggested Category: <strong>{aiSuggestions.suggestedCategory.name}</strong> • Type: <strong>{aiSuggestions.suggestedType.toUpperCase()}</strong> • Difficulty: <strong>{aiSuggestions.suggestedDifficulty}</strong>
          </p>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* DRAG & DROP PDF ZONE */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <h3 className="text-sm font-bold text-white mb-3">1. Upload File Attachment (PDF / Document)</h3>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
              dragActive
                ? "border-blue-500 bg-blue-500/10"
                : uploadedFile
                ? "border-emerald-500/40 bg-emerald-500/5"
                : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
            }`}
          >
            {uploadedFile ? (
              <div className="flex items-center justify-between max-w-md mx-auto p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-emerald-400" />
                  <div className="text-left">
                    <div className="font-bold text-white line-clamp-1">{uploadedFile.name}</div>
                    <div className="text-[10px] text-slate-400">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • {uploadedFile.mime}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadedFile(null)}
                  className="p-1 text-slate-400 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <UploadCloud className="w-10 h-10 mx-auto text-blue-400" />
                <div>
                  <p className="text-xs font-semibold text-white">Drag and drop your PDF or document here</p>
                  <p className="text-[11px] text-slate-400 mt-1">Supports PDF, DOCX, TXT (Max size 50MB)</p>
                </div>
                <label className="inline-block px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer transition-colors">
                  Browse Files
                  <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileInput} className="hidden" />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* METADATA FORM */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white mb-2">2. Resource Information & Content</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Resource Title *</label>
              <input
                required
                type="text"
                placeholder="e.g. Top 100 DSA Interview Questions.pdf"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
            <textarea
              rows={2}
              placeholder="Brief summary displayed on resource cards..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Resource Type</label>
              <select
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              >
                <option value="pdf">PDF Document</option>
                <option value="document">Text & Notes</option>
                <option value="question_bank">Question Bank</option>
                <option value="roadmap">Roadmap</option>
                <option value="cheat_sheet">Cheat Sheet</option>
                <option value="tutorial">Tutorial</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
              <select
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setSubcategoryId("");
                }}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {activeCategoryObj && activeCategoryObj.subcategories && activeCategoryObj.subcategories.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subcategory</label>
                <select
                  value={subcategoryId}
                  onChange={(e) => setSubcategoryId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                >
                  <option value="">None</option>
                  {activeCategoryObj.subcategories.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (Comma separated)</label>
              <input
                type="text"
                placeholder="DSA, Placement, Python, SQL"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={(e: any) => setDifficulty(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="all_levels">All Levels</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Document Text / Markdown Content</label>
            <textarea
              rows={6}
              placeholder="Paste Markdown, raw text, or question bank content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded"
              />
              Mark as Featured Resource (Shows on Homepage)
            </label>
          </div>
        </div>

        {/* PUBLISH ACTION BAR */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={(e: any) => setStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
            >
              <option value="published">Status: Published (Live immediately)</option>
              <option value="draft">Status: Draft (Hidden from public)</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" /> Save & Publish to Live Site
          </button>
        </div>
      </form>
    </div>
  );
}
