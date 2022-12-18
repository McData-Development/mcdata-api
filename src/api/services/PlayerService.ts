import { AxiosError } from 'axios';
import type { IPlayerProfile, IPlayerProfileResponse } from '../../types/player.interface';
import Service from './Service';

class PlayerService extends Service {
  constructor() {
    super({ stdTTL: 3600, checkperiod: 4000 });
  }

  /**
   * Get Minecraft player data
   * @param credentials Minecraft player credentials
   */
  public async get(credentials: string): Promise<IPlayerProfile | undefined> {
    const tag = credentials.toLocaleLowerCase().split('-').join('');

    const cachedPlayer = this.cache.get<IPlayerProfile | null>(tag);
    if (cachedPlayer || cachedPlayer === null) return cachedPlayer || undefined;

    console.log(cachedPlayer);

    if (tag.length <= 16) return await this.fetchUUID(tag);

    return await this.fetchUsername(tag);
  }

  /**
   * Fetch UUID with username
   * @param username Minecraft player username
   */
  private async fetchUUID(username: string): Promise<IPlayerProfile> {
    try {
      const { data } = await this.mojangApi.get<IPlayerProfileResponse>(`/users/profiles/minecraft/${username}`);
      this.cache.set<IPlayerProfile>(username, { id: data.id, name: data.name });
      return { id: data.id, name: data.name };
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 404) {
          this.cache.set<undefined>(username, undefined);
          throw new Error('UNKNOWN_PLAYER', { cause: `Could not find a player with this username: ${username}` });
        }
      }

      throw e;
    }
  }

  /**
   * Fetch username with UUID
   * @param uuid Minecraft player UUId
   */
  private async fetchUsername(uuid: string): Promise<IPlayerProfile> {
    try {
      const { data } = await this.mojangSession.get<IPlayerProfileResponse>(`/profile/${uuid}`);
      this.cache.set<IPlayerProfile>(uuid, { id: data.id, name: data.name });
      return { id: data.id, name: data.name };
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 400) {
          this.cache.set<undefined>(uuid, undefined);
          throw new Error('UNKNOWN_PLAYER', { cause: `Could not find a player with this UUID: ${uuid}` });
        }
      }

      throw e;
    }
  }
}

export default PlayerService;
