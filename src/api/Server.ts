import Express, { Application } from 'express';
import versionConfig from '../config/versions';

/**
 * Server
 */
class Server {

    private _app: Application = Express();
    private readonly options = {
        prefix: '/api'
    }

    constructor() {
        for (let i: number = 0; i < versionConfig.length; i++) {
            versionConfig[0].routes(this._app, `${this.options.prefix}/v${versionConfig[0].version}`)
        }
    }

    /**
     * Get Express application
     */
    public get application(): Application {
        return this._app;
    }

}

export default Server;