import { Request, Response } from 'express';
import Controller from './Controller';
import { games } from '@mcdata/data';

/**
 * Represents actions for the game route.
 * @extends Controller
 */
class GameController extends Controller {
  /**
   * Index route
   * @param {Request} _ Express request.
   * @param {Response} res Express response.
   * @returns {Promise<Response>}
   */
  public async index(_: Request, res: Response): Promise<Response> {
    return res.json([...games.data]);
  }
}

export default GameController;
