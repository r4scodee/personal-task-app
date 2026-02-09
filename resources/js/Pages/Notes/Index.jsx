import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react'; 
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError'; 
import PrimaryButton from '@/Components/PrimaryButton'; 
import SecondaryButton from '@/Components/SecondaryButton';
import { FileText, Plus, Pencil, Trash2, ArrowRight, FilePlus } from 'lucide-react';

export default function Index({ auth, notes }) {
    const [showModal, setShowModal] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        title: '',
        content: '',
    });

    const openEditModal = (note) => {
        setEditingNote(note);
        setData({
            title: note.title,
            content: note.content || '',
        });
        setShowModal(true);
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingNote) {
            post(route('notes.update', editingNote.id), {
                onSuccess: () => closeModal(),
                preserveScroll: true,
            });
        } else {
            post(route('notes.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingNote(null);
        reset();
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <div>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-1">Dokumentasi</p>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">
                        Catatan Cepat
                    </h2>
                </div>
            }
        >
            <Head title="Catatan Cepat — Task Planner" />

            {/* --- MODAL CATATAN --- */}
            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={submit} className="p-8 bg-white rounded-3xl">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight uppercase">
                        {editingNote ? 'Edit Catatan' : 'Buat Catatan Baru'}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1 mb-2 block">Judul</label>
                            <TextInput 
                                value={data.title} 
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full border-slate-200 focus:ring-indigo-500 rounded-xl py-3 px-4 text-sm font-bold"
                                placeholder="Judul ide atau catatan..."
                            />
                            <InputError message={errors.title} className="mt-2 text-xs" />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1 mb-2 block">Isi Catatan</label>
                            <textarea 
                                value={data.content} 
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/5 rounded-xl py-3 px-4 text-sm min-h-[150px] transition-all"
                                placeholder="Tuliskan detail pikiran kamu di sini..."
                            />
                            <InputError message={errors.content} className="mt-2 text-xs" />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal} className="rounded-xl border-none text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            Batal
                        </SecondaryButton>
                        <PrimaryButton disabled={processing} className="rounded-xl bg-indigo-600 px-6 py-3 shadow-lg shadow-indigo-100">
                            {editingNote ? 'Simpan Perubahan' : 'Buat Catatan'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* --- MAIN CONTENT --- */}
            <div className="py-12 bg-white rounded-[2rem]">
                <div className="max-w-6xl mx-auto px-6">
                    
                    {/* Action Bar */}
                    <div className="flex justify-between items-center mb-10">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Terdapat <span className="text-slate-900 font-bold">{notes.length} Catatan</span> tersimpan
                        </p>
                        <button 
                            onClick={() => setShowModal(true)}
                            className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
                        >
                            <FilePlus size={16} />
                            Catatan Baru
                        </button>
                    </div>

                    {/* Grid Notes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <div 
                                key={note.id} 
                                className="group bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-indigo-600 shadow-sm">
                                            <FileText size={20} />
                                        </div>

                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openEditModal(note)} className="p-2 text-slate-400 hover:text-indigo-600"><Pencil size={14} /></button>
                                            <button 
                                                onClick={() => router.delete(route('notes.destroy', note.id))}
                                                className="p-2 text-slate-400 hover:text-red-500"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <Link href={route('notes.show', note.id)} className="block group/link">
                                        <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2 truncate group-hover/link:text-indigo-600 transition-colors">
                                            {note.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
                                            {note.content || 'Tidak ada deskripsi tambahan...'}
                                        </p>
                                    </Link>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        {new Date(note.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                    </span>
                                    <ArrowRight size={14} className="text-slate-200 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        ))}

                        {/* Empty State */}
                        {notes.length === 0 && (
                            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                                <FileText className="mx-auto text-slate-200 mb-4" size={48} />
                                <p className="text-slate-400 text-sm font-medium">Belum ada catatan. Simpan ide-ide brilian kamu di sini!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}