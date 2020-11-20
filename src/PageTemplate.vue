<template>
    <view class="container">
        <view class="header">
            <text class="headerText"></text>
        </view>

        <view class="content">
        </view>

        <view class="footer">
            <touchable-opacity class="backBtn footerBtn" :on-press="() => { navigation.goBack() }">
                <image class="backBtn icon" :source="require('./images/icon/return.png')" />
            </touchable-opacity>
        </view>
    </view>
</template>

<script>
import statusbar from "./components/statusbar.vue";

export default {
    data() {
        return {

        }
    },

    components: {
        statusbar
    },

    props: {
        navigation: {
            type: Object
        }
    },

    methods: {

    }
}
</script>

<style>
.container {
    background-color: grey;
    flex: 1;
}

.content{
    flex: 1;
}

.footer {
    background-color: black;
    flex-direction: row;
}

.footerBtn {
    margin-left: auto;
    margin-right: auto;
}

.header {
    margin-bottom: auto;
}

.headerText {
    font-size: 32px;
    text-align: center;
}

.icon {
    height: 50px;
    width: 50px;
}

</style>