<template>
  <view class="construction">
    <statusbar/>
    <text>Under Construction</text>
  </view>
</template>

<script>
import statusbar from './components/statusbar.vue';

export default {
  
}

components : {
    statusbar
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



