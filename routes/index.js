const express=require('express');
const router=express.Router();
const home_controller=require('../controllers/home_controller');
console.log('router loaded');
router.get('/',home_controller.home);
router.get('/friends',home_controller.friends);
router.get('/post',home_controller.post);
router.get('/reel',home_controller.reel);
module.exports=router;