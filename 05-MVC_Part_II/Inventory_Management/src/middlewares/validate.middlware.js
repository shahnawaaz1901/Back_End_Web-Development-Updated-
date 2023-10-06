// Export default keyword works at the time of initialization only on hoisted variable or functions
/* export default */
const validate = (req, res, next)=>{
        let {name, price, imageURL } = req.body;
        let errors = [];
        if(!name || name.trim() == ''){
            errors.push("Enter a Valid Name of Product");
        }
        if(price < 1){
            errors.push("Price You Entered is Invalid");
        }
        try {
            let url = new URL(imageURL);
        } catch (error) {
            errors.push("Enter a Valid URL");
        }
        if(errors.length > 0){
            return res.render('new-product',{errorMassages : errors,title : 'Add New Product'});
        }
        next();
}

// You can export deault after initialization for every non hoisted variable or functions
export default validate;