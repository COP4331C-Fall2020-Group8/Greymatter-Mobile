<template>
    <view class="container">
        <text class="pageHeader">View your sets!</text>
        <text class="label">Search Sets</text>
        <text-input class="textFilter" v-model="searchStr" :on-focus="() => viewSet(-1)" hint="Search set name here" />
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
    flex-direction: column;
    flex: 1;
}

.label {
    margin-left: 10px;
}

.pageHeader {
    font-size: 40px;
    text-align: center;
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

.textFilter {
    background-color: white;
    width: auto;
    margin-left: 10px;
    margin-right: 10px;
}
</style>