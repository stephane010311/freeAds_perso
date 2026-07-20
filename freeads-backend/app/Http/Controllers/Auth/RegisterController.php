<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class RegisterController extends Controller
{
    //Validation des données du formulare
    function store(Request $request) {
        $request->validate([
            'login' => 'required|string|max:255|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
            'phone' => 'required|string|max:20',
        ]);

        //créer l'utilisateur

        $user = User::create([
            'login' => $request->login,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
        ]);

        //Déclencher l'e-mail de confirmation
        event(new Registered($user));

        //Connecter l'utilisateur créé directement au lieu de passer par la connex dab 
        auth()->login($user);

        return response()->json([
            'message' => 'User enregistré avec succès',
            'user' => $user
        ], 201);
    }
}
