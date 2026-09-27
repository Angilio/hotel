import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Mail, Lock, KeyRound, CheckCircle2 } from 'lucide-react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Réinitialiser le mot de passe" />

            <div className="w-full max-w-md mx-auto my-6">
                <div className="bg-base-100 border border-base-200 shadow-xl rounded-3xl p-8 transition-all">
                    
                    {/* EN-TÊTE */}
                    <div className="text-center mb-8">
                        <div className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-3">
                            <KeyRound className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-base-content">
                            Nouveau mot de passe
                        </h1>
                        <p className="text-sm text-base-content/60 mt-1">
                            Définissez votre nouveau mot de passe sécurisé pour accéder à votre compte.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        {/* EMAIL */}
                        <div className="form-control">
                            <InputLabel htmlFor="email" value="Adresse Email" className="font-semibold text-sm mb-1" />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="input input-bordered w-full pl-10 focus:input-primary rounded-xl"
                                    autoComplete="username"
                                    placeholder="exemple@domaine.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* MOT DE PASSE */}
                        <div className="form-control">
                            <InputLabel htmlFor="password" value="Nouveau mot de passe" className="font-semibold text-sm mb-1" />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="input input-bordered w-full pl-10 focus:input-primary rounded-xl"
                                    autoComplete="new-password"
                                    isFocused={true}
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* CONFIRMATION DU MOT DE PASSE */}
                        <div className="form-control">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirmer le nouveau mot de passe"
                                className="font-semibold text-sm mb-1"
                            />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <TextInput
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="input input-bordered w-full pl-10 focus:input-primary rounded-xl"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-1"
                            />
                        </div>

                        {/* BOUTON DE SOUMISSION */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full rounded-xl gap-2 shadow-lg mt-4"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <>
                                    <span>Réinitialiser le mot de passe</span>
                                    <CheckCircle2 className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}