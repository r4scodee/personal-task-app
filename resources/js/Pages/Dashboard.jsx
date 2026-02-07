import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Dashboard({ auth, stats, recent_folders }) {
    // Logic untuk menghitung persentase progres
    const progress = stats.total_tasks > 0 
        ? Math.round((stats.completed / stats.total_tasks) * 100) 
        : 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <p className="text-xs font-bold text-indigo-500 uppercase tracking-[0.2em] mb-1">Manajemen</p>
                    <h2 className="text-2xl font-black italic text-gray-800 uppercase tracking-tighter">
                        Dashboard Produktivitas
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* Welcome Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <h1 className="text-4xl font-bold text-gray-900">
                            Selamat Datang, <span className="text-indigo-600">{auth.user.name}</span>
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium">Berikut adalah ringkasan produktivitas orbit kamu hari ini.</p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { label: 'Total Folder', value: stats.total_folders, color: 'text-blue-600', glow: 'shadow-blue-100' },
                            { label: 'Tugas Aktif', value: stats.total_tasks, color: 'text-indigo-600', glow: 'shadow-indigo-100' },
                            { label: 'Rating penyelesaian', value: `${progress}%`, color: 'text-emerald-600', glow: 'shadow-emerald-100' },
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                whileHover={{ y: -5 }}
                                className={`bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 ${item.glow}`}
                            >
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{item.label}</p>
                                <h3 className={`text-5xl font-black ${item.color} tracking-tighter`}>{item.value}</h3>
                            </motion.div>
                        ))}
                    </div>

                    {/* Content Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        
                        {/* Recent Folders */}
                        <div>
                            <div className="flex justify-between items-end mb-6 px-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Baru Saja dibuka :</h3>
                                <Link href={route('folders.index')} className="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-widest">Lihat Semua</Link>
                            </div>
                            
                            <div className="space-y-4">
                                {recent_folders.map((folder) => (
                                    <Link 
                                        key={folder.id} 
                                        href={route('folders.show', folder.id)}
                                        className="group flex items-center justify-between p-6 bg-white border border-gray-100 rounded-3xl hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                {folder.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800 uppercase italic">{folder.name}</h4>
                                                <p className="text-xs text-gray-400 font-medium">{folder.tasks_count} Item Misi</p>
                                            </div>
                                        </div>
                                        <div className="text-gray-300 group-hover:text-indigo-600 transition-colors">→</div>
                                    </Link>
                                ))}
                                
                                {recent_folders.length === 0 && (
                                    <div className="p-10 text-center border-2 border-dashed border-gray-100 rounded-[2.5rem]">
                                        <p className="text-gray-400 text-sm font-medium italic">Belum ada folder. Mulai dengan membuat satu!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Action / Tips */}
                        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[3rem] p-10 text-white shadow-xl shadow-indigo-200 flex flex-col justify-between">
                            <div>
                                <h3 className="text-3xl font-black uppercase italic leading-none mb-4">Mulai <br />Rencana Baru</h3>
                                <p className="text-indigo-100 font-medium opacity-80">Organisir tugas kamu ke dalam folder-folder mission agar tidak berantakan.</p>
                            </div>
                            <Link 
                                href={route('folders.index')}
                                className="inline-block mt-8 bg-white text-indigo-600 text-center py-4 rounded-2xl font-bold shadow-lg hover:shadow-white/20 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                Pergi ke Folder Saya
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}