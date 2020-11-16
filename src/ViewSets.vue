<template>
    <view class="container">
        <text class="pageHeader">View your sets!</text>
        <text class="searchLabel">Search Sets</text>
        <view class="searchView">
            <text-input class="searchInput" v-model="searchStr" hint="Search set name here" />
            <touchable-opacity class="searchBtn">
                <image class="searchImg" slot="right" :source="require('./images/zoom.png') "/>
            </touchable-opacity>
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
    flex-direction: row;
    width: auto;
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