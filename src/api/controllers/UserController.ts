import type { Account, Badge } from '@prisma/client';
import type { Request, Response } from 'express';
import type { IAvailableUserProperties } from 'src/types/user.interface';
import type { UserWithAccountsAndBadges } from '../../types/prisma.interface';
import BadgeService from '../services/BadgeService';
import PlayerService from '../services/PlayerService';
import UserService from '../services/UserService';
import Controller from './Controller';

class UserController extends Controller {
  private userService: UserService = new UserService();
  private playerService: PlayerService = new PlayerService();
  private badgeService: BadgeService = new BadgeService();

  /**
   * Update user
   * @param req Express request
   * @param res Express response
   */
  public async update(req: Request, res: Response) {
    const { userId } = req.params;
    const { badges } = req.body;
    if (!userId) return res.status(400).json({ message: 'Missing required parameters.' });

    let userProperties: IAvailableUserProperties = {};
    const allBadges = await this.badgeService.getAll();

    if (badges) {
      userProperties = {
        ...userProperties,
        badges: {
          connect: allBadges
            .map((badge: Badge) => {
              if (!badges.includes(badge.tag)) return { id: undefined };
              return { id: badge.id };
            })
            .filter((val: { id: string | undefined }) => val.id !== undefined),
          disconnect: allBadges
            .map((badge: Badge) => {
              if (badges.includes(badge.tag)) return { id: undefined };
              return { id: badge.id };
            })
            .filter((val: { id: string | undefined }) => val.id !== undefined)
        }
      };
    }

    try {
      const user = await this.userService.upsert({
        where: { id: userId },
        create: { 
          id: userId,
          badges: {
            connect: userProperties.badges?.connect
          }
        },
        update: {
          ...userProperties
        },
        include: { badges: true }
      });

      return res.json({ ...user });
    } catch (e: unknown) {
      this.logger.error(e);
      return res.status(500).json({ message: 'Error while resolving request.' });
    }
  }

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
            const playerData = await this.playerService.get(account.minecraft_id as string);
            return {
              id: account.id,
              uuid: playerData?.id || 'Unknown',
              username: playerData?.name || 'Unknown',
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
