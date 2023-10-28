/*
    Problems with Basic Authentication :
    1. It's Not Encrypted, it Only Use the encoding and decoding, 
        Which can be decode by Bruteforce Algorithms
    2. Client Stores the Credentials to send along with every request
        it's very risky to store and can be exposed.
    3. Due to Non Encrypted Data it's easy to get the all data and
        easy to crack password.
*/

/*
    For Solve the All Problems for Basic Authentication JASON Web
    Token is Introduced :
    1. It Encrypted the Data (Using Hashing, No Decoding in Hashing) 
    2. Stateless (RESTful is Stateless architecture JWT is also Stateless)
    3. Easy to Scale
    4. JWT Can be Used for Mobile as well as Web Applications
*/

/*
    Structure of JWT Authentication is devide into three parts : 
    1. Header
    2. Payload
    3. Signature

    Header : In Header Mainly two type of Information is Stored One 
            is Which Algorithm Used and Another is Which Encryption
            Technique is Used.

    Payload : Some Time We Need Additional Information Regarding User
            That additional information is required to store because
            with that additional information server decide the resource
            availability for that User. Sensitive Data such as password
            or pins are not stored inside the payload

    Signature : Signature defines which is used to Create the token.

    If We Explore the JASON Web Token Official page then it displays Many
    Algorithms which You can decide to use for encryption
*/

/*
    Request and Respose Cycle for using JWT Authentication : 
    1. When User Logged in Credentials is goes to Server
    2. Server Verify that credentials and send generate a JWT token
        and sent back to the client 
    3. For Every Request Along with Request instead of send credentials
        in authorization Header user is sent that JWT tokens to the server
        to verify the details.
    4. Server Check that token for validity, and authentication to after
        verification server send the appriopirate response to the user
    5. How server check that token is valid or server check through in
        Header using header server regenerate the token and if that re-
        generate token match with that tokens then server allow access to
        the resources.
*/