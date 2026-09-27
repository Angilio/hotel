<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatutCommande extends Model
{

    protected $fillable = [
        'statut',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'statut_commande_id');
    }
}
