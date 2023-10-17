const express = require("express");
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const path = require("path");
const app = express();

const session = require('express-session');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(session({
    secret : "Secrettt",
    resave : false,
    saveUninitialized:false,
}));
app.use(userLoggedMiddleware);
app.use(express.static('public'));
app.use(express.static(path.resolve(__dirname,'./public')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

const mainRoutes = require('./src/routes/mainRoutes');

const usersRouter =require('./src/routes/usersRoutes');
const usersAPIRouter =require('./src/routes/api/users');


app.use('/', mainRoutes);

app.use('/api/users', usersAPIRouter);

app.use('/users', usersRouter);


app.listen(3003, function () {
    console.log(' puerto 3003!');
});


