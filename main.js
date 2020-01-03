Vue.component('app-first-component', {
    template: `<div>
        <h1>{{text}}</h1>
        <h3>{{commentSec}}</h3>
    </div>`,
    props: ['commentSec'],
    data(){
        return {
            text: 'This is a first component'
        }
    },
    mounted() {
        this.$emit('nameChild', this.name)
    }
});

new Vue({
    el: '#app',
    beforeCreate() {
        console.log('BEFORE CREATE');
    },
    created() {
        // Una vez ya ha cargado sus variable, observers, funciones, pero aun no hay acceso con el DOM
        // Aun no hay acceso a "el"
        console.log('CREATED');
    },
    beforeMount() {
        // Se ejecuta antes de insertar el DOM
        console.log('BEFORE MOUNT');
    },
    mounted() {
        // Se ejecuta cuando se insertan las variables en el DOM
        console.log('MOUNTED');
    },
    beforeUpdate() {
        // Al detectar un cambio
        console.log('BEFORE UPDATE');
    },
    updated() {
        // Al realizar los cambios
        console.log('UPDATED');
    },
    beforeDestroy() {
        // Antes de destruir la instancia
        console.log('BEFORE DESTROY');
    },
    destroyed() {
        // Se destruye toda la instancia
        console.log('DESTROYED');
    },
    data: {
        title: 'Hello World with Vue!',
        fruits: [
            {name: 'Apple', quantity: 10},
            {name: 'Orange', quantity: 22},
            {name: 'Watermelon', quantity: 0},
            {name: 'Banana', quantity: 1},
            {name: 'Strawberry', quantity: 7},
            {name: 'Blackberry', quantity: 21},
            {name: 'Blueberry', quantity: 15},
            {name: 'Rasberry', quantity: 0},
            {name: 'Peach', quantity: 3}
        ],
        newFruit: '',
        total: 0,
        background: 'bg-success',
        totalBackground: true
    },
    methods: {
        addFruit() {
            this.fruits.push({name: this.newFruit, quantity: 0})
            this.newFruit = '';
        }
    },
    computed: {
        totalFruits() {
            this.total = this.fruits.reduce((total, value) => {
                total += value.quantity;
                return total;
            }, 0);

            return this.total;
        }
    }
});
