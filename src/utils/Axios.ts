import Axios from 'axios';

export const MojangSession = Axios.create({
  baseURL: 'https://sessionserver.mojang.com/session/minecraft'
});

export const MojangApi = Axios.create({
  baseURL: 'https://api.mojang.com'
});
