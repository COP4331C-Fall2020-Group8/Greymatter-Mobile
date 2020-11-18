<template>
    <view class="container">
        <text class="pageHeader">Test Your Knowledge</text>
        <text>Number of Questions (Max 50):</text>
        <TextInput class="user-input" v-model="numQuestions" hint="numQuestions" />
        <Picker
        :selectedValue="categorySelected"
        :onValueChange="val => {categorySelected = val}"
        >
        <Item label="Choose Category" value="" />
        <Item label="General Knowledge" value="9" />
        <Item label="Books" value="10" />
        <Item label="Film" value="11" />
        <Item label="Music" value="12" />
        <Item label="Musicals and Theatres" value="13" />
        <Item label="Television" value="14" />
        <Item label="Video Games" value="15" />
        <Item label="Board Games" value="16" />
        <Item label="Science and Nature" value="17" />
        <Item label="Computers" value="18" />
        <Item label="Mathematics" value="19" />
        <Item label="Mythology" value="20" />
        <Item label="Sports" value="21" />
        <Item label="Geography" value="22" />
        <Item label="History" value="23" />
        <Item label="Politics" value="24" />
        <Item label="Art" value="25" />
        <Item label="Celebrities" value="26" />
        <Item label="Animals" value="27" />
        <Item label="Vehicles" value="28" />
        <Item label="Comics" value="29" />
        <Item label="Gadgets" value="30" />
        <Item label="Anime and Manga" value="31" />
        <Item label="Cartoons and Animations" value="32" />
        </Picker>
        <Picker
        :selectedValue="difficultySelected"
        :onValueChange="val => {difficultySelected = val}"
        >
        <Item label="Choose Difficulty" value="" />
        <Item label="Easy" value="easy" />
        <Item label="Medium" value="medium" />
        <Item label="Hard" value="hard" />
        </Picker>
        <Picker
        :selectedValue="questionTypeSelected"
        :onValueChange="val => {questionTypeSelected = val}"
        >
        <Item label="Select Question Type" value="" />
        <Item label="Multiple Choice" value="multiple" />
        <Item label="True/False" value="boolean" />
        </Picker>
        <button
            class="confirmBtn"
            title="Confirm Selections"
            @press="confirmSelections"
        />
        <button
            class="backBtn"
            title="Go Back"
            color="black"
            @press="goBack"
        />
    </view>
</template>

<script>
import statusbar from "./components/statusbar.vue";
import React from 'react';
import { Picker } from 'react-native';
import axios from 'axios';

export default {
    data() {
        return {
            numQuestions: "",
            categorySelected: "",
            difficultySelected: "",
            questionTypeSelected: "",
        }
    },

    components: {
        statusbar,
        Picker, 
        Item: Picker.Item
    },

    props: {
        navigation: {
            type: Object
        }
    },

    methods: {
        confirmSelections () {
            axios.get('https://opentdb.com/api.php?amount=' 
                + this.numQuestions + '&category=' + this.categorySelected
                + '&difficulty=' + this.difficultySelected + 
                '&type=' + this.questionTypeSelected, {
            })
            .then(function (response) {
              console.log(response);
              var dataReturned = JSON.stringify(response.results);
              alert(response.results.category);
            })
            .catch(function (error) {
              console.log(error);
          });
        },

        goBack() {
            this.navigation.goBack();
        },
    }
}
</script>

<style>
.container {
    background-color: grey;
    flex-direction: column;
    flex: 1;
}

.label {
    margin-left: 10px;
}

.user-input {
    background-color: white;
    padding: 5;
}

.pageHeader {
    font-size: 40px;
    text-align: center;
}

.set {
    padding: 10px;
    width: 300px;
    height: 100px;
}

.textFilter {
    background-color: white;
    width: auto;
    margin-left: 10px;
    margin-right: 10px;
}
</style>