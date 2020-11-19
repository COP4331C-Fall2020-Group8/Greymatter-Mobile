<template>
    <view>
        <statusbar/>
        <text class="text-container" 
          v-for="answer in answers" :key="answer.choice">
          {{ answer.choice }}
        </text>
    </view>
</template>

<script>
import statusbar from './components/statusbar.vue';
import axios from 'axios';
import store from './store';

export default {
    data() {
        return {
            card: {
                front: "front test",
                back: "back test"
            },
            answers :  [
              {choice: "right"},
              {choice: "wrong"}
            ]
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
}
</script>