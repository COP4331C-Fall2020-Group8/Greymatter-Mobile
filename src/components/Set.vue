<template>
    <view class="setWrapper">
        <text class="label setName">{{name}}</text>
        <text class="label setCategory">{{category}}</text>
        <text class="label setNumCards">Number of Cards: {{numCards}}</text>
    </view>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        numCards: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style>
.label {
    text-align: center;
}

.setCategory {
    font-size: 18px;
}

.setName {
    font-size: 30px;
    font-weight: bold;
}
.setNumCards {
    font-size: 14px;
}

.setWrapper {
    background-color: lightgray;
    border-style: solid;
    border-width: 2px;
    padding: 20px;

    width: 360px;
}
</style>