"use client";

import React, { useState, useEffect } from "react";
import { ListOrdered, ShieldCheck, Clock } from "lucide-react";
import { getStoredAuditLogs } from "@/lib/store/hub-store";
import { AuditLog } from "@/lib/types";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    setLogs(getStoredAuditLogs());
  }, []);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Audit Trail Logs</h1>
        <p className="text-xs text-slate-400 mt-1">Track all administrator modifications, resource uploads, and system edits.</p>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 overflow-x-auto">
        {logs.length > 0 ? (
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
              <tr>
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">Admin</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">Target Entity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30">
                  <td className="py-3 font-mono text-[11px] text-slate-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 text-slate-300 font-medium">{log.adminEmail}</td>
                  <td className="py-3 font-semibold text-blue-400">{log.action}</td>
                  <td className="py-3 font-mono text-slate-400">{log.targetEntity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 text-slate-500 text-xs">No audit logs recorded yet.</div>
        )}
      </div>
    </div>
  );
}
