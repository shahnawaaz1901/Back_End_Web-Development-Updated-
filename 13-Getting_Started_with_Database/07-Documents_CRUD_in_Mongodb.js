/* 
    Now We Start to Implement the function of update and delete

    For update we need to specify mainly two arguments to the function
    first is condition and second one is updated document condition helps
    to findOut which Document we want to update and updated document values
    will be put inside that document.

    for Update the Documents we need to use command "db.books.updateOne", here db
    reffers to our booksDB and books is the name collection in which we want
    to update the document as name specify this command only update the One 
    document and if we want to update multiple then we use another which we seen
    later.

    for updation we need to pass filter and also in that object we need to use
    the $set keyword to set the object attribute value which we pass and in object
    we need to pass the attribute of object which we want to update and in this 
    operation we not do any insertion so no new id is created by mongoDb for this
    kind of Operation..Example of update the document in database is
    "db.books.updateOne({title : "Amreen Ansari"},{$set : {author : "Zakir Hussain"}})"

    we $set which helps to set the value of Object which title is Amreen Ansari, in that
    Object set the Attribute author value to Zakir Hussain, in this we $set to set the
    updated value into the database. updateOne function update value of One Object
    which is object first came into the database if we want to update all document
    which title is Amreen Ansari then we need to use the Command like this :

    "db.books.updateMany({title : "Amreen Ansari"},{$set : {author : "Zakir Hussain"}})"

    Last Operation of our CRUD is Delete function which we can also use as two function
    first is for delete only one document another one is to delete multiple objects

    for DeleteOne command we need to pass an object as condition for finding and after 
    the finding delete that item deleteOne function only delete one item which satisfy
    the condition and came first into the database. delete items command is : 
    
    "db.books.deleteOne({author : "Ashu Ansari"})"

    for delete multiple items into the database we need to use deletemany functions and
    pass condition as an object to delete multiple items which satisfy the condition
    into that collection. for delete multiple items command is :

    db.books.deleteMany({author : "Ashu Ansari"})
*/