<template>
    <div class="text-center mb-3">
        <img alt="Vue logo" src="@/assets/logo.png">
        <h1>{{title}}</h1>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: {
            title: String
        }
    }
</script>

<style scoped>

</style>
