<template>
  <div class="images">
    <h1>Gallery</h1>

    <router-link
            v-for="(item, index) of images"
            :key="index"
            :to="{name: 'images', params: {id: item}}">
      <button>Image: {{item}}</button>
    </router-link>

    <Img></Img>
  </div>
</template>

<script>
  import Img from "../components/Image";

  export default {
    name: 'images',
    data() {
      return {
        images: [1,2,3,4]
      }
    },
    components: {
      Img
    }
  }
</script>
