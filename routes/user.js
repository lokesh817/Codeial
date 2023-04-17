const express=require('express');
const router=express.Router();
const user_controller=require('../controllers/user_controller');
router.get('/profile',user_controller.profile);
router.get('/sign-in',user_controller.signIn);
router.get('/sign-up',user_controller.signUp);

router.post('/create',user_controller.create);
module.exports = router;