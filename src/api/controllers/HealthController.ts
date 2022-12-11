import type { Request, Response } from 'express';
import config from '../../constants/config';
import Controller from './Controller';

class HealthController extends Controller {
  /**
   * Index route
   * @param req Express request
   * @param res Express response
   */
  public async index(req: Request, res: Response): Promise<Response> {
    return res.json({
      config: config.name,
      status: 'Operational'
    });
  }
}

export default HealthController;
