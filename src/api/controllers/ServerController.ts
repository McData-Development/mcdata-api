import { Request, Response, NextFunction } from 'express';
import Controller from './Controller';
import ServerService from '../services/ServerService';
import { ServerModel } from '../../typings/apistructures';
import { ServerDataConfig } from '../../typings/global';

/**
 * ServiceController
 * @extends Controller
 */
class ServerController extends Controller {

    private service: ServerService = new ServerService();

    /**
     * Get server data
     * @param req Express request
     * @param res Express response
     * @param next Express nextfunction
     */
    public async get(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            let config: ServerDataConfig = {
                port: parseInt(req.query.port as string || '25565')
            }

            let serverData: ServerModel = await this.service.fetch(req.params.serverIp, config);
            return res.json({ ...serverData });
        } catch (e: any) {
            switch (e.message) {
                case 'UNKNOWN_SERVER':
                    return new this.ApiError('UNKNOWN_SERVER').send(res);
                default:
                    return new this.ApiError('FAILED_FETCH_SERVER').send(res);
            }
        }
    }

}

export default ServerController;