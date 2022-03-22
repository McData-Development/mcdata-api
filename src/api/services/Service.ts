import NodeCache, { Options } from 'node-cache'; 
import { MojangApi, ServerApi, MojangSession } from '../../utils/Axios';

/**
 * Service
 */
class Service {

    protected MojangApi: typeof MojangApi = MojangApi;
    protected ServerApi: typeof ServerApi = ServerApi;
    protected MojangSession: typeof MojangSession = MojangSession;
    protected cache: NodeCache;

    /**
     * @param options Cache options
     */
    constructor(options?: Options) {
        this.cache = new NodeCache({ ...options });
    }

}

export default Service;