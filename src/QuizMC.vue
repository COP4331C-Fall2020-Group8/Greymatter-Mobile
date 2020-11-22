<template>
    <view class="container">
      <statusbar/>
      <view v-if="questionNum!=0">
         <text class="resultOfChoice" v-if="correctOrNot">Correct</text>
         <text class="resultOfChoice" v-else>Incorrect</text>
      </view>
      <view v-if="!isFinished" class="questionBox">
         <text>Question: {{ questionNum + 1 }}/{{ cards.length }}</text>
         <text v-if="cards[questionNum]" class="cardBack">
            {{ cards[questionNum].card.back }}
         </text>
         <text>Select the Correct Answer</text>
         <touchable-opacity @press="submitAnswer(options[0])">
            <text>{{ options[0] }}</text>
         </touchable-opacity>
         <touchable-opacity @press="submitAnswer(options[1])">
            <text>{{ options[1] }}</text>
         </touchable-opacity>
         <touchable-opacity @press="submitAnswer(options[2])">
            <text>{{ options[2] }}</text>
         </touchable-opacity>
         <touchable-opacity @press="submitAnswer(options[3])">
            <text>{{ options[3] }}</text>
         </touchable-opacity>
      </view>
      <view v-if="isFinished" class="resultsView">
         <text>{{ numCorrect }} </text>
         <button
            color="black"
            title="Return to Sets"
            @press="returnToSets"
            />
      </view>
    </view>
</template>

<script>
import statusbar from './components/statusbar.vue';
import axios from 'axios';
import store from './store';
import { Alert, AsyncStorage } from "react-native";

export default {
    data() {
        return {
            /*cards: [
              {front: "its 1", back: "what is 1"},
              {front: "its 2", back: "what is 2"},
              {front: "its 3", back: "what is 3"},
              {front: "its 4", back: "what is 4"},
              {front: "its 5", back: "what is 5"},
              {front: "its 6", back: "what is 6"},
              {front: "its 7", back: "what is 7"},
              {front: "its 8", back: "what is 8"},
              {front: "its 9", back: "what is 9"},
              {front: "its 10", back: "what is 10"},
              {front: "its 11", back: "what is 11"},
              {front: "its 12", back: "what is 12"}
            ],*/
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
      var val = item.card.front;
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
        if (this.cards[this.questionNum - 1].card.front == value)
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
    .container {
     align-items: center;
    justify-content: center;
    background-color: grey;
    flex: 1;
    }

    .user-input {
      background-color:white;
      width: 150;
    }
</style>