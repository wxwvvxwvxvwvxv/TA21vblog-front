<script setup>
import api from '../axios.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
let email = ref('');
let password = ref('');
let name = ref('');
let passwordConfirmation = ref('');
let router = useRouter();
let auth = useAuthStore();
let errors = ref({
    email: [],
    password: [],
    name: [],
    password_confirmation: []
});
// // Login...
// api.get('/api/user').then(response => {
//                 // Login...
// });

function register() {
    let form = document.querySelector('form');
    if(form.reportValidity()){
        api.get('/sanctum/csrf-cookie').then(response => {
            api.post('/api/register', {
                email: email.value,
                password: password.value,
                name: name.value,
                password_confirmation: passwordConfirmation.value
            }).then(response => {
                console.log(response);
                auth.getUser();
                router.push('/');
            }).catch(error => {
                console.log(error);
                errors.value = {...errors.value, ...error.response.data.errors};
            });
        });
    }
}
</script>
<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-5-tablet is-6-desktop is-6-widescreen">
                <form action="" class="box">
                    <b-field label="Name" :type="errors.name.length ? 'is-danger': ''" :message="errors.name[0]">
                        <b-input type="text" placeholder="John Doe" required v-model="name" icon="user">
                        </b-input>
                      
                    </b-field>
                    <b-field label="Email" :type="errors.email.length ? 'is-danger': ''"  :message="errors.email[0]">
                        <b-input type="email"  placeholder="e.g. bobsmith@gmail.com" required v-model="email"
                            icon="envelope">
                        </b-input>

                    </b-field>
                    <b-field label="Password" :type="errors.password.length ? 'is-danger': ''" :message="errors.password[0]">
                        <b-input type="password" placeholder="*******" required v-model="password" icon="lock">
                        </b-input>

                    </b-field>
                    <b-field label="Password Confirm" :type="errors.password_confirmation.length ? 'is-danger': ''" :message="errors.password_confirmation[0]">
                        <b-input type="password" placeholder="*******" required v-model="passwordConfirmation" icon="lock">
                        </b-input>

                    </b-field>
                    <div class="field">
                        <button class="button is-success" @click.prevent="register()">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style scoped></style>