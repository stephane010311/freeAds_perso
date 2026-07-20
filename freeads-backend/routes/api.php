<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [RegisterController::class, 'store']);

// {id}/{hash} : Reçoit l'identifiant unique et la clé de sécurité générés par Laravel dans le lien de l'e-mail.
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request){
    $request->fulfill();//méthode magique de Laravel qui passe le champ email_verified_at de la base de données de null à la date/heure actuelle.

    return response()->json([
        'message' => 'Votre adresse e-mail a été vérifiée avec succès !'
    ], 200);
    //middleware('signed') : Vérifie que personne n'a modifié l'URL pour tricher.
})->middleware(['auth:sanctum', 'signed'])->name('verification.verify');