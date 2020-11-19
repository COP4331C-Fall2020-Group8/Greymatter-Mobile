<template>
    <view>
       <text 
        class="text-container" v-for="item in questionData" :key="item.questions">
        {{ item.questions }}
    </view>
</template>

<script>
import questionData from "./PreWrittenSets";

export default {

     data() {
        return {
            question: questionData
        }
     }
    
}
</script>