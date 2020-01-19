<template>
  <v-row justify="center" class="mt-5">
    <v-col cols="12" sm="8" md="6" xl="4">
      <v-card>
        <v-card-text
          class="display-1 text-uppercase white--text text-center"
          :class="modeRegistry ? 'success' : 'accent'"
        >
          <span v-if="!modeRegistry">Log In</span>
          <span v-if="modeRegistry">Registry</span>
        </v-card-text>

        <v-card-text>
          <v-btn @click="loginGoogle" block color="error" class="mb-2">
            <v-icon left dark>fab fa-google</v-icon>Google
          </v-btn>
          <v-btn @click="loginFacebook" block color="info">
            <v-icon left dark>fab fa-facebook-f</v-icon>Facebook
          </v-btn>
        </v-card-text>

        <v-card-text>
          <v-btn
            v-if="!modeRegistry"
            @click="modeRegistry = true"
            block
          >You do not have an account? Sign up here</v-btn>
          <v-btn
            v-if="modeRegistry"
            @click="modeRegistry = false"
            block
          >Do you already have an account? Login here</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { firebase, auth, firestore } from "@/config/firebase";
import {mapMutations} from "vuex";

export default {
  data() {
    return {
      modeRegistry: false
    };
  },
  methods: {
    ...mapMutations(['setUser']),
    loginGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.login(provider);
    },
    loginFacebook() {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.login(provider);
    },
    async login(provider) {
      firebase.auth().languageCode = "es";

      try {
        // Login
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        console.log(user);

        // Build userDB
        const userDB = Object.assign(
          {},
          {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            photo: user.photoURL
          }
        );

        this.setUser(userDB);

        // Insert in DB
        await firestore
          .collection("users")
          .doc(userDB.uid)
          .set(userDB);
        console.log("User in DB");
        
        this.$router.push({name: 'home'});
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>