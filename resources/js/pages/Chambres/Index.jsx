import { useForm, router, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { useState } from 'react';

export default function Index({ chambres = [], types = [] }) {
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [fileKey, setFileKey] = useState(Date.now());

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        numero: '',
        type_chambre_id: '',
        prix: '',
        description: '',
        images: [],
    });

    // Rehefa mifidy Type de chambre dia fenoina automatique ny Prix
    const handleTypeChange = (typeId) => {
        const selectedType = types.find((t) => String(t.id) === String(typeId));
        // Maka ny prix ao amin'ny table type_chambres (prix na price)
        const autoPrix = selectedType ? (selectedType.prix ?? selectedType.price ?? '') : '';

        setData((prevData) => ({
            ...prevData,
            type_chambre_id: typeId,
            prix: autoPrix,
        }));
    };

    const openCreateModal = () => {
        clearErrors();
        reset();
        setEditing(null);
        setFileKey(Date.now());
        document.getElementById('createModal')?.showModal();
    };

    const openEditModal = (chambre) => {
        clearErrors();
        setEditing(chambre);
        setFileKey(Date.now());

        // Raha efa misy type dia alaina ny prix mifanaraka aminy, na ny prix efa ao amin'ny chambre
        const currentType = types.find((t) => String(t.id) === String(chambre.type_chambre_id));
        const initialPrix = chambre.prix || (currentType ? (currentType.prix ?? currentType.price) : '');

        setData({
            numero: chambre.numero || '',
            type_chambre_id: chambre.type_chambre_id || '',
            prix: initialPrix || '',
            description: chambre.description || '',
            images: [],
        });
        document.getElementById('editModal')?.showModal();
    };

    const openDeleteModal = (chambre) => {
        setDeleting(chambre);
        document.getElementById('deleteModal')?.showModal();
    };

    const closeModals = () => {
        document.getElementById('createModal')?.close();
        document.getElementById('editModal')?.close();
        document.getElementById('deleteModal')?.close();
        reset();
        setEditing(null);
        setDeleting(null);
    };

    const submitCreate = (e) => {
        e.preventDefault();
        post(route('chambres.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setFileKey(Date.now());
                closeModals();
            },
        });
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        router.post(
            route('chambres.update', editing.id),
            { ...data, _method: 'put' },
            {
                forceFormData: true,
                onSuccess: () => {
                    closeModals();
                },
            }
        );
    };

    const confirmDelete = () => {
        if (!deleting) return;

        router.delete(route('chambres.destroy', deleting.id), {
            onStart: () => setIsDeleting(true),
            onSuccess: () => {
                closeModals();
            },
            onFinish: () => setIsDeleting(false),
        });
    };

    return (
        <Layout
            header={
                <h2 className="text-xl font-bold leading-tight text-base-content">
                    Gestion des chambres
                </h2>
            }
        >
            <Head title="Les chambres" />

            <div className="max-w-7xl mx-auto p-4 space-y-6 text-base-content">

                {/* EN-TÊTE */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-base-100 p-4 rounded-xl border border-base-200 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold">Chambres disponibles</h1>
                        <p className="text-sm text-base-content/70">
                            Gérez les tarifs, descriptions et photos de vos hébergements.
                        </p>
                    </div>

                    <button
                        className="btn btn-primary p-2 shadow"
                        onClick={openCreateModal}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Nouvelle chambre
                    </button>
                </div>

                {/* LISTE DES CHAMBRES */}
                {chambres.length === 0 ? (
                    <div className="text-center py-12 bg-base-100 rounded-xl border border-base-200">
                        <p className="text-base-content/60">Aucune chambre enregistrée pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {chambres.map((c) => {
                            const type_chambre = c.type_chambre || types.find((t) => String(t.id) === String(c.type_chambre_id));

                            return (
                                <div key={c.id} className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all">
                                    <figure className="px-4 pt-4">
                                        {c.images?.length ? (
                                            <div className="carousel w-full h-48 rounded-box overflow-hidden bg-base-200">
                                                {c.images.map((img, index) => (
                                                    <div key={index} className="carousel-item w-full">
                                                        <img
                                                            src={`/storage/${img}`}
                                                            alt={`Chambre ${c.numero}`}
                                                            className="w-full h-48 object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <img
                                                src="/images/no-image.png"
                                                alt="Aucune image disponible"
                                                className="w-full h-48 object-cover rounded-box bg-base-200"
                                            />
                                        )}
                                    </figure>

                                    <div className="card-body p-5">
                                        <div className="flex justify-between items-start">
                                            <h2 className="card-title text-xl">Chambre #{c.numero}</h2>
                                            {type_chambre && (
                                                <span className="badge badge-neutral text-xs">
                                                    {type_chambre.name || type_chambre.nom || type_chambre.libelle}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-base-content/70 line-clamp-2 min-h-[2.5rem]">
                                            {c.description || 'Aucune description disponible.'}
                                        </p>

                                        <div className="text-lg font-bold text-primary pt-2">
                                            {Number(c.prix).toLocaleString()} Ar <span className="text-xs font-normal text-base-content/60">/ nuit</span>
                                        </div>

                                        <div className="card-actions justify-end pt-3 border-t border-base-200">
                                            <button
                                                className="btn btn-warning btn-sm p-2"
                                                onClick={() => openEditModal(c)}
                                            >
                                                Modifier
                                            </button>

                                            <button
                                                className="btn btn-error btn-sm p-2"
                                                onClick={() => openDeleteModal(c)}
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* MODAL AJOUT */}
                <dialog id="createModal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box bg-base-100 text-base-content border border-base-200 shadow-2xl">
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content/70 hover:text-base-content p-2"
                            onClick={closeModals}
                        >
                            ✕
                        </button>

                        <h3 className="font-bold text-lg mb-4">Ajouter une nouvelle chambre</h3>

                        <form onSubmit={submitCreate} className="space-y-4">
                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text font-medium text-base-content">Numéro de chambre</span>
                                </label>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full bg-base-100 text-base-content ${errors.numero ? 'input-error' : ''}`}
                                    placeholder="Ex: 101"
                                    value={data.numero}
                                    onChange={(e) => setData('numero', e.target.value)}
                                />
                                {errors.numero && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error font-medium">{errors.numero}</span>
                                    </label>
                                )}
                            </div>

                            {/* TYPE DE CHAMBRE (Apetraka voalohany) */}
                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text font-medium text-base-content">Type de chambre</span>
                                </label>
                                <select
                                    className={`select select-bordered w-full bg-base-100 text-base-content ${errors.type_chambre_id ? 'select-error' : ''}`}
                                    value={data.type_chambre_id}
                                    onChange={(e) => handleTypeChange(e.target.value)}
                                >
                                    <option value="">Sélectionnez un type</option>
                                    {types.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.name || t.nom || t.libelle} {t.prix || t.price ? `(${Number(t.prix || t.price).toLocaleString()} Ar)` : ''}
                                        </option>
                                    ))}
                                </select>
                                {errors.type_chambre_id && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error font-medium">{errors.type_chambre_id}</span>
                                    </label>
                                )}
                            </div>

                            {/* PRIX (Apetraka ao ambany, fenoina automatique/readOnly) */}
                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text font-medium text-base-content">Prix par nuit (Ar)</span>
                                </label>
                                <input
                                    type="number"
                                    readOnly
                                    className={`input input-bordered w-full bg-base-200 text-base-content cursor-not-allowed ${errors.prix ? 'input-error' : ''}`}
                                    placeholder="Fenoina automatique avy amin'ny type de chambre"
                                    value={data.prix}
                                />
                                {errors.prix && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error font-medium">{errors.prix}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text font-medium text-base-content">Description</span>
                                </label>
                                <textarea
                                    className={`textarea textarea-bordered w-full bg-base-100 text-base-content h-24 ${errors.description ? 'textarea-error' : ''}`}
                                    placeholder="Description détaillée de la chambre..."
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error font-medium">{errors.description}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text font-medium text-base-content">Photos de la chambre</span>
                                </label>
                                <input
                                    key={fileKey}
                                    type="file"
                                    multiple
                                    className={`file-input file-input-bordered w-full bg-base-100 text-base-content ${errors.images ? 'file-input-error' : ''}`}
                                    onChange={(e) => setData('images', Array.from(e.target.files))}
                                />
                                {errors.images && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error font-medium">{errors.images}</span>
                                    </label>
                                )}
                            </div>

                            <div className="modal-action pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full p-2"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <span className="loading loading-spinner loading-xs"></span>
                                            Enregistrement...
                                        </>
                                    ) : (
                                        'Enregistrer la chambre'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <form method="dialog" className="modal-backdrop bg-neutral/40">
                        <button onClick={closeModals}>Fermer</button>
                    </form>
                </dialog>

                {/* MODAL EDIT */}
                <dialog id="editModal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box bg-base-100 text-base-content border border-base-200 shadow-2xl">
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content/70 hover:text-base-content p-2"
                            onClick={closeModals}
                        >
                            ✕
                        </button>

                        <h3 className="font-bold text-lg mb-4">
                            Modifier la chambre #{editing?.numero}
                        </h3>

                        <form onSubmit={submitUpdate} className="space-y-4">
                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text font-medium text-base-content">Numéro de chambre</span>
                                </label>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full bg-base-100 text-base-content ${errors.numero ? 'input-error' : ''}`}
                                    value={data.numero}
                                    onChange={(e) => setData('numero', e.target.value)}
                                />
                                {errors.numero && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error font-medium">{errors.numero}</span>
                                    </label>
                                )}
                            </div>

                            {/* TYPE DE CHAMBRE (Apetraka voalohany) */}
                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text font-medium text-base-content">Type de chambre</span>
                                </label>
                                <select
                                    className={`select select-bordered w-full bg-base-100 text-base-content ${errors.type_chambre_id ? 'select-error' : ''}`}
                                    value={data.type_chambre_id}
                                    onChange={(e) => handleTypeChange(e.target.value)}
                                >
                                    <option value="">Sélectionnez un type</option>
                                    {types.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.name || t.nom || t.libelle} {t.prix || t.price ? `(${Number(t.prix || t.price).toLocaleString()} Ar)` : ''}
                                        </option>
                                    ))}
                                </select>
                                {errors.type_chambre_id && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error font-medium">{errors.type_chambre_id}</span>
                                    </label>
                                )}
                            </div>

                            {/* PRIX (Apetraka ao ambany, fenoina automatique/readOnly) */}
                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text font-medium text-base-content">Prix par nuit (Ar)</span>
                                </label>
                                <input
                                    type="number"
                                    readOnly
                                    className={`input input-bordered w-full bg-base-200 text-base-content cursor-not-allowed ${errors.prix ? 'input-error' : ''}`}
                                    value={data.prix}
                                />
                                {errors.prix && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error font-medium">{errors.prix}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text font-medium text-base-content">Description</span>
                                </label>
                                <textarea
                                    className={`textarea textarea-bordered w-full bg-base-100 text-base-content h-24 ${errors.description ? 'textarea-error' : ''}`}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error font-medium">{errors.description}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text font-medium text-base-content">Ajouter de nouvelles photos</span>
                                </label>
                                <input
                                    key={fileKey}
                                    type="file"
                                    multiple
                                    className={`file-input file-input-bordered w-full bg-base-100 text-base-content ${errors.images ? 'file-input-error' : ''}`}
                                    onChange={(e) => setData('images', Array.from(e.target.files))}
                                />
                                {errors.images && (
                                    <label className="label py-1">
                                        <span className="label-text-alt text-error font-medium">{errors.images}</span>
                                    </label>
                                )}
                            </div>

                            <div className="modal-action pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full p-2"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <span className="loading loading-spinner loading-xs"></span>
                                            Mise à jour...
                                        </>
                                    ) : (
                                        'Mettre à jour la chambre'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <form method="dialog" className="modal-backdrop bg-neutral/40">
                        <button onClick={closeModals}>Fermer</button>
                    </form>
                </dialog>

                {/* MODAL SUPPRESSION */}
                <dialog id="deleteModal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box bg-base-100 text-base-content border border-base-200 shadow-2xl">
                        <h3 className="font-bold text-lg text-error mb-2">Confirmer la suppression</h3>
                        <p className="text-sm text-base-content/70">
                            Êtes-vous sûr de vouloir supprimer la chambre <span className="font-semibold text-base-content">#{deleting?.numero}</span> ? Cette action est irréversible et supprimera également les images associées.
                        </p>
                        <div className="modal-action gap-2 pt-4">
                            <button
                                type="button"
                                className="btn btn-ghost p-2"
                                onClick={closeModals}
                                disabled={isDeleting}
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                className="btn btn-error p-2"
                                onClick={confirmDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        Suppression...
                                    </>
                                ) : (
                                    'Supprimer'
                                )}
                            </button>
                        </div>
                    </div>

                    <form method="dialog" className="modal-backdrop bg-neutral/40">
                        <button onClick={closeModals}>Fermer</button>
                    </form>
                </dialog>

            </div>
        </Layout>
    );
}