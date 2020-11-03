<template>
  <view class="construction">
    <statusbar/>
    <text>Username</text>
    <TextInput class="user-input" v-model="usernameInput" hint="Username" />
    <text>Password</text>
    <TextInput class="user-input" v-model="passwordInput" hint="Password" />
    <text>Confirm Password</text>
    <TextInput class="user-input" v-model="confirmPasswordInput" hint="Confirm Password" />
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

export default {
  data () {
    return {
      usernameInput: "",
      passwordInput: "",
      confirmPasswordInput: "",
      emailInput: "",
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
  
  methods: {
    createUser() {
      if (this.usernameInput == "" || this.passwordInput == "" || this.confirmPasswordInput == "" || this.emailInput == "") {
        alert("Please fill in all required fields.");
      }
      else if (this.passwordInput != this.confirmPasswordInput) {
        alert("Passwords do not match.");
      }
      else {
        alert("A new user account has been created.\nYou will now be taken to the home screen.");
        this.navigation.navigate("Home");
      }
    },
    goToHomeScreen() {
      this.navigation.navigate("Home");
    },
  }
}

</script>

<style>
.construction {
    background-color: red;
    align-items: center;
    justify-content: center;
    flex: 1;
}

.user-input {
  background-color: white;
  width: 150;
}
</style>



