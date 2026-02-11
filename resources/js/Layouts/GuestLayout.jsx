import { Link } from "@inertiajs/react";
import { Command, Sparkles, LayoutGrid, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#fcfdfe] selection:bg-indigo-100 selection:text-indigo-700 font-sans antialiased">
            {/* Sisi Kiri: Form (Login/Register) */}
            <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 xl:px-24 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto w-full max-w-md"
                >
                    {/* Logo Mobile */}
                    <div className="mb-12 lg:hidden flex justify-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                                <Command className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-black tracking-tighter uppercase italic text-slate-900">
                                Task.Planner
                            </span>
                        </Link>
                    </div>

                    {/* Content Wrapper */}
                    <div className="relative">
                        {/* Dekorasi halus */}
                        <div className="absolute -top-12 -left-12 w-24 h-24 bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10"></div>

                        <div className="rounded-[2rem] bg-white border border-slate-100 shadow-sm overflow-hidden p-1">
                            <div className="p-7 sm:p-9 bg-white">
                                {children}
                            </div>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-xs text-slate-400 font-medium">
                        &copy; 2026 Irbadh As-Siribuny • Dibangun untuk
                        Produktivitas
                    </p>
                </motion.div>
            </div>

            {/* Sisi Kanan: Visual Banner */}
            <div className="relative hidden w-1/2 overflow-hidden lg:block bg-indigo-700">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600">
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                            backgroundSize: "32px 32px",
                        }}
                    ></div>
                </div>

                <div className="absolute top-1/4 -right-20 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[120px]"></div>
                <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]"></div>

                <div className="relative flex h-full flex-col items-center justify-center p-16 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="flex justify-center">
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute -inset-4 border border-white/10 rounded-full border-dashed"
                                />
                                <Command className="h-20 w-20 text-white" />
                            </div>
                        </div>

                        {/* Text Branding */}
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.9]">
                                Selamat <br /> Datang kembali
                            </h2>
                            <div className="h-1 w-12 bg-white mx-auto rounded-full"></div>
                            <p className="mx-auto max-w-sm text-lg font-medium text-slate-300 leading-relaxed">
                                Tugas kuliah dan habit kamu dalam satu sistem
                                terpadu.
                            </p>
                        </div>

                        {/* Feature Tags Halus */}
                        <div className="flex items-center justify-center gap-4 pt-2">
                            {[
                                { icon: LayoutGrid, label: "Dashboard" },
                                { icon: CheckCircle2, label: "Habit Tracker" },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
                                >
                                    <item.icon
                                        size={14}
                                        className="text-indigo-400"
                                    />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Footer Version */}
                    <div className="absolute bottom-12 flex items-center gap-3 text-white/50 font-bold tracking-[0.4em] text-[10px] uppercase">
                        <Sparkles size={14} className="text-white/50" />
                        Sistem Terintegrasi v1.7.0
                    </div>
                </div>
            </div>
        </div>
    );
}
