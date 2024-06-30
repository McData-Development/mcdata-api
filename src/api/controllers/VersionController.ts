import { Request, Response } from 'express';
import Controller from './Controller';
import { versions } from '@mcdata/data';

/**
 * Represents actions for the version route.
 * @extends Controller
 */
class VersionController extends Controller {
  /**
   * Index route
   * @param {Request} _ Express request.
   * @param {Response} res Express response.
   * @returns {Promise<Response>}
   */
  public async index(_: Request, res: Response): Promise<Response> {
    return res.json([...versions.data]);
  }
}

export default VersionController;
