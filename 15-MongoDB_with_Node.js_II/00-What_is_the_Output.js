/* 
Modifying Task Progress

You are developing a MongoDB based platform for managin tasks. Users can 
update their task progress, and you need to modify the progress of a specific 
task within an array of tasks in a document. Which $set operation accomplishes 
this .?

{
    "_id" : ObjectId("456"),
    "tasks" : [
        {
            "taskId" : "task123",
            "taskName" : "Task A",
            "progress" : "Incomplete"
        },
        {
            "taskId" : "task456",
            "taskName" : "Task B",
            "progress" : "Incomplete"
        }
    ]
}

A.
db.projects.updateOne(
    {_id : ObjectId("456")}, 
    {$set : {tasks.$[elem].progress : "completed"}}, 
    {arrayFilters : [{"elem.taskId" : "task123"}]}
)

B.
db.projects.updateOne(
    {_id : ObjectId("456")}, 
    {$set : {"tasks.$.taskname" : "task123", progress : "completed"}}
)

C.
db.projects.updateOne(
    {_id : ObjectId("456"), "tasks.taskId" : "task123"}, 
    {$set : {"tasks.$.progress" : "completed"}}
)

D.
db.projects.updateOne(
    {_id : ObjectId("456")}, 
    {$set : {"tasks" : {taskId : "task123", progress : "completed"} }}
)

1. A
2. B
3. C                //* Correct
4. D

Solution Description : The Correct Operation to modifty the progress of a 
            specific task within an array of tasks using the $set operator 
            is option c. This code snippet utilizes the positonal operator 
            $ within the tasks arrya path to identify the matched task element 
            based on the "tasks.taskId":"task123" condition. The $set operator 
            then updates the progress field of that matched task element to 
            the new value of "completed". The Other options either attempt to 
            modify the enitre array element or do not use the $set operator 
            effectively with the positional operator. 
*/

/*
Removing Tasks

You are developing a task management application, and you need to implement 
a feature that allows users to remove completed tasks from their list. 
Which MongoDB operator would be most suitable for achieving this task removal 
withOur adding any new tasks .?


1. $push
2. $pull                            //* Correct
3. $add
4. $remove

Solution Description : TO remove completed tasks from the list withOut adding 
                new tasks in MongoDB, use the $pull operator. This efficiently 
                eliminates specific elements from an array field based on a 
                condition. $push, $add, and $remove are not suitable for this task.
*/

/*

Removal Usin Specific Criteria

You have a document with an array "scores" that contains numbers. You want to 
remove all scores greater then 90 using the $pull operator. Which code snippet 
accomplishes this .?


1. db.collection.updateOne({ _id: ObjectId("456") }, { $pull: { scores: { $gt: 90 } } })    //* Correct
2. db.collection.updateOne({ _id: ObjectId("456") }, { $pull: { scores: $gt: 90 } });
3. db.collection.updateOne({ _id: ObjectId("456") }, { $pull: { scores: { $gte: 90 } } });
4. db.collection.updateOne({ _id: ObjectId("456") }, { $pull: { scores: { >: 90 } } });

Solution Description ; The correct code snippetis Option A, 
                db.collection.updateOne({ _id: ObjectId("456") }, 
                { $pull: { scores: { $gt: 90 } } });. This Code performs 
                an update operation on the document with the specified _id, 
                using the $pull operator to remove all array elements (scores) 
                that are greater than 90. The $gt operato within the $pull 
                condition filters out the values that meet the specified criterion
*/
