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
  public async get(credentials: string): Promise<IPlayerProfile> {
    const tag = credentials.toLocaleLowerCase().split('-').join('');

    const cachedPlayer = this.cache.get<IPlayerProfile>(tag);
    if (cachedPlayer) return cachedPlayer;

    if (tag.length <= 16) {
      const player = await this.fetchUUID(tag);
      this.cache.set<IPlayerProfile>(tag, { ...player });
      return player;
    }

    const player = await this.fetchUsername(tag);
    this.cache.set(tag, { ...player });
    return player;
  }

  /**
   * Fetch UUID with username
   * @param username Minecraft player username
   */
  private async fetchUUID(username: string): Promise<IPlayerProfile> {
    const { data, status } = await this.mojangApi.get<IPlayerProfileResponse>(`/users/profiles/minecraft/${username}`);
    if (status === 404) throw new Error(`Could not find a player with this username: ${username}`);

    return { id: data.id, name: data.name };
  }

  /**
   * Fetch username with UUID
   * @param uuid Minecraft player UUId
   */
  private async fetchUsername(uuid: string): Promise<IPlayerProfile> {
    const { data, status } = await this.mojangSession.get<IPlayerProfileResponse>(`/profile/${uuid}`);
    if (status === 400) throw new Error(`Could not find a player with this UUID: ${uuid}`);

    return { id: data.id, name: data.name };
  }
}

export default PlayerService;
