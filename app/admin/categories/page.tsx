"use client";

import React, { useState, useEffect } from "react";
import {
  FolderTree,
  PlusCircle,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";
import {
  getStoredCategories,
  saveStoredCategories,
  addAuditLog,
} from "@/lib/store/hub-store";
import { Category, Subcategory } from "@/lib/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("BookOpen");
  const [color, setColor] = useState("from-blue-500 to-indigo-600");

  useEffect(() => {
    setCategories(getStoredCategories());
  }, []);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCat: Category = {
      id: "cat-" + Date.now(),
      name: name.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description,
      icon,
      color,
      sortOrder: categories.length + 1,
      isVisible: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subcategories: [],
    };

    const updated = [...categories, newCat];
    setCategories(updated);
    saveStoredCategories(updated);
    addAuditLog("Created Category", "Category", newCat.id, { name: newCat.name });

    setName("");
    setDescription("");
    alert(`Category "${newCat.name}" created! It is now active on the public website.`);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("Delete this category? Resources in this category will remain intact.")) {
      const updated = categories.filter((c) => c.id !== id);
      setCategories(updated);
      saveStoredCategories(updated);
      addAuditLog("Deleted Category", "Category", id);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Category & Taxonomy Manager</h1>
        <p className="text-xs text-slate-400 mt-1">
          Create new categories and subcategories without touching source code. Changes update the public site dynamically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ADD CATEGORY FORM */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 self-start">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-blue-400" /> Create New Category
          </h3>

          <form onSubmit={handleCreateCategory} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Category Name *</label>
              <input
                required
                type="text"
                placeholder="e.g. System Design & Cloud"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Overview of resources in this section..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Icon Style</label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
              >
                <option value="BookOpen font">Book / Learning</option>
                <option value="GraduationCap">Placement / Graduation</option>
                <option value="Sparkles">Vibe Coding / AI</option>
                <option value="HelpCircle">Question Bank</option>
                <option value="Map">Roadmap</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all"
            >
              Add Category to CMS
            </button>
          </form>
        </div>

        {/* EXISTING CATEGORIES LIST */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-white">Active Website Categories ({categories.length})</h3>

          <div className="space-y-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-base">{cat.name}</span>
                    <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      /{cat.slug}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{cat.description}</p>

                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories.map((sub) => (
                        <span key={sub.id} className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-slate-300 border border-slate-800">
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-1.5 rounded-lg bg-slate-800 text-red-400 hover:bg-red-500/20 transition-colors"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
