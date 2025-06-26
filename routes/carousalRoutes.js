const express = require("express");
const {createCarouselItem,getCarouselItems}=require("../controllers/carousalController");
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.post("/createcarousal",upload.single('image'), createCarouselItem);
router.get("/getcarousal", getCarouselItems);      
// router.put("/:id", updateCarouselItem);
// router.delete("/:id", deleteCarouselItem);

module.exports = router;