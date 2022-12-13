import type { PrismaClient } from '@prisma/client';
import Snowflake from '../../src/utils/Snowflake';
import Seeder from './Seeder';

class BadgeSeeder extends Seeder {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    super('Badge');
    this.prisma = prisma;
  }

  /**
   * Run seeder
   */
  public async run(): Promise<void> {
    try {
      await this.prisma.badge.createMany({
        data: [
          {
            id: Snowflake.generate(),
            level: 1,
            tag: 'dev',
            name: 'Developer',
            description: 'The creator of McData.',
            badge: '<:mc_dev:1046520897709817927>'
          },
          {
            id: Snowflake.generate(),
            level: 2,
            tag: 'vip',
            name: 'VIP',
            description: 'Someone who meant a lot to the development of McData.',
            badge: '<:mc_vip:1046521034221822012>'
          },
          {
            id: Snowflake.generate(),
            level: 3,
            tag: 'mod',
            name: 'Moderator',
            description: 'A moderator on the support server.',
            badge: '<:mc_mod:1046521032980320367>'
          },
          {
            id: Snowflake.generate(),
            level: 4,
            tag: 'donator',
            name: 'Donator',
            description: 'Someone who donated €2,- or more to support the development.',
            badge: '<:mc_donator:1046521029075406960>'
          },
          {
            id: Snowflake.generate(),
            level: 5,
            tag: 'friend',
            name: 'Friend',
            description: '~~The love of my life~~ A friend',
            badge: '<:mc_friend:1046521030627299378>'
          },
        ]
      });
    } catch (e: unknown) {
      this.failed(e as Error);
    }
  }
}

export default BadgeSeeder;
