import { NextFunction, Request, Response, Router } from 'express';
import PlayerRoute from './PlayerRoute';
import ServerRoute from './ServerRoute';
import { VersionConfig } from '../../../typings/global';

/**
 * Initialse routes v1
 * @param router Express router
 * @param prefix URL prefix
 */
export const initRoutesv1 = (router: Router, prefix: string = '/api', version: VersionConfig): void => {
    router.use(`${prefix}/players`, new PlayerRoute().router);
    router.use(`${prefix}/servers`, new ServerRoute().router);

    router.use('', (req: Request, res: Response, next: NextFunction) => {
        return res.status(404).json({
            error: 'UNKNOWN_ENDPOINT',
            message: 'We could not find any referring endpoint.'
        });
    });
}