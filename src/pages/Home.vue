<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { DateTime } from "luxon";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
let posts = ref([]);
axios.get('http://127.0.0.1:8000/api/public').then(response => {
    console.log(response.data);
    posts.value = response.data.data;
    console.log(DateTime.fromISO(posts.value[0].created_at).toRelative());
});


</script>
<template>
    <div class="columns is-multiline">
        <div class="column is-one-quarter" v-for="post in posts">
            <div class="card m-h-100">
                <header class="card-header">
                    <p class="card-header-title">
                        {{ post.title }}
                    </p>
                </header>
                <div class="card-image" v-if="post.images.length === 1">
                    <figure class="image is-4by3">
                        <img :src="post.images[0].path" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-image" v-else-if="post.images.length > 1">
                    <b-carousel :autoplay="false" :indicators="true" indicator-style="is-lines">
                        <b-carousel-item v-for="image in post.images" :key="image.id">
                            <figure class="image is-4by3">
                                <img :src="image.path" alt="Placeholder image">
                            </figure>
                        </b-carousel-item>
                    </b-carousel>
                </div>
                <div class="card-content">
                    <div class="content">
                        {{ post.snippet }}
                        <p class="has-text-weight-semibold has-text-grey">{{ post.user.name }}</p>
                        <p class="has-text-weight-semibold has-text-grey">
                            {{ DateTime.fromISO(post.created_at).toRelative() }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .m-h-100 {
        min-height: 100%;
    }
</style>