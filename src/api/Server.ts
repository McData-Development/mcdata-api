import Express, { Application } from 'express';
import { initRoutes } from './routes';

/**
 * Server
 */
class Server {

    private _app: Application = Express();
    private readonly options = {
        prefix: '/api'
    }

    constructor() {
        initRoutes(this._app, '/api');
    }

    /**
     * Get Express application
     */
    public get application(): Application {
        return this._app;
    }

}

export default Server;