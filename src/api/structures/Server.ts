import { ServerConstructor } from '../../typings/apistructures';

/**
 * Server
 */
class Server {

    public ip: string;
    public port: number;
    public hostname: string;
    public status: string;
    public information: {
        version: string;
        protocol: number;
        software: string;
    }
    public players: {
        online: number;
        max: number;
    }
    public motd: {
        clean: Array<string>;
        html: Array<string>;
    }
    public icon: string;
    public debugging: {
        ping: boolean;
        query: boolean;
        srv: boolean;
        ipinsrv: boolean;
        cnameinsrv: boolean;
    }

    constructor(data: ServerConstructor) {
        this.ip = data.ip;
        this.port = data.port;
        this.hostname = data.hostname;
        this.status = data.online ? 'Online' : 'Offline';
        this.information = {
            version: data.version,
            protocol: data.protocol,
            software: data.software
        };
        this.players = {
            online: data.players.online,
            max: data.players.max
        };
        this.motd = {
            clean: data.motd.clean,
            html: data.motd.html
        };
        this.icon = data.icon;
        this.debugging = {
            ping: data.debug.ping,
            query: data.debug.query,
            srv: data.debug.srv,
            ipinsrv: data.debug.ipinsrv,
            cnameinsrv: data.debug.cnameinsrv
        };
    }

}

export default Server;