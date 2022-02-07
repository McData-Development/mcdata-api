import { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
import { config as insertEnv } from 'dotenv';
insertEnv();

import config from './config';
import Server from './api/Server';
import Logger from './utils/Logger';

const app: Application = new Server().application;
const server: HttpServer = createServer(app);

server.listen(config.port, (): void => {
    Logger.ready(`API is running on port ${config.port}`);
});

server.on('close', (): void => {
    Logger.info('API is closed.'); 
});