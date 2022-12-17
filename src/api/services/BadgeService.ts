import type { Prisma } from '@prisma/client';
import Service from './Service';

class BadgeService extends Service {
  /**
   * Get all badges
   * @param options Prisma options
   */
  public async getAll(options?: Prisma.BadgeFindManyArgs) {
    return this.prisma.badge.findMany(options);
  }
}

export default BadgeService;
