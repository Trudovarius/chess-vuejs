<template>
    <div>
        <h1>{{ title }}</h1>
        <app-board></app-board>
        <app-info :onTurn="onTurn"></app-info>
    </div>
</template>

<script>
    import Board from './Board.vue';
    import Info from './Info.vue';
    export default {
        data: function() {
            return {
                title: 'GAME',
                onTurn: this.$store.state.onTurn
            }
        },
        created: function() {
            let self = this;
            self.$store.dispatch('setGame', this);
        },
        components: {
            appBoard: Board,
            appInfo: Info
        }
    }
</script>

<style>
</style>
