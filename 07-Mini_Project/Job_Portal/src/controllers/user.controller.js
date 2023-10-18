export default class UserController{
    getLogin(req, res){
        res.render('login',{
            title : "Login"
        })
    }
}