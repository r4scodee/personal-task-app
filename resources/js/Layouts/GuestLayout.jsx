import { Link } from '@inertiajs/react';
import { Command, Rocket, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#f8fafc] selection:bg-indigo-100 selection:text-indigo-700">
            
            <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 xl:px-24">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto w-full max-w-md"
                >
                    <div className="mb-10 lg:hidden flex justify-center">
                        <Link href="/" className="flex items-center gap-2">
                            <Command className="w-8 h-8 text-indigo-600" />
                            <span className="text-xl font-black italic tracking-tighter uppercase">Task.Planner</span>
                        </Link>
                    </div>

                    {/* Wrapper Form */}
                    <div className="rounded-[2.5rem] bg-white p-8 sm:p-10 shadow-2xl shadow-indigo-100/50 border border-gray-100">
                        {children}
                    </div>
                </motion.div>
            </div>

            <div className="relative hidden w-1/2 overflow-hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-800">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                </div>

                <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl"></div>

                <div className="relative flex h-full flex-col items-center justify-center p-12 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Elegant Icon Besar */}
                        <div className="mb-8 flex justify-center">
                            <Command className="h-40 w-40 text-white animate-bounce-slow" />
                        </div>

                        {/* Text Welcome */}
                        <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-4 leading-none">
                            Welcome Back <br /> 
                            <span className="text-indigo-200">Task . Planner</span>
                        </h2>
                        <p className="mx-auto max-w-sm text-lg font-medium text-indigo-100 leading-relaxed opacity-80">
                            Kelola tugas kuliah dan projek dev lo dengan sistem Mission Control yang lebih cerdas.
                        </p>
                    </motion.div>

                    <div className="absolute bottom-12 flex items-center gap-2 text-indigo-200/50 font-bold tracking-[0.3em] text-[10px] uppercase">
                        <Sparkles size={14} /> Organized Universe v1.0
                    </div>
                </div>
            </div>
        </div>
    );
}