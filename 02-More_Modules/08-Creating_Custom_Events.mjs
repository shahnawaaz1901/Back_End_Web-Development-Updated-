/*
    In Node.Js We Can Create Custom Event Using an core Module of node.js called events
*/

import * as events from 'events';
// this event module use the synchronous operations

// Create an Event Class
export class UserEvents extends events.EventEmitter{       
    /*  
        Created an UserEvents Class which inherit properties of EventEmitter class 
        which is built-in in events module
    */
    
    // Define Event
    createPost(content){
        console.log('Post Created Successfully !!');
        this.emit('postCreated');               // emit keyword create event which you mentioned in bracket and told that event has occur
    }


}