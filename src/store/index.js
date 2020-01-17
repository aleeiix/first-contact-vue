import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: {
      title: '',
      status: false
    }
  },
  mutations: {
    showLoading(state, payload) {
      state.loading = Object.assign({title: '', status: true}, {title: payload.title, status: true});
    },
    hideLoading(state) {
      state.loading = Object.assign({title: '', status: false});
    }
  },
  actions: {
  },
  modules: {
  }
})
