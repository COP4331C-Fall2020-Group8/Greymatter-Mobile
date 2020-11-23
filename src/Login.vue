<template>
  <view class="container">
    <statusbar/>
    <image class="logoImage" :source="require('./images/brain.png')"/>
    <TextInput class="user-input" v-model="id" placeholder="username"/>
    <TextInput class="user-input" secureTextEntry v-model="password" placeholder="password" secure="true"/>
    <touchable-opacity class="signInBtn" @press="loginButton()">
        <text class="btnTextL">LOGIN</text>
    </touchable-opacity>
     <touchable-opacity class="signUpBtn" @press="goToCreateUserScreen()">
        <text class="btnTextS">CREATE ACCOUNT</text>
    </touchable-opacity>
  </view>
</template>

<script>
import statusbar from './components/statusbar.vue';
import axios from 'axios';
import { Dimensions, Platform, AsyncStorage } from "react-native";
import store from './store';
import ViewSet from './ViewSet.vue';

export default {
  data () {
    return {
      id: "",
      password: "",
      loaded: false
    }
  },

  computed: {
    logging_in () {
      return store.state.logging_in;
    }
  },

  components: {
    statusbar,
    ViewSet
  },

  props: {
    navigation: {
      type: Object
    }
  },

  created() {
    AsyncStorage.getItem("id").then((val) => {
      if (val) {
        this.loaded = true
        this.navigation.navigate("ViewSets")
        store.dispatch('SET_USER', {userObj: {id: val}})
      } else {
        this.loaded = true
      }
    })
  },

  methods : {

    goToCreateUserScreen() {
      this.navigation.navigate("CreateUser");
    },

    testLogin() {
      this.navigation.navigate("ViewSets");
    },

    loginButton() {
      if (this.id == "" || this.password == "") {
        alert("Please fill in all required fields.");
      }
      else {
          store.dispatch('login', {
          userObj: {id: this.id, password: this.password},
          navigate: this.navigation.navigate
        });
      }
    }
  }

}
</script>

<style>
.logoImage {
  width: 250;
  height: 250;
}

.container {
  align-items: center;
  justify-content: center;
  background-color: grey;
  flex: 1;
}

 .btnTextL {
    color: lightgray;
    text-align: center;
    font-size: 22px;
  }

   .btnTextS {
    color: lightgray;
    text-align: center;
    font-size: 22px;
  }

.signUpBtn {
  width: 250;
  height: 75;
  margin-top: 10;
  background-color: black;
  padding: 15;
  border-width: 5px;
  border-color: lightgray;
  justify-content: center;
  }

  .signInBtn {
  width: 250;
  height: 75;
  margin-top: 20;
  background-color: black;
  padding: 15;
  border-width: 5px;
  border-color: lightgray;
  justify-content: center;
}

.user-input {
  padding: 5px;
  margin: 3px;
  height: 38px;
  background-color:white;
  width: 170;
}
</style>
