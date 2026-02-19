"use client";

import Link from "next/link";
import { useState } from "react";

const libraryItems = [
    {
        name: "Bacterial Leaf Spot",
        scientific: "Xanthomonas campestris",
        severity: "Critical",
        severityColor: "bg-red-500",
        icon: "water_drop",
        aspect: "aspect-[4/5]",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP5osqX036egajQ2c_4xabay7qtjhjblDPQW6IvvBPJUOBjC7VwNifE4I3GIWg0lpmqu8Zg0xntQxjou8Xif7y75QRXQAozg3OHLPAX7OEMbEgeitorVKOAY-CSi4hr27Sgn4HX5XjUe25Z49PkXwkYs-JkouiXPSgqjGSWWaIQRoFdD8Z_dt5DJNxQCQjcdkhTPFHeJA_w2w61LMrWTB8NIUpb_SZVj2OMmQTdUVLOLLKMUw7RrzMU7BFKoJmnNHReC_iWgRDCgA",
        id: "early-blight",
    },
    {
        name: "Powdery Mildew",
        scientific: "Erysiphales",
        severity: "Common",
        severityColor: "bg-yellow-400",
        icon: "humidity_high",
        aspect: "aspect-[3/5]",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIAn6YwFVjmC1R6aU4YKCOn4qtjAcWR8d6bdEKosccdWNK3MjsfJzNXbVUcEqQIlTMtIFjQpP-orhIPSNFQi2XUhZk7qaBMQY7sam9uhyE37zYhC6w-q7ve2cGsmY6TT5OvB2qoks2BEQdMilV7MuKeGyTuuYEykf-8LjSRgCGSQprFlVuqpSQT-I2Y545rhW156NjrGNxEsjHLHbLVKwccnGHE4G5NRKfTyLkW2yVbcOshGW3XDl6wKcaTaMnwFLc-mcdcjctDcQ",
        id: "powdery-mildew",
    },
    {
        name: "Mealybugs",
        scientific: "Pseudococcidae",
        severity: "High Risk",
        severityColor: "bg-orange-400",
        icon: "wb_sunny",
        aspect: "aspect-[3/4]",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCxD07d-nYiK20pl3ItI-Fu6QKj1MJ_PdhDKqRb-X7QQDeVIjFepM-j8TQQM608mtTT3falVOR_iLbXyO2dHEfuIBoOJSGb3RSt9rYZxg0miYlnFZ4h2ZTrUrrUpYstKZ8LvGzqOLfrsfFqJ1eAIRqUGi54msb9YuNQ_KZF0IczLjLLwqhoYx-78vRDSMC2q5d3ZxN7twpl4MvuDZwagWGZQ7V3n8U7eXINDF3ve0l5nyc_8plW-iENxS2Vfprz6M0HrrTFLXtg-I",
        id: "early-blight",
    },
    {
        name: "Spider Mites",
        scientific: "Tetranychidae",
        severity: "Severe",
        severityColor: "bg-red-500",
        icon: "bug_report",
        aspect: "aspect-square",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVGWAV-qz5Svv1x6y9sZdaMEG2MBhLUADrOuZhDpLjndyracZ7i17zZi-pIpi9wHPplgb1WNkd32ItAcLtPIKMLydYA9gi345RvYF0DeJpgv9vz3Tc3WaAENh-SAM2VDzzltJ8deRWga4EVR5qylQOFxDpgDEyv6KJ4WQaT227x6txQzoIqnKQxc_F3grlYxwrCZ5IbnjjWWEM0nXt90u5Vb3xSfhnH8pvq8YS2bEs-7PocXv9ale7JugUDWOKJ5vum1naIqeMHHk",
        id: "powdery-mildew",
    },
    {
        name: "Cold Shock",
        scientific: "Physiological",
        severity: "Moderate",
        severityColor: "bg-yellow-400",
        icon: "ac_unit",
        aspect: "aspect-square",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7l8_cNrSbdAceolADe8aM5mg85tAhFX_njc6vFLE8Mw9zBB8gcyNu5GD90QV3RsgDCT3vTyArNTOiVG3bwS-Eu2kWZ91RlSz2-njq5iiIfzPLXQ1Zl98UUL73P-KtCy_XEFAxbZjOpNTb_N0deP6iesw8a_6_FfNkPJNeEZo-Wz9tOJTDoTRVxsauVKLYW_kFhrc66d6s7J8Zoj3cEiOJSvdigplKWO3FVm5vuu2p5yl5NwFR7NW9hz8lzt-wIlOQ03dX76i-P_A",
        id: "early-blight",
    },
    {
        name: "Root Rot",
        scientific: "Pythium spp.",
        severity: "Fatal",
        severityColor: "bg-red-500",
        icon: "eco",
        aspect: "aspect-[4/3]",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJxrTOxMKEkKJbJAG1k27NIgvf8kBUQ4dQ-uJ_9QvbcrFD5tIoQz7dnN_0DIInULX5dDqHNiEQBOqkjokH-EutyCY8mFW-SSLuLQdyyyIbNT1PZpq2NVRx5kab7tE7rYwcaRoI3llshd8v13UpkCNXqQP6z3H5ZIa-E-TJZXHck2LiOpDCSulRyzsRTBRR8abPbQ3ZhjVlInDSdO78i464dxSzPJzJP5uQo8tWF8LXa9IoA-45dy502-oIemFHfupLqijykA1hNEs",
        id: "powdery-mildew",
    },
];

const filters = ["All", "Leaf Spots", "Wilting", "Pests", "Mold"];

export default function LibraryPage() {
    const [activeFilter, setActiveFilter] = useState("All");

    return (
        <div className="flex flex-col min-h-screen bg-background-light text-slate-900 font-display antialiased">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-background-light/80 backdrop-blur-md border-b border-primary/10">
                {/* Title */}
                <div className="px-5 pt-12 pb-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Botanical Library
                    </h1>
                    <button className="p-2 rounded-full bg-surface-light shadow-sm text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="px-5 pb-4">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">
                                search
                            </span>
                        </div>
                        <input
                            className="block w-full pl-11 pr-12 py-3.5 bg-surface-light border-none rounded-2xl shadow-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                            placeholder="Search by symptom or plant..."
                            type="text"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-black transition-colors">
                                <span className="material-symbols-outlined text-[20px]">mic</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter Chips */}
                <div className="flex gap-3 px-5 pb-4 overflow-x-auto no-scrollbar">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`flex-none px-5 py-2.5 rounded-full font-semibold text-sm transition-all active:scale-95 ${activeFilter === f
                                    ? "bg-primary text-black shadow-sm shadow-primary/20"
                                    : "bg-surface-light border border-slate-200 text-slate-600 hover:border-primary/50"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry Grid */}
            <main className="flex-1 px-4 py-6 overflow-y-auto pb-24">
                <div className="columns-2 gap-4 space-y-4">
                    {libraryItems.map((item) => (
                        <Link
                            key={item.name}
                            href={`/diagnosis/${item.id}`}
                            className="break-inside-avoid relative rounded-2xl overflow-hidden group bg-surface-light shadow-md block"
                        >
                            <div className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-md rounded-full p-1.5 text-white flex items-center justify-center">
                                <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                            </div>
                            <div className={`${item.aspect} w-full overflow-hidden`}>
                                <img
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src={item.image}
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg leading-tight mb-1 text-slate-900">
                                    {item.name}
                                </h3>
                                <p className="text-xs text-slate-500 italic">{item.scientific}</p>
                                <div className="mt-3 flex items-center gap-1.5">
                                    <span className={`w-2 h-2 rounded-full ${item.severityColor}`} />
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                                        {item.severity}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
