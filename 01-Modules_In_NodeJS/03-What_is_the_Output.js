/*
Importing ES6 Module

Which of the following import statement correctly imports all three functions, 
that is, "sum", "multiplication", and "squaredSum" from the module named "utility.mjs"?
(Multiple)
A)
import * as utility from './utility.mjs'

B)
import all from './utility.mjs'

C)
import {sum, multiplication, squaredSum} from './utility.mjs'

D)
const utility = require('./utility')

1. A                            // Correct
2. B
3. C                            // Correct
4. D

Solution Description : Option A uses import * syntax to create a namespace called 
                utility that can be used to access each function, while option C 
                imports the specific functions directly. Option B has incorrect 
                syntax, and option D uses the commonJS syntax.
*/