<script setup>
import api from '../axios.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
let email = ref('');
let password = ref('');
let router = useRouter();
let auth = useAuthStore();

// // Login...
// api.get('/api/user').then(response => {
//                 // Login...
// });

function login() {
    api.get('/sanctum/csrf-cookie').then(response => {
        api.post('/api/login', {
            email: email.value,
            password: password.value,
            remember: true
        }).then(response => {
            console.log(response);
            auth.getUser();
            router.push('/');
        });
    });
}
</script>
<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-5-tablet is-6-desktop is-6-widescreen">
                <form action="" class="box">
                    <div class="field">
                        <label for="" class="label">Email</label>
                        <div class="control has-icons-left">
                            <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" required
                                v-model="email">
                            <span class="icon is-small is-left">
                                <i class="fa fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div class="field">
                        <label for="" class="label">Password</label>
                        <div class="control has-icons-left">
                            <input type="password" placeholder="*******" class="input" required v-model="password">
                            <span class="icon is-small is-left">
                                <i class="fa fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <div class="field">
                        <label for="" class="checkbox">
                            <input type="checkbox">
                            Remember me
                        </label>
                    </div>
                    <div class="field">
                        <button class="button is-success" @click.prevent="login()">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style scoped></style>