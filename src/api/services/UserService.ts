import type { Prisma } from '@prisma/client';
import Service from './Service';

class UserService extends Service {
  /**
   * Create user if not exists
   * @param options Prisma options
   */
  public async upsert(options: Prisma.UserUpsertArgs) {
    return await this.prisma.user.upsert(options);
  }

  /**
   * Create new user
   * @param options Prisma options
   */
  public async create(options: Prisma.UserCreateArgs) {
    return await this.prisma.user.create(options);
  }

  /**
   * Get an user
   * @param options Prisma options
   */
  public async get(options: Prisma.UserFindFirstArgs) {
    return await this.prisma.user.findFirst(options); 
  }
}

export default UserService;
