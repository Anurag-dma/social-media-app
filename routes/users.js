const express = require('express')
const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile', userController.profile);
router.get('/sign-up', userController.SignUp);
router.get('/sign-in', userController.SignIn);



module.exports = router;