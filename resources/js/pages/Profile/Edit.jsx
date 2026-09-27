import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { 
    User, 
    KeyRound, 
    ShieldAlert, 
    CheckCircle2, 
    Shield, 
    MailCheck, 
    Sparkles,
    ChevronRight,
    ShieldCheck
} from 'lucide-react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const role = user?.roles?.[0]?.name || 'Utilisateur';
    const [activeTab, setActiveTab] = useState('profile');

    const isEmailVerified = !!user.email_verified_at;
    const profileScore = isEmailVerified ? 100 : 75;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-base-content flex items-center gap-2">
                            Paramètres du Profil
                        </h2>
                        <p className="text-xs text-base-content/80 font-medium">
                            Gérez vos identifiants, votre sécurité et la confidentialité de votre compte.
                        </p>
                    </div>
                    <div className="badge badge-primary badge-outline gap-1.5 font-semibold py-3 px-3 shadow-sm self-start sm:self-auto text-primary">
                        <Sparkles className="w-3.5 h-3.5" />
                        Compte {role}
                    </div>
                </div>
            }
        >
            <Head title="Mon Profil" />

            <div className="py-6 space-y-6 max-w-7xl mx-auto">
                
                {/* BANNIÈRE ET CARTE D'IDENTITÉ */}
                <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
                    {/* Bannière avec titre PAGE DE PROFIL en très grande taille */}
                    <div className="h-36 bg-gradient-to-r from-primary via-secondary to-accent opacity-90 relative flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
                        <h1 className="text-3xl sm:text-5xl font-black tracking-widest text-primary-content/95 uppercase drop-shadow-md z-10 text-center">
                            PAGE DE PROFIL
                        </h1>
                    </div>

                    <div className="card-body pt-0 -mt-12 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            
                            {/* Avatar (Rond parfait + Lettre centrée) & Identité */}
                            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                                <div className="avatar placeholder">
                                    <div className="w-24 h-24 rounded-full bg-neutral text-neutral-content ring-4 ring-base-100 shadow-2xl text-4xl font-black flex items-center justify-center">
                                        <span>{user.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                        <h2 className="text-3xl sm:text-4xl font-black text-base-content leading-tight">
                                            {user.name}
                                        </h2>
                                        {isEmailVerified && (
                                            <div className="tooltip tooltip-right" data-tip="Compte Vérifié">
                                                <CheckCircle2 className="w-6 h-6 text-success fill-success/10" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm font-medium text-base-content/80">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {/* Cartes d'État / Statut alignées verticalement */}
                            <div className="flex items-center justify-center gap-3">
                                <div className="stat bg-base-200/80 rounded-2xl p-3 border border-base-300 w-auto min-w-[120px]">
                                    <div className="stat-title text-xs flex items-center gap-1.5 font-medium text-base-content/80">
                                        <Shield className="w-3.5 h-3.5 text-primary" /> Rôle
                                    </div>
                                    <div className="stat-value text-sm font-bold text-base-content">
                                        {role}
                                    </div>
                                </div>

                                <div className="stat bg-base-200/80 rounded-2xl p-3 border border-base-300 w-auto min-w-[120px]">
                                    <div className="stat-title text-xs flex items-center gap-1.5 font-medium text-base-content/80">
                                        <MailCheck className="w-3.5 h-3.5 text-success" /> État
                                    </div>
                                    <div className="stat-value text-sm font-bold text-base-content">
                                        {isEmailVerified ? 'Vérifié' : 'En attente'}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* DISPOSITION EN GRILLE */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    
                    {/* MENU DE NAVIGATION */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="card bg-base-100 shadow-xl border border-base-300 p-2">
                            <nav className="flex flex-col space-y-1">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('profile')}
                                    className={`group flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                                        activeTab === 'profile'
                                            ? 'bg-primary text-primary-content shadow-md shadow-primary/20'
                                            : 'text-base-content/80 hover:bg-base-200 hover:text-base-content'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <User className="w-4 h-4" />
                                        <span>Informations</span>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                                        activeTab === 'profile' ? 'translate-x-0' : 'opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0'
                                    }`} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setActiveTab('security')}
                                    className={`group flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                                        activeTab === 'security'
                                            ? 'bg-primary text-primary-content shadow-md shadow-primary/20'
                                            : 'text-base-content/80 hover:bg-base-200 hover:text-base-content'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <KeyRound className="w-4 h-4" />
                                        <span>Mot de passe</span>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                                        activeTab === 'security' ? 'translate-x-0' : 'opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0'
                                    }`} />
                                </button>

                                <div className="pt-2 my-1 border-t border-base-300">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('danger')}
                                        className={`group flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                                            activeTab === 'danger'
                                                ? 'bg-error text-error-content shadow-sm'
                                                : 'text-error hover:bg-error/10'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <ShieldAlert className="w-4 h-4" />
                                            <span>Zone de Danger</span>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                                            activeTab === 'danger' ? 'translate-x-0' : 'opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0'
                                        }`} />
                                    </button>
                                </div>
                            </nav>
                        </div>

                        {/* NIVEAU DE SÉCURITÉ */}
                        <div className="card bg-base-100 shadow-xl border border-base-300 p-4 space-y-3">
                            <div className="flex items-center justify-between text-xs font-bold">
                                <span className="text-base-content/80 flex items-center gap-1.5">
                                    <ShieldCheck className="w-4 h-4 text-primary" /> Sécurité globale
                                </span>
                                <span className="text-primary font-black">{profileScore}%</span>
                            </div>
                            <progress 
                                className="progress progress-primary w-full h-2" 
                                value={profileScore} 
                                max="100"
                            />
                            <p className="text-xs text-base-content/80 leading-relaxed font-medium">
                                {isEmailVerified 
                                    ? 'Votre compte dispose d\'un niveau de protection optimal.' 
                                    : 'Confirmez votre adresse e-mail pour maximiser la sécurité.'}
                            </p>
                        </div>
                    </div>

                    {/* CONTENU PRINCIPAL DES FORMULAIRES */}
                    <div className="lg:col-span-3">
                        {activeTab === 'profile' && (
                            <div className="card bg-base-100 shadow-xl border border-base-300">
                                <div className="card-body">
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-2xl"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="card bg-base-100 shadow-xl border border-base-300">
                                <div className="card-body">
                                    <UpdatePasswordForm className="max-w-2xl" />
                                </div>
                            </div>
                        )}

                        {activeTab === 'danger' && (
                            <div className="card bg-base-100 shadow-xl border border-error/30">
                                <div className="card-body">
                                    <DeleteUserForm className="max-w-2xl" />
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}