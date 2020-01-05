import Vue from 'vue'
import Vuex from 'vuex'
import db from './../config/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
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
    }
  },
  modules: {
  }
})
