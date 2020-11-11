<template>
   <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
} from "vue-native-router";

import HomePage from "./src/Home.vue";
import LoginPage from "./src/Login.vue";
import CreateUserPage from "./src/CreateUser.vue";
import UserDashboard from "./src/UserDashboard.vue";
import ViewSetsPage from "./src/ViewSets.vue";

const StackNavigator = createStackNavigator(
  {
    Home: HomePage,
    Login: LoginPage,
    CreateUser: CreateUserPage,
    Dashboard: UserDashboard,
    ViewSets: ViewSetsPage
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator },
}

</script>
