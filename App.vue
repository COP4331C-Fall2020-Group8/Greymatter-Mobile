<template>
   <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
} from "vue-native-router";

import LoginPage from "./src/Login.vue";
import CreateUserPage from "./src/CreateUser.vue";

const StackNavigator = createStackNavigator(
  {
    Login: LoginPage,
    CreateUser: CreateUserPage,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator },
}

</script>
