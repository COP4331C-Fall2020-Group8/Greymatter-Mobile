<template>
    <view class="container">
        <view class="header">
            <text class="headerText">Welcome,</text>
            <text class="headerText">user!</text>
        </view>

        <view class="content">
            <view class="searchView">
                <text class="searchLabel">Search Sets</text>
                <view class="searchHorizWrapper">
                    <text-input class="searchInput" v-model="searchStr" hint="Search set name here" />
                    <touchable-opacity class="searchBtn" :on-press="() => search(this.searchStr)">
                        <image class="icon searchImg" :source="require('./images/icon/search.png') "/>
                    </touchable-opacity>
                </view>
            </view>
            <scroll-view class="setView">
                <touchable-opacity class="set" :on-press="() => { selectedSet = 0 }">
                    <set
                        name="Sample Set"
                        category="Sample"
                    />
                </touchable-opacity>
                <touchable-opacity class="set" :on-press="() => { selectedSet = 1 }">
                    <set
                        name="Sample Set 2"
                        category="Sample"
                    />
                </touchable-opacity>
                <touchable-opacity class="set" :on-press="() => { selectedSet = 2 }">
                    <set
                        name="Sample Set 3"
                        category="Sample"
                    />
                </touchable-opacity>
                <touchable-opacity class="set" :on-press="() => { selectedSet = 3 }">
                    <set
                        name="Sample Set 4"
                        category="Sample"
                    />
                </touchable-opacity>
                <touchable-opacity class="set" :on-press="() => { selectedSet = 4 }">
                    <set
                        name="Sample Set 5"
                        category="Sample"
                    />
                </touchable-opacity>
                <touchable-opacity class="set" :on-press="() => { selectedSet = 5 }">
                    <set
                        name="Sample Set 6"
                        category="Sample"
                    />
                </touchable-opacity>
                <touchable-opacity class="set" :on-press="() => { selectedSet = 6 }">
                    <set
                        name="Sample Set 7"
                        category="Sample"
                    />
                </touchable-opacity>
                <touchable-opacity class="set" :on-press="() => { selectedSet = 7 }">
                    <set
                        name="Sample Set 8"
                        category="Sample"
                    />
                </touchable-opacity>
                <touchable-opacity class="set" :on-press="() => { selectedSet = 8 }">
                    <set
                        name="Sample Set 9"
                        category="Sample"
                    />
                </touchable-opacity>
                <touchable-opacity class="set" :on-press="() => { selectedSet = 9 }">
                    <set
                        name="Sample Set 10"
                        category="Sample"
                    />
                </touchable-opacity>
            </scroll-view>
        </view>

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
                <image class="openImg icon" :source="require('./images/icon/toolPencil.png') "/>
            </touchable-opacity>
            <view class="openBtn footerBtn disabled" v-else>
                <image class="openImg icon" :source="require('./images/icon/toolPencil.png') "/>
            </view>
            <touchable-opacity class="quizBtn footerBtn" v-if="selectedSet != -1" :on-press="quizSet">
                <image class="quizImg icon" :source="require('./images/icon/exclamation.png') "/>
            </touchable-opacity>
            <view class="quizBtn footerBtn disabled" v-else>
                <image class="quizImg icon" :source="require('./images/icon/exclamation.png') "/>
            </view>
        </view>
    </view>
</template>

<script>
import statusbar from "./components/statusbar.vue";
import set from "./components/Set.vue";
import { Alert } from "react-native";

export default {
    data() {
        return {
            searchStr: '',
            selectedSet: -1
        }
    },

    components: {
        statusbar,
        set
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
            this.navigation.navigate("ViewIndividualSet");
        },
        search(str) {
            alert("Search term entered:\n" + this.searchStr);
        },
        quizSet() {
            alert("Under construction");
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

.content{
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
    margin-bottom: auto;
}

.headerText {
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
    padding: 10px;
    width: 300px;
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
</style>