<template>
    <view class="container">
        <view class="header">
            <text class="headerText">Welcome,</text>
            <text class="headerText">{{user}}!</text>
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
            <scroll-view class="setView">
                <view v-if="searching">
                    <text class="noSets" v-if="searching">Searching for sets...</text>
                </view>
                <view v-else>
                    <template v-for="setObj in sets">
                        <touchable-opacity class="set" :key="setObj._id" :style="{ borderColor: setBorderColor[setObj._id] }" :on-press="() => { selectSet(setObj._id) }">
                            <set
                                :name="setObj.name"
                                :category="setObj.category"
                                :numCards="setObj.num_cards"
                            />
                        </touchable-opacity>
                    </template>
                </view>
            </scroll-view>
        </view>

        <view class="footer">
            <touchable-opacity class="logoutBtn footerBtn" :on-press="logout">
                <image class="logoutImg icon" :source="require('./images/icon/exit.png')" />
            </touchable-opacity>
            <touchable-opacity class="addBtn footerBtn" :on-press="addSet">
                <image class="addBtn icon" :source="require('./images/icon/plus.png')" />
            </touchable-opacity>
            <touchable-opacity class="deleteBtn footerBtn" v-if="selectedSet != null" :on-press="deleteSet">
                <image class="deleteImg icon" :source="require('./images/icon/trashcanOpen.png')" />
            </touchable-opacity>
            <view class="deleteBtn footerBtn disabled" v-else>
                <image class="deleteImg icon" :source="require('./images/icon/trashcanOpen.png')" />
            </view>
            <touchable-opacity class="openBtn footerBtn" v-if="selectedSet != null" :on-press="openSet">
                <image class="openImg icon" :source="require('./images/icon/toolPencil.png')" />
            </touchable-opacity>
            <view class="openBtn footerBtn disabled" v-else>
                <image class="openImg icon" :source="require('./images/icon/toolPencil.png')" />
            </view>
            <touchable-opacity class="quizBtn footerBtn" v-if="selectedSet != null" :on-press="quizSet">
                <image class="quizImg icon" :source="require('./images/icon/exclamation.png')" />
            </touchable-opacity>
            <view class="quizBtn footerBtn disabled" v-else>
                <image class="quizImg icon" :source="require('./images/icon/exclamation.png')" />
            </view>
        </view>
    </view>
</template>

<script>
import statusbar from "./components/statusbar.vue";
import axios from "axios";
import set from "./components/Set.vue";
import { Alert, AsyncStorage, StyleSheet } from "react-native";

import { NavigationActions, StackActions } from 'vue-native-router';
import store from './store';

const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: "Home"})]
                    });

export default {
    data() {
        return {
            searchStr: '',
            selectedSet: null,
            user: "user",
            searching: false,

            sets: [],

            //Dynamic style variables.
            setBorderColor: []
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

    created() {
        AsyncStorage.getItem("id").then((val) => {
            console.log("Logged in user: " + val);
            this.user = (val == null ? "user" : val);
            this.search("");
        });
    },

    methods: {
        //Adds a set to the database.
        addSet() {
            this.navigation.navigate("AddSet");
        },

        //Removes a set from the database.
        deleteSet() {
            if (this.selectedSet != null)
                Alert.alert(
                    "Confirm Delete",
                    "Are you sure you want to delete this set?",
                    [
                        {
                            text: "Yes",
                            onPress: () => {
                                console.log("Removing set " + this.selectedSet);
                                store.dispatch("remove", {
                                    deleteObj: {
                                        id: this.selectedSet,
                                        deleteType: "Set"
                                    }
                                });

                                //Does a search after the delete to refresh the list.
                                this.search(this.searchStr);
                            }
                        },
                        {
                            text: "No"
                        }
                    ]
                );
        },

        //Logs the user out.
        logout() {
            store.dispatch('logout', () => this.navigation.dispatch(resetAction));
        },

        //Opens the set for viewing/editing.
        openSet() {
            if (this.selectedSet != null)
                this.navigation.navigate("ViewIndividualSet");
        },

        //Returns a list of sets based on the search string.
        search(str) {
            this.selectSet(this.selectedSet); //Auto unselects any set.
            this.searching = true;
            this.sets = [];
            this.setBorderColor = [];

            store.dispatch("searchSets", {
                queryObj: {
                    user_id: this.user,
                    searchStr: str
                }
            });
            
            setTimeout(() => {
                AsyncStorage.getItem("setSearch").then((val) => {
                    if (val) {
                        this.sets = JSON.parse(val);
                        for (var i = 0; i < this.sets.length; i++) {
                            this.setBorderColor.push("black");
                        }
                        console.log(this.sets);
                    }
                });
                this.searching = false;
                AsyncStorage.removeItem("setSearch").then(() => {});
            }, 250);
        },

        //Highlights or un-highlights a set when touched.
        selectSet(index) {
            //Unhighlights the already selected set.
            if (this.selectedSet == index) {
                this.setBorderColor[index] = "black";
                this.selectedSet = null;
            }

            //Highlights the unselected set.
            else {
                if (this.selectedSet != null)
                    this.setBorderColor[this.selectedSet] = "black";
                this.setBorderColor[index] = "yellow";
                this.selectedSet = index;
            }
        },

        //
        quizSet() {
            if (this.selectedSet != null) {
                this.navigation.navigate("QuizFR");
            }
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
    margin-left: 10px;
    margin-right: 10px;
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
    font-size: 32px;
    text-align: center;
}

.icon {
    height: 50px;
    width: 50px;
}

.noSets {
    font-size: 20px;
    text-align: center;
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

.set {
    margin-left: auto;
    margin-top: 8px;
    margin-right: auto;
    margin-bottom: 8px;

    border-width: 4px;
}
</style>