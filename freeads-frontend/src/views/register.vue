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
          Créer un compte
        </h2>
        <p class="text-center text-xs text-gray-500 mb-6">Remplissez les informations ci-dessous pour vous inscrire.</p>

        <!-- Message d'erreur global -->
        <div v-if="errorMessage" class="mb-5 p-3 bg-red-100 border border-red-300 text-red-800 rounded-xl text-xs font-bold text-center">
          {{ errorMessage }}
        </div>

        <!-- Formulaire -->
        <form class="space-y-4" @submit.prevent="handleRegister">

          <!-- Login -->
          <div>
            <label for="login" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Login
            </label>
            <input 
              id="login" 
              v-model="login" 
              type="text" 
              placeholder="Ex: StephaneK"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-red-500 text-sm text-gray-800 transition" 
            />
            <p v-if="errors.login" class="mt-1 text-xs text-red-500 font-medium">{{ errors.login[0] }}</p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Adresse E-mail
            </label>
            <input 
              id="email" 
              v-model="email" 
              type="email" 
              autocomplete="email-address" 
              placeholder="exemple@mail.com"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-red-500 text-sm text-gray-800 transition" 
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-500 font-medium">{{ errors.email[0] }}</p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Mot de passe
            </label>
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              autocomplete="password" 
              placeholder="••••••••"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-red-500 text-sm text-gray-800 transition" 
            />
            <p v-if="errors.password" class="mt-1 text-xs text-red-500 font-medium">{{ errors.password[0] }}</p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="password_confirmation" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Confirmation du mot de passe
            </label>
            <input 
              id="password_confirmation" 
              v-model="password_confirmation" 
              type="password" 
              autocomplete="confirm-password" 
              placeholder="••••••••"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-red-500 text-sm text-gray-800 transition" 
            />
            <p v-if="errors.password_confirmation" class="mt-1 text-xs text-red-500 font-medium">{{ errors.password_confirmation[0] }}</p>
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Téléphone
            </label>
            <input 
              id="phone" 
              v-model="phone" 
              type="tel" 
              autocomplete="confirm-password" 
              placeholder="0102030405"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-red-500 text-sm text-gray-800 transition" 
            />
          </div>

          <!-- Bouton de soumission -->
          <div class="pt-3">
            <button 
              type="submit"
              class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Inscrivez-vous
            </button>
          </div>

          <!-- Lien Connexion -->
          <p class="text-center text-xs text-gray-600 mt-6 pt-4 border-t border-gray-100">
            Vous avez déjà un compte ? 
            <RouterLink to="/login" class="font-bold text-red-600 hover:text-red-700 hover:underline">
              Se connecter
            </RouterLink>
          </p>

        </form>
      </div>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const login = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const phone = ref('')

const errorMessage = ref('')
const errors = ref({})

const handleRegister = async () => {
  errorMessage.value = ''
  errors.value = {}

  // 1. Validation locale simple
  if (password.value !== password_confirmation.value) {
    errorMessage.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  // 2. Envoi à l'API via Pinia
  try {
    await authStore.register({
      login: login.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
      phone: phone.value
    })

    // Redirection après succès
    router.push('/login')
  } catch (error) {
    // Ton store fait 'throw error.response?.data', donc 'error' contient directement le JSON de Laravel
    errorMessage.value = error.message || "Erreur lors de l'inscription"
    
    // Récupération des erreurs précises par champ (validation Laravel)
    if (error.errors) {
      errors.value = error.errors
    }
  }
}
</script>
<style scoped>

</style>