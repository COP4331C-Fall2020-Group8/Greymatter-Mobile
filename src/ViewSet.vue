<template>
    <view class="container">
        <view class="header">
            <text class="headerText" v-if="deleteMode">Delete which cards?</text>
            <text class="headerText" v-else>Set Name</text>
        </view>

        <view class="content">
            <scroll-view class="cardView">
                <view class="cardPair">
                    <card
                        class="card"
                        front="What does flipping this card do?"
                        back="It flips the card around!"
                    />
                    <card
                        class="card"
                        front="Hello."
                        back="Goodbye!"
                    />
                </view>
                <view class="cardPair">
                    <card
                        class="card"
                        front="What does flipping this card do?"
                        back="It flips the card around!"
                    />
                    <card
                        class="card"
                        front="Hello."
                        back="Goodbye!"
                    />
                </view>
                <view class="cardPair">
                    <card
                        class="card"
                        front="What does flipping this card do?"
                        back="It flips the card around!"
                    />
                    <card
                        class="card"
                        front="Hello."
                        back="Goodbye!"
                    />
                </view>
                <view class="cardPair">
                    <card
                        class="card"
                        front="What does flipping this card do?"
                        back="It flips the card around!"
                    />
                    <card
                        class="card"
                        front="Hello."
                        back="Goodbye!"
                    />
                </view>
                <view class="cardPair">
                    <card
                        class="card"
                        front="What does flipping this card do?"
                        back="It flips the card around!"
                    />
                    <card
                        class="card"
                        front="Hello."
                        back="Goodbye!"
                    />
                </view>
                <view class="cardPair">
                    <card
                        class="card"
                        front="What does flipping this card do?"
                        back="It flips the card around!"
                    />
                    <card
                        class="card"
                        front="Hello."
                        back="Goodbye!"
                    />
                </view>
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
            delete0: false,
            deleteMode: false,
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

        },
        goBack() {
            this.navigation.goBack();
        },
        selectCard(e) {
            if (this.deleteMode) {
                alert(e);
            }
            else {
                alert("Under construction");
            }
        }
    }
}
</script>

<style>
.card {
    flex-direction: row;

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
    font-size: 40px;
    text-align: center;
}

.icon {
    height: 66px;
    width: 66px;
}
</style>