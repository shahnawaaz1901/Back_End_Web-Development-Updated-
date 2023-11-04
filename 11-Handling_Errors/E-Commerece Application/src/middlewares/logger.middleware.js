import fs from "fs";
import winston from "winston";

//* fs.Promise Create a Promise
const fsPromise = fs.promises;
/*
    fs is the Object which have a property named promises which allows
    us to read and write file asynchronously withOut Using Callbacks
*/

/* 
    Because we Use Read and Write File Asynchronous so that we need to
    use async await for wait until process is complete.
*/
/* Instead of Doing Manually
async function logger(logData) {
  //* Add Time Stamp for More Clarity About Which Time Error Occurs
  logData = `\n` + `${new Date().toString()} - LogData : ${logData}`;
  try {
    await fsPromise.writeFile("log.txt", logData);
    
        If User Sent Request Multiple Times then Our writefile function
        over ride the previous logs which we dont want, so instead of
        writefile we need to use appendFile function that function also
        works similar to writeFile if File not Exist and if File Exist
        then appendFile add new log data into that file withOut OverRide
        the Previous data.
    
    await fsPromise.appendFile("log.txt", logData);
  } catch (error) {
    console.log(`An Error is Occur While Creating File : ${error}`);
  }
}
*/
const logger = winston.createLogger({
  level: "info",
  /* 
        level is the log type that how much level you want to use logger here 
        in winston every log level is define from 0 to 6 if we select 5 then
        previous level also covered
    */
  format: winston.format.json(), //* Define format
  defaultMeta: { service: "request-logging" },
  transports : [
    //* Winston Gives us Many Options one of them is print the log on console save the log in the file
    new winston.transports.File({filename : "log.txt"})
  ]
});

const logMiddleware = async (req, res, next) => {
  if (!req.url.includes("login") && !req.url.includes("signup")) {
    /* 
        Along with req.body we also need to pass URL so that we can identify
        what part of our web page is generate the error 
        */
    /* 
       Add URL and Converts req.body in String so that we can See the log detail 
       inside the txt file which we want generate for every request
       */
    /* 
      In our login or create new account request req.body contains the email
      and as well as password of a specific user wo we didn't need to store
      user password for security purpose because log file can be easily available
      for the developers because developers create that log file to check for
      errors.
      */
    const logData = `${req.url} ${JSON.stringify(req.body)}`;
    /*
        Because winston package not require await keyword
        await logger(logData);
     */
    logger.info(logData);
  }
  next();
};

export default logMiddleware;
