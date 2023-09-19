// Import Module
const fs = require('fs');

// Create file using fs
fs.writeFileSync('18-Create_by_fs_Module.txt',"name : Shahnawaaz Ansari");
fs.writeFileSync('18-Create_by_fs_Module.txt',"name : Ashu Ansari");

// if You Use WriteFileSync multiple time with same name file then only last file time provide data is present
