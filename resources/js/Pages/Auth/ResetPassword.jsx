import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Lock, RefreshCcw, Loader2 } from 'lucide-react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Atur Ulang Kata Sandi" />

            {/* Header Section */}
            <div className="mb-8">
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Security Update</p>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                    Reset<span className="text-indigo-600">.</span>Password
                </h2>
            </div>

            <form onSubmit={submit} className="space-y-5">
                {/* Email - Biasanya readonly karena sudah dari link email */}
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-2xl border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed shadow-sm"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        readOnly
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password Baru */}
                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi Baru" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-2xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Konfirmasi Password */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi Kata Sandi" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2" />
                    <TextInput
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full rounded-2xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="pt-4">
                    <PrimaryButton 
                        className="w-full justify-center py-4 bg-slate-900 rounded-2xl shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all duration-300 gap-2" 
                        disabled={processing}
                    >
                        {processing ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <RefreshCcw size={16} />
                        )}
                        <span className="font-black uppercase tracking-widest text-[11px]">Perbarui Kata Sandi</span>
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}