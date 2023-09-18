/*
    What is NVM?

    Node Version Manager (NVM), as the name implies, is a tool for managing Node 
    versions on your device.

    Different projects on your device may be using different versions of Node. 
    Using only one version (the one installed by npm) for these different projects 
    may not give you accurate execution results.

    For example, if you use a Node version of 10.0.0 for a project that uses 12.0.0, 
    you may get some errors. And if you update the Node version to 12.0.0 with npm, 
    and you use it for a project that uses 10.0.0, you may not get the expected 
    experience.
*/

/*
    Node Version Manager is a Tool to Switch Versions of Node.Js in Single Computer.

*/

/*
    First Install nvm for windows using exe file which can be downloaded through google
*/

/*
    Command For NVM(Node Version Manager)

    nvm -v                          Gives Version of nvm
    nvm install 20.6.1              install 20.6.1 version of node.js
    nvm ls                          List Down All Version of Node.Js Install on System\
    nvm use 18.5.0                  For Switch to 18.5.0 version of Node.Js(First Install that version using nvm install command)
    nvm install latest              Install latest Version of Node
    nvm install lts                 Install LTS(Long Term Support) Version of Node.JS

*/


/*
NVM

Which of the following is not a feature of NVM (Node Version Manager)?

1. Install multiple versions of Node.js
2. Switch between different versions of Node.js
3. Uninstall versions of Node.js
3. Automatically update Node.js to the latest version                   // Correct

Solution Description : NVM is a tool for managing multiple versions of Node.js on a 
                single machine. It allows developers to easily switch between different 
                versions of Node.js depending on their needs. NVM also supports the 
                installation and uninstallation of different Node.js versions. However, 
                NVM does not automatically update Node.js.
*/