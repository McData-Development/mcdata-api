import { PrismaClient } from '@prisma/client';
import BadgeSeeder from './BadgeSeeder';

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
  }

}

new Main()
  .run()
  .catch(console.error);
