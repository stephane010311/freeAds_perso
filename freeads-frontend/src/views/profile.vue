<template>
  <div class="bg-gray-50 min-h-screen font-sans flex flex-col justify-between">
    
    <!-- 1. NAVIGATION -->
    <nav class="bg-red-600 text-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 text-2xl font-black tracking-wide hover:opacity-90 transition">
          <span class="bg-white text-red-600 px-2 py-0.5 rounded-lg shadow">Free</span>
          <span>Ads</span>
        </router-link>

        <!-- Menu principal -->
        <!-- <div class="hidden md:flex items-center space-x-6 text-sm font-semibold">
          <router-link to="/" class="hover:text-yellow-200 transition">Toutes les annonces</router-link>
          <a href="#" class="hover:text-yellow-200 transition">Mes favoris</a>
          <a href="#" class="hover:text-yellow-200 transition">Mes messages</a>
        </div> -->

        <!-- Actions utilisateur -->
        <div class="flex items-center space-x-3">
          <!-- <button class="bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold py-2 px-4 rounded-lg text-sm transition transform hover:scale-105 shadow flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span>Publier une annonce</span>
          </button> -->

          <div class="flex items-center space-x-3">
            <span class="text-sm font-bold text-yellow-300">
              Hiii, {{ userLogin }}
            </span>

            <button @click="handleLogout" class="bg-red-800 hover:bg-red-900 text-white text-xs font-bold py-2 px-3 rounded-lg border border-red-500 transition">
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 2. EN-TÊTE PAGE PROFIL -->
    <section class="bg-gradient-to-r from-red-600 to-red-700 text-white py-10 px-4 shadow-inner">
      <div class="container mx-auto max-w-4xl flex items-center space-x-4">
        <div class="bg-white text-red-600 rounded-full w-16 h-16 flex items-center justify-center font-black text-2xl shadow-lg border-2 border-yellow-400">
          <!-- U -->
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-extrabold">Mon Profil</h1>
          <p class="text-red-100 text-sm">Gérez vos informations personnelles et vos paramètres de compte.</p>
        </div>
      </div>
    </section>

    <!-- 3. CONTENU PRINCIPAL -->
    <main class="container mx-auto max-w-4xl px-4 py-10 flex-grow">
        
        <!-- Sidebar d'onglets -->
        <!-- <div class="space-y-2">
          <a href="#" class="flex items-center space-x-3 px-4 py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Informations personnelles</span>
          </a>
          <a href="#" class="flex items-center space-x-3 px-4 py-3 bg-white hover:bg-gray-100 text-gray-700 font-medium rounded-xl border border-gray-200 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Mes annonces publiées</span>
          </a>
        </div> -->

        <!-- Section Formulaire -->
        <div class="md:col-span-2 space-y-8">
          
          <!-- Carte 1 : Profil -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 class="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">
              Modifier mes informations
            </h2>

            <!-- Message de succès -->
            <div v-if="successMessage" class="mb-5 p-3 bg-green-100 border border-green-300 text-green-800 rounded-xl text-xs font-bold text-center">
            {{ successMessage }}
            </div>

            <!-- Message d'erreur -->
            <div v-if="errorMessage" class="mb-5 p-3 bg-red-100 border border-red-300 text-red-800 rounded-xl text-xs font-bold text-center">
            {{ errorMessage }}
            </div>

            <form class="space-y-5" @submit.prevent="handleProfile">
              <!-- Login -->
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Login</label>
                <input 
                  v-model="login"
                  type="text" 
                  placeholder="Ex: StephaneK"
                  class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-red-500 text-sm text-gray-800 transition"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Adresse E-mail</label>
                <input 
                  v-model="email"
                  type="email" 
                  placeholder="exemple@mail.com"
                  class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-red-500 text-sm text-gray-800 transition"
                />
              </div>

              <!-- Téléphone -->
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Numéro de Téléphone</label>
                <input 
                  v-model="phone"
                  type="text" 
                  placeholder="0102030405"
                  class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-red-500 text-sm text-gray-800 transition"
                />
              </div>

              <!-- Mot de passe -->
              <div class="pt-4 border-t border-gray-100">
                <h3 class="text-sm font-bold text-gray-800 mb-1">Changer de mot de passe</h3>
                <p class="text-xs text-gray-500 mb-4">Laissez ces champs vides si vous ne souhaitez pas modifier votre mot de passe actuel.</p>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nouveau mot de passe</label>
                    <input 
                      v-model="password"
                      type="password" 
                      placeholder="••••••••"
                      class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-red-500 text-sm text-gray-800 transition"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Confirmation</label>
                    <input 
                      v-model="password_confirmation"
                      type="password" 
                      placeholder="••••••••"
                      class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-red-500 text-sm text-gray-800 transition"
                    />
                  </div>
                </div>
              </div>

              <!-- Bouton enregistrer -->
              <div class="pt-2 flex justify-end">
                <button type="submit" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition shadow-md">
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>

          <!-- Carte 2 : Zone de danger (Suppression) -->
          <div class="bg-red-50 rounded-2xl p-6 border border-red-200">
            <h2 class="text-base font-bold text-red-900 mb-2">Zone dangereuse</h2>
            <p class="text-xs text-red-700 mb-4">
              La suppression de votre compte entraînera la suppression définitive de vos annonces et de vos données personnelles.
            </p>

            <button @click="handleDestroy" class="bg-white hover:bg-red-600 text-red-600 hover:text-white border border-red-300 font-bold py-2 px-4 rounded-xl text-xs transition shadow-sm">
              Supprimer mon compte définitivement
            </button>
          </div>

        </div>

    </main>

    <!-- 4. FOOTER -->
    <footer class="bg-gray-900 text-gray-300 py-10 mt-12">
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
import { ref, onMounted, computed} from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const login = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const phone = ref('')

const successMessage = ref('')
const errorMessage = ref('')

 // Récupération du login ou fallback
const userLogin = computed(() => authStore.user?.login || 'Utilisateur')


onMounted(async () =>{
    try{
        await authStore.fetchProfile()

        if (authStore.user) {
            login.value = authStore.user.login || ''
            email.value = authStore.user.email || ''
            phone.value = authStore.user.phone || ''
        }
    } catch (error) {
    console.error('Erreur lors du chargement du profil :', error)
  }
})

const handleProfile = async () =>{
    
// On réinitialise les messages
  successMessage.value = ''
  errorMessage.value = ''

    try{
        //On prépare les données de base
        const updateData = {
            login: login.value,
            email: email.value,
             phone: phone.value
        }

        //Si un nouveau mot de passe est saisi, on l'ajoute aux données
        if(password.value){
            updateData.password = password.value
            updateData.password_confirmation = password_confirmation.value
        }

        //On envoie tout au store en une seule fois
        await authStore.updateProfile(updateData)

        //On réinitialise les champs de mot de passe après le succès
        password.value = ''
        password_confirmation.value = ''

        // Message de succès
        successMessage.value = 'Profil mis à jour avec succès !'

        setTimeout(() => {
            successMessage.value = ''
        }, 3000)
        
    }catch (error){
        console.error('Erreur de mise à jour :', error)
        errorMessage.value = error.response?.data?.message || 'Une erreur est survenue lors de la mise à jour.'
    }
  
}

const handleDestroy = async () => {
    const confirmed = confirm('Êtes-vous sûr de vouloir supprimer définitivement votre compte ?')

    if(!confirmed) return

    try{
        await authStore.deleteProfile()
        router.push('/login')
    } catch(error){
        console.error('Erreur lors de la suppression du compte :', error)
        errorMessage.value = error.response?.data?.message || 'Impossible de supprimer le compte.'
    }
}

const handleLogout = async () =>{
    await authStore.logout()
    router.push('/login')
}



</script>