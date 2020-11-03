<template>
  <view class="construction">
    <statusbar/>
    <text>Under Construction</text>
    <button 
      color="black" 
      class="homeBtn" 
      title="GO BACK" 
      @press="goToHomeScreen">
    </button>
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
    goToHomeScreen() {
      this.navigation.navigate("Home");
    },
  }
}

</script>

<style >
.construction {
    background-color: red;
    align-items: center;
    justify-content: center;
    flex: 1;
}
</style>



