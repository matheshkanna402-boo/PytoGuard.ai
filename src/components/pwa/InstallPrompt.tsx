"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Don't show if already dismissed this session
        if (sessionStorage.getItem("pwa-install-dismissed")) return;

        // Don't show if already installed (standalone mode)
        if (window.matchMedia("(display-mode: standalone)").matches) return;

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowBanner(true);
        };

        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            setShowBanner(false);
        }
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setDismissed(true);
        setShowBanner(false);
        sessionStorage.setItem("pwa-install-dismissed", "true");
    };

    if (!showBanner || dismissed) return null;

    return (
        <div className="fixed bottom-24 left-4 right-4 z-40 max-w-md mx-auto animate-[slideUp_0.3s_ease-out]">
            <div className="bg-leaf-dark text-white p-4 rounded-2xl shadow-2xl border border-primary/20 flex items-center gap-4">
                {/* Icon */}
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl">install_mobile</span>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm">Install PhytoGuard</h4>
                    <p className="text-xs text-white/60 truncate">Add to home screen for instant access</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                    <button
                        onClick={handleDismiss}
                        className="text-xs text-white/40 hover:text-white/70 font-medium px-2 py-1"
                    >
                        Later
                    </button>
                    <button
                        onClick={handleInstall}
                        className="bg-primary text-black text-xs font-bold px-4 py-2 rounded-full active:scale-95 transition-transform"
                    >
                        Install
                    </button>
                </div>
            </div>
        </div>
    );
}
