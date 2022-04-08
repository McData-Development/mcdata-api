import Logger from '../../../utils/Logger';
import ApiError from '../../../utils/ApiError';

/**
 * Controller
 */
class Controller {

    /**
     * Node logger
     * @protected
     */
    protected Logger: typeof Logger = Logger;

    /**
     * ApiError
     * @protected
     */
    protected ApiError: typeof ApiError = ApiError;

}

export default Controller;