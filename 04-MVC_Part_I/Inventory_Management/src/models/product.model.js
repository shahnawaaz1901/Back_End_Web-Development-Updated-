export default class ProductModel{
    constructor(_id,_name,_description,_price,_imageURL){
        this.id = _id;
        this.name = _name;
        this.description = _description;
        this.price = _price;
        this.imageURL = _imageURL;
    }
12
    static getProducts(){
        return products;
    }
}

var products = [
    new ProductModel(1, 'Product 1', 'Description for Product 1',19,999,'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'),
    new ProductModel(2, 'Product 2', 'Description for Product 2',29,999,'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'),
    new ProductModel(3, 'Product 3', 'Description for Product 3',39,999,'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg'),
]