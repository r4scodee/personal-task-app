import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage, router } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useState, useRef } from "react";
import { Camera, Trash2, User as UserIcon, Loader2 } from "lucide-react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const photoInput = useRef();
    const [photoPreview, setPhotoPreview] = useState(null);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            photo: null,
            delete_photo: false, // Flag baru: Tandai kalau foto mau dihapus
            _method: "PATCH",
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.update"), {
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                setData("delete_photo", false); // Reset flag setelah sukses
            },
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData((prevData) => ({
                ...prevData,
                photo: file,
                delete_photo: false, // Jika upload baru, batalkan perintah hapus
            }));
            const reader = new FileReader();
            reader.onload = (e) => setPhotoPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    // --- FUNGSI HAPUS: CUMA GANTI STATE ---
    const markPhotoForDeletion = () => {
        setPhotoPreview(null); // Hilangkan preview di layar
        setData((prevData) => ({
            ...prevData,
            photo: null,
            delete_photo: true, // Kasih tanda ke backend buat hapus pas simpan
        }));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-10">
                <div className="flex flex-col sm:flex-row items-center gap-8 p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100">
                    <div className="relative group">
                        <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-slate-200 bg-white flex items-center justify-center">

                            {data.delete_photo ? (
                                <div className="h-full w-full bg-indigo-50 flex items-center justify-center text-indigo-300">
                                    <UserIcon size={48} />
                                </div>
                            ) : photoPreview ? (
                                <img
                                    src={photoPreview}
                                    className="h-full w-full object-cover"
                                />
                            ) : user.profile_photo_path ? (
                                <img
                                    src={`/storage/${user.profile_photo_path}`}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-indigo-50 flex items-center justify-center text-indigo-300">
                                    <UserIcon size={48} />
                                </div>
                            )}

                            <div className="absolute bottom-1.5 right-1.5 h-[23px] w-[23px] bg-emerald-500 border-4 border-slate-50 rounded-full"></div>
                        </div>

                        {/* Overlay Kamera */}
                        <label className="absolute inset-0 flex items-center justify-center bg-slate-900/60 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 backdrop-blur-[2px]">
                            <input
                                type="file"
                                ref={photoInput}
                                className="hidden"
                                onChange={handlePhotoChange}
                                accept="image/*"
                            />
                            <Camera size={24} />
                        </label>
                    </div>

                    <div className="text-center sm:text-left space-y-2">
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                            Foto Profil
                        </h4>
                        <div className="flex items-center justify-center sm:justify-start gap-4 pt-2">
                            <button
                                type="button"
                                onClick={() => photoInput.current.click()}
                                className="text-[11px] font-black text-indigo-600 uppercase tracking-widest"
                            >
                                Pilih Foto
                            </button>

                            {/* Tombol Hapus: Hanya muncul jika ada foto lama DAN belum ditandai hapus */}
                            {!data.delete_photo &&
                                (user.profile_photo_path || photoPreview) && (
                                    <button
                                        type="button"
                                        onClick={markPhotoForDeletion}
                                        className="text-[11px] font-black text-rose-500 uppercase tracking-widest"
                                    >
                                        Hapus
                                    </button>
                                )}
                        </div>
                    </div>
                </div>

                {/* --- NAME & EMAIL SECTION --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel
                            htmlFor="name"
                            value="Nama Lengkap"
                            className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2"
                        />
                        <TextInput
                            id="name"
                            className="w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Alamat Email"
                            className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2"
                        />
                        <TextInput
                            id="email"
                            type="email"
                            className="w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                    <PrimaryButton
                        disabled={processing}
                        className="bg-indigo-600 px-8 py-4 rounded-2xl shadow-lg shadow-indigo-100"
                    >
                        {processing ? (
                            <Loader2 size={16} className="animate-spin mr-2" />
                        ) : null}
                        Simpan Perubahan
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-bold text-emerald-600 italic">
                            Tersimpan.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
