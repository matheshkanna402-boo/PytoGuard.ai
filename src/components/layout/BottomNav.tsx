"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", label: "Home", icon: "home" },
    { href: "/library", label: "Library", icon: "local_library" },
    { href: "/scanner", label: "Scan", icon: "camera", isFab: true },
    { href: "/garden", label: "Garden", icon: "potted_plant" },
    { href: "/admin", label: "Profile", icon: "account_circle" },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            {/* FAB Container */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                <Link
                    href="/scanner"
                    className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-leaf-dark text-primary shutter-glow transition-transform active:scale-95"
                >
                    {/* Shutter Rings SVG */}
                    <svg
                        className="absolute inset-0 h-full w-full animate-[spin_10s_linear_infinite] opacity-30"
                        fill="none"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
                        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeDasharray="10 10" strokeWidth="1" />
                    </svg>
                    {/* Icon */}
                    <span
                        className="material-symbols-outlined text-4xl relative z-10 transition-transform group-hover:scale-110"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 48" }}
                    >
                        camera
                    </span>
                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-leaf-dark">
                        <span className="material-symbols-outlined text-sm font-bold">eco</span>
                    </span>
                </Link>
            </div>

            {/* Glass Navbar */}
            <nav className="glass-nav flex h-20 w-full items-end justify-between px-8 pb-3 relative z-10">
                {/* Left Group */}
                <div className="flex gap-8 w-1/3 justify-start">
                    {navItems.filter((_, i) => i < 2).map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center gap-1 group/nav"
                            >
                                <span
                                    className={`material-symbols-outlined text-[28px] transition-colors ${isActive ? "text-primary" : "text-leaf-medium group-hover/nav:text-primary"
                                        }`}
                                >
                                    {item.icon}
                                </span>
                                <span
                                    className={`text-[10px] font-bold transition-colors ${isActive ? "text-primary" : "text-leaf-medium group-hover/nav:text-primary"
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {/* Spacer for FAB */}
                <div className="w-1/3" />

                {/* Right Group */}
                <div className="flex gap-8 w-1/3 justify-end">
                    {navItems.filter((_, i) => i > 2).map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center gap-1 group/nav"
                            >
                                <span
                                    className={`material-symbols-outlined text-[28px] transition-colors ${isActive ? "text-primary" : "text-leaf-medium group-hover/nav:text-primary"
                                        }`}
                                >
                                    {item.icon}
                                </span>
                                <span
                                    className={`text-[10px] font-bold transition-colors ${isActive ? "text-primary" : "text-leaf-medium group-hover/nav:text-primary"
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
