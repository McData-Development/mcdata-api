import Service from './Service';
import { Player } from '../../typings/structures';
import { Mojang } from '../../typings/apirequests';

/**
 * PlayerService
 * @extends Service
 */
class PlayerService extends Service {

    constructor() {
        super({ stdTTL: 10800, checkperiod: 20000 });
    }

    /**
     * Get player profile
     * @param player Player credential
     */
    public async get(player: string) {
        let playerSlug: string = player.toLowerCase().split('-').join('');

        let cachedPlayer = this.cache.get<Player.Profile>(playerSlug);
        if (cachedPlayer) return cachedPlayer;

        let objBuilder: Player.Profile = {
            id: '',
            username: '',
            history: []
        }

        if (playerSlug.length <= 16) {
            try {
                let fetchedPlayer: Player.Details = await this.fetchUUID(playerSlug);
                objBuilder = { id: fetchedPlayer.id, username: fetchedPlayer.username, history: [] };
    
                this.cache.set<Player.Profile>(fetchedPlayer.username, {
                    id: fetchedPlayer.id,
                    username: fetchedPlayer.username,
                    history: []
                });
    
                return objBuilder;
            } catch (e: any) {
                switch (e?.message) {
                    case 'UNKNOWN_USERNAME':
                        throw new Error('UNKNOWN_PLAYER');
                    default:
                        throw new Error('FETCH_FAILED');
                }
            }
        } else {
            try {
                let fetchedPlayer: Player.Details = await this.fetchUsername(playerSlug);
                objBuilder = { id: fetchedPlayer.id, username: fetchedPlayer.username, history: [] };

                this.cache.set<Player.Profile>(fetchedPlayer.id, {
                    id: fetchedPlayer.id,
                    username: fetchedPlayer.username,
                    history: []
                });

                return objBuilder;
            } catch (e: any) {
                switch (e?.message) {
                    case 'UNKNOWN_UUID':
                        throw new Error('UNKNOWN_PLAYER');
                    default:
                        throw new Error('FETCH_FAILED');
                }
            }
        }
    }

    /**
     * Fetch Minecraft UUID
     * @param username Player username
     */
    private async fetchUUID(username: string): Promise<Player.Details> {
        try {
            const { data, status } = await this.MojangApi.get<Mojang.UserProfile>(`/users/profiles/minecraft/${username}`);
            if (status === 204) 
                throw new Error('UNKNOWN_USERNAME');

            return {
                id: data.id,
                username: data.name
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Fetch Minecraft username
     * @param uuid Player UUID
     */
    private async fetchUsername(uuid: string): Promise<Player.Details> {
        try {
            const { data } = await this.MojangSession.get<Mojang.Profile>(`/profile/${uuid}`);
            if (!data.id) 
                throw new Error('UNKNOWN_UUID');

            return {
                id: data.id,
                username: data.name,
            }
        } catch (e) {
            throw e;
        }
    }

}

export default PlayerService;