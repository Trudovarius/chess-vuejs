<template>
    <div>
        <div class="chess__info">
            <h1>GAME INFO</h1>
            <h2 v-if="onTurn">Black player is on turn.</h2>
            <h2 v-else>White player is on turn</h2>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['onTurn'],
        data: function() {
            return {

            }
        }
    }
</script>

<style>

</style>