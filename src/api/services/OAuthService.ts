import type { Prisma } from '@prisma/client';
import type { ITokenPayload, ITokenResponse, ITokenResponseRaw } from '../../types/auth.interface';
import { McAuthApi } from '../../utils/Axios';
import Service from './Service';

class OAuthService extends Service {
  /**
   * Create new oauth account
   * @param options Prisma options
   */
  public async create(options: Prisma.AccountCreateArgs) {
    return await this.prisma.account.create(options);
  }

  /**
   * Delete oauth accounts
   * @param options Prisma options
   */
  public async delete(options: Prisma.AccountDeleteArgs) {
    return await this.prisma.account.delete(options);
  }

  /**
   * Delete many oauth accounts
   * @param options Prisma options
   */
  public async deleteMany(options: Prisma.AccountDeleteManyArgs) {
    return await this.prisma.account.deleteMany(options);
  }

  /**
   * Update oauth account
   * @param options Prisma options
   */
  public async update(options: Prisma.AccountUpdateArgs) {
    return await this.prisma.account.update(options);
  }
  
  /**
   * Get oauth account
   * @param options Prisma options
   */
  public async get(options: Prisma.AccountFindFirstArgs) {
    return await this.prisma.account.findFirst(options);
  }

  /**
   * Find oauth accounts
   * @param options Prisma options
   */
  public async find(options: Prisma.AccountFindManyArgs) {
    return await this.prisma.account.findMany(options);
  }

  /**
   * Identify code sent from oauth2 application
   * @param payload Token payload
   */
  public async IdentifyCode(payload: ITokenPayload): Promise<ITokenResponse> {
    const { data } = await McAuthApi.post<ITokenResponseRaw>('/oauth2/token', {
      client_id: payload.clientId,
      client_secret: payload.clientSecret,
      code: payload.code,
      redirect_uri: payload.redirectUri,
      grant_type: 'authorization_code'
    });

    return {
      ...data,
      state: JSON.parse(data.state)
    };
  }


}

export default OAuthService;
