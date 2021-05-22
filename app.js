const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const spaceshipRoutes = require('./routes/spaceship');
const locationRoutes = require('./routes/location');
const travelRoutes = require('./routes/travel');
const dbUrl = 'mongodb://localhost:27017/spaceship';
const ExpressError = require('./utils/ExpressError');

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    //res.render('home', { page: 'home' });
    res.send("home");
});

app.use('/spaceships', spaceshipRoutes);

app.use('/location', locationRoutes);

app.use('/spaceships/:sID/locationToGo/:lID', travelRoutes);


app.all('*', (req, res, next) => {
    next(new ExpressError('PAGE NOT FOUND', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, Something went wrong!';

    res.status(statusCode).render('error', { err });
});

const port = "3000";
app.listen(port, () => {
    console.log(`LISTENING TO PORT ${port}`);
});

