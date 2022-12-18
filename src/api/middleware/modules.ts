import { json, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import type HttpServer from '../HttpServer';
import morgan from 'morgan';

const ModulesMiddleware = {
  /**
   * Register modules as middleware
   * @param server HttpServer
   */
  register: (server: HttpServer): void => {
    server.application.use(helmet());
    server.application.use(json());
    server.application.use(urlencoded({ extended: false }));
    server.application.use(
      cors({
        origin: server.options.environment === 'production' ? server.options.url : '*',
        methods: ['GET', 'POST', 'HEAD', 'DELETE', 'PUT']
      })
    );
    server.application.use(
      morgan(server.options.environment === 'production' ? 'short' : 'combined', {
        stream: {
          write: (message: string) => server.emit('incoming', message)
        }
      })
    );
  }
};

export default ModulesMiddleware;
