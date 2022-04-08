import { Router } from 'express';

export interface EnvironmentConfg {
    port: number;
    appname: string;
    environment: string;
}

export interface VersionConfig {
    version: number;
    active: boolean;
    status: 
        | 'Available'
        | 'Deprecated'
        | 'Discontinued';
}

export interface VersionRoutes {
    routes: (router: Router, prefix: string, version: VersionConfig) => void;
}

export interface ServerDataConfig {
    port: number;
}