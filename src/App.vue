<template>
    <div id="app">
        <div id="nav" class="text-right">
            <router-link v-if="existUser" :to="{name: 'home'}">Home</router-link>
            <router-link v-if="!existUser" :to="{name: 'login'}">Login</router-link>
            <router-link v-if="!existUser" :to="{name: 'register'}">Registry</router-link>
            <a v-if="existUser" @click="logout">Cerrar Sesión</a>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'app',
        computed: {
            ...mapGetters(['existUser'])
        },
        methods: {
            ...mapActions(['logout'])
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: lighter;
        color: #2c3e50;
        cursor: pointer;
    }

    #nav a:hover {
        text-decoration: underline;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
