<template>
   <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
} from "vue-native-router";
import Vue from "vue-native-core";
import { VueNativeBase } from "native-base";

// registering all native-base components to the global scope of the Vue
Vue.use(VueNativeBase);

import HomePage from "./src/Home.vue";
import LoginPage from "./src/Login.vue";
import CreateUserPage from "./src/CreateUser.vue";
import UserDashboard from "./src/UserDashboard.vue";
import ViewIndividualSetPage from "./src/ViewSet.vue";
import ViewSetsPage from "./src/ViewSets.vue";
import AddSetPage from "./src/AddSet.vue";
import AddCardPage from "./src/AddCard.vue";
import QuizFRPage from "./src/QuizFR.vue";
import QuizMCPage from "./src/QuizMC.vue";
//import PreWrittenSetsPage from "./src/PreWrittenSets.vue";
//import PreWrittenCardPage from "./src/PreWrittenCard.vue";

const StackNavigator = createStackNavigator(
  {
    Home: HomePage,
    Login: LoginPage,
    CreateUser: CreateUserPage,
    Dashboard: UserDashboard,
    ViewIndividualSet: ViewIndividualSetPage,
    ViewSets: ViewSetsPage,
    AddSet: AddSetPage,
    AddCard: AddCardPage,
    QuizFR: QuizFRPage,
    QuizMC: QuizMCPage,
    //PreWrittenSets: PreWrittenSetsPage,
    //PreWrittenCard: PreWrittenCardPage,
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
