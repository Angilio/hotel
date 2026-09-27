import Layout from '@/Layouts/Layout';
import { Head, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function ReceptionIndex({ reservations = [] }) {
    const [filter, setFilter] = useState('confirmée'); // 'tous', 'confirmée', 'terminée'
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Formatage monétaire
    const formatPrice = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount || 0) + ' Ar';
    };

    // Calcul du nombre de nuits
    const calculateNights = (start, end) => {
        if (!start || !end) return 1;
        const diff = new Date(end) - new Date(start);
        const days = Math.round(diff / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 1;
    };

    // Statistiques clés (KPIs)
    const stats = useMemo(() => {
        const active = reservations.filter((r) => r.statut === 'confirmée').length;
        const completed = reservations.filter((r) => r.statut === 'terminée').length;
        const totalRevenue = reservations
            .filter((r) => r.statut === 'terminée' || r.statut === 'confirmée')
            .reduce((sum, r) => sum + (Number(r.prix) || 0), 0);

        return { active, completed, total: reservations.length, totalRevenue };
    }, [reservations]);

    // Filtrage dynamique + Recherche
    const filteredReservations = useMemo(() => {
        return reservations.filter((r) => {
            // Filtre statut
            const matchesStatus =
                filter === 'tous' ? true : r.statut === filter;

            // Filtre recherche textuelle
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !query ||
                r.user?.name?.toLowerCase().includes(query) ||
                r.chambre?.numero?.toString().includes(query) ||
                r.datestart?.includes(query) ||
                r.dateend?.includes(query);

            return matchesStatus && matchesSearch;
        });
    }, [reservations, filter, searchQuery]);

    // Modal
    const openModal = (reservation) => {
        setSelectedReservation(reservation);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedReservation(null);
    };

    // Soumission avec feedback
    const terminateReservation = () => {
        if (!selectedReservation) return;

        setIsSubmitting(true);
        router.patch(
            route('reservations.terminate', selectedReservation.id),
            {},
            {
                onFinish: () => {
                    setIsSubmitting(false);
                    closeModal();
                },
            }
        );
    };

    return (
        <Layout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-base-content">
                            Espace Réception
                        </h2>
                        <p className="text-xs text-base-content/60 mt-0.5">
                            Gestion en temps réel du suivi des séjours et des départs
                        </p>
                    </div>

                    {/* Barre de recherche rapide */}
                    <div className="relative w-full sm:w-72">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            className="input input-sm input-bordered w-full pl-9 pr-8 text-xs text-base-content bg-base-100 placeholder:text-base-content/50 rounded-lg focus:outline-none focus:border-primary"
                            placeholder="Rechercher nom, chambre..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-xs text-base-content/50 hover:text-base-content"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Réception - Réservations" />

            <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {/* --- STATS / KPIS --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-xl p-4">
                        <div className="stat-figure text-success">
                            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="stat-title text-xs font-medium uppercase tracking-wider text-base-content/60">Séjours Actifs</div>
                        <div className="stat-value text-2xl text-success font-extrabold">{stats.active}</div>
                        <div className="stat-desc text-xs mt-1">Clients actuellement en chambre</div>
                    </div>

                    <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-xl p-4">
                        <div className="stat-figure text-neutral">
                            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="stat-title text-xs font-medium uppercase tracking-wider text-base-content/60">Séjours Terminés</div>
                        <div className="stat-value text-2xl text-base-content font-extrabold">{stats.completed}</div>
                        <div className="stat-desc text-xs mt-1">Clôturés avec succès</div>
                    </div>

                    <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-xl p-4">
                        <div className="stat-figure text-primary">
                            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div className="stat-title text-xs font-medium uppercase tracking-wider text-base-content/60">Total Réservations</div>
                        <div className="stat-value text-2xl text-primary font-extrabold">{stats.total}</div>
                        <div className="stat-desc text-xs mt-1">Total enregistré en réception</div>
                    </div>

                    <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-xl p-4">
                        <div className="stat-figure text-secondary">
                            <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="stat-title text-xs font-medium uppercase tracking-wider text-base-content/60">Revenu Cumulé</div>
                        <div className="stat-value text-xl font-bold text-secondary">{formatPrice(stats.totalRevenue)}</div>
                        <div className="stat-desc text-xs mt-1">Facturation globale enregistrée</div>
                    </div>
                </div>

                {/* --- TOOLBAR / ONGLETS --- */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-base-100 p-3 rounded-xl border border-base-200 shadow-sm">
                    <div className="flex items-center gap-2 bg-base-200 p-1 rounded-lg self-start sm:self-auto">
                        <button
                            className={`btn btn-xs sm:btn-sm border-none p-2 rounded-md transition-all ${
                                filter === 'confirmée'
                                    ? 'bg-base-100 text-base-content shadow-sm font-bold'
                                    : 'btn-ghost text-base-content/70 hover:text-base-content'
                            }`}
                            onClick={() => setFilter('confirmée')}
                        >
                            <span className="w-2 h-2 rounded-full bg-success mr-1.5"></span>
                            Validées ({stats.active})
                        </button>

                        <button
                            className={`btn btn-xs sm:btn-sm p-2 border-none rounded-md transition-all ${
                                filter === 'terminée'
                                    ? 'bg-base-100 text-base-content shadow-sm font-bold'
                                    : 'btn-ghost text-base-content/70 hover:text-base-content'
                            }`}
                            onClick={() => setFilter('terminée')}
                        >
                            <span className="w-2 h-2 rounded-full bg-neutral mr-1.5"></span>
                            Terminées ({stats.completed})
                        </button>

                        <button
                            className={`btn btn-xs sm:btn-sm border-none p-2 rounded-md transition-all ${
                                filter === 'tous'
                                    ? 'bg-base-100 text-base-content shadow-sm font-bold'
                                    : 'btn-ghost text-base-content/70 hover:text-base-content'
                            }`}
                            onClick={() => setFilter('tous')}
                        >
                            Toutes ({stats.total})
                        </button>
                    </div>

                    <div className="text-xs text-base-content/50 px-2 flex items-center justify-between sm:justify-end gap-2">
                        <span>Affichage : <strong className="text-base-content">{filteredReservations.length}</strong> réservation(s)</span>
                    </div>
                </div>

                {/* --- TABLEAU DES RÉSERVATIONS --- */}
                <div className="bg-base-100 rounded-xl border border-base-200 shadow-sm overflow-hidden">
                    {filteredReservations.length === 0 ? (
                        <div className="py-16 text-center space-y-3">
                            <div className="w-16 h-16 mx-auto bg-base-200 rounded-full flex items-center justify-center text-base-content/40">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-base font-semibold text-base-content">Aucune réservation trouvée</h3>
                            <p className="text-xs text-base-content/60 max-w-sm mx-auto">
                                Aucune donnée ne correspond au filtre ou aux critères de recherche actuels.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table w-full align-middle text-left">
                                <thead>
                                    <tr className="bg-base-200/50 text-xs font-semibold text-base-content/70 uppercase tracking-wider border-b border-base-200">
                                        <th className="py-3.5 px-4">Client</th>
                                        <th className="py-3.5 px-4">Chambre</th>
                                        <th className="py-3.5 px-4">Période du Séjour</th>
                                        <th className="py-3.5 px-4">Montant Total</th>
                                        <th className="py-3.5 px-4">Statut</th>
                                        <th className="py-3.5 px-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-base-200 text-xs sm:text-sm">
                                    {filteredReservations.map((r) => {
                                        const nights = calculateNights(r.datestart, r.dateend);
                                        const isCompleted = r.statut === 'terminée';

                                        return (
                                            <tr key={r.id} className="hover:bg-base-200/30 transition-colors">
                                                {/* Client */}
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar placeholder">
                                                            <div className="bg-neutral text-neutral-content rounded-full w-9 h-9 font-bold text-xs uppercase flex items-center justify-center shadow-xs">
                                                                {r.user?.name ? r.user.name.substring(0, 2) : 'CL'}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-base-content">
                                                                {r.user?.name || 'Client inconnu'}
                                                            </div>
                                                            <div className="text-[11px] text-base-content/50">
                                                                {r.user?.email || `ID #${r.user_id}`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Chambre */}
                                                <td className="py-3 px-4">
                                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-base-200 font-medium text-base-content">
                                                        <svg className="w-3.5 h-3.5 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                        <span>Chambre N° <strong>{r.chambre?.numero || 'N/A'}</strong></span>
                                                    </div>
                                                </td>

                                                {/* Période / Dates */}
                                                <td className="py-3 px-4">
                                                    <div className="space-y-0.5">
                                                        <div className="font-medium text-base-content flex items-center gap-1.5">
                                                            <span>{r.datestart}</span>
                                                            <span className="text-base-content/40">→</span>
                                                            <span>{r.dateend}</span>
                                                        </div>
                                                        <div className="text-[11px] text-base-content/50">
                                                            Durée : <span className="font-semibold">{nights} nuit(s)</span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Prix */}
                                                <td className="py-3 px-4 font-bold text-base-content">
                                                    {formatPrice(r.prix)}
                                                </td>

                                                {/* Statut */}
                                                <td className="py-3 px-4">
                                                    {isCompleted ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral/10 text-neutral border border-neutral/20">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-neutral"></span>
                                                            Terminée
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-success/10 text-success border border-success/20">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                                                            Confirmée
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Action */}
                                                <td className="py-3 px-4 text-right">
                                                    <button
                                                        className={`btn btn-sm text-xs font-medium transition-all ${
                                                            isCompleted
                                                                ? 'btn-disabled bg-base-200 text-base-content/40 border-none'
                                                                : 'btn-neutral shadow-sm hover:scale-[1.02]'
                                                        }`}
                                                        disabled={isCompleted}
                                                        onClick={() => openModal(r)}
                                                    >
                                                        {isCompleted ? 'Clôturée' : 'Terminer le séjour'}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* --- MODAL DE CONFIRMATION PRO --- */}
                {showModal && selectedReservation && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in">
                        <div
                            className="bg-base-100 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-base-200 transform transition-all scale-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Modal */}
                            <div className="bg-base-200/60 px-6 py-4 border-b border-base-200 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-neutral/10 rounded-lg text-neutral">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-base text-base-content">
                                        Clôturer la Réservation
                                    </h3>
                                </div>
                                <button
                                    className="btn btn-sm btn-circle btn-ghost text-base-content/50 hover:text-base-content"
                                    onClick={closeModal}
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Body Modal */}
                            <div className="p-6 space-y-4">
                                <p className="text-xs text-base-content/70">
                                    Êtes-vous sûr de vouloir marquer cette réservation comme <strong>terminée</strong> ? Cette action confirme la libération de la chambre.
                                </p>

                                <div className="bg-base-200/50 rounded-xl p-4 space-y-2.5 text-xs border border-base-200">
                                    <div className="flex justify-between items-center pb-2 border-b border-base-200/60">
                                        <span className="text-base-content/60">Client :</span>
                                        <span className="font-bold text-base-content">{selectedReservation.user?.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-base-200/60">
                                        <span className="text-base-content/60">Chambre assignée :</span>
                                        <span className="font-bold text-base-content">N° {selectedReservation.chambre?.numero}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-base-200/60">
                                        <span className="text-base-content/60">Période du séjour :</span>
                                        <span className="font-medium text-base-content">
                                            {selectedReservation.datestart} → {selectedReservation.dateend}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-base-content/60">Montant total facturé :</span>
                                        <span className="font-extrabold text-success text-sm">
                                            {formatPrice(selectedReservation.prix)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Modal */}
                            <div className="bg-base-200/30 px-6 py-4 border-t border-base-200 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline border-base-300 hover:bg-base-200"
                                    onClick={closeModal}
                                    disabled={isSubmitting}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-neutral min-w-[120px]"
                                    onClick={terminateReservation}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="loading loading-spinner loading-xs"></span>
                                    ) : (
                                        'Confirmer'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </Layout>
    );
}