const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const path = require('path');
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');

// Connect to DB

db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(methodOverride('_method'));
// Routing

route(app);

// http Logger
// app.use(morgan("combined"));
app.engine(
    'hbs',
    handlebars({
        extname: 'hbs',
        helpers: {
            sum: (a, b) => {
                return a + b;
            },
        },
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
