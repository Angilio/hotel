import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle2, Save } from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="space-y-1">
                <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Changer le mot de passe
                </h2>

                <p className="text-sm text-base-content/80 font-medium">
                    Assurez-vous d'utiliser un mot de passe long et sécurisé pour protéger votre compte.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-5">
                {/* Mot de passe actuel */}
                <div className="form-control w-full space-y-1">
                    <InputLabel
                        htmlFor="current_password"
                        value="Mot de passe actuel"
                        className="font-bold text-base-content"
                    />

                    <div className="relative">
                        <input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData('current_password', e.target.value)
                            }
                            type={showCurrentPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className={`input input-bordered w-full bg-base-100 text-base-content font-medium pr-10 border-base-300 focus:input-primary placeholder:text-base-content/40 ${
                                errors.current_password ? 'input-error text-error' : ''
                            }`}
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors"
                        >
                            {showCurrentPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    <InputError
                        message={errors.current_password}
                        className="mt-1 text-xs text-error font-semibold"
                    />
                </div>

                {/* Nouveau mot de passe */}
                <div className="form-control w-full space-y-1">
                    <InputLabel
                        htmlFor="password"
                        value="Nouveau mot de passe"
                        className="font-bold text-base-content"
                    />

                    <div className="relative">
                        <input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className={`input input-bordered w-full bg-base-100 text-base-content font-medium pr-10 border-base-300 focus:input-primary placeholder:text-base-content/40 ${
                                errors.password ? 'input-error text-error' : ''
                            }`}
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors"
                        >
                            {showNewPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-1 text-xs text-error font-semibold" />
                </div>

                {/* Confirmation du mot de passe */}
                <div className="form-control w-full space-y-1">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirmer le mot de passe"
                        className="font-bold text-base-content"
                    />

                    <div className="relative">
                        <input
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className={`input input-bordered w-full bg-base-100 text-base-content font-medium pr-10 border-base-300 focus:input-primary placeholder:text-base-content/40 ${
                                errors.password_confirmation ? 'input-error text-error' : ''
                            }`}
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors"
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1 text-xs text-error font-semibold"
                    />
                </div>

                {/* Bouton d'action & état de confirmation */}
                <div className="flex items-center gap-4 pt-2 justify-center">
                    <button
                        type="submit"
                        disabled={processing}
                        className="btn btn-primary gap-2 p-3"
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