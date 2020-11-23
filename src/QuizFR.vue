<template>
   <view class="container">
     <statusbar/>
      <view class="content">
        <image class="logoImage" :source="require('./images/brain.png')"/>

         <view v-if="!isFinished" class="questionBox">
          <view class="result" v-if="questionNum!=0">
            <image class="resultOfChoiceImg" v-if="correctOrNot" :source="require('./images/bl_ch.png')"/>
            <image class="resultOfChoiceImg" v-else :source="require('./images/bl_x.png')"/>
          </view>
            <text class="questionNumTxt">
              Card: {{ questionNum + 1 }}/{{ cards.length }}
            </text>
            <view class="card">
            <text v-if="cards[questionNum]" class="cardText">
               {{ cards[questionNum].card.front }}
            </text>
            </view>
            <TextInput class="user-input" v-model="userAnswer" placeholder="answer"/>
            <touchable-opacity class="answerBtn" @press="submitAnswer()">
              <text class="btnText">SUBMIT</text>
            </touchable-opacity>
         </view>

         <view v-if="isFinished" class="resultsView">
            <text class="resultTxt">Final Score: {{ numCorrect }}/{{ cards.length }}</text>
            <text class="resultTxt">{{  ((Math.round((numCorrect/cards.length) * 100) / 100).toFixed(2)) * 100 }}%</text>
            <text class="resultTxt" v-if="numCorrect/cards.length >= .7">Good Job</text>
            <text class="resultTxt" v-else>Keep Studying</text>
            <touchable-opacity class="backBtn" @press="goBack()">
              <text class="btnText">START OVER</text>
            </touchable-opacity>
         </view>
      </view>

   </view>
</template>

<script>
import statusbar from './components/statusbar.vue';
import axios from 'axios';
import store from './store';
import { Alert, AsyncStorage } from "react-native";
import card from "./components/Card.vue"

export default {
    data() {
        return {
            cards: [],
            userAnswer: "",
            isFinished: false,
            correctOrNot: false,
            questionNum: 0,
            numCorrect: 0
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
            console.log("Logged in user: " + val);
            this.user = (val == null ? "user" : val);
        });
        AsyncStorage.getItem("selectedSet").then((val) => {
            if (val) {
                var set = JSON.parse(val);
                this.setId = set._id;
                this.setName = set.name;
                this.setCategory = set.category;
            }
        })
    },

  computed: {
    // gets all of the possible answers from backs of cards
    answers() {
      var answers = [];
      this.cards.forEach(function(item) {
      var val = item.card.back;
      answers.push(val);
      });

      return answers;
    },

    // should keep the user logged in
    userData () {
            return store.state.userObj;
    }
  },

  methods: {

    goBack () {
      this.navigation.goBack();
    },

    returnToSets () {
      this.navigation.navigate("ViewSets");
    },

    // What happens when user clicks on button
    submitAnswer() {
      this.questionNum = this.questionNum + 1;
      if(this.questionNum <= this.answers.length)
      {
        if (this.cards[this.questionNum - 1].card.back == this.userAnswer)
        {
          this.numCorrect = this.numCorrect + 1;
          this.correctOrNot = true;
          //alert("Correct!");
        }
         else
        {
          this.correctOrNot = false;
          //alert("Incorrect :(");
        }
        //return this.numCorrect;
      }

      // Determines if all questions have been ask
      // If true, we transition to results view
      // If not, clear the text the user entered previously
      if (this.questionNum == this.answers.length)
      {
        this.isFinished = true;
      }
      else
      {
        this.userAnswer = "";
      }
    }
  },
            
  mounted () {
    this.cards = [];
    this.searching = true;

    store.dispatch("searchCards", {
        queryObj: {
            set_id: this.setId,
            searchStr: ""
        }
    })

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
}
</script>

<style>

.logoImage {
  width: 75;
  height: 75;
  margin-left: auto;
  margin-right: auto;
}

.resultOfChoiceImg {
  width: 20;
  height: 20;
}

.card {
    background-color: lightgrey;
    border-style: solid;

    padding-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 8px;

    height: 250px;
    width: 250px;

    margin-bottom: 5px;

    border-width: 2px;
}

.cardText {
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;

    text-align: center;
}

.container {
    background-color: grey;
    flex: 1;
}

  .resultsView {
    font-size: 30;
    font-weight: bold;
  }

  .result {
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }

  .backBtn {
    width: 175;
    height: 75;
    margin: 5px;
    background-color: black;
    padding: 20;
    border-width: 5px;
    align-items: center;
    justify-content: center;
    border-color: lightgray;
    margin-left: auto;
    margin-right: auto;
  }

  .btnText {
    color: lightgray;
    text-align: center;
    font-size: 22px;
  }

  .content  {
     flex: 1;
     justify-content: center;
     align-items: center;
     margin-top: 10px;
     background-color: grey;
     padding: 5px;
  }

   .resultTxt {
    font-size: 30;
    font-weight: bold;
    margin-bottom: 8px;
    margin-left: auto;
    margin-right: auto;
  }

  .questionNumTxt {
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    font-weight: bold;
    font-size: 15;
  }

  .answerBtn {
    width: 175;
    height: 50;
    margin: 5px;
    background-color: black;
    padding: 20;
    border-width: 5px;
    align-items: center;
    justify-content: center;
    border-color: lightgray;
    margin-left: auto;
    margin-right: auto;
  }

  .user-input {
    height: 38px;
    padding: 3px;
    background-color:white;
    margin-left: auto;
    margin-right: auto;
    width: 200;
  }
</style>