<script setup>
import { useAuthStore } from '../stores/auth';
let auth = useAuthStore();
</script>
<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma">
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item 
                :active="$route.path === route.path"
                v-for="route in $router.getRoutes().filter(r => r.meta.auto!==false)"
                tag="router-link"
                :to="{ path: route.path }">
                {{ route.name }}
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="div" v-if="!auth.user">
                <div class="buttons">
                    <RouterLink class="button is-primary" to="/register">
                        <strong>Sign up</strong>
                    </RouterLink>
                    <RouterLink class="button is-light" to="/login">
                        Log in
                    </RouterLink>
                </div>
            </b-navbar-item>
            <b-navbar-dropdown :label="auth.user.name" v-else>
                <b-navbar-item href="#">
                    Profile
                </b-navbar-item>
                <b-navbar-item @click="auth.logout()">
                    Logout
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
    </b-navbar>
</template>