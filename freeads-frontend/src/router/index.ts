import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Accueil from '../views/accueil.vue'
import Profile from '../views/profile.vue'
import DashboardUser from '../views/DashboardUser.vue'
import { useAuthStore } from '../stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/login',
      name : 'login',
      component : Login
    },
    {
      path : '/register',
      name : 'register',
      component : Register
    },
    {
      path : '/',
      name : 'accueil',
      component : Accueil
    },
     {
      path : '/profile',
      name : 'profile',
      component : Profile,
      meta : { requiresAuth: true } //déclarer que la route nécessite une authentification via la propriété meta
    },
    {
      path : '/dashboardUser',
      name : 'dashboardUser',
      component : DashboardUser,
      meta : { requiresAuth: true } //déclarer que la route nécessite une authentification via la propriété meta
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Si la route demande d'être connecté ET que le user ne l'est pas
  if(to.meta.requiresAuth && !authStore.isAuthenticated){
    next('/login') // Redirection vers la page de connexion
  }else{
    next() // Accès autorisé !
  }
})


export default router
