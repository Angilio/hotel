import { Link } from '@inertiajs/react';
import { LayoutDashboard, BedDouble, CalendarCheck2, ShieldCheck } from 'lucide-react';

export default function AdminSidebar({ className = '', ...props }) {
    const isActive = (routeName) => route().current(routeName);

    const linkClass = (active) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
            active
                ? 'bg-primary text-primary-content shadow-md shadow-primary/20 font-semibold'
                : 'text-base-content/70 hover:text-base-content hover:bg-base-200'
        }`;

    return (
        <aside
            {...props}
            className={
                [
                    'w-full max-w-xs bg-base-100 border-r border-base-200 p-4 min-h-screen flex flex-col justify-between',
                    className,
                ]
                    .filter(Boolean)
                    .join(' ')
            }
        >
            <div className="space-y-6">
                {/* EN-TÊTE DE LA SIDEBAR */}
                <div className="flex items-center gap-3 px-3 py-4 border-b border-base-200">
                    <div className="p-2 bg-primary/10 text-primary rounded-xl">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-base text-base-content leading-tight">
                            Administration
                        </h2>
                        <span className="text-xs text-base-content/60">Gestion globale</span>
                    </div>
                </div>

                {/* LISTE DES LIENS (MENU DAISYUI) */}
                <ul className="menu menu-md p-0 space-y-1">
                     <li>
                        <Link
                            href={route('reservations.admin')}
                            className={linkClass(isActive('reservations.admin'))}
                        >
                            <CalendarCheck2 className="w-5 h-5 shrink-0" />
                            <span>Tableau de bord</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={route('chambres.index')}
                            className={linkClass(isActive('chambres.*'))}
                        >
                            <BedDouble className="w-5 h-5 shrink-0" />
                            <span>Chambres</span>
                        </Link>
                    </li>

                   
                </ul>
            </div>
        </aside>
    );
}