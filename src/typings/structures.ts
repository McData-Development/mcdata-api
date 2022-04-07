export namespace Player {

    export interface History {
        username: string;
        changedAt?: number;
    }

    export interface Profile extends Details {
        history: Array<History>;
        skin: Skin;
    }

    export interface Details {
        id: string;
        username: string;
    }

    export interface Skin {
        skin_type: string;
        properties: Array<{
            type: string;
            value: string;
        }>;
    }

}

export namespace Server {

    export interface Info {
        ip: string;
        port: number;
        hostname: string;
        status:
            | 'Operational'
            | 'Not operational';
        debug: Debugging;
        last_fetched: number;
    }

    export interface Online extends Info {
        players: {
            online: number;
            max: number;
        };
        version: {
            name: string;
            protocol: number;
        };
        favicon: string;
        motd: {
            raw: Array<string>;
            clean: Array<string>;
            html: Array<string>
        };
    }

    export interface Debugging {
        ping: boolean;
        query: boolean;
        srv: boolean;
        ipinsrv: boolean;
        cnameinsrv: boolean;
        querymismatch: boolean;
    }

}