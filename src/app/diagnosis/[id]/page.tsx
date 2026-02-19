"use client";

import { useParams, useRouter } from "next/navigation";
import { diseases } from "@/lib/data";
import { useState } from "react";
import Link from "next/link";

export default function DiagnosisPage() {
    const params = useParams();
    const router = useRouter();
    const disease = diseases[params.id as string];
    const [activeTab, setActiveTab] = useState<"organic" | "chemical">("organic");

    if (!disease) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-leaf-medium">Disease not found.</p>
            </div>
        );
    }

    const severityPercent = disease.severity === "Critical" ? 80 : disease.severity === "Moderate" ? 45 : 20;
    const severityColor = disease.severity === "Critical" ? "text-red-500" : disease.severity === "Moderate" ? "text-orange-500" : "text-primary";

    const steps = [
        { icon: "content_cut", iconBg: "bg-primary/10 text-primary", title: "Prune", desc: disease.organicControl[0] || "Remove infected parts immediately." },
        { icon: "grid_view", iconBg: "bg-orange-100 text-orange-500", title: "Isolate", desc: "Move pot at least 3 feet away from healthy plants to prevent spore transfer." },
        { icon: "water_drop", iconBg: "bg-blue-100 text-blue-500", title: "Treat", desc: disease.chemicalControl[0] || "Apply copper fungicide or neem oil spray every 7-10 days." },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background-light text-slate-900 font-display antialiased">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-primary/10">
                <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-primary/10 transition-colors text-slate-800">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">medical_services</span>
                    Diagnosis Report
                </h1>
                <button className="p-2 rounded-full hover:bg-primary/10 transition-colors text-slate-800">
                    <span className="material-symbols-outlined">share</span>
                </button>
            </header>

            <main className="flex-1 px-4 py-6 w-full max-w-md mx-auto space-y-6 pb-32">
                {/* Visual Evidence */}
                <section className="relative rounded-[2rem] overflow-hidden shadow-lg border border-white/20 h-64 flex">
                    <div className="relative w-1/2 h-full">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${disease.image}')` }}
                        />
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
                            Your Photo
                        </div>
                    </div>
                    {/* Comparison Divider */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_rgba(19,236,91,0.5)] z-10 flex items-center justify-center -ml-0.5">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                            <span className="material-symbols-outlined text-[12px] text-black font-bold">compare_arrows</span>
                        </div>
                    </div>
                    <div className="relative w-1/2 h-full">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${disease.image}')` }}
                        />
                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
                            Reference
                        </div>
                    </div>
                </section>

                {/* Diagnosis Header */}
                <section className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 bg-primary text-black px-4 py-1.5 rounded-full text-sm font-bold shadow-sm mb-2">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        {disease.confidence}% Match
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight leading-tight">{disease.name}</h2>
                    <p className="text-slate-500 italic font-medium">{disease.scientificName}</p>
                </section>

                {/* Severity Meter */}
                <section className="bg-surface-light p-5 rounded-[1.5rem] shadow-sm border border-slate-200">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-medium text-slate-500">Severity Level</span>
                        <span className={`text-sm font-bold ${severityColor}`}>{disease.severity}</span>
                    </div>
                    <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-yellow-400 to-red-500 opacity-80" />
                    </div>
                    <div className="relative w-full h-2 mt-1">
                        <div className="absolute -top-6 flex flex-col items-center" style={{ left: `${severityPercent}%` }}>
                            <div className="w-4 h-4 bg-white border-4 border-primary rounded-full shadow-lg" />
                        </div>
                    </div>
                </section>

                {/* Treatment Toggle */}
                <section className="bg-surface-light p-1.5 rounded-full border border-slate-200 flex relative">
                    <div
                        className={`w-1/2 absolute top-1.5 bottom-1.5 bg-primary rounded-full shadow-sm transition-all duration-300 ease-out z-0 ${activeTab === "organic" ? "left-1.5" : "left-[calc(50%-3px)]"
                            }`}
                    />
                    <button
                        onClick={() => setActiveTab("organic")}
                        className={`relative w-1/2 py-3 rounded-full text-sm font-bold z-10 transition-colors ${activeTab === "organic" ? "text-black" : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        Organic
                    </button>
                    <button
                        onClick={() => setActiveTab("chemical")}
                        className={`relative w-1/2 py-3 rounded-full text-sm font-bold z-10 transition-colors ${activeTab === "chemical" ? "text-black" : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        Chemical
                    </button>
                </section>

                {/* Prescription Steps */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-lg font-bold">Prescription Steps</h3>
                        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                            {steps.length} Actions
                        </span>
                    </div>

                    {steps.map((step, i) => (
                        <div
                            key={step.title}
                            className="group bg-surface-light p-4 rounded-[1.5rem] border border-slate-200 shadow-sm hover:border-primary/50 transition-colors flex gap-4 items-start"
                        >
                            <div className={`flex-shrink-0 w-12 h-12 rounded-full ${step.iconBg} flex items-center justify-center mt-1`}>
                                <span className="material-symbols-outlined">{step.icon}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                                    <span className="text-xs font-bold text-slate-300">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Pro Tip */}
                <section className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex gap-3 items-start">
                    <span className="material-symbols-outlined text-primary mt-0.5">lightbulb</span>
                    <p className="text-sm text-slate-700">
                        <strong className="font-bold text-slate-900">Pro Tip:</strong> Avoid overhead watering. Wet leaves encourage fungal growth.
                    </p>
                </section>
            </main>

            {/* Sticky Save Button */}
            <div className="fixed bottom-[88px] left-0 right-0 px-4 flex justify-center z-20 pointer-events-none">
                <button className="pointer-events-auto bg-black text-white font-bold py-4 px-8 rounded-full shadow-xl flex items-center gap-2 transform active:scale-95 transition-all hover:shadow-2xl ring-4 ring-white max-w-sm w-full justify-center">
                    <span className="material-symbols-outlined">bookmark_add</span>
                    Save to My Garden
                </button>
            </div>
        </div>
    );
}
