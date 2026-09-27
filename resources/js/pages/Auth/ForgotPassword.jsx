import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, KeyRound, Send, ArrowLeft } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Mot de passe oublié" />

            <div className="w-full max-w-md mx-auto my-6">
                <div className="bg-base-100 border border-base-200 shadow-xl rounded-3xl p-8 transition-all">
                    
                    {/* EN-TÊTE */}
                    <div className="text-center mb-6">
                        <div className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-3">
                            <KeyRound className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-base-content">
                            Mot de passe oublié ?
                        </h1>
                        <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
                            Pas d'inquiétude. Renseignez votre adresse email et nous vous enverrons un lien pour en choisir un nouveau.
                        </p>
                    </div>

                    {/* ALERTE SUCCÈS */}
                    {status && (
                        <div className="alert alert-success shadow-sm text-sm mb-6 rounded-xl py-3 text-success-content">
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
                                    isFocused={true}
                                    placeholder="exemple@domaine.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* BOUTON D'ENVOI */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full rounded-xl gap-2 shadow-lg mt-2"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <>
                                    <span>Envoyer le lien de réinitialisation</span>
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* RETOUR CONNEXION */}
                    <div className="text-center mt-6 pt-6 border-t border-base-200">
                        <Link 
                            href={route('login')} 
                            className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-primary font-medium transition"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Retour à la connexion</span>
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}