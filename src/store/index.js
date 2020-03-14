import Vue from "vue";
import Vuex from "vuex";
import { auth, firestore } from "@/config/firebase";
import router from "@/router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: ""
  },
  getters: {
    isLogged(state) {
      return state.user !== "";
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async setUser({ commit }, payload) {
      try {
        const doc = await firestore
          .collection("users")
          .doc(payload.uid)
          .get();

        if (doc.exists) {
          commit("setUser", doc.data());
        } else {
          const user = Object.assign(
            {},
            {
              name: payload.displayName,
              email: payload.email,
              uid: payload.uid,
              photo: payload.photoURL
            }
          );

          await firestore
            .collection("users")
            .doc(user.uid)
            .set(user);

          console.log("User saved in DB");

          commit("setUser", user);
        }
      } catch (error) {
        console.log(error);
      }
    },
    logout({ commit }) {
      auth.signOut();
      commit("setUser", "");
      router.push({ name: "login" });
    }
  },
  modules: {}
});
