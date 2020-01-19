import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from '@/config/firebase'
import router from '@/router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    isLogged(state) {
      return state.user !== null;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    setUser({commit}, payload) {
      const user = Object.assign(
        {},
        {
          name: payload.displayName,
          email: payload.email,
          uid: payload.uid,
          photo: payload.photoURL
        }
      );
      commit('setUser', user);
    },
    logout({commit}) {
      auth.signOut();
      commit('setUser', null);
      router.push({name: 'login'});
    }
  },
  modules: {
  }
})
