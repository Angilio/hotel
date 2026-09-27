import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Connexion" />

            <div className="w-full max-w-md mx-auto my-6">
                <div className="bg-base-100 border border-base-200 shadow-xl rounded-3xl p-8 transition-all">
                    
                    {/* EN-TÊTE */}
                    <div className="text-center mb-8">
                        <div className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-3">
                            <LogIn className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-base-content">
                            Content de vous revoir
                        </h1>
                        <p className="text-sm text-base-content/60 mt-1">
                            Accédez à votre espace pour gérer vos réservations
                        </p>
                    </div>

                    {/* MESSAGE DE STATUT */}
                    {status && (
                        <div className="alert alert-success shadow-sm text-sm mb-6 rounded-xl py-3">
                            <span>{status}</span>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
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
                                    isFocused={true}
                                    placeholder="exemple@domaine.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* MOT DE PASSE */}
                        <div className="form-control">
                            <InputLabel htmlFor="password" value="Mot de passe" className="font-semibold text-sm mb-1" />
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
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* SE SOUVENIR DE MOI & MOT DE PASSE OUBLIÉ */}
                        <div className="flex items-center justify-between text-sm pt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="checkbox checkbox-primary checkbox-sm rounded-md"
                                />
                                <span className="text-base-content/70">
                                    Se souvenir de moi
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-xs text-primary font-medium hover:underline"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            )}
                        </div>

                        {/* BOUTON SE CONNECTER */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full rounded-xl gap-2 shadow-lg mt-2"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <>
                                    <span>Se connecter</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* PIED DE CARTE / LIEN INSCRIPTION */}
                    <div className="text-center mt-6 pt-6 border-t border-base-200">
                        <p className="text-sm text-base-content/70">
                            Vous n'avez pas encore de compte ?{' '}
                            <Link href={route('register')} className="text-primary font-semibold hover:underline">
                                S'inscrire
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}