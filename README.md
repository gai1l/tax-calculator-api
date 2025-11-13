# Tax Calculator API

REST API สำหรับคำนวณภาษีเงินได้บุคคลธรรมดา ตามอัตราภาษีก้าวหน้า (ปี 2568)

## เทคโนโลยีที่ใช้
- **Node.js** (v18 ขึ้นไป)
- **Express.js**

---

## วิธีการติดตั้ง
```bash
npm install

## วิธีการรัน
bashnpm run dev
API จะรันที่: http://localhost:5000

## API Endpoints
## POST /tax/calculations
คำนวณภาษีเงินได้สุทธิ (หลังหัก WHT และ donation)
Request Body
json{
  "totalIncome": 750000,
  "wht": 0,
  "allowances": []
}
Response
json{
  "tax": 63500,
  "taxLevel": [
    { "level": "0-150,000", "tax": 0 },
    { "level": "150,001-500,000", "tax": 35000 },
    { "level": "500,001-1,000,000", "tax": 28500 },
    { "level": "1,000,001-2,000,000", "tax": 0 },
    { "level": "2,000,001 ขึ้นไป", "tax": 0 }
  ]
}

## ตัวอย่างการใช้งาน
## คำนวณภาษีพื้นฐาน
bashcurl -X POST http://localhost:5000/tax/calculations \
  -H "Content-Type: application/json" \
  -d '{
    "totalIncome": 750000,
    "wht": 0,
    "allowances": []
  }'
## คำนวณภาษีพร้อม WHT
bashcurl -X POST http://localhost:5000/tax/calculations \
  -H "Content-Type: application/json" \
  -d '{
    "totalIncome": 600000,
    "wht": 15000,
    "allowances": []
  }'
## คำนวณภาษีพร้อม Donation
bashcurl -X POST http://localhost:5000/tax/calculations \
  -H "Content-Type: application/json" \
  -d '{
    "totalIncome": 850000,
    "wht": 0,
    "allowances": [
      { "allowanceType": "donation", "amount": 150000 }
    ]
  }'

## การทดสอบ
bashnpm test
ผลลัพธ์ที่ได้:textPASS  tests/tax.test.js
  Tax Calculator API
    Test Case 1: 750000 to 63500
    Test Case 3: 1200000 to 144000
    Test Case 4: 450000 + wht 8000 to 15000
    Test Case 5: 700000 + donation 120000 to 43000
    Bonus: 850000 + donation 150000 to 56000
    Validation: totalIncome negative to 400 error
    Validation: wht > totalIncome to 400 error