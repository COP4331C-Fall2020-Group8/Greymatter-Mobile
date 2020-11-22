<template>
    <view class="cardWrapper" :activeOpacity="0.5" :on-press="() => { if (flippable) { flipped = !flipped } }">
        <view class="card">
            <text class="cardText" v-if="flipped">{{back}}</text>
            <text class="cardText" v-else>{{front}}</text>
        </view>
    </view>
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
            if (this.flippable)
                this.flipped = !(this.flipped);
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

.cardWrapper {
    border-width: 2px;
}
</style>