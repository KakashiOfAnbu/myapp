const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const path = require('path');
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const sortMiddleware = require('./app/middlewares/SortMiddleware');

// Connect to DB

db.connect();
// Middlewares

app.use(sortMiddleware); //Custom middleware
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
            sortable: (field, sort) => {
                const currentField = field == sort.name ? sort.type : 'default';
                const types = {
                    default: 'oi oi-elevator ml-1',
                    asc: 'ml-1 oi oi-sort-ascending',
                    desc: 'ml-1 oi oi-sort-descending',
                };
                const type = types[currentField];

                return `<a href='?_sort&column=${field}&type=${
                    currentField == 'asc' ? 'desc' : 'asc'
                }'><span
                class='${type}' 
            ></span></a>`;
            },
        },
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
