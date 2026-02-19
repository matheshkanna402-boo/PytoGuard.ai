import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen max-w-md mx-auto">
            {/* Header */}
            <header className="pt-12 px-6 pb-6">
                <p className="text-leaf-medium font-medium tracking-wide text-sm uppercase mb-1">About</p>
                <h1 className="text-3xl font-bold tracking-tight text-leaf-dark">PhytoGuard AI</h1>
            </header>

            <main className="flex-1 px-6 pb-32 space-y-8">
                {/* Mission Statement */}
                <div className="glass-panel p-6 rounded-2xl space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-2xl">eco</span>
                        </div>
                        <h2 className="text-xl font-bold text-leaf-dark">Our Mission</h2>
                    </div>
                    <p className="text-leaf-medium text-sm leading-relaxed font-medium">
                        PhytoGuard AI combines advanced machine learning with botanical expertise to help gardeners and farmers
                        protect their plants from diseases instantly. We aim to reduce the 40% of global crop yields lost to
                        pests and diseases every year.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-xl border border-sage p-4 text-center shadow-sm">
                        <p className="text-2xl font-bold text-primary">500K+</p>
                        <p className="text-[10px] text-leaf-medium font-bold uppercase tracking-wider mt-1">Images Trained</p>
                    </div>
                    <div className="bg-white rounded-xl border border-sage p-4 text-center shadow-sm">
                        <p className="text-2xl font-bold text-primary">96.4%</p>
                        <p className="text-[10px] text-leaf-medium font-bold uppercase tracking-wider mt-1">Accuracy</p>
                    </div>
                    <div className="bg-white rounded-xl border border-sage p-4 text-center shadow-sm">
                        <p className="text-2xl font-bold text-primary">124K</p>
                        <p className="text-[10px] text-leaf-medium font-bold uppercase tracking-wider mt-1">Total Scans</p>
                    </div>
                </div>

                {/* How It Works */}
                <div>
                    <h2 className="text-xl font-bold text-leaf-dark mb-4">How It Works</h2>
                    <div className="space-y-3">
                        {[
                            { icon: "photo_camera", step: "01", title: "Snap a Photo", desc: "Take a close-up photo of the affected leaf or plant." },
                            { icon: "cognition", step: "02", title: "AI Analysis", desc: "Our model scans 500K+ reference images in seconds." },
                            { icon: "medical_services", step: "03", title: "Get Treatment", desc: "Receive a step-by-step organic or chemical prescription." },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-4 items-start bg-white rounded-xl border border-sage p-4 shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-leaf-dark">{item.title}</h3>
                                        <span className="text-xs font-bold text-slate-300">{item.step}</span>
                                    </div>
                                    <p className="text-sm text-leaf-medium mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-leaf-dark rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-bold text-white mb-2">Ready to protect your garden?</h2>
                    <p className="text-sm text-white/60 mb-4">Start diagnosing plant diseases in seconds.</p>
                    <Link
                        href="/scanner"
                        className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined">camera</span>
                        Start Scanning
                    </Link>
                </div>
            </main>
        </div>
    );
}
