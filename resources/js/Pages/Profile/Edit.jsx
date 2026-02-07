import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <p className="text-xs font-bold text-indigo-500 uppercase tracking-[0.2em] mb-1">Pengaturan</p>
                    <h2 className="text-2xl font-black italic text-gray-800 uppercase tracking-tighter">
                        Profil Pengguna
                    </h2>
                </div>
            }
        >
            <Head title="Profile Settings" />

            <div className="py-12 bg-white">
                <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
                    
                    {/* Section: Profile Information */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 border border-gray-100 shadow-2xl shadow-indigo-100/50 rounded-[2.5rem] relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
                        <div className="max-w-xl">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </div>
                    </motion.div>

                    {/* Section: Update Password */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white p-8 border border-gray-100 shadow-2xl shadow-indigo-100/50 rounded-[2.5rem] relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-slate-200"></div>
                        <div className="max-w-xl">
                            <UpdatePasswordForm />
                        </div>
                    </motion.div>

                    {/* Section: Delete Account */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white p-8 border border-red-50 shadow-2xl shadow-red-100/30 rounded-[2.5rem] relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
                        <div className="max-w-xl">
                            <DeleteUserForm />
                        </div>
                    </motion.div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}