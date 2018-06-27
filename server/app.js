import path from 'path';
import app from './config/express';
import routes from './routes/index.route';
import * as errorHandler from './middlewares/errorHandler';
import joiErrorHandler from './middlewares/joiErrorHandler';


// enable webpack hot module replacement in development mode
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.config.dev';

//uncomment this to run the advance reminder cron

//import reminderCron from './cron';

const passport = require('passport'),
    auth = require('./middlewares/auth'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session');


if (process.env.NODE_ENV === 'development') {

    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
    app.use(webpackHotMiddleware(compiler));
}

auth(passport);
app.use(passport.initialize());

// Set CORS here
// app.use(function(req, res, next) {
//       res.header("Access-Control-Allow-Origin", "*");
//       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//       next();
// });

app.use(cookieSession({
    name: 'session',
    keys: ['123'],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(cookieParser());

// Router
app.use('/api', routes);

// Landing page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.use('*', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('login/pn/return',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        console.log(req.user.token);
        req.session.token = req.user.token;
        res.redirect('/');
    }
);

app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
        console.log("before redirect");
        res.sendFile(path.join(__dirname, '../public/index.html'));
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});



// // Joi Error Handler
// app.use(joiErrorHandler);

// // Error Handler
// app.use(errorHandler.notFoundErrorHandler);
// app.use(errorHandler.errorHandler);



app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
});



export default app;