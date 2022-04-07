import { EnvironmentConfg } from '../typings/global';

const config: EnvironmentConfg = {
    appname: process.env.APP_NAME || 'McData',
    environment: process.env.APP_ENV || 'development',
    port: parseInt(process.env.APP_PORT || '3051')
}

export default config;