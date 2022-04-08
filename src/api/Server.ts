import Express, { Application } from 'express';
import versionConfig from '../config/versions';
import { VersionConfig, VersionRoutes } from '../typings/global';

/**
 * Server
 */
class Server {

    private _app: Application = Express();
    private readonly options = {
        prefix: '/api'
    }

    constructor() {
        versionConfig.forEach((version: VersionConfig & VersionRoutes): void => {
            version.routes(
                this._app,
                `${this.options.prefix}/v${version.version}`,
                {
                    active: version.active,
                    status: version.status,
                    version: version.version
                }
            );
        });
    }

    /**
     * Get Express application
     */
    public get application(): Application {
        return this._app;
    }

}

export default Server;