/*
    If We Want that User Can Upload Some File from local system instead of
    entering URLs then we Need to Follow Some Steps :-
    1. Install Package name multer.
    2. Changes in View Engine to Explain that this form is
        File Upload Type.
    3. Need To Write MiddleWare Which Stores Files or files URLs which User 
        is Entered or Upload or Middleware Read the File which user is uploaded
        and store that file into the array
    4. Once Middleware Stores the files URLs after that Apply that Middlware
        in our Application .
    5. Once Upload of File is Completed then Update the Controller .
*/

/*
    Multur is Node.Js Middleware for handling Multipart/form-data.
    For Using the Multure We Need to Configure Multure to the Storage
*/