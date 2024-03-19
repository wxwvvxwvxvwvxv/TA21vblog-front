import { defineStore } from 'pinia';
import api from '../axios.js';

export const useChatStore = defineStore('chat', {
    state: () => {
        return {
            messages: [],
        }
    },
    actions: {
        getMessages(){
            let lastMessageTime = "0000-00-00T00:00:00.000000Z"
            if(this.messages.length){
                lastMessageTime = this.messages[this.messages.length-1].created_at;
            }
            api.get('/api/messages', {
                params: {
                    from: lastMessageTime
                }
            }).then(response => {
                this.messages.push(...response.data);
            });
        },
        sendMessage(message){
            api.post('/api/messages', {
                message: message
            }).then(response => {
                this.messages.push(response.data);
            });
        }
    }
});