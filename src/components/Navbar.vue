<template>
  <nav>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <router-link :to="{name: 'home'}">
        <v-toolbar-title class="white--text">Vue</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn @click="logout" text>
        <span class="mr-2">Sign Out</span>
        <v-icon>fas fa-external-link-alt</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" color="primary" app>
      <div class="mt-5 mb-5 text-center">
        <v-avatar>
          <img :src="user.photo" />
        </v-avatar>
        <p class="white--text mt-3">{{user.name}}</p>
      </div>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="(item, index) of items" :key="index" :to="item.link" exact>
          <v-list-item-icon>
            <v-icon class="white--text">{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          title: "Dashboard",
          icon: "fas fa-home",
          link: { name: "home" }
        },
        {
          title: "Account",
          icon: "fas fa-address-card",
          link: { name: "home" }
        },
        {
          title: "Admin",
          icon: "fas fa-cog",
          link: { name: "admin" }
        },
        {
          title: "Chat",
          icon: "fas fa-comments",
          link: { name: "chat" }
        }
      ]
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>