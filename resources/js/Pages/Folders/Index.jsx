import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react'; 
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError'; 
import PrimaryButton from '@/Components/PrimaryButton'; 
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ auth, folders }) {
const [showModal, setShowModal] = useState(false);
    const [editingFolder, setEditingFolder] = useState(null);

    // Tambahkan 'patch' di sini
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: '',
    });

    const openEditModal = (folder) => {
        setEditingFolder(folder);
        setData('name', folder.name); // Isi input dengan nama lama
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
        <AuthenticatedLayout user={auth.user} header={
            <div>
                <p className="text-xs font-bold text-indigo-500 uppercase tracking-[0.2em] mb-1">Daftar</p>
                <h2 className="text-2xl font-black italic text-gray-800 uppercase tracking-tighter">
                    Folder Tugas Saya
                </h2>
                </div>
        }>
            {/* Modal Dinamis */}
            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={submit} className="p-6 bg-white">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-tighter">
                        {editingFolder ? 'Rename Folder' : 'New Folder'}
                    </h2>

                    <TextInput 
                        value={data.name} 
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full border-gray-200 focus:ring-indigo-500 rounded-full"
                        placeholder="Project Name..."
                    />
                    <InputError message={errors.name} className="mt-2" />
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing} className="shadow-lg shadow-indigo-200">
                            {editingFolder ? 'Update' : 'Create'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            <div className="py-12 max-w-7xl mx-auto px-6">
                <div className="flex justify-end mb-8">
                    <PrimaryButton onClick={() => setShowModal(true)}>+ Folder</PrimaryButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {folders.map((folder) => (
                        <div key={folder.id} className="`bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                            <div className="flex justify-between items-start">
                                <Link href={route('folders.show', folder.id)} className="flex-1">
                                    <h3 className="text-xl font-black text-gray-800 group-hover:text-indigo-600 transition-colors uppercase tracking-tighter">
                                        {folder.name}
                                    </h3>
                                    <p className="text-xs text-gray-400 font-bold tracking-widest mt-1">
                                        {folder.tasks_count} TASKS
                                    </p>
                                </Link>
                                
                                {/* Container Tombol Aksi */}
                                <div className="flex items-center gap-3">
                                    {/* Button Edit */}
                                    <button 
                                        onClick={() => openEditModal(folder)} 
                                        className="text-gray-300 hover:text-indigo-500 transition-colors p-1"
                                        title="Edit Folder"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>

                                    {/* Button Delete Baru */}
                                    <button 
                                        onClick={() => {
                                            if (confirm('Hapus folder ini? Semua task di dalamnya juga akan hilang.')) {
                                                router.delete(route('folders.destroy', folder.id));
                                            }
                                        }}
                                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                        title="Delete Folder"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}