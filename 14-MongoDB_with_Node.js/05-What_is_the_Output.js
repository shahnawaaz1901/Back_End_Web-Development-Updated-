/*
dotenv Library Purpose

Which of the Following statement true about the dotenv library.?

1. Parses and loads environment variables from a .env file into the                 //* Correct
    process.env object.
2. Allows for encryption and decryption of environment variables.
3. Can be used to overwrite environment variables of the operating system.
4. Parses and loads environment variables from a .env file into the 
    global.env object.

Solution Description : The dotenv library in node.js is designed to read and 
            load variables from a .env file directly into the process.env object. 
            It neither provides encryption capabilities, nor does it overwrite 
            the operating system's environment variables or laod into a global.env object
*/

/*
Environment Variable Syntax

What is the correct syntax to define environment variables for the dotenv library .?

A.
API_KEY: '123456'
DATABASE_URL : 'mongodb://localhost27017/mydb'

B.
API_KEY= 123456
DATABASE_URL = mongodb://localhost27017/mydb

C.
{
    "API_KEY": "123456"
    "DATABASE_URL" : "mongodb://localhost27017/mydb"
}

D.
export API_KEY = 123456
export DATABASE_URL= mongodb://localhost27017/mydb

1. A
2. B                                                    //* Correct
3. C
4. D

Solution Description : The dotenv library expects environment variables in a .env file 
                to be in the format KEY=value. option B follows this format correctly. 
                The other options do not adhere to the expected syntax for defining 
                environment variables using dotenv
*/