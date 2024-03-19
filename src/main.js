import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Buefy from '@ntohq/buefy-next';
import '@ntohq/buefy-next/dist/buefy.css';
import { createPinia } from 'pinia';

import Home from './pages/Home.vue';
import About from './pages/About.vue';
import Chuck from './pages/Chuck.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Chat from './pages/Chat.vue';
const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/about', component: About, name: 'About' },
    { path: '/chuck', component: Chuck, name: 'Chuck Norris' },
    { path: '/chat', component: Chat, name: 'Chat' },
    { path: '/login', component: Login, name: 'Login',  meta: { auto: false } },
    { path: '/register', component: Register, name: 'Register',  meta: { auto: false } },
];

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

const pinia = createPinia();


const app = createApp(App);
app.use(router);
app.use(Buefy, {
    defaultIconPack: 'fas',
});
app.use(pinia);
app.mount('#app');
