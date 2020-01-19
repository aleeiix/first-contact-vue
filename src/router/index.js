import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth} from '@/config/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {requiredAuth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;

  if (to.matched.some((record) => record.meta.requiredAuth)) {
    if (user) {
      next();
    } else {
      next({name: 'login'});
    }
  } else {
    next();
  }

})

export default router
