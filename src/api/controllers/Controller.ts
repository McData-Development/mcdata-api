import Logger from '../../utils/Logger';
import ApiError from '../../utils/ApiError';

/**
 * Controller
 */
class Controller {

    protected Logger: typeof Logger = Logger;

    protected ApiError: typeof ApiError = ApiError;

}

export default Controller;