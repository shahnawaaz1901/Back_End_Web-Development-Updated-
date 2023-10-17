export const lastVisit = (req, res, next) => {
  //* 1. First Step to Check if Cookie is set, Means if We Updated the Cookie
  //* With the Last Visit time then add a local variable with last visit time Data
  /*
        Server Side Rendering : When Ever We Use a Template engine to Render Data
                        on Front end this is Called Server Side Rendering. But our
                        Cookie is Stores in front end side then we need to store it
                        for use. Server Side Rendering Means All those Variable and
                        values which You are Using All those are resolve on the server
    */

  // Check If User Visited Last Time
  /* All the Request Which Client Sent is stores in req object */
  /* This Statement to Store lastVisit in locals for Use in Front End */
  if (req.cookies.lastVisit) {
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  }
  /* if we Receive Cookie from the CLient then We Updating the Variable and Send Back Response to the Client */
  /* if I put below statement in the else then we can't see changes in Real Time for Last Visit */
  res.cookie("lastVisit", new Date().toISOString(), {
    /*
     *maxAge property is decide that how much time you want to Stores
     *Cookies in the Browser it takes number parameter which is in
     *miliSecond format because one day have 24 hours so multiply by
     *24 hours because one hour equals to 60 minutes thats why multiply
     *by 60 because one minue have 60 seconds so multiple by 60 and
     *one second equals to 1000 miliseconds thats why multiply by 1000
     */
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  /*  
            to ISOString is the kind of String format which Contains all information
            date time seconds and as well as miliseconds
        */
  next(); // Call next Middlware in the Pipeline
};
