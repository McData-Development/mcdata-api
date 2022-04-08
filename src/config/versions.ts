import { initRoutesv1 } from '../api/v1/routes';
import { VersionConfig } from '../typings/global';

const versionConfig: Array<VersionConfig> = [
    {
        version: 1,
        active: true,
        status: 'Available',
        routes: initRoutesv1
    }
];

export default versionConfig;