/*
Password Comparison Sequence
 
What is the correct sequence of steps for comparing the user's password with 
a stored hash during login using bcrypt ?

i. Retrieve th hashed password from the database
ii. Compare the plain text password entered by the user with the hashed password 
    retrieved usign bcrypt.compare(password, hashedPassword).
iii. User enters a plain text password during login.


1. iii -> i -> ii                               //* Correct
2. ii -> i -> iii
3. ii -> iii-> i
4. iii -> ii -> i

Solution Description : When a user logs in they first enter their password(iii). 
                The system the retrieves the stored has from the database(i) and 
                compares both passwords(ii) to authenticate the user. The Correct 
                sequence is : iii-> i-> ii

*/

/*
Syntax for password hashing and comparison

What is the correct syntax to hash and compare a password with the becrypt 
library .?

Note : Assume that the hashed 'password' will be the same password obtained from a 
user through req.body.

A.
//Create a hash from the password
const hashPassword = await bcrypt.hash(password, 10)
// Compare password with the hash password
const isMatch = await bcrypt.compare(req.body.password, hashPassword)

B.
//Create a hash from the password
const hashPassword = await bcrypt.hash( 10, password)
// Compare password with the hash password
const isMatch = await bcrypt.compare(password, req.body.password)

C.
//Create a hash from the password
const hashPassword = await bcrypt.hash(password, 10)
// Compare password with the hash password
const isMatch = await bcrypt.compare(req.body.password)

D.
//Create a hash from the password
const hashPassword = await bcrypt.hash(password, 10)
// Compare password with the hash password
const isMatch = await bcrypt.verify(req.body.password, password)

1. A                            //* Correct
2. B
3. C
4. D

Solution Description : The Correct syntax with bcrypt is to use bcrypt.hash 
                with the pasword first followed first followed by the salt 
                rounds. The bcrypt.compare method takes in the plain text 
                password and the hash for comparison. option A correctly follow 
                this syntax. The Other options are using non-existing methods 
                (bcrypt.verify) or have missing/incorrect arguments.
*/