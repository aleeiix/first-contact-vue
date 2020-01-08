<template>
    <div class="container">
        <h1 class="mb-5">User Registration</h1>

        <form @submit.prevent="registerUser(user)">
            <div class="form-group text-left mb-4">
                <label for="email" class="font-weight-bold">Email address:</label>
                <input v-model="user.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            </div>

            <div class="form-group text-left mb-4">
                <label for="password" class="font-weight-bold">Password:</label>
                <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Enter password">
            </div>

            <div class="form-group text-left mb-4">
                <label for="repeatPassword" class="font-weight-bold">Repeat password:</label>
                <input v-model="user.repeatPassword" type="password" class="form-control" id="repeatPassword" placeholder="Repeat password">
            </div>

            <button type="submit" class="btn btn-primary btn-block">Registry</button>

            {{error}}
        </form>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "register",
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                    repeatPassword: ''
                }
            }
        },
        computed:{
            ...mapState(['error'])
        },
        methods: {
            ...mapActions(['registerUser'])
        }
    }
</script>

<style scoped>

</style>
