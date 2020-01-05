<template>
    <header>
        <img alt="Vue logo" src="../assets/logo.png">
        <h5>CRUD Firebase</h5>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    header {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #EEEEEE;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding: 0.8em;
    }

    header img {
        width: 5em;
        margin-right: 1em;
    }
</style>