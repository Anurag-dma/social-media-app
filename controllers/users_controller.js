const User = require('../models/user');


module.exports.profile = async function (req, res) {
     try {
       const user = await User.findById(req.params.id).exec();
   
       return res.render('user_profile', {
         title: 'User Profile',
         profile_user: user
       });
     } catch (err) {
       console.log('Error in fetching user profile:', err);
       return res.redirect('back');
     }
   }; 

   module.exports.update = async function (req, res) {
     try {
       if (req.user.id == req.params.id) {
         const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body).exec();
         return res.redirect('back');
       } else {
         return res.status(401).send('Unauthorized');
       }
     } catch (err) {
       console.log('Error in updating user:', err);
       return res.redirect('back');
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
 
     return res.redirect('/');
 }