/*
Advantages of Event-Driven Architecture

Which approach is correct to implement Event-Driven Architecture for temperature and 
humidity threshold breaches in a Node.js based greenhouse monitoring application?

1. Emit a single "thresholdExceeded" event and handle all tasks with 
    a single listener.
2. Emit a single "thresholdExceeded" event and handle all tasks with 
    two listeners.
3. Emit separate "temperatureExceeded" and "humidityExceeded" events 
    and handle all tasks for each event with a single listener.
4. Emit separate "temperatureExceeded" and "humidityExceeded" events            // Correct
    and handle tasks for each event with separate listeners.

Solution Description : Statement(D) suggests emitting separate events when the temperature 
                or humidity levels exceed a certain threshold for each condition. This approach 
                allows specific tasks related to each condition to be handled by separate listeners, 
                which improves the application's performance and avoids potential conflicts.
*/