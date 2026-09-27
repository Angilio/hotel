import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { LogIn, UserPlus, Sun, Moon, Hotel, Calendar, User, LogOut, Menu, X } from 'lucide-react';

export default function GuestLayout({ children, fullWidth = false }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    // Gestion du thème avec persistance dans localStorage
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="min-h-screen flex flex-col bg-base-100 text-base-content transition-colors duration-300">

            {/* NAVBAR */}
            <header className="sticky top-0 z-50 w-full bg-base-100/90 backdrop-blur-md border-b border-base-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        
                        {/* Logo & Marque */}
                        <div className="flex items-center gap-8">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition">
                                    <ApplicationLogo className="h-7 w-7 text-primary fill-current" />
                                </div>
                                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    My Hotel
                                </span>
                            </Link>

                            {/* Liens de navigation grands écrans */}
                            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                                <Link href="/" className="hover:text-primary transition">
                                    Accueil
                                </Link>
                                <a href="#chambres" className="hover:text-primary transition">
                                    Nos Chambres
                                </a>
                                <a href="#services" className="hover:text-primary transition">
                                    Services
                                </a>
                            </nav>
                        </div>

                        {/* Actions à droite */}
                        <div className="flex items-center gap-3">

                            {/* Commutateur Dark / Light Mode */}
                            <button
                                onClick={toggleTheme}
                                className="btn btn-ghost btn-circle btn-sm"
                                aria-label="Changer de thème"
                            >
                                {theme === 'light' ? (
                                    <Moon className="w-5 h-5 text-base-content/80" />
                                ) : (
                                    <Sun className="w-5 h-5 text-amber-400" />
                                )}
                            </button>

                            {/* Utilisateur non connecté */}
                            {!user && (
                                <div className="hidden sm:flex items-center gap-2">
                                    <Link href={route('login')} className="btn btn-ghost btn-sm gap-2">
                                        <LogIn className="w-4 h-4" />
                                        <span>Connexion</span>
                                    </Link>

                                    <Link href={route('register')} className="btn btn-primary btn-sm gap-2 shadow-md">
                                        <UserPlus className="w-4 h-4" />
                                        <span>Inscription</span>
                                    </Link>
                                </div>
                            )}

                            {/* Utilisateur connecté */}
                            {user && (
                                <div className="relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button
                                                type="button"
                                                className="flex items-center gap-2 btn btn-ghost btn-sm rounded-full px-3"
                                            >
                                                <div className="avatar placeholder">
                                                    <div className="bg-primary/10 text-primary rounded-full w-7 h-7 flex items-center justify-center font-bold text-xs">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                </div>
                                                <span className="font-semibold text-sm hidden sm:inline">{user.name}</span>
                                                <svg className="w-4 h-4 opacity-60" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content align="right" width="48">
                                            <div className="px-4 py-2 border-b border-base-200">
                                                <p className="text-sm font-semibold">{user.name}</p>
                                                <p className="text-xs text-base-content/60 truncate">{user.email}</p>
                                            </div>

                                            <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2">
                                                <User className="w-4 h-4" /> Profil
                                            </Dropdown.Link>

                                            <Dropdown.Link href={route('reservations.user')} className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" /> Mes réservations
                                            </Dropdown.Link>

                                            <div className="border-t border-base-200"></div>

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
                            )}

                            {/* Bouton Hamburger pour mobile */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="btn btn-ghost btn-circle btn-sm md:hidden"
                            >
                                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu Mobile */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-base-200 bg-base-100 px-4 pt-2 pb-4 space-y-2">
                        <Link href="/" className="block py-2 px-3 rounded-lg hover:bg-base-200 text-sm font-medium">
                            Accueil
                        </Link>
                        <a href="#chambres" className="block py-2 px-3 rounded-lg hover:bg-base-200 text-sm font-medium">
                            Nos Chambres
                        </a>
                        {!user && (
                            <div className="pt-2 border-t border-base-200 flex flex-col gap-2">
                                <Link href={route('login')} className="btn btn-outline btn-sm w-full justify-start gap-2">
                                    <LogIn className="w-4 h-4" /> Connexion
                                </Link>
                                <Link href={route('register')} className="btn btn-primary btn-sm w-full justify-start gap-2">
                                    <UserPlus className="w-4 h-4" /> Inscription
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </header>

            {/* CONTENU PRINCIPAL */}
            <main className={`flex-1 ${fullWidth ? 'w-full' : 'max-w-6xl mx-auto px-4 py-8 w-full'}`}>
                {children}
            </main>

            {/* FOOTER */}
            <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded-t-3xl mt-12">
                <nav className="grid grid-flow-col gap-4">
                    <a href="#chambres" className="link link-hover">Chambres</a>
                    <a href="#" className="link link-hover">À propos</a>
                    <a href="#" className="link link-hover">Contact</a>
                </nav>
                <aside>
                    <p>© {new Date().getFullYear()} My Hotel - Tous droits réservés.</p>
                </aside>
            </footer>
        </div>
    );
}