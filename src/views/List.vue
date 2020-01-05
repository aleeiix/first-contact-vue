<template>
  <div class="list">
    <h1>Task List</h1>
    <ul class="list-group">
      <li v-for="task of tasks" class="list-group-item d-flex justify-content-between align-items-center">
        {{task.text}}

        <div>
          <router-link :to="{name: 'edit', params: {id: task.id}}">
            <button class="btn btn-primary">
              <font-awesome-icon icon="edit" />
            </button>
          </router-link>
          <button class="btn btn-danger">
            <font-awesome-icon icon="trash-alt" />
          </button>
        </div>
      </li>
    </ul>
    <router-link to="new">
      <button class="btn btn-primary btn-block">Add Task</button>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'list',
  created() {
    this.getTasks();
  },
  computed: {
    ...mapState(['tasks'])
  },
  methods: {
    ...mapActions(['getTasks'])
  }
}
</script>

<style scoped>
  main ul {
     margin-bottom: 1em;
   }

  main ul button:last-child{
    margin-left: 0.5em;
  }
</style>
