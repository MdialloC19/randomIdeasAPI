const path=require('path');
const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');
const cors=require('cors');
const ideasRouter = require('./routes/ideas');

connectDB();
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

// Cors MiddleWare 
app.use(cors({
    origin: ['http://localhost:8000', 'http://localhost:3000']
}));

/**
 * GET route.
 * @name GET /
 * @function
 * @memberof module:RandomIdeasAPI
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the RandomIdeas API' });
});



/**
 * Ideas API route.
 * @name IdeasAPI
 * @function
 * @memberof module:RandomIdeasAPI
 * @inner
 */
app.use('/api/ideas', ideasRouter);


module.exports=app;


