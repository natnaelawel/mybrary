const express = require('express');
const router = require('./routes');
const morgan = require('morgan');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');


app.use(express.json);
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.set('views', __dirname+ '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');
dotenv.config();
// dotenv.config({path: './config/config.env'});
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true, useFindAndModify:false, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', ()=>{
    console.log('Database connection Successful');
});


app.use('/', router);

app.listen(process.env.PORT || 3434, ()=>{
    console.log('server started successfully!');
}
);