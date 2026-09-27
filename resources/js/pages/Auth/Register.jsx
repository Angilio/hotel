import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { User, Mail, Lock, UserPlus, ArrowRight, Phone, Globe } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        numero: '',
        nationality: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Inscription" />

            <div className="w-full max-w-md mx-auto my-6">
                <div className="bg-base-100 border border-base-200 shadow-xl rounded-3xl p-8 transition-all">
                    
                    {/* EN-TÊTE */}
                    <div className="text-center mb-8">
                        <div className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-3">
                            <UserPlus className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-base-content">
                            Créer un compte
                        </h1>
                        <p className="text-sm text-base-content/60 mt-1">
                            Rejoignez-nous et commencez à réserver vos séjours
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        {/* NOM COMPLET */}
                        <div className="form-control">
                            <InputLabel htmlFor="name" value="Nom complet" className="font-semibold text-sm mb-1" />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
                                    <User className="w-5 h-5" />
                                </div>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="input input-bordered w-full pl-10 focus:input-primary rounded-xl"
                                    autoComplete="name"
                                    isFocused={true}
                                    placeholder="John Doe"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.name} className="mt-1" />
                        </div>

                        {/* NUMÉRO DE TÉLÉPHONE */}
                        <div className="form-control">
                            <InputLabel htmlFor="numero" value="Numéro de téléphone" className="font-semibold text-sm mb-1" />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <TextInput
                                    id="numero"
                                    name="numero"
                                    value={data.numero}
                                    className="input input-bordered w-full pl-10 focus:input-primary rounded-xl"
                                    placeholder="+261 34 00 000 00"
                                    onChange={(e) => setData('numero', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.numero} className="mt-1" />
                        </div>

                        {/* NATIONALITÉ */}
                        <div className="form-control">
                            <InputLabel htmlFor="nationality" value="Nationalité" className="font-semibold text-sm mb-1" />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <TextInput
                                    id="nationality"
                                    name="nationality"
                                    value={data.nationality}
                                    className="input input-bordered w-full pl-10 focus:input-primary rounded-xl"
                                    placeholder="Malgache"
                                    onChange={(e) => setData('nationality', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.nationality} className="mt-1" />
                        </div>

                        {/* EMAIL */}
                        <div className="form-control">
                            <InputLabel htmlFor="email" value="Adresse Email" className="font-semibold text-sm mb-1" />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="input input-bordered w-full pl-10 focus:input-primary rounded-xl"
                                    autoComplete="username"
                                    placeholder="exemple@domaine.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* MOT DE PASSE */}
                        <div className="form-control">
                            <InputLabel htmlFor="password" value="Mot de passe" className="font-semibold text-sm mb-1" />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="input input-bordered w-full pl-10 focus:input-primary rounded-xl"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* CONFIRMATION DU MOT DE PASSE */}
                        <div className="form-control">
                            <InputLabel htmlFor="password_confirmation" value="Confirmer le mot de passe" className="font-semibold text-sm mb-1" />
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="input input-bordered w-full pl-10 focus:input-primary rounded-xl"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-1" />
                        </div>

                        {/* BOUTON S'INSCRIRE */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full rounded-xl gap-2 shadow-lg mt-4"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <>
                                    <span>Créer mon compte</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* PIED DE CARTE / LIEN CONNEXION */}
                    <div className="text-center mt-6 pt-6 border-t border-base-200">
                        <p className="text-sm text-base-content/70">
                            Vous avez déjà un compte ?{' '}
                            <Link href={route('login')} className="text-primary font-semibold hover:underline">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}