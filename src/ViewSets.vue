<template>
    <view class="container">
        <text class="header">View your sets!</text>
        <view class="searchView">
            <text class="searchLabel">Search Sets</text>
            <view class="searchHorizWrapper">
                <text-input class="searchInput" v-model="searchStr" hint="Search set name here" />
                <touchable-opacity class="searchBtn" :on-press="() => search(this.searchStr)">
                    <image class="icon searchImg" slot="right" :source="require('./images/icon/search.png') "/>
                </touchable-opacity>
            </view>
        </view>
        <scroll-view class="setView">
            <touchable-opacity class="set" :on-press="() => { selectedSet = 0 }">
                <text class="set-header">Sample Set</text>
                <view v-if="selectedSet === 0">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => { selectedSet = 1 }">
                <text class="set-header">Sample Set 2</text>
                <view v-if="selectedSet === 1">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => { selectedSet = 2 }">
                <text class="set-header">Sample Set 3</text>
                <view v-if="selectedSet === 2">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => { selectedSet = 3 }">
                <text class="set-header">Sample Set 4</text>
                <view v-if="selectedSet === 3">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => { selectedSet = 4 }">
                <text class="set-header">Sample Set 5</text>
                <view v-if="selectedSet === 4">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => { selectedSet = 5 }">
                <text class="set-header">Sample Set 6</text>
                <view v-if="selectedSet === 5">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => { selectedSet = 6 }">
                <text class="set-header">Sample Set 7</text>
                <view v-if="selectedSet === 6">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => { selectedSet = 7 }">
                <text class="set-header">Sample Set 8</text>
                <view v-if="selectedSet === 7">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => { selectedSet = 8 }">
                <text class="set-header">Sample Set 9</text>
                <view v-if="selectedSet === 8">
                    <text>Test</text>
                </view>
            </touchable-opacity>
            <touchable-opacity class="set" :on-press="() => { selectedSet = 9 }">
                <text class="set-header">Sample Set 10</text>
                <view v-if="selectedSet === 9">
                    <text>Test</text>
                </view>
            </touchable-opacity>
        </scroll-view>
        <view class="footer">
            <touchable-opacity class="backBtn footerBtn" :on-press="goBack">
                <image class="backImg icon" :source="require('./images/icon/return.png') "/>
            </touchable-opacity>
            <touchable-opacity class="deleteBtn footerBtn" v-if="selectedSet != -1" :on-press="deleteSet">
                <image class="deleteImg icon" :source="require('./images/icon/trashcanOpen.png') "/>
            </touchable-opacity>
            <view class="deleteBtn footerBtn disabled" v-else>
                <image class="deleteImg icon" :source="require('./images/icon/trashcanOpen.png') "/>
            </view>
            <touchable-opacity class="openBtn footerBtn" v-if="selectedSet != -1" :on-press="openSet">
                <image class="openImg icon" :source="require('./images/icon/open.png') "/>
            </touchable-opacity>
            <view class="openBtn footerBtn disabled" v-else>
                <image class="openImg icon" :source="require('./images/icon/open.png') "/>
            </view>
        </view>
    </view>
</template>

<script>
import statusbar from "./components/statusbar.vue";
import { Alert } from "react-native";

export default {
    data() {
        return {
            searchStr: '',
            selectedSet: -1
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
        deleteSet() {
            Alert.alert(
                "Confirm Delete",
                "Are you sure you want to delete this set?",
                [
                    {
                        text: "Yes",
                        onPress: () => alert("Under construction")
                    },
                    {
                        text: "No"
                    }
                ]
            );
        },
        goBack() {
            this.navigation.goBack();
        },
        openSet() {
            alert("Under construction");
        },
        search(str) {
            alert("Search term entered:\n" + this.searchStr);
        },
        viewSet(num) {
            this.selectedSet = num;
        }
    }
}
</script>

<style>
.container {
    background-color: grey;
    flex: 1;
}

.disabled {
    opacity: 0.2;
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
    font-size: 40px;
    text-align: center;
}

.icon {
    height: 66px;
    width: 66px;
}

.searchBtn {
    margin-right: 8px;
}

.searchHorizWrapper {
    flex-direction: row;
    width: auto;
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

.set-header {
    font-size: 36px;
    text-align: center;
}
</style>