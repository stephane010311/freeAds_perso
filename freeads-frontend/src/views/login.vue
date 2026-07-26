<template>
    <div class="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
        <div class="bg-white shadow-md rounded-md p-6">

            <img class="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />

            <h2 class="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                CONNEXION
            </h2>

            <div v-if="errorMessage" class="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {{ errorMessage }}
            </div>
            <form class="space-y-6" @submit.prevent="handleLogin">

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <div class="mt-1">
                        <input id='email' v-model="email" type="email" autocomplete="email-address" required
                            class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <div class="mt-1">
                        <input id='password' v-model="password" type="password" autocomplete="password" required
                            class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">Connectez-vous
                    </button>
                </div>
                <p class="text-center text-sm text-gray-600 mt-4">
                    Vous n'avez pas de compte ? 
                    <RouterLink to="/register" class="font-medium text-sky-500 hover:text-sky-400">
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