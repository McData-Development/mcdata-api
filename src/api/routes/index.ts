import { Router } from 'express';
import ServerRoute from './ServerRoute';
import PlayerRoute from './PlayerRoute';

/**
 * Initialise the routes
 * @param router Express router
 * @param prefix URL prefix
 */
export const initRoutes = (router: Router, prefix: string): void => {

    router.use(`${prefix}/servers`, new ServerRoute().router);
    router.use(`${prefix}/players`, new PlayerRoute().router);

}