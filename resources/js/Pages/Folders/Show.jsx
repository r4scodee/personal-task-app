import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

export default function Show({ auth, folder }) {
    // State untuk Inline Edit
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [tempTitle, setTempTitle] = useState('');

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        folder_id: folder.id,
    });

    const submitTask = (e) => {
        e.preventDefault();
        post(route('tasks.store'), {
            onSuccess: () => reset('title'),
        });
    };

    const handleUpdateTaskName = (task) => {
        // Jika tidak ada perubahan atau kosong, batalkan edit
        if (tempTitle.trim() === '' || tempTitle === task.title) {
            setEditingTaskId(null);
            return;
        }

        router.patch(route('tasks.update', task.id), { 
            title: tempTitle 
        }, {
            onSuccess: () => setEditingTaskId(null),
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-6">
                    <Link 
                        href={route('folders.index')} 
                        className="p-2 rounded-xl bg-transparent text-gray-400 hover:text-indigo-600 hover:bg-indigo-100 hover:shadow-md transition-all duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div>
                        <h2 className="font-bold text-xl tracking-tight text-gray-800 uppercase ">
                            {folder.name}
                        </h2>
                        <div className="h-0.5 w-8 bg-indigo-600 mt-1 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.5)]"></div>
                    </div>
                </div>
            }
        >
            <Head title={`Tasks - ${folder.name}`} />

            <div className="min-h-screen bg-white text-gray-800 py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Input Area - Minimalist White with Indigo Glow */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <form onSubmit={submitTask} className="relative flex items-center bg-white border border-gray-200 rounded-2xl overflow-hidden focus-within:border-indigo-400 focus-within:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-500">
                            <input 
                                type="text" 
                                className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 px-6 py-4 text-base placeholder-gray-400 font-medium"
                                placeholder="What is the next task?"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                            />
                            <button 
                                className="mr-3 bg-indigo-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-indigo-500 hover:shadow-[0_10px_20px_rgba(99,102,241,0.4)] transition-all duration-300 active:scale-95 disabled:opacity-70"
                                disabled={processing || !data.title}
                            >
                                {processing ? '...' : 'Save'}
                            </button>
                        </form>
                        {errors.title && <p className="text-red-500 text-xs mt-2 ml-2 font-medium">{errors.title}</p>}
                    </motion.div>

                    {/* Task List Section */}
                    <div className="mt-16"> 
                        {/* Subjudul Daftar Tugas */}
                        <div className="flex items-center gap-3 mb-6 ml-2">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
                                Daftar Tugas
                            </h3>
                            <div className="h-px flex-1 bg-gray-100"></div> {/* Garis dekoratif tipis */}
                        </div>

                        <div className="space-y-3">
                            <AnimatePresence mode='popLayout'>
                                {folder.tasks.map((task) => (
                                    <motion.div 
                                        key={task.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        layout
                                        className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                                            task.is_completed 
                                            ? 'bg-gray-50 border-transparent opacity-50' 
                                            : 'bg-white border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-md'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <input 
                                                type="checkbox" 
                                                checked={task.is_completed} 
                                                onChange={() => router.patch(route('tasks.update', task.id), {}, { preserveScroll: true })}
                                                className="h-5 w-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                            />

                                            {/* Tampilan Input vs Teks */}
                                            {editingTaskId === task.id ? (
                                                <input 
                                                    autoFocus
                                                    className="flex-1 border-b-2 border-indigo-500 border-t-0 border-x-0 focus:ring-0 p-0 me-2 text-base text-gray-700 bg-transparent font-medium"
                                                    value={tempTitle}
                                                    onChange={(e) => setTempTitle(e.target.value)}
                                                    onBlur={() => handleUpdateTaskName(task)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleUpdateTaskName(task)}
                                                />
                                            ) : (
                                                <span className={`text-base flex-1 transition-all ${task.is_completed ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
                                                    {task.title}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* Tombol Aksi (Edit & Hapus) */}
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => {
                                                    if (editingTaskId === task.id) {
                                                        handleUpdateTaskName(task);
                                                    } else {
                                                        setEditingTaskId(task.id); 
                                                        setTempTitle(task.title);
                                                    }
                                                }}
                                                className={`p-2 rounded-lg transition-all ${
                                                    editingTaskId === task.id 
                                                    ? 'text-green-600 bg-green-50 shadow-[0_0_10px_rgba(34,197,94,0.3)]' 
                                                    : 'text-gray-300 hover:text-indigo-500 hover:bg-indigo-50'
                                                }`}
                                            >
                                                {editingTaskId === task.id ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                )}
                                            </button>

                                            <button 
                                                onClick={() => confirm('Remove task?') && router.delete(route('tasks.destroy', task.id), { preserveScroll: true })} 
                                                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Empty State */}
                            {folder.tasks.length === 0 && (
                                <div className="text-center py-20 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200">
                                    <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold">No tasks recorded</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}