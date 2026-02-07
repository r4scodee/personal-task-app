import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { User, LogOut, Command, Github, MessageCircle, Instagram, Menu, X } from 'lucide-react'; 

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col">
            <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
                <nav className="mx-auto max-w-7xl rounded-[2rem] border border-white/40 bg-white/60 backdrop-blur-sm shadow-lg shadow-indigo-100/20 transition-all duration-300">
                    <div className="px-5 sm:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <div className="flex items-center">
                                <div className="flex shrink-0 items-center mr-4 sm:mr-8"> 
                                    <Link href="/" className="group flex items-center gap-2">
                                        <div className="relative flex items-center justify-center">
                                            <div className="absolute inset-0 bg-indigo-500/20 blur-lg rounded-full group-hover:bg-indigo-500/40 transition-all"></div>
                                            <Command className="relative w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 stroke-[2.5px] transform group-hover:rotate-12 transition-transform duration-500" />
                                        </div>
                                        <span className="text-base sm:text-lg font-black italic tracking-tighter text-gray-900 uppercase">
                                            Task <span className="text-indigo-600">.</span> Planner
                                        </span>
                                    </Link>
                                </div>

                                {/* Desktop Links */}
                                <div className="hidden space-x-4 sm:flex">
                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                        className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors relative group border-none focus:border-none"
                                    >
                                        Dashboard
                                        {/* Efek Underline Simetris */}
                                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 transition-all rounded-full ${route().current('dashboard') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                    </NavLink>
                                    
                                    <NavLink 
                                        href={route('folders.index')} 
                                        active={route().current('folders.index')}
                                        className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors relative group border-none focus:border-none"
                                    >
                                        Folder Saya
                                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 transition-all rounded-full ${route().current('folders.index') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                    </NavLink>
                                </div>
                            </div>

                            {/* User Dropdown (Desktop) */}
                            <div className="hidden sm:flex sm:items-center">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="group flex items-center gap-3 rounded-[2rem] bg-white/50 backdrop-blur-sm px-3 py-1.5 border border-gray-100 hover:bg-white hover:shadow-sm transition-all duration-300">
                                            {/* Profile Initial - Kotak Minimalis */}
                                            <div className="flex h-7 w-7 items-center justify-center rounded-[2rem] bg-indigo-600 text-white text-[10px] font-black uppercase tracking-tighter">
                                                {user.name.charAt(0)}
                                            </div>

                                            {/* Name - Simpel */}
                                            <span className="text-sm font-bold text-gray-700 tracking-tight">
                                                {user.name}
                                            </span>

                                            {/* Chevron */}
                                            <svg className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content 
                                        align="right" 
                                        width="48" 
                                        contentClasses="py-1 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-100"
                                    >
                                        <Dropdown.Link 
                                            href={route('profile.edit')}
                                            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all uppercase tracking-widest"
                                        >
                                            <User size={14} /> Profile
                                        </Dropdown.Link>

                                        <div className="border-t border-gray-50 my-1"></div>

                                        <Dropdown.Link 
                                            href={route('logout')} 
                                            method="post" 
                                            as="button"
                                            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-all uppercase tracking-widest w-full text-left"
                                        >
                                            <LogOut size={14} /> Logout
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>

                            {/* Mobile Toggle Button */}
                            <div className="flex items-center sm:hidden">
                                <button 
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} 
                                    className="rounded-xl p-2 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150"
                                >
                                    {showingNavigationDropdown ? (
                                        <X className="h-6 w-6" />
                                    ) : (
                                        <Menu className="h-6 w-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Content - Muncul di bawah Navbar saat toggle aktif */}
                    <div className={`${showingNavigationDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} sm:hidden overflow-hidden transition-all duration-300 ease-in-out`}>
                        <div className="px-4 pb-6 pt-2 space-y-2 border-t border-gray-100/50">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('folders.index')} active={route().current('folders.index')}>
                                Folder Saya
                            </ResponsiveNavLink>
                            <div className="pt-4 pb-1 border-t border-gray-100/50">
                                <div className="px-4 mb-3">
                                    <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Account</div>
                                    <div className="text-sm font-black text-gray-800 italic uppercase">{user.name}</div>
                                </div>
                                <ResponsiveNavLink href={route('profile.edit')}>Profile Settings</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-red-600">
                                    Log Out System
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
                            {/* Header box responsif padding */}
                            <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-indigo-600/5 p-6 sm:p-8 border border-indigo-100/50">
                                {header}
                            </div>
                        </div>
                    </header>
                )}

                <main className="px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>

            {/* --- FOOTER SECTION --- */}
            <footer className="bg-white border-t border-gray-100 pt-12 pb-8 mt-auto">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12 text-center md:text-left">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 italic tracking-tighter mb-2 uppercase">
                                Iras Alizubeer
                            </h2>
                            <p className="text-gray-400 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                                Digital Creative & Developer.
                            </p>
                        </div>
                        
                        {/* Social Links Responsif gap */}
                        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                            {[
                                { name: "Github", icon: <Github size={16} />, url: "https://github.com/r4scodee" },
                                { name: "WhatsApp", icon: <MessageCircle size={16} />, url: "https://wa.me/6283150773059" },
                                { name: "Instagram", icon: <Instagram size={16} />, url: "https://instagram.com/1rb4dh" }
                            ].map((social, i) => (
                                <a 
                                    key={i} 
                                    href={social.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-gray-500 hover:text-indigo-600 transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group"
                                >
                                    <span className="group-hover:scale-110 transition-transform">
                                        {social.icon}
                                    </span> 
                                    <span className="hidden xs:inline">{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-100 pt-8 gap-4">
                        <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold tracking-[0.3em] text-center">
                            &copy; 2026 Task Planner. All rights reserved.
                        </p>
                        <div className="h-1 w-12 bg-indigo-100 rounded-full"></div>
                    </div>
                </div>
            </footer>
        </div>
    );
}