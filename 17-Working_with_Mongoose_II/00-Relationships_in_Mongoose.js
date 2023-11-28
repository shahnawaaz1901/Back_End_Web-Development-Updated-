/*
    In today's Scenario We have a kind of data which is related to something 
    or some other data. For a kind of Application where we need to specify 
    relationships in database many times then mongodb is not a good choice why 
    because mongodb is non-relational database for this we need relational 
    database which is build for specify relationships between the data like 
    MySQL databases. But for mongodb we don't have any kind of relation ships 
    but we can specify the relationships between the collection using the mongoose.
    
    Generally we have three kind of relationships between the collections :
    
    1. One to One : In Our case One cart Item relate to one Product. This is 
        called one to one. 

    2. One to Many : In our case One product have multiple reviews means product 
        is one but multiple reviews can exist for one product

    3. Many to Many : In our case many to many is multiple product can have multiple 
        categorized. Like a smartphone is in electronic category and can be in smartphone 
        category and in a perticular category can have multiple products. We can 
        understand like this that one to many relationships on both side. Smartphone 
        also have multiple categories and so it's one to many and categories also have 
        multiple products which also one to many
*/