const express = require('express');
const taxRoutes = require('./routes/taxRoutes');

const app = express();
app.use(express.json());
app.use('/tax', taxRoutes); // เส้นทาง /tax/calculations

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});