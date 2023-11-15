import fs from "fs";
import winston from "winston";

//* fs.Promise Create a Promise
const fsPromise = fs.promises;
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(), //* Define format
  defaultMeta: { service: "request-logging" },
  transports : [
    //* Winston Gives us Many Options one of them is print the log on console save the log in the file
    new winston.transports.File({filename : "log.txt"})
  ]
});

const logMiddleware = async (req, res, next) => {
  if (!req.url.includes("login") && !req.url.includes("signup")) {
    const logData = `${req.url} ${JSON.stringify(req.body)}`;
    logger.info(logData);
  }
  next();
};

export default logMiddleware;
