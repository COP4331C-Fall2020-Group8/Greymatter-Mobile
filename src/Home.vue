<template>
<view class="container">
  <view class="homePage">
    <statusbar/>
    <text class="headText">Grey Matter</text>
    <image class="logoImage" :source="require('./images/brain.png')"/>
    <touchable-opacity class="signUpBtn" @press="goToCreateUserScreen()">
        <text class="btnText">CREATE ACCOUNT</text>
    </touchable-opacity>
     <touchable-opacity class="signInBtn" @press="goToLoginScreen()">
        <text class="btnText">SIGN IN</text>
    </touchable-opacity>
  </view>
</view>
</template>

<script>
import statusbar from './components/statusbar.vue';
import ViewSet from './ViewSet.vue';

export default {

    components: {
    statusbar,
        ViewSet
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
    .container{
      justify-content: center;
      flex: 1;
      padding: 0;
      background-color: darkslategrey;
    }
    .homePage {
        justify-content: center;
        align-items: center;
        flex: 2;
        background-color: grey;
    }

    .headText {
        font-size: 70;
        color: 	#131313;
    }

    .logoImage {
        width: 340;
        height: 340;
    }

    .btnText {
      color: lightgray;
      text-align: center;
      font-size: 25px;
    }

    .signUpBtn {
      width: 300;
      height: 100;
      margin-top: 20;
      background-color: black;
      padding: 15;
      border-width: 5px;
      border-color: lightgray;
      justify-content: center;
    }

    .signInBtn {
      width: 300;
      height: 100;
      margin-top: 20;
      background-color: black;
      padding: 15;
      border-width: 5px;
      border-color: lightgray;
      justify-content: center;
    }
</style>