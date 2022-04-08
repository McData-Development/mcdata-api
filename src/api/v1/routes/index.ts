import { Router } from 'express';
import PlayerRoute from './PlayerRoute';
import ServerRoute from './ServerRoute';

/**
 * Initialse routes v1
 * @param router Express router
 * @param prefix URL prefix
 */
export const initRoutesv1 = (router: Router, prefix: string = '/api'): void => {
    router.use(`${prefix}/players`, new PlayerRoute().router);
    router.use(`${prefix}/servers`, new ServerRoute().router);
}