<template>
    <div class="login container">
        <h1 class="mb-5">Log in</h1>

        <form @submit.prevent="loginUser($v.user.$model)">
            <div class="form-group text-left mb-4">
                <label for="email" class="font-weight-bold">Email address:</label>
                <input v-model="$v.user.email.$model" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                <small v-if="!$v.user.email.required && $v.user.email.$dirty" class="text-danger">Required field</small>
                <small v-if="!$v.user.email.email && $v.user.email.$dirty" class="text-danger">Wrong email format</small>
            </div>

            <div class="form-group text-left mb-4">
                <label for="password" class="font-weight-bold">Password:</label>
                <input v-model="$v.user.password.$model" type="password" class="form-control" id="password" placeholder="Enter password">
                <small v-if="!$v.user.password.required && $v.user.password.$dirty" class="text-danger">Required field</small>
                <small v-if="!$v.user.password.minLength && $v.user.password.$dirty" class="text-danger">6 characters minimum</small>
            </div>

            <button :disabled="$v.user.$invalid || isLoading" type="submit" class="btn btn-primary btn-block">Enter</button>
            <p class="has_error text-danger">{{error}}</p>
        </form>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import {required, email, minLength} from 'vuelidate/lib/validators';

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
            ...mapState(['error', 'isLoading'])
        },
        methods: {
            ...mapActions(['loginUser'])
        },
        validations: {
            user: {
                email: {required, email},
                password: {required, minLength: minLength(6)}
            }
        }
    }
</script>

<style scoped>
    p {
        font-size: 0.8rem;
        margin-top: 1rem;
    }
</style>
