<template>
    <div class="task container">
        <h1>New Task</h1>

        <form @submit.prevent="create">
            <div class="form-group">
                <label for="taskInput">Task:</label>
                <input v-model="text" type="text" class="form-control" id="taskInput" placeholder="Task text...">
            </div>

            <button type="submit" class="btn btn-primary btn-block">Create Task</button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'create',
        data() {
            return {
                text: ''
            }
        },
        computed: {
        },
        methods: {
            ...mapActions(['createTask']),
            create() {
                this.createTask(this.text);
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
