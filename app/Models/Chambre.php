<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chambre extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero',
        'prix',
        'description',
        'type_chambre_id',
        'images',
    ];

    protected $casts = [
        'images' => 'array',
        'prix' => 'float',
    ];

    public function Type_chambre(): BelongsTo
    {
        return $this->belongsTo(Type_chambre::class, 'type_chambre_id');
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}