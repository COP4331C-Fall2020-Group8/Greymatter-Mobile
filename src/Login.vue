<template>
  <view class="container">
    <statusbar/>
    <text>Login</text>
    <TextInput class="user-input" v-model="usernameInput" hint="Username"/>
    <text>Password</text>
    <TextInput class="user-input" v-model="passwordInput" hint="Password" secure="true"/>

    <touchable-opacity class="login-btn" :on-press="loginButton">
      <text>Login</text>
    </touchable-opacity>

    <text :on-press="goToCreateUserScreen">Create Account</text>
  </view>
</template>

<script>
import statusbar from './components/statusbar.vue';

export default {
  data () {
    return {
      usernameInput: '',
      passwordInput: '',
    }
  },

  components : {
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

.login-btn {
  background-color: lightblue;
  padding: 5;
}

.user-input {
  background-color:white;
  width: 150;
}
</style>
