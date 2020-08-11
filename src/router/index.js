import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/biodata',
    name: 'biodata',
    component: () => import('../views/Biodata.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/paket-soal',
    name: 'paket-soal',
    component: () => import('../views/PaketSoal.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pengerjaan-soal',
    name: 'pengerjaan-soal',
    component: () => import('../views/PengerjaanSoal.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/auth/:form',
    name: 'auth',
    component: () => import('../views/Auth.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {  
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
  const isLoggedIn = window.localStorage.getItem('dataPeserta')  

  if (requiresAuth && !isLoggedIn){ 
    next({ name: 'auth', params: { form: 'login' } })
  }else if(isLoggedIn && to.name === 'auth') {
    next({ name: 'home' })
  }else if (requiresAuth && isLoggedIn) {
    next()
  }else {
    next()
  }
})

export default router
