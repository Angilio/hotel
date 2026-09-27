import React from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome({ chambres = [] }) {
    const { auth } = usePage().props;

    return (
        <GuestLayout fullWidth>
            <Head title="Accueil - Hôtel de Luxe & Séjour d'Exception" />

            {/* SECTION HERO (Bannière d'accueil) */}
            <div 
                className="hero min-h-[70vh] relative"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format&fit=crop')",
                }}
            >
                <div className="hero-overlay bg-black/50 backdrop-blur-[2px]"></div>
                <div className="hero-content text-center text-neutral-content px-4 py-12">
                    <div className="max-w-3xl">
                        <span className="badge badge-primary badge-outline mb-4 px-4 py-3 uppercase tracking-widest text-xs font-semibold">
                            Expérience Unique
                        </span>
                        <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
                            Vivez des moments inoubliables dans un cadre d'exception
                        </h1>
                        <p className="mb-8 text-lg md:text-xl text-gray-200 font-light">
                            Découvrez nos chambres élégantes, nos services haut de gamme et réservez votre séjour en quelques clics.
                        </p>
                        <a href="#chambres" className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform">
                            Découvrir Nos Chambres
                        </a>
                    </div>
                </div>
            </div>

            {/* BARRE DE RECHERCHE ET FILTRES */}
            <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
                <div className="bg-base-100 rounded-2xl shadow-xl p-6 border border-base-200 text-base-content">
                    <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        
                        {/* Champ Arrivée */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base-content">Arrivée</span>
                            </label>
                            <input 
                                type="date" 
                                className="input input-bordered w-full bg-base-100 text-base-content dark:[color-scheme:dark]" 
                            />
                        </div>

                        {/* Champ Départ */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base-content">Départ</span>
                            </label>
                            <input 
                                type="date" 
                                className="input input-bordered w-full bg-base-100 text-base-content dark:[color-scheme:dark]" 
                            />
                        </div>

                        {/* Sélection Catégorie */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base-content">Catégorie</span>
                            </label>
                            <select className="select select-bordered w-full bg-base-100 text-base-content">
                                <option value="" className="bg-base-100 text-base-content">Toutes les catégories</option>
                                <option value="suite" className="bg-base-100 text-base-content">Suite VIP</option>
                                <option value="deluxe" className="bg-base-100 text-base-content">Deluxe</option>
                                <option value="standard" className="bg-base-100 text-base-content">Standard</option>
                            </select>
                        </div>

                        {/* Bouton Recherche */}
                        <button className="btn btn-primary w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Rechercher
                        </button>
                    </form>
                </div>
            </div>

            {/* SERVICES / POINTS FORTS */}
            <section className="py-16 bg-base-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Services Exclusifs</h2>
                        <p className="text-3xl font-bold text-base-content mt-2">Ce que nous vous offrons</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center p-6 bg-base-200/50 rounded-2xl">
                            <div className="p-4 bg-primary/10 text-primary rounded-full mb-4">
                                🌐
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-base-content">Wi-Fi Haut Débit</h3>
                            <p className="text-sm text-base-content/70">Connexion rapide disponible gratuitement dans tout l'établissement.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-base-200/50 rounded-2xl">
                            <div className="p-4 bg-primary/10 text-primary rounded-full mb-4">
                                🏊‍♂️
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-base-content">Piscine & Spa</h3>
                            <p className="text-sm text-base-content/70">Détendez-vous dans notre piscine extérieure et nos espaces bien-être.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-base-200/50 rounded-2xl">
                            <div className="p-4 bg-primary/10 text-primary rounded-full mb-4">
                                🍽️
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-base-content">Restaurant Gastronomique</h3>
                            <p className="text-sm text-base-content/70">Savourez des plats locaux et internationaux concoctés par nos chefs.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-base-200/50 rounded-2xl">
                            <div className="p-4 bg-primary/10 text-primary rounded-full mb-4">
                                🛎️
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-base-content">Service 24/7</h3>
                            <p className="text-sm text-base-content/70">Une équipe dédiée est à votre disposition à tout moment de la journée.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION CHAMBRES */}
            <section id="chambres" className="py-16 bg-base-200/40">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Hébergement</h2>
                        <p className="text-3xl font-bold text-base-content mt-2">Nos Chambres & Suites</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {chambres.length > 0 ? (
                            chambres.map(c => (
                                <div key={c.id} className="card bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border border-base-200 group">
                                    {/* CAROUSEL IMAGES */}
                                    <div className="relative">
                                        {c.images && c.images.length > 0 ? (
                                            <div className="carousel w-full h-56">
                                                {c.images.map((img, index) => (
                                                    <div
                                                        key={index}
                                                        id={`welcome-${c.id}-${index}`}
                                                        className="carousel-item relative w-full"
                                                    >
                                                        <img
                                                            src={`/storage/${img}`}
                                                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                                            alt={`Chambre ${c.numero}`}
                                                        />
                                                        {c.images.length > 1 && (
                                                            <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <a
                                                                    href={`#welcome-${c.id}-${index === 0 ? c.images.length - 1 : index - 1}`}
                                                                    className="btn btn-circle btn-xs bg-base-100/80 backdrop-blur border-none"
                                                                >
                                                                    ❮
                                                                </a>
                                                                <a
                                                                    href={`#welcome-${c.id}-${index === c.images.length - 1 ? 0 : index + 1}`}
                                                                    className="btn btn-circle btn-xs bg-base-100/80 backdrop-blur border-none"
                                                                >
                                                                    ❯
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <img
                                                src="/images/no-image.png"
                                                className="w-full h-56 object-cover"
                                                alt="Aucune image disponible"
                                            />
                                        )}

                                        {/* TYPE DE CHAMBRE */}
                                        {c.type_chambre && (
                                            <span className="badge badge-primary font-medium absolute top-3 right-3 shadow-md">
                                                {c.type_chambre.name}
                                            </span>
                                        )}
                                    </div>

                                    {/* CORPS DE LA CARTE */}
                                    <div className="card-body p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-base-content">
                                                Chambre #{c.numero}
                                            </h3>
                                        </div>

                                        <p className="text-sm text-base-content/70 line-clamp-2 min-h-[40px]">
                                            {c.description || "Aucune description disponible pour cette chambre."}
                                        </p>

                                        <div className="divider my-2"></div>

                                        {/* PRIX ET ACTIONS */}
                                        <div className="flex items-center justify-between mt-2">
                                            <div>
                                                <span className="text-xs text-base-content/60 block">À partir de</span>
                                                <span className="text-xl font-extrabold text-primary">
                                                    {Number(c.prix).toLocaleString()} <span className="text-xs font-normal">Ar/nuit</span>
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 justify-center p-2">
                                                <button
                                                    onClick={() => router.get(route('chambres.show', c.id))}
                                                    className="btn btn-primary text-center btn-sm hover:text-primary p-2"
                                                >
                                                    Voir plus
                                                </button>

                                                {auth?.user ? (
                                                    <button
                                                        className="btn btn-success btn-sm hover:text-success p-2"
                                                        onClick={() => router.get(route('reservations.modal', c.id))}
                                                    >
                                                        Réserver
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-success hover:text-success btn-sm p-2"
                                                        onClick={() => router.get(route('login'))}
                                                    >
                                                        Réserver
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-lg text-base-content/60">Aucune chambre n'est disponible pour le moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* SECTION AVIS CLIENTS */}
            <section className="py-16 bg-base-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Témoignages</h2>
                    <p className="text-3xl font-bold text-base-content mt-2 mb-10">Ce que disent nos clients</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 bg-base-200/50 rounded-2xl text-left border border-base-200">
                            <div className="flex items-center mb-4">
                                <div className="avatar placeholder mr-3">
                                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                                        <span>JD</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-base-content">Jean Dupont</h4>
                                    <span className="text-xs text-yellow-500">★★★★★</span>
                                </div>
                            </div>
                            <p className="text-sm text-base-content/80 italic">"Un séjour inoubliable ! Le service était impeccable et la chambre offrait une vue magnifique."</p>
                        </div>

                        <div className="p-6 bg-base-200/50 rounded-2xl text-left border border-base-200">
                            <div className="flex items-center mb-4">
                                <div className="avatar placeholder mr-3">
                                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                                        <span>MR</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-base-content">Marie R.</h4>
                                    <span className="text-xs text-yellow-500">★★★★★</span>
                                </div>
                            </div>
                            <p className="text-sm text-base-content/80 italic">"Chambres très propres et personnel très accueillant. Je recommande vivement pour les vacances en famille."</p>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}