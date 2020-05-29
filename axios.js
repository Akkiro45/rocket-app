import axios from 'axios';

// const baseURLLocal = 'http://192.168.43.172:4000';
const baseURLLocal = 'http://192.168.43.45:4000';
const baseURLHeroku = 'https://cryptic-castle-95582.herokuapp.com';

const instance = axios.create({
  baseURL: baseURLHeroku
});

export default instance;