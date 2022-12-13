import type { Account } from '@prisma/client';
import type { Request, Response } from 'express';
import type { UserWithAccountsAndBadges } from '../../types/prisma.interface';
import PlayerService from '../services/PlayerService';
import UserService from '../services/UserService';
import Controller from './Controller';

class UserController extends Controller {
  private userService: UserService = new UserService();
  private playerService: PlayerService = new PlayerService();

  /**
   * Retrieve user by ID
   * @param req Express request
   * @param res Express response
   */
  public async get(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await this.userService.get({
        where: { id: userId },
        include: { badges: true, accounts: true }
      }) as UserWithAccountsAndBadges | null;

      if (!user) return res.status(400).json({ message: 'Could not find user.' });

      const mappedAccounts = await Promise.all(
        user.accounts
          .filter(account => account.minecraft_id !== null)
          .map(async (account: Account) => {
            const { id, name } = await this.playerService.get(account.minecraft_id as string);
            return {
              id: account.id,
              uuid: id,
              username: name,
              created_at: account.created_at,
              updated_at: account.updated_at
            };
          })
      );

      return res.json({ ...user, accounts: [...mappedAccounts] });
    } catch (e: unknown) {
      this.logger.error(e);
      return res.status(500).json({ message: 'Error while resolving request.' });
    }
  }
}

export default UserController;
