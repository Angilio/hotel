import { Link } from '@inertiajs/react';
import { LayoutDashboard, CalendarCheck2, BedDouble, UserCheck, Sparkles } from 'lucide-react';

export default function ClientSidebar({ className = '', ...props }) {
    const isActive = (routeName) => {
        try {
            return route().current(routeName);
        } catch {
            return false;
        }
    };

    const linkClass = (active) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
            active
                ? 'bg-primary text-primary-content shadow-md shadow-primary/20 font-semibold'
                : 'text-base-content/70 hover:text-base-content hover:bg-base-200'
        }`;

    return (
        <aside
            {...props}
            className={[
                'w-full max-w-xs bg-base-100 border-r border-base-200 p-4 min-h-screen flex flex-col justify-between shrink-0',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            <div className="space-y-6">
                {/* EN-TÊTE DE LA SIDEBAR CLIENT */}
                <div className="flex items-center gap-3 px-3 py-4 border-b border-base-200">
                    <div className="p-2.5 bg-primary/10 text-primary rounded-2xl">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-base text-base-content leading-tight">
                            Espace Client
                        </h2>
                        <span className="text-xs text-base-content/60 flex items-center gap-1 mt-0.5">
                            <UserCheck className="w-3 h-3 text-success" /> Compte vérifié
                        </span>
                    </div>
                </div>

                {/* LISTE DES LIENS (MENU CLIENT) */}
                <ul className="menu menu-md p-0 space-y-1.5">
                    <li>
                        <Link
                            href={route('dashboard')}
                            className={linkClass(isActive('dashboard'))}
                        >
                            <LayoutDashboard className="w-5 h-5 shrink-0" />
                            <span>Tableau de bord</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={route('reservations.index')}
                            className={linkClass(isActive('reservations.*'))}
                        >
                            <CalendarCheck2 className="w-5 h-5 shrink-0" />
                            <span>Mes Réservations</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={route('chambres.index')}
                            className={linkClass(isActive('chambres.*'))}
                        >
                            <BedDouble className="w-5 h-5 shrink-0" />
                            <span>Réserver une chambre</span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* CARTE CONSEIL EN BAS DE SIDEBAR */}
            <div className="bg-base-200/60 p-4 rounded-2xl border border-base-200 space-y-2">
                <p className="text-xs font-semibold text-base-content">Besoin d'aide ?</p>
                <p className="text-xs text-base-content/60">
                    Contactez la réception pour toute demande spéciale concernant votre séjour.
                </p>
            </div>
        </aside>
    );
}