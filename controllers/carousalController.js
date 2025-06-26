const CarouselItem=require("../models/CarousalModel");


exports.createCarouselItem = async (req, res) => {
  try {
    const { title, description, order, isVisible } = req.body;

    const imageUrl = req.file?.path;
    if (!imageUrl) return res.status(400).json({ message: "Image is required" });

    const newItem = await CarouselItem.create({
      title,
      description,
      imageUrl,
      order,
      isVisible,
    });

    res.status(201)
    .json({
         success: true,
          data: newItem 
        
        });
  } catch (error) {
    // console.error("Carousel creation error:", error);
    res.status(500).json({ message: "Failed to create carousel item", error: error.message });
  }
};

exports.getCarouselItems = async (req, res) => {
    try {
        const carousalitems=await CarouselItem.find().sort({ order: 1 });
        if (!carousalitems || carousalitems.length === 0) {
            return res.status(404).json({ message: "No carousel items found" });
        }
        res.status(200).json({
            success: true,
            data: carousalitems
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch carousel items", error: error.message });
    }
};

const updateCarouselItem = async (req, res) => {};

const deleteCarouselItem = async (req, res) => {};