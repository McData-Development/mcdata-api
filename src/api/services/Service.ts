import type { PrismaClient as IPrismaClient } from '@prisma/client';
import PrismaClient from '../../utils/Database';

class Service {
  /**
   * Get prisma client
   */
  protected get prisma(): IPrismaClient {
    return PrismaClient;
  }
}

export default Service;
