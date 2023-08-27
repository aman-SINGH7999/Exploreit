const express = require('express')
const router = express.Router();
const varifyToken = require('../varifyToken');
const {addVideo, updateVideo, deleteVideo, getVideo, updateView, trend, random, sub, searchVideo, getVideoByUserId, incrViews} = require('../controllers/video');


router.post('/add', varifyToken, addVideo);
router.put('/:id', varifyToken, updateVideo);
router.delete('/:id', varifyToken, deleteVideo);
router.get('/find/:id', getVideo);
router.put('/view/:id', updateView);
router.get('/trends', trend);
router.get('/random', random);
router.get('/sub', varifyToken, sub);
router.get('/search', searchVideo);
router.put('/views/:id',incrViews);
router.get('/getvideobyuserid', varifyToken, getVideoByUserId);


module.exports = router