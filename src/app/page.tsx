"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";

interface Scan {
    id: string;
    disease_name: string;
    scientific_name: string;
    confidence: number;
    severity: string;
    is_healthy: boolean;
    image_url: string | null;
    created_at: string;
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
}

export default function HomePage() {
    const { user, isLoaded } = useUser();
    const [scans, setScans] = useState<Scan[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch real scans from Supabase
    useEffect(() => {
        if (!isLoaded || !user) {
            setLoading(false);
            return;
        }

        const fetchScans = async () => {
            try {
                const res = await fetch(`/api/scans?userId=${user.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setScans(data.scans || []);
                }
            } catch (err) {
                console.error("Failed to fetch scans:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchScans();
    }, [user, isLoaded]);

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white/30">
            {/* Header */}
            <header className="pt-12 px-6 pb-4 flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <p className="text-leaf-medium font-medium tracking-wide text-sm uppercase">
                        Field Dashboard
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-leaf-dark">
                        {greeting()},<br />{user?.firstName || "Gardener"}
                    </h1>
                </div>
                <div className="h-12 w-12 rounded-full flex items-center justify-center overflow-hidden">
                    <UserButton afterSignOutUrl="/" appearance={{
                        elements: {
                            userButtonAvatarBox: 'h-12 w-12 border border-white/50 shadow-sm'
                        }
                    }} />
                </div>
            </header>

            {/* Weather Alert Card */}
            <div className="px-6 mb-8">
                <div className="glass-panel p-5 rounded-xl shadow-sm border-l-4 border-l-primary relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="material-symbols-outlined text-6xl">humidity_high</span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-primary/20 text-leaf-dark p-1.5 rounded-full">
                            <span className="material-symbols-outlined text-[20px]">warning</span>
                        </span>
                        <h2 className="font-bold text-lg text-leaf-dark">High Fungal Risk</h2>
                    </div>
                    <p className="text-leaf-medium text-sm mb-4 max-w-[85%] font-medium">
                        Humidity is at 90%. Avoid overhead watering to prevent spore spread.
                    </p>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full text-xs font-bold text-leaf-dark border border-white">
                            <span className="material-symbols-outlined text-[16px]">thermostat</span>
                            <span>72°F</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full text-xs font-bold text-leaf-dark border border-white">
                            <span className="material-symbols-outlined text-[16px]">water_drop</span>
                            <span>90%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <main className="flex-1 overflow-y-auto no-scrollbar">
                {/* Recent Diagnostics */}
                <div className="px-6 mb-2">
                    <div className="flex justify-between items-end mb-4">
                        <h2 className="text-xl font-bold text-leaf-dark">Recent Diagnostics</h2>
                        <Link href="/library" className="text-primary font-bold text-sm hover:underline">
                            View All
                        </Link>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex gap-4 pb-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="shrink-0 w-[240px] bg-white rounded-xl p-3 shadow-sm border border-sage animate-pulse">
                                    <div className="h-32 w-full rounded-lg bg-gray-200 mb-3" />
                                    <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                                    <div className="h-3 w-16 bg-gray-200 rounded" />
                                </div>
                            ))}
                        </div>
                    ) : scans.length > 0 ? (
                        /* Real Scans from Supabase */
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 snap-x">
                            {scans.map((scan) => (
                                <div
                                    key={scan.id}
                                    className="snap-center shrink-0 w-[240px] bg-white rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-sage relative"
                                >
                                    {/* Status Indicator */}
                                    <div className="absolute top-3 right-3 z-10">
                                        {scan.is_healthy ? (
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary border-2 border-white" />
                                        ) : (
                                            <span className="flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75" />
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-danger border-2 border-white" />
                                            </span>
                                        )}
                                    </div>

                                    <div className="h-32 w-full rounded-lg bg-gray-100 mb-3 overflow-hidden relative flex items-center justify-center">
                                        {scan.image_url ? (
                                            <img
                                                alt={scan.disease_name}
                                                className="w-full h-full object-cover"
                                                src={scan.image_url}
                                            />
                                        ) : (
                                            <span className="material-symbols-outlined text-4xl text-gray-300">eco</span>
                                        )}
                                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
                                            {timeAgo(scan.created_at)}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-leaf-dark">{scan.disease_name}</h3>
                                    <p className={`text-sm font-medium flex items-center gap-1 ${scan.is_healthy ? "text-leaf-medium" : "text-danger"}`}>
                                        <span className="material-symbols-outlined text-[16px]">
                                            {scan.is_healthy ? "check_circle" : "bug_report"}
                                        </span>
                                        {scan.is_healthy ? "Healthy" : scan.severity}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Empty State — No Scans Yet */
                        <div className="bg-white rounded-2xl border border-sage p-8 text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-primary text-3xl">photo_camera</span>
                            </div>
                            <h3 className="font-bold text-leaf-dark text-lg mb-1">No scans yet</h3>
                            <p className="text-sm text-leaf-medium mb-4">
                                Scan your first plant to see real-time AI diagnostics here.
                            </p>
                            <Link
                                href="/scanner"
                                className="inline-flex items-center gap-2 bg-primary text-black font-bold px-6 py-2.5 rounded-full text-sm active:scale-95 transition-transform"
                            >
                                <span className="material-symbols-outlined text-lg">camera</span>
                                Start Scanning
                            </Link>
                        </div>
                    )}
                </div>

                {/* Garden Tasks */}
                <div className="px-6 mt-4">
                    <h2 className="text-xl font-bold text-leaf-dark mb-4">Garden Tasks</h2>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center p-4 bg-white rounded-xl border border-sage shadow-sm">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-4">
                                <span className="material-symbols-outlined">water_drop</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-leaf-dark">Water Hydrangeas</h4>
                                <p className="text-xs text-leaf-medium">Ideally before 10 AM today.</p>
                            </div>
                            <button className="h-8 w-8 rounded-full border border-sage flex items-center justify-center text-leaf-medium hover:bg-sage">
                                <span className="material-symbols-outlined text-lg">check</span>
                            </button>
                        </div>

                        <div className="flex items-center p-4 bg-white rounded-xl border border-sage shadow-sm">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-4">
                                <span className="material-symbols-outlined">content_cut</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-leaf-dark">Prune Tomato Plant</h4>
                                <p className="text-xs text-leaf-medium">Remove infected lower leaves.</p>
                            </div>
                            <button className="h-8 w-8 rounded-full border border-sage flex items-center justify-center text-leaf-medium hover:bg-sage">
                                <span className="material-symbols-outlined text-lg">check</span>
                            </button>
                        </div>

                        <div className="flex items-center p-4 bg-white rounded-xl border border-sage shadow-sm">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-4">
                                <span className="material-symbols-outlined">science</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-leaf-dark">Apply Fungicide</h4>
                                <p className="text-xs text-leaf-medium">Neem oil spray on roses, every 7 days.</p>
                            </div>
                            <button className="h-8 w-8 rounded-full border border-sage flex items-center justify-center text-leaf-medium hover:bg-sage">
                                <span className="material-symbols-outlined text-lg">check</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom spacer */}
                <div className="h-24" />
            </main>
        </div>
    );
}
