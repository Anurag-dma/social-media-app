module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('user_id', 87);
    res.cookie('user', 90);
    return res.render('home', {
        title: "Home"
    });
}