"use client";

import React, { useState, useEffect } from "react";
import { Globe, Save, CheckCircle2, Sparkles } from "lucide-react";
import { getStoredSettings, saveStoredSettings, addAuditLog } from "@/lib/store/hub-store";
import { SiteSettings } from "@/lib/types";

export default function AdminWebsiteCmsPage() {
  const [settings, setSettings] = useState<SiteSettings>(getStoredSettings());
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setSettings(getStoredSettings());
  }, []);

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSettings(settings);
    addAuditLog("Updated Website CMS Settings", "SiteSettings");
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Website CMS Builder</h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize website titles, copy, CTA buttons, links, and footer info live without editing code.
        </p>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Website settings updated successfully! View live site to see changes.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* HERO SECTION CMS */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" /> Homepage Hero Copy & CTAs
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Platform Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange("siteName", e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Main Headline</label>
            <input
              type="text"
              value={settings.heroTitle}
              onChange={(e) => handleChange("heroTitle", e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Subtitle</label>
            <textarea
              rows={3}
              value={settings.heroSubtitle}
              onChange={(e) => handleChange("heroSubtitle", e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary CTA Button Label</label>
              <input
                type="text"
                value={settings.heroPrimaryCtaText}
                onChange={(e) => handleChange("heroPrimaryCtaText", e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Secondary CTA Button Label</label>
              <input
                type="text"
                value={settings.heroSecondaryCtaText}
                onChange={(e) => handleChange("heroSecondaryCtaText", e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* FOOTER & CONTACT */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white mb-2">Contact & Footer Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Support Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Footer Copyright Line</label>
              <input
                type="text"
                value={settings.footerText}
                onChange={(e) => handleChange("footerText", e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" /> Save CMS Settings
        </button>
      </form>
    </div>
  );
}
