import { ConfigType } from '../types/global.types';

const config: ConfigType = {
  name: process.env.APP_NAME || 'McData-api',
  environment:
    process.env.APP_ENV === 'production' ? 'production' : 'development',
  port: parseInt(process.env.APP_PORT || '3020'),
  url: process.env.APP_URL || 'https://mcdata.dev/'
};

export default config;
