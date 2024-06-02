import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditView from '../views/EditView.vue'

//routing för projektet: 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //routen till startsidan:
    {
      //filväg:
      path: '/',
      //namn:
      name: 'home',
      //och vilken komponent som används för att skapa den:
      component: HomeView
    },
    {
      //filväl med eventuellt id:
      path: '/edit/:id',
      //namn
      name: 'edit',
      //komponent:
      component: EditView
    }

  ]
})

export default router
