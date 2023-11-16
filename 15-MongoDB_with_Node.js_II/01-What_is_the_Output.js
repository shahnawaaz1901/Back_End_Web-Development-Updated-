/*
Managing Post Likes and Creation

In a blog application, you want to update the number of likes for a specific post. 
If the Post doesn't exist, you want to create it. Which MongoDB command would you use .?

1. db.posts.updateOne({ _id: postId }, { $set: { likes: newLikes } })
2. db.posts.insertOne({ _id: postId, likes: newLikes })
3. db.posts.updateOne({ _id: postId }, { $set: { likes: newLikes } }, { upsert: true })     //* Correct
4. db.posts.updateMany({ _id: postId }, { $set: { likes: newLikes } })

Solution Description : Option c's MongoDB command uses the $set operator to update 
                likes for a specifc post and the upsert option to create the post 
                if needed, simplifying post likes management and new post creation.
*/

/*
Updating User Run Distance

In a fitness tracking app, you want to increase the distance covered by a user's 
run. If the user doesn't have a run record you want to create one with the provided 
distance. How can you achieve this using MongoDB .?

1. By creating a new collection for each user's run record
2. By using the $inc operator in conjunction with the upsert command            //* Correct
3. By using the $add operator with the upsert command
4. By using the $set operator in conjunction with the upsert command

Solution Description : In a fitness tracking app, yu can use the $inc operator to 
                icnrement a user's run distance. Combine it with the upsert command 
                to create a new run record if needed, efficiently managing and updating 
                run records, even when they don't exist yet.
*/

/*
User Follower Count

In a social media platform, you aim to enhance a user's follower count by one. 
If the user is not currently in the database, you intend to create their profile 
with a single follower. Which MongoDB query or command is suitable for accomplishing 
this task .?

A.
db.users.updateOne({_id : userId}, {$inc : {followers : 1 }},{upsert : true})

B.
db.users.update({_id : userId}, {$inc : {followers : 1 }},{upsert : true})

C.
db.users.updateOne({_id : userId , followers : 1 })

D.
db.users.updateOne({_id : userId}, {$set : {followers : 1 }},{upsert : true})


1. A                        //* Correct
2. B
3. C
4. D

Solution Description : Option A's MongoDB command employs the $inc operator to 
                increment a user's follower count by 1. The upsert option guarantees 
                that a new user with one follower is created if the user doesn't 
                already exist, efficiently managing follower updates and user creation
                as required. Option B is incorrect due to its reliance on a deprecated 
                method, making it an outdated and less efficient choice for modern 
                MongoDB operations.
*/
