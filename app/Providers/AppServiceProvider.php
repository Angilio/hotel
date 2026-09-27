<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Pour éviter les problèmes de longueur de champ avec MySQL < 5.7
        Schema::defaultStringLength(191);

        // Partage global des infos utilisateur avec Inertia
        Inertia::share([
            'auth' => function () {
                /** @var User|null $user */
                $user = Auth::user();
                if ($user) {
                    $user->load('roles'); // IDE comprendra que c’est un User
                }
                return [
                    'user' => $user,
                ];
            },
        ]);
    }
}
