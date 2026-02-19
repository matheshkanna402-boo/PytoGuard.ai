"use client";

import Link from "next/link";
import { UserProfile, useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white/30">
            {/* Header */}
            <header className="pt-12 px-6 pb-6">
                <p className="text-leaf-medium font-medium tracking-wide text-sm uppercase">Account</p>
                <h1 className="text-3xl font-bold tracking-tight text-leaf-dark">My Profile</h1>
            </header>

            <main className="flex-1 px-6 pb-32 space-y-6">
                {/* Signed In View */}
                <SignedIn>
                    {/* User Card */}
                    <div className="glass-panel p-6 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center overflow-hidden shrink-0">
                            {user?.imageUrl ? (
                                <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="material-symbols-outlined text-primary text-3xl">person</span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-bold text-leaf-dark truncate">
                                {user?.fullName || "Gardener"}
                            </h2>
                            <p className="text-sm text-leaf-medium truncate">
                                {user?.primaryEmailAddress?.emailAddress || "No email set"}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                                <span className="text-xs font-medium text-primary">Free Plan</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="glass-panel p-4 rounded-xl text-center">
                            <p className="text-2xl font-bold text-leaf-dark">3</p>
                            <p className="text-[10px] uppercase font-bold text-leaf-medium tracking-wide">Scans</p>
                        </div>
                        <div className="glass-panel p-4 rounded-xl text-center">
                            <p className="text-2xl font-bold text-leaf-dark">2</p>
                            <p className="text-[10px] uppercase font-bold text-leaf-medium tracking-wide">Plants</p>
                        </div>
                        <div className="glass-panel p-4 rounded-xl text-center">
                            <p className="text-2xl font-bold text-primary">Free</p>
                            <p className="text-[10px] uppercase font-bold text-leaf-medium tracking-wide">Plan</p>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-2">
                        <Link href="/garden" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-sage shadow-sm hover:border-primary/30 transition-colors">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">potted_plant</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-leaf-dark">My Garden</h4>
                                <p className="text-xs text-leaf-medium">View your saved plants</p>
                            </div>
                            <span className="material-symbols-outlined text-leaf-medium text-xl">chevron_right</span>
                        </Link>

                        <Link href="/library" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-sage shadow-sm hover:border-primary/30 transition-colors">
                            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-blue-500">local_library</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-leaf-dark">Disease Library</h4>
                                <p className="text-xs text-leaf-medium">Browse all diseases</p>
                            </div>
                            <span className="material-symbols-outlined text-leaf-medium text-xl">chevron_right</span>
                        </Link>

                        <Link href="/about" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-sage shadow-sm hover:border-primary/30 transition-colors">
                            <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-orange-500">info</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-leaf-dark">About PhytoGuard</h4>
                                <p className="text-xs text-leaf-medium">Learn how it works</p>
                            </div>
                            <span className="material-symbols-outlined text-leaf-medium text-xl">chevron_right</span>
                        </Link>

                        <button className="w-full flex items-center gap-4 p-4 bg-white rounded-xl border border-sage shadow-sm hover:border-primary/30 transition-colors">
                            <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-purple-500">notifications</span>
                            </div>
                            <div className="flex-1 text-left">
                                <h4 className="font-bold text-leaf-dark">Notifications</h4>
                                <p className="text-xs text-leaf-medium">Manage alerts & reminders</p>
                            </div>
                            <span className="material-symbols-outlined text-leaf-medium text-xl">chevron_right</span>
                        </button>
                    </div>

                    {/* Upgrade CTA */}
                    <div className="bg-leaf-dark p-5 rounded-2xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 opacity-10">
                            <span className="material-symbols-outlined text-8xl">workspace_premium</span>
                        </div>
                        <h3 className="text-lg font-bold mb-1">Upgrade to Pro</h3>
                        <p className="text-sm text-white/70 mb-4">Unlimited AI scans, priority support, and advanced analytics.</p>
                        <button className="bg-primary text-black font-bold px-6 py-2.5 rounded-full text-sm active:scale-95 transition-transform">
                            Go Pro — $9/mo
                        </button>
                    </div>
                </SignedIn>

                {/* Signed Out View */}
                <SignedOut>
                    <div className="glass-panel p-8 rounded-2xl text-center space-y-4">
                        <div className="h-20 w-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-5xl">person</span>
                        </div>
                        <h2 className="text-2xl font-bold text-leaf-dark">Welcome to PhytoGuard</h2>
                        <p className="text-sm text-leaf-medium">Sign in to save your scans, track your plants, and get personalized care tips.</p>
                        <Link
                            href="/sign-in"
                            className="inline-flex items-center gap-2 bg-primary text-black font-bold px-8 py-3 rounded-full text-sm active:scale-95 transition-transform"
                        >
                            <span className="material-symbols-outlined text-lg">login</span>
                            Sign In
                        </Link>
                        <p className="text-xs text-leaf-medium">
                            Don't have an account?{" "}
                            <Link href="/sign-up" className="text-primary font-bold hover:underline">Sign Up</Link>
                        </p>
                    </div>
                </SignedOut>

                {/* Admin Access — small icon at bottom-left */}
                <div className="pt-4">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-xs text-leaf-medium/40 hover:text-leaf-medium transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                        <span>Admin</span>
                    </Link>
                </div>
            </main>
        </div>
    );
}
