<template>
    <view class="container">
        <view class="header">
            <text class="headerText">{{setName}}</text>
        </view>

        <view class="content">
            <view class="addCardView" v-if="pageMode == addMode">
                <text class="configCardHeader">Add a New Card</text>
                <text class="label">Front</text>
                <text-input class="input" v-model="inputCardFront" />
                <text class="label">Back</text>
                <text-input class="input" v-model="inputCardBack" />
                <touchable-opacity class="configButton" :on-press="addCard">
                    <text class="configButtonText">Add New Card</text>
                </touchable-opacity>
            </view>
            <view class="editCardView" v-else-if="pageMode == editMode">
                <text class="configCardHeader">Edit Card</text>
                <text class="label">Front</text>
                <text-input class="input" v-model="inputCardFront" />
                <text class="label">Back</text>
                <text-input class="input" v-model="inputCardBack" />
                <touchable-opacity class="configButton" :on-press="editCard">
                    <text class="configButtonText">Edit Card</text>
                </touchable-opacity>
                <touchable-opacity class="configButton" :on-press="deleteCard">
                    <text class="configButtonText">Delete Card</text>
                </touchable-opacity>
            </view>
            <view v-else>
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
                    <view v-if="searching">
                        <text class="noCards" v-if="searching">Searching for cards...</text>
                    </view>
                    <view v-else>
                        <template v-for="cardObj in cards">
                            <view class="cardWrapper" :key="cardObj._id" :style="{ borderColor: border[cardObj._id] }" :on-press="() => { selectCard(cardObj._id) }">
                                <card
                                    class="card"
                                    :key="cardObj._id"
                                    :style="{ borderColor: border[cardObj._id] }"
                                    :front="cardObj.card.front"
                                    :back="cardObj.card.back"
                                    @flipped="() => { selectCard(cardObj._id) }"
                                />
                            </view>
                        </template>
                    </view>
                </scroll-view>
            </view>
        </view>
        
        <view class="footer">
            <touchable-opacity class="backBtn footerBtn" :on-press="goBack">
                <image class="backImg icon" :source="require('./images/icon/return.png')" />
            </touchable-opacity>
            <touchable-opacity class="openBtn footerBtn" :on-press="() => { configCard(addMode) }">
                <image class="openImg icon" :source="require('./images/icon/plus.png')" />
            </touchable-opacity>
            <touchable-opacity class="editBtn footerBtn" v-if="selectedCard != null" :on-press="() => { configCard(editMode) }">
                <image class="editImg icon" :source="require('./images/icon/gear.png')" />
            </touchable-opacity>
            <view class="editBtn footerBtn disabled" v-else>
                <image class="editImg icon" :source="require('./images/icon/gear.png')" />
            </view>
            <touchable-opacity class="flipBtn footerBtn" v-if="selectedCard != null" :on-press="flipCard">
                <image class="editImg icon" :source="require('./images/icon/open.png')" />
            </touchable-opacity>
            <view class="flipBtn footerBtn disabled" v-else>
                <image class="editImg icon" :source="require('./images/icon/open.png')" />
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

            inputCardFront: "",
            inputCardBack: "",

            pageMode: 0,
            
            searchMode: 0,
            addMode: 1,
            editMode: 2,

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
        //Adds a card to the set.
        addCard() {
            if (this.inputCardFront == "" || this.inputCardFront == "")
                alert("Please fill in all fields.");
            else {
                console.log("Adding card for set " + this.setId);
                store.dispatch("addCard", {
                    cardObj: {
                        user_id: this.user,
                        set_id: this.setId,
                        front: this.inputCardFront,
                        back: this.inputCardBack
                    }
                });
                this.pageMode = this.searchMode;
                this.refresh(true);
            }
        },

        //Takes the user to another section of this page.
        configCard(mode) {
            //Search Mode
            if (mode == this.searchMode) {
                this.pageMode = this.searchMode;
                this.refresh(true);
            }

            //Add Mode
            else if (mode == this.addMode) {
                this.pageMode = mode;
                this.inputCardFront = "";
                this.inputCardBack = "";
            }

            //Edit Mode
            else if (mode == this.editMode && this.selectedCard != null) {
                this.pageMode = mode;
                var selCard = this.getSelectedCard();
                this.inputCardFront = selCard.card.front;
                this.inputCardBack = selCard.card.back;
            }
        },

        //Removes a card from the set.
        deleteCard() {
            if (this.selectedCard != null) {
                Alert.alert(
                    "Confirm Delete",
                    "Are you sure you want to delete this card?",
                    [
                        {
                            text: "Yes",
                            onPress: () => {
                                console.log("Removing card from " + this.setId);
                                store.dispatch("remove", {
                                    deleteObj: {
                                        id: this.selectedCard,
                                        deleteType: "Card"
                                    }
                                });

                                this.pageMode = this.searchMode;
                                this.refresh(false);
                            }
                        },
                        {
                            text: "No"
                        }
                    ]
                );
            }
        },

        //Edits a card in the set.
        editCard() {
            if (this.inputCardFront == "" || this.inputCardBack == "")
                alert("Please fill in all fields.");
            else {
                var selCard = this.getSelectedCard();
                store.dispatch("editCard", {
                    cardObj: {
                        id: selCard._id,
                        front: this.inputCardFront,
                        back: this.inputCardBack
                    }
                });
                this.pageMode = this.searchMode;
                this.refresh(true);
            }
        },

        //Flips the card.
        flipCard() {
            if (this.selectedCard != null) {
            }
        },

        //Gets the currently selected card.
        getSelectedCard() {
            return this.cards.find((cardObj) => { return cardObj._id == this.selectedCard });
        },

        //Goes back to search mode or the view sets page if it is already in search mode.
        goBack() {
            if (this.pageMode == this.searchMode)
                this.navigation.goBack();
            else
                this.configCard(this.searchMode);
        },

        refresh(reselect) {
            if (reselect)
                var temp = this.selectedCard;

            setTimeout(() => {
                this.search(this.searchStr);
                this.inputCardFront = "";
                this.inputCardBack = "";
                if (reselect)
                    this.selectCard(temp);
            }, 250);
        },

        //Searches for cards matching the string.
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

        //Selects a card.
        selectCard(cardId) {
            //Unhighlights the already selected card.
            if (this.selectedCard == cardId) {
                if (cardId != null)
                    this.border[cardId] = "black";
                this.selectedCard = null;

                AsyncStorage.removeItem("selectedCard");
            }

            //Highlights the unselected card.
            else {
                if (this.selectedCard != null)
                    this.border[this.selectedCard] = "black";
                this.selectedCard = cardId;

                if (cardId != null) {
                    this.border[cardId] = "yellow";
                    var selCard = this.getSelectedCard();
                    AsyncStorage.setItem("selectedCard", JSON.stringify(selCard));
                }
            }
        }
    }
}
</script>

<style>
.card {
    margin-bottom: 8px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 8px;

    border-width: 4px;
}

.cardText {
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;

    text-align: center;
}

.cardView {
    margin-bottom: auto;
}

.configButton {
    background-color: lightgrey;
    border-width: 2px;

    padding: 20px;

    margin-top: 8px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 8px;
}

.configButtonText {
    font-size: 24px;
    font-weight: bold;
}

.configCardHeader {
    font-size: 20px;
    font-weight: bold;

    margin-bottom: 4px;
    margin-top: 4px;
}

.container {
    background-color: grey;
    flex: 1;
}

.content{
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
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

.input {
    background-color: white;
    font-size: 14px;
    padding: 4px;
    margin-bottom: 12px;
}

.noCards {
    font-size: 20px;
    text-align: center;
}

.label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
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