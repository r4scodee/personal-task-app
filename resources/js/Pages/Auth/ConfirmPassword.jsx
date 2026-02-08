import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { ShieldAlert, Lock, Loader2, KeyRound } from 'lucide-react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Konfirmasi Akses" />

            {/* Header Section */}
            <div className="mb-8">
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Security Authentication</p>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                    Confirm<span className="text-indigo-600">.</span>Access
                </h2>
            </div>

            {/* Warning Box */}
            <div className="mb-6 p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100">
                <div className="flex gap-4">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl h-fit">
                        <ShieldAlert size={20} />
                    </div>
                    <div className="text-[13px] text-slate-600 leading-relaxed font-medium italic">
                        Ini adalah area aplikasi yang aman. Silakan konfirmasi kata sandi Anda sebelum melanjutkan ke tahap berikutnya.
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi Anda" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2" />
                    
                    <div className="relative">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full rounded-2xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm pl-11"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <Lock size={16} />
                        </div>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center py-4 bg-slate-900 rounded-2xl shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all duration-300 gap-2" 
                        disabled={processing}
                    >
                        {processing ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <KeyRound size={16} />
                        )}
                        <span className="font-black uppercase tracking-widest text-[11px]">Konfirmasi Akses</span>
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}