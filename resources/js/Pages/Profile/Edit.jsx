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
                <div className="flex items-center gap-5 pt-0">
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
