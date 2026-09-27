<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reservation extends Model
{
    use HasFactory;

    protected $table = 'reservations';

    protected $fillable = [
        'prix',
        'datestart',
        'dateend',
        'user_id',
        'chambre_id',
        'statut_commande_id',
    ];

    /**
     * Relations
     */

    // Une réservation appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Une réservation concerne une chambre
    public function chambre()
    {
        return $this->belongsTo(Chambre::class);
    }

    // Une réservation a un statut de commande
    public function statutCommande()
    {
        return $this->belongsTo(StatutCommande::class, 'statut_commande_id');
    }
}
