const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // Cloudinary image URL
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'}
}, { timestamps: true });

module.exports=mongoose.model('Post',postSchema)