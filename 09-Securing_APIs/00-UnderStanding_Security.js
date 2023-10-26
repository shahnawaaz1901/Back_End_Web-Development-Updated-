/*
    *Sercuring Application*

    ?Why Do We Need Secure Apps
    For Control Data Access (To Know Who is the User)
    Data Privacy (Only Authenticate User Can Access Data )

    ?How Do We Secure Apps
    Verify The User 
    verify What Users Can Access

    *For Securing Application We Need to Do two Things : 
    ?1. Authentication
        !1. Verify User Identity
        !2. Confirm that A User is What they Claim to be
        !3. Exmaples : Verify Credentials(id and pass) or Tokenize System or Biometric

    ?2. Authorization
        !1. Granting or Denying Access to Specific Resource Based on user's Privilages.Eg :
        (
            If a Employee Works on IT Department then that person is only Allow to Access IT Resources
            By their ID that person can't Access the fianancial Department Resources. This is the Limitations
            of Resource for Every user based On their Department this Categorization Differ by resources
            Which User Want to Access or Some other kind of Things. 
        )
        !2. Controls Access to Resources based on the user's Privilages
        !3. Examples : Checking if the authenticated user has Permissions to access a resource.

    *Types of Authentication*
    ?1. Basic Authentication : Require's User Credentials on Each Request. (Check For User Manually)
    ?2. API Keys : API Keys are provided by signing up users on developer Portals (When You Use a Company API Like Google Api, faceBook Api then that's give a api key for user that api key is used to verify identity against the API key)
    ?3. OAuth(Open Authentication) : Third Party App Integration. Sometime when You signup or login You see an option that is signin through google account facebook account or microsoft account this is third party accounts to verify the identity, This is All Done Using the open Authentication Protocol which can helps us to check the validation of user. In This Process Open Authentication Sends the Request to that third party authentication to check is this user is Valid or Not
    ?4. JWT : Creates a reusable token with option to refresh. JWT Stands for JSON Web Token Authentication which is used to verify the user details. This is the Most Popular Authentication Across the Platforms
*/