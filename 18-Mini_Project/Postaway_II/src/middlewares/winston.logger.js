import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

export const loggerMiddleware = (req, res, next) => {
  if (!req.url.includes("users")) {
    const logData = {
      url: req.url,
      data: req.body,
      time: new Date().toString(),
    };
    logger.info(logData);
  }
  next();
};
