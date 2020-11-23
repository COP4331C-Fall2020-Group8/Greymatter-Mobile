<template>
    <view class="container">
      <statusbar/>
      
      <view class="content">
        <image class="logoImage" :source="require('./images/brain.png')"/>
      <view v-if="questionNum!=0 && !isFinished">
          <image class="resultOfChoiceImg" v-if="correctOrNot" :source="require('./images/bl_ch.png')"/>
          <image class="resultOfChoiceImg" v-else :source="require('./images/bl_x.png')"/>
      </view>
      <view v-if="!isFinished" class="questionBox">
          <text class="questionNumTxt">
           Question: {{ questionNum + 1 }}/{{ cards.length }}
          </text>
          <view class="card">
         <text v-if="cards[questionNum]" class="cardText">
            {{ cards[questionNum].card.front }}
         </text>
          </view>
         <touchable-opacity class="answerBtn" @press="submitAnswer(options[0])">
            <text class="btnText">{{ options[0] }}</text>
         </touchable-opacity>
         <touchable-opacity  class="answerBtn" @press="submitAnswer(options[1])">
            <text class="btnText">{{ options[1] }}</text>
         </touchable-opacity>
         <touchable-opacity class="answerBtn" @press="submitAnswer(options[2])">
            <text class="btnText">{{ options[2] }}</text>
         </touchable-opacity>
         <touchable-opacity class="answerBtn" @press="submitAnswer(options[3])">
            <text class="btnText">{{ options[3] }}</text>
         </touchable-opacity>
      </view>
      <view v-if="isFinished" class="resultsView">
         <text class="resultTxt">Final Score: {{ numCorrect }}/{{ cards.length }} </text>
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
            options: [],
            userAnswer: "",
            isFinished: false,
            correctOrNot: false,
            questionNum: 0,
            numCorrect: 0,
            correctAnswer: ""
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

  mounted () {
    this.cards = [];
    this.searching = true;

    store.dispatch("searchCards", {
      queryObj: {
        set_id: this.setId,
        searchStr: ""
      }
    }).then(()=>{
      AsyncStorage.getItem("cardSearch").then((val) => {
        if (val) {
          this.cards = JSON.parse(val);
          //console.log("yep");
          console.log(this.cards);
          this.answers = this.answersList;
          this.options = this.optionsList;
        }
        this.searching = false;
        AsyncStorage.removeItem("cardSearch");
      });
    })
    .catch((err)=>{
      console.log("An Error Occured Durring Search Cards in Mount")
      console.log(err);
    })
  },

  computed: {
    // gets all of the possible answers from backs of cards
    answersList() {
      var answers = [];
      this.cards.forEach(function(item) {
      var val = item.card.back;
      answers.push(val);
      });

      //console.log(answers);
      return answers;
    },

    getCorrectAnswer () {

        var correctAnswer = this.answers[this.questionNum];
        
        return correctAnswer;
    },

    optionsList() {
      var options = [4];
      options[0] = this.answers[this.questionNum];
      var arr = [];
      while (arr.length < 3) {
          var r = Math.floor(Math.random() * this.answers.length - 1) + 1;

          if (arr.indexOf(r) === -1 && r != this.questionNum) arr.push(r);
      }
      //console.log(arr);
      options[1] = this.answers[arr[0]];
      options[2] = this.answers[arr[1]];
      options[3] = this.answers[arr[2]];

      options.sort(() => Math.random() - 0.5);
      return options;
  },

    // should keep the user logged in
    userData () {
      return store.state.userObj;
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

    goBack () {
      this.navigation.goBack();
    },

    returnToSets () {
      this.navigation.navigate("ViewSets");
    },

    // What happens when user clicks on button
      submitAnswer(value) {
      this.questionNum = this.questionNum + 1;
      this.options = this.optionsList;
      //console.log(this.userAnswer);
      //console.log(this.answers.length);
      if(this.questionNum <= this.answers.length)
      {
        if (this.cards[this.questionNum - 1].card.back == value)
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

   .container {
  background-color: grey;
  flex: 1;
}

  .resultTxt {
    font-size: 30;
    font-weight: bold;
    margin-bottom: 8px;
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

.content{
    margin-left:10px;
    margin-right:10px;
    flex: 1;
    justify-content: center;
    align-items: center;
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

    .questionNumTxt {
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    font-weight: bold;
    font-size: 15;
  }

.answerBtn {
    width: 200;
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
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    text-align: center;
    color: lightgray;
    font-size: 15px;
  }

    .resultsView {
    font-size: 30;
    font-weight: bold;
  }

</style>