/*
    Hooks : Hooks are nothing but we can say middleware which we can to 
        modify the request add some content to the response or some doing 
        other operations before and after the database related operations  
*/

/* 
    Based on calling the middlewares before and after the database operations 
    we devide middlewares or hooks into two parts first is prehooks and another 
    is posthooks. 
*/

/* 
    We can use the pre and post hooks by calling the pre and post function 
    after defining the Schema. Whenever that schema model is used to done the 
    operation pre and post functions are called. Remember that operation (which
    we define in pre and post) is done in that schema then only middleware 
    function pre and post is called. For Example if Two Schema like and comment 
    have there own models respectively if we write pre function in like schema 
    and define operation of find if Likemodel uses the find function only then 
    pre function statement will be executed if comment uses the find operation 
    and we use the middleware pre in the likes schema then pre function not call
    in the like Schema because for the operation comment Schema pre and post hook
    is responsible for for the operation not the like schema pre and post hook.
*/