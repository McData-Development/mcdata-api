import moment from 'moment';

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const MAGENTA = '\x1b[35m';
const RESET = '\x1b[0m';

class Logger {
  public prefix?: string;

  constructor(prefix?: string) {
    this.prefix = prefix;
  }

  /**
   * Info log
   * @param message Log message
   */
  public info(message: string | object | unknown): void {
    console.info(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${MAGENTA}${this.prefix || 'Log'} | Info${RESET} - ${message}`);
  }

  /**
   * Ready log
   * @param message Log message
   */
  public ready(message: string | object | unknown): void {
    console.info(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${GREEN}${this.prefix || 'Log'} | Ready${RESET} - ${message}`);
  }

  /**
   * Error log
   * @param message Log message
   */
  public error(message: string | object | unknown): void {
    console.error(`[${moment().format('DD/MM/YYYY HH:mm:ss')}] ${RED}${this.prefix || 'Log'} | Error${RESET} - ${message}`);
  }
}

export default Logger;
