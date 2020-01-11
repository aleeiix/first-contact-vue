import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([faEdit, faTrashAlt])

Vue.component('font-awesome-icon', FontAwesomeIcon)


const firebase = require('firebase/app');

require('firebase/auth');
// require('firebase/database');
require('firebase/firestore');
// require('firebase/messaging');
// require('firebase/functions');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa0ZgmDMfoj_JQpfDqSFrXjdEVCoUuSgA",
  authDomain: "vue-crud-92877.firebaseapp.com",
  databaseURL: "https://vue-crud-92877.firebaseio.com",
  projectId: "vue-crud-92877",
  storageBucket: "vue-crud-92877.appspot.com",
  messagingSenderId: "987791791083",
  appId: "1:987791791083:web:762cc322d9e5d89e833fae"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('detectUser', {uid: user.uid, email: user.email});
  } else {
    store.dispatch('detectUser', null);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default firebaseApp.firestore();
