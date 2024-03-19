<script setup>
import axios from 'axios';
import { ref } from 'vue';
let joke = ref('');
axios.get('https://api.chucknorris.io/jokes/random').then(response => {
    console.log(response);
    joke.value = response.data.value;
});
</script>
<template>
    <h1>Chuck Norris</h1>
    <h1>{{ joke }}</h1>
</template>