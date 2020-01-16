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
        task: null,
        isLoading: false,
        textFilter: ''
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
        },
        setLoading(state, payload) {
            state.isLoading = payload;
        },
        setTextFilter(state, payload) {
            state.textFilter = payload;
        }
    },
    actions: {
        registerUser({commit}, payload) {
            commit('setLoading', true);

            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then((res) => {
                    commit('setUser', {uid: res.user.uid, email: res.user.email});

                    db.collection(res.user.email).add({
                        text: 'Example task!'
                    }).then(() => {
                        router.push({name: 'home'});
                        commit('setLoading', false);
                    }).catch((err) => {
                        commit('setError', err.message);
                        commit('setLoading', false);
                    })
                })
                .catch((err) => {
                    commit('setError', err.message);
                    commit('setLoading', false);
                });
        },
        loginUser({commit}, payload) {
            commit('setLoading', true);

            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((res) => {
                    commit('setUser', {uid: res.user.uid, email: res.user.email});
                    router.push({name: 'home'});
                    commit('setLoading', false);
                })
                .catch((err) => {
                    commit('setError', err.message);
                    commit('setLoading', false);
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
            commit('setLoading', true);

            const user = firebase.auth().currentUser;
            const tasks = [];
            db.collection(user.email).get()
                .then((snapshots) => {
                    snapshots.forEach((snapshot) => {
                        tasks.push(Object.assign({id: snapshot.id}, snapshot.data()))
                    })
                    commit('setLoading', false);
                    commit('setTasks', tasks);
                })
        },
        getTask({commit}, payload) {
            const user = firebase.auth().currentUser;
            db.collection(user.email).doc(payload).get()
                .then((doc) => {
                    commit('setTask', Object.assign({id: doc.id}, doc.data()));
                })
        },
        saveTask({commit}, payload) {
            commit('setLoading', true);

            const user = firebase.auth().currentUser;
            db.collection(user.email).doc(payload.id).update({
                text: payload.text
            }).then(() => {
                router.push({name: 'home'})
                commit('setLoading', false);
            })
        },
        createTask({commit}, payload) {
            commit('setLoading', true);

            const user = firebase.auth().currentUser;
            db.collection(user.email).add({
                text: payload
            }).then(() => {
                router.push({name: 'home'})
                commit('setLoading', false);
            })
        },
        deleteTask({commit}, payload) {
            const user = firebase.auth().currentUser;
            db.collection(user.email).doc(payload).delete()
                .then(() => {
                    commit('removeTask', payload)
                })
        },
        search({commit}, payload) {
            commit('setTextFilter', payload)
        }
    },
    getters: {
        existUser(state) {
            return !(state.user === null || state.user === '' || state.user === undefined)
        },
        tasksFiltered(state) {
            return state.tasks.filter((task) => task.text.toLowerCase().indexOf(state.textFilter.toLowerCase()) >= 0);
        }
    },
    modules: {
    }
})
