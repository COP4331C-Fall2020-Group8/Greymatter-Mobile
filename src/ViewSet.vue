<template>
    <view class="container">
        <text class="header">Set Name</text>
        <view class="content">
            
        </view>
        <view class="footer">
            <touchable-opacity class="backBtn footerBtn" :on-press="goBack">
                <image class="backImg icon" :source="require('./images/icon/return.png') "/>
            </touchable-opacity>
            <touchable-opacity class="deleteBtn footerBtn" :on-press="deleteCard">
                <image class="deleteImg icon" :source="require('./images/icon/trashcanOpen.png') "/>
            </touchable-opacity>
            <touchable-opacity class="addBtn footerBtn" :on-press="addCard">
                <image class="addImg icon" :source="require('./images/icon/plus.png') "/>
            </touchable-opacity>
        </view>
    </view>
</template>

<script>
import statusbar from "./components/statusbar.vue";
import { Alert } from "react-native";

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

</style>