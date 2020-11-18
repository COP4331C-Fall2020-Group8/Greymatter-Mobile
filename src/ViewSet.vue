<template>
    <view class="container">
        <view class="header">
            <text class="headerText">Set Name</text>
        </view>

        <view class="content">
            
        </view>
        
        <view class="footer">
            <touchable-opacity class="backBtn footerBtn" :on-press="goBack">
                <image class="backImg icon" :source="require('./images/icon/return.png') "/>
            </touchable-opacity>
            <touchable-opacity class="deleteBtn footerBtn" v-if="selectedCard != -1" :on-press="deleteCard">
                <image class="deleteImg icon" :source="require('./images/icon/trashcanOpen.png') "/>
            </touchable-opacity>
            <view class="deleteBtn footerBtn disabled" v-else>
                <image class="deleteImg icon" :source="require('./images/icon/trashcanOpen.png') "/>
            </view>
            <touchable-opacity class="openBtn footerBtn" v-if="selectedCard != -1" :on-press="addCard">
                <image class="openImg icon" :source="require('./images/icon/plus.png') "/>
            </touchable-opacity>
            <view class="openBtn footerBtn disabled" v-else>
                <image class="openImg icon" :source="require('./images/icon/plus.png') "/>
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
            selectedCard: -1
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
        addCard() {

        },
        deleteCard() {

        },
        goBack() {
            this.navigation.goBack();
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
    font-size: 40px;
    text-align: center;
}

.icon {
    height: 66px;
    width: 66px;
}
</style>