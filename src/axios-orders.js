import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burguer-builder-26b3a.firebaseio.com/'
});


export default instance;