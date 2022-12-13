import Axios from 'axios';

export const McAuthApi = Axios.create({
  baseURL: 'https://mc-auth.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip,deflate,compress'
  }
});
