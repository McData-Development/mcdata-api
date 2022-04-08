import { Request, Response, NextFunction } from 'express';
import Controller from './Controller';
import PlayerService from '../services/PlayerService';
import { Player } from '../../../typings/structures';

/**
 * PlayerController
 * @extends Controller
 */
class PlayerController extends Controller {

    private readonly playerService: PlayerService = new PlayerService();

    /**
     * Get player profile
     * @param req Express request
     * @param res Express response
     * @param next Express nextfunction
     */
    public async get(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const player: Player.Profile = await this.playerService.get(req.params.player);
            return res.json({ ...player });
        } catch (e: any) {
            switch (e.message) {
                case 'UNKNOWN_PLAYER':
                    return new this.ApiError('PLAYER_UNKNOWN').send(res);
                default:
                    this.Logger.error(e?.message);
                    return new this.ApiError('PLAYER_FAILED_FETCH').send(res);
            }
        }
    }

    /**
     * Get player history
     * @param req Express request
     * @param res Express response
     * @param next Express nextfunction
     */
    public async history(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const history: Array<Player.History> = await this.playerService.history(req.params.player);
            return res.json({ history: [...history] });
        } catch (e: any) {
            switch (e.message) {
                case 'UNKNOWN_PLAYER':
                    return new this.ApiError('PLAYER_UNKNOWN').send(res);
                default:
                    this.Logger.error(e?.message);
                    return new this.ApiError('PLAYER_FAILED_FETCH').send(res);
            }
        }
    }

    /**
     * Get player skin
     * @param req Express request
     * @param res Express response
     * @param next Express nextfunction
     */
    public async skin(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const skin: Player.Skin = await this.playerService.skin(req.params.player);
            return res.json({ skin: skin });
        } catch (e: any) {
            switch (e.message) {
                case 'UNKNOWN_PlAYER':
                    return new this.ApiError('PLAYER_UNKNOWN').send(res);
                default:
                    this.Logger.error(e?.message);
                    return new this.ApiError('PLAYER_FAILED_FETCH').send(res);
            }
        }
    }

}

export default PlayerController;