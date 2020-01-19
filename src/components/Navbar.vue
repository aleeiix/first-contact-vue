<template>
  <v-app-bar app color="primary" dark>
      <router-link :to="{name: 'home'}">
        <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <span class="mt-1 white--text">Vue</span>
      </div>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn v-if="isLogged" @click="logout" text>
        <span class="mr-2">Sign Out</span>
        <v-icon>fas fa-external-link-alt</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['isLogged'])
    },
    methods: {
        ...mapActions(['logout'])
    },
}
</script>