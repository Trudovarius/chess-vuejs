<template>
    <div class="tile"
         v-bind:style="{ backgroundColor: color }"
         @click="select(index)"
         :class="{valid: valid}"
    >
        <img v-if="!empty()" :src="getImg()"
             alt="chess figure"
             :class="{selected: selected}"
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
                this.$store.dispatch('move', {index: index, piece: this.piece, vm: this});
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
    .tile {
        width: 12%;
        height: 12%;
        float: left;
        color: orangered;
        cursor: pointer;
    }

    .tile img {
        width: 60%;
        height: 60%;
        margin: 20%;
        background-color: rgba(150,150,150,.5);
        cursor: pointer;
    }

    .selected {
        outline: 3px solid orangered;
    }

    .valid {
        z-index: 69;
        outline: 3px solid greenyellow;
    }
</style>
