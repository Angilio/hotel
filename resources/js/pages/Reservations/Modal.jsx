import { useForm, usePage, router, Head } from '@inertiajs/react';

export default function Modal({ chambre }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        datestart: '',
        dateend: '',
        chambre_id: chambre?.id || '',
    });

    // Calcul direct du nombre de nuits et du total (sans state/useEffect superflus)
    const calculateBooking = () => {
        if (!data.datestart || !data.dateend) return { nuits: 0, prixTotal: 0 };

        const start = new Date(data.datestart);
        const end = new Date(data.dateend);
        const diffTime = end - start;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
            return { nuits: diffDays, prixTotal: diffDays * (chambre?.prix || 0) };
        }
        return { nuits: 0, prixTotal: 0 };
    };

    const { nuits, prixTotal } = calculateBooking();

    const submit = (e) => {
        e.preventDefault();
        post(route('reservations.store'));
    };

    const closeModal = () => {
        router.get(route('welcome'));
    };

    return (
        <dialog open className="modal modal-open">
            <Head title="Confirmer la réservation" />

            {/* Boîte de dialogue respectant le thème DaisyUI */}
            <div className="modal-box relative bg-base-100 text-base-content border border-base-200 shadow-2xl">

                {/* Bouton X de fermeture */}
                <button
                    type="button"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content/70 hover:text-base-content"
                    onClick={closeModal}
                >
                    ✕
                </button>

                <h3 className="font-bold text-lg text-base-content mb-1">
                    Réserver la chambre #{chambre?.numero}
                </h3>

                <p className="text-sm text-base-content/70 mb-4">
                    Prix par nuit : <strong className="text-primary">{chambre?.prix?.toLocaleString()} Ar</strong>
                </p>

                {/* Messages Flash si présents */}
                {flash?.error && (
                    <div className="alert alert-error text-sm mb-4">
                        <span>{flash.error}</span>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">

                    {/* Champ Date de début */}
                    <div className="form-control w-full">
                        <label className="label py-1">
                            <span className="label-text font-medium text-base-content">Date de début</span>
                        </label>
                        <input
                            type="date"
                            className={`input input-bordered w-full bg-base-100 text-base-content ${
                                errors.datestart ? 'input-error' : ''
                            }`}
                            value={data.datestart}
                            onChange={(e) => setData('datestart', e.target.value)}
                        />
                        {errors.datestart && (
                            <label className="label py-1">
                                <span className="label-text-alt text-error font-medium">{errors.datestart}</span>
                            </label>
                        )}
                    </div>

                    {/* Champ Date de fin */}
                    <div className="form-control w-full">
                        <label className="label py-1">
                            <span className="label-text font-medium text-base-content">Date de fin</span>
                        </label>
                        <input
                            type="date"
                            min={data.datestart || undefined}
                            className={`input input-bordered w-full bg-base-100 text-base-content ${
                                errors.dateend ? 'input-error' : ''
                            }`}
                            value={data.dateend}
                            onChange={(e) => setData('dateend', e.target.value)}
                        />
                        {errors.dateend && (
                            <label className="label py-1">
                                <span className="label-text-alt text-error font-medium">{errors.dateend}</span>
                            </label>
                        )}
                    </div>

                    {/* Récapitulatif du tarif */}
                    <div className="bg-base-200 text-base-content p-4 rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Nombre de nuits :</span>
                            <strong className="font-bold">{nuits}</strong>
                        </div>
                        <div className="flex justify-between text-base font-bold text-primary pt-2 border-t border-base-300">
                            <span>Total à payer :</span>
                            <span>{prixTotal.toLocaleString()} Ar</span>
                        </div>
                    </div>

                    {/* Actions du Modal */}
                    <div className="modal-action">
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={processing || nuits <= 0}
                        >
                            {processing ? (
                                <>
                                    <span className="loading loading-spinner loading-xs"></span>
                                    Traitement en cours...
                                </>
                            ) : (
                                'Confirmer la réservation'
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Arrière-plan cliquable DaisyUI (Backdrop) */}
            <form method="dialog" className="modal-backdrop bg-neutral/40">
                <button onClick={closeModal}>Fermer</button>
            </form>
        </dialog>
    );
}