import { useState } from 'react'; // 1. Wajib import ini
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { LogIn, UserPlus, Eye, EyeOff } from 'lucide-react'; // 2. Tambah Eye & EyeOff

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false); // 3. State untuk toggle

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Header Login */}
            <div className="mb-8">
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Portal Keamanan</p>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                    Masuk
                </h2>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100 italic">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* Email Field */}
                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-2xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password Field */}
                <div>
                    <div className="flex justify-between items-center ml-1 mb-2">
                        <InputLabel htmlFor="password" value="Password" className="text-[10px] font-black uppercase tracking-widest text-slate-400" />
                        
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter hover:text-slate-900 transition-colors"
                            >
                                Lupa Password?
                            </Link>
                        )}
                    </div>

                    <div className="relative group">
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'} // Tipe dinamis
                            name="password"
                            value={data.password}
                            className="block w-full rounded-2xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm pr-12"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        {/* Tombol Toggle Mata */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors p-1"
                        >
                            {showPassword ? (
                                <EyeOff size={18} className="stroke-[2.5px]" />
                            ) : (
                                <Eye size={18} className="stroke-[2.5px]" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-[11px] font-bold text-slate-500 uppercase tracking-tight">Tetap Masuk</span>
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 space-y-4">
                    <PrimaryButton className="w-full justify-center py-4 bg-slate-900 rounded-2xl shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all duration-300 gap-2 text-white" disabled={processing}>
                        <LogIn size={16} />
                        <span className="font-black uppercase tracking-widest text-[11px]">Akses Dashboard</span>
                    </PrimaryButton>

                    <div className="text-center">
                        <Link
                            href={route('register')}
                            className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors inline-flex items-center gap-2"
                        >
                            <UserPlus size={14} /> Belum Punya Akun? Daftar Sekarang
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}