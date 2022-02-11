export interface ServerConstructor {
    ip: string;
    port: number;
    debug: {
        ping: boolean;
        query: boolean;
        srv: boolean;
        querymismatch: boolean;
        ipinsrv: boolean;
        cnameinsrv: boolean;
        animatedmotd: boolean;
        cachetime: number;
        apiversion: number;
    }
    motd: {
        raw: Array<string>;
        clean: Array<string>;
        html: Array<string>;
    }
    players: {
        online: number;
        max: number;
    }
    version: string;
    online: boolean;
    protocol: number;
    hostname: string;
    icon: string;
    software: string;
}

export interface ServerModel {
    ip: string;
    port: number;
    hostname: string;
    status: string;
    information: {
        version: string;
        protocol: number;
        software: string;
    }
    players: {
        online: number;
        max: number;
    }
    motd: {
        clean: Array<string>;
        html: Array<string>;
    }
    icon: string;
    debugging: {
        ping: boolean;
        query: boolean;
        srv: boolean;
        ipinsrv: boolean;
        cnameinsrv: boolean;
    }
    last_fetched: Date;
}