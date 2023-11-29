const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const cors=require('cors')
const { errorHandler } = require('./middleware/errorMiddleware');

connectDB();

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/',require('./routes/Routes'))

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
