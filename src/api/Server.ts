import Express, { Application } from 'express';

/**
 * Server
 */
class Server {

    private _app: Application = Express();
    private readonly options = {
        prefix: '/api'
    }

    constructor() {

    }

    /**
     * Get Express application
     */
    public get application(): Application {
        return this._app;
    }

}

export default Server;