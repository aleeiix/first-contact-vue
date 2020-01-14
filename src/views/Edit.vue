<template>
    <div class="task container">
        <h1>Edit Task</h1>

        <form @submit.prevent="save">
            <div class="form-group">
                <label for="text">Task:</label>
                <input v-model="$v.task.text.$model" type="text" class="form-control" id="text" placeholder="Task text...">
                <small v-if="!$v.task.text.required && $v.task.text.$dirty" class="text-danger">Required field</small>
                <small v-if="!$v.task.text.minLength && $v.task.text.$dirty" class="text-danger">5 characters minimum</small>
            </div>

            <button type="submit" :disabled="$v.task.$invalid || isLoading" class="btn btn-primary btn-block">Save Task</button>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import {required, minLength} from 'vuelidate/lib/validators'

    export default {
        name: 'edit',
        data() {
            return {
                id: this.$route.params.id
            }
        },
        created() {
            this.getTask(this.id)
        },
        computed: {
            ...mapState(['task', 'isLoading'])
        },
        methods: {
            ...mapActions(['getTask', 'saveTask']),
            save() {
                this.saveTask(this.task);
            }
        },
        validations: {
            task: {
                text: {required, minLength:minLength(5)}
            }
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
