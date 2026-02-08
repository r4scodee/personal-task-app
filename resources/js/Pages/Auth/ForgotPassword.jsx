import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Send, Loader2, ChevronLeft } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Kata Sandi" />

            {/* Header Section */}
            <div className="mb-8">
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Security Portal</p>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                    Forgot<span className="text-indigo-600">.</span>Password
                </h2>
            </div>

            {/* Instruction Box */}
            <div className="mb-6 p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100">
                <div className="flex gap-4">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl h-fit">
                        <Mail size={20} />
                    </div>
                    <div className="text-[13px] text-slate-600 leading-relaxed font-medium italic">
                        Lupa kata sandi? Tidak masalah. Beritahu kami alamat email Anda dan kami akan mengirimkan tautan pengaturan ulang kata sandi melalui email.
                    </div>
                </div>
            </div>

            {status && (
                <div className="mb-6 text-[11px] font-bold text-emerald-600 bg-emerald-50 p-4 rounded-xl border border-emerald-100 italic uppercase tracking-wide">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email Terdaftar" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-2xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="user@example.com"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="flex flex-col gap-4">
                    <PrimaryButton 
                        className="w-full justify-center py-4 bg-slate-900 rounded-2xl shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all duration-300 gap-2" 
                        disabled={processing}
                    >
                        {processing ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Send size={16} />
                        )}
                        <span className="font-black uppercase tracking-widest text-[11px]">Kirim Tautan Reset</span>
                    </PrimaryButton>

                    <div className="flex justify-center">
                        <Link
                            href={route('login')}
                            className="inline-flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
                        >
                            <ChevronLeft size={14} /> Kembali ke Login
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}