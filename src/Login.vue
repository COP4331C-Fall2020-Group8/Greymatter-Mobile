<template>
  <view class="container">
    <statusbar/>
    <image class="logoImage" :source="require('./images/brain.png')"/>
    <text>Login</text>
    <TextInput class="user-input" v-model="id" hint="Username"/>
    <text>Password</text>
    <TextInput class="user-input" secureTextEntry v-model="password" hint="Password" secure="true"/>
    <button
      color="black"
      title="Login"
      @press="loginButton"
    />
    <button
      color="black"
      title="Test Login"
      @press="testLogin"
    />
    <text @press="goToCreateUserScreen">Create Account</text>
  </view>
</template>

<script>
import statusbar from './components/statusbar.vue';
import axios from 'axios';
import { Dimensions, Platform, AsyncStorage } from "react-native";
import store from './store';

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
    statusbar
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
  width: 200;
  height: 200;
}

.container {
  align-items: center;
  justify-content: center;
  background-color: grey;
  flex: 1;
}

.login-btn {
  background-color: lightblue;
  padding: 5;
}

.user-input {
  background-color:white;
  width: 150;
}
</style>
