import firebase from "firebase";

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

// Export Firebase
export default firebaseApp.firestore();