"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ScannerPage() {
    const [image, setImage] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanStatus, setScanStatus] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Start the camera
    const startCamera = useCallback(async () => {
        try {
            setCameraError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment", // Rear camera for plants
                    width: { ideal: 1280 },
                    height: { ideal: 960 },
                },
                audio: false,
            });

            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setCameraActive(true);
            }
        } catch (err) {
            console.error("Camera access denied:", err);
            setCameraError("Camera access denied. Use Gallery to upload a photo.");
            setCameraActive(false);
        }
    }, []);

    // Stop the camera
    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setCameraActive(false);
    }, []);

    // Start camera on mount, stop on unmount
    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, [startCamera, stopCamera]);

    // Capture a photo from the video stream
    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);

        setImage(dataUrl);
        setError(null);
        stopCamera(); // Freeze on the captured frame
    };

    // Retake — go back to live camera
    const handleRetake = () => {
        setImage(null);
        setError(null);
        startCamera();
    };

    // Gallery upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setError(null);
            stopCamera();
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Send to Gemini AI
    const handleScan = async () => {
        if (!image) {
            setError("Capture or upload a photo first.");
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
                body: JSON.stringify({ image, mimeType: "image/jpeg" }),
            });

            setScanStatus("Analyzing plant tissue...");

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Failed to analyze image");
            }

            const data = await response.json();
            setScanStatus("Generating diagnosis...");

            sessionStorage.setItem("ai-diagnosis", JSON.stringify(data.diagnosis));
            sessionStorage.setItem("ai-diagnosis-image", image);

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
        <div className="fixed inset-0 z-40 bg-black text-white font-display flex flex-col overflow-hidden">
            {/* Live Camera Feed / Captured Image */}
            <div className="absolute inset-0">
                {/* Live Video (hidden when image is captured) */}
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`absolute inset-0 w-full h-full object-cover ${image ? "hidden" : "block"}`}
                />

                {/* Captured Image Preview */}
                {image && (
                    <img
                        src={image}
                        alt="Captured plant"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                {/* Hidden Canvas for capture */}
                <canvas ref={canvasRef} className="hidden" />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
            </div>

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between px-4 pt-12 pb-4">
                <button onClick={() => { stopCamera(); router.back(); }} className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-primary/30">
                    <span className={`w-2 h-2 rounded-full ${isScanning ? "bg-primary animate-pulse" :
                            image ? "bg-yellow-400" :
                                cameraActive ? "bg-primary" : "bg-red-400"
                        }`} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${isScanning ? "text-primary" : "text-white/70"
                        }`}>
                        {isScanning ? "Analyzing..." :
                            image ? "Photo Captured" :
                                cameraActive ? "Camera Live" :
                                    "Camera Off"}
                    </span>
                </div>
                <button onClick={image ? handleRetake : undefined} className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                    <span className="material-symbols-outlined">
                        {image ? "refresh" : "flip_camera_ios"}
                    </span>
                </button>
            </div>

            {/* Status / Error Banner */}
            <div className="relative z-10 px-6 mb-6">
                <div className={`text-center backdrop-blur-sm px-6 py-3 rounded-2xl border ${error || cameraError ? "bg-red-500/20 border-red-500/30" : "bg-black/30 border-white/10"
                    }`}>
                    {error || cameraError ? (
                        <span className="text-sm font-medium text-red-300">{error || cameraError}</span>
                    ) : isScanning ? (
                        <span className="text-sm font-medium tracking-wide text-primary">{scanStatus}</span>
                    ) : (
                        <span className="text-sm font-medium tracking-wide uppercase">
                            {image ? "Photo ready — tap Analyze to diagnose" :
                                cameraActive ? "Point at a plant leaf and tap Capture" :
                                    "Starting camera..."}
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

                    {/* Center Indicator */}
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
                            ) : cameraActive ? (
                                <motion.div
                                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="w-12 h-12 rounded-full border-2 border-primary/60 flex items-center justify-center"
                                >
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                </motion.div>
                            ) : null}
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
                    <span className="material-symbols-outlined text-primary text-[18px]">
                        {cameraActive ? "videocam" : image ? "photo_camera" : "videocam_off"}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                        {cameraActive ? "Rear Camera Active" : image ? "Photo Mode" : "Camera Unavailable"}
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

                {/* Main Button: Capture / Analyze */}
                {image ? (
                    // Image captured — show Analyze button
                    <button
                        onClick={handleScan}
                        disabled={isScanning}
                        className="flex flex-col items-center gap-2 -mt-4"
                    >
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 transition-transform active:scale-95 ${isScanning
                                ? "bg-primary/20 border-primary/50 animate-pulse"
                                : "bg-primary border-primary/30 shutter-glow"
                            }`}>
                            <span className={`material-symbols-outlined text-4xl ${isScanning ? "text-primary" : "text-black"}`}>
                                {isScanning ? "hourglass_top" : "biotech"}
                            </span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-white/80">
                            {isScanning ? "Analyzing" : "Analyze"}
                        </span>
                    </button>
                ) : (
                    // No image — show Capture button
                    <button
                        onClick={capturePhoto}
                        disabled={!cameraActive}
                        className="flex flex-col items-center gap-2 -mt-4"
                    >
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 transition-transform active:scale-95 ${cameraActive
                                ? "bg-white border-primary/30 hover:scale-105"
                                : "bg-white/30 border-white/20"
                            }`}>
                            <span className="material-symbols-outlined text-4xl text-leaf-dark">
                                {cameraActive ? "photo_camera" : "videocam_off"}
                            </span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-white/80">
                            Capture
                        </span>
                    </button>
                )}

                {/* Retake / Help */}
                <button
                    onClick={image ? handleRetake : undefined}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white/80">
                            {image ? "refresh" : "help"}
                        </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/60">
                        {image ? "Retake" : "Help"}
                    </span>
                </button>
            </div>
        </div>
    );
}
