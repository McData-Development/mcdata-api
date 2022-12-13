import type { PrismaClient as IPrismaClient } from '@prisma/client';
import NodeCache, { Options } from 'node-cache';
import { MojangApi, MojangSession } from '../../utils/Axios';
import PrismaClient from '../../utils/Database';

class Service {
  protected cache: NodeCache;
  protected mojangSession: typeof MojangSession = MojangSession;
  protected mojangApi: typeof MojangApi = MojangApi;

  constructor(options?: Options) {
    this.cache = new NodeCache(options);
  }

  /**
   * Get prisma client
   */
  protected get prisma(): IPrismaClient {
    return PrismaClient;
  }
}

export default Service;
