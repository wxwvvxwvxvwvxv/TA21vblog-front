<script setup>
import { ref, computed } from 'vue';
import { useChatStore } from '../stores/chat';
import { useAuthStore } from '../stores/auth';
let message = ref('');
let chat = useChatStore();
let auth = useAuthStore();
const sleep = ms => new Promise(r => setTimeout(r, ms));
chat.getMessages();
chat.websocket();

function send(){
    if(message.value.trim() !== ''){
        chat.sendMessage(message.value.trim());
    }
    message.value = '';
}
let reversed = computed(() => {
    return JSON.parse(JSON.stringify(chat.messages)).reverse();
})
</script>
<template>
        <b-field message="Write a message">
            <b-input expanded v-model="message">          
               
            </b-input>
            <p class="control">
                <b-button type="is-primary" label="Send" @click="send" />
            </p>
        </b-field>
        <b-message v-for="msg in reversed" :class="{'is-primary': msg.user.id === auth.user.id}">
            {{ msg.message }}
            <p>{{ msg.user.name }}</p>
        </b-message>

</template>