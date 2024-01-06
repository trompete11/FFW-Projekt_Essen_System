import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bestellung',
      name: 'bestellung',
      component: () => import('@/views/BestellungView.vue')
    },
    {
      path: '/kueche',
      name: 'kueche',
      component: () => import('@/views/KuecheView.vue')
    },
    {
      path: '/ausgabe',
      name: 'ausgabe',
      component: () => import('@/views/AusgabeView.vue')
    }
  ]
})

export default router
