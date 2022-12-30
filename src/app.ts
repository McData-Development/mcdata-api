import { config as inserEnv } from 'dotenv';
import HttpServer from './api/HttpServer';
import Logger from './utils/Logger';
import config from './constants/config';

inserEnv();

const server: HttpServer = new HttpServer({ ...config, prefix: '/api' });
const logger: Logger = new Logger('Http');

server.on('ready', (): void => {
  logger.ready(`${config.name} is fully initialized with environment ${config.environment}!`);
});

server.on('debug', (message: string): void => {
  logger.info(message);
});

server.on('incoming', (message: string): void => {
  logger.info(message);
});
