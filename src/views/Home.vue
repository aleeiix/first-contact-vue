<template>
    <div class="home">
        <h1 class="mb-5">Home</h1>
        {{user}}
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'home',
        computed: {
            ...mapState(['user'])
        }
    }
</script>

<style scoped>

</style>
