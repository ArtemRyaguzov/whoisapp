const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');

const app = express();

// Middleware
// Custom middleware
app.use(logger);

// View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Path to static assets
app.use('/public', express.static(path.join(__dirname, 'public')));

// End of Middleware

// Routes

app.use('/', require('./routes/main-router'));

// End of Routes

const port = 3001;

const server = app.listen(port, () => process.stdout.write(`Server started on port ${port}...\n`));
