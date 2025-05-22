const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// POST /wagmi
app.post('/wagmi', (req, res) => {
  const { a, b } = req.body || {};

  // If empty body, return echo message
  if (Object.keys(req.body).length === 0) {
    return res.json({
      message: 'wagmi',
      timestamp: new Date().toISOString(),
      lang: 'Node.js'
    });
  }

  // Validation
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  if (a < 0 || b < 0 || a + b > 100) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Valid response
  return res.json({
    result: a + b,
    a: a,
    b: b,
    status: 'success'
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
