const express=require('express');
const passport=require('passport');
const router=express.Router();
const user_controller=require('../controllers/user_controller');
router.get('/profile',user_controller.profile);
router.get('/sign-in',user_controller.signIn);
router.get('/sign-up',user_controller.signUp);

router.post('/create',user_controller.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'}),
    user_controller.createSession);
    
module.exports = router;