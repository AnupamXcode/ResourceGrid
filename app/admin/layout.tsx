"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Globe,
  Settings,
  ShieldCheck,
  LogOut,
  PlusCircle,
  HelpCircle,
  Map,
  ListOrdered,
  Eye,
  Menu,
  X,
  BookOpen,
  Building2,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // Check admin authentication session
    const authStatus = localStorage.getItem("vibecoding_admin_auth");
    if (authStatus === "true" || pathname === "/admin/login") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      if (pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isAuthenticated === false) {
    return null; // Will redirect
  }

  const handleLogout = () => {
    localStorage.removeItem("vibecoding_admin_auth");
    router.push("/admin/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "All Resources", href: "/admin/resources", icon: FileText },
    { label: "Company Questions", href: "/admin/company-questions", icon: Building2 },
    { label: "Add / Upload Resource", href: "/admin/resources/new", icon: PlusCircle },
    { label: "Categories & Tags", href: "/admin/categories", icon: FolderTree },
    { label: "Website CMS Builder", href: "/admin/website", icon: Globe },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: ListOrdered },
  ];

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800 bg-slate-900/90 p-5 shrink-0 justify-between">
        <div>
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 mb-8 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white">Admin Panel</span>
              <span className="text-[10px] text-blue-400 font-mono">CMS Hub Console</span>
            </div>
          </Link>

          {/* NAV LINKS */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM USER & LOGOUT */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 text-slate-300 hover:text-white text-xs font-medium border border-slate-800"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            View Live Website
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out Admin
          </button>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-sm text-white">
            <ShieldCheck className="w-4 h-4 text-blue-400" /> Admin CMS Console
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {mobileSidebarOpen && (
          <div className="p-4 bg-slate-900 border-b border-slate-800 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold ${
                  pathname === item.href ? "bg-blue-600 text-white" : "text-slate-300 bg-slate-950"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 bg-slate-950 w-full justify-center"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{children}</main>
      </div>

      {/* DESKTOP MAIN CONTENT */}
      <main className="hidden lg:block flex-1 p-8 overflow-y-auto max-w-7xl">{children}</main>
    </div>
  );
}
