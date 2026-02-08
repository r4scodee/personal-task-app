import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { ChevronLeft, Plus, Check, Trash2, Pencil, ListTodo } from 'lucide-react';

export default function Show({ auth, folder }) {
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
                <div className="flex items-center gap-4">
                    <Link 
                        href={route('folders.index')} 
                        className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-all"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-0.5">Folder</p>
                        <h2 className="font-bold text-2xl tracking-tight text-slate-900">
                            {folder.name}
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title={`${folder.name} — Task Planner`} />

            <div className="min-h-screen bg-white py-12 rounded-[2rem]">
                <div className="max-w-3xl mx-auto px-6">
                    
                    {/* --- INPUT AREA: ELEGAN & MINIMALIS --- */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <form onSubmit={submitTask} className="relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400">
                                <Plus size={20} />
                            </div>
                            <input 
                                type="text" 
                                className="w-full bg-slate-50 border-slate-100 rounded-2xl pl-14 pr-32 py-5 text-sm font-medium text-slate-700 placeholder-slate-400 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/5 transition-all duration-300"
                                placeholder="Apa tugas kamu selanjutnya?"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                            />
                            <div className="absolute inset-y-2 right-2 flex">
                                <button 
                                    className="bg-indigo-600 text-white px-6 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all disabled:opacity-30 disabled:hover:bg-indigo-600"
                                    disabled={processing || !data.title}
                                >
                                    {processing ? '...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                        {errors.title && <p className="text-red-500 text-[10px] mt-2 ml-4 font-bold uppercase tracking-wider">{errors.title}</p>}
                    </motion.div>

                    {/* --- TASK LIST SECTION --- */}
                    <div className=""> 
                        <div className="flex items-center justify-between mb-8 px-2">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                                Daftar Tugas
                            </h3>
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                                {folder.tasks.filter(t => t.is_completed).length} / {folder.tasks.length} Selesai
                            </span>
                        </div>

                        <div className="space-y-3">
                            <AnimatePresence mode='popLayout'>
                                {folder.tasks.map((task) => (
                                    <motion.div 
                                        key={task.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        layout
                                        className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                                            task.is_completed 
                                            ? 'bg-slate-50/50 border-transparent' 
                                            : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-sm'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="relative flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    checked={task.is_completed} 
                                                    onChange={() => router.patch(route('tasks.update', task.id), {}, { preserveScroll: true })}
                                                    className="h-5 w-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all"
                                                />
                                            </div>

                                            {editingTaskId === task.id ? (
                                                <input 
                                                    autoFocus
                                                    className="flex-1 border-none focus:ring-0 p-0 text-sm text-slate-700 bg-transparent font-bold tracking-tight"
                                                    value={tempTitle}
                                                    onChange={(e) => setTempTitle(e.target.value)}
                                                    onBlur={() => handleUpdateTaskName(task)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleUpdateTaskName(task)}
                                                />
                                            ) : (
                                                <span 
                                                    onClick={() => {
                                                        if (!task.is_completed) {
                                                            setEditingTaskId(task.id); 
                                                            setTempTitle(task.title);
                                                        }
                                                    }}
                                                    className={`text-sm flex-1 cursor-text transition-all ${
                                                        task.is_completed 
                                                        ? 'line-through text-slate-300 font-medium' 
                                                        : 'text-slate-600 font-bold tracking-tight'
                                                    }`}
                                                >
                                                    {task.title}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* Actions */}
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
                                                    ? 'text-emerald-600 bg-emerald-50 shadow-sm' 
                                                    : 'text-slate-300 hover:text-indigo-600 hover:bg-slate-100'
                                                }`}
                                                title={editingTaskId === task.id ? 'Simpan Perubahan' : 'Ubah Tugas'}
                                            >
                                                {editingTaskId === task.id ? (
                                                    <Check size={14} strokeWidth={3} /> 
                                                ) : (
                                                    <Pencil size={14} />
                                                )}
                                            </button>

                                            <button 
                                                onClick={() => confirm('Hapus tugas ini?') && router.delete(route('tasks.destroy', task.id), { preserveScroll: true })} 
                                                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* --- EMPTY STATE --- */}
                            {folder.tasks.length === 0 && (
                                <div className="text-center py-20 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                                    <ListTodo className="mx-auto text-slate-200 mb-4" size={40} />
                                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Belum ada tugas di folder ini</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}