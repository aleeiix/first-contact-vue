<template>
    <div>
        <ul class="list-group">
            <li v-for="(fruit, index) of orderedFruits" :key="fruit.id" @click="addQuantity(index)" class="list-group-item d-flex justify-content-between align-items-center">
                {{fruit.name}}
                <span class="badge badge-primary badge-pill">{{fruit.quantity}}</span>
            </li>
        </ul>

        <button @click="reset" class="btn btn-danger btn-block mt-3">Reset</button>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';

    export default {
        name: "List",
        computed: {
            ...mapState(['fruits']),
            orderedFruits() {
                return this.fruits.sort((a, b) => b.quantity - a.quantity);
            }
        },
        methods: {
            ...mapMutations(['addQuantity', 'reset'])
        }
    }
</script>

<style scoped>
    li {
        cursor: pointer;
    }
</style>
