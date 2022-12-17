import type { Request, Response } from 'express';
import BadgeService from '../services/BadgeService';
import Controller from './Controller';

class BadgeController extends Controller {
  private badgeService: BadgeService = new BadgeService();

  /**
   * Retrieve all available badges
   * @param req Express request
   * @param res Express response
   */
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const badges = await this.badgeService.getAll();
      return res.json({ badges: badges });
    } catch (e: unknown) {
      this.logger.error(e);
      return res.status(500).json({ message: 'Error while resolving request.' });
    }
  }
}

export default BadgeController;
