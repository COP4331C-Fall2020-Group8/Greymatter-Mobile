<template>
    <view class="container">
        <view class="header">
            <text class="headerText">Welcome,</text>
            <text class="headerText">{{user}}!</text>
        </view>

        <view class="content">
            <view class="addSetView" v-if="pageMode == addMode">
                <text class="configSetHeader">Add a New Set</text>
                <text class="label">Name</text>
                <text-input class="input" v-model="inputSetName" />
                <text class="label">Category</text>
                <text-input class="input" v-model="inputSetCategory" />
                <touchable-opacity class="configButton" :on-press="addSet">
                    <text class="configButtonText">Add New Set</text>
                </touchable-opacity>
            </view>
            <view class="editSetView" v-else-if="pageMode == editMode">
                <text class="configSetHeader">Edit Set</text>
                <text class="label">Name</text>
                <text-input class="input" v-model="inputSetName" />
                <text class="label">Category</text>
                <text-input class="input" v-model="inputSetCategory" />
                <touchable-opacity class="configButton" :on-press="editSet">
                    <text class="configButtonText">Edit Set</text>
                </touchable-opacity>
                <touchable-opacity class="configButton" :on-press="deleteSet">
                    <text class="configButtonText">Delete Set</text>
                </touchable-opacity>
            </view>
            <view v-else>
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
        </view>

        <view class="footer">
            <touchable-opacity class="logoutBtn footerBtn" v-if="pageMode == 0" :on-press="logout">
                <image class="logoutImg icon" :source="require('./images/icon/exit.png')" />
            </touchable-opacity>
            <touchable-opacity class="backBtn footerBtn" v-else :on-press="() => { configSet(searchMode) }">
                <image class="backImg icon" :source="require('./images/icon/return.png')" />
            </touchable-opacity>
            <touchable-opacity class="addBtn footerBtn" :on-press="() => { configSet(addMode) }">
                <image class="addBtn icon" :source="require('./images/icon/plus.png')" />
            </touchable-opacity>
            <touchable-opacity class="editBtn footerBtn" v-if="selectedSet != null" :on-press="() => { configSet(editMode) }">
                <image class="openImg icon" :source="require('./images/icon/gear.png')" />
            </touchable-opacity>
            <view class="editBtn footerBtn disabled" v-else>
                <image class="openImg icon" :source="require('./images/icon/gear.png')" />
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

            pageMode: 0, //0 = main, 1 = add, 2 = edit
            inputSetName: "",
            inputSetCategory: "",

            searchMode: 0,
            addMode: 1,
            editMode: 2,

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
            setTimeout(() => {
                this.search("");
            }, 500);
        });
    },

    methods: {
        //Adds a set to the database.
        addSet() {
            if (this.inputSetName == "" || this.inputSetCategory == "")
                alert("Please fill in all fields.");
            else {
                console.log("Adding set " + this.inputSetName);
                store.dispatch("addSet", {
                    setObj: {
                        user_id: this.user,
                        setName: this.inputSetName,
                        setCategory: this.inputSetCategory
                    }
                });
                this.refresh();
            }
        },

        configSet(mode) {
            
            //Sends the user back to search screen if pagemode is the same. Clears input fields if mode itself is 0.
            if (mode == this.searchMode || mode == this.pageMode) {
                this.pageMode = this.searchMode;
                this.refresh();
            }

            //Add Set
            else if (mode == this.addMode) {
                this.pageMode = mode;
                this.selectedSet = null;
                this.inputSetName = "";
                this.inputSetCategory = "";
            }

            //Edit Set
            else if (mode == this.editMode && this.selectedSet != null) {
                this.pageMode = mode;
                var selSet = this.getSelectedSet();
                this.inputSetName = selSet.name;
                this.inputSetCategory = selSet.category;
            }

            //Do nothing if mode not valid
        },

        //Removes a set from the database.
        deleteSet() {
            if (this.selectedSet != null) {
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
                                this.pageMode = 0;
                            }
                        },
                        {
                            text: "No"
                        }
                    ]
                );
            }
        },

        //Edits the set's name and category.
        editSet() {
            if (this.inputSetName == "" || this.inputSetCategory == "")
                alert("Please fill in all fields.");
            else {
                var selSet = this.getSelectedSet();
                store.dispatch("editSet", {
                    setObj: {
                        id: selSet._id,
                        name: selSet.name,
                        category: selSet.category
                    }
                });
                this.refresh();
            }
        },

        getSelectedSet() {
            return this.sets.find((setObj) => { return setObj._id == this.selectedSet });
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

        //Clears out input set fields and does a search.
        refresh() {
            setTimeout(() => {
                this.search(this.searchStr);
                this.inputSetName = "";
                this.inputSetCategory = "";
            }, 250);
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

                AsyncStorage.removeItem("selectedSet");
            }

            //Highlights the unselected set.
            else {
                if (this.selectedSet != null)
                    this.setBorderColor[this.selectedSet] = "black";
                this.setBorderColor[index] = "yellow";
                this.selectedSet = index;

                var selSet = this.sets.find((setObj) => { return setObj._id == index });
                AsyncStorage.setItem("selectedSet", JSON.stringify(selSet));
            }
        },

        //Begins a quiz.
        quizSet() {
            var selSet = this.getSelectedSet();
            if (this.selectedSet != null) {
                if (selSet.num_cards > 4)
                    this.navigation.navigate("QuizFR");
                else
                    alert("You do not have enough cards to quiz yourself with this set.");
            }
        },
        viewSet(num) {
            this.selectedSet = num;
        }
    }
}
</script>

<style>
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

.configSetHeader {
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

.setView {
    margin-bottom: auto;
}
</style>