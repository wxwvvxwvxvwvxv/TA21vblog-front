import { defineStore } from 'pinia';
import api from '../axios.js';

export const useChatStore = defineStore('chat', {
    state: () => {
        return {
            messages: [],
            ws: null,
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
        websocket(){
            if(this.ws){
                return;
            }
            // Create WebSocket connection.
            this.ws = new WebSocket("ws://localhost:8080");

            // Connection opened
            this.ws.addEventListener("open", (event) => {
            //socket.send("Hello Server!");
            });

            // Listen for messages
            this.ws.addEventListener("message", (event) => {
                console.log("Message from server ", event.data);
                this.messages.push(JSON.parse(event.data));
            });
        },
        sendMessage(message){
            api.post('/api/messages', {
                message: message
            }).then(response => {
                this.messages.push(response.data);
                this.ws.send(JSON.stringify(response.data));
            });
        }
    }
});