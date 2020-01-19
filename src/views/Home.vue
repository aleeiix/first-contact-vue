<template>
  <div class="home text-center">
    <img alt="Vue logo" src="../assets/logo.png">

    <h3>Hello {{user.name}}!!</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// @ is an alias to /src
export default {
  name: 'home',
  computed: {
    ...mapState(['user'])
  }
}
</script>
