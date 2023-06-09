const express=require('express');
const router=express.Router();
const home_controller=require('../controllers/home_controller');

console.log('router loaded');



router.get('/',home_controller.home);
router.get('/friends',home_controller.friends);
router.get('/reel',home_controller.reel);



//since this file our main route we are diverting it to user whenever we need transfer request for user
router.use('/user',require('./user'));
router.use('/posts',require('./posts'));
router.use('/comment',require('./comment'));
router.use('/like',require('./like'));

router.use('/api',require('./api'));

module.exports=router;