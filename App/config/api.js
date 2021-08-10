import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const api = axios.create({
    baseURL: `http://192.168.1.16:4000/api`
});

api.interceptors.request.use(function(config) {
    const token = AsyncStorage.getItem("token");

    if ( token != null ) {
        const headers = {
            "Authorization": `Bearer ${AsyncStorage.getItem("token")}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        config.headers = headers;
    }

    return config;
}, function (err) {
    console.log(err)
    return Promise.reject(err);
});

export default api ;
