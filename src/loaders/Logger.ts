/**
 * basic logger right now that just uses console logger
 */
class Logger {
  debug = (message: string, json?: object) => console.debug(message, json);
  info = (message: string, json?: object) => console.info(message, json);
  warn = (message: string, json?: object) => console.warn(message, json);
  error = (message: string, json?: object) => console.error(message, json);
}

export default new Logger();
