
const Header=require('../models/HeaderModel');

exports.createHeader = async (req, res) => {

    try {
        const { links, icon, order, backgroundColor, textColor, isVisible } = req.body;

      const newHeader=await Header.create({
            links,
            icon,
            order,
            backgroundColor,
            textColor,
            isVisible
        });

        res.status(201)
        
        .json({ sucess:true,data:newHeader });


        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
},

exports.getHeaders = async (req, res) => {

    try {
        const items= await Header.find().sort({ order: 1 }); 
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status
    }
}

// later for admin view 



