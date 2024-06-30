import { Request, Response } from 'express';
import Controller from './Controller';
import { alphabet } from '@mcdata/data';

/**
 * Represents actions for the biome route.
 * @extends Controller
 */
class AlphabetController extends Controller {
  /**
   * Index route
   * @param {Request} _ Express request.
   * @param {Response} res Express response.
   * @returns {Promise<Response>}
   */
  public async index(_: Request, res: Response): Promise<Response> {
    return res.json([...alphabet.data]);
  }
}

export default AlphabetController;
