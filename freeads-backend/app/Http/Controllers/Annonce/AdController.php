<?php

namespace App\Http\Controllers\Annonce;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ad;

class AdController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //$ads = Ad::all();
        //Ad::latest()->get()
        $ads = Ad::with('user')->get();
        return response()->json([
            'message' => 'Toutes les annonces sont bien recupérées',
            'ads' => $ads
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'description' => 'required|string',
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'price' => 'required|numeric|min:0',
            'location' => 'required|string',
        ]);

        $path = $request->file('photo')->store('ads', 'public');
        $ad = Ad::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
            'photo' => $path,
            'price' => $request->price,
            'location' => $request->location,
        ]);

        return response()->json([
            'message' => 'Annonce enregistrée en bd'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //$ad = Ad::findOrFail($id);
        $ad = Ad::with('user')->findOrFail($id);
        return response()->json([
            'message' => 'Annonce récupérée avec succès',
            'ad' =>$ad
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ad = Ad::findOrFail($id);
        if($ad->user_id !== auth()->id()){

            return response()->json([
                'message' => 'Action non autorisée. Vous n\'êtes pas le propriétaire de cette annonce.'
            ], 403);
        }
        $validatedData = $request->validate([
        'title' => 'nullable|string',
        'category' => 'nullable|string',
        'description' => 'required|string',
        'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'price' => 'nullable|numeric|min:0',
        'location' => 'nullable|string',
        ]);

        // 3. Gestion de la photo si une nouvelle image est envoyée
        if ($request->hasFile('photo')) {
            $validatedData['photo'] = $request->file('photo')->store('ads', 'public');
        }

        $ad->update($validatedData);

        return response()->json([
            'message' => 'Annonce modifiée avec succès',
            'ad' =>$ad

        ], 200);
           
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ad = Ad::findOrFail($id);
        if($ad->user_id !== auth()->id()){
             return response()->json([
                'message' => 'Action non autorisée. Vous n\'êtes pas le propriétaire de cette annonce.'
            ], 403);
        }
        $ad->delete();
        return response()->json([
            'message' => 'Annonce supprimée avec succès',
            'ad' =>$ad
        ], 200);
        
    }
}
