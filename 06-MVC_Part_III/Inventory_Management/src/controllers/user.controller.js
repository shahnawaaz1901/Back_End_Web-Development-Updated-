export default class UserController{
    
    getRagister(req, res){
        res.render('ragistration',{
            title : "New User",
        });
    }
}