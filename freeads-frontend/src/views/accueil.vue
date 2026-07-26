<template>
  <div class="bg-gray-50 min-h-screen font-sans">
    
    <!-- 1. NAVIGATION -->
    <nav class="bg-red-600 text-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <!-- Logo -->
        <a href="#" class="flex items-center space-x-2 text-2xl font-black tracking-wide hover:opacity-90 transition">
          <span class="bg-white text-red-600 px-2 py-0.5 rounded-lg shadow">Free</span>
          <span>Ads</span>
        </a>

        <!-- Menu principal -->
        <div class="hidden md:flex items-center space-x-6 text-sm font-semibold">
          <a href="#" class="hover:text-yellow-200 transition">Toutes les annonces</a>
          <a href="#" class="hover:text-yellow-200 transition">Mes favoris</a>
          <a href="#" class="hover:text-yellow-200 transition">Mes messages</a>
        </div>

        <!-- Actions utilisateur -->
        <div class="flex items-center space-x-3">
          <button class="bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold py-2 px-4 rounded-lg text-sm transition transform hover:scale-105 shadow flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span>Publier une annonce</span>
          </button>
          
          <!-- <a href="#" class="text-sm font-semibold hover:underline hidden sm:inline-block">
            Connexion
          </a> -->

          <div v-if="authStore.isAuthenticated" class="flex items-center space-x-3">
            <span class="text-sm font-bold text-yellow-300">
              Hiii, {{ authStore.user?.login || authStore.user?.email }}
            </span>

            <button 
              @click="handleLogout" 
              class="bg-red-800 hover:bg-red-900 text-white text-xs font-bold py-2 px-3 rounded-lg border border-red-500 transition">
              Déconnexion
            </button>
          </div>

          <!-- Si l'utilisateur est un visiteur -->
          <router-link v-else to="/login" class="text-sm font-semibold hover:underline">
            Connexion
          </router-link>



        </div>
      </div>
    </nav>

    <!-- 2. HERO SECTION & BARRE DE RECHERCHE -->
    <section class="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 md:py-16 px-4">
      <div class="container mx-auto max-w-4xl text-center">
        <h1 class="text-3xl md:text-5xl font-extrabold mb-3">
          Des milliers d'annonces près de chez vous
        </h1>
        <p class="text-red-100 text-base md:text-lg mb-8">
          Achetez, vendez et trouvez tout ce dont vous avez besoin en toute simplicité.
        </p>

        <!-- Barre de recherche -->
        <div class="bg-white p-3 rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-12 gap-2 text-gray-800">
          <!-- Mot clé -->
          <div class="md:col-span-5 flex items-center bg-gray-100 px-3 rounded-lg border border-transparent focus-within:border-red-500 focus-within:bg-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Que recherchez-vous ?" 
              class="w-full py-2.5 bg-transparent focus:outline-none text-sm"
            />
          </div>

          <!-- Catégorie -->
          <div class="md:col-span-3 bg-gray-100 rounded-lg border border-transparent focus-within:border-red-500 focus-within:bg-white transition">
            <select class="w-full py-2.5 px-3 bg-transparent focus:outline-none text-sm text-gray-600">
              <option value="">Toutes catégories</option>
              <option value="vehicules">Véhicules</option>
              <option value="immobilier">Immobilier</option>
              <option value="multimedia">Multimédia</option>
              <option value="maison">Maison & Jardin</option>
              <option value="emploi">Emploi & Services</option>
            </select>
          </div>

          <!-- Ville / Localisation -->
          <div class="md:col-span-2 flex items-center bg-gray-100 px-3 rounded-lg border border-transparent focus-within:border-red-500 focus-within:bg-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Ville..." 
              class="w-full py-2.5 bg-transparent focus:outline-none text-sm"
            />
          </div>

          <!-- Bouton Submit -->
          <button class="md:col-span-2 bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold py-2.5 px-4 rounded-lg text-sm transition shadow">
            Rechercher
          </button>
        </div>
      </div>
    </section>

    <!-- 3. TOP CATÉGORIES -->
    <section class="py-10 bg-white border-b border-gray-200">
      <div class="container mx-auto px-4">
        <h2 class="text-xl font-bold text-gray-800 mb-6">Explorer par catégorie</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
          
          <a href="#" class="p-4 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-200 transition group">
            <div class="text-2xl mb-2 group-hover:scale-110 transition duration-200">🚗</div>
            <span class="text-xs font-semibold text-gray-700 group-hover:text-red-600">Véhicules</span>
          </a>

          <a href="#" class="p-4 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-200 transition group">
            <div class="text-2xl mb-2 group-hover:scale-110 transition duration-200">🏠</div>
            <span class="text-xs font-semibold text-gray-700 group-hover:text-red-600">Immobilier</span>
          </a>

          <a href="#" class="p-4 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-200 transition group">
            <div class="text-2xl mb-2 group-hover:scale-110 transition duration-200">💻</div>
            <span class="text-xs font-semibold text-gray-700 group-hover:text-red-600">Multimédia</span>
          </a>

          <a href="#" class="p-4 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-200 transition group">
            <div class="text-2xl mb-2 group-hover:scale-110 transition duration-200">🛋️</div>
            <span class="text-xs font-semibold text-gray-700 group-hover:text-red-600">Maison</span>
          </a>

          <a href="#" class="p-4 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-200 transition group">
            <div class="text-2xl mb-2 group-hover:scale-110 transition duration-200">👕</div>
            <span class="text-xs font-semibold text-gray-700 group-hover:text-red-600">Mode</span>
          </a>

          <a href="#" class="p-4 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-200 transition group">
            <div class="text-2xl mb-2 group-hover:scale-110 transition duration-200">💼</div>
            <span class="text-xs font-semibold text-gray-700 group-hover:text-red-600">Emploi</span>
          </a>

        </div>
      </div>
    </section>

    <!-- 4. RÉSULTATS / ANNONCES RÉCENTES -->
    <section class="py-12 container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-extrabold text-gray-900">Annonces récentes</h2>
        <a href="#" class="text-sm font-semibold text-red-600 hover:underline">Voir tout →</a>
      </div>
      
      <!-- Grille d'annonces -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        <!-- Carte Annonce 1 -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 flex flex-col justify-between group cursor-pointer">
          <div>
            <div class="relative h-48 overflow-hidden bg-gray-100">
              <img src="https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80" alt="Voiture" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
              <span class="absolute top-2 left-2 bg-gray-900 bg-opacity-70 text-white text-xs px-2 py-1 rounded">Véhicules</span>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-gray-800 text-lg line-clamp-1 mb-1 group-hover:text-red-600 transition">Peugeot 208 GT Line - Excellent état</h3>
              <p class="text-xl font-extrabold text-red-600 mb-3">12 500 €</p>
              <div class="text-xs text-gray-500 flex items-center space-x-2">
                <span>📍 Paris (75011)</span>
                <span>•</span>
                <span>Aujourd'hui, 14:20</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Carte Annonce 2 -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 flex flex-col justify-between group cursor-pointer">
          <div>
            <div class="relative h-48 overflow-hidden bg-gray-100">
              <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80" alt="iPhone" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
              <span class="absolute top-2 left-2 bg-gray-900 bg-opacity-70 text-white text-xs px-2 py-1 rounded">Multimédia</span>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-gray-800 text-lg line-clamp-1 mb-1 group-hover:text-red-600 transition">iPhone 13 Pro 128Go - Comme neuf</h3>
              <p class="text-xl font-extrabold text-red-600 mb-3">650 €</p>
              <div class="text-xs text-gray-500 flex items-center space-x-2">
                <span>📍 Lyon (69002)</span>
                <span>•</span>
                <span>Hier, 18:45</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Carte Annonce 3 -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 flex flex-col justify-between group cursor-pointer">
          <div>
            <div class="relative h-48 overflow-hidden bg-gray-100">
              <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" alt="Appartement" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
              <span class="absolute top-2 left-2 bg-gray-900 bg-opacity-70 text-white text-xs px-2 py-1 rounded">Immobilier</span>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-gray-800 text-lg line-clamp-1 mb-1 group-hover:text-red-600 transition">Appartement T3 lumineux avec balcon</h3>
              <p class="text-xl font-extrabold text-red-600 mb-3">230 000 €</p>
              <div class="text-xs text-gray-500 flex items-center space-x-2">
                <span>📍 Bordeaux (33000)</span>
                <span>•</span>
                <span>24 juil.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Carte Annonce 4 -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 flex flex-col justify-between group cursor-pointer">
          <div>
            <div class="relative h-48 overflow-hidden bg-gray-100">
              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80" alt="Canapé" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
              <span class="absolute top-2 left-2 bg-gray-900 bg-opacity-70 text-white text-xs px-2 py-1 rounded">Maison</span>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-gray-800 text-lg line-clamp-1 mb-1 group-hover:text-red-600 transition">Canapé convertible 3 places velours</h3>
              <p class="text-xl font-extrabold text-red-600 mb-3">200 €</p>
              <div class="text-xs text-gray-500 flex items-center space-x-2">
                <span>📍 Marseille (13001)</span>
                <span>•</span>
                <span>22 juil.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- 5. COMMENT ÇA MARCHE -->
    <section class="py-14 bg-gray-100 border-t border-gray-200">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-extrabold text-center text-gray-900 mb-10">Comment ça marche ?</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-xl shadow-sm text-center">
            <div class="bg-red-100 text-red-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
            <h3 class="font-bold text-gray-800 text-lg mb-2">Créez votre compte</h3>
            <p class="text-gray-600 text-sm">Inscrivez-vous en quelques secondes pour commencer à acheter ou vendre.</p>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm text-center">
            <div class="bg-red-100 text-red-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
            <h3 class="font-bold text-gray-800 text-lg mb-2">Publiez une annonce</h3>
            <p class="text-gray-600 text-sm">Ajoutez des photos, fixez votre prix et mettez votre bien en ligne gratuitement.</p>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm text-center">
            <div class="bg-red-100 text-red-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
            <h3 class="font-bold text-gray-800 text-lg mb-2">Entrez en contact</h3>
            <p class="text-gray-600 text-sm">Discutez directement avec les acheteurs et vendeurs en toute sécurité.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. FOOTER -->
    <footer class="bg-gray-900 text-gray-300 py-10">
      <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
        <div>
          <span class="text-xl font-black text-white">Free<span class="text-red-500">Ads</span></span>
          <p class="mt-3 text-gray-400">La plateforme de petites annonces simple et rapide entre particuliers.</p>
        </div>
        <div>
          <h4 class="text-white font-bold mb-3">À propos</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:underline">Qui sommes-nous ?</a></li>
            <li><a href="#" class="hover:underline">Conditions Générales</a></li>
            <li><a href="#" class="hover:underline">Politique de confidentialité</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-bold mb-3">Aide & Contact</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:underline">Centre d'aide</a></li>
            <li><a href="#" class="hover:underline">Conseils de sécurité</a></li>
            <li><a href="#" class="hover:underline">Nous contacter</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-bold mb-3">Suivez-nous</h4>
          <div class="flex space-x-4 text-gray-400">
            <a href="#" class="hover:text-white">Facebook</a>
            <a href="#" class="hover:text-white">Twitter</a>
            <a href="#" class="hover:text-white">Instagram</a>
          </div>
        </div>
      </div>
      <div class="container mx-auto px-4 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
        &copy; 2026 FreeAds. Tous droits réservés.
      </div>
    </footer>

  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// méthode de déconnexion 
const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
  console.log('Utilisateur déconnecté avec succès !')
}

</script>

<style scoped>
/* Les styles utilitaires supplémentaires si nécessaire */
</style>