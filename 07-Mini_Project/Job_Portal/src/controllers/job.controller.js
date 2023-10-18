export default class JobController{
    getHomePage(req, res){
        res.render('index',{title : "Easy - A Job Portal"});
    }
}