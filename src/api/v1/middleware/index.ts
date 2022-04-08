import { json, urlencoded, NextFunction, Request, Response, Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import ApiError from '../../../utils/ApiError';
import config from '../../../config';

export const ModulesMiddleware = {

    /**
     * Register middleware
     * @param router Express router
     */
    register: (router: Router): void => {
        router.use((req: Request, res: Response, next: NextFunction) => {
            const allowedMethods = ['GET', 'POST', 'OPTIONS', 'DELETE'];
            if (!allowedMethods.includes(req.method)) return new ApiError('METHOD_NOT_ALLOWED').send(res);
            next();
        });

        router.use(helmet());
        router.use(json());
        router.use(urlencoded({ extended: false }));
        router.use(
            morgan(config.environment === 'development' ? 'common' : 'short')
        );
        router.use(
            cors({ origin: '*' })
        );
    }

}