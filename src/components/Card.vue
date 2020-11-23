<template>
    <touchable-opacity class="card" :on-press="flip">
        <text class="cardText" v-if="flipped">{{back}}</text>
        <text class="cardText" v-else>{{front}}</text>
    </touchable-opacity>
</template>

<script>
export default {
    data() {
        return {
            flipped: false,
            bck: "white"
        }
    },

    props: {
        back: String,
        front: String,
        flippable: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        flip() {
            this.flipped = !(this.flipped);
            this.$emit("flipped");
        }
    }
}
</script>

<style>
.card {
    background-color: lightgrey;
    border-style: solid;

    padding-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 8px;

    height: 250px;
    width: 250px;

    border-width: 2px;
}

.cardText {
    font-size: 18px;

    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;

    padding: 8px;
    text-align: center;
}
</style>