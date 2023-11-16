/*
    MongoDB provides 12 byte hexadecimal Id for every document which is insert
    in the database. In which 12 bytes id is devide into four parts 
    
    - First 4 Bytes is a timeStamp
    - Next 3 Bytes Machine Identifier
    - Next 2 Bytes is the Process Id (MongoDB is process by Computer so that id 
        is ProcessId)
    - Next 3 Bytes is the Counter means If Above three Parts of Id is Same then 
        Value of Counter is Change to Become a unique Id 
*/

/*
    Universaly Unique is the Good Part of Application to build the High Scale Application
    but in Our Small Application where we want to give id in simpler form so that we can
    easily read the id and remember the id. In Sequal database they provide us a simpler
    steps to generate a simpler id. But in NoSequal database we need to perform some extra
    word to generate the simpler id
*/