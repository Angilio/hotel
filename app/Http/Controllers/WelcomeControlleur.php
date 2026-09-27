<?php

namespace App\Http\Controllers;

use App\Models\Chambre;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WelcomeControlleur extends Controller
{
    public function welcome()
    {
        $chambres = Chambre::with('type_Chambre')
            ->withCount(['reservations as reservations_count' => function ($query) {
                $query->whereIn('statut_commande_id', [1, 2]); // IDs des statuts
            }])
            ->latest()
            ->get();

        return Inertia::render('Welcome', [
            'chambres' => $chambres,
        ]);
    }
}
