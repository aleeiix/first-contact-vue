import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import db from '@/main'
var firebase = require("firebase/app")

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        error: null,
        tasks: [],
        task: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        setTasks(state, payload) {
            state.tasks = payload;
        },
        setTask(state, payload) {
            state.task = payload;
        },
        removeTask(state, payload) {
            state.tasks = state.tasks.filter((task) => task.id !== payload);
        }
    },
    actions: {
        registerUser({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then((res) => {
                    commit('setUser', {uid: res.user.uid, email: res.user.email});

                    db.collection(res.user.email).add({
                        text: 'Example task!'
                    }).then(() => {
                        router.push({name: 'home'});
                    }).catch((err) => {
                        commit('setError', err.message);
                    })
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

        getTasks({commit}) {
            const user = firebase.auth().currentUser;
            const tasks = [];
            db.collection(user.email).get()
                .then((snapshots) => {
                    snapshots.forEach((snapshot) => {
                        tasks.push(Object.assign({id: snapshot.id}, snapshot.data()))
                    })
                })

            commit('setTasks', tasks);
        },
        getTask({commit}, payload) {
            const user = firebase.auth().currentUser;
            db.collection(user.email).doc(payload).get()
                .then((doc) => {
                    commit('setTask', Object.assign({id: doc.id}, doc.data()));
                })
        },
        saveTask({commit}, payload) {
            const user = firebase.auth().currentUser;
            db.collection(user.email).doc(payload.id).update({
                text: payload.text
            }).then(() => {
                router.push({name: 'home'})
            })
        },
        createTask({commit}, payload) {
            const user = firebase.auth().currentUser;
            db.collection(user.email).add({
                text: payload
            }).then(() => {
                router.push({name: 'home'})
            })
        },
        deleteTask({commit}, payload) {
            const user = firebase.auth().currentUser;
            db.collection(user.email).doc(payload).delete()
                .then(() => {
                    commit('removeTask', payload)
                })
        }
    },
    getters: {
        existUser(state) {
            return !(state.user === null || state.user === '' || state.user === undefined)
        }
    },
    modules: {
    }
})
