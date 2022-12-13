import type { PrismaClient } from '@prisma/client';
import Seeder from './Seeder';

class UserSeeder extends Seeder {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    super('User');
    this.prisma = prisma;
  }

  /**
   * Run seeder
   */
  public async run(): Promise<void> {
    try {
      const badges = await this.prisma.badge.findMany();

      await this.prisma.user.create({
        data: {
          id: '420290428693250049',
          badges: {
            connect: [
              { id: badges.find(val => val.tag === 'dev')?.id },
              { id: badges.find(val => val.tag === 'friend')?.id },
              { id: badges.find(val => val.tag === 'vip')?.id }
            ]
          }
        }
      });
    } catch (e: unknown) {
      this.failed(e as Error);
    }
  }
}

export default UserSeeder;
