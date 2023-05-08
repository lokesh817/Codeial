const express=require('express');
const router=express.Router();
const passport=require('passport');

const user_controller=require('../controllers/user_controller');

router.get('/profile/:id', passport.checkAuthentication, user_controller.profile);
router.post('/update/:id', passport.checkAuthentication,user_controller.update);

// router.get('/profile',passport.checkAuthentication,user_controller.profile);

router.get('/sign-in',user_controller.signIn);
router.get('/sign-up',user_controller.signUp);

router.post('/create',user_controller.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'}),
    user_controller.createSession
);
router.get('/sign-out',user_controller.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect:'/user/sign-in' }),
    user_controller.createSession);
module.exports = router;