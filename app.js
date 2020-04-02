const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
app.disable('x-powered-by');

// Middleware
// View Engine
app.engine('hbs', exphbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');

// Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Path to static assets
app.use(express.static(path.join(__dirname, 'public')));

// End of Middleware

// Routes

app.use('/', require('./routes/main-router'));

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// End of Routes

const hostname = '127.0.0.1';
const port = 3001;

app.listen(port, hostname, () => console.log(`Server started on port ${port}...`));
