"use client";

import Link from "next/link";
import { diseases } from "@/lib/data";

const recentScans = [
    {
        name: "Tomato",
        status: "Early Blight",
        healthy: false,
        time: "2h ago",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDx-XuttUDtUwZ-eKhTAhd3eQ-33IpZaFjfv4aOO6gxfTS2Z_04O0dMKaZEsRentaGiohXl386wJp0mKTp0GFD6K2RR8vNvvCOf21XjmvFYx2-NryzlejHLrZrxutBAajYSUIVJhs_vpvLb3aeN232MNmy5zg1zbF94JdmRIbsQ0sgoxltHPOKdCsjNPvnGpiueZUyUt6AhNFoR4HvjkUwa1odo2biw-HxzHzVmDyjQt-Xj6GLemr6PyRPjn5Hyw1RnBwlcgBhUQso",
        id: "early-blight",
    },
    {
        name: "Monstera",
        status: "Healthy",
        healthy: true,
        time: "5h ago",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbH85n_YFO7o3W8bewcIMtcGOhUW3GHGUZkSqRjcmkHtvITeKwTNWpLO2cu18asYFM75vDss52m5f5jxq5PsFELbHhIN8BOcG3D7oTOATOlUchMEhfRQXFzmAbSHoYSDRvPCNYws9hfmGZlAsBS_kPOyfeG9DUnW6_-lTJ7QQ5XxvAKJMQo6Usq5iO1QsRJmjNJfsqS8R9KkLpyUwegTp_UtjoDJcEMHWGbH_5x8-iloUKCNFMeGE4IW_lytBEb32-7JayZzOoFSE",
        id: "powdery-mildew",
    },
    {
        name: "English Rose",
        status: "Powdery Mildew",
        healthy: false,
        time: "Yesterday",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlYV0I6N9SKm2kWhDXjqRQtiPO_e1vkGbuu4Vu5rQILJNZcWZW9dgzVRPXbhx4k_TeqPzcdBSdVZBj4K5WwDg-cmXZIXSMlCZ6zvZgjlQ2dUhe63xMkFore6R6WJk0-h52vU9VuRDmEYcATIoKTm1YVxKW5TjFYDrqH5zpaw9bdB8AmMM7aIjEhEx9ohWp43aymY2DW5pmdQ0qPJoK5QHDB13nckA6xO0HoWjNbaircNhq22mIlD7eiUSTTzroG8KB14Rmq_Lzsm0",
        id: "powdery-mildew",
    },
];

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white/30">
            {/* Header */}
            <header className="pt-12 px-6 pb-4 flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <p className="text-leaf-medium font-medium tracking-wide text-sm uppercase">
                        Field Dashboard
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-leaf-dark">
                        Good Morning,<br />Gardener
                    </h1>
                </div>
                <div className="h-12 w-12 rounded-full bg-leaf-light flex items-center justify-center border border-white/50 shadow-sm overflow-hidden">
                    <span className="material-symbols-outlined text-leaf-medium text-2xl">person</span>
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

                    {/* Horizontal Scroll */}
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 snap-x">
                        {recentScans.map((scan) => (
                            <Link
                                key={scan.name + scan.time}
                                href={`/diagnosis/${scan.id}`}
                                className="snap-center shrink-0 w-[240px] bg-white rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-sage relative"
                            >
                                {/* Status Indicator */}
                                <div className="absolute top-3 right-3 z-10">
                                    {scan.healthy ? (
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary border-2 border-white" />
                                    ) : (
                                        <span className="flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75" />
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-danger border-2 border-white" />
                                        </span>
                                    )}
                                </div>

                                <div className="h-32 w-full rounded-lg bg-gray-100 mb-3 overflow-hidden relative">
                                    <img
                                        alt={scan.name}
                                        className="w-full h-full object-cover"
                                        src={scan.image}
                                    />
                                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
                                        {scan.time}
                                    </div>
                                </div>
                                <h3 className="font-bold text-leaf-dark">{scan.name}</h3>
                                <p className={`text-sm font-medium flex items-center gap-1 ${scan.healthy ? "text-leaf-medium" : "text-danger"}`}>
                                    <span className="material-symbols-outlined text-[16px]">
                                        {scan.healthy ? "check_circle" : "bug_report"}
                                    </span>
                                    {scan.status}
                                </p>
                            </Link>
                        ))}
                    </div>
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
