/*
    MVC Based on Sepration of Concerns.
    MVC Proposed to Seprate Each of Part of Applications into the Seprate File.
    And Make them Loosely Coupled.
*/

/*
    MVC Seprates Tasks for Creating a Web Applications into Three Parts :
    1. Model
    2. View
    3. Controller
*/

/*
    Model : For Dynamic Applications Your Data Comes from the Server Because in Dynamic
        Application Data Comes From the Server For Every User. On Server We Have Models
        to Represent data with all its Attributes.

        Let's Take An Example if We Create a TO-Do List Application that Application have
        Properties Like Name of TODO, Content of TODO, Date When TODO is Created, Status 
        TODO is Completed or Not, Due Date if Store a Task. These All Properties Can be
        Easily Represented By Model and then using the View Data is Visible to User.
        Models Refresh Data For Client. All The Data Related Operation is Done By Model.
        If You Create or Update todo this type of data related operation performed by Models.
*/

/*
    View : View is Nothing but User Interface which can be Seen by the User. All the Data
        Which User Can See is Managed By View. View Provide User Interface to See and Interact
        with it and Then View is Also Display Data to the Screen. View Responsibiliy is to 
        Display Model Data to the User. View is Nothing But a Like HTML File .
*/

/*
    Controller : Controller is the Most Important Part of the MVC because Controller Responsible 
        Communication Between Model and View. Job Of Controller is To Handle Request Which Received
        from the User. Controller Can Update Data on Model. Controller Manipulate or Update the Model
        and Model Update Your View. WithOut Controller Model Can't be Updated Because Request Can't
        be handled by SomeOne.

*/

