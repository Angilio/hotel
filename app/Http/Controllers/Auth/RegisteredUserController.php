<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // ✅ Validation alignée à la migration
        $request->validate([
            'name' => 'required|string|max:255',
            'numero' => 'required|string|max:50',
            'nationality' => 'required|string|max:100',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // ✅ Création utilisateur
        $user = User::create([
            'name' => $request->name,
            'numero' => $request->numero,
            'nationality' => $request->nationality,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // ✅ Attribution du rôle par défaut (Spatie)
        $user->assignRole('Client');

        // ✅ Événement d’inscription (email verification si activée)
        event(new Registered($user));

        // ✅ Connexion automatique
        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
