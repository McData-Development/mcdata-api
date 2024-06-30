import { Request, Response } from 'express';
import Controller from './Controller';
import { dimensions } from '@mcdata/data';

/**
 * Represents actions for the dimension route.
 * @extends Controller
 */
class DimensionController extends Controller {
  /**
   * Index route
   * @param {Request} _ Express request.
   * @param {Response} res Express response.
   * @returns {Promise<Response>}
   */
  public async index(_: Request, res: Response): Promise<Response> {
    return res.json([...dimensions.data]);
  }
}

export default DimensionController;
