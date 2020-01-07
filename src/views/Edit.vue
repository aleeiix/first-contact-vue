<template>
  <div class="task">
    <h1>Edit Task</h1>

    <form @submit.prevent="save">
      <div class="form-group">
        <label for="text">Task:</label>
        <input v-model="task.text" type="text" class="form-control" id="text" placeholder="Task text...">
      </div>

      <button type="submit" class="btn btn-primary btn-block">Save Task</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

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
    ...mapState(['task'])
  },
  methods: {
    ...mapActions(['getTask', 'saveTask']),
    save() {
      this.saveTask(this.task);
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
