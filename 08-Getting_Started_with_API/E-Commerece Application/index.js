//* Import Modules
import express from "express";
import ProductRouter from "./src/features/products/product.router.js";
import bodyParser from "body-parser";

//* Start the Server
const app = express();

/*  Instead of SetUp Routes for Every Request in this File We can Seprate 
    All Routes into the Each Module folder Using Express router. Using 
    Express Router We Can Categorized Request and Find out Which Category 
    Request want to go So that we can Call that feature Router and after 
    that all work is Managed by that Feature Router. You can Say that Router
    check request category and after that send the request for that category
    router and after that catrgory router send request to the Controller.
    
    Request Category For underStand How Routers works

    1. /api/users/                      //* Forward Request to Users feature Router
    2. /api/products/                   //* Forward Request to Products feature Router
    3. /api/cart/                       //* Forward Request to Cart feature Router
    4. /api/order/                      //* Forward Request to Order Feature Router
*/

/* 
    instead of method we write "use" because we want that every Request for Product 
    is Pass through this route. Now We Transfer All Request For /api/products to 
    productrouter.
*/
/* Body Parser Use to Get Data on req.body  */
app.use(bodyParser.json());

//? Its Good practice to write the /api first when we Create Route for API
app.use("/api/products", ProductRouter);

//* Default Route
app.get("/", function (req, res) {
  res.send("Welcome to API Application !!");
});

//* Listen the Server on Port 3200
app.listen(3200, function (err) {
  if (err) {
    console.log(`Error While Run the Server : ${err}`);
    return;
  }
  console.log(`Server is up and Run on Port 3200`);
});
