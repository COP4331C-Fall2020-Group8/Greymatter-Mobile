<template>
    <view class="container">
        <view class="header">
            <text class="headerText">Add a new set</text>
        </view>

        <view class="content">
            <text class="label">Front</text>
            <text-input class="input" v-model="front" />
            <text class="label">Back</text>
            <text-input class="input" v-model="back" />
        </view>

        <view class="footer">
            <touchable-opacity class="backBtn footerBtn" :on-press="() => { navigation.goBack() }">
                <image class="backBtn icon" :source="require('./images/icon/return.png')" />
            </touchable-opacity>
            <touchable-opacity class="addBtn footerBtn" :on-press="addSet">
                <image class="addBtn icon" :source="require('./images/icon/plus.png')" />
            </touchable-opacity>
        </view>
    </view>
</template>

<script>
import statusbar from "./components/statusbar.vue";
import axios from "axios";
import store from './store';

import { AsyncStorage } from "react-native";

export default {
    data() {
        return {
            user: "user",
            setId: "",
            front: "",
            back: ""
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

    created() {
        AsyncStorage.getItem("id").then((val) => {
            this.user = (val == null ? "user" : val);
        });
        AsyncStorage.getItem("selectedSet").then((val) => {
            if (val) {
                var set = JSON.parse(val);
                this.setId = set._id;
            }
        })
    },

    methods: {
        addSet() {
            if (this.front == "" || this.back == "")
                alert("Please fill in all fields.");
            else {
                console.log("Adding card for user " + this.user + " with set id " + this.setId);
                store.dispatch("addCard", {
                    cardObj: {
                        user_id: this.user,
                        set_id: this.setId,
                        front: this.front,
                        back: this.back
                    }
                }).then(() => { this.navigation.goBack(); });
            }
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
    margin-left: 10px;
    margin-right: 10px;
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
    margin-left: 10px;
    margin-right: 10px;
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

.input {
    background-color: white;
    font-size: 14px;
    padding: 4px;
    margin-bottom: 12px;
}

.label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
}
</style>