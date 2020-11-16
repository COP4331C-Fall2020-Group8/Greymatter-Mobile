<template>
    <view class="container">
        <text class="pageHeader">View your sets!</text>
        <view class="searchView">
            <text class="searchLabel">Search Sets</text>
            <view class="searchHorizWrapper">
                <text-input class="searchInput" v-model="searchStr" hint="Search set name here" />
                <touchable-opacity class="searchBtn" :on-press="() => search(this.searchStr)">
                    <image class="searchImg" slot="right" :source="require('./images/zoom.png') "/>
                </touchable-opacity>
            </view>
        </view>
        <scroll-view class="setView">
            <touchable-opacity class="set" :on-press="() => viewSet(0)">
                <text class="set-header">Sample Set</text>
                <view v-if="setExpand === 0">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => viewSet(1)">
                <text class="set-header">Sample Set 2</text>
                <view v-if="setExpand === 1">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => viewSet(2)">
                <text class="set-header">Sample Set 3</text>
                <view v-if="setExpand === 2">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => viewSet(3)">
                <text class="set-header">Sample Set 4</text>
                <view v-if="setExpand === 3">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => viewSet(4)">
                <text class="set-header">Sample Set 5</text>
                <view v-if="setExpand === 4">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => viewSet(5)">
                <text class="set-header">Sample Set 6</text>
                <view v-if="setExpand === 5">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => viewSet(6)">
                <text class="set-header">Sample Set 7</text>
                <view v-if="setExpand === 6">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => viewSet(7)">
                <text class="set-header">Sample Set 8</text>
                <view v-if="setExpand === 7">
                    <text>Test</text>
                </view>
            </touchable-opacity>
        </scroll-view>
        <button
            color="black"
            class="backBtn"
            title="Go Back"
            @press="goBack"
        />
    </view>
</template>

<script>
import statusbar from "./components/statusbar.vue";

export default {
    data() {
        return {
            searchStr: '',
            setExpand: -1
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
        goBack() {
            this.navigation.goBack();
        },
        search(str) {
            alert("Search term entered:\n" + this.searchStr);
        },
        viewSet(num) {
            this.setExpand = num;
        }
    }
}
</script>

<style>
.container {
    background-color: grey;
    flex: 1;
}

.pageHeader {
    font-size: 40px;
    text-align: center;
}

.searchBtn {
    margin-right: 8px;
}

.searchHorizWrapper {
    flex-direction: row;
    width: auto;
}

.searchImg {
    height: 66px;
    width: 66px;
}

.searchInput {
    background-color: white;
    flex-grow: 1;
    font-size: 30px;
    margin-left: 10px;
}

.searchLabel {
    font-size: 20px;
    font-weight: bold;
    margin: 4px;
    margin-left: 10px;
}

.searchView {
    margin-bottom: 8px;
}

.set {
    background-color: crimson;
    border-style: solid;
    border-width: 2px;

    margin-left: auto;
    margin-top: 8px;
    margin-right: auto;
    margin-bottom: 8px;
    padding: 4px;

    width: 360px;
}

.set-header {
    font-size: 36px;
    text-align: center;
}
</style>