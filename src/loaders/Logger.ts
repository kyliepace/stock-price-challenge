import generateNumber from "../helpers/pseudoRandomNumber";

/**
 * basic logger right now that just uses console logger
 */
class Logger {
  requestInfo?: {
    requestId: number
  }

  generateRequest(){
    this.requestInfo = {
      requestId: generateNumber()
    }
  }

  log(method: Method, message: string, json?: object) {
    console[method](message, {
      ...this.requestInfo,
      ...json
    });
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
