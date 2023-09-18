/*
    WhenEver You Create an Application and even using any application generally
    a new Version is released time to time. Different type of roles version has.
    First Create an Application is major version then adding some new features 
    and then fixed some bugs which is introduce after version is released
*/

/* 
    Symmentic Versioning : 

        Versions                    Details
    Major 1.0.0                     Incompatible Changes, may not function before
    Minor 1.1.0                     Introduce new Feature new in Previous Version with backward compatiblity
    Patch 1.1.1                     Fixes Some Bugs Which is Identify After the Release of Version(Any Major or Minor). No Significant Changes.

*/

/*
    Symbols Before Version :
    
    Symbol                          Details
    Tilde(~)                        npm can install latest patch Release(Only Install Latest patch Release Not minor and Major)            
    Caret(^)                        npm can install latest minor Release(Install Latest Minor Release)
    No Symbol                       npm will install exact version(Install Exact Version Which You Specify)
*/