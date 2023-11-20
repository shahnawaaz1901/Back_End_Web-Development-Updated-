export default class OrderRepository {
  constructor() {
    this.collection = "orders";
    /* 
            for Orderes We use the transactions in Database because in Database
            we Need to Perform Multiple Operations as a single Operation so that
            if Any operation is failed Due to Some Reason We Don't want to process
            Next Operations and we need to undo all changes which we did in database.
            In transactions We combined Multiple Set of operations such as that all
            operations like as One Transaction so if Any Operation failed Due to some
            Reason Transactions help us revert back all the stages which we done during
            the transactions 
        */
  }

  async placeOrder(userId) {
    
    //1. Get the Cart Items and Calculate the Ammount
    
    //2. Create an Order Record
    
    //3. Reduce the Stock
    
    //4. Clear the Cart Items
  }
}
