import { defineStore } from 'pinia';
import api from '../axios.js';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: null
        }
    },
    actions: {
        getUser(){
            api.get('/api/user').then(response => {
                this.user = response.data;
            });
        },
        logout(){
            api.post('/api/logout').then(response => {
                this.user = null;
            });
        }
    }
});