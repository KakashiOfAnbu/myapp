const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const path = require('path');
const port = 3000;
const route = require('./routes');
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// Routing

route(app);

// http Logger
// app.use(morgan("combined"));
app.engine(
    'hbs',
    handlebars({
        extname: 'hbs',
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
