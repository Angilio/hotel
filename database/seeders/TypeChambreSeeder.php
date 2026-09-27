<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeChambreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('type_chambres')->insert([
            ['name' => 'VIP',        'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Standard',   'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Deluxe',     'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Familiale',  'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
