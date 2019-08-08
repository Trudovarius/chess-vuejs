<template>
    <div>
        <div class="chess__board">
            <div class="chess__fields">
                <app-tile v-for="(tile, index) in tiles"
                          :key="index"
                          :color="getColor(index)"
                          :piece="tile"
                          :index="index"
                ></app-tile>
            </div>
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
                    case 26: case 28: case 30: case 32:
                    case 39: case 41: case 43: case 45:
                    case 50: case 52: case 54: case 56:
                    case 63: case 65: case 67: case 69:
                    case 74: case 76: case 78: case 80:
                    case 87: case 89: case 91: case 93:
                    case 98: case 100: case 102: case 104:
                    case 111: case 113: case 115: case 117:
                        return 'white';
                    case 27: case 29: case 31: case 33:
                    case 38: case 40: case 42: case 44:
                    case 51: case 53: case 55: case 57:
                    case 62: case 64: case 66: case 68:
                    case 75: case 77: case 79: case 81:
                    case 86: case 88: case 90: case 92:
                    case 99: case 101: case 103: case 105:
                    case 110: case 112: case 114: case 116:
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

</style>
