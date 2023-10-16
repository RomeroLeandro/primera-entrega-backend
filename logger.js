const winston = require('winston');

function createLogger() {
    if (process.env.NODE_ENV === 'production') {
      // Configuración del logger de producción
      return winston.createLogger({
        levels: winston.config.npm.levels,
        format: winston.format.json(),
        transports: [
          new winston.transports.File({ filename: 'error.log', level: 'error' }),
          new winston.transports.File({ filename: 'combined.log' }),
        ],
      });
    } else {
      // Configuración del logger de desarrollo
      return winston.createLogger({
        levels: winston.config.npm.levels,
        format: winston.format.simple(),
        transports: [new winston.transports.Console({ level: 'debug' })],
      });
    }
  }
  
  module.exports = createLogger();