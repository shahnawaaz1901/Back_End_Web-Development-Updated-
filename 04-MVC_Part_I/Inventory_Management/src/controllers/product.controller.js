/* Convension of Write Controller is by add .controller next after the name */
import path from 'path'         // Import Using ES6 Module
import ProductModel from '../models/product.model.js';
import { log } from 'console';

// Export Products Controller class Default
export default class ProductsController{
    // First Function
    getProduct(req, res){
        let array = ProductModel.getProducts();
        for(let every of array){
            console.log(every);
        }
        /*
            Resolve Function Gives us Directory from Root to Current Directory,Now
            Current Directory Means from Root to File Where Program is Executed, in
            Out Case index.js is Executed that's Why resolve function gives us from
            root to Inventory_Management Folder Path not the Path of Product.controller.js
        */
        let filePath = path.resolve(path.resolve('src','views','products.html'));
        res.sendFile(filePath);
    }
}