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
        /* 
            Data is Sent By Browser in Encoded format so req.body gives undefined for fix this
            we need to decode the data using body parser
        */
        let product = req.body;
        ProductModel.addProduct(product.name, product.desc,product.price,product.imageUrl);
        /*
            After Adding New Data Again Fetch the Products and Render it On Browser
        */
        products = ProductModel.getProducts();
        res.render('products',{
            title:'Products',
            products,
        })
    }
}