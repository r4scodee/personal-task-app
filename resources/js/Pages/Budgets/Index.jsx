import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, Link } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import {
    Wallet,
    Plus,
    TrendingUp,
    TrendingDown,
    Trash2,
    ArrowUpRight,
    ArrowDownLeft,
    Pencil,
    X,
} from "lucide-react";

export default function Index({ auth, budgets, folders, stats }) {
    const [showModal, setShowModal] = useState(false);
    const [editingBudget, setEditingBudget] = useState(null);

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        folder_id: "",
        target_name: "", 
        amount: "",
        type: "income",
    });

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number || 0);
    };

    const openEditModal = (budget) => {
        setEditingBudget(budget);
        setData({
            folder_id: budget.folder_id || "",
            target_name: budget.target_name,
            amount: budget.amount,
            type: budget.type,
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingBudget(null);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingBudget) {
            patch(route("budgets.update", editingBudget.id), {
                onSuccess: () => closeModal(),
                preserveScroll: true,
            });
        } else {
            post(route("budgets.store"), {
                onSuccess: () => closeModal(),
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-1">Keuangan</p>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Tabungan saya</h2>
                </div>
                }
        >
            <Head title="Tabungan Center — Master Panel" />

            <Modal show={showModal} onClose={closeModal}>
                <form
                    onSubmit={submit}
                    className="p-8 bg-white rounded-3xl overflow-hidden relative"
                >
                    <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tighter uppercase">
                        {editingBudget
                            ? "Perbarui Target"
                            : "Target Tabungan Baru"}
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 mb-2 block">
                                Nama Target / Kebutuhan
                            </label>
                            <TextInput
                                value={data.target_name}
                                onChange={(e) =>
                                    setData("target_name", e.target.value)
                                }
                                className="w-full rounded-2xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                placeholder="Contoh: Beli Monitor 4K / Tabungan Pemalang"
                                required
                            />
                            <InputError
                                message={errors.target_name}
                                className="mt-1"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 mb-2 block">
                                    Nominal (Rp)
                                </label>
                                <TextInput
                                    type="number"
                                    value={data.amount}
                                    onChange={(e) =>
                                        setData("amount", e.target.value)
                                    }
                                    className="w-full rounded-2xl border-slate-200"
                                    placeholder="0"
                                    required
                                />
                                <InputError
                                    message={errors.amount}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 mb-2 block">
                                    Jenis
                                </label>
                                <select
                                    value={data.type}
                                    onChange={(e) =>
                                        setData("type", e.target.value)
                                    }
                                    className="w-full border-slate-200 focus:ring-indigo-500 rounded-2xl py-3 px-4 text-sm font-bold text-slate-700 shadow-sm"
                                >
                                    <option value="income">
                                        Simpanan (Masuk)
                                    </option>
                                    <option value="expense">
                                        Penarikan (Keluar)
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 mb-2 block">
                                Hubungkan ke Projek (Opsional)
                            </label>
                            <select
                                value={data.folder_id}
                                onChange={(e) =>
                                    setData("folder_id", e.target.value)
                                }
                                className="w-full border-slate-200 focus:ring-indigo-500 rounded-2xl py-3 px-4 text-sm font-bold text-slate-700 transition-all"
                            >
                                <option value="">Umum / Tanpa Projek</option>
                                {folders.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-end gap-3">
                        <SecondaryButton
                            onClick={closeModal}
                            className="rounded-xl border-none text-[10px] font-black uppercase tracking-widest text-slate-400"
                        >
                            Batal
                        </SecondaryButton>
                        <PrimaryButton
                            disabled={processing}
                            className="bg-slate-900 hover:bg-indigo-600 rounded-2xl px-6 py-3 transition-all duration-300"
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">
                                {editingBudget
                                    ? "Simpan Perubahan"
                                    : "Catat Tabungan"}
                            </span>
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            <div className="py-12 bg-slate-50 min-h-screen rounded-[2rem]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="mb-10 flex justify-between items-end">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Catatan Tabungan Saya
                        </h3>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
                        >
                            <Plus size={16} /> Catat Baru
                        </button>
                    </div>

                    {/* Stats Cards dengan Safe Access */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200/20">
                            <p className="text-[10px] font-bold opacity-60 uppercase tracking-[0.2em] mb-2">
                                Total Saldo Aktif
                            </p>
                            <h3 className="text-3xl font-black tracking-tighter">
                                {formatRupiah(stats?.balance)}
                            </h3>
                            <div className="mt-4 flex items-center gap-2 text-indigo-400">
                                <Wallet size={16} />{" "}
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    Wallet 
                                </span>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-2">
                                Pemasukan
                            </p>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
                                {formatRupiah(stats?.total_income)}
                            </h3>
                            <TrendingUp
                                className="text-emerald-400 mt-2"
                                size={24}
                            />
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-bold text-rose-500 uppercase tracking-[0.2em] mb-2">
                                Pengeluaran
                            </p>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
                                {formatRupiah(stats?.total_expense)}
                            </h3>
                            <TrendingDown
                                className="text-rose-400 mt-2"
                                size={24}
                            />
                        </div>
                    </div>

                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 ml-2">
                        Riwayat Tabungan
                    </h3>

                    <div className="space-y-3">
                        {budgets.length > 0 ? (
                            budgets.map((budget) => (
                                <div key={budget.id} className="group p-4 sm:p-5 bg-white border border-slate-100 rounded-[2rem] hover:border-indigo-200 transition-all">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        
                                        {/* Info Tabungan */}
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-2xl flex items-center justify-center shrink-0 ${budget.type === "income" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                                                {budget.type === "income" ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight truncate">
                                                    {budget.target_name}
                                                </h4>
                                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                                                    <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md">
                                                        {budget.folder?.name || "Umum"}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase">
                                                        {new Date(budget.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Nominal & Actions */}
                                        <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50">
                                            <span className={`text-base font-black tracking-tight ${budget.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                                                {budget.type === "income" ? "+" : "-"} {formatRupiah(budget.amount)}
                                            </span>
                                            
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => openEditModal(budget)} className="p-2.5 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                                                    <Pencil size={14} />
                                                </button>
                                                <button onClick={() => router.delete(route("budgets.destroy", budget.id))} className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-10 rounded-[2rem] text-center border border-dashed border-slate-200">
                                <p className="text-slate-400 text-sm font-medium">Belum ada data</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
