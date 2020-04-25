const {createLogger,format,transports} = require('winston');

module.exports = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}` )
    ),
    transports: [
        new transports.Console({
            level: 'debug',
        }),
        new transports.File({
            maxsize:5120000,
            maxFiles:7,
            filename: `${__dirname}/../logs/debug.log`, 
            level: 'debug' 
        })
    ]
})