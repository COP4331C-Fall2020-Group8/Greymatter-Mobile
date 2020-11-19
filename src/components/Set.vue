<template>
    <view class="setWrapper">
        <text class="setName">{{name}}</text>
        <text class="setCategory">{{category}}</text>
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
        }
    }
}
</script>

<style>
.setCategory{
    font-size: 18px;
    text-align: center;
}

.setName{
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}

.setWrapper {
    background-color: lightgray;
    border-style: solid;
    border-width: 2px;

    margin-left: auto;
    margin-top: 8px;
    margin-right: auto;
    margin-bottom: 8px;
    padding: 20px;

    width: 360px;
}
</style>