import { Request, Response } from 'express';
import Controller from './Controller';
import { colors } from '@mcdata/data';

/**
 * Represents actions for the color route.
 * @extends Controller
 */
class ColorController extends Controller {
  /**
   * Index route
   * @param {Request} _ Express request.
   * @param {Response} res Express response.
   * @returns {Promise<Response>}
   */
  public async index(_: Request, res: Response): Promise<Response> {
    return res.json([...colors.data]);
  }
}

export default ColorController;
