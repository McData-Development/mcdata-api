import { ServerDataConfig } from '../../typings/global';
import Service from './Service';
import Server from '../structures/server';
import { ServerConstructor, ServerModel } from '../../typings/apistructures';

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
    async fetch(ipaddress: string, options: ServerDataConfig): Promise<ServerModel> {
        let cachedData = this.cache.get<ServerModel>(`${ipaddress}:${options}`);
        if (cachedData) return cachedData;
    
        let statusResponse = await this.ServerApi.get<ServerConstructor>(`/${ipaddress}:${options.port}`);
        let parsedData = new Server(statusResponse.data);
    
        this.cache.set(`${ipaddress}:${options}`, { ...parsedData, last_fetched: new Date() });
        return { ...parsedData, last_fetched: new Date() };
    }
    
}

export default ServerService;