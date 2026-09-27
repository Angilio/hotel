<?php

namespace App\Http\Controllers;

use App\Models\Chambre;
use App\Models\Reservation;
use App\Models\StatutCommande;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    /**
     * Bascule automatiquement le statut des réservations expirées en "terminée"
     */
    private function autoTerminateReservations()
    {
        $statutConfirmee = StatutCommande::whereIn('statut', ['confirmée', 'confirmee'])->first();
        $statutTerminee  = StatutCommande::whereIn('statut', ['terminée', 'terminee'])->first();

        if ($statutConfirmee && $statutTerminee) {
            Reservation::where('statut_commande_id', $statutConfirmee->id)
                ->whereDate('dateend', '<=', Carbon::today())
                ->update(['statut_commande_id' => $statutTerminee->id]);
        }
    }

    /**
     * Garantit que la propriété 'prix' est correctement chargée pour React,
     * quel que soit le rôle ou l'état initial des données en BDD.
     */
    private function formatReservations($reservations)
    {
        return $reservations->map(function ($r) {
            // Si la colonne 'prix' est vide ou à 0, calcul de secours (Nuits * Prix Chambre)
            if (empty($r->prix) || $r->prix <= 0) {
                $start = Carbon::parse($r->datestart);
                $end = Carbon::parse($r->dateend);
                $nbNuits = max(1, $start->diffInDays($end));
                $prixParNuit = $r->chambre->prix ?? 0;

                $r->prix = $nbNuits * $prixParNuit;
            } else {
                $r->prix = (float) $r->prix;
            }

            return $r;
        });
    }

    /**
     * Affichage de la modal de réservation (Modal.jsx)
     */
    public function modal(Chambre $chambre)
    {
        $chambre->load('type_chambre');

        return Inertia::render('Reservations/Modal', [
            'chambre' => $chambre,
        ]);
    }

    /**
     * Liste des réservations du client connecté (UserIndex.jsx)
     */
    public function userIndex()
    {
        return $this->mesReservations();
    }

    /**
     * Vue réservations du client connecté
     */
    public function mesReservations()
    {
        $this->autoTerminateReservations();

        $reservations = Reservation::with(['chambre.type_chambre', 'statutCommande'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Reservations/UserIndex', [
            'reservations' => $this->formatReservations($reservations),
        ]);
    }

    /**
     * Vue Réception (ReceptionIndex.jsx)
     */
    public function receptionIndex()
    {
        $this->autoTerminateReservations();

        $statutValidee  = StatutCommande::whereIn('statut', ['confirmée', 'confirmee'])->first();
        $statutTerminee = StatutCommande::whereIn('statut', ['terminée', 'terminee'])->first();

        $statutIds = array_filter([
            $statutValidee?->id,
            $statutTerminee?->id,
        ]);

        $reservations = Reservation::with(['chambre.type_chambre', 'user', 'statutCommande'])
            ->when(!empty($statutIds), function ($query) use ($statutIds) {
                $query->whereIn('statut_commande_id', $statutIds);
            })
            ->orderBy('dateend', 'asc')
            ->get();

        // Application du formatage de prix puis attribution du libellé de statut
        $formattedReservations = $this->formatReservations($reservations)->map(function ($r) use ($statutValidee) {
            $r->statut = ($statutValidee && $r->statut_commande_id === $statutValidee->id) 
                ? 'confirmée' 
                : 'terminée';
            return $r;
        });

        return Inertia::render('Reservations/ReceptionIndex', [
            'reservations' => $formattedReservations,
        ]);
    }

    /**
     * Vue Administrateur (AdminIndex.jsx)
     */
    public function adminIndex()
    {
        $this->autoTerminateReservations();

        $reservations = Reservation::with(['chambre.type_chambre', 'user', 'statutCommande'])
            ->orderBy('created_at', 'desc')
            ->get();

        $statuts = StatutCommande::all();

        return Inertia::render('Reservations/AdminIndex', [
            'reservations' => $this->formatReservations($reservations),
            'statuts'      => $statuts,
        ]);
    }

    /**
     * Valider une réservation (Admin)
     */
    public function validateReservation(Reservation $reservation)
    {
        $statutConfirmee = StatutCommande::whereIn('statut', ['confirmée', 'confirmee'])->firstOrFail();

        // Vérification des conflits de dates
        $conflitExistante = Reservation::where('chambre_id', $reservation->chambre_id)
            ->where('id', '!=', $reservation->id)
            ->where('statut_commande_id', $statutConfirmee->id)
            ->where(function ($query) use ($reservation) {
                $query->where('datestart', '<', $reservation->dateend)
                      ->where('dateend', '>', $reservation->datestart);
            })
            ->exists();

        if ($conflitExistante) {
            return redirect()->back()->with('error', 'Impossible de valider : cette chambre possède déjà une réservation confirmée sur cette période.');
        }

        $reservation->update([
            'statut_commande_id' => $statutConfirmee->id,
        ]);

        return redirect()->back()->with('success', 'La réservation a été confirmée avec succès.');
    }

    /**
     * Annuler la réservation (Admin)
     */
    public function cancelReservation(Reservation $reservation)
    {
        $statutAnnulee = StatutCommande::whereIn('statut', ['annulée', 'annulee'])->firstOrFail();

        $reservation->update([
            'statut_commande_id' => $statutAnnulee->id,
        ]);

        return redirect()->back()->with('success', 'La réservation a été annulée.');
    }

    /**
     * Terminer la réservation (Réceptionniste / Admin)
     */
    public function terminateReservation(Reservation $reservation)
    {
        $statutTerminee = StatutCommande::whereIn('statut', ['terminée', 'terminee'])->firstOrFail();

        $reservation->update([
            'statut_commande_id' => $statutTerminee->id,
        ]);

        return redirect()->back()->with('success', 'La réservation a été marquée comme terminée.');
    }

    /**
     * Supprimer définitivement la réservation
     */
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();

        return redirect()->back()->with('success', 'La réservation a été supprimée.');
    }

    /**
     * Enregistrer une nouvelle réservation
     */
    public function store(Request $request)
    {
        $request->validate([
            'chambre_id' => 'required|exists:chambres,id',
            'datestart'  => 'required|date|after_or_equal:today',
            'dateend'    => 'required|date|after:datestart',
        ]);

        // Vérification de la disponibilité
        $reservationExistante = Reservation::where('chambre_id', $request->chambre_id)
            ->where(function ($query) use ($request) {
                $query->where('datestart', '<', $request->dateend)
                      ->where('dateend', '>', $request->datestart);
            })
            ->exists();

        if ($reservationExistante) {
            return back()->withErrors([
                'datestart' => 'La chambre est déjà réservée pour cette période. Veuillez choisir d\'autres dates.',
            ]);
        }

        // Calcul du prix total
        $chambre = Chambre::findOrFail($request->chambre_id);
        $start = Carbon::parse($request->datestart);
        $end = Carbon::parse($request->dateend);
        $nbNuits = max(1, $start->diffInDays($end));
        
        $prixTotal = $nbNuits * $chambre->prix;

        // Statut par défaut ("en attente")
        $statutAttente = StatutCommande::whereIn('statut', ['en attente', 'en_attente'])->first();

        // Création de la réservation
        Reservation::create([
            'user_id'            => Auth::id(),
            'chambre_id'         => $request->chambre_id,
            'datestart'          => $request->datestart,
            'dateend'            => $request->dateend,
            'prix'               => $prixTotal,
            'statut_commande_id' => $statutAttente ? $statutAttente->id : null,
        ]);

        return redirect()->route('reservations.user')->with('success', 'Votre réservation a été effectuée avec succès.');
    }
}