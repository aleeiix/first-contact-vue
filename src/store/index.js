import Vue from 'vue'
import Vuex from 'vuex'
import db from './../config/firebase'
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: [],
        task: {id: null, text: null}
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        setTask(state, task) {
            state.task = task;
        }
    },
    actions: {
        getTasks({commit}) {
            db.collection('tasks').get()
                .then((snapshots) => {
                    const tasks = [];
                    snapshots.forEach((snapshot) => {
                        tasks.push(Object.assign({id: snapshot.id}, snapshot.data()));
                    });
                    commit('setTasks', tasks);
                })
        },
        getTask({commit}, id) {
            db.collection('tasks').doc(id).get()
                .then((doc) => {
                    const task = Object.assign({id: doc.id}, doc.data());
                    commit('setTask', task);
                });
        },
        saveTask({commit}, task) {
            db.collection('tasks').doc(task.id).update({text: task.text})
                .then((doc) => {
                    router.push({name: 'list'})
                });
        },
        createTask({commit}, text) {
            db.collection('tasks').add({text: text})
                .then((doc) => {
                    router.push({name: 'list'})
                });
        },
        deleteTask({commit}, id) {
            db.collection('tasks').doc(id).delete()
                .then(() => {
                    const tasks = this.state.tasks.filter((task) => task.id !== id);
                    commit('setTasks', tasks);
                });
        }
    },
    modules: {
    }
})
