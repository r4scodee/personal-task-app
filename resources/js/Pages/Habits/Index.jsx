import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import {
    Zap,
    Plus,
    Trash2,
    CheckCircle2,
    Circle,
    Flame,
    Target,
    Award,
    FilePlus,
    Info
} from "lucide-react";

export default function Index({ auth, habits }) {
    const [showModal, setShowModal] = useState(false);

    // --- FORM SETUP (Hanya Nama Sesuai Controller) ---
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "", // Sesuai $request->validate di Controller lo
    });

    const closeModal = () => {
        setShowModal(false);
        reset();
    };

    const isCompletedToday = (lastDate) => {
        if (!lastDate) return false;
        const today = new Date().toLocaleDateString('en-CA'); // Format YYYY-MM-DD
        return lastDate.startsWith(today);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("habits.store"), {
            onSuccess: () => closeModal(),
            onError: (err) => console.error(err),
        });
    };

    const handleComplete = (id) => {
        router.post(route("habits.complete", id), {}, {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Self Discipline</p>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Habit Tracker</h2>
                </div>
            }
        >
            <Head title="Habit Tracker — Master Panel" />

            {/* --- MODAL: CREATE ONLY --- */}
            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={submit} className="p-8 bg-white rounded-3xl relative overflow-hidden text-left">
                    <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tighter uppercase">
                        Bangun Habit Baru
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                                Nama Habit
                            </label>
                            <TextInput
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="w-full rounded-2xl border-slate-200"
                                placeholder="Misal: Coding Laravel, Push Up..."
                                required
                                isFocused
                            />
                            <InputError message={errors.name} className="mt-1" />
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row justify-end gap-3">
                        <SecondaryButton type="button" onClick={closeModal} className="justify-center rounded-xl border-none text-[10px] font-black uppercase tracking-widest">
                            Batal
                        </SecondaryButton>
                        <PrimaryButton disabled={processing} className="bg-slate-900 rounded-2xl px-8 py-4 shadow-xl">
                            <span className="text-[10px] font-black uppercase tracking-widest">Mulai Sekarang</span>
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* --- MAIN UI --- */}
            <div className="py-12 bg-white min-h-screen rounded-[2rem]">
                <div className="max-w-6xl mx-auto px-6">
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Target size={28} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 leading-none mb-1 uppercase tracking-tighter italic">Consistency Is King</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Jangan biarkan streak lo putus, Irbadh!</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full md:w-auto bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus size={16} /> Tambah Habit
                        </button>
                    </div>

                    {/* Habits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {habits.map((habit) => {
                            const done = isCompletedToday(habit.last_completed_at);
                            return (
                                <div key={habit.id} className={`group p-6 rounded-[2rem] border transition-all duration-300 ${done ? "bg-emerald-50/50 border-emerald-100" : "bg-slate-50 border-slate-100 hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50"}`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-colors ${done ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" : "bg-white border border-slate-100 text-slate-400 group-hover:text-indigo-600"}`}>
                                            <Zap size={24} fill={done ? "currentColor" : "none"} />
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border translate-x-10 group-hover:translate-x-0 transition-all border-slate-100 shadow-sm mr-1">
                                                <Flame size={14} className={habit.streak > 0 ? "text-orange-500 animate-pulse" : "text-slate-300"} />
                                                <span className="text-xs font-black text-slate-700">{habit.streak}</span>
                                            </div>
                                            <button
                                                onClick={() => router.delete(route("habits.destroy", habit.id))}
                                                className="p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <h4 className={`text-sm font-black mb-6 tracking-tight uppercase italic ${done ? "text-emerald-900" : "text-slate-900"}`}>
                                        {habit.name}
                                    </h4>

                                    <button
                                        disabled={done}
                                        onClick={() => handleComplete(habit.id)}
                                        className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all ${done ? "bg-emerald-100 text-emerald-600 cursor-default" : "bg-white border border-slate-200 text-slate-500 hover:border-indigo-500 hover:text-indigo-600"}`}
                                    >
                                        {done ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                                        {done ? "Beres Hari Ini" : "Tandai Selesai"}
                                    </button>
                                </div>
                            );
                        })}

                        {habits.length === 0 && (
                            <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
                                <Award className="mx-auto text-slate-200 mb-4" size={48} />
                                <p className="text-slate-400 text-sm font-medium">Belum ada habit yang dilacak.</p>
                            </div>
                        )}
                    </div>

                    {/* --- SECTION: PRO TIP --- */}
                    <div className="mt-16 p-8 rounded-[2.5rem] bg-indigo-600 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 opacity-10 translate-x-10 -translate-y-10">
                            <Zap size={200} />
                        </div>
                        <div className="relative z-10 flex-1">
                            <div className="flex items-center gap-2 mb-2 text-indigo-200">
                                <Info size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Pro Tip</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 uppercase italic tracking-tighter">Jangan Takut Gagal, {auth.user.name}!</h3>
                            <p className="text-indigo-100 text-sm leading-relaxed max-w-xl">
                                Membangun kebiasaan baru memang berat di awal. Jika streak terputus, jangan menyerah. Mulai lagi hari ini, dan jadilah 1% lebih baik setiap harinya.
                            </p>
                        </div>
                        <div className="relative z-10">
                            <div className="px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                <p className="text-xs font-medium text-indigo-100 mb-1 uppercase tracking-widest text-center">Total Kebiasaan</p>
                                <p className="text-3xl font-black text-center">{habits.length}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}