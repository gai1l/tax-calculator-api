const express = require('express');
const { calculateTaxHandler } = require('../controllers/taxController'); // ต้องตรงชื่อ

const router = express.Router();

router.post('/calculations', calculateTaxHandler); // ใช้ตัวที่ import มา

module.exports = router;