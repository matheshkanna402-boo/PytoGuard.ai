"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ScannerPage() {
    const [image, setImage] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanStatus, setScanStatus] = useState("");
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setError(null);
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleScan = async () => {
        if (!image) {
            setError("Please upload or capture a photo first.");
            return;
        }

        setIsScanning(true);
        setError(null);
        setScanStatus("Preparing image...");

        try {
            setScanStatus("Sending to AI engine...");

            const response = await fetch("/api/diagnose", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    image: image,
                    mimeType: "image/jpeg",
                }),
            });

            setScanStatus("Analyzing plant tissue...");

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Failed to analyze image");
            }

            const data = await response.json();

            setScanStatus("Generating diagnosis...");

            // Store results in sessionStorage for the result page
            sessionStorage.setItem("ai-diagnosis", JSON.stringify(data.diagnosis));
            sessionStorage.setItem("ai-diagnosis-image", image);

            // Brief pause to show final status
            await new Promise((r) => setTimeout(r, 500));

            router.push("/diagnosis/ai-result");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            setError(message);
            setIsScanning(false);
            setScanStatus("");
        }
    };

    return (
        <div className="fixed inset-0 z-40 bg-leaf-dark text-white font-display flex flex-col overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                style={{
                    backgroundImage: image
                        ? `url('${image}')`
                        : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDbH85n_YFO7o3W8bewcIMtcGOhUW3GHGUZkSqRjcmkHtvITeKwTNWpLO2cu18asYFM75vDss52m5f5jxq5PsFELbHhIN8BOcG3D7oTOATOlUchMEhfRQXFzmAbSHoYSDRvPCNYws9hfmGZlAsBS_kPOyfeG9DUnW6_-lTJ7QQ5XxvAKJMQo6Usq5iO1QsRJmjNJfsqS8R9KkLpyUwegTp_UtjoDJcEMHWGbH_5x8-iloUKCNFMeGE4IW_lytBEb32-7JayZzOoFSE')",
                    opacity: image ? 0.7 : 0.4,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between px-4 pt-12 pb-4">
                <button onClick={() => router.back()} className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-primary/30">
                    <span className={`w-2 h-2 rounded-full ${isScanning ? "bg-primary animate-pulse" : image ? "bg-yellow-400" : "bg-white/40"}`} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${isScanning ? "text-primary" : "text-white/70"}`}>
                        {isScanning ? "Analyzing..." : image ? "Ready to Scan" : "AI Scan Active"}
                    </span>
                </div>
                <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                    <span className="material-symbols-outlined">settings</span>
                </button>
            </div>

            {/* Status / Error Banner */}
            <div className="relative z-10 px-6 mb-6">
                <div className={`text-center backdrop-blur-sm px-6 py-3 rounded-2xl border ${error ? "bg-red-500/20 border-red-500/30" : "bg-black/30 border-white/10"}`}>
                    {error ? (
                        <span className="text-sm font-medium text-red-300">{error}</span>
                    ) : isScanning ? (
                        <span className="text-sm font-medium tracking-wide text-primary">{scanStatus}</span>
                    ) : (
                        <span className="text-sm font-medium tracking-wide uppercase">
                            {image ? "Photo loaded — tap Analyze to diagnose" : "Upload or capture a plant photo"}
                        </span>
                    )}
                </div>
            </div>

            {/* Scan Frame */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-12">
                <div className="relative w-full max-w-[300px] aspect-square">
                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-10 h-10 border-t-3 border-l-3 border-primary rounded-tl-xl" />
                    <div className="absolute top-0 right-0 w-10 h-10 border-t-3 border-r-3 border-primary rounded-tr-xl" />
                    <div className="absolute bottom-0 left-0 w-10 h-10 border-b-3 border-l-3 border-primary rounded-bl-xl" />
                    <div className="absolute bottom-0 right-0 w-10 h-10 border-b-3 border-r-3 border-primary rounded-br-xl" />

                    <div className="absolute inset-3 border border-white/20 rounded-lg" />

                    {/* Center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AnimatePresence>
                            {isScanning ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: [0.8, 1.2, 0.8], opacity: 1 }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="w-16 h-16 rounded-full border-2 border-primary"
                                />
                            ) : image ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
                                >
                                    <span className="material-symbols-outlined text-primary text-3xl">check</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="w-12 h-12 rounded-full border-2 border-yellow-400 flex items-center justify-center"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Scan Line */}
                    <AnimatePresence>
                        {isScanning && (
                            <motion.div
                                initial={{ top: 0 }}
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_rgba(19,236,91,0.8)]"
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Lighting Indicator */}
            <div className="relative z-10 flex justify-center mb-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                    <span className="material-symbols-outlined text-primary text-[18px]">wb_sunny</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                        Lighting: Good
                    </span>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="relative z-10 flex items-end justify-between px-10 pb-12">
                {/* Gallery */}
                <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
                        {image ? (
                            <img src={image} alt="Gallery" className="w-full h-full object-cover" />
                        ) : (
                            <span className="material-symbols-outlined text-white/80">photo_library</span>
                        )}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/60">Gallery</span>
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

                {/* Analyze / Capture Button */}
                <button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="flex flex-col items-center gap-2 -mt-4"
                >
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 transition-transform active:scale-95 ${isScanning
                            ? "bg-primary/20 border-primary/50 animate-pulse"
                            : image
                                ? "bg-primary border-primary/30 shutter-glow"
                                : "bg-white border-primary/30"
                        }`}>
                        <span className={`material-symbols-outlined text-4xl ${image && !isScanning ? "text-black" : "text-leaf-dark"}`}>
                            {isScanning ? "hourglass_top" : image ? "biotech" : "center_focus_strong"}
                        </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/80">
                        {isScanning ? "Analyzing" : image ? "Analyze" : "Capture"}
                    </span>
                </button>

                {/* Help */}
                <button className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white/80">help</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/60">Help</span>
                </button>
            </div>
        </div>
    );
}
