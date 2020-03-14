<template>
  <v-app>
    <Navbar v-if="isLogged"></Navbar>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapGetters } from "vuex";
export default {
  name: "App",
  data: () => ({}),
  computed: {
    ...mapGetters(["isLogged"])
  },
  components: {
    Navbar
  }
};
</script>
