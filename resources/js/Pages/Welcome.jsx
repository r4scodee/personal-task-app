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
    BarChart3,
    Quote,
} from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Welcome({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const navLinks = [
        { name: "Beranda", href: "#beranda" },
        { name: "Fitur", href: "#modul" },
        { name: "Cara Kerja", href: "#cara-kerja" },
        { name: "Keunggulan", href: "#benefit" },
        { name: "FAQ", href: "#faq" },
        { name: "Testimoni", href: "#testimoni" },
        { name: "Kontak", href: "#kontak" },
    ];

    const faqData = [
        {
            q: "Ini beneran gratis?",
            a: "Iya bro, buat fitur utama kayak bikin folder dan task selamanya gratis buat kamu.",
        },
        {
            q: "Bisa diakses di HP?",
            a: "Aman! Web ini udah mobile-friendly, jadi kamu bisa buka di browser HP mana aja tanpa perlu download aplikasi tambahan.",
        },
        {
            q: "Data aku aman?",
            a: "Kita pake sistem keamanan Supabase dengan enkripsi standar industri. Cuma kamu yang punya kunci akses ke isi tugas kamu.",
        },
        {
            q: "Ada limit jumlah folder atau task?",
            a: "Nggak ada limitasi. Kamu bisa bikin folder sebanyak yang kamu mau, dari projek kuliah sampe list hobi sampingan.",
        },
        {
            q: "Bisa kolaborasi sama temen?",
            a: "Untuk versi v1.7.0 ini masih fokus ke personal planner. Tapi tenang, fitur sharing folder masuk dalam roadmap pengembangan kita!",
        },
        {
            q: "Gimana kalau mau request fitur?",
            a: "Boleh banget! Langsung aja kontak aku lewat WhatsApp atau Instagram. Seneng banget dapet feedback dari sesama dev.",
        },
    ];

    const testimonials = [
        {
            name: "Irbadh",
            role: "Frontend Dev",
            msg: "Simpel banget parah. Aku pake buat list tugas coding Laravel tiap hari, ngebantu fokus ke logic tanpa pusing UI.",
            avatar: "I",
            color: "bg-indigo-500",
        },
        {
            name: "Zubeer",
            role: "Student",
            msg: "Gak berat pas dibuka. Aku nyimpen jadwal market day sekolah di sini, beneran gak ada yang kelewat satu pun.",
            avatar: "Z",
            color: "bg-blue-500",
        },
        {
            name: "User Skinfa",
            role: "Backend Eng",
            msg: "Cocok buat tugas harian. UI-nya clean, gak bikin kognitif load tinggi pas lagi dikejar deadline projek.",
            avatar: "S",
            color: "bg-cyan-500",
        },
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
            <nav
                className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
                    scrolled
                        ? "top-4 w-[90%] max-w-7xl"
                        : "top-0 w-[90%] max-w-7xl"
                }`}
            >
                <div
                    className={`transition-all duration-500 ${
                        scrolled
                            ? "bg-white/60 backdrop-blur-sm border border-white/40 shadow-xl shadow-indigo-100/20 px-4 py-2.5 rounded-[2rem]"
                            : "bg-tranparent backdrop-blur-sm px-4 py-6 border-transparent shadow-none rounded-none"
                    }`}
                >
                    <div className="flex items-center justify-between gap-2">
                        {/* 1. Brand / Logo */}
                        <div className="flex shrink-0 items-center">
                            <Link
                                href="/"
                                className="group flex items-center gap-2 sm:gap-3"
                            >
                                <div className="relative flex items-center justify-center">
                                    <div
                                        className={`absolute inset-0 blur-lg rounded-full transition-all duration-500 ${scrolled ? "bg-indigo-500/20 group-hover:bg-indigo-500/40" : "bg-transparent"}`}
                                    ></div>
                                    <Command className="relative w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5px] transform group-hover:rotate-12 transition-all duration-500 text-indigo-600" />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-sm sm:text-xl font-black italic tracking-tighter uppercase leading-none text-gray-900">
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
                        <div className="hidden md:flex items-center gap-6 lg:gap-8">
                            {navLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`text-[13px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                                        scrolled
                                            ? "text-gray-500 hover:text-indigo-600"
                                            : "text-gray-700 hover:text-indigo-600"
                                    }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .querySelector(item.href)
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        {/* 3. Action Area - Benerin responsif di sini */}
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            <Link
                                href={
                                    auth.user
                                        ? route("dashboard")
                                        : route("login")
                                }
                                className="px-4 sm:px-5 py-2 sm:py-2.5 text-[9px] sm:text-xs font-black uppercase tracking-widest rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 bg-indigo-600 text-white shadow-lg shadow-indigo-200 whitespace-nowrap"
                            >
                                {auth.user ? "Dashboard" : "Login"}
                            </Link>

                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`md:hidden p-1.5 sm:p-2 rounded-xl transition-colors ${scrolled ? "text-gray-600 hover:bg-indigo-50" : "text-gray-900 bg-white/20 backdrop-blur-sm"}`}
                            >
                                {isMenuOpen ? (
                                    <X size={18} />
                                ) : (
                                    <Menu size={18} />
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
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-indigo-600 px-2 transition-colors"
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
                <section
                    id="beranda"
                    className="relative min-h-screen flex items-center justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-transparent to-transparent" />
                        <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-[22rem] h-[22rem] rounded-full bg-cyan-400/10 blur-[100px] animate-pulse" />
                    </div>

                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <FloatingIcon
                            icon={Database}
                            className="top-20 left-[10%] text-indigo-500/50"
                            delay="0s"
                            duration="10s"
                        />
                        <FloatingIcon
                            icon={ShieldCheck}
                            className="top-32 right-[25%] text-slate-400/50"
                            delay="2s"
                            duration="12s"
                        />
                        <FloatingIcon
                            icon={Cpu}
                            className="top-[45%] left-[5%] text-indigo-400/40"
                            delay="1s"
                            duration="9s"
                        />
                        <FloatingIcon
                            icon={Layers}
                            className="bottom-40 right-[10%] text-indigo-600/30"
                            delay="3s"
                            duration="11s"
                        />
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
                                <span className="text-xs text-indigo-500 font-bold uppercase tracking-widest">
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
                                <span className="text-indigo-500 font-bold">
                                    Pusat Kendali
                                </span>{" "}
                                personal kamu untuk mengelola hobi, projek
                                koding, hingga jadwal kuliah dalam satu tempat.
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
                                { label: "Animasi Halus" },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]"
                                >
                                    <CheckCircle
                                        size={14}
                                        className="text-indigo-500"
                                    />
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-10 md:bottom-5 inset-x-0 flex justify-center animate-bounce text-gray-400">
                        <ArrowDown size={24} />
                    </div>
                </section>

                {/* --- MODULES --- */}
                <section
                    id="modul"
                    className="py-24 bg-white border-t border-slate-50 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
                        <div className="absolute top-24 left-10 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-24 right-10 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
                    </div>

                    <div className="max-w-6xl mx-auto px-10 relative z-10">
                        <div className="mb-16">
                            <h2 className="text-sm font-semibold text-indigo-500 tracking-[0.2em] uppercase mb-3">
                                Kemampuan Sistem
                            </h2>
                            <p className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                                Fitur Utama Operasional
                            </p>
                        </div>

                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[
                                    {
                                        title: "Project Architecture",
                                        desc: "Organisir projek Flutter, React, hingga Java dalam struktur folder yang rapi dan logis secara hierarkis.",
                                        icon: <Layout className="w-6 h-6" />,
                                        tag: "Core",
                                    },
                                    {
                                        title: "Reactive Engine",
                                        desc: "Update status tugas secara real-time melalui sistem state management yang responsif tanpa interupsi.",
                                        icon: (
                                            <CheckCircle className="w-6 h-6" />
                                        ),
                                        tag: "Speed",
                                    },
                                    {
                                        title: "Aesthetic Interface",
                                        desc: "Antarmuka minimalis yang dirancang untuk mengurangi kognitif load selama sesi koding jangka panjang.",
                                        icon: <Layers className="w-6 h-6" />,
                                        tag: "UX",
                                    },
                                    {
                                        title: "Priority Control",
                                        desc: "Sistem klasifikasi tugas cerdas berdasarkan urgensi untuk memastikan workflow tetap pada jalurnya.",
                                        icon: <Zap className="w-6 h-6" />,
                                        tag: "Logic",
                                    },
                                    {
                                        title: "Database Sync",
                                        desc: "Sinkronisasi data instan ke cloud server untuk memastikan integritas informasi di berbagai perangkat.",
                                        icon: <Database className="w-6 h-6" />,
                                        tag: "Secure",
                                    },
                                    {
                                        title: "Performance Monitor",
                                        desc: "Pantau efisiensi pengerjaan tugas kamu dengan data statistik yang akurat dan mudah dipahami.",
                                        icon: <BarChart3 className="w-6 h-6" />,
                                        tag: "Analytic",
                                    },
                                ].map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -2 }}
                                        className="p-8 rounded-[2.5rem] bg-slate-50/50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 group text-left"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-indigo-600 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                                {feature.icon}
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                                                {feature.tag}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">
                                            {feature.title}
                                        </h3>

                                        <p className="text-slate-500 leading-relaxed text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                            {feature.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- CARA KERJA (LIST CARD) --- */}
                <section
                    id="cara-kerja"
                    className="py-24 px-6 border-t border-slate-50 relative overflow-hidden"
                >
                    <div
                        className="absolute inset-0 opacity-[0.02] pointer-events-none"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 2px 2px, #4f46e5 1px, transparent 0)",
                            backgroundSize: "40px 40px",
                        }}
                    ></div>

                    <div className="max-w-6xl mx-auto z-10">
                        <div className="mb-16 text-center">
                            <span className="text-indigo-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
                                Cara Kerja
                            </span>
                            <h2 className="text-3xl font-bold mt-2 text-slate-900 tracking-tight">
                                Gak Pake Ribet, Cuma 3 Langkah
                            </h2>
                        </div>

                        <div className="relative">
                            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-100 to-transparent -translate-y-1/2"></div>

                            <div className="grid gap-6 md:grid-cols-3">
                                {[
                                    {
                                        step: "1",
                                        title: "Inisialisasi Folder",
                                        desc: "Kelompokkan tugas kamu biar gak nyampur. Sekolah, kerjaan, atau projek koding sampingan dalam satu struktur.",
                                        icon: (
                                            <FolderPlus className="w-6 h-6" />
                                        ),
                                    },
                                    {
                                        step: "2",
                                        title: "Input & Prioritas",
                                        desc: "Tulis tugas kamu, set prioritasnya (Low, Medium, High). Biarkan sistem mengatur urutan eksekusinya.",
                                        icon: (
                                            <PlusCircle className="w-6 h-6" />
                                        ),
                                    },
                                    {
                                        step: "3",
                                        title: "Monitor & Selesai",
                                        desc: "Tugas yang beres tinggal centang. Dapetin rasa puas pas ngeliat list lo bersih dan tertata rapi.",
                                        icon: (
                                            <CheckCircle2 className="w-6 h-6" />
                                        ),
                                    },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -2 }}
                                        className="group relative p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 text-center overflow-hidden"
                                    >
                                        <div className="relative z-10 w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 mx-auto group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                            {item.icon}
                                        </div>

                                        <h3 className="relative z-10 font-bold text-lg mb-4 text-slate-900 tracking-tight">
                                            {item.step}. {item.title}
                                        </h3>

                                        <p className="relative z-10 text-slate-400 text-sm leading-relaxed font-medium">
                                            {item.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- MENGAPA PILIH KAMI & BENEFIT --- */}
                <section
                    id="benefit"
                    className="py-24 px-6 bg-slate-50 text-slate-900 rounded-[3rem] mx-10 border border-slate-100"
                >
                    <div className="max-w-5xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="text-indigo-500 font-semibold text-sm tracking-widest uppercase">
                                    Mengapa Kami?
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                                    Fokus ke yang Penting, Sisanya Serahin ke
                                    Kami.
                                </h2>
                                <p className="text-slate-400 mb-8 leading-relaxed">
                                    Kami buat TaskPlanner buat kamu yang bosen
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
                                                Flow yang simple bikin kamu gak
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
                <section id="faq" className="py-32 px-6">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex p-3 rounded-2xl bg-indigo-50 text-indigo-500 mb-4">
                                <HelpCircle size={28} />
                            </div>
                            <h2 className="text-4xl font-black tracking-tighter text-slate-900">
                                Paling Sering Ditanyain
                            </h2>
                            <p className="mt-4 text-slate-400 font-medium">
                                Semua yang perlu kamu tahu tentang sistem
                                Mission Control ini.
                            </p>
                        </motion.div>

                        <div className="grid gap-4">
                            {faqData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => toggleFaq(index)}
                                    className={`group cursor-pointer p-4 rounded-[1.5rem] bg-white border transition-all duration-300 ${
                                        openIndex === index
                                            ? "border-indigo-200 shadow-xl shadow-indigo-500/5"
                                            : "border-slate-100 hover:border-indigo-100"
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <h4
                                            className={`font-black text-[16px] tracking-tight transition-colors ${
                                                openIndex === index
                                                    ? "text-indigo-600"
                                                    : "text-slate-500"
                                            }`}
                                        >
                                            {item.q}
                                        </h4>
                                        <motion.div
                                            animate={{
                                                rotate:
                                                    openIndex === index
                                                        ? 180
                                                        : 0,
                                            }}
                                            className="text-slate-400 group-hover:text-indigo-600"
                                        >
                                            <ArrowDown size={20} />
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                    marginTop: 0,
                                                }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                    marginTop: 0,
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                    marginTop: 0,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: "easeInOut",
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-slate-400 text-sm leading-relaxed font-medium border-t border-slate-50 pt-2">
                                                    {item.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- TESTIMONIAL --- */}
                <section
                    id="testimoni"
                    className="py-28 px-6 bg-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-[100px] -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] -z-10"></div>

                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20">
                            <span className="text-indigo-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
                                Validasi Sistem
                            </span>
                            <h2 className="text-4xl font-black tracking-tighter text-slate-900">
                                Apa kata Mereka
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -2 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative p-8 bg-indigo-100/10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col justify-between"
                                >
                                    <div className="relative z-10">
                                        <div className="flex gap-1 text-amber-400 mb-6">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    fill="currentColor"
                                                    strokeWidth={0}
                                                />
                                            ))}
                                        </div>

                                        <p className="text-slate-500 text-sm leading-relaxed font-medium mb-4 italic">
                                            "{item.msg}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 relative z-10">
                                        <div>
                                            <h4 className="font-black text-sm tracking-tight text-slate-900">
                                                {item.name}
                                            </h4>
                                            <p className="text-[12px] font-bold text-slate-400 tracking-tight mt-0.5">
                                                {item.role}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
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
                                    Siap Beresin <br /> Semua Tugas Kamu?
                                </h2>

                                <p className="text-indigo-50 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                                    Gabung sekarang dan mulai rapihin folder
                                    tugas kamu. Gak perlu ribet, cuma butuh 30
                                    detik buat mulai.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        href={route("register")}
                                        className="w-full sm:w-auto bg-white text-indigo-500 px-10 py-4 rounded-xl font-bold text-base hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-700/10"
                                    >
                                        Daftar Gratis Sekarang 
                                    </Link>

                                    <a
                                        href="#modul"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document
                                                .querySelector("#modul")
                                                ?.scrollIntoView({
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
                <footer
                    id="kontak"
                    className="bg-white border-t border-gray-100 pt-24 pb-12"
                >
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
