const express = require('express')
const router = express.Router();
const varifyToken = require('../varifyToken');

const {addComment, deleteComment, getComment} = require('../controllers/comment');


router.post('/add', varifyToken, addComment);
router.delete('/:videoId/:id', varifyToken, deleteComment);
router.get('/:videoId', getComment);

module.exports = router