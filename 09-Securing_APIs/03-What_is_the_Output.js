/*
Advantages of JWT

Imagine you are developing a web application that involves a 
client-server architecture. Which advantage(s) of using JWT would 
be most beneficial in this scenario? ( Multiple )

1. JWT allows for stateless authentication, eliminating the need for        //* Correct
    server-side session storage.    
2. JWT enables easy scalability in distributed systems due to its           //* Correct
    stateless nature.
3. JWT provides a secure mechanism for carrying authentication and          //* Correct
    authorization information in the token itself.
4. JWT tokens can be understood and utilized by both web clients and        //* Correct
    mobile applications.

Solution Description : JWT (JSON Web Token) in a client-server architecture 
                offers stateless authentication, eliminating session storage 
                for scalability. It enables interoperability, allowing web clients
                and mobile apps to understand and use tokens. JWT securely carries 
                authentication and authorization info, reducing server lookups for 
                improved performance. It's a valuable tool for secure and scalable 
                authentication in client-server setups.
*/

/*
Limitations of Basic Authentication

Why is basic authentication not recommended for REST APIs?

1. It lacks encryption and can be easily decoded, compromising                  //* Correct
    the security of credentials.                
2. It does not support authorization and access control mechanisms.
3. It has limited scalability.                                                  //* Correct
4. It is not compatible with mobile applications.

Solution Description : Basic authentication lacks encryption, making credentials 
            easily decodable and compromising security. Additionally, it has limited 
            scalability and may struggle to handle large numbers of concurrent requests.
*/

/*
JWT Payload Security

Is it possible to read the contents of the JWT payload without the secret key?

1. Yes, it is possible.                                         //* Correct
2. No, it is not possible.
3. Only if the JWT is encrypted.
4. Only if the JWT is signed with a private key.

Solution Description : The JWT payload can be read without the secret key as 
                it is base64-encoded, not encrypted. However, including sensitive
                information in the payload is not recommended due to potential 
                security issues if the token is intercepted or compromised. 
                JWT's main security relies on its signature for data integrity 
                and authenticity.
*/