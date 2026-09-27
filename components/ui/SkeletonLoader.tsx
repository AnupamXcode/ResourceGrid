"use client";

import React from "react";

export function SkeletonCard() {
  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-slate-800 rounded" />
        <div className="h-4 w-12 bg-slate-800 rounded" />
      </div>
      <div className="h-32 w-full bg-slate-950 rounded-lg" />
      <div className="h-5 w-3/4 bg-slate-800 rounded" />
      <div className="h-4 w-full bg-slate-800/60 rounded" />
      <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
        <div className="h-3 w-20 bg-slate-800 rounded" />
        <div className="h-7 w-20 bg-slate-800 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-12 bg-slate-900 border border-slate-800 rounded-xl w-full" />
      ))}
    </div>
  );
}
