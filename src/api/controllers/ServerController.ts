import { Request, Response, NextFunction } from 'express';
import Controller from './Controller';
import ServerService from '../services/ServerService';
import { Server } from '../../typings/structures';

/**
 * ServerController
 * @extends Controller
 */
class ServerController extends Controller {

    private readonly serverService: ServerService = new ServerService();

    /**
     * Get server debugging information
     * @param req Express request
     * @param res Express response
     * @param next Express nextfunction
     */
    public async debug(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const debug: Server.Debugging = await this.serverService.debug(req.params.ipaddress, req.query);
            return res.json({ debug: {...debug } });
        } catch (e: any) {
            switch (e.message) {
                case 'UNKNOWN_SERVER':
                    return new this.ApiError('SERVER_UNKNOWN').send(res);
                default:
                    this.Logger.error(e?.message);
                    return new this.ApiError('SERVER_FAILED_FETCH').send(res);
            }
        }
    }

    /**
     * Get server information
     * @param req Express request
     * @param res Express response
     * @param next Express nextfunction
     */
    public async get(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const server: Server.Info | Server.Online = await this.serverService.get(req.params.ipaddress, req.query);
            return res.json({ ...server });
        } catch (e: any) {
            switch (e.message) {
                case 'UNKNOWN_SERVER':
                    return new this.ApiError('SERVER_UNKNOWN').send(res);
                default:
                    this.Logger.error(e?.message);
                    return new this.ApiError('SERVER_FAILED_FETCHED').send(res);
            }
        }
    }

}

export default ServerController;