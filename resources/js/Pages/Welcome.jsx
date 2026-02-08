import { Head, Link } from "@inertiajs/react";
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
    X,
    FolderPlus,
    PlusCircle,
    CheckCircle2,
    Zap,
    Clock,
    ShieldCheck,
    HelpCircle,
    Database,
    Cpu,
} from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Welcome({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Beranda", href: "#beranda" },
        { name: "Fitur", href: "#modul" },
        { name: "Cara Kerja", href: "#cara-kerja" },
        { name: "Keunggulan", href: "#benefit" },
        { name: "FAQ", href: "#faq" },
        { name: "Testimoni", href: "#testimoni" },
        { name: "Kontak", href: "#kontak" }
    ];

    const FloatingIcon = ({ icon: Icon, className, style }) => {
        return (
            <div 
                className={`absolute p-4 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 shadow-xl shadow-indigo-500/10 animate-float ${className}`}
                style={style}
            >
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.5px]" />
            </div>
        );
    };

    return (
        <>
            <Head title="Task Planner — Atur Tugas Jadi Lebih Mudah" />

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-25px); }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
            `}</style>

            {/* --- NAVBAR --- */}
            <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl">
                <div className="bg-white/60 backdrop-blur-sm border border-white/40 shadow-lg shadow-indigo-100/20 px-5 py-2 sm:py-3 rounded-[2rem] transition-all duration-300">
                    <div className="flex items-center justify-between">
                        {/* 1. Brand / Logo */}
                        <div className="flex shrink-0 items-center">
                            <Link
                                href="/"
                                className="group flex items-center gap-2 sm:gap-3"
                            >
                                <div className="relative flex items-center justify-center">
                                    <div className="absolute inset-0 bg-indigo-500/20 blur-lg rounded-full group-hover:bg-indigo-500/40 transition-all duration-500"></div>
                                    <Command className="relative w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 stroke-[2.5px] transform group-hover:rotate-12 transition-transform duration-500" />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-sm sm:text-xl font-black italic tracking-tighter text-gray-900 uppercase leading-none">
                                        TASK{" "}
                                        <span className="text-indigo-600">
                                            .
                                        </span>{" "}
                                        PLANNER
                                    </h1>
                                </div>
                            </Link>
                        </div>

                        {/* 2. Navigation Links (Desktop Only) */}
                        <div className="hidden md:flex items-center gap-4 lg:gap-6">
                            {navLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-[13px] font-bold uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors relative group"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.querySelector(item.href)?.scrollIntoView({
                                            behavior: 'smooth'
                                        });
                                    }}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        {/* 3. Action Area (Auth + Hamburger) */}
                        <div className="flex items-center gap-2">
                            <Link
                                href={
                                    auth.user
                                        ? route("dashboard")
                                        : route("login")
                                }
                                className="px-4 sm:px-6 py-2 sm:py-2.5 my-0.5 bg-indigo-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-500 transition-all shadow-md shadow-indigo-200 hover:scale-105 active:scale-95"
                            >
                                {auth.user ? "Dashboard" : "Login"}
                            </Link>

                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 text-gray-600 hover:bg-indigo-50 rounded-xl transition-colors"
                            >
                                {isMenuOpen ? (
                                    <X size={20} />
                                ) : (
                                    <Menu size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* 4. Mobile Menu Content (Animated) */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="md:hidden overflow-hidden"
                            >
                                <div className="flex flex-col gap-4 pt-6 pb-4 border-t border-gray-100 mt-4">
                                    {navLinks.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsMenuOpen(false); 

                                                setTimeout(() => {
                                                    const element = document.querySelector(item.href);
                                                    if (element) {
                                                        element.scrollIntoView({
                                                            behavior: "smooth",
                                                            block: "start",
                                                        });
                                                    }
                                                }, 100); 
                                            }}
                                            className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-indigo-600 px-2 transition-colors duration-200"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>

            <div className="bg-white font-sans selection:bg-indigo-500/30 text-gray-900">
                {/* --- HERO --- */}
                <section id="beranda" className="relative min-h-screen flex items-center justify-center overflow-hidden">

                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-transparent to-transparent" />
                        <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-[22rem] h-[22rem] rounded-full bg-cyan-400/10 blur-[100px] animate-pulse" />
                    </div>

                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <FloatingIcon icon={Database} className="top-20 left-[10%] text-indigo-500/50" delay="0s" duration="10s" />
                        <FloatingIcon icon={ShieldCheck} className="top-32 right-[25%] text-slate-400/50" delay="2s" duration="12s" />
                        <FloatingIcon icon={Cpu} className="top-[45%] left-[5%] text-indigo-400/40" delay="1s" duration="9s" />
                        <FloatingIcon icon={Layers} className="bottom-40 right-[10%] text-indigo-600/30" delay="3s" duration="11s" />
                    </div>

                    <div className="relative z-10 container mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Status Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 md:mb-4 mb-8 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                <span className="text-xs text-indigo-600 font-bold uppercase tracking-widest">
                                    Sistem v1.7.0 Aktif
                                </span>
                            </div>

                            {/* Main Title */}
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none text-gray-900">
                                Rapikan Semesta <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-cyan-500 to-blue-600">
                                    Digital Kamu.
                                </span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
                                Bukan sekadar daftar tugas. Ini adalah{" "}
                                <span className="text-indigo-600 font-bold">
                                    Pusat Kendali
                                </span>{" "}
                                personal kamu untuk mengelola hobi, projek koding, 
                                hingga jadwal kuliah dalam satu tempat.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="group relative px-10 py-4 bg-indigo-600 rounded-2xl font-bold text-white transition-all hover:scale-105 hover:bg-indigo-500 hover:shadow-[0_10px_30px_rgba(79,70,229,0.3)] flex items-center gap-2 shadow-lg shadow-indigo-200"
                                    >
                                        <Layout size={20} />
                                        Masuk Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("register")}
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
                                            href={route("login")}
                                            className="group relative overflow-hidden bg-gray-100/50 backdrop-blur-md border border-gray-200 text-gray-700 transition-all hover:bg-gray-200/50 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm px-10 py-4 rounded-2xl font-bold active:scale-95"
                                        >
                                            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-15deg)_translateX(-110%)] group-hover:[transform:skew(-15deg)_translateX(110%)] transition-transform duration-500">
                                                <div className="relative h-full w-10 bg-white/40 blur-md" />
                                            </div>
                                            <span className="relative z-10">
                                                Akses Masuk
                                            </span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>

                        {/* Feature Snippets */}
                        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-500 opacity-80">
                            {[
                                { label: "Banyak Folder" },
                                { label: "Edit Langsung" },
                                { label: "UI Minimalis" },
                                { label: "Animasi Halus" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    <CheckCircle size={14} className="text-indigo-500" />
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-10 inset-x-0 flex justify-center animate-bounce text-gray-400">
                        <ArrowDown size={24} />
                    </div>
                </section>

                {/* --- MODULES --- */}
                <section id="modul" className="py-24 bg-white border-t border-slate-50 text-center">
                    <div className="max-w-6xl mx-auto px-10">
                        
                        {/* Header Section */}
                        <div className="mb-16">
                            <h2 className="text-sm font-semibold text-indigo-600 tracking-[0.2em] uppercase mb-3">
                                Kemampuan Sistem
                            </h2>
                            <p className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                                Fitur Utama Operasional
                            </p>
                        </div>

                        <div className="max-w-5xl mx-auto"> 
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {[
                                    {
                                        title: "Struktur Folder",
                                        desc: "Organisir projek Flutter, React, hingga Java dalam struktur folder yang rapi dan logis.",
                                        icon: <Layout className="w-6 h-6" />,
                                    },
                                    {
                                        title: "Pantau Tugas",
                                        desc: "Update tugas secara real-time tanpa reload halaman untuk alur kerja yang jauh lebih cepat.",
                                        icon: <CheckCircle className="w-6 h-6" />,
                                    },
                                    {
                                        title: "Tampilan Bersih",
                                        desc: "Antarmuka modern yang nyaman di mata, dirancang khusus untuk sesi koding jangka panjang.",
                                        icon: <Layers className="w-6 h-6" />,
                                    },
                                ].map((feature, i) => (
                                    <div
                                        key={i}
                                        className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-sm transition-all duration-300 group"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-indigo-600 mb-6 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors mx-auto shadow-sm">
                                            {feature.icon}
                                        </div>
                                        
                                        <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">
                                            {feature.title}
                                        </h3>
                                        
                                        <p className="text-slate-500 leading-relaxed text-sm font-medium">
                                            {feature.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- CARA KERJA (LIST CARD) --- */}
                <section id="cara-kerja" className="py-24 px-6 border-t border-slate-50">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-16">
                            <span className="text-indigo-600 font-semibold text-sm tracking-widest uppercase">
                                Cara Kerja
                            </span>
                            <h2 className="text-3xl font-bold mt-2">
                                Gak Pake Ribet, Cuma 3 Langkah
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <FolderPlus
                                    className="text-indigo-600 mb-6"
                                    size={28}
                                />
                                <h3 className="font-bold text-lg mb-2">
                                    1. Buat Folder
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Kelompokkan tugas lo biar gak nyampur.
                                    Sekolah, kerjaan, atau projek sampingan.
                                </p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <PlusCircle
                                    className="text-indigo-600 mb-6"
                                    size={28}
                                />
                                <h3 className="font-bold text-lg mb-2">
                                    2. Tambah Task
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Tulis tugas lo, set prioritasnya (Low,
                                    Medium, High). Beresin satu-satu.
                                </p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                                <CheckCircle2
                                    className="text-indigo-600 mb-6"
                                    size={28}
                                />
                                <h3 className="font-bold text-lg mb-2">
                                    3. Tandai Selesai
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Tugas yang beres tinggal centang. Dapetin
                                    rasa puas pas ngeliat list lo bersih!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- MENGAPA PILIH KAMI & BENEFIT --- */}
                <section id="benefit" className="py-24 px-6 bg-slate-50 text-slate-900 rounded-[3rem] mx-10 border border-slate-100">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="text-indigo-400 font-semibold text-sm tracking-widest uppercase">
                                    Mengapa Kami?
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                                    Fokus ke yang Penting, Sisanya Serahin ke
                                    Kami.
                                </h2>
                                <p className="text-slate-400 mb-8 leading-relaxed">
                                    Kami buat TaskPlanner buat lo yang bosen
                                    sama aplikasi yang terlalu banyak fitur tapi
                                    malah bikin bingung.
                                </p>

                                <ul className="space-y-4">
                                    <li className="flex gap-3 items-start">
                                        <Zap
                                            className="text-indigo-400 mt-1"
                                            size={20}
                                        />
                                        <div>
                                            <span className="font-bold block">
                                                Tugas Beres Lebih Cepet
                                            </span>
                                            <span className="text-slate-400 text-sm">
                                                Flow yang simple bikin lo gak
                                                buang waktu buat setting
                                                ini-itu.
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <Clock
                                            className="text-indigo-400 mt-1"
                                            size={20}
                                        />
                                        <div>
                                            <span className="font-bold block">
                                                Manajemen Waktu Teratur
                                            </span>
                                            <span className="text-slate-400 text-sm">
                                                Tahu mana yang prioritas tinggi
                                                tanpa harus mikir dua kali.
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <ShieldCheck
                                            className="text-indigo-400 mt-1"
                                            size={20}
                                        />
                                        <div>
                                            <span className="font-bold block">
                                                Bikin Pikiran Tenang
                                            </span>
                                            <span className="text-slate-400 text-sm">
                                                Gak ada lagi drama lupa tugas
                                                karena semuanya udah tercatat
                                                aman.
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="hidden lg:block bg-indigo-500/10 p-12 rounded-[2rem] border border-indigo-500/20">
                                <Layout
                                    className="w-full h-full text-indigo-400 opacity-50"
                                    size={200}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- FAQ SECTION --- */}
                <section id="faq" className="py-24 px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <HelpCircle
                                className="mx-auto text-indigo-600 mb-4"
                                size={32}
                            />
                            <h2 className="text-3xl font-bold">
                                Paling Sering Ditanyain
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 border-b border-slate-100">
                                <h4 className="font-bold text-lg mb-2">
                                    Ini beneran gratis?
                                </h4>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Iya bro, buat fitur utama kayak bikin folder
                                    dan task selamanya gratis buat lo.
                                </p>
                            </div>
                            <div className="p-6 border-b border-slate-100">
                                <h4 className="font-bold text-lg mb-2">
                                    Bisa diakses di HP?
                                </h4>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Aman! Web ini udah mobile-friendly, jadi lo
                                    bisa buka di browser HP mana aja.
                                </p>
                            </div>
                            <div className="p-6 border-b border-slate-100">
                                <h4 className="font-bold text-lg mb-2">
                                    Data gue aman?
                                </h4>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Kita pake Supabase buat simpen data lo.
                                    Enkripsinya mantap, jadi cuma lo yang bisa
                                    liat isi tugas lo.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- TESTIMONIAL --- */}
                <section id="testimoni" className="py-24 px-6 bg-slate-50">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-center text-3xl font-bold mb-16">
                            Apa Kata Mereka
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex gap-1 text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-600 text-sm mb-6 leading-relaxed italic">
                                    "Simpel banget parah. Gue pake buat list
                                    tugas coding Laravel tiap hari, ngebantu
                                    fokus."
                                </p>
                                <div className="font-bold text-sm">Irbadh</div>
                                <div className="text-slate-400 text-xs mt-1">
                                    Siswa RPL
                                </div>
                            </div>
                            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex gap-1 text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-600 text-sm mb-6 leading-relaxed italic">
                                    "Gak berat pas dibuka. Gue nyimpen jadwal
                                    market day sekolah di sini, gak ada yang
                                    kelewat."
                                </p>
                                <div className="font-bold text-sm">Zubeer</div>
                                <div className="text-slate-400 text-xs mt-1">
                                    Pelajar
                                </div>
                            </div>
                            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex gap-1 text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-600 text-sm mb-6 leading-relaxed italic">
                                    "Cocok buat tugas harian. UI-nya clean, gak
                                    bikin sakit mata pas dipake malem-malem."
                                </p>
                                <div className="font-bold text-sm">
                                    User Skinfa
                                </div>
                                <div className="text-slate-400 text-xs mt-1">
                                    Backend Dev
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- CTA SECTION --- */}
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <div className="relative py-20 px-8 md:px-16 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-blue-400 text-white shadow-2xl shadow-indigo-100 overflow-hidden text-center">
                            
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                                    Siap Beresin <br /> Semua Tugas Lo?
                                </h2>
                                
                                <p className="text-indigo-50 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                                    Gabung sekarang dan mulai rapihin folder tugas lo. Gak perlu ribet, cuma butuh 30 detik buat mulai.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        href={route("register")}
                                        className="w-full sm:w-auto bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold text-base hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-700/10"
                                    >
                                        Daftar Gratis Sekarang
                                    </Link>
                                    
                                    <a
                                        href="#modul"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.querySelector("#modul")?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                        }}
                                        className="w-full sm:w-auto px-10 py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all text-center"
                                    >
                                        Lihat Fitur
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- FOOTER --- */}
                <footer id="kontak" className="bg-white border-t border-gray-100 pt-24 pb-12">
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
                                        url: "https://github.com/r4scodee",
                                    },
                                    {
                                        name: "WhatsApp",
                                        icon: <MessageCircle size={18} />,
                                        url: "https://wa.me/6283150773059",
                                    },
                                    {
                                        name: "Instagram",
                                        icon: <Instagram size={18} />,
                                        url: "https://instagram.com/1rb4dh",
                                    },
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
                                DIbuat oleh Iras Alizubeer - Sejak 2026
                            </p>
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.3em]">
                                v1.7.0
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

function Star({ size, fill }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={fill}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    );
}
