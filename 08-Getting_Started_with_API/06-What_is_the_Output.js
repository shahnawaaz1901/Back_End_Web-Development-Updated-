/*
Performance of REST API

Your company's news portal receives heavy traffic, with thousands of users 
accessing the "Top News" section every minute. To improve the performance 
of the REST API serving this data, what strategy could you adopt? (Multiple)

1. You would implement caching to store the response of the "Top News"          //*Correct
    section, reducing the need for constant database querying.
2. You would convert all the news data into a JSON format before sending
    it to the client.
3. You would frequently use the DELETE method to remove older news items
    and reduce database size.
4. You would set up multiple server instances and distribute the incoming       //*Correct
    requests.

Solution Description : Caching in REST allows storing frequently accessed resources, 
                like the "Top News" section, to reduce database queries and provide 
                faster responses. Multiple server instances can be set up to distribute 
                incoming requests and handle increased traffic efficiently.

*/

/*
Third Party Integration

You're developing a SaaS product that provides CRM tools. 
You aim to facilitate seamless integration with third-party applications. 
What would be your primary strategy to accomplish this?

1. You would frequently update your application's codebase to 
    match third-party applications.
2. You would exclusively use SOAP APIs for third-party integration.
3. You would provide a RESTful API for standardized third-party                 //*Correct
    interaction.
4. You would create multiple versions of your product to match different 
    third-party requirements.

Solution Description : RESTful APIs offer standardized interfaces, making it 
                    easier for third-party developers to interact with your SaaS product. 
                    This approach ensures compatibility, scalability, and simplicity, 
                    fostering a smooth integration experience.
*/