import Vue from 'vue'
import VueRouter from 'vue-router'

var firebase = require('firebase/app');

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "list" */ '../views/List.vue'),
        meta: {requiredAuth: true}
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: () => import(/* webpackChunkName: "edit" */ '../views/Edit.vue'),
        meta: {requiredAuth: true}
    },
    {
        path: '/new',
        name: 'new',
        component: () => import(/* webpackChunkName: "create" */ '../views/Create.vue'),
        meta: {requiredAuth: true}
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
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
    let isOk = true;

    if (to.matched.some((record) => record.meta.requiredAuth) === true) {
        if (firebase.auth().currentUser === null) {
            isOk = false;
            next({name: 'login'});
        }
    }

    if (isOk === true) {
        next();
    }
})

export default router
