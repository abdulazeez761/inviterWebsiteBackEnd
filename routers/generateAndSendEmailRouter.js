const express = require('express')
const router = express.Router();
const generateQRCode = require('../controllers/generateAndSendEmailcontroller')
router.post('/generateQRCode', generateQRCode.generateAndSendEmail)
module.exports = router;