import Link from "next/link";

export default function GardenPage() {
    return (
        <div className="flex flex-col min-h-screen max-w-md mx-auto">
            {/* Header */}
            <header className="pt-12 px-6 pb-4 flex justify-between items-start">
                <div>
                    <p className="text-leaf-medium font-medium tracking-wide text-sm uppercase">My Garden</p>
                    <h1 className="text-3xl font-bold tracking-tight text-leaf-dark">Your Plants</h1>
                </div>
                <button className="p-2 rounded-full bg-surface-light shadow-sm text-slate-500 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </header>

            <main className="flex-1 px-6 pb-32">
                {/* Stats Bar */}
                <div className="flex gap-3 mb-6">
                    <div className="flex-1 glass-panel p-4 rounded-xl text-center">
                        <p className="text-2xl font-bold text-leaf-dark">3</p>
                        <p className="text-xs text-leaf-medium font-medium">Plants</p>
                    </div>
                    <div className="flex-1 glass-panel p-4 rounded-xl text-center">
                        <p className="text-2xl font-bold text-primary">2</p>
                        <p className="text-xs text-leaf-medium font-medium">Healthy</p>
                    </div>
                    <div className="flex-1 glass-panel p-4 rounded-xl text-center">
                        <p className="text-2xl font-bold text-danger">1</p>
                        <p className="text-xs text-leaf-medium font-medium">Needs Care</p>
                    </div>
                </div>

                {/* Plant Cards */}
                <div className="space-y-4">
                    {/* Tomato - Diseased */}
                    <div className="bg-white rounded-2xl border border-sage shadow-sm overflow-hidden">
                        <div className="flex">
                            <div className="w-28 h-28 overflow-hidden">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx-XuttUDtUwZ-eKhTAhd3eQ-33IpZaFjfv4aOO6gxfTS2Z_04O0dMKaZEsRentaGiohXl386wJp0mKTp0GFD6K2RR8vNvvCOf21XjmvFYx2-NryzlejHLrZrxutBAajYSUIVJhs_vpvLb3aeN232MNmy5zg1zbF94JdmRIbsQ0sgoxltHPOKdCsjNPvnGpiueZUyUt6AhNFoR4HvjkUwa1odo2biw-HxzHzVmDyjQt-Xj6GLemr6PyRPjn5Hyw1RnBwlcgBhUQso"
                                    alt="Tomato"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 p-4 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-leaf-dark">Backyard Tomato</h3>
                                    <span className="flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-danger opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-danger" />
                                    </span>
                                </div>
                                <p className="text-xs text-danger font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">bug_report</span>
                                    Early Blight — Treatment in progress
                                </p>
                                <p className="text-[10px] text-leaf-medium mt-1">Added 2 days ago</p>
                            </div>
                        </div>
                    </div>

                    {/* Monstera - Healthy */}
                    <div className="bg-white rounded-2xl border border-sage shadow-sm overflow-hidden">
                        <div className="flex">
                            <div className="w-28 h-28 overflow-hidden">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbH85n_YFO7o3W8bewcIMtcGOhUW3GHGUZkSqRjcmkHtvITeKwTNWpLO2cu18asYFM75vDss52m5f5jxq5PsFELbHhIN8BOcG3D7oTOATOlUchMEhfRQXFzmAbSHoYSDRvPCNYws9hfmGZlAsBS_kPOyfeG9DUnW6_-lTJ7QQ5XxvAKJMQo6Usq5iO1QsRJmjNJfsqS8R9KkLpyUwegTp_UtjoDJcEMHWGbH_5x8-iloUKCNFMeGE4IW_lytBEb32-7JayZzOoFSE"
                                    alt="Monstera"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 p-4 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-leaf-dark">Monstera</h3>
                                    <span className="inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                                </div>
                                <p className="text-xs text-leaf-medium font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                    Healthy
                                </p>
                                <p className="text-[10px] text-leaf-medium mt-1">Added 1 week ago</p>
                            </div>
                        </div>
                    </div>

                    {/* Add New Plant */}
                    <Link
                        href="/scanner"
                        className="flex items-center justify-center p-6 border-2 border-dashed border-sage rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-primary text-2xl">add_a_photo</span>
                            </div>
                            <span className="text-sm font-bold text-leaf-medium">Scan a New Plant</span>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
