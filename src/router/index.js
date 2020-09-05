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
    path: '/riwayat',
    name: 'riwayat',
    component: () => import('../views/Riwayat.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/skor-soal',
    name: 'skor-soal',
    component: () => import('../views/Scoring.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/assessment',
    name: 'assessment',
    component: () => import('../views/Assessment.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/simulasi-rasional',
    name: 'simulasi-rasional',
    component: () => import('../views/SimulasiRasional.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/review-soal',
    name: 'review-soal',
    component: () => import('../views/ReviewSoal.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pesan-paket/:nama_paket',
    name: 'pesan-paket',
    component: () => import('../views/PesanPaket.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/paket-soal/:id',
    name: 'paket-soal',
    component: () => import('../views/PaketSoal.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pengerjaan-soal/:id',
    name: 'pengerjaan-soal',
    component: () => import('../views/PengerjaanSoal.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/auth/:form',
    name: 'auth',
    component: () => import('../views/Auth.vue'),
    props: true
  },
  {
    name: 'payment',
    path: '/payment',
    meta: { requiresAuth: true }
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
  /**
   * Mengeset nilai modal bayar di session storage
   */ 
  const hasData = window.sessionStorage.getItem('modalBayar')
  if (hasData == null) {
    window.sessionStorage.setItem('modalBayar', 1)
  }

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
