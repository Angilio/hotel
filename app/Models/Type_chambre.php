<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Type_chambre extends Model
{
    use HasFactory;

    protected $table = 'type_chambres';

    protected $fillable = [
        'name',
        'prix',
    ];

    public function chambres(): HasMany
    {
        return $this->hasMany(Chambre::class, 'type_chambre_id');
    }
}