import Service from './Service';
import Server from '../structures/Server';
import { ServerConstructor, ServerModel } from '../../typings/apistructures';
import { ServerDataConfig } from '../../typings/global';

/**
 * ServerService
 * @extends Service
 */
class ServerService extends Service {

    constructor() {
        super({ stdTTL: 420, checkperiod: 450 });
    }

    /**
     * Fetch server data
     * @param ipaddress Server IP-address
     * @param options Server options
     */
    public async fetch(ipaddress: string, options: ServerDataConfig): Promise<ServerModel> {
        let cachedData = this.cache.get<ServerModel>(`${ipaddress}:${options}`);
        if (cachedData) return cachedData;
    
        try {
            let statusResponse = await this.ServerApi.get<ServerConstructor>(`/${ipaddress}:${options.port}`);
            if (!statusResponse.data.online) 
                throw new Error('UNKNOWN_SERVER');

            let parsedData = new Server(statusResponse.data);
            this.cache.set(`${ipaddress}:${options}`, { ...parsedData, last_fetched: new Date() });
            
            return { ...parsedData, last_fetched: new Date() };
        } catch (e) {
            throw e;
        }
    }
    
}

export default ServerService;