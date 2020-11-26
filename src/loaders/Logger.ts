/**
 * basic logger right now that just uses console logger
 */
export default class Logger implements ILogger {
  debug = (message: string, json: object) => console.debug(message, json);
  info = (message: string, json: object) => console.info(message, json);
  warn = (message: string, json: object) => console.warn(message, json);
  error = (message: string, json: object) => console.error(message, json);
}


export interface ILogger {
  debug(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, data?: any): void;
  info(message: string, data?: any): void;
}