<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsReceptioniste
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check() || !Auth::user()->hasRole('Receptioniste')) {
            abort(403, 'Accès réservé aux réceptionnistes');
        }

        return $next($request);
    }
}
