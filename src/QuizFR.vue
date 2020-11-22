<template>
   <view class="container">
      <statusbar/>
      <view v-if="questionNum!=0 && !isFinished">
         <text class="resultOfChoice" v-if="correctOrNot">Correct</text>
         <text class="resultOfChoice" v-else>Incorrect</text>
      </view>
      <view v-if="!isFinished" class="questionBox">
         <text>Question Num: {{ questionNum + 1 }}/{{ cards.length }}</text>
         <text v-if="cards[questionNum]" class="cardBack">
            {{ cards[questionNum].card.back }}
         </text>
         <text>Type Your Answer</text>
         <TextInput class="user-input" v-model="userAnswer" hint="Answer"/>
         <button
            color="black"
            title="Check Answer"
            @press="submitAnswer"
            />
      </view>
      <view v-if="isFinished" class="resultsView">
         <text>{{ numCorrect}} </text>
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
            /*cards:[
              {front: "1", back: "what is 1"},
              {front: "2", back: "what is 2"},
              {front: "3", back: "what is 3"}
            ],*/
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
      var val = item.card.front;
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

    returnToSets () {
      this.navigation.navigate("ViewSets");
    },

    // What happens when user clicks on button
    submitAnswer() {
      this.questionNum = this.questionNum + 1;
      if(this.questionNum <= this.answers.length)
      {
        if (this.cards[this.questionNum - 1].card.front == this.userAnswer)
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