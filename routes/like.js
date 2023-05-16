const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likes_controller');
router.post('/toggle',likeController.toggleLike);
// router.get('/toggle',function(req,res){
//     res.send('we are testing toggle');
// });

module.exports = router;