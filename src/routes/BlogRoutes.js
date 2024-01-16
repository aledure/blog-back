
const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/BlogController');

router.get('/', BlogController.getAllPosts);
router.get('/:id', BlogController.getPostById);
router.post('/', BlogController.createPost);
router.put('/:id', BlogController.updatePost);
router.delete('/:id', BlogController.deletePost);

module.exports = router;
