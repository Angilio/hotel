import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Trash2, AlertTriangle, Lock } from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header className="space-y-1">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-error" />
                    Supprimer le compte
                </h2>

                <p className="text-sm font-medium leading-relaxed opacity-80">
                    Une fois votre compte supprimé, l'intégralité de vos ressources et données
                    sera définitivement effacée. Veuillez sauvegarder toutes les informations
                    importantes avant d'initier la suppression.
                </p>
            </header>

            <button
                type="button"
                onClick={confirmUserDeletion}
                className="btn btn-error font-semibold text-sm p-2 gap-2 shadow-md border-none"
            >
                <Trash2 className="w-4 h-4" />
                Initier la suppression du compte
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 bg-base-100 rounded-2xl space-y-6 border border-base-300">
                    
                    <div className="alert alert-warning border border-warning/40 bg-warning/20 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                        <div className="text-xs space-y-0.5">
                            <span className="font-bold block">Attention : Action définitive</span>
                            <span className="font-medium opacity-80">
                                Cette procédure supprimera toutes vos données de manière irréversible.
                            </span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-lg font-bold">
                            Confirmer la suppression
                        </h3>

                        <p className="text-sm font-medium opacity-80">
                            Veuillez saisir votre mot de passe pour valider l'opération.
                        </p>
                    </div>

                    <div className="form-control w-full space-y-1">
                        <InputLabel
                            htmlFor="password"
                            value="Mot de passe"
                            className="sr-only"
                        />

                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`input input-bordered w-full pr-10 bg-base-100 focus:input-primary ${
                                    errors.password ? 'input-error' : ''
                                }`}
                                placeholder="Saisissez votre mot de passe"
                                autoFocus
                            />
                            <Lock className="w-4 h-4 opacity-50 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>

                        <InputError
                            message={errors.password}
                            className="mt-1 text-xs text-error font-semibold"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="btn btn-ghost font-semibold text-sm p-2"
                        >
                            Annuler
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-error font-semibold text-sm p-2 gap-2 shadow-md border-none"
                        >
                            {processing ? (
                                <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                                <Trash2 className="w-4 h-4" />
                            )}
                            Supprimer définitivement
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}