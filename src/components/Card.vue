<template>
    <touchable-opacity class="cardWrapper" :activeOpacity="0.5" :on-press="() => { if (flippable) { flipped = !flipped } }">
        <view class="card">
            <text class="cardText" v-if="flipped">{{back}}</text>
            <text class="cardText" v-else>{{front}}</text>
        </view>
    </touchable-opacity>
</template>

<script>
export default {
    data() {
        return {
            flipped: false
        }
    },
    props: {
        back: String,
        front: String,
        flippable: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style>
.card {
    background-color: lightgrey;
    border-style: solid;
    border-width: 1px;

    padding-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 8px;

    height: 150px;
    width: 150px;
}

.cardText {
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;

    text-align: center;
}

.cardWrapper {
    flex-direction: row;
}
</style>