<template>
    <div class="board">
        <div class="fields">
            <app-tile v-for="(tile, index) in tiles"
                      :key="index"
                      :color="getColor(index)"
                      :piece="tile"
                      :index="index"
            ></app-tile>
        </div>
    </div>
</template>

<script>
    import Tile from './Tile.vue';
    import { pieces, startBoard } from './chess';
    export default {
        data: function() {
            return {
                tiles: this.$store.state.board
            }
        },
        methods: {
            getColor(index) {
                switch (index) {
                    case 0: case 2: case 4: case 6:
                    case 9: case 11: case 13: case 15:
                    case 16: case 18: case 20: case 22:
                    case 25: case 27: case 29: case 31:
                    case 32: case 34: case 36: case 38:
                    case 41: case 43: case 45: case 47:
                    case 48: case 50: case 52: case 54:
                    case 57: case 59: case 61: case 63:
                        return 'white';
                    case 1: case 3: case 5: case 7:
                    case 8: case 10: case 12: case 14:
                    case 17: case 19: case 21: case 23:
                    case 24: case 26: case 28: case 30:
                    case 33: case 35: case 37: case 39:
                    case 40: case 42: case 44: case 46:
                    case 49: case 51: case 53: case 55:
                    case 56: case 58: case 60: case 62:
                        return 'black';
                    default:
                        return 'red';
                }
            }
        },
        components: {
            appTile: Tile
        },
        created() {
            let self = this;
            self.$store.dispatch('start', { board: startBoard, vm: this});
        }
    }
</script>

<style>
    .board {
        width: 40%;
        padding-top: 40%;
        margin: auto;
        background: gray;
        position: relative;
    }

    .fields {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        padding-top: 4%;
        padding-left: 4%;
    }

</style>
