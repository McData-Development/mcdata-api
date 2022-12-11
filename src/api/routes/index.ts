import type { Request, Response } from 'express';
import type HttpServer from '../HttpServer';
import HealthRoute from './HealthRoute';

/**
 * Initialize routes
 * @param server HttpServer
 */
export const initRoutes = (server: HttpServer): void => {
  server.application.use(`${server.options.prefix}/health`, new HealthRoute(server).router);

  server.application.use('', (req: Request, res: Response): Response => {
    return res.status(404).json({ error: 'UNKNOWN_ENDPOINT', message: 'We could not find any referring endpoint.' });
  });
};
