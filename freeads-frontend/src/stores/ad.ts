import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

interface Ad {
    id : number
    title : string
    category : string
    description: string
    photo : string
    price : number
    location : string
}

export const useAdStore = defineStore ('ad', ()=>{
    const ads = ref<Ad[]>([])
    const isLoading = ref(false)

    const error = ref<string | null>(null)

    async function fetchAds () {
        isLoading.value = true
        error.value = null
        try{
            const token = localStorage.getItem('token')
            const response = await axios.get('http://127.0.0.1:8000/api/ads', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            ads.value = response.data.ads
             return response.data
             
        } catch(err: any){
            console.error('erruer au niveau de la recuperation des annonces', err)
            error.value = err.response?.data?.message || 'Une erreur est survenue'
        } finally{
            isLoading .value = false
        }

    }

    async function createAd(credentials : CreateAdCredentials){
        isLoading.value = true
        error.value = null
        try{
             const token = localStorage.getItem('token')

            //Création de l'objet FormData pour transporter le fichier
            const formData = new FormData()
            formData.append('title', credentials.title)
            formData.append('category', credentials.category)
            formData.append('description', credentials.description)
            formData.append('photo', credentials.photo)
            formData.append('price', credentials.price)
            formData.append('location', credentials.location)

            // Envoi de la requête POST

             const response = await axios.post('http://127.0.0.1:8000/api/ads', formData, {
                headers: {
                    Authorization : `Bearer${token}`,
                    'Content-Type': 'multipart/form-data'
                }
             })

             // 3. On ajoute la nouvelle annonce directement au début de notre tableau réactif 'ads'
            // (Le backend renvoie la nouvelle annonce créée avec son ID et l'URL de sa photo)
            if (response.data.ad) {
                ads.value.unshift(response.data.ad)
            } else {
                // Si Laravel renvoie directement l'annonce dans response.data
                ads.value.unshift(response.data)
            }

            return response.data


        }catch (err: any) {
            console.error('Erreur lors de la création de l\'annonce', err)
            error.value = err.response?.data?.message || 'Erreur lors de la création.'
            throw err // On relance l'erreur pour que le composant puisse la gérer si besoin
        }finally {
            isLoading.value = false
        }

    }
    return {
        ads,
        isLoading,
        error,
        fetchAds, 
        createAd
    }
} )


