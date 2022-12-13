import Axios from 'axios';

export const McAuthApi = Axios.create({
  baseURL: 'https://mc-auth.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip,deflate,compress'
  }
});

export const MojangSession = Axios.create({
  baseURL: 'https://sessionserver.mojang.com/session/minecraft'
});

export const MojangApi = Axios.create({
  baseURL: 'https://api.mojang.com'
});
