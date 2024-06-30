import { Request, Response } from 'express';
import Controller from './Controller';
import { armor } from '@mcdata/data';

/**
 * Represents actions for the biome route.
 * @extends Controller
 */
class ArmorController extends Controller {
  /**
   * Index route
   * @param {Request} _ Express request.
   * @param {Response} res Express response.
   * @returns {Promise<Response>}
   */
  public async index(_: Request, res: Response): Promise<Response> {
    return res.json([...armor.data]);
  }
}

export default ArmorController;
