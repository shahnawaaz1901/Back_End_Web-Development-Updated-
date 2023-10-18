export default class JobController{
    getHomePage(req, res){
        res.render('index',{title : "Easy - A Job Portal"});
    }

    getJobPage(req, res){
        res.render('jobs',{title : 'Easy - Jobs Section'})
    }
}