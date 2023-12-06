import winston from "winston";

const createlogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "error.log" })],
});

export const logger = (req, res, next) => {
  if (!req.url.includes("users")) {
    const logData = `${req.url} ${JSON.stringify(req.body)}`;
    createlogger.info(logData);
  }

  next();
};
