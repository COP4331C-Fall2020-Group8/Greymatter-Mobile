<template>
    <view class="container">
      <statusbar/>
      <view v-if="!isFinished" class="questionBox">
      <text>Question Num: {{ questionNum + 1 }}</text>
      <text v-if="cards[questionNum]" class="cardFront">
        {{ cards[questionNum].front }}
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
              {front: "question1", back: "1"},
              {front: "question2", back: "2"},
              {front: "question3", back: "3"}
            ],
            userAnswer: "",
            isFinished: false,
            questionNum: 0,
            numCorrect: 0
            //answer: "",
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

  computed: {
    // gets all of the possible answers from backs of cards
    answers() {
      var answers = [];
      this.cards.forEach(function(item) {
      var val = item.back;
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
        if (this.cards[this.questionNum - 1].back == this.userAnswer)
        {
          this.numCorrect = this.numCorrect + 1;
          alert("Correct!");
        }
         else
        {
          alert("Incorrect :(");
        }
        //return this.numCorrect;
      }

      // Determines if all questions have been ask
      // If true, we transition to results view
      // If not, clear the text the user entered previously
      if (this.questionNum == this.answers.length)
      {
        console.log(this.numCorrect);
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