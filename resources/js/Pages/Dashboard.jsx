import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Layout, CheckCircle, Folder, ArrowRight, 
    Wallet, Zap, Calendar, TrendingUp, TrendingDown,
    Flame, Clock, FileText
} from 'lucide-react';

export default function Dashboard({ auth, stats, recent_folders, budget_stats, top_habit, next_event }) {
    const progress = stats.total_tasks > 0 
        ? Math.round((stats.completed / stats.total_tasks) * 100) 
        : 0;

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number || 0);
    };

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });

    const formattedDate = time.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });

    const getGreeting = () => {
        const hours = time.getHours(); 
        if (hours >= 5 && hours < 11) return 'SELAMAT PAGI';
        if (hours >= 11 && hours < 15) return 'SELAMAT SIANG';
        if (hours >= 15 && hours < 19) return 'SELAMAT SORE';
        return 'SELAMAT MALAM';
    };

    const greeting = getGreeting();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-1">Kelola Panel</p>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                            Dasboard Produktivitas
                        </h2>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waktu Sistem</p>
                        <p className="text-sm font-black text-slate-900 leading-none mb-1">
                            {formattedDate}
                        </p>
                        <p className="text-[11px] font-bold text-indigo-600 tabular-nums tracking-widest uppercase">
                            {formattedTime} WIB
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Command Center — Task Planner" />

            <div className="py-12 bg-[#f8fafc]">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    
                    {/* --- Welcome Panel--- */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                        {/* Welcome Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[240px]"
                        >
                            <div className="relative z-10">
                                <h1 className="text-4xl font-black tracking-tighter leading-none mb-4">
                                    {greeting} {" "}
                                    <span className="text-indigo-400 uppercase">{auth.user.name}</span>
                                </h1>
                                <p className="text-slate-400 text-sm font-medium max-w-xs leading-relaxed">
                                    Semua sistem berjalan normal. Anda memiliki <span className="text-white font-bold">{stats?.total_tasks || 0} tugas</span> yang menunggu dieksekusi.
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 opacity-10 translate-x-10 -translate-y-10">
                                <Layout size={280} />
                            </div>
                            <div className="relative mt-2 z-10 flex gap-4">
                                <Link href={route('folders.index')} className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95">
                                    Mulai Kerja
                                </Link>
                            </div>
                        </motion.div>

                        {/* Task Progress Circle */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col items-center justify-center text-center shadow-sm">
                            <div className="relative h-32 w-32 mb-4">
                                <svg className="h-full w-full" viewBox="0 0 36 36">
                                    <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <motion.path 
                                        initial={{ strokeDasharray: "0, 100" }}
                                        animate={{ strokeDasharray: `${progress}, 100` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="text-indigo-600" strokeWidth="3" strokeDasharray={`${progress}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-black text-slate-900 tracking-tighter">{progress}%</span>
                                </div>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Task Completion</p>
                        </div>

                        {/* Total Balance Preview */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col justify-between shadow-sm">
                            <div>
                                <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                    <Wallet size={20} />
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Saldo</p>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tighter truncate">{formatRupiah(budget_stats?.balance)}</h3>
                            </div>
                            <Link href={route('budgets.index')} className="text-xs font-bold text-indigo-600 flex items-center gap-2 mt-4 hover:gap-3 transition-all">
                                Keuangan <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* --- MIDDLE ROW: CHARTS & ACTIVE TRACKING --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        
                        {/* Budget Bar Chart (Visualisasi) */}
                        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <TrendingUp size={16} className="text-indigo-600" /> Cashflow Overview
                                </h3>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                                        <span className="text-emerald-600">Pemasukan</span>
                                        <span className="text-slate-900">{formatRupiah(budget_stats?.total_income)}</span>
                                    </div>
                                    <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                        <motion.div 
                                            initial={{ width: 0 }} 
                                            animate={{ width: '100%' }} 
                                            className="h-full bg-emerald-500 rounded-full"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                                        <span className="text-rose-600">Pengeluaran</span>
                                        <span className="text-slate-900">{formatRupiah(budget_stats?.total_expense)}</span>
                                    </div>
                                    <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                        <motion.div 
                                            initial={{ width: 0 }} 
                                            animate={{ width: `${(budget_stats?.total_expense / budget_stats?.total_income) * 100 || 0}%` }} 
                                            className="h-full bg-rose-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Habit Streak Card */}
                        <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-6">Top Streak</p>
                                {top_habit ? (
                                    <>
                                        <h4 className="text-2xl font-black tracking-tight mb-2 uppercase italic">{top_habit.name}</h4>
                                        <div className="flex items-center gap-2">
                                            <Flame className="text-orange-400 animate-pulse" size={24} />
                                            <span className="text-4xl font-black tracking-tighter">{top_habit.streak} HARI</span>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-indigo-200 text-sm">Belum ada streak aktif.</p>
                                )}
                            </div>
                            <div className="absolute -bottom-6 -right-6 text-white opacity-10">
                                <Zap size={150} />
                            </div>
                        </div>
                    </div>

                    {/* --- BOTTOM ROW: ACTIVITY & SCHEDULE --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Folders */}
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">Projek Terkini</h3>
                            {recent_folders.map((folder) => (
                                <Link key={folder.id} href={route('folders.show', folder.id)} className="group flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl hover:border-indigo-600 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all font-bold">
                                            {folder.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600">{folder.name}</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{folder.tasks_count} Sub-Tugas</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={16} className="text-slate-200 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>

                        {/* Next Event / Agenda */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <Clock size={16} className="text-indigo-600" /> Agenda Terdekat
                            </h3>
                            {next_event ? (
                                <div className="relative pl-6 border-l-2 border-indigo-600">
                                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">
                                        {new Date(next_event.start_date).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}
                                    </p>
                                    <h4 className="font-black text-slate-900 text-lg leading-tight uppercase italic">{next_event.title}</h4>
                                    <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">{next_event.description || 'Tidak ada deskripsi.'}</p>
                                </div>
                            ) : (
                                <p className="text-slate-400 text-xs font-medium text-center py-10">Tidak ada agenda mendesak.</p>
                            )}
                            <Link href={route('events.index')} className="w-full mt-10 py-4 bg-slate-50 text-slate-600 rounded-xl font-bold text-[10px] uppercase tracking-widest text-center block hover:bg-slate-100 transition-all">
                                Buka Kalender
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}