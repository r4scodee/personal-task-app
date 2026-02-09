import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Calendar as CalendarIcon, Plus, Clock, MoreVertical, Trash2, Pencil, CalendarDays } from 'lucide-react';

export default function Index({ auth, events }) {
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        color: 'indigo',
    });

    const openEditModal = (event) => {
        setEditingEvent(event);
        setData({
            title: event.title,
            description: event.description || '',
            start_date: event.start_date.replace(' ', 'T').substring(0, 16),
            end_date: event.end_date ? event.end_date.replace(' ', 'T').substring(0, 16) : '',
            color: event.color,
        });
        setShowModal(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingEvent) {
            post(route('events.update', editingEvent.id), { onSuccess: () => closeModal() });
        } else {
            post(route('events.store'), { onSuccess: () => closeModal() });
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingEvent(null);
        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-1">Time Management</p>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Jadwal Agenda</h2>
                </div>
            }
        >
            <Head title="Jadwal Agenda — Task Planner" />

            {/* --- MODAL EVENT --- */}
            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={submit} className="p-8 bg-white rounded-3xl">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight uppercase">
                        {editingEvent ? 'Edit Agenda' : 'Tambah Agenda Baru'}
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Judul Agenda</label>
                            <TextInput value={data.title} onChange={e => setData('title', e.target.value)} className="w-full" placeholder="Meeting Projek, Deadline..." />
                            <InputError message={errors.title} />
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 mb-2 block">
                                Deskripsi Agenda <span className="text-[8px] lowercase font-medium italic opacity-60">(opsional)</span>
                            </label>
                            <textarea 
                                value={data.description} 
                                onChange={e => setData('description', e.target.value)}
                                className="w-full rounded-2xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm font-medium min-h-[100px] py-3 px-4 transition-all"
                                placeholder="Detail acara, lokasi, atau catatan tambahan..."
                            ></textarea>
                            <InputError message={errors.description} className="mt-1" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Mulai</label>
                                <input type="datetime-local" value={data.start_date} onChange={e => setData('start_date', e.target.value)} className="w-full border-slate-200 focus:ring-indigo-500 rounded-xl py-3 px-4 text-sm" />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Selesai (Opsional)</label>
                                <input type="datetime-local" value={data.end_date} onChange={e => setData('end_date', e.target.value)} className="w-full border-slate-200 focus:ring-indigo-500 rounded-xl py-3 px-4 text-sm" />
                            </div>
                        </div>
                        
                    </div>


                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton disabled={processing} className="bg-indigo-600">Simpan Agenda</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* --- LIST AGENDA --- */}
            <div className="py-12 bg-white rounded-[2rem]">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <CalendarDays size={18} className="text-indigo-600" /> Mendatang
                        </h3>
                        <button onClick={() => setShowModal(true)} className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2">
                            <Plus size={16} /> Tambah Agenda
                        </button>
                    </div>

                    <div className="space-y-6">
                        {events.map((event) => (
                            <div key={event.id} className="group relative pl-8 border-l-2 border-slate-100 hover:border-indigo-500 transition-all pb-6">
                                {/* Dot Indicator */}
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white border-4 border-slate-200 group-hover:border-indigo-500 transition-all"></div>
                                
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl group-hover:bg-white group-hover:shadow-xl group-hover:shadow-indigo-50 transition-all">
                                    <div>
                                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1 flex items-center gap-2">
                                            <Clock size={12} /> {new Date(event.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <h4 className="text-lg font-bold text-slate-900">{event.title}</h4>
                                        {event.description && <p className="text-sm text-slate-500 mt-1">{event.description}</p>}
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                        <button onClick={() => openEditModal(event)} className="p-2 text-slate-400 hover:text-indigo-600"><Pencil size={16} /></button>
                                        <button onClick={() => router.post(route('events.destroy', event.id))} className="p-2 text-slate-400 hover:text-rose-500"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {events.length === 0 && (
                            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                                <p className="text-slate-400 text-sm font-medium">Jadwal masih kosong. Klik "Tambah Agenda" untuk memulai.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}