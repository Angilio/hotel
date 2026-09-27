import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirmation du mot de passe" />

            <div className="w-full max-w-md mx-auto my-6">
                <div className="bg-base-100 border border-base-200 shadow-xl rounded-3xl p-8 transition-all">
                    
                    {/* EN-TÊTE */}
                    <div className="text-center mb-6">
                        <div className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-3">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-base-content">
                            Zone sécurisée
                        </h1>
                        <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
                            Veuillez confirmer votre mot de passe pour accéder à cette zone protégée.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
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
                                    isFocused={true}
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* BOUTON CONFIRMER */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full rounded-xl gap-2 shadow-lg mt-2"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <>
                                    <span>Confirmer</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}