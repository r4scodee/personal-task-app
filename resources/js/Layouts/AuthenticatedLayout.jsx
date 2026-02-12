import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage, Head } from "@inertiajs/react";
import { useState } from "react";
import {
    User,
    LogOut,
    Command,
    Github,
    MessageCircle,
    Instagram,
    Menu,
    X,
    LayoutDashboard,
    Folder,
    FileText,
    Wallet,
    Zap,
    Calendar,
    ChevronDown,
} from "lucide-react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const navItems = [
        {
            name: "Dashboard",
            href: route("dashboard"),
            active: "dashboard",
            icon: <LayoutDashboard size={14} />,
        },
        {
            name: "Folder",
            href: route("folders.index"),
            active: "folders.*",
            icon: <Folder size={14} />,
        },
        {
            name: "Catatan",
            href: route("notes.index"),
            active: "notes.*",
            icon: <FileText size={14} />,
        },
        {
            name: "Tabungan",
            href: route("budgets.index"),
            active: "budgets.*",
            icon: <Wallet size={14} />,
        },
        {
            name: "Habit",
            href: route("habits.index"),
            active: "habits.*",
            icon: <Zap size={14} />,
        },
        {
            name: "Jadwal",
            href: route("events.index"),
            active: "events.*",
            icon: <Calendar size={14} />,
        },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
            {/* --- NAVBAR --- */}
            <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
                <nav className="mx-auto max-w-7xl rounded-[2rem] border border-white/40 bg-white/60 backdrop-blur-sm shadow-lg shadow-indigo-100/10 transition-all duration-300">
                    <div className="px-5 sm:px-8">
                        <div className="relative flex h-14 items-center justify-between">
                            {/* --- BAGIAN KIRI: LOGO --- */}
                            <div className="flex items-center shrink-0">
                                <Link
                                    href="/"
                                    className="group flex items-center gap-2"
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

                            {/* --- BAGIAN TENGAH: LINKS (DESKTOP) --- */}
                            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-4">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        href={item.href}
                                        active={route().current(item.active)}
                                        className={`text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-indigo-600 border-none transition-colors relative group ${
                                            route().current(item.active)
                                                ? "text-indigo-600"
                                                : "text-slate-400 hover:text-indigo-600"
                                        }`}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>

                            {/* --- BAGIAN KANAN: PROFILE & MOBILE TOGGLE --- */}
                            <div className="flex items-center gap-2">
                                <div className="hidden sm:flex sm:items-center">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button className="group flex items-center gap-3 rounded-full py-1.5 pl-2 pr-1 transition-all duration-300 hover:opacity-80">
                                                <div className="flex flex-col items-end leading-tight">
                                                    <span className="text-sm font-black text-slate-900 tracking-tight uppercase">
                                                        {user.name}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest opacity-60">
                                                        Member Since {new Date(user.created_at).getFullYear()}
                                                    </span>
                                                </div>

                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 overflow-hidden shadow-sm border border-white/50 ring-2 ring-slate-100 group-hover:ring-indigo-100 transition-all">
                                                    {user.profile_photo_path ? (
                                                        <img
                                                            src={`/storage/${user.profile_photo_path}`}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-white text-sm font-black uppercase">
                                                            {user.name.charAt(
                                                                0,
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content
                                            align="right"
                                            width="48"
                                            contentClasses="py-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100/50 mt-2"
                                        >
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                                className="flex items-center gap-3 px-5 py-2.5 text-[10px] font-black text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all uppercase tracking-widest"
                                            >
                                                <User
                                                    size={16}
                                                    className="opacity-50"
                                                />{" "}
                                                Pengaturan Akun
                                            </Dropdown.Link>
                                            <div className="border-t border-slate-50 my-1 mx-4"></div>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                                className="flex items-center gap-3 px-5 py-2.5 text-[10px] font-black text-rose-500 hover:bg-rose-50/50 transition-all uppercase tracking-widest w-full text-left"
                                            >
                                                <LogOut
                                                    size={14}
                                                    className="opacity-50"
                                                />{" "}
                                                Keluar
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>

                                {/* Hamburger Mobile */}
                                <div className="flex items-center lg:hidden">
                                    <button
                                        onClick={() =>
                                            setShowingNavigationDropdown(
                                                !showingNavigationDropdown,
                                            )
                                        }
                                        className="rounded-xl p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                                    >
                                        {showingNavigationDropdown ? (
                                            <X className="h-5 w-5" />
                                        ) : (
                                            <Menu className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Content */}
                    <div
                        className={`${showingNavigationDropdown ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"} lg:hidden overflow-hidden transition-all duration-300 ease-in-out`}
                    >
                        <div className="px-4 pb-6 pt-2 space-y-1 border-t border-gray-100/50">
                            {navItems.map((item) => (
                                <ResponsiveNavLink
                                    key={item.name}
                                    href={item.href}
                                    active={route().current(item.active)}
                                    className="flex items-center gap-3"
                                >
                                    <span className="opacity-50">
                                        {item.icon}
                                    </span>
                                    {item.name}
                                </ResponsiveNavLink>
                            ))}
                            <div className="pt-4 mt-4 border-t border-gray-100/50">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Pengaturan Akun
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                    className="text-red-600"
                                >
                                    Keluar
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {/* --- Content Area --- */}
            <div className="pt-24 sm:pt-28 flex-grow">
                {header && (
                    <header className="mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-7xl">
                            <div className="rounded-[2rem] bg-indigo-600/5 p-6 sm:p-8 border border-indigo-100/50">
                                {header}
                            </div>
                        </div>
                    </header>
                )}
                <main className="px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </main>
            </div>

            {/* --- FOOTER --- */}
            <footer className="bg-white border-t border-gray-100 pt-12 pb-8 mt-auto">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center md:text-left">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 italic tracking-tighter mb-2 uppercase">
                                Iras Alizubeer
                            </h2>
                            <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                                Digital Creative & Developer.
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <a
                                href="https://github.com/r4scodee"
                                target="_blank"
                                className="text-gray-500 hover:text-indigo-600 transition-all"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href="https://wa.me/6283150773059"
                                target="_blank"
                                className="text-gray-500 hover:text-indigo-600 transition-all"
                            >
                                <MessageCircle size={18} />
                            </a>
                            <a
                                href="https://instagram.com/1rb4dh"
                                target="_blank"
                                className="text-gray-500 hover:text-indigo-600 transition-all"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-10 text-[10px] text-gray-400 uppercase font-bold tracking-[0.4em]">
                        <p>Dibuat oleh Irbadh - 2026</p>
                        <p>v1.7.0</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
