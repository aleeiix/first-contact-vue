<template>
  <div class="task">
    <h1 v-if="isNew">New Task</h1>
    <h1 v-else>Edit Task</h1>

    <form>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'task',
  data() {
    return {
      isNew: true
    }
  },
  created() {
    this.isNew = (this.$route.params.id === undefined);
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style scoped>
  main {
    margin-top: 1em;
  }

  main ul {
     margin-bottom: 1em;
   }

  main ul button:last-child{
    margin-left: 0.5em;
  }
</style>
