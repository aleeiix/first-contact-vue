import Vue from 'vue'
import Vuex from 'vuex'

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
          })
          .catch((err) => {
            console.log(err);
          })
    }
  },
  modules: {
  }
})
