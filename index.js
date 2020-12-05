const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies');
const userMoviesApi = require('./routes/userMovies');

const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/nofFoundHandler');

// Body parser
app.use(express.json());

// Cors
app.use(cors());

// Morgan
app.use(morgan('tiny'));

// Helmet
app.use(helmet());

// Routes
authApi(app);
moviesApi(app);
userMoviesApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middlewares
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);


app.listen((config.port), function() {
    console.log(`Listening http://localhost:${config.port}`);
});