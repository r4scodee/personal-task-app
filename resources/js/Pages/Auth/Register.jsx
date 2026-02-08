import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { UserPlus, User, Mail, Lock, Loader2, LogIn } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun" />

            {/* Header Section */}
            <div className="mb-8">
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Gabung berasama kami</p>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                    Daftar Akun
                </h2>
            </div>

            <form onSubmit={submit} className="space-y-5">
                {/* Nama Lengkap */}
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full rounded-2xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="Masukkan nama lengkap Anda"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-2xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder="contoh@email.com"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-2xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        placeholder="Minimal 8 karakter"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Konfirmasi Password */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi Kata Sandi" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full rounded-2xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        placeholder="Ulangi kata sandi Anda"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* Actions */}
                <div className="pt-4 space-y-4">
                    <PrimaryButton 
                        className="w-full justify-center py-4 bg-slate-900 rounded-2xl shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all duration-300 gap-2 text-white" 
                        disabled={processing}
                    >
                        {processing ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <UserPlus size={16} />
                        )}
                        <span className="font-black uppercase tracking-widest text-[11px]">Daftar Sekarang</span>
                    </PrimaryButton>

                    <div className="text-center">
                        <Link
                            href={route('login')}
                            className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors inline-flex items-center gap-2"
                        >
                            <LogIn size={14} /> Sudah punya akun? Masuk di sini
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}