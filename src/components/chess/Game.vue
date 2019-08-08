<template>
    <div>
        <div class="row">
            <h1>{{ title }}</h1>
        </div>
        <hr>
        <div class="row">
            <app-info :onTurn="onTurn" class="col-1-of-3"></app-info>
            <app-board class="col-2-of-3"></app-board>
        </div>
    </div>
</template>

<script>
    import Board from './Board.vue';
    import Info from './Info.vue';
    export default {
        data: function() {
            return {
                title: 'CHESS VUE JS',
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
