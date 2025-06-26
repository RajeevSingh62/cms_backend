const express = require('express');
const router = express.Router();
const {getHeaders,createHeader}=require('../controllers/headerController')

router.post('/createHeader', createHeader);
router.get('/getHeader', getHeaders);



module.exports = router;