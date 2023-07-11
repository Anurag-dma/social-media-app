const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function (req, res) {
     try {
       const user = await User.findById(req.params.id).exec();
   
       return res.render('user_profile', {
         title: 'User_Profile',
         profile_user: user
       });
     } catch (err) {
       console.log('Error in fetching user profile:', err);
       return res.redirect('back');
     }
   }; 

   module.exports.update = async function (req, res) {
    if(req.user.id == req.params.id){

      try{

          let user = await User.findById(req.params.id);
          User.uploadedAvatar(req, res, function(err){
              if (err) {console.log('*****Multer Error: ', err)}
             
              user.name = req.body.name;
              user.email = req.body.email;

              if (req.file){
                if (user.avatar){
                  fs.unlinkSync(path.join(__dirname, '..', user.avatar));
              }
                  // this is saving the path of the uploaded file into the avatar field in the user
                  user.avatar = User.avatarPath + '/' + req.file.filename;
              }

              user.save();
              return res.redirect('back');
          });
        }catch(err){
              req.flash('error', err);
              return res.redirect('back');
        }
      } else{
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
      }
   };

module.exports.SignUp = function(req,res){
     if (req.isAuthenticated()){
          return res.redirect('/users/profile');
      }
     return res.render('user_sign_up', {
          title:"Codial | sign Up"
     })
}
module.exports.SignIn = function(req,res){
     if (req.isAuthenticated()){
          return res.redirect('/users/profile');
      }
     return res.render('user_sign_in', {
          title:"Codial | sign In"
     })

}

module.exports.create = async function(req, res) {
     if (req.body.password !== req.body.confirm_password) {
       return res.redirect('back');
     }
   
     try {
       const existingUser = await User.findOne({ email: req.body.email });
   
       if (!existingUser) {
         const newUser = await User.create(req.body);
         return res.redirect('/users/sign-in');
       } else {
         return res.redirect('back');
       }
     } catch (error) {
       console.log('Error in signing up:', error);
       return res.redirect('back');
     }
   };
   
/* get the Sign In Data */

module.exports.createSession = function(req,res){
  req.flash('success', 'Logged in Successfully');
     return res.redirect('/')
}

module.exports.destroySession = function(req, res){
     req.logout(function(err) {
          if (err) {
            // Handle the error
            console.log(err);
            return res.status(500).send('Internal Server Error');
           }
           } );
    req.flash('success', 'You have logged out!');
         
     return res.redirect('/');
 }