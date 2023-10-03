import path from 'path'         // Import Using ES6 Module
import ProductModel from '../models/product.model.js';

// Export Products Controller class Default
let products = ProductModel.getProducts();
export default class ProductsController{
    // First Function
    getProduct(req, res){
        res.render('products',{
            title : 'Products Page',
            products,           // Send the products array along with file
        })
    }

    getAddProductForm(req, res){
        res.render('new-product',{
            title : 'Add New Product',
        });
    }

    addNewProducts(req, res){

        console.log(req.body);
        res.render('products',{
            title:'Products',
            products,
        })
    }
}