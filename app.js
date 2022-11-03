const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 4000

// Parsing middleware 
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse application/json
app.use(express.json());

// Templating Engine
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join((__dirname, './src/views'), 'layouts'),
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './src/views'));

// Router
const routes = require('./src/routes/product');
app.use('/', routes);

app.listen(port, () => { console.log('Server running') })

