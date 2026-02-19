"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DiagnosisResult {
    name: string;
    scientificName: string;
    confidence: number;
    severity: "Low" | "Moderate" | "Critical";
    isContagious: boolean;
    description: string;
    symptoms: string[];
    causes: string[];
    organicControl: string[];
    chemicalControl: string[];
    prevention: string[];
    proTip: string;
    isHealthy: boolean;
}

export default function AIResultPage() {
    const router = useRouter();
    const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"organic" | "chemical">("organic");

    useEffect(() => {
        const stored = sessionStorage.getItem("ai-diagnosis");
        const storedImage = sessionStorage.getItem("ai-diagnosis-image");
        if (stored) {
            setDiagnosis(JSON.parse(stored));
        } else {
            router.push("/scanner");
        }
        if (storedImage) {
            setImage(storedImage);
        }
    }, [router]);

    if (!diagnosis) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-leaf-medium font-medium">Loading diagnosis...</p>
                </div>
            </div>
        );
    }

    const severityPercent = diagnosis.severity === "Critical" ? 80 : diagnosis.severity === "Moderate" ? 45 : 15;
    const severityColor = diagnosis.severity === "Critical" ? "text-red-500" : diagnosis.severity === "Moderate" ? "text-orange-500" : "text-primary";

    const treatments = activeTab === "organic" ? diagnosis.organicControl : diagnosis.chemicalControl;
    const stepIcons = ["content_cut", "grid_view", "water_drop", "eco", "science"];
    const stepColors = [
        "bg-primary/10 text-primary",
        "bg-orange-100 text-orange-500",
        "bg-blue-100 text-blue-500",
        "bg-emerald-100 text-emerald-500",
        "bg-purple-100 text-purple-500",
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background-light text-slate-900 font-display antialiased">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-primary/10">
                <button onClick={() => router.push("/scanner")} className="p-2 rounded-full hover:bg-primary/10 transition-colors text-slate-800">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        {diagnosis.isHealthy ? "check_circle" : "medical_services"}
                    </span>
                    AI Diagnosis
                </h1>
                <button className="p-2 rounded-full hover:bg-primary/10 transition-colors text-slate-800">
                    <span className="material-symbols-outlined">share</span>
                </button>
            </header>

            <main className="flex-1 px-4 py-6 w-full max-w-md mx-auto space-y-6 pb-32">
                {/* Image Preview */}
                {image && (
                    <section className="relative rounded-[2rem] overflow-hidden shadow-lg border border-white/20 h-56">
                        <img src={image} alt="Scanned plant" className="w-full h-full object-cover" />
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
                            Your Photo
                        </div>
                        {diagnosis.isHealthy && (
                            <div className="absolute top-3 right-3 bg-primary text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                Healthy
                            </div>
                        )}
                    </section>
                )}

                {/* Diagnosis Header */}
                <section className="text-center space-y-2">
                    <div className={`inline-flex items-center gap-2 ${diagnosis.isHealthy ? "bg-primary" : "bg-primary"} text-black px-4 py-1.5 rounded-full text-sm font-bold shadow-sm mb-2`}>
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        {diagnosis.confidence}% Confidence
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight leading-tight">{diagnosis.name}</h2>
                    <p className="text-slate-500 italic font-medium">{diagnosis.scientificName}</p>
                    {diagnosis.description && (
                        <p className="text-sm text-leaf-medium leading-relaxed mt-2 max-w-sm mx-auto">
                            {diagnosis.description}
                        </p>
                    )}
                </section>

                {/* Severity Meter */}
                <section className="bg-surface-light p-5 rounded-[1.5rem] shadow-sm border border-slate-200">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-medium text-slate-500">Severity Level</span>
                        <span className={`text-sm font-bold ${severityColor}`}>{diagnosis.severity}</span>
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

                {/* Symptoms */}
                {diagnosis.symptoms.length > 0 && (
                    <section className="bg-surface-light p-5 rounded-[1.5rem] shadow-sm border border-slate-200">
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">visibility</span>
                            Symptoms Detected
                        </h3>
                        <div className="space-y-2">
                            {diagnosis.symptoms.map((s, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-danger mt-2 shrink-0" />
                                    <span>{s}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Treatment Toggle */}
                {(diagnosis.organicControl.length > 0 || diagnosis.chemicalControl.length > 0) && (
                    <>
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

                        {/* Treatment Steps */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-lg font-bold">Prescription Steps</h3>
                                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                                    {treatments.length} Actions
                                </span>
                            </div>

                            {treatments.map((step, i) => (
                                <div
                                    key={i}
                                    className="group bg-surface-light p-4 rounded-[1.5rem] border border-slate-200 shadow-sm hover:border-primary/50 transition-colors flex gap-4 items-start"
                                >
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full ${stepColors[i % stepColors.length]} flex items-center justify-center mt-1`}>
                                        <span className="material-symbols-outlined">{stepIcons[i % stepIcons.length]}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-lg mb-1">Step {i + 1}</h4>
                                            <span className="text-xs font-bold text-slate-300">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </>
                )}

                {/* Prevention Tips */}
                {diagnosis.prevention.length > 0 && (
                    <section className="bg-surface-light p-5 rounded-[1.5rem] shadow-sm border border-slate-200">
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">shield</span>
                            Prevention
                        </h3>
                        <div className="space-y-2">
                            {diagnosis.prevention.map((p, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="material-symbols-outlined text-primary text-[12px]">check</span>
                                    </span>
                                    <span>{p}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Pro Tip */}
                {diagnosis.proTip && (
                    <section className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex gap-3 items-start">
                        <span className="material-symbols-outlined text-primary mt-0.5">lightbulb</span>
                        <p className="text-sm text-slate-700">
                            <strong className="font-bold text-slate-900">Pro Tip:</strong> {diagnosis.proTip}
                        </p>
                    </section>
                )}
            </main>

            {/* Sticky Action Buttons */}
            <div className="fixed bottom-[88px] left-0 right-0 px-4 flex justify-center z-20 pointer-events-none">
                <div className="pointer-events-auto flex gap-3 max-w-sm w-full">
                    <Link
                        href="/scanner"
                        className="flex-1 bg-surface-light text-leaf-dark font-bold py-4 px-6 rounded-full shadow-xl flex items-center justify-center gap-2 border border-slate-200 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined">photo_camera</span>
                        Scan Again
                    </Link>
                    <button className="flex-1 bg-black text-white font-bold py-4 px-6 rounded-full shadow-xl flex items-center justify-center gap-2 transform active:scale-95 transition-all hover:shadow-2xl ring-4 ring-white">
                        <span className="material-symbols-outlined">bookmark_add</span>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
