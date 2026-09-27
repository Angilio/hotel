import Layout from '@/Layouts/Layout';
import { Head, usePage } from '@inertiajs/react';
import { Users, GraduationCap, Calendar, Clock, Plus, ArrowUpRight, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <Layout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-base-content tracking-tight">
                            Tableau de bord
                        </h2>
                        <p className="text-xs text-base-content/60 font-medium">
                            Bienvenue, {user?.name || 'Utilisateur'} 👋
                        </p>
                    </div>
                    <button type="button" className="btn btn-primary btn-sm gap-2 self-start sm:self-auto">
                        <Plus className="w-4 h-4" />
                        Nouvelle Action
                    </button>
                </div>
            }
        >
            <Head title="Tableau de bord" />

            <div className="py-6 space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 1. STATISTIQUES RAPIDES (DAISYUI STATS) */}
                <div className="stats stats-vertical lg:stats-horizontal shadow-xl bg-base-100 border border-base-200 w-full">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <Users className="w-8 h-8" />
                        </div>
                        <div className="stat-title text-xs font-semibold">Total Utilisateurs</div>
                        <div className="stat-value text-primary">1,248</div>
                        <div className="stat-desc text-success flex items-center gap-1 font-medium mt-1">
                            <TrendingUp className="w-3.5 h-3.5" /> +12% ce mois
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <GraduationCap className="w-8 h-8" />
                        </div>
                        <div className="stat-title text-xs font-semibold">Inscriptions</div>
                        <div className="stat-value text-secondary">452</div>
                        <div className="stat-desc font-medium mt-1">En cours d'évaluation</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-accent">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <div className="stat-title text-xs font-semibold">Événements</div>
                        <div className="stat-value text-accent">8</div>
                        <div className="stat-desc font-medium mt-1">Planifiés cette semaine</div>
                    </div>
                </div>

                {/* 2. GRILLE D'ACTIVITÉS ET ACTIONS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* TABLEAU DES ACTIVITÉS RÉCENTES (2 COLS) */}
                    <div className="lg:col-span-2 card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-base-content">
                                    Activités récents
                                </h3>
                                <button type="button" className="btn btn-ghost btn-xs gap-1 text-primary">
                                    Voir tout <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th>Utilisateur</th>
                                            <th>Action</th>
                                            <th>Statut</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="font-medium">Jean Dupont</td>
                                            <td>Mise à jour profil</td>
                                            <td><span className="badge badge-success badge-sm text-white">Succès</span></td>
                                            <td className="text-xs text-base-content/60">Il y a 5 min</td>
                                        </tr>
                                        <tr>
                                            <td className="font-medium">Marie Curie</td>
                                            <td>Inscription cours</td>
                                            <td><span className="badge badge-warning badge-sm">En attente</span></td>
                                            <td className="text-xs text-base-content/60">Il y a 20 min</td>
                                        </tr>
                                        <tr>
                                            <td className="font-medium">Paul Martin</td>
                                            <td>Connexion au système</td>
                                            <td><span className="badge badge-info badge-sm text-white">Info</span></td>
                                            <td className="text-xs text-base-content/60">Il y a 1h</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* BLOC ACCÈS RAPIDES (1 COL) */}
                    <div className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body p-6 space-y-4">
                            <h3 className="font-bold text-lg text-base-content">
                                Raccourcis
                            </h3>

                            <div className="space-y-2">
                                <button type="button" className="btn btn-outline btn-block justify-start gap-3">
                                    <Clock className="w-4 h-4 text-primary" />
                                    <span>Historique des logs</span>
                                </button>
                                <button type="button" className="btn btn-outline btn-block justify-start gap-3">
                                    <Users className="w-4 h-4 text-secondary" />
                                    <span>Gérer les membres</span>
                                </button>
                                <button type="button" className="btn btn-outline btn-block justify-start gap-3">
                                    <Calendar className="w-4 h-4 text-accent" />
                                    <span>Planifier une réunion</span>
                                </button>
                            </div>

                            <div className="alert alert-info shadow-sm text-xs mt-4">
                                <div>
                                    <span className="font-semibold block">Astuce :</span>
                                    Vous pouvez personnaliser les blocs depuis vos paramètres.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </Layout>
    );
}