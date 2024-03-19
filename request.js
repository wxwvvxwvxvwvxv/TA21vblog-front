import axios from 'axios';

axios.get('https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_XMLHttpRequest').then(response => {
    console.log(response.data);
});