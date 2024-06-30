import { config as inserEnv } from 'dotenv';
inserEnv();

import HalloLogger from 'hallo-logger';
import HttpServer from './api/HttpServer';
import config from './constants/config';

const startTime = Date.now();

const server: HttpServer = new HttpServer({ ...config, prefix: '' });
const logger: HalloLogger = new HalloLogger();

server.on('ready', (): void => {
  HalloLogger.appReady(startTime, {
    name: config.name,
    environment: config.environment,
    port: `:${config.port}`
  });
});

server.on('debug', (message: string): void => {
  logger.info(message);
});

server.on('incoming', (message: string): void => {
  logger.info(message);
});
