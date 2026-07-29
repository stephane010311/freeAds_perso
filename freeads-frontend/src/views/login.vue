<template>
  <div class="bg-gray-200 min-h-screen font-sans flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      
      <!-- Carte principale -->
      <div class="bg-white shadow-sm border border-gray-200 rounded-2xl p-8">

        <!-- Logo FreeAds -->
        <div class="text-center mb-6">
          <router-link to="/" class="inline-flex items-center space-x-2 text-3xl font-black tracking-wide hover:opacity-90 transition">
            <span class="bg-red-600 text-white px-2.5 py-1 rounded-xl shadow">Free</span>
            <span class="text-gray-900">Ads</span>
          </router-link>
        </div>

        <h2 class="my-3 text-center text-2xl font-extrabold tracking-tight text-gray-900">
          Connexion à votre compte
        </h2>
        <p class="text-center text-xs text-gray-500 mb-6">Renseignez vos identifiants pour accéder à votre espace.</p>

        <!-- Message de succès (ex: après suppression du compte) -->
        <div v-if="showDeletedMessage" class="mb-5 p-3 bg-green-100 border border-green-300 text-green-800 rounded-xl text-xs font-bold text-center">
          Votre compte a été supprimé avec succès.
        </div>

        <!-- Message d'erreur -->
        <div v-if="errorMessage" class="mb-5 p-3 bg-red-100 border border-red-300 text-red-800 rounded-xl text-xs font-bold text-center">
          {{ errorMessage }}
        </div>

        <!-- Formulaire -->
        <form class="space-y-5" @submit.prevent="handleLogin">

          <!-- Champ Email -->
          <div>
            <label for="email" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Adresse E-mail
            </label>
            <input 
              id="email" 
              v-model="email" 
              type="email" 
              autocomplete="email" 
              placeholder="exemple@mail.com"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-red-500 text-sm text-gray-800 transition" 
            />
          </div>

          <!-- Champ Mot de passe -->
          <div>
            <label for="password" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Mot de passe
            </label>
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              autocomplete="current-password" 
              placeholder="••••••••"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-red-500 text-sm text-gray-800 transition" 
            />
          </div>

          <!-- Bouton de soumission -->
          <div class="pt-2">
            <button 
              type="submit"
              class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Se connecter
            </button>
          </div>

          <!-- Lien Inscription -->
          <p class="text-center text-xs text-gray-600 mt-6 pt-4 border-t border-gray-100">
            Vous n'avez pas encore de compte ? 
            <RouterLink to="/register" class="font-bold text-red-600 hover:text-red-700 hover:underline">
              Inscrivez-vous
            </RouterLink>
          </p>

        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const errorMessage = ref('')

const handleLogin = async () => {
errorMessage.value = ''
  try {
    // Appel de la méthode login du store Pinia
    await authStore.login({
      email: email.value,
      password: password.value
    })

    // Redirection si la connexion a réussi
    router.push('/')
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Échec de la connexion. Vérifie tes identifiants.'  }

}

</script>

<style scoped>

</style>