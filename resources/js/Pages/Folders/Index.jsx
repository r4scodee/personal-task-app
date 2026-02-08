import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react'; 
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError'; 
import PrimaryButton from '@/Components/PrimaryButton'; 
import SecondaryButton from '@/Components/SecondaryButton';
import { FolderPlus, Pencil, Trash2, Folder as FolderIcon, ArrowRight } from 'lucide-react';

export default function Index({ auth, folders }) {
    const [showModal, setShowModal] = useState(false);
    const [editingFolder, setEditingFolder] = useState(null);

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: '',
    });

    const openEditModal = (folder) => {
        setEditingFolder(folder);
        setData('name', folder.name);
        setShowModal(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingFolder) {
            patch(route('folders.update', editingFolder.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('folders.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingFolder(null);
        reset();
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <div>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-1">Koleksi</p>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">
                        Folder Saya
                    </h2>
                </div>
            }
        >
            <Head title="Folder Saya — Task Planner" />

            {/* --- MODAL DINAMIS --- */}
            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={submit} className="p-8 bg-white rounded-3xl">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight uppercase">
                        {editingFolder ? 'Ubah Nama Folder' : 'Buat Folder Baru'}
                    </h2>

                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1 mb-2 block">Nama Folder</label>
                    <TextInput 
                        value={data.name} 
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full border-slate-200 focus:ring-indigo-500 rounded-xl py-3 px-4 text-sm"
                        placeholder="Contoh: Projek Laravel, Tugas Sekolah..."
                    />
                    <InputError message={errors.name} className="mt-2 text-xs" />

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal} className="rounded-xl border-none text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            Batal
                        </SecondaryButton>
                        <PrimaryButton disabled={processing} className="rounded-xl bg-indigo-600 px-6 py-3 shadow-lg shadow-indigo-100">
                            {editingFolder ? 'Simpan Perubahan' : 'Buat Folder'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* --- MAIN CONTENT --- */}
            <div className="py-12 bg-white rounded-[2rem]">
                <div className="max-w-5xl mx-auto px-6">
                    
                    {/* Action Bar */}
                    <div className="flex justify-between items-center mb-10">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Total <span className="text-slate-900 font-bold">{folders.length} Folder</span> tersimpan
                        </p>
                        <button 
                            onClick={() => setShowModal(true)}
                            className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
                        >
                            <FolderPlus size={16} />
                            Tambah Folder
                        </button>
                    </div>

                    {/* Grid Folders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {folders.map((folder) => (
                            <div 
                                key={folder.id} 
                                className="group relative bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                        <FolderIcon size={20} />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => openEditModal(folder)} 
                                            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                                            title="Ubah Nama"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button 
                                            onClick={() => {
                                                if (confirm('Hapus folder ini? Semua tugas di dalamnya akan hilang permanen.')) {
                                                    router.delete(route('folders.destroy', folder.id));
                                                }
                                            }}
                                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                            title="Hapus Folder"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <Link href={route('folders.show', folder.id)} className="block">
                                    <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1 truncate">
                                        {folder.name}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            {folder.tasks_count} Item Tugas
                                        </p>
                                        <ArrowRight size={14} className="text-slate-200 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </Link>
                            </div>
                        ))}

                        {/* Empty State */}
                        {folders.length === 0 && (
                            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                                <FolderIcon className="mx-auto text-slate-200 mb-4" size={48} />
                                <p className="text-slate-400 text-sm font-medium">
                                    Belum ada folder. Yuk, buat folder pertama kamu!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}