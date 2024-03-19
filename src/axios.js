import axios from 'axios';
export default axios.create({
    withCredentials: true,
    withXSRFToken: true,
    baseURL: 'http://localhost:8000',
});