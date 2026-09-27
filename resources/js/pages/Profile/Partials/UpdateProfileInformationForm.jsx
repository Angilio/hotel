import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { User, Mail, CheckCircle2, Save, AlertTriangle } from 'lucide-react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header className="space-y-1">
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Informations du profil
                </h2>

                <p className="text-sm text-base-content/80 font-medium">
                    Mettez à jour les informations de votre compte et votre adresse email.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-5">
                {/* Champ Nom */}
                <div className="form-control w-full space-y-1">
                    <InputLabel
                        htmlFor="name"
                        value="Nom complet"
                        className="font-bold text-base-content"
                    />

                    <input
                        id="name"
                        type="text"
                        className={`input input-bordered w-full bg-base-100 text-base-content font-medium border-base-300 focus:input-primary placeholder:text-base-content/40 ${
                            errors.name ? 'input-error text-error' : ''
                        }`}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                        placeholder="John Doe"
                    />

                    <InputError className="mt-1 text-xs text-error font-semibold" message={errors.name} />
                </div>

                {/* Champ Email */}
                <div className="form-control w-full space-y-1">
                    <InputLabel
                        htmlFor="email"
                        value="Adresse email"
                        className="font-bold text-base-content"
                    />

                    <input
                        id="email"
                        type="email"
                        className={`input input-bordered w-full bg-base-100 text-base-content font-medium border-base-300 focus:input-primary placeholder:text-base-content/40 ${
                            errors.email ? 'input-error text-error' : ''
                        }`}
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="exemple@domaine.com"
                    />

                    <InputError className="mt-1 text-xs text-error font-semibold" message={errors.email} />
                </div>

                {/* Avertissement de vérification d'email */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="alert alert-warning border border-warning/20 shadow-sm flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-warning-content mt-0.5" />
                        <div className="text-sm text-warning-content">
                            <span>Votre adresse email n'est pas vérifiée. </span>
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="link link-hover font-bold text-warning-content underline underline-offset-2"
                            >
                                Cliquez ici pour renvoyer l'email de vérification.
                            </Link>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 font-bold text-success flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Un nouveau lien de vérification a été envoyé à votre adresse email.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Bouton d'action et message de succès */}
                <div className="flex items-center gap-4 pt-2 justify-center">
                    <button
                        type="submit"
                        disabled={processing}
                        className="btn btn-primary gap-2 p-2"
                    >
                        {processing ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        Enregistrer
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <span className="text-sm text-success font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" /> Enregistré avec succès.
                        </span>
                    </Transition>
                </div>
            </form>
        </section>
    );
}