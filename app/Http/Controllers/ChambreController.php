<?php

namespace App\Http\Controllers;

use App\Models\Chambre;
use App\Models\Type_chambre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ChambreController extends Controller
{
    /**
     * Affiche la liste des chambres et des types.
     */
    public function index()
    {
        return Inertia::render('Chambres/Index', [
            'chambres' => Chambre::with('type_chambre')->latest()->get(),
            'types' => Type_chambre::all(['id', 'name', 'prix']),
        ]);
    }

    /**
     * Affiche les détails d'une chambre spécifique (SinglePage).
     */
    public function show(Chambre $chambre)
    {
        // Chargement des relations nécessaires pour la page SinglePage
        $chambre->load([
            'type_chambre',
            'reservations' => function ($query) {
                $query->orderBy('datestart', 'desc');
            },
            'reservations.user',
            'reservations.statutCommande',
        ]);

        return Inertia::render('Chambres/SinglePage', [
            'chambre' => $chambre,
        ]);
    }

    /**
     * Enregistre une nouvelle chambre.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'numero' => 'required|string|max:50|unique:chambres,numero',
            'type_chambre_id' => 'required|exists:type_chambres,id',
            'prix' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        // Attribuer automatiquement le prix depuis le Type_chambre
        $typeChambre = Type_chambre::findOrFail($request->type_chambre_id);
        $validated['prix'] = $typeChambre->prix;

        $imagePaths = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $imagePaths[] = $file->store('chambres', 'public');
            }
        }

        $validated['images'] = $imagePaths;

        Chambre::create($validated);

        return redirect()->back()->with('success', 'La chambre a été créée avec succès.');
    }

    /**
     * Met à jour les informations d'une chambre existante.
     */
    public function update(Request $request, Chambre $chambre)
    {
        $validated = $request->validate([
            'numero' => 'required|string|max:50|unique:chambres,numero,' . $chambre->id,
            'type_chambre_id' => 'required|exists:type_chambres,id',
            'prix' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $typeChambre = Type_chambre::findOrFail($request->type_chambre_id);
        $validated['prix'] = $typeChambre->prix;

        $imagePaths = $chambre->images ?? [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $imagePaths[] = $file->store('chambres', 'public');
            }
        }

        $validated['images'] = $imagePaths;

        $chambre->update($validated);

        return redirect()->back()->with('success', 'La chambre a été mise à jour avec succès.');
    }

    /**
     * Supprime une chambre et ses images associées sur le disque.
     */
    public function destroy(Chambre $chambre)
    {
        if (!empty($chambre->images) && is_array($chambre->images)) {
            foreach ($chambre->images as $imagePath) {
                if (Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                }
            }
        }

        $chambre->delete();

        return redirect()->back()->with('success', 'La chambre et ses images ont été supprimées.');
    }
}