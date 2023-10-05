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
            errorMassage: undefined,
        });
    }

    addNewProducts(req, res){
        /* 
            Data is Sent By Browser in Encoded format so req.body gives undefined for fix this
            we need to decode the data using body parser
        */
        let product = req.body;
        let errors = [];
        if(!product.name || product.name.trim() == ''){
            errors.push("Enter a Valid Name of Product");
        }
        if(product.price < 1){
            errors.push("Price You Entered is Invalid");
        }
        try {
            let url = new URL(product.url);
        } catch (error) {
            errors.push("Enter a Valid URL");
        }
        if(errors.length > 0){
            return res.render('new-product',{errorMassage : errors[0],title : 'Add New Product'});
        }
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