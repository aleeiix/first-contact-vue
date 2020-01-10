import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

var firebase = require("firebase/app")

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        error: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setError(state, payload) {
            state.error = payload;
        }
    },
    actions: {
        registerUser({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then((res) => {
                    commit('setUser', {uid: res.user.uid, email: res.user.email});
                    router.push({name: 'home'});
                })
                .catch((err) => {
                    commit('setError', err.message);
                });
        },
        loginUser({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((res) => {
                    commit('setUser', {uid: res.user.uid, email: res.user.email});
                    router.push({name: 'home'});
                })
                .catch((err) => {
                    commit('setError', err.message);
                });
        },
        detectUser({commit}, payload) {
            commit('setUser', payload);
        },
        logout({commit}) {
            firebase.auth().signOut();
            commit('setUser', null);
            router.push({name: 'login'});
        },
    },
    getters: {
        existUser(state) {
            return !(state.user === null || state.user === '' || state.user === undefined)
        }
    },
    modules: {
    }
})
