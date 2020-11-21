<template>
   <view class="container">
      <statusbar/>
      <view v-if="questionNum!=0 && !isFinished">
         <text class="resultOfChoice" v-if="correctOrNot">Correct</text>
         <text class="resultOfChoice" v-else>Incorrect</text>
      </view>
      <view v-if="!isFinished" class="questionBox">
         <text>Question Num: {{ questionNum + 1 }}</text>
         <text v-if="cards[questionNum]" class="cardBack">
            {{ cards[questionNum].back }}
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

export default {
    data() {
        return {
            cards:[
              {front: "1", back: "what is 1"},
              {front: "2", back: "what is 2"},
              {front: "3", back: "what is 3"}
            ],
            //cards: [],
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

  /*created () {
    axios.post('https://grey-matter-backend.herokuapp.com/api/searchCard', {
      set_id: "5fb7220e995f5a00170b919c",
      search: ""
    })
      .then(function (response) {
        this.cards = JSON.stringify(response.data.results.cards);
        //console.log(response.data.results);
        console.log(this.cards);
      })
      .catch(function (error) {
        console.log(error);
      });
  },*/

  computed: {
    // gets all of the possible answers from backs of cards
    answers() {
      var answers = [];
      this.cards.forEach(function(item) {
      var val = item.front;
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
      //console.log(this.userAnswer);
      //console.log(this.answers.length);
      if(this.questionNum <= this.answers.length)
      {
        if (this.cards[this.questionNum - 1].front == this.userAnswer)
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
        //console.log(this.numCorrect);
        this.isFinished = true;
        //console.log(this.isFinished);
      }
      else
      {
        this.userAnswer = "";
      }
    }
  }
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