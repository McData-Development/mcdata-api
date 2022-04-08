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
    routes: (router: Router, prefix: string) => void;
}

export interface ServerDataConfig {
    port: number;
}