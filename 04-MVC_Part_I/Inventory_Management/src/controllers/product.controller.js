/* Convension of Write Controller is by add .controller next after the name */
import path from 'path'         // Import Using ES6 Module

// Export Products Controller Default
export default class ProductsController{
    getProduct(req, res){
        let filePath = path.resolve(path.resolve('src','views','products.html'));
        res.sendFile(filePath);
    }
}