import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDir = 'logs';
const isProd = process.env.NODE_ENV === 'production';

if (!isProd && !fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    ...(!isProd
      ? [
          new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error',
          }),
          new winston.transports.File({
            filename: path.join(logDir, 'combined.log'),
          }),
        ]
      : []),
  ],
});

export default logger;
