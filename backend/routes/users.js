const express = require('express')
const router = express.Router();
const varifyToken = require('../varifyToken')

const {update,deleteUser,getUser,subscribe,unsubscribe,like,disLike} = require('../controllers/user')


router.put('/:id', varifyToken, update);
router.delete('/:id', varifyToken, deleteUser);
router.get('/find/:id', getUser);
router.put('/sub/:id', varifyToken, subscribe);
router.put('/unsub/:id', varifyToken, unsubscribe);
router.put('/like/:videoId', varifyToken, like);
router.put('/dislike/:videoId', varifyToken, disLike);


module.exports = router