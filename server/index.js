const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import Routes
const autRoutes = require('./routes/auth');
const postRoute = require('./routes/post');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

//connect to db 
mongoose.connect(process.env.DB_CONNECT,
()=> console.log('connected to db')
);
//middleware
app.use(express.json())

//middleware route 
app.use('/api/user', autRoutes);
app.use('/api/posts', postRoute);






app.listen(5000,()=>console.log('server running in 6000'));