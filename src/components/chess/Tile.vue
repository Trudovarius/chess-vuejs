<template>
    <div class="tile"
         v-bind:style="{ backgroundColor: color }"
         @click="select(index)"
         :class="{tile__valid: valid}"
         v-if="piece !== -1"
    >
        <img v-if="!empty()" :src="getImg()"
             alt="chess figure"
             :class="{tile__selected: selected}"
             draggable="false">
    </div>
</template>

<script>
    import {pieces, names} from './chess';
    export default {
        props: ['index', 'color', 'piece'],
        data: function() {
            return {
                selected: false,
                valid: false
            }
        },
        methods: {
            select(index) {
                this.selected = parseInt(this.piece) !== 0;
                this.$store.dispatch('move', {index: index, piece: this.piece, vm: this, valid: this.valid});
            },
            getImg() {
                return "../../assets/img/" + names[this.piece];
            },
            empty() {
                return parseInt(this.piece) === 0;
            }
        }
    }
</script>

<style>
</style>
