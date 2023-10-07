import express from 'express'
import path from 'path'
import ProductsController from './src/controllers/product.controller.js'
import expressEjsLayouts from 'express-ejs-layouts';
import validate from './src/middlewares/validate.middlware.js';
const server = express();

// SetUp View Engine
server.set('view engine','ejs');                    
server.set('views',path.join('src','views'));       

// Use MiddleWare to render Static Files on Views Folder
server.use(express.static(path.join('src','views')));

// Use Layouts 
server.use(expressEjsLayouts);

// urlEncoded as Middleware to encoded the data into the urlEncoded
server.use(express.urlencoded({extended : true}));
// For Use a function which is Inside in Class we Need to Create Object of that Class
let products = new ProductsController();

server.get('/',products.getProduct);
server.get('/new-product',products.getAddProductForm);
server.get('/update-product',products.getUpdateProductView);
server.post('/',validate, products.addNewProducts);
server.listen(3200,function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    }
    console.log(`Server is Up and Run on Port : 3200`);
})