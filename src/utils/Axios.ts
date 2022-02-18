import Axios from 'axios';

export const ServerApi = Axios.create({
    baseURL: 'https://api.mcsrvstat.us/2'
});

export const MojangApi = Axios.create({
    baseURL: 'https://api.mojang.com'
});