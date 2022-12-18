import type { IConfig } from '../types/global.interface';

const config: IConfig = {
  name: process.env.APP_NAME || 'McData-api',
  environment: process.env.APP_ENV === 'production' ? 'production' : 'development',
  port: parseInt(process.env.APP_PORT || '3020'),
  url: process.env.APP_URL || 'https://mcdata.com/',
  apiKey: process.env.API_KEY || '',
  mcauth: {
    clientId: process.env.MCAUTH_ID || '1234',
    clientSecret: process.env.MCAUTH_SECRET || '****',
    redirectUri: process.env.MCAUTH_REDIRECT || 'http://localhost:3020/api/auth/oauth/callback'
  }
};

export default config;
