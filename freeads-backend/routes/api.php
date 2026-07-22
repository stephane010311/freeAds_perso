<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Models\User;
use App\Http\Controllers\Annonce\AdController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [RegisterController::class, 'store']);

// {id}/{hash} : Reçoit l'identifiant unique et la clé de sécurité générés par Laravel dans le lien de l'e-mail.
Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash){
    // 1. On cherche l'utilisateur par son ID
    $user = User::findOrFail($id);

    // 2. Si son email n'est pas encore vérifié, on le valide
    if (!$user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
    }
    return response()->json([
        'message' => 'Votre adresse e-mail a été vérifiée avec succès !'
    ], 200);
    //middleware('signed') : Vérifie que personne n'a modifié l'URL pour tricher.
})->middleware(['signed'])->name('verification.verify');

Route::post('/login', [LoginController::class, 'login']);

// Route::apiResource('ads', AdController::class);

Route::get('/ads', [AdController::class, 'index']);
Route::get('/ads/{id}', [AdController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/ads', [AdController::class, 'store']);
    Route::put('/ads/{id}', [AdController::class, 'update']);
    Route::delete('/ads/{id}', [AdController::class, 'destroy']);
});