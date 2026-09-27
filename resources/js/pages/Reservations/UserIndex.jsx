import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function UserIndex({ reservations = [] }) {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Formateur de date en français
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    // Formateur de prix
    const formatPrice = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount || 0) + ' Ar';
    };

    // Configuration des badges selon le statut
    const getStatusBadge = (statut) => {
        switch (statut) {
            case 'en_attente':
                return {
                    label: 'En attente',
                    badgeClass: 'badge-warning text-warning-content',
                    dotClass: 'bg-warning',
                };
            case 'confirmée':
            case 'confirmee':
                return {
                    label: 'Validée',
                    badgeClass: 'badge-success text-success-content',
                    dotClass: 'bg-success',
                };
            case 'annulée':
            case 'annulee':
                return {
                    label: 'Annulée',
                    badgeClass: 'badge-error text-error-content',
                    dotClass: 'bg-error',
                };
            case 'terminée':
            case 'terminee':
                return {
                    label: 'Terminée',
                    badgeClass: 'badge-neutral',
                    dotClass: 'bg-neutral-content',
                };
            default:
                return {
                    label: statut || 'N/A',
                    badgeClass: 'badge-ghost',
                    dotClass: 'bg-base-content',
                };
        }
    };

    // Calcul des statistiques
    const stats = useMemo(() => {
        const total = reservations.length;
        const pending = reservations.filter((r) => r.statut_commande?.statut === 'en_attente').length;
        const confirmed = reservations.filter((r) => r.statut_commande?.statut === 'confirmée').length;
        const totalSpent = reservations.reduce((acc, r) => acc + (Number(r.prix) || 0), 0);
        return { total, pending, confirmed, totalSpent };
    }, [reservations]);

    // Filtrage des réservations
    const filteredReservations = useMemo(() => {
        return reservations.filter((r) => {
            const currentStatut = r.statut_commande?.statut;
            const matchesFilter = filter === 'all' || currentStatut === filter;
            
            const roomNum = r.chambre?.numero?.toString() || '';
            const roomType = r.chambre?.nom || r.chambre?.type || '';
            const matchesSearch =
                searchQuery === '' ||
                roomNum.includes(searchQuery) ||
                roomType.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesFilter && matchesSearch;
        });
    }, [reservations, filter, searchQuery]);

    // Calcul du nombre de nuits
    const calculateNights = (startStr, endStr) => {
        if (!startStr || !endStr) return 1;
        const start = new Date(startStr);
        const end = new Date(endStr);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays || 1;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-base-content tracking-tight">
                            Mes Réservations
                        </h2>
                        <p className="text-sm text-base-content/60">
                            Gérez et suivez l'historique de vos séjours
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Mes réservations" />

            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                
                {/* Cartes de statistiques */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="stat bg-base-100 rounded-box shadow-xs border border-base-200">
                        <div className="stat-title text-xs font-semibold uppercase tracking-wider">Total Réservations</div>
                        <div className="stat-value text-2xl sm:text-3xl font-extrabold text-primary">{stats.total}</div>
                    </div>
                    <div className="stat bg-base-100 rounded-box shadow-xs border border-base-200">
                        <div className="stat-title text-xs font-semibold uppercase tracking-wider text-warning">En Attente</div>
                        <div className="stat-value text-2xl sm:text-3xl font-extrabold text-warning">{stats.pending}</div>
                    </div>
                    <div className="stat bg-base-100 rounded-box shadow-xs border border-base-200">
                        <div className="stat-title text-xs font-semibold uppercase tracking-wider text-success">Validées</div>
                        <div className="stat-value text-2xl sm:text-3xl font-extrabold text-success">{stats.confirmed}</div>
                    </div>
                    <div className="stat bg-base-100 rounded-box shadow-xs border border-base-200">
                        <div className="stat-title text-xs font-semibold uppercase tracking-wider">Total Dépensé</div>
                        <div className="stat-value text-xl sm:text-2xl font-bold text-base-content">{formatPrice(stats.totalSpent)}</div>
                    </div>
                </div>

                {/* Barre d'outils (Recherche & Filtres) */}
                <div className="bg-base-100 p-4 rounded-box shadow-xs border border-base-200 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
                    {/* Filtres par onglets */}
                    <div className="flex flex-wrap gap-1.5 bg-base-200/60 p-1 rounded-lg">
                        {[
                            { key: 'all', label: 'Tous' },
                            { key: 'en_attente', label: 'En attente' },
                            { key: 'confirmée', label: 'Validées' },
                            { key: 'annulée', label: 'Annulées' },
                            { key: 'terminée', label: 'Terminées' },
                        ].map(({ key, label }) => {
                            const count = key === 'all' 
                                ? reservations.length 
                                : reservations.filter(r => r.statut_commande?.statut === key).length;

                            return (
                                <button
                                    key={key}
                                    onClick={() => setFilter(key)}
                                    className={`btn btn-xs sm:btn-sm border-0 font-medium transition-all ${
                                        filter === key
                                            ? 'btn-primary shadow-xs'
                                            : 'btn-ghost text-base-content/70 hover:bg-base-100'
                                    }`}
                                >
                                    {label}
                                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                                        filter === key ? 'bg-primary-content/20 text-primary-content' : 'bg-base-300'
                                    }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Champ de recherche */}
                    <div className="relative min-w-[220px]">
                        <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Rechercher une chambre..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input input-sm input-bordered pl-9 w-full focus:outline-primary"
                        />
                    </div>
                </div>

                {/* Contenu principal / Tableau */}
                <div className="bg-base-100 rounded-box shadow-xs border border-base-200 overflow-hidden">
                    {filteredReservations.length === 0 ? (
                        <div className="py-16 text-center px-4">
                            <div className="w-16 h-16 mx-auto mb-4 bg-base-200 rounded-full flex items-center justify-center text-base-content/40">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-base-content">Aucune réservation trouvée</h3>
                            <p className="text-sm text-base-content/60 mt-1 max-w-sm mx-auto">
                                {searchQuery || filter !== 'all' 
                                    ? "Aucun résultat ne correspond à vos critères de recherche." 
                                    : "Vous n'avez pas encore effectué de réservation."}
                            </p>
                            {route().has('chambres.index') && (
                                <Link href={route('welcome')} className="btn btn-primary btn-sm mt-6">
                                    Explorer les chambres
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr className="bg-base-200/50 text-base-content/70 text-xs uppercase tracking-wider">
                                        <th className="py-3.5">Chambre</th>
                                        <th className="py-3.5">Période du séjour</th>
                                        <th className="py-3.5">Durée</th>
                                        <th className="py-3.5">Prix total</th>
                                        <th className="py-3.5">Statut</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-base-200">
                                    {filteredReservations.map((r) => {
                                        const nights = calculateNights(r.datestart, r.dateend);
                                        const statusInfo = getStatusBadge(r.statut_commande?.statut);

                                        return (
                                            <tr key={r.id} className="hover:bg-base-200/30 transition-colors">
                                                {/* Information Chambre */}
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                                            #{r.chambre?.numero || '?'}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-base-content">
                                                                Chambre {r.chambre?.numero}
                                                            </div>
                                                            {r.chambre?.nom && (
                                                                <div className="text-xs text-base-content/50">
                                                                    {r.chambre.nom}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Dates */}
                                                <td>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <span className="font-medium text-base-content">
                                                            {formatDate(r.datestart)}
                                                        </span>
                                                        <svg className="w-3.5 h-3.5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                        <span className="font-medium text-base-content">
                                                            {formatDate(r.dateend)}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Nuits */}
                                                <td>
                                                    <span className="badge badge-outline gap-1 font-medium text-xs">
                                                        {nights} {nights > 1 ? 'nuits' : 'nuit'}
                                                    </span>
                                                </td>

                                                {/* Prix */}
                                                <td>
                                                    <span className="font-extrabold text-base-content">
                                                        {formatPrice(r.prix)}
                                                    </span>
                                                </td>

                                                {/* Statut */}
                                                <td>
                                                    <span className={`badge ${statusInfo.badgeClass} gap-1.5 font-medium py-2 px-3 text-xs`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`} />
                                                        {statusInfo.label}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}