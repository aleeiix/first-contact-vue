<template>
    <div class="task container">
        <h1>New Task</h1>

        <form @submit.prevent="create">
            <div class="form-group">
                <label for="taskInput">Task:</label>
                <input v-model="$v.text.$model" type="text" class="form-control" id="taskInput" placeholder="Task text...">
                <small v-if="!$v.text.required && $v.text.$dirty" class="text-danger">Required field</small>
                <small v-if="!$v.text.minLength && $v.text.$dirty" class="text-danger">5 characters minimum</small>
            </div>

            <button type="submit" :disabled="$v.$invalid || isLoading" class="btn btn-primary btn-block">Create Task</button>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import {required, minLength} from 'vuelidate/lib/validators'

    export default {
        name: 'create',
        data() {
            return {
                text: ''
            }
        },
        computed: {
            ...mapState(['isLoading'])
        },
        methods: {
            ...mapActions(['createTask']),
            create() {
                this.createTask(this.text);
            }
        },
        validations: {
            text: {required, minLength:minLength(5)}
        }
    }
</script>

<style scoped>
    div.task {
        margin-top: 1em;
    }
    div.task h1 {
        margin-bottom: 1em;
    }
    div.task form div.form-group {
        text-align: left;
        font-weight: bold;
    }
</style>
