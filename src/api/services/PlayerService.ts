import Service from './Service';
import { HistoryRes, PlayerRes } from '../../typings/apiresponses';
import { PlayerCache } from '../../typings/cache';
import Player from '../structures/Player';

/**
 * PlayerService
 * @extends Service
 */
class PlayerService extends Service {

    constructor() {
        super({ stdTTL: 3600, checkperiod: 3800 });
    }

    public async history(player: string) {
        try {
            let formatPlayer = player.toLowerCase().split('-').join('');
            let cachedData = this.cache.get<PlayerCache>(`${formatPlayer}`);

            if (cachedData) {
                return { ...cachedData };
            }

            if (player.length >= 17) {

            } else {
                let fetchedUUID = await this.fetchUUID(player);
                let historyResponse = await this.MojangApi.get(`/user/profiles/${fetchedUUID.id}/names`);
                let strucBuilder = new Player({  });
            }
            
            // let cachedData = this.cache.get<PlayerCache>(`${formatPlayer}`);
            // if (cachedData) return [ ...cachedData.history ];

            // if (player.length <= 16) {
            //     let fetchedUUID = await this.fetchUUID(player);
            //     let historyResponse = await this.MojangApi.get<Array<HistoryRes>>(`/user/profiles/${fetchedUUID.id}/names`);
                
            //     return [...historyResponse.data];
            // } else {
            //     let historyResponse = await this.MojangApi.get<Array<HistoryRes>>(`/user/profiles/${formatPlayer}/names`);
            //     return [...historyResponse.data];
            // }
        } catch (e) {
            throw e;
        }
    }

    private async fetchUUID(username: string): Promise<PlayerRes> {
        try {
            let mojangResponse = await this.MojangApi.get<PlayerRes>(`/users/profiles/minecraft/${username}`);
            if (!mojangResponse.data) {
                throw new Error('UNKNOWN_PLAYER');
            }

            return { ...mojangResponse.data };
        } catch (e) {
            throw e;
        }
    }

    private async fetchUsername(uuid: string): Promise<PlayerRes> {
        try {
            let mojangResponse = await this.MojangApi.get<Array<HistoryRes>>(`/users/profiles/${uuid}/names`);
            if (!mojangResponse.data) {
                throw new Error('UNKNOWN_PLAYER');
            }

            return { name: mojangResponse.data[mojangResponse.data.length - 1].name, id: uuid };
        } catch (e) {
            throw e;
        }
    }

}

export default PlayerService;