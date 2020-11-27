import generateNumber from "../helpers/pseudoRandomNumber";

/**
 * basic logger right now that just uses console logger
 */
export class Logger {
  requestInfo?: {
    requestId: number
  }

  generateRequest(){
    this.requestInfo = {
      requestId: generateNumber()
    }
  }

  logWithJson(method: Method, message: string, json?: object){
    const structuredJson = {
      ...this.requestInfo,
      ...json
    }
    console[method](message, structuredJson);
  }

  log(method: Method, message: string, json?: object){
    let structuredJson;
    if (!!json || !!this.requestInfo){
      return this.logWithJson(method, message, json);
    }
    return console[method](message);
  }

  debug(message: string, json?: object){
    return this.log('debug' as Method, message, json);
  }

  info(message: string, json?: object){
    return this.log('info' as Method, message, json);
  }

  warn(message: string, json?: object){
    return this.log('warn' as Method, message, json);
  }

  error(message: string, json?: object){
    return this.log('error' as Method, message, json);
  }

}

enum Method {
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error'
};

export default new Logger();