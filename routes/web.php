<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ChambreController;
use App\Http\Controllers\WelcomeControlleur;

Route::get('/', [WelcomeControlleur::class, 'welcome'])->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {

    Route::get('/reservations/modal/{chambre}', [ReservationController::class, 'modal'])->name('reservations.modal');
    Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');
    Route::get('/mes-reservations', [ReservationController::class, 'mesReservations'])->name('reservations.user');

    Route::get('/chambres', [ChambreController::class, 'index'])->name('chambres.index');
    Route::post('/chambres', [ChambreController::class, 'store'])->name('chambres.store');
    Route::put('/chambres/{chambre}', [ChambreController::class, 'update'])->name('chambres.update');
    Route::delete('/chambres/{chambre}', [ChambreController::class, 'destroy'])->name('chambres.destroy');
});

Route::middleware(['auth', 'role:Admin'])->group(function () {
  

    Route::post('/reservations/{reservation}/cancel', [ReservationController::class, 'cancelReservation'])->name('reservations.cancel');
    Route::post('/reservations/{reservation}/delete', [ReservationController::class, 'deleteReservation'])->name('reservations.delete');
    Route::get('/reservations/admin', [ReservationController::class, 'adminIndex'])->name('reservations.admin');
    Route::patch('/reservations/{reservation}/validate', [ReservationController::class, 'validateReservation'])->name('reservations.validate');

});

Route::middleware(['auth', 'role:Receptioniste'])->group(function () {
    Route::get('/reservations/reception', [ReservationController::class, 'receptionIndex'])->name('reservations.reception');

    // Accepter la méthode PATCH envoyée par Inertia
    Route::patch('/reservations/{reservation}/terminate', [ReservationController::class, 'terminateReservation'])->name('reservations.terminate');
});

Route::get('/chambres/{chambre}', [ChambreController::class, 'show'])
    ->name('chambres.show');

require __DIR__.'/auth.php';
