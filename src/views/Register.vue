<template>
    <div class="register container">
        <h1 class="mb-5">User Registration</h1>

        <form @submit.prevent="registerUser($v.user.$model)">
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

            <div class="form-group text-left mb-4">
                <label for="repeatPassword" class="font-weight-bold">Repeat password:</label>
                <input v-model="$v.user.repeatPassword.$model" type="password" class="form-control" id="repeatPassword" placeholder="Repeat password">
                <small v-if="!$v.user.repeatPassword.sameAsPassword && $v.user.repeatPassword.$dirty" class="text-danger">The password does not match</small>
            </div>

            <button :disabled="$v.user.$invalid || isLoading" type="submit" class="btn btn-primary btn-block">Registry</button>

            <p class="has_error text-danger">{{error}}</p>
        </form>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import {required, email, minLength, sameAs} from 'vuelidate/lib/validators';

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
            ...mapState(['error', 'isLoading'])
        },
        methods: {
            ...mapActions(['registerUser'])
        },
        validations: {
            user: {
                email: {required, email},
                password: {required, minLength: minLength(6)},
                repeatPassword: {sameAsPassword: sameAs('password')}
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
