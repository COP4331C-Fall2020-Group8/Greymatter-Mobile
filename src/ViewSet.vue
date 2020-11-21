<template>
    <view class="container">
        <view class="header">
            <text class="headerText" v-if="deleteMode">Delete which cards?</text>
            <text class="headerText" v-else>Set Name</text>
        </view>

        <view class="content">
            <view class="searchView">
                <text class="searchLabel">Search Sets</text>
                <view class="searchHorizWrapper">
                    <text-input class="searchInput" v-model="searchStr" hint="Search set name here" />
                    <touchable-opacity class="searchBtn" :on-press="() => search(searchStr)">
                        <image class="icon searchImg" :source="require('./images/icon/search.png') "/>
                    </touchable-opacity>
                </view>
            </view>
            <scroll-view class="cardView">
                <template v-for="cardObj in 10">
                    <card
                        :key="cardObj"
                        class="card"
                        front="What does flipping this card do?"
                        back="It flips the card around!"
                    />
                </template>
            </scroll-view>
        </view>
        
        <view class="footer">
            <touchable-opacity class="backBtn footerBtn" :on-press="goBack">
                <image class="backImg icon" :source="require('./images/icon/return.png') "/>
            </touchable-opacity>
            <touchable-opacity class="deleteBtn footerBtn" :on-press="() => { deleteMode = !deleteMode }">
                <image class="deleteImg icon" :source="require('./images/icon/trashcanOpen.png') "/>
            </touchable-opacity>
            <view class="openBtn footerBtn disabled" v-if="deleteMode">
                <image class="openImg icon" :source="require('./images/icon/plus.png') "/>
            </view>
            <touchable-opacity class="openBtn footerBtn" v-else :on-press="addCard">
                <image class="openImg icon" :source="require('./images/icon/plus.png') "/>
            </touchable-opacity>
        </view>
    </view>
</template>

<script>
import statusbar from "./components/statusbar.vue";
import card from "./components/Card.vue"
import { Alert, CheckBox } from "react-native";

export default {
    data() {
        return {
            deleteMode: false,
            searchStr: '',
            selectedCard: -1
        }
    },

    components: {
        card,
        statusbar
    },

    props: {
        navigation: {
            type: Object
        }
    },

    methods: {
        addCard() {
            alert("Under construction");
        },
        goBack() {
            this.navigation.goBack();
        },
        search(str) {
            alert("Search term entered:\n" + str);
        }
    }
}
</script>

<style>
.card {
    flex-direction: row;

    margin-bottom: 8px;
    margin-left: auto;
    margin-right: auto;
}

.cardPair {
    flex-direction: row;
    margin-bottom: 8px;
    margin-top: 8px;
}

.cardText {
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;

    text-align: center;
}

.checkBox {
    opacity: 100;
}

.container {
    background-color: grey;
    flex: 1;
}

.content {
    flex: 1;
}

.disabled {
    opacity: 0.2;
}

.footer {
    background-color: black;
    flex-direction: row;
    margin-top: auto;
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
    font-weight: bold;
    text-align: center;
}

.icon {
    height: 50px;
    width: 50px;
}

.searchHorizWrapper {
    flex-direction: row;
}

.searchInput {
    background-color: white;
    flex-grow: 1;
    font-size: 24px;
    margin-left: 10px;
    padding: 10px;
    width: 300px;
}

.searchLabel {
    font-size: 18px;
    font-weight: bold;
    margin: 4px;
    margin-left: 10px;
}

.searchView {
    margin-bottom: 8px;
}
</style>