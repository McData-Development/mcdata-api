import { Request, Response, NextFunction } from 'express';
import Controller from './Controller';
import PlayerService from '../services/PlayerService';

/**
 * PlayerController
 * @extends Controller
 */
class PlayerController extends Controller {

    private service: PlayerService = new PlayerService();

    public async history(req: Request, res: Response, next: NextFunction) {
        try {
            let playerHistory = await this.service.history(req.params.player);
            return res.json({ history: playerHistory });
        } catch (e) {
            
        }
    }

}

export default PlayerController;