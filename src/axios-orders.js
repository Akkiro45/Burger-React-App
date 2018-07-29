import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-e8dee.firebaseio.com/'
});

export default instance;