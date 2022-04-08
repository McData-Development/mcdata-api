import Service from './Service';
import { Server } from '../../../typings/structures';
import { ServerStats } from '../../../typings/apirequests';

/**
 * ServerService
 * @extends Service
 */
class ServerService extends Service {

    constructor() {
        super({ stdTTL: 900, checkperiod: 1000 });
    }

    /**
     * Get server debugging information
     * @param ipaddress Server ipaddress
     * @param config Server config
     */
    public async debug(ipaddress: string, config: ServerConfig): Promise<Server.Debugging> {
        try {
            let fetchedServer = await this.get(ipaddress, config);
            return {...fetchedServer.debug};
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get server status
     * @param ipaddress Server ipaddress
     * @param config Server config
     */
    public async get(ipaddress: string, config: ServerConfig): Promise<Server.Info | Server.Online> {
        let address: string = `${ipaddress}:${config.port || 25565}`;

        let cachedServer = this.cache.get<Server.Info | Server.Online>(address);
        if (cachedServer) return cachedServer;

        let objBuilder: Server.Info | Server.Online = {
            ip: '',
            port: 25565,
            hostname: '',
            status: 'Operational',
            players: { online: 0, max: 0 },
            version: { name: '', protocol: 0 },
            favicon: '',
            motd: { raw: [], clean: [], html: [] },
            debug: {
                ping: false,
                query: false,
                srv: false,
                ipinsrv: false,
                cnameinsrv: false,
                querymismatch: false
            },
            last_fetched: 0
        }

        try {
            let fetchedServer: Server.Info = await this.fetchServer(address);
            objBuilder = { ...fetchedServer };

            this.cache.set<Server.Info | Server.Online>(address, { ...objBuilder });
            return objBuilder;
        } catch (e: any) {
            switch (e?.message) {
                case 'UNKNONW_ADDRESS':
                    throw new Error('UNKNOWN_SERVER');
                default:
                    throw new Error('FETCHED_FAILED');
            }
        }
    }

    /**
     * Fetch server
     * @param address Server address
     */
    private async fetchServer(address: string): Promise<Server.Info | Server.Online> {
        try {
            const { data } = await this.ServerApi.get<ServerStats.Status>(`/${address}`);

            if (data.debug.dns) {
                if ('error' in data.debug.dns)
                    throw new Error('UNKNONW_ADDRESS');
            }

            if (data.online === false)
                return {
                    ip: data.ip,
                    port: data.port,
                    hostname: data.hostname,
                    status: 'Not operational',
                    debug: {
                        ping: data.debug.ping,
                        query: data.debug.query,
                        srv: data.debug.srv,
                        ipinsrv: data.debug.ipinsrv,
                        cnameinsrv: data.debug.cnameinsrv,
                        querymismatch: data.debug.querymismatch
                    },
                    last_fetched: Date.now()
                }

            return {
                ip: data.ip,
                port: data.port,
                hostname: data.hostname,
                status: 'Operational',
                players: {
                    online: data.players.online,
                    max: data.players.max
                },
                version: {
                    name: data.version,
                    protocol: data.protocol
                },
                favicon: data.icon,
                motd: data.motd,
                debug: {
                    ping: data.debug.ping,
                    query: data.debug.query,
                    srv: data.debug.srv,
                    ipinsrv: data.debug.ipinsrv,
                    cnameinsrv: data.debug.cnameinsrv,
                    querymismatch: data.debug.querymismatch
                },
                last_fetched: Date.now()
            }
        } catch (e: any) {
            throw e;
        }
    }

}

export interface ServerConfig {
    port?: number;
}

export default ServerService;