import { Request, Response } from 'express';
import Controller from './Controller';
import { effects } from '@mcdata/data';

/**
 * Represents actions for the effect route.
 * @extends Controller
 */
class EffectController extends Controller {
  /**
   * Index route
   * @param {Request} _ Express request.
   * @param {Response} res Express response.
   * @returns {Promise<Response>}
   */
  public async index(_: Request, res: Response): Promise<Response> {
    return res.json([...effects.data]);
  }
}

export default EffectController;
