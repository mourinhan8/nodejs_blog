const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const render = require('express/lib/response');
const morgan = require('morgan');
const expressSession = require('express-session');
const sortMiddleware = require('./app/middleware/sortMiddleware');
const csrfTokenMiddleware = require('./app/middleware/csrfTokenMiddleware');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const db = require('./config/db');
const route = require('./routes');

// Connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use(methodOverride('_method'));

app.use(csrfTokenMiddleware);

// Custom middleware
app.use(sortMiddleware);

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/resources/views'));
// console.log("day la thu muc" ,path.join(__dirname, '/resources/views'))

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at https://localhost:${port}`);
});
