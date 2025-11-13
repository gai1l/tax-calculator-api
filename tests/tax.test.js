const request = require('supertest');
const app = require('../src/app');

describe('Tax Calculator API', () => {
  test('Test Case 1: 750000 → 63500', async () => {
    const res = await request(app)
      .post('/tax/calculations')
      .send({ totalIncome: 750000, wht: 0, allowances: [] });
    expect(res.body.tax).toBe(63500);
  });

  test('Test Case 3: 1200000 → 144000', async () => {
    const res = await request(app)
      .post('/tax/calculations')
      .send({ totalIncome: 1200000, wht: 0, allowances: [] });
    expect(res.body.tax).toBe(144000);
  });

  test('Test Case 4: 450000 + wht 8000 → 15000', async () => {
    const res = await request(app)
      .post('/tax/calculations')
      .send({ totalIncome: 450000, wht: 8000, allowances: [] });
    expect(res.body.tax).toBe(15000);
  });

  test('Test Case 5: 700000 + donation 120000 → 43000', async () => {
    const res = await request(app)
      .post('/tax/calculations')
      .send({
        totalIncome: 700000,
        wht: 0,
        allowances: [{ allowanceType: 'donation', amount: 120000 }]
      });
    expect(res.body.tax).toBe(43000);
  });

  test('Bonus: 850000 + donation 150000 → 56000', async () => {
    const res = await request(app)
      .post('/tax/calculations')
      .send({
        totalIncome: 850000,
        wht: 0,
        allowances: [{ allowanceType: 'donation', amount: 150000 }]
      });
    expect(res.body.tax).toBe(56000);
  });
});