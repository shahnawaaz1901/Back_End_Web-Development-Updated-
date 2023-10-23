/*
    Why We Need API Architechture is there Any Problem with the MVC Pattern. This 
    Question is Asked Because we Are Going to Explore REST API and After that Micro
    Services in Coming Lectures But Now Question is Why we Need REST API even MVC 
    Architecture Perform Very Well.
    
    We Need REST API Because MVC Architecture is Tightly Coupled Mean While for a
    Specific Request We Are Redered Directly an ejs page like index.ejs or product.ejs
    For this Reason We Suppose that Every Controller is Tightly Coupled to Render
    a Specific EJS File for Every Request.

    Biggest problem of MVC is when We Opened Our App in Other Platforms like 
    Smartphone or Other Platform MVC is Hard Coded with index.ejs file and Not 
    Helps us to Render View on Mobile Application Because Sometime Web Application 
    and Mobile Application Technologies is Different. In that Scenario Our Controller
    is Not Able to Serve View for Request. This is the Biggest Problem in MVC 
    Architechture that MVC is tightly Coupled With a Single View.
    
    If We Create a New Application which is Huge and has many Views and Controllers
    and in that application if we Make Changes in Controllers then it might happen
    that our view is break and if we make changes in view that it might also happen
    that our Controller is Break this are the Biggest Problem with MVC.
*/

/*
    For These All Kind of Problem We Can Use API.
    API Stands for Application Programming Interface . We Can UnderStand API as Electric
    Socket in Our House that electric socket is Comfirtable with Every Electronic Item
    Because that elecric Socket We Can Use to Charge Smartphone, For Use Washing Machine
    For Use Televisions and many Kind of Electric Devices can Run on a Single Socket.
    Now Question is electric Socket is tightly Coupled ..?? No in this Case Electric
    Socket is Loosely Coupled because it don't know which is Device is Used to Charge. 
*/  

/*
    In our MVC Application We Create a Controller to handle Request after that
    we Hard Code an EJS file along with that Controller and EJS File Render it
    along with the Data but in API Server is Only Manage Data not the Front End
    Front End is Managed By the Client and Server Only Manage the Data it doesn't
    care who is the Client work of Server is to Send Data in REST API.
*/

/*
    In Our REST API Controller is Only Managed to handle the Data Controller not
    the View View is managed by the Front End in this Case We Can use Different 
    Technologies on the Front End it's No Metter which is the Platform of Front
    End and Which Technology is Used to Render the Front End Work of the Server
    is to Send the Data. In this REST API case we Create an API Controller to 
    Send the Data through API to the Front End
*/  