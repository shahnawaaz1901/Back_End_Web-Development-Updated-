/* 
    REST API (RestFul API): 
    

    1. Rest Stands for Representational State Transfer :

    When Ever Server Sends Some Information from Server to the Client Server Store
    Data in Multiple Formats Like File Format or in Databases their are Multiple
    Formats but in RESTful APIs data are stored mainly into two formats : 
    I. JSON (JavaScript Object Notation)
    II. XML

    Data Which Client can See is Called Representational Data, Sometime Actual Data
    and Representational Data is not Same Because Client Expect only Information
    which is Required but in Database Sometime additional Information is Stored Like
    IP Address of System in Which crud Operations is done. Or in Simple Language 
    Representation of Data is Called Representational State.

    
    2. Stateless Architecture :

    Stateless Means Request is Independent of Each Other Means Every Reqeust not 
    Store Other Information and Request is Loosely coupled. Stateless is The another
    Reason of Quick response of Restful API.

    
    3. Architecturel GuideLines :

    REST API is Not a Protocol it's Guideline to Create an API. it's More then a Protocol.
    This Guidelines helps to Create Large Scalable Application.

    
    4. Popularly Used Across Different Type of Platforms :

    RESTful API is the Widely used in All Web Platforms Because of Cross Platform
    Support So that Community of RESTful API is Very large and Solution of Most
    Problems Exist Already.
*/

/*
    Benefits of REST API :
    1. Simplicity
        Because Responsibility of Controller is Only Sending the Data. View 
        Responsibility is no longer the Part of Controller anymore. So that
        you Can Focus on Your Controller and Data.All Front End Frameworks 
        or Library is Also Supports REST APIs so that front end calls the
        API and Render the Data on Front End.

    2. Highly Scalable
        Because REST API is loosely Coupled so that it's Easy To Create a Project
        on Larage Scale Using REST API. Usinfg REST API You can devide Your work
        into the Different Servers instead of One. That's Why Rest API is So Popular.

    3. InterOperability
        This is For Cross Platform Support Means You Can Create a back end server
        which can server Data through API in any platform like android windows mac
        or any kind of application.
    
    4. Great Support for Caching
        Caching is the Ability to Quickly Provide. If Some Web Page is Common Mean
        User can explore frequently We Can cache that web page data and send response
        quickly to the Client. Let's Understand with an Example if Some user is 
        Requested data then server go to database and get the data from database and
        send response to the Client if User Send Request Frequently then Server Store
        that response data into the Application Server on Cache Memory and Instead of
        getting data from the Database Directly response from the Server. 

*/

/*
    Rest Methods : 
    In Rest APIs Data is Treated as Resource if We Create Some Product then Product
    is Resource . With every Request Along with Request some additional Information
    also sent to the Browser Like URL, Headers, Data and Methods(http methods).
    With REST API Http method is More Simplify. Below Operation is the Most Popular
    Operation for CRUD Operation using REST API.

    GET : Get the Resource (For Retreiving the Data from the Server)
    POST : Create the Resource (For Creating Data on the Server)
    PUT : Update the Resource (For Updating Existing Data on the server)
    DELETE : Delete the Resource (For Delete Existing Data on the Server)
*/