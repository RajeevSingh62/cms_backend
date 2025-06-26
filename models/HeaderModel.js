const mongoose = require("mongoose");

const headerSchema=new mongoose.Schema({

label:{},
path:{},
icon:{},
order:{},  //// sorting order

isVisible:{type:Boolean,default:true}, //// toggle visibility




},{timestamps:true})


module.exports=mongoose.model("Header",headerSchema);