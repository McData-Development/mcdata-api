import type { Request, Response } from 'express';
import PlayerService from '../services/PlayerService';
import Controller from './Controller';

class PlayerController extends Controller {
  private playerService: PlayerService = new PlayerService();

  /**
   * Get player data with UUID or username
   * @param req Express request
   * @param res Express response
   */
  public async get(req: Request, res: Response) {
    const { player: credentials } = req.params;
    if (!credentials) return res.status(400).json({ message: 'Missing required parameters.' });

    try {
      const player = await this.playerService.get(credentials);
      if (!player) throw new Error('UNKNOWN_PLAYER', { cause: `Could not find a player with credentials: ${credentials}` });

      return res.json({ ...player });
    } catch (e: unknown) {
      this.logger.error(e);
      if (e instanceof Error) {
        if (e.message === 'UNKNOWN_PLAYER') return res.status(404).json({ message: e.cause });
      }

      return res.status(500).json({ message: 'Error while resolving request.' });
    }
  }
}

export default PlayerController;
