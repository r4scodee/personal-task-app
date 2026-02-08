import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Calendar, Folder, ReceiptText, Wallet } from 'lucide-react';

export default function Show({ auth, budget }) {
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('budgets.index')} className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-all">
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-0.5">Rincian Keuangan</p>
                        <h2 className="font-bold text-2xl tracking-tight text-slate-900">Detail Transaksi</h2>
                    </div>
                </div>
            }
        >
            <Head title="Rincian Anggaran — Task Planner" />

            <div className="py-12 bg-white min-h-screen">
                <div className="max-w-2xl mx-auto px-6">
                    {/* Header Card Nominal */}
                    <div className={`p-10 rounded-[2.5rem] border text-center mb-10 ${budget.type === 'income' ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                        <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-4 ${budget.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {budget.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                        </p>
                        <h1 className={`text-5xl font-black tracking-tighter ${budget.type === 'income' ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {formatRupiah(budget.amount)}
                        </h1>
                    </div>

                    {/* Information Grid */}
                    <div className="space-y-4">
                        {[
                            { label: 'Deskripsi', value: budget.description, icon: <ReceiptText size={18} /> },
                            { label: 'Projek / Folder', value: budget.folder.name, icon: <Folder size={18} /> },
                            { label: 'Tanggal Transaksi', value: new Date(budget.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), icon: <Calendar size={18} /> },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-4 text-slate-500">
                                    {item.icon}
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}