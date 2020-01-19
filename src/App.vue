<template>
  <v-app>
    <Navbar></Navbar>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: "App",
  data: () => ({}),
  components: {
    Navbar
  }
};
</script>
