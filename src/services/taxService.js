const TAX_BRACKETS = [
  { min: 0, max: 150000, rate: 0 },
  { min: 150001, max: 500000, rate: 0.10 },
  { min: 500001, max: 1000000, rate: 0.15 },
  { min: 1000001, max: 2000000, rate: 0.20 },
  { min: 2000001, max: Infinity, rate: 0.35 }
];

const PERSONAL_DEDUCTION = 60000;

const calculateNetIncome = (totalIncome, allowances) => {
  let deduction = PERSONAL_DEDUCTION;
  const donation = allowances.find(a => a.allowanceType === 'donation');
  if (donation && typeof donation.amount === 'number') {
    deduction += donation.amount; 
  }
  return Math.max(0, totalIncome - deduction);
};

const calculateTaxByBrackets = (netIncome) => {
  let remaining = netIncome;
  let totalTax = 0;
  const details = [];

  for (const bracket of TAX_BRACKETS) {
    if (remaining <= 0) {
      details.push({ level: formatLevel(bracket), tax: 0 });
      continue;
    }

    const taxableInBracket = bracket.max === Infinity
      ? remaining
      : Math.min(remaining, bracket.max - bracket.min); // ไม่ +1

    const taxInBracket = Math.round(taxableInBracket * bracket.rate); 
    totalTax += taxInBracket;
    remaining -= taxableInBracket;

    details.push({
      level: formatLevel(bracket),
      tax: taxInBracket
    });
  }

  return { totalTax, details };
};

const formatLevel = (bracket) => {
  if (bracket.max === Infinity) return "2,000,001 ขึ้นไป";
  return `${bracket.min.toLocaleString()}-${bracket.max.toLocaleString()}`;
};

const calculateTax = (totalIncome, wht, allowances = []) => {
  const netIncome = calculateNetIncome(totalIncome, allowances);
  const { totalTax, details } = calculateTaxByBrackets(netIncome);
  const finalTax = Math.max(0, totalTax - wht); // ไม่ติดลบ

  return { tax: finalTax, taxLevel: details };
};

module.exports = { calculateTax };
