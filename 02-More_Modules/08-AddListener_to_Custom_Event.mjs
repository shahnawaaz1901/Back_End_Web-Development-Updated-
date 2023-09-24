// Import UserEvent Class
import {UserEvents} from './08-Creating_Custom_Events.mjs'

const userEvent = new UserEvents();                 // Created Object

function saveIntoDatabase(){
    console.log("Post Save to Database");
}

function updateFeed(){
    console.log('Post Updated in Feed');
}

function sendNotification(){
    console.log('Notification has sent to Friends');
}
function updateTimeline(){
    console.log('Post Updated in Timeline');
}


userEvent.addListener('postCreated',saveIntoDatabase);              // This addListener function add a callback listener to the event which you passed
userEvent.addListener('postCreated', updateTimeline);
userEvent.addListener('postCreated',updateFeed);
userEvent.addListener('postCreated',sendNotification);

userEvent.createPost('This is My First Post');      // Create Post