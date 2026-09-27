<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();

        // Mappage des rôles avec leurs routes de destination
        $roleRedirects = [
            'Admin'        => 'reservations.admin',
            'Receptioniste'=> 'reservations.reception',
            'Client'       => 'reservations.user',
        ];

        // 1. Si vous utilisez Spatie Laravel-Permission
        if (method_exists($user, 'getRoleNames')) {
            foreach ($user->getRoleNames() as $role) {
                if (isset($roleRedirects[$role])) {
                    return redirect()->route($roleRedirects[$role]);
                }
            }
        }

        // 2. Si le rôle est stocké sous forme de colonne directe ($user->role)
        if (isset($user->role) && isset($roleRedirects[$user->role])) {
            return redirect()->route($roleRedirects[$user->role]);
        }

        // Redirection par défaut si aucun rôle spécifique n'est trouvé
        return redirect()->route('reservations.user');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}