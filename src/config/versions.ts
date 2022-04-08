import { initRoutesv1 } from '../api/v1/routes';
import { VersionConfig, VersionRoutes } from '../typings/global';

const versionConfig: Array<VersionConfig & VersionRoutes> = [
    {
        version: 1,
        active: true,
        status: 'Available',
        routes: initRoutesv1,
        support: true
    }
];

export default versionConfig;