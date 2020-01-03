import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fruits: [
      {id: 0, name: 'Apple', quantity: 0},
      {id: 1, name: 'Orange', quantity: 0},
      {id: 2, name: 'Pear', quantity: 0},
      {id: 3, name: 'Peach', quantity: 0}
    ]
  },
  mutations: {
    addQuantity(state, index) {
      state.fruits[index].quantity++;
    },
    reset(state) {
      state.fruits.map((fruit) => fruit.quantity = 0);
    }
  },
  actions: {
  },
  modules: {
  }
})
