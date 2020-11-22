<template>
    <view class="container">
        <view class="header">
            <text class="headerText">{{setName}}</text>
        </view>

        <view class="content">
            <view class="searchView">
                <text class="searchLabel">Search Cards</text>
                <view class="searchHorizWrapper">
                    <text-input class="searchInput" v-model="searchStr" hint="Search set name here" />
                    <touchable-opacity class="searchBtn" :on-press="() => search(searchStr)">
                        <image class="icon searchImg" :source="require('./images/icon/search.png') "/>
                    </touchable-opacity>
                </view>
            </view>
            <scroll-view class="cardView">
                <template v-for="cardObj in cards">
                    <touchable-opacity class="cardWrapper" :key="cardObj._id" :style="{ borderColor: border[cardObj._id] }" :on-press="() => { selectCard(cardObj._id) }">
                        <card
                            class="card"
                            :ref="cardObj._id"
                            :front="cardObj.card.front"
                            :back="cardObj.card.back"
                        />
                    </touchable-opacity>
                </template>
            </scroll-view>
        </view>
        
        <view class="footer">
            <touchable-opacity class="backBtn footerBtn" :on-press="goBack">
                <image class="backImg icon" :source="require('./images/icon/return.png')" />
            </touchable-opacity>
            <touchable-opacity class="openBtn footerBtn" :on-press="addCard">
                <image class="openImg icon" :source="require('./images/icon/plus.png')" />
            </touchable-opacity>
            <touchable-opacity class="deleteBtn footerBtn" v-if="selectedCard != null" :on-press="deleteCard">
                <image class="deleteImg icon" :source="require('./images/icon/trashcanOpen.png')" />
            </touchable-opacity>
            <view class="deleteBtn footerBtn disabled" v-else>
                <image class="deleteImg icon" :source="require('./images/icon/trashcanOpen.png')" />
            </view>
            <touchable-opacity class="editBtn footerBtn" v-if="selectedCard != null" :on-press="editCard">
                <image class="editImg icon" :source="require('./images/icon/gear.png')" />
            </touchable-opacity>
            <view class="editBtn footerBtn disabled" v-else>
                <image class="editImg icon" :source="require('./images/icon/gear.png')" />
            </view>
        </view>
    </view>
</template>

<script>
import statusbar from "./components/statusbar.vue";
import card from "./components/Card.vue"
import { Alert, AsyncStorage } from "react-native";

import axios from "axios";
import store from './store';

export default {
    data() {
        return {
            searchStr: '',
            selectedCard: null,
            searching: false,
            user: "user",

            setId: "",
            setName: "",
            setCategory: "",

            cards: [],

            //Dynamic border colors
            border: []
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

    created() {
        AsyncStorage.getItem("id").then((val) => {
            console.log("Logged in user: " + val);
            this.user = (val == null ? "user" : val);
        });
        AsyncStorage.getItem("selectedSet").then((val) => {
            if (val) {
                var set = JSON.parse(val);
                this.setId = set._id;
                this.setName = set.name;
                this.setCategory = set.category;
                this.search("");
            }
        })
    },

    methods: {
        addCard() {
            this.navigation.navigate("AddCard");
        },
        deleteCard() {
            alert("Under construction");
        },
        editCard() {
            alert("Under construction");
        },
        goBack() {
            this.navigation.goBack();
        },
        search(str) {
            this.selectCard(this.selectedCard);
            this.cards = [];
            this.border = [];
            this.searching = true;

            store.dispatch("searchCards", {
                queryObj: {
                    set_id: this.setId,
                    searchStr: this.searchStr
                }
            });

            setTimeout(() => {
                AsyncStorage.getItem("cardSearch").then((val) => {
                    if (val) {
                        this.cards = JSON.parse(val);
                    }
                    this.searching = false;
                    AsyncStorage.removeItem("cardSearch");
                });
            }, 250);
        },
        selectCard(cardId) {
            //Unhighlights the already selected card.
            if (this.selectedCard == cardId) {
                this.border[cardId] = "black";
                this.selectedCard = null;
            }

            //Highlights the unselected card.
            else {
                if (this.selectedCard != null)
                    this.border[this.selectedCard] = "black";
                this.border[cardId] = "yellow";
                this.selectedCard = cardId;
            }
        }
    }
}
</script>

<style>
.cardText {
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;

    text-align: center;
}

.cardWrapper {
    margin-bottom: 8px;
    margin-left: auto;
    margin-right: auto;

    border-width: 4px;
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