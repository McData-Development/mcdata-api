import Express, { Application, NextFunction, Request, Response } from 'express';
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
        this._app.get(`${this.options.prefix}`, (req: Request, res: Response): Response => {
            return res.json({
                name: 'McData API',
                description: 'This API provides endpoints for requesting different type of Minecraft information.',
                author: 'McData',
                versions: versionConfig.map((version: VersionConfig & VersionRoutes) => {
                    return { version: `v${version.version}`, status: version.status, support: version.support };
                })
            });
        });

        versionConfig.forEach((version: VersionConfig & VersionRoutes): void => {
            if (version.active) {
                version.routes(
                    this._app,
                    `${this.options.prefix}/v${version.version}`
                );
            }
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