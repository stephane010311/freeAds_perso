<template>
  <div class="min-h-screen bg-gray-50 flex font-sans">
    
    <!-- 1. SIDEBAR LATÉRALE -->
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col justify-between hidden md:flex sticky top-0 h-screen">
      <div>
        <!-- Logo -->
        <div class="p-6 border-b border-gray-100">
          <router-link to="/" class="flex items-center space-x-2 text-2xl font-black tracking-wide">
            <span class="bg-red-600 text-white px-2 py-0.5 rounded-lg shadow">Free</span>
            <span class="text-gray-900">Ads</span>
          </router-link>
        </div>

        <!-- Liens du Menu -->
        <nav class="p-4 space-y-1">
          <router-link 
            to="/dashboard" 
            class="flex items-center space-x-3 px-4 py-3 text-sm font-bold rounded-xl bg-red-50 text-red-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Mes Annonces</span>
          </router-link>

          <router-link 
            to="/profile" 
            class="flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Mon Profil</span>
          </router-link>

          <router-link 
            to="/" 
            class="flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Voir le site public</span>
          </router-link>
        </nav>
      </div>

      <!-- Footer Sidebar : Bouton Déconnexion -->
      <div class="p-4 border-t border-gray-100">
        <button 
          @click="handleLogout"
          class="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition border border-red-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>

    <!-- 2. CONTENU PRINCIPAL (À DROITE DE LA SIDEBAR) -->
    <div class="flex-1 flex flex-col min-w-0">
      
      <!-- Header Mobile / Petit écran uniquement -->
      <header class="bg-red-600 text-white p-4 md:hidden flex justify-between items-center shadow-md">
        <span class="text-xl font-black">Free<span class="text-yellow-300">Ads</span></span>
        <router-link to="/" class="text-xs font-bold bg-red-700 px-3 py-1.5 rounded-lg border border-red-500">
          ← Accueil
        </router-link>
      </header>

      <!-- En-tête principal -->
      <div class="bg-white border-b border-gray-200 py-6 px-6 sm:px-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 class="text-2xl font-black text-gray-900">Mes Annonces</h1>
            <p class="text-xs text-gray-500 mt-1">Gérez vos publications, modifiez ou supprimez vos annonces en ligne.</p>
          </div>

          <!-- Bouton d'action principal -->
          <button 
            class="bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold py-2.5 px-5 rounded-xl text-sm transition transform hover:scale-105 shadow flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span>Publier une nouvelle annonce</span>
          </button>
        </div>
      </div>

      <!-- Zone d'affichage du Tableau -->
      <main class="p-6 sm:p-8 flex-1">
        
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          
          <!-- En-tête du tableau -->
          <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-500">
              Liste de vos annonces
            </span>
          </div>
        <div v-if="adStore.isLoading" class="p-8 text-center text-gray-500 font-medium">
             chargement de vos annonces...
        </div>

        <div v-else-if ="adStore.error" class="p-8 text-center text-gray-500 font-medium">
            {{ adStore.error }}
        </div>

          <div v-else-if ="!adStore.ads || adStore.ads.length === 0" class="p-5 text-center text-gray-500 font-medium">
            Aucune annonce publiée pour le moment 
        </div>


          <!-- Tableau des annonces -->
          <div v-else class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-100/70 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  <th class="py-3.5 px-4">Photo</th>
                  <th class="py-3.5 px-4">Titre</th>
                  <th class="py-3.5 px-4">Catégorie</th>
                  <th class="py-3.5 px-4">Prix</th>
                  <th class="py-3.5 px-4">Localisation</th>
                  <th class="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-sm">

               
                <!-- Ligne 1 (Exemple statique) -->
                <tr v-for ="ad in adStore.ads" :key="ad.id" class="hover:bg-gray-50 transition">
                  <td class="py-4 px-4">
                    <img 
                      :src="ad.photo" 
                      :alt="ad.title" 
                      class="w-14 h-14 object-cover rounded-xl border border-gray-200 shrink-0" 
                    />
                  </td>
                  <td class="py-4 px-4">
                    <h3 class="font-bold text-gray-900 line-clamp-1">{{ad.title}}</h3>
                    <p class="text-xs text-gray-400 mt-0.5">Publié le {{ad.created_at || 'Récemment'}}</p>
                  </td>
                  <td class="py-4 px-4">
                    <span class="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-lg font-medium">
                      {{ad.category}}
                    </span>
                  </td>
                  <td class="py-4 px-4 font-extrabold text-red-600">
                    {{ad.price}}
                  </td>
                  <td class="py-4 px-4 text-xs text-gray-600 font-medium">
                    {{ad.location}}
                  </td>
                  <td class="py-4 px-4 text-center">
                    <div class="inline-flex items-center space-x-2">
                      <button class="bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold px-3 py-1.5 rounded-lg text-xs transition border border-blue-200">
                        Éditer
                      </button>
                      <button class="bg-red-50 text-red-600 hover:bg-red-100 font-bold px-3 py-1.5 rounded-lg text-xs transition border border-red-200">
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>

      </main>

    </div>

  </div>
</template>

<script setup>
import { useAdStore } from '../stores/ad'
import { onMounted } from 'vue'

const adStore = useAdStore()
onMounted (async () =>{
    await adStore.fetchAds()
})
    
</script>