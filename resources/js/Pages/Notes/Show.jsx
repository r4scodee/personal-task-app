import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Calendar, Clock } from 'lucide-react';

export default function Show({ auth, note }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link 
                        href={route('notes.index')} 
                        className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-all"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-0.5">Detail Catatan</p>
                        <h2 className="font-bold text-2xl tracking-tight text-slate-900">
                            {note.title}
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title={`${note.title} — Task Planner`} />

            <div className="min-h-screen bg-white py-12">
                <div className="max-w-3xl mx-auto px-6">
                    {/* Meta Data */}
                    <div className="flex items-center gap-6 mb-10 pb-6 border-b border-slate-50">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Calendar size={14} />
                            <span className="text-xs font-medium">
                                {new Date(note.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Clock size={14} />
                            <span className="text-xs font-medium">
                                {new Date(note.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="relative">
                        <div 
                            className="prose prose-slate max-w-none relative bg-[linear-gradient(transparent_calc(100%-1px),#e2e8f0_100%)] bg-[length:100%_1.75rem] leading-[1.75rem]"
                            style={{ backgroundAttachment: 'local' }}
                        >
                            <p className="text-slate-600 text-lg whitespace-pre-wrap font-medium pb-4">
                                {note.content || 'Catatan ini tidak memiliki isi...'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}