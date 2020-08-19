import axios from 'axios';
import constants from './constants';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

api.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params['api_key'] = constants.MOVIE_DB_API_KEY;
    return config;
});

export default api;