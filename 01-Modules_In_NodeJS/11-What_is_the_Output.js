/*
package.json

What is the function of the dependencies section in package.json?

1. To list all the external dependencies required by the project.           // Correct
2. To list all the internal dependencies required by the project.
3. To list all the development dependencies required by the project.
4. To list all the scripts that can be run using the npm run command.

Solution Description : The dependencies section in package.json lists all the external
                    dependencies required by the project. These dependencies are installed
                    using the npm install command and are required for the project to 
                    function correctly. Examples of external dependencies include libraries, 
                    frameworks, and other packages that are not part of the Node.js core.

*/

/*
package-lock.json

Which statement(s) is/are true regarding package-lock.json? ( Multiple )

1. It contains information about the exact versions of all                          // Correct                
    installed packages and their dependencies.
2. It ensures that the exact versions of packages and their                         // Correct
    dependencies are installed consistently across all environments.
3. It helps avoid unexpected issues caused by different package versions.           // Correct
4. It contains metadata about the project, such as its name, version, 
    and description.
*/

/*
Installing packages

You are developing a Node.js project and need a package to assist with
running automated tests during development. Which category would be the 
most appropriate for installing such a package?

1. It should be installed as a dependency.
2. It should be installed as a devDependency.                       // Correct
3. It should be installed globally.

Solution Description : Install the package as a devDependency, because it's only 
                required during development and testing, and not during production 
                deployment. Installing it as a dependency would increase the project's 
                runtime overhead and dependencies, which is unnecessary.
*/