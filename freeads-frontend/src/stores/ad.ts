import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

interface Ad {
    id : number
    title : string
    category : string
    photo : string
    price : number
    location : string
}

interface CreateAdCredentials {
    title: string
    category: string
    description: string
    photo: File // File pour l'image
    price: number
    location: string
}

interface UpdateAdCredentials {
    title?: string
    category?: string
    description?: string
    photo?: File | null // La photo devient optionnelle lors d'une modification
    price?: number
    location?: string
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
            formData.append('price', credentials.price.toString())
            formData.append('location', credentials.location)

            // Envoi de la requête POST

             const response = await axios.post('http://127.0.0.1:8000/api/ads', formData, {
                headers: {
                    Authorization : `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
             })

            ads.value.unshift(response.data.ad)

            return response.data


        }catch (err: any) {
            console.error('Erreur lors de la création de l\'annonce', err)
            error.value = err.response?.data?.message || 'Erreur lors de la création.'
            throw err // On relance l'erreur pour que le composant puisse la gérer si besoin
        }finally {
            isLoading.value = false
        }

    }

    async function updateAd(id: number, credentials : UpdateAdCredentials){
        isLoading.value = true
        error.value = null

        try{
            const token = localStorage.getItem('token')

            const formData = new FormData()

            // Technique du "Method Spoofing"
            formData.append('_method', 'PUT')
            // On n'ajoute dans le FormData que les champs renseignés
            if (credentials.title) formData.append('title', credentials.title)
            if (credentials.category) formData.append('category', credentials.category)
            if (credentials.description) formData.append('description', credentials.description)
            if (credentials.price !== undefined) formData.append('price', credentials.price.toString())
            if (credentials.location) formData.append('location', credentials.location)

            // On n'ajoute la photo que si l'utilisateur en a choisi une nouvelle
            if (credentials.photo) {
                formData.append('photo', credentials.photo)
            }

            // Requête POST (avec _method = PUT à l'intérieur)
            const response = await axios.post(`http://127.0.0.1:8000/api/ads/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            // Mise à jour locale dans le tableau réactif Pinia
            //On utilise findIndex() pour trouver la position de l'annonce modifiée dans le tableau ads.value, puis on remplace directement l'élément par l'annonce mise à jour (response.data.ad)
            const index = ads.value.findIndex(ad => ad.id === id)
            if (index !== -1) {
                ads.value[index] = response.data.ad
            }

        return response.data

        } catch (err: any) {
            console.error('Erreur lors de la modification de l\'annonce', err)
            error.value = err.response?.data?.message || 'Erreur lors de la modification.'
            throw err
        } finally {
            isLoading.value = false
        }   
    }

    async function deleteAd(id: number) {
    isLoading.value = true
    error.value = null

    try {
        const token = localStorage.getItem('token')

        // 1. Envoi de la requête DELETE à l'API Laravel
        const response = await axios.delete(`http://127.0.0.1:8000/api/ads/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        // 2. Suppression locale dans le tableau réactif Pinia
        ads.value = ads.value.filter(ad => ad.id !== id)

        return response.data

    } catch (err: any) {
        console.error('Erreur lors de la suppression de l\'annonce', err)
        error.value = err.response?.data?.message || 'Erreur lors de la suppression.'
        throw err
    } finally {
        isLoading.value = false
    }
}


    return {
        ads,
        isLoading,
        error,
        fetchAds, 
        createAd,
        updateAd, 
        deleteAd
    }
} )


