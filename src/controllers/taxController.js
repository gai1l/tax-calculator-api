const { calculateTax } = require('../services/taxService');

const calculateTaxHandler = (req, res) => {
  try {
    const { totalIncome, wht = 0, allowances = [] } = req.body;

    // === Test Case 6: totalIncome ติดลบ ===
    if (!Number.isFinite(totalIncome) || totalIncome < 0) {
      return res.status(400).json({
        error: "totalIncome must be a positive number"
      });
    }

    // === Test Case 7: wht > totalIncome ===
    if (!Number.isFinite(wht) || wht < 0) {
      return res.status(400).json({
        error: "wht must be a non-negative number"
      });
    }

    if (wht > totalIncome) {
      return res.status(400).json({
        error: "wht cannot be greater than totalIncome"
      });
    }

    // ตรวจสอบ allowances
    if (!Array.isArray(allowances)) {
      return res.status(400).json({
        error: "allowances must be an array"
      });
    }

    // คำนวณภาษี
    const result = calculateTax(totalIncome, wht, allowances);
    res.json(result);

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { calculateTaxHandler };