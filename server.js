const path=require('path');
const express = require('express');
require('dotenv').config();
const PORT_DEFAULT = 5000;
const connectDB = require('./config/db');
const cors=require('cors');

/**
 * Normalize a port into a number, string, or false.
 * @param {any} val - Port value
 * @returns {number|string|boolean} - Normalized port
 */
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
};

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

const ideasRouter = require('./routes/ideas');

/**
 * Ideas API route.
 * @name IdeasAPI
 * @function
 * @memberof module:RandomIdeasAPI
 * @inner
 */
app.use('/api/ideas', ideasRouter);

const port = normalizePort(process.env.PORT || PORT_DEFAULT);

/**
 * Server listening on specified port.
 * @name ServerListening
 * @function
 * @memberof module:RandomIdeasAPI
 * @inner
 * @param {number|string} port - Port number
 */
app.listen(port, () => console.log(`Server listening on port: ${port}`));
