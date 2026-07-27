import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

// définir l'interface user pour eviter les erreur de typage sur l'utilisateur
interface User {
    id : number
    login : string
    email : string
    phone : string
    role : string
}


//structure du Store et le State
export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem('token'))
    const user = ref<User | null>(null)

    //les getters(computed)

    const isAuthenticated = computed(() =>{
        return token.value !== null
    }) 

    const isAdmin = computed(() =>{
        return user.value && user.value.role === 'admin'
    })

    async function register (credentials : {login: string, email: string, password: string, password_confirmation: string, phone: string}){
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/register', credentials)
            token.value = response.data.token
            user.value = response.data.user

           if (response.data.token) {
                localStorage.setItem('token', response.data.token)
            }

            return response.data

        }catch (error: any) {
            console.error('Erreur lors de l\'inscription :', error)
            // Renvoie l'erreur sous forme claire
            throw error.response?.data || { message: "Une erreur est survenue" }
        }
    }
    
    async function login (credentials : {email: string, password: string}){
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/login', credentials)
            token.value = response.data.token
            user.value = response.data.user

            localStorage.setItem('token', response.data.token)

            return response.data

        }catch (error: any) {
            console.error('Erreur lors de la connexion :', error)
            throw error.response?.data || { message: "Une erreur est survenue" }
        }
    }

    async function logout (){
        try {
            if(token.value){
                await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token.value}`
                    }
                })
            }
        }catch (error) {
        console.error('Erreur lors de la déconnexion côté serveur :', error)
        } finally {
            // Dans tous les cas (succès ou erreur), on nettoie le front-end
            token.value = null
            user.value = null
            localStorage.removeItem('token')    
        }   

    }

    async function fetchProfile() {
        try {
            if (!token.value) return

            const response = await axios.get('http://127.0.0.1:8000/api/me', {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })

            // On met à jour la variable réactive user du store
            user.value = response.data.user
            return response.data
        } catch (error: any) {
            console.error('Erreur lors de la récupération du profil :', error)
            throw error.response?.data || { message: "Une erreur est survenue" }
        }
    }

    async function updateProfile(data: { login?: string; email?: string; password?: string; password_confirmation?: string; phone?: string }) {
        try {
            const response = await axios.put('http://127.0.0.1:8000/api/me', data, {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })

            // On met à jour le state user avec les nouvelles infos retournées
            user.value = response.data.user
            return response.data
        } catch (error: any) {
            console.error('Erreur lors de la mise à jour du profil :', error)
            throw error.response?.data || { message: "Une erreur est survenue" }
        }
    }

    async function deleteProfile() {
        try {
            if (token.value) {
                await axios.delete('http://127.0.0.1:8000/api/me', {
                    headers: {
                        Authorization: `Bearer ${token.value}`
                    }
                })
            }
        } catch (error: any) {
            console.error('Erreur lors de la suppression du compte :', error)
            throw error.response?.data || { message: "Une erreur est survenue" }
        } finally {
            // Dans tous les cas, on déconnecte le user et nettoie le localStorage
            token.value = null
            user.value = null
            localStorage.removeItem('token')
        }
    }

    return {
        token,
        user,
        isAuthenticated,
        isAdmin, 
        register,
        login,
        logout,
        fetchProfile,
        updateProfile,
        deleteProfile

    }
})