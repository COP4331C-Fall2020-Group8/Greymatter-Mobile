<template>
  <view class="container">
    <statusbar/>
    <image class="logoImage" :source="require('./images/brain.png')"/>
    <text>Username</text>
    <TextInput class="user-input" v-model="usernameInput" hint="Username" />
    <text>Password</text>
    <TextInput class="user-input" secureTextEntry v-model="passwordInput" hint="Password" />
    <text>Confirm Password</text>
    <TextInput class="user-input" secureTextEntry v-model="confirmPasswordInput" hint="Confirm Password" />
    <text>First Name</text>
    <TextInput class="user-input" v-model="nameInput.first" hint="First Name" />
    <text>Last Name</text>
    <TextInput class="user-input" v-model="nameInput.last" hint="Last Name" />
    <text>E-mail Address</text>
    <TextInput class="user-input" v-model="emailInput" hint="E-mail Address" />
    <button 
      color="black" 
      class="createBtn" 
      title="Go Back" 
      @press="goToHomeScreen"
    />
    <button
      color="black"
      title="Create User"
      @press="createUser"
    />
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
            _id: this.usernameInput,
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



