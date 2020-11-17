<template>
  <view class="container">
    <text class="welcomeText">Welcome User!</text>
    <button
    class="logoutBtn"
    title="Logout"
    @press="userLogout"
    />
    <button
    class="createSetBtn"
    title="Create New Set"
    @press="createSet"
    />
    <button
    class="viewSetBtn"
    title="View Your Sets"
    @press="viewSets"
    />
    <button
    class="preWrittenBtn"
    title="Test Your Knowledge!"
    @press="preWrittenSets"
    />
    <text class="titleText">Grey Matter</text>
    <image class="logoImage" :source="require('./images/brain.png')"/>
    <button 
      color="black" 
      class="homeBtn" 
      title="Return Home" 
      @press="goToHomeScreen"
    />
  </view>
</template>

<script>
import statusbar from './components/statusbar.vue';

export default {

    components: {
        statusbar
    },

    props: {
        navigation: {
        type: Object
        }
    },


    methods: {
        createSet() {
            alert("Under construction!");
        },

        goToHomeScreen() {
            this.navigation.navigate("Home");
        },

        preWrittenSets() {
            this.navigation.navigate("PreWrittenSets");
        },

        viewSets() {
            this.navigation.navigate("ViewSets");
        }
    }
}
</script>

<style>
.container {
    flex-direction: column;
    flex: 1;
}

.welcomeText {
    font-size: 40px;
    padding: 10;
}

.logoImage {
    width: 50;
    height: 50;
}
</style>