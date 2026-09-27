import React, { useState } from 'react';
import { Head, usePage, router, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function SinglePage({ chambre }) {
    const { auth } = usePage().props;
    const [activeImgIndex, setActiveImgIndex] = useState(0);

    const images = chambre.images || [];

    // Formatage monétaire
    const formatPrice = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount || 0) + ' Ar';
    };

    // Navigation Carousel
    const nextImage = () => {
        setActiveImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setActiveImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <GuestLayout fullWidth>
            <Head title={`Chambre #${chambre.numero}`} />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

                {/* --- GRILLE PRINCIPALE --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* COLONNE GAUCHE (8/12) : GALERIE & INFOS DÉTAILLÉES */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-6">

                        {/* GALERIE / CAROUSEL PRO */}
                        <div className="space-y-3">
                            <div className="relative w-full h-[380px] sm:h-[480px] bg-base-300 rounded-2xl overflow-hidden shadow-md group border border-base-200">
                                {images.length > 0 ? (
                                    <>
                                        <img
                                            src={`/storage/${images[activeImgIndex]}`}
                                            className="w-full h-full object-cover transition-all duration-300"
                                            alt={`Chambre ${chambre.numero} - Photo ${activeImgIndex + 1}`}
                                        />

                                        {/* Overlay Dégradé pour lisibilité */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                                        {/* Compteur d'images */}
                                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                                            📷 {activeImgIndex + 1} / {images.length}
                                        </div>

                                        {/* Controls Suivant/Précédent */}
                                        {images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100 border-none shadow-md backdrop-blur-xs text-base-content"
                                                    aria-label="Image précédente"
                                                >
                                                    ❮
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100 border-none shadow-md backdrop-blur-xs text-base-content"
                                                    aria-label="Image suivante"
                                                >
                                                    ❯
                                                </button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-base-content/40 bg-base-200">
                                        <svg className="w-16 h-16 mb-2 stroke-current" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm">Aucune photo disponible</span>
                                    </div>
                                )}
                            </div>

                            {/* VIGNETTES (THUMBNAILS) */}
                            {images.length > 1 && (
                                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImgIndex(idx)}
                                            className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                                                activeImgIndex === idx
                                                    ? 'border-primary ring-2 ring-primary/20 scale-105'
                                                    : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <img
                                                src={`/storage/${img}`}
                                                className="w-full h-full object-cover"
                                                alt={`Vignette ${idx + 1}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* PRÉSENTATION & DESCRIPTION */}
                        <div className="bg-base-100 rounded-2xl border border-base-200 p-6 shadow-xs space-y-5">
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-200 pb-4">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content">
                                        Chambre N° {chambre.numero}
                                    </h1>
                                    <p className="text-xs text-base-content/60 mt-1">
                                        Hébergement haut de gamme & confort garanti
                                    </p>
                                </div>
                                {chambre.type_chambre && (
                                    <span className="badge badge-primary badge-outline font-semibold px-3 py-3 text-xs uppercase tracking-wide">
                                        {chambre.type_chambre.name}
                                    </span>
                                )}
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-base-content uppercase tracking-wider mb-2">
                                    Description de l'hébergement
                                </h2>
                                <p className="text-sm text-base-content/70 leading-relaxed whitespace-pre-line">
                                    {chambre.description || 'Aucune description disponible pour le moment.'}
                                </p>
                            </div>

                            {/* ÉQUIPEMENTS / SERVICES (ICÔNES) */}
                            <div className="pt-2">
                                <h2 className="text-sm font-bold text-base-content uppercase tracking-wider mb-3">
                                    Équipements inclus
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-base-content/80">
                                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-base-200/50 border border-base-200">
                                        <span className="text-lg">📶</span>
                                        <span className="font-medium">Wi-Fi haut débit</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-base-200/50 border border-base-200">
                                        <span className="text-lg">❄️</span>
                                        <span className="font-medium">Climatisation</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-base-200/50 border border-base-200">
                                        <span className="text-lg">🛏️</span>
                                        <span className="font-medium">Lit King Size</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-base-200/50 border border-base-200">
                                        <span className="text-lg">🚿</span>
                                        <span className="font-medium">Salle de bain privée</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-base-200/50 border border-base-200">
                                        <span className="text-lg">📺</span>
                                        <span className="font-medium">TV HD Smart</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-base-200/50 border border-base-200">
                                        <span className="text-lg">☕</span>
                                        <span className="font-medium">Cafetière & Thé</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CALENDRIER / HISTORIQUE DES RÉSERVATIONS */}
                        <div className="bg-base-100 rounded-2xl border border-base-200 p-6 shadow-xs space-y-4">
                            <div className="flex items-center justify-between border-b border-base-200 pb-3">
                                <div className="flex items-center gap-2">
                                    <span className="p-1.5 bg-primary/10 rounded-lg text-primary text-sm">📅</span>
                                    <h2 className="text-base font-bold text-base-content">
                                        Planning d'occupation
                                    </h2>
                                </div>
                                <span className="text-xs text-base-content/50">
                                    {chambre.reservations?.length || 0} réservation(s)
                                </span>
                            </div>

                            {chambre.reservations && chambre.reservations.length > 0 ? (
                                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                                    {chambre.reservations.map((r) => {
                                        const isPending = r.statut_commande_id === 1 || r.statutCommande?.statut === 'en_attente';
                                        
                                        return (
                                            <div
                                                key={r.id}
                                                className="p-3 rounded-xl border border-base-200 bg-base-200/30 flex items-center justify-between gap-3 text-xs"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar placeholder">
                                                        <div className="bg-neutral text-neutral-content rounded-full w-8 h-8 font-bold text-[10px]">
                                                            {r.user?.name ? r.user.name.substring(0, 2).toUpperCase() : 'U'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-base-content">
                                                            {r.user?.name || 'Client anonyme'}
                                                        </p>
                                                        <p className="text-[11px] text-base-content/60 flex items-center gap-1 mt-0.5">
                                                            <span>{r.datestart}</span>
                                                            <span>→</span>
                                                            <span>{r.dateend}</span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <span
                                                    className={`badge text-[10px] font-semibold px-2.5 py-1 ${
                                                        isPending
                                                            ? 'badge-warning/20 text-warning border-warning/30'
                                                            : 'badge-success/20 text-success border-success/30'
                                                    }`}
                                                >
                                                    {r.statutCommande?.statut || (isPending ? 'En attente' : 'Confirmée')}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-base-200/30 rounded-xl border border-dashed border-base-200">
                                    <p className="text-xs text-base-content/60">
                                        Cette chambre est entièrement libre actuellement.
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* COLONNE DROITE (4/12) : CARTE DE RÉSERVATION STICKY */}
                    <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
                        <div className="bg-base-100 rounded-2xl border border-base-200 shadow-xl p-6 space-y-6">

                            {/* Prix et tarif */}
                            <div className="border-b border-base-200 pb-4">
                                <span className="text-xs uppercase font-semibold tracking-wider text-base-content/50">
                                    Tarif par nuitée
                                </span>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <span className="text-3xl font-black text-primary">
                                        {formatPrice(chambre.prix)}
                                    </span>
                                </div>
                                <span className="text-[11px] text-base-content/60">
                                    Taxes et frais de séjour inclus
                                </span>
                            </div>

                            {/* Inclus dans l'offre */}
                            <div className="space-y-2 text-xs text-base-content/80">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Confirmation instantanée</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Annulation gratuite jusqu'à 48h avant</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Petit-déjeuner non inclus</span>
                                </div>
                            </div>

                            {/* ACTION DE RÉSERVATION */}
                            {auth?.user ? (
                                <button
                                    className="btn btn-primary w-full shadow-lg hover:scale-[1.02] transition-all font-bold text-sm"
                                    onClick={() => router.get(route('reservations.modal', chambre.id))}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Réserver cette chambre
                                </button>
                            ) : (
                                <div className="space-y-3 pt-2">
                                    <Link
                                        href={route('login')}
                                        className="btn btn-primary w-full shadow-lg font-bold text-sm"
                                    >
                                        Se connecter pour réserver
                                    </Link>
                                    <p className="text-[11px] text-center text-base-content/60">
                                        Pas encore de compte ?{' '}
                                        <Link href={route('register')} className="text-primary underline font-medium">
                                            S'inscrire
                                        </Link>
                                    </p>
                                </div>
                            )}

                            {/* Footer sécurisé */}
                            <div className="pt-2 text-center border-t border-base-200">
                                <span className="text-[11px] text-base-content/50 inline-flex items-center gap-1">
                                    🔒 Réservation 100% sécurisée & garantie
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}