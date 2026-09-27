<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StatutCommande;

class StatutCommandeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuts = [
            'en_attente',
            'confirmée',
            'annulée',
        ];

        foreach ($statuts as $statut) {
            StatutCommande::firstOrCreate([
                'statut' => $statut,
            ]);
        }
    }
}
