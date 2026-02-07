import { Head, Link } from '@inertiajs/react';
import { 
    ArrowDown, 
    Rocket, 
    Layout, 
    CheckCircle, 
    Layers, 
    Github, 
    MessageCircle, 
    Instagram,
    Command,
    Menu,
    X
} from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';

export default function Welcome({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>

        {/* --- NAVBAR --- */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl">
            <div className="bg-white/60 backdrop-blur-sm border border-white/40 shadow-lg shadow-indigo-100/20 px-5 py-2 sm:py-3 rounded-[2rem] transition-all duration-300">
                <div className="flex items-center justify-between">
                    
                    {/* 1. Brand / Logo */}
                    <div className="flex shrink-0 items-center">
                        <Link href="/" className="group flex items-center gap-2 sm:gap-3">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-indigo-500/20 blur-lg rounded-full group-hover:bg-indigo-500/40 transition-all duration-500"></div>
                                <Command className="relative w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 stroke-[2.5px] transform group-hover:rotate-12 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-sm sm:text-xl font-black italic tracking-tighter text-gray-900 uppercase leading-none">
                                    TASK<span className="text-indigo-600">.</span>PLANNER
                                </h1>
                            </div>
                        </Link>
                    </div>

                    {/* 2. Navigation Links (Desktop Only) */}
                    <div className="hidden md:flex items-center gap-8">
                        {['Beranda', 'Modul', 'Kontak'].map((item) => (
                            <a 
                                key={item}
                                href={`#${item.toLowerCase()}`} 
                                className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full rounded-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* 3. Action Area (Auth + Hamburger) */}
                    <div className="flex items-center gap-2">
                        {/* Auth Button - Ukuran menyesuaikan layar */}
                        <Link 
                            href={auth.user ? route('dashboard') : route('login')} 
                            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-indigo-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-500 transition-all shadow-md shadow-indigo-200 hover:scale-105 active:scale-95"
                        >
                            {auth.user ? 'Dashboard' : 'Login'}
                        </Link>

                        {/* Hamburger Button (Mobile Only) */}
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:bg-indigo-50 rounded-xl transition-colors"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* 4. Mobile Menu Content (Animated) */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="flex flex-col gap-4 pt-6 pb-4 border-t border-gray-100 mt-4">
                                {['Beranda', 'Modul', 'Kontak'].map((item) => (
                                    <a 
                                        key={item}
                                        href={`#${item.toLowerCase()}`} 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-indigo-600 px-2"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
            <Head title="Welcome - Mission Control" />
            
            {/* UBAH DISINI: bg-[#0b0e14] jadi bg-white, text-white jadi text-gray-900 */}
            <div className="bg-white font-sans selection:bg-indigo-500/30 text-gray-900">
                
                {/* --- HERO --- */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-transparent to-transparent" />
                        <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-[22rem] h-[22rem] rounded-full bg-cyan-400/10 blur-[100px] animate-pulse" />
                    </div>

                    <div className="relative z-10 container mx-auto px-6 text-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Status Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-8 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                <span className="text-xs text-indigo-600 font-bold uppercase tracking-widest">
                                    v1.0 System Online
                                </span>
                            </div>

                            {/* Main Title (Text gelap) */}
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none text-gray-900">
                                Organize Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-cyan-500 to-blue-600">
                                    Digital Universe.
                                </span>
                            </h1>

                            {/* Subtitle (Text abu gelap) */}
                            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
                                Bukan sekadar to-do list. Ini adalah <span className="text-indigo-600 font-bold">Mission Control</span> personal lo untuk mengelola kegiatan, projek, jadwal, hingga tugas kuliah.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="group relative px-10 py-4 bg-indigo-600 rounded-2xl font-bold text-white transition-all hover:scale-105 hover:bg-indigo-500 hover:shadow-[0_10px_30px_rgba(79,70,229,0.3)] flex items-center gap-2 shadow-lg shadow-indigo-200"
                                    >
                                        <Layout size={20} />
                                        Masuk Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="group relative overflow-hidden bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
                                        >
                                            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-15deg)_translateX(-110%)] group-hover:[transform:skew(-15deg)_translateX(110%)] transition-transform duration-700">
                                                <div className="relative h-full w-10 bg-white/20 blur-md" />
                                            </div>
                                            <span className="relative flex items-center gap-2">
                                                <Rocket size={20} />
                                                Mulai Misi Gratis
                                            </span>
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="group relative overflow-hidden bg-gray-100/50 backdrop-blur-md border border-gray-200 text-gray-700 transition-all hover:bg-gray-200/50 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm px-10 py-4 rounded-2xl font-bold active:scale-95"
                                        >
                                            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-15deg)_translateX(-110%)] group-hover:[transform:skew(-15deg)_translateX(110%)] transition-transform duration-500">
                                                <div className="relative h-full w-10 bg-white/40 blur-md" />
                                            </div>
                                            <span className="relative z-10">Login Command</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>

                        {/* Feature Snippets (Text abu) */}
                        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-500 opacity-80">
                            <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]"><CheckCircle size={14} className="text-indigo-500" /> Multi-Folders</div>
                            <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]"><CheckCircle size={14} className="text-indigo-500" /> Inline Edit</div>
                            <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]"><CheckCircle size={14} className="text-indigo-500" /> Minimalist UI</div>
                            <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]"><CheckCircle size={14} className="text-indigo-500" /> Framer Motion</div>
                        </div>
                    </div>

                    <div className="absolute bottom-10 inset-x-0 flex justify-center animate-bounce text-gray-400">
                        <ArrowDown size={24} />
                    </div>
                </section>

                {/* --- MODULES --- */}
                <section className="relative py-32 border-t border-gray-100 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="mb-20 text-center">
                            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-[0.3em] mb-3">System Capabilities</h2>
                            <p className="text-4xl md:text-5xl font-black text-gray-900 italic uppercase tracking-tighter">Operational Modules</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { 
                                    title: "Folder Logic", 
                                    desc: "Organisir projek Flutter, React, hingga Java dalam struktur folder yang rapi.",
                                    icon: <Layout className="w-6 h-6" />
                                },
                                { 
                                    title: "Mission Tracking", 
                                    desc: "Inline editing untuk update tugas secara real-time tanpa reload halaman.",
                                    icon: <CheckCircle className="w-6 h-6" />
                                },
                                { 
                                    title: "Clean Interface", 
                                    desc: "UI modern yang bersih dan nyaman di mata untuk long-term coding.",
                                    icon: <Layers className="w-6 h-6" />
                                }
                            ].map((feature, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ y: -10 }}
                                    className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-500 group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase italic tracking-tight">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm font-medium">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- CTA --- */}
                <section className="relative py-32 bg-white overflow-hidden border-t border-gray-100">
                    <div className="absolute inset-0 bg-indigo-50/50 opacity-50" />
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <div className="max-w-4xl mx-auto p-16 rounded-[3.5rem] bg-gradient-to-br from-indigo-100/50 to-white border border-indigo-100 shadow-xl shadow-indigo-100/50 backdrop-blur-md">
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 uppercase tracking-tighter italic leading-none">
                                Ready for <br /> Deployment?
                            </h2>
                            <p className="text-gray-600 mb-12 max-w-xl mx-auto font-medium text-lg">
                                Mulai kelola universe digital lo sekarang dan jangan biarkan ada tugas yang melayang tanpa arah.
                            </p>
                            <Link 
                                href={route('register')}
                                className="inline-block bg-indigo-600 text-white px-14 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 hover:shadow-lg hover:shadow-indigo-300 transition-all"
                            >
                                Initialize Mission
                            </Link>
                        </div>
                    </div>
                </section>

                {/* --- FOOTER --- */}
                <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
                    <div className="container mx-auto px-6 text-center md:text-left">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 italic tracking-tighter mb-3 uppercase">
                                    Iras Alizubeer
                                </h2>
                                <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
                                    Digital Creative & Developer.
                                </p>
                            </div>
                            
                            <div className="flex flex-wrap justify-center md:justify-start gap-8">
                                {[
                                    { 
                                        name: "Github", 
                                        icon: <Github size={18} />, 
                                        url: "https://github.com/r4scodee" 
                                    },
                                    { 
                                        name: "WhatsApp", 
                                        icon: <MessageCircle size={18} />, 
                                        url: "https://wa.me/6283150773059" 
                                    },
                                    { 
                                        name: "Instagram", 
                                        icon: <Instagram size={18} />, 
                                        url: "https://instagram.com/1rb4dh" 
                                    }
                                ].map((social, i) => (
                                    <a 
                                        key={i} 
                                        href={social.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-gray-500 hover:text-indigo-600 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest group"
                                    >
                                        <span className="group-hover:scale-110 transition-transform">
                                            {social.icon}
                                        </span> 
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-100 pt-10">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.4em]">
                                &copy; 2026 Personal Task Planner. All rights reserved.
                            </p>
                            <div className="h-1 w-12 bg-indigo-100 mt-6 md:mt-0 rounded-full"></div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}