import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, Link } from "@inertiajs/react";
import {
    User,
    ShieldCheck,
    AlertOctagon,
    Fingerprint,
    ChevronLeft
} from "lucide-react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-5 pt-24 lg:pt-0">
                    <Link
                        href={route("dashboard")}
                        className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-all"
                    >
                        <ChevronLeft
                            size={20}
                            className="group-hover:-translate-x-0.5 transition-transform"
                        />
                    </Link>
                    <div>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-0.5 opacity-80">
                            Pengaturan Akun
                        </p>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">
                            Profil Pengguna
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="Profile Settings — Task Planner" />

            <div className="py-12 bg-[#f8fafc]">
                <div className="max-w-4xl mx-auto px-6 space-y-12">
                    {/* --- PROFILE HEADER CARD --- */}
                    <div className="relative p-10 rounded-[3rem] bg-slate-900 text-white overflow-hidden shadow-2xl shadow-indigo-100">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="relative group">
                                <div className="h-28 w-28 rounded-full bg-slate-800 flex items-center justify-center text-4xl font-black italic shadow-2xl shadow-black/50 border-4 border-slate-700 overflow-hidden">
                                    {auth.user.profile_photo_path ? (
                                        <img
                                            src={`/storage/${auth.user.profile_photo_path}`}
                                            alt={auth.user.name}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <span className="text-indigo-500 group-hover:text-indigo-400 transition-colors">
                                            {auth.user.name.charAt(0)}
                                        </span>
                                    )}
                                </div>

                                {/* Status Indicator (Hiasan Minimalis) */}
                                <div className="absolute bottom-1 right-1 h-6 w-6 bg-emerald-500 border-4 border-slate-900 rounded-full shadow-lg"></div>
                            </div>

                            <div className="text-center md:text-left">
                                <h3 className="text-3xl font-black tracking-tighter uppercase leading-none mb-2">
                                    {auth.user.name}
                                </h3>
                                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-slate-400">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Fingerprint
                                            size={14}
                                            className="text-indigo-500"
                                        />
                                        Misi Utama: Konsistensi
                                    </p>
                                    <span className="hidden md:block opacity-20 text-slate-500">
                                        |
                                    </span>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 italic">
                                        Anggota Sejak{" "}
                                        {new Date(
                                            auth.user.created_at,
                                        ).toLocaleDateString("id-ID", {
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Background Pattern / Watermark */}
                        <div className="absolute top-0 right-0 opacity-5 translate-x-12 -translate-y-12 select-none pointer-events-none">
                            <User size={300} />
                        </div>
                    </div>
                    {/* --- UPDATE INFORMATION --- */}
                    <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-50/50">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                                <User size={20} />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                                Informasi Pribadi
                            </h4>
                        </div>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </section>

                    {/* --- UPDATE PASSWORD --- */}
                    <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-50/50">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                                <ShieldCheck size={20} />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                                Pembaruan Keamanan
                            </h4>
                        </div>
                        <UpdatePasswordForm />
                    </section>

                    {/* --- DANGER ZONE --- */}
                    <section className="bg-rose-50/30 p-10 rounded-[2.5rem] border border-rose-100/50">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl">
                                <AlertOctagon size={20} />
                            </div>
                            <h4 className="text-sm font-black text-rose-900 uppercase tracking-widest text-rose-600">
                                Zona Berbahaya
                            </h4>
                        </div>
                        <DeleteUserForm />
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
