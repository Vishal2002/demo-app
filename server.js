//server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello changed are here  CI/CD World!', 
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT} and ready for testing!`);
});

module.exports = app;