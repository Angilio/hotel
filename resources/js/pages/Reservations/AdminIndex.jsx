import Layout from '@/Layouts/Layout';
import { Head, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function AdminIndex({ reservations = [] }) {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [modalType, setModalType] = useState('validate'); // 'validate' | 'cancel' | 'delete'
    const [isProcessing, setIsProcessing] = useState(false);

    // --- Formatage des devises ---
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount || 0) + ' Ar';
    };

    // --- Calcul des nuits ---
    const getDaysDiff = (startDate, endDate) => {
        if (!startDate || !endDate) return 1;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays || 1;
    };

    // --- Cartes KPI / Statistiques ---
    const stats = useMemo(() => {
        const total = reservations.length;
        const pending = reservations.filter((r) => r.statut_commande?.statut?.includes('attente')).length;
        const confirmed = reservations.filter((r) => r.statut_commande?.statut?.includes('confirm')).length;
        const finished = reservations.filter((r) => r.statut_commande?.statut?.includes('termin')).length;
        const totalRevenue = reservations
            .filter((r) => !r.statut_commande?.statut?.includes('annul'))
            .reduce((sum, r) => sum + Number(r.prix || r.prix_total || 0), 0);

        return { total, pending, confirmed, finished, totalRevenue };
    }, [reservations]);

    // --- Configuration des badges ---
    const getStatusConfig = (statutRaw) => {
        const statut = (statutRaw || '').toLowerCase();
        if (statut.includes('attente')) {
            return { label: 'En attente', badge: 'badge-warning text-warning-content', dot: 'bg-warning' };
        }
        if (statut.includes('confirm')) {
            return { label: 'Validée', badge: 'badge-success text-success-content', dot: 'bg-success' };
        }
        if (statut.includes('annul')) {
            return { label: 'Annulée', badge: 'badge-error text-error-content', dot: 'bg-error' };
        }
        if (statut.includes('termin')) {
            return { label: 'Terminée', badge: 'badge-neutral text-neutral-content', dot: 'bg-neutral' };
        }
        return { label: statutRaw || 'Inconnu', badge: 'badge-ghost', dot: 'bg-base-content' };
    };

    // --- Filtrage & Recherche ---
    const filteredReservations = useMemo(() => {
        return reservations.filter((r) => {
            const matchesFilter =
                filter === 'all' ||
                (filter === 'en_attente' && r.statut_commande?.statut?.includes('attente')) ||
                (filter === 'confirmée' && r.statut_commande?.statut?.includes('confirm')) ||
                (filter === 'annulée' && r.statut_commande?.statut?.includes('annul')) ||
                (filter === 'terminée' && r.statut_commande?.statut?.includes('termin'));

            const clientName = r.user?.name?.toLowerCase() || '';
            const roomNum = String(r.chambre?.numero || '').toLowerCase();
            const query = searchQuery.toLowerCase();

            const matchesSearch = clientName.includes(query) || roomNum.includes(query);

            return matchesFilter && matchesSearch;
        });
    }, [reservations, filter, searchQuery]);

    // --- Modal Handler ---
    const openModal = (reservation, type) => {
        setSelectedReservation(reservation);
        setModalType(type);
        setShowModal(true);
    };

    const handleAction = () => {
        if (!selectedReservation || isProcessing) return;

        setIsProcessing(true);

        const options = {
            onFinish: () => {
                setIsProcessing(false);
                setShowModal(false);
            },
        };

        switch (modalType) {
            case 'validate':
                router.patch(route('reservations.validate', selectedReservation.id), {}, options);
                break;
            case 'cancel':
                router.patch(route('reservations.cancel', selectedReservation.id), {}, options);
                break;
            case 'delete':
                router.delete(route('reservations.destroy', selectedReservation.id), options);
                break;
            default:
                setIsProcessing(false);
        }
    };

    return (
        <Layout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Gestion des Réservations</h1>
                        <p className="text-xs text-base-content/70 mt-1">
                            Supervisez, validez et gérez toutes les réservations de l'établissement.
                        </p>
                    </div>

                    {/* Champ de recherche rapide */}
                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Rechercher client ou N° chambre..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input input-bordered input-sm w-full pl-9"
                        />
                        <svg
                            className="w-4 h-4 absolute left-3 top-2.5 text-base-content/50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-2 top-2 text-xs opacity-50 hover:opacity-100"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Administration - Réservations" />

            <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* --- CARTES KPI DE SYNTHÈSE --- */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-xl">
                        <div className="stat-figure text-primary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="stat-title text-xs font-semibold uppercase tracking-wider">Total</div>
                        <div className="stat-value text-2xl">{stats.total}</div>
                        <div className="stat-desc">Toutes réservations confondues</div>
                    </div>

                    <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-xl">
                        <div className="stat-figure text-warning">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="stat-title text-xs font-semibold uppercase tracking-wider">En Attente</div>
                        <div className="stat-value text-2xl text-warning">{stats.pending}</div>
                        <div className="stat-desc">Nécessitent une validation</div>
                    </div>

                    <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-xl">
                        <div className="stat-figure text-success">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="stat-title text-xs font-semibold uppercase tracking-wider">Confirmées</div>
                        <div className="stat-value text-2xl text-success">{stats.confirmed}</div>
                        <div className="stat-desc">{stats.finished} séjour(s) terminé(s)</div>
                    </div>

                    <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-xl">
                        <div className="stat-figure text-info">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="stat-title text-xs font-semibold uppercase tracking-wider">Chiffre d'Affaires</div>
                        <div className="stat-value text-xl text-info truncate">{formatCurrency(stats.totalRevenue)}</div>
                        <div className="stat-desc">Volume des réservations actives</div>
                    </div>
                </div>

                {/* --- BARRE DE FILTRES --- */}
                <div className="flex items-center justify-between border-b border-base-200 pb-3 overflow-x-auto">
                    <div className="tabs tabs-boxed bg-base-200 p-2 gap-2">
                        <button
                            className={`tab tab-sm font-medium ${filter === 'all' ? 'tab-active bg-base-100 shadow-xs' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            Toutes <span className="badge badge-sm ml-2 bg-base-300">{stats.total}</span>
                        </button>
                        <button
                            className={`tab tab-sm font-medium ${filter === 'en_attente' ? 'tab-active bg-base-100 shadow-xs' : ''}`}
                            onClick={() => setFilter('en_attente')}
                        >
                            En attente{' '}
                            {stats.pending > 0 && (
                                <span className="badge badge-sm badge-warning ml-2">{stats.pending}</span>
                            )}
                        </button>
                        <button
                            className={`tab tab-sm font-medium ${filter === 'confirmée' ? 'tab-active bg-base-100 shadow-xs' : ''}`}
                            onClick={() => setFilter('confirmée')}
                        >
                            Validées
                        </button>
                        <button
                            className={`tab tab-sm font-medium ${filter === 'terminée' ? 'tab-active bg-base-100 shadow-xs' : ''}`}
                            onClick={() => setFilter('terminée')}
                        >
                            Terminées
                        </button>
                        <button
                            className={`tab tab-sm font-medium ${filter === 'annulée' ? 'tab-active bg-base-100 shadow-xs' : ''}`}
                            onClick={() => setFilter('annulée')}
                        >
                            Annulées
                        </button>
                    </div>

                    <span className="text-xs text-base-content/60 hidden sm:inline">
                        Affichage de <strong>{filteredReservations.length}</strong> résultat(s)
                    </span>
                </div>

                {/* --- TABLEAU DES RÉSERVATIONS --- */}
                {filteredReservations.length === 0 ? (
                    <div className="card bg-base-100 shadow-sm border border-base-200 p-12 text-center">
                        <div className="max-w-md mx-auto space-y-3">
                            <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto text-base-content/40">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-lg">Aucune réservation trouvée</h3>
                            <p className="text-sm text-base-content/60">
                                Aucun enregistrement ne correspond aux critères de recherche ou de filtre sélectionnés.
                            </p>
                            {(searchQuery || filter !== 'all') && (
                                <button
                                    className="btn btn-outline btn-sm mt-2"
                                    onClick={() => {
                                        setFilter('all');
                                        setSearchQuery('');
                                    }}
                                >
                                    Réinitialiser les filtres
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr className="bg-base-200/50 text-xs text-base-content/70 uppercase">
                                        <th>Client</th>
                                        <th>Chambre</th>
                                        <th>Dates & Séjour</th>
                                        <th>Montant Total</th>
                                        <th>Statut</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReservations.map((r) => {
                                        const statusInfo = getStatusConfig(r.statut_commande?.statut);
                                        const nights = getDaysDiff(r.datestart, r.dateend);
                                        const rawStatut = (r.statut_commande?.statut || '').toLowerCase();

                                        return (
                                            <tr key={r.id} className="hover">
                                                {/* Client */}
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar placeholder">
                                                            <div className="bg-neutral text-neutral-content rounded-full w-9">
                                                                <span className="text-xs uppercase">
                                                                    {r.user?.name?.slice(0, 2) || 'CL'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-sm">{r.user?.name || 'Inconnu'}</div>
                                                            <div className="text-xs text-base-content/60">
                                                                {r.user?.email || `Réf: #${r.id}`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Chambre */}
                                                <td>
                                                    <div className="font-semibold text-sm">
                                                        N° {r.chambre?.numero || 'N/A'}
                                                    </div>
                                                    <div className="text-xs text-base-content/60">
                                                        {r.chambre?.type_chambre?.nom || 'Chambre Standard'}
                                                    </div>
                                                </td>

                                                {/* Dates */}
                                                <td>
                                                    <div className="text-sm">
                                                        <span className="font-medium">{r.datestart}</span>
                                                        <span className="text-base-content/40 mx-1.5">➔</span>
                                                        <span className="font-medium">{r.dateend}</span>
                                                    </div>
                                                    <div className="text-xs text-base-content/60">
                                                        {nights} nuit{nights > 1 ? 's' : ''}
                                                    </div>
                                                </td>

                                                {/* Prix */}
                                                <td>
                                                    <div className="font-bold text-sm text-primary">
                                                        {formatCurrency(r.prix || r.prix_total)}
                                                    </div>
                                                </td>

                                                {/* Statut */}
                                                <td>
                                                    <div className={`badge ${statusInfo.badge} gap-1.5 py-3 font-medium text-xs`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`}></span>
                                                        {statusInfo.label}
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="text-right">
                                                    <div className="flex items-center justify-end gap-3 p-2">
                                                        {rawStatut.includes('attente') && (
                                                            <>
                                                                <button
                                                                    className="btn btn-success btn-xs p-2"
                                                                    onClick={() => openModal(r, 'validate')}
                                                                    title="Valider la réservation"
                                                                >
                                                                    Valider
                                                                </button>
                                                                <button
                                                                    className="btn btn-outline btn-error btn-xs p-2"
                                                                    onClick={() => openModal(r, 'cancel')}
                                                                    title="Annuler la réservation"
                                                                >
                                                                    Annuler
                                                                </button>
                                                            </>
                                                        )}

                                                        {(rawStatut.includes('confirm') ||
                                                            rawStatut.includes('annul') ||
                                                            rawStatut.includes('termin')) && (
                                                            <button
                                                                className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                                                                onClick={() => openModal(r, 'delete')}
                                                                title="Supprimer la réservation"
                                                            >
                                                                Supprimer
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- MODAL CONFIRMATION DIALOGUE --- */}
                {showModal && selectedReservation && (
                    <div className="modal modal-open backdrop-blur-xs">
                        <div className="modal-box max-w-md rounded-2xl shadow-2xl border border-base-200 p-6">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                {modalType === 'validate' && (
                                    <>
                                        <span className="text-success">✓</span> Valider la réservation
                                    </>
                                )}
                                {modalType === 'cancel' && (
                                    <>
                                        <span className="text-warning">⚠</span> Annuler la réservation
                                    </>
                                )}
                                {modalType === 'delete' && (
                                    <>
                                        <span className="text-error">🗑</span> Supprimer définitivement
                                    </>
                                )}
                            </h3>

                            <p className="text-sm text-base-content/70 mt-2">
                                {modalType === 'validate' && "Cette action confirmera le séjour du client et bloquera la chambre pour ces dates."}
                                {modalType === 'cancel' && "La réservation passera en statut annulé. La chambre sera immédiatement réaffectée."}
                                {modalType === 'delete' && "Attention, cette action est irréversible. L'enregistrement sera supprimé de la base de données."}
                            </p>

                            {/* Résumé de la réservation ciblée */}
                            <div className="bg-base-200/60 p-4 rounded-xl mt-4 space-y-2 text-sm border border-base-200">
                                <div className="flex justify-between">
                                    <span className="text-base-content/60">Client :</span>
                                    <span className="font-semibold">{selectedReservation.user?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-base-content/60">Chambre :</span>
                                    <span className="font-semibold">N° {selectedReservation.chambre?.numero}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-base-content/60">Dates :</span>
                                    <span>
                                        {selectedReservation.datestart} ➔ {selectedReservation.dateend}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-base-300 pt-2 font-bold">
                                    <span>Montant total :</span>
                                    <span className="text-primary">
                                        {formatCurrency(selectedReservation.prix || selectedReservation.prix_total)}
                                    </span>
                                </div>
                            </div>

                            <div className="modal-action mt-6 flex justify-end gap-2">
                                <button
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => setShowModal(false)}
                                    disabled={isProcessing}
                                >
                                    Annuler
                                </button>
                                <button
                                    className={`btn btn-sm ${
                                        modalType === 'validate'
                                            ? 'btn-success'
                                            : modalType === 'cancel'
                                            ? 'btn-warning'
                                            : 'btn-error'
                                    }`}
                                    onClick={handleAction}
                                    disabled={isProcessing}
                                >
                                    {isProcessing && <span className="loading loading-spinner loading-xs"></span>}
                                    {modalType === 'validate'
                                        ? 'Confirmer la validation'
                                        : modalType === 'cancel'
                                        ? 'Confirmer l\'annulation'
                                        : 'Supprimer définitivement'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}