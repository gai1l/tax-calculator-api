const validateInput = (body) => {
  const { totalIncome, wht, allowances } = body;

  if (typeof totalIncome !== 'number' || totalIncome < 0) {
    throw { status: 400, message: 'totalIncome must be a positive number' };
  }

  if (typeof wht !== 'number' || wht < 0) {
    throw { status: 400, message: 'wht must be a non-negative number' };
  }

  if (wht > totalIncome) {
    throw { status: 400, message: 'wht cannot be greater than totalIncome' };
  }

  if (!Array.isArray(allowances)) {
    throw { status: 400, message: 'allowances must be an array' };
  }

  for (const allowance of allowances) {
    if (!allowance.allowanceType || typeof allowance.amount !== 'number') {
      throw { status: 400, message: 'each allowance must have allowanceType and amount (number)' };
    }
  }
};

module.exports = { validateInput }; // ต้องมีบรรทัดนี้!