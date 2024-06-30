import HalloLogger from 'hallo-logger';

/**
 * Base class for all controllers.
 */
class Controller {
  /**
   * Logger instance.
   * @type {HalloLogger}
   */
  protected readonly logger: HalloLogger = new HalloLogger({
    withDate: true
  });
}

export default Controller;
