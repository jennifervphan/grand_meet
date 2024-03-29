require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const Chatkit = require('pusher-chatkit-server');

const chatkit = new Chatkit.default({
    instanceLocator: process.env.chatkit_instance_locator,
    key: process.env.chatkit_secretkey
})


const passport = require('passport');

require('./configs/passport');

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(cors({
    credentials: true,
    origin: [process.env.origin] // <== this will be the URL of our React app (it will be running on port 3000)
}));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(require('./middleware/userInViews')());


// Express View engine setup

app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// ADD SESSION SETTINGS HERE:
// app.use(session({
//     secret: "some secret goes here",
//     resave: true,
//     saveUninitialized: true
// }));
app.use(session({
    name: "session",
    secret: process.env.SECRET,
    store: new MongoStore({
        url: process.env.MONGODB_URI,
        ttl: 4 * 60 * 60 // 2-hour sessions
    }),
    resave: true,
    saveUninitialized: true,

}))

// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'grandMeet';


// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:



// ROUTES MIDDLEWARE STARTS HERE:

const index = require('./routes/index');
app.use('/', index);
app.use('/api', require('./routes/auth-routes'));
app.use('/api', require('./routes/edit'));
app.use('/api', require('./routes/nearby'));
app.use('/api', require('./routes/inbox'));
app.use('/api', require('./routes/newChat'));
app.use('/api', require('./routes/share'));
app.use('/api', require('./routes/game'));

app.use((req, res, next) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;