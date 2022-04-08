import Service from './Service';
import { Player } from '../../../typings/structures';
import { Mojang } from '../../../typings/apirequests';

/**
 * PlayerService
 * @extends Service
 */
class PlayerService extends Service {

    constructor() {
        super({ stdTTL: 3600, checkperiod: 4000 });
    }

    /**
     * Get player history
     * @param player Player credential
     */
    public async history(player: string): Promise<Array<Player.History>> {
        try {
            let fetchedPlayer = await this.get(player);
            return [...fetchedPlayer.history];
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get player skin
     * @param player Player credential
     */
    public async skin(player: string): Promise<Player.Skin> {
        try {
            let fetchedPlayer = await this.get(player);
            return { ...fetchedPlayer.skin };
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get player profile
     * @param player Player credential
     */
    public async get(player: string): Promise<Player.Profile> {
        let playerSlug: string = player.toLowerCase().split('-').join('');

        let cachedPlayer = this.cache.get<Player.Profile>(playerSlug);
        if (cachedPlayer) return cachedPlayer;

        let objBuilder: Player.Profile = {
            id: '',
            username: '',
            history: [],
            skin: { properties: [], skin_type: '' }
        }

        if (playerSlug.length <= 16) {
            try {
                let fetchedPlayer: Player.Details = await this.fetchUUID(playerSlug);
                let fetchedHistory: Array<Player.History> = await this.fetchHistory(fetchedPlayer.id);
                let fetchedSkin: Player.Skin = await this.fetchSkin(fetchedPlayer.id);
                objBuilder = { 
                    id: fetchedPlayer.id, 
                    username: fetchedPlayer.username, 
                    skin: { ...fetchedSkin },
                    history: fetchedHistory
                };
    
                this.cache.set<Player.Profile>(playerSlug, { ...objBuilder });
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
                let fetchedHistory: Array<Player.History> = await this.fetchHistory(fetchedPlayer.id);
                let fetchedSkin: Player.Skin = await this.fetchSkin(fetchedPlayer.id);
                objBuilder = { 
                    id: fetchedPlayer.id,
                    username: fetchedPlayer.username, 
                    skin: { ...fetchedSkin },
                    history: fetchedHistory
                };

                this.cache.set<Player.Profile>(playerSlug, { ...objBuilder });
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
        } catch (e: any) {
            throw e;
        }
    }

    /**
     * Fetch Minecraft skin
     * @param uuid Player UUID
     */
    private async fetchSkin(uuid: string): Promise<Player.Skin> {
        try {
            const { data } = await this.MojangSession.get<Mojang.Profile>(`/profile/${uuid}`);
            if (!data.id)
                throw new Error('UNKNOWN_UUID');

            let skinType = this.Util.getSkinType(uuid);
            return {
                skin_type: skinType,
                properties: [
                    ...data.properties.map((props) => {
                        return { type: props.name, value: props.value };
                    })
                ]
            }
        } catch (e: any) {
            throw e;
        }
    }

    /**
     * Fetch Minecraft user history
     * @param uuid Player UUID
     */
    private async fetchHistory(uuid: string): Promise<Array<Player.History>> {
        try {
            const { status, data } = await this.MojangApi.get<Array<Mojang.History>>(`/user/profiles/${uuid}/names`);
            if (status === 204) 
                throw new Error('UNKNOWN_UUID');

            return [
                ...data.map((history: Mojang.History): Player.History => {
                    if (history.changedToAt) return { username: history.name, changedAt: history.changedToAt };
                    return { username: history.name };
                })
            ];
        } catch (e: any) {
            throw e;
        }
    }

}

export default PlayerService;