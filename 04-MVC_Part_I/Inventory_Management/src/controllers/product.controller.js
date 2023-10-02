/* Convension of Write Controller is by add .controller next after the name */
import path from 'path'         // Import Using ES6 Module
import ProductModel from '../models/product.model.js';

// Export Products Controller class Default
export default class ProductsController{
    // First Function
    getProduct(req, res){
        let products = ProductModel.getProducts();
        /*
            Resolve Function Gives us Directory from Root to Current Directory,Now
            Current Directory Means from Root to File Where Program is Executed, in
            Out Case index.js is Executed that's Why resolve function gives us from
            root to Inventory_Management Folder Path not the Path of Product.controller.js
        */
        /* Use to send Static Content
        let filePath = path.resolve(path.resolve('src','views','products.ejs'));
        // Send File Function take Address of File in String Format
        res.sendFile(filePath);
        */

        res.render('products',{
            title : 'Products Page',
            products,           // Send the products array along with file
        })
    }
}