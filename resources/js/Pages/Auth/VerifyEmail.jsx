import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Send, LogOut, Loader2 } from 'lucide-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email" />

            {/* Header Section */}
            <div className="mb-8">
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Security System</p>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                    Verify<span className="text-indigo-600">.</span>Email
                </h2>
            </div>

            <div className="mb-6 p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100">
                <div className="flex gap-4">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl h-fit">
                        <Mail size={20} />
                    </div>
                    <div className="text-sm text-slate-600 leading-relaxed font-medium italic">
                        Terima kasih telah bergabung! Sebelum memulai, silakan verifikasi alamat email Anda dengan mengeklik tautan yang baru saja kami kirimkan. Tidak menerima email? Kami akan mengirimkan yang baru.
                    </div>
                </div>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-6 text-[11px] font-bold text-emerald-600 bg-emerald-50 p-4 rounded-xl border border-emerald-100 italic uppercase tracking-wide">
                    Tautan verifikasi baru telah dikirimkan ke email yang Anda daftarkan.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-8 flex flex-col gap-4">
                    <PrimaryButton 
                        className="w-full justify-center py-4 bg-slate-900 rounded-2xl shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all duration-300 gap-2" 
                        disabled={processing}
                    >
                        {processing ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Send size={16} />
                        )}
                        <span className="font-black uppercase tracking-widest text-[11px]">Kirim Ulang Verifikasi</span>
                    </PrimaryButton>

                    <div className="flex justify-center">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="inline-flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors"
                        >
                            <LogOut size={14} /> Keluar Sistem
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}