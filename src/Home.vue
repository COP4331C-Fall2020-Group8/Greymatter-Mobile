<template>
  <view class="homePage">
    <statusbar/>
    <text class="headText">Grey Matter</text>
    <image class="logoImage" :source="require('./images/brain.png')"/>
    <button color="darkblue" class="signUpBtn" title="SIGN UP" @press="goToCreateUserScreen"></button>
    <button color="black" class="signInBtn" title="SIGN IN" @press="goToLoginScreen"></button>
  </view>
</template>

<script>
import statusbar from './components/statusbar.vue';

export default {

    components: {
    statusbar
  },

  props: {
    navigation: {
      type: Object
    }
  },
  
  methods: {
    goToLoginScreen() {
      this.navigation.navigate("Login");
    },
    goToCreateUserScreen() {
      this.navigation.navigate("CreateUser");
    }
  }
}
</script>

<style>
    .homePage {
        justify-content: center;
        align-items: center;
        flex: 1;
        background-color: #D8D8D8;
    }

    .headText {
        font-size: 50;
    }

    .logoImage {
        width: 300;
        height: 300;
    }

    .signUpBtn {
        padding: 20px;
    }

    .signInBtn {
        padding: 20px;
    }
</style>