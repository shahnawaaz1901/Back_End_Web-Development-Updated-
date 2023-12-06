import winston from "winston";

const createlogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: "request-logger",
  transports : [
    new winston.transports.File({filename : "log.txt", level : "error"}),
    new winston.transports.File({filename : "combined.log"})
  ]
});

export const logger = (req, res, next) => {
  if (!req.url.includes("users")) {
    next();
  }

  const logData = `${req.url}${JSON.stringify(req.body)}`;
  createlogger.info(logData);
  next();
};
