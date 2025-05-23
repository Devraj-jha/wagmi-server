const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});

app.use(express.json());

app.post('/wagmi', (req, res) => {
  const { a, b } = req.body || {};

  if (Object.keys(req.body).length === 0) {
    return res.json({
      message: 'wagmi',
      timestamp: new Date().toISOString(),
      lang: 'Node.js'
    });
  }

  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  if (a < 0 || b < 0 || a + b > 100) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  return res.json({
    result: a + b,
    a: a,
    b: b,
    status: 'success'
  });
});

app.get('/', (req, res) => {
  res.send('Hey, This is the wagmi server. plz Use POST /wagmi to use.');
});
app.get('/favicon.ico', (req, res) => res.status(204));



app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});