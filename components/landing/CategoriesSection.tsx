"use client";

import React from "react";
import Link from "next/link";
import { Category } from "@/lib/types";
import { GraduationCap, BookOpen, HelpCircle, Map, ArrowRight } from "lucide-react";

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case "GraduationCap":
        return GraduationCap;
      case "HelpCircle":
        return HelpCircle;
      case "Map":
        return Map;
      case "BookOpen":
      default:
        return BookOpen;
    }
  };

  return (
    <section className="py-14 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              Explore Resource Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Organized pathways driven dynamically by our Admin CMS. Select a domain to access PDFs, documents, roadmaps, and practice materials.
            </p>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors self-start md:self-auto"
          >
            View All Categories & Filter
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* CATEGORY CARDS - UNIFIED BRAND COLORING & STRUCTURE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const IconComponent = getCategoryIcon(cat.icon);
            return (
              <Link
                key={cat.id}
                href={`/resources?category=${cat.id}`}
                className="group rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center text-blue-400 mb-4">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {cat.subcategories.slice(0, 3).map((sub) => (
                      <span key={sub.id} className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-slate-300 border border-slate-800">
                        {sub.name}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
