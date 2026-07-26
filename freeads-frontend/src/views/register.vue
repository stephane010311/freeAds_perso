<template>
    <div class="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
        <div class="bg-white shadow-md rounded-md p-6">

            <img class="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />

            <h2 class="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                INSCRIPTION
            </h2>

            <div v-if="errorMessage" class="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {{ errorMessage }}
            </div>
            <form class="space-y-6" @submit.prevent="handleRegister">

                <div>
                    <label for="login" class="block text-sm font-medium text-gray-700">Login</label>
                    <div class="mt-1">
                        <input id="login" v-model = "login" type="text" required
                            class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                    <p v-if="errors.login" class="mt-1 text-xs text-red-500">{{ errors.login[0] }}</p>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <div class="mt-1">
                        <input id="email" v-model="email" type="email" autocomplete="email-address" required
                            class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                    <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email[0] }}</p>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <div class="mt-1">
                        <input id="password" v-model="password" type="password" autocomplete="password" required
                            class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                    <p v-if="errors.password" class="mt-1 text-xs text-red-500">{{ errors.password[0] }}</p>
                </div>

                <div>
                    <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div class="mt-1">
                        <input id="password_confirmation" v-model="password_confirmation" type="password" autocomplete="confirm-password" required
                            class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                    <p v-if="errors.password_confirmation" class="mt-1 text-xs text-red-500">{{ errors.password_confirmation[0] }}</p>
                </div>

                <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                    <div class="mt-1">
                        <input id="phone" v-model="phone" type="tel" autocomplete="confirm-password" required
                            class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">Inscrivez-vous
                    </button>
                </div>

                <p class="text-center text-sm text-gray-600 mt-4">
                    Vous avez déjà un compte ? 
                    <RouterLink to="/login" class="font-medium text-sky-500 hover:text-sky-400">
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