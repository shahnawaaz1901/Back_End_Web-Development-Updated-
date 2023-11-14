/*
Adding User Id to Likes Array

Given a MongoDB collection of blog posts where each post has an attribute 
'likes' which is an array of user IDs, how would you add a new user ID, 
'user12345', to the likes array of a post with the title 'An Insightful Article'?

A.
collection.updateOne(
    { title : "An Insightful Article" },
    { $set : { likes : "user12345" } }
);

B.
collection.updateOne(
    { title : "An Insightful Article" },
    { $push : { likes : "user12345" } }
);

C.
collection.updateOne(
    { title : "An Insightful Article" },
    { likes : { $add : "user123456" } }
);

D.
collection.find({ title : "An Insightful Article" })
.likes.push("user12345");

1. A
2. B                                        //* Correct
3. C
4. D

Solution Description : To append a value to an array field in a MongoDB document, 
                the $push operator should be used. Option B correctly employs this 
                operator to ad 'user12345' to the likes array od the specified post.
*/

/*
Fetching Discounted Electronics

You are building an e-commerce platform and have a MongoDB collection nameed 
'products'. Each product document contains attributes such as name, price and 
category. As a Special promotional event, you want to offer discounts on all 
"Electronics" item priced between $50 and $150 inclusive which query would 
correctly fetch these products from the database .?

A.
collection.find({
    category : "Electronics",
    price : {
        $lte : 50,
        $gte : 150
    }
}).toArray();

B.
collection.find({
    category : "Electronics",
    price : {
        $gt : 50,
        $lt : 150
    }
}).toArray();

C.
collection.find({
    category : "Electronics",
    price : {
        $gte : 50
        $lte : 150,
    }
}).toArray();

D.
collection.find({
    category : "Electronics",
    price : [50, 150]}).toArray();

1. A
2. B
3. C                                          //* Correct
4. D

Solution Description : When filtering for products within a specific price 
                range, the $gte and $lte operators should be used together. 
                Option C correctly employs these operators and also specifies 
                the category "Electronics", fulfilling the requirements of the query. 
*/