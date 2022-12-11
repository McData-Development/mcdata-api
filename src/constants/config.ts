import type { IConfig } from '../types/global.interface';

const config: IConfig = {
  name: process.env.APP_NAME || 'McData-api',
  environment: process.env.APP_ENV === 'production' ? 'production' : 'development',
  port: parseInt(process.env.APP_PORT || '3020'),
  url: process.env.APP_URL || 'https://mcdata.com/'
};

export default config;
