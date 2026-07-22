<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login (Request $request){
        //validation des données email et mdp
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        //Chercher l'utilisateur en bd 
        $user = User::where('email', $request->email)->first();
        //verifier le mdp
        if (!$user || !Hash::check($request->password, $user->password)){
            return response()->json([
                'message' => "Les identifiants sont incorrects",
            ], 401);
        }

        //verification de l'email du user
        if(!$user->hasVerifiedEmail()){
            return response()->json([
                'message' => "Vérifiez votre adresse e-mail avant de vous connecter",
            ], 403);
        }

        //creation de token
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message' => "Connexion reussie",
            'user' => $user,
            'token' => $token,
            'type_token' => 'Bearer'
        ], 200);

    }
}
