import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from './AuthenticatedLayout';
import AdminSidebar from '@/Components/AdminSidebar';
import ReceptionSidebar from '@/Components/ReceptionSidebar';

export default function Layout({ children, header = null }) {
    const { auth } = usePage().props;

    // Extraction flexible du rôle (supporte tableau de chaînes, tableau d'objets ou chaîne directe)
    const rawRoles = auth?.user?.roles;
    const directRole = auth?.user?.role;

    let role = null;
    if (Array.isArray(rawRoles) && rawRoles.length > 0) {
        role = typeof rawRoles[0] === 'object' ? rawRoles[0]?.name : rawRoles[0];
    } else if (directRole) {
        role = directRole;
    }

    return (
        <AuthenticatedLayout>
            <div className="flex min-h-[calc(100vh-4rem)] bg-base-200/50">
                
                {/* SIDEBAR PAR RÔLE (Affichée uniquement pour Admin et Réceptionniste) */}
                {(role === 'Admin' || role === 'Receptioniste') && (
                    <aside className="hidden md:block shrink-0 w-64 border-r border-base-200 bg-base-100">
                        {role === 'Admin' && <AdminSidebar />}
                        {role === 'Receptioniste' && <ReceptionSidebar />}
                    </aside>
                )}

                {/* ZONE DE CONTENU PRINCIPALE */}
                <div className="flex-1 flex flex-col min-w-0 transition-all duration-200">
                    
                    {/* EN-TÊTE PAGE OPTIONNEL */}
                    {header && (
                        <header className="bg-base-100 border-b border-base-200 shadow-sm transition-colors duration-200">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-base-content">
                                {header}
                            </div>
                        </header>
                    )}

                    {/* CONTENU DE LA PAGE */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 text-base-content">
                        <div className="mx-auto max-w-7xl space-y-6">
                            {children}
                        </div>
                    </main>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}