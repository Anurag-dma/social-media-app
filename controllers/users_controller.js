const User = require('../models/user');

module.exports.profile = function(req,res){
     return res.render('user_profile', {
          title: "Home"
      });
  
} 

module.exports.SignUp = function(req,res){
     return res.render('user_sign_up', {
          title:"Codial | sign Up"
     })
}
module.exports.SignIn = function(req,res){
     return res.render('user_sign_in', {
          title:"Codial | sign In"
     })
     User.findone()
}

/* get the Sign Up Data */

module.exports.create = function(req,res){
     if(req.body.password != req.body.confirm_password){
          return res.redirect('back');
     }
     User.findOne({email: req.body.email}, function(err, user){
          if(err){console.log('error in finding user in signing up'); return}
  
          if (!user){
              User.create(req.body, function(err, user){
                  if(err){console.log('error in creating user while signing up'); return}
  
                  return res.redirect('/users/sign-in');
              })
          }else{
              return res.redirect('back');
          }
      } );

}

/* get the Sign In Data */

module.exports.createSession = function(req,res){
     
}