import NodeCache, { Options } from 'node-cache';
import { ServerApi } from '../../utils/Axios';

/**
 * Service
 */
class Service {

    protected ServerApi: typeof ServerApi = ServerApi;
    protected cache: NodeCache;

    constructor(options?: Options) {
        this.cache = new NodeCache({ ...options });
    }

}

export default Service;