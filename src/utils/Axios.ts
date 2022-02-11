import Axios from 'axios';

export const ServerApi = Axios.create({
    baseURL: 'https://api.mcsrvstat.us/2'
});