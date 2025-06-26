const mongoose = require("mongoose");

const headerSchema = new mongoose.Schema({

    links: [
        {
            label: { type: String, required: true },
            path: { type: String, required: true }
        }
    ],
  
    icon: {},
    order: {type: Number, default: 0},  //// sorting order
    backgroundColor: { type: String, default: "#ffffff" },
    textColor: { type: String, default: "#000000" },

    isVisible: { type: Boolean, default: true }, //// toggle visibility




}, { timestamps: true })


module.exports = mongoose.model("Header", headerSchema);