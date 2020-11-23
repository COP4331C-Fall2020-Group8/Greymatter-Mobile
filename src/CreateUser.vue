<template>
  <view class="container">
    <statusbar/>
    <image class="logoImage" :source="require('./images/brain.png')"/>
    <TextInput class="user-input" v-model="usernameInput" placeholder="username" />
    <TextInput class="user-input" secureTextEntry v-model="passwordInput" placeholder="password" />
    <TextInput class="user-input" secureTextEntry v-model="confirmPasswordInput" placeholder="re-type password" />
    <TextInput class="user-input" v-model="nameInput.first" placeholder="first name" />
    <TextInput class="user-input" v-model="nameInput.last" placeholder="last name" />
    <TextInput class="user-input" v-model="emailInput" placeholder="e-mail" />
    <touchable-opacity class="signUpBtn" @press="createUser()">
        <text class="btnTextS">SIGN UP</text>
    </touchable-opacity>
    <touchable-opacity class="signInBtn" @press="goToHomeScreen()">
        <text class="btnTextL">GO BACK</text>
    </touchable-opacity>
  </view>
</template>

<script>
import statusbar from './components/statusbar.vue';
import axios from 'axios';

export default {

   data: function() {
    return {
      usernameInput: "",
      passwordInput: "",
      confirmPasswordInput: "",
      nameInput: {
        first: "",
        last: ""
      },
      emailInput: ""
    };
  },

  components: {
    statusbar
  },

  props: {
    navigation: {
      type: Object
    },
  },
  
  methods: {
    createUser() {

      if (this.usernameInput == "" || this.passwordInput == "" || this.confirmPasswordInput == "" || this.emailInput == "") {
        alert("Please fill in all required fields.");
      }
      else if (this.passwordInput != this.confirmPasswordInput) {
        alert("Passwords do not match.");
      }
      else {
         axios.post('https://grey-matter-backend.herokuapp.com/api/register', {
            id: this.usernameInput,
            password: this.passwordInput,
            name: this.nameInput,
            email: this.emailInput
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
          });
          alert("A new user account has been created.\nYou will now be taken to the home screen.");
          this.navigation.navigate("Home");
      }
    },
    goToHomeScreen() {
      this.navigation.navigate("Home");
    },
  },

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
  height: 68;
  margin-top: 6px;
  background-color: black;
  padding: 15;
  border-width: 5px;
  border-color: lightgray;
  justify-content: center;
  }

  .signInBtn {
  width: 250;
  height: 68;
  margin-top: 8px;
  background-color: black;
  padding: 15;
  border-width: 5px;
  border-color: lightgray;
  justify-content: center;
}

.user-input {
  padding: 5px;
  margin: 3px;
  height: 36px;
  background-color:white;
  width: 170;
}
</style>



