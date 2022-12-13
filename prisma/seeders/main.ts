import { PrismaClient } from '@prisma/client';
import BadgeSeeder from './BadgeSeeder';
import UserSeeder from './UserSeeder';

/**
 * Main
 */
class Main {
  private readonly prisma: PrismaClient = new PrismaClient();

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Run all seeders
   */
  public async run(): Promise<void> {
    await new BadgeSeeder(this.prisma).run();
    await new UserSeeder(this.prisma).run();
  }

}

new Main()
  .run()
  .catch(console.error);
