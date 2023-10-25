/*
API endpoint

Given an API endpoint '/api/games/:id' intended to retrieve specific game 
details from the database based on its ID, which of the following route 
methods would be recommended in Node.js?

1. app.get("/api/games/:id", (req, res) => { // Logic to fetch game from DB });         //* Correct
2. app.post("/api/games/:id", (req, res) => { // Logic to fetch game from DB });
3. app.put("/api/games/:id", (req, res) => { // Logic to fetch game from DB });
4. app.delete("/api/games/:id", (req, res) => { // Logic to fetch game from DB });

Solution Description : All the implementations provided in options A, B, C, and D 
                are viable for handling HTTP methods (GET, POST, PUT, DELETE) in 
                Express.js, as the framework does not impose restrictions on the 
                operations within route handlers. 
                However, option A is the recommended approach, as it utilizes the 
                GET method in Express to retrieve data from a server. This method 
                is widely employed for fetching information from a designated resource.
*/