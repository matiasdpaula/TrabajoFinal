import winston from "winston";
import 'dotenv/config'

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "magenta",
        error: "red",
        warning: "yellow",
        info: "blue",
        http: "white",
        debug: "grey"
    },
};

const devLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            ),
        })
    ],
});

const prodLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            filename: "errors.log",
            level: "error"
        }),
    ],
});

export const addLogger = (req, res, next) => {
    switch (process.env.ENVIRONMENT) {
        case "development":
            req.logger = devLogger;
        break;
        case "production":
            req.logger = prodLogger;
        break;
        default:
            req.logger = devLogger;
    }
    req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`);
    next();
};
