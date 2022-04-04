export namespace Mojang {

    export interface UserProfile {
        id: string;
        name: string;
    }

    export interface Profile extends UserProfile {
        properties: Array<{
            name: string;
            value: string;
            signature: string;
        }>;
    }

    export interface History {
        name: string;
        changedToAt?: number;
    }

}

export namespace ServerStats {

    export interface Status {
        ip: string;
        port: number;
        debug: Debug;
        motd: {
            raw: Array<string>;
            clean: Array<string>;
            html: Array<string>;
        };
        players: {
            online: number;
            max: number;
        };
        version: string;
        online: boolean;
        protocol: number;
        hostname: string;
        icon: string;
    }

    export interface Debug {
        ping: boolean;
        query: boolean;
        srv: boolean;
        querymismatch: boolean;
        ipinsrv: boolean;
        cnameinsrv: boolean;
        animatedmotd: boolean;
        cachetime: boolean;
        apiversion: boolean;
        dns?: {
            error: string;
        }
    }

}