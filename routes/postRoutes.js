const express= require('express');
const {createPost, getAllPosts, getPostById, updatePost,deletePost} = require('../controllers/postController');

// const { protect } = require('../middleware/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

// Post routesrouter.post('/posts', createPost);
router.post('/posts',  createPost);
router.get('/allposts', getAllPosts);
router.get('/posts/:id', getPostById);
router.put('/posts/:id', updatePost);
 router.delete('/posts/:id', deletePost); 



 module.exports = router;

