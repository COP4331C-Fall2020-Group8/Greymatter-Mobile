<template>
    <view class="container">
        <text class="pageHeader">View your sets!</text>
        <text class="label">Search Sets</text>
        <TextInput class="textFilter" v-model="textfilter" hint="Fiter set name here" />
        <ScrollView>
            <button
                class="set"
                title="Sample Set"
                @press="viewSet"
            />
            <button
                class="set"
                title="Sample Set 2"
                @press="viewSet"
            />
        </ScrollView>
        <button
            class="backBtn"
            title="Go Back"
            @press="goBack"
        />
    </view>
</template>

<script>
import statusbar from "./components/statusbar.vue";

export default {
    data() {
        return {
            textfilter: ''
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
        goBack() {
            this.navigation.goBack();
        },
        viewSet() {
            alert("Under construction");
        }
    }
}
</script>

<style>
.container {
    background-color: grey;
    flex-direction: column;
    flex: 1;
}

.label {
    margin-left: 10px;
}

.pageHeader {
    font-size: 40px;
    text-align: center;
}

.set {
    padding: 10px;
    width: 300px;
    height: 100px;
}

.textFilter {
    background-color: white;
    width: auto;
    margin-left: 10px;
    margin-right: 10px;
}
</style>