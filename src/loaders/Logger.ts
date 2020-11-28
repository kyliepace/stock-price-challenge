import { createLogger, format, transports, config } from 'winston';
import * as rTracer from 'cls-rtracer';
import * as constants from '../constants/config.json';

const { printf } = format;

// a custom format that outputs request id
const rTracerFormat = printf((info) => {
  const rid = rTracer.id();
  return rid
    ? `[request-id:${rid}]: ${info.message}`
    : `${info.message}`
})

const destination = [
  new transports.Console()
];

const LoggerInstance = createLogger({
  level: constants.logs.LEVEL,
  levels: config.npm.levels,
  format: format.combine(
    rTracerFormat,
    format.errors({ stack: true }),
    format.splat()
  ),
  transports: destination
});

export default LoggerInstance;
