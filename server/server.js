const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

require('./config/mongoose.config');
require('dotenv').config();

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./routes/User.routes')(app);
require('./routes/Schedule.routes')(app);

app.listen('8000', () => console.log("Listening on port 8000"));