import type { Request, Response } from 'express';
import config from '../../constants/config';
import Controller from './Controller';

/**
 * Represents actions for the health route.
 * @extends Controller
 */
class HealthController extends Controller {
  /**
   * Index route
   * @param req Express request
   * @param res Express response
   */
  public async index(_: Request, res: Response): Promise<Response> {
    return res.json({
      name: config.name,
      status: 'Operational',
      environment: config.environment
    });
  }
}

export default HealthController;
