/* Convension of Write Controller is by add .controller next after the name */
import path from 'path'         // Import Using ES6 Module
import ProductModel from '../models/product.model.js';

// Export Products Controller class Default
export default class ProductsController{
    // First Function
    getProduct(req, res){
        console.log(ProductModel.getProducts());
        let filePath = path.resolve(path.resolve('src','views','products.html'));
        res.sendFile(filePath);
    }
}