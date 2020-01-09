<template>
    <div class="login container">
        <h1 class="mb-5">Log in</h1>

        <form @submit.prevent="loginUser(user)">
            <div class="form-group text-left mb-4">
                <label for="email" class="font-weight-bold">Email address:</label>
                <input v-model="user.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            </div>

            <div class="form-group text-left mb-4">
                <label for="password" class="font-weight-bold">Password:</label>
                <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Enter password">
            </div>

            <button :disabled="isInvalid" type="submit" class="btn btn-primary btn-block">Enter</button>

            <p class="has_error text-danger">{{error}}</p>
        </form>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';

    export default {
        name: "login",
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                }
            }
        },
        computed:{
            ...mapState(['error']),
            isInvalid() {
                return !(
                    this.user.email
                    && this.user.password
                );
            }
        },
        methods: {
            ...mapActions(['loginUser'])
        }
    }
</script>

<style scoped>
    p {
        font-size: 0.8rem;
        margin-top: 1rem;
    }
</style>
