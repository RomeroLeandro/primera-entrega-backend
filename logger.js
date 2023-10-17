const winston = require('winston');

function createLogger() {
  if (process.env.NODE_ENV === 'production') {
    // Configuración del logger de producción
    return winston.createLogger({
      levels: winston.config.npm.levels,
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'errors.log', level: 'error' }),
      ],
    });
  } else {
    // Configuración del logger de desarrollo
    return winston.createLogger({
      levels: winston.config.npm.levels,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      transports: [new winston.transports.Console({ level: 'debug' })],
    });
  }
}

module.exports = createLogger();
