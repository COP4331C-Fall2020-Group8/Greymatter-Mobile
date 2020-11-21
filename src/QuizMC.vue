<template>
   <view class="container">
      <statusbar/>
      <view v-if="questionNum!=0">
         <text class="resultOfChoice" v-if="correctOrNot">Correct</text>
         <text class="resultOfChoice" v-else>Incorrect</text>
      </view>
      <view v-if="!isFinished" class="questionBox">
         <text>{{ correctAnswer }} </text>
         <text>Question: {{ questionNum + 1 }} of {{ cards.length }}</text>
         <text v-if="cards[questionNum]" class="cardBack">
            {{ cards[questionNum].back }}
         </text>
         <text>Select the Correct Answer</text>
         <touchable-opacity @press="submitAnswer(0)">
            <text>{{ answerList[0] }}</text>
         </touchable-opacity>
         <touchable-opacity @press="submitAnswer(1)">
            <text>{{ answerList[1] }}</text>
         </touchable-opacity>
         <touchable-opacity @press="submitAnswer(2)">
            <text>{{ answerList[2] }}</text>
         </touchable-opacity>
         <touchable-opacity @press="submitAnswer(3)">
            <text>{{ answerList[3] }}</text>
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

export default {
    data() {
        return {
            cards:[
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
            ],
            userAnswer: 0,
            isFinished: false,
            correctOrNot: false,
            correctAnswer: "",
            answerList: [],
            questionNum: 0,
            numCorrect: 0
        }
     },

      mounted () {
         this.answerList = this.shuffleAnswers.slice(0);
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
    answers () {
        var answers = [];
        this.cards.forEach(function(item) {
        var val = item.front;
        answers.push(val);
        });
        return answers;
    },

    getCorrectAnswer () {

        var correctAnswer = this.answers[this.questionNum];
        
        return correctAnswer;
    },

    shuffleAnswers () {
        var randomAnswers = [3];
        var indexes = [this.answers.length];

        // creating an array of possible indexes
        for (var i = 0; i < this.answers.length; i++)
        {
            indexes[i] = i;
        }
        // randomizing those indexes
        indexes.sort(() => Math.random() - 0.5);

        // adding random answers to the array
        for (var i = 0; i < 3; i++)
        {      
            // making sure not to add the correct answer
            if (this.answers[indexes[i]] == this.getCorrectAnswer)
            {
                i--;
                continue;
            }
            else
            {
                randomAnswers[i] = this.answers[indexes[i]];
            }
        }

        // inserts the correct answer into the array
        randomAnswers.push(this.getCorrectAnswer);

        // shuffles the full answer array
        randomAnswers.sort(() => Math.random() - 0.5);

        return randomAnswers;
    },

    // determines the index of the correct answer after it has been shuffled
    getCorrectIndex () {
        var correctIndex = -1;

        for (var i = 0; i < this.shuffleAnswers.length; i++)
        {
            // compares the strings
            if (this.shuffleAnswers[i].localeCompare(this.getCorrectAnswer) == 0)
            {
                correctIndex = i;
            }
        }

        return correctIndex;
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
    submitAnswer(value) {
        console.log(this.getCorrectIndex);
       //console.log(this.shuffleAnswers);
       console.log(value);

       this.answerList = this.shuffleAnswers.slice(0);

        //console.log(this.answerList);

        this.questionNum = this.questionNum + 1;
        
        if(this.questionNum <= this.answers.length)
        {
            if (this.getCorrectIndex == value)
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