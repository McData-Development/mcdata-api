import { Request, Response, NextFunction } from 'express';
import { ServerDataConfig } from '../../typings/global';
import Controller from './Controller';
import ServerService from '../services/ServerService';
import { ServerModel } from '../../typings/apistructures';

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
    public async get(req: Request, res: Response, next: NextFunction) {
        try {
            let config: ServerDataConfig = {
                port: parseInt(req.query.port as string || '25565')
            }

            let serverData: ServerModel = await this.service.fetch(req.params.serverIp, config);

            return res.json({ ...serverData });
        } catch (e) {
            console.log(e);
        }
    }

}

export default ServerController;