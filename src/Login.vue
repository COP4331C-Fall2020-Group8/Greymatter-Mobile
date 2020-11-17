<template>
  <view class="container">
    <statusbar/>
    <image class="logoImage" :source="require('./images/brain.png')"/>
    <text>Login</text>
    <TextInput class="user-input" v-model="usernameInput" hint="Username"/>
    <text>Password</text>
    <TextInput class="user-input" secureTextEntry v-model="passwordInput" hint="Password" secure="true"/>
    <button
      color="black"
      title="Login"
      @press="loginButton"
    />
    <button
      color="black"
      title="Test Login"
      @press="goToUserDashboard"
    />
    <text @press="goToCreateUserScreen">Create Account</text>
  </view>
</template>

<script>
import statusbar from './components/statusbar.vue';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

export default {
  data () {
    return {
      usernameInput: "",
      passwordInput: "",
      isAuthorized: false,
      isLoggedIn: false
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

  methods : {

    goToCreateUserScreen() {
      this.navigation.navigate("CreateUser");
    },

    goToUserDashboard() {
      this.navigation.navigate("Dashboard");
    },

    loginButton() {

      if (this.usernameInput == "" || this.passwordInput == "") {
        alert("Please fill in all required fields.");
      }
      else {
        axios.post('https://grey-matter-backend.herokuapp.com/api/login', {
            _id: this.usernameInput,
            password: this.passwordInput
            })
            .then(function (response) {
              console.log(response);
              var welcomeMsg = JSON.stringify(response.data.message);
              if (welcomeMsg != null) {
                alert(welcomeMsg);
              }
              else {
                alert("Invalid Username");
              }
            })
            .catch(function (error) {
              console.log(error);
          });
          this.navigation.navigate("Dashboard");
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
