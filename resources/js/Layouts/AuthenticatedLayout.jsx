import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    LayoutDashboard, 
    CalendarCheck, 
    User, 
    LogOut, 
    Sun, 
    Moon, 
    Menu, 
    X,
    ChevronDown 
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Gestion du thème Sombre / Clair synchronisé avec localStorage
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="min-h-screen bg-base-200/50 text-base-content transition-colors duration-300 flex flex-col">
            
            {/* NAVBAR */}
            <nav className="bg-base-100 border-b border-base-200 sticky top-0 z-50 backdrop-blur-md bg-base-100/90 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        
                        {/* GAUCHE : Logo + Liens */}
                        <div className="flex items-center gap-8">
                            {/* Logo */}
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center gap-2 group">
                                    <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition">
                                        <ApplicationLogo className="block h-7 w-auto fill-current text-primary" />
                                    </div>
                                    <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:inline-block">
                                        HOTEL NAKA
                                    </span>
                                </Link>
                            </div>

                            {/* Navigation Principale (Desktop) */}
                            <div className="hidden space-x-4 sm:flex items-center">
                                <NavLink
                                    href={route('reservations.user')}
                                    active={route().current('reservations.user')}
                                    className="flex items-center gap-2 py-2 px-3 rounded-lg transition"
                                >
                                    <CalendarCheck className="w-4 h-4" />
                                    <span>Mes Réservations</span>
                                </NavLink>
                            </div>
                        </div>

                        {/* DROITE : Dark Mode + Menu Profil */}
                        <div className="hidden sm:flex sm:items-center sm:gap-3">
                            
                            {/* Switch Thème */}
                            <button
                                onClick={toggleTheme}
                                className="btn btn-ghost btn-circle btn-sm text-base-content/70 hover:text-primary"
                                aria-label="Changer le thème"
                            >
                                {theme === 'light' ? (
                                    <Moon className="w-5 h-5" />
                                ) : (
                                    <Sun className="w-5 h-5 text-amber-400" />
                                )}
                            </button>

                            {/* Dropdown Utilisateur */}
                            <div className="relative ms-2">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 btn btn-ghost btn-sm rounded-full px-3 border border-base-200 bg-base-100"
                                        >
                                            <div className="avatar placeholder">
                                                <div className="bg-primary/10 text-primary rounded-full w-7 h-7 flex items-center justify-center font-bold text-xs">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                            </div>
                                            <span className="font-medium text-sm text-base-content">{user.name}</span>
                                            <ChevronDown className="w-4 h-4 opacity-60" />
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right" width="48">
                                        <div className="px-4 py-2 border-b border-base-200">
                                            <p className="text-sm font-semibold truncate">{user.name}</p>
                                            <p className="text-xs text-base-content/60 truncate">{user.email}</p>
                                        </div>

                                        <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-base-content/70" /> Profile
                                        </Dropdown.Link>

                                        <Dropdown.Link href={route('reservations.user')} className="flex items-center gap-2">
                                            <CalendarCheck className="w-4 h-4 text-base-content/70" /> Mes réservations
                                        </Dropdown.Link>

                                        <div className="border-t border-base-200 my-1"></div>

                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="flex items-center gap-2 text-error"
                                        >
                                            <LogOut className="w-4 h-4" /> Déconnexion
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Hamburger Button (Mobile) */}
                        <div className="-me-2 flex items-center gap-2 sm:hidden">
                            <button
                                onClick={toggleTheme}
                                className="btn btn-ghost btn-circle btn-sm text-base-content/70"
                            >
                                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
                            </button>

                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="btn btn-ghost btn-circle btn-sm"
                            >
                                {showingNavigationDropdown ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation Mobile */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden border-t border-base-200 bg-base-100'}>
                    <div className="space-y-1 pb-3 pt-2 px-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className="flex items-center gap-2 rounded-lg"
                        >
                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('reservations.user')}
                            active={route().current('reservations.user')}
                            className="flex items-center gap-2 rounded-lg"
                        >
                            <CalendarCheck className="w-4 h-4" /> Mes réservations
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-base-200 pb-3 pt-4 px-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="avatar placeholder">
                                <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div>
                                <div className="text-base font-semibold">{user.name}</div>
                                <div className="text-sm text-base-content/60 truncate">{user.email}</div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="flex items-center gap-2">
                                <User className="w-4 h-4" /> Profile
                            </ResponsiveNavLink>

                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="flex items-center gap-2 text-error"
                            >
                                <LogOut className="w-4 h-4" /> Déconnexion
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HEADER OPTIONNEL DE LA PAGE */}
            {header && (
                <header className="bg-base-100 shadow-sm border-b border-base-200">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* CONTENU PRINCIPAL */}
            <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}