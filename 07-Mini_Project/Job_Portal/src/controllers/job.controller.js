export default class JobController{
    getHomePage(req, res){
        console.log('inside getHomePage');
        res.render('index',{title : "Easy - A Job Portal"});
    }
}