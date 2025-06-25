const Post=require('../models/Post');

exports.createPost=async(req,res)=>{
const { title, content, status } = req.body;

try {
  const imageUrl = req.file ? req.file.path : '';
  console.log("image url ",imageUrl)
  const newPost=await Post.create({
title,
content,
author:req.user._id ,
status,
 image: imageUrl,

  });
     res.status(201).json(newPost);
    
}

catch (error) {
  console.error('Upload error:', error); // ✅ log detailed error in terminal
  res.status(500).json({
    message: 'Post creation failed',
    error: error.message || 'Unknown error',
  });
}


};

exports.getAllPosts=async(req,res)=>{

    try {
        const posts=await Post.find().populate('author', 'Username email');
        res.status(200).json(posts);
        
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
};

exports.getPostById=async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch post', error: error.message });
    }
};

exports.updatePost=async(req,res)=>{

const { title, content, status } = req.body;
try {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    post.title = title || post.title;

    post.content = content || post.content;

    post.status = status || post.status;
    if (req.file) {
        post.image = req.file.path;
    }
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);

    
} catch (error) {
    res.status(500).json({ message: 'Failed to update post', error: error.message });
    
}

};
exports.deletePost=async(req,res)=>{

    try {
        const post= await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
        
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete post', error: error.message });
    }
};
