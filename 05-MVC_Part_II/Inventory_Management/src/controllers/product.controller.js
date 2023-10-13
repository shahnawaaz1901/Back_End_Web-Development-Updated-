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
            errorMassages : null,
        });
    }

    addNewProducts(req, res){
        const {name, desc, price, imageUrl} = req.body;
        /* 
            This code voilet one reason for Change principle and not loosely coupled for 
            Loosely coupled and we need to Seprate it in a Middleware for Only this post 
            request not for all

            Data is Sent By Browser in Encoded format so req.body gives undefined for fix this
            we need to decode the data using body parser
        */
        /*
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
            return res.render('new-product',{errorMassages : errors,title : 'Add New Product'});
        }
        */
        ProductModel.addProduct(name,desc,price,imageUrl);
        /*
            After Adding New Data Again Fetch the Products and Render it On Browser
        */
        products = ProductModel.getProducts();
        res.render('products',{
            title:'Products',
            products,
        })
    }


    getUpdateProductView(req, res , next){
        // Check Whether id is Present or Not
        let id = req.params.id;
        const productIndex = ProductModel.getById(id);
        let productArray = ProductModel.getProducts();
        if(productIndex != -1){
            res.status(202).render('update-product',{
                title:'Update Product',
                product : productArray[productIndex],
                errorMassages : null,
            })
            
        }
        // *!If Product Not Found 
        else{
            res.status(401).send('Product Not Found');
        }
    }
    postUpdateProduct(req, res){
        ProductModel.update(req.body);
        res.render('products',{
            title:'Products',
            products : ProductModel.getProducts(),
        })
    }

}