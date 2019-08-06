<template>
    <div>
        <h1>{{ title }}</h1>
        <app-board></app-board>
    </div>
</template>

<script>
    import Board from './Board.vue';
    import { pieces, startBoard, players } from './chess';
    export default {
        props: ['active'],
        data: function() {
            return {
                title: 'GAME XD',
                listenerFn: 0,
                selectedTile: undefined
            }
        },
        methods: {
            selectTile(index) {
                this.selectedTile = index;
                console.log(this.selectedTile);
            }
        },
        created: function() {
            let self = this;
        },
        components: {
            appBoard: Board
        }
    }
</script>

<style>
</style>
