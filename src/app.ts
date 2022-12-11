import { config as inserEnv } from 'dotenv';
inserEnv();

import HttpServer from './api/HttpServer';
import Logger from './utils/Logger';
import config from './constants/config';

const server: HttpServer = new HttpServer({ ...config, prefix: '/api' });
const logger: Logger = new Logger('Http');

server.on('ready', (): void => {
  logger.ready(`${config.name} (${config.url}) is fully initialized!`);
});

server.on('debug', (message: string): void => {
  logger.info(message);
});
