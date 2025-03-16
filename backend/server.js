const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/Routes');
const { errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', routes);

// Error handler
app.use(errorHandler);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
