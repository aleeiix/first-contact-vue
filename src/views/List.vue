<template>
    <div class="list container">
        <h1>Task List</h1>

        <form @submit.prevent="search(text)">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <font-awesome-icon icon="search" />
                    </span>
                </div>
                <input v-model="text" @keyup="search(text)" type="text" class="form-control" placeholder="Search for some task">
            </div>
        </form>
        
        <ul v-if="!isLoading" class="list-group">
            <li v-for="task of tasksFiltered" class="list-group-item d-flex justify-content-between align-items-center">
                {{task.text}}

                <div>
                    <router-link :to="{name: 'edit', params: {id: task.id}}">
                        <button class="btn btn-primary">
                            <font-awesome-icon icon="edit" />
                        </button>
                    </router-link>
                    <button @click="deleteTask(task.id)" class="btn btn-danger">
                        <font-awesome-icon icon="trash-alt" />
                    </button>
                </div>
            </li>
        </ul>

        <div v-if="isLoading" class="text-center mt-5 mb-5">
            <scale-loader :loading="isLoading"></scale-loader>
            <h5>Loading...</h5>
        </div>

        <router-link to="new">
            <button class="btn btn-primary btn-block">Add Task</button>
        </router-link>
    </div>
</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex'
    import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

    export default {
        name: 'list',
        created() {
            this.getTasks();
        },
        data() {
            return {
                text: null
            }
        },
        computed: {
            ...mapState(['tasks', 'isLoading']),
            ...mapGetters(['tasksFiltered'])
        },
        methods: {
            ...mapActions(['getTasks', 'deleteTask', 'search'])
        },
        components: {
            ScaleLoader
        }
    }
</script>

<style scoped>
    div.list h1 {
        margin-bottom: 1em;
    }
    div.list ul {
        margin-bottom: 1em;
    }
    div.list ul button:last-child{
        margin-left: 0.5em;
    }
</style>
