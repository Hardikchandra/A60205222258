const express = require('express');
const cors = require('cors');
const shorturlRoutes = require('./routes/shorturl');
const logger = require('./middlewares/logger');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());         
app.use(logger);
app.use('/', shorturlRoutes);   

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
