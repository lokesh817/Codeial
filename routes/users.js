const express=require('express');
const router=express.Router();
const user_controller=require('../controllers/user_controller');
router.get('/',user_controller.profile);
module.exports = router;