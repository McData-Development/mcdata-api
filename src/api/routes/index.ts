import { Router } from 'express';
import ServerRoute from './ServerRoute';

/**
 * Initialise the routes
 * @param router Express router
 * @param prefix URL prefix
 */
export const initRoutes = (router: Router, prefix: string): void => {

    router.use(`${prefix}/servers`, new ServerRoute().router);

}