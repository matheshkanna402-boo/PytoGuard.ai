"use client";

import { useState } from "react";
import { diseases } from "@/lib/data";

export default function AdminPage() {
    const [isAuth, setIsAuth] = useState(false);
    const [password, setPassword] = useState("");

    if (!isAuth) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center px-6">
                <div className="w-full max-w-sm space-y-6">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Access</h1>
                        <p className="text-sm text-white/40 mt-1">Enter password to continue</p>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-3.5 bg-surface-dark border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <button
                        onClick={() => { if (password === "admin") setIsAuth(true); }}
                        className="w-full bg-primary text-black font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors active:scale-95"
                    >
                        Enter Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const diseaseList = Object.values(diseases);

    return (
        <div className="min-h-screen bg-background-dark text-white font-display pb-32">
            {/* Header */}
            <header className="px-6 pt-12 pb-6 flex items-center justify-between">
                <div>
                    <p className="text-white/40 text-sm">Oct 24, 2023</p>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
                </div>
                <button className="p-2 rounded-full bg-surface-dark text-white/60 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">account_circle</span>
                </button>
            </header>

            <main className="px-6 space-y-6">
                {/* Stat Cards */}
                <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6">
                    <div className="shrink-0 flex-1 min-w-[160px] bg-leaf-medium/60 rounded-2xl p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 opacity-20">
                            <span className="material-symbols-outlined text-4xl">biotech</span>
                        </div>
                        <p className="text-white/60 text-xs uppercase font-bold tracking-wider flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                            Total Scans
                        </p>
                        <p className="text-3xl font-bold mt-2">124,592</p>
                        <p className="text-primary text-xs font-bold mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span>
                            +12% this week
                        </p>
                    </div>
                    <div className="shrink-0 flex-1 min-w-[160px] bg-leaf-medium/60 rounded-2xl p-5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 opacity-20">
                            <span className="material-symbols-outlined text-4xl">bug_report</span>
                        </div>
                        <p className="text-white/60 text-xs uppercase font-bold tracking-wider flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">settings</span>
                            New Diseases
                        </p>
                        <p className="text-3xl font-bold mt-2">3</p>
                        <p className="text-yellow-400 text-xs font-bold mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">warning</span>
                            Requires Review
                        </p>
                    </div>
                </div>

                {/* Model Accuracy */}
                <div className="bg-surface-dark rounded-2xl p-5 border border-white/5">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="font-bold text-lg">Model Accuracy</h2>
                            <p className="text-xs text-white/40">Last 30 Days Performance</p>
                        </div>
                        <div className="flex items-center gap-1 text-primary">
                            <span className="text-2xl font-bold">96.4%</span>
                            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                        </div>
                    </div>
                    {/* Simple Chart Placeholder */}
                    <div className="h-32 flex items-end gap-2 px-2">
                        {[40, 55, 45, 65, 70, 80, 75, 90, 85, 92, 88, 96].map((h, i) => (
                            <div key={i} className="flex-1 bg-primary/20 rounded-t-sm relative" style={{ height: `${h}%` }}>
                                <div className="absolute inset-x-0 bottom-0 bg-primary/60 rounded-t-sm" style={{ height: `${h * 0.7}%` }} />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-white/30 font-medium px-2">
                        <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
                    </div>
                </div>

                {/* Pending Verifications */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-lg">Pending Verifications</h2>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                            12 Pending
                        </span>
                    </div>

                    <div className="space-y-4">
                        {diseaseList.slice(0, 2).map((d, i) => (
                            <div key={d.id} className="bg-surface-dark rounded-2xl p-4 border border-white/5">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-leaf-medium shrink-0 relative">
                                        <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[8px] font-bold text-center py-0.5 text-white/80">
                                            09:41 AM
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold">{d.name}</h3>
                                            <span className="text-[10px] text-white/30 font-medium">ID: #{8392 - i}</span>
                                        </div>
                                        <p className="text-xs text-primary font-medium">{d.scientificName}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">AI Confidence</span>
                                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: `${d.confidence}%` }} />
                                            </div>
                                            <span className="text-xs font-bold text-primary">{d.confidence}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <button className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm font-bold text-white/60 hover:bg-white/5 flex items-center justify-center gap-1 transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                        Reject
                                    </button>
                                    <button className="flex-1 py-2.5 rounded-xl bg-primary text-black text-sm font-bold hover:bg-primary/90 flex items-center justify-center gap-1 transition-colors active:scale-95">
                                        <span className="material-symbols-outlined text-[16px]">check</span>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
