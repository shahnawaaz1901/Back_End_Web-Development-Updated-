/*
    In Node.Js We Can Create Custom Event Using an core Module of node.js called events
*/
import * as events from 'events';
// this event module use the synchronous operations

// Create an Event Class
export class UserEvents extends events.EventEmitter{       
    /*  
        Created an UserEvents Class which inherit properties of EventEmitter class 
        which is already in events module
    */
    
    // Function of Creating Post
    createPost(content){
        console.log('Post Created Successfully !!');
        // After Created the Post postCreated Event is Occure
        /* 
            emit keyword create event which you mentioned in bracket and that event 
            has occur and whatever Listener you provides corresponding to this event 
            that functions automatically called because event is occure
        */
        this.emit('postCreated');               // Emmit Declare Event Name and Tells that event is Occure  
    }
}
