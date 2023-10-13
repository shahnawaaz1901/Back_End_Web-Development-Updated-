import express from 'express'
import path from 'path'
import ProductsController from './src/controllers/product.controller.js'
import expressEjsLayouts from 'express-ejs-layouts';
import validate from './src/middlewares/validate.middlware.js';
const server = express();

// SetUp View Engine
server.set('view engine','ejs');                    
server.set('views',path.join('src','views'));       

//* Use MiddleWare express.static to Render the css and js file
server.use(express.static(path.join('src','views')));

// Use Layouts 
server.use(expressEjsLayouts);

// urlEncoded as Middleware to decode the data which browser sent from the user
server.use(express.urlencoded({extended : true}));

// For Use a function which is Inside in Class we Need to Create Object of that Class
let products = new ProductsController();

//* Setup the Router 
server.get('/',products.getProduct);
server.get('/new-product',products.getAddProductForm);
/*
    If You Want to Pass Parameters with the url You can use params
    by writing colon and after the colon name of the parameter
*/
server.get('/update-product/:id',products.getUpdateProductView);
server.post('/update-product',products.postUpdateProduct);
server.post('/',validate, products.addNewProducts);

//? Listen the Server at PORT 3200
server.listen(3200,function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    }
    console.log(`Server is Up and Run on Port : 3200`);
})